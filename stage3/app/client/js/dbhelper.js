import { openDB, deleteDB, wrap, unwrap } from 'idb';
import { dbPromise } from '../sw.js';

export default class DBHelper {
  static get DATABASE_URL() {
    const port = 1337; // Change this to your server port
    return (
      process.env.DATABASE_URL || `https://mwsbackend.herokuapp.com/restaurants`
    );
  }

  static get DATABASE_REVIEWS_URL() {
    const port = 1337; // Change this to your server port
    return `https://mwsbackend.herokuapp.com/reviews`;
  }

  /**
   * Fetch all restaurants.
   */

  static fetchRestaurants(callback) {
    fetch(DBHelper.DATABASE_URL).then(function (response) {
      response.json().then(function (restaurants) {
        callback(null, restaurants);
      });
    });
  }

  static fetchReviews(restaurant_id, callback) {
    let fetchURL =
      DBHelper.DATABASE_REVIEWS_URL + '/?restaurant_id=' + restaurant_id;
    fetch(fetchURL)
      .then((response) => {
        return response.json();
      })
      .then((reviews) => {
        callback(null, reviews);
      })
      .catch((error) => {
        callback(error, null);
      });
  }

  static fetchRestaurantById(id, callback) {
    // fetch all restaurants with proper error handling.
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        const restaurant = restaurants.find((r) => r.id == id);
        if (restaurant) {
          // Got the restaurant
          callback(null, restaurant);
        } else {
          // Restaurant does not exist in the database
          callback('Restaurant does not exist', null);
        }
      }
    });
  }

  /**
   * Fetch restaurants by a cuisine type with proper error handling.
   */
  static fetchRestaurantByCuisine(cuisine, callback) {
    // Fetch all restaurants  with proper error handling
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        // Filter restaurants to have only given cuisine type
        const results = restaurants.filter((r) => r.cuisine_type == cuisine);
        callback(null, results);
      }
    });
  }

  /**
   * Fetch restaurants by a neighborhood with proper error handling.
   */
  static fetchRestaurantByNeighborhood(neighborhood, callback) {
    // Fetch all restaurants
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        // Filter restaurants to have only given neighborhood
        const results = restaurants.filter(
          (r) => r.neighborhood == neighborhood
        );
        callback(null, results);
      }
    });
  }

  /**
   * Fetch restaurants by a cuisine and a neighborhood with proper error handling.
   */
  static fetchRestaurantByCuisineAndNeighborhood(
    cuisine,
    neighborhood,
    callback
  ) {
    // Fetch all restaurants
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        let results = restaurants;
        if (cuisine != 'all') {
          // filter by cuisine
          results = results.filter((r) => r.cuisine_type == cuisine);
        }
        if (neighborhood != 'all') {
          // filter by neighborhood
          results = results.filter((r) => r.neighborhood == neighborhood);
        }
        callback(null, results);
      }
    });
  }

  /**
   * Fetch all neighborhoods with proper error handling.
   */
  static fetchNeighborhoods(callback) {
    // Fetch all restaurants
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        // Get all neighborhoods from all restaurants
        const neighborhoods = restaurants.map(
          (v, i) => restaurants[i].neighborhood
        );
        // Remove duplicates from neighborhoods
        const uniqueNeighborhoods = neighborhoods.filter(
          (v, i) => neighborhoods.indexOf(v) == i
        );
        callback(null, uniqueNeighborhoods);
      }
    });
  }

  /**
   * Fetch all cuisines with proper error handling.
   */
  static fetchCuisines(callback) {
    // Fetch all restaurants
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        // Get all cuisines from all restaurants
        const cuisines = restaurants.map((v, i) => restaurants[i].cuisine_type);
        // Remove duplicates from cuisines
        const uniqueCuisines = cuisines.filter(
          (v, i) => cuisines.indexOf(v) == i
        );
        callback(null, uniqueCuisines);
      }
    });
  }

  /**
   * Restaurant page URL.
   */
  static urlForRestaurant(restaurant) {
    return `/restaurant.html?id=${restaurant.id}`;
  }

  /**
   * Restaurant image URL.
   */
  static imageUrlForRestaurant(restaurant) {
    if (!restaurant.photograph) {
      return `/img/${restaurant.id}.jpg`;
    }
    return `/img/${restaurant.photograph}.jpg`;
  }

  /**
   * Map marker for a restaurant.
   */
  static mapMarkerForRestaurant(restaurant, map) {
    // https://leafletjs.com/reference-1.3.0.html#marker
    const marker = new L.marker(
      [restaurant.latlng.lat, restaurant.latlng.lng],
      {
        title: restaurant.name,
        alt: restaurant.name,
        url: DBHelper.urlForRestaurant(restaurant),
      }
    );
    marker.addTo(newMap);
    return marker;
  }

  static updateCachedRestaurantReview(formData) {
    console.log('updating cache for new review', formData);
    return dbPromise.then((db) => {
      const tx = db.transaction('reviews', 'readwrite');
      const store = tx.objectStore('reviews');
      store.put(formData);
      console.log('successfully put review in store');
      return tx.done;
    });
  }

  /**
   * Grab the original review from the db and replace with edited review
   */
  static editReview(formData, editing) {
    return dbPromise
      .then((db) => {
        let tx = db.transaction('reviews');
        let store = tx.objectStore('reviews');
        return store.get(editing.id);
      })
      .then((review) => {
        return dbPromise.then((db) => {
          let tx = db.transaction('reviews', 'readwrite');
          let store = tx.objectStore('reviews');
          let newReview = Object.assign({}, review, formData);
          store.put(newReview);
          return tx.complete;
        });
      });
  }

  static submitReview(formData, editing) {
    console.log(editing);
    const method = editing ? 'PUT' : 'POST';
    const url = editing
      ? `${DBHelper.DATABASE_REVIEWS_URL}/${editing.id}`
      : DBHelper.DATABASE_REVIEWS_URL;
    if (editing) {
      DBHelper.editReview(formData, editing);
    } else {
      DBHelper.updateCachedRestaurantReview(formData);
    }
    return DBHelper.addPendingRequestToQue(url, method, formData);
  }

  static addPendingRequestToQue(url, method, formData) {
    //open database and add request details to the pending store
    return new Promise((resolve, reject) => {
      dbPromise
        .then((db) => {
          const tx = db.transaction('pending', 'readwrite');
          const store = tx.objectStore('pending');
          return store.put({
            data: {
              url,
              method,
              formData,
            },
          });
        })
        .catch((error) => {
          console.log(`Error putting data in pending db: ${error}`);
        })
        .then(
          DBHelper.nextPending((error, json) => {
            if (error) {
              console.log(error);
              return reject(error);
            }
            return resolve(json);
          })
        );
    });
  }

  static nextPending(callback) {
    DBHelper.attemptCommitPending(DBHelper.nextPending)
      .then((j) => {
        console.log(j);
        callback(null, j);
      })
      .catch((error) => {
        console.log(error);
        if (callback) {
          callback(error);
        }
      });
  }

  static attemptCommitPending(callback) {
    // Iterate over the pending items until there is a network failure
    let url;
    let method;
    let body;

    return new Promise((resolve, reject) => {
      dbPromise.then((db) => {
        if (!db.objectStoreNames.length) {
          console.log('DB not available');
          db.close();
          return;
        }
        const tx = db.transaction('pending', 'readwrite');
        const store = tx.objectStore('pending');
        store.openCursor().then((cursor) => {
          if (!cursor) {
            console.log('no more cursors');
            return;
          }
          const value = cursor.value;
          url = value.data.url;
          method = value.data.method;
          body = value.data.formData;

          // If we don't have a parameter then we're on a bad record that should be tossed
          // and then move on
          if (!url || !method || (method === 'POST' && !body)) {
            cursor.delete().then(callback);
            console.log('deleted a bad cursor');
            return;
          }

          const properties = {
            body: JSON.stringify(body),
            method: method,
          };

          fetch(url, properties)
            .then((response) => {
              console.log(response);

              if (!response.ok && !response.redirected) {
                console.log('this is the response and we are offline');
                console.log(response);
                return;
              }
              return response.json().then((json) => {
                const deltx = db.transaction('pending', 'readwrite');
                const store = deltx.objectStore('pending');
                return store.openCursor().then((cursor) => {
                  return cursor.delete().then(() => {
                    console.log(cursor.value);
                    console.log('deleted item from pending store');
                    callback();
                    console.log(json);
                    return resolve(json);
                  });
                });
              });
            })
            .catch((error) => {
              console.log(error);
              return reject('no network');
            });
        });
      });
    });
  }

  static syncRestaurant(restaurant) {
    let url = `https://mwsbackend.herokuapp.com/restaurants/${restaurant.id}/?is_favorite=${restaurant.is_favorite}`;
    let method = 'PUT';
    DBHelper.addPendingRequestToQue(url, method).catch((error) => {
      console.log(
        'error updating restaurant backend data...',
        error,
        restaurant
      );
    });
  }

  static updateRestaurantInDB(new_restaurant) {
    return dbPromise
      .then(function (db) {
        let tx = db.transaction('restaurants', 'readwrite');
        let store = tx.objectStore('restaurants');
        store.put(new_restaurant);
        return tx.complete;
      })
      .then(function () {
        return Promise.resolve(new_restaurant);
      });
  }

  static toggleFavBtn(restaurant_id) {
    return dbPromise
      .then((db) => {
        let tx = db.transaction('restaurants');
        let store = tx.objectStore('restaurants');
        return store.get(restaurant_id);
      })
      .then((restaurant) => {
        console.log(restaurant);
        const new_restaurant = Object.assign({}, restaurant);
        new_restaurant.is_favorite =
          restaurant.is_favorite === 'true' || restaurant.is_favorite === true
            ? 'false'
            : 'true';
        DBHelper.syncRestaurant(new_restaurant);
        return DBHelper.updateRestaurantInDB(new_restaurant);
      })
      .then((new_restaurant) => {
        const favBtn = document.getElementById(`fav-btn-${new_restaurant.id}`);
        if (
          new_restaurant.is_favorite === 'true' ||
          new_restaurant.is_favorite === true
        ) {
          favBtn.innerHTML = 'Favorited!';
          favBtn.style.background = 'hotpink';
        } else {
          favBtn.innerHTML = 'Add to favorite';
          favBtn.style.background = 'grey';
        }
      });
  }

  static deleteCachedReview(review_id) {
    return dbPromise
      .then((db) => {
        let tx = db.transaction('reviews', 'readwrite');
        let store = tx.objectStore('reviews');
        store.delete(review_id);
        console.log('deleted review from idb');
        return tx.complete;
      })
      .catch((error) => {
        console.log('error deleting review: ', error);
      });
  }

  static deleteReview(review_id) {
    const url = `${DBHelper.DATABASE_REVIEWS_URL}/${review_id}`;
    console.log(url);
    const method = 'DELETE';
    DBHelper.deleteCachedReview(review_id);
    return DBHelper.addPendingRequestToQue(url, method);
  }

  static deleteTempReview(temp_id) {
    dbPromise
      .then((db) => {
        let tx = db.transaction('reviews', 'readwrite');
        let store = tx.objectStore('reviews');
        store.delete(temp_id);
        console.log('deleted oldversion of review with old id');
        return tx.complete;
      })
      .catch((error) => {
        console.log('error deleting temp review: ', error);
      });
  }
}
