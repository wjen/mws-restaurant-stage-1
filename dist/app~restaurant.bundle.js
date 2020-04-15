(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["app~restaurant"],{

/***/ "./app/img/rr_icon.png":
/*!*****************************!*\
  !*** ./app/img/rr_icon.png ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "f176306f62d68573ab383dbccd915099.png");

/***/ }),

/***/ "./app/src/dbhelper.js":
/*!*****************************!*\
  !*** ./app/src/dbhelper.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DBHelper; });
/* harmony import */ var idb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! idb */ "./node_modules/idb/build/esm/index.js");
/**
 * Common database helper functions.
 */

const dbPromise = Object(idb__WEBPACK_IMPORTED_MODULE_0__["openDB"])('rr-db', 3, {
  upgrade(db, oldVersion) {
    switch (oldVersion) {
      case 0:
        const store = db.createObjectStore('restaurants', {
          keyPath: 'id'
        });
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
        });
    }
  }

});
class DBHelper {
  /**
   * Database URL.
   * Change this to restaurants.json file location on your server.
   */
  static get DATABASE_URL() {
    const port = 1337; // Change this to your server port

    return `http://localhost:${port}/restaurants`;
  }

  static get DATABASE_REVIEWS_URL() {
    const port = 1337; // Change this to your server port

    return `http://localhost:${port}/reviews`;
  }
  /**
   * Fetch all restaurants.
   */


  static fetchRestaurants(callback) {
    fetch(DBHelper.DATABASE_URL).then(function (response) {
      console.log(response);
      return response.json().then(function (restaurants) {
        callback(null, restaurants);
      });
    });
  }

  static fetchReviews(restaurant_id, callback) {
    let fetchURL = DBHelper.DATABASE_REVIEWS_URL + "/?restaurant_id=" + restaurant_id;
    fetch(fetchURL).then(response => {
      return response.json();
    }).then(reviews => {
      callback(null, reviews);
    }).catch(error => {
      callback(error, null);
    });
  } //   static fetchRestaurantReviewsById(id, callback) {
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
        let results = restaurants;

        if (cuisine != 'all') {
          // filter by cuisine
          results = results.filter(r => r.cuisine_type == cuisine);
        }

        if (neighborhood != 'all') {
          // filter by neighborhood
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
        const neighborhoods = restaurants.map((v, i) => restaurants[i].neighborhood); // Remove duplicates from neighborhoods

        const uniqueNeighborhoods = neighborhoods.filter((v, i) => neighborhoods.indexOf(v) == i);
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
        const cuisines = restaurants.map((v, i) => restaurants[i].cuisine_type); // Remove duplicates from cuisines

        const uniqueCuisines = cuisines.filter((v, i) => cuisines.indexOf(v) == i);
        callback(null, uniqueCuisines);
      }
    });
  }
  /**
   * Restaurant page URL.
   */


  static urlForRestaurant(restaurant) {
    return `./restaurant.html?id=${restaurant.id}`;
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
    const marker = new L.marker([restaurant.latlng.lat, restaurant.latlng.lng], {
      title: restaurant.name,
      alt: restaurant.name,
      url: DBHelper.urlForRestaurant(restaurant)
    });
    marker.addTo(newMap);
    return marker;
  }

  static updateCachedRestaurantReview(formData) {
    console.log('updating cache for new review', formData);
    return dbPromise.then(db => {
      const tx = db.transaction('reviews', 'readwrite');
      const store = tx.objectStore('reviews');
      console.log('putting review in store');
      store.put(formData);
      console.log('successfully put review in store');
      return tx.done;
    });
  }

  static saveNewReview(formData) {
    // Block any more clicks on the submit button until the callback
    // const btn = document.getElementById("submit-form-btn");
    // btn.onclick = null;
    const url = DBHelper.DATABASE_REVIEWS_URL;
    const method = "POST";
    DBHelper.updateCachedRestaurantReview(formData);
    return DBHelper.addPendingRequestToQue(url, method, formData).then(json => json);
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
        });
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
    return new Promise((resolve, reject) => {
      dbPromise.then(db => {
        if (!db.objectStoreNames.length) {
          console.log("DB not available");
          db.close();
          return;
        }

        const tx = db.transaction('pending', 'readwrite');
        const store = tx.objectStore('pending');
        store.openCursor().then(cursor => {
          if (!cursor) {
            return;
          }

          const value = cursor.value;
          url = cursor.value.data.url;
          method = cursor.value.data.method;
          body = cursor.value.data.formData; // If we don't have a parameter then we're on a bad record that should be tossed
          // and then move on

          if (!url || !method || method === "POST" && !body) {
            cursor.delete().then(callback());
            return;
          }

          ;
          const properties = {
            body: JSON.stringify(body),
            method: method
          };
          fetch(url, properties).then(response => {
            // If we don't get a good response then assume we're offline
            if (!response.ok && !response.redirected) {
              console.log('this is the response and we are offline');
              console.log(response);
              return;
            }

            return response.json();
          }).then(j => {
            const deltx = db.transaction('pending', 'readwrite');
            const store = deltx.objectStore('pending');
            store.openCursor().then(cursor => {
              cursor.delete().then(() => {
                callback();
                console.log(j);
                return resolve(j);
              });
            });
            console.log('deleted item from pending store');
          }).catch(error => {
            console.log(error);
            return;
          });
        });
      });
    });
  }

  static syncRestaurant(restaurant) {
    try {
      let url = `http://localhost:1337/restaurants/${restaurant.id}/?is_favorite=${restaurant.is_favorite}`;
      let params = {
        method: 'PUT'
      };
      return fetch(url, params).then(function (r) {
        return r.json();
      });
    } catch (e) {
      console.log('error updating restaurant backend data...', e, restaurant);
    }
  }

  static updateRestaurantInDB(new_restaurant) {
    return dbPromise.then(function (db) {
      let tx = db.transaction('restaurants', 'readwrite');
      let store = tx.objectStore('restaurants');
      store.put(new_restaurant);
      return tx.complete;
    }).then(function () {
      return Promise.resolve(new_restaurant);
    });
  }

  static toggleFavBtn(restaurant_id) {
    return dbPromise.then(db => {
      let tx = db.transaction('restaurants');
      let store = tx.objectStore('restaurants');
      return store.get(restaurant_id);
    }).then(restaurant => {
      console.log(restaurant);
      const new_restaurant = Object.assign({}, restaurant);
      new_restaurant.is_favorite = restaurant.is_favorite === 'true' || restaurant.is_favorite === true ? 'false' : 'true';
      DBHelper.syncRestaurant(new_restaurant);
      return DBHelper.updateRestaurantInDB(new_restaurant);
    }).then(new_restaurant => {
      const favBtn = document.getElementById(`fav-btn-${new_restaurant.id}`);

      if (new_restaurant.is_favorite === 'true' || new_restaurant.is_favorite === true) {
        favBtn.innerHTML = 'Favorited!';
        favBtn.style.background = 'hotpink';
      } else {
        favBtn.innerHTML = 'Add to favorite';
        favBtn.style.background = 'grey';
      }
    });
  }

}

/***/ }),

/***/ "./app/src/styles.css":
/*!****************************!*\
  !*** ./app/src/styles.css ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!./styles.css */ "./node_modules/css-loader/dist/cjs.js!./app/src/styles.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./app/src/styles.css":
