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
/******/ 	return __webpack_require__(__webpack_require__.s = "./client/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./client/js/dbhelper.js":
/*!*******************************!*\
  !*** ./client/js/dbhelper.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DBHelper; });
/* harmony import */ var idb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! idb */ "./node_modules/idb/build/esm/index.js");
/* harmony import */ var _sw_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../sw.js */ "./client/sw.js");


console.log('hi');
class DBHelper {
  static get DATABASE_URL() {
    const port = 1337; // Change this to your server port

    return process.env.DATABASE_URL || "https://mwsbackend.herokuapp.com/restaurants";
  }

  static get DATABASE_REVIEWS_URL() {
    const port = 1337; // Change this to your server port

    return "https://mwsbackend.herokuapp.com/reviews";
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
    let fetchURL = DBHelper.DATABASE_REVIEWS_URL + '/?restaurant_id=' + restaurant_id;
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
    const method = editing ? 'PUT' : 'POST';
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
          console.log('DB not available');
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

          if (!url || !method || method === 'POST' && !body) {
            cursor.delete().then(callback);
            console.log('deleted a bad cursor');
            return;
          }

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
    let url = "https://mwsbackend.herokuapp.com/restaurants/".concat(restaurant.id, "/?is_favorite=").concat(restaurant.is_favorite);
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
    const method = 'DELETE';
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
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./client/js/main.js":
/*!***************************!*\
  !*** ./client/js/main.js ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _registration__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./registration */ "./client/js/registration.js");
/* harmony import */ var _dbhelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dbhelper */ "./client/js/dbhelper.js");


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
  newMap = L.map('mapid', {
    center: [40.722216, -73.987501],
    zoom: 12,
    scrollWheelZoom: false
  });
  self.newMap = newMap;
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: 'mapbox/streets-v11',
    accessToken: "pk.eyJ1Ijoid2VudGluIiwiYSI6ImNqaXJ0N25iZjFwdjYza3A4MGt1aHU2bjEifQ.DnNFUoN5uzw01l_XK_c7nQ"
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

  if (restaurant.is_favorite === 'true' || restaurant.is_favorite === true) {
    favBtn.innerHTML = 'Favorited!';
    favBtn.style.background = 'hotpink';
  } else {
    favBtn.innerHTML = 'Add to favorite';
    favBtn.style.background = 'grey';
  }

  favBtn.setAttribute('title', "toggle favorites for: ".concat(restaurant.name));
  favBtn.setAttribute('id', "fav-btn-".concat(restaurant.id));
  favBtn.setAttribute('data-restaurant-id', restaurant.id);
  favBtn.addEventListener('click', () => {
    _dbhelper__WEBPACK_IMPORTED_MODULE_1__["default"].toggleFavBtn(restaurant.id);
  });
  li.append(favBtn);
  const more = document.createElement('button');
  more.classList = 'button button--success';
  more.innerHTML = 'View Details';
  more.setAttribute('aria-label', restaurant.name + restaurant.neighborhood + restaurant.address + 'View Details');

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
    marker.on('click', onClick);

    function onClick() {
      window.location.href = marker.options.url;
    }

    self.markers.push(marker);
  });
};

/***/ }),

/***/ "./client/js/registration.js":
/*!***********************************!*\
  !*** ./client/js/registration.js ***!
  \***********************************/
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

/***/ "./client/sw.js":
/*!**********************!*\
  !*** ./client/sw.js ***!
  \**********************/
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




/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2pzL2RiaGVscGVyLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9qcy9tYWluLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9qcy9yZWdpc3RyYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3N3LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2EtZnVuY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fYWRkLXRvLXVuc2NvcGFibGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2FkdmFuY2Utc3RyaW5nLWluZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2FuLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19hcnJheS1pbmNsdWRlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19jbGFzc29mLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2NvZi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19jb3JlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2N0eC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19kZWZpbmVkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2Rlc2NyaXB0b3JzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2RvbS1jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fZW51bS1idWcta2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19leHBvcnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fZmFpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fZml4LXJlLXdrcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19mbGFncy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19mdW5jdGlvbi10by1zdHJpbmcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fZ2xvYmFsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2hhcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19oaWRlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2h0bWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faWU4LWRvbS1kZWZpbmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pcy1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faXRlci1jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faXRlci1kZWZpbmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faXRlci1zdGVwLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2l0ZXJhdG9ycy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19saWJyYXJ5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWRwLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1kcHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWdwby5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19vYmplY3Qta2V5cy1pbnRlcm5hbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19vYmplY3Qta2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19wcm9wZXJ0eS1kZXNjLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3JlZGVmaW5lLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3JlZ2V4cC1leGVjLWFic3RyYWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3JlZ2V4cC1leGVjLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3NldC10by1zdHJpbmctdGFnLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3NoYXJlZC1rZXkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fc2hhcmVkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3N0cmluZy1hdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL190by1hYnNvbHV0ZS1pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL190by1pbnRlZ2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3RvLWlvYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fdG8tbGVuZ3RoLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3RvLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL190by1wcmltaXRpdmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fdWlkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3drcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5hcnJheS5pdGVyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5yZWdleHAuZXhlYy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5yZWdleHAubWF0Y2guanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pZGIvYnVpbGQvZXNtL2NodW5rLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pZGIvYnVpbGQvZXNtL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiXSwibmFtZXMiOlsiY29uc29sZSIsImxvZyIsIkRCSGVscGVyIiwiREFUQUJBU0VfVVJMIiwicG9ydCIsInByb2Nlc3MiLCJlbnYiLCJEQVRBQkFTRV9SRVZJRVdTX1VSTCIsImZldGNoUmVzdGF1cmFudHMiLCJjYWxsYmFjayIsImZldGNoIiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsInJlc3RhdXJhbnRzIiwiZmV0Y2hSZXZpZXdzIiwicmVzdGF1cmFudF9pZCIsImZldGNoVVJMIiwicmV2aWV3cyIsImNhdGNoIiwiZXJyb3IiLCJmZXRjaFJlc3RhdXJhbnRCeUlkIiwiaWQiLCJyZXN0YXVyYW50IiwiZmluZCIsInIiLCJmZXRjaFJlc3RhdXJhbnRCeUN1aXNpbmUiLCJjdWlzaW5lIiwicmVzdWx0cyIsImZpbHRlciIsImN1aXNpbmVfdHlwZSIsImZldGNoUmVzdGF1cmFudEJ5TmVpZ2hib3Job29kIiwibmVpZ2hib3Job29kIiwiZmV0Y2hSZXN0YXVyYW50QnlDdWlzaW5lQW5kTmVpZ2hib3Job29kIiwiZmV0Y2hOZWlnaGJvcmhvb2RzIiwibmVpZ2hib3Job29kcyIsIm1hcCIsInYiLCJpIiwidW5pcXVlTmVpZ2hib3Job29kcyIsImluZGV4T2YiLCJmZXRjaEN1aXNpbmVzIiwiY3Vpc2luZXMiLCJ1bmlxdWVDdWlzaW5lcyIsInVybEZvclJlc3RhdXJhbnQiLCJpbWFnZVVybEZvclJlc3RhdXJhbnQiLCJwaG90b2dyYXBoIiwibWFwTWFya2VyRm9yUmVzdGF1cmFudCIsIm1hcmtlciIsIkwiLCJsYXRsbmciLCJsYXQiLCJsbmciLCJ0aXRsZSIsIm5hbWUiLCJhbHQiLCJ1cmwiLCJhZGRUbyIsIm5ld01hcCIsInVwZGF0ZUNhY2hlZFJlc3RhdXJhbnRSZXZpZXciLCJmb3JtRGF0YSIsImRiUHJvbWlzZSIsImRiIiwidHgiLCJ0cmFuc2FjdGlvbiIsInN0b3JlIiwib2JqZWN0U3RvcmUiLCJwdXQiLCJkb25lIiwiZWRpdFJldmlldyIsImVkaXRpbmciLCJnZXQiLCJyZXZpZXciLCJuZXdSZXZpZXciLCJPYmplY3QiLCJhc3NpZ24iLCJjb21wbGV0ZSIsInN1Ym1pdFJldmlldyIsIm1ldGhvZCIsImFkZFBlbmRpbmdSZXF1ZXN0VG9RdWUiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImRhdGEiLCJuZXh0UGVuZGluZyIsImF0dGVtcHRDb21taXRQZW5kaW5nIiwiaiIsImJvZHkiLCJvYmplY3RTdG9yZU5hbWVzIiwibGVuZ3RoIiwiY2xvc2UiLCJvcGVuQ3Vyc29yIiwiY3Vyc29yIiwidmFsdWUiLCJkZWxldGUiLCJwcm9wZXJ0aWVzIiwiSlNPTiIsInN0cmluZ2lmeSIsIm9rIiwicmVkaXJlY3RlZCIsImRlbHR4Iiwic3luY1Jlc3RhdXJhbnQiLCJpc19mYXZvcml0ZSIsInVwZGF0ZVJlc3RhdXJhbnRJbkRCIiwibmV3X3Jlc3RhdXJhbnQiLCJ0b2dnbGVGYXZCdG4iLCJmYXZCdG4iLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiaW5uZXJIVE1MIiwic3R5bGUiLCJiYWNrZ3JvdW5kIiwiZGVsZXRlQ2FjaGVkUmV2aWV3IiwicmV2aWV3X2lkIiwiZGVsZXRlUmV2aWV3IiwiZGVsZXRlVGVtcFJldmlldyIsInRlbXBfaWQiLCJtYXJrZXJzIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50IiwiaW5pdE1hcCIsInVwZGF0ZVJlc3RhdXJhbnRzIiwic2VsZiIsImZpbGxOZWlnaGJvcmhvb2RzSFRNTCIsInNlbGVjdCIsImZvckVhY2giLCJvcHRpb24iLCJjcmVhdGVFbGVtZW50IiwiYXBwZW5kIiwiZmlsbEN1aXNpbmVzSFRNTCIsImNlbnRlciIsInpvb20iLCJzY3JvbGxXaGVlbFpvb20iLCJ0aWxlTGF5ZXIiLCJhdHRyaWJ1dGlvbiIsInRpbGVTaXplIiwibWF4Wm9vbSIsInpvb21PZmZzZXQiLCJhY2Nlc3NUb2tlbiIsIkFQSV9LRVkiLCJjU2VsZWN0IiwiblNlbGVjdCIsImNJbmRleCIsInNlbGVjdGVkSW5kZXgiLCJuSW5kZXgiLCJyZXNldFJlc3RhdXJhbnRzIiwiZmlsbFJlc3RhdXJhbnRzSFRNTCIsInVsIiwicmVtb3ZlIiwiY3JlYXRlUmVzdGF1cmFudEhUTUwiLCJhZGRNYXJrZXJzVG9NYXAiLCJsaSIsImltYWdlIiwiZGl2IiwiY2xhc3NOYW1lIiwic2V0QXR0cmlidXRlIiwic3JjIiwiYWRkcmVzcyIsIm1vcmUiLCJjbGFzc0xpc3QiLCJvbmNsaWNrIiwid2luZG93IiwibG9jYXRpb24iLCJvbiIsIm9uQ2xpY2siLCJocmVmIiwib3B0aW9ucyIsInB1c2giLCJuYXZpZ2F0b3IiLCJzZXJ2aWNlV29ya2VyIiwicmVnaXN0ZXIiLCJyZWdpc3RyYXRpb24iLCJyZWdpc3RyYXRpb25FcnJvciIsImNhY2hlVmVyc2lvbiIsIlNUQVRJQ19DQUNIRSIsIklNQUdFU19DQUNIRSIsImFsbENhY2hlcyIsIm9wZW5EQiIsInVwZ3JhZGUiLCJvbGRWZXJzaW9uIiwiY3JlYXRlT2JqZWN0U3RvcmUiLCJrZXlQYXRoIiwiY3JlYXRlSW5kZXgiLCJyZXZpZXdzU3RvcmUiLCJwZW5kaW5nU3RvcmUiLCJhdXRvSW5jcmVtZW50IiwiZ2V0UmVzdGF1cmFudHMiLCJyZXF1ZXN0IiwicmVzcCIsImlzSW1hZ2VVUkwiLCJpbWdUeXBlcyIsImlzSW1hZ2UiLCJ0eXBlIiwiZW5kc1dpdGgiLCJ3YWl0VW50aWwiLCJjYWNoZXMiLCJvcGVuIiwiY2FjaGUiLCJhZGRBbGwiLCJrZXlzIiwiY2FjaGVOYW1lcyIsImFsbCIsImNhY2hlTmFtZSIsInN0YXJ0c1dpdGgiLCJjaGVja1VybCIsIlVSTCIsInNlYXJjaFBhcmFtcyIsImhhbmRsZUFKQVhFdmVudCIsImhhbmRsZU5vbkFKQVhFdmVudCIsInJlc3BvbmRXaXRoIiwiaGFuZGxlUmVzdGF1cmFudEV2ZW50cyIsImhhbmRsZVJldmlld3NFdmVudHMiLCJnZXRBbGwiLCJmaW5hbFJlc3BvbnNlIiwiUmVzcG9uc2UiLCJzdGF0dXMiLCJpbmRleCIsImZldGNo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QUFDQTtBQUNBLFdBQVcsbURBQUk7QUFDZjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1EQUFRO0FBQ1I7QUFDQTtBQUNBLENBQUM7O0FBRTJCOzs7Ozs7Ozs7Ozs7QUM1RTVCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQ0FBcUM7O0FBRXJDO0FBQ0E7QUFDQTs7QUFFQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLFVBQVUiLCJmaWxlIjoiYXBwLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vY2xpZW50L2pzL21haW4uanNcIik7XG4iLCJpbXBvcnQgeyBvcGVuREIsIGRlbGV0ZURCLCB3cmFwLCB1bndyYXAgfSBmcm9tICdpZGInO1xuaW1wb3J0IHsgZGJQcm9taXNlIH0gZnJvbSAnLi4vc3cuanMnO1xuY29uc29sZS5sb2coJ2hpJyk7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEQkhlbHBlciB7XG4gIHN0YXRpYyBnZXQgREFUQUJBU0VfVVJMKCkge1xuICAgIGNvbnN0IHBvcnQgPSAxMzM3OyAvLyBDaGFuZ2UgdGhpcyB0byB5b3VyIHNlcnZlciBwb3J0XG4gICAgcmV0dXJuIChcbiAgICAgIHByb2Nlc3MuZW52LkRBVEFCQVNFX1VSTCB8fCBgaHR0cHM6Ly9td3NiYWNrZW5kLmhlcm9rdWFwcC5jb20vcmVzdGF1cmFudHNgXG4gICAgKTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgREFUQUJBU0VfUkVWSUVXU19VUkwoKSB7XG4gICAgY29uc3QgcG9ydCA9IDEzMzc7IC8vIENoYW5nZSB0aGlzIHRvIHlvdXIgc2VydmVyIHBvcnRcbiAgICByZXR1cm4gYGh0dHBzOi8vbXdzYmFja2VuZC5oZXJva3VhcHAuY29tL3Jldmlld3NgO1xuICB9XG5cbiAgLyoqXG4gICAqIEZldGNoIGFsbCByZXN0YXVyYW50cy5cbiAgICovXG5cbiAgc3RhdGljIGZldGNoUmVzdGF1cmFudHMoY2FsbGJhY2spIHtcbiAgICBmZXRjaChEQkhlbHBlci5EQVRBQkFTRV9VUkwpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICByZXNwb25zZS5qc29uKCkudGhlbihmdW5jdGlvbiAocmVzdGF1cmFudHMpIHtcbiAgICAgICAgY2FsbGJhY2sobnVsbCwgcmVzdGF1cmFudHMpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgZmV0Y2hSZXZpZXdzKHJlc3RhdXJhbnRfaWQsIGNhbGxiYWNrKSB7XG4gICAgbGV0IGZldGNoVVJMID1cbiAgICAgIERCSGVscGVyLkRBVEFCQVNFX1JFVklFV1NfVVJMICsgJy8/cmVzdGF1cmFudF9pZD0nICsgcmVzdGF1cmFudF9pZDtcbiAgICBmZXRjaChmZXRjaFVSTClcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgICAgfSlcbiAgICAgIC50aGVuKChyZXZpZXdzKSA9PiB7XG4gICAgICAgIGNhbGxiYWNrKG51bGwsIHJldmlld3MpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgY2FsbGJhY2soZXJyb3IsIG51bGwpO1xuICAgICAgfSk7XG4gIH1cblxuICBzdGF0aWMgZmV0Y2hSZXN0YXVyYW50QnlJZChpZCwgY2FsbGJhY2spIHtcbiAgICAvLyBmZXRjaCBhbGwgcmVzdGF1cmFudHMgd2l0aCBwcm9wZXIgZXJyb3IgaGFuZGxpbmcuXG4gICAgREJIZWxwZXIuZmV0Y2hSZXN0YXVyYW50cygoZXJyb3IsIHJlc3RhdXJhbnRzKSA9PiB7XG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgY2FsbGJhY2soZXJyb3IsIG51bGwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgcmVzdGF1cmFudCA9IHJlc3RhdXJhbnRzLmZpbmQoKHIpID0+IHIuaWQgPT0gaWQpO1xuICAgICAgICBpZiAocmVzdGF1cmFudCkge1xuICAgICAgICAgIC8vIEdvdCB0aGUgcmVzdGF1cmFudFxuICAgICAgICAgIGNhbGxiYWNrKG51bGwsIHJlc3RhdXJhbnQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIFJlc3RhdXJhbnQgZG9lcyBub3QgZXhpc3QgaW4gdGhlIGRhdGFiYXNlXG4gICAgICAgICAgY2FsbGJhY2soJ1Jlc3RhdXJhbnQgZG9lcyBub3QgZXhpc3QnLCBudWxsKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEZldGNoIHJlc3RhdXJhbnRzIGJ5IGEgY3Vpc2luZSB0eXBlIHdpdGggcHJvcGVyIGVycm9yIGhhbmRsaW5nLlxuICAgKi9cbiAgc3RhdGljIGZldGNoUmVzdGF1cmFudEJ5Q3Vpc2luZShjdWlzaW5lLCBjYWxsYmFjaykge1xuICAgIC8vIEZldGNoIGFsbCByZXN0YXVyYW50cyAgd2l0aCBwcm9wZXIgZXJyb3IgaGFuZGxpbmdcbiAgICBEQkhlbHBlci5mZXRjaFJlc3RhdXJhbnRzKChlcnJvciwgcmVzdGF1cmFudHMpID0+IHtcbiAgICAgIGlmIChlcnJvcikge1xuICAgICAgICBjYWxsYmFjayhlcnJvciwgbnVsbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBGaWx0ZXIgcmVzdGF1cmFudHMgdG8gaGF2ZSBvbmx5IGdpdmVuIGN1aXNpbmUgdHlwZVxuICAgICAgICBjb25zdCByZXN1bHRzID0gcmVzdGF1cmFudHMuZmlsdGVyKChyKSA9PiByLmN1aXNpbmVfdHlwZSA9PSBjdWlzaW5lKTtcbiAgICAgICAgY2FsbGJhY2sobnVsbCwgcmVzdWx0cyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogRmV0Y2ggcmVzdGF1cmFudHMgYnkgYSBuZWlnaGJvcmhvb2Qgd2l0aCBwcm9wZXIgZXJyb3IgaGFuZGxpbmcuXG4gICAqL1xuICBzdGF0aWMgZmV0Y2hSZXN0YXVyYW50QnlOZWlnaGJvcmhvb2QobmVpZ2hib3Job29kLCBjYWxsYmFjaykge1xuICAgIC8vIEZldGNoIGFsbCByZXN0YXVyYW50c1xuICAgIERCSGVscGVyLmZldGNoUmVzdGF1cmFudHMoKGVycm9yLCByZXN0YXVyYW50cykgPT4ge1xuICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgIGNhbGxiYWNrKGVycm9yLCBudWxsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEZpbHRlciByZXN0YXVyYW50cyB0byBoYXZlIG9ubHkgZ2l2ZW4gbmVpZ2hib3Job29kXG4gICAgICAgIGNvbnN0IHJlc3VsdHMgPSByZXN0YXVyYW50cy5maWx0ZXIoXG4gICAgICAgICAgKHIpID0+IHIubmVpZ2hib3Job29kID09IG5laWdoYm9yaG9vZFxuICAgICAgICApO1xuICAgICAgICBjYWxsYmFjayhudWxsLCByZXN1bHRzKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGZXRjaCByZXN0YXVyYW50cyBieSBhIGN1aXNpbmUgYW5kIGEgbmVpZ2hib3Job29kIHdpdGggcHJvcGVyIGVycm9yIGhhbmRsaW5nLlxuICAgKi9cbiAgc3RhdGljIGZldGNoUmVzdGF1cmFudEJ5Q3Vpc2luZUFuZE5laWdoYm9yaG9vZChcbiAgICBjdWlzaW5lLFxuICAgIG5laWdoYm9yaG9vZCxcbiAgICBjYWxsYmFja1xuICApIHtcbiAgICAvLyBGZXRjaCBhbGwgcmVzdGF1cmFudHNcbiAgICBEQkhlbHBlci5mZXRjaFJlc3RhdXJhbnRzKChlcnJvciwgcmVzdGF1cmFudHMpID0+IHtcbiAgICAgIGlmIChlcnJvcikge1xuICAgICAgICBjYWxsYmFjayhlcnJvciwgbnVsbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgcmVzdWx0cyA9IHJlc3RhdXJhbnRzO1xuICAgICAgICBpZiAoY3Vpc2luZSAhPSAnYWxsJykge1xuICAgICAgICAgIC8vIGZpbHRlciBieSBjdWlzaW5lXG4gICAgICAgICAgcmVzdWx0cyA9IHJlc3VsdHMuZmlsdGVyKChyKSA9PiByLmN1aXNpbmVfdHlwZSA9PSBjdWlzaW5lKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmVpZ2hib3Job29kICE9ICdhbGwnKSB7XG4gICAgICAgICAgLy8gZmlsdGVyIGJ5IG5laWdoYm9yaG9vZFxuICAgICAgICAgIHJlc3VsdHMgPSByZXN1bHRzLmZpbHRlcigocikgPT4gci5uZWlnaGJvcmhvb2QgPT0gbmVpZ2hib3Job29kKTtcbiAgICAgICAgfVxuICAgICAgICBjYWxsYmFjayhudWxsLCByZXN1bHRzKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGZXRjaCBhbGwgbmVpZ2hib3Job29kcyB3aXRoIHByb3BlciBlcnJvciBoYW5kbGluZy5cbiAgICovXG4gIHN0YXRpYyBmZXRjaE5laWdoYm9yaG9vZHMoY2FsbGJhY2spIHtcbiAgICAvLyBGZXRjaCBhbGwgcmVzdGF1cmFudHNcbiAgICBEQkhlbHBlci5mZXRjaFJlc3RhdXJhbnRzKChlcnJvciwgcmVzdGF1cmFudHMpID0+IHtcbiAgICAgIGlmIChlcnJvcikge1xuICAgICAgICBjYWxsYmFjayhlcnJvciwgbnVsbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBHZXQgYWxsIG5laWdoYm9yaG9vZHMgZnJvbSBhbGwgcmVzdGF1cmFudHNcbiAgICAgICAgY29uc3QgbmVpZ2hib3Job29kcyA9IHJlc3RhdXJhbnRzLm1hcChcbiAgICAgICAgICAodiwgaSkgPT4gcmVzdGF1cmFudHNbaV0ubmVpZ2hib3Job29kXG4gICAgICAgICk7XG4gICAgICAgIC8vIFJlbW92ZSBkdXBsaWNhdGVzIGZyb20gbmVpZ2hib3Job29kc1xuICAgICAgICBjb25zdCB1bmlxdWVOZWlnaGJvcmhvb2RzID0gbmVpZ2hib3Job29kcy5maWx0ZXIoXG4gICAgICAgICAgKHYsIGkpID0+IG5laWdoYm9yaG9vZHMuaW5kZXhPZih2KSA9PSBpXG4gICAgICAgICk7XG4gICAgICAgIGNhbGxiYWNrKG51bGwsIHVuaXF1ZU5laWdoYm9yaG9vZHMpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEZldGNoIGFsbCBjdWlzaW5lcyB3aXRoIHByb3BlciBlcnJvciBoYW5kbGluZy5cbiAgICovXG4gIHN0YXRpYyBmZXRjaEN1aXNpbmVzKGNhbGxiYWNrKSB7XG4gICAgLy8gRmV0Y2ggYWxsIHJlc3RhdXJhbnRzXG4gICAgREJIZWxwZXIuZmV0Y2hSZXN0YXVyYW50cygoZXJyb3IsIHJlc3RhdXJhbnRzKSA9PiB7XG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgY2FsbGJhY2soZXJyb3IsIG51bGwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gR2V0IGFsbCBjdWlzaW5lcyBmcm9tIGFsbCByZXN0YXVyYW50c1xuICAgICAgICBjb25zdCBjdWlzaW5lcyA9IHJlc3RhdXJhbnRzLm1hcCgodiwgaSkgPT4gcmVzdGF1cmFudHNbaV0uY3Vpc2luZV90eXBlKTtcbiAgICAgICAgLy8gUmVtb3ZlIGR1cGxpY2F0ZXMgZnJvbSBjdWlzaW5lc1xuICAgICAgICBjb25zdCB1bmlxdWVDdWlzaW5lcyA9IGN1aXNpbmVzLmZpbHRlcihcbiAgICAgICAgICAodiwgaSkgPT4gY3Vpc2luZXMuaW5kZXhPZih2KSA9PSBpXG4gICAgICAgICk7XG4gICAgICAgIGNhbGxiYWNrKG51bGwsIHVuaXF1ZUN1aXNpbmVzKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXN0YXVyYW50IHBhZ2UgVVJMLlxuICAgKi9cbiAgc3RhdGljIHVybEZvclJlc3RhdXJhbnQocmVzdGF1cmFudCkge1xuICAgIHJldHVybiBgL3Jlc3RhdXJhbnQuaHRtbD9pZD0ke3Jlc3RhdXJhbnQuaWR9YDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXN0YXVyYW50IGltYWdlIFVSTC5cbiAgICovXG4gIHN0YXRpYyBpbWFnZVVybEZvclJlc3RhdXJhbnQocmVzdGF1cmFudCkge1xuICAgIGlmICghcmVzdGF1cmFudC5waG90b2dyYXBoKSB7XG4gICAgICByZXR1cm4gYC9pbWcvJHtyZXN0YXVyYW50LmlkfS5qcGdgO1xuICAgIH1cbiAgICByZXR1cm4gYC9pbWcvJHtyZXN0YXVyYW50LnBob3RvZ3JhcGh9LmpwZ2A7XG4gIH1cblxuICAvKipcbiAgICogTWFwIG1hcmtlciBmb3IgYSByZXN0YXVyYW50LlxuICAgKi9cbiAgc3RhdGljIG1hcE1hcmtlckZvclJlc3RhdXJhbnQocmVzdGF1cmFudCwgbWFwKSB7XG4gICAgLy8gaHR0cHM6Ly9sZWFmbGV0anMuY29tL3JlZmVyZW5jZS0xLjMuMC5odG1sI21hcmtlclxuICAgIGNvbnN0IG1hcmtlciA9IG5ldyBMLm1hcmtlcihcbiAgICAgIFtyZXN0YXVyYW50LmxhdGxuZy5sYXQsIHJlc3RhdXJhbnQubGF0bG5nLmxuZ10sXG4gICAgICB7XG4gICAgICAgIHRpdGxlOiByZXN0YXVyYW50Lm5hbWUsXG4gICAgICAgIGFsdDogcmVzdGF1cmFudC5uYW1lLFxuICAgICAgICB1cmw6IERCSGVscGVyLnVybEZvclJlc3RhdXJhbnQocmVzdGF1cmFudCksXG4gICAgICB9XG4gICAgKTtcbiAgICBtYXJrZXIuYWRkVG8obmV3TWFwKTtcbiAgICByZXR1cm4gbWFya2VyO1xuICB9XG5cbiAgc3RhdGljIHVwZGF0ZUNhY2hlZFJlc3RhdXJhbnRSZXZpZXcoZm9ybURhdGEpIHtcbiAgICBjb25zb2xlLmxvZygndXBkYXRpbmcgY2FjaGUgZm9yIG5ldyByZXZpZXcnLCBmb3JtRGF0YSk7XG4gICAgcmV0dXJuIGRiUHJvbWlzZS50aGVuKChkYikgPT4ge1xuICAgICAgY29uc3QgdHggPSBkYi50cmFuc2FjdGlvbigncmV2aWV3cycsICdyZWFkd3JpdGUnKTtcbiAgICAgIGNvbnN0IHN0b3JlID0gdHgub2JqZWN0U3RvcmUoJ3Jldmlld3MnKTtcbiAgICAgIHN0b3JlLnB1dChmb3JtRGF0YSk7XG4gICAgICBjb25zb2xlLmxvZygnc3VjY2Vzc2Z1bGx5IHB1dCByZXZpZXcgaW4gc3RvcmUnKTtcbiAgICAgIHJldHVybiB0eC5kb25lO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdyYWIgdGhlIG9yaWdpbmFsIHJldmlldyBmcm9tIHRoZSBkYiBhbmQgcmVwbGFjZSB3aXRoIGVkaXRlZCByZXZpZXdcbiAgICovXG4gIHN0YXRpYyBlZGl0UmV2aWV3KGZvcm1EYXRhLCBlZGl0aW5nKSB7XG4gICAgcmV0dXJuIGRiUHJvbWlzZVxuICAgICAgLnRoZW4oKGRiKSA9PiB7XG4gICAgICAgIGxldCB0eCA9IGRiLnRyYW5zYWN0aW9uKCdyZXZpZXdzJyk7XG4gICAgICAgIGxldCBzdG9yZSA9IHR4Lm9iamVjdFN0b3JlKCdyZXZpZXdzJyk7XG4gICAgICAgIHJldHVybiBzdG9yZS5nZXQoZWRpdGluZy5pZCk7XG4gICAgICB9KVxuICAgICAgLnRoZW4oKHJldmlldykgPT4ge1xuICAgICAgICByZXR1cm4gZGJQcm9taXNlLnRoZW4oKGRiKSA9PiB7XG4gICAgICAgICAgbGV0IHR4ID0gZGIudHJhbnNhY3Rpb24oJ3Jldmlld3MnLCAncmVhZHdyaXRlJyk7XG4gICAgICAgICAgbGV0IHN0b3JlID0gdHgub2JqZWN0U3RvcmUoJ3Jldmlld3MnKTtcbiAgICAgICAgICBsZXQgbmV3UmV2aWV3ID0gT2JqZWN0LmFzc2lnbih7fSwgcmV2aWV3LCBmb3JtRGF0YSk7XG4gICAgICAgICAgc3RvcmUucHV0KG5ld1Jldmlldyk7XG4gICAgICAgICAgcmV0dXJuIHR4LmNvbXBsZXRlO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIHN1Ym1pdFJldmlldyhmb3JtRGF0YSwgZWRpdGluZykge1xuICAgIGNvbnNvbGUubG9nKGVkaXRpbmcpO1xuICAgIGNvbnN0IG1ldGhvZCA9IGVkaXRpbmcgPyAnUFVUJyA6ICdQT1NUJztcbiAgICBjb25zdCB1cmwgPSBlZGl0aW5nXG4gICAgICA/IGAke0RCSGVscGVyLkRBVEFCQVNFX1JFVklFV1NfVVJMfS8ke2VkaXRpbmcuaWR9YFxuICAgICAgOiBEQkhlbHBlci5EQVRBQkFTRV9SRVZJRVdTX1VSTDtcbiAgICBpZiAoZWRpdGluZykge1xuICAgICAgREJIZWxwZXIuZWRpdFJldmlldyhmb3JtRGF0YSwgZWRpdGluZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIERCSGVscGVyLnVwZGF0ZUNhY2hlZFJlc3RhdXJhbnRSZXZpZXcoZm9ybURhdGEpO1xuICAgIH1cbiAgICByZXR1cm4gREJIZWxwZXIuYWRkUGVuZGluZ1JlcXVlc3RUb1F1ZSh1cmwsIG1ldGhvZCwgZm9ybURhdGEpO1xuICB9XG5cbiAgc3RhdGljIGFkZFBlbmRpbmdSZXF1ZXN0VG9RdWUodXJsLCBtZXRob2QsIGZvcm1EYXRhKSB7XG4gICAgLy9vcGVuIGRhdGFiYXNlIGFuZCBhZGQgcmVxdWVzdCBkZXRhaWxzIHRvIHRoZSBwZW5kaW5nIHN0b3JlXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGRiUHJvbWlzZVxuICAgICAgICAudGhlbigoZGIpID0+IHtcbiAgICAgICAgICBjb25zdCB0eCA9IGRiLnRyYW5zYWN0aW9uKCdwZW5kaW5nJywgJ3JlYWR3cml0ZScpO1xuICAgICAgICAgIGNvbnN0IHN0b3JlID0gdHgub2JqZWN0U3RvcmUoJ3BlbmRpbmcnKTtcbiAgICAgICAgICByZXR1cm4gc3RvcmUucHV0KHtcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgdXJsLFxuICAgICAgICAgICAgICBtZXRob2QsXG4gICAgICAgICAgICAgIGZvcm1EYXRhLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGBFcnJvciBwdXR0aW5nIGRhdGEgaW4gcGVuZGluZyBkYjogJHtlcnJvcn1gKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oXG4gICAgICAgICAgREJIZWxwZXIubmV4dFBlbmRpbmcoKGVycm9yLCBqc29uKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKGpzb24pO1xuICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgbmV4dFBlbmRpbmcoY2FsbGJhY2spIHtcbiAgICBEQkhlbHBlci5hdHRlbXB0Q29tbWl0UGVuZGluZyhEQkhlbHBlci5uZXh0UGVuZGluZylcbiAgICAgIC50aGVuKChqKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGopO1xuICAgICAgICBjYWxsYmFjayhudWxsLCBqKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgY2FsbGJhY2soZXJyb3IpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyBhdHRlbXB0Q29tbWl0UGVuZGluZyhjYWxsYmFjaykge1xuICAgIC8vIEl0ZXJhdGUgb3ZlciB0aGUgcGVuZGluZyBpdGVtcyB1bnRpbCB0aGVyZSBpcyBhIG5ldHdvcmsgZmFpbHVyZVxuICAgIGxldCB1cmw7XG4gICAgbGV0IG1ldGhvZDtcbiAgICBsZXQgYm9keTtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBkYlByb21pc2UudGhlbigoZGIpID0+IHtcbiAgICAgICAgaWYgKCFkYi5vYmplY3RTdG9yZU5hbWVzLmxlbmd0aCkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdEQiBub3QgYXZhaWxhYmxlJyk7XG4gICAgICAgICAgZGIuY2xvc2UoKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdHggPSBkYi50cmFuc2FjdGlvbigncGVuZGluZycsICdyZWFkd3JpdGUnKTtcbiAgICAgICAgY29uc3Qgc3RvcmUgPSB0eC5vYmplY3RTdG9yZSgncGVuZGluZycpO1xuICAgICAgICBzdG9yZS5vcGVuQ3Vyc29yKCkudGhlbigoY3Vyc29yKSA9PiB7XG4gICAgICAgICAgaWYgKCFjdXJzb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdubyBtb3JlIGN1cnNvcnMnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgdmFsdWUgPSBjdXJzb3IudmFsdWU7XG4gICAgICAgICAgdXJsID0gdmFsdWUuZGF0YS51cmw7XG4gICAgICAgICAgbWV0aG9kID0gdmFsdWUuZGF0YS5tZXRob2Q7XG4gICAgICAgICAgYm9keSA9IHZhbHVlLmRhdGEuZm9ybURhdGE7XG5cbiAgICAgICAgICAvLyBJZiB3ZSBkb24ndCBoYXZlIGEgcGFyYW1ldGVyIHRoZW4gd2UncmUgb24gYSBiYWQgcmVjb3JkIHRoYXQgc2hvdWxkIGJlIHRvc3NlZFxuICAgICAgICAgIC8vIGFuZCB0aGVuIG1vdmUgb25cbiAgICAgICAgICBpZiAoIXVybCB8fCAhbWV0aG9kIHx8IChtZXRob2QgPT09ICdQT1NUJyAmJiAhYm9keSkpIHtcbiAgICAgICAgICAgIGN1cnNvci5kZWxldGUoKS50aGVuKGNhbGxiYWNrKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdkZWxldGVkIGEgYmFkIGN1cnNvcicpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IHByb3BlcnRpZXMgPSB7XG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShib2R5KSxcbiAgICAgICAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgICAgIH07XG5cbiAgICAgICAgICBmZXRjaCh1cmwsIHByb3BlcnRpZXMpXG4gICAgICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuXG4gICAgICAgICAgICAgIGlmICghcmVzcG9uc2Uub2sgJiYgIXJlc3BvbnNlLnJlZGlyZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygndGhpcyBpcyB0aGUgcmVzcG9uc2UgYW5kIHdlIGFyZSBvZmZsaW5lJyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpLnRoZW4oKGpzb24pID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBkZWx0eCA9IGRiLnRyYW5zYWN0aW9uKCdwZW5kaW5nJywgJ3JlYWR3cml0ZScpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHN0b3JlID0gZGVsdHgub2JqZWN0U3RvcmUoJ3BlbmRpbmcnKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RvcmUub3BlbkN1cnNvcigpLnRoZW4oKGN1cnNvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIGN1cnNvci5kZWxldGUoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coY3Vyc29yLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2RlbGV0ZWQgaXRlbSBmcm9tIHBlbmRpbmcgc3RvcmUnKTtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coanNvbik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKGpzb24pO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KCdubyBuZXR3b3JrJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyBzeW5jUmVzdGF1cmFudChyZXN0YXVyYW50KSB7XG4gICAgbGV0IHVybCA9IGBodHRwczovL213c2JhY2tlbmQuaGVyb2t1YXBwLmNvbS9yZXN0YXVyYW50cy8ke3Jlc3RhdXJhbnQuaWR9Lz9pc19mYXZvcml0ZT0ke3Jlc3RhdXJhbnQuaXNfZmF2b3JpdGV9YDtcbiAgICBsZXQgbWV0aG9kID0gJ1BVVCc7XG4gICAgREJIZWxwZXIuYWRkUGVuZGluZ1JlcXVlc3RUb1F1ZSh1cmwsIG1ldGhvZCkuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgJ2Vycm9yIHVwZGF0aW5nIHJlc3RhdXJhbnQgYmFja2VuZCBkYXRhLi4uJyxcbiAgICAgICAgZXJyb3IsXG4gICAgICAgIHJlc3RhdXJhbnRcbiAgICAgICk7XG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgdXBkYXRlUmVzdGF1cmFudEluREIobmV3X3Jlc3RhdXJhbnQpIHtcbiAgICByZXR1cm4gZGJQcm9taXNlXG4gICAgICAudGhlbihmdW5jdGlvbiAoZGIpIHtcbiAgICAgICAgbGV0IHR4ID0gZGIudHJhbnNhY3Rpb24oJ3Jlc3RhdXJhbnRzJywgJ3JlYWR3cml0ZScpO1xuICAgICAgICBsZXQgc3RvcmUgPSB0eC5vYmplY3RTdG9yZSgncmVzdGF1cmFudHMnKTtcbiAgICAgICAgc3RvcmUucHV0KG5ld19yZXN0YXVyYW50KTtcbiAgICAgICAgcmV0dXJuIHR4LmNvbXBsZXRlO1xuICAgICAgfSlcbiAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShuZXdfcmVzdGF1cmFudCk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyB0b2dnbGVGYXZCdG4ocmVzdGF1cmFudF9pZCkge1xuICAgIHJldHVybiBkYlByb21pc2VcbiAgICAgIC50aGVuKChkYikgPT4ge1xuICAgICAgICBsZXQgdHggPSBkYi50cmFuc2FjdGlvbigncmVzdGF1cmFudHMnKTtcbiAgICAgICAgbGV0IHN0b3JlID0gdHgub2JqZWN0U3RvcmUoJ3Jlc3RhdXJhbnRzJyk7XG4gICAgICAgIHJldHVybiBzdG9yZS5nZXQocmVzdGF1cmFudF9pZCk7XG4gICAgICB9KVxuICAgICAgLnRoZW4oKHJlc3RhdXJhbnQpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzdGF1cmFudCk7XG4gICAgICAgIGNvbnN0IG5ld19yZXN0YXVyYW50ID0gT2JqZWN0LmFzc2lnbih7fSwgcmVzdGF1cmFudCk7XG4gICAgICAgIG5ld19yZXN0YXVyYW50LmlzX2Zhdm9yaXRlID1cbiAgICAgICAgICByZXN0YXVyYW50LmlzX2Zhdm9yaXRlID09PSAndHJ1ZScgfHwgcmVzdGF1cmFudC5pc19mYXZvcml0ZSA9PT0gdHJ1ZVxuICAgICAgICAgICAgPyAnZmFsc2UnXG4gICAgICAgICAgICA6ICd0cnVlJztcbiAgICAgICAgREJIZWxwZXIuc3luY1Jlc3RhdXJhbnQobmV3X3Jlc3RhdXJhbnQpO1xuICAgICAgICByZXR1cm4gREJIZWxwZXIudXBkYXRlUmVzdGF1cmFudEluREIobmV3X3Jlc3RhdXJhbnQpO1xuICAgICAgfSlcbiAgICAgIC50aGVuKChuZXdfcmVzdGF1cmFudCkgPT4ge1xuICAgICAgICBjb25zdCBmYXZCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgZmF2LWJ0bi0ke25ld19yZXN0YXVyYW50LmlkfWApO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgbmV3X3Jlc3RhdXJhbnQuaXNfZmF2b3JpdGUgPT09ICd0cnVlJyB8fFxuICAgICAgICAgIG5ld19yZXN0YXVyYW50LmlzX2Zhdm9yaXRlID09PSB0cnVlXG4gICAgICAgICkge1xuICAgICAgICAgIGZhdkJ0bi5pbm5lckhUTUwgPSAnRmF2b3JpdGVkISc7XG4gICAgICAgICAgZmF2QnRuLnN0eWxlLmJhY2tncm91bmQgPSAnaG90cGluayc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZmF2QnRuLmlubmVySFRNTCA9ICdBZGQgdG8gZmF2b3JpdGUnO1xuICAgICAgICAgIGZhdkJ0bi5zdHlsZS5iYWNrZ3JvdW5kID0gJ2dyZXknO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyBkZWxldGVDYWNoZWRSZXZpZXcocmV2aWV3X2lkKSB7XG4gICAgcmV0dXJuIGRiUHJvbWlzZVxuICAgICAgLnRoZW4oKGRiKSA9PiB7XG4gICAgICAgIGxldCB0eCA9IGRiLnRyYW5zYWN0aW9uKCdyZXZpZXdzJywgJ3JlYWR3cml0ZScpO1xuICAgICAgICBsZXQgc3RvcmUgPSB0eC5vYmplY3RTdG9yZSgncmV2aWV3cycpO1xuICAgICAgICBzdG9yZS5kZWxldGUocmV2aWV3X2lkKTtcbiAgICAgICAgY29uc29sZS5sb2coJ2RlbGV0ZWQgcmV2aWV3IGZyb20gaWRiJyk7XG4gICAgICAgIHJldHVybiB0eC5jb21wbGV0ZTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdlcnJvciBkZWxldGluZyByZXZpZXc6ICcsIGVycm9yKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIGRlbGV0ZVJldmlldyhyZXZpZXdfaWQpIHtcbiAgICBjb25zdCB1cmwgPSBgJHtEQkhlbHBlci5EQVRBQkFTRV9SRVZJRVdTX1VSTH0vJHtyZXZpZXdfaWR9YDtcbiAgICBjb25zb2xlLmxvZyh1cmwpO1xuICAgIGNvbnN0IG1ldGhvZCA9ICdERUxFVEUnO1xuICAgIERCSGVscGVyLmRlbGV0ZUNhY2hlZFJldmlldyhyZXZpZXdfaWQpO1xuICAgIHJldHVybiBEQkhlbHBlci5hZGRQZW5kaW5nUmVxdWVzdFRvUXVlKHVybCwgbWV0aG9kKTtcbiAgfVxuXG4gIHN0YXRpYyBkZWxldGVUZW1wUmV2aWV3KHRlbXBfaWQpIHtcbiAgICBkYlByb21pc2VcbiAgICAgIC50aGVuKChkYikgPT4ge1xuICAgICAgICBsZXQgdHggPSBkYi50cmFuc2FjdGlvbigncmV2aWV3cycsICdyZWFkd3JpdGUnKTtcbiAgICAgICAgbGV0IHN0b3JlID0gdHgub2JqZWN0U3RvcmUoJ3Jldmlld3MnKTtcbiAgICAgICAgc3RvcmUuZGVsZXRlKHRlbXBfaWQpO1xuICAgICAgICBjb25zb2xlLmxvZygnZGVsZXRlZCBvbGR2ZXJzaW9uIG9mIHJldmlldyB3aXRoIG9sZCBpZCcpO1xuICAgICAgICByZXR1cm4gdHguY29tcGxldGU7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnZXJyb3IgZGVsZXRpbmcgdGVtcCByZXZpZXc6ICcsIGVycm9yKTtcbiAgICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgcmVnaXN0cmF0aW9uIGZyb20gJy4vcmVnaXN0cmF0aW9uJztcbmltcG9ydCBEQkhlbHBlciBmcm9tICcuL2RiaGVscGVyJztcbmxldCByZXN0YXVyYW50cywgbmVpZ2hib3Job29kcywgY3Vpc2luZXM7XG52YXIgbmV3TWFwO1xudmFyIG1hcmtlcnMgPSBbXTtcblxuLyoqXG4gKiBGZXRjaCBuZWlnaGJvcmhvb2RzIGFuZCBjdWlzaW5lcyBhcyBzb29uIGFzIHRoZSBwYWdlIGlzIGxvYWRlZC5cbiAqL1xuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIChldmVudCkgPT4ge1xuICBpbml0TWFwKCk7XG4gIHVwZGF0ZVJlc3RhdXJhbnRzKCk7XG4gIGZldGNoTmVpZ2hib3Job29kcygpO1xuICBmZXRjaEN1aXNpbmVzKCk7XG4gIERCSGVscGVyLm5leHRQZW5kaW5nKCk7XG59KTtcblxuLyoqXG4gKiBGZXRjaCBhbGwgbmVpZ2hib3Job29kcyBhbmQgc2V0IHRoZWlyIEhUTUwuXG4gKi9cbmNvbnN0IGZldGNoTmVpZ2hib3Job29kcyA9ICgpID0+IHtcbiAgREJIZWxwZXIuZmV0Y2hOZWlnaGJvcmhvb2RzKChlcnJvciwgbmVpZ2hib3Job29kcykgPT4ge1xuICAgIGlmIChlcnJvcikge1xuICAgICAgLy8gR290IGFuIGVycm9yXG4gICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2VsZi5uZWlnaGJvcmhvb2RzID0gbmVpZ2hib3Job29kcztcbiAgICAgIGZpbGxOZWlnaGJvcmhvb2RzSFRNTCgpO1xuICAgIH1cbiAgfSk7XG59O1xuXG4vKipcbiAqIFNldCBuZWlnaGJvcmhvb2RzIEhUTUwuXG4gKi9cbmNvbnN0IGZpbGxOZWlnaGJvcmhvb2RzSFRNTCA9IChuZWlnaGJvcmhvb2RzID0gc2VsZi5uZWlnaGJvcmhvb2RzKSA9PiB7XG4gIGNvbnN0IHNlbGVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZWlnaGJvcmhvb2RzLXNlbGVjdCcpO1xuICBzZWxlY3QuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdXBkYXRlUmVzdGF1cmFudHMpO1xuICBuZWlnaGJvcmhvb2RzLmZvckVhY2goKG5laWdoYm9yaG9vZCkgPT4ge1xuICAgIGNvbnN0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xuICAgIG9wdGlvbi5pbm5lckhUTUwgPSBuZWlnaGJvcmhvb2Q7XG4gICAgb3B0aW9uLnZhbHVlID0gbmVpZ2hib3Job29kO1xuICAgIHNlbGVjdC5hcHBlbmQob3B0aW9uKTtcbiAgfSk7XG59O1xuXG4vKipcbiAqIEZldGNoIGFsbCBjdWlzaW5lcyBhbmQgc2V0IHRoZWlyIEhUTUwuXG4gKi9cbmNvbnN0IGZldGNoQ3Vpc2luZXMgPSAoKSA9PiB7XG4gIERCSGVscGVyLmZldGNoQ3Vpc2luZXMoKGVycm9yLCBjdWlzaW5lcykgPT4ge1xuICAgIGlmIChlcnJvcikge1xuICAgICAgLy8gR290IGFuIGVycm9yIVxuICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNlbGYuY3Vpc2luZXMgPSBjdWlzaW5lcztcbiAgICAgIGZpbGxDdWlzaW5lc0hUTUwoKTtcbiAgICB9XG4gIH0pO1xufTtcblxuLyoqXG4gKiBTZXQgY3Vpc2luZXMgSFRNTC5cbiAqL1xuY29uc3QgZmlsbEN1aXNpbmVzSFRNTCA9IChjdWlzaW5lcyA9IHNlbGYuY3Vpc2luZXMpID0+IHtcbiAgY29uc3Qgc2VsZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2N1aXNpbmVzLXNlbGVjdCcpO1xuICBzZWxlY3QuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdXBkYXRlUmVzdGF1cmFudHMpO1xuXG4gIGN1aXNpbmVzLmZvckVhY2goKGN1aXNpbmUpID0+IHtcbiAgICBjb25zdCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcbiAgICBvcHRpb24uaW5uZXJIVE1MID0gY3Vpc2luZTtcbiAgICBvcHRpb24udmFsdWUgPSBjdWlzaW5lO1xuICAgIHNlbGVjdC5hcHBlbmQob3B0aW9uKTtcbiAgfSk7XG59O1xuXG4vKipcbiAqIEluaXRpYWxpemUgbGVhZmxldCBtYXAsIGNhbGxlZCBmcm9tIEhUTUwuXG4gKi9cbmNvbnN0IGluaXRNYXAgPSAoKSA9PiB7XG4gIG5ld01hcCA9IEwubWFwKCdtYXBpZCcsIHtcbiAgICBjZW50ZXI6IFs0MC43MjIyMTYsIC03My45ODc1MDFdLFxuICAgIHpvb206IDEyLFxuICAgIHNjcm9sbFdoZWVsWm9vbTogZmFsc2UsXG4gIH0pO1xuICBzZWxmLm5ld01hcCA9IG5ld01hcDtcbiAgTC50aWxlTGF5ZXIoXG4gICAgJ2h0dHBzOi8vYXBpLm1hcGJveC5jb20vc3R5bGVzL3YxL3tpZH0vdGlsZXMve3p9L3t4fS97eX0/YWNjZXNzX3Rva2VuPXthY2Nlc3NUb2tlbn0nLFxuICAgIHtcbiAgICAgIGF0dHJpYnV0aW9uOlxuICAgICAgICAnwqkgPGEgaHJlZj1cImh0dHBzOi8vd3d3Lm1hcGJveC5jb20vYWJvdXQvbWFwcy9cIj5NYXBib3g8L2E+IMKpIDxhIGhyZWY9XCJodHRwOi8vd3d3Lm9wZW5zdHJlZXRtYXAub3JnL2NvcHlyaWdodFwiPk9wZW5TdHJlZXRNYXA8L2E+IDxzdHJvbmc+PGEgaHJlZj1cImh0dHBzOi8vd3d3Lm1hcGJveC5jb20vbWFwLWZlZWRiYWNrL1wiIHRhcmdldD1cIl9ibGFua1wiPkltcHJvdmUgdGhpcyBtYXA8L2E+PC9zdHJvbmc+JyxcbiAgICAgIHRpbGVTaXplOiA1MTIsXG4gICAgICBtYXhab29tOiAxOCxcbiAgICAgIHpvb21PZmZzZXQ6IC0xLFxuICAgICAgaWQ6ICdtYXBib3gvc3RyZWV0cy12MTEnLFxuICAgICAgYWNjZXNzVG9rZW46IHByb2Nlc3MuZW52LkFQSV9LRVksXG4gICAgfVxuICApLmFkZFRvKG5ld01hcCk7XG59O1xuXG4vKipcbiAqIFVwZGF0ZSBwYWdlIGFuZCBtYXAgZm9yIGN1cnJlbnQgcmVzdGF1cmFudHMuXG4gKi9cbmNvbnN0IHVwZGF0ZVJlc3RhdXJhbnRzID0gKCkgPT4ge1xuICBjb25zdCBjU2VsZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2N1aXNpbmVzLXNlbGVjdCcpO1xuICBjb25zdCBuU2VsZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25laWdoYm9yaG9vZHMtc2VsZWN0Jyk7XG5cbiAgY29uc3QgY0luZGV4ID0gY1NlbGVjdC5zZWxlY3RlZEluZGV4O1xuICBjb25zdCBuSW5kZXggPSBuU2VsZWN0LnNlbGVjdGVkSW5kZXg7XG5cbiAgY29uc3QgY3Vpc2luZSA9IGNTZWxlY3RbY0luZGV4XS52YWx1ZTtcbiAgY29uc3QgbmVpZ2hib3Job29kID0gblNlbGVjdFtuSW5kZXhdLnZhbHVlO1xuXG4gIERCSGVscGVyLmZldGNoUmVzdGF1cmFudEJ5Q3Vpc2luZUFuZE5laWdoYm9yaG9vZChcbiAgICBjdWlzaW5lLFxuICAgIG5laWdoYm9yaG9vZCxcbiAgICAoZXJyb3IsIHJlc3RhdXJhbnRzKSA9PiB7XG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgLy8gR290IGFuIGVycm9yIVxuICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc2V0UmVzdGF1cmFudHMocmVzdGF1cmFudHMpO1xuICAgICAgICBmaWxsUmVzdGF1cmFudHNIVE1MKCk7XG4gICAgICB9XG4gICAgfVxuICApO1xufTtcblxuLyoqXG4gKiBDbGVhciBjdXJyZW50IHJlc3RhdXJhbnRzLCB0aGVpciBIVE1MIGFuZCByZW1vdmUgdGhlaXIgbWFwIG1hcmtlcnMuXG4gKi9cbmNvbnN0IHJlc2V0UmVzdGF1cmFudHMgPSAocmVzdGF1cmFudHMpID0+IHtcbiAgLy8gUmVtb3ZlIGFsbCByZXN0YXVyYW50c1xuICBzZWxmLnJlc3RhdXJhbnRzID0gW107XG4gIGNvbnN0IHVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc3RhdXJhbnRzLWxpc3QnKTtcbiAgdWwuaW5uZXJIVE1MID0gJyc7XG5cbiAgLy8gUmVtb3ZlIGFsbCBtYXAgbWFya2Vyc1xuICBpZiAoc2VsZi5tYXJrZXJzKSB7XG4gICAgc2VsZi5tYXJrZXJzLmZvckVhY2goKG1hcmtlcikgPT4gbWFya2VyLnJlbW92ZSgpKTtcbiAgfVxuICBzZWxmLm1hcmtlcnMgPSBbXTtcbiAgc2VsZi5yZXN0YXVyYW50cyA9IHJlc3RhdXJhbnRzO1xufTtcblxuLyoqXG4gKiBDcmVhdGUgYWxsIHJlc3RhdXJhbnRzIEhUTUwgYW5kIGFkZCB0aGVtIHRvIHRoZSB3ZWJwYWdlLlxuICovXG5jb25zdCBmaWxsUmVzdGF1cmFudHNIVE1MID0gKHJlc3RhdXJhbnRzID0gc2VsZi5yZXN0YXVyYW50cykgPT4ge1xuICBjb25zdCB1bCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXN0YXVyYW50cy1saXN0Jyk7XG4gIHJlc3RhdXJhbnRzLmZvckVhY2goKHJlc3RhdXJhbnQpID0+IHtcbiAgICB1bC5hcHBlbmQoY3JlYXRlUmVzdGF1cmFudEhUTUwocmVzdGF1cmFudCkpO1xuICB9KTtcbiAgYWRkTWFya2Vyc1RvTWFwKCk7XG59O1xuXG4vKipcbiAqIENyZWF0ZSByZXN0YXVyYW50IEhUTUwuXG4gKi9cbmNvbnN0IGNyZWF0ZVJlc3RhdXJhbnRIVE1MID0gKHJlc3RhdXJhbnQpID0+IHtcbiAgY29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuXG4gIGNvbnN0IGltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBpbWFnZS5jbGFzc05hbWUgPSAncmVzdGF1cmFudC1pbWcnO1xuICBpbWFnZS5zZXRBdHRyaWJ1dGUoJ2FsdCcsIHJlc3RhdXJhbnQubmFtZSk7XG4gIGltYWdlLnNyYyA9IERCSGVscGVyLmltYWdlVXJsRm9yUmVzdGF1cmFudChyZXN0YXVyYW50KTtcbiAgZGl2LmFwcGVuZChpbWFnZSk7XG4gIGxpLmFwcGVuZChkaXYpO1xuXG4gIGNvbnN0IG5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xuICBuYW1lLmlubmVySFRNTCA9IHJlc3RhdXJhbnQubmFtZTtcbiAgbGkuYXBwZW5kKG5hbWUpO1xuXG4gIGNvbnN0IG5laWdoYm9yaG9vZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgbmVpZ2hib3Job29kLmlubmVySFRNTCA9IHJlc3RhdXJhbnQubmVpZ2hib3Job29kO1xuICBsaS5hcHBlbmQobmVpZ2hib3Job29kKTtcblxuICBjb25zdCBhZGRyZXNzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICBhZGRyZXNzLmlubmVySFRNTCA9IHJlc3RhdXJhbnQuYWRkcmVzcztcbiAgbGkuYXBwZW5kKGFkZHJlc3MpO1xuXG4gIGNvbnN0IGZhdkJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICBpZiAocmVzdGF1cmFudC5pc19mYXZvcml0ZSA9PT0gJ3RydWUnIHx8IHJlc3RhdXJhbnQuaXNfZmF2b3JpdGUgPT09IHRydWUpIHtcbiAgICBmYXZCdG4uaW5uZXJIVE1MID0gJ0Zhdm9yaXRlZCEnO1xuICAgIGZhdkJ0bi5zdHlsZS5iYWNrZ3JvdW5kID0gJ2hvdHBpbmsnO1xuICB9IGVsc2Uge1xuICAgIGZhdkJ0bi5pbm5lckhUTUwgPSAnQWRkIHRvIGZhdm9yaXRlJztcbiAgICBmYXZCdG4uc3R5bGUuYmFja2dyb3VuZCA9ICdncmV5JztcbiAgfVxuICBmYXZCdG4uc2V0QXR0cmlidXRlKCd0aXRsZScsIGB0b2dnbGUgZmF2b3JpdGVzIGZvcjogJHtyZXN0YXVyYW50Lm5hbWV9YCk7XG4gIGZhdkJ0bi5zZXRBdHRyaWJ1dGUoJ2lkJywgYGZhdi1idG4tJHtyZXN0YXVyYW50LmlkfWApO1xuICBmYXZCdG4uc2V0QXR0cmlidXRlKCdkYXRhLXJlc3RhdXJhbnQtaWQnLCByZXN0YXVyYW50LmlkKTtcblxuICBmYXZCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgREJIZWxwZXIudG9nZ2xlRmF2QnRuKHJlc3RhdXJhbnQuaWQpO1xuICB9KTtcblxuICBsaS5hcHBlbmQoZmF2QnRuKTtcblxuICBjb25zdCBtb3JlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gIG1vcmUuY2xhc3NMaXN0ID0gJ2J1dHRvbiBidXR0b24tLXN1Y2Nlc3MnO1xuICBtb3JlLmlubmVySFRNTCA9ICdWaWV3IERldGFpbHMnO1xuICBtb3JlLnNldEF0dHJpYnV0ZShcbiAgICAnYXJpYS1sYWJlbCcsXG4gICAgcmVzdGF1cmFudC5uYW1lICtcbiAgICAgIHJlc3RhdXJhbnQubmVpZ2hib3Job29kICtcbiAgICAgIHJlc3RhdXJhbnQuYWRkcmVzcyArXG4gICAgICAnVmlldyBEZXRhaWxzJ1xuICApO1xuICBtb3JlLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgY29uc3QgdXJsID0gREJIZWxwZXIudXJsRm9yUmVzdGF1cmFudChyZXN0YXVyYW50KTtcbiAgICB3aW5kb3cubG9jYXRpb24gPSB1cmw7XG4gIH07XG4gIGxpLmFwcGVuZChtb3JlKTtcblxuICByZXR1cm4gbGk7XG59O1xuXG4vKipcbiAqIEFkZCBtYXJrZXJzIGZvciBjdXJyZW50IHJlc3RhdXJhbnRzIHRvIHRoZSBtYXAuXG4gKi9cbmNvbnN0IGFkZE1hcmtlcnNUb01hcCA9IChyZXN0YXVyYW50cyA9IHNlbGYucmVzdGF1cmFudHMpID0+IHtcbiAgcmVzdGF1cmFudHMuZm9yRWFjaCgocmVzdGF1cmFudCkgPT4ge1xuICAgIC8vIEFkZCBtYXJrZXIgdG8gdGhlIG1hcFxuICAgIGNvbnN0IG1hcmtlciA9IERCSGVscGVyLm1hcE1hcmtlckZvclJlc3RhdXJhbnQocmVzdGF1cmFudCwgbmV3TWFwKTtcbiAgICBtYXJrZXIub24oJ2NsaWNrJywgb25DbGljayk7XG4gICAgZnVuY3Rpb24gb25DbGljaygpIHtcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gbWFya2VyLm9wdGlvbnMudXJsO1xuICAgIH1cbiAgICBzZWxmLm1hcmtlcnMucHVzaChtYXJrZXIpO1xuICB9KTtcbn07XG4iLCJleHBvcnQgZGVmYXVsdCAoZnVuY3Rpb24gKCkge1xuXG4gIGlmICgnc2VydmljZVdvcmtlcicgaW4gbmF2aWdhdG9yKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XG4gICAgICBuYXZpZ2F0b3Iuc2VydmljZVdvcmtlci5yZWdpc3RlcignL3NlcnZpY2V3b3JrZXIuYnVuZGxlLmpzJykudGhlbihyZWdpc3RyYXRpb24gPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnU1cgcmVnaXN0ZXJlZDogJywgcmVnaXN0cmF0aW9uKTtcbiAgICAgIH0pLmNhdGNoKHJlZ2lzdHJhdGlvbkVycm9yID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ1NXIHJlZ2lzdHJhdGlvbiBmYWlsZWQ6ICcsIHJlZ2lzdHJhdGlvbkVycm9yKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbn0pKCk7XG5cblxuIiwiY29uc3QgY2FjaGVWZXJzaW9uID0gJzMnO1xuY29uc3QgU1RBVElDX0NBQ0hFID0gYHJlc3RhdXJhbnQtY2FjaGUtdiR7Y2FjaGVWZXJzaW9ufWA7XG5jb25zdCBJTUFHRVNfQ0FDSEUgPSBgaW1hZ2VzX2NhY2hlLXZgO1xuY29uc3QgYWxsQ2FjaGVzID0gW1xuICBTVEFUSUNfQ0FDSEUsXG4gIElNQUdFU19DQUNIRVxuXTtcbmltcG9ydCB7IG9wZW5EQiwgZGVsZXRlREIsIHdyYXAsIHVud3JhcCB9IGZyb20gJ2lkYic7XG5leHBvcnQgeyBkYlByb21pc2UgfVxuXG5jb25zdCBkYlByb21pc2UgPSBvcGVuREIoJ3JyLWRiJywgMywge1xuICB1cGdyYWRlKGRiLCBvbGRWZXJzaW9uKSB7XG4gICAgc3dpdGNoIChvbGRWZXJzaW9uKSB7XG4gICAgICBjYXNlIDA6XG4gICAgICAgIGNvbnN0IHN0b3JlID0gZGIuY3JlYXRlT2JqZWN0U3RvcmUoJ3Jlc3RhdXJhbnRzJywgeyBrZXlQYXRoOiAnaWQnIH0pO1xuICAgICAgICBzdG9yZS5jcmVhdGVJbmRleCgnaWQnLCAnaWQnKTtcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgY29uc3QgcmV2aWV3c1N0b3JlID0gZGIuY3JlYXRlT2JqZWN0U3RvcmUoJ3Jldmlld3MnLCB7XG4gICAgICAgICAga2V5UGF0aDogJ2lkJyxcbiAgICAgICAgICAvLyBhdXRvSW5jcmVtZW50OiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICByZXZpZXdzU3RvcmUuY3JlYXRlSW5kZXgoXCJyZXN0YXVyYW50X2lkXCIsIFwicmVzdGF1cmFudF9pZFwiKTtcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgY29uc3QgcGVuZGluZ1N0b3JlID0gZGIuY3JlYXRlT2JqZWN0U3RvcmUoJ3BlbmRpbmcnLCB7XG4gICAgICAgICAga2V5UGF0aDogJ2lkJyxcbiAgICAgICAgICBhdXRvSW5jcmVtZW50OiB0cnVlXG4gICAgICAgIH0pO1xuICAgIH1cbiAgfVxufSk7XG5cbmNvbnN0IGdldFJlc3RhdXJhbnRzID0gKGV2ZW50KSA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgZmV0Y2goZXZlbnQucmVxdWVzdClcbiAgICAgIC50aGVuKHJlc3AgPT4gcmVzcC5qc29uKCkpXG4gICAgICAudGhlbihqc29uID0+IHsgcmVzb2x2ZShqc29uKTsgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gaXNJbWFnZVVSTCh1cmwpIHtcbiAgbGV0IGltZ1R5cGVzID0gW1wicG5nXCIsIFwianBnXCIsIFwianBlZ1wiLCBcInN2Z1wiLCBcImdpZlwiXTtcbiAgbGV0IGlzSW1hZ2UgPSBmYWxzZTtcbiAgZm9yIChsZXQgdHlwZSBvZiBpbWdUeXBlcykge1xuICAgIGlmICh1cmwuZW5kc1dpdGgodHlwZSkpIHsgaXNJbWFnZSA9IHRydWU7IGJyZWFrIH07XG4gIH1cbiAgcmV0dXJuIGlzSW1hZ2U7XG59XG5cbnNlbGYuYWRkRXZlbnRMaXN0ZW5lcignaW5zdGFsbCcsIGV2ZW50ID0+IHtcbiAgZXZlbnQud2FpdFVudGlsKFxuICAgIGNhY2hlcy5vcGVuKFNUQVRJQ19DQUNIRSkudGhlbihjYWNoZSA9PiB7XG4gICAgICByZXR1cm4gY2FjaGUuYWRkQWxsKFtcbiAgICAgICAgJy8nLFxuICAgICAgICAnLi9hcHAuYnVuZGxlLmpzJyxcbiAgICAgICAgJy4vcmVzdGF1cmFudC5idW5kbGUuanMnLFxuICAgICAgICAnLi9pbWcvcnJfaWNvbi5wbmcnLFxuICAgICAgICAnLi9jc3Mvc3R5bGVzLmNzcydcbiAgICAgIF0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ2Vycm9yIHNldHRpbmcgdXAgaW5zdGFsbCBldmVudCBmb3Igc3cnKTtcbiAgICAgIH0pO1xuICAgIH0pXG4gICk7XG59KTtcblxuLy8gQ2xlYW4gdW51c2VkIGNhY2hlcyB3aXRoIG5hbWVzIHN0YXJ0aW5nIHdpdGggcmVzdGF1cmFudFxuc2VsZi5hZGRFdmVudExpc3RlbmVyKCdhY3RpdmF0ZScsIGV2ZW50ID0+IHtcbiAgZXZlbnQud2FpdFVudGlsKFxuICAgIGNhY2hlcy5rZXlzKCkudGhlbihjYWNoZU5hbWVzID0+IHtcbiAgICAgIHJldHVybiBQcm9taXNlLmFsbChcbiAgICAgICAgY2FjaGVOYW1lcy5maWx0ZXIoY2FjaGVOYW1lID0+IHtcbiAgICAgICAgICByZXR1cm4gY2FjaGVOYW1lLnN0YXJ0c1dpdGgoJ3Jlc3RhdXJhbnQtJykgJiZcbiAgICAgICAgICAgIGNhY2hlTmFtZSAhPSBTVEFUSUNfQ0FDSEU7XG4gICAgICAgIH0pLm1hcChjYWNoZU5hbWUgPT4ge1xuICAgICAgICAgIHJldHVybiBjYWNoZXMuZGVsZXRlKGNhY2hlTmFtZSk7XG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH0pXG4gICk7XG59KTtcblxuc2VsZi5hZGRFdmVudExpc3RlbmVyKCdmZXRjaCcsIGV2ZW50ID0+IHtcbiAgbGV0IGNoZWNrVXJsID0gbmV3IFVSTChldmVudC5yZXF1ZXN0LnVybCk7XG4gIGlmIChjaGVja1VybC5wb3J0ID09PSBcIjEzMzdcIikge1xuICAgIGxldCBpZCA9IGNoZWNrVXJsLnNlYXJjaFBhcmFtcy5nZXQoJ3Jlc3RhdXJhbnRfaWQnKSAtIDA7XG4gICAgcmV0dXJuIGhhbmRsZUFKQVhFdmVudChldmVudCwgaWQpO1xuICB9IGVsc2Uge1xuICAgIGhhbmRsZU5vbkFKQVhFdmVudChldmVudCk7XG4gIH1cbn0pO1xuXG5jb25zdCBoYW5kbGVBSkFYRXZlbnQgPSAoZXZlbnQsIGlkKSA9PiB7XG4gIC8vIE9ubHkgdXNlIGZvciBjYWNoaW5nIGZvciBHZXQgZXZlbnRzXG4gIGlmIChldmVudC5yZXF1ZXN0Lm1ldGhvZCAhPT0gXCJHRVRcIikge1xuICAgIGNvbnNvbGUubG9nKGV2ZW50LnJlcXVlc3QpO1xuICAgIGNvbnNvbGUubG9nKGV2ZW50KTtcbiAgICBldmVudC5yZXNwb25kV2l0aChcbiAgICAgIGZldGNoKGV2ZW50LnJlcXVlc3QpXG4gICAgKVxuICB9IGVsc2UgaWYgKGV2ZW50LnJlcXVlc3QudXJsLmluZGV4T2YoXCJyZXN0YXVyYW50c1wiKSA+IC0xKSB7XG4gICAgaGFuZGxlUmVzdGF1cmFudEV2ZW50cyhldmVudCk7XG4gIH0gZWxzZSB7XG4gICAgY29uc29sZS5sb2coJ3N0YXJ0aW5nIGhhbmRsaW5nIGZyb20gcmV2aWV3cyBldmVudCcpXG4gICAgaGFuZGxlUmV2aWV3c0V2ZW50cyhldmVudCwgaWQpO1xuICB9XG59XG5cbmNvbnN0IGhhbmRsZVJlc3RhdXJhbnRFdmVudHMgPSAoZXZlbnQpID0+IHtcbiAgZXZlbnQucmVzcG9uZFdpdGgoXG4gICAgZGJQcm9taXNlLnRoZW4oZGIgPT4ge1xuICAgICAgcmV0dXJuIGRiXG4gICAgICAgIC50cmFuc2FjdGlvbigncmVzdGF1cmFudHMnKVxuICAgICAgICAub2JqZWN0U3RvcmUoJ3Jlc3RhdXJhbnRzJylcbiAgICAgICAgLmdldEFsbCgpO1xuICAgIH0pLnRoZW4oZGF0YSA9PiB7XG4gICAgICBjb25zb2xlLmxvZygncmVzcG9uZGluZyBmcm9tIGhhbmRsZXJlc3RhdXJhbnRldmVudHMgZnJvbSBzZXJ2aWNld29ya2VyJyk7XG4gICAgICByZXR1cm4gKChkYXRhLmxlbmd0aCAmJiBkYXRhKSB8fCBnZXRSZXN0YXVyYW50cyhldmVudClcbiAgICAgICAgLnRoZW4ocmVzdGF1cmFudHMgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdmZXRjaGVkIG5vdyBzdG9yaW5nJyk7XG4gICAgICAgICAgcmV0dXJuIGRiUHJvbWlzZS50aGVuKGRiID0+IHtcbiAgICAgICAgICAgIGxldCB0eCA9IGRiLnRyYW5zYWN0aW9uKCdyZXN0YXVyYW50cycsICdyZWFkd3JpdGUnKTtcbiAgICAgICAgICAgIGxldCBzdG9yZSA9IHR4Lm9iamVjdFN0b3JlKCdyZXN0YXVyYW50cycpO1xuICAgICAgICAgICAgcmVzdGF1cmFudHMuZm9yRWFjaChmdW5jdGlvbiAocmVzdGF1cmFudCkge1xuICAgICAgICAgICAgICBzdG9yZS5wdXQocmVzdGF1cmFudCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0eC5kb25lO1xuICAgICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3N0b3JlZCByZXN0YXVyYW50cywgbm93IHJldHVybmluZycpO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3RhdXJhbnRzO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgICAgKVxuICAgIH0pXG4gICAgICAudGhlbihmaW5hbFJlc3BvbnNlID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZmluYWxSZXNwb25zZSk7XG4gICAgICAgIHJldHVybiBuZXcgUmVzcG9uc2UoSlNPTi5zdHJpbmdpZnkoZmluYWxSZXNwb25zZSkpO1xuICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IFJlc3BvbnNlKFwiRXJyb3IgZmV0Y2hpbmcgZGF0YVwiLCB7IHN0YXR1czogNTAwIH0pO1xuICAgICAgfSlcbiAgKVxufVxuXG5jb25zdCBoYW5kbGVSZXZpZXdzRXZlbnRzID0gKGV2ZW50LCBpZCkgPT4ge1xuICBldmVudC5yZXNwb25kV2l0aChcbiAgICBkYlByb21pc2UudGhlbihkYiA9PiB7XG4gICAgICByZXR1cm4gZGJcbiAgICAgICAgLnRyYW5zYWN0aW9uKCdyZXZpZXdzJylcbiAgICAgICAgLm9iamVjdFN0b3JlKCdyZXZpZXdzJylcbiAgICAgICAgLmluZGV4KFwicmVzdGF1cmFudF9pZFwiKVxuICAgICAgICAuZ2V0QWxsKGlkKTtcbiAgICB9KS50aGVuKGRhdGEgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ3NlcnZpY2V3b3JrZXIgaGFuZGxlIHJldmlld3MnKTtcbiAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgcmV0dXJuIChkYXRhLmxlbmd0aCAmJiBkYXRhKSB8fCBmZXRjaChldmVudC5yZXF1ZXN0KVxuICAgICAgICAudGhlbihmZXRjaFJlc3BvbnNlID0+IHtcbiAgICAgICAgICByZXR1cm4gZmV0Y2hSZXNwb25zZS5qc29uKCk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJldmlld3MgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCd1c2luZyBzZXJ2aWNld29ya2VyIGZldGNoJyk7XG4gICAgICAgICAgY29uc29sZS5sb2coJ3N0YXJ0aW5nIHRvIHN0b3JlIHJldmlld3MnKTtcbiAgICAgICAgICByZXR1cm4gZGJQcm9taXNlLnRoZW4oZGIgPT4ge1xuICAgICAgICAgICAgbGV0IHR4ID0gZGIudHJhbnNhY3Rpb24oJ3Jldmlld3MnLCAncmVhZHdyaXRlJylcbiAgICAgICAgICAgIGxldCBzdG9yZSA9IHR4Lm9iamVjdFN0b3JlKCdyZXZpZXdzJyk7XG4gICAgICAgICAgICByZXZpZXdzLmZvckVhY2goZnVuY3Rpb24gKHJldmlldykge1xuICAgICAgICAgICAgICBzdG9yZS5wdXQocmV2aWV3KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHR4LmRvbmU7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHJldmlld3MpXG4gICAgICAgIH0pXG4gICAgfSkudGhlbihmaW5hbFJlc3BvbnNlID0+IHtcbiAgICAgIHJldHVybiBuZXcgUmVzcG9uc2UoSlNPTi5zdHJpbmdpZnkoZmluYWxSZXNwb25zZSkpO1xuICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgIHJldHVybiBuZXcgUmVzcG9uc2UoXCJFcnJvciBmZXRjaGluZyBkYXRhXCIsIHsgc3RhdHVzOiA1MDAgfSk7XG4gICAgfSkpXG59XG5cbmNvbnN0IGhhbmRsZU5vbkFKQVhFdmVudCA9IChldmVudCkgPT4ge1xuICAvLyBDaGVjayBpZiB0aGUgSFRNTCByZXF1ZXN0IGhhcyBwcmV2aW91c2x5IGJlZW4gY2FjaGVkLiBJZiBzbywgcmV0dXJuIHRoZVxuICAvLyByZXNwb25zZSBmcm9tIHRoZSBjYWNoZS4gSWYgbm90LCBmZXRjaCB0aGUgcmVxdWVzdCwgY2FjaGUgaXQsIGFuZCB0aGVuIHJldHVyblxuICAvLyBpdC5cbiAgZXZlbnQucmVzcG9uZFdpdGgoXG4gICAgY2FjaGVzLm1hdGNoKGV2ZW50LnJlcXVlc3QpLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgcmV0dXJuIHJlc3BvbnNlIHx8IGZldGNoKGV2ZW50LnJlcXVlc3QpLnRoZW4oZmV0Y2hSZXNwb25zZSA9PiB7XG4gICAgICAgIGxldCB1c2VDYWNoZSA9IGlzSW1hZ2VVUkwoZXZlbnQucmVxdWVzdC51cmwpID8gSU1BR0VTX0NBQ0hFIDogU1RBVElDX0NBQ0hFO1xuICAgICAgICByZXR1cm4gY2FjaGVzXG4gICAgICAgICAgLm9wZW4odXNlQ2FjaGUpXG4gICAgICAgICAgLnRoZW4oY2FjaGUgPT4ge1xuICAgICAgICAgICAgY2FjaGUucHV0KGV2ZW50LnJlcXVlc3QsIGZldGNoUmVzcG9uc2UuY2xvbmUoKSk7XG4gICAgICAgICAgICByZXR1cm4gZmV0Y2hSZXNwb25zZTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBSZXNwb25zZShcIkFwcGxpY2F0aW9uIGlzIG5vdCBjb25uZWN0ZWQgdG8gdGhlIGludGVybmV0XCIsIHtcbiAgICAgICAgICBzdGF0dXM6IDQwNCxcbiAgICAgICAgICBzdGF0dXNUZXh0OiBcIkFwcGxpY2F0aW9uIGlzIG5vdCBjb25uZWN0ZWQgdG8gdGhlIGludGVybmV0XCJcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KVxuICApO1xuXG4gIC8vIFVwZGF0ZXMgdGhlIGRhdGEgZnJvbSB0aGUgbmV0d29yayB0byB1c2Ugb24gbmV4dCByZXF1ZXN0LlxuICBldmVudC53YWl0VW50aWwodXBkYXRlKGV2ZW50LnJlcXVlc3QpKTtcbn1cblxuY29uc3QgdXBkYXRlID0gKHJlcXVlc3QpID0+IHtcbiAgbGV0IHVzZUNhY2hlID0gaXNJbWFnZVVSTChyZXF1ZXN0LnVybCkgPyBJTUFHRVNfQ0FDSEUgOiBTVEFUSUNfQ0FDSEU7XG4gIHJldHVybiBjYWNoZXMub3Blbih1c2VDYWNoZSkudGhlbihjYWNoZSA9PiB7XG4gICAgcmV0dXJuIGZldGNoKHJlcXVlc3QpLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgcmV0dXJuIGNhY2hlLnB1dChyZXF1ZXN0LCByZXNwb25zZSk7XG4gICAgfSk7XG4gIH0pO1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKHR5cGVvZiBpdCAhPSAnZnVuY3Rpb24nKSB0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhIGZ1bmN0aW9uIScpO1xuICByZXR1cm4gaXQ7XG59O1xuIiwiLy8gMjIuMS4zLjMxIEFycmF5LnByb3RvdHlwZVtAQHVuc2NvcGFibGVzXVxudmFyIFVOU0NPUEFCTEVTID0gcmVxdWlyZSgnLi9fd2tzJykoJ3Vuc2NvcGFibGVzJyk7XG52YXIgQXJyYXlQcm90byA9IEFycmF5LnByb3RvdHlwZTtcbmlmIChBcnJheVByb3RvW1VOU0NPUEFCTEVTXSA9PSB1bmRlZmluZWQpIHJlcXVpcmUoJy4vX2hpZGUnKShBcnJheVByb3RvLCBVTlNDT1BBQkxFUywge30pO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIEFycmF5UHJvdG9bVU5TQ09QQUJMRVNdW2tleV0gPSB0cnVlO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBhdCA9IHJlcXVpcmUoJy4vX3N0cmluZy1hdCcpKHRydWUpO1xuXG4gLy8gYEFkdmFuY2VTdHJpbmdJbmRleGAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hZHZhbmNlc3RyaW5naW5kZXhcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKFMsIGluZGV4LCB1bmljb2RlKSB7XG4gIHJldHVybiBpbmRleCArICh1bmljb2RlID8gYXQoUywgaW5kZXgpLmxlbmd0aCA6IDEpO1xufTtcbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKCFpc09iamVjdChpdCkpIHRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGFuIG9iamVjdCEnKTtcbiAgcmV0dXJuIGl0O1xufTtcbiIsIi8vIGZhbHNlIC0+IEFycmF5I2luZGV4T2Zcbi8vIHRydWUgIC0+IEFycmF5I2luY2x1ZGVzXG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJyk7XG52YXIgdG9BYnNvbHV0ZUluZGV4ID0gcmVxdWlyZSgnLi9fdG8tYWJzb2x1dGUtaW5kZXgnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKElTX0lOQ0xVREVTKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoJHRoaXMsIGVsLCBmcm9tSW5kZXgpIHtcbiAgICB2YXIgTyA9IHRvSU9iamVjdCgkdGhpcyk7XG4gICAgdmFyIGxlbmd0aCA9IHRvTGVuZ3RoKE8ubGVuZ3RoKTtcbiAgICB2YXIgaW5kZXggPSB0b0Fic29sdXRlSW5kZXgoZnJvbUluZGV4LCBsZW5ndGgpO1xuICAgIHZhciB2YWx1ZTtcbiAgICAvLyBBcnJheSNpbmNsdWRlcyB1c2VzIFNhbWVWYWx1ZVplcm8gZXF1YWxpdHkgYWxnb3JpdGhtXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlbGYtY29tcGFyZVxuICAgIGlmIChJU19JTkNMVURFUyAmJiBlbCAhPSBlbCkgd2hpbGUgKGxlbmd0aCA+IGluZGV4KSB7XG4gICAgICB2YWx1ZSA9IE9baW5kZXgrK107XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlXG4gICAgICBpZiAodmFsdWUgIT0gdmFsdWUpIHJldHVybiB0cnVlO1xuICAgIC8vIEFycmF5I2luZGV4T2YgaWdub3JlcyBob2xlcywgQXJyYXkjaW5jbHVkZXMgLSBub3RcbiAgICB9IGVsc2UgZm9yICg7bGVuZ3RoID4gaW5kZXg7IGluZGV4KyspIGlmIChJU19JTkNMVURFUyB8fCBpbmRleCBpbiBPKSB7XG4gICAgICBpZiAoT1tpbmRleF0gPT09IGVsKSByZXR1cm4gSVNfSU5DTFVERVMgfHwgaW5kZXggfHwgMDtcbiAgICB9IHJldHVybiAhSVNfSU5DTFVERVMgJiYgLTE7XG4gIH07XG59O1xuIiwiLy8gZ2V0dGluZyB0YWcgZnJvbSAxOS4xLjMuNiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nKClcbnZhciBjb2YgPSByZXF1aXJlKCcuL19jb2YnKTtcbnZhciBUQUcgPSByZXF1aXJlKCcuL193a3MnKSgndG9TdHJpbmdUYWcnKTtcbi8vIEVTMyB3cm9uZyBoZXJlXG52YXIgQVJHID0gY29mKGZ1bmN0aW9uICgpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKSA9PSAnQXJndW1lbnRzJztcblxuLy8gZmFsbGJhY2sgZm9yIElFMTEgU2NyaXB0IEFjY2VzcyBEZW5pZWQgZXJyb3JcbnZhciB0cnlHZXQgPSBmdW5jdGlvbiAoaXQsIGtleSkge1xuICB0cnkge1xuICAgIHJldHVybiBpdFtrZXldO1xuICB9IGNhdGNoIChlKSB7IC8qIGVtcHR5ICovIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHZhciBPLCBULCBCO1xuICByZXR1cm4gaXQgPT09IHVuZGVmaW5lZCA/ICdVbmRlZmluZWQnIDogaXQgPT09IG51bGwgPyAnTnVsbCdcbiAgICAvLyBAQHRvU3RyaW5nVGFnIGNhc2VcbiAgICA6IHR5cGVvZiAoVCA9IHRyeUdldChPID0gT2JqZWN0KGl0KSwgVEFHKSkgPT0gJ3N0cmluZycgPyBUXG4gICAgLy8gYnVpbHRpblRhZyBjYXNlXG4gICAgOiBBUkcgPyBjb2YoTylcbiAgICAvLyBFUzMgYXJndW1lbnRzIGZhbGxiYWNrXG4gICAgOiAoQiA9IGNvZihPKSkgPT0gJ09iamVjdCcgJiYgdHlwZW9mIE8uY2FsbGVlID09ICdmdW5jdGlvbicgPyAnQXJndW1lbnRzJyA6IEI7XG59O1xuIiwidmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGl0KS5zbGljZSg4LCAtMSk7XG59O1xuIiwidmFyIGNvcmUgPSBtb2R1bGUuZXhwb3J0cyA9IHsgdmVyc2lvbjogJzIuNi41JyB9O1xuaWYgKHR5cGVvZiBfX2UgPT0gJ251bWJlcicpIF9fZSA9IGNvcmU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcbiIsIi8vIG9wdGlvbmFsIC8gc2ltcGxlIGNvbnRleHQgYmluZGluZ1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGZuLCB0aGF0LCBsZW5ndGgpIHtcbiAgYUZ1bmN0aW9uKGZuKTtcbiAgaWYgKHRoYXQgPT09IHVuZGVmaW5lZCkgcmV0dXJuIGZuO1xuICBzd2l0Y2ggKGxlbmd0aCkge1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmN0aW9uIChhKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhKTtcbiAgICB9O1xuICAgIGNhc2UgMjogcmV0dXJuIGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiKTtcbiAgICB9O1xuICAgIGNhc2UgMzogcmV0dXJuIGZ1bmN0aW9uIChhLCBiLCBjKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiLCBjKTtcbiAgICB9O1xuICB9XG4gIHJldHVybiBmdW5jdGlvbiAoLyogLi4uYXJncyAqLykge1xuICAgIHJldHVybiBmbi5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICB9O1xufTtcbiIsIi8vIDcuMi4xIFJlcXVpcmVPYmplY3RDb2VyY2libGUoYXJndW1lbnQpXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoaXQgPT0gdW5kZWZpbmVkKSB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjYWxsIG1ldGhvZCBvbiAgXCIgKyBpdCk7XG4gIHJldHVybiBpdDtcbn07XG4iLCIvLyBUaGFuaydzIElFOCBmb3IgaGlzIGZ1bm55IGRlZmluZVByb3BlcnR5XG5tb2R1bGUuZXhwb3J0cyA9ICFyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ2EnLCB7IGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gNzsgfSB9KS5hICE9IDc7XG59KTtcbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xudmFyIGRvY3VtZW50ID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuZG9jdW1lbnQ7XG4vLyB0eXBlb2YgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBpcyAnb2JqZWN0JyBpbiBvbGQgSUVcbnZhciBpcyA9IGlzT2JqZWN0KGRvY3VtZW50KSAmJiBpc09iamVjdChkb2N1bWVudC5jcmVhdGVFbGVtZW50KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpcyA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaXQpIDoge307XG59O1xuIiwiLy8gSUUgOC0gZG9uJ3QgZW51bSBidWcga2V5c1xubW9kdWxlLmV4cG9ydHMgPSAoXG4gICdjb25zdHJ1Y3RvcixoYXNPd25Qcm9wZXJ0eSxpc1Byb3RvdHlwZU9mLHByb3BlcnR5SXNFbnVtZXJhYmxlLHRvTG9jYWxlU3RyaW5nLHRvU3RyaW5nLHZhbHVlT2YnXG4pLnNwbGl0KCcsJyk7XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgY29yZSA9IHJlcXVpcmUoJy4vX2NvcmUnKTtcbnZhciBoaWRlID0gcmVxdWlyZSgnLi9faGlkZScpO1xudmFyIHJlZGVmaW5lID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUnKTtcbnZhciBjdHggPSByZXF1aXJlKCcuL19jdHgnKTtcbnZhciBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcblxudmFyICRleHBvcnQgPSBmdW5jdGlvbiAodHlwZSwgbmFtZSwgc291cmNlKSB7XG4gIHZhciBJU19GT1JDRUQgPSB0eXBlICYgJGV4cG9ydC5GO1xuICB2YXIgSVNfR0xPQkFMID0gdHlwZSAmICRleHBvcnQuRztcbiAgdmFyIElTX1NUQVRJQyA9IHR5cGUgJiAkZXhwb3J0LlM7XG4gIHZhciBJU19QUk9UTyA9IHR5cGUgJiAkZXhwb3J0LlA7XG4gIHZhciBJU19CSU5EID0gdHlwZSAmICRleHBvcnQuQjtcbiAgdmFyIHRhcmdldCA9IElTX0dMT0JBTCA/IGdsb2JhbCA6IElTX1NUQVRJQyA/IGdsb2JhbFtuYW1lXSB8fCAoZ2xvYmFsW25hbWVdID0ge30pIDogKGdsb2JhbFtuYW1lXSB8fCB7fSlbUFJPVE9UWVBFXTtcbiAgdmFyIGV4cG9ydHMgPSBJU19HTE9CQUwgPyBjb3JlIDogY29yZVtuYW1lXSB8fCAoY29yZVtuYW1lXSA9IHt9KTtcbiAgdmFyIGV4cFByb3RvID0gZXhwb3J0c1tQUk9UT1RZUEVdIHx8IChleHBvcnRzW1BST1RPVFlQRV0gPSB7fSk7XG4gIHZhciBrZXksIG93biwgb3V0LCBleHA7XG4gIGlmIChJU19HTE9CQUwpIHNvdXJjZSA9IG5hbWU7XG4gIGZvciAoa2V5IGluIHNvdXJjZSkge1xuICAgIC8vIGNvbnRhaW5zIGluIG5hdGl2ZVxuICAgIG93biA9ICFJU19GT1JDRUQgJiYgdGFyZ2V0ICYmIHRhcmdldFtrZXldICE9PSB1bmRlZmluZWQ7XG4gICAgLy8gZXhwb3J0IG5hdGl2ZSBvciBwYXNzZWRcbiAgICBvdXQgPSAob3duID8gdGFyZ2V0IDogc291cmNlKVtrZXldO1xuICAgIC8vIGJpbmQgdGltZXJzIHRvIGdsb2JhbCBmb3IgY2FsbCBmcm9tIGV4cG9ydCBjb250ZXh0XG4gICAgZXhwID0gSVNfQklORCAmJiBvd24gPyBjdHgob3V0LCBnbG9iYWwpIDogSVNfUFJPVE8gJiYgdHlwZW9mIG91dCA9PSAnZnVuY3Rpb24nID8gY3R4KEZ1bmN0aW9uLmNhbGwsIG91dCkgOiBvdXQ7XG4gICAgLy8gZXh0ZW5kIGdsb2JhbFxuICAgIGlmICh0YXJnZXQpIHJlZGVmaW5lKHRhcmdldCwga2V5LCBvdXQsIHR5cGUgJiAkZXhwb3J0LlUpO1xuICAgIC8vIGV4cG9ydFxuICAgIGlmIChleHBvcnRzW2tleV0gIT0gb3V0KSBoaWRlKGV4cG9ydHMsIGtleSwgZXhwKTtcbiAgICBpZiAoSVNfUFJPVE8gJiYgZXhwUHJvdG9ba2V5XSAhPSBvdXQpIGV4cFByb3RvW2tleV0gPSBvdXQ7XG4gIH1cbn07XG5nbG9iYWwuY29yZSA9IGNvcmU7XG4vLyB0eXBlIGJpdG1hcFxuJGV4cG9ydC5GID0gMTsgICAvLyBmb3JjZWRcbiRleHBvcnQuRyA9IDI7ICAgLy8gZ2xvYmFsXG4kZXhwb3J0LlMgPSA0OyAgIC8vIHN0YXRpY1xuJGV4cG9ydC5QID0gODsgICAvLyBwcm90b1xuJGV4cG9ydC5CID0gMTY7ICAvLyBiaW5kXG4kZXhwb3J0LlcgPSAzMjsgIC8vIHdyYXBcbiRleHBvcnQuVSA9IDY0OyAgLy8gc2FmZVxuJGV4cG9ydC5SID0gMTI4OyAvLyByZWFsIHByb3RvIG1ldGhvZCBmb3IgYGxpYnJhcnlgXG5tb2R1bGUuZXhwb3J0cyA9ICRleHBvcnQ7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChleGVjKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZXhlYygpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG5yZXF1aXJlKCcuL2VzNi5yZWdleHAuZXhlYycpO1xudmFyIHJlZGVmaW5lID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUnKTtcbnZhciBoaWRlID0gcmVxdWlyZSgnLi9faGlkZScpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi9fZmFpbHMnKTtcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xudmFyIHdrcyA9IHJlcXVpcmUoJy4vX3drcycpO1xudmFyIHJlZ2V4cEV4ZWMgPSByZXF1aXJlKCcuL19yZWdleHAtZXhlYycpO1xuXG52YXIgU1BFQ0lFUyA9IHdrcygnc3BlY2llcycpO1xuXG52YXIgUkVQTEFDRV9TVVBQT1JUU19OQU1FRF9HUk9VUFMgPSAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICAvLyAjcmVwbGFjZSBuZWVkcyBidWlsdC1pbiBzdXBwb3J0IGZvciBuYW1lZCBncm91cHMuXG4gIC8vICNtYXRjaCB3b3JrcyBmaW5lIGJlY2F1c2UgaXQganVzdCByZXR1cm4gdGhlIGV4ZWMgcmVzdWx0cywgZXZlbiBpZiBpdCBoYXNcbiAgLy8gYSBcImdyb3BzXCIgcHJvcGVydHkuXG4gIHZhciByZSA9IC8uLztcbiAgcmUuZXhlYyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgcmVzdWx0Lmdyb3VwcyA9IHsgYTogJzcnIH07XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcbiAgcmV0dXJuICcnLnJlcGxhY2UocmUsICckPGE+JykgIT09ICc3Jztcbn0pO1xuXG52YXIgU1BMSVRfV09SS1NfV0lUSF9PVkVSV1JJVFRFTl9FWEVDID0gKGZ1bmN0aW9uICgpIHtcbiAgLy8gQ2hyb21lIDUxIGhhcyBhIGJ1Z2d5IFwic3BsaXRcIiBpbXBsZW1lbnRhdGlvbiB3aGVuIFJlZ0V4cCNleGVjICE9PSBuYXRpdmVFeGVjXG4gIHZhciByZSA9IC8oPzopLztcbiAgdmFyIG9yaWdpbmFsRXhlYyA9IHJlLmV4ZWM7XG4gIHJlLmV4ZWMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBvcmlnaW5hbEV4ZWMuYXBwbHkodGhpcywgYXJndW1lbnRzKTsgfTtcbiAgdmFyIHJlc3VsdCA9ICdhYicuc3BsaXQocmUpO1xuICByZXR1cm4gcmVzdWx0Lmxlbmd0aCA9PT0gMiAmJiByZXN1bHRbMF0gPT09ICdhJyAmJiByZXN1bHRbMV0gPT09ICdiJztcbn0pKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKEtFWSwgbGVuZ3RoLCBleGVjKSB7XG4gIHZhciBTWU1CT0wgPSB3a3MoS0VZKTtcblxuICB2YXIgREVMRUdBVEVTX1RPX1NZTUJPTCA9ICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gICAgLy8gU3RyaW5nIG1ldGhvZHMgY2FsbCBzeW1ib2wtbmFtZWQgUmVnRXAgbWV0aG9kc1xuICAgIHZhciBPID0ge307XG4gICAgT1tTWU1CT0xdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gNzsgfTtcbiAgICByZXR1cm4gJydbS0VZXShPKSAhPSA3O1xuICB9KTtcblxuICB2YXIgREVMRUdBVEVTX1RPX0VYRUMgPSBERUxFR0FURVNfVE9fU1lNQk9MID8gIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgICAvLyBTeW1ib2wtbmFtZWQgUmVnRXhwIG1ldGhvZHMgY2FsbCAuZXhlY1xuICAgIHZhciBleGVjQ2FsbGVkID0gZmFsc2U7XG4gICAgdmFyIHJlID0gL2EvO1xuICAgIHJlLmV4ZWMgPSBmdW5jdGlvbiAoKSB7IGV4ZWNDYWxsZWQgPSB0cnVlOyByZXR1cm4gbnVsbDsgfTtcbiAgICBpZiAoS0VZID09PSAnc3BsaXQnKSB7XG4gICAgICAvLyBSZWdFeHBbQEBzcGxpdF0gZG9lc24ndCBjYWxsIHRoZSByZWdleCdzIGV4ZWMgbWV0aG9kLCBidXQgZmlyc3QgY3JlYXRlc1xuICAgICAgLy8gYSBuZXcgb25lLiBXZSBuZWVkIHRvIHJldHVybiB0aGUgcGF0Y2hlZCByZWdleCB3aGVuIGNyZWF0aW5nIHRoZSBuZXcgb25lLlxuICAgICAgcmUuY29uc3RydWN0b3IgPSB7fTtcbiAgICAgIHJlLmNvbnN0cnVjdG9yW1NQRUNJRVNdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gcmU7IH07XG4gICAgfVxuICAgIHJlW1NZTUJPTF0oJycpO1xuICAgIHJldHVybiAhZXhlY0NhbGxlZDtcbiAgfSkgOiB1bmRlZmluZWQ7XG5cbiAgaWYgKFxuICAgICFERUxFR0FURVNfVE9fU1lNQk9MIHx8XG4gICAgIURFTEVHQVRFU19UT19FWEVDIHx8XG4gICAgKEtFWSA9PT0gJ3JlcGxhY2UnICYmICFSRVBMQUNFX1NVUFBPUlRTX05BTUVEX0dST1VQUykgfHxcbiAgICAoS0VZID09PSAnc3BsaXQnICYmICFTUExJVF9XT1JLU19XSVRIX09WRVJXUklUVEVOX0VYRUMpXG4gICkge1xuICAgIHZhciBuYXRpdmVSZWdFeHBNZXRob2QgPSAvLi9bU1lNQk9MXTtcbiAgICB2YXIgZm5zID0gZXhlYyhcbiAgICAgIGRlZmluZWQsXG4gICAgICBTWU1CT0wsXG4gICAgICAnJ1tLRVldLFxuICAgICAgZnVuY3Rpb24gbWF5YmVDYWxsTmF0aXZlKG5hdGl2ZU1ldGhvZCwgcmVnZXhwLCBzdHIsIGFyZzIsIGZvcmNlU3RyaW5nTWV0aG9kKSB7XG4gICAgICAgIGlmIChyZWdleHAuZXhlYyA9PT0gcmVnZXhwRXhlYykge1xuICAgICAgICAgIGlmIChERUxFR0FURVNfVE9fU1lNQk9MICYmICFmb3JjZVN0cmluZ01ldGhvZCkge1xuICAgICAgICAgICAgLy8gVGhlIG5hdGl2ZSBTdHJpbmcgbWV0aG9kIGFscmVhZHkgZGVsZWdhdGVzIHRvIEBAbWV0aG9kICh0aGlzXG4gICAgICAgICAgICAvLyBwb2x5ZmlsbGVkIGZ1bmN0aW9uKSwgbGVhc2luZyB0byBpbmZpbml0ZSByZWN1cnNpb24uXG4gICAgICAgICAgICAvLyBXZSBhdm9pZCBpdCBieSBkaXJlY3RseSBjYWxsaW5nIHRoZSBuYXRpdmUgQEBtZXRob2QgbWV0aG9kLlxuICAgICAgICAgICAgcmV0dXJuIHsgZG9uZTogdHJ1ZSwgdmFsdWU6IG5hdGl2ZVJlZ0V4cE1ldGhvZC5jYWxsKHJlZ2V4cCwgc3RyLCBhcmcyKSB9O1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4geyBkb25lOiB0cnVlLCB2YWx1ZTogbmF0aXZlTWV0aG9kLmNhbGwoc3RyLCByZWdleHAsIGFyZzIpIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgZG9uZTogZmFsc2UgfTtcbiAgICAgIH1cbiAgICApO1xuICAgIHZhciBzdHJmbiA9IGZuc1swXTtcbiAgICB2YXIgcnhmbiA9IGZuc1sxXTtcblxuICAgIHJlZGVmaW5lKFN0cmluZy5wcm90b3R5cGUsIEtFWSwgc3RyZm4pO1xuICAgIGhpZGUoUmVnRXhwLnByb3RvdHlwZSwgU1lNQk9MLCBsZW5ndGggPT0gMlxuICAgICAgLy8gMjEuMi41LjggUmVnRXhwLnByb3RvdHlwZVtAQHJlcGxhY2VdKHN0cmluZywgcmVwbGFjZVZhbHVlKVxuICAgICAgLy8gMjEuMi41LjExIFJlZ0V4cC5wcm90b3R5cGVbQEBzcGxpdF0oc3RyaW5nLCBsaW1pdClcbiAgICAgID8gZnVuY3Rpb24gKHN0cmluZywgYXJnKSB7IHJldHVybiByeGZuLmNhbGwoc3RyaW5nLCB0aGlzLCBhcmcpOyB9XG4gICAgICAvLyAyMS4yLjUuNiBSZWdFeHAucHJvdG90eXBlW0BAbWF0Y2hdKHN0cmluZylcbiAgICAgIC8vIDIxLjIuNS45IFJlZ0V4cC5wcm90b3R5cGVbQEBzZWFyY2hdKHN0cmluZylcbiAgICAgIDogZnVuY3Rpb24gKHN0cmluZykgeyByZXR1cm4gcnhmbi5jYWxsKHN0cmluZywgdGhpcyk7IH1cbiAgICApO1xuICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuLy8gMjEuMi41LjMgZ2V0IFJlZ0V4cC5wcm90b3R5cGUuZmxhZ3NcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciB0aGF0ID0gYW5PYmplY3QodGhpcyk7XG4gIHZhciByZXN1bHQgPSAnJztcbiAgaWYgKHRoYXQuZ2xvYmFsKSByZXN1bHQgKz0gJ2cnO1xuICBpZiAodGhhdC5pZ25vcmVDYXNlKSByZXN1bHQgKz0gJ2knO1xuICBpZiAodGhhdC5tdWx0aWxpbmUpIHJlc3VsdCArPSAnbSc7XG4gIGlmICh0aGF0LnVuaWNvZGUpIHJlc3VsdCArPSAndSc7XG4gIGlmICh0aGF0LnN0aWNreSkgcmVzdWx0ICs9ICd5JztcbiAgcmV0dXJuIHJlc3VsdDtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX3NoYXJlZCcpKCduYXRpdmUtZnVuY3Rpb24tdG8tc3RyaW5nJywgRnVuY3Rpb24udG9TdHJpbmcpO1xuIiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzg2I2lzc3VlY29tbWVudC0xMTU3NTkwMjhcbnZhciBnbG9iYWwgPSBtb2R1bGUuZXhwb3J0cyA9IHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93Lk1hdGggPT0gTWF0aFxuICA/IHdpbmRvdyA6IHR5cGVvZiBzZWxmICE9ICd1bmRlZmluZWQnICYmIHNlbGYuTWF0aCA9PSBNYXRoID8gc2VsZlxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmV3LWZ1bmNcbiAgOiBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuaWYgKHR5cGVvZiBfX2cgPT0gJ251bWJlcicpIF9fZyA9IGdsb2JhbDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuIiwidmFyIGhhc093blByb3BlcnR5ID0ge30uaGFzT3duUHJvcGVydHk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCwga2V5KSB7XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGl0LCBrZXkpO1xufTtcbiIsInZhciBkUCA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpO1xudmFyIGNyZWF0ZURlc2MgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBmdW5jdGlvbiAob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIHJldHVybiBkUC5mKG9iamVjdCwga2V5LCBjcmVhdGVEZXNjKDEsIHZhbHVlKSk7XG59IDogZnVuY3Rpb24gKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICByZXR1cm4gb2JqZWN0O1xufTtcbiIsInZhciBkb2N1bWVudCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLmRvY3VtZW50O1xubW9kdWxlLmV4cG9ydHMgPSBkb2N1bWVudCAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4iLCJtb2R1bGUuZXhwb3J0cyA9ICFyZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpICYmICFyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyZXF1aXJlKCcuL19kb20tY3JlYXRlJykoJ2RpdicpLCAnYScsIHsgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9IH0pLmEgIT0gNztcbn0pO1xuIiwiLy8gZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBhbmQgbm9uLWVudW1lcmFibGUgb2xkIFY4IHN0cmluZ3NcbnZhciBjb2YgPSByZXF1aXJlKCcuL19jb2YnKTtcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnNcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0KCd6JykucHJvcGVydHlJc0VudW1lcmFibGUoMCkgPyBPYmplY3QgOiBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGNvZihpdCkgPT0gJ1N0cmluZycgPyBpdC5zcGxpdCgnJykgOiBPYmplY3QoaXQpO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiB0eXBlb2YgaXQgPT09ICdvYmplY3QnID8gaXQgIT09IG51bGwgOiB0eXBlb2YgaXQgPT09ICdmdW5jdGlvbic7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGNyZWF0ZSA9IHJlcXVpcmUoJy4vX29iamVjdC1jcmVhdGUnKTtcbnZhciBkZXNjcmlwdG9yID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpO1xudmFyIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKTtcbnZhciBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuXG4vLyAyNS4xLjIuMS4xICVJdGVyYXRvclByb3RvdHlwZSVbQEBpdGVyYXRvcl0oKVxucmVxdWlyZSgnLi9faGlkZScpKEl0ZXJhdG9yUHJvdG90eXBlLCByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKSwgZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KSB7XG4gIENvbnN0cnVjdG9yLnByb3RvdHlwZSA9IGNyZWF0ZShJdGVyYXRvclByb3RvdHlwZSwgeyBuZXh0OiBkZXNjcmlwdG9yKDEsIG5leHQpIH0pO1xuICBzZXRUb1N0cmluZ1RhZyhDb25zdHJ1Y3RvciwgTkFNRSArICcgSXRlcmF0b3InKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgTElCUkFSWSA9IHJlcXVpcmUoJy4vX2xpYnJhcnknKTtcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgcmVkZWZpbmUgPSByZXF1aXJlKCcuL19yZWRlZmluZScpO1xudmFyIGhpZGUgPSByZXF1aXJlKCcuL19oaWRlJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJyk7XG52YXIgJGl0ZXJDcmVhdGUgPSByZXF1aXJlKCcuL19pdGVyLWNyZWF0ZScpO1xudmFyIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKTtcbnZhciBnZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4vX29iamVjdC1ncG8nKTtcbnZhciBJVEVSQVRPUiA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpO1xudmFyIEJVR0dZID0gIShbXS5rZXlzICYmICduZXh0JyBpbiBbXS5rZXlzKCkpOyAvLyBTYWZhcmkgaGFzIGJ1Z2d5IGl0ZXJhdG9ycyB3L28gYG5leHRgXG52YXIgRkZfSVRFUkFUT1IgPSAnQEBpdGVyYXRvcic7XG52YXIgS0VZUyA9ICdrZXlzJztcbnZhciBWQUxVRVMgPSAndmFsdWVzJztcblxudmFyIHJldHVyblRoaXMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChCYXNlLCBOQU1FLCBDb25zdHJ1Y3RvciwgbmV4dCwgREVGQVVMVCwgSVNfU0VULCBGT1JDRUQpIHtcbiAgJGl0ZXJDcmVhdGUoQ29uc3RydWN0b3IsIE5BTUUsIG5leHQpO1xuICB2YXIgZ2V0TWV0aG9kID0gZnVuY3Rpb24gKGtpbmQpIHtcbiAgICBpZiAoIUJVR0dZICYmIGtpbmQgaW4gcHJvdG8pIHJldHVybiBwcm90b1traW5kXTtcbiAgICBzd2l0Y2ggKGtpbmQpIHtcbiAgICAgIGNhc2UgS0VZUzogcmV0dXJuIGZ1bmN0aW9uIGtleXMoKSB7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gICAgICBjYXNlIFZBTFVFUzogcmV0dXJuIGZ1bmN0aW9uIHZhbHVlcygpIHsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgICB9IHJldHVybiBmdW5jdGlvbiBlbnRyaWVzKCkgeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICB9O1xuICB2YXIgVEFHID0gTkFNRSArICcgSXRlcmF0b3InO1xuICB2YXIgREVGX1ZBTFVFUyA9IERFRkFVTFQgPT0gVkFMVUVTO1xuICB2YXIgVkFMVUVTX0JVRyA9IGZhbHNlO1xuICB2YXIgcHJvdG8gPSBCYXNlLnByb3RvdHlwZTtcbiAgdmFyICRuYXRpdmUgPSBwcm90b1tJVEVSQVRPUl0gfHwgcHJvdG9bRkZfSVRFUkFUT1JdIHx8IERFRkFVTFQgJiYgcHJvdG9bREVGQVVMVF07XG4gIHZhciAkZGVmYXVsdCA9ICRuYXRpdmUgfHwgZ2V0TWV0aG9kKERFRkFVTFQpO1xuICB2YXIgJGVudHJpZXMgPSBERUZBVUxUID8gIURFRl9WQUxVRVMgPyAkZGVmYXVsdCA6IGdldE1ldGhvZCgnZW50cmllcycpIDogdW5kZWZpbmVkO1xuICB2YXIgJGFueU5hdGl2ZSA9IE5BTUUgPT0gJ0FycmF5JyA/IHByb3RvLmVudHJpZXMgfHwgJG5hdGl2ZSA6ICRuYXRpdmU7XG4gIHZhciBtZXRob2RzLCBrZXksIEl0ZXJhdG9yUHJvdG90eXBlO1xuICAvLyBGaXggbmF0aXZlXG4gIGlmICgkYW55TmF0aXZlKSB7XG4gICAgSXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90b3R5cGVPZigkYW55TmF0aXZlLmNhbGwobmV3IEJhc2UoKSkpO1xuICAgIGlmIChJdGVyYXRvclByb3RvdHlwZSAhPT0gT2JqZWN0LnByb3RvdHlwZSAmJiBJdGVyYXRvclByb3RvdHlwZS5uZXh0KSB7XG4gICAgICAvLyBTZXQgQEB0b1N0cmluZ1RhZyB0byBuYXRpdmUgaXRlcmF0b3JzXG4gICAgICBzZXRUb1N0cmluZ1RhZyhJdGVyYXRvclByb3RvdHlwZSwgVEFHLCB0cnVlKTtcbiAgICAgIC8vIGZpeCBmb3Igc29tZSBvbGQgZW5naW5lc1xuICAgICAgaWYgKCFMSUJSQVJZICYmIHR5cGVvZiBJdGVyYXRvclByb3RvdHlwZVtJVEVSQVRPUl0gIT0gJ2Z1bmN0aW9uJykgaGlkZShJdGVyYXRvclByb3RvdHlwZSwgSVRFUkFUT1IsIHJldHVyblRoaXMpO1xuICAgIH1cbiAgfVxuICAvLyBmaXggQXJyYXkje3ZhbHVlcywgQEBpdGVyYXRvcn0ubmFtZSBpbiBWOCAvIEZGXG4gIGlmIChERUZfVkFMVUVTICYmICRuYXRpdmUgJiYgJG5hdGl2ZS5uYW1lICE9PSBWQUxVRVMpIHtcbiAgICBWQUxVRVNfQlVHID0gdHJ1ZTtcbiAgICAkZGVmYXVsdCA9IGZ1bmN0aW9uIHZhbHVlcygpIHsgcmV0dXJuICRuYXRpdmUuY2FsbCh0aGlzKTsgfTtcbiAgfVxuICAvLyBEZWZpbmUgaXRlcmF0b3JcbiAgaWYgKCghTElCUkFSWSB8fCBGT1JDRUQpICYmIChCVUdHWSB8fCBWQUxVRVNfQlVHIHx8ICFwcm90b1tJVEVSQVRPUl0pKSB7XG4gICAgaGlkZShwcm90bywgSVRFUkFUT1IsICRkZWZhdWx0KTtcbiAgfVxuICAvLyBQbHVnIGZvciBsaWJyYXJ5XG4gIEl0ZXJhdG9yc1tOQU1FXSA9ICRkZWZhdWx0O1xuICBJdGVyYXRvcnNbVEFHXSA9IHJldHVyblRoaXM7XG4gIGlmIChERUZBVUxUKSB7XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIHZhbHVlczogREVGX1ZBTFVFUyA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKFZBTFVFUyksXG4gICAgICBrZXlzOiBJU19TRVQgPyAkZGVmYXVsdCA6IGdldE1ldGhvZChLRVlTKSxcbiAgICAgIGVudHJpZXM6ICRlbnRyaWVzXG4gICAgfTtcbiAgICBpZiAoRk9SQ0VEKSBmb3IgKGtleSBpbiBtZXRob2RzKSB7XG4gICAgICBpZiAoIShrZXkgaW4gcHJvdG8pKSByZWRlZmluZShwcm90bywga2V5LCBtZXRob2RzW2tleV0pO1xuICAgIH0gZWxzZSAkZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqIChCVUdHWSB8fCBWQUxVRVNfQlVHKSwgTkFNRSwgbWV0aG9kcyk7XG4gIH1cbiAgcmV0dXJuIG1ldGhvZHM7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZG9uZSwgdmFsdWUpIHtcbiAgcmV0dXJuIHsgdmFsdWU6IHZhbHVlLCBkb25lOiAhIWRvbmUgfTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHt9O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmYWxzZTtcbiIsIi8vIDE5LjEuMi4yIC8gMTUuMi4zLjUgT2JqZWN0LmNyZWF0ZShPIFssIFByb3BlcnRpZXNdKVxudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgZFBzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwcycpO1xudmFyIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi9fZW51bS1idWcta2V5cycpO1xudmFyIElFX1BST1RPID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpO1xudmFyIEVtcHR5ID0gZnVuY3Rpb24gKCkgeyAvKiBlbXB0eSAqLyB9O1xudmFyIFBST1RPVFlQRSA9ICdwcm90b3R5cGUnO1xuXG4vLyBDcmVhdGUgb2JqZWN0IHdpdGggZmFrZSBgbnVsbGAgcHJvdG90eXBlOiB1c2UgaWZyYW1lIE9iamVjdCB3aXRoIGNsZWFyZWQgcHJvdG90eXBlXG52YXIgY3JlYXRlRGljdCA9IGZ1bmN0aW9uICgpIHtcbiAgLy8gVGhyYXNoLCB3YXN0ZSBhbmQgc29kb215OiBJRSBHQyBidWdcbiAgdmFyIGlmcmFtZSA9IHJlcXVpcmUoJy4vX2RvbS1jcmVhdGUnKSgnaWZyYW1lJyk7XG4gIHZhciBpID0gZW51bUJ1Z0tleXMubGVuZ3RoO1xuICB2YXIgbHQgPSAnPCc7XG4gIHZhciBndCA9ICc+JztcbiAgdmFyIGlmcmFtZURvY3VtZW50O1xuICBpZnJhbWUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgcmVxdWlyZSgnLi9faHRtbCcpLmFwcGVuZENoaWxkKGlmcmFtZSk7XG4gIGlmcmFtZS5zcmMgPSAnamF2YXNjcmlwdDonOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXNjcmlwdC11cmxcbiAgLy8gY3JlYXRlRGljdCA9IGlmcmFtZS5jb250ZW50V2luZG93Lk9iamVjdDtcbiAgLy8gaHRtbC5yZW1vdmVDaGlsZChpZnJhbWUpO1xuICBpZnJhbWVEb2N1bWVudCA9IGlmcmFtZS5jb250ZW50V2luZG93LmRvY3VtZW50O1xuICBpZnJhbWVEb2N1bWVudC5vcGVuKCk7XG4gIGlmcmFtZURvY3VtZW50LndyaXRlKGx0ICsgJ3NjcmlwdCcgKyBndCArICdkb2N1bWVudC5GPU9iamVjdCcgKyBsdCArICcvc2NyaXB0JyArIGd0KTtcbiAgaWZyYW1lRG9jdW1lbnQuY2xvc2UoKTtcbiAgY3JlYXRlRGljdCA9IGlmcmFtZURvY3VtZW50LkY7XG4gIHdoaWxlIChpLS0pIGRlbGV0ZSBjcmVhdGVEaWN0W1BST1RPVFlQRV1bZW51bUJ1Z0tleXNbaV1dO1xuICByZXR1cm4gY3JlYXRlRGljdCgpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuY3JlYXRlIHx8IGZ1bmN0aW9uIGNyZWF0ZShPLCBQcm9wZXJ0aWVzKSB7XG4gIHZhciByZXN1bHQ7XG4gIGlmIChPICE9PSBudWxsKSB7XG4gICAgRW1wdHlbUFJPVE9UWVBFXSA9IGFuT2JqZWN0KE8pO1xuICAgIHJlc3VsdCA9IG5ldyBFbXB0eSgpO1xuICAgIEVtcHR5W1BST1RPVFlQRV0gPSBudWxsO1xuICAgIC8vIGFkZCBcIl9fcHJvdG9fX1wiIGZvciBPYmplY3QuZ2V0UHJvdG90eXBlT2YgcG9seWZpbGxcbiAgICByZXN1bHRbSUVfUFJPVE9dID0gTztcbiAgfSBlbHNlIHJlc3VsdCA9IGNyZWF0ZURpY3QoKTtcbiAgcmV0dXJuIFByb3BlcnRpZXMgPT09IHVuZGVmaW5lZCA/IHJlc3VsdCA6IGRQcyhyZXN1bHQsIFByb3BlcnRpZXMpO1xufTtcbiIsInZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi9faWU4LWRvbS1kZWZpbmUnKTtcbnZhciB0b1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpO1xudmFyIGRQID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuXG5leHBvcnRzLmYgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gT2JqZWN0LmRlZmluZVByb3BlcnR5IDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcykge1xuICBhbk9iamVjdChPKTtcbiAgUCA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBhbk9iamVjdChBdHRyaWJ1dGVzKTtcbiAgaWYgKElFOF9ET01fREVGSU5FKSB0cnkge1xuICAgIHJldHVybiBkUChPLCBQLCBBdHRyaWJ1dGVzKTtcbiAgfSBjYXRjaCAoZSkgeyAvKiBlbXB0eSAqLyB9XG4gIGlmICgnZ2V0JyBpbiBBdHRyaWJ1dGVzIHx8ICdzZXQnIGluIEF0dHJpYnV0ZXMpIHRocm93IFR5cGVFcnJvcignQWNjZXNzb3JzIG5vdCBzdXBwb3J0ZWQhJyk7XG4gIGlmICgndmFsdWUnIGluIEF0dHJpYnV0ZXMpIE9bUF0gPSBBdHRyaWJ1dGVzLnZhbHVlO1xuICByZXR1cm4gTztcbn07XG4iLCJ2YXIgZFAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIGdldEtleXMgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXMoTywgUHJvcGVydGllcykge1xuICBhbk9iamVjdChPKTtcbiAgdmFyIGtleXMgPSBnZXRLZXlzKFByb3BlcnRpZXMpO1xuICB2YXIgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG4gIHZhciBpID0gMDtcbiAgdmFyIFA7XG4gIHdoaWxlIChsZW5ndGggPiBpKSBkUC5mKE8sIFAgPSBrZXlzW2krK10sIFByb3BlcnRpZXNbUF0pO1xuICByZXR1cm4gTztcbn07XG4iLCIvLyAxOS4xLjIuOSAvIDE1LjIuMy4yIE9iamVjdC5nZXRQcm90b3R5cGVPZihPKVxudmFyIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0Jyk7XG52YXIgSUVfUFJPVE8gPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJyk7XG52YXIgT2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5nZXRQcm90b3R5cGVPZiB8fCBmdW5jdGlvbiAoTykge1xuICBPID0gdG9PYmplY3QoTyk7XG4gIGlmIChoYXMoTywgSUVfUFJPVE8pKSByZXR1cm4gT1tJRV9QUk9UT107XG4gIGlmICh0eXBlb2YgTy5jb25zdHJ1Y3RvciA9PSAnZnVuY3Rpb24nICYmIE8gaW5zdGFuY2VvZiBPLmNvbnN0cnVjdG9yKSB7XG4gICAgcmV0dXJuIE8uY29uc3RydWN0b3IucHJvdG90eXBlO1xuICB9IHJldHVybiBPIGluc3RhbmNlb2YgT2JqZWN0ID8gT2JqZWN0UHJvdG8gOiBudWxsO1xufTtcbiIsInZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG52YXIgYXJyYXlJbmRleE9mID0gcmVxdWlyZSgnLi9fYXJyYXktaW5jbHVkZXMnKShmYWxzZSk7XG52YXIgSUVfUFJPVE8gPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iamVjdCwgbmFtZXMpIHtcbiAgdmFyIE8gPSB0b0lPYmplY3Qob2JqZWN0KTtcbiAgdmFyIGkgPSAwO1xuICB2YXIgcmVzdWx0ID0gW107XG4gIHZhciBrZXk7XG4gIGZvciAoa2V5IGluIE8pIGlmIChrZXkgIT0gSUVfUFJPVE8pIGhhcyhPLCBrZXkpICYmIHJlc3VsdC5wdXNoKGtleSk7XG4gIC8vIERvbid0IGVudW0gYnVnICYgaGlkZGVuIGtleXNcbiAgd2hpbGUgKG5hbWVzLmxlbmd0aCA+IGkpIGlmIChoYXMoTywga2V5ID0gbmFtZXNbaSsrXSkpIHtcbiAgICB+YXJyYXlJbmRleE9mKHJlc3VsdCwga2V5KSB8fCByZXN1bHQucHVzaChrZXkpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59O1xuIiwiLy8gMTkuMS4yLjE0IC8gMTUuMi4zLjE0IE9iamVjdC5rZXlzKE8pXG52YXIgJGtleXMgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cy1pbnRlcm5hbCcpO1xudmFyIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi9fZW51bS1idWcta2V5cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5rZXlzIHx8IGZ1bmN0aW9uIGtleXMoTykge1xuICByZXR1cm4gJGtleXMoTywgZW51bUJ1Z0tleXMpO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGJpdG1hcCwgdmFsdWUpIHtcbiAgcmV0dXJuIHtcbiAgICBlbnVtZXJhYmxlOiAhKGJpdG1hcCAmIDEpLFxuICAgIGNvbmZpZ3VyYWJsZTogIShiaXRtYXAgJiAyKSxcbiAgICB3cml0YWJsZTogIShiaXRtYXAgJiA0KSxcbiAgICB2YWx1ZTogdmFsdWVcbiAgfTtcbn07XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgaGlkZSA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciBTUkMgPSByZXF1aXJlKCcuL191aWQnKSgnc3JjJyk7XG52YXIgJHRvU3RyaW5nID0gcmVxdWlyZSgnLi9fZnVuY3Rpb24tdG8tc3RyaW5nJyk7XG52YXIgVE9fU1RSSU5HID0gJ3RvU3RyaW5nJztcbnZhciBUUEwgPSAoJycgKyAkdG9TdHJpbmcpLnNwbGl0KFRPX1NUUklORyk7XG5cbnJlcXVpcmUoJy4vX2NvcmUnKS5pbnNwZWN0U291cmNlID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiAkdG9TdHJpbmcuY2FsbChpdCk7XG59O1xuXG4obW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoTywga2V5LCB2YWwsIHNhZmUpIHtcbiAgdmFyIGlzRnVuY3Rpb24gPSB0eXBlb2YgdmFsID09ICdmdW5jdGlvbic7XG4gIGlmIChpc0Z1bmN0aW9uKSBoYXModmFsLCAnbmFtZScpIHx8IGhpZGUodmFsLCAnbmFtZScsIGtleSk7XG4gIGlmIChPW2tleV0gPT09IHZhbCkgcmV0dXJuO1xuICBpZiAoaXNGdW5jdGlvbikgaGFzKHZhbCwgU1JDKSB8fCBoaWRlKHZhbCwgU1JDLCBPW2tleV0gPyAnJyArIE9ba2V5XSA6IFRQTC5qb2luKFN0cmluZyhrZXkpKSk7XG4gIGlmIChPID09PSBnbG9iYWwpIHtcbiAgICBPW2tleV0gPSB2YWw7XG4gIH0gZWxzZSBpZiAoIXNhZmUpIHtcbiAgICBkZWxldGUgT1trZXldO1xuICAgIGhpZGUoTywga2V5LCB2YWwpO1xuICB9IGVsc2UgaWYgKE9ba2V5XSkge1xuICAgIE9ba2V5XSA9IHZhbDtcbiAgfSBlbHNlIHtcbiAgICBoaWRlKE8sIGtleSwgdmFsKTtcbiAgfVxuLy8gYWRkIGZha2UgRnVuY3Rpb24jdG9TdHJpbmcgZm9yIGNvcnJlY3Qgd29yayB3cmFwcGVkIG1ldGhvZHMgLyBjb25zdHJ1Y3RvcnMgd2l0aCBtZXRob2RzIGxpa2UgTG9EYXNoIGlzTmF0aXZlXG59KShGdW5jdGlvbi5wcm90b3R5cGUsIFRPX1NUUklORywgZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gIHJldHVybiB0eXBlb2YgdGhpcyA9PSAnZnVuY3Rpb24nICYmIHRoaXNbU1JDXSB8fCAkdG9TdHJpbmcuY2FsbCh0aGlzKTtcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4vX2NsYXNzb2YnKTtcbnZhciBidWlsdGluRXhlYyA9IFJlZ0V4cC5wcm90b3R5cGUuZXhlYztcblxuIC8vIGBSZWdFeHBFeGVjYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXJlZ2V4cGV4ZWNcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKFIsIFMpIHtcbiAgdmFyIGV4ZWMgPSBSLmV4ZWM7XG4gIGlmICh0eXBlb2YgZXhlYyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHZhciByZXN1bHQgPSBleGVjLmNhbGwoUiwgUyk7XG4gICAgaWYgKHR5cGVvZiByZXN1bHQgIT09ICdvYmplY3QnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdSZWdFeHAgZXhlYyBtZXRob2QgcmV0dXJuZWQgc29tZXRoaW5nIG90aGVyIHRoYW4gYW4gT2JqZWN0IG9yIG51bGwnKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICBpZiAoY2xhc3NvZihSKSAhPT0gJ1JlZ0V4cCcpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdSZWdFeHAjZXhlYyBjYWxsZWQgb24gaW5jb21wYXRpYmxlIHJlY2VpdmVyJyk7XG4gIH1cbiAgcmV0dXJuIGJ1aWx0aW5FeGVjLmNhbGwoUiwgUyk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgcmVnZXhwRmxhZ3MgPSByZXF1aXJlKCcuL19mbGFncycpO1xuXG52YXIgbmF0aXZlRXhlYyA9IFJlZ0V4cC5wcm90b3R5cGUuZXhlYztcbi8vIFRoaXMgYWx3YXlzIHJlZmVycyB0byB0aGUgbmF0aXZlIGltcGxlbWVudGF0aW9uLCBiZWNhdXNlIHRoZVxuLy8gU3RyaW5nI3JlcGxhY2UgcG9seWZpbGwgdXNlcyAuL2ZpeC1yZWdleHAtd2VsbC1rbm93bi1zeW1ib2wtbG9naWMuanMsXG4vLyB3aGljaCBsb2FkcyB0aGlzIGZpbGUgYmVmb3JlIHBhdGNoaW5nIHRoZSBtZXRob2QuXG52YXIgbmF0aXZlUmVwbGFjZSA9IFN0cmluZy5wcm90b3R5cGUucmVwbGFjZTtcblxudmFyIHBhdGNoZWRFeGVjID0gbmF0aXZlRXhlYztcblxudmFyIExBU1RfSU5ERVggPSAnbGFzdEluZGV4JztcblxudmFyIFVQREFURVNfTEFTVF9JTkRFWF9XUk9ORyA9IChmdW5jdGlvbiAoKSB7XG4gIHZhciByZTEgPSAvYS8sXG4gICAgICByZTIgPSAvYiovZztcbiAgbmF0aXZlRXhlYy5jYWxsKHJlMSwgJ2EnKTtcbiAgbmF0aXZlRXhlYy5jYWxsKHJlMiwgJ2EnKTtcbiAgcmV0dXJuIHJlMVtMQVNUX0lOREVYXSAhPT0gMCB8fCByZTJbTEFTVF9JTkRFWF0gIT09IDA7XG59KSgpO1xuXG4vLyBub25wYXJ0aWNpcGF0aW5nIGNhcHR1cmluZyBncm91cCwgY29waWVkIGZyb20gZXM1LXNoaW0ncyBTdHJpbmcjc3BsaXQgcGF0Y2guXG52YXIgTlBDR19JTkNMVURFRCA9IC8oKT8/Ly5leGVjKCcnKVsxXSAhPT0gdW5kZWZpbmVkO1xuXG52YXIgUEFUQ0ggPSBVUERBVEVTX0xBU1RfSU5ERVhfV1JPTkcgfHwgTlBDR19JTkNMVURFRDtcblxuaWYgKFBBVENIKSB7XG4gIHBhdGNoZWRFeGVjID0gZnVuY3Rpb24gZXhlYyhzdHIpIHtcbiAgICB2YXIgcmUgPSB0aGlzO1xuICAgIHZhciBsYXN0SW5kZXgsIHJlQ29weSwgbWF0Y2gsIGk7XG5cbiAgICBpZiAoTlBDR19JTkNMVURFRCkge1xuICAgICAgcmVDb3B5ID0gbmV3IFJlZ0V4cCgnXicgKyByZS5zb3VyY2UgKyAnJCg/IVxcXFxzKScsIHJlZ2V4cEZsYWdzLmNhbGwocmUpKTtcbiAgICB9XG4gICAgaWYgKFVQREFURVNfTEFTVF9JTkRFWF9XUk9ORykgbGFzdEluZGV4ID0gcmVbTEFTVF9JTkRFWF07XG5cbiAgICBtYXRjaCA9IG5hdGl2ZUV4ZWMuY2FsbChyZSwgc3RyKTtcblxuICAgIGlmIChVUERBVEVTX0xBU1RfSU5ERVhfV1JPTkcgJiYgbWF0Y2gpIHtcbiAgICAgIHJlW0xBU1RfSU5ERVhdID0gcmUuZ2xvYmFsID8gbWF0Y2guaW5kZXggKyBtYXRjaFswXS5sZW5ndGggOiBsYXN0SW5kZXg7XG4gICAgfVxuICAgIGlmIChOUENHX0lOQ0xVREVEICYmIG1hdGNoICYmIG1hdGNoLmxlbmd0aCA+IDEpIHtcbiAgICAgIC8vIEZpeCBicm93c2VycyB3aG9zZSBgZXhlY2AgbWV0aG9kcyBkb24ndCBjb25zaXN0ZW50bHkgcmV0dXJuIGB1bmRlZmluZWRgXG4gICAgICAvLyBmb3IgTlBDRywgbGlrZSBJRTguIE5PVEU6IFRoaXMgZG9lc24nIHdvcmsgZm9yIC8oLj8pPy9cbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1sb29wLWZ1bmNcbiAgICAgIG5hdGl2ZVJlcGxhY2UuY2FsbChtYXRjaFswXSwgcmVDb3B5LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZvciAoaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoIC0gMjsgaSsrKSB7XG4gICAgICAgICAgaWYgKGFyZ3VtZW50c1tpXSA9PT0gdW5kZWZpbmVkKSBtYXRjaFtpXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hdGNoO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHBhdGNoZWRFeGVjO1xuIiwidmFyIGRlZiA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmY7XG52YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgVEFHID0gcmVxdWlyZSgnLi9fd2tzJykoJ3RvU3RyaW5nVGFnJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCB0YWcsIHN0YXQpIHtcbiAgaWYgKGl0ICYmICFoYXMoaXQgPSBzdGF0ID8gaXQgOiBpdC5wcm90b3R5cGUsIFRBRykpIGRlZihpdCwgVEFHLCB7IGNvbmZpZ3VyYWJsZTogdHJ1ZSwgdmFsdWU6IHRhZyB9KTtcbn07XG4iLCJ2YXIgc2hhcmVkID0gcmVxdWlyZSgnLi9fc2hhcmVkJykoJ2tleXMnKTtcbnZhciB1aWQgPSByZXF1aXJlKCcuL191aWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gc2hhcmVkW2tleV0gfHwgKHNoYXJlZFtrZXldID0gdWlkKGtleSkpO1xufTtcbiIsInZhciBjb3JlID0gcmVxdWlyZSgnLi9fY29yZScpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIFNIQVJFRCA9ICdfX2NvcmUtanNfc2hhcmVkX18nO1xudmFyIHN0b3JlID0gZ2xvYmFsW1NIQVJFRF0gfHwgKGdsb2JhbFtTSEFSRURdID0ge30pO1xuXG4obW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICByZXR1cm4gc3RvcmVba2V5XSB8fCAoc3RvcmVba2V5XSA9IHZhbHVlICE9PSB1bmRlZmluZWQgPyB2YWx1ZSA6IHt9KTtcbn0pKCd2ZXJzaW9ucycsIFtdKS5wdXNoKHtcbiAgdmVyc2lvbjogY29yZS52ZXJzaW9uLFxuICBtb2RlOiByZXF1aXJlKCcuL19saWJyYXJ5JykgPyAncHVyZScgOiAnZ2xvYmFsJyxcbiAgY29weXJpZ2h0OiAnwqkgMjAxOSBEZW5pcyBQdXNoa2FyZXYgKHpsb2lyb2NrLnJ1KSdcbn0pO1xuIiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKTtcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xuLy8gdHJ1ZSAgLT4gU3RyaW5nI2F0XG4vLyBmYWxzZSAtPiBTdHJpbmcjY29kZVBvaW50QXRcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKFRPX1NUUklORykge1xuICByZXR1cm4gZnVuY3Rpb24gKHRoYXQsIHBvcykge1xuICAgIHZhciBzID0gU3RyaW5nKGRlZmluZWQodGhhdCkpO1xuICAgIHZhciBpID0gdG9JbnRlZ2VyKHBvcyk7XG4gICAgdmFyIGwgPSBzLmxlbmd0aDtcbiAgICB2YXIgYSwgYjtcbiAgICBpZiAoaSA8IDAgfHwgaSA+PSBsKSByZXR1cm4gVE9fU1RSSU5HID8gJycgOiB1bmRlZmluZWQ7XG4gICAgYSA9IHMuY2hhckNvZGVBdChpKTtcbiAgICByZXR1cm4gYSA8IDB4ZDgwMCB8fCBhID4gMHhkYmZmIHx8IGkgKyAxID09PSBsIHx8IChiID0gcy5jaGFyQ29kZUF0KGkgKyAxKSkgPCAweGRjMDAgfHwgYiA+IDB4ZGZmZlxuICAgICAgPyBUT19TVFJJTkcgPyBzLmNoYXJBdChpKSA6IGFcbiAgICAgIDogVE9fU1RSSU5HID8gcy5zbGljZShpLCBpICsgMikgOiAoYSAtIDB4ZDgwMCA8PCAxMCkgKyAoYiAtIDB4ZGMwMCkgKyAweDEwMDAwO1xuICB9O1xufTtcbiIsInZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJyk7XG52YXIgbWF4ID0gTWF0aC5tYXg7XG52YXIgbWluID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpbmRleCwgbGVuZ3RoKSB7XG4gIGluZGV4ID0gdG9JbnRlZ2VyKGluZGV4KTtcbiAgcmV0dXJuIGluZGV4IDwgMCA/IG1heChpbmRleCArIGxlbmd0aCwgMCkgOiBtaW4oaW5kZXgsIGxlbmd0aCk7XG59O1xuIiwiLy8gNy4xLjQgVG9JbnRlZ2VyXG52YXIgY2VpbCA9IE1hdGguY2VpbDtcbnZhciBmbG9vciA9IE1hdGguZmxvb3I7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXNOYU4oaXQgPSAraXQpID8gMCA6IChpdCA+IDAgPyBmbG9vciA6IGNlaWwpKGl0KTtcbn07XG4iLCIvLyB0byBpbmRleGVkIG9iamVjdCwgdG9PYmplY3Qgd2l0aCBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIHN0cmluZ3NcbnZhciBJT2JqZWN0ID0gcmVxdWlyZSgnLi9faW9iamVjdCcpO1xudmFyIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gSU9iamVjdChkZWZpbmVkKGl0KSk7XG59O1xuIiwiLy8gNy4xLjE1IFRvTGVuZ3RoXG52YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpO1xudmFyIG1pbiA9IE1hdGgubWluO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGl0ID4gMCA/IG1pbih0b0ludGVnZXIoaXQpLCAweDFmZmZmZmZmZmZmZmZmKSA6IDA7IC8vIHBvdygyLCA1MykgLSAxID09IDkwMDcxOTkyNTQ3NDA5OTFcbn07XG4iLCIvLyA3LjEuMTMgVG9PYmplY3QoYXJndW1lbnQpXG52YXIgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBPYmplY3QoZGVmaW5lZChpdCkpO1xufTtcbiIsIi8vIDcuMS4xIFRvUHJpbWl0aXZlKGlucHV0IFssIFByZWZlcnJlZFR5cGVdKVxudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG4vLyBpbnN0ZWFkIG9mIHRoZSBFUzYgc3BlYyB2ZXJzaW9uLCB3ZSBkaWRuJ3QgaW1wbGVtZW50IEBAdG9QcmltaXRpdmUgY2FzZVxuLy8gYW5kIHRoZSBzZWNvbmQgYXJndW1lbnQgLSBmbGFnIC0gcHJlZmVycmVkIHR5cGUgaXMgYSBzdHJpbmdcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCBTKSB7XG4gIGlmICghaXNPYmplY3QoaXQpKSByZXR1cm4gaXQ7XG4gIHZhciBmbiwgdmFsO1xuICBpZiAoUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSkgcmV0dXJuIHZhbDtcbiAgaWYgKHR5cGVvZiAoZm4gPSBpdC52YWx1ZU9mKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpIHJldHVybiB2YWw7XG4gIGlmICghUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSkgcmV0dXJuIHZhbDtcbiAgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY29udmVydCBvYmplY3QgdG8gcHJpbWl0aXZlIHZhbHVlXCIpO1xufTtcbiIsInZhciBpZCA9IDA7XG52YXIgcHggPSBNYXRoLnJhbmRvbSgpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiAnU3ltYm9sKCcuY29uY2F0KGtleSA9PT0gdW5kZWZpbmVkID8gJycgOiBrZXksICcpXycsICgrK2lkICsgcHgpLnRvU3RyaW5nKDM2KSk7XG59O1xuIiwidmFyIHN0b3JlID0gcmVxdWlyZSgnLi9fc2hhcmVkJykoJ3drcycpO1xudmFyIHVpZCA9IHJlcXVpcmUoJy4vX3VpZCcpO1xudmFyIFN5bWJvbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLlN5bWJvbDtcbnZhciBVU0VfU1lNQk9MID0gdHlwZW9mIFN5bWJvbCA9PSAnZnVuY3Rpb24nO1xuXG52YXIgJGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gIHJldHVybiBzdG9yZVtuYW1lXSB8fCAoc3RvcmVbbmFtZV0gPVxuICAgIFVTRV9TWU1CT0wgJiYgU3ltYm9sW25hbWVdIHx8IChVU0VfU1lNQk9MID8gU3ltYm9sIDogdWlkKSgnU3ltYm9sLicgKyBuYW1lKSk7XG59O1xuXG4kZXhwb3J0cy5zdG9yZSA9IHN0b3JlO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGFkZFRvVW5zY29wYWJsZXMgPSByZXF1aXJlKCcuL19hZGQtdG8tdW5zY29wYWJsZXMnKTtcbnZhciBzdGVwID0gcmVxdWlyZSgnLi9faXRlci1zdGVwJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJyk7XG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xuXG4vLyAyMi4xLjMuNCBBcnJheS5wcm90b3R5cGUuZW50cmllcygpXG4vLyAyMi4xLjMuMTMgQXJyYXkucHJvdG90eXBlLmtleXMoKVxuLy8gMjIuMS4zLjI5IEFycmF5LnByb3RvdHlwZS52YWx1ZXMoKVxuLy8gMjIuMS4zLjMwIEFycmF5LnByb3RvdHlwZVtAQGl0ZXJhdG9yXSgpXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2l0ZXItZGVmaW5lJykoQXJyYXksICdBcnJheScsIGZ1bmN0aW9uIChpdGVyYXRlZCwga2luZCkge1xuICB0aGlzLl90ID0gdG9JT2JqZWN0KGl0ZXJhdGVkKTsgLy8gdGFyZ2V0XG4gIHRoaXMuX2kgPSAwOyAgICAgICAgICAgICAgICAgICAvLyBuZXh0IGluZGV4XG4gIHRoaXMuX2sgPSBraW5kOyAgICAgICAgICAgICAgICAvLyBraW5kXG4vLyAyMi4xLjUuMi4xICVBcnJheUl0ZXJhdG9yUHJvdG90eXBlJS5uZXh0KClcbn0sIGZ1bmN0aW9uICgpIHtcbiAgdmFyIE8gPSB0aGlzLl90O1xuICB2YXIga2luZCA9IHRoaXMuX2s7XG4gIHZhciBpbmRleCA9IHRoaXMuX2krKztcbiAgaWYgKCFPIHx8IGluZGV4ID49IE8ubGVuZ3RoKSB7XG4gICAgdGhpcy5fdCA9IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gc3RlcCgxKTtcbiAgfVxuICBpZiAoa2luZCA9PSAna2V5cycpIHJldHVybiBzdGVwKDAsIGluZGV4KTtcbiAgaWYgKGtpbmQgPT0gJ3ZhbHVlcycpIHJldHVybiBzdGVwKDAsIE9baW5kZXhdKTtcbiAgcmV0dXJuIHN0ZXAoMCwgW2luZGV4LCBPW2luZGV4XV0pO1xufSwgJ3ZhbHVlcycpO1xuXG4vLyBhcmd1bWVudHNMaXN0W0BAaXRlcmF0b3JdIGlzICVBcnJheVByb3RvX3ZhbHVlcyUgKDkuNC40LjYsIDkuNC40LjcpXG5JdGVyYXRvcnMuQXJndW1lbnRzID0gSXRlcmF0b3JzLkFycmF5O1xuXG5hZGRUb1Vuc2NvcGFibGVzKCdrZXlzJyk7XG5hZGRUb1Vuc2NvcGFibGVzKCd2YWx1ZXMnKTtcbmFkZFRvVW5zY29wYWJsZXMoJ2VudHJpZXMnKTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciByZWdleHBFeGVjID0gcmVxdWlyZSgnLi9fcmVnZXhwLWV4ZWMnKTtcbnJlcXVpcmUoJy4vX2V4cG9ydCcpKHtcbiAgdGFyZ2V0OiAnUmVnRXhwJyxcbiAgcHJvdG86IHRydWUsXG4gIGZvcmNlZDogcmVnZXhwRXhlYyAhPT0gLy4vLmV4ZWNcbn0sIHtcbiAgZXhlYzogcmVnZXhwRXhlY1xufSk7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJyk7XG52YXIgYWR2YW5jZVN0cmluZ0luZGV4ID0gcmVxdWlyZSgnLi9fYWR2YW5jZS1zdHJpbmctaW5kZXgnKTtcbnZhciByZWdFeHBFeGVjID0gcmVxdWlyZSgnLi9fcmVnZXhwLWV4ZWMtYWJzdHJhY3QnKTtcblxuLy8gQEBtYXRjaCBsb2dpY1xucmVxdWlyZSgnLi9fZml4LXJlLXdrcycpKCdtYXRjaCcsIDEsIGZ1bmN0aW9uIChkZWZpbmVkLCBNQVRDSCwgJG1hdGNoLCBtYXliZUNhbGxOYXRpdmUpIHtcbiAgcmV0dXJuIFtcbiAgICAvLyBgU3RyaW5nLnByb3RvdHlwZS5tYXRjaGAgbWV0aG9kXG4gICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtc3RyaW5nLnByb3RvdHlwZS5tYXRjaFxuICAgIGZ1bmN0aW9uIG1hdGNoKHJlZ2V4cCkge1xuICAgICAgdmFyIE8gPSBkZWZpbmVkKHRoaXMpO1xuICAgICAgdmFyIGZuID0gcmVnZXhwID09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IHJlZ2V4cFtNQVRDSF07XG4gICAgICByZXR1cm4gZm4gIT09IHVuZGVmaW5lZCA/IGZuLmNhbGwocmVnZXhwLCBPKSA6IG5ldyBSZWdFeHAocmVnZXhwKVtNQVRDSF0oU3RyaW5nKE8pKTtcbiAgICB9LFxuICAgIC8vIGBSZWdFeHAucHJvdG90eXBlW0BAbWF0Y2hdYCBtZXRob2RcbiAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1yZWdleHAucHJvdG90eXBlLUBAbWF0Y2hcbiAgICBmdW5jdGlvbiAocmVnZXhwKSB7XG4gICAgICB2YXIgcmVzID0gbWF5YmVDYWxsTmF0aXZlKCRtYXRjaCwgcmVnZXhwLCB0aGlzKTtcbiAgICAgIGlmIChyZXMuZG9uZSkgcmV0dXJuIHJlcy52YWx1ZTtcbiAgICAgIHZhciByeCA9IGFuT2JqZWN0KHJlZ2V4cCk7XG4gICAgICB2YXIgUyA9IFN0cmluZyh0aGlzKTtcbiAgICAgIGlmICghcnguZ2xvYmFsKSByZXR1cm4gcmVnRXhwRXhlYyhyeCwgUyk7XG4gICAgICB2YXIgZnVsbFVuaWNvZGUgPSByeC51bmljb2RlO1xuICAgICAgcngubGFzdEluZGV4ID0gMDtcbiAgICAgIHZhciBBID0gW107XG4gICAgICB2YXIgbiA9IDA7XG4gICAgICB2YXIgcmVzdWx0O1xuICAgICAgd2hpbGUgKChyZXN1bHQgPSByZWdFeHBFeGVjKHJ4LCBTKSkgIT09IG51bGwpIHtcbiAgICAgICAgdmFyIG1hdGNoU3RyID0gU3RyaW5nKHJlc3VsdFswXSk7XG4gICAgICAgIEFbbl0gPSBtYXRjaFN0cjtcbiAgICAgICAgaWYgKG1hdGNoU3RyID09PSAnJykgcngubGFzdEluZGV4ID0gYWR2YW5jZVN0cmluZ0luZGV4KFMsIHRvTGVuZ3RoKHJ4Lmxhc3RJbmRleCksIGZ1bGxVbmljb2RlKTtcbiAgICAgICAgbisrO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG4gPT09IDAgPyBudWxsIDogQTtcbiAgICB9XG4gIF07XG59KTtcbiIsInZhciAkaXRlcmF0b3JzID0gcmVxdWlyZSgnLi9lczYuYXJyYXkuaXRlcmF0b3InKTtcbnZhciBnZXRLZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKTtcbnZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lJyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgaGlkZSA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKTtcbnZhciB3a3MgPSByZXF1aXJlKCcuL193a3MnKTtcbnZhciBJVEVSQVRPUiA9IHdrcygnaXRlcmF0b3InKTtcbnZhciBUT19TVFJJTkdfVEFHID0gd2tzKCd0b1N0cmluZ1RhZycpO1xudmFyIEFycmF5VmFsdWVzID0gSXRlcmF0b3JzLkFycmF5O1xuXG52YXIgRE9NSXRlcmFibGVzID0ge1xuICBDU1NSdWxlTGlzdDogdHJ1ZSwgLy8gVE9ETzogTm90IHNwZWMgY29tcGxpYW50LCBzaG91bGQgYmUgZmFsc2UuXG4gIENTU1N0eWxlRGVjbGFyYXRpb246IGZhbHNlLFxuICBDU1NWYWx1ZUxpc3Q6IGZhbHNlLFxuICBDbGllbnRSZWN0TGlzdDogZmFsc2UsXG4gIERPTVJlY3RMaXN0OiBmYWxzZSxcbiAgRE9NU3RyaW5nTGlzdDogZmFsc2UsXG4gIERPTVRva2VuTGlzdDogdHJ1ZSxcbiAgRGF0YVRyYW5zZmVySXRlbUxpc3Q6IGZhbHNlLFxuICBGaWxlTGlzdDogZmFsc2UsXG4gIEhUTUxBbGxDb2xsZWN0aW9uOiBmYWxzZSxcbiAgSFRNTENvbGxlY3Rpb246IGZhbHNlLFxuICBIVE1MRm9ybUVsZW1lbnQ6IGZhbHNlLFxuICBIVE1MU2VsZWN0RWxlbWVudDogZmFsc2UsXG4gIE1lZGlhTGlzdDogdHJ1ZSwgLy8gVE9ETzogTm90IHNwZWMgY29tcGxpYW50LCBzaG91bGQgYmUgZmFsc2UuXG4gIE1pbWVUeXBlQXJyYXk6IGZhbHNlLFxuICBOYW1lZE5vZGVNYXA6IGZhbHNlLFxuICBOb2RlTGlzdDogdHJ1ZSxcbiAgUGFpbnRSZXF1ZXN0TGlzdDogZmFsc2UsXG4gIFBsdWdpbjogZmFsc2UsXG4gIFBsdWdpbkFycmF5OiBmYWxzZSxcbiAgU1ZHTGVuZ3RoTGlzdDogZmFsc2UsXG4gIFNWR051bWJlckxpc3Q6IGZhbHNlLFxuICBTVkdQYXRoU2VnTGlzdDogZmFsc2UsXG4gIFNWR1BvaW50TGlzdDogZmFsc2UsXG4gIFNWR1N0cmluZ0xpc3Q6IGZhbHNlLFxuICBTVkdUcmFuc2Zvcm1MaXN0OiBmYWxzZSxcbiAgU291cmNlQnVmZmVyTGlzdDogZmFsc2UsXG4gIFN0eWxlU2hlZXRMaXN0OiB0cnVlLCAvLyBUT0RPOiBOb3Qgc3BlYyBjb21wbGlhbnQsIHNob3VsZCBiZSBmYWxzZS5cbiAgVGV4dFRyYWNrQ3VlTGlzdDogZmFsc2UsXG4gIFRleHRUcmFja0xpc3Q6IGZhbHNlLFxuICBUb3VjaExpc3Q6IGZhbHNlXG59O1xuXG5mb3IgKHZhciBjb2xsZWN0aW9ucyA9IGdldEtleXMoRE9NSXRlcmFibGVzKSwgaSA9IDA7IGkgPCBjb2xsZWN0aW9ucy5sZW5ndGg7IGkrKykge1xuICB2YXIgTkFNRSA9IGNvbGxlY3Rpb25zW2ldO1xuICB2YXIgZXhwbGljaXQgPSBET01JdGVyYWJsZXNbTkFNRV07XG4gIHZhciBDb2xsZWN0aW9uID0gZ2xvYmFsW05BTUVdO1xuICB2YXIgcHJvdG8gPSBDb2xsZWN0aW9uICYmIENvbGxlY3Rpb24ucHJvdG90eXBlO1xuICB2YXIga2V5O1xuICBpZiAocHJvdG8pIHtcbiAgICBpZiAoIXByb3RvW0lURVJBVE9SXSkgaGlkZShwcm90bywgSVRFUkFUT1IsIEFycmF5VmFsdWVzKTtcbiAgICBpZiAoIXByb3RvW1RPX1NUUklOR19UQUddKSBoaWRlKHByb3RvLCBUT19TVFJJTkdfVEFHLCBOQU1FKTtcbiAgICBJdGVyYXRvcnNbTkFNRV0gPSBBcnJheVZhbHVlcztcbiAgICBpZiAoZXhwbGljaXQpIGZvciAoa2V5IGluICRpdGVyYXRvcnMpIGlmICghcHJvdG9ba2V5XSkgcmVkZWZpbmUocHJvdG8sIGtleSwgJGl0ZXJhdG9yc1trZXldLCB0cnVlKTtcbiAgfVxufVxuIiwiY29uc3QgaW5zdGFuY2VPZkFueSA9IChvYmplY3QsIGNvbnN0cnVjdG9ycykgPT4gY29uc3RydWN0b3JzLnNvbWUoYyA9PiBvYmplY3QgaW5zdGFuY2VvZiBjKTtcblxubGV0IGlkYlByb3h5YWJsZVR5cGVzO1xyXG5sZXQgY3Vyc29yQWR2YW5jZU1ldGhvZHM7XHJcbi8vIFRoaXMgaXMgYSBmdW5jdGlvbiB0byBwcmV2ZW50IGl0IHRocm93aW5nIHVwIGluIG5vZGUgZW52aXJvbm1lbnRzLlxyXG5mdW5jdGlvbiBnZXRJZGJQcm94eWFibGVUeXBlcygpIHtcclxuICAgIHJldHVybiAoaWRiUHJveHlhYmxlVHlwZXMgfHxcclxuICAgICAgICAoaWRiUHJveHlhYmxlVHlwZXMgPSBbXHJcbiAgICAgICAgICAgIElEQkRhdGFiYXNlLFxyXG4gICAgICAgICAgICBJREJPYmplY3RTdG9yZSxcclxuICAgICAgICAgICAgSURCSW5kZXgsXHJcbiAgICAgICAgICAgIElEQkN1cnNvcixcclxuICAgICAgICAgICAgSURCVHJhbnNhY3Rpb24sXHJcbiAgICAgICAgXSkpO1xyXG59XHJcbi8vIFRoaXMgaXMgYSBmdW5jdGlvbiB0byBwcmV2ZW50IGl0IHRocm93aW5nIHVwIGluIG5vZGUgZW52aXJvbm1lbnRzLlxyXG5mdW5jdGlvbiBnZXRDdXJzb3JBZHZhbmNlTWV0aG9kcygpIHtcclxuICAgIHJldHVybiAoY3Vyc29yQWR2YW5jZU1ldGhvZHMgfHxcclxuICAgICAgICAoY3Vyc29yQWR2YW5jZU1ldGhvZHMgPSBbXHJcbiAgICAgICAgICAgIElEQkN1cnNvci5wcm90b3R5cGUuYWR2YW5jZSxcclxuICAgICAgICAgICAgSURCQ3Vyc29yLnByb3RvdHlwZS5jb250aW51ZSxcclxuICAgICAgICAgICAgSURCQ3Vyc29yLnByb3RvdHlwZS5jb250aW51ZVByaW1hcnlLZXksXHJcbiAgICAgICAgXSkpO1xyXG59XHJcbmNvbnN0IGN1cnNvclJlcXVlc3RNYXAgPSBuZXcgV2Vha01hcCgpO1xyXG5jb25zdCB0cmFuc2FjdGlvbkRvbmVNYXAgPSBuZXcgV2Vha01hcCgpO1xyXG5jb25zdCB0cmFuc2FjdGlvblN0b3JlTmFtZXNNYXAgPSBuZXcgV2Vha01hcCgpO1xyXG5jb25zdCB0cmFuc2Zvcm1DYWNoZSA9IG5ldyBXZWFrTWFwKCk7XHJcbmNvbnN0IHJldmVyc2VUcmFuc2Zvcm1DYWNoZSA9IG5ldyBXZWFrTWFwKCk7XHJcbmZ1bmN0aW9uIHByb21pc2lmeVJlcXVlc3QocmVxdWVzdCkge1xyXG4gICAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICBjb25zdCB1bmxpc3RlbiA9ICgpID0+IHtcclxuICAgICAgICAgICAgcmVxdWVzdC5yZW1vdmVFdmVudExpc3RlbmVyKCdzdWNjZXNzJywgc3VjY2Vzcyk7XHJcbiAgICAgICAgICAgIHJlcXVlc3QucmVtb3ZlRXZlbnRMaXN0ZW5lcignZXJyb3InLCBlcnJvcik7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zdCBzdWNjZXNzID0gKCkgPT4ge1xyXG4gICAgICAgICAgICByZXNvbHZlKHdyYXAocmVxdWVzdC5yZXN1bHQpKTtcclxuICAgICAgICAgICAgdW5saXN0ZW4oKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IGVycm9yID0gKCkgPT4ge1xyXG4gICAgICAgICAgICByZWplY3QocmVxdWVzdC5lcnJvcik7XHJcbiAgICAgICAgICAgIHVubGlzdGVuKCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ3N1Y2Nlc3MnLCBzdWNjZXNzKTtcclxuICAgICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZXJyb3IpO1xyXG4gICAgfSk7XHJcbiAgICBwcm9taXNlXHJcbiAgICAgICAgLnRoZW4odmFsdWUgPT4ge1xyXG4gICAgICAgIC8vIFNpbmNlIGN1cnNvcmluZyByZXVzZXMgdGhlIElEQlJlcXVlc3QgKCpzaWdoKiksIHdlIGNhY2hlIGl0IGZvciBsYXRlciByZXRyaWV2YWxcclxuICAgICAgICAvLyAoc2VlIHdyYXBGdW5jdGlvbikuXHJcbiAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgSURCQ3Vyc29yKSB7XHJcbiAgICAgICAgICAgIGN1cnNvclJlcXVlc3RNYXAuc2V0KHZhbHVlLCByZXF1ZXN0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gQ2F0Y2hpbmcgdG8gYXZvaWQgXCJVbmNhdWdodCBQcm9taXNlIGV4Y2VwdGlvbnNcIlxyXG4gICAgfSlcclxuICAgICAgICAuY2F0Y2goKCkgPT4geyB9KTtcclxuICAgIC8vIFRoaXMgbWFwcGluZyBleGlzdHMgaW4gcmV2ZXJzZVRyYW5zZm9ybUNhY2hlIGJ1dCBkb2Vzbid0IGRvZXNuJ3QgZXhpc3QgaW4gdHJhbnNmb3JtQ2FjaGUuIFRoaXNcclxuICAgIC8vIGlzIGJlY2F1c2Ugd2UgY3JlYXRlIG1hbnkgcHJvbWlzZXMgZnJvbSBhIHNpbmdsZSBJREJSZXF1ZXN0LlxyXG4gICAgcmV2ZXJzZVRyYW5zZm9ybUNhY2hlLnNldChwcm9taXNlLCByZXF1ZXN0KTtcclxuICAgIHJldHVybiBwcm9taXNlO1xyXG59XHJcbmZ1bmN0aW9uIGNhY2hlRG9uZVByb21pc2VGb3JUcmFuc2FjdGlvbih0eCkge1xyXG4gICAgLy8gRWFybHkgYmFpbCBpZiB3ZSd2ZSBhbHJlYWR5IGNyZWF0ZWQgYSBkb25lIHByb21pc2UgZm9yIHRoaXMgdHJhbnNhY3Rpb24uXHJcbiAgICBpZiAodHJhbnNhY3Rpb25Eb25lTWFwLmhhcyh0eCkpXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgY29uc3QgZG9uZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICBjb25zdCB1bmxpc3RlbiA9ICgpID0+IHtcclxuICAgICAgICAgICAgdHgucmVtb3ZlRXZlbnRMaXN0ZW5lcignY29tcGxldGUnLCBjb21wbGV0ZSk7XHJcbiAgICAgICAgICAgIHR4LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZXJyb3IpO1xyXG4gICAgICAgICAgICB0eC5yZW1vdmVFdmVudExpc3RlbmVyKCdhYm9ydCcsIGVycm9yKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IGNvbXBsZXRlID0gKCkgPT4ge1xyXG4gICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgIHVubGlzdGVuKCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zdCBlcnJvciA9ICgpID0+IHtcclxuICAgICAgICAgICAgcmVqZWN0KHR4LmVycm9yKTtcclxuICAgICAgICAgICAgdW5saXN0ZW4oKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHR4LmFkZEV2ZW50TGlzdGVuZXIoJ2NvbXBsZXRlJywgY29tcGxldGUpO1xyXG4gICAgICAgIHR4LmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZXJyb3IpO1xyXG4gICAgICAgIHR4LmFkZEV2ZW50TGlzdGVuZXIoJ2Fib3J0JywgZXJyb3IpO1xyXG4gICAgfSk7XHJcbiAgICAvLyBDYWNoZSBpdCBmb3IgbGF0ZXIgcmV0cmlldmFsLlxyXG4gICAgdHJhbnNhY3Rpb25Eb25lTWFwLnNldCh0eCwgZG9uZSk7XHJcbn1cclxubGV0IGlkYlByb3h5VHJhcHMgPSB7XHJcbiAgICBnZXQodGFyZ2V0LCBwcm9wLCByZWNlaXZlcikge1xyXG4gICAgICAgIGlmICh0YXJnZXQgaW5zdGFuY2VvZiBJREJUcmFuc2FjdGlvbikge1xyXG4gICAgICAgICAgICAvLyBTcGVjaWFsIGhhbmRsaW5nIGZvciB0cmFuc2FjdGlvbi5kb25lLlxyXG4gICAgICAgICAgICBpZiAocHJvcCA9PT0gJ2RvbmUnKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRyYW5zYWN0aW9uRG9uZU1hcC5nZXQodGFyZ2V0KTtcclxuICAgICAgICAgICAgLy8gUG9seWZpbGwgZm9yIG9iamVjdFN0b3JlTmFtZXMgYmVjYXVzZSBvZiBFZGdlLlxyXG4gICAgICAgICAgICBpZiAocHJvcCA9PT0gJ29iamVjdFN0b3JlTmFtZXMnKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGFyZ2V0Lm9iamVjdFN0b3JlTmFtZXMgfHwgdHJhbnNhY3Rpb25TdG9yZU5hbWVzTWFwLmdldCh0YXJnZXQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIE1ha2UgdHguc3RvcmUgcmV0dXJuIHRoZSBvbmx5IHN0b3JlIGluIHRoZSB0cmFuc2FjdGlvbiwgb3IgdW5kZWZpbmVkIGlmIHRoZXJlIGFyZSBtYW55LlxyXG4gICAgICAgICAgICBpZiAocHJvcCA9PT0gJ3N0b3JlJykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlY2VpdmVyLm9iamVjdFN0b3JlTmFtZXNbMV1cclxuICAgICAgICAgICAgICAgICAgICA/IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICAgICAgICAgIDogcmVjZWl2ZXIub2JqZWN0U3RvcmUocmVjZWl2ZXIub2JqZWN0U3RvcmVOYW1lc1swXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gRWxzZSB0cmFuc2Zvcm0gd2hhdGV2ZXIgd2UgZ2V0IGJhY2suXHJcbiAgICAgICAgcmV0dXJuIHdyYXAodGFyZ2V0W3Byb3BdKTtcclxuICAgIH0sXHJcbiAgICBoYXModGFyZ2V0LCBwcm9wKSB7XHJcbiAgICAgICAgaWYgKHRhcmdldCBpbnN0YW5jZW9mIElEQlRyYW5zYWN0aW9uICYmXHJcbiAgICAgICAgICAgIChwcm9wID09PSAnZG9uZScgfHwgcHJvcCA9PT0gJ3N0b3JlJykpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwcm9wIGluIHRhcmdldDtcclxuICAgIH0sXHJcbn07XHJcbmZ1bmN0aW9uIGFkZFRyYXBzKGNhbGxiYWNrKSB7XHJcbiAgICBpZGJQcm94eVRyYXBzID0gY2FsbGJhY2soaWRiUHJveHlUcmFwcyk7XHJcbn1cclxuZnVuY3Rpb24gd3JhcEZ1bmN0aW9uKGZ1bmMpIHtcclxuICAgIC8vIER1ZSB0byBleHBlY3RlZCBvYmplY3QgZXF1YWxpdHkgKHdoaWNoIGlzIGVuZm9yY2VkIGJ5IHRoZSBjYWNoaW5nIGluIGB3cmFwYCksIHdlXHJcbiAgICAvLyBvbmx5IGNyZWF0ZSBvbmUgbmV3IGZ1bmMgcGVyIGZ1bmMuXHJcbiAgICAvLyBFZGdlIGRvZXNuJ3Qgc3VwcG9ydCBvYmplY3RTdG9yZU5hbWVzIChib29vKSwgc28gd2UgcG9seWZpbGwgaXQgaGVyZS5cclxuICAgIGlmIChmdW5jID09PSBJREJEYXRhYmFzZS5wcm90b3R5cGUudHJhbnNhY3Rpb24gJiZcclxuICAgICAgICAhKCdvYmplY3RTdG9yZU5hbWVzJyBpbiBJREJUcmFuc2FjdGlvbi5wcm90b3R5cGUpKSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChzdG9yZU5hbWVzLCAuLi5hcmdzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHR4ID0gZnVuYy5jYWxsKHVud3JhcCh0aGlzKSwgc3RvcmVOYW1lcywgLi4uYXJncyk7XHJcbiAgICAgICAgICAgIHRyYW5zYWN0aW9uU3RvcmVOYW1lc01hcC5zZXQodHgsIHN0b3JlTmFtZXMuc29ydCA/IHN0b3JlTmFtZXMuc29ydCgpIDogW3N0b3JlTmFtZXNdKTtcclxuICAgICAgICAgICAgcmV0dXJuIHdyYXAodHgpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICAvLyBDdXJzb3IgbWV0aG9kcyBhcmUgc3BlY2lhbCwgYXMgdGhlIGJlaGF2aW91ciBpcyBhIGxpdHRsZSBtb3JlIGRpZmZlcmVudCB0byBzdGFuZGFyZCBJREIuIEluXHJcbiAgICAvLyBJREIsIHlvdSBhZHZhbmNlIHRoZSBjdXJzb3IgYW5kIHdhaXQgZm9yIGEgbmV3ICdzdWNjZXNzJyBvbiB0aGUgSURCUmVxdWVzdCB0aGF0IGdhdmUgeW91IHRoZVxyXG4gICAgLy8gY3Vyc29yLiBJdCdzIGtpbmRhIGxpa2UgYSBwcm9taXNlIHRoYXQgY2FuIHJlc29sdmUgd2l0aCBtYW55IHZhbHVlcy4gVGhhdCBkb2Vzbid0IG1ha2Ugc2Vuc2VcclxuICAgIC8vIHdpdGggcmVhbCBwcm9taXNlcywgc28gZWFjaCBhZHZhbmNlIG1ldGhvZHMgcmV0dXJucyBhIG5ldyBwcm9taXNlIGZvciB0aGUgY3Vyc29yIG9iamVjdCwgb3JcclxuICAgIC8vIHVuZGVmaW5lZCBpZiB0aGUgZW5kIG9mIHRoZSBjdXJzb3IgaGFzIGJlZW4gcmVhY2hlZC5cclxuICAgIGlmIChnZXRDdXJzb3JBZHZhbmNlTWV0aG9kcygpLmluY2x1ZGVzKGZ1bmMpKSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XHJcbiAgICAgICAgICAgIC8vIENhbGxpbmcgdGhlIG9yaWdpbmFsIGZ1bmN0aW9uIHdpdGggdGhlIHByb3h5IGFzICd0aGlzJyBjYXVzZXMgSUxMRUdBTCBJTlZPQ0FUSU9OLCBzbyB3ZSB1c2VcclxuICAgICAgICAgICAgLy8gdGhlIG9yaWdpbmFsIG9iamVjdC5cclxuICAgICAgICAgICAgZnVuYy5hcHBseSh1bndyYXAodGhpcyksIGFyZ3MpO1xyXG4gICAgICAgICAgICByZXR1cm4gd3JhcChjdXJzb3JSZXF1ZXN0TWFwLmdldCh0aGlzKSk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xyXG4gICAgICAgIC8vIENhbGxpbmcgdGhlIG9yaWdpbmFsIGZ1bmN0aW9uIHdpdGggdGhlIHByb3h5IGFzICd0aGlzJyBjYXVzZXMgSUxMRUdBTCBJTlZPQ0FUSU9OLCBzbyB3ZSB1c2VcclxuICAgICAgICAvLyB0aGUgb3JpZ2luYWwgb2JqZWN0LlxyXG4gICAgICAgIHJldHVybiB3cmFwKGZ1bmMuYXBwbHkodW53cmFwKHRoaXMpLCBhcmdzKSk7XHJcbiAgICB9O1xyXG59XHJcbmZ1bmN0aW9uIHRyYW5zZm9ybUNhY2hhYmxlVmFsdWUodmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpXHJcbiAgICAgICAgcmV0dXJuIHdyYXBGdW5jdGlvbih2YWx1ZSk7XHJcbiAgICAvLyBUaGlzIGRvZXNuJ3QgcmV0dXJuLCBpdCBqdXN0IGNyZWF0ZXMgYSAnZG9uZScgcHJvbWlzZSBmb3IgdGhlIHRyYW5zYWN0aW9uLFxyXG4gICAgLy8gd2hpY2ggaXMgbGF0ZXIgcmV0dXJuZWQgZm9yIHRyYW5zYWN0aW9uLmRvbmUgKHNlZSBpZGJPYmplY3RIYW5kbGVyKS5cclxuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIElEQlRyYW5zYWN0aW9uKVxyXG4gICAgICAgIGNhY2hlRG9uZVByb21pc2VGb3JUcmFuc2FjdGlvbih2YWx1ZSk7XHJcbiAgICBpZiAoaW5zdGFuY2VPZkFueSh2YWx1ZSwgZ2V0SWRiUHJveHlhYmxlVHlwZXMoKSkpXHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm94eSh2YWx1ZSwgaWRiUHJveHlUcmFwcyk7XHJcbiAgICAvLyBSZXR1cm4gdGhlIHNhbWUgdmFsdWUgYmFjayBpZiB3ZSdyZSBub3QgZ29pbmcgdG8gdHJhbnNmb3JtIGl0LlxyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG59XHJcbmZ1bmN0aW9uIHdyYXAodmFsdWUpIHtcclxuICAgIC8vIFdlIHNvbWV0aW1lcyBnZW5lcmF0ZSBtdWx0aXBsZSBwcm9taXNlcyBmcm9tIGEgc2luZ2xlIElEQlJlcXVlc3QgKGVnIHdoZW4gY3Vyc29yaW5nKSwgYmVjYXVzZVxyXG4gICAgLy8gSURCIGlzIHdlaXJkIGFuZCBhIHNpbmdsZSBJREJSZXF1ZXN0IGNhbiB5aWVsZCBtYW55IHJlc3BvbnNlcywgc28gdGhlc2UgY2FuJ3QgYmUgY2FjaGVkLlxyXG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgSURCUmVxdWVzdClcclxuICAgICAgICByZXR1cm4gcHJvbWlzaWZ5UmVxdWVzdCh2YWx1ZSk7XHJcbiAgICAvLyBJZiB3ZSd2ZSBhbHJlYWR5IHRyYW5zZm9ybWVkIHRoaXMgdmFsdWUgYmVmb3JlLCByZXVzZSB0aGUgdHJhbnNmb3JtZWQgdmFsdWUuXHJcbiAgICAvLyBUaGlzIGlzIGZhc3RlciwgYnV0IGl0IGFsc28gcHJvdmlkZXMgb2JqZWN0IGVxdWFsaXR5LlxyXG4gICAgaWYgKHRyYW5zZm9ybUNhY2hlLmhhcyh2YWx1ZSkpXHJcbiAgICAgICAgcmV0dXJuIHRyYW5zZm9ybUNhY2hlLmdldCh2YWx1ZSk7XHJcbiAgICBjb25zdCBuZXdWYWx1ZSA9IHRyYW5zZm9ybUNhY2hhYmxlVmFsdWUodmFsdWUpO1xyXG4gICAgLy8gTm90IGFsbCB0eXBlcyBhcmUgdHJhbnNmb3JtZWQuXHJcbiAgICAvLyBUaGVzZSBtYXkgYmUgcHJpbWl0aXZlIHR5cGVzLCBzbyB0aGV5IGNhbid0IGJlIFdlYWtNYXAga2V5cy5cclxuICAgIGlmIChuZXdWYWx1ZSAhPT0gdmFsdWUpIHtcclxuICAgICAgICB0cmFuc2Zvcm1DYWNoZS5zZXQodmFsdWUsIG5ld1ZhbHVlKTtcclxuICAgICAgICByZXZlcnNlVHJhbnNmb3JtQ2FjaGUuc2V0KG5ld1ZhbHVlLCB2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV3VmFsdWU7XHJcbn1cclxuY29uc3QgdW53cmFwID0gKHZhbHVlKSA9PiByZXZlcnNlVHJhbnNmb3JtQ2FjaGUuZ2V0KHZhbHVlKTtcblxuZXhwb3J0IHsgd3JhcCBhcyBhLCBhZGRUcmFwcyBhcyBiLCBpbnN0YW5jZU9mQW55IGFzIGMsIHJldmVyc2VUcmFuc2Zvcm1DYWNoZSBhcyBkLCB1bndyYXAgYXMgZSB9O1xuIiwiaW1wb3J0IHsgYSBhcyB3cmFwLCBiIGFzIGFkZFRyYXBzIH0gZnJvbSAnLi9jaHVuay5qcyc7XG5leHBvcnQgeyBlIGFzIHVud3JhcCwgYSBhcyB3cmFwIH0gZnJvbSAnLi9jaHVuay5qcyc7XG5cbi8qKlxyXG4gKiBPcGVuIGEgZGF0YWJhc2UuXHJcbiAqXHJcbiAqIEBwYXJhbSBuYW1lIE5hbWUgb2YgdGhlIGRhdGFiYXNlLlxyXG4gKiBAcGFyYW0gdmVyc2lvbiBTY2hlbWEgdmVyc2lvbi5cclxuICogQHBhcmFtIGNhbGxiYWNrcyBBZGRpdGlvbmFsIGNhbGxiYWNrcy5cclxuICovXHJcbmZ1bmN0aW9uIG9wZW5EQihuYW1lLCB2ZXJzaW9uLCB7IGJsb2NrZWQsIHVwZ3JhZGUsIGJsb2NraW5nIH0gPSB7fSkge1xyXG4gICAgY29uc3QgcmVxdWVzdCA9IGluZGV4ZWREQi5vcGVuKG5hbWUsIHZlcnNpb24pO1xyXG4gICAgY29uc3Qgb3BlblByb21pc2UgPSB3cmFwKHJlcXVlc3QpO1xyXG4gICAgaWYgKHVwZ3JhZGUpIHtcclxuICAgICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ3VwZ3JhZGVuZWVkZWQnLCBldmVudCA9PiB7XHJcbiAgICAgICAgICAgIHVwZ3JhZGUod3JhcChyZXF1ZXN0LnJlc3VsdCksIGV2ZW50Lm9sZFZlcnNpb24sIGV2ZW50Lm5ld1ZlcnNpb24sIHdyYXAocmVxdWVzdC50cmFuc2FjdGlvbikpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgaWYgKGJsb2NrZWQpXHJcbiAgICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdibG9ja2VkJywgKCkgPT4gYmxvY2tlZCgpKTtcclxuICAgIGlmIChibG9ja2luZykge1xyXG4gICAgICAgIG9wZW5Qcm9taXNlLnRoZW4oZGIgPT4gZGIuYWRkRXZlbnRMaXN0ZW5lcigndmVyc2lvbmNoYW5nZScsIGJsb2NraW5nKSkuY2F0Y2goKCkgPT4geyB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBvcGVuUHJvbWlzZTtcclxufVxyXG4vKipcclxuICogRGVsZXRlIGEgZGF0YWJhc2UuXHJcbiAqXHJcbiAqIEBwYXJhbSBuYW1lIE5hbWUgb2YgdGhlIGRhdGFiYXNlLlxyXG4gKi9cclxuZnVuY3Rpb24gZGVsZXRlREIobmFtZSwgeyBibG9ja2VkIH0gPSB7fSkge1xyXG4gICAgY29uc3QgcmVxdWVzdCA9IGluZGV4ZWREQi5kZWxldGVEYXRhYmFzZShuYW1lKTtcclxuICAgIGlmIChibG9ja2VkKVxyXG4gICAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignYmxvY2tlZCcsICgpID0+IGJsb2NrZWQoKSk7XHJcbiAgICByZXR1cm4gd3JhcChyZXF1ZXN0KS50aGVuKCgpID0+IHVuZGVmaW5lZCk7XHJcbn1cblxuY29uc3QgcmVhZE1ldGhvZHMgPSBbJ2dldCcsICdnZXRLZXknLCAnZ2V0QWxsJywgJ2dldEFsbEtleXMnLCAnY291bnQnXTtcclxuY29uc3Qgd3JpdGVNZXRob2RzID0gWydwdXQnLCAnYWRkJywgJ2RlbGV0ZScsICdjbGVhciddO1xyXG5jb25zdCBjYWNoZWRNZXRob2RzID0gbmV3IE1hcCgpO1xyXG5mdW5jdGlvbiBnZXRNZXRob2QodGFyZ2V0LCBwcm9wKSB7XHJcbiAgICBpZiAoISh0YXJnZXQgaW5zdGFuY2VvZiBJREJEYXRhYmFzZSAmJlxyXG4gICAgICAgICEocHJvcCBpbiB0YXJnZXQpICYmXHJcbiAgICAgICAgdHlwZW9mIHByb3AgPT09ICdzdHJpbmcnKSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmIChjYWNoZWRNZXRob2RzLmdldChwcm9wKSlcclxuICAgICAgICByZXR1cm4gY2FjaGVkTWV0aG9kcy5nZXQocHJvcCk7XHJcbiAgICBjb25zdCB0YXJnZXRGdW5jTmFtZSA9IHByb3AucmVwbGFjZSgvRnJvbUluZGV4JC8sICcnKTtcclxuICAgIGNvbnN0IHVzZUluZGV4ID0gcHJvcCAhPT0gdGFyZ2V0RnVuY05hbWU7XHJcbiAgICBjb25zdCBpc1dyaXRlID0gd3JpdGVNZXRob2RzLmluY2x1ZGVzKHRhcmdldEZ1bmNOYW1lKTtcclxuICAgIGlmIChcclxuICAgIC8vIEJhaWwgaWYgdGhlIHRhcmdldCBkb2Vzbid0IGV4aXN0IG9uIHRoZSB0YXJnZXQuIEVnLCBnZXRBbGwgaXNuJ3QgaW4gRWRnZS5cclxuICAgICEodGFyZ2V0RnVuY05hbWUgaW4gKHVzZUluZGV4ID8gSURCSW5kZXggOiBJREJPYmplY3RTdG9yZSkucHJvdG90eXBlKSB8fFxyXG4gICAgICAgICEoaXNXcml0ZSB8fCByZWFkTWV0aG9kcy5pbmNsdWRlcyh0YXJnZXRGdW5jTmFtZSkpKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgY29uc3QgbWV0aG9kID0gYXN5bmMgZnVuY3Rpb24gKHN0b3JlTmFtZSwgLi4uYXJncykge1xyXG4gICAgICAgIC8vIGlzV3JpdGUgPyAncmVhZHdyaXRlJyA6IHVuZGVmaW5lZCBnemlwcHMgYmV0dGVyLCBidXQgZmFpbHMgaW4gRWRnZSA6KFxyXG4gICAgICAgIGNvbnN0IHR4ID0gdGhpcy50cmFuc2FjdGlvbihzdG9yZU5hbWUsIGlzV3JpdGUgPyAncmVhZHdyaXRlJyA6ICdyZWFkb25seScpO1xyXG4gICAgICAgIGxldCB0YXJnZXQgPSB0eC5zdG9yZTtcclxuICAgICAgICBpZiAodXNlSW5kZXgpXHJcbiAgICAgICAgICAgIHRhcmdldCA9IHRhcmdldC5pbmRleChhcmdzLnNoaWZ0KCkpO1xyXG4gICAgICAgIGNvbnN0IHJldHVyblZhbCA9IHRhcmdldFt0YXJnZXRGdW5jTmFtZV0oLi4uYXJncyk7XHJcbiAgICAgICAgaWYgKGlzV3JpdGUpXHJcbiAgICAgICAgICAgIGF3YWl0IHR4LmRvbmU7XHJcbiAgICAgICAgcmV0dXJuIHJldHVyblZhbDtcclxuICAgIH07XHJcbiAgICBjYWNoZWRNZXRob2RzLnNldChwcm9wLCBtZXRob2QpO1xyXG4gICAgcmV0dXJuIG1ldGhvZDtcclxufVxyXG5hZGRUcmFwcyhvbGRUcmFwcyA9PiAoe1xyXG4gICAgZ2V0OiAodGFyZ2V0LCBwcm9wLCByZWNlaXZlcikgPT4gZ2V0TWV0aG9kKHRhcmdldCwgcHJvcCkgfHwgb2xkVHJhcHMuZ2V0KHRhcmdldCwgcHJvcCwgcmVjZWl2ZXIpLFxyXG4gICAgaGFzOiAodGFyZ2V0LCBwcm9wKSA9PiAhIWdldE1ldGhvZCh0YXJnZXQsIHByb3ApIHx8IG9sZFRyYXBzLmhhcyh0YXJnZXQsIHByb3ApLFxyXG59KSk7XG5cbmV4cG9ydCB7IG9wZW5EQiwgZGVsZXRlREIgfTtcbiIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iXSwic291cmNlUm9vdCI6IiJ9