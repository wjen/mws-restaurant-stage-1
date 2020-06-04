/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./app/src/main.js");
/******/ })
/************************************************************************/
/******/ ({

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
/* harmony import */ var _sw_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../sw.js */ "./app/sw.js");
/**
 * Common database helper functions.
 */

 // const dbPromise = openDB('rr-db', 3, {
//   upgrade(db, oldVersion) {
//     switch (oldVersion) {
//       case 0:
//         const store = db.createObjectStore('restaurants', { keyPath: 'id', });
//         store.createIndex('id', 'id');
//       case 1:
//         const reviewsStore = db.createObjectStore('reviews', {
//           keyPath: 'id',
//         });
//         reviewsStore.createIndex("restaurant_id", "restaurant_id");
//       case 2:
//         const pendingStore = db.createObjectStore('pending', {
//           keyPath: 'id',
//           autoIncrement: true
//         })
//     }
//   }
// });

class DBHelper {
  /**
   * Database URL.
   * Change this to restaurants.json file location on your server.
   */
  static get DATABASE_URL() {
    const port = 1337; // Change this to your server port

    return "http://localhost:".concat(port, "/restaurants");
  }

  static get DATABASE_REVIEWS_URL() {
    const port = 1337; // Change this to your server port

    return "http://localhost:".concat(port, "/reviews");
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
    let fetchURL = DBHelper.DATABASE_REVIEWS_URL + "/?restaurant_id=" + restaurant_id;
    fetch(fetchURL).then(response => {
      return response.json();
    }).then(reviews => {
      callback(null, reviews);
    }).catch(error => {
      callback(error, null);
    });
  }

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
    return "/restaurant.html?id=".concat(restaurant.id);
  }
  /**
   * Restaurant image URL.
   */


  static imageUrlForRestaurant(restaurant) {
    if (!restaurant.photograph) {
      return "/img/".concat(restaurant.id, ".jpg");
    }

    return "/img/".concat(restaurant.photograph, ".jpg");
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
    return _sw_js__WEBPACK_IMPORTED_MODULE_1__["dbPromise"].then(db => {
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
    return _sw_js__WEBPACK_IMPORTED_MODULE_1__["dbPromise"].then(db => {
      let tx = db.transaction('reviews');
      let store = tx.objectStore('reviews');
      return store.get(editing.id);
    }).then(review => {
      return _sw_js__WEBPACK_IMPORTED_MODULE_1__["dbPromise"].then(db => {
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
    const method = editing ? "PUT" : "POST";
    const url = editing ? "".concat(DBHelper.DATABASE_REVIEWS_URL, "/").concat(editing.id) : DBHelper.DATABASE_REVIEWS_URL;

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
      _sw_js__WEBPACK_IMPORTED_MODULE_1__["dbPromise"].then(db => {
        const tx = db.transaction('pending', 'readwrite');
        const store = tx.objectStore('pending');
        return store.put({
          data: {
            url,
            method,
            formData
          }
        });
      }).catch(error => {
        console.log("Error putting data in pending db: ".concat(error));
      }).then(DBHelper.nextPending((error, json) => {
        if (error) {
          console.log(error);
          return reject(error);
        }

        return resolve(json);
      }));
    });
  }

  static nextPending(callback) {
    DBHelper.attemptCommitPending(DBHelper.nextPending).then(j => {
      console.log(j);
      callback(null, j);
    }).catch(error => {
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
      _sw_js__WEBPACK_IMPORTED_MODULE_1__["dbPromise"].then(db => {
        if (!db.objectStoreNames.length) {
          console.log("DB not available");
          db.close();
          return;
        }

        const tx = db.transaction('pending', 'readwrite');
        const store = tx.objectStore('pending');
        store.openCursor().then(cursor => {
          if (!cursor) {
            console.log('no more cursors');
            return;
          }

          const value = cursor.value;
          url = value.data.url;
          method = value.data.method;
          body = value.data.formData; // If we don't have a parameter then we're on a bad record that should be tossed
          // and then move on

          if (!url || !method || method === "POST" && !body) {
            cursor.delete().then(callback);
            console.log('deleted a bad cursor');
            return;
          }

          ;
          const properties = {
            body: JSON.stringify(body),
            method: method
          };
          fetch(url, properties).then(response => {
            console.log(response);

            if (!response.ok && !response.redirected) {
              console.log('this is the response and we are offline');
              console.log(response);
              return;
            }

            return response.json().then(json => {
              const deltx = db.transaction('pending', 'readwrite');
              const store = deltx.objectStore('pending');
              return store.openCursor().then(cursor => {
                return cursor.delete().then(() => {
                  console.log(cursor.value);
                  console.log('deleted item from pending store');
                  callback();
                  console.log(json);
                  return resolve(json);
                });
              });
            });
          }).catch(error => {
            console.log(error);
            return reject('no network');
          });
        });
      });
    });
  }

  static syncRestaurant(restaurant) {
    let url = "http://localhost:1337/restaurants/".concat(restaurant.id, "/?is_favorite=").concat(restaurant.is_favorite);
    let method = 'PUT';
    DBHelper.addPendingRequestToQue(url, method).catch(error => {
      console.log('error updating restaurant backend data...', error, restaurant);
    });
  }

  static updateRestaurantInDB(new_restaurant) {
    return _sw_js__WEBPACK_IMPORTED_MODULE_1__["dbPromise"].then(function (db) {
      let tx = db.transaction('restaurants', 'readwrite');
      let store = tx.objectStore('restaurants');
      store.put(new_restaurant);
      return tx.complete;
    }).then(function () {
      return Promise.resolve(new_restaurant);
    });
  }

  static toggleFavBtn(restaurant_id) {
    return _sw_js__WEBPACK_IMPORTED_MODULE_1__["dbPromise"].then(db => {
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
      const favBtn = document.getElementById("fav-btn-".concat(new_restaurant.id));

      if (new_restaurant.is_favorite === 'true' || new_restaurant.is_favorite === true) {
        favBtn.innerHTML = 'Favorited!';
        favBtn.style.background = 'hotpink';
      } else {
        favBtn.innerHTML = 'Add to favorite';
        favBtn.style.background = 'grey';
      }
    });
  }

  static deleteCachedReview(review_id) {
    return _sw_js__WEBPACK_IMPORTED_MODULE_1__["dbPromise"].then(db => {
      let tx = db.transaction('reviews', 'readwrite');
      let store = tx.objectStore('reviews');
      store.delete(review_id);
      console.log('deleted review from idb');
      return tx.complete;
    }).catch(error => {
      console.log('error deleting review: ', error);
    });
  }

  static deleteReview(review_id) {
    const url = "".concat(DBHelper.DATABASE_REVIEWS_URL, "/").concat(review_id);
    console.log(url);
    const method = "DELETE";
    DBHelper.deleteCachedReview(review_id);
    return DBHelper.addPendingRequestToQue(url, method);
  }

  static deleteTempReview(temp_id) {
    _sw_js__WEBPACK_IMPORTED_MODULE_1__["dbPromise"].then(db => {
      let tx = db.transaction('reviews', 'readwrite');
      let store = tx.objectStore('reviews');
      store.delete(temp_id);
      console.log('deleted oldversion of review with old id');
      return tx.complete;
    }).catch(error => {
      console.log('error deleting temp review: ', error);
    });
  }

}

/***/ }),

/***/ "./app/src/main.js":
/*!*************************!*\
  !*** ./app/src/main.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _registration__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./registration */ "./app/src/registration.js");
/* harmony import */ var _dbhelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dbhelper */ "./app/src/dbhelper.js");


let restaurants, neighborhoods, cuisines;
var newMap;
var markers = [];
/**
 * Fetch neighborhoods and cuisines as soon as the page is loaded.
 */

document.addEventListener('DOMContentLoaded', event => {
  initMap();
  updateRestaurants();
  fetchNeighborhoods();
  fetchCuisines();
  _dbhelper__WEBPACK_IMPORTED_MODULE_1__["default"].nextPending();
});
/**
 * Fetch all neighborhoods and set their HTML.
 */

const fetchNeighborhoods = () => {
  _dbhelper__WEBPACK_IMPORTED_MODULE_1__["default"].fetchNeighborhoods((error, neighborhoods) => {
    if (error) {
      // Got an error
      console.error(error);
    } else {
      self.neighborhoods = neighborhoods;
      fillNeighborhoodsHTML();
    }
  });
};
/**
 * Set neighborhoods HTML.
 */


const fillNeighborhoodsHTML = function fillNeighborhoodsHTML() {
  let neighborhoods = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : self.neighborhoods;
  const select = document.getElementById('neighborhoods-select');
  select.addEventListener('change', updateRestaurants);
  neighborhoods.forEach(neighborhood => {
    const option = document.createElement('option');
    option.innerHTML = neighborhood;
    option.value = neighborhood;
    select.append(option);
  });
};
/**
 * Fetch all cuisines and set their HTML.
 */


const fetchCuisines = () => {
  _dbhelper__WEBPACK_IMPORTED_MODULE_1__["default"].fetchCuisines((error, cuisines) => {
    if (error) {
      // Got an error!
      console.error(error);
    } else {
      self.cuisines = cuisines;
      fillCuisinesHTML();
    }
  });
};
/**
 * Set cuisines HTML.
 */


const fillCuisinesHTML = function fillCuisinesHTML() {
  let cuisines = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : self.cuisines;
  const select = document.getElementById('cuisines-select');
  select.addEventListener('change', updateRestaurants);
  cuisines.forEach(cuisine => {
    const option = document.createElement('option');
    option.innerHTML = cuisine;
    option.value = cuisine;
    select.append(option);
  });
};
/**
 * Initialize leaflet map, called from HTML.
 */


const initMap = () => {
  newMap = L.map('map', {
    center: [40.722216, -73.987501],
    zoom: 12,
    scrollWheelZoom: false
  });
  self.newMap = newMap;
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.jpg70?access_token={mapboxToken}', {
    mapboxToken: 'pk.eyJ1Ijoid2VudGluIiwiYSI6ImNqaXJ0N25iZjFwdjYza3A4MGt1aHU2bjEifQ.DnNFUoN5uzw01l_XK_c7nQ',
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' + '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' + 'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.streets'
  }).addTo(newMap);
};
/**
 * Update page and map for current restaurants.
 */


const updateRestaurants = () => {
  const cSelect = document.getElementById('cuisines-select');
  const nSelect = document.getElementById('neighborhoods-select');
  const cIndex = cSelect.selectedIndex;
  const nIndex = nSelect.selectedIndex;
  const cuisine = cSelect[cIndex].value;
  const neighborhood = nSelect[nIndex].value;
  _dbhelper__WEBPACK_IMPORTED_MODULE_1__["default"].fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood, (error, restaurants) => {
    if (error) {
      // Got an error!
      console.error(error);
    } else {
      resetRestaurants(restaurants);
      fillRestaurantsHTML();
    }
  });
};
/**
 * Clear current restaurants, their HTML and remove their map markers.
 */


const resetRestaurants = restaurants => {
  // Remove all restaurants
  self.restaurants = [];
  const ul = document.getElementById('restaurants-list');
  ul.innerHTML = ''; // Remove all map markers

  if (self.markers) {
    self.markers.forEach(marker => marker.remove());
  }

  self.markers = [];
  self.restaurants = restaurants;
};
/**
 * Create all restaurants HTML and add them to the webpage.
 */


const fillRestaurantsHTML = function fillRestaurantsHTML() {
  let restaurants = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : self.restaurants;
  const ul = document.getElementById('restaurants-list');
  restaurants.forEach(restaurant => {
    ul.append(createRestaurantHTML(restaurant));
  });
  addMarkersToMap();
};
/**
 * Create restaurant HTML.
 */


const createRestaurantHTML = restaurant => {
  const li = document.createElement('li');
  const image = document.createElement('img');
  const div = document.createElement('div');
  image.className = 'restaurant-img';
  image.setAttribute('alt', restaurant.name);
  image.src = _dbhelper__WEBPACK_IMPORTED_MODULE_1__["default"].imageUrlForRestaurant(restaurant);
  div.append(image);
  li.append(div);
  const name = document.createElement('h1');
  name.innerHTML = restaurant.name;
  li.append(name);
  const neighborhood = document.createElement('p');
  neighborhood.innerHTML = restaurant.neighborhood;
  li.append(neighborhood);
  const address = document.createElement('p');
  address.innerHTML = restaurant.address;
  li.append(address);
  const favBtn = document.createElement('button');

  if (restaurant.is_favorite === "true" || restaurant.is_favorite === true) {
    favBtn.innerHTML = 'Favorited!';
    favBtn.style.background = 'hotpink';
  } else {
    favBtn.innerHTML = 'Add to favorite';
    favBtn.style.background = 'grey';
  }

  favBtn.setAttribute("title", "toggle favorites for: ".concat(restaurant.name));
  favBtn.setAttribute("id", "fav-btn-".concat(restaurant.id));
  favBtn.setAttribute("data-restaurant-id", restaurant.id);
  favBtn.addEventListener("click", () => {
    _dbhelper__WEBPACK_IMPORTED_MODULE_1__["default"].toggleFavBtn(restaurant.id);
  });
  li.append(favBtn);
  const more = document.createElement('button');
  more.classList = "button button--success";
  more.innerHTML = 'View Details';
  more.setAttribute("aria-label", restaurant.name + restaurant.neighborhood + restaurant.address + "View Details");

  more.onclick = () => {
    const url = _dbhelper__WEBPACK_IMPORTED_MODULE_1__["default"].urlForRestaurant(restaurant);
    window.location = url;
  };

  li.append(more);
  return li;
};
/**
 * Add markers for current restaurants to the map.
 */


const addMarkersToMap = function addMarkersToMap() {
  let restaurants = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : self.restaurants;
  restaurants.forEach(restaurant => {
    // Add marker to the map
    const marker = _dbhelper__WEBPACK_IMPORTED_MODULE_1__["default"].mapMarkerForRestaurant(restaurant, newMap);
    marker.on("click", onClick);

    function onClick() {
      window.location.href = marker.options.url;
    }

    self.markers.push(marker);
  });
};

/***/ }),

/***/ "./app/src/registration.js":
/*!*********************************!*\
  !*** ./app/src/registration.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ((function () {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/serviceworker.bundle.js').then(registration => {
        console.log('SW registered: ', registration);
      }).catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
    });
  }
})());

/***/ }),

/***/ "./app/sw.js":
/*!*******************!*\
  !*** ./app/sw.js ***!
  \*******************/
/*! exports provided: dbPromise */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dbPromise", function() { return dbPromise; });
/* harmony import */ var core_js_modules_es6_regexp_match__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es6.regexp.match */ "./node_modules/core-js/modules/es6.regexp.match.js");
/* harmony import */ var core_js_modules_es6_regexp_match__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_regexp_match__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/web.dom.iterable */ "./node_modules/core-js/modules/web.dom.iterable.js");
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var idb__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! idb */ "./node_modules/idb/build/esm/index.js");


const cacheVersion = '3';
const STATIC_CACHE = "restaurant-cache-v".concat(cacheVersion);
const IMAGES_CACHE = "images_cache-v";
const allCaches = [STATIC_CACHE, IMAGES_CACHE];


const dbPromise = Object(idb__WEBPACK_IMPORTED_MODULE_2__["openDB"])('rr-db', 3, {
  upgrade(db, oldVersion) {
    switch (oldVersion) {
      case 0:
        const store = db.createObjectStore('restaurants', {
          keyPath: 'id'
        });
        store.createIndex('id', 'id');

      case 1:
        const reviewsStore = db.createObjectStore('reviews', {
          keyPath: 'id' // autoIncrement: true

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

const getRestaurants = event => {
  return new Promise(function (resolve, reject) {
    fetch(event.request).then(resp => resp.json()).then(json => {
      resolve(json);
    }).catch(error => {
      console.log(error);
      reject(error);
    });
  });
};

function isImageURL(url) {
  let imgTypes = ["png", "jpg", "jpeg", "svg", "gif"];
  let isImage = false;

  for (let type of imgTypes) {
    if (url.endsWith(type)) {
      isImage = true;
      break;
    }

    ;
  }

  return isImage;
}

self.addEventListener('install', event => {
  event.waitUntil(caches.open(STATIC_CACHE).then(cache => {
    return cache.addAll(['/', './app.bundle.js', './restaurant.bundle.js', './img/rr_icon.png', './css/styles.css']).catch(error => {
      console.log('error setting up install event for sw');
    });
  }));
}); // Clean unused caches with names starting with restaurant

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(cacheNames => {
    return Promise.all(cacheNames.filter(cacheName => {
      return cacheName.startsWith('restaurant-') && cacheName != STATIC_CACHE;
    }).map(cacheName => {
      return caches.delete(cacheName);
    }));
  }));
});
self.addEventListener('fetch', event => {
  let checkUrl = new URL(event.request.url);

  if (checkUrl.port === "1337") {
    let id = checkUrl.searchParams.get('restaurant_id') - 0;
    return handleAJAXEvent(event, id);
  } else {
    handleNonAJAXEvent(event);
  }
});

const handleAJAXEvent = (event, id) => {
  // Only use for caching for Get events
  if (event.request.method !== "GET") {
    console.log(event.request);
    console.log(event);
    event.respondWith(fetch(event.request));
  } else if (event.request.url.indexOf("restaurants") > -1) {
    handleRestaurantEvents(event);
  } else {
    console.log('starting handling from reviews event');
    handleReviewsEvents(event, id);
  }
};

const handleRestaurantEvents = event => {
  event.respondWith(dbPromise.then(db => {
    return db.transaction('restaurants').objectStore('restaurants').getAll();
  }).then(data => {
    console.log('responding from handlerestaurantevents from serviceworker');
    return data.length && data || getRestaurants(event).then(restaurants => {
      console.log('fetched now storing');
      return dbPromise.then(db => {
        let tx = db.transaction('restaurants', 'readwrite');
        let store = tx.objectStore('restaurants');
        restaurants.forEach(function (restaurant) {
          store.put(restaurant);
        });
        return tx.done;
      }).then(() => {
        console.log('stored restaurants, now returning');
        return restaurants;
      });
    });
  }).then(finalResponse => {
    console.log(finalResponse);
    return new Response(JSON.stringify(finalResponse));
  }).catch(error => {
    return new Response("Error fetching data", {
      status: 500
    });
  }));
};

const handleReviewsEvents = (event, id) => {
  event.respondWith(dbPromise.then(db => {
    return db.transaction('reviews').objectStore('reviews').index("restaurant_id").getAll(id);
  }).then(data => {
    console.log('serviceworker handle reviews');
    console.log(data);
    return data.length && data || fetch(event.request).then(fetchResponse => {
      return fetchResponse.json();
    }).then(reviews => {
      console.log('using serviceworker fetch');
      console.log('starting to store reviews');
      return dbPromise.then(db => {
        let tx = db.transaction('reviews', 'readwrite');
        let store = tx.objectStore('reviews');
        reviews.forEach(function (review) {
          store.put(review);
        });
        return tx.done;
      }).then(() => reviews);
    });
  }).then(finalResponse => {
    return new Response(JSON.stringify(finalResponse));
  }).catch(error => {
    return new Response("Error fetching data", {
      status: 500
    });
  }));
};

const handleNonAJAXEvent = event => {
  // Check if the HTML request has previously been cached. If so, return the
  // response from the cache. If not, fetch the request, cache it, and then return
  // it.
  event.respondWith(caches.match(event.request).then(response => {
    return response || fetch(event.request).then(fetchResponse => {
      let useCache = isImageURL(event.request.url) ? IMAGES_CACHE : STATIC_CACHE;
      return caches.open(useCache).then(cache => {
        cache.put(event.request, fetchResponse.clone());
        return fetchResponse;
      });
    }).catch(error => {
      return new Response("Application is not connected to the internet", {
        status: 404,
        statusText: "Application is not connected to the internet"
      });
    });
  })); // Updates the data from the network to use on next request.

  event.waitUntil(update(event.request));
};

const update = request => {
  let useCache = isImageURL(request.url) ? IMAGES_CACHE : STATIC_CACHE;
  return caches.open(useCache).then(cache => {
    return fetch(request).then(response => {
      return cache.put(request, response);
    });
  });
};

/***/ }),

/***/ "./node_modules/core-js/modules/_a-function.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_a-function.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_add-to-unscopables.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/_add-to-unscopables.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js")(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_advance-string-index.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/_advance-string-index.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var at = __webpack_require__(/*! ./_string-at */ "./node_modules/core-js/modules/_string-at.js")(true);

 // `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? at(S, index).length : 1);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_an-object.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_an-object.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_array-includes.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/_array-includes.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/modules/_to-iobject.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/modules/_to-length.js");
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ "./node_modules/core-js/modules/_to-absolute-index.js");
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ "./node_modules/core-js/modules/_classof.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_classof.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(/*! ./_cof */ "./node_modules/core-js/modules/_cof.js");
var TAG = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_cof.js":
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_cof.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_core.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_core.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.5' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "./node_modules/core-js/modules/_ctx.js":
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_ctx.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(/*! ./_a-function */ "./node_modules/core-js/modules/_a-function.js");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "./node_modules/core-js/modules/_defined.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_defined.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_descriptors.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_descriptors.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "./node_modules/core-js/modules/_dom-create.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_dom-create.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var document = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "./node_modules/core-js/modules/_enum-bug-keys.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_enum-bug-keys.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ "./node_modules/core-js/modules/_export.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_export.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var core = __webpack_require__(/*! ./_core */ "./node_modules/core-js/modules/_core.js");
var hide = __webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js");
var redefine = __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/modules/_redefine.js");
var ctx = __webpack_require__(/*! ./_ctx */ "./node_modules/core-js/modules/_ctx.js");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ "./node_modules/core-js/modules/_fails.js":
/*!************************************************!*\
  !*** ./node_modules/core-js/modules/_fails.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "./node_modules/core-js/modules/_fix-re-wks.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_fix-re-wks.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(/*! ./es6.regexp.exec */ "./node_modules/core-js/modules/es6.regexp.exec.js");
var redefine = __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/modules/_redefine.js");
var hide = __webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js");
var fails = __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js");
var defined = __webpack_require__(/*! ./_defined */ "./node_modules/core-js/modules/_defined.js");
var wks = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js");
var regexpExec = __webpack_require__(/*! ./_regexp-exec */ "./node_modules/core-js/modules/_regexp-exec.js");

var SPECIES = wks('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = (function () {
  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length === 2 && result[0] === 'a' && result[1] === 'b';
})();

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;
    re.exec = function () { execCalled = true; return null; };
    if (KEY === 'split') {
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
    }
    re[SYMBOL]('');
    return !execCalled;
  }) : undefined;

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var fns = exec(
      defined,
      SYMBOL,
      ''[KEY],
      function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
        if (regexp.exec === regexpExec) {
          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
            // The native String method already delegates to @@method (this
            // polyfilled function), leasing to infinite recursion.
            // We avoid it by directly calling the native @@method method.
            return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
          }
          return { done: true, value: nativeMethod.call(str, regexp, arg2) };
        }
        return { done: false };
      }
    );
    var strfn = fns[0];
    var rxfn = fns[1];

    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};


/***/ }),

/***/ "./node_modules/core-js/modules/_flags.js":
/*!************************************************!*\
  !*** ./node_modules/core-js/modules/_flags.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_function-to-string.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/_function-to-string.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./_shared */ "./node_modules/core-js/modules/_shared.js")('native-function-to-string', Function.toString);


/***/ }),

/***/ "./node_modules/core-js/modules/_global.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_global.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "./node_modules/core-js/modules/_has.js":
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_has.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_hide.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_hide.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js");
var createDesc = __webpack_require__(/*! ./_property-desc */ "./node_modules/core-js/modules/_property-desc.js");
module.exports = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_html.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_html.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js").document;
module.exports = document && document.documentElement;


/***/ }),

/***/ "./node_modules/core-js/modules/_ie8-dom-define.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/_ie8-dom-define.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") && !__webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () {
  return Object.defineProperty(__webpack_require__(/*! ./_dom-create */ "./node_modules/core-js/modules/_dom-create.js")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "./node_modules/core-js/modules/_iobject.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_iobject.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(/*! ./_cof */ "./node_modules/core-js/modules/_cof.js");
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_is-object.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_is-object.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "./node_modules/core-js/modules/_iter-create.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-create.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(/*! ./_object-create */ "./node_modules/core-js/modules/_object-create.js");
var descriptor = __webpack_require__(/*! ./_property-desc */ "./node_modules/core-js/modules/_property-desc.js");
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ "./node_modules/core-js/modules/_set-to-string-tag.js");
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js")(IteratorPrototype, __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),

/***/ "./node_modules/core-js/modules/_iter-define.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-define.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(/*! ./_library */ "./node_modules/core-js/modules/_library.js");
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var redefine = __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/modules/_redefine.js");
var hide = __webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js");
var Iterators = __webpack_require__(/*! ./_iterators */ "./node_modules/core-js/modules/_iterators.js");
var $iterCreate = __webpack_require__(/*! ./_iter-create */ "./node_modules/core-js/modules/_iter-create.js");
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ "./node_modules/core-js/modules/_set-to-string-tag.js");
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ "./node_modules/core-js/modules/_object-gpo.js");
var ITERATOR = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_iter-step.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-step.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),

/***/ "./node_modules/core-js/modules/_iterators.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_iterators.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "./node_modules/core-js/modules/_library.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_library.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "./node_modules/core-js/modules/_object-create.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_object-create.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var dPs = __webpack_require__(/*! ./_object-dps */ "./node_modules/core-js/modules/_object-dps.js");
var enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ "./node_modules/core-js/modules/_enum-bug-keys.js");
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ "./node_modules/core-js/modules/_shared-key.js")('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(/*! ./_dom-create */ "./node_modules/core-js/modules/_dom-create.js")('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(/*! ./_html */ "./node_modules/core-js/modules/_html.js").appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-dp.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-dp.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ "./node_modules/core-js/modules/_ie8-dom-define.js");
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ "./node_modules/core-js/modules/_to-primitive.js");
var dP = Object.defineProperty;

exports.f = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-dps.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-dps.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var getKeys = __webpack_require__(/*! ./_object-keys */ "./node_modules/core-js/modules/_object-keys.js");

module.exports = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-gpo.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gpo.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/modules/_to-object.js");
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ "./node_modules/core-js/modules/_shared-key.js")('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-keys-internal.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/_object-keys-internal.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/modules/_to-iobject.js");
var arrayIndexOf = __webpack_require__(/*! ./_array-includes */ "./node_modules/core-js/modules/_array-includes.js")(false);
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ "./node_modules/core-js/modules/_shared-key.js")('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-keys.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-keys.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(/*! ./_object-keys-internal */ "./node_modules/core-js/modules/_object-keys-internal.js");
var enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ "./node_modules/core-js/modules/_enum-bug-keys.js");

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_property-desc.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_property-desc.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "./node_modules/core-js/modules/_redefine.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_redefine.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var hide = __webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js");
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var SRC = __webpack_require__(/*! ./_uid */ "./node_modules/core-js/modules/_uid.js")('src');
var $toString = __webpack_require__(/*! ./_function-to-string */ "./node_modules/core-js/modules/_function-to-string.js");
var TO_STRING = 'toString';
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__(/*! ./_core */ "./node_modules/core-js/modules/_core.js").inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),

/***/ "./node_modules/core-js/modules/_regexp-exec-abstract.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/_regexp-exec-abstract.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var classof = __webpack_require__(/*! ./_classof */ "./node_modules/core-js/modules/_classof.js");
var builtinExec = RegExp.prototype.exec;

 // `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw new TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }
  if (classof(R) !== 'RegExp') {
    throw new TypeError('RegExp#exec called on incompatible receiver');
  }
  return builtinExec.call(R, S);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_regexp-exec.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_regexp-exec.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var regexpFlags = __webpack_require__(/*! ./_flags */ "./node_modules/core-js/modules/_flags.js");

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var LAST_INDEX = 'lastIndex';

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/,
      re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;
})();

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + re.source + '$(?!\\s)', regexpFlags.call(re));
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX];

    match = nativeExec.call(re, str);

    if (UPDATES_LAST_INDEX_WRONG && match) {
      re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      // eslint-disable-next-line no-loop-func
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

module.exports = patchedExec;


/***/ }),