/*!******************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./app/src/styles.css ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, "@charset \"utf-8\";\n/* CSS Document */\n* {\n  box-sizing: border-box;\n  margin:0;\n  padding:0;\n}\n\n/* Define base font-size here; most elements will inherit this. */\nhtml{\n    font-size:1em;      /* Assuming 16px... */\n    line-height:1.5;\n    font-family: Arial, Helvetica, sans-serif;\n    color: #333;\n}\n\nbody,td,th,p{\n\tfont-family: Arial, Helvetica, sans-serif;\n\tfont-size: 1em;\n\tcolor: #333;\n\tline-height: 1.5;\n}\nbody {\n  max-width: 1100px;\n\tbackground-color: #fdfdfd;\n\tmargin: 0 auto;\n\tposition:relative;\n}\n\nmain, section {\n  width: 100%;\n}\nul, li {\n\tfont-family: Arial, Helvetica, sans-serif;\n\tfont-size: 16px;\n\tcolor: #333;\n}\na {\n\tcolor: orange;\n\ttext-decoration: none;\n}\na:hover, a:focus {\n\tcolor: #3397db;\n\ttext-decoration: none;\n}\na img{\n\tborder: none 0px #fff;\n}\nh1, h2, h3, h4, h5, h6 {\n  font-family: Arial, Helvetica, sans-serif;\n  margin: 0 0 20px;\n}\narticle, aside, canvas, details, figcaption, figure, footer, header, hgroup, menu, nav, section {\n\tdisplay: block;\n}\n.maincontent {\n  background-color: #f3f3f3;\n  min-height: 100%;\n}\n#footer {\n  background-color: #444;\n  color: #aaa;\n  font-size: 8pt;\n  letter-spacing: 1px;\n  padding: 25px;\n  text-align: center;\n  text-transform: uppercase;\n}\n\n.navigation h1 a:hover, .navigation h1 a:focus, a:focus, a:hover, button:hover,\nbutton:focus {\n  color:rgba(85,172,238 ,1);\n  text-decoration: underline;\n  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .14),\n              0 3px 1px -2px rgba(0, 0, 0, .2),\n              0 1px 5px 0 rgba(0, 0, 0, .12);\n}\n#restaurants-list li button:hover, #restaurants-list li .button:focus,\n.filter-options select:hover, .filter-options select:focus, #submit-form-btn:hover, #submit-form-btn:focus {\n  background-color:rgba(85,172,238 ,1);\n  color: #fff;\n  text-decoration: underline;\n  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .14),\n              0 3px 1px -2px rgba(0, 0, 0, .2),\n              0 1px 5px 0 rgba(0, 0, 0, .12);\n}\n\n/* ====================== Navigation ====================== */\nheader {\n    width: 100%;\n    background: #333;\n}\nul {\n  padding: 0;\n  list-style: none;\n}\n.navigation {\n  display:flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0 10px;\n  color: rgba(117,117,117 ,1);\n}\n.navigation h1 {\n text-align: center;\n font-size: 1em;\n margin-bottom: 0;\n}\n\n.navigation li {\n  height: 100%;\n}\n\n.navigation .navigation__title {\n flex-grow: 1;\n}\n.navigation img {\n  width: 48px;\n  height: 48px;\n  background-color: white;\n}\n.navigation h1 a {\n  color: #fff;\n  font-size: 48px;\n  font-weight: 200;\n  letter-spacing: 10px;\n  margin: 10px auto;\n  font-family: cursive;\n}\n#breadcrumb {\n    padding: 10px;\n    list-style: none;\n    background-color: #eee;\n    font-size: 17px;\n    margin: 0;\n    width: 100%;\n}\n\n/* Display list items side by side */\n#breadcrumb li {\n    display: inline;\n}\n\n/* Add a slash symbol (/) before/behind each list item */\n#breadcrumb li+li:before {\n    padding: 8px;\n    color: black;\n    content: \"/\\00a0\";\n}\n\n/* Add a color to all links inside the list */\n#breadcrumb li a {\n    color: #0275d8;\n    text-decoration: none;\n}\n\n/* Add a color on mouse-over */\n#breadcrumb li a:hover {\n    color: #01447e;\n    text-decoration: underline;\n}\n/* ====================== Map ====================== */\n#map {\n  height: 400px;\n  width: 100%;\n  background-color: #ccc;\n}\n/* ====================== Restaurant Filtering ====================== */\n.filter-options {\n  width: 100%;\n  background-color: #333;\n  align-items: center;\n}\n.filter-options h2 {\n  color: white;\n  font-size: 1rem;\n  font-weight: normal;\n  line-height: 1;\n  margin: 0 10px;\n  padding-top: 10px;\n}\n.filter-options select {\n  background-color: white;\n  border: 1px solid #fff;\n  font-family: Arial,sans-serif;\n  font-size: 11pt;\n  height: 35px;\n  letter-spacing: 0;\n  margin: 10px;\n  padding: 10px;\n  width: 200px;\n}\n.filter-label {\n  display: none;\n}\n\n.filter-section {\n  width: 100%;\n}\n\n/* ====================== Restaurant Listing ====================== */\n\n/*========\n===Flexbox on list and content\n========*/\n\n#restaurants-list {\n  display: flex;\n  flex-wrap: wrap;\n  width: 100%;\n  background-color: #f3f3f3;\n  list-style: outside none none;\n  margin: 0;\n  padding: 30px 15px 60px;\n  text-align: center;\n}\n#restaurants-list li {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  flex-grow: 1;\n  background-color: #fff;\n  border: 2px solid #ccc;\n  font-family: Arial,sans-serif;\n  margin: 15px;\n  min-height: 380px;\n  padding: 0 30px 25px;\n  text-align: left;\n  width: 100%;\n}\n#restaurants-list .restaurant-img {\n  background-color: #ccc;\n  display: block;\n  margin: 0;\n  max-width: 100%;\n  max-height: 300px;\n  min-width: 100%;\n}\n#restaurants-list li h1 {\n  color: #f18200;\n  font-family: Arial,sans-serif;\n  font-size: 14pt;\n  font-weight: 200;\n  letter-spacing: 0;\n  line-height: 1.3;\n  margin: 20px 0 10px;\n  text-transform: uppercase;\n\n}\n#restaurants-list p {\n  margin: 0;\n  font-size: 11pt;\n}\n#restaurants-list li button {\n  background-color: orange;\n  border-bottom: 3px solid #eee;\n  color: #fff;\n  display: inline-block;\n  font-size: 10pt;\n  margin: 15px 0 0;\n  padding: 8px 30px 10px;\n  text-align: center;\n  text-decoration: none;\n  text-transform: uppercase;\n}\n\n\n/* ====================== Restaurant Details ====================== */\n.inside header {\n  /*position: fixed;*/\n  /*top: 0;*/\n  width: 100%;\n  /*z-index: 1000;*/\n}\n.inside #map-container {\n  /*background: blue none repeat scroll 0 0;*/\n  height: 200px;\n  padding-bottom: 10px;\n}\n.inside #map {\n  background-color: #ccc;\n  height: 100%;\n  width: 100%;\n}\n.inside #footer {\n/*  bottom: 0;\n  position: absolute;*/\n  width: 100%;\n}\n#restaurant-name {\n  color: #f18200;\n  font-family: Arial,sans-serif;\n  font-size: 24pt;\n  font-weight: 200;\n  letter-spacing: 0;\n  margin: 10px auto;\n  text-transform: uppercase;\n  line-height: 1.1;\n}\n#restaurant-img {\n\twidth: 100%;\n  max-height: 80vh;\n}\n#restaurant-address {\n  font-size: 1.3em;\n  margin: 10px 0px;\n  width: 50%;\n}\n#restaurant-cuisine {\n  background-color: #333;\n  color: #ddd;\n  font-size: 1.2em;\n  font-weight: 300;\n  letter-spacing: 10px;\n  margin: 0 0 20px;\n  padding: 2px 0;\n  text-align: center;\n  text-transform: uppercase;\n\twidth: 100%;\n}\n#restaurant-container, #reviews-container, #reviews-form-container{\n  border-bottom: 1px solid #d9d9d9;\n  border-top: 1px solid #fff;\n  padding: 20px;\n  width: 100%;\n  display:flex;\n  flex-wrap: wrap;\n  justify-content: center;\n}\n#reviews-container, #reviews-form-container {\n  padding: 30px 40px 40px;\n}\n#reviews-container h2, #reviews-form-container h2 {\n  color: #f58500;\n  font-size: 24pt;\n  font-weight: 300;\n  letter-spacing: -1px;\n  padding-bottom: 1pt;\n  margin: 0 auto;\n}\n#reviews-list {\n  margin: 0;\n  padding: 0;\n}\n#reviews-list li {\n  background-color: #fff;\n  border: 2px solid #f3f3f3;\n  display: block;\n  list-style-type: none;\n  margin: 0 0 30px;\n  overflow: hidden;\n  padding: 10px 20px 20px;\n  /*position: relative;*/\n  width: 100%;\n}\n#reviews-list li p {\n  margin: 0 0 10px;\n}\n#restaurant-hours {\n  width: 50%;\n}\n#restaurant-hours td {\n  color: #666;\n  font-size: 1em;\n}\n\n#create-edit-review-form {\n  width: 100%;\n}\n#create-edit-review-form label {\n  display: block;\n  margin: 0 auto;\n  text-align: center;\n  font-size: 1rem;\n}\n\n#create-edit-review-form input, #create-edit-review-form textarea {\n  display: block;\n  margin: 0 auto;\n  border: 1px solid gray;\n  padding: 5px;\n  width: 50%;\n}\n\n.submit-form-button {\n    display:block;\n    color: white;\n    background: orange;\n    padding: 10px;\n    width: 20%;\n    margin: 10px;\n    text-align: center;\n}\n\n/*//////////\n// Media Queries\n//////////*/\n\n@media screen and (min-width: 1000px) {\n  #restaurants-list li {\n    max-width: 30%;\n  }\n}\n@media screen and (max-width: 999px) and (min-width: 671px) {\n  #restaurants-list li {\n    min-width: 290px;\n    width: 45%;\n    max-width: 45%;\n  }\n}\n\n@media screen and (max-width: 670px) {\n  header {\n    /*min-height: 50px;*/\n  }\n  #restaurants-list li {\n    max-width: 80%;\n    margin: 8px auto;\n  }\n  .navigation h1 a{\n    font-size: 2.6em;\n  }\n  .navigation img {\n    width: 30px;\n    height: 30px;\n  }\n}\n\n@media screen and (max-width: 540px) {\n\n  .navigation h1 a{\n    font-size: 1.7em;\n    display: inline-block;\n  }\n  .navigation img {\n    display: none;\n  }\n  .filter-options select {\n    width: 50%);\n  }\n  #restaurant-container h1, #reviews-container h2 {\n    font-size: 1.5em;\n  }\n  #restaurant-img {\n    width: 100%;\n    height: 400px;\n  }\n  #restaurant-address {\n    width: 100%;\n  }\n  #restaurant-hours {\n    width: 100%;\n  }\n  #restaurant-hours td {\n    font-size: 1em;\n  }\n  #restaurant-cuisine {\n    font-size: 1em;\n  }\n}\n@media screen and (max-width: 450px) {\n  .filter-options select {\n    width: calc(100% - 24px);\n    margin: 10px;\n  }\n  #reviews-container {\n    padding: 0;\n  }\n}\n", ""]);



/***/ }),

/***/ "./node_modules/webpack/hot sync ^\\.\\/log$":
/*!*************************************************!*\
  !*** (webpack)/hot sync nonrecursive ^\.\/log$ ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./log": "./node_modules/webpack/hot/log.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./node_modules/webpack/hot sync ^\\.\\/log$";

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAvaW1nL3JyX2ljb24ucG5nIiwid2VicGFjazovLy8uL2FwcC9zcmMvZGJoZWxwZXIuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NyYy9zdHlsZXMuY3NzPzhkYzUiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NyYy9zdHlsZXMuY3NzIiwid2VicGFjazovLy8od2VicGFjaykvaG90IHN5bmMgbm9ucmVjdXJzaXZlIF5cXC5cXC9sb2ckIl0sIm5hbWVzIjpbImRiUHJvbWlzZSIsIm9wZW5EQiIsInVwZ3JhZGUiLCJkYiIsIm9sZFZlcnNpb24iLCJzdG9yZSIsImNyZWF0ZU9iamVjdFN0b3JlIiwia2V5UGF0aCIsImNyZWF0ZUluZGV4IiwicmV2aWV3c1N0b3JlIiwiYXV0b0luY3JlbWVudCIsInBlbmRpbmdTdG9yZSIsIkRCSGVscGVyIiwiREFUQUJBU0VfVVJMIiwicG9ydCIsIkRBVEFCQVNFX1JFVklFV1NfVVJMIiwiZmV0Y2hSZXN0YXVyYW50cyIsImNhbGxiYWNrIiwiZmV0Y2giLCJ0aGVuIiwicmVzcG9uc2UiLCJjb25zb2xlIiwibG9nIiwianNvbiIsInJlc3RhdXJhbnRzIiwiZmV0Y2hSZXZpZXdzIiwicmVzdGF1cmFudF9pZCIsImZldGNoVVJMIiwicmV2aWV3cyIsImNhdGNoIiwiZXJyb3IiLCJmZXRjaFJlc3RhdXJhbnRCeUlkIiwiaWQiLCJyZXN0YXVyYW50IiwiZmluZCIsInIiLCJmZXRjaFJlc3RhdXJhbnRCeUN1aXNpbmUiLCJjdWlzaW5lIiwicmVzdWx0cyIsImZpbHRlciIsImN1aXNpbmVfdHlwZSIsImZldGNoUmVzdGF1cmFudEJ5TmVpZ2hib3Job29kIiwibmVpZ2hib3Job29kIiwiZmV0Y2hSZXN0YXVyYW50QnlDdWlzaW5lQW5kTmVpZ2hib3Job29kIiwiZmV0Y2hOZWlnaGJvcmhvb2RzIiwibmVpZ2hib3Job29kcyIsIm1hcCIsInYiLCJpIiwidW5pcXVlTmVpZ2hib3Job29kcyIsImluZGV4T2YiLCJmZXRjaEN1aXNpbmVzIiwiY3Vpc2luZXMiLCJ1bmlxdWVDdWlzaW5lcyIsInVybEZvclJlc3RhdXJhbnQiLCJpbWFnZVVybEZvclJlc3RhdXJhbnQiLCJwaG90b2dyYXBoIiwibWFwTWFya2VyRm9yUmVzdGF1cmFudCIsIm1hcmtlciIsIkwiLCJsYXRsbmciLCJsYXQiLCJsbmciLCJ0aXRsZSIsIm5hbWUiLCJhbHQiLCJ1cmwiLCJhZGRUbyIsIm5ld01hcCIsInVwZGF0ZUNhY2hlZFJlc3RhdXJhbnRSZXZpZXciLCJmb3JtRGF0YSIsInR4IiwidHJhbnNhY3Rpb24iLCJvYmplY3RTdG9yZSIsInB1dCIsImRvbmUiLCJzYXZlTmV3UmV2aWV3IiwibWV0aG9kIiwiYWRkUGVuZGluZ1JlcXVlc3RUb1F1ZSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiZGF0YSIsIm5leHRQZW5kaW5nIiwiYXR0ZW1wdENvbW1pdFBlbmRpbmciLCJqIiwiYm9keSIsIm9iamVjdFN0b3JlTmFtZXMiLCJsZW5ndGgiLCJjbG9zZSIsIm9wZW5DdXJzb3IiLCJjdXJzb3IiLCJ2YWx1ZSIsImRlbGV0ZSIsInByb3BlcnRpZXMiLCJKU09OIiwic3RyaW5naWZ5Iiwib2siLCJyZWRpcmVjdGVkIiwiZGVsdHgiLCJzeW5jUmVzdGF1cmFudCIsImlzX2Zhdm9yaXRlIiwicGFyYW1zIiwiZSIsInVwZGF0ZVJlc3RhdXJhbnRJbkRCIiwibmV3X3Jlc3RhdXJhbnQiLCJjb21wbGV0ZSIsInRvZ2dsZUZhdkJ0biIsImdldCIsIk9iamVjdCIsImFzc2lnbiIsImZhdkJ0biIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJpbm5lckhUTUwiLCJzdHlsZSIsImJhY2tncm91bmQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUFlLG9GQUF1Qix5Q0FBeUMsRTs7Ozs7Ozs7Ozs7O0FDQS9FO0FBQUE7QUFBQTtBQUFBOzs7QUFHQTtBQUVBLE1BQU1BLFNBQVMsR0FBR0Msa0RBQU0sQ0FBQyxPQUFELEVBQVUsQ0FBVixFQUFhO0FBQ25D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S0FBSyxHQUFHLDBDQUEwQyxZQUFZLHlCQUF5QixPQUFPLDBCQUEwQixxQkFBcUIsdUJBQXVCLEtBQUsscUJBQXFCLHVCQUF1QixLQUFLLHFCQUFxQixrQkFBa0IsbUJBQW1CLEtBQUssR0FBRywwQ0FBMEMsdUJBQXVCLHVCQUF1Qiw0QkFBNEIsS0FBSyxxQkFBcUIsb0JBQW9CLEtBQUssNEJBQTRCLGtCQUFrQixLQUFLLHFEQUFxRCx1QkFBdUIsS0FBSyxxQkFBcUIsa0JBQWtCLG9CQUFvQixLQUFLLHlCQUF5QixrQkFBa0IsS0FBSyx1QkFBdUIsa0JBQWtCLEtBQUssMEJBQTBCLHFCQUFxQixLQUFLLHlCQUF5QixxQkFBcUIsS0FBSyxHQUFHLHdDQUF3Qyw0QkFBNEIsK0JBQStCLG1CQUFtQixLQUFLLHdCQUF3QixpQkFBaUIsS0FBSyxHQUFHOzs7Ozs7Ozs7Ozs7O0FDRjNtUztBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrRSIsImZpbGUiOiJhcHB+cmVzdGF1cmFudC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiZjE3NjMwNmY2MmQ2ODU3M2FiMzgzZGJjY2Q5MTUwOTkucG5nXCI7IiwiLyoqXG4gKiBDb21tb24gZGF0YWJhc2UgaGVscGVyIGZ1bmN0aW9ucy5cbiAqL1xuaW1wb3J0IHsgb3BlbkRCLCBkZWxldGVEQiwgd3JhcCwgdW53cmFwIH0gZnJvbSAnaWRiJztcblxuY29uc3QgZGJQcm9taXNlID0gb3BlbkRCKCdyci1kYicsIDMsIHtcbiAgdXBncmFkZShkYiwgb2xkVmVyc2lvbikge1xuICAgIHN3aXRjaCAob2xkVmVyc2lvbikge1xuICAgICAgY2FzZSAwOlxuICAgICAgICBjb25zdCBzdG9yZSA9IGRiLmNyZWF0ZU9iamVjdFN0b3JlKCdyZXN0YXVyYW50cycsIHsga2V5UGF0aDogJ2lkJywgfSk7XG4gICAgICAgIHN0b3JlLmNyZWF0ZUluZGV4KCdpZCcsICdpZCcpO1xuICAgICAgY2FzZSAxOlxuICAgICAgICBjb25zdCByZXZpZXdzU3RvcmUgPSBkYi5jcmVhdGVPYmplY3RTdG9yZSgncmV2aWV3cycsIHtcbiAgICAgICAgICBrZXlQYXRoOiAnaWQnLFxuICAgICAgICAgIGF1dG9JbmNyZW1lbnQ6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgIHJldmlld3NTdG9yZS5jcmVhdGVJbmRleChcInJlc3RhdXJhbnRfaWRcIiwgXCJyZXN0YXVyYW50X2lkXCIpO1xuICAgICAgY2FzZSAyOlxuICAgICAgICBjb25zdCBwZW5kaW5nU3RvcmUgPSBkYi5jcmVhdGVPYmplY3RTdG9yZSgncGVuZGluZycsIHtcbiAgICAgICAgICBrZXlQYXRoOiAnaWQnLFxuICAgICAgICAgIGF1dG9JbmNyZW1lbnQ6IHRydWVcbiAgICAgICAgfSlcbiAgICB9XG4gIH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEQkhlbHBlciB7XG5cbiAgLyoqXG4gICAqIERhdGFiYXNlIFVSTC5cbiAgICogQ2hhbmdlIHRoaXMgdG8gcmVzdGF1cmFudHMuanNvbiBmaWxlIGxvY2F0aW9uIG9uIHlvdXIgc2VydmVyLlxuICAgKi9cbiAgc3RhdGljIGdldCBEQVRBQkFTRV9VUkwoKSB7XG4gICAgY29uc3QgcG9ydCA9IDEzMzcvLyBDaGFuZ2UgdGhpcyB0byB5b3VyIHNlcnZlciBwb3J0XG4gICAgcmV0dXJuIGBodHRwOi8vbG9jYWxob3N0OiR7cG9ydH0vcmVzdGF1cmFudHNgO1xuICB9XG5cbiAgc3RhdGljIGdldCBEQVRBQkFTRV9SRVZJRVdTX1VSTCgpIHtcbiAgICBjb25zdCBwb3J0ID0gMTMzNyAvLyBDaGFuZ2UgdGhpcyB0byB5b3VyIHNlcnZlciBwb3J0XG4gICAgcmV0dXJuIGBodHRwOi8vbG9jYWxob3N0OiR7cG9ydH0vcmV2aWV3c2A7XG4gIH1cblxuICAvKipcbiAgICogRmV0Y2ggYWxsIHJlc3RhdXJhbnRzLlxuICAgKi9cblxuXG4gIHN0YXRpYyBmZXRjaFJlc3RhdXJhbnRzKGNhbGxiYWNrKSB7XG4gICAgZmV0Y2goREJIZWxwZXIuREFUQUJBU0VfVVJMKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpLnRoZW4oZnVuY3Rpb24ocmVzdGF1cmFudHMpIHtcbiAgICAgICAgY2FsbGJhY2sobnVsbCwgcmVzdGF1cmFudHMpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgZmV0Y2hSZXZpZXdzKCByZXN0YXVyYW50X2lkLCBjYWxsYmFjaykge1xuICAgIGxldCBmZXRjaFVSTCA9IERCSGVscGVyLkRBVEFCQVNFX1JFVklFV1NfVVJMICsgXCIvP3Jlc3RhdXJhbnRfaWQ9XCIgKyByZXN0YXVyYW50X2lkO1xuICAgIGZldGNoKGZldGNoVVJMKS50aGVuKCByZXNwb25zZSA9PiB7XG4gICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgIH0pLnRoZW4ocmV2aWV3cyA9PiB7XG4gICAgICAgIGNhbGxiYWNrKG51bGwsIHJldmlld3MpO1xuICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBjYWxsYmFjayhlcnJvciwgbnVsbCk7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8vICAgc3RhdGljIGZldGNoUmVzdGF1cmFudFJldmlld3NCeUlkKGlkLCBjYWxsYmFjaykge1xuICAvLyAgIC8vIEZldGNoIGFsbCByZXZpZXdzIGZvciB0aGUgc3BlY2lmaWMgcmVzdGF1cmFudFxuICAvLyAgIGNvbnN0IGZldGNoVVJMID0gREJIZWxwZXIuREFUQUJBU0VfUkVWSUVXU19VUkwgKyBcIi8/cmVzdGF1cmFudF9pZD1cIiArIGlkO1xuICAvLyAgIGZldGNoKGZldGNoVVJMLCB7bWV0aG9kOiBcIkdFVFwifSkudGhlbihyZXNwb25zZSA9PiB7XG4gIC8vICAgICBpZiAoIXJlc3BvbnNlLmNsb25lKCkub2sgJiYgIXJlc3BvbnNlLmNsb25lKCkucmVkaXJlY3RlZCkge1xuICAvLyAgICAgICB0aHJvdyBcIk5vIHJldmlld3MgYXZhaWxhYmxlXCI7XG4gIC8vICAgICB9XG4gIC8vICAgICByZXNwb25zZVxuICAvLyAgICAgICAuanNvbigpXG4gIC8vICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gIC8vICAgICAgICAgY2FsbGJhY2sobnVsbCwgcmVzdWx0KTtcbiAgLy8gICAgICAgfSlcbiAgLy8gICB9KS5jYXRjaChlcnJvciA9PiBjYWxsYmFjayhlcnJvciwgbnVsbCkpO1xuICAvLyB9XG4gIC8qKlxuICAgKiBGZXRjaCBhIHJlc3RhdXJhbnQgYnkgaXRzIElELlxuICAgKi9cbiAgc3RhdGljIGZldGNoUmVzdGF1cmFudEJ5SWQoaWQsIGNhbGxiYWNrKSB7XG4gICAgLy8gZmV0Y2ggYWxsIHJlc3RhdXJhbnRzIHdpdGggcHJvcGVyIGVycm9yIGhhbmRsaW5nLlxuICAgIERCSGVscGVyLmZldGNoUmVzdGF1cmFudHMoKGVycm9yLCByZXN0YXVyYW50cykgPT4ge1xuICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgIGNhbGxiYWNrKGVycm9yLCBudWxsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHJlc3RhdXJhbnQgPSByZXN0YXVyYW50cy5maW5kKHIgPT4gci5pZCA9PSBpZCk7XG4gICAgICAgIGlmIChyZXN0YXVyYW50KSB7IC8vIEdvdCB0aGUgcmVzdGF1cmFudFxuICAgICAgICAgIGNhbGxiYWNrKG51bGwsIHJlc3RhdXJhbnQpO1xuICAgICAgICB9IGVsc2UgeyAvLyBSZXN0YXVyYW50IGRvZXMgbm90IGV4aXN0IGluIHRoZSBkYXRhYmFzZVxuICAgICAgICAgIGNhbGxiYWNrKCdSZXN0YXVyYW50IGRvZXMgbm90IGV4aXN0JywgbnVsbCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGZXRjaCByZXN0YXVyYW50cyBieSBhIGN1aXNpbmUgdHlwZSB3aXRoIHByb3BlciBlcnJvciBoYW5kbGluZy5cbiAgICovXG4gIHN0YXRpYyBmZXRjaFJlc3RhdXJhbnRCeUN1aXNpbmUoY3Vpc2luZSwgY2FsbGJhY2spIHtcbiAgICAvLyBGZXRjaCBhbGwgcmVzdGF1cmFudHMgIHdpdGggcHJvcGVyIGVycm9yIGhhbmRsaW5nXG4gICAgREJIZWxwZXIuZmV0Y2hSZXN0YXVyYW50cygoZXJyb3IsIHJlc3RhdXJhbnRzKSA9PiB7XG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgY2FsbGJhY2soZXJyb3IsIG51bGwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gRmlsdGVyIHJlc3RhdXJhbnRzIHRvIGhhdmUgb25seSBnaXZlbiBjdWlzaW5lIHR5cGVcbiAgICAgICAgY29uc3QgcmVzdWx0cyA9IHJlc3RhdXJhbnRzLmZpbHRlcihyID0+IHIuY3Vpc2luZV90eXBlID09IGN1aXNpbmUpO1xuICAgICAgICBjYWxsYmFjayhudWxsLCByZXN1bHRzKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGZXRjaCByZXN0YXVyYW50cyBieSBhIG5laWdoYm9yaG9vZCB3aXRoIHByb3BlciBlcnJvciBoYW5kbGluZy5cbiAgICovXG4gIHN0YXRpYyBmZXRjaFJlc3RhdXJhbnRCeU5laWdoYm9yaG9vZChuZWlnaGJvcmhvb2QsIGNhbGxiYWNrKSB7XG4gICAgLy8gRmV0Y2ggYWxsIHJlc3RhdXJhbnRzXG4gICAgREJIZWxwZXIuZmV0Y2hSZXN0YXVyYW50cygoZXJyb3IsIHJlc3RhdXJhbnRzKSA9PiB7XG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgY2FsbGJhY2soZXJyb3IsIG51bGwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gRmlsdGVyIHJlc3RhdXJhbnRzIHRvIGhhdmUgb25seSBnaXZlbiBuZWlnaGJvcmhvb2RcbiAgICAgICAgY29uc3QgcmVzdWx0cyA9IHJlc3RhdXJhbnRzLmZpbHRlcihyID0+IHIubmVpZ2hib3Job29kID09IG5laWdoYm9yaG9vZCk7XG4gICAgICAgIGNhbGxiYWNrKG51bGwsIHJlc3VsdHMpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEZldGNoIHJlc3RhdXJhbnRzIGJ5IGEgY3Vpc2luZSBhbmQgYSBuZWlnaGJvcmhvb2Qgd2l0aCBwcm9wZXIgZXJyb3IgaGFuZGxpbmcuXG4gICAqL1xuICBzdGF0aWMgZmV0Y2hSZXN0YXVyYW50QnlDdWlzaW5lQW5kTmVpZ2hib3Job29kKGN1aXNpbmUsIG5laWdoYm9yaG9vZCwgY2FsbGJhY2spIHtcbiAgICAvLyBGZXRjaCBhbGwgcmVzdGF1cmFudHNcbiAgICBEQkhlbHBlci5mZXRjaFJlc3RhdXJhbnRzKChlcnJvciwgcmVzdGF1cmFudHMpID0+IHtcbiAgICAgIGlmIChlcnJvcikge1xuICAgICAgICBjYWxsYmFjayhlcnJvciwgbnVsbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgcmVzdWx0cyA9IHJlc3RhdXJhbnRzXG4gICAgICAgIGlmIChjdWlzaW5lICE9ICdhbGwnKSB7IC8vIGZpbHRlciBieSBjdWlzaW5lXG4gICAgICAgICAgcmVzdWx0cyA9IHJlc3VsdHMuZmlsdGVyKHIgPT4gci5jdWlzaW5lX3R5cGUgPT0gY3Vpc2luZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5laWdoYm9yaG9vZCAhPSAnYWxsJykgeyAvLyBmaWx0ZXIgYnkgbmVpZ2hib3Job29kXG4gICAgICAgICAgcmVzdWx0cyA9IHJlc3VsdHMuZmlsdGVyKHIgPT4gci5uZWlnaGJvcmhvb2QgPT0gbmVpZ2hib3Job29kKTtcbiAgICAgICAgfVxuICAgICAgICBjYWxsYmFjayhudWxsLCByZXN1bHRzKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGZXRjaCBhbGwgbmVpZ2hib3Job29kcyB3aXRoIHByb3BlciBlcnJvciBoYW5kbGluZy5cbiAgICovXG4gIHN0YXRpYyBmZXRjaE5laWdoYm9yaG9vZHMoY2FsbGJhY2spIHtcbiAgICAvLyBGZXRjaCBhbGwgcmVzdGF1cmFudHNcbiAgICBEQkhlbHBlci5mZXRjaFJlc3RhdXJhbnRzKChlcnJvciwgcmVzdGF1cmFudHMpID0+IHtcbiAgICAgIGlmIChlcnJvcikge1xuICAgICAgICBjYWxsYmFjayhlcnJvciwgbnVsbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBHZXQgYWxsIG5laWdoYm9yaG9vZHMgZnJvbSBhbGwgcmVzdGF1cmFudHNcbiAgICAgICAgY29uc3QgbmVpZ2hib3Job29kcyA9IHJlc3RhdXJhbnRzLm1hcCgodiwgaSkgPT4gcmVzdGF1cmFudHNbaV0ubmVpZ2hib3Job29kKVxuICAgICAgICAvLyBSZW1vdmUgZHVwbGljYXRlcyBmcm9tIG5laWdoYm9yaG9vZHNcbiAgICAgICAgY29uc3QgdW5pcXVlTmVpZ2hib3Job29kcyA9IG5laWdoYm9yaG9vZHMuZmlsdGVyKCh2LCBpKSA9PiBuZWlnaGJvcmhvb2RzLmluZGV4T2YodikgPT0gaSlcbiAgICAgICAgY2FsbGJhY2sobnVsbCwgdW5pcXVlTmVpZ2hib3Job29kcyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogRmV0Y2ggYWxsIGN1aXNpbmVzIHdpdGggcHJvcGVyIGVycm9yIGhhbmRsaW5nLlxuICAgKi9cbiAgc3RhdGljIGZldGNoQ3Vpc2luZXMoY2FsbGJhY2spIHtcbiAgICAvLyBGZXRjaCBhbGwgcmVzdGF1cmFudHNcbiAgICBEQkhlbHBlci5mZXRjaFJlc3RhdXJhbnRzKChlcnJvciwgcmVzdGF1cmFudHMpID0+IHtcbiAgICAgIGlmIChlcnJvcikge1xuICAgICAgICBjYWxsYmFjayhlcnJvciwgbnVsbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBHZXQgYWxsIGN1aXNpbmVzIGZyb20gYWxsIHJlc3RhdXJhbnRzXG4gICAgICAgIGNvbnN0IGN1aXNpbmVzID0gcmVzdGF1cmFudHMubWFwKCh2LCBpKSA9PiByZXN0YXVyYW50c1tpXS5jdWlzaW5lX3R5cGUpXG4gICAgICAgIC8vIFJlbW92ZSBkdXBsaWNhdGVzIGZyb20gY3Vpc2luZXNcbiAgICAgICAgY29uc3QgdW5pcXVlQ3Vpc2luZXMgPSBjdWlzaW5lcy5maWx0ZXIoKHYsIGkpID0+IGN1aXNpbmVzLmluZGV4T2YodikgPT0gaSlcbiAgICAgICAgY2FsbGJhY2sobnVsbCwgdW5pcXVlQ3Vpc2luZXMpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc3RhdXJhbnQgcGFnZSBVUkwuXG4gICAqL1xuICBzdGF0aWMgdXJsRm9yUmVzdGF1cmFudChyZXN0YXVyYW50KSB7XG4gICAgcmV0dXJuIChgLi9yZXN0YXVyYW50Lmh0bWw/aWQ9JHtyZXN0YXVyYW50LmlkfWApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc3RhdXJhbnQgaW1hZ2UgVVJMLlxuICAgKi9cbiAgc3RhdGljIGltYWdlVXJsRm9yUmVzdGF1cmFudChyZXN0YXVyYW50KSB7XG4gICAgaWYoIXJlc3RhdXJhbnQucGhvdG9ncmFwaCkge1xuICAgICAgcmV0dXJuIChgL2ltZy8ke3Jlc3RhdXJhbnQuaWR9LmpwZ2ApXG4gICAgfVxuICAgIHJldHVybiAoYC9pbWcvJHtyZXN0YXVyYW50LnBob3RvZ3JhcGh9LmpwZ2ApO1xuICB9XG5cbiAgLyoqXG4gICAqIE1hcCBtYXJrZXIgZm9yIGEgcmVzdGF1cmFudC5cbiAgICovXG4gIHN0YXRpYyBtYXBNYXJrZXJGb3JSZXN0YXVyYW50KHJlc3RhdXJhbnQsIG1hcCkge1xuICAgIC8vIGh0dHBzOi8vbGVhZmxldGpzLmNvbS9yZWZlcmVuY2UtMS4zLjAuaHRtbCNtYXJrZXJcbiAgICBjb25zdCBtYXJrZXIgPSBuZXcgTC5tYXJrZXIoW3Jlc3RhdXJhbnQubGF0bG5nLmxhdCwgcmVzdGF1cmFudC5sYXRsbmcubG5nXSxcbiAgICAgIHt0aXRsZTogcmVzdGF1cmFudC5uYW1lLFxuICAgICAgYWx0OiByZXN0YXVyYW50Lm5hbWUsXG4gICAgICB1cmw6IERCSGVscGVyLnVybEZvclJlc3RhdXJhbnQocmVzdGF1cmFudClcbiAgICAgIH0pXG4gICAgICBtYXJrZXIuYWRkVG8obmV3TWFwKTtcbiAgICByZXR1cm4gbWFya2VyO1xuICB9XG5cbiAgc3RhdGljIHVwZGF0ZUNhY2hlZFJlc3RhdXJhbnRSZXZpZXcoZm9ybURhdGEpIHtcbiAgICBjb25zb2xlLmxvZygndXBkYXRpbmcgY2FjaGUgZm9yIG5ldyByZXZpZXcnLCBmb3JtRGF0YSk7XG4gICAgcmV0dXJuIGRiUHJvbWlzZS50aGVuKCBkYiA9PiB7XG4gICAgICBjb25zdCB0eCA9IGRiLnRyYW5zYWN0aW9uKCdyZXZpZXdzJywgJ3JlYWR3cml0ZScpO1xuICAgICAgY29uc3Qgc3RvcmUgPSB0eC5vYmplY3RTdG9yZSgncmV2aWV3cycpO1xuICAgICAgY29uc29sZS5sb2coJ3B1dHRpbmcgcmV2aWV3IGluIHN0b3JlJyk7XG4gICAgICBzdG9yZS5wdXQoZm9ybURhdGEpO1xuICAgICAgY29uc29sZS5sb2coJ3N1Y2Nlc3NmdWxseSBwdXQgcmV2aWV3IGluIHN0b3JlJyk7XG4gICAgICByZXR1cm4gdHguZG9uZTtcbiAgICB9KVxuICB9XG5cbiAgc3RhdGljIHNhdmVOZXdSZXZpZXcoZm9ybURhdGEpIHtcbiAgICAvLyBCbG9jayBhbnkgbW9yZSBjbGlja3Mgb24gdGhlIHN1Ym1pdCBidXR0b24gdW50aWwgdGhlIGNhbGxiYWNrXG4gICAgLy8gY29uc3QgYnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdWJtaXQtZm9ybS1idG5cIik7XG4gICAgLy8gYnRuLm9uY2xpY2sgPSBudWxsO1xuICAgIGNvbnN0IHVybCA9IERCSGVscGVyLkRBVEFCQVNFX1JFVklFV1NfVVJMO1xuICAgIGNvbnN0IG1ldGhvZCA9IFwiUE9TVFwiO1xuICAgIERCSGVscGVyLnVwZGF0ZUNhY2hlZFJlc3RhdXJhbnRSZXZpZXcoZm9ybURhdGEpO1xuICAgIHJldHVybiBEQkhlbHBlci5hZGRQZW5kaW5nUmVxdWVzdFRvUXVlKHVybCwgbWV0aG9kLCBmb3JtRGF0YSkudGhlbihqc29uID0+IGpzb24pO1xuXG4gIH1cblxuICBzdGF0aWMgYWRkUGVuZGluZ1JlcXVlc3RUb1F1ZSh1cmwsIG1ldGhvZCwgZm9ybURhdGEpIHtcbiAgICAvL29wZW4gZGF0YWJhc2UgYW5kIGFkZCByZXF1ZXN0IGRldGFpbHMgdG8gdGhlIHBlbmRpbmcgc3RvcmVcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgZGJQcm9taXNlLnRoZW4oZGIgPT4ge1xuICAgICAgY29uc3QgdHggPSBkYi50cmFuc2FjdGlvbigncGVuZGluZycsICdyZWFkd3JpdGUnKTtcbiAgICAgIGNvbnN0IHN0b3JlID0gdHgub2JqZWN0U3RvcmUoJ3BlbmRpbmcnKTtcbiAgICAgIHN0b3JlLnB1dCh7XG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICB1cmwsXG4gICAgICAgICAgbWV0aG9kLFxuICAgICAgICAgIGZvcm1EYXRhXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgIH0pLnRoZW4oREJIZWxwZXIubmV4dFBlbmRpbmcoKGVycm9yLCBqc29uKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhqc29uKTtcbiAgICAgIHJldHVybiByZXNvbHZlKGpzb24pO1xuICAgIH0pKTtcbiAgfSk7XG4gIH1cblxuICBzdGF0aWMgbmV4dFBlbmRpbmcoY2FsbGJhY2spIHtcbiAgICBEQkhlbHBlci5hdHRlbXB0Q29tbWl0UGVuZGluZyhEQkhlbHBlci5uZXh0UGVuZGluZykudGhlbihqID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGopO1xuICAgICAgY2FsbGJhY2sobnVsbCwgaik7XG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgYXR0ZW1wdENvbW1pdFBlbmRpbmcoY2FsbGJhY2spIHtcbiAgICAvLyBJdGVyYXRlIG92ZXIgdGhlIHBlbmRpbmcgaXRlbXMgdW50aWwgdGhlcmUgaXMgYSBuZXR3b3JrIGZhaWx1cmVcbiAgICBsZXQgdXJsO1xuICAgIGxldCBtZXRob2Q7XG4gICAgbGV0IGJvZHk7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoIChyZXNvbHZlLCByZWplY3QpID0+IHsgZGJQcm9taXNlLnRoZW4oZGIgPT4ge1xuICAgICAgaWYgKCFkYi5vYmplY3RTdG9yZU5hbWVzLmxlbmd0aCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkRCIG5vdCBhdmFpbGFibGVcIik7XG4gICAgICAgIGRiLmNsb3NlKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHR4ID0gZGIudHJhbnNhY3Rpb24oJ3BlbmRpbmcnLCAncmVhZHdyaXRlJyk7XG4gICAgICBjb25zdCBzdG9yZSA9IHR4Lm9iamVjdFN0b3JlKCdwZW5kaW5nJyk7XG4gICAgICBzdG9yZS5vcGVuQ3Vyc29yKCkudGhlbiggY3Vyc29yID0+IHtcbiAgICAgICAgaWYgKCFjdXJzb3IpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgIGNvbnN0IHZhbHVlID0gY3Vyc29yLnZhbHVlO1xuICAgICAgICB1cmwgPSBjdXJzb3IudmFsdWUuZGF0YS51cmw7XG4gICAgICAgIG1ldGhvZCA9IGN1cnNvci52YWx1ZS5kYXRhLm1ldGhvZDtcbiAgICAgICAgYm9keSA9IGN1cnNvci52YWx1ZS5kYXRhLmZvcm1EYXRhO1xuXG5cbiAgICAgICAgLy8gSWYgd2UgZG9uJ3QgaGF2ZSBhIHBhcmFtZXRlciB0aGVuIHdlJ3JlIG9uIGEgYmFkIHJlY29yZCB0aGF0IHNob3VsZCBiZSB0b3NzZWRcbiAgICAgICAgLy8gYW5kIHRoZW4gbW92ZSBvblxuICAgICAgICBpZiAoKCF1cmwgfHwgIW1ldGhvZCkgfHwgKG1ldGhvZCA9PT0gXCJQT1NUXCIgJiYgIWJvZHkpKSB7XG4gICAgICAgICAgY3Vyc29yXG4gICAgICAgICAgICAuZGVsZXRlKClcbiAgICAgICAgICAgIC50aGVuKGNhbGxiYWNrKCkpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBwcm9wZXJ0aWVzID0ge1xuICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGJvZHkpLFxuICAgICAgICAgIG1ldGhvZDogbWV0aG9kXG4gICAgICAgIH1cbiAgICAgICAgZmV0Y2godXJsLCBwcm9wZXJ0aWVzKS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgLy8gSWYgd2UgZG9uJ3QgZ2V0IGEgZ29vZCByZXNwb25zZSB0aGVuIGFzc3VtZSB3ZSdyZSBvZmZsaW5lXG4gICAgICAgICAgaWYgKCFyZXNwb25zZS5vayAmJiAhcmVzcG9uc2UucmVkaXJlY3RlZCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3RoaXMgaXMgdGhlIHJlc3BvbnNlIGFuZCB3ZSBhcmUgb2ZmbGluZScpO1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgICAgICB9KS50aGVuKCBqID0+IHtcbiAgICAgICAgICBjb25zdCBkZWx0eCA9IGRiLnRyYW5zYWN0aW9uKCdwZW5kaW5nJywgJ3JlYWR3cml0ZScpO1xuICAgICAgICAgIGNvbnN0IHN0b3JlID0gZGVsdHgub2JqZWN0U3RvcmUoJ3BlbmRpbmcnKTtcbiAgICAgICAgICBzdG9yZS5vcGVuQ3Vyc29yKClcbiAgICAgICAgICAgIC50aGVuKCBjdXJzb3IgPT4ge1xuICAgICAgICAgICAgICBjdXJzb3IuZGVsZXRlKClcbiAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coaik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoaik7XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIGNvbnNvbGUubG9nKCdkZWxldGVkIGl0ZW0gZnJvbSBwZW5kaW5nIHN0b3JlJyk7XG4gICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9KVxuICAgIH0pXG4gIH1cblxuICBzdGF0aWMgc3luY1Jlc3RhdXJhbnQocmVzdGF1cmFudCkge1xuICAgICB0cnkge1xuICAgICAgIGxldCB1cmwgPSBgaHR0cDovL2xvY2FsaG9zdDoxMzM3L3Jlc3RhdXJhbnRzLyR7cmVzdGF1cmFudC5pZH0vP2lzX2Zhdm9yaXRlPSR7cmVzdGF1cmFudC5pc19mYXZvcml0ZX1gO1xuICAgICAgIGxldCBwYXJhbXMgPSB7bWV0aG9kOiAnUFVUJ307XG4gICAgICAgcmV0dXJuIGZldGNoKHVybCwgcGFyYW1zKS50aGVuKGZ1bmN0aW9uKHIpeyByZXR1cm4gci5qc29uKCkgfSk7XG4gICAgIH1cbiAgICAgY2F0Y2goZSkge1xuICAgICAgIGNvbnNvbGUubG9nKCdlcnJvciB1cGRhdGluZyByZXN0YXVyYW50IGJhY2tlbmQgZGF0YS4uLicsIGUsIHJlc3RhdXJhbnQpO1xuICAgICB9XG4gIH1cbiAgICAgc3RhdGljIHVwZGF0ZVJlc3RhdXJhbnRJbkRCKG5ld19yZXN0YXVyYW50KSB7XG4gICAgICAgcmV0dXJuIGRiUHJvbWlzZS50aGVuKGZ1bmN0aW9uKGRiKXtcbiAgICAgICAgIGxldCB0eCA9IGRiLnRyYW5zYWN0aW9uKCdyZXN0YXVyYW50cycsICdyZWFkd3JpdGUnKTtcbiAgICAgICAgIGxldCBzdG9yZSA9IHR4Lm9iamVjdFN0b3JlKCdyZXN0YXVyYW50cycpO1xuICAgICAgICAgc3RvcmUucHV0KG5ld19yZXN0YXVyYW50KTtcbiAgICAgICAgIHJldHVybiB0eC5jb21wbGV0ZVxuICAgICAgIH0pLnRoZW4oZnVuY3Rpb24oKXtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG5ld19yZXN0YXVyYW50KTtcbiAgICAgICB9KTtcbiAgICAgfVxuXG4gIHN0YXRpYyB0b2dnbGVGYXZCdG4ocmVzdGF1cmFudF9pZCkge1xuICAgIHJldHVybiBkYlByb21pc2UudGhlbiggZGIgPT4ge1xuICAgICAgbGV0IHR4ID0gZGIudHJhbnNhY3Rpb24oJ3Jlc3RhdXJhbnRzJyk7XG4gICAgICBsZXQgc3RvcmUgPSB0eC5vYmplY3RTdG9yZSgncmVzdGF1cmFudHMnKTtcbiAgICAgIHJldHVybiBzdG9yZS5nZXQocmVzdGF1cmFudF9pZCk7XG4gICAgfSkudGhlbiggcmVzdGF1cmFudCA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhyZXN0YXVyYW50KTtcbiAgICAgIGNvbnN0IG5ld19yZXN0YXVyYW50ID0gT2JqZWN0LmFzc2lnbih7fSwgcmVzdGF1cmFudCk7XG4gICAgICBuZXdfcmVzdGF1cmFudC5pc19mYXZvcml0ZSA9IChyZXN0YXVyYW50LmlzX2Zhdm9yaXRlID09PSAndHJ1ZScgfHwgcmVzdGF1cmFudC5pc19mYXZvcml0ZSA9PT0gdHJ1ZSkgP1xuICAgICAgJ2ZhbHNlJyA6ICd0cnVlJztcbiAgICAgIERCSGVscGVyLnN5bmNSZXN0YXVyYW50KG5ld19yZXN0YXVyYW50KTtcbiAgICAgIHJldHVybiBEQkhlbHBlci51cGRhdGVSZXN0YXVyYW50SW5EQihuZXdfcmVzdGF1cmFudCk7XG4gICAgfSkudGhlbiggbmV3X3Jlc3RhdXJhbnQgPT4ge1xuICAgICAgY29uc3QgZmF2QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGZhdi1idG4tJHtuZXdfcmVzdGF1cmFudC5pZH1gKTtcbiAgICAgIGlmKG5ld19yZXN0YXVyYW50LmlzX2Zhdm9yaXRlID09PSAndHJ1ZScgfHwgbmV3X3Jlc3RhdXJhbnQuaXNfZmF2b3JpdGUgPT09IHRydWUpIHtcbiAgICAgICAgZmF2QnRuLmlubmVySFRNTCA9ICdGYXZvcml0ZWQhJztcbiAgICAgICAgZmF2QnRuLnN0eWxlLmJhY2tncm91bmQgPSAnaG90cGluayc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmYXZCdG4uaW5uZXJIVE1MID0gJ0FkZCB0byBmYXZvcml0ZSc7XG4gICAgICAgIGZhdkJ0bi5zdHlsZS5iYWNrZ3JvdW5kID0gJ2dyZXknO1xuICAgICAgfVxuICAgIH0pXG4gIH1cblxufVxuXG4iLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZXMuY3NzXCIpO1xuXG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcblxudmFyIHRyYW5zZm9ybTtcbnZhciBpbnNlcnRJbnRvO1xuXG5cblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxuXG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxub3B0aW9ucy5pbnNlcnRJbnRvID0gdW5kZWZpbmVkO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuXG5pZihtb2R1bGUuaG90KSB7XG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlcy5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlcy5jc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiKShmYWxzZSk7XG4vLyBNb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIkBjaGFyc2V0IFxcXCJ1dGYtOFxcXCI7XFxuLyogQ1NTIERvY3VtZW50ICovXFxuKiB7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgbWFyZ2luOjA7XFxuICBwYWRkaW5nOjA7XFxufVxcblxcbi8qIERlZmluZSBiYXNlIGZvbnQtc2l6ZSBoZXJlOyBtb3N0IGVsZW1lbnRzIHdpbGwgaW5oZXJpdCB0aGlzLiAqL1xcbmh0bWx7XFxuICAgIGZvbnQtc2l6ZToxZW07ICAgICAgLyogQXNzdW1pbmcgMTZweC4uLiAqL1xcbiAgICBsaW5lLWhlaWdodDoxLjU7XFxuICAgIGZvbnQtZmFtaWx5OiBBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmO1xcbiAgICBjb2xvcjogIzMzMztcXG59XFxuXFxuYm9keSx0ZCx0aCxwe1xcblxcdGZvbnQtZmFtaWx5OiBBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmO1xcblxcdGZvbnQtc2l6ZTogMWVtO1xcblxcdGNvbG9yOiAjMzMzO1xcblxcdGxpbmUtaGVpZ2h0OiAxLjU7XFxufVxcbmJvZHkge1xcbiAgbWF4LXdpZHRoOiAxMTAwcHg7XFxuXFx0YmFja2dyb3VuZC1jb2xvcjogI2ZkZmRmZDtcXG5cXHRtYXJnaW46IDAgYXV0bztcXG5cXHRwb3NpdGlvbjpyZWxhdGl2ZTtcXG59XFxuXFxubWFpbiwgc2VjdGlvbiB7XFxuICB3aWR0aDogMTAwJTtcXG59XFxudWwsIGxpIHtcXG5cXHRmb250LWZhbWlseTogQXJpYWwsIEhlbHZldGljYSwgc2Fucy1zZXJpZjtcXG5cXHRmb250LXNpemU6IDE2cHg7XFxuXFx0Y29sb3I6ICMzMzM7XFxufVxcbmEge1xcblxcdGNvbG9yOiBvcmFuZ2U7XFxuXFx0dGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbn1cXG5hOmhvdmVyLCBhOmZvY3VzIHtcXG5cXHRjb2xvcjogIzMzOTdkYjtcXG5cXHR0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxufVxcbmEgaW1ne1xcblxcdGJvcmRlcjogbm9uZSAwcHggI2ZmZjtcXG59XFxuaDEsIGgyLCBoMywgaDQsIGg1LCBoNiB7XFxuICBmb250LWZhbWlseTogQXJpYWwsIEhlbHZldGljYSwgc2Fucy1zZXJpZjtcXG4gIG1hcmdpbjogMCAwIDIwcHg7XFxufVxcbmFydGljbGUsIGFzaWRlLCBjYW52YXMsIGRldGFpbHMsIGZpZ2NhcHRpb24sIGZpZ3VyZSwgZm9vdGVyLCBoZWFkZXIsIGhncm91cCwgbWVudSwgbmF2LCBzZWN0aW9uIHtcXG5cXHRkaXNwbGF5OiBibG9jaztcXG59XFxuLm1haW5jb250ZW50IHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmM2YzZjM7XFxuICBtaW4taGVpZ2h0OiAxMDAlO1xcbn1cXG4jZm9vdGVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM0NDQ7XFxuICBjb2xvcjogI2FhYTtcXG4gIGZvbnQtc2l6ZTogOHB0O1xcbiAgbGV0dGVyLXNwYWNpbmc6IDFweDtcXG4gIHBhZGRpbmc6IDI1cHg7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xcbn1cXG5cXG4ubmF2aWdhdGlvbiBoMSBhOmhvdmVyLCAubmF2aWdhdGlvbiBoMSBhOmZvY3VzLCBhOmZvY3VzLCBhOmhvdmVyLCBidXR0b246aG92ZXIsXFxuYnV0dG9uOmZvY3VzIHtcXG4gIGNvbG9yOnJnYmEoODUsMTcyLDIzOCAsMSk7XFxuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcXG4gIGJveC1zaGFkb3c6IDAgMnB4IDJweCAwIHJnYmEoMCwgMCwgMCwgLjE0KSxcXG4gICAgICAgICAgICAgIDAgM3B4IDFweCAtMnB4IHJnYmEoMCwgMCwgMCwgLjIpLFxcbiAgICAgICAgICAgICAgMCAxcHggNXB4IDAgcmdiYSgwLCAwLCAwLCAuMTIpO1xcbn1cXG4jcmVzdGF1cmFudHMtbGlzdCBsaSBidXR0b246aG92ZXIsICNyZXN0YXVyYW50cy1saXN0IGxpIC5idXR0b246Zm9jdXMsXFxuLmZpbHRlci1vcHRpb25zIHNlbGVjdDpob3ZlciwgLmZpbHRlci1vcHRpb25zIHNlbGVjdDpmb2N1cywgI3N1Ym1pdC1mb3JtLWJ0bjpob3ZlciwgI3N1Ym1pdC1mb3JtLWJ0bjpmb2N1cyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoODUsMTcyLDIzOCAsMSk7XFxuICBjb2xvcjogI2ZmZjtcXG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xcbiAgYm94LXNoYWRvdzogMCAycHggMnB4IDAgcmdiYSgwLCAwLCAwLCAuMTQpLFxcbiAgICAgICAgICAgICAgMCAzcHggMXB4IC0ycHggcmdiYSgwLCAwLCAwLCAuMiksXFxuICAgICAgICAgICAgICAwIDFweCA1cHggMCByZ2JhKDAsIDAsIDAsIC4xMik7XFxufVxcblxcbi8qID09PT09PT09PT09PT09PT09PT09PT0gTmF2aWdhdGlvbiA9PT09PT09PT09PT09PT09PT09PT09ICovXFxuaGVhZGVyIHtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGJhY2tncm91bmQ6ICMzMzM7XFxufVxcbnVsIHtcXG4gIHBhZGRpbmc6IDA7XFxuICBsaXN0LXN0eWxlOiBub25lO1xcbn1cXG4ubmF2aWdhdGlvbiB7XFxuICBkaXNwbGF5OmZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBwYWRkaW5nOiAwIDEwcHg7XFxuICBjb2xvcjogcmdiYSgxMTcsMTE3LDExNyAsMSk7XFxufVxcbi5uYXZpZ2F0aW9uIGgxIHtcXG4gdGV4dC1hbGlnbjogY2VudGVyO1xcbiBmb250LXNpemU6IDFlbTtcXG4gbWFyZ2luLWJvdHRvbTogMDtcXG59XFxuXFxuLm5hdmlnYXRpb24gbGkge1xcbiAgaGVpZ2h0OiAxMDAlO1xcbn1cXG5cXG4ubmF2aWdhdGlvbiAubmF2aWdhdGlvbl9fdGl0bGUge1xcbiBmbGV4LWdyb3c6IDE7XFxufVxcbi5uYXZpZ2F0aW9uIGltZyB7XFxuICB3aWR0aDogNDhweDtcXG4gIGhlaWdodDogNDhweDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbn1cXG4ubmF2aWdhdGlvbiBoMSBhIHtcXG4gIGNvbG9yOiAjZmZmO1xcbiAgZm9udC1zaXplOiA0OHB4O1xcbiAgZm9udC13ZWlnaHQ6IDIwMDtcXG4gIGxldHRlci1zcGFjaW5nOiAxMHB4O1xcbiAgbWFyZ2luOiAxMHB4IGF1dG87XFxuICBmb250LWZhbWlseTogY3Vyc2l2ZTtcXG59XFxuI2JyZWFkY3J1bWIge1xcbiAgICBwYWRkaW5nOiAxMHB4O1xcbiAgICBsaXN0LXN0eWxlOiBub25lO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWVlO1xcbiAgICBmb250LXNpemU6IDE3cHg7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgd2lkdGg6IDEwMCU7XFxufVxcblxcbi8qIERpc3BsYXkgbGlzdCBpdGVtcyBzaWRlIGJ5IHNpZGUgKi9cXG4jYnJlYWRjcnVtYiBsaSB7XFxuICAgIGRpc3BsYXk6IGlubGluZTtcXG59XFxuXFxuLyogQWRkIGEgc2xhc2ggc3ltYm9sICgvKSBiZWZvcmUvYmVoaW5kIGVhY2ggbGlzdCBpdGVtICovXFxuI2JyZWFkY3J1bWIgbGkrbGk6YmVmb3JlIHtcXG4gICAgcGFkZGluZzogOHB4O1xcbiAgICBjb2xvcjogYmxhY2s7XFxuICAgIGNvbnRlbnQ6IFxcXCIvXFxcXDAwYTBcXFwiO1xcbn1cXG5cXG4vKiBBZGQgYSBjb2xvciB0byBhbGwgbGlua3MgaW5zaWRlIHRoZSBsaXN0ICovXFxuI2JyZWFkY3J1bWIgbGkgYSB7XFxuICAgIGNvbG9yOiAjMDI3NWQ4O1xcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxufVxcblxcbi8qIEFkZCBhIGNvbG9yIG9uIG1vdXNlLW92ZXIgKi9cXG4jYnJlYWRjcnVtYiBsaSBhOmhvdmVyIHtcXG4gICAgY29sb3I6ICMwMTQ0N2U7XFxuICAgIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xcbn1cXG4vKiA9PT09PT09PT09PT09PT09PT09PT09IE1hcCA9PT09PT09PT09PT09PT09PT09PT09ICovXFxuI21hcCB7XFxuICBoZWlnaHQ6IDQwMHB4O1xcbiAgd2lkdGg6IDEwMCU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjY2NjO1xcbn1cXG4vKiA9PT09PT09PT09PT09PT09PT09PT09IFJlc3RhdXJhbnQgRmlsdGVyaW5nID09PT09PT09PT09PT09PT09PT09PT0gKi9cXG4uZmlsdGVyLW9wdGlvbnMge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzMzO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuLmZpbHRlci1vcHRpb25zIGgyIHtcXG4gIGNvbG9yOiB3aGl0ZTtcXG4gIGZvbnQtc2l6ZTogMXJlbTtcXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxuICBsaW5lLWhlaWdodDogMTtcXG4gIG1hcmdpbjogMCAxMHB4O1xcbiAgcGFkZGluZy10b3A6IDEwcHg7XFxufVxcbi5maWx0ZXItb3B0aW9ucyBzZWxlY3Qge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjZmZmO1xcbiAgZm9udC1mYW1pbHk6IEFyaWFsLHNhbnMtc2VyaWY7XFxuICBmb250LXNpemU6IDExcHQ7XFxuICBoZWlnaHQ6IDM1cHg7XFxuICBsZXR0ZXItc3BhY2luZzogMDtcXG4gIG1hcmdpbjogMTBweDtcXG4gIHBhZGRpbmc6IDEwcHg7XFxuICB3aWR0aDogMjAwcHg7XFxufVxcbi5maWx0ZXItbGFiZWwge1xcbiAgZGlzcGxheTogbm9uZTtcXG59XFxuXFxuLmZpbHRlci1zZWN0aW9uIHtcXG4gIHdpZHRoOiAxMDAlO1xcbn1cXG5cXG4vKiA9PT09PT09PT09PT09PT09PT09PT09IFJlc3RhdXJhbnQgTGlzdGluZyA9PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLyo9PT09PT09PVxcbj09PUZsZXhib3ggb24gbGlzdCBhbmQgY29udGVudFxcbj09PT09PT09Ki9cXG5cXG4jcmVzdGF1cmFudHMtbGlzdCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC13cmFwOiB3cmFwO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjNmM2YzO1xcbiAgbGlzdC1zdHlsZTogb3V0c2lkZSBub25lIG5vbmU7XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiAzMHB4IDE1cHggNjBweDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuI3Jlc3RhdXJhbnRzLWxpc3QgbGkge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICBmbGV4LWdyb3c6IDE7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbiAgYm9yZGVyOiAycHggc29saWQgI2NjYztcXG4gIGZvbnQtZmFtaWx5OiBBcmlhbCxzYW5zLXNlcmlmO1xcbiAgbWFyZ2luOiAxNXB4O1xcbiAgbWluLWhlaWdodDogMzgwcHg7XFxuICBwYWRkaW5nOiAwIDMwcHggMjVweDtcXG4gIHRleHQtYWxpZ246IGxlZnQ7XFxuICB3aWR0aDogMTAwJTtcXG59XFxuI3Jlc3RhdXJhbnRzLWxpc3QgLnJlc3RhdXJhbnQtaW1nIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNjY2M7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIG1hcmdpbjogMDtcXG4gIG1heC13aWR0aDogMTAwJTtcXG4gIG1heC1oZWlnaHQ6IDMwMHB4O1xcbiAgbWluLXdpZHRoOiAxMDAlO1xcbn1cXG4jcmVzdGF1cmFudHMtbGlzdCBsaSBoMSB7XFxuICBjb2xvcjogI2YxODIwMDtcXG4gIGZvbnQtZmFtaWx5OiBBcmlhbCxzYW5zLXNlcmlmO1xcbiAgZm9udC1zaXplOiAxNHB0O1xcbiAgZm9udC13ZWlnaHQ6IDIwMDtcXG4gIGxldHRlci1zcGFjaW5nOiAwO1xcbiAgbGluZS1oZWlnaHQ6IDEuMztcXG4gIG1hcmdpbjogMjBweCAwIDEwcHg7XFxuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xcblxcbn1cXG4jcmVzdGF1cmFudHMtbGlzdCBwIHtcXG4gIG1hcmdpbjogMDtcXG4gIGZvbnQtc2l6ZTogMTFwdDtcXG59XFxuI3Jlc3RhdXJhbnRzLWxpc3QgbGkgYnV0dG9uIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IG9yYW5nZTtcXG4gIGJvcmRlci1ib3R0b206IDNweCBzb2xpZCAjZWVlO1xcbiAgY29sb3I6ICNmZmY7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBmb250LXNpemU6IDEwcHQ7XFxuICBtYXJnaW46IDE1cHggMCAwO1xcbiAgcGFkZGluZzogOHB4IDMwcHggMTBweDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxufVxcblxcblxcbi8qID09PT09PT09PT09PT09PT09PT09PT0gUmVzdGF1cmFudCBEZXRhaWxzID09PT09PT09PT09PT09PT09PT09PT0gKi9cXG4uaW5zaWRlIGhlYWRlciB7XFxuICAvKnBvc2l0aW9uOiBmaXhlZDsqL1xcbiAgLyp0b3A6IDA7Ki9cXG4gIHdpZHRoOiAxMDAlO1xcbiAgLyp6LWluZGV4OiAxMDAwOyovXFxufVxcbi5pbnNpZGUgI21hcC1jb250YWluZXIge1xcbiAgLypiYWNrZ3JvdW5kOiBibHVlIG5vbmUgcmVwZWF0IHNjcm9sbCAwIDA7Ki9cXG4gIGhlaWdodDogMjAwcHg7XFxuICBwYWRkaW5nLWJvdHRvbTogMTBweDtcXG59XFxuLmluc2lkZSAjbWFwIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNjY2M7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICB3aWR0aDogMTAwJTtcXG59XFxuLmluc2lkZSAjZm9vdGVyIHtcXG4vKiAgYm90dG9tOiAwO1xcbiAgcG9zaXRpb246IGFic29sdXRlOyovXFxuICB3aWR0aDogMTAwJTtcXG59XFxuI3Jlc3RhdXJhbnQtbmFtZSB7XFxuICBjb2xvcjogI2YxODIwMDtcXG4gIGZvbnQtZmFtaWx5OiBBcmlhbCxzYW5zLXNlcmlmO1xcbiAgZm9udC1zaXplOiAyNHB0O1xcbiAgZm9udC13ZWlnaHQ6IDIwMDtcXG4gIGxldHRlci1zcGFjaW5nOiAwO1xcbiAgbWFyZ2luOiAxMHB4IGF1dG87XFxuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xcbiAgbGluZS1oZWlnaHQ6IDEuMTtcXG59XFxuI3Jlc3RhdXJhbnQtaW1nIHtcXG5cXHR3aWR0aDogMTAwJTtcXG4gIG1heC1oZWlnaHQ6IDgwdmg7XFxufVxcbiNyZXN0YXVyYW50LWFkZHJlc3Mge1xcbiAgZm9udC1zaXplOiAxLjNlbTtcXG4gIG1hcmdpbjogMTBweCAwcHg7XFxuICB3aWR0aDogNTAlO1xcbn1cXG4jcmVzdGF1cmFudC1jdWlzaW5lIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMzMzM7XFxuICBjb2xvcjogI2RkZDtcXG4gIGZvbnQtc2l6ZTogMS4yZW07XFxuICBmb250LXdlaWdodDogMzAwO1xcbiAgbGV0dGVyLXNwYWNpbmc6IDEwcHg7XFxuICBtYXJnaW46IDAgMCAyMHB4O1xcbiAgcGFkZGluZzogMnB4IDA7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xcblxcdHdpZHRoOiAxMDAlO1xcbn1cXG4jcmVzdGF1cmFudC1jb250YWluZXIsICNyZXZpZXdzLWNvbnRhaW5lciwgI3Jldmlld3MtZm9ybS1jb250YWluZXJ7XFxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2Q5ZDlkOTtcXG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjZmZmO1xcbiAgcGFkZGluZzogMjBweDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgZGlzcGxheTpmbGV4O1xcbiAgZmxleC13cmFwOiB3cmFwO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcbiNyZXZpZXdzLWNvbnRhaW5lciwgI3Jldmlld3MtZm9ybS1jb250YWluZXIge1xcbiAgcGFkZGluZzogMzBweCA0MHB4IDQwcHg7XFxufVxcbiNyZXZpZXdzLWNvbnRhaW5lciBoMiwgI3Jldmlld3MtZm9ybS1jb250YWluZXIgaDIge1xcbiAgY29sb3I6ICNmNTg1MDA7XFxuICBmb250LXNpemU6IDI0cHQ7XFxuICBmb250LXdlaWdodDogMzAwO1xcbiAgbGV0dGVyLXNwYWNpbmc6IC0xcHg7XFxuICBwYWRkaW5nLWJvdHRvbTogMXB0O1xcbiAgbWFyZ2luOiAwIGF1dG87XFxufVxcbiNyZXZpZXdzLWxpc3Qge1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogMDtcXG59XFxuI3Jldmlld3MtbGlzdCBsaSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbiAgYm9yZGVyOiAycHggc29saWQgI2YzZjNmMztcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgbGlzdC1zdHlsZS10eXBlOiBub25lO1xcbiAgbWFyZ2luOiAwIDAgMzBweDtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICBwYWRkaW5nOiAxMHB4IDIwcHggMjBweDtcXG4gIC8qcG9zaXRpb246IHJlbGF0aXZlOyovXFxuICB3aWR0aDogMTAwJTtcXG59XFxuI3Jldmlld3MtbGlzdCBsaSBwIHtcXG4gIG1hcmdpbjogMCAwIDEwcHg7XFxufVxcbiNyZXN0YXVyYW50LWhvdXJzIHtcXG4gIHdpZHRoOiA1MCU7XFxufVxcbiNyZXN0YXVyYW50LWhvdXJzIHRkIHtcXG4gIGNvbG9yOiAjNjY2O1xcbiAgZm9udC1zaXplOiAxZW07XFxufVxcblxcbiNjcmVhdGUtZWRpdC1yZXZpZXctZm9ybSB7XFxuICB3aWR0aDogMTAwJTtcXG59XFxuI2NyZWF0ZS1lZGl0LXJldmlldy1mb3JtIGxhYmVsIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgbWFyZ2luOiAwIGF1dG87XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBmb250LXNpemU6IDFyZW07XFxufVxcblxcbiNjcmVhdGUtZWRpdC1yZXZpZXctZm9ybSBpbnB1dCwgI2NyZWF0ZS1lZGl0LXJldmlldy1mb3JtIHRleHRhcmVhIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgbWFyZ2luOiAwIGF1dG87XFxuICBib3JkZXI6IDFweCBzb2xpZCBncmF5O1xcbiAgcGFkZGluZzogNXB4O1xcbiAgd2lkdGg6IDUwJTtcXG59XFxuXFxuLnN1Ym1pdC1mb3JtLWJ1dHRvbiB7XFxuICAgIGRpc3BsYXk6YmxvY2s7XFxuICAgIGNvbG9yOiB3aGl0ZTtcXG4gICAgYmFja2dyb3VuZDogb3JhbmdlO1xcbiAgICBwYWRkaW5nOiAxMHB4O1xcbiAgICB3aWR0aDogMjAlO1xcbiAgICBtYXJnaW46IDEwcHg7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxuLyovLy8vLy8vLy8vXFxuLy8gTWVkaWEgUXVlcmllc1xcbi8vLy8vLy8vLy8qL1xcblxcbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDEwMDBweCkge1xcbiAgI3Jlc3RhdXJhbnRzLWxpc3QgbGkge1xcbiAgICBtYXgtd2lkdGg6IDMwJTtcXG4gIH1cXG59XFxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogOTk5cHgpIGFuZCAobWluLXdpZHRoOiA2NzFweCkge1xcbiAgI3Jlc3RhdXJhbnRzLWxpc3QgbGkge1xcbiAgICBtaW4td2lkdGg6IDI5MHB4O1xcbiAgICB3aWR0aDogNDUlO1xcbiAgICBtYXgtd2lkdGg6IDQ1JTtcXG4gIH1cXG59XFxuXFxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNjcwcHgpIHtcXG4gIGhlYWRlciB7XFxuICAgIC8qbWluLWhlaWdodDogNTBweDsqL1xcbiAgfVxcbiAgI3Jlc3RhdXJhbnRzLWxpc3QgbGkge1xcbiAgICBtYXgtd2lkdGg6IDgwJTtcXG4gICAgbWFyZ2luOiA4cHggYXV0bztcXG4gIH1cXG4gIC5uYXZpZ2F0aW9uIGgxIGF7XFxuICAgIGZvbnQtc2l6ZTogMi42ZW07XFxuICB9XFxuICAubmF2aWdhdGlvbiBpbWcge1xcbiAgICB3aWR0aDogMzBweDtcXG4gICAgaGVpZ2h0OiAzMHB4O1xcbiAgfVxcbn1cXG5cXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA1NDBweCkge1xcblxcbiAgLm5hdmlnYXRpb24gaDEgYXtcXG4gICAgZm9udC1zaXplOiAxLjdlbTtcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgfVxcbiAgLm5hdmlnYXRpb24gaW1nIHtcXG4gICAgZGlzcGxheTogbm9uZTtcXG4gIH1cXG4gIC5maWx0ZXItb3B0aW9ucyBzZWxlY3Qge1xcbiAgICB3aWR0aDogNTAlKTtcXG4gIH1cXG4gICNyZXN0YXVyYW50LWNvbnRhaW5lciBoMSwgI3Jldmlld3MtY29udGFpbmVyIGgyIHtcXG4gICAgZm9udC1zaXplOiAxLjVlbTtcXG4gIH1cXG4gICNyZXN0YXVyYW50LWltZyB7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDQwMHB4O1xcbiAgfVxcbiAgI3Jlc3RhdXJhbnQtYWRkcmVzcyB7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgfVxcbiAgI3Jlc3RhdXJhbnQtaG91cnMge1xcbiAgICB3aWR0aDogMTAwJTtcXG4gIH1cXG4gICNyZXN0YXVyYW50LWhvdXJzIHRkIHtcXG4gICAgZm9udC1zaXplOiAxZW07XFxuICB9XFxuICAjcmVzdGF1cmFudC1jdWlzaW5lIHtcXG4gICAgZm9udC1zaXplOiAxZW07XFxuICB9XFxufVxcbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDQ1MHB4KSB7XFxuICAuZmlsdGVyLW9wdGlvbnMgc2VsZWN0IHtcXG4gICAgd2lkdGg6IGNhbGMoMTAwJSAtIDI0cHgpO1xcbiAgICBtYXJnaW46IDEwcHg7XFxuICB9XFxuICAjcmV2aWV3cy1jb250YWluZXIge1xcbiAgICBwYWRkaW5nOiAwO1xcbiAgfVxcbn1cXG5cIiwgXCJcIl0pO1xuXG4iLCJ2YXIgbWFwID0ge1xuXHRcIi4vbG9nXCI6IFwiLi9ub2RlX21vZHVsZXMvd2VicGFjay9ob3QvbG9nLmpzXCJcbn07XG5cblxuZnVuY3Rpb24gd2VicGFja0NvbnRleHQocmVxKSB7XG5cdHZhciBpZCA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpO1xuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhpZCk7XG59XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSB7XG5cdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8obWFwLCByZXEpKSB7XG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdHJldHVybiBtYXBbcmVxXTtcbn1cbndlYnBhY2tDb250ZXh0LmtleXMgPSBmdW5jdGlvbiB3ZWJwYWNrQ29udGV4dEtleXMoKSB7XG5cdHJldHVybiBPYmplY3Qua2V5cyhtYXApO1xufTtcbndlYnBhY2tDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmU7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tDb250ZXh0O1xud2VicGFja0NvbnRleHQuaWQgPSBcIi4vbm9kZV9tb2R1bGVzL3dlYnBhY2svaG90IHN5bmMgXlxcXFwuXFxcXC9sb2ckXCI7Il0sInNvdXJjZVJvb3QiOiIifQ==