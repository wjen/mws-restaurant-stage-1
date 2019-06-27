/**
 * Common database helper functions.
 */
import { openDB, deleteDB, wrap, unwrap } from 'idb';

const dbPromise = openDB('rr-db', 3, {
  upgrade(db, oldVersion) {
    switch (oldVersion) {
      case 0:
        const store = db.createObjectStore('restaurants', { keyPath: 'id', });
        store.createIndex('id', 'id');
      case 1:
        const reviewsStore = db.createObjectStore('reviews', {
          keyPath: 'id',
          autoIncrement: true
        });
        reviewsStore.createIndex("restaurant_id", "restaurant_id");
      case 2:
        const pendingStore = db.createObjectStore('pending', {
          keyPath: 'id',
          autoIncrement: true
        })
    }
  }
});

class DBHelper {

  /**
   * Database URL.
   * Change this to restaurants.json file location on your server.
   */
  static get DATABASE_URL() {
    const port = 1337// Change this to your server port
    return `http://localhost:${port}/restaurants`;
  }

  static get DATABASE_REVIEWS_URL() {
    const port = 1337 // Change this to your server port
    return `http://localhost:${port}/reviews`;
  }

  /**
   * Fetch all restaurants.
   */


  static fetchRestaurants(callback) {
    fetch(DBHelper.DATABASE_URL).then(function(response) {
      response.json().then(function(restaurants) {
        callback(null, restaurants);
      });
    });
  }

  static fetchReviews( restaurant_id, callback) {
    let fetchURL = DBHelper.DATABASE_REVIEWS_URL + "/?restaurant_id=" + restaurant_id;
    fetch(fetchURL).then( response => {
      return response.json();
    }).then(reviews => {
        callback(null, reviews);
      }).catch(error => {
        callback(error, null);
      });
  }

  //   static fetchRestaurantReviewsById(id, callback) {
  //   // Fetch all reviews for the specific restaurant
  //   const fetchURL = DBHelper.DATABASE_REVIEWS_URL + "/?restaurant_id=" + id;
  //   fetch(fetchURL, {method: "GET"}).then(response => {
  //     if (!response.clone().ok && !response.clone().redirected) {
  //       throw "No reviews available";
  //     }
  //     response
  //       .json()
  //       .then(result => {
  //         callback(null, result);
  //       })
  //   }).catch(error => callback(error, null));
  // }
  /**
   * Fetch a restaurant by its ID.
   */
  static fetchRestaurantById(id, callback) {
    // fetch all restaurants with proper error handling.
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        const restaurant = restaurants.find(r => r.id == id);
        if (restaurant) { // Got the restaurant
          callback(null, restaurant);
        } else { // Restaurant does not exist in the database
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
        const results = restaurants.filter(r => r.cuisine_type == cuisine);
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
        const results = restaurants.filter(r => r.neighborhood == neighborhood);
        callback(null, results);
      }
    });
  }

  /**
   * Fetch restaurants by a cuisine and a neighborhood with proper error handling.
   */
  static fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood, callback) {
    // Fetch all restaurants
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        let results = restaurants
        if (cuisine != 'all') { // filter by cuisine
          results = results.filter(r => r.cuisine_type == cuisine);
        }
        if (neighborhood != 'all') { // filter by neighborhood
          results = results.filter(r => r.neighborhood == neighborhood);
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
        const neighborhoods = restaurants.map((v, i) => restaurants[i].neighborhood)
        // Remove duplicates from neighborhoods
        const uniqueNeighborhoods = neighborhoods.filter((v, i) => neighborhoods.indexOf(v) == i)
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
        const cuisines = restaurants.map((v, i) => restaurants[i].cuisine_type)
        // Remove duplicates from cuisines
        const uniqueCuisines = cuisines.filter((v, i) => cuisines.indexOf(v) == i)
        callback(null, uniqueCuisines);
      }
    });
  }

  /**
   * Restaurant page URL.
   */
  static urlForRestaurant(restaurant) {
    return (`./restaurant.html?id=${restaurant.id}`);
  }

  /**
   * Restaurant image URL.
   */
  static imageUrlForRestaurant(restaurant) {
    if(!restaurant.photograph) {
      return (`/img/${restaurant.id}.jpg`)
    }
    return (`/img/${restaurant.photograph}.jpg`);
  }

  /**
   * Map marker for a restaurant.
   */
  static mapMarkerForRestaurant(restaurant, map) {
    // https://leafletjs.com/reference-1.3.0.html#marker
    const marker = new L.marker([restaurant.latlng.lat, restaurant.latlng.lng],
      {title: restaurant.name,
      alt: restaurant.name,
      url: DBHelper.urlForRestaurant(restaurant)
      })
      marker.addTo(newMap);
    return marker;
  }

  static updateCachedRestaurantReview(formData) {
    console.log('updating cache for new review', formData);
    return dbPromise.then( db => {
      const tx = db.transaction('reviews', 'readwrite');
      const store = tx.objectStore('reviews');
      console.log('putting review in store');
      store.put(formData);
      console.log('successfully put review in store');
      return tx.done;
    })
  }

  static saveNewReview(formData, callback) {
    // Block any more clicks on the submit button until the callback
    // const btn = document.getElementById("submit-form-btn");
    // btn.onclick = null;
    const url = DBHelper.DATABASE_REVIEWS_URL;
    const method = "POST";
    DBHelper.updateCachedRestaurantReview(formData);
    DBHelper.addPendingRequestToQue(url, method, formData).then(json => {
      callback(null, json);
    });

  }

  static addPendingRequestToQue(url, method, formData) {
    //open database and add request details to the pending store
    return new Promise((resolve, reject) => {
      dbPromise.then(db => {
      const tx = db.transaction('pending', 'readwrite');
      const store = tx.objectStore('pending');
      store.put({
        data: {
          url,
          method,
          formData
        }
      })
    }).catch(error => {
      console.log(error);
    }).then(DBHelper.nextPending((error, json) => {
      console.log(json);
      return resolve(json);
    }));
  });
  }

  static nextPending(callback) {
    DBHelper.attemptCommitPending(DBHelper.nextPending).then(j => {
      console.log(j);
      callback(null, j);
    });
  }

  static attemptCommitPending(callback) {
    // Iterate over the pending items until there is a network failure
    let url;
    let method;
    let body;

    return new Promise( (resolve, reject) => { dbPromise.then(db => {
      if (!db.objectStoreNames.length) {
        console.log("DB not available");
        db.close();
        return;
      }
      const tx = db.transaction('pending', 'readwrite');
      const store = tx.objectStore('pending');
      store.openCursor().then( cursor => {
        if (!cursor) {
            return;
          }
        const value = cursor.value;
        url = cursor.value.data.url;
        method = cursor.value.data.method;
        body = cursor.value.data.formData;


        // If we don't have a parameter then we're on a bad record that should be tossed
        // and then move on
        if ((!url || !method) || (method === "POST" && !body)) {
          cursor
            .delete()
            .then(callback());
          return;
        };

        const properties = {
          body: JSON.stringify(body),
          method: method
        }
        fetch(url, properties).then(response => {
        // If we don't get a good response then assume we're offline
          if (!response.ok && !response.redirected) {
            return;
          }
          return response.json();
        }).then( j => {
          const deltx = db.transaction('pending', 'readwrite');
          const store = deltx.objectStore('pending');
          store.openCursor()
            .then( cursor => {
              cursor.delete()
              .then(() => {
                callback();
                console.log(j);
                return resolve(j);
              })
            })
          console.log('deleted item from pending store');
        }).catch(error => {
          console.log(error);
          return;
        })
      })
    })
    })
  }

  static syncRestaurant(restaurant) {
     try {
       let url = `http://localhost:1337/restaurants/${restaurant.id}/?is_favorite=${restaurant.is_favorite}`;
       let params = {method: 'PUT'};
       return fetch(url, params).then(function(r){ return r.json() });
     }
     catch(e) {
       console.log('error updating restaurant backend data...', e, restaurant);
     }
  }
     static updateRestaurantInDB(new_restaurant) {
       return dbPromise.then(function(db){
         let tx = db.transaction('restaurants', 'readwrite');
         let store = tx.objectStore('restaurants');
         store.put(new_restaurant);
         return tx.complete
       }).then(function(){
          return Promise.resolve(new_restaurant);
       });
     }

  static toggleFavBtn(restaurant_id) {
    return dbPromise.then( db => {
      let tx = db.transaction('restaurants');
      let store = tx.objectStore('restaurants');
      return store.get(restaurant_id);
    }).then( restaurant => {
      console.log(restaurant);
      const new_restaurant = Object.assign({}, restaurant);
      new_restaurant.is_favorite = (restaurant.is_favorite === 'true' || restaurant.is_favorite === true) ?
      'false' : 'true';
      DBHelper.syncRestaurant(new_restaurant);
      return DBHelper.updateRestaurantInDB(new_restaurant);
    }).then( new_restaurant => {
      const favBtn = document.getElementById(`fav-btn-${new_restaurant.id}`);
      if(new_restaurant.is_favorite === 'true' || new_restaurant.is_favorite === true) {
        favBtn.innerHTML = 'Favorited!';
        favBtn.style.background = 'hotpink';
      } else {
        favBtn.innerHTML = 'Add to favorite';
        favBtn.style.background = 'grey';
      }
    })
  }

}

window.DBHelper = DBHelper;