/***/ "./node_modules/core-js/modules/_set-to-string-tag.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_set-to-string-tag.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js").f;
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var TAG = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),

/***/ "./node_modules/core-js/modules/_shared-key.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_shared-key.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(/*! ./_shared */ "./node_modules/core-js/modules/_shared.js")('keys');
var uid = __webpack_require__(/*! ./_uid */ "./node_modules/core-js/modules/_uid.js");
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ "./node_modules/core-js/modules/_shared.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_shared.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(/*! ./_core */ "./node_modules/core-js/modules/_core.js");
var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(/*! ./_library */ "./node_modules/core-js/modules/_library.js") ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "./node_modules/core-js/modules/_string-at.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_string-at.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ./_to-integer */ "./node_modules/core-js/modules/_to-integer.js");
var defined = __webpack_require__(/*! ./_defined */ "./node_modules/core-js/modules/_defined.js");
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),

/***/ "./node_modules/core-js/modules/_to-absolute-index.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_to-absolute-index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ./_to-integer */ "./node_modules/core-js/modules/_to-integer.js");
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_to-integer.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-integer.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_to-iobject.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-iobject.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(/*! ./_iobject */ "./node_modules/core-js/modules/_iobject.js");
var defined = __webpack_require__(/*! ./_defined */ "./node_modules/core-js/modules/_defined.js");
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ "./node_modules/core-js/modules/_to-length.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-length.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(/*! ./_to-integer */ "./node_modules/core-js/modules/_to-integer.js");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "./node_modules/core-js/modules/_to-object.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-object.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(/*! ./_defined */ "./node_modules/core-js/modules/_defined.js");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ "./node_modules/core-js/modules/_to-primitive.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/_to-primitive.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "./node_modules/core-js/modules/_uid.js":
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_uid.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "./node_modules/core-js/modules/_wks.js":
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_wks.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(/*! ./_shared */ "./node_modules/core-js/modules/_shared.js")('wks');
var uid = __webpack_require__(/*! ./_uid */ "./node_modules/core-js/modules/_uid.js");
var Symbol = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "./node_modules/core-js/modules/es6.array.iterator.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.iterator.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(/*! ./_add-to-unscopables */ "./node_modules/core-js/modules/_add-to-unscopables.js");
var step = __webpack_require__(/*! ./_iter-step */ "./node_modules/core-js/modules/_iter-step.js");
var Iterators = __webpack_require__(/*! ./_iterators */ "./node_modules/core-js/modules/_iterators.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/modules/_to-iobject.js");

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(/*! ./_iter-define */ "./node_modules/core-js/modules/_iter-define.js")(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "./node_modules/core-js/modules/es6.regexp.exec.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.exec.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var regexpExec = __webpack_require__(/*! ./_regexp-exec */ "./node_modules/core-js/modules/_regexp-exec.js");
__webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js")({
  target: 'RegExp',
  proto: true,
  forced: regexpExec !== /./.exec
}, {
  exec: regexpExec
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.regexp.match.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.match.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/modules/_to-length.js");
var advanceStringIndex = __webpack_require__(/*! ./_advance-string-index */ "./node_modules/core-js/modules/_advance-string-index.js");
var regExpExec = __webpack_require__(/*! ./_regexp-exec-abstract */ "./node_modules/core-js/modules/_regexp-exec-abstract.js");

// @@match logic
__webpack_require__(/*! ./_fix-re-wks */ "./node_modules/core-js/modules/_fix-re-wks.js")('match', 1, function (defined, MATCH, $match, maybeCallNative) {
  return [
    // `String.prototype.match` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.match
    function match(regexp) {
      var O = defined(this);
      var fn = regexp == undefined ? undefined : regexp[MATCH];
      return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
    },
    // `RegExp.prototype[@@match]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
    function (regexp) {
      var res = maybeCallNative($match, regexp, this);
      if (res.done) return res.value;
      var rx = anObject(regexp);
      var S = String(this);
      if (!rx.global) return regExpExec(rx, S);
      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
      var A = [];
      var n = 0;
      var result;
      while ((result = regExpExec(rx, S)) !== null) {
        var matchStr = String(result[0]);
        A[n] = matchStr;
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
        n++;
      }
      return n === 0 ? null : A;
    }
  ];
});


/***/ }),

/***/ "./node_modules/core-js/modules/web.dom.iterable.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/web.dom.iterable.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $iterators = __webpack_require__(/*! ./es6.array.iterator */ "./node_modules/core-js/modules/es6.array.iterator.js");
var getKeys = __webpack_require__(/*! ./_object-keys */ "./node_modules/core-js/modules/_object-keys.js");
var redefine = __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/modules/_redefine.js");
var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var hide = __webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js");
var Iterators = __webpack_require__(/*! ./_iterators */ "./node_modules/core-js/modules/_iterators.js");
var wks = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js");
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}


/***/ }),

/***/ "./node_modules/idb/build/esm/chunk.js":
/*!*********************************************!*\
  !*** ./node_modules/idb/build/esm/chunk.js ***!
  \*********************************************/
/*! exports provided: a, b, c, d, e */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return wrap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return addTraps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return instanceOfAny; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return reverseTransformCache; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return unwrap; });
const instanceOfAny = (object, constructors) => constructors.some(c => object instanceof c);

let idbProxyableTypes;
let cursorAdvanceMethods;
// This is a function to prevent it throwing up in node environments.
function getIdbProxyableTypes() {
    return (idbProxyableTypes ||
        (idbProxyableTypes = [
            IDBDatabase,
            IDBObjectStore,
            IDBIndex,
            IDBCursor,
            IDBTransaction,
        ]));
}
// This is a function to prevent it throwing up in node environments.
function getCursorAdvanceMethods() {
    return (cursorAdvanceMethods ||
        (cursorAdvanceMethods = [
            IDBCursor.prototype.advance,
            IDBCursor.prototype.continue,
            IDBCursor.prototype.continuePrimaryKey,
        ]));
}
const cursorRequestMap = new WeakMap();
const transactionDoneMap = new WeakMap();
const transactionStoreNamesMap = new WeakMap();
const transformCache = new WeakMap();
const reverseTransformCache = new WeakMap();
function promisifyRequest(request) {
    const promise = new Promise((resolve, reject) => {
        const unlisten = () => {
            request.removeEventListener('success', success);
            request.removeEventListener('error', error);
        };
        const success = () => {
            resolve(wrap(request.result));
            unlisten();
        };
        const error = () => {
            reject(request.error);
            unlisten();
        };
        request.addEventListener('success', success);
        request.addEventListener('error', error);
    });
    promise
        .then(value => {
        // Since cursoring reuses the IDBRequest (*sigh*), we cache it for later retrieval
        // (see wrapFunction).
        if (value instanceof IDBCursor) {
            cursorRequestMap.set(value, request);
        }
        // Catching to avoid "Uncaught Promise exceptions"
    })
        .catch(() => { });
    // This mapping exists in reverseTransformCache but doesn't doesn't exist in transformCache. This
    // is because we create many promises from a single IDBRequest.
    reverseTransformCache.set(promise, request);
    return promise;
}
function cacheDonePromiseForTransaction(tx) {
    // Early bail if we've already created a done promise for this transaction.
    if (transactionDoneMap.has(tx))
        return;
    const done = new Promise((resolve, reject) => {
        const unlisten = () => {
            tx.removeEventListener('complete', complete);
            tx.removeEventListener('error', error);
            tx.removeEventListener('abort', error);
        };
        const complete = () => {
            resolve();
            unlisten();
        };
        const error = () => {
            reject(tx.error);
            unlisten();
        };
        tx.addEventListener('complete', complete);
        tx.addEventListener('error', error);
        tx.addEventListener('abort', error);
    });
    // Cache it for later retrieval.
    transactionDoneMap.set(tx, done);
}
let idbProxyTraps = {
    get(target, prop, receiver) {
        if (target instanceof IDBTransaction) {
            // Special handling for transaction.done.
            if (prop === 'done')
                return transactionDoneMap.get(target);
            // Polyfill for objectStoreNames because of Edge.
            if (prop === 'objectStoreNames') {
                return target.objectStoreNames || transactionStoreNamesMap.get(target);
            }
            // Make tx.store return the only store in the transaction, or undefined if there are many.
            if (prop === 'store') {
                return receiver.objectStoreNames[1]
                    ? undefined
                    : receiver.objectStore(receiver.objectStoreNames[0]);
            }
        }
        // Else transform whatever we get back.
        return wrap(target[prop]);
    },
    has(target, prop) {
        if (target instanceof IDBTransaction &&
            (prop === 'done' || prop === 'store')) {
            return true;
        }
        return prop in target;
    },
};
function addTraps(callback) {
    idbProxyTraps = callback(idbProxyTraps);
}
function wrapFunction(func) {
    // Due to expected object equality (which is enforced by the caching in `wrap`), we
    // only create one new func per func.
    // Edge doesn't support objectStoreNames (booo), so we polyfill it here.
    if (func === IDBDatabase.prototype.transaction &&
        !('objectStoreNames' in IDBTransaction.prototype)) {
        return function (storeNames, ...args) {
            const tx = func.call(unwrap(this), storeNames, ...args);
            transactionStoreNamesMap.set(tx, storeNames.sort ? storeNames.sort() : [storeNames]);
            return wrap(tx);
        };
    }
    // Cursor methods are special, as the behaviour is a little more different to standard IDB. In
    // IDB, you advance the cursor and wait for a new 'success' on the IDBRequest that gave you the
    // cursor. It's kinda like a promise that can resolve with many values. That doesn't make sense
    // with real promises, so each advance methods returns a new promise for the cursor object, or
    // undefined if the end of the cursor has been reached.
    if (getCursorAdvanceMethods().includes(func)) {
        return function (...args) {
            // Calling the original function with the proxy as 'this' causes ILLEGAL INVOCATION, so we use
            // the original object.
            func.apply(unwrap(this), args);
            return wrap(cursorRequestMap.get(this));
        };
    }
    return function (...args) {
        // Calling the original function with the proxy as 'this' causes ILLEGAL INVOCATION, so we use
        // the original object.
        return wrap(func.apply(unwrap(this), args));
    };
}
function transformCachableValue(value) {
    if (typeof value === 'function')
        return wrapFunction(value);
    // This doesn't return, it just creates a 'done' promise for the transaction,
    // which is later returned for transaction.done (see idbObjectHandler).
    if (value instanceof IDBTransaction)
        cacheDonePromiseForTransaction(value);
    if (instanceOfAny(value, getIdbProxyableTypes()))
        return new Proxy(value, idbProxyTraps);
    // Return the same value back if we're not going to transform it.
    return value;
}
function wrap(value) {
    // We sometimes generate multiple promises from a single IDBRequest (eg when cursoring), because
    // IDB is weird and a single IDBRequest can yield many responses, so these can't be cached.
    if (value instanceof IDBRequest)
        return promisifyRequest(value);
    // If we've already transformed this value before, reuse the transformed value.
    // This is faster, but it also provides object equality.
    if (transformCache.has(value))
        return transformCache.get(value);
    const newValue = transformCachableValue(value);
    // Not all types are transformed.
    // These may be primitive types, so they can't be WeakMap keys.
    if (newValue !== value) {
        transformCache.set(value, newValue);
        reverseTransformCache.set(newValue, value);
    }
    return newValue;
}
const unwrap = (value) => reverseTransformCache.get(value);




/***/ }),

/***/ "./node_modules/idb/build/esm/index.js":
/*!*********************************************!*\
  !*** ./node_modules/idb/build/esm/index.js ***!
  \*********************************************/
/*! exports provided: unwrap, wrap, openDB, deleteDB */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "openDB", function() { return openDB; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteDB", function() { return deleteDB; });
/* harmony import */ var _chunk_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chunk.js */ "./node_modules/idb/build/esm/chunk.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "unwrap", function() { return _chunk_js__WEBPACK_IMPORTED_MODULE_0__["e"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "wrap", function() { return _chunk_js__WEBPACK_IMPORTED_MODULE_0__["a"]; });




/**
 * Open a database.
 *
 * @param name Name of the database.
 * @param version Schema version.
 * @param callbacks Additional callbacks.
 */
function openDB(name, version, { blocked, upgrade, blocking } = {}) {
    const request = indexedDB.open(name, version);
    const openPromise = Object(_chunk_js__WEBPACK_IMPORTED_MODULE_0__["a"])(request);
    if (upgrade) {
        request.addEventListener('upgradeneeded', event => {
            upgrade(Object(_chunk_js__WEBPACK_IMPORTED_MODULE_0__["a"])(request.result), event.oldVersion, event.newVersion, Object(_chunk_js__WEBPACK_IMPORTED_MODULE_0__["a"])(request.transaction));
        });
    }
    if (blocked)
        request.addEventListener('blocked', () => blocked());
    if (blocking) {
        openPromise.then(db => db.addEventListener('versionchange', blocking)).catch(() => { });
    }
    return openPromise;
}
/**
 * Delete a database.
 *
 * @param name Name of the database.
 */
function deleteDB(name, { blocked } = {}) {
    const request = indexedDB.deleteDatabase(name);
    if (blocked)
        request.addEventListener('blocked', () => blocked());
    return Object(_chunk_js__WEBPACK_IMPORTED_MODULE_0__["a"])(request).then(() => undefined);
}

const readMethods = ['get', 'getKey', 'getAll', 'getAllKeys', 'count'];
const writeMethods = ['put', 'add', 'delete', 'clear'];
const cachedMethods = new Map();
function getMethod(target, prop) {
    if (!(target instanceof IDBDatabase &&
        !(prop in target) &&
        typeof prop === 'string')) {
        return;
    }
    if (cachedMethods.get(prop))
        return cachedMethods.get(prop);
    const targetFuncName = prop.replace(/FromIndex$/, '');
    const useIndex = prop !== targetFuncName;
    const isWrite = writeMethods.includes(targetFuncName);
    if (
    // Bail if the target doesn't exist on the target. Eg, getAll isn't in Edge.
    !(targetFuncName in (useIndex ? IDBIndex : IDBObjectStore).prototype) ||
        !(isWrite || readMethods.includes(targetFuncName))) {
        return;
    }
    const method = async function (storeName, ...args) {
        // isWrite ? 'readwrite' : undefined gzipps better, but fails in Edge :(
        const tx = this.transaction(storeName, isWrite ? 'readwrite' : 'readonly');
        let target = tx.store;
        if (useIndex)
            target = target.index(args.shift());
        const returnVal = target[targetFuncName](...args);
        if (isWrite)
            await tx.done;
        return returnVal;
    };
    cachedMethods.set(prop, method);
    return method;
}
Object(_chunk_js__WEBPACK_IMPORTED_MODULE_0__["b"])(oldTraps => ({
    get: (target, prop, receiver) => getMethod(target, prop) || oldTraps.get(target, prop, receiver),
    has: (target, prop) => !!getMethod(target, prop) || oldTraps.has(target, prop),
}));




/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NyYy9kYmhlbHBlci5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc3JjL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NyYy9yZWdpc3RyYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3N3LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2EtZnVuY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fYWRkLXRvLXVuc2NvcGFibGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2FkdmFuY2Utc3RyaW5nLWluZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2FuLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19hcnJheS1pbmNsdWRlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19jbGFzc29mLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2NvZi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19jb3JlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2N0eC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19kZWZpbmVkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2Rlc2NyaXB0b3JzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2RvbS1jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fZW51bS1idWcta2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19leHBvcnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fZmFpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fZml4LXJlLXdrcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19mbGFncy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19mdW5jdGlvbi10by1zdHJpbmcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fZ2xvYmFsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2hhcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19oaWRlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2h0bWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faWU4LWRvbS1kZWZpbmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pcy1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faXRlci1jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faXRlci1kZWZpbmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faXRlci1zdGVwLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2l0ZXJhdG9ycy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19saWJyYXJ5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWRwLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1kcHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWdwby5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19vYmplY3Qta2V5cy1pbnRlcm5hbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19vYmplY3Qta2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19wcm9wZXJ0eS1kZXNjLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3JlZGVmaW5lLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3JlZ2V4cC1leGVjLWFic3RyYWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3JlZ2V4cC1leGVjLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3NldC10by1zdHJpbmctdGFnLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3NoYXJlZC1rZXkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fc2hhcmVkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3N0cmluZy1hdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL190by1hYnNvbHV0ZS1pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL190by1pbnRlZ2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3RvLWlvYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fdG8tbGVuZ3RoLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3RvLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL190by1wcmltaXRpdmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fdWlkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3drcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5hcnJheS5pdGVyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5yZWdleHAuZXhlYy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5yZWdleHAubWF0Y2guanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pZGIvYnVpbGQvZXNtL2NodW5rLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pZGIvYnVpbGQvZXNtL2luZGV4LmpzIl0sIm5hbWVzIjpbIkRCSGVscGVyIiwiREFUQUJBU0VfVVJMIiwicG9ydCIsIkRBVEFCQVNFX1JFVklFV1NfVVJMIiwiZmV0Y2hSZXN0YXVyYW50cyIsImNhbGxiYWNrIiwiZmV0Y2giLCJ0aGVuIiwicmVzcG9uc2UiLCJqc29uIiwicmVzdGF1cmFudHMiLCJmZXRjaFJldmlld3MiLCJyZXN0YXVyYW50X2lkIiwiZmV0Y2hVUkwiLCJyZXZpZXdzIiwiY2F0Y2giLCJlcnJvciIsImZldGNoUmVzdGF1cmFudEJ5SWQiLCJpZCIsInJlc3RhdXJhbnQiLCJmaW5kIiwiciIsImZldGNoUmVzdGF1cmFudEJ5Q3Vpc2luZSIsImN1aXNpbmUiLCJyZXN1bHRzIiwiZmlsdGVyIiwiY3Vpc2luZV90eXBlIiwiZmV0Y2hSZXN0YXVyYW50QnlOZWlnaGJvcmhvb2QiLCJuZWlnaGJvcmhvb2QiLCJmZXRjaFJlc3RhdXJhbnRCeUN1aXNpbmVBbmROZWlnaGJvcmhvb2QiLCJmZXRjaE5laWdoYm9yaG9vZHMiLCJuZWlnaGJvcmhvb2RzIiwibWFwIiwidiIsImkiLCJ1bmlxdWVOZWlnaGJvcmhvb2RzIiwiaW5kZXhPZiIsImZldGNoQ3Vpc2luZXMiLCJjdWlzaW5lcyIsInVuaXF1ZUN1aXNpbmVzIiwidXJsRm9yUmVzdGF1cmFudCIsImltYWdlVXJsRm9yUmVzdGF1cmFudCIsInBob3RvZ3JhcGgiLCJtYXBNYXJrZXJGb3JSZXN0YXVyYW50IiwibWFya2VyIiwiTCIsImxhdGxuZyIsImxhdCIsImxuZyIsInRpdGxlIiwibmFtZSIsImFsdCIsInVybCIsImFkZFRvIiwibmV3TWFwIiwidXBkYXRlQ2FjaGVkUmVzdGF1cmFudFJldmlldyIsImZvcm1EYXRhIiwiY29uc29sZSIsImxvZyIsImRiUHJvbWlzZSIsImRiIiwidHgiLCJ0cmFuc2FjdGlvbiIsInN0b3JlIiwib2JqZWN0U3RvcmUiLCJwdXQiLCJkb25lIiwiZWRpdFJldmlldyIsImVkaXRpbmciLCJnZXQiLCJyZXZpZXciLCJuZXdSZXZpZXciLCJPYmplY3QiLCJhc3NpZ24iLCJjb21wbGV0ZSIsInN1Ym1pdFJldmlldyIsIm1ldGhvZCIsImFkZFBlbmRpbmdSZXF1ZXN0VG9RdWUiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImRhdGEiLCJuZXh0UGVuZGluZyIsImF0dGVtcHRDb21taXRQZW5kaW5nIiwiaiIsImJvZHkiLCJvYmplY3RTdG9yZU5hbWVzIiwibGVuZ3RoIiwiY2xvc2UiLCJvcGVuQ3Vyc29yIiwiY3Vyc29yIiwidmFsdWUiLCJkZWxldGUiLCJwcm9wZXJ0aWVzIiwiSlNPTiIsInN0cmluZ2lmeSIsIm9rIiwicmVkaXJlY3RlZCIsImRlbHR4Iiwic3luY1Jlc3RhdXJhbnQiLCJpc19mYXZvcml0ZSIsInVwZGF0ZVJlc3RhdXJhbnRJbkRCIiwibmV3X3Jlc3RhdXJhbnQiLCJ0b2dnbGVGYXZCdG4iLCJmYXZCdG4iLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiaW5uZXJIVE1MIiwic3R5bGUiLCJiYWNrZ3JvdW5kIiwiZGVsZXRlQ2FjaGVkUmV2aWV3IiwicmV2aWV3X2lkIiwiZGVsZXRlUmV2aWV3IiwiZGVsZXRlVGVtcFJldmlldyIsInRlbXBfaWQiLCJtYXJrZXJzIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50IiwiaW5pdE1hcCIsInVwZGF0ZVJlc3RhdXJhbnRzIiwic2VsZiIsImZpbGxOZWlnaGJvcmhvb2RzSFRNTCIsInNlbGVjdCIsImZvckVhY2giLCJvcHRpb24iLCJjcmVhdGVFbGVtZW50IiwiYXBwZW5kIiwiZmlsbEN1aXNpbmVzSFRNTCIsImNlbnRlciIsInpvb20iLCJzY3JvbGxXaGVlbFpvb20iLCJ0aWxlTGF5ZXIiLCJtYXBib3hUb2tlbiIsIm1heFpvb20iLCJhdHRyaWJ1dGlvbiIsImNTZWxlY3QiLCJuU2VsZWN0IiwiY0luZGV4Iiwic2VsZWN0ZWRJbmRleCIsIm5JbmRleCIsInJlc2V0UmVzdGF1cmFudHMiLCJmaWxsUmVzdGF1cmFudHNIVE1MIiwidWwiLCJyZW1vdmUiLCJjcmVhdGVSZXN0YXVyYW50SFRNTCIsImFkZE1hcmtlcnNUb01hcCIsImxpIiwiaW1hZ2UiLCJkaXYiLCJjbGFzc05hbWUiLCJzZXRBdHRyaWJ1dGUiLCJzcmMiLCJhZGRyZXNzIiwibW9yZSIsImNsYXNzTGlzdCIsIm9uY2xpY2siLCJ3aW5kb3ciLCJsb2NhdGlvbiIsIm9uIiwib25DbGljayIsImhyZWYiLCJvcHRpb25zIiwicHVzaCIsIm5hdmlnYXRvciIsInNlcnZpY2VXb3JrZXIiLCJyZWdpc3RlciIsInJlZ2lzdHJhdGlvbiIsInJlZ2lzdHJhdGlvbkVycm9yIiwiY2FjaGVWZXJzaW9uIiwiU1RBVElDX0NBQ0hFIiwiSU1BR0VTX0NBQ0hFIiwiYWxsQ2FjaGVzIiwib3BlbkRCIiwidXBncmFkZSIsIm9sZFZlcnNpb24iLCJjcmVhdGVPYmplY3RTdG9yZSIsImtleVBhdGgiLCJjcmVhdGVJbmRleCIsInJldmlld3NTdG9yZSIsInBlbmRpbmdTdG9yZSIsImF1dG9JbmNyZW1lbnQiLCJnZXRSZXN0YXVyYW50cyIsInJlcXVlc3QiLCJyZXNwIiwiaXNJbWFnZVVSTCIsImltZ1R5cGVzIiwiaXNJbWFnZSIsInR5cGUiLCJlbmRzV2l0aCIsIndhaXRVbnRpbCIsImNhY2hlcyIsIm9wZW4iLCJjYWNoZSIsImFkZEFsbCIsImtleXMiLCJjYWNoZU5hbWVzIiwiYWxsIiwiY2FjaGVOYW1lIiwic3RhcnRzV2l0aCIsImNoZWNrVXJsIiwiVVJMIiwic2VhcmNoUGFyYW1zIiwiaGFuZGxlQUpBWEV2ZW50IiwiaGFuZGxlTm9uQUpBWEV2ZW50IiwicmVzcG9uZFdpdGgiLCJoYW5kbGVSZXN0YXVyYW50RXZlbnRzIiwiaGFuZGxlUmV2aWV3c0V2ZW50cyIsImdldEFsbCIsImZpbmFsUmVzcG9uc2UiLCJSZXNwb25zZSIsInN0YXR1cyIsImluZGV4IiwiZmV0Y2hSZXNwb25zZSIsIm1hdGNoIiwidXNlQ2FjaGUiLCJjbG9uZSIsInN0YXR1c1RleHQiLCJ1cGRhdGUiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtR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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbURBQVE7QUFDUjtBQUNBO0FBQ0EsQ0FBQzs7QUFFMkIiLCJmaWxlIjoiYXBwLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vYXBwL3NyYy9tYWluLmpzXCIpO1xuIiwiLyoqXG4gKiBDb21tb24gZGF0YWJhc2UgaGVscGVyIGZ1bmN0aW9ucy5cbiAqL1xuaW1wb3J0IHsgb3BlbkRCLCBkZWxldGVEQiwgd3JhcCwgdW53cmFwIH0gZnJvbSAnaWRiJztcbmltcG9ydCB7ZGJQcm9taXNlfSBmcm9tICcuLi9zdy5qcyc7XG5cbi8vIGNvbnN0IGRiUHJvbWlzZSA9IG9wZW5EQigncnItZGInLCAzLCB7XG4vLyAgIHVwZ3JhZGUoZGIsIG9sZFZlcnNpb24pIHtcbi8vICAgICBzd2l0Y2ggKG9sZFZlcnNpb24pIHtcbi8vICAgICAgIGNhc2UgMDpcbi8vICAgICAgICAgY29uc3Qgc3RvcmUgPSBkYi5jcmVhdGVPYmplY3RTdG9yZSgncmVzdGF1cmFudHMnLCB7IGtleVBhdGg6ICdpZCcsIH0pO1xuLy8gICAgICAgICBzdG9yZS5jcmVhdGVJbmRleCgnaWQnLCAnaWQnKTtcbi8vICAgICAgIGNhc2UgMTpcbi8vICAgICAgICAgY29uc3QgcmV2aWV3c1N0b3JlID0gZGIuY3JlYXRlT2JqZWN0U3RvcmUoJ3Jldmlld3MnLCB7XG4vLyAgICAgICAgICAga2V5UGF0aDogJ2lkJyxcbi8vICAgICAgICAgfSk7XG4vLyAgICAgICAgIHJldmlld3NTdG9yZS5jcmVhdGVJbmRleChcInJlc3RhdXJhbnRfaWRcIiwgXCJyZXN0YXVyYW50X2lkXCIpO1xuLy8gICAgICAgY2FzZSAyOlxuLy8gICAgICAgICBjb25zdCBwZW5kaW5nU3RvcmUgPSBkYi5jcmVhdGVPYmplY3RTdG9yZSgncGVuZGluZycsIHtcbi8vICAgICAgICAgICBrZXlQYXRoOiAnaWQnLFxuLy8gICAgICAgICAgIGF1dG9JbmNyZW1lbnQ6IHRydWVcbi8vICAgICAgICAgfSlcbi8vICAgICB9XG4vLyAgIH1cbi8vIH0pO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEQkhlbHBlciB7XG5cbiAgLyoqXG4gICAqIERhdGFiYXNlIFVSTC5cbiAgICogQ2hhbmdlIHRoaXMgdG8gcmVzdGF1cmFudHMuanNvbiBmaWxlIGxvY2F0aW9uIG9uIHlvdXIgc2VydmVyLlxuICAgKi9cbiAgc3RhdGljIGdldCBEQVRBQkFTRV9VUkwoKSB7XG4gICAgY29uc3QgcG9ydCA9IDEzMzcvLyBDaGFuZ2UgdGhpcyB0byB5b3VyIHNlcnZlciBwb3J0XG4gICAgcmV0dXJuIGBodHRwOi8vbG9jYWxob3N0OiR7cG9ydH0vcmVzdGF1cmFudHNgO1xuICB9XG5cbiAgc3RhdGljIGdldCBEQVRBQkFTRV9SRVZJRVdTX1VSTCgpIHtcbiAgICBjb25zdCBwb3J0ID0gMTMzNyAvLyBDaGFuZ2UgdGhpcyB0byB5b3VyIHNlcnZlciBwb3J0XG4gICAgcmV0dXJuIGBodHRwOi8vbG9jYWxob3N0OiR7cG9ydH0vcmV2aWV3c2A7XG4gIH1cblxuICAvKipcbiAgICogRmV0Y2ggYWxsIHJlc3RhdXJhbnRzLlxuICAgKi9cbiAgc3RhdGljIGZldGNoUmVzdGF1cmFudHMoY2FsbGJhY2spIHtcbiAgICBmZXRjaChEQkhlbHBlci5EQVRBQkFTRV9VUkwpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgIHJlc3BvbnNlLmpzb24oKS50aGVuKGZ1bmN0aW9uKHJlc3RhdXJhbnRzKSB7XG4gICAgICAgIGNhbGxiYWNrKG51bGwsIHJlc3RhdXJhbnRzKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIGZldGNoUmV2aWV3cyggcmVzdGF1cmFudF9pZCwgY2FsbGJhY2spIHtcbiAgICBsZXQgZmV0Y2hVUkwgPSBEQkhlbHBlci5EQVRBQkFTRV9SRVZJRVdTX1VSTCArIFwiLz9yZXN0YXVyYW50X2lkPVwiICsgcmVzdGF1cmFudF9pZDtcbiAgICBmZXRjaChmZXRjaFVSTCkudGhlbiggcmVzcG9uc2UgPT4ge1xuICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICB9KS50aGVuKHJldmlld3MgPT4ge1xuICAgICAgICBjYWxsYmFjayhudWxsLCByZXZpZXdzKTtcbiAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgY2FsbGJhY2soZXJyb3IsIG51bGwpO1xuICAgICAgfSk7XG4gIH1cblxuICBzdGF0aWMgZmV0Y2hSZXN0YXVyYW50QnlJZChpZCwgY2FsbGJhY2spIHtcbiAgICAvLyBmZXRjaCBhbGwgcmVzdGF1cmFudHMgd2l0aCBwcm9wZXIgZXJyb3IgaGFuZGxpbmcuXG4gICAgREJIZWxwZXIuZmV0Y2hSZXN0YXVyYW50cygoZXJyb3IsIHJlc3RhdXJhbnRzKSA9PiB7XG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgY2FsbGJhY2soZXJyb3IsIG51bGwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgcmVzdGF1cmFudCA9IHJlc3RhdXJhbnRzLmZpbmQociA9PiByLmlkID09IGlkKTtcbiAgICAgICAgaWYgKHJlc3RhdXJhbnQpIHsgLy8gR290IHRoZSByZXN0YXVyYW50XG4gICAgICAgICAgY2FsbGJhY2sobnVsbCwgcmVzdGF1cmFudCk7XG4gICAgICAgIH0gZWxzZSB7IC8vIFJlc3RhdXJhbnQgZG9lcyBub3QgZXhpc3QgaW4gdGhlIGRhdGFiYXNlXG4gICAgICAgICAgY2FsbGJhY2soJ1Jlc3RhdXJhbnQgZG9lcyBub3QgZXhpc3QnLCBudWxsKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEZldGNoIHJlc3RhdXJhbnRzIGJ5IGEgY3Vpc2luZSB0eXBlIHdpdGggcHJvcGVyIGVycm9yIGhhbmRsaW5nLlxuICAgKi9cbiAgc3RhdGljIGZldGNoUmVzdGF1cmFudEJ5Q3Vpc2luZShjdWlzaW5lLCBjYWxsYmFjaykge1xuICAgIC8vIEZldGNoIGFsbCByZXN0YXVyYW50cyAgd2l0aCBwcm9wZXIgZXJyb3IgaGFuZGxpbmdcbiAgICBEQkhlbHBlci5mZXRjaFJlc3RhdXJhbnRzKChlcnJvciwgcmVzdGF1cmFudHMpID0+IHtcbiAgICAgIGlmIChlcnJvcikge1xuICAgICAgICBjYWxsYmFjayhlcnJvciwgbnVsbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBGaWx0ZXIgcmVzdGF1cmFudHMgdG8gaGF2ZSBvbmx5IGdpdmVuIGN1aXNpbmUgdHlwZVxuICAgICAgICBjb25zdCByZXN1bHRzID0gcmVzdGF1cmFudHMuZmlsdGVyKHIgPT4gci5jdWlzaW5lX3R5cGUgPT0gY3Vpc2luZSk7XG4gICAgICAgIGNhbGxiYWNrKG51bGwsIHJlc3VsdHMpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEZldGNoIHJlc3RhdXJhbnRzIGJ5IGEgbmVpZ2hib3Job29kIHdpdGggcHJvcGVyIGVycm9yIGhhbmRsaW5nLlxuICAgKi9cbiAgc3RhdGljIGZldGNoUmVzdGF1cmFudEJ5TmVpZ2hib3Job29kKG5laWdoYm9yaG9vZCwgY2FsbGJhY2spIHtcbiAgICAvLyBGZXRjaCBhbGwgcmVzdGF1cmFudHNcbiAgICBEQkhlbHBlci5mZXRjaFJlc3RhdXJhbnRzKChlcnJvciwgcmVzdGF1cmFudHMpID0+IHtcbiAgICAgIGlmIChlcnJvcikge1xuICAgICAgICBjYWxsYmFjayhlcnJvciwgbnVsbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBGaWx0ZXIgcmVzdGF1cmFudHMgdG8gaGF2ZSBvbmx5IGdpdmVuIG5laWdoYm9yaG9vZFxuICAgICAgICBjb25zdCByZXN1bHRzID0gcmVzdGF1cmFudHMuZmlsdGVyKHIgPT4gci5uZWlnaGJvcmhvb2QgPT0gbmVpZ2hib3Job29kKTtcbiAgICAgICAgY2FsbGJhY2sobnVsbCwgcmVzdWx0cyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogRmV0Y2ggcmVzdGF1cmFudHMgYnkgYSBjdWlzaW5lIGFuZCBhIG5laWdoYm9yaG9vZCB3aXRoIHByb3BlciBlcnJvciBoYW5kbGluZy5cbiAgICovXG4gIHN0YXRpYyBmZXRjaFJlc3RhdXJhbnRCeUN1aXNpbmVBbmROZWlnaGJvcmhvb2QoY3Vpc2luZSwgbmVpZ2hib3Job29kLCBjYWxsYmFjaykge1xuICAgIC8vIEZldGNoIGFsbCByZXN0YXVyYW50c1xuICAgIERCSGVscGVyLmZldGNoUmVzdGF1cmFudHMoKGVycm9yLCByZXN0YXVyYW50cykgPT4ge1xuICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgIGNhbGxiYWNrKGVycm9yLCBudWxsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCByZXN1bHRzID0gcmVzdGF1cmFudHNcbiAgICAgICAgaWYgKGN1aXNpbmUgIT0gJ2FsbCcpIHsgLy8gZmlsdGVyIGJ5IGN1aXNpbmVcbiAgICAgICAgICByZXN1bHRzID0gcmVzdWx0cy5maWx0ZXIociA9PiByLmN1aXNpbmVfdHlwZSA9PSBjdWlzaW5lKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmVpZ2hib3Job29kICE9ICdhbGwnKSB7IC8vIGZpbHRlciBieSBuZWlnaGJvcmhvb2RcbiAgICAgICAgICByZXN1bHRzID0gcmVzdWx0cy5maWx0ZXIociA9PiByLm5laWdoYm9yaG9vZCA9PSBuZWlnaGJvcmhvb2QpO1xuICAgICAgICB9XG4gICAgICAgIGNhbGxiYWNrKG51bGwsIHJlc3VsdHMpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEZldGNoIGFsbCBuZWlnaGJvcmhvb2RzIHdpdGggcHJvcGVyIGVycm9yIGhhbmRsaW5nLlxuICAgKi9cbiAgc3RhdGljIGZldGNoTmVpZ2hib3Job29kcyhjYWxsYmFjaykge1xuICAgIC8vIEZldGNoIGFsbCByZXN0YXVyYW50c1xuICAgIERCSGVscGVyLmZldGNoUmVzdGF1cmFudHMoKGVycm9yLCByZXN0YXVyYW50cykgPT4ge1xuICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgIGNhbGxiYWNrKGVycm9yLCBudWxsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEdldCBhbGwgbmVpZ2hib3Job29kcyBmcm9tIGFsbCByZXN0YXVyYW50c1xuICAgICAgICBjb25zdCBuZWlnaGJvcmhvb2RzID0gcmVzdGF1cmFudHMubWFwKCh2LCBpKSA9PiByZXN0YXVyYW50c1tpXS5uZWlnaGJvcmhvb2QpXG4gICAgICAgIC8vIFJlbW92ZSBkdXBsaWNhdGVzIGZyb20gbmVpZ2hib3Job29kc1xuICAgICAgICBjb25zdCB1bmlxdWVOZWlnaGJvcmhvb2RzID0gbmVpZ2hib3Job29kcy5maWx0ZXIoKHYsIGkpID0+IG5laWdoYm9yaG9vZHMuaW5kZXhPZih2KSA9PSBpKVxuICAgICAgICBjYWxsYmFjayhudWxsLCB1bmlxdWVOZWlnaGJvcmhvb2RzKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGZXRjaCBhbGwgY3Vpc2luZXMgd2l0aCBwcm9wZXIgZXJyb3IgaGFuZGxpbmcuXG4gICAqL1xuICBzdGF0aWMgZmV0Y2hDdWlzaW5lcyhjYWxsYmFjaykge1xuICAgIC8vIEZldGNoIGFsbCByZXN0YXVyYW50c1xuICAgIERCSGVscGVyLmZldGNoUmVzdGF1cmFudHMoKGVycm9yLCByZXN0YXVyYW50cykgPT4ge1xuICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgIGNhbGxiYWNrKGVycm9yLCBudWxsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEdldCBhbGwgY3Vpc2luZXMgZnJvbSBhbGwgcmVzdGF1cmFudHNcbiAgICAgICAgY29uc3QgY3Vpc2luZXMgPSByZXN0YXVyYW50cy5tYXAoKHYsIGkpID0+IHJlc3RhdXJhbnRzW2ldLmN1aXNpbmVfdHlwZSlcbiAgICAgICAgLy8gUmVtb3ZlIGR1cGxpY2F0ZXMgZnJvbSBjdWlzaW5lc1xuICAgICAgICBjb25zdCB1bmlxdWVDdWlzaW5lcyA9IGN1aXNpbmVzLmZpbHRlcigodiwgaSkgPT4gY3Vpc2luZXMuaW5kZXhPZih2KSA9PSBpKVxuICAgICAgICBjYWxsYmFjayhudWxsLCB1bmlxdWVDdWlzaW5lcyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmVzdGF1cmFudCBwYWdlIFVSTC5cbiAgICovXG4gIHN0YXRpYyB1cmxGb3JSZXN0YXVyYW50KHJlc3RhdXJhbnQpIHtcbiAgICByZXR1cm4gKGAvcmVzdGF1cmFudC5odG1sP2lkPSR7cmVzdGF1cmFudC5pZH1gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXN0YXVyYW50IGltYWdlIFVSTC5cbiAgICovXG4gIHN0YXRpYyBpbWFnZVVybEZvclJlc3RhdXJhbnQocmVzdGF1cmFudCkge1xuICAgIGlmKCFyZXN0YXVyYW50LnBob3RvZ3JhcGgpIHtcbiAgICAgIHJldHVybiAoYC9pbWcvJHtyZXN0YXVyYW50LmlkfS5qcGdgKVxuICAgIH1cbiAgICByZXR1cm4gKGAvaW1nLyR7cmVzdGF1cmFudC5waG90b2dyYXBofS5qcGdgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNYXAgbWFya2VyIGZvciBhIHJlc3RhdXJhbnQuXG4gICAqL1xuICBzdGF0aWMgbWFwTWFya2VyRm9yUmVzdGF1cmFudChyZXN0YXVyYW50LCBtYXApIHtcbiAgICAvLyBodHRwczovL2xlYWZsZXRqcy5jb20vcmVmZXJlbmNlLTEuMy4wLmh0bWwjbWFya2VyXG4gICAgY29uc3QgbWFya2VyID0gbmV3IEwubWFya2VyKFtyZXN0YXVyYW50LmxhdGxuZy5sYXQsIHJlc3RhdXJhbnQubGF0bG5nLmxuZ10sXG4gICAgICB7dGl0bGU6IHJlc3RhdXJhbnQubmFtZSxcbiAgICAgIGFsdDogcmVzdGF1cmFudC5uYW1lLFxuICAgICAgdXJsOiBEQkhlbHBlci51cmxGb3JSZXN0YXVyYW50KHJlc3RhdXJhbnQpXG4gICAgICB9KVxuICAgICAgbWFya2VyLmFkZFRvKG5ld01hcCk7XG4gICAgcmV0dXJuIG1hcmtlcjtcbiAgfVxuXG4gIHN0YXRpYyB1cGRhdGVDYWNoZWRSZXN0YXVyYW50UmV2aWV3KGZvcm1EYXRhKSB7XG4gICAgY29uc29sZS5sb2coJ3VwZGF0aW5nIGNhY2hlIGZvciBuZXcgcmV2aWV3JywgZm9ybURhdGEpO1xuICAgIHJldHVybiBkYlByb21pc2UudGhlbiggZGIgPT4ge1xuICAgICAgY29uc3QgdHggPSBkYi50cmFuc2FjdGlvbigncmV2aWV3cycsICdyZWFkd3JpdGUnKTtcbiAgICAgIGNvbnN0IHN0b3JlID0gdHgub2JqZWN0U3RvcmUoJ3Jldmlld3MnKTtcbiAgICAgIHN0b3JlLnB1dChmb3JtRGF0YSk7XG4gICAgICBjb25zb2xlLmxvZygnc3VjY2Vzc2Z1bGx5IHB1dCByZXZpZXcgaW4gc3RvcmUnKTtcbiAgICAgIHJldHVybiB0eC5kb25lO1xuICAgIH0pXG4gIH1cblxuLyoqXG4qIEdyYWIgdGhlIG9yaWdpbmFsIHJldmlldyBmcm9tIHRoZSBkYiBhbmQgcmVwbGFjZSB3aXRoIGVkaXRlZCByZXZpZXdcbiovXG4gIHN0YXRpYyBlZGl0UmV2aWV3KGZvcm1EYXRhLCBlZGl0aW5nKSB7XG4gICAgcmV0dXJuIGRiUHJvbWlzZS50aGVuKGRiID0+IHtcbiAgICAgIGxldCB0eCA9IGRiLnRyYW5zYWN0aW9uKCdyZXZpZXdzJyk7XG4gICAgICBsZXQgc3RvcmUgPSB0eC5vYmplY3RTdG9yZSgncmV2aWV3cycpO1xuICAgICAgcmV0dXJuIHN0b3JlLmdldChlZGl0aW5nLmlkKTtcbiAgICB9KS50aGVuKCByZXZpZXcgPT4ge1xuICAgICAgcmV0dXJuIGRiUHJvbWlzZS50aGVuKGRiID0+IHtcbiAgICAgICAgbGV0IHR4ID0gZGIudHJhbnNhY3Rpb24oJ3Jldmlld3MnLCAncmVhZHdyaXRlJyk7XG4gICAgICAgIGxldCBzdG9yZSA9IHR4Lm9iamVjdFN0b3JlKCdyZXZpZXdzJyk7XG4gICAgICAgIGxldCBuZXdSZXZpZXcgPSBPYmplY3QuYXNzaWduKHt9LCByZXZpZXcsIGZvcm1EYXRhKTtcbiAgICAgICAgc3RvcmUucHV0KG5ld1Jldmlldyk7XG4gICAgICAgIHJldHVybiB0eC5jb21wbGV0ZTtcbiAgICAgIH0pXG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgc3VibWl0UmV2aWV3KGZvcm1EYXRhLCBlZGl0aW5nKSB7XG4gICAgY29uc29sZS5sb2coZWRpdGluZyk7XG4gICAgY29uc3QgbWV0aG9kID0gZWRpdGluZyA/IFwiUFVUXCIgOiBcIlBPU1RcIjtcbiAgICBjb25zdCB1cmwgPSBlZGl0aW5nID8gYCR7REJIZWxwZXIuREFUQUJBU0VfUkVWSUVXU19VUkx9LyR7ZWRpdGluZy5pZH1gIDogREJIZWxwZXIuREFUQUJBU0VfUkVWSUVXU19VUkw7XG4gICAgaWYgKGVkaXRpbmcpIHtcbiAgICAgIERCSGVscGVyLmVkaXRSZXZpZXcoZm9ybURhdGEsIGVkaXRpbmcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBEQkhlbHBlci51cGRhdGVDYWNoZWRSZXN0YXVyYW50UmV2aWV3KGZvcm1EYXRhKTtcbiAgICB9XG4gICAgcmV0dXJuIERCSGVscGVyLmFkZFBlbmRpbmdSZXF1ZXN0VG9RdWUodXJsLCBtZXRob2QsIGZvcm1EYXRhKTtcbiAgfVxuXG4gIHN0YXRpYyBhZGRQZW5kaW5nUmVxdWVzdFRvUXVlKHVybCwgbWV0aG9kLCBmb3JtRGF0YSkge1xuICAgIC8vb3BlbiBkYXRhYmFzZSBhbmQgYWRkIHJlcXVlc3QgZGV0YWlscyB0byB0aGUgcGVuZGluZyBzdG9yZVxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBkYlByb21pc2UudGhlbihkYiA9PiB7XG4gICAgICBjb25zdCB0eCA9IGRiLnRyYW5zYWN0aW9uKCdwZW5kaW5nJywgJ3JlYWR3cml0ZScpO1xuICAgICAgY29uc3Qgc3RvcmUgPSB0eC5vYmplY3RTdG9yZSgncGVuZGluZycpO1xuICAgICAgcmV0dXJuIHN0b3JlLnB1dCh7XG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICB1cmwsXG4gICAgICAgICAgbWV0aG9kLFxuICAgICAgICAgIGZvcm1EYXRhXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgY29uc29sZS5sb2coYEVycm9yIHB1dHRpbmcgZGF0YSBpbiBwZW5kaW5nIGRiOiAke2Vycm9yfWApO1xuICAgIH0pLnRoZW4oREJIZWxwZXIubmV4dFBlbmRpbmcoKGVycm9yLCBqc29uKSA9PiB7XG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9yKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXNvbHZlKGpzb24pO1xuICAgIH0pKTtcbiAgfSk7XG4gIH1cblxuICBzdGF0aWMgbmV4dFBlbmRpbmcoY2FsbGJhY2spIHtcbiAgICBEQkhlbHBlci5hdHRlbXB0Q29tbWl0UGVuZGluZyhEQkhlbHBlci5uZXh0UGVuZGluZykudGhlbihqID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGopO1xuICAgICAgY2FsbGJhY2sobnVsbCwgaik7XG4gICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgIGNhbGxiYWNrKGVycm9yKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyBhdHRlbXB0Q29tbWl0UGVuZGluZyhjYWxsYmFjaykge1xuICAgIC8vIEl0ZXJhdGUgb3ZlciB0aGUgcGVuZGluZyBpdGVtcyB1bnRpbCB0aGVyZSBpcyBhIG5ldHdvcmsgZmFpbHVyZVxuICAgIGxldCB1cmw7XG4gICAgbGV0IG1ldGhvZDtcbiAgICBsZXQgYm9keTtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSggKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgZGJQcm9taXNlLnRoZW4oZGIgPT4ge1xuICAgICAgICBpZiAoIWRiLm9iamVjdFN0b3JlTmFtZXMubGVuZ3RoKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJEQiBub3QgYXZhaWxhYmxlXCIpO1xuICAgICAgICAgIGRiLmNsb3NlKCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHR4ID0gZGIudHJhbnNhY3Rpb24oJ3BlbmRpbmcnLCAncmVhZHdyaXRlJyk7XG4gICAgICAgIGNvbnN0IHN0b3JlID0gdHgub2JqZWN0U3RvcmUoJ3BlbmRpbmcnKTtcbiAgICAgICAgc3RvcmUub3BlbkN1cnNvcigpLnRoZW4oIGN1cnNvciA9PiB7XG4gICAgICAgICAgaWYgKCFjdXJzb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdubyBtb3JlIGN1cnNvcnMnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgdmFsdWUgPSBjdXJzb3IudmFsdWU7XG4gICAgICAgICAgdXJsID0gdmFsdWUuZGF0YS51cmw7XG4gICAgICAgICAgbWV0aG9kID0gdmFsdWUuZGF0YS5tZXRob2Q7XG4gICAgICAgICAgYm9keSA9IHZhbHVlLmRhdGEuZm9ybURhdGE7XG5cbiAgICAgICAgICAvLyBJZiB3ZSBkb24ndCBoYXZlIGEgcGFyYW1ldGVyIHRoZW4gd2UncmUgb24gYSBiYWQgcmVjb3JkIHRoYXQgc2hvdWxkIGJlIHRvc3NlZFxuICAgICAgICAgIC8vIGFuZCB0aGVuIG1vdmUgb25cbiAgICAgICAgICBpZiAoKCF1cmwgfHwgIW1ldGhvZCkgfHwgKG1ldGhvZCA9PT0gXCJQT1NUXCIgJiYgIWJvZHkpKSB7XG4gICAgICAgICAgICBjdXJzb3JcbiAgICAgICAgICAgICAgLmRlbGV0ZSgpXG4gICAgICAgICAgICAgIC50aGVuKGNhbGxiYWNrKTtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2RlbGV0ZWQgYSBiYWQgY3Vyc29yJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIGNvbnN0IHByb3BlcnRpZXMgPSB7XG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShib2R5KSxcbiAgICAgICAgICAgIG1ldGhvZDogbWV0aG9kXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZmV0Y2godXJsLCBwcm9wZXJ0aWVzKS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcblxuICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5vayAmJiAhcmVzcG9uc2UucmVkaXJlY3RlZCkge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZygndGhpcyBpcyB0aGUgcmVzcG9uc2UgYW5kIHdlIGFyZSBvZmZsaW5lJyk7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKS50aGVuKGpzb24gPT4ge1xuICAgICAgICAgICAgICBjb25zdCBkZWx0eCA9IGRiLnRyYW5zYWN0aW9uKCdwZW5kaW5nJywgJ3JlYWR3cml0ZScpO1xuICAgICAgICAgICAgICBjb25zdCBzdG9yZSA9IGRlbHR4Lm9iamVjdFN0b3JlKCdwZW5kaW5nJyk7XG4gICAgICAgICAgICAgIHJldHVybiBzdG9yZS5vcGVuQ3Vyc29yKClcbiAgICAgICAgICAgICAgLnRoZW4oIGN1cnNvciA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGN1cnNvci5kZWxldGUoKVxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGN1cnNvci52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZGVsZXRlZCBpdGVtIGZyb20gcGVuZGluZyBzdG9yZScpO1xuICAgICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGpzb24pO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoanNvbik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuIHJlamVjdCgnbm8gbmV0d29yaycpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIHN5bmNSZXN0YXVyYW50KHJlc3RhdXJhbnQpIHtcbiAgICAgICBsZXQgdXJsID0gYGh0dHA6Ly9sb2NhbGhvc3Q6MTMzNy9yZXN0YXVyYW50cy8ke3Jlc3RhdXJhbnQuaWR9Lz9pc19mYXZvcml0ZT0ke3Jlc3RhdXJhbnQuaXNfZmF2b3JpdGV9YDtcbiAgICAgICBsZXQgbWV0aG9kID0gJ1BVVCc7XG4gICAgICAgREJIZWxwZXIuYWRkUGVuZGluZ1JlcXVlc3RUb1F1ZSh1cmwsIG1ldGhvZCkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgY29uc29sZS5sb2coJ2Vycm9yIHVwZGF0aW5nIHJlc3RhdXJhbnQgYmFja2VuZCBkYXRhLi4uJywgZXJyb3IsIHJlc3RhdXJhbnQpO1xuICAgICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIHVwZGF0ZVJlc3RhdXJhbnRJbkRCKG5ld19yZXN0YXVyYW50KSB7XG4gICAgcmV0dXJuIGRiUHJvbWlzZS50aGVuKGZ1bmN0aW9uKGRiKXtcbiAgICAgIGxldCB0eCA9IGRiLnRyYW5zYWN0aW9uKCdyZXN0YXVyYW50cycsICdyZWFkd3JpdGUnKTtcbiAgICAgIGxldCBzdG9yZSA9IHR4Lm9iamVjdFN0b3JlKCdyZXN0YXVyYW50cycpO1xuICAgICAgc3RvcmUucHV0KG5ld19yZXN0YXVyYW50KTtcbiAgICAgIHJldHVybiB0eC5jb21wbGV0ZVxuICAgIH0pLnRoZW4oZnVuY3Rpb24oKXtcbiAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG5ld19yZXN0YXVyYW50KTtcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyB0b2dnbGVGYXZCdG4ocmVzdGF1cmFudF9pZCkge1xuICAgIHJldHVybiBkYlByb21pc2UudGhlbiggZGIgPT4ge1xuICAgICAgbGV0IHR4ID0gZGIudHJhbnNhY3Rpb24oJ3Jlc3RhdXJhbnRzJyk7XG4gICAgICBsZXQgc3RvcmUgPSB0eC5vYmplY3RTdG9yZSgncmVzdGF1cmFudHMnKTtcbiAgICAgIHJldHVybiBzdG9yZS5nZXQocmVzdGF1cmFudF9pZCk7XG4gICAgfSkudGhlbiggcmVzdGF1cmFudCA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhyZXN0YXVyYW50KTtcbiAgICAgIGNvbnN0IG5ld19yZXN0YXVyYW50ID0gT2JqZWN0LmFzc2lnbih7fSwgcmVzdGF1cmFudCk7XG4gICAgICBuZXdfcmVzdGF1cmFudC5pc19mYXZvcml0ZSA9IChyZXN0YXVyYW50LmlzX2Zhdm9yaXRlID09PSAndHJ1ZScgfHwgcmVzdGF1cmFudC5pc19mYXZvcml0ZSA9PT0gdHJ1ZSkgP1xuICAgICAgJ2ZhbHNlJyA6ICd0cnVlJztcbiAgICAgIERCSGVscGVyLnN5bmNSZXN0YXVyYW50KG5ld19yZXN0YXVyYW50KTtcbiAgICAgIHJldHVybiBEQkhlbHBlci51cGRhdGVSZXN0YXVyYW50SW5EQihuZXdfcmVzdGF1cmFudCk7XG4gICAgfSkudGhlbiggbmV3X3Jlc3RhdXJhbnQgPT4ge1xuICAgICAgY29uc3QgZmF2QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGZhdi1idG4tJHtuZXdfcmVzdGF1cmFudC5pZH1gKTtcbiAgICAgIGlmKG5ld19yZXN0YXVyYW50LmlzX2Zhdm9yaXRlID09PSAndHJ1ZScgfHwgbmV3X3Jlc3RhdXJhbnQuaXNfZmF2b3JpdGUgPT09IHRydWUpIHtcbiAgICAgICAgZmF2QnRuLmlubmVySFRNTCA9ICdGYXZvcml0ZWQhJztcbiAgICAgICAgZmF2QnRuLnN0eWxlLmJhY2tncm91bmQgPSAnaG90cGluayc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmYXZCdG4uaW5uZXJIVE1MID0gJ0FkZCB0byBmYXZvcml0ZSc7XG4gICAgICAgIGZhdkJ0bi5zdHlsZS5iYWNrZ3JvdW5kID0gJ2dyZXknO1xuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBzdGF0aWMgZGVsZXRlQ2FjaGVkUmV2aWV3KHJldmlld19pZCkge1xuICAgIHJldHVybiBkYlByb21pc2UudGhlbihkYiA9PiB7XG4gICAgICBsZXQgdHggPSBkYi50cmFuc2FjdGlvbigncmV2aWV3cycsICdyZWFkd3JpdGUnKVxuICAgICAgbGV0IHN0b3JlID0gIHR4Lm9iamVjdFN0b3JlKCdyZXZpZXdzJyk7XG4gICAgICBzdG9yZS5kZWxldGUocmV2aWV3X2lkKTtcbiAgICAgIGNvbnNvbGUubG9nKCdkZWxldGVkIHJldmlldyBmcm9tIGlkYicpO1xuICAgICAgcmV0dXJuIHR4LmNvbXBsZXRlO1xuICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKCdlcnJvciBkZWxldGluZyByZXZpZXc6ICcsIGVycm9yKTtcbiAgICB9KTtcbiAgfVxuXG5cbiAgc3RhdGljIGRlbGV0ZVJldmlldyhyZXZpZXdfaWQpIHtcbiAgICBjb25zdCB1cmwgPSBgJHtEQkhlbHBlci5EQVRBQkFTRV9SRVZJRVdTX1VSTH0vJHtyZXZpZXdfaWR9YDtcbiAgICBjb25zb2xlLmxvZyh1cmwpO1xuICAgIGNvbnN0IG1ldGhvZCA9IFwiREVMRVRFXCI7XG4gICAgREJIZWxwZXIuZGVsZXRlQ2FjaGVkUmV2aWV3KHJldmlld19pZCk7XG4gICAgcmV0dXJuIERCSGVscGVyLmFkZFBlbmRpbmdSZXF1ZXN0VG9RdWUodXJsLCBtZXRob2QpO1xuICB9XG5cbiAgc3RhdGljIGRlbGV0ZVRlbXBSZXZpZXcodGVtcF9pZCkge1xuICAgIGRiUHJvbWlzZS50aGVuKGRiID0+IHtcbiAgICAgIGxldCB0eCA9IGRiLnRyYW5zYWN0aW9uKCdyZXZpZXdzJywgJ3JlYWR3cml0ZScpXG4gICAgICBsZXQgc3RvcmUgPSB0eC5vYmplY3RTdG9yZSgncmV2aWV3cycpO1xuICAgICAgc3RvcmUuZGVsZXRlKHRlbXBfaWQpO1xuICAgICAgY29uc29sZS5sb2coJ2RlbGV0ZWQgb2xkdmVyc2lvbiBvZiByZXZpZXcgd2l0aCBvbGQgaWQnKTtcbiAgICAgIHJldHVybiB0eC5jb21wbGV0ZTtcbiAgICB9KS5jYXRjaCggZXJyb3IgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ2Vycm9yIGRlbGV0aW5nIHRlbXAgcmV2aWV3OiAnLCBlcnJvcik7XG4gICAgfSlcbiAgfVxufVxuXG5cbiIsImltcG9ydCByZWdpc3RyYXRpb24gZnJvbSAnLi9yZWdpc3RyYXRpb24nO1xuaW1wb3J0IERCSGVscGVyIGZyb20gJy4vZGJoZWxwZXInO1xuXG5sZXQgcmVzdGF1cmFudHMsXG4gIG5laWdoYm9yaG9vZHMsXG4gIGN1aXNpbmVzXG52YXIgbmV3TWFwO1xudmFyIG1hcmtlcnMgPSBbXTtcblxuLyoqXG4gKiBGZXRjaCBuZWlnaGJvcmhvb2RzIGFuZCBjdWlzaW5lcyBhcyBzb29uIGFzIHRoZSBwYWdlIGlzIGxvYWRlZC5cbiAqL1xuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIChldmVudCkgPT4ge1xuICBpbml0TWFwKCk7XG4gIHVwZGF0ZVJlc3RhdXJhbnRzKCk7XG4gIGZldGNoTmVpZ2hib3Job29kcygpO1xuICBmZXRjaEN1aXNpbmVzKCk7XG4gIERCSGVscGVyLm5leHRQZW5kaW5nKCk7XG59KTtcblxuLyoqXG4gKiBGZXRjaCBhbGwgbmVpZ2hib3Job29kcyBhbmQgc2V0IHRoZWlyIEhUTUwuXG4gKi9cbmNvbnN0IGZldGNoTmVpZ2hib3Job29kcyA9ICgpID0+IHtcbiAgREJIZWxwZXIuZmV0Y2hOZWlnaGJvcmhvb2RzKChlcnJvciwgbmVpZ2hib3Job29kcykgPT4ge1xuICAgIGlmIChlcnJvcikgeyAvLyBHb3QgYW4gZXJyb3JcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzZWxmLm5laWdoYm9yaG9vZHMgPSBuZWlnaGJvcmhvb2RzO1xuICAgICAgZmlsbE5laWdoYm9yaG9vZHNIVE1MKCk7XG4gICAgfVxuICB9KTtcbn1cblxuLyoqXG4gKiBTZXQgbmVpZ2hib3Job29kcyBIVE1MLlxuICovXG5jb25zdCBmaWxsTmVpZ2hib3Job29kc0hUTUwgPSAobmVpZ2hib3Job29kcyA9IHNlbGYubmVpZ2hib3Job29kcykgPT4ge1xuICBjb25zdCBzZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmVpZ2hib3Job29kcy1zZWxlY3QnKTtcbiAgc2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHVwZGF0ZVJlc3RhdXJhbnRzKTtcbiAgbmVpZ2hib3Job29kcy5mb3JFYWNoKG5laWdoYm9yaG9vZCA9PiB7XG4gICAgY29uc3Qgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XG4gICAgb3B0aW9uLmlubmVySFRNTCA9IG5laWdoYm9yaG9vZDtcbiAgICBvcHRpb24udmFsdWUgPSBuZWlnaGJvcmhvb2Q7XG4gICAgc2VsZWN0LmFwcGVuZChvcHRpb24pO1xuICB9KTtcbn1cblxuLyoqXG4gKiBGZXRjaCBhbGwgY3Vpc2luZXMgYW5kIHNldCB0aGVpciBIVE1MLlxuICovXG5jb25zdCBmZXRjaEN1aXNpbmVzID0gKCkgPT4ge1xuICBEQkhlbHBlci5mZXRjaEN1aXNpbmVzKChlcnJvciwgY3Vpc2luZXMpID0+IHtcbiAgICBpZiAoZXJyb3IpIHsgLy8gR290IGFuIGVycm9yIVxuICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNlbGYuY3Vpc2luZXMgPSBjdWlzaW5lcztcbiAgICAgIGZpbGxDdWlzaW5lc0hUTUwoKTtcbiAgICB9XG4gIH0pO1xufVxuXG4vKipcbiAqIFNldCBjdWlzaW5lcyBIVE1MLlxuICovXG5jb25zdCBmaWxsQ3Vpc2luZXNIVE1MID0gKGN1aXNpbmVzID0gc2VsZi5jdWlzaW5lcykgPT4ge1xuICBjb25zdCBzZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3Vpc2luZXMtc2VsZWN0Jyk7XG4gIHNlbGVjdC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB1cGRhdGVSZXN0YXVyYW50cyk7XG5cbiAgY3Vpc2luZXMuZm9yRWFjaChjdWlzaW5lID0+IHtcbiAgICBjb25zdCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcbiAgICBvcHRpb24uaW5uZXJIVE1MID0gY3Vpc2luZTtcbiAgICBvcHRpb24udmFsdWUgPSBjdWlzaW5lO1xuICAgIHNlbGVjdC5hcHBlbmQob3B0aW9uKTtcbiAgfSk7XG59XG5cbi8qKlxuICogSW5pdGlhbGl6ZSBsZWFmbGV0IG1hcCwgY2FsbGVkIGZyb20gSFRNTC5cbiAqL1xuY29uc3QgaW5pdE1hcCA9ICgpID0+IHtcbiAgbmV3TWFwID0gTC5tYXAoJ21hcCcsIHtcbiAgICAgICAgY2VudGVyOiBbNDAuNzIyMjE2LCAtNzMuOTg3NTAxXSxcbiAgICAgICAgem9vbTogMTIsXG4gICAgICAgIHNjcm9sbFdoZWVsWm9vbTogZmFsc2VcbiAgICAgIH0pO1xuICBzZWxmLm5ld01hcCA9IG5ld01hcDtcbiAgTC50aWxlTGF5ZXIoJ2h0dHBzOi8vYXBpLnRpbGVzLm1hcGJveC5jb20vdjQve2lkfS97en0ve3h9L3t5fS5qcGc3MD9hY2Nlc3NfdG9rZW49e21hcGJveFRva2VufScsIHtcbiAgICBtYXBib3hUb2tlbjogJ3BrLmV5SjFJam9pZDJWdWRHbHVJaXdpWVNJNkltTnFhWEowTjI1aVpqRndkall6YTNBNE1HdDFhSFUyYmpFaWZRLkRuTkZVb041dXp3MDFsX1hLX2M3blEnLFxuICAgIG1heFpvb206IDE4LFxuICAgIGF0dHJpYnV0aW9uOiAnTWFwIGRhdGEgJmNvcHk7IDxhIGhyZWY9XCJodHRwczovL3d3dy5vcGVuc3RyZWV0bWFwLm9yZy9cIj5PcGVuU3RyZWV0TWFwPC9hPiBjb250cmlidXRvcnMsICcgK1xuICAgICAgJzxhIGhyZWY9XCJodHRwczovL2NyZWF0aXZlY29tbW9ucy5vcmcvbGljZW5zZXMvYnktc2EvMi4wL1wiPkNDLUJZLVNBPC9hPiwgJyArXG4gICAgICAnSW1hZ2VyeSDCqSA8YSBocmVmPVwiaHR0cHM6Ly93d3cubWFwYm94LmNvbS9cIj5NYXBib3g8L2E+JyxcbiAgICBpZDogJ21hcGJveC5zdHJlZXRzJ1xuICB9KS5hZGRUbyhuZXdNYXApO1xuXG59XG5cbi8qKlxuICogVXBkYXRlIHBhZ2UgYW5kIG1hcCBmb3IgY3VycmVudCByZXN0YXVyYW50cy5cbiAqL1xuY29uc3QgdXBkYXRlUmVzdGF1cmFudHMgPSAoKSA9PiB7XG4gIGNvbnN0IGNTZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3Vpc2luZXMtc2VsZWN0Jyk7XG4gIGNvbnN0IG5TZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmVpZ2hib3Job29kcy1zZWxlY3QnKTtcblxuICBjb25zdCBjSW5kZXggPSBjU2VsZWN0LnNlbGVjdGVkSW5kZXg7XG4gIGNvbnN0IG5JbmRleCA9IG5TZWxlY3Quc2VsZWN0ZWRJbmRleDtcblxuICBjb25zdCBjdWlzaW5lID0gY1NlbGVjdFtjSW5kZXhdLnZhbHVlO1xuICBjb25zdCBuZWlnaGJvcmhvb2QgPSBuU2VsZWN0W25JbmRleF0udmFsdWU7XG5cbiAgREJIZWxwZXIuZmV0Y2hSZXN0YXVyYW50QnlDdWlzaW5lQW5kTmVpZ2hib3Job29kKGN1aXNpbmUsIG5laWdoYm9yaG9vZCwgKGVycm9yLCByZXN0YXVyYW50cykgPT4ge1xuICAgIGlmIChlcnJvcikgeyAvLyBHb3QgYW4gZXJyb3IhXG4gICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzZXRSZXN0YXVyYW50cyhyZXN0YXVyYW50cyk7XG4gICAgICBmaWxsUmVzdGF1cmFudHNIVE1MKCk7XG4gICAgfVxuICB9KVxufVxuXG4vKipcbiAqIENsZWFyIGN1cnJlbnQgcmVzdGF1cmFudHMsIHRoZWlyIEhUTUwgYW5kIHJlbW92ZSB0aGVpciBtYXAgbWFya2Vycy5cbiAqL1xuY29uc3QgcmVzZXRSZXN0YXVyYW50cyA9IChyZXN0YXVyYW50cykgPT4ge1xuICAvLyBSZW1vdmUgYWxsIHJlc3RhdXJhbnRzXG4gIHNlbGYucmVzdGF1cmFudHMgPSBbXTtcbiAgY29uc3QgdWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzdGF1cmFudHMtbGlzdCcpO1xuICB1bC5pbm5lckhUTUwgPSAnJztcblxuICAvLyBSZW1vdmUgYWxsIG1hcCBtYXJrZXJzXG4gIGlmIChzZWxmLm1hcmtlcnMpIHtcbiAgICBzZWxmLm1hcmtlcnMuZm9yRWFjaChtYXJrZXIgPT4gbWFya2VyLnJlbW92ZSgpKTtcbiAgfVxuICBzZWxmLm1hcmtlcnMgPSBbXTtcbiAgc2VsZi5yZXN0YXVyYW50cyA9IHJlc3RhdXJhbnRzO1xufVxuXG4vKipcbiAqIENyZWF0ZSBhbGwgcmVzdGF1cmFudHMgSFRNTCBhbmQgYWRkIHRoZW0gdG8gdGhlIHdlYnBhZ2UuXG4gKi9cbmNvbnN0IGZpbGxSZXN0YXVyYW50c0hUTUwgPSAocmVzdGF1cmFudHMgPSBzZWxmLnJlc3RhdXJhbnRzKSA9PiB7XG4gIGNvbnN0IHVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc3RhdXJhbnRzLWxpc3QnKTtcbiAgcmVzdGF1cmFudHMuZm9yRWFjaChyZXN0YXVyYW50ID0+IHtcbiAgICB1bC5hcHBlbmQoY3JlYXRlUmVzdGF1cmFudEhUTUwocmVzdGF1cmFudCkpO1xuICB9KTtcbiAgYWRkTWFya2Vyc1RvTWFwKCk7XG59XG5cbi8qKlxuICogQ3JlYXRlIHJlc3RhdXJhbnQgSFRNTC5cbiAqL1xuY29uc3QgY3JlYXRlUmVzdGF1cmFudEhUTUwgPSAocmVzdGF1cmFudCkgPT4ge1xuICBjb25zdCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG5cbiAgY29uc3QgaW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGltYWdlLmNsYXNzTmFtZSA9ICdyZXN0YXVyYW50LWltZyc7XG4gIGltYWdlLnNldEF0dHJpYnV0ZSgnYWx0JywgcmVzdGF1cmFudC5uYW1lKTtcbiAgaW1hZ2Uuc3JjID0gREJIZWxwZXIuaW1hZ2VVcmxGb3JSZXN0YXVyYW50KHJlc3RhdXJhbnQpO1xuICBkaXYuYXBwZW5kKGltYWdlKTtcbiAgbGkuYXBwZW5kKGRpdik7XG5cbiAgY29uc3QgbmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gxJyk7XG4gIG5hbWUuaW5uZXJIVE1MID0gcmVzdGF1cmFudC5uYW1lO1xuICBsaS5hcHBlbmQobmFtZSk7XG5cbiAgY29uc3QgbmVpZ2hib3Job29kID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICBuZWlnaGJvcmhvb2QuaW5uZXJIVE1MID0gcmVzdGF1cmFudC5uZWlnaGJvcmhvb2Q7XG4gIGxpLmFwcGVuZChuZWlnaGJvcmhvb2QpO1xuXG4gIGNvbnN0IGFkZHJlc3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gIGFkZHJlc3MuaW5uZXJIVE1MID0gcmVzdGF1cmFudC5hZGRyZXNzO1xuICBsaS5hcHBlbmQoYWRkcmVzcyk7XG5cbiAgY29uc3QgZmF2QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gIGlmIChyZXN0YXVyYW50LmlzX2Zhdm9yaXRlID09PSBcInRydWVcIiB8fCByZXN0YXVyYW50LmlzX2Zhdm9yaXRlID09PSB0cnVlKSB7XG4gICAgZmF2QnRuLmlubmVySFRNTCA9ICdGYXZvcml0ZWQhJztcbiAgICBmYXZCdG4uc3R5bGUuYmFja2dyb3VuZCA9ICdob3RwaW5rJztcbiAgfSBlbHNlIHtcbiAgICBmYXZCdG4uaW5uZXJIVE1MID0gJ0FkZCB0byBmYXZvcml0ZSc7XG4gICAgZmF2QnRuLnN0eWxlLmJhY2tncm91bmQgPSAnZ3JleSc7XG4gIH1cbiAgZmF2QnRuLnNldEF0dHJpYnV0ZShcInRpdGxlXCIsIGB0b2dnbGUgZmF2b3JpdGVzIGZvcjogJHtyZXN0YXVyYW50Lm5hbWV9YCk7XG4gIGZhdkJ0bi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgZmF2LWJ0bi0ke3Jlc3RhdXJhbnQuaWR9YCk7XG4gIGZhdkJ0bi5zZXRBdHRyaWJ1dGUoXCJkYXRhLXJlc3RhdXJhbnQtaWRcIiwgcmVzdGF1cmFudC5pZCk7XG5cbiAgZmF2QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgREJIZWxwZXIudG9nZ2xlRmF2QnRuKHJlc3RhdXJhbnQuaWQpO1xuICB9KVxuXG4gIGxpLmFwcGVuZChmYXZCdG4pO1xuXG4gIGNvbnN0IG1vcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgbW9yZS5jbGFzc0xpc3QgPSBcImJ1dHRvbiBidXR0b24tLXN1Y2Nlc3NcIjtcbiAgbW9yZS5pbm5lckhUTUwgPSAnVmlldyBEZXRhaWxzJztcbiAgbW9yZS5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIsIHJlc3RhdXJhbnQubmFtZSArIHJlc3RhdXJhbnQubmVpZ2hib3Job29kICsgcmVzdGF1cmFudC5hZGRyZXNzICsgXCJWaWV3IERldGFpbHNcIik7XG4gIG1vcmUub25jbGljayA9ICgpID0+IHtcbiAgICBjb25zdCB1cmwgPSBEQkhlbHBlci51cmxGb3JSZXN0YXVyYW50KHJlc3RhdXJhbnQpO1xuICAgIHdpbmRvdy5sb2NhdGlvbiA9IHVybDtcbiAgfVxuICBsaS5hcHBlbmQobW9yZSk7XG5cbiAgcmV0dXJuIGxpXG59XG5cbi8qKlxuICogQWRkIG1hcmtlcnMgZm9yIGN1cnJlbnQgcmVzdGF1cmFudHMgdG8gdGhlIG1hcC5cbiAqL1xuY29uc3QgYWRkTWFya2Vyc1RvTWFwID0gKHJlc3RhdXJhbnRzID0gc2VsZi5yZXN0YXVyYW50cykgPT4ge1xuICByZXN0YXVyYW50cy5mb3JFYWNoKHJlc3RhdXJhbnQgPT4ge1xuICAgIC8vIEFkZCBtYXJrZXIgdG8gdGhlIG1hcFxuICAgIGNvbnN0IG1hcmtlciA9IERCSGVscGVyLm1hcE1hcmtlckZvclJlc3RhdXJhbnQocmVzdGF1cmFudCwgbmV3TWFwKTtcbiAgICBtYXJrZXIub24oXCJjbGlja1wiLCBvbkNsaWNrKTtcbiAgICBmdW5jdGlvbiBvbkNsaWNrKCkge1xuICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBtYXJrZXIub3B0aW9ucy51cmw7XG4gICAgfVxuICAgIHNlbGYubWFya2Vycy5wdXNoKG1hcmtlcik7XG4gIH0pO1xufVxuXG4iLCJleHBvcnQgZGVmYXVsdCAoZnVuY3Rpb24gKCkge1xuXG4gIGlmICgnc2VydmljZVdvcmtlcicgaW4gbmF2aWdhdG9yKSB7XG4gICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcbiAgICAgbmF2aWdhdG9yLnNlcnZpY2VXb3JrZXIucmVnaXN0ZXIoJy9zZXJ2aWNld29ya2VyLmJ1bmRsZS5qcycpLnRoZW4ocmVnaXN0cmF0aW9uID0+IHtcbiAgICAgICBjb25zb2xlLmxvZygnU1cgcmVnaXN0ZXJlZDogJywgcmVnaXN0cmF0aW9uKTtcbiAgICAgfSkuY2F0Y2gocmVnaXN0cmF0aW9uRXJyb3IgPT4ge1xuICAgICAgIGNvbnNvbGUubG9nKCdTVyByZWdpc3RyYXRpb24gZmFpbGVkOiAnLCByZWdpc3RyYXRpb25FcnJvcik7XG4gICAgIH0pO1xuICAgfSk7XG4gIH1cblxufSkoKTtcblxuXG4iLCJjb25zdCBjYWNoZVZlcnNpb24gPSAnMyc7XG5jb25zdCBTVEFUSUNfQ0FDSEUgPSBgcmVzdGF1cmFudC1jYWNoZS12JHtjYWNoZVZlcnNpb259YDtcbmNvbnN0IElNQUdFU19DQUNIRSA9IGBpbWFnZXNfY2FjaGUtdmA7XG5jb25zdCBhbGxDYWNoZXMgPSBbXG4gIFNUQVRJQ19DQUNIRSxcbiAgSU1BR0VTX0NBQ0hFXG5dO1xuaW1wb3J0IHsgb3BlbkRCLCBkZWxldGVEQiwgd3JhcCwgdW53cmFwIH0gZnJvbSAnaWRiJztcbmV4cG9ydCB7ZGJQcm9taXNlfVxuXG5jb25zdCBkYlByb21pc2UgPSBvcGVuREIoJ3JyLWRiJywgMywge1xuICB1cGdyYWRlKGRiLCBvbGRWZXJzaW9uKSB7XG4gICAgc3dpdGNoIChvbGRWZXJzaW9uKSB7XG4gICAgICBjYXNlIDA6XG4gICAgICAgIGNvbnN0IHN0b3JlID0gZGIuY3JlYXRlT2JqZWN0U3RvcmUoJ3Jlc3RhdXJhbnRzJywgeyBrZXlQYXRoOiAnaWQnIH0pO1xuICAgICAgICBzdG9yZS5jcmVhdGVJbmRleCgnaWQnLCAnaWQnKTtcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgY29uc3QgcmV2aWV3c1N0b3JlID0gZGIuY3JlYXRlT2JqZWN0U3RvcmUoJ3Jldmlld3MnLCB7XG4gICAgICAgICAga2V5UGF0aDogJ2lkJyxcbiAgICAgICAgICAvLyBhdXRvSW5jcmVtZW50OiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICByZXZpZXdzU3RvcmUuY3JlYXRlSW5kZXgoXCJyZXN0YXVyYW50X2lkXCIsIFwicmVzdGF1cmFudF9pZFwiKTtcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgY29uc3QgcGVuZGluZ1N0b3JlID0gZGIuY3JlYXRlT2JqZWN0U3RvcmUoJ3BlbmRpbmcnLCB7XG4gICAgICAgICAga2V5UGF0aDogJ2lkJyxcbiAgICAgICAgICBhdXRvSW5jcmVtZW50OiB0cnVlXG4gICAgICAgIH0pO1xuICAgIH1cbiAgfVxufSk7XG5cbiBjb25zdCBnZXRSZXN0YXVyYW50cyA9IChldmVudCkgPT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIGZldGNoKGV2ZW50LnJlcXVlc3QpXG4gICAgICAudGhlbihyZXNwID0+IHJlc3AuanNvbigpKVxuICAgICAgLnRoZW4oanNvbiA9PiB7IHJlc29sdmUoanNvbik7IH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG5mdW5jdGlvbiBpc0ltYWdlVVJMKHVybCkge1xuICBsZXQgaW1nVHlwZXMgPSBbXCJwbmdcIiwgXCJqcGdcIiwgXCJqcGVnXCIsIFwic3ZnXCIsIFwiZ2lmXCJdO1xuICBsZXQgaXNJbWFnZSA9IGZhbHNlO1xuICBmb3IgKGxldCB0eXBlIG9mIGltZ1R5cGVzKSB7XG4gICAgaWYgKHVybC5lbmRzV2l0aCh0eXBlKSkgeyBpc0ltYWdlID0gdHJ1ZTsgYnJlYWt9O1xuICB9XG4gIHJldHVybiBpc0ltYWdlO1xufVxuXG5zZWxmLmFkZEV2ZW50TGlzdGVuZXIoJ2luc3RhbGwnLCBldmVudCA9PiB7XG4gIGV2ZW50LndhaXRVbnRpbChcbiAgICBjYWNoZXMub3BlbihTVEFUSUNfQ0FDSEUpLnRoZW4oY2FjaGUgPT4ge1xuICAgICAgcmV0dXJuIGNhY2hlLmFkZEFsbChbXG4gICAgICAgICcvJyxcbiAgICAgICAgJy4vYXBwLmJ1bmRsZS5qcycsXG4gICAgICAgICcuL3Jlc3RhdXJhbnQuYnVuZGxlLmpzJyxcbiAgICAgICAgJy4vaW1nL3JyX2ljb24ucG5nJyxcbiAgICAgICAgJy4vY3NzL3N0eWxlcy5jc3MnXG4gICAgICBdKS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdlcnJvciBzZXR0aW5nIHVwIGluc3RhbGwgZXZlbnQgZm9yIHN3Jyk7XG4gICAgICB9KTtcbiAgICB9KVxuICApO1xufSk7XG5cbi8vIENsZWFuIHVudXNlZCBjYWNoZXMgd2l0aCBuYW1lcyBzdGFydGluZyB3aXRoIHJlc3RhdXJhbnRcbnNlbGYuYWRkRXZlbnRMaXN0ZW5lcignYWN0aXZhdGUnLCBldmVudCA9PiB7XG4gIGV2ZW50LndhaXRVbnRpbChcbiAgICBjYWNoZXMua2V5cygpLnRoZW4oY2FjaGVOYW1lcyA9PiB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5hbGwoXG4gICAgICAgIGNhY2hlTmFtZXMuZmlsdGVyKGNhY2hlTmFtZSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGNhY2hlTmFtZS5zdGFydHNXaXRoKCdyZXN0YXVyYW50LScpICYmXG4gICAgICAgICAgICAgICAgIGNhY2hlTmFtZSAhPSBTVEFUSUNfQ0FDSEU7XG4gICAgICAgIH0pLm1hcChjYWNoZU5hbWUgPT4ge1xuICAgICAgICAgIHJldHVybiBjYWNoZXMuZGVsZXRlKGNhY2hlTmFtZSk7XG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH0pXG4gICk7XG59KTtcblxuXG5zZWxmLmFkZEV2ZW50TGlzdGVuZXIoJ2ZldGNoJywgZXZlbnQgPT4ge1xuICBsZXQgY2hlY2tVcmwgPSBuZXcgVVJMKGV2ZW50LnJlcXVlc3QudXJsKTtcbiAgaWYgKGNoZWNrVXJsLnBvcnQgPT09IFwiMTMzN1wiKSB7XG4gICAgbGV0IGlkID0gY2hlY2tVcmwuc2VhcmNoUGFyYW1zLmdldCgncmVzdGF1cmFudF9pZCcpIC0gMDtcbiAgICByZXR1cm4gaGFuZGxlQUpBWEV2ZW50KGV2ZW50LCBpZCk7XG4gIH0gZWxzZSB7XG4gICAgaGFuZGxlTm9uQUpBWEV2ZW50KGV2ZW50KTtcbiAgfVxufSk7XG5cbmNvbnN0IGhhbmRsZUFKQVhFdmVudCA9IChldmVudCwgaWQpID0+IHtcbiAgLy8gT25seSB1c2UgZm9yIGNhY2hpbmcgZm9yIEdldCBldmVudHNcbiAgaWYoZXZlbnQucmVxdWVzdC5tZXRob2QgIT09IFwiR0VUXCIpIHtcbiAgICBjb25zb2xlLmxvZyhldmVudC5yZXF1ZXN0KTtcbiAgICBjb25zb2xlLmxvZyhldmVudCk7XG4gICAgZXZlbnQucmVzcG9uZFdpdGgoXG4gICAgICBmZXRjaChldmVudC5yZXF1ZXN0KVxuICAgIClcbiAgfSBlbHNlIGlmKGV2ZW50LnJlcXVlc3QudXJsLmluZGV4T2YoXCJyZXN0YXVyYW50c1wiKSA+IC0xKSB7XG4gICAgaGFuZGxlUmVzdGF1cmFudEV2ZW50cyhldmVudCk7XG4gIH0gZWxzZSB7XG4gICAgY29uc29sZS5sb2coJ3N0YXJ0aW5nIGhhbmRsaW5nIGZyb20gcmV2aWV3cyBldmVudCcpXG4gICAgaGFuZGxlUmV2aWV3c0V2ZW50cyhldmVudCwgaWQpO1xuICB9XG59XG5cbmNvbnN0IGhhbmRsZVJlc3RhdXJhbnRFdmVudHMgPSAoZXZlbnQpID0+IHtcbiAgZXZlbnQucmVzcG9uZFdpdGgoXG4gICAgICBkYlByb21pc2UudGhlbiggZGIgPT4ge1xuICAgICAgICByZXR1cm4gZGJcbiAgICAgICAgICAudHJhbnNhY3Rpb24oJ3Jlc3RhdXJhbnRzJylcbiAgICAgICAgICAub2JqZWN0U3RvcmUoJ3Jlc3RhdXJhbnRzJylcbiAgICAgICAgICAuZ2V0QWxsKCk7XG4gICAgICB9KS50aGVuKGRhdGEgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygncmVzcG9uZGluZyBmcm9tIGhhbmRsZXJlc3RhdXJhbnRldmVudHMgZnJvbSBzZXJ2aWNld29ya2VyJyk7XG4gICAgICAgIHJldHVybiAoKGRhdGEubGVuZ3RoICYmIGRhdGEpIHx8IGdldFJlc3RhdXJhbnRzKGV2ZW50KVxuICAgICAgICAgIC50aGVuKCByZXN0YXVyYW50cyA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZmV0Y2hlZCBub3cgc3RvcmluZycpO1xuICAgICAgICAgICAgcmV0dXJuIGRiUHJvbWlzZS50aGVuKGRiID0+IHtcbiAgICAgICAgICAgICAgbGV0IHR4ID0gZGIudHJhbnNhY3Rpb24oJ3Jlc3RhdXJhbnRzJywgJ3JlYWR3cml0ZScpO1xuICAgICAgICAgICAgICBsZXQgc3RvcmUgPSB0eC5vYmplY3RTdG9yZSgncmVzdGF1cmFudHMnKTtcbiAgICAgICAgICAgICAgcmVzdGF1cmFudHMuZm9yRWFjaChmdW5jdGlvbihyZXN0YXVyYW50KXtcbiAgICAgICAgICAgICAgICBzdG9yZS5wdXQocmVzdGF1cmFudCk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICByZXR1cm4gdHguZG9uZTtcbiAgICAgICAgICAgIH0pLnRoZW4oICgpID0+IHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3N0b3JlZCByZXN0YXVyYW50cywgbm93IHJldHVybmluZycpO1xuICAgICAgICAgICAgICByZXR1cm4gcmVzdGF1cmFudHM7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICB9KVxuICAgICAgICAudGhlbihmaW5hbFJlc3BvbnNlID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhmaW5hbFJlc3BvbnNlKTtcbiAgICAgICAgICByZXR1cm4gbmV3IFJlc3BvbnNlKEpTT04uc3RyaW5naWZ5KGZpbmFsUmVzcG9uc2UpKTtcbiAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJldHVybiBuZXcgUmVzcG9uc2UoXCJFcnJvciBmZXRjaGluZyBkYXRhXCIsIHtzdGF0dXM6IDUwMH0pO1xuICAgIH0pXG4gIClcbn1cblxuY29uc3QgaGFuZGxlUmV2aWV3c0V2ZW50cyA9IChldmVudCwgaWQpID0+IHtcbiAgZXZlbnQucmVzcG9uZFdpdGgoXG4gICAgZGJQcm9taXNlLnRoZW4oZGIgPT4ge1xuICAgICAgcmV0dXJuIGRiXG4gICAgICAgIC50cmFuc2FjdGlvbigncmV2aWV3cycpXG4gICAgICAgIC5vYmplY3RTdG9yZSgncmV2aWV3cycpXG4gICAgICAgIC5pbmRleChcInJlc3RhdXJhbnRfaWRcIilcbiAgICAgICAgLmdldEFsbChpZCk7XG4gICAgfSkudGhlbiggZGF0YSA9PiB7XG4gICAgICBjb25zb2xlLmxvZygnc2VydmljZXdvcmtlciBoYW5kbGUgcmV2aWV3cycpO1xuICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICByZXR1cm4gKGRhdGEubGVuZ3RoICYmIGRhdGEpIHx8IGZldGNoKGV2ZW50LnJlcXVlc3QpXG4gICAgICAgIC50aGVuKGZldGNoUmVzcG9uc2UgPT4ge1xuICAgICAgICAgIHJldHVybiBmZXRjaFJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oIHJldmlld3MgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCd1c2luZyBzZXJ2aWNld29ya2VyIGZldGNoJyk7XG4gICAgICAgICAgY29uc29sZS5sb2coJ3N0YXJ0aW5nIHRvIHN0b3JlIHJldmlld3MnKTtcbiAgICAgICAgICByZXR1cm4gZGJQcm9taXNlLnRoZW4oZGIgPT4ge1xuICAgICAgICAgICAgbGV0IHR4ID0gZGIudHJhbnNhY3Rpb24oJ3Jldmlld3MnLCAncmVhZHdyaXRlJylcbiAgICAgICAgICAgIGxldCBzdG9yZSA9IHR4Lm9iamVjdFN0b3JlKCdyZXZpZXdzJyk7XG4gICAgICAgICAgICByZXZpZXdzLmZvckVhY2goZnVuY3Rpb24ocmV2aWV3KSB7XG4gICAgICAgICAgICAgIHN0b3JlLnB1dChyZXZpZXcpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdHguZG9uZTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC50aGVuKCAoKSA9PiByZXZpZXdzKVxuICAgICAgICB9KVxuICAgIH0pLnRoZW4oZmluYWxSZXNwb25zZSA9PiB7XG4gICAgICByZXR1cm4gbmV3IFJlc3BvbnNlKEpTT04uc3RyaW5naWZ5KGZpbmFsUmVzcG9uc2UpKTtcbiAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICByZXR1cm4gbmV3IFJlc3BvbnNlKFwiRXJyb3IgZmV0Y2hpbmcgZGF0YVwiLCB7c3RhdHVzOiA1MDB9KTtcbiAgICB9KSlcbn1cblxuY29uc3QgaGFuZGxlTm9uQUpBWEV2ZW50ID0gKGV2ZW50KSA9PiB7XG4gIC8vIENoZWNrIGlmIHRoZSBIVE1MIHJlcXVlc3QgaGFzIHByZXZpb3VzbHkgYmVlbiBjYWNoZWQuIElmIHNvLCByZXR1cm4gdGhlXG4gIC8vIHJlc3BvbnNlIGZyb20gdGhlIGNhY2hlLiBJZiBub3QsIGZldGNoIHRoZSByZXF1ZXN0LCBjYWNoZSBpdCwgYW5kIHRoZW4gcmV0dXJuXG4gIC8vIGl0LlxuICBldmVudC5yZXNwb25kV2l0aChcbiAgICBjYWNoZXMubWF0Y2goZXZlbnQucmVxdWVzdCkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICByZXR1cm4gcmVzcG9uc2UgfHwgZmV0Y2goZXZlbnQucmVxdWVzdCkudGhlbihmZXRjaFJlc3BvbnNlID0+IHtcbiAgICAgICAgbGV0IHVzZUNhY2hlID0gaXNJbWFnZVVSTChldmVudC5yZXF1ZXN0LnVybCkgPyAgSU1BR0VTX0NBQ0hFIDogU1RBVElDX0NBQ0hFO1xuICAgICAgICByZXR1cm4gY2FjaGVzXG4gICAgICAgICAgLm9wZW4odXNlQ2FjaGUpXG4gICAgICAgICAgLnRoZW4oY2FjaGUgPT4ge1xuICAgICAgICAgICAgY2FjaGUucHV0KGV2ZW50LnJlcXVlc3QsIGZldGNoUmVzcG9uc2UuY2xvbmUoKSk7XG4gICAgICAgICAgICByZXR1cm4gZmV0Y2hSZXNwb25zZTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBSZXNwb25zZShcIkFwcGxpY2F0aW9uIGlzIG5vdCBjb25uZWN0ZWQgdG8gdGhlIGludGVybmV0XCIsIHtcbiAgICAgICAgICBzdGF0dXM6IDQwNCxcbiAgICAgICAgICBzdGF0dXNUZXh0OiBcIkFwcGxpY2F0aW9uIGlzIG5vdCBjb25uZWN0ZWQgdG8gdGhlIGludGVybmV0XCJcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KVxuICApO1xuXG4gIC8vIFVwZGF0ZXMgdGhlIGRhdGEgZnJvbSB0aGUgbmV0d29yayB0byB1c2Ugb24gbmV4dCByZXF1ZXN0LlxuICBldmVudC53YWl0VW50aWwodXBkYXRlKGV2ZW50LnJlcXVlc3QpKTtcbn1cblxuY29uc3QgdXBkYXRlID0gKHJlcXVlc3QpID0+IHtcbiAgbGV0IHVzZUNhY2hlID0gaXNJbWFnZVVSTChyZXF1ZXN0LnVybCkgPyAgSU1BR0VTX0NBQ0hFIDogU1RBVElDX0NBQ0hFO1xuICByZXR1cm4gY2FjaGVzLm9wZW4odXNlQ2FjaGUpLnRoZW4oY2FjaGUgPT4ge1xuICAgIHJldHVybiBmZXRjaChyZXF1ZXN0KS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgIHJldHVybiBjYWNoZS5wdXQocmVxdWVzdCwgcmVzcG9uc2UpO1xuICAgIH0pO1xuICB9KTtcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmICh0eXBlb2YgaXQgIT0gJ2Z1bmN0aW9uJykgdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYSBmdW5jdGlvbiEnKTtcbiAgcmV0dXJuIGl0O1xufTtcbiIsIi8vIDIyLjEuMy4zMSBBcnJheS5wcm90b3R5cGVbQEB1bnNjb3BhYmxlc11cbnZhciBVTlNDT1BBQkxFUyA9IHJlcXVpcmUoJy4vX3drcycpKCd1bnNjb3BhYmxlcycpO1xudmFyIEFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGU7XG5pZiAoQXJyYXlQcm90b1tVTlNDT1BBQkxFU10gPT0gdW5kZWZpbmVkKSByZXF1aXJlKCcuL19oaWRlJykoQXJyYXlQcm90bywgVU5TQ09QQUJMRVMsIHt9KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICBBcnJheVByb3RvW1VOU0NPUEFCTEVTXVtrZXldID0gdHJ1ZTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgYXQgPSByZXF1aXJlKCcuL19zdHJpbmctYXQnKSh0cnVlKTtcblxuIC8vIGBBZHZhbmNlU3RyaW5nSW5kZXhgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtYWR2YW5jZXN0cmluZ2luZGV4XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChTLCBpbmRleCwgdW5pY29kZSkge1xuICByZXR1cm4gaW5kZXggKyAodW5pY29kZSA/IGF0KFMsIGluZGV4KS5sZW5ndGggOiAxKTtcbn07XG4iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmICghaXNPYmplY3QoaXQpKSB0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhbiBvYmplY3QhJyk7XG4gIHJldHVybiBpdDtcbn07XG4iLCIvLyBmYWxzZSAtPiBBcnJheSNpbmRleE9mXG4vLyB0cnVlICAtPiBBcnJheSNpbmNsdWRlc1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpO1xudmFyIHRvQWJzb2x1dGVJbmRleCA9IHJlcXVpcmUoJy4vX3RvLWFic29sdXRlLWluZGV4Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChJU19JTkNMVURFUykge1xuICByZXR1cm4gZnVuY3Rpb24gKCR0aGlzLCBlbCwgZnJvbUluZGV4KSB7XG4gICAgdmFyIE8gPSB0b0lPYmplY3QoJHRoaXMpO1xuICAgIHZhciBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aCk7XG4gICAgdmFyIGluZGV4ID0gdG9BYnNvbHV0ZUluZGV4KGZyb21JbmRleCwgbGVuZ3RoKTtcbiAgICB2YXIgdmFsdWU7XG4gICAgLy8gQXJyYXkjaW5jbHVkZXMgdXNlcyBTYW1lVmFsdWVaZXJvIGVxdWFsaXR5IGFsZ29yaXRobVxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgICBpZiAoSVNfSU5DTFVERVMgJiYgZWwgIT0gZWwpIHdoaWxlIChsZW5ndGggPiBpbmRleCkge1xuICAgICAgdmFsdWUgPSBPW2luZGV4KytdO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlbGYtY29tcGFyZVxuICAgICAgaWYgKHZhbHVlICE9IHZhbHVlKSByZXR1cm4gdHJ1ZTtcbiAgICAvLyBBcnJheSNpbmRleE9mIGlnbm9yZXMgaG9sZXMsIEFycmF5I2luY2x1ZGVzIC0gbm90XG4gICAgfSBlbHNlIGZvciAoO2xlbmd0aCA+IGluZGV4OyBpbmRleCsrKSBpZiAoSVNfSU5DTFVERVMgfHwgaW5kZXggaW4gTykge1xuICAgICAgaWYgKE9baW5kZXhdID09PSBlbCkgcmV0dXJuIElTX0lOQ0xVREVTIHx8IGluZGV4IHx8IDA7XG4gICAgfSByZXR1cm4gIUlTX0lOQ0xVREVTICYmIC0xO1xuICB9O1xufTtcbiIsIi8vIGdldHRpbmcgdGFnIGZyb20gMTkuMS4zLjYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZygpXG52YXIgY29mID0gcmVxdWlyZSgnLi9fY29mJyk7XG52YXIgVEFHID0gcmVxdWlyZSgnLi9fd2tzJykoJ3RvU3RyaW5nVGFnJyk7XG4vLyBFUzMgd3JvbmcgaGVyZVxudmFyIEFSRyA9IGNvZihmdW5jdGlvbiAoKSB7IHJldHVybiBhcmd1bWVudHM7IH0oKSkgPT0gJ0FyZ3VtZW50cyc7XG5cbi8vIGZhbGxiYWNrIGZvciBJRTExIFNjcmlwdCBBY2Nlc3MgRGVuaWVkIGVycm9yXG52YXIgdHJ5R2V0ID0gZnVuY3Rpb24gKGl0LCBrZXkpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gaXRba2V5XTtcbiAgfSBjYXRjaCAoZSkgeyAvKiBlbXB0eSAqLyB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgTywgVCwgQjtcbiAgcmV0dXJuIGl0ID09PSB1bmRlZmluZWQgPyAnVW5kZWZpbmVkJyA6IGl0ID09PSBudWxsID8gJ051bGwnXG4gICAgLy8gQEB0b1N0cmluZ1RhZyBjYXNlXG4gICAgOiB0eXBlb2YgKFQgPSB0cnlHZXQoTyA9IE9iamVjdChpdCksIFRBRykpID09ICdzdHJpbmcnID8gVFxuICAgIC8vIGJ1aWx0aW5UYWcgY2FzZVxuICAgIDogQVJHID8gY29mKE8pXG4gICAgLy8gRVMzIGFyZ3VtZW50cyBmYWxsYmFja1xuICAgIDogKEIgPSBjb2YoTykpID09ICdPYmplY3QnICYmIHR5cGVvZiBPLmNhbGxlZSA9PSAnZnVuY3Rpb24nID8gJ0FyZ3VtZW50cycgOiBCO1xufTtcbiIsInZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChpdCkuc2xpY2UoOCwgLTEpO1xufTtcbiIsInZhciBjb3JlID0gbW9kdWxlLmV4cG9ydHMgPSB7IHZlcnNpb246ICcyLjYuNScgfTtcbmlmICh0eXBlb2YgX19lID09ICdudW1iZXInKSBfX2UgPSBjb3JlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG4iLCIvLyBvcHRpb25hbCAvIHNpbXBsZSBjb250ZXh0IGJpbmRpbmdcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChmbiwgdGhhdCwgbGVuZ3RoKSB7XG4gIGFGdW5jdGlvbihmbik7XG4gIGlmICh0aGF0ID09PSB1bmRlZmluZWQpIHJldHVybiBmbjtcbiAgc3dpdGNoIChsZW5ndGgpIHtcbiAgICBjYXNlIDE6IHJldHVybiBmdW5jdGlvbiAoYSkge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSk7XG4gICAgfTtcbiAgICBjYXNlIDI6IHJldHVybiBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYik7XG4gICAgfTtcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jdGlvbiAoYSwgYiwgYykge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYiwgYyk7XG4gICAgfTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24gKC8qIC4uLmFyZ3MgKi8pIHtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcbiAgfTtcbn07XG4iLCIvLyA3LjIuMSBSZXF1aXJlT2JqZWN0Q29lcmNpYmxlKGFyZ3VtZW50KVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKGl0ID09IHVuZGVmaW5lZCkgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY2FsbCBtZXRob2Qgb24gIFwiICsgaXQpO1xuICByZXR1cm4gaXQ7XG59O1xuIiwiLy8gVGhhbmsncyBJRTggZm9yIGhpcyBmdW5ueSBkZWZpbmVQcm9wZXJ0eVxubW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sICdhJywgeyBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDc7IH0gfSkuYSAhPSA3O1xufSk7XG4iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbnZhciBkb2N1bWVudCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLmRvY3VtZW50O1xuLy8gdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgaXMgJ29iamVjdCcgaW4gb2xkIElFXG52YXIgaXMgPSBpc09iamVjdChkb2N1bWVudCkgJiYgaXNPYmplY3QoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXMgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGl0KSA6IHt9O1xufTtcbiIsIi8vIElFIDgtIGRvbid0IGVudW0gYnVnIGtleXNcbm1vZHVsZS5leHBvcnRzID0gKFxuICAnY29uc3RydWN0b3IsaGFzT3duUHJvcGVydHksaXNQcm90b3R5cGVPZixwcm9wZXJ0eUlzRW51bWVyYWJsZSx0b0xvY2FsZVN0cmluZyx0b1N0cmluZyx2YWx1ZU9mJ1xuKS5zcGxpdCgnLCcpO1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIGNvcmUgPSByZXF1aXJlKCcuL19jb3JlJyk7XG52YXIgaGlkZSA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcbnZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lJyk7XG52YXIgY3R4ID0gcmVxdWlyZSgnLi9fY3R4Jyk7XG52YXIgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG5cbnZhciAkZXhwb3J0ID0gZnVuY3Rpb24gKHR5cGUsIG5hbWUsIHNvdXJjZSkge1xuICB2YXIgSVNfRk9SQ0VEID0gdHlwZSAmICRleHBvcnQuRjtcbiAgdmFyIElTX0dMT0JBTCA9IHR5cGUgJiAkZXhwb3J0Lkc7XG4gIHZhciBJU19TVEFUSUMgPSB0eXBlICYgJGV4cG9ydC5TO1xuICB2YXIgSVNfUFJPVE8gPSB0eXBlICYgJGV4cG9ydC5QO1xuICB2YXIgSVNfQklORCA9IHR5cGUgJiAkZXhwb3J0LkI7XG4gIHZhciB0YXJnZXQgPSBJU19HTE9CQUwgPyBnbG9iYWwgOiBJU19TVEFUSUMgPyBnbG9iYWxbbmFtZV0gfHwgKGdsb2JhbFtuYW1lXSA9IHt9KSA6IChnbG9iYWxbbmFtZV0gfHwge30pW1BST1RPVFlQRV07XG4gIHZhciBleHBvcnRzID0gSVNfR0xPQkFMID8gY29yZSA6IGNvcmVbbmFtZV0gfHwgKGNvcmVbbmFtZV0gPSB7fSk7XG4gIHZhciBleHBQcm90byA9IGV4cG9ydHNbUFJPVE9UWVBFXSB8fCAoZXhwb3J0c1tQUk9UT1RZUEVdID0ge30pO1xuICB2YXIga2V5LCBvd24sIG91dCwgZXhwO1xuICBpZiAoSVNfR0xPQkFMKSBzb3VyY2UgPSBuYW1lO1xuICBmb3IgKGtleSBpbiBzb3VyY2UpIHtcbiAgICAvLyBjb250YWlucyBpbiBuYXRpdmVcbiAgICBvd24gPSAhSVNfRk9SQ0VEICYmIHRhcmdldCAmJiB0YXJnZXRba2V5XSAhPT0gdW5kZWZpbmVkO1xuICAgIC8vIGV4cG9ydCBuYXRpdmUgb3IgcGFzc2VkXG4gICAgb3V0ID0gKG93biA/IHRhcmdldCA6IHNvdXJjZSlba2V5XTtcbiAgICAvLyBiaW5kIHRpbWVycyB0byBnbG9iYWwgZm9yIGNhbGwgZnJvbSBleHBvcnQgY29udGV4dFxuICAgIGV4cCA9IElTX0JJTkQgJiYgb3duID8gY3R4KG91dCwgZ2xvYmFsKSA6IElTX1BST1RPICYmIHR5cGVvZiBvdXQgPT0gJ2Z1bmN0aW9uJyA/IGN0eChGdW5jdGlvbi5jYWxsLCBvdXQpIDogb3V0O1xuICAgIC8vIGV4dGVuZCBnbG9iYWxcbiAgICBpZiAodGFyZ2V0KSByZWRlZmluZSh0YXJnZXQsIGtleSwgb3V0LCB0eXBlICYgJGV4cG9ydC5VKTtcbiAgICAvLyBleHBvcnRcbiAgICBpZiAoZXhwb3J0c1trZXldICE9IG91dCkgaGlkZShleHBvcnRzLCBrZXksIGV4cCk7XG4gICAgaWYgKElTX1BST1RPICYmIGV4cFByb3RvW2tleV0gIT0gb3V0KSBleHBQcm90b1trZXldID0gb3V0O1xuICB9XG59O1xuZ2xvYmFsLmNvcmUgPSBjb3JlO1xuLy8gdHlwZSBiaXRtYXBcbiRleHBvcnQuRiA9IDE7ICAgLy8gZm9yY2VkXG4kZXhwb3J0LkcgPSAyOyAgIC8vIGdsb2JhbFxuJGV4cG9ydC5TID0gNDsgICAvLyBzdGF0aWNcbiRleHBvcnQuUCA9IDg7ICAgLy8gcHJvdG9cbiRleHBvcnQuQiA9IDE2OyAgLy8gYmluZFxuJGV4cG9ydC5XID0gMzI7ICAvLyB3cmFwXG4kZXhwb3J0LlUgPSA2NDsgIC8vIHNhZmVcbiRleHBvcnQuUiA9IDEyODsgLy8gcmVhbCBwcm90byBtZXRob2QgZm9yIGBsaWJyYXJ5YFxubW9kdWxlLmV4cG9ydHMgPSAkZXhwb3J0O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZXhlYykge1xuICB0cnkge1xuICAgIHJldHVybiAhIWV4ZWMoKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xucmVxdWlyZSgnLi9lczYucmVnZXhwLmV4ZWMnKTtcbnZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lJyk7XG52YXIgaGlkZSA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4vX2ZhaWxzJyk7XG52YXIgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbnZhciB3a3MgPSByZXF1aXJlKCcuL193a3MnKTtcbnZhciByZWdleHBFeGVjID0gcmVxdWlyZSgnLi9fcmVnZXhwLWV4ZWMnKTtcblxudmFyIFNQRUNJRVMgPSB3a3MoJ3NwZWNpZXMnKTtcblxudmFyIFJFUExBQ0VfU1VQUE9SVFNfTkFNRURfR1JPVVBTID0gIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgLy8gI3JlcGxhY2UgbmVlZHMgYnVpbHQtaW4gc3VwcG9ydCBmb3IgbmFtZWQgZ3JvdXBzLlxuICAvLyAjbWF0Y2ggd29ya3MgZmluZSBiZWNhdXNlIGl0IGp1c3QgcmV0dXJuIHRoZSBleGVjIHJlc3VsdHMsIGV2ZW4gaWYgaXQgaGFzXG4gIC8vIGEgXCJncm9wc1wiIHByb3BlcnR5LlxuICB2YXIgcmUgPSAvLi87XG4gIHJlLmV4ZWMgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgIHJlc3VsdC5ncm91cHMgPSB7IGE6ICc3JyB9O1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG4gIHJldHVybiAnJy5yZXBsYWNlKHJlLCAnJDxhPicpICE9PSAnNyc7XG59KTtcblxudmFyIFNQTElUX1dPUktTX1dJVEhfT1ZFUldSSVRURU5fRVhFQyA9IChmdW5jdGlvbiAoKSB7XG4gIC8vIENocm9tZSA1MSBoYXMgYSBidWdneSBcInNwbGl0XCIgaW1wbGVtZW50YXRpb24gd2hlbiBSZWdFeHAjZXhlYyAhPT0gbmF0aXZlRXhlY1xuICB2YXIgcmUgPSAvKD86KS87XG4gIHZhciBvcmlnaW5hbEV4ZWMgPSByZS5leGVjO1xuICByZS5leGVjID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gb3JpZ2luYWxFeGVjLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7IH07XG4gIHZhciByZXN1bHQgPSAnYWInLnNwbGl0KHJlKTtcbiAgcmV0dXJuIHJlc3VsdC5sZW5ndGggPT09IDIgJiYgcmVzdWx0WzBdID09PSAnYScgJiYgcmVzdWx0WzFdID09PSAnYic7XG59KSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChLRVksIGxlbmd0aCwgZXhlYykge1xuICB2YXIgU1lNQk9MID0gd2tzKEtFWSk7XG5cbiAgdmFyIERFTEVHQVRFU19UT19TWU1CT0wgPSAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICAgIC8vIFN0cmluZyBtZXRob2RzIGNhbGwgc3ltYm9sLW5hbWVkIFJlZ0VwIG1ldGhvZHNcbiAgICB2YXIgTyA9IHt9O1xuICAgIE9bU1lNQk9MXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDc7IH07XG4gICAgcmV0dXJuICcnW0tFWV0oTykgIT0gNztcbiAgfSk7XG5cbiAgdmFyIERFTEVHQVRFU19UT19FWEVDID0gREVMRUdBVEVTX1RPX1NZTUJPTCA/ICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gICAgLy8gU3ltYm9sLW5hbWVkIFJlZ0V4cCBtZXRob2RzIGNhbGwgLmV4ZWNcbiAgICB2YXIgZXhlY0NhbGxlZCA9IGZhbHNlO1xuICAgIHZhciByZSA9IC9hLztcbiAgICByZS5leGVjID0gZnVuY3Rpb24gKCkgeyBleGVjQ2FsbGVkID0gdHJ1ZTsgcmV0dXJuIG51bGw7IH07XG4gICAgaWYgKEtFWSA9PT0gJ3NwbGl0Jykge1xuICAgICAgLy8gUmVnRXhwW0BAc3BsaXRdIGRvZXNuJ3QgY2FsbCB0aGUgcmVnZXgncyBleGVjIG1ldGhvZCwgYnV0IGZpcnN0IGNyZWF0ZXNcbiAgICAgIC8vIGEgbmV3IG9uZS4gV2UgbmVlZCB0byByZXR1cm4gdGhlIHBhdGNoZWQgcmVnZXggd2hlbiBjcmVhdGluZyB0aGUgbmV3IG9uZS5cbiAgICAgIHJlLmNvbnN0cnVjdG9yID0ge307XG4gICAgICByZS5jb25zdHJ1Y3RvcltTUEVDSUVTXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHJlOyB9O1xuICAgIH1cbiAgICByZVtTWU1CT0xdKCcnKTtcbiAgICByZXR1cm4gIWV4ZWNDYWxsZWQ7XG4gIH0pIDogdW5kZWZpbmVkO1xuXG4gIGlmIChcbiAgICAhREVMRUdBVEVTX1RPX1NZTUJPTCB8fFxuICAgICFERUxFR0FURVNfVE9fRVhFQyB8fFxuICAgIChLRVkgPT09ICdyZXBsYWNlJyAmJiAhUkVQTEFDRV9TVVBQT1JUU19OQU1FRF9HUk9VUFMpIHx8XG4gICAgKEtFWSA9PT0gJ3NwbGl0JyAmJiAhU1BMSVRfV09SS1NfV0lUSF9PVkVSV1JJVFRFTl9FWEVDKVxuICApIHtcbiAgICB2YXIgbmF0aXZlUmVnRXhwTWV0aG9kID0gLy4vW1NZTUJPTF07XG4gICAgdmFyIGZucyA9IGV4ZWMoXG4gICAgICBkZWZpbmVkLFxuICAgICAgU1lNQk9MLFxuICAgICAgJydbS0VZXSxcbiAgICAgIGZ1bmN0aW9uIG1heWJlQ2FsbE5hdGl2ZShuYXRpdmVNZXRob2QsIHJlZ2V4cCwgc3RyLCBhcmcyLCBmb3JjZVN0cmluZ01ldGhvZCkge1xuICAgICAgICBpZiAocmVnZXhwLmV4ZWMgPT09IHJlZ2V4cEV4ZWMpIHtcbiAgICAgICAgICBpZiAoREVMRUdBVEVTX1RPX1NZTUJPTCAmJiAhZm9yY2VTdHJpbmdNZXRob2QpIHtcbiAgICAgICAgICAgIC8vIFRoZSBuYXRpdmUgU3RyaW5nIG1ldGhvZCBhbHJlYWR5IGRlbGVnYXRlcyB0byBAQG1ldGhvZCAodGhpc1xuICAgICAgICAgICAgLy8gcG9seWZpbGxlZCBmdW5jdGlvbiksIGxlYXNpbmcgdG8gaW5maW5pdGUgcmVjdXJzaW9uLlxuICAgICAgICAgICAgLy8gV2UgYXZvaWQgaXQgYnkgZGlyZWN0bHkgY2FsbGluZyB0aGUgbmF0aXZlIEBAbWV0aG9kIG1ldGhvZC5cbiAgICAgICAgICAgIHJldHVybiB7IGRvbmU6IHRydWUsIHZhbHVlOiBuYXRpdmVSZWdFeHBNZXRob2QuY2FsbChyZWdleHAsIHN0ciwgYXJnMikgfTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHsgZG9uZTogdHJ1ZSwgdmFsdWU6IG5hdGl2ZU1ldGhvZC5jYWxsKHN0ciwgcmVnZXhwLCBhcmcyKSB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IGRvbmU6IGZhbHNlIH07XG4gICAgICB9XG4gICAgKTtcbiAgICB2YXIgc3RyZm4gPSBmbnNbMF07XG4gICAgdmFyIHJ4Zm4gPSBmbnNbMV07XG5cbiAgICByZWRlZmluZShTdHJpbmcucHJvdG90eXBlLCBLRVksIHN0cmZuKTtcbiAgICBoaWRlKFJlZ0V4cC5wcm90b3R5cGUsIFNZTUJPTCwgbGVuZ3RoID09IDJcbiAgICAgIC8vIDIxLjIuNS44IFJlZ0V4cC5wcm90b3R5cGVbQEByZXBsYWNlXShzdHJpbmcsIHJlcGxhY2VWYWx1ZSlcbiAgICAgIC8vIDIxLjIuNS4xMSBSZWdFeHAucHJvdG90eXBlW0BAc3BsaXRdKHN0cmluZywgbGltaXQpXG4gICAgICA/IGZ1bmN0aW9uIChzdHJpbmcsIGFyZykgeyByZXR1cm4gcnhmbi5jYWxsKHN0cmluZywgdGhpcywgYXJnKTsgfVxuICAgICAgLy8gMjEuMi41LjYgUmVnRXhwLnByb3RvdHlwZVtAQG1hdGNoXShzdHJpbmcpXG4gICAgICAvLyAyMS4yLjUuOSBSZWdFeHAucHJvdG90eXBlW0BAc2VhcmNoXShzdHJpbmcpXG4gICAgICA6IGZ1bmN0aW9uIChzdHJpbmcpIHsgcmV0dXJuIHJ4Zm4uY2FsbChzdHJpbmcsIHRoaXMpOyB9XG4gICAgKTtcbiAgfVxufTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8vIDIxLjIuNS4zIGdldCBSZWdFeHAucHJvdG90eXBlLmZsYWdzXG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuICB2YXIgdGhhdCA9IGFuT2JqZWN0KHRoaXMpO1xuICB2YXIgcmVzdWx0ID0gJyc7XG4gIGlmICh0aGF0Lmdsb2JhbCkgcmVzdWx0ICs9ICdnJztcbiAgaWYgKHRoYXQuaWdub3JlQ2FzZSkgcmVzdWx0ICs9ICdpJztcbiAgaWYgKHRoYXQubXVsdGlsaW5lKSByZXN1bHQgKz0gJ20nO1xuICBpZiAodGhhdC51bmljb2RlKSByZXN1bHQgKz0gJ3UnO1xuICBpZiAodGhhdC5zdGlja3kpIHJlc3VsdCArPSAneSc7XG4gIHJldHVybiByZXN1bHQ7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19zaGFyZWQnKSgnbmF0aXZlLWZ1bmN0aW9uLXRvLXN0cmluZycsIEZ1bmN0aW9uLnRvU3RyaW5nKTtcbiIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy84NiNpc3N1ZWNvbW1lbnQtMTE1NzU5MDI4XG52YXIgZ2xvYmFsID0gbW9kdWxlLmV4cG9ydHMgPSB0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnICYmIHdpbmRvdy5NYXRoID09IE1hdGhcbiAgPyB3aW5kb3cgOiB0eXBlb2Ygc2VsZiAhPSAndW5kZWZpbmVkJyAmJiBzZWxmLk1hdGggPT0gTWF0aCA/IHNlbGZcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5ldy1mdW5jXG4gIDogRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcbmlmICh0eXBlb2YgX19nID09ICdudW1iZXInKSBfX2cgPSBnbG9iYWw7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcbiIsInZhciBoYXNPd25Qcm9wZXJ0eSA9IHt9Lmhhc093blByb3BlcnR5O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIGtleSkge1xuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChpdCwga2V5KTtcbn07XG4iLCJ2YXIgZFAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKTtcbnZhciBjcmVhdGVEZXNjID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gZnVuY3Rpb24gKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICByZXR1cm4gZFAuZihvYmplY3QsIGtleSwgY3JlYXRlRGVzYygxLCB2YWx1ZSkpO1xufSA6IGZ1bmN0aW9uIChvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgcmV0dXJuIG9iamVjdDtcbn07XG4iLCJ2YXIgZG9jdW1lbnQgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5kb2N1bWVudDtcbm1vZHVsZS5leHBvcnRzID0gZG9jdW1lbnQgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuIiwibW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSAmJiAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkocmVxdWlyZSgnLi9fZG9tLWNyZWF0ZScpKCdkaXYnKSwgJ2EnLCB7IGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gNzsgfSB9KS5hICE9IDc7XG59KTtcbiIsIi8vIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgYW5kIG5vbi1lbnVtZXJhYmxlIG9sZCBWOCBzdHJpbmdzXG52YXIgY29mID0gcmVxdWlyZSgnLi9fY29mJyk7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdCgneicpLnByb3BlcnR5SXNFbnVtZXJhYmxlKDApID8gT2JqZWN0IDogZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBjb2YoaXQpID09ICdTdHJpbmcnID8gaXQuc3BsaXQoJycpIDogT2JqZWN0KGl0KTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdHlwZW9mIGl0ID09PSAnb2JqZWN0JyA/IGl0ICE9PSBudWxsIDogdHlwZW9mIGl0ID09PSAnZnVuY3Rpb24nO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBjcmVhdGUgPSByZXF1aXJlKCcuL19vYmplY3QtY3JlYXRlJyk7XG52YXIgZGVzY3JpcHRvciA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcbnZhciBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4vX3NldC10by1zdHJpbmctdGFnJyk7XG52YXIgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcblxuLy8gMjUuMS4yLjEuMSAlSXRlcmF0b3JQcm90b3R5cGUlW0BAaXRlcmF0b3JdKClcbnJlcXVpcmUoJy4vX2hpZGUnKShJdGVyYXRvclByb3RvdHlwZSwgcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJyksIGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgTkFNRSwgbmV4dCkge1xuICBDb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBjcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUsIHsgbmV4dDogZGVzY3JpcHRvcigxLCBuZXh0KSB9KTtcbiAgc2V0VG9TdHJpbmdUYWcoQ29uc3RydWN0b3IsIE5BTUUgKyAnIEl0ZXJhdG9yJyk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIExJQlJBUlkgPSByZXF1aXJlKCcuL19saWJyYXJ5Jyk7XG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyIHJlZGVmaW5lID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUnKTtcbnZhciBoaWRlID0gcmVxdWlyZSgnLi9faGlkZScpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpO1xudmFyICRpdGVyQ3JlYXRlID0gcmVxdWlyZSgnLi9faXRlci1jcmVhdGUnKTtcbnZhciBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4vX3NldC10by1zdHJpbmctdGFnJyk7XG52YXIgZ2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKCcuL19vYmplY3QtZ3BvJyk7XG52YXIgSVRFUkFUT1IgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKTtcbnZhciBCVUdHWSA9ICEoW10ua2V5cyAmJiAnbmV4dCcgaW4gW10ua2V5cygpKTsgLy8gU2FmYXJpIGhhcyBidWdneSBpdGVyYXRvcnMgdy9vIGBuZXh0YFxudmFyIEZGX0lURVJBVE9SID0gJ0BAaXRlcmF0b3InO1xudmFyIEtFWVMgPSAna2V5cyc7XG52YXIgVkFMVUVTID0gJ3ZhbHVlcyc7XG5cbnZhciByZXR1cm5UaGlzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoQmFzZSwgTkFNRSwgQ29uc3RydWN0b3IsIG5leHQsIERFRkFVTFQsIElTX1NFVCwgRk9SQ0VEKSB7XG4gICRpdGVyQ3JlYXRlKENvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KTtcbiAgdmFyIGdldE1ldGhvZCA9IGZ1bmN0aW9uIChraW5kKSB7XG4gICAgaWYgKCFCVUdHWSAmJiBraW5kIGluIHByb3RvKSByZXR1cm4gcHJvdG9ba2luZF07XG4gICAgc3dpdGNoIChraW5kKSB7XG4gICAgICBjYXNlIEtFWVM6IHJldHVybiBmdW5jdGlvbiBrZXlzKCkgeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICAgICAgY2FzZSBWQUxVRVM6IHJldHVybiBmdW5jdGlvbiB2YWx1ZXMoKSB7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gICAgfSByZXR1cm4gZnVuY3Rpb24gZW50cmllcygpIHsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgfTtcbiAgdmFyIFRBRyA9IE5BTUUgKyAnIEl0ZXJhdG9yJztcbiAgdmFyIERFRl9WQUxVRVMgPSBERUZBVUxUID09IFZBTFVFUztcbiAgdmFyIFZBTFVFU19CVUcgPSBmYWxzZTtcbiAgdmFyIHByb3RvID0gQmFzZS5wcm90b3R5cGU7XG4gIHZhciAkbmF0aXZlID0gcHJvdG9bSVRFUkFUT1JdIHx8IHByb3RvW0ZGX0lURVJBVE9SXSB8fCBERUZBVUxUICYmIHByb3RvW0RFRkFVTFRdO1xuICB2YXIgJGRlZmF1bHQgPSAkbmF0aXZlIHx8IGdldE1ldGhvZChERUZBVUxUKTtcbiAgdmFyICRlbnRyaWVzID0gREVGQVVMVCA/ICFERUZfVkFMVUVTID8gJGRlZmF1bHQgOiBnZXRNZXRob2QoJ2VudHJpZXMnKSA6IHVuZGVmaW5lZDtcbiAgdmFyICRhbnlOYXRpdmUgPSBOQU1FID09ICdBcnJheScgPyBwcm90by5lbnRyaWVzIHx8ICRuYXRpdmUgOiAkbmF0aXZlO1xuICB2YXIgbWV0aG9kcywga2V5LCBJdGVyYXRvclByb3RvdHlwZTtcbiAgLy8gRml4IG5hdGl2ZVxuICBpZiAoJGFueU5hdGl2ZSkge1xuICAgIEl0ZXJhdG9yUHJvdG90eXBlID0gZ2V0UHJvdG90eXBlT2YoJGFueU5hdGl2ZS5jYWxsKG5ldyBCYXNlKCkpKTtcbiAgICBpZiAoSXRlcmF0b3JQcm90b3R5cGUgIT09IE9iamVjdC5wcm90b3R5cGUgJiYgSXRlcmF0b3JQcm90b3R5cGUubmV4dCkge1xuICAgICAgLy8gU2V0IEBAdG9TdHJpbmdUYWcgdG8gbmF0aXZlIGl0ZXJhdG9yc1xuICAgICAgc2V0VG9TdHJpbmdUYWcoSXRlcmF0b3JQcm90b3R5cGUsIFRBRywgdHJ1ZSk7XG4gICAgICAvLyBmaXggZm9yIHNvbWUgb2xkIGVuZ2luZXNcbiAgICAgIGlmICghTElCUkFSWSAmJiB0eXBlb2YgSXRlcmF0b3JQcm90b3R5cGVbSVRFUkFUT1JdICE9ICdmdW5jdGlvbicpIGhpZGUoSXRlcmF0b3JQcm90b3R5cGUsIElURVJBVE9SLCByZXR1cm5UaGlzKTtcbiAgICB9XG4gIH1cbiAgLy8gZml4IEFycmF5I3t2YWx1ZXMsIEBAaXRlcmF0b3J9Lm5hbWUgaW4gVjggLyBGRlxuICBpZiAoREVGX1ZBTFVFUyAmJiAkbmF0aXZlICYmICRuYXRpdmUubmFtZSAhPT0gVkFMVUVTKSB7XG4gICAgVkFMVUVTX0JVRyA9IHRydWU7XG4gICAgJGRlZmF1bHQgPSBmdW5jdGlvbiB2YWx1ZXMoKSB7IHJldHVybiAkbmF0aXZlLmNhbGwodGhpcyk7IH07XG4gIH1cbiAgLy8gRGVmaW5lIGl0ZXJhdG9yXG4gIGlmICgoIUxJQlJBUlkgfHwgRk9SQ0VEKSAmJiAoQlVHR1kgfHwgVkFMVUVTX0JVRyB8fCAhcHJvdG9bSVRFUkFUT1JdKSkge1xuICAgIGhpZGUocHJvdG8sIElURVJBVE9SLCAkZGVmYXVsdCk7XG4gIH1cbiAgLy8gUGx1ZyBmb3IgbGlicmFyeVxuICBJdGVyYXRvcnNbTkFNRV0gPSAkZGVmYXVsdDtcbiAgSXRlcmF0b3JzW1RBR10gPSByZXR1cm5UaGlzO1xuICBpZiAoREVGQVVMVCkge1xuICAgIG1ldGhvZHMgPSB7XG4gICAgICB2YWx1ZXM6IERFRl9WQUxVRVMgPyAkZGVmYXVsdCA6IGdldE1ldGhvZChWQUxVRVMpLFxuICAgICAga2V5czogSVNfU0VUID8gJGRlZmF1bHQgOiBnZXRNZXRob2QoS0VZUyksXG4gICAgICBlbnRyaWVzOiAkZW50cmllc1xuICAgIH07XG4gICAgaWYgKEZPUkNFRCkgZm9yIChrZXkgaW4gbWV0aG9kcykge1xuICAgICAgaWYgKCEoa2V5IGluIHByb3RvKSkgcmVkZWZpbmUocHJvdG8sIGtleSwgbWV0aG9kc1trZXldKTtcbiAgICB9IGVsc2UgJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LkYgKiAoQlVHR1kgfHwgVkFMVUVTX0JVRyksIE5BTUUsIG1ldGhvZHMpO1xuICB9XG4gIHJldHVybiBtZXRob2RzO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGRvbmUsIHZhbHVlKSB7XG4gIHJldHVybiB7IHZhbHVlOiB2YWx1ZSwgZG9uZTogISFkb25lIH07XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7fTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZmFsc2U7XG4iLCIvLyAxOS4xLjIuMiAvIDE1LjIuMy41IE9iamVjdC5jcmVhdGUoTyBbLCBQcm9wZXJ0aWVzXSlcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIGRQcyA9IHJlcXVpcmUoJy4vX29iamVjdC1kcHMnKTtcbnZhciBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKTtcbnZhciBJRV9QUk9UTyA9IHJlcXVpcmUoJy4vX3NoYXJlZC1rZXknKSgnSUVfUFJPVE8nKTtcbnZhciBFbXB0eSA9IGZ1bmN0aW9uICgpIHsgLyogZW1wdHkgKi8gfTtcbnZhciBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcblxuLy8gQ3JlYXRlIG9iamVjdCB3aXRoIGZha2UgYG51bGxgIHByb3RvdHlwZTogdXNlIGlmcmFtZSBPYmplY3Qgd2l0aCBjbGVhcmVkIHByb3RvdHlwZVxudmFyIGNyZWF0ZURpY3QgPSBmdW5jdGlvbiAoKSB7XG4gIC8vIFRocmFzaCwgd2FzdGUgYW5kIHNvZG9teTogSUUgR0MgYnVnXG4gIHZhciBpZnJhbWUgPSByZXF1aXJlKCcuL19kb20tY3JlYXRlJykoJ2lmcmFtZScpO1xuICB2YXIgaSA9IGVudW1CdWdLZXlzLmxlbmd0aDtcbiAgdmFyIGx0ID0gJzwnO1xuICB2YXIgZ3QgPSAnPic7XG4gIHZhciBpZnJhbWVEb2N1bWVudDtcbiAgaWZyYW1lLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIHJlcXVpcmUoJy4vX2h0bWwnKS5hcHBlbmRDaGlsZChpZnJhbWUpO1xuICBpZnJhbWUuc3JjID0gJ2phdmFzY3JpcHQ6JzsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1zY3JpcHQtdXJsXG4gIC8vIGNyZWF0ZURpY3QgPSBpZnJhbWUuY29udGVudFdpbmRvdy5PYmplY3Q7XG4gIC8vIGh0bWwucmVtb3ZlQ2hpbGQoaWZyYW1lKTtcbiAgaWZyYW1lRG9jdW1lbnQgPSBpZnJhbWUuY29udGVudFdpbmRvdy5kb2N1bWVudDtcbiAgaWZyYW1lRG9jdW1lbnQub3BlbigpO1xuICBpZnJhbWVEb2N1bWVudC53cml0ZShsdCArICdzY3JpcHQnICsgZ3QgKyAnZG9jdW1lbnQuRj1PYmplY3QnICsgbHQgKyAnL3NjcmlwdCcgKyBndCk7XG4gIGlmcmFtZURvY3VtZW50LmNsb3NlKCk7XG4gIGNyZWF0ZURpY3QgPSBpZnJhbWVEb2N1bWVudC5GO1xuICB3aGlsZSAoaS0tKSBkZWxldGUgY3JlYXRlRGljdFtQUk9UT1RZUEVdW2VudW1CdWdLZXlzW2ldXTtcbiAgcmV0dXJuIGNyZWF0ZURpY3QoKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmNyZWF0ZSB8fCBmdW5jdGlvbiBjcmVhdGUoTywgUHJvcGVydGllcykge1xuICB2YXIgcmVzdWx0O1xuICBpZiAoTyAhPT0gbnVsbCkge1xuICAgIEVtcHR5W1BST1RPVFlQRV0gPSBhbk9iamVjdChPKTtcbiAgICByZXN1bHQgPSBuZXcgRW1wdHkoKTtcbiAgICBFbXB0eVtQUk9UT1RZUEVdID0gbnVsbDtcbiAgICAvLyBhZGQgXCJfX3Byb3RvX19cIiBmb3IgT2JqZWN0LmdldFByb3RvdHlwZU9mIHBvbHlmaWxsXG4gICAgcmVzdWx0W0lFX1BST1RPXSA9IE87XG4gIH0gZWxzZSByZXN1bHQgPSBjcmVhdGVEaWN0KCk7XG4gIHJldHVybiBQcm9wZXJ0aWVzID09PSB1bmRlZmluZWQgPyByZXN1bHQgOiBkUHMocmVzdWx0LCBQcm9wZXJ0aWVzKTtcbn07XG4iLCJ2YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBJRThfRE9NX0RFRklORSA9IHJlcXVpcmUoJy4vX2llOC1kb20tZGVmaW5lJyk7XG52YXIgdG9QcmltaXRpdmUgPSByZXF1aXJlKCcuL190by1wcmltaXRpdmUnKTtcbnZhciBkUCA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcblxuZXhwb3J0cy5mID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpIHtcbiAgYW5PYmplY3QoTyk7XG4gIFAgPSB0b1ByaW1pdGl2ZShQLCB0cnVlKTtcbiAgYW5PYmplY3QoQXR0cmlidXRlcyk7XG4gIGlmIChJRThfRE9NX0RFRklORSkgdHJ5IHtcbiAgICByZXR1cm4gZFAoTywgUCwgQXR0cmlidXRlcyk7XG4gIH0gY2F0Y2ggKGUpIHsgLyogZW1wdHkgKi8gfVxuICBpZiAoJ2dldCcgaW4gQXR0cmlidXRlcyB8fCAnc2V0JyBpbiBBdHRyaWJ1dGVzKSB0aHJvdyBUeXBlRXJyb3IoJ0FjY2Vzc29ycyBub3Qgc3VwcG9ydGVkIScpO1xuICBpZiAoJ3ZhbHVlJyBpbiBBdHRyaWJ1dGVzKSBPW1BdID0gQXR0cmlidXRlcy52YWx1ZTtcbiAgcmV0dXJuIE87XG59O1xuIiwidmFyIGRQID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBnZXRLZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gT2JqZWN0LmRlZmluZVByb3BlcnRpZXMgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKE8sIFByb3BlcnRpZXMpIHtcbiAgYW5PYmplY3QoTyk7XG4gIHZhciBrZXlzID0gZ2V0S2V5cyhQcm9wZXJ0aWVzKTtcbiAgdmFyIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICB2YXIgaSA9IDA7XG4gIHZhciBQO1xuICB3aGlsZSAobGVuZ3RoID4gaSkgZFAuZihPLCBQID0ga2V5c1tpKytdLCBQcm9wZXJ0aWVzW1BdKTtcbiAgcmV0dXJuIE87XG59O1xuIiwiLy8gMTkuMS4yLjkgLyAxNS4yLjMuMiBPYmplY3QuZ2V0UHJvdG90eXBlT2YoTylcbnZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpO1xudmFyIElFX1BST1RPID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpO1xudmFyIE9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YgfHwgZnVuY3Rpb24gKE8pIHtcbiAgTyA9IHRvT2JqZWN0KE8pO1xuICBpZiAoaGFzKE8sIElFX1BST1RPKSkgcmV0dXJuIE9bSUVfUFJPVE9dO1xuICBpZiAodHlwZW9mIE8uY29uc3RydWN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBPIGluc3RhbmNlb2YgTy5jb25zdHJ1Y3Rvcikge1xuICAgIHJldHVybiBPLmNvbnN0cnVjdG9yLnByb3RvdHlwZTtcbiAgfSByZXR1cm4gTyBpbnN0YW5jZW9mIE9iamVjdCA/IE9iamVjdFByb3RvIDogbnVsbDtcbn07XG4iLCJ2YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xudmFyIGFycmF5SW5kZXhPZiA9IHJlcXVpcmUoJy4vX2FycmF5LWluY2x1ZGVzJykoZmFsc2UpO1xudmFyIElFX1BST1RPID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmplY3QsIG5hbWVzKSB7XG4gIHZhciBPID0gdG9JT2JqZWN0KG9iamVjdCk7XG4gIHZhciBpID0gMDtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICB2YXIga2V5O1xuICBmb3IgKGtleSBpbiBPKSBpZiAoa2V5ICE9IElFX1BST1RPKSBoYXMoTywga2V5KSAmJiByZXN1bHQucHVzaChrZXkpO1xuICAvLyBEb24ndCBlbnVtIGJ1ZyAmIGhpZGRlbiBrZXlzXG4gIHdoaWxlIChuYW1lcy5sZW5ndGggPiBpKSBpZiAoaGFzKE8sIGtleSA9IG5hbWVzW2krK10pKSB7XG4gICAgfmFycmF5SW5kZXhPZihyZXN1bHQsIGtleSkgfHwgcmVzdWx0LnB1c2goa2V5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcbiIsIi8vIDE5LjEuMi4xNCAvIDE1LjIuMy4xNCBPYmplY3Qua2V5cyhPKVxudmFyICRrZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMtaW50ZXJuYWwnKTtcbnZhciBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiBrZXlzKE8pIHtcbiAgcmV0dXJuICRrZXlzKE8sIGVudW1CdWdLZXlzKTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChiaXRtYXAsIHZhbHVlKSB7XG4gIHJldHVybiB7XG4gICAgZW51bWVyYWJsZTogIShiaXRtYXAgJiAxKSxcbiAgICBjb25maWd1cmFibGU6ICEoYml0bWFwICYgMiksXG4gICAgd3JpdGFibGU6ICEoYml0bWFwICYgNCksXG4gICAgdmFsdWU6IHZhbHVlXG4gIH07XG59O1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIGhpZGUgPSByZXF1aXJlKCcuL19oaWRlJyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgU1JDID0gcmVxdWlyZSgnLi9fdWlkJykoJ3NyYycpO1xudmFyICR0b1N0cmluZyA9IHJlcXVpcmUoJy4vX2Z1bmN0aW9uLXRvLXN0cmluZycpO1xudmFyIFRPX1NUUklORyA9ICd0b1N0cmluZyc7XG52YXIgVFBMID0gKCcnICsgJHRvU3RyaW5nKS5zcGxpdChUT19TVFJJTkcpO1xuXG5yZXF1aXJlKCcuL19jb3JlJykuaW5zcGVjdFNvdXJjZSA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gJHRvU3RyaW5nLmNhbGwoaXQpO1xufTtcblxuKG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKE8sIGtleSwgdmFsLCBzYWZlKSB7XG4gIHZhciBpc0Z1bmN0aW9uID0gdHlwZW9mIHZhbCA9PSAnZnVuY3Rpb24nO1xuICBpZiAoaXNGdW5jdGlvbikgaGFzKHZhbCwgJ25hbWUnKSB8fCBoaWRlKHZhbCwgJ25hbWUnLCBrZXkpO1xuICBpZiAoT1trZXldID09PSB2YWwpIHJldHVybjtcbiAgaWYgKGlzRnVuY3Rpb24pIGhhcyh2YWwsIFNSQykgfHwgaGlkZSh2YWwsIFNSQywgT1trZXldID8gJycgKyBPW2tleV0gOiBUUEwuam9pbihTdHJpbmcoa2V5KSkpO1xuICBpZiAoTyA9PT0gZ2xvYmFsKSB7XG4gICAgT1trZXldID0gdmFsO1xuICB9IGVsc2UgaWYgKCFzYWZlKSB7XG4gICAgZGVsZXRlIE9ba2V5XTtcbiAgICBoaWRlKE8sIGtleSwgdmFsKTtcbiAgfSBlbHNlIGlmIChPW2tleV0pIHtcbiAgICBPW2tleV0gPSB2YWw7XG4gIH0gZWxzZSB7XG4gICAgaGlkZShPLCBrZXksIHZhbCk7XG4gIH1cbi8vIGFkZCBmYWtlIEZ1bmN0aW9uI3RvU3RyaW5nIGZvciBjb3JyZWN0IHdvcmsgd3JhcHBlZCBtZXRob2RzIC8gY29uc3RydWN0b3JzIHdpdGggbWV0aG9kcyBsaWtlIExvRGFzaCBpc05hdGl2ZVxufSkoRnVuY3Rpb24ucHJvdG90eXBlLCBUT19TVFJJTkcsIGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICByZXR1cm4gdHlwZW9mIHRoaXMgPT0gJ2Z1bmN0aW9uJyAmJiB0aGlzW1NSQ10gfHwgJHRvU3RyaW5nLmNhbGwodGhpcyk7XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuL19jbGFzc29mJyk7XG52YXIgYnVpbHRpbkV4ZWMgPSBSZWdFeHAucHJvdG90eXBlLmV4ZWM7XG5cbiAvLyBgUmVnRXhwRXhlY2AgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1yZWdleHBleGVjXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChSLCBTKSB7XG4gIHZhciBleGVjID0gUi5leGVjO1xuICBpZiAodHlwZW9mIGV4ZWMgPT09ICdmdW5jdGlvbicpIHtcbiAgICB2YXIgcmVzdWx0ID0gZXhlYy5jYWxsKFIsIFMpO1xuICAgIGlmICh0eXBlb2YgcmVzdWx0ICE9PSAnb2JqZWN0Jykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignUmVnRXhwIGV4ZWMgbWV0aG9kIHJldHVybmVkIHNvbWV0aGluZyBvdGhlciB0aGFuIGFuIE9iamVjdCBvciBudWxsJyk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgaWYgKGNsYXNzb2YoUikgIT09ICdSZWdFeHAnKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignUmVnRXhwI2V4ZWMgY2FsbGVkIG9uIGluY29tcGF0aWJsZSByZWNlaXZlcicpO1xuICB9XG4gIHJldHVybiBidWlsdGluRXhlYy5jYWxsKFIsIFMpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHJlZ2V4cEZsYWdzID0gcmVxdWlyZSgnLi9fZmxhZ3MnKTtcblxudmFyIG5hdGl2ZUV4ZWMgPSBSZWdFeHAucHJvdG90eXBlLmV4ZWM7XG4vLyBUaGlzIGFsd2F5cyByZWZlcnMgdG8gdGhlIG5hdGl2ZSBpbXBsZW1lbnRhdGlvbiwgYmVjYXVzZSB0aGVcbi8vIFN0cmluZyNyZXBsYWNlIHBvbHlmaWxsIHVzZXMgLi9maXgtcmVnZXhwLXdlbGwta25vd24tc3ltYm9sLWxvZ2ljLmpzLFxuLy8gd2hpY2ggbG9hZHMgdGhpcyBmaWxlIGJlZm9yZSBwYXRjaGluZyB0aGUgbWV0aG9kLlxudmFyIG5hdGl2ZVJlcGxhY2UgPSBTdHJpbmcucHJvdG90eXBlLnJlcGxhY2U7XG5cbnZhciBwYXRjaGVkRXhlYyA9IG5hdGl2ZUV4ZWM7XG5cbnZhciBMQVNUX0lOREVYID0gJ2xhc3RJbmRleCc7XG5cbnZhciBVUERBVEVTX0xBU1RfSU5ERVhfV1JPTkcgPSAoZnVuY3Rpb24gKCkge1xuICB2YXIgcmUxID0gL2EvLFxuICAgICAgcmUyID0gL2IqL2c7XG4gIG5hdGl2ZUV4ZWMuY2FsbChyZTEsICdhJyk7XG4gIG5hdGl2ZUV4ZWMuY2FsbChyZTIsICdhJyk7XG4gIHJldHVybiByZTFbTEFTVF9JTkRFWF0gIT09IDAgfHwgcmUyW0xBU1RfSU5ERVhdICE9PSAwO1xufSkoKTtcblxuLy8gbm9ucGFydGljaXBhdGluZyBjYXB0dXJpbmcgZ3JvdXAsIGNvcGllZCBmcm9tIGVzNS1zaGltJ3MgU3RyaW5nI3NwbGl0IHBhdGNoLlxudmFyIE5QQ0dfSU5DTFVERUQgPSAvKCk/Py8uZXhlYygnJylbMV0gIT09IHVuZGVmaW5lZDtcblxudmFyIFBBVENIID0gVVBEQVRFU19MQVNUX0lOREVYX1dST05HIHx8IE5QQ0dfSU5DTFVERUQ7XG5cbmlmIChQQVRDSCkge1xuICBwYXRjaGVkRXhlYyA9IGZ1bmN0aW9uIGV4ZWMoc3RyKSB7XG4gICAgdmFyIHJlID0gdGhpcztcbiAgICB2YXIgbGFzdEluZGV4LCByZUNvcHksIG1hdGNoLCBpO1xuXG4gICAgaWYgKE5QQ0dfSU5DTFVERUQpIHtcbiAgICAgIHJlQ29weSA9IG5ldyBSZWdFeHAoJ14nICsgcmUuc291cmNlICsgJyQoPyFcXFxccyknLCByZWdleHBGbGFncy5jYWxsKHJlKSk7XG4gICAgfVxuICAgIGlmIChVUERBVEVTX0xBU1RfSU5ERVhfV1JPTkcpIGxhc3RJbmRleCA9IHJlW0xBU1RfSU5ERVhdO1xuXG4gICAgbWF0Y2ggPSBuYXRpdmVFeGVjLmNhbGwocmUsIHN0cik7XG5cbiAgICBpZiAoVVBEQVRFU19MQVNUX0lOREVYX1dST05HICYmIG1hdGNoKSB7XG4gICAgICByZVtMQVNUX0lOREVYXSA9IHJlLmdsb2JhbCA/IG1hdGNoLmluZGV4ICsgbWF0Y2hbMF0ubGVuZ3RoIDogbGFzdEluZGV4O1xuICAgIH1cbiAgICBpZiAoTlBDR19JTkNMVURFRCAmJiBtYXRjaCAmJiBtYXRjaC5sZW5ndGggPiAxKSB7XG4gICAgICAvLyBGaXggYnJvd3NlcnMgd2hvc2UgYGV4ZWNgIG1ldGhvZHMgZG9uJ3QgY29uc2lzdGVudGx5IHJldHVybiBgdW5kZWZpbmVkYFxuICAgICAgLy8gZm9yIE5QQ0csIGxpa2UgSUU4LiBOT1RFOiBUaGlzIGRvZXNuJyB3b3JrIGZvciAvKC4/KT8vXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbG9vcC1mdW5jXG4gICAgICBuYXRpdmVSZXBsYWNlLmNhbGwobWF0Y2hbMF0sIHJlQ29weSwgZnVuY3Rpb24gKCkge1xuICAgICAgICBmb3IgKGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aCAtIDI7IGkrKykge1xuICAgICAgICAgIGlmIChhcmd1bWVudHNbaV0gPT09IHVuZGVmaW5lZCkgbWF0Y2hbaV0gPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBtYXRjaDtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBwYXRjaGVkRXhlYztcbiIsInZhciBkZWYgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpO1xudmFyIFRBRyA9IHJlcXVpcmUoJy4vX3drcycpKCd0b1N0cmluZ1RhZycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCwgdGFnLCBzdGF0KSB7XG4gIGlmIChpdCAmJiAhaGFzKGl0ID0gc3RhdCA/IGl0IDogaXQucHJvdG90eXBlLCBUQUcpKSBkZWYoaXQsIFRBRywgeyBjb25maWd1cmFibGU6IHRydWUsIHZhbHVlOiB0YWcgfSk7XG59O1xuIiwidmFyIHNoYXJlZCA9IHJlcXVpcmUoJy4vX3NoYXJlZCcpKCdrZXlzJyk7XG52YXIgdWlkID0gcmVxdWlyZSgnLi9fdWlkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuIHNoYXJlZFtrZXldIHx8IChzaGFyZWRba2V5XSA9IHVpZChrZXkpKTtcbn07XG4iLCJ2YXIgY29yZSA9IHJlcXVpcmUoJy4vX2NvcmUnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBTSEFSRUQgPSAnX19jb3JlLWpzX3NoYXJlZF9fJztcbnZhciBzdG9yZSA9IGdsb2JhbFtTSEFSRURdIHx8IChnbG9iYWxbU0hBUkVEXSA9IHt9KTtcblxuKG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgcmV0dXJuIHN0b3JlW2tleV0gfHwgKHN0b3JlW2tleV0gPSB2YWx1ZSAhPT0gdW5kZWZpbmVkID8gdmFsdWUgOiB7fSk7XG59KSgndmVyc2lvbnMnLCBbXSkucHVzaCh7XG4gIHZlcnNpb246IGNvcmUudmVyc2lvbixcbiAgbW9kZTogcmVxdWlyZSgnLi9fbGlicmFyeScpID8gJ3B1cmUnIDogJ2dsb2JhbCcsXG4gIGNvcHlyaWdodDogJ8KpIDIwMTkgRGVuaXMgUHVzaGthcmV2ICh6bG9pcm9jay5ydSknXG59KTtcbiIsInZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJyk7XG52YXIgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbi8vIHRydWUgIC0+IFN0cmluZyNhdFxuLy8gZmFsc2UgLT4gU3RyaW5nI2NvZGVQb2ludEF0XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChUT19TVFJJTkcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICh0aGF0LCBwb3MpIHtcbiAgICB2YXIgcyA9IFN0cmluZyhkZWZpbmVkKHRoYXQpKTtcbiAgICB2YXIgaSA9IHRvSW50ZWdlcihwb3MpO1xuICAgIHZhciBsID0gcy5sZW5ndGg7XG4gICAgdmFyIGEsIGI7XG4gICAgaWYgKGkgPCAwIHx8IGkgPj0gbCkgcmV0dXJuIFRPX1NUUklORyA/ICcnIDogdW5kZWZpbmVkO1xuICAgIGEgPSBzLmNoYXJDb2RlQXQoaSk7XG4gICAgcmV0dXJuIGEgPCAweGQ4MDAgfHwgYSA+IDB4ZGJmZiB8fCBpICsgMSA9PT0gbCB8fCAoYiA9IHMuY2hhckNvZGVBdChpICsgMSkpIDwgMHhkYzAwIHx8IGIgPiAweGRmZmZcbiAgICAgID8gVE9fU1RSSU5HID8gcy5jaGFyQXQoaSkgOiBhXG4gICAgICA6IFRPX1NUUklORyA/IHMuc2xpY2UoaSwgaSArIDIpIDogKGEgLSAweGQ4MDAgPDwgMTApICsgKGIgLSAweGRjMDApICsgMHgxMDAwMDtcbiAgfTtcbn07XG4iLCJ2YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpO1xudmFyIG1heCA9IE1hdGgubWF4O1xudmFyIG1pbiA9IE1hdGgubWluO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaW5kZXgsIGxlbmd0aCkge1xuICBpbmRleCA9IHRvSW50ZWdlcihpbmRleCk7XG4gIHJldHVybiBpbmRleCA8IDAgPyBtYXgoaW5kZXggKyBsZW5ndGgsIDApIDogbWluKGluZGV4LCBsZW5ndGgpO1xufTtcbiIsIi8vIDcuMS40IFRvSW50ZWdlclxudmFyIGNlaWwgPSBNYXRoLmNlaWw7XG52YXIgZmxvb3IgPSBNYXRoLmZsb29yO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGlzTmFOKGl0ID0gK2l0KSA/IDAgOiAoaXQgPiAwID8gZmxvb3IgOiBjZWlsKShpdCk7XG59O1xuIiwiLy8gdG8gaW5kZXhlZCBvYmplY3QsIHRvT2JqZWN0IHdpdGggZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBzdHJpbmdzXG52YXIgSU9iamVjdCA9IHJlcXVpcmUoJy4vX2lvYmplY3QnKTtcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIElPYmplY3QoZGVmaW5lZChpdCkpO1xufTtcbiIsIi8vIDcuMS4xNSBUb0xlbmd0aFxudmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKTtcbnZhciBtaW4gPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpdCA+IDAgPyBtaW4odG9JbnRlZ2VyKGl0KSwgMHgxZmZmZmZmZmZmZmZmZikgOiAwOyAvLyBwb3coMiwgNTMpIC0gMSA9PSA5MDA3MTk5MjU0NzQwOTkxXG59O1xuIiwiLy8gNy4xLjEzIFRvT2JqZWN0KGFyZ3VtZW50KVxudmFyIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gT2JqZWN0KGRlZmluZWQoaXQpKTtcbn07XG4iLCIvLyA3LjEuMSBUb1ByaW1pdGl2ZShpbnB1dCBbLCBQcmVmZXJyZWRUeXBlXSlcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xuLy8gaW5zdGVhZCBvZiB0aGUgRVM2IHNwZWMgdmVyc2lvbiwgd2UgZGlkbid0IGltcGxlbWVudCBAQHRvUHJpbWl0aXZlIGNhc2Vcbi8vIGFuZCB0aGUgc2Vjb25kIGFyZ3VtZW50IC0gZmxhZyAtIHByZWZlcnJlZCB0eXBlIGlzIGEgc3RyaW5nXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCwgUykge1xuICBpZiAoIWlzT2JqZWN0KGl0KSkgcmV0dXJuIGl0O1xuICB2YXIgZm4sIHZhbDtcbiAgaWYgKFMgJiYgdHlwZW9mIChmbiA9IGl0LnRvU3RyaW5nKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpIHJldHVybiB2YWw7XG4gIGlmICh0eXBlb2YgKGZuID0gaXQudmFsdWVPZikgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKSByZXR1cm4gdmFsO1xuICBpZiAoIVMgJiYgdHlwZW9mIChmbiA9IGl0LnRvU3RyaW5nKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpIHJldHVybiB2YWw7XG4gIHRocm93IFR5cGVFcnJvcihcIkNhbid0IGNvbnZlcnQgb2JqZWN0IHRvIHByaW1pdGl2ZSB2YWx1ZVwiKTtcbn07XG4iLCJ2YXIgaWQgPSAwO1xudmFyIHB4ID0gTWF0aC5yYW5kb20oKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gJ1N5bWJvbCgnLmNvbmNhdChrZXkgPT09IHVuZGVmaW5lZCA/ICcnIDoga2V5LCAnKV8nLCAoKytpZCArIHB4KS50b1N0cmluZygzNikpO1xufTtcbiIsInZhciBzdG9yZSA9IHJlcXVpcmUoJy4vX3NoYXJlZCcpKCd3a3MnKTtcbnZhciB1aWQgPSByZXF1aXJlKCcuL191aWQnKTtcbnZhciBTeW1ib2wgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5TeW1ib2w7XG52YXIgVVNFX1NZTUJPTCA9IHR5cGVvZiBTeW1ib2wgPT0gJ2Z1bmN0aW9uJztcblxudmFyICRleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmFtZSkge1xuICByZXR1cm4gc3RvcmVbbmFtZV0gfHwgKHN0b3JlW25hbWVdID1cbiAgICBVU0VfU1lNQk9MICYmIFN5bWJvbFtuYW1lXSB8fCAoVVNFX1NZTUJPTCA/IFN5bWJvbCA6IHVpZCkoJ1N5bWJvbC4nICsgbmFtZSkpO1xufTtcblxuJGV4cG9ydHMuc3RvcmUgPSBzdG9yZTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBhZGRUb1Vuc2NvcGFibGVzID0gcmVxdWlyZSgnLi9fYWRkLXRvLXVuc2NvcGFibGVzJyk7XG52YXIgc3RlcCA9IHJlcXVpcmUoJy4vX2l0ZXItc3RlcCcpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpO1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcblxuLy8gMjIuMS4zLjQgQXJyYXkucHJvdG90eXBlLmVudHJpZXMoKVxuLy8gMjIuMS4zLjEzIEFycmF5LnByb3RvdHlwZS5rZXlzKClcbi8vIDIyLjEuMy4yOSBBcnJheS5wcm90b3R5cGUudmFsdWVzKClcbi8vIDIyLjEuMy4zMCBBcnJheS5wcm90b3R5cGVbQEBpdGVyYXRvcl0oKVxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19pdGVyLWRlZmluZScpKEFycmF5LCAnQXJyYXknLCBmdW5jdGlvbiAoaXRlcmF0ZWQsIGtpbmQpIHtcbiAgdGhpcy5fdCA9IHRvSU9iamVjdChpdGVyYXRlZCk7IC8vIHRhcmdldFxuICB0aGlzLl9pID0gMDsgICAgICAgICAgICAgICAgICAgLy8gbmV4dCBpbmRleFxuICB0aGlzLl9rID0ga2luZDsgICAgICAgICAgICAgICAgLy8ga2luZFxuLy8gMjIuMS41LjIuMSAlQXJyYXlJdGVyYXRvclByb3RvdHlwZSUubmV4dCgpXG59LCBmdW5jdGlvbiAoKSB7XG4gIHZhciBPID0gdGhpcy5fdDtcbiAgdmFyIGtpbmQgPSB0aGlzLl9rO1xuICB2YXIgaW5kZXggPSB0aGlzLl9pKys7XG4gIGlmICghTyB8fCBpbmRleCA+PSBPLmxlbmd0aCkge1xuICAgIHRoaXMuX3QgPSB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIHN0ZXAoMSk7XG4gIH1cbiAgaWYgKGtpbmQgPT0gJ2tleXMnKSByZXR1cm4gc3RlcCgwLCBpbmRleCk7XG4gIGlmIChraW5kID09ICd2YWx1ZXMnKSByZXR1cm4gc3RlcCgwLCBPW2luZGV4XSk7XG4gIHJldHVybiBzdGVwKDAsIFtpbmRleCwgT1tpbmRleF1dKTtcbn0sICd2YWx1ZXMnKTtcblxuLy8gYXJndW1lbnRzTGlzdFtAQGl0ZXJhdG9yXSBpcyAlQXJyYXlQcm90b192YWx1ZXMlICg5LjQuNC42LCA5LjQuNC43KVxuSXRlcmF0b3JzLkFyZ3VtZW50cyA9IEl0ZXJhdG9ycy5BcnJheTtcblxuYWRkVG9VbnNjb3BhYmxlcygna2V5cycpO1xuYWRkVG9VbnNjb3BhYmxlcygndmFsdWVzJyk7XG5hZGRUb1Vuc2NvcGFibGVzKCdlbnRyaWVzJyk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgcmVnZXhwRXhlYyA9IHJlcXVpcmUoJy4vX3JlZ2V4cC1leGVjJyk7XG5yZXF1aXJlKCcuL19leHBvcnQnKSh7XG4gIHRhcmdldDogJ1JlZ0V4cCcsXG4gIHByb3RvOiB0cnVlLFxuICBmb3JjZWQ6IHJlZ2V4cEV4ZWMgIT09IC8uLy5leGVjXG59LCB7XG4gIGV4ZWM6IHJlZ2V4cEV4ZWNcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpO1xudmFyIGFkdmFuY2VTdHJpbmdJbmRleCA9IHJlcXVpcmUoJy4vX2FkdmFuY2Utc3RyaW5nLWluZGV4Jyk7XG52YXIgcmVnRXhwRXhlYyA9IHJlcXVpcmUoJy4vX3JlZ2V4cC1leGVjLWFic3RyYWN0Jyk7XG5cbi8vIEBAbWF0Y2ggbG9naWNcbnJlcXVpcmUoJy4vX2ZpeC1yZS13a3MnKSgnbWF0Y2gnLCAxLCBmdW5jdGlvbiAoZGVmaW5lZCwgTUFUQ0gsICRtYXRjaCwgbWF5YmVDYWxsTmF0aXZlKSB7XG4gIHJldHVybiBbXG4gICAgLy8gYFN0cmluZy5wcm90b3R5cGUubWF0Y2hgIG1ldGhvZFxuICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXN0cmluZy5wcm90b3R5cGUubWF0Y2hcbiAgICBmdW5jdGlvbiBtYXRjaChyZWdleHApIHtcbiAgICAgIHZhciBPID0gZGVmaW5lZCh0aGlzKTtcbiAgICAgIHZhciBmbiA9IHJlZ2V4cCA9PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiByZWdleHBbTUFUQ0hdO1xuICAgICAgcmV0dXJuIGZuICE9PSB1bmRlZmluZWQgPyBmbi5jYWxsKHJlZ2V4cCwgTykgOiBuZXcgUmVnRXhwKHJlZ2V4cClbTUFUQ0hdKFN0cmluZyhPKSk7XG4gICAgfSxcbiAgICAvLyBgUmVnRXhwLnByb3RvdHlwZVtAQG1hdGNoXWAgbWV0aG9kXG4gICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtcmVnZXhwLnByb3RvdHlwZS1AQG1hdGNoXG4gICAgZnVuY3Rpb24gKHJlZ2V4cCkge1xuICAgICAgdmFyIHJlcyA9IG1heWJlQ2FsbE5hdGl2ZSgkbWF0Y2gsIHJlZ2V4cCwgdGhpcyk7XG4gICAgICBpZiAocmVzLmRvbmUpIHJldHVybiByZXMudmFsdWU7XG4gICAgICB2YXIgcnggPSBhbk9iamVjdChyZWdleHApO1xuICAgICAgdmFyIFMgPSBTdHJpbmcodGhpcyk7XG4gICAgICBpZiAoIXJ4Lmdsb2JhbCkgcmV0dXJuIHJlZ0V4cEV4ZWMocngsIFMpO1xuICAgICAgdmFyIGZ1bGxVbmljb2RlID0gcngudW5pY29kZTtcbiAgICAgIHJ4Lmxhc3RJbmRleCA9IDA7XG4gICAgICB2YXIgQSA9IFtdO1xuICAgICAgdmFyIG4gPSAwO1xuICAgICAgdmFyIHJlc3VsdDtcbiAgICAgIHdoaWxlICgocmVzdWx0ID0gcmVnRXhwRXhlYyhyeCwgUykpICE9PSBudWxsKSB7XG4gICAgICAgIHZhciBtYXRjaFN0ciA9IFN0cmluZyhyZXN1bHRbMF0pO1xuICAgICAgICBBW25dID0gbWF0Y2hTdHI7XG4gICAgICAgIGlmIChtYXRjaFN0ciA9PT0gJycpIHJ4Lmxhc3RJbmRleCA9IGFkdmFuY2VTdHJpbmdJbmRleChTLCB0b0xlbmd0aChyeC5sYXN0SW5kZXgpLCBmdWxsVW5pY29kZSk7XG4gICAgICAgIG4rKztcbiAgICAgIH1cbiAgICAgIHJldHVybiBuID09PSAwID8gbnVsbCA6IEE7XG4gICAgfVxuICBdO1xufSk7XG4iLCJ2YXIgJGl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vZXM2LmFycmF5Lml0ZXJhdG9yJyk7XG52YXIgZ2V0S2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJyk7XG52YXIgcmVkZWZpbmUgPSByZXF1aXJlKCcuL19yZWRlZmluZScpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIGhpZGUgPSByZXF1aXJlKCcuL19oaWRlJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJyk7XG52YXIgd2tzID0gcmVxdWlyZSgnLi9fd2tzJyk7XG52YXIgSVRFUkFUT1IgPSB3a3MoJ2l0ZXJhdG9yJyk7XG52YXIgVE9fU1RSSU5HX1RBRyA9IHdrcygndG9TdHJpbmdUYWcnKTtcbnZhciBBcnJheVZhbHVlcyA9IEl0ZXJhdG9ycy5BcnJheTtcblxudmFyIERPTUl0ZXJhYmxlcyA9IHtcbiAgQ1NTUnVsZUxpc3Q6IHRydWUsIC8vIFRPRE86IE5vdCBzcGVjIGNvbXBsaWFudCwgc2hvdWxkIGJlIGZhbHNlLlxuICBDU1NTdHlsZURlY2xhcmF0aW9uOiBmYWxzZSxcbiAgQ1NTVmFsdWVMaXN0OiBmYWxzZSxcbiAgQ2xpZW50UmVjdExpc3Q6IGZhbHNlLFxuICBET01SZWN0TGlzdDogZmFsc2UsXG4gIERPTVN0cmluZ0xpc3Q6IGZhbHNlLFxuICBET01Ub2tlbkxpc3Q6IHRydWUsXG4gIERhdGFUcmFuc2Zlckl0ZW1MaXN0OiBmYWxzZSxcbiAgRmlsZUxpc3Q6IGZhbHNlLFxuICBIVE1MQWxsQ29sbGVjdGlvbjogZmFsc2UsXG4gIEhUTUxDb2xsZWN0aW9uOiBmYWxzZSxcbiAgSFRNTEZvcm1FbGVtZW50OiBmYWxzZSxcbiAgSFRNTFNlbGVjdEVsZW1lbnQ6IGZhbHNlLFxuICBNZWRpYUxpc3Q6IHRydWUsIC8vIFRPRE86IE5vdCBzcGVjIGNvbXBsaWFudCwgc2hvdWxkIGJlIGZhbHNlLlxuICBNaW1lVHlwZUFycmF5OiBmYWxzZSxcbiAgTmFtZWROb2RlTWFwOiBmYWxzZSxcbiAgTm9kZUxpc3Q6IHRydWUsXG4gIFBhaW50UmVxdWVzdExpc3Q6IGZhbHNlLFxuICBQbHVnaW46IGZhbHNlLFxuICBQbHVnaW5BcnJheTogZmFsc2UsXG4gIFNWR0xlbmd0aExpc3Q6IGZhbHNlLFxuICBTVkdOdW1iZXJMaXN0OiBmYWxzZSxcbiAgU1ZHUGF0aFNlZ0xpc3Q6IGZhbHNlLFxuICBTVkdQb2ludExpc3Q6IGZhbHNlLFxuICBTVkdTdHJpbmdMaXN0OiBmYWxzZSxcbiAgU1ZHVHJhbnNmb3JtTGlzdDogZmFsc2UsXG4gIFNvdXJjZUJ1ZmZlckxpc3Q6IGZhbHNlLFxuICBTdHlsZVNoZWV0TGlzdDogdHJ1ZSwgLy8gVE9ETzogTm90IHNwZWMgY29tcGxpYW50LCBzaG91bGQgYmUgZmFsc2UuXG4gIFRleHRUcmFja0N1ZUxpc3Q6IGZhbHNlLFxuICBUZXh0VHJhY2tMaXN0OiBmYWxzZSxcbiAgVG91Y2hMaXN0OiBmYWxzZVxufTtcblxuZm9yICh2YXIgY29sbGVjdGlvbnMgPSBnZXRLZXlzKERPTUl0ZXJhYmxlcyksIGkgPSAwOyBpIDwgY29sbGVjdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgdmFyIE5BTUUgPSBjb2xsZWN0aW9uc1tpXTtcbiAgdmFyIGV4cGxpY2l0ID0gRE9NSXRlcmFibGVzW05BTUVdO1xuICB2YXIgQ29sbGVjdGlvbiA9IGdsb2JhbFtOQU1FXTtcbiAgdmFyIHByb3RvID0gQ29sbGVjdGlvbiAmJiBDb2xsZWN0aW9uLnByb3RvdHlwZTtcbiAgdmFyIGtleTtcbiAgaWYgKHByb3RvKSB7XG4gICAgaWYgKCFwcm90b1tJVEVSQVRPUl0pIGhpZGUocHJvdG8sIElURVJBVE9SLCBBcnJheVZhbHVlcyk7XG4gICAgaWYgKCFwcm90b1tUT19TVFJJTkdfVEFHXSkgaGlkZShwcm90bywgVE9fU1RSSU5HX1RBRywgTkFNRSk7XG4gICAgSXRlcmF0b3JzW05BTUVdID0gQXJyYXlWYWx1ZXM7XG4gICAgaWYgKGV4cGxpY2l0KSBmb3IgKGtleSBpbiAkaXRlcmF0b3JzKSBpZiAoIXByb3RvW2tleV0pIHJlZGVmaW5lKHByb3RvLCBrZXksICRpdGVyYXRvcnNba2V5XSwgdHJ1ZSk7XG4gIH1cbn1cbiIsImNvbnN0IGluc3RhbmNlT2ZBbnkgPSAob2JqZWN0LCBjb25zdHJ1Y3RvcnMpID0+IGNvbnN0cnVjdG9ycy5zb21lKGMgPT4gb2JqZWN0IGluc3RhbmNlb2YgYyk7XG5cbmxldCBpZGJQcm94eWFibGVUeXBlcztcclxubGV0IGN1cnNvckFkdmFuY2VNZXRob2RzO1xyXG4vLyBUaGlzIGlzIGEgZnVuY3Rpb24gdG8gcHJldmVudCBpdCB0aHJvd2luZyB1cCBpbiBub2RlIGVudmlyb25tZW50cy5cclxuZnVuY3Rpb24gZ2V0SWRiUHJveHlhYmxlVHlwZXMoKSB7XHJcbiAgICByZXR1cm4gKGlkYlByb3h5YWJsZVR5cGVzIHx8XHJcbiAgICAgICAgKGlkYlByb3h5YWJsZVR5cGVzID0gW1xyXG4gICAgICAgICAgICBJREJEYXRhYmFzZSxcclxuICAgICAgICAgICAgSURCT2JqZWN0U3RvcmUsXHJcbiAgICAgICAgICAgIElEQkluZGV4LFxyXG4gICAgICAgICAgICBJREJDdXJzb3IsXHJcbiAgICAgICAgICAgIElEQlRyYW5zYWN0aW9uLFxyXG4gICAgICAgIF0pKTtcclxufVxyXG4vLyBUaGlzIGlzIGEgZnVuY3Rpb24gdG8gcHJldmVudCBpdCB0aHJvd2luZyB1cCBpbiBub2RlIGVudmlyb25tZW50cy5cclxuZnVuY3Rpb24gZ2V0Q3Vyc29yQWR2YW5jZU1ldGhvZHMoKSB7XHJcbiAgICByZXR1cm4gKGN1cnNvckFkdmFuY2VNZXRob2RzIHx8XHJcbiAgICAgICAgKGN1cnNvckFkdmFuY2VNZXRob2RzID0gW1xyXG4gICAgICAgICAgICBJREJDdXJzb3IucHJvdG90eXBlLmFkdmFuY2UsXHJcbiAgICAgICAgICAgIElEQkN1cnNvci5wcm90b3R5cGUuY29udGludWUsXHJcbiAgICAgICAgICAgIElEQkN1cnNvci5wcm90b3R5cGUuY29udGludWVQcmltYXJ5S2V5LFxyXG4gICAgICAgIF0pKTtcclxufVxyXG5jb25zdCBjdXJzb3JSZXF1ZXN0TWFwID0gbmV3IFdlYWtNYXAoKTtcclxuY29uc3QgdHJhbnNhY3Rpb25Eb25lTWFwID0gbmV3IFdlYWtNYXAoKTtcclxuY29uc3QgdHJhbnNhY3Rpb25TdG9yZU5hbWVzTWFwID0gbmV3IFdlYWtNYXAoKTtcclxuY29uc3QgdHJhbnNmb3JtQ2FjaGUgPSBuZXcgV2Vha01hcCgpO1xyXG5jb25zdCByZXZlcnNlVHJhbnNmb3JtQ2FjaGUgPSBuZXcgV2Vha01hcCgpO1xyXG5mdW5jdGlvbiBwcm9taXNpZnlSZXF1ZXN0KHJlcXVlc3QpIHtcclxuICAgIGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgY29uc3QgdW5saXN0ZW4gPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHJlcXVlc3QucmVtb3ZlRXZlbnRMaXN0ZW5lcignc3VjY2VzcycsIHN1Y2Nlc3MpO1xyXG4gICAgICAgICAgICByZXF1ZXN0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZXJyb3IpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgY29uc3Qgc3VjY2VzcyA9ICgpID0+IHtcclxuICAgICAgICAgICAgcmVzb2x2ZSh3cmFwKHJlcXVlc3QucmVzdWx0KSk7XHJcbiAgICAgICAgICAgIHVubGlzdGVuKCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zdCBlcnJvciA9ICgpID0+IHtcclxuICAgICAgICAgICAgcmVqZWN0KHJlcXVlc3QuZXJyb3IpO1xyXG4gICAgICAgICAgICB1bmxpc3RlbigpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdzdWNjZXNzJywgc3VjY2Vzcyk7XHJcbiAgICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIGVycm9yKTtcclxuICAgIH0pO1xyXG4gICAgcHJvbWlzZVxyXG4gICAgICAgIC50aGVuKHZhbHVlID0+IHtcclxuICAgICAgICAvLyBTaW5jZSBjdXJzb3JpbmcgcmV1c2VzIHRoZSBJREJSZXF1ZXN0ICgqc2lnaCopLCB3ZSBjYWNoZSBpdCBmb3IgbGF0ZXIgcmV0cmlldmFsXHJcbiAgICAgICAgLy8gKHNlZSB3cmFwRnVuY3Rpb24pLlxyXG4gICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIElEQkN1cnNvcikge1xyXG4gICAgICAgICAgICBjdXJzb3JSZXF1ZXN0TWFwLnNldCh2YWx1ZSwgcmVxdWVzdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIENhdGNoaW5nIHRvIGF2b2lkIFwiVW5jYXVnaHQgUHJvbWlzZSBleGNlcHRpb25zXCJcclxuICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKCgpID0+IHsgfSk7XHJcbiAgICAvLyBUaGlzIG1hcHBpbmcgZXhpc3RzIGluIHJldmVyc2VUcmFuc2Zvcm1DYWNoZSBidXQgZG9lc24ndCBkb2Vzbid0IGV4aXN0IGluIHRyYW5zZm9ybUNhY2hlLiBUaGlzXHJcbiAgICAvLyBpcyBiZWNhdXNlIHdlIGNyZWF0ZSBtYW55IHByb21pc2VzIGZyb20gYSBzaW5nbGUgSURCUmVxdWVzdC5cclxuICAgIHJldmVyc2VUcmFuc2Zvcm1DYWNoZS5zZXQocHJvbWlzZSwgcmVxdWVzdCk7XHJcbiAgICByZXR1cm4gcHJvbWlzZTtcclxufVxyXG5mdW5jdGlvbiBjYWNoZURvbmVQcm9taXNlRm9yVHJhbnNhY3Rpb24odHgpIHtcclxuICAgIC8vIEVhcmx5IGJhaWwgaWYgd2UndmUgYWxyZWFkeSBjcmVhdGVkIGEgZG9uZSBwcm9taXNlIGZvciB0aGlzIHRyYW5zYWN0aW9uLlxyXG4gICAgaWYgKHRyYW5zYWN0aW9uRG9uZU1hcC5oYXModHgpKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIGNvbnN0IGRvbmUgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgY29uc3QgdW5saXN0ZW4gPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHR4LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NvbXBsZXRlJywgY29tcGxldGUpO1xyXG4gICAgICAgICAgICB0eC5yZW1vdmVFdmVudExpc3RlbmVyKCdlcnJvcicsIGVycm9yKTtcclxuICAgICAgICAgICAgdHgucmVtb3ZlRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBlcnJvcik7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zdCBjb21wbGV0ZSA9ICgpID0+IHtcclxuICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICB1bmxpc3RlbigpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgY29uc3QgZXJyb3IgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHJlamVjdCh0eC5lcnJvcik7XHJcbiAgICAgICAgICAgIHVubGlzdGVuKCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0eC5hZGRFdmVudExpc3RlbmVyKCdjb21wbGV0ZScsIGNvbXBsZXRlKTtcclxuICAgICAgICB0eC5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIGVycm9yKTtcclxuICAgICAgICB0eC5hZGRFdmVudExpc3RlbmVyKCdhYm9ydCcsIGVycm9yKTtcclxuICAgIH0pO1xyXG4gICAgLy8gQ2FjaGUgaXQgZm9yIGxhdGVyIHJldHJpZXZhbC5cclxuICAgIHRyYW5zYWN0aW9uRG9uZU1hcC5zZXQodHgsIGRvbmUpO1xyXG59XHJcbmxldCBpZGJQcm94eVRyYXBzID0ge1xyXG4gICAgZ2V0KHRhcmdldCwgcHJvcCwgcmVjZWl2ZXIpIHtcclxuICAgICAgICBpZiAodGFyZ2V0IGluc3RhbmNlb2YgSURCVHJhbnNhY3Rpb24pIHtcclxuICAgICAgICAgICAgLy8gU3BlY2lhbCBoYW5kbGluZyBmb3IgdHJhbnNhY3Rpb24uZG9uZS5cclxuICAgICAgICAgICAgaWYgKHByb3AgPT09ICdkb25lJylcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cmFuc2FjdGlvbkRvbmVNYXAuZ2V0KHRhcmdldCk7XHJcbiAgICAgICAgICAgIC8vIFBvbHlmaWxsIGZvciBvYmplY3RTdG9yZU5hbWVzIGJlY2F1c2Ugb2YgRWRnZS5cclxuICAgICAgICAgICAgaWYgKHByb3AgPT09ICdvYmplY3RTdG9yZU5hbWVzJykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRhcmdldC5vYmplY3RTdG9yZU5hbWVzIHx8IHRyYW5zYWN0aW9uU3RvcmVOYW1lc01hcC5nZXQodGFyZ2V0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBNYWtlIHR4LnN0b3JlIHJldHVybiB0aGUgb25seSBzdG9yZSBpbiB0aGUgdHJhbnNhY3Rpb24sIG9yIHVuZGVmaW5lZCBpZiB0aGVyZSBhcmUgbWFueS5cclxuICAgICAgICAgICAgaWYgKHByb3AgPT09ICdzdG9yZScpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZWNlaXZlci5vYmplY3RTdG9yZU5hbWVzWzFdXHJcbiAgICAgICAgICAgICAgICAgICAgPyB1bmRlZmluZWRcclxuICAgICAgICAgICAgICAgICAgICA6IHJlY2VpdmVyLm9iamVjdFN0b3JlKHJlY2VpdmVyLm9iamVjdFN0b3JlTmFtZXNbMF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIEVsc2UgdHJhbnNmb3JtIHdoYXRldmVyIHdlIGdldCBiYWNrLlxyXG4gICAgICAgIHJldHVybiB3cmFwKHRhcmdldFtwcm9wXSk7XHJcbiAgICB9LFxyXG4gICAgaGFzKHRhcmdldCwgcHJvcCkge1xyXG4gICAgICAgIGlmICh0YXJnZXQgaW5zdGFuY2VvZiBJREJUcmFuc2FjdGlvbiAmJlxyXG4gICAgICAgICAgICAocHJvcCA9PT0gJ2RvbmUnIHx8IHByb3AgPT09ICdzdG9yZScpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcHJvcCBpbiB0YXJnZXQ7XHJcbiAgICB9LFxyXG59O1xyXG5mdW5jdGlvbiBhZGRUcmFwcyhjYWxsYmFjaykge1xyXG4gICAgaWRiUHJveHlUcmFwcyA9IGNhbGxiYWNrKGlkYlByb3h5VHJhcHMpO1xyXG59XHJcbmZ1bmN0aW9uIHdyYXBGdW5jdGlvbihmdW5jKSB7XHJcbiAgICAvLyBEdWUgdG8gZXhwZWN0ZWQgb2JqZWN0IGVxdWFsaXR5ICh3aGljaCBpcyBlbmZvcmNlZCBieSB0aGUgY2FjaGluZyBpbiBgd3JhcGApLCB3ZVxyXG4gICAgLy8gb25seSBjcmVhdGUgb25lIG5ldyBmdW5jIHBlciBmdW5jLlxyXG4gICAgLy8gRWRnZSBkb2Vzbid0IHN1cHBvcnQgb2JqZWN0U3RvcmVOYW1lcyAoYm9vbyksIHNvIHdlIHBvbHlmaWxsIGl0IGhlcmUuXHJcbiAgICBpZiAoZnVuYyA9PT0gSURCRGF0YWJhc2UucHJvdG90eXBlLnRyYW5zYWN0aW9uICYmXHJcbiAgICAgICAgISgnb2JqZWN0U3RvcmVOYW1lcycgaW4gSURCVHJhbnNhY3Rpb24ucHJvdG90eXBlKSkge1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoc3RvcmVOYW1lcywgLi4uYXJncykge1xyXG4gICAgICAgICAgICBjb25zdCB0eCA9IGZ1bmMuY2FsbCh1bndyYXAodGhpcyksIHN0b3JlTmFtZXMsIC4uLmFyZ3MpO1xyXG4gICAgICAgICAgICB0cmFuc2FjdGlvblN0b3JlTmFtZXNNYXAuc2V0KHR4LCBzdG9yZU5hbWVzLnNvcnQgPyBzdG9yZU5hbWVzLnNvcnQoKSA6IFtzdG9yZU5hbWVzXSk7XHJcbiAgICAgICAgICAgIHJldHVybiB3cmFwKHR4KTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgLy8gQ3Vyc29yIG1ldGhvZHMgYXJlIHNwZWNpYWwsIGFzIHRoZSBiZWhhdmlvdXIgaXMgYSBsaXR0bGUgbW9yZSBkaWZmZXJlbnQgdG8gc3RhbmRhcmQgSURCLiBJblxyXG4gICAgLy8gSURCLCB5b3UgYWR2YW5jZSB0aGUgY3Vyc29yIGFuZCB3YWl0IGZvciBhIG5ldyAnc3VjY2Vzcycgb24gdGhlIElEQlJlcXVlc3QgdGhhdCBnYXZlIHlvdSB0aGVcclxuICAgIC8vIGN1cnNvci4gSXQncyBraW5kYSBsaWtlIGEgcHJvbWlzZSB0aGF0IGNhbiByZXNvbHZlIHdpdGggbWFueSB2YWx1ZXMuIFRoYXQgZG9lc24ndCBtYWtlIHNlbnNlXHJcbiAgICAvLyB3aXRoIHJlYWwgcHJvbWlzZXMsIHNvIGVhY2ggYWR2YW5jZSBtZXRob2RzIHJldHVybnMgYSBuZXcgcHJvbWlzZSBmb3IgdGhlIGN1cnNvciBvYmplY3QsIG9yXHJcbiAgICAvLyB1bmRlZmluZWQgaWYgdGhlIGVuZCBvZiB0aGUgY3Vyc29yIGhhcyBiZWVuIHJlYWNoZWQuXHJcbiAgICBpZiAoZ2V0Q3Vyc29yQWR2YW5jZU1ldGhvZHMoKS5pbmNsdWRlcyhmdW5jKSkge1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xyXG4gICAgICAgICAgICAvLyBDYWxsaW5nIHRoZSBvcmlnaW5hbCBmdW5jdGlvbiB3aXRoIHRoZSBwcm94eSBhcyAndGhpcycgY2F1c2VzIElMTEVHQUwgSU5WT0NBVElPTiwgc28gd2UgdXNlXHJcbiAgICAgICAgICAgIC8vIHRoZSBvcmlnaW5hbCBvYmplY3QuXHJcbiAgICAgICAgICAgIGZ1bmMuYXBwbHkodW53cmFwKHRoaXMpLCBhcmdzKTtcclxuICAgICAgICAgICAgcmV0dXJuIHdyYXAoY3Vyc29yUmVxdWVzdE1hcC5nZXQodGhpcykpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcclxuICAgICAgICAvLyBDYWxsaW5nIHRoZSBvcmlnaW5hbCBmdW5jdGlvbiB3aXRoIHRoZSBwcm94eSBhcyAndGhpcycgY2F1c2VzIElMTEVHQUwgSU5WT0NBVElPTiwgc28gd2UgdXNlXHJcbiAgICAgICAgLy8gdGhlIG9yaWdpbmFsIG9iamVjdC5cclxuICAgICAgICByZXR1cm4gd3JhcChmdW5jLmFwcGx5KHVud3JhcCh0aGlzKSwgYXJncykpO1xyXG4gICAgfTtcclxufVxyXG5mdW5jdGlvbiB0cmFuc2Zvcm1DYWNoYWJsZVZhbHVlKHZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKVxyXG4gICAgICAgIHJldHVybiB3cmFwRnVuY3Rpb24odmFsdWUpO1xyXG4gICAgLy8gVGhpcyBkb2Vzbid0IHJldHVybiwgaXQganVzdCBjcmVhdGVzIGEgJ2RvbmUnIHByb21pc2UgZm9yIHRoZSB0cmFuc2FjdGlvbixcclxuICAgIC8vIHdoaWNoIGlzIGxhdGVyIHJldHVybmVkIGZvciB0cmFuc2FjdGlvbi5kb25lIChzZWUgaWRiT2JqZWN0SGFuZGxlcikuXHJcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBJREJUcmFuc2FjdGlvbilcclxuICAgICAgICBjYWNoZURvbmVQcm9taXNlRm9yVHJhbnNhY3Rpb24odmFsdWUpO1xyXG4gICAgaWYgKGluc3RhbmNlT2ZBbnkodmFsdWUsIGdldElkYlByb3h5YWJsZVR5cGVzKCkpKVxyXG4gICAgICAgIHJldHVybiBuZXcgUHJveHkodmFsdWUsIGlkYlByb3h5VHJhcHMpO1xyXG4gICAgLy8gUmV0dXJuIHRoZSBzYW1lIHZhbHVlIGJhY2sgaWYgd2UncmUgbm90IGdvaW5nIHRvIHRyYW5zZm9ybSBpdC5cclxuICAgIHJldHVybiB2YWx1ZTtcclxufVxyXG5mdW5jdGlvbiB3cmFwKHZhbHVlKSB7XHJcbiAgICAvLyBXZSBzb21ldGltZXMgZ2VuZXJhdGUgbXVsdGlwbGUgcHJvbWlzZXMgZnJvbSBhIHNpbmdsZSBJREJSZXF1ZXN0IChlZyB3aGVuIGN1cnNvcmluZyksIGJlY2F1c2VcclxuICAgIC8vIElEQiBpcyB3ZWlyZCBhbmQgYSBzaW5nbGUgSURCUmVxdWVzdCBjYW4geWllbGQgbWFueSByZXNwb25zZXMsIHNvIHRoZXNlIGNhbid0IGJlIGNhY2hlZC5cclxuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIElEQlJlcXVlc3QpXHJcbiAgICAgICAgcmV0dXJuIHByb21pc2lmeVJlcXVlc3QodmFsdWUpO1xyXG4gICAgLy8gSWYgd2UndmUgYWxyZWFkeSB0cmFuc2Zvcm1lZCB0aGlzIHZhbHVlIGJlZm9yZSwgcmV1c2UgdGhlIHRyYW5zZm9ybWVkIHZhbHVlLlxyXG4gICAgLy8gVGhpcyBpcyBmYXN0ZXIsIGJ1dCBpdCBhbHNvIHByb3ZpZGVzIG9iamVjdCBlcXVhbGl0eS5cclxuICAgIGlmICh0cmFuc2Zvcm1DYWNoZS5oYXModmFsdWUpKVxyXG4gICAgICAgIHJldHVybiB0cmFuc2Zvcm1DYWNoZS5nZXQodmFsdWUpO1xyXG4gICAgY29uc3QgbmV3VmFsdWUgPSB0cmFuc2Zvcm1DYWNoYWJsZVZhbHVlKHZhbHVlKTtcclxuICAgIC8vIE5vdCBhbGwgdHlwZXMgYXJlIHRyYW5zZm9ybWVkLlxyXG4gICAgLy8gVGhlc2UgbWF5IGJlIHByaW1pdGl2ZSB0eXBlcywgc28gdGhleSBjYW4ndCBiZSBXZWFrTWFwIGtleXMuXHJcbiAgICBpZiAobmV3VmFsdWUgIT09IHZhbHVlKSB7XHJcbiAgICAgICAgdHJhbnNmb3JtQ2FjaGUuc2V0KHZhbHVlLCBuZXdWYWx1ZSk7XHJcbiAgICAgICAgcmV2ZXJzZVRyYW5zZm9ybUNhY2hlLnNldChuZXdWYWx1ZSwgdmFsdWUpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5ld1ZhbHVlO1xyXG59XHJcbmNvbnN0IHVud3JhcCA9ICh2YWx1ZSkgPT4gcmV2ZXJzZVRyYW5zZm9ybUNhY2hlLmdldCh2YWx1ZSk7XG5cbmV4cG9ydCB7IHdyYXAgYXMgYSwgYWRkVHJhcHMgYXMgYiwgaW5zdGFuY2VPZkFueSBhcyBjLCByZXZlcnNlVHJhbnNmb3JtQ2FjaGUgYXMgZCwgdW53cmFwIGFzIGUgfTtcbiIsImltcG9ydCB7IGEgYXMgd3JhcCwgYiBhcyBhZGRUcmFwcyB9IGZyb20gJy4vY2h1bmsuanMnO1xuZXhwb3J0IHsgZSBhcyB1bndyYXAsIGEgYXMgd3JhcCB9IGZyb20gJy4vY2h1bmsuanMnO1xuXG4vKipcclxuICogT3BlbiBhIGRhdGFiYXNlLlxyXG4gKlxyXG4gKiBAcGFyYW0gbmFtZSBOYW1lIG9mIHRoZSBkYXRhYmFzZS5cclxuICogQHBhcmFtIHZlcnNpb24gU2NoZW1hIHZlcnNpb24uXHJcbiAqIEBwYXJhbSBjYWxsYmFja3MgQWRkaXRpb25hbCBjYWxsYmFja3MuXHJcbiAqL1xyXG5mdW5jdGlvbiBvcGVuREIobmFtZSwgdmVyc2lvbiwgeyBibG9ja2VkLCB1cGdyYWRlLCBibG9ja2luZyB9ID0ge30pIHtcclxuICAgIGNvbnN0IHJlcXVlc3QgPSBpbmRleGVkREIub3BlbihuYW1lLCB2ZXJzaW9uKTtcclxuICAgIGNvbnN0IG9wZW5Qcm9taXNlID0gd3JhcChyZXF1ZXN0KTtcclxuICAgIGlmICh1cGdyYWRlKSB7XHJcbiAgICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCd1cGdyYWRlbmVlZGVkJywgZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICB1cGdyYWRlKHdyYXAocmVxdWVzdC5yZXN1bHQpLCBldmVudC5vbGRWZXJzaW9uLCBldmVudC5uZXdWZXJzaW9uLCB3cmFwKHJlcXVlc3QudHJhbnNhY3Rpb24pKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGlmIChibG9ja2VkKVxyXG4gICAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignYmxvY2tlZCcsICgpID0+IGJsb2NrZWQoKSk7XHJcbiAgICBpZiAoYmxvY2tpbmcpIHtcclxuICAgICAgICBvcGVuUHJvbWlzZS50aGVuKGRiID0+IGRiLmFkZEV2ZW50TGlzdGVuZXIoJ3ZlcnNpb25jaGFuZ2UnLCBibG9ja2luZykpLmNhdGNoKCgpID0+IHsgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gb3BlblByb21pc2U7XHJcbn1cclxuLyoqXHJcbiAqIERlbGV0ZSBhIGRhdGFiYXNlLlxyXG4gKlxyXG4gKiBAcGFyYW0gbmFtZSBOYW1lIG9mIHRoZSBkYXRhYmFzZS5cclxuICovXHJcbmZ1bmN0aW9uIGRlbGV0ZURCKG5hbWUsIHsgYmxvY2tlZCB9ID0ge30pIHtcclxuICAgIGNvbnN0IHJlcXVlc3QgPSBpbmRleGVkREIuZGVsZXRlRGF0YWJhc2UobmFtZSk7XHJcbiAgICBpZiAoYmxvY2tlZClcclxuICAgICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2Jsb2NrZWQnLCAoKSA9PiBibG9ja2VkKCkpO1xyXG4gICAgcmV0dXJuIHdyYXAocmVxdWVzdCkudGhlbigoKSA9PiB1bmRlZmluZWQpO1xyXG59XG5cbmNvbnN0IHJlYWRNZXRob2RzID0gWydnZXQnLCAnZ2V0S2V5JywgJ2dldEFsbCcsICdnZXRBbGxLZXlzJywgJ2NvdW50J107XHJcbmNvbnN0IHdyaXRlTWV0aG9kcyA9IFsncHV0JywgJ2FkZCcsICdkZWxldGUnLCAnY2xlYXInXTtcclxuY29uc3QgY2FjaGVkTWV0aG9kcyA9IG5ldyBNYXAoKTtcclxuZnVuY3Rpb24gZ2V0TWV0aG9kKHRhcmdldCwgcHJvcCkge1xyXG4gICAgaWYgKCEodGFyZ2V0IGluc3RhbmNlb2YgSURCRGF0YWJhc2UgJiZcclxuICAgICAgICAhKHByb3AgaW4gdGFyZ2V0KSAmJlxyXG4gICAgICAgIHR5cGVvZiBwcm9wID09PSAnc3RyaW5nJykpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoY2FjaGVkTWV0aG9kcy5nZXQocHJvcCkpXHJcbiAgICAgICAgcmV0dXJuIGNhY2hlZE1ldGhvZHMuZ2V0KHByb3ApO1xyXG4gICAgY29uc3QgdGFyZ2V0RnVuY05hbWUgPSBwcm9wLnJlcGxhY2UoL0Zyb21JbmRleCQvLCAnJyk7XHJcbiAgICBjb25zdCB1c2VJbmRleCA9IHByb3AgIT09IHRhcmdldEZ1bmNOYW1lO1xyXG4gICAgY29uc3QgaXNXcml0ZSA9IHdyaXRlTWV0aG9kcy5pbmNsdWRlcyh0YXJnZXRGdW5jTmFtZSk7XHJcbiAgICBpZiAoXHJcbiAgICAvLyBCYWlsIGlmIHRoZSB0YXJnZXQgZG9lc24ndCBleGlzdCBvbiB0aGUgdGFyZ2V0LiBFZywgZ2V0QWxsIGlzbid0IGluIEVkZ2UuXHJcbiAgICAhKHRhcmdldEZ1bmNOYW1lIGluICh1c2VJbmRleCA/IElEQkluZGV4IDogSURCT2JqZWN0U3RvcmUpLnByb3RvdHlwZSkgfHxcclxuICAgICAgICAhKGlzV3JpdGUgfHwgcmVhZE1ldGhvZHMuaW5jbHVkZXModGFyZ2V0RnVuY05hbWUpKSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNvbnN0IG1ldGhvZCA9IGFzeW5jIGZ1bmN0aW9uIChzdG9yZU5hbWUsIC4uLmFyZ3MpIHtcclxuICAgICAgICAvLyBpc1dyaXRlID8gJ3JlYWR3cml0ZScgOiB1bmRlZmluZWQgZ3ppcHBzIGJldHRlciwgYnV0IGZhaWxzIGluIEVkZ2UgOihcclxuICAgICAgICBjb25zdCB0eCA9IHRoaXMudHJhbnNhY3Rpb24oc3RvcmVOYW1lLCBpc1dyaXRlID8gJ3JlYWR3cml0ZScgOiAncmVhZG9ubHknKTtcclxuICAgICAgICBsZXQgdGFyZ2V0ID0gdHguc3RvcmU7XHJcbiAgICAgICAgaWYgKHVzZUluZGV4KVxyXG4gICAgICAgICAgICB0YXJnZXQgPSB0YXJnZXQuaW5kZXgoYXJncy5zaGlmdCgpKTtcclxuICAgICAgICBjb25zdCByZXR1cm5WYWwgPSB0YXJnZXRbdGFyZ2V0RnVuY05hbWVdKC4uLmFyZ3MpO1xyXG4gICAgICAgIGlmIChpc1dyaXRlKVxyXG4gICAgICAgICAgICBhd2FpdCB0eC5kb25lO1xyXG4gICAgICAgIHJldHVybiByZXR1cm5WYWw7XHJcbiAgICB9O1xyXG4gICAgY2FjaGVkTWV0aG9kcy5zZXQocHJvcCwgbWV0aG9kKTtcclxuICAgIHJldHVybiBtZXRob2Q7XHJcbn1cclxuYWRkVHJhcHMob2xkVHJhcHMgPT4gKHtcclxuICAgIGdldDogKHRhcmdldCwgcHJvcCwgcmVjZWl2ZXIpID0+IGdldE1ldGhvZCh0YXJnZXQsIHByb3ApIHx8IG9sZFRyYXBzLmdldCh0YXJnZXQsIHByb3AsIHJlY2VpdmVyKSxcclxuICAgIGhhczogKHRhcmdldCwgcHJvcCkgPT4gISFnZXRNZXRob2QodGFyZ2V0LCBwcm9wKSB8fCBvbGRUcmFwcy5oYXModGFyZ2V0LCBwcm9wKSxcclxufSkpO1xuXG5leHBvcnQgeyBvcGVuREIsIGRlbGV0ZURCIH07XG4iXSwic291cmNlUm9vdCI6IiJ9