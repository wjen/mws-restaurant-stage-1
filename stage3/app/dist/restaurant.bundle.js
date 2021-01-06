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
/******/ 	return __webpack_require__(__webpack_require__.s = "./client/js/restaurant_info.js");
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

/***/ "./client/js/restaurant_info.js":
/*!**************************************!*\
  !*** ./client/js/restaurant_info.js ***!
  \**************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es6_regexp_constructor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es6.regexp.constructor */ "./node_modules/core-js/modules/es6.regexp.constructor.js");
/* harmony import */ var core_js_modules_es6_regexp_constructor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_regexp_constructor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es6_regexp_replace__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es6.regexp.replace */ "./node_modules/core-js/modules/es6.regexp.replace.js");
/* harmony import */ var core_js_modules_es6_regexp_replace__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_regexp_replace__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _registration__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./registration */ "./client/js/registration.js");
/* harmony import */ var _dbhelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dbhelper */ "./client/js/dbhelper.js");
/* harmony import */ var _sw_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../sw.js */ "./client/sw.js");




let restaurant;
let submitBtn;
var newMap;
let editing = false;

console.log("pk.eyJ1Ijoid2VudGluIiwiYSI6ImNqaXJ0N25iZjFwdjYza3A4MGt1aHU2bjEifQ.DnNFUoN5uzw01l_XK_c7nQ");
/**
 * Initialize map as soon as the page is loaded.
 */

document.addEventListener('DOMContentLoaded', event => {
  initMap();
  submitBtn = document.getElementById('submit-form-btn');
  submitBtn.addEventListener('click', submitReview); //check for pending reviews on page load and pop

  _dbhelper__WEBPACK_IMPORTED_MODULE_3__["default"].nextPending();
});
/**
 * Initialize leaflet map
 */

const initMap = () => {
  fetchRestaurantFromURL((error, restaurant) => {
    if (error) {
      // Got an error!
      console.error(error);
    } else {
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
      fillBreadcrumb();
      _dbhelper__WEBPACK_IMPORTED_MODULE_3__["default"].mapMarkerForRestaurant(self.restaurant, self.newMap);
    }
  });
};
/**
 * Get current restaurant from page URL.
 */


const fetchRestaurantFromURL = callback => {
  if (self.restaurant) {
    // restaurant already fetched!
    callback(null, self.restaurant);
    console.log('self restaurant already fetched');
    return;
  }

  const id = getParameterByName('id');

  if (!id) {
    // no id found in URL
    error = 'No restaurant id in URL';
    callback(error, null);
  } else {
    _dbhelper__WEBPACK_IMPORTED_MODULE_3__["default"].fetchRestaurantById(id, (error, restaurant) => {
      self.restaurant = restaurant;

      if (!restaurant) {
        console.error(error);
        return;
      }

      fillRestaurantHTML();
      callback(null, restaurant);
    });
  }
};
/**
 * Create restaurant HTML and add it to the webpage
 */


const fillRestaurantHTML = function fillRestaurantHTML() {
  let restaurant = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : self.restaurant;
  const name = document.getElementById('restaurant-name');
  name.innerHTML = restaurant.name;
  const address = document.getElementById('restaurant-address');
  address.innerHTML = " ".concat(restaurant.name, " <br> ").concat(restaurant.address);
  const image = document.getElementById('restaurant-img');
  image.className = 'restaurant-img';
  image.src = _dbhelper__WEBPACK_IMPORTED_MODULE_3__["default"].imageUrlForRestaurant(restaurant);
  const cuisine = document.getElementById('restaurant-cuisine');
  cuisine.innerHTML = restaurant.cuisine_type; // fill operating hours

  if (restaurant.operating_hours) {
    fillRestaurantHoursHTML();
  } // fill reviews


  _dbhelper__WEBPACK_IMPORTED_MODULE_3__["default"].fetchReviews(restaurant.id, (error, reviews) => {
    fillReviewsHTML(reviews);
  });
};
/**
 * Create restaurant operating hours HTML table and add it to the webpage.
 */


const fillRestaurantHoursHTML = function fillRestaurantHoursHTML() {
  let operatingHours = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : self.restaurant.operating_hours;
  const hours = document.getElementById('restaurant-hours');

  for (let key in operatingHours) {
    const row = document.createElement('tr');
    const day = document.createElement('td');
    day.innerHTML = key;
    row.appendChild(day);
    const time = document.createElement('td');
    time.innerHTML = operatingHours[key];
    row.appendChild(time);
    hours.appendChild(row);
  }
};
/**
 * Create all reviews HTML and add them to the webpage.
 */


const fillReviewsHTML = function fillReviewsHTML() {
  let reviews = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : self.restaurant.reviews;
  console.log(reviews);
  const container = document.getElementById('reviews-container'); // Reset the container on every call to prevent duplication

  container.innerHTML = '';
  const title = document.createElement('h2');
  title.innerHTML = 'Reviews';
  container.appendChild(title);

  if (!reviews) {
    const noReviews = document.createElement('p');
    noReviews.innerHTML = 'No reviews yet!';
    container.appendChild(noReviews);
    return;
  }

  const ul = document.createElement('ul');
  ul.id = 'reviews-list';
  reviews.forEach(review => {
    ul.appendChild(createReviewHTML(review));
  });
  container.appendChild(ul);
};
/**
 * Create review HTML and add it to the webpage.
 */


const createReviewHTML = review => {
  const li = document.createElement('li');
  li.setAttribute('id', "review-li-".concat(review.id));
  const name = document.createElement('p');
  name.innerHTML = review.name;
  li.appendChild(name);
  const date = document.createElement('p');
  date.innerHTML = '<strong>Created:</strong> ' + new Date(review.createdAt).toDateString();
  li.appendChild(date);

  if (review.createdAt !== review.updatedAt) {
    const updateDate = document.createElement('p');
    updateDate.innerHTML = '<strong>Updated:</strong> ' + new Date(review.updatedAt).toDateString();
    li.appendChild(updateDate);
  }

  const rating = document.createElement('p');
  rating.innerHTML = "Rating: ".concat(review.rating);
  li.appendChild(rating);
  const comments = document.createElement('p');
  comments.innerHTML = review.comments;
  li.appendChild(comments); // Set up and use fontawesome icons for edit and delete

  const editBtn = document.createElement('button');
  const editIcon = document.createElement('i');
  editBtn.setAttribute('aria-labelledby', "edit review ".concat(review.id));
  editBtn.setAttribute('title', "edit review button");
  editBtn.classList.add('review-btn');
  editBtn.title = 'start editing button';
  editIcon.classList.add('fas', 'fa-edit', 'fa-2x');
  editBtn.addEventListener('click', () => setEditing(review));
  editBtn.append(editIcon);
  li.appendChild(editBtn);
  const deleteBtn = document.createElement('button');
  const deleteIcon = document.createElement('i');
  deleteBtn.setAttribute('aria-labelledby', "delete review ".concat(review.id));
  deleteBtn.setAttribute('title', "delete review button");
  deleteBtn.classList.add('review-btn');
  deleteIcon.classList.add('fas', 'fa-trash-alt', 'fa-2x');
  deleteBtn.addEventListener('click', () => deleteReview(review));
  deleteBtn.append(deleteIcon);
  li.appendChild(deleteBtn);
  return li;
};
/**
 * Add restaurant name to the breadcrumb navigation menu
 */


const fillBreadcrumb = function fillBreadcrumb() {
  let restaurant = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : self.restaurant;
  const breadcrumb = document.getElementById('breadcrumb');
  const li = document.createElement('li');
  li.innerHTML = restaurant.name;
  breadcrumb.appendChild(li);
};
/**
 * Get a parameter by name from page URL.
 */


const getParameterByName = (name, url) => {
  let x = new URL(window.location.href);
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  console.log(url);
  const regex = new RegExp("[?&]".concat(name, "(=([^&#]*)|&|#|$)")),
        results = regex.exec(url);
  console.log(results);
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

const submitReview = () => {
  console.log(editing);
  let formData = getFormValues();

  if (!/[a-zA-Z]{2,}$/gi.test(formData.name)) {
    alert('name input must be letters only, minimum of 2 characters');
    return;
  }

  if (!/[1-5]{1}$/gi.test(formData.rating)) {
    alert('rating input must be a number, 1-5');
    return;
  }

  if (formData.comments.length < 3) {
    alert('comments input must be minimum of 3 characters');
    return;
  }

  if (editing) {
    formData.updatedAt = Date.now();
  } else {
    formData.id = Date.now();
    formData.restaurant_id = Number(getParameterByName('id'));
  }

  _dbhelper__WEBPACK_IMPORTED_MODULE_3__["default"].submitReview(formData, editing).then(result => {
    let alertMsg = editing ? 'Edited Review' : 'Created Review';
    alert(alertMsg);
    let newReviewElem = createReviewHTML(result);

    if (editing) {
      let oldReviewElem = document.getElementById("review-li-".concat(result.id));
      let parentElem = oldReviewElem.parentElement;
      parentElem.replaceChild(newReviewElem, oldReviewElem);
    } else {
      const ul = document.getElementById('reviews-list');
      ul.appendChild(newReviewElem);
    }

    var element = document.getElementById("review-li-".concat(result.id));
    element.scrollIntoView(true);
    resetFormValues();
  }).catch(error => {
    // If no network, fallback to get reviews from db
    let alertMsg = editing ? 'Edited Review' : 'Created Review';
    alert(alertMsg);
    console.log("".concat(error, ": reloading reviews from db"));
    const section = document.getElementById('reviews-container');
    _sw_js__WEBPACK_IMPORTED_MODULE_4__["dbPromise"].then(db => {
      return db.transaction('reviews').objectStore('reviews').index('restaurant_id').getAll(formData.restaurant_id);
    }).then(reviews => {
      console.log(reviews);
      fillReviewsHTML(reviews);
      resetFormValues();
    });
  });
};

const getFormValues = () => {
  return {
    name: document.getElementById('name').value.trim(),
    rating: document.getElementById('rating').value.trim(),
    comments: document.getElementById('review-field').value.trim()
  };
};

const resetFormValues = () => {
  editing = false;
  document.getElementById('name').value = '';
  document.getElementById('rating').value = '';
  document.getElementById('review-field').value = '';
};

const cancelEditing = () => {
  document.getElementById('cancel-form-btn').style.display = 'none';
  resetFormValues();
  editing = false;
};

const setEditing = review => {
  editing = review;
  let cancelEditingBtn = document.getElementById('cancel-form-btn');
  cancelEditingBtn.style.display = 'block';
  cancelEditingBtn.addEventListener('click', () => cancelEditing());
  document.getElementById('name').value = review.name;
  document.getElementById('rating').value = review.rating;
  document.getElementById('review-field').value = review.comments;
  let review_id = review.id;
  goToBottom();
};

const deleteReview = review => {
  let ask = window.confirm("delete ".concat(review.name, "'s review?"));

  if (ask === false) {
    return;
  }

  _dbhelper__WEBPACK_IMPORTED_MODULE_3__["default"].deleteReview(review.id).then(() => {
    document.getElementById("review-li-".concat(review.id)).remove();
  }).catch(error => {
    console.log('request put into que');
    document.getElementById("review-li-".concat(review.id)).remove();
  });
};

const goToBottom = () => {
  window.scrollTo(0, document.body.scrollHeight);
};

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

/***/ "./node_modules/core-js/modules/_inherit-if-required.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/_inherit-if-required.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var setPrototypeOf = __webpack_require__(/*! ./_set-proto */ "./node_modules/core-js/modules/_set-proto.js").set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};


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

/***/ "./node_modules/core-js/modules/_is-regexp.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_is-regexp.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var cof = __webpack_require__(/*! ./_cof */ "./node_modules/core-js/modules/_cof.js");
var MATCH = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
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

/***/ "./node_modules/core-js/modules/_object-gopd.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gopd.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(/*! ./_object-pie */ "./node_modules/core-js/modules/_object-pie.js");
var createDesc = __webpack_require__(/*! ./_property-desc */ "./node_modules/core-js/modules/_property-desc.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/modules/_to-iobject.js");
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ "./node_modules/core-js/modules/_to-primitive.js");
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ "./node_modules/core-js/modules/_ie8-dom-define.js");
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-gopn.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gopn.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(/*! ./_object-keys-internal */ "./node_modules/core-js/modules/_object-keys-internal.js");
var hiddenKeys = __webpack_require__(/*! ./_enum-bug-keys */ "./node_modules/core-js/modules/_enum-bug-keys.js").concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
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

/***/ "./node_modules/core-js/modules/_object-pie.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-pie.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


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

/***/ "./node_modules/core-js/modules/_set-proto.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_set-proto.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(/*! ./_ctx */ "./node_modules/core-js/modules/_ctx.js")(Function.call, __webpack_require__(/*! ./_object-gopd */ "./node_modules/core-js/modules/_object-gopd.js").f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),

/***/ "./node_modules/core-js/modules/_set-species.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_set-species.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var dP = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js");
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js");
var SPECIES = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


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

/***/ "./node_modules/core-js/modules/es6.regexp.constructor.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.constructor.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var inheritIfRequired = __webpack_require__(/*! ./_inherit-if-required */ "./node_modules/core-js/modules/_inherit-if-required.js");
var dP = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js").f;
var gOPN = __webpack_require__(/*! ./_object-gopn */ "./node_modules/core-js/modules/_object-gopn.js").f;
var isRegExp = __webpack_require__(/*! ./_is-regexp */ "./node_modules/core-js/modules/_is-regexp.js");
var $flags = __webpack_require__(/*! ./_flags */ "./node_modules/core-js/modules/_flags.js");
var $RegExp = global.RegExp;
var Base = $RegExp;
var proto = $RegExp.prototype;
var re1 = /a/g;
var re2 = /a/g;
// "new" creates a new object, old webkit buggy here
var CORRECT_NEW = new $RegExp(re1) !== re1;

if (__webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") && (!CORRECT_NEW || __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () {
  re2[__webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('match')] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))) {
  $RegExp = function RegExp(p, f) {
    var tiRE = this instanceof $RegExp;
    var piRE = isRegExp(p);
    var fiU = f === undefined;
    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
      : inheritIfRequired(CORRECT_NEW
        ? new Base(piRE && !fiU ? p.source : p, f)
        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
      , tiRE ? this : proto, $RegExp);
  };
  var proxy = function (key) {
    key in $RegExp || dP($RegExp, key, {
      configurable: true,
      get: function () { return Base[key]; },
      set: function (it) { Base[key] = it; }
    });
  };
  for (var keys = gOPN(Base), i = 0; keys.length > i;) proxy(keys[i++]);
  proto.constructor = $RegExp;
  $RegExp.prototype = proto;
  __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/modules/_redefine.js")(global, 'RegExp', $RegExp);
}

__webpack_require__(/*! ./_set-species */ "./node_modules/core-js/modules/_set-species.js")('RegExp');


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

/***/ "./node_modules/core-js/modules/es6.regexp.replace.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.replace.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/modules/_to-object.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/modules/_to-length.js");
var toInteger = __webpack_require__(/*! ./_to-integer */ "./node_modules/core-js/modules/_to-integer.js");
var advanceStringIndex = __webpack_require__(/*! ./_advance-string-index */ "./node_modules/core-js/modules/_advance-string-index.js");
var regExpExec = __webpack_require__(/*! ./_regexp-exec-abstract */ "./node_modules/core-js/modules/_regexp-exec-abstract.js");
var max = Math.max;
var min = Math.min;
var floor = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// @@replace logic
__webpack_require__(/*! ./_fix-re-wks */ "./node_modules/core-js/modules/_fix-re-wks.js")('replace', 2, function (defined, REPLACE, $replace, maybeCallNative) {
  return [
    // `String.prototype.replace` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = defined(this);
      var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
      return fn !== undefined
        ? fn.call(searchValue, O, replaceValue)
        : $replace.call(String(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
    function (regexp, replaceValue) {
      var res = maybeCallNative($replace, regexp, this, replaceValue);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var functionalReplace = typeof replaceValue === 'function';
      if (!functionalReplace) replaceValue = String(replaceValue);
      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;
        results.push(result);
        if (!global) break;
        var matchStr = String(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }
      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];
        var matched = String(result[0]);
        var position = max(min(toInteger(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = String(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + S.slice(nextSourcePosition);
    }
  ];

    // https://tc39.github.io/ecma262/#sec-getsubstitution
  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return $replace.call(replacement, symbols, function (match, ch) {
      var capture;
      switch (ch.charAt(0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return str.slice(0, position);
        case "'": return str.slice(tailPos);
        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2pzL2RiaGVscGVyLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9qcy9yZWdpc3RyYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2pzL3Jlc3RhdXJhbnRfaW5mby5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3cuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fYS1mdW5jdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19hZGQtdG8tdW5zY29wYWJsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fYWR2YW5jZS1zdHJpbmctaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fYW4tb2JqZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2FycmF5LWluY2x1ZGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2NsYXNzb2YuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fY29mLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2NvcmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fY3R4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2RlZmluZWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fZGVzY3JpcHRvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fZG9tLWNyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19lbnVtLWJ1Zy1rZXlzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2V4cG9ydC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19mYWlscy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19maXgtcmUtd2tzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2ZsYWdzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2Z1bmN0aW9uLXRvLXN0cmluZy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faGFzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2hpZGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faHRtbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pZTgtZG9tLWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pbmhlcml0LWlmLXJlcXVpcmVkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2lvYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faXMtb2JqZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2lzLXJlZ2V4cC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pdGVyLWNyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pdGVyLWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pdGVyLXN0ZXAuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faXRlcmF0b3JzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2xpYnJhcnkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWNyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19vYmplY3QtZHAuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWRwcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19vYmplY3QtZ29wZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19vYmplY3QtZ29wbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19vYmplY3QtZ3BvLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1rZXlzLWludGVybmFsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1rZXlzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1waWUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fcHJvcGVydHktZGVzYy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19yZWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19yZWdleHAtZXhlYy1hYnN0cmFjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19yZWdleHAtZXhlYy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19zZXQtcHJvdG8uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fc2V0LXNwZWNpZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fc2V0LXRvLXN0cmluZy10YWcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fc2hhcmVkLWtleS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19zaGFyZWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fc3RyaW5nLWF0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3RvLWFic29sdXRlLWluZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3RvLWludGVnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fdG8taW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL190by1sZW5ndGguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fdG8tb2JqZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3RvLXByaW1pdGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL191aWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fd2tzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LmFycmF5Lml0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnJlZ2V4cC5jb25zdHJ1Y3Rvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5yZWdleHAuZXhlYy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5yZWdleHAubWF0Y2guanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYucmVnZXhwLnJlcGxhY2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pZGIvYnVpbGQvZXNtL2NodW5rLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pZGIvYnVpbGQvZXNtL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiXSwibmFtZXMiOlsiY29uc29sZSIsImxvZyIsIkRCSGVscGVyIiwiREFUQUJBU0VfVVJMIiwicG9ydCIsInByb2Nlc3MiLCJlbnYiLCJEQVRBQkFTRV9SRVZJRVdTX1VSTCIsImZldGNoUmVzdGF1cmFudHMiLCJjYWxsYmFjayIsImZldGNoIiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsInJlc3RhdXJhbnRzIiwiZmV0Y2hSZXZpZXdzIiwicmVzdGF1cmFudF9pZCIsImZldGNoVVJMIiwicmV2aWV3cyIsImNhdGNoIiwiZXJyb3IiLCJmZXRjaFJlc3RhdXJhbnRCeUlkIiwiaWQiLCJyZXN0YXVyYW50IiwiZmluZCIsInIiLCJmZXRjaFJlc3RhdXJhbnRCeUN1aXNpbmUiLCJjdWlzaW5lIiwicmVzdWx0cyIsImZpbHRlciIsImN1aXNpbmVfdHlwZSIsImZldGNoUmVzdGF1cmFudEJ5TmVpZ2hib3Job29kIiwibmVpZ2hib3Job29kIiwiZmV0Y2hSZXN0YXVyYW50QnlDdWlzaW5lQW5kTmVpZ2hib3Job29kIiwiZmV0Y2hOZWlnaGJvcmhvb2RzIiwibmVpZ2hib3Job29kcyIsIm1hcCIsInYiLCJpIiwidW5pcXVlTmVpZ2hib3Job29kcyIsImluZGV4T2YiLCJmZXRjaEN1aXNpbmVzIiwiY3Vpc2luZXMiLCJ1bmlxdWVDdWlzaW5lcyIsInVybEZvclJlc3RhdXJhbnQiLCJpbWFnZVVybEZvclJlc3RhdXJhbnQiLCJwaG90b2dyYXBoIiwibWFwTWFya2VyRm9yUmVzdGF1cmFudCIsIm1hcmtlciIsIkwiLCJsYXRsbmciLCJsYXQiLCJsbmciLCJ0aXRsZSIsIm5hbWUiLCJhbHQiLCJ1cmwiLCJhZGRUbyIsIm5ld01hcCIsInVwZGF0ZUNhY2hlZFJlc3RhdXJhbnRSZXZpZXciLCJmb3JtRGF0YSIsImRiUHJvbWlzZSIsImRiIiwidHgiLCJ0cmFuc2FjdGlvbiIsInN0b3JlIiwib2JqZWN0U3RvcmUiLCJwdXQiLCJkb25lIiwiZWRpdFJldmlldyIsImVkaXRpbmciLCJnZXQiLCJyZXZpZXciLCJuZXdSZXZpZXciLCJPYmplY3QiLCJhc3NpZ24iLCJjb21wbGV0ZSIsInN1Ym1pdFJldmlldyIsIm1ldGhvZCIsImFkZFBlbmRpbmdSZXF1ZXN0VG9RdWUiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImRhdGEiLCJuZXh0UGVuZGluZyIsImF0dGVtcHRDb21taXRQZW5kaW5nIiwiaiIsImJvZHkiLCJvYmplY3RTdG9yZU5hbWVzIiwibGVuZ3RoIiwiY2xvc2UiLCJvcGVuQ3Vyc29yIiwiY3Vyc29yIiwidmFsdWUiLCJkZWxldGUiLCJwcm9wZXJ0aWVzIiwiSlNPTiIsInN0cmluZ2lmeSIsIm9rIiwicmVkaXJlY3RlZCIsImRlbHR4Iiwic3luY1Jlc3RhdXJhbnQiLCJpc19mYXZvcml0ZSIsInVwZGF0ZVJlc3RhdXJhbnRJbkRCIiwibmV3X3Jlc3RhdXJhbnQiLCJ0b2dnbGVGYXZCdG4iLCJmYXZCdG4iLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiaW5uZXJIVE1MIiwic3R5bGUiLCJiYWNrZ3JvdW5kIiwiZGVsZXRlQ2FjaGVkUmV2aWV3IiwicmV2aWV3X2lkIiwiZGVsZXRlUmV2aWV3IiwiZGVsZXRlVGVtcFJldmlldyIsInRlbXBfaWQiLCJuYXZpZ2F0b3IiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwic2VydmljZVdvcmtlciIsInJlZ2lzdGVyIiwicmVnaXN0cmF0aW9uIiwicmVnaXN0cmF0aW9uRXJyb3IiLCJzdWJtaXRCdG4iLCJldmVudCIsImluaXRNYXAiLCJmZXRjaFJlc3RhdXJhbnRGcm9tVVJMIiwiY2VudGVyIiwiem9vbSIsInNjcm9sbFdoZWVsWm9vbSIsInNlbGYiLCJ0aWxlTGF5ZXIiLCJhdHRyaWJ1dGlvbiIsInRpbGVTaXplIiwibWF4Wm9vbSIsInpvb21PZmZzZXQiLCJhY2Nlc3NUb2tlbiIsIkFQSV9LRVkiLCJmaWxsQnJlYWRjcnVtYiIsImdldFBhcmFtZXRlckJ5TmFtZSIsImZpbGxSZXN0YXVyYW50SFRNTCIsImFkZHJlc3MiLCJpbWFnZSIsImNsYXNzTmFtZSIsInNyYyIsIm9wZXJhdGluZ19ob3VycyIsImZpbGxSZXN0YXVyYW50SG91cnNIVE1MIiwiZmlsbFJldmlld3NIVE1MIiwib3BlcmF0aW5nSG91cnMiLCJob3VycyIsImtleSIsInJvdyIsImNyZWF0ZUVsZW1lbnQiLCJkYXkiLCJhcHBlbmRDaGlsZCIsInRpbWUiLCJjb250YWluZXIiLCJub1Jldmlld3MiLCJ1bCIsImZvckVhY2giLCJjcmVhdGVSZXZpZXdIVE1MIiwibGkiLCJzZXRBdHRyaWJ1dGUiLCJkYXRlIiwiRGF0ZSIsImNyZWF0ZWRBdCIsInRvRGF0ZVN0cmluZyIsInVwZGF0ZWRBdCIsInVwZGF0ZURhdGUiLCJyYXRpbmciLCJjb21tZW50cyIsImVkaXRCdG4iLCJlZGl0SWNvbiIsImNsYXNzTGlzdCIsImFkZCIsInNldEVkaXRpbmciLCJhcHBlbmQiLCJkZWxldGVCdG4iLCJkZWxldGVJY29uIiwiYnJlYWRjcnVtYiIsIngiLCJVUkwiLCJsb2NhdGlvbiIsImhyZWYiLCJyZXBsYWNlIiwicmVnZXgiLCJSZWdFeHAiLCJleGVjIiwiZGVjb2RlVVJJQ29tcG9uZW50IiwiZ2V0Rm9ybVZhbHVlcyIsInRlc3QiLCJhbGVydCIsIm5vdyIsIk51bWJlciIsInJlc3VsdCIsImFsZXJ0TXNnIiwibmV3UmV2aWV3RWxlbSIsIm9sZFJldmlld0VsZW0iLCJwYXJlbnRFbGVtIiwicGFyZW50RWxlbWVudCIsInJlcGxhY2VDaGlsZCIsImVsZW1lbnQiLCJzY3JvbGxJbnRvVmlldyIsInJlc2V0Rm9ybVZhbHVlcyIsInNlY3Rpb24iLCJpbmRleCIsImdldEFsbCIsInRyaW0iLCJjYW5jZWxFZGl0aW5nIiwiZGlzcGxheSIsImNhbmNlbEVkaXRpbmdCdG4iLCJnb1RvQm90dG9tIiwiYXNrIiwiY29uZmlybSIsInJlbW92ZSIsInNjcm9sbFRvIiwic2Nyb2xsSGVpZ2h0IiwiY2FjaGVWZXJzaW9uIiwiU1RBVElDX0NBQ0hFIiwiSU1BR0VTX0NBQ0hFIiwiYWxsQ2FjaGVzIiwib3BlbkRCIiwidXBncmFkZSIsIm9sZFZlcnNpb24iLCJjcmVhdGVPYmplY3RTdG9yZSIsImtleVBhdGgiLCJjcmVhdGVJbmRleCIsInJldmlld3NTdG9yZSIsInBlbmRpbmdTdG9yZSIsImF1dG9JbmNyZW1lbnQiLCJnZXRSZXN0YXVyYW50cyIsInJlcXVlc3QiLCJyZXNwIiwiaXNJbWFnZVVSTCIsImltZ1R5cGVzIiwiaXNJbWFnZSIsInR5cGUiLCJlbmRzV2l0aCIsIndhaXRVbnRpbCIsImNhY2hlcyIsIm9wZW4iLCJjYWNoZSIsImFkZEFsbCIsImtleXMiLCJjYWNoZU5hbWVzIiwiYWxsIiwiY2FjaGVOYW1lIiwic3RhcnRzV2l0aCIsImNoZWNrVXJsIiwic2VhcmNoUGFyYW1zIiwiaGFuZGxlQUpBWEV2ZW50IiwiaGFuZGxlTm9uQUpBWEV2ZW50IiwicmVzcG9uZFdpdGgiLCJoYW5kbGVSZXN0YXVyYW50RXZlbnRzIiwiaGFuZGxlUmV2aWV3c0V2ZW50cyIsImZpbmFsUmVzcG9uc2UiLCJSZXNwb25zZSIsInN0YXR1cyIsImZldGNoUmVzcG9uc2UiLCJtYXRjaCIsInVzZUNhY2hlIiwiY2xvbmUiLCJzdGF0dXNUZXh0IiwidXBkYXRlIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxJQUFaO0FBQ2UsTUFBTUMsUUFBTixDQUFlO0FBQzVCLGFBQVdDLFlBQVgsR0FBMEI7QUFDeEIsVUFBTUMsSUFBSSxHQUFHLElBQWIsQ0FEd0IsQ0FDTDs7QUFDbkIsV0FDRUMs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QUNmOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbURBQVE7QUFDUjtBQUNBO0FBQ0EsQ0FBQzs7QUFFMkI7Ozs7Ozs7Ozs7OztBQzVFNUI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFDQUFxQzs7QUFFckM7QUFDQTtBQUNBOztBQUVBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsVUFBVSIsImZpbGUiOiJyZXN0YXVyYW50LmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vY2xpZW50L2pzL3Jlc3RhdXJhbnRfaW5mby5qc1wiKTtcbiIsImltcG9ydCB7IG9wZW5EQiwgZGVsZXRlREIsIHdyYXAsIHVud3JhcCB9IGZyb20gJ2lkYic7XG5pbXBvcnQgeyBkYlByb21pc2UgfSBmcm9tICcuLi9zdy5qcyc7XG5jb25zb2xlLmxvZygnaGknKTtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERCSGVscGVyIHtcbiAgc3RhdGljIGdldCBEQVRBQkFTRV9VUkwoKSB7XG4gICAgY29uc3QgcG9ydCA9IDEzMzc7IC8vIENoYW5nZSB0aGlzIHRvIHlvdXIgc2VydmVyIHBvcnRcbiAgICByZXR1cm4gKFxuICAgICAgcHJvY2Vzcy5lbnYuREFUQUJBU0VfVVJMIHx8IGBodHRwczovL213c2JhY2tlbmQuaGVyb2t1YXBwLmNvbS9yZXN0YXVyYW50c2BcbiAgICApO1xuICB9XG5cbiAgc3RhdGljIGdldCBEQVRBQkFTRV9SRVZJRVdTX1VSTCgpIHtcbiAgICBjb25zdCBwb3J0ID0gMTMzNzsgLy8gQ2hhbmdlIHRoaXMgdG8geW91ciBzZXJ2ZXIgcG9ydFxuICAgIHJldHVybiBgaHR0cHM6Ly9td3NiYWNrZW5kLmhlcm9rdWFwcC5jb20vcmV2aWV3c2A7XG4gIH1cblxuICAvKipcbiAgICogRmV0Y2ggYWxsIHJlc3RhdXJhbnRzLlxuICAgKi9cblxuICBzdGF0aWMgZmV0Y2hSZXN0YXVyYW50cyhjYWxsYmFjaykge1xuICAgIGZldGNoKERCSGVscGVyLkRBVEFCQVNFX1VSTCkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgIHJlc3BvbnNlLmpzb24oKS50aGVuKGZ1bmN0aW9uIChyZXN0YXVyYW50cykge1xuICAgICAgICBjYWxsYmFjayhudWxsLCByZXN0YXVyYW50cyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyBmZXRjaFJldmlld3MocmVzdGF1cmFudF9pZCwgY2FsbGJhY2spIHtcbiAgICBsZXQgZmV0Y2hVUkwgPVxuICAgICAgREJIZWxwZXIuREFUQUJBU0VfUkVWSUVXU19VUkwgKyAnLz9yZXN0YXVyYW50X2lkPScgKyByZXN0YXVyYW50X2lkO1xuICAgIGZldGNoKGZldGNoVVJMKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG4gICAgICB9KVxuICAgICAgLnRoZW4oKHJldmlld3MpID0+IHtcbiAgICAgICAgY2FsbGJhY2sobnVsbCwgcmV2aWV3cyk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICBjYWxsYmFjayhlcnJvciwgbnVsbCk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyBmZXRjaFJlc3RhdXJhbnRCeUlkKGlkLCBjYWxsYmFjaykge1xuICAgIC8vIGZldGNoIGFsbCByZXN0YXVyYW50cyB3aXRoIHByb3BlciBlcnJvciBoYW5kbGluZy5cbiAgICBEQkhlbHBlci5mZXRjaFJlc3RhdXJhbnRzKChlcnJvciwgcmVzdGF1cmFudHMpID0+IHtcbiAgICAgIGlmIChlcnJvcikge1xuICAgICAgICBjYWxsYmFjayhlcnJvciwgbnVsbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCByZXN0YXVyYW50ID0gcmVzdGF1cmFudHMuZmluZCgocikgPT4gci5pZCA9PSBpZCk7XG4gICAgICAgIGlmIChyZXN0YXVyYW50KSB7XG4gICAgICAgICAgLy8gR290IHRoZSByZXN0YXVyYW50XG4gICAgICAgICAgY2FsbGJhY2sobnVsbCwgcmVzdGF1cmFudCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gUmVzdGF1cmFudCBkb2VzIG5vdCBleGlzdCBpbiB0aGUgZGF0YWJhc2VcbiAgICAgICAgICBjYWxsYmFjaygnUmVzdGF1cmFudCBkb2VzIG5vdCBleGlzdCcsIG51bGwpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogRmV0Y2ggcmVzdGF1cmFudHMgYnkgYSBjdWlzaW5lIHR5cGUgd2l0aCBwcm9wZXIgZXJyb3IgaGFuZGxpbmcuXG4gICAqL1xuICBzdGF0aWMgZmV0Y2hSZXN0YXVyYW50QnlDdWlzaW5lKGN1aXNpbmUsIGNhbGxiYWNrKSB7XG4gICAgLy8gRmV0Y2ggYWxsIHJlc3RhdXJhbnRzICB3aXRoIHByb3BlciBlcnJvciBoYW5kbGluZ1xuICAgIERCSGVscGVyLmZldGNoUmVzdGF1cmFudHMoKGVycm9yLCByZXN0YXVyYW50cykgPT4ge1xuICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgIGNhbGxiYWNrKGVycm9yLCBudWxsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEZpbHRlciByZXN0YXVyYW50cyB0byBoYXZlIG9ubHkgZ2l2ZW4gY3Vpc2luZSB0eXBlXG4gICAgICAgIGNvbnN0IHJlc3VsdHMgPSByZXN0YXVyYW50cy5maWx0ZXIoKHIpID0+IHIuY3Vpc2luZV90eXBlID09IGN1aXNpbmUpO1xuICAgICAgICBjYWxsYmFjayhudWxsLCByZXN1bHRzKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGZXRjaCByZXN0YXVyYW50cyBieSBhIG5laWdoYm9yaG9vZCB3aXRoIHByb3BlciBlcnJvciBoYW5kbGluZy5cbiAgICovXG4gIHN0YXRpYyBmZXRjaFJlc3RhdXJhbnRCeU5laWdoYm9yaG9vZChuZWlnaGJvcmhvb2QsIGNhbGxiYWNrKSB7XG4gICAgLy8gRmV0Y2ggYWxsIHJlc3RhdXJhbnRzXG4gICAgREJIZWxwZXIuZmV0Y2hSZXN0YXVyYW50cygoZXJyb3IsIHJlc3RhdXJhbnRzKSA9PiB7XG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgY2FsbGJhY2soZXJyb3IsIG51bGwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gRmlsdGVyIHJlc3RhdXJhbnRzIHRvIGhhdmUgb25seSBnaXZlbiBuZWlnaGJvcmhvb2RcbiAgICAgICAgY29uc3QgcmVzdWx0cyA9IHJlc3RhdXJhbnRzLmZpbHRlcihcbiAgICAgICAgICAocikgPT4gci5uZWlnaGJvcmhvb2QgPT0gbmVpZ2hib3Job29kXG4gICAgICAgICk7XG4gICAgICAgIGNhbGxiYWNrKG51bGwsIHJlc3VsdHMpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEZldGNoIHJlc3RhdXJhbnRzIGJ5IGEgY3Vpc2luZSBhbmQgYSBuZWlnaGJvcmhvb2Qgd2l0aCBwcm9wZXIgZXJyb3IgaGFuZGxpbmcuXG4gICAqL1xuICBzdGF0aWMgZmV0Y2hSZXN0YXVyYW50QnlDdWlzaW5lQW5kTmVpZ2hib3Job29kKFxuICAgIGN1aXNpbmUsXG4gICAgbmVpZ2hib3Job29kLFxuICAgIGNhbGxiYWNrXG4gICkge1xuICAgIC8vIEZldGNoIGFsbCByZXN0YXVyYW50c1xuICAgIERCSGVscGVyLmZldGNoUmVzdGF1cmFudHMoKGVycm9yLCByZXN0YXVyYW50cykgPT4ge1xuICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgIGNhbGxiYWNrKGVycm9yLCBudWxsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCByZXN1bHRzID0gcmVzdGF1cmFudHM7XG4gICAgICAgIGlmIChjdWlzaW5lICE9ICdhbGwnKSB7XG4gICAgICAgICAgLy8gZmlsdGVyIGJ5IGN1aXNpbmVcbiAgICAgICAgICByZXN1bHRzID0gcmVzdWx0cy5maWx0ZXIoKHIpID0+IHIuY3Vpc2luZV90eXBlID09IGN1aXNpbmUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuZWlnaGJvcmhvb2QgIT0gJ2FsbCcpIHtcbiAgICAgICAgICAvLyBmaWx0ZXIgYnkgbmVpZ2hib3Job29kXG4gICAgICAgICAgcmVzdWx0cyA9IHJlc3VsdHMuZmlsdGVyKChyKSA9PiByLm5laWdoYm9yaG9vZCA9PSBuZWlnaGJvcmhvb2QpO1xuICAgICAgICB9XG4gICAgICAgIGNhbGxiYWNrKG51bGwsIHJlc3VsdHMpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEZldGNoIGFsbCBuZWlnaGJvcmhvb2RzIHdpdGggcHJvcGVyIGVycm9yIGhhbmRsaW5nLlxuICAgKi9cbiAgc3RhdGljIGZldGNoTmVpZ2hib3Job29kcyhjYWxsYmFjaykge1xuICAgIC8vIEZldGNoIGFsbCByZXN0YXVyYW50c1xuICAgIERCSGVscGVyLmZldGNoUmVzdGF1cmFudHMoKGVycm9yLCByZXN0YXVyYW50cykgPT4ge1xuICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgIGNhbGxiYWNrKGVycm9yLCBudWxsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEdldCBhbGwgbmVpZ2hib3Job29kcyBmcm9tIGFsbCByZXN0YXVyYW50c1xuICAgICAgICBjb25zdCBuZWlnaGJvcmhvb2RzID0gcmVzdGF1cmFudHMubWFwKFxuICAgICAgICAgICh2LCBpKSA9PiByZXN0YXVyYW50c1tpXS5uZWlnaGJvcmhvb2RcbiAgICAgICAgKTtcbiAgICAgICAgLy8gUmVtb3ZlIGR1cGxpY2F0ZXMgZnJvbSBuZWlnaGJvcmhvb2RzXG4gICAgICAgIGNvbnN0IHVuaXF1ZU5laWdoYm9yaG9vZHMgPSBuZWlnaGJvcmhvb2RzLmZpbHRlcihcbiAgICAgICAgICAodiwgaSkgPT4gbmVpZ2hib3Job29kcy5pbmRleE9mKHYpID09IGlcbiAgICAgICAgKTtcbiAgICAgICAgY2FsbGJhY2sobnVsbCwgdW5pcXVlTmVpZ2hib3Job29kcyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogRmV0Y2ggYWxsIGN1aXNpbmVzIHdpdGggcHJvcGVyIGVycm9yIGhhbmRsaW5nLlxuICAgKi9cbiAgc3RhdGljIGZldGNoQ3Vpc2luZXMoY2FsbGJhY2spIHtcbiAgICAvLyBGZXRjaCBhbGwgcmVzdGF1cmFudHNcbiAgICBEQkhlbHBlci5mZXRjaFJlc3RhdXJhbnRzKChlcnJvciwgcmVzdGF1cmFudHMpID0+IHtcbiAgICAgIGlmIChlcnJvcikge1xuICAgICAgICBjYWxsYmFjayhlcnJvciwgbnVsbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBHZXQgYWxsIGN1aXNpbmVzIGZyb20gYWxsIHJlc3RhdXJhbnRzXG4gICAgICAgIGNvbnN0IGN1aXNpbmVzID0gcmVzdGF1cmFudHMubWFwKCh2LCBpKSA9PiByZXN0YXVyYW50c1tpXS5jdWlzaW5lX3R5cGUpO1xuICAgICAgICAvLyBSZW1vdmUgZHVwbGljYXRlcyBmcm9tIGN1aXNpbmVzXG4gICAgICAgIGNvbnN0IHVuaXF1ZUN1aXNpbmVzID0gY3Vpc2luZXMuZmlsdGVyKFxuICAgICAgICAgICh2LCBpKSA9PiBjdWlzaW5lcy5pbmRleE9mKHYpID09IGlcbiAgICAgICAgKTtcbiAgICAgICAgY2FsbGJhY2sobnVsbCwgdW5pcXVlQ3Vpc2luZXMpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc3RhdXJhbnQgcGFnZSBVUkwuXG4gICAqL1xuICBzdGF0aWMgdXJsRm9yUmVzdGF1cmFudChyZXN0YXVyYW50KSB7XG4gICAgcmV0dXJuIGAvcmVzdGF1cmFudC5odG1sP2lkPSR7cmVzdGF1cmFudC5pZH1gO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc3RhdXJhbnQgaW1hZ2UgVVJMLlxuICAgKi9cbiAgc3RhdGljIGltYWdlVXJsRm9yUmVzdGF1cmFudChyZXN0YXVyYW50KSB7XG4gICAgaWYgKCFyZXN0YXVyYW50LnBob3RvZ3JhcGgpIHtcbiAgICAgIHJldHVybiBgL2ltZy8ke3Jlc3RhdXJhbnQuaWR9LmpwZ2A7XG4gICAgfVxuICAgIHJldHVybiBgL2ltZy8ke3Jlc3RhdXJhbnQucGhvdG9ncmFwaH0uanBnYDtcbiAgfVxuXG4gIC8qKlxuICAgKiBNYXAgbWFya2VyIGZvciBhIHJlc3RhdXJhbnQuXG4gICAqL1xuICBzdGF0aWMgbWFwTWFya2VyRm9yUmVzdGF1cmFudChyZXN0YXVyYW50LCBtYXApIHtcbiAgICAvLyBodHRwczovL2xlYWZsZXRqcy5jb20vcmVmZXJlbmNlLTEuMy4wLmh0bWwjbWFya2VyXG4gICAgY29uc3QgbWFya2VyID0gbmV3IEwubWFya2VyKFxuICAgICAgW3Jlc3RhdXJhbnQubGF0bG5nLmxhdCwgcmVzdGF1cmFudC5sYXRsbmcubG5nXSxcbiAgICAgIHtcbiAgICAgICAgdGl0bGU6IHJlc3RhdXJhbnQubmFtZSxcbiAgICAgICAgYWx0OiByZXN0YXVyYW50Lm5hbWUsXG4gICAgICAgIHVybDogREJIZWxwZXIudXJsRm9yUmVzdGF1cmFudChyZXN0YXVyYW50KSxcbiAgICAgIH1cbiAgICApO1xuICAgIG1hcmtlci5hZGRUbyhuZXdNYXApO1xuICAgIHJldHVybiBtYXJrZXI7XG4gIH1cblxuICBzdGF0aWMgdXBkYXRlQ2FjaGVkUmVzdGF1cmFudFJldmlldyhmb3JtRGF0YSkge1xuICAgIGNvbnNvbGUubG9nKCd1cGRhdGluZyBjYWNoZSBmb3IgbmV3IHJldmlldycsIGZvcm1EYXRhKTtcbiAgICByZXR1cm4gZGJQcm9taXNlLnRoZW4oKGRiKSA9PiB7XG4gICAgICBjb25zdCB0eCA9IGRiLnRyYW5zYWN0aW9uKCdyZXZpZXdzJywgJ3JlYWR3cml0ZScpO1xuICAgICAgY29uc3Qgc3RvcmUgPSB0eC5vYmplY3RTdG9yZSgncmV2aWV3cycpO1xuICAgICAgc3RvcmUucHV0KGZvcm1EYXRhKTtcbiAgICAgIGNvbnNvbGUubG9nKCdzdWNjZXNzZnVsbHkgcHV0IHJldmlldyBpbiBzdG9yZScpO1xuICAgICAgcmV0dXJuIHR4LmRvbmU7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogR3JhYiB0aGUgb3JpZ2luYWwgcmV2aWV3IGZyb20gdGhlIGRiIGFuZCByZXBsYWNlIHdpdGggZWRpdGVkIHJldmlld1xuICAgKi9cbiAgc3RhdGljIGVkaXRSZXZpZXcoZm9ybURhdGEsIGVkaXRpbmcpIHtcbiAgICByZXR1cm4gZGJQcm9taXNlXG4gICAgICAudGhlbigoZGIpID0+IHtcbiAgICAgICAgbGV0IHR4ID0gZGIudHJhbnNhY3Rpb24oJ3Jldmlld3MnKTtcbiAgICAgICAgbGV0IHN0b3JlID0gdHgub2JqZWN0U3RvcmUoJ3Jldmlld3MnKTtcbiAgICAgICAgcmV0dXJuIHN0b3JlLmdldChlZGl0aW5nLmlkKTtcbiAgICAgIH0pXG4gICAgICAudGhlbigocmV2aWV3KSA9PiB7XG4gICAgICAgIHJldHVybiBkYlByb21pc2UudGhlbigoZGIpID0+IHtcbiAgICAgICAgICBsZXQgdHggPSBkYi50cmFuc2FjdGlvbigncmV2aWV3cycsICdyZWFkd3JpdGUnKTtcbiAgICAgICAgICBsZXQgc3RvcmUgPSB0eC5vYmplY3RTdG9yZSgncmV2aWV3cycpO1xuICAgICAgICAgIGxldCBuZXdSZXZpZXcgPSBPYmplY3QuYXNzaWduKHt9LCByZXZpZXcsIGZvcm1EYXRhKTtcbiAgICAgICAgICBzdG9yZS5wdXQobmV3UmV2aWV3KTtcbiAgICAgICAgICByZXR1cm4gdHguY29tcGxldGU7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gIH1cblxuICBzdGF0aWMgc3VibWl0UmV2aWV3KGZvcm1EYXRhLCBlZGl0aW5nKSB7XG4gICAgY29uc29sZS5sb2coZWRpdGluZyk7XG4gICAgY29uc3QgbWV0aG9kID0gZWRpdGluZyA/ICdQVVQnIDogJ1BPU1QnO1xuICAgIGNvbnN0IHVybCA9IGVkaXRpbmdcbiAgICAgID8gYCR7REJIZWxwZXIuREFUQUJBU0VfUkVWSUVXU19VUkx9LyR7ZWRpdGluZy5pZH1gXG4gICAgICA6IERCSGVscGVyLkRBVEFCQVNFX1JFVklFV1NfVVJMO1xuICAgIGlmIChlZGl0aW5nKSB7XG4gICAgICBEQkhlbHBlci5lZGl0UmV2aWV3KGZvcm1EYXRhLCBlZGl0aW5nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgREJIZWxwZXIudXBkYXRlQ2FjaGVkUmVzdGF1cmFudFJldmlldyhmb3JtRGF0YSk7XG4gICAgfVxuICAgIHJldHVybiBEQkhlbHBlci5hZGRQZW5kaW5nUmVxdWVzdFRvUXVlKHVybCwgbWV0aG9kLCBmb3JtRGF0YSk7XG4gIH1cblxuICBzdGF0aWMgYWRkUGVuZGluZ1JlcXVlc3RUb1F1ZSh1cmwsIG1ldGhvZCwgZm9ybURhdGEpIHtcbiAgICAvL29wZW4gZGF0YWJhc2UgYW5kIGFkZCByZXF1ZXN0IGRldGFpbHMgdG8gdGhlIHBlbmRpbmcgc3RvcmVcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgZGJQcm9taXNlXG4gICAgICAgIC50aGVuKChkYikgPT4ge1xuICAgICAgICAgIGNvbnN0IHR4ID0gZGIudHJhbnNhY3Rpb24oJ3BlbmRpbmcnLCAncmVhZHdyaXRlJyk7XG4gICAgICAgICAgY29uc3Qgc3RvcmUgPSB0eC5vYmplY3RTdG9yZSgncGVuZGluZycpO1xuICAgICAgICAgIHJldHVybiBzdG9yZS5wdXQoe1xuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICB1cmwsXG4gICAgICAgICAgICAgIG1ldGhvZCxcbiAgICAgICAgICAgICAgZm9ybURhdGEsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coYEVycm9yIHB1dHRpbmcgZGF0YSBpbiBwZW5kaW5nIGRiOiAke2Vycm9yfWApO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbihcbiAgICAgICAgICBEQkhlbHBlci5uZXh0UGVuZGluZygoZXJyb3IsIGpzb24pID0+IHtcbiAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoanNvbik7XG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyBuZXh0UGVuZGluZyhjYWxsYmFjaykge1xuICAgIERCSGVscGVyLmF0dGVtcHRDb21taXRQZW5kaW5nKERCSGVscGVyLm5leHRQZW5kaW5nKVxuICAgICAgLnRoZW4oKGopID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coaik7XG4gICAgICAgIGNhbGxiYWNrKG51bGwsIGopO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICBjYWxsYmFjayhlcnJvcik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIGF0dGVtcHRDb21taXRQZW5kaW5nKGNhbGxiYWNrKSB7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIHRoZSBwZW5kaW5nIGl0ZW1zIHVudGlsIHRoZXJlIGlzIGEgbmV0d29yayBmYWlsdXJlXG4gICAgbGV0IHVybDtcbiAgICBsZXQgbWV0aG9kO1xuICAgIGxldCBib2R5O1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGRiUHJvbWlzZS50aGVuKChkYikgPT4ge1xuICAgICAgICBpZiAoIWRiLm9iamVjdFN0b3JlTmFtZXMubGVuZ3RoKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ0RCIG5vdCBhdmFpbGFibGUnKTtcbiAgICAgICAgICBkYi5jbG9zZSgpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB0eCA9IGRiLnRyYW5zYWN0aW9uKCdwZW5kaW5nJywgJ3JlYWR3cml0ZScpO1xuICAgICAgICBjb25zdCBzdG9yZSA9IHR4Lm9iamVjdFN0b3JlKCdwZW5kaW5nJyk7XG4gICAgICAgIHN0b3JlLm9wZW5DdXJzb3IoKS50aGVuKChjdXJzb3IpID0+IHtcbiAgICAgICAgICBpZiAoIWN1cnNvcikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ25vIG1vcmUgY3Vyc29ycycpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCB2YWx1ZSA9IGN1cnNvci52YWx1ZTtcbiAgICAgICAgICB1cmwgPSB2YWx1ZS5kYXRhLnVybDtcbiAgICAgICAgICBtZXRob2QgPSB2YWx1ZS5kYXRhLm1ldGhvZDtcbiAgICAgICAgICBib2R5ID0gdmFsdWUuZGF0YS5mb3JtRGF0YTtcblxuICAgICAgICAgIC8vIElmIHdlIGRvbid0IGhhdmUgYSBwYXJhbWV0ZXIgdGhlbiB3ZSdyZSBvbiBhIGJhZCByZWNvcmQgdGhhdCBzaG91bGQgYmUgdG9zc2VkXG4gICAgICAgICAgLy8gYW5kIHRoZW4gbW92ZSBvblxuICAgICAgICAgIGlmICghdXJsIHx8ICFtZXRob2QgfHwgKG1ldGhvZCA9PT0gJ1BPU1QnICYmICFib2R5KSkge1xuICAgICAgICAgICAgY3Vyc29yLmRlbGV0ZSgpLnRoZW4oY2FsbGJhY2spO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2RlbGV0ZWQgYSBiYWQgY3Vyc29yJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgcHJvcGVydGllcyA9IHtcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGJvZHkpLFxuICAgICAgICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICAgICAgfTtcblxuICAgICAgICAgIGZldGNoKHVybCwgcHJvcGVydGllcylcbiAgICAgICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG5cbiAgICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5vayAmJiAhcmVzcG9uc2UucmVkaXJlY3RlZCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0aGlzIGlzIHRoZSByZXNwb25zZSBhbmQgd2UgYXJlIG9mZmxpbmUnKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCkudGhlbigoanNvbikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRlbHR4ID0gZGIudHJhbnNhY3Rpb24oJ3BlbmRpbmcnLCAncmVhZHdyaXRlJyk7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3RvcmUgPSBkZWx0eC5vYmplY3RTdG9yZSgncGVuZGluZycpO1xuICAgICAgICAgICAgICAgIHJldHVybiBzdG9yZS5vcGVuQ3Vyc29yKCkudGhlbigoY3Vyc29yKSA9PiB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gY3Vyc29yLmRlbGV0ZSgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhjdXJzb3IudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZGVsZXRlZCBpdGVtIGZyb20gcGVuZGluZyBzdG9yZScpO1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhqc29uKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoanNvbik7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgICAgIHJldHVybiByZWplY3QoJ25vIG5ldHdvcmsnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIHN5bmNSZXN0YXVyYW50KHJlc3RhdXJhbnQpIHtcbiAgICBsZXQgdXJsID0gYGh0dHBzOi8vbXdzYmFja2VuZC5oZXJva3VhcHAuY29tL3Jlc3RhdXJhbnRzLyR7cmVzdGF1cmFudC5pZH0vP2lzX2Zhdm9yaXRlPSR7cmVzdGF1cmFudC5pc19mYXZvcml0ZX1gO1xuICAgIGxldCBtZXRob2QgPSAnUFVUJztcbiAgICBEQkhlbHBlci5hZGRQZW5kaW5nUmVxdWVzdFRvUXVlKHVybCwgbWV0aG9kKS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAnZXJyb3IgdXBkYXRpbmcgcmVzdGF1cmFudCBiYWNrZW5kIGRhdGEuLi4nLFxuICAgICAgICBlcnJvcixcbiAgICAgICAgcmVzdGF1cmFudFxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyB1cGRhdGVSZXN0YXVyYW50SW5EQihuZXdfcmVzdGF1cmFudCkge1xuICAgIHJldHVybiBkYlByb21pc2VcbiAgICAgIC50aGVuKGZ1bmN0aW9uIChkYikge1xuICAgICAgICBsZXQgdHggPSBkYi50cmFuc2FjdGlvbigncmVzdGF1cmFudHMnLCAncmVhZHdyaXRlJyk7XG4gICAgICAgIGxldCBzdG9yZSA9IHR4Lm9iamVjdFN0b3JlKCdyZXN0YXVyYW50cycpO1xuICAgICAgICBzdG9yZS5wdXQobmV3X3Jlc3RhdXJhbnQpO1xuICAgICAgICByZXR1cm4gdHguY29tcGxldGU7XG4gICAgICB9KVxuICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG5ld19yZXN0YXVyYW50KTtcbiAgICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIHRvZ2dsZUZhdkJ0bihyZXN0YXVyYW50X2lkKSB7XG4gICAgcmV0dXJuIGRiUHJvbWlzZVxuICAgICAgLnRoZW4oKGRiKSA9PiB7XG4gICAgICAgIGxldCB0eCA9IGRiLnRyYW5zYWN0aW9uKCdyZXN0YXVyYW50cycpO1xuICAgICAgICBsZXQgc3RvcmUgPSB0eC5vYmplY3RTdG9yZSgncmVzdGF1cmFudHMnKTtcbiAgICAgICAgcmV0dXJuIHN0b3JlLmdldChyZXN0YXVyYW50X2lkKTtcbiAgICAgIH0pXG4gICAgICAudGhlbigocmVzdGF1cmFudCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXN0YXVyYW50KTtcbiAgICAgICAgY29uc3QgbmV3X3Jlc3RhdXJhbnQgPSBPYmplY3QuYXNzaWduKHt9LCByZXN0YXVyYW50KTtcbiAgICAgICAgbmV3X3Jlc3RhdXJhbnQuaXNfZmF2b3JpdGUgPVxuICAgICAgICAgIHJlc3RhdXJhbnQuaXNfZmF2b3JpdGUgPT09ICd0cnVlJyB8fCByZXN0YXVyYW50LmlzX2Zhdm9yaXRlID09PSB0cnVlXG4gICAgICAgICAgICA/ICdmYWxzZSdcbiAgICAgICAgICAgIDogJ3RydWUnO1xuICAgICAgICBEQkhlbHBlci5zeW5jUmVzdGF1cmFudChuZXdfcmVzdGF1cmFudCk7XG4gICAgICAgIHJldHVybiBEQkhlbHBlci51cGRhdGVSZXN0YXVyYW50SW5EQihuZXdfcmVzdGF1cmFudCk7XG4gICAgICB9KVxuICAgICAgLnRoZW4oKG5ld19yZXN0YXVyYW50KSA9PiB7XG4gICAgICAgIGNvbnN0IGZhdkJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBmYXYtYnRuLSR7bmV3X3Jlc3RhdXJhbnQuaWR9YCk7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBuZXdfcmVzdGF1cmFudC5pc19mYXZvcml0ZSA9PT0gJ3RydWUnIHx8XG4gICAgICAgICAgbmV3X3Jlc3RhdXJhbnQuaXNfZmF2b3JpdGUgPT09IHRydWVcbiAgICAgICAgKSB7XG4gICAgICAgICAgZmF2QnRuLmlubmVySFRNTCA9ICdGYXZvcml0ZWQhJztcbiAgICAgICAgICBmYXZCdG4uc3R5bGUuYmFja2dyb3VuZCA9ICdob3RwaW5rJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmYXZCdG4uaW5uZXJIVE1MID0gJ0FkZCB0byBmYXZvcml0ZSc7XG4gICAgICAgICAgZmF2QnRuLnN0eWxlLmJhY2tncm91bmQgPSAnZ3JleSc7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIGRlbGV0ZUNhY2hlZFJldmlldyhyZXZpZXdfaWQpIHtcbiAgICByZXR1cm4gZGJQcm9taXNlXG4gICAgICAudGhlbigoZGIpID0+IHtcbiAgICAgICAgbGV0IHR4ID0gZGIudHJhbnNhY3Rpb24oJ3Jldmlld3MnLCAncmVhZHdyaXRlJyk7XG4gICAgICAgIGxldCBzdG9yZSA9IHR4Lm9iamVjdFN0b3JlKCdyZXZpZXdzJyk7XG4gICAgICAgIHN0b3JlLmRlbGV0ZShyZXZpZXdfaWQpO1xuICAgICAgICBjb25zb2xlLmxvZygnZGVsZXRlZCByZXZpZXcgZnJvbSBpZGInKTtcbiAgICAgICAgcmV0dXJuIHR4LmNvbXBsZXRlO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ2Vycm9yIGRlbGV0aW5nIHJldmlldzogJywgZXJyb3IpO1xuICAgICAgfSk7XG4gIH1cblxuICBzdGF0aWMgZGVsZXRlUmV2aWV3KHJldmlld19pZCkge1xuICAgIGNvbnN0IHVybCA9IGAke0RCSGVscGVyLkRBVEFCQVNFX1JFVklFV1NfVVJMfS8ke3Jldmlld19pZH1gO1xuICAgIGNvbnNvbGUubG9nKHVybCk7XG4gICAgY29uc3QgbWV0aG9kID0gJ0RFTEVURSc7XG4gICAgREJIZWxwZXIuZGVsZXRlQ2FjaGVkUmV2aWV3KHJldmlld19pZCk7XG4gICAgcmV0dXJuIERCSGVscGVyLmFkZFBlbmRpbmdSZXF1ZXN0VG9RdWUodXJsLCBtZXRob2QpO1xuICB9XG5cbiAgc3RhdGljIGRlbGV0ZVRlbXBSZXZpZXcodGVtcF9pZCkge1xuICAgIGRiUHJvbWlzZVxuICAgICAgLnRoZW4oKGRiKSA9PiB7XG4gICAgICAgIGxldCB0eCA9IGRiLnRyYW5zYWN0aW9uKCdyZXZpZXdzJywgJ3JlYWR3cml0ZScpO1xuICAgICAgICBsZXQgc3RvcmUgPSB0eC5vYmplY3RTdG9yZSgncmV2aWV3cycpO1xuICAgICAgICBzdG9yZS5kZWxldGUodGVtcF9pZCk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdkZWxldGVkIG9sZHZlcnNpb24gb2YgcmV2aWV3IHdpdGggb2xkIGlkJyk7XG4gICAgICAgIHJldHVybiB0eC5jb21wbGV0ZTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdlcnJvciBkZWxldGluZyB0ZW1wIHJldmlldzogJywgZXJyb3IpO1xuICAgICAgfSk7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IChmdW5jdGlvbiAoKSB7XG5cbiAgaWYgKCdzZXJ2aWNlV29ya2VyJyBpbiBuYXZpZ2F0b3IpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcbiAgICAgIG5hdmlnYXRvci5zZXJ2aWNlV29ya2VyLnJlZ2lzdGVyKCcvc2VydmljZXdvcmtlci5idW5kbGUuanMnKS50aGVuKHJlZ2lzdHJhdGlvbiA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdTVyByZWdpc3RlcmVkOiAnLCByZWdpc3RyYXRpb24pO1xuICAgICAgfSkuY2F0Y2gocmVnaXN0cmF0aW9uRXJyb3IgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnU1cgcmVnaXN0cmF0aW9uIGZhaWxlZDogJywgcmVnaXN0cmF0aW9uRXJyb3IpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxufSkoKTtcblxuXG4iLCJpbXBvcnQgcmVnaXN0cmF0aW9uIGZyb20gJy4vcmVnaXN0cmF0aW9uJztcbmltcG9ydCBEQkhlbHBlciBmcm9tICcuL2RiaGVscGVyJztcbmxldCByZXN0YXVyYW50O1xubGV0IHN1Ym1pdEJ0bjtcbnZhciBuZXdNYXA7XG5sZXQgZWRpdGluZyA9IGZhbHNlO1xuaW1wb3J0IHsgZGJQcm9taXNlIH0gZnJvbSAnLi4vc3cuanMnO1xuY29uc29sZS5sb2cocHJvY2Vzcy5lbnYuQVBJX0tFWSk7XG4vKipcbiAqIEluaXRpYWxpemUgbWFwIGFzIHNvb24gYXMgdGhlIHBhZ2UgaXMgbG9hZGVkLlxuICovXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKGV2ZW50KSA9PiB7XG4gIGluaXRNYXAoKTtcblxuICBzdWJtaXRCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3VibWl0LWZvcm0tYnRuJyk7XG4gIHN1Ym1pdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHN1Ym1pdFJldmlldyk7XG5cbiAgLy9jaGVjayBmb3IgcGVuZGluZyByZXZpZXdzIG9uIHBhZ2UgbG9hZCBhbmQgcG9wXG4gIERCSGVscGVyLm5leHRQZW5kaW5nKCk7XG59KTtcblxuLyoqXG4gKiBJbml0aWFsaXplIGxlYWZsZXQgbWFwXG4gKi9cbmNvbnN0IGluaXRNYXAgPSAoKSA9PiB7XG4gIGZldGNoUmVzdGF1cmFudEZyb21VUkwoKGVycm9yLCByZXN0YXVyYW50KSA9PiB7XG4gICAgaWYgKGVycm9yKSB7XG4gICAgICAvLyBHb3QgYW4gZXJyb3IhXG4gICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbmV3TWFwID0gTC5tYXAoJ21hcGlkJywge1xuICAgICAgICBjZW50ZXI6IFs0MC43MjIyMTYsIC03My45ODc1MDFdLFxuICAgICAgICB6b29tOiAxMixcbiAgICAgICAgc2Nyb2xsV2hlZWxab29tOiBmYWxzZSxcbiAgICAgIH0pO1xuICAgICAgc2VsZi5uZXdNYXAgPSBuZXdNYXA7XG4gICAgICBMLnRpbGVMYXllcihcbiAgICAgICAgJ2h0dHBzOi8vYXBpLm1hcGJveC5jb20vc3R5bGVzL3YxL3tpZH0vdGlsZXMve3p9L3t4fS97eX0/YWNjZXNzX3Rva2VuPXthY2Nlc3NUb2tlbn0nLFxuICAgICAgICB7XG4gICAgICAgICAgYXR0cmlidXRpb246XG4gICAgICAgICAgICAnwqkgPGEgaHJlZj1cImh0dHBzOi8vd3d3Lm1hcGJveC5jb20vYWJvdXQvbWFwcy9cIj5NYXBib3g8L2E+IMKpIDxhIGhyZWY9XCJodHRwOi8vd3d3Lm9wZW5zdHJlZXRtYXAub3JnL2NvcHlyaWdodFwiPk9wZW5TdHJlZXRNYXA8L2E+IDxzdHJvbmc+PGEgaHJlZj1cImh0dHBzOi8vd3d3Lm1hcGJveC5jb20vbWFwLWZlZWRiYWNrL1wiIHRhcmdldD1cIl9ibGFua1wiPkltcHJvdmUgdGhpcyBtYXA8L2E+PC9zdHJvbmc+JyxcbiAgICAgICAgICB0aWxlU2l6ZTogNTEyLFxuICAgICAgICAgIG1heFpvb206IDE4LFxuICAgICAgICAgIHpvb21PZmZzZXQ6IC0xLFxuICAgICAgICAgIGlkOiAnbWFwYm94L3N0cmVldHMtdjExJyxcbiAgICAgICAgICBhY2Nlc3NUb2tlbjogcHJvY2Vzcy5lbnYuQVBJX0tFWSxcbiAgICAgICAgfVxuICAgICAgKS5hZGRUbyhuZXdNYXApO1xuICAgICAgZmlsbEJyZWFkY3J1bWIoKTtcbiAgICAgIERCSGVscGVyLm1hcE1hcmtlckZvclJlc3RhdXJhbnQoc2VsZi5yZXN0YXVyYW50LCBzZWxmLm5ld01hcCk7XG4gICAgfVxuICB9KTtcbn07XG5cbi8qKlxuICogR2V0IGN1cnJlbnQgcmVzdGF1cmFudCBmcm9tIHBhZ2UgVVJMLlxuICovXG5jb25zdCBmZXRjaFJlc3RhdXJhbnRGcm9tVVJMID0gKGNhbGxiYWNrKSA9PiB7XG4gIGlmIChzZWxmLnJlc3RhdXJhbnQpIHtcbiAgICAvLyByZXN0YXVyYW50IGFscmVhZHkgZmV0Y2hlZCFcbiAgICBjYWxsYmFjayhudWxsLCBzZWxmLnJlc3RhdXJhbnQpO1xuICAgIGNvbnNvbGUubG9nKCdzZWxmIHJlc3RhdXJhbnQgYWxyZWFkeSBmZXRjaGVkJyk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgaWQgPSBnZXRQYXJhbWV0ZXJCeU5hbWUoJ2lkJyk7XG4gIGlmICghaWQpIHtcbiAgICAvLyBubyBpZCBmb3VuZCBpbiBVUkxcbiAgICBlcnJvciA9ICdObyByZXN0YXVyYW50IGlkIGluIFVSTCc7XG4gICAgY2FsbGJhY2soZXJyb3IsIG51bGwpO1xuICB9IGVsc2Uge1xuICAgIERCSGVscGVyLmZldGNoUmVzdGF1cmFudEJ5SWQoaWQsIChlcnJvciwgcmVzdGF1cmFudCkgPT4ge1xuICAgICAgc2VsZi5yZXN0YXVyYW50ID0gcmVzdGF1cmFudDtcbiAgICAgIGlmICghcmVzdGF1cmFudCkge1xuICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgZmlsbFJlc3RhdXJhbnRIVE1MKCk7XG4gICAgICBjYWxsYmFjayhudWxsLCByZXN0YXVyYW50KTtcbiAgICB9KTtcbiAgfVxufTtcbi8qKlxuICogQ3JlYXRlIHJlc3RhdXJhbnQgSFRNTCBhbmQgYWRkIGl0IHRvIHRoZSB3ZWJwYWdlXG4gKi9cbmNvbnN0IGZpbGxSZXN0YXVyYW50SFRNTCA9IChyZXN0YXVyYW50ID0gc2VsZi5yZXN0YXVyYW50KSA9PiB7XG4gIGNvbnN0IG5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzdGF1cmFudC1uYW1lJyk7XG4gIG5hbWUuaW5uZXJIVE1MID0gcmVzdGF1cmFudC5uYW1lO1xuXG4gIGNvbnN0IGFkZHJlc3MgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzdGF1cmFudC1hZGRyZXNzJyk7XG4gIGFkZHJlc3MuaW5uZXJIVE1MID0gYCAke3Jlc3RhdXJhbnQubmFtZX0gPGJyPiAke3Jlc3RhdXJhbnQuYWRkcmVzc31gO1xuXG4gIGNvbnN0IGltYWdlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc3RhdXJhbnQtaW1nJyk7XG4gIGltYWdlLmNsYXNzTmFtZSA9ICdyZXN0YXVyYW50LWltZyc7XG4gIGltYWdlLnNyYyA9IERCSGVscGVyLmltYWdlVXJsRm9yUmVzdGF1cmFudChyZXN0YXVyYW50KTtcblxuICBjb25zdCBjdWlzaW5lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc3RhdXJhbnQtY3Vpc2luZScpO1xuICBjdWlzaW5lLmlubmVySFRNTCA9IHJlc3RhdXJhbnQuY3Vpc2luZV90eXBlO1xuXG4gIC8vIGZpbGwgb3BlcmF0aW5nIGhvdXJzXG4gIGlmIChyZXN0YXVyYW50Lm9wZXJhdGluZ19ob3Vycykge1xuICAgIGZpbGxSZXN0YXVyYW50SG91cnNIVE1MKCk7XG4gIH1cbiAgLy8gZmlsbCByZXZpZXdzXG4gIERCSGVscGVyLmZldGNoUmV2aWV3cyhyZXN0YXVyYW50LmlkLCAoZXJyb3IsIHJldmlld3MpID0+IHtcbiAgICBmaWxsUmV2aWV3c0hUTUwocmV2aWV3cyk7XG4gIH0pO1xufTtcblxuLyoqXG4gKiBDcmVhdGUgcmVzdGF1cmFudCBvcGVyYXRpbmcgaG91cnMgSFRNTCB0YWJsZSBhbmQgYWRkIGl0IHRvIHRoZSB3ZWJwYWdlLlxuICovXG5jb25zdCBmaWxsUmVzdGF1cmFudEhvdXJzSFRNTCA9IChcbiAgb3BlcmF0aW5nSG91cnMgPSBzZWxmLnJlc3RhdXJhbnQub3BlcmF0aW5nX2hvdXJzXG4pID0+IHtcbiAgY29uc3QgaG91cnMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzdGF1cmFudC1ob3VycycpO1xuICBmb3IgKGxldCBrZXkgaW4gb3BlcmF0aW5nSG91cnMpIHtcbiAgICBjb25zdCByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpO1xuXG4gICAgY29uc3QgZGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKTtcbiAgICBkYXkuaW5uZXJIVE1MID0ga2V5O1xuICAgIHJvdy5hcHBlbmRDaGlsZChkYXkpO1xuXG4gICAgY29uc3QgdGltZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJyk7XG4gICAgdGltZS5pbm5lckhUTUwgPSBvcGVyYXRpbmdIb3Vyc1trZXldO1xuICAgIHJvdy5hcHBlbmRDaGlsZCh0aW1lKTtcblxuICAgIGhvdXJzLmFwcGVuZENoaWxkKHJvdyk7XG4gIH1cbn07XG5cbi8qKlxuICogQ3JlYXRlIGFsbCByZXZpZXdzIEhUTUwgYW5kIGFkZCB0aGVtIHRvIHRoZSB3ZWJwYWdlLlxuICovXG5jb25zdCBmaWxsUmV2aWV3c0hUTUwgPSAocmV2aWV3cyA9IHNlbGYucmVzdGF1cmFudC5yZXZpZXdzKSA9PiB7XG4gIGNvbnNvbGUubG9nKHJldmlld3MpO1xuICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmV2aWV3cy1jb250YWluZXInKTtcblxuICAvLyBSZXNldCB0aGUgY29udGFpbmVyIG9uIGV2ZXJ5IGNhbGwgdG8gcHJldmVudCBkdXBsaWNhdGlvblxuICBjb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG4gIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcbiAgdGl0bGUuaW5uZXJIVE1MID0gJ1Jldmlld3MnO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQodGl0bGUpO1xuXG4gIGlmICghcmV2aWV3cykge1xuICAgIGNvbnN0IG5vUmV2aWV3cyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICBub1Jldmlld3MuaW5uZXJIVE1MID0gJ05vIHJldmlld3MgeWV0ISc7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKG5vUmV2aWV3cyk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnN0IHVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgdWwuaWQgPSAncmV2aWV3cy1saXN0JztcbiAgcmV2aWV3cy5mb3JFYWNoKChyZXZpZXcpID0+IHtcbiAgICB1bC5hcHBlbmRDaGlsZChjcmVhdGVSZXZpZXdIVE1MKHJldmlldykpO1xuICB9KTtcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKHVsKTtcbn07XG5cbi8qKlxuICogQ3JlYXRlIHJldmlldyBIVE1MIGFuZCBhZGQgaXQgdG8gdGhlIHdlYnBhZ2UuXG4gKi9cbmNvbnN0IGNyZWF0ZVJldmlld0hUTUwgPSAocmV2aWV3KSA9PiB7XG4gIGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgbGkuc2V0QXR0cmlidXRlKCdpZCcsIGByZXZpZXctbGktJHtyZXZpZXcuaWR9YCk7XG4gIGNvbnN0IG5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gIG5hbWUuaW5uZXJIVE1MID0gcmV2aWV3Lm5hbWU7XG4gIGxpLmFwcGVuZENoaWxkKG5hbWUpO1xuXG4gIGNvbnN0IGRhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gIGRhdGUuaW5uZXJIVE1MID1cbiAgICAnPHN0cm9uZz5DcmVhdGVkOjwvc3Ryb25nPiAnICsgbmV3IERhdGUocmV2aWV3LmNyZWF0ZWRBdCkudG9EYXRlU3RyaW5nKCk7XG4gIGxpLmFwcGVuZENoaWxkKGRhdGUpO1xuXG4gIGlmIChyZXZpZXcuY3JlYXRlZEF0ICE9PSByZXZpZXcudXBkYXRlZEF0KSB7XG4gICAgY29uc3QgdXBkYXRlRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICB1cGRhdGVEYXRlLmlubmVySFRNTCA9XG4gICAgICAnPHN0cm9uZz5VcGRhdGVkOjwvc3Ryb25nPiAnICsgbmV3IERhdGUocmV2aWV3LnVwZGF0ZWRBdCkudG9EYXRlU3RyaW5nKCk7XG4gICAgbGkuYXBwZW5kQ2hpbGQodXBkYXRlRGF0ZSk7XG4gIH1cblxuICBjb25zdCByYXRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gIHJhdGluZy5pbm5lckhUTUwgPSBgUmF0aW5nOiAke3Jldmlldy5yYXRpbmd9YDtcbiAgbGkuYXBwZW5kQ2hpbGQocmF0aW5nKTtcblxuICBjb25zdCBjb21tZW50cyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgY29tbWVudHMuaW5uZXJIVE1MID0gcmV2aWV3LmNvbW1lbnRzO1xuICBsaS5hcHBlbmRDaGlsZChjb21tZW50cyk7XG5cbiAgLy8gU2V0IHVwIGFuZCB1c2UgZm9udGF3ZXNvbWUgaWNvbnMgZm9yIGVkaXQgYW5kIGRlbGV0ZVxuICBjb25zdCBlZGl0QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gIGNvbnN0IGVkaXRJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuICBlZGl0QnRuLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbGxlZGJ5JywgYGVkaXQgcmV2aWV3ICR7cmV2aWV3LmlkfWApO1xuICBlZGl0QnRuLnNldEF0dHJpYnV0ZSgndGl0bGUnLCBgZWRpdCByZXZpZXcgYnV0dG9uYCk7XG4gIGVkaXRCdG4uY2xhc3NMaXN0LmFkZCgncmV2aWV3LWJ0bicpO1xuICBlZGl0QnRuLnRpdGxlID0gJ3N0YXJ0IGVkaXRpbmcgYnV0dG9uJztcbiAgZWRpdEljb24uY2xhc3NMaXN0LmFkZCgnZmFzJywgJ2ZhLWVkaXQnLCAnZmEtMngnKTtcbiAgZWRpdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHNldEVkaXRpbmcocmV2aWV3KSk7XG4gIGVkaXRCdG4uYXBwZW5kKGVkaXRJY29uKTtcbiAgbGkuYXBwZW5kQ2hpbGQoZWRpdEJ0bik7XG5cbiAgY29uc3QgZGVsZXRlQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gIGNvbnN0IGRlbGV0ZUljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG4gIGRlbGV0ZUJ0bi5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWxsZWRieScsIGBkZWxldGUgcmV2aWV3ICR7cmV2aWV3LmlkfWApO1xuICBkZWxldGVCdG4uc2V0QXR0cmlidXRlKCd0aXRsZScsIGBkZWxldGUgcmV2aWV3IGJ1dHRvbmApO1xuICBkZWxldGVCdG4uY2xhc3NMaXN0LmFkZCgncmV2aWV3LWJ0bicpO1xuICBkZWxldGVJY29uLmNsYXNzTGlzdC5hZGQoJ2ZhcycsICdmYS10cmFzaC1hbHQnLCAnZmEtMngnKTtcbiAgZGVsZXRlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gZGVsZXRlUmV2aWV3KHJldmlldykpO1xuICBkZWxldGVCdG4uYXBwZW5kKGRlbGV0ZUljb24pO1xuICBsaS5hcHBlbmRDaGlsZChkZWxldGVCdG4pO1xuXG4gIHJldHVybiBsaTtcbn07XG5cbi8qKlxuICogQWRkIHJlc3RhdXJhbnQgbmFtZSB0byB0aGUgYnJlYWRjcnVtYiBuYXZpZ2F0aW9uIG1lbnVcbiAqL1xuY29uc3QgZmlsbEJyZWFkY3J1bWIgPSAocmVzdGF1cmFudCA9IHNlbGYucmVzdGF1cmFudCkgPT4ge1xuICBjb25zdCBicmVhZGNydW1iID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JyZWFkY3J1bWInKTtcbiAgY29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICBsaS5pbm5lckhUTUwgPSByZXN0YXVyYW50Lm5hbWU7XG4gIGJyZWFkY3J1bWIuYXBwZW5kQ2hpbGQobGkpO1xufTtcblxuLyoqXG4gKiBHZXQgYSBwYXJhbWV0ZXIgYnkgbmFtZSBmcm9tIHBhZ2UgVVJMLlxuICovXG5jb25zdCBnZXRQYXJhbWV0ZXJCeU5hbWUgPSAobmFtZSwgdXJsKSA9PiB7XG4gIGxldCB4ID0gbmV3IFVSTCh3aW5kb3cubG9jYXRpb24uaHJlZik7XG4gIGlmICghdXJsKSB1cmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcbiAgbmFtZSA9IG5hbWUucmVwbGFjZSgvW1xcW1xcXV0vZywgJ1xcXFwkJicpO1xuICBjb25zb2xlLmxvZyh1cmwpO1xuICBjb25zdCByZWdleCA9IG5ldyBSZWdFeHAoYFs/Jl0ke25hbWV9KD0oW14mI10qKXwmfCN8JClgKSxcbiAgICByZXN1bHRzID0gcmVnZXguZXhlYyh1cmwpO1xuICBjb25zb2xlLmxvZyhyZXN1bHRzKTtcbiAgaWYgKCFyZXN1bHRzWzJdKSByZXR1cm4gJyc7XG4gIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQocmVzdWx0c1syXS5yZXBsYWNlKC9cXCsvZywgJyAnKSk7XG59O1xuXG5jb25zdCBzdWJtaXRSZXZpZXcgPSAoKSA9PiB7XG4gIGNvbnNvbGUubG9nKGVkaXRpbmcpO1xuICBsZXQgZm9ybURhdGEgPSBnZXRGb3JtVmFsdWVzKCk7XG4gIGlmICghL1thLXpBLVpdezIsfSQvZ2kudGVzdChmb3JtRGF0YS5uYW1lKSkge1xuICAgIGFsZXJ0KCduYW1lIGlucHV0IG11c3QgYmUgbGV0dGVycyBvbmx5LCBtaW5pbXVtIG9mIDIgY2hhcmFjdGVycycpO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoIS9bMS01XXsxfSQvZ2kudGVzdChmb3JtRGF0YS5yYXRpbmcpKSB7XG4gICAgYWxlcnQoJ3JhdGluZyBpbnB1dCBtdXN0IGJlIGEgbnVtYmVyLCAxLTUnKTtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGZvcm1EYXRhLmNvbW1lbnRzLmxlbmd0aCA8IDMpIHtcbiAgICBhbGVydCgnY29tbWVudHMgaW5wdXQgbXVzdCBiZSBtaW5pbXVtIG9mIDMgY2hhcmFjdGVycycpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChlZGl0aW5nKSB7XG4gICAgZm9ybURhdGEudXBkYXRlZEF0ID0gRGF0ZS5ub3coKTtcbiAgfSBlbHNlIHtcbiAgICBmb3JtRGF0YS5pZCA9IERhdGUubm93KCk7XG4gICAgZm9ybURhdGEucmVzdGF1cmFudF9pZCA9IE51bWJlcihnZXRQYXJhbWV0ZXJCeU5hbWUoJ2lkJykpO1xuICB9XG5cbiAgREJIZWxwZXIuc3VibWl0UmV2aWV3KGZvcm1EYXRhLCBlZGl0aW5nKVxuICAgIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgIGxldCBhbGVydE1zZyA9IGVkaXRpbmcgPyAnRWRpdGVkIFJldmlldycgOiAnQ3JlYXRlZCBSZXZpZXcnO1xuICAgICAgYWxlcnQoYWxlcnRNc2cpO1xuICAgICAgbGV0IG5ld1Jldmlld0VsZW0gPSBjcmVhdGVSZXZpZXdIVE1MKHJlc3VsdCk7XG4gICAgICBpZiAoZWRpdGluZykge1xuICAgICAgICBsZXQgb2xkUmV2aWV3RWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGByZXZpZXctbGktJHtyZXN1bHQuaWR9YCk7XG4gICAgICAgIGxldCBwYXJlbnRFbGVtID0gb2xkUmV2aWV3RWxlbS5wYXJlbnRFbGVtZW50O1xuICAgICAgICBwYXJlbnRFbGVtLnJlcGxhY2VDaGlsZChuZXdSZXZpZXdFbGVtLCBvbGRSZXZpZXdFbGVtKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jldmlld3MtbGlzdCcpO1xuICAgICAgICB1bC5hcHBlbmRDaGlsZChuZXdSZXZpZXdFbGVtKTtcbiAgICAgIH1cbiAgICAgIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHJldmlldy1saS0ke3Jlc3VsdC5pZH1gKTtcbiAgICAgIGVsZW1lbnQuc2Nyb2xsSW50b1ZpZXcodHJ1ZSk7XG4gICAgICByZXNldEZvcm1WYWx1ZXMoKTtcbiAgICB9KVxuICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgIC8vIElmIG5vIG5ldHdvcmssIGZhbGxiYWNrIHRvIGdldCByZXZpZXdzIGZyb20gZGJcbiAgICAgIGxldCBhbGVydE1zZyA9IGVkaXRpbmcgPyAnRWRpdGVkIFJldmlldycgOiAnQ3JlYXRlZCBSZXZpZXcnO1xuICAgICAgYWxlcnQoYWxlcnRNc2cpO1xuICAgICAgY29uc29sZS5sb2coYCR7ZXJyb3J9OiByZWxvYWRpbmcgcmV2aWV3cyBmcm9tIGRiYCk7XG4gICAgICBjb25zdCBzZWN0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jldmlld3MtY29udGFpbmVyJyk7XG4gICAgICBkYlByb21pc2VcbiAgICAgICAgLnRoZW4oKGRiKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGRiXG4gICAgICAgICAgICAudHJhbnNhY3Rpb24oJ3Jldmlld3MnKVxuICAgICAgICAgICAgLm9iamVjdFN0b3JlKCdyZXZpZXdzJylcbiAgICAgICAgICAgIC5pbmRleCgncmVzdGF1cmFudF9pZCcpXG4gICAgICAgICAgICAuZ2V0QWxsKGZvcm1EYXRhLnJlc3RhdXJhbnRfaWQpO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbigocmV2aWV3cykgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKHJldmlld3MpO1xuICAgICAgICAgIGZpbGxSZXZpZXdzSFRNTChyZXZpZXdzKTtcbiAgICAgICAgICByZXNldEZvcm1WYWx1ZXMoKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59O1xuXG5jb25zdCBnZXRGb3JtVmFsdWVzID0gKCkgPT4ge1xuICByZXR1cm4ge1xuICAgIG5hbWU6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYW1lJykudmFsdWUudHJpbSgpLFxuICAgIHJhdGluZzogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JhdGluZycpLnZhbHVlLnRyaW0oKSxcbiAgICBjb21tZW50czogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jldmlldy1maWVsZCcpLnZhbHVlLnRyaW0oKSxcbiAgfTtcbn07XG5cbmNvbnN0IHJlc2V0Rm9ybVZhbHVlcyA9ICgpID0+IHtcbiAgZWRpdGluZyA9IGZhbHNlO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmFtZScpLnZhbHVlID0gJyc7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyYXRpbmcnKS52YWx1ZSA9ICcnO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmV2aWV3LWZpZWxkJykudmFsdWUgPSAnJztcbn07XG5cbmNvbnN0IGNhbmNlbEVkaXRpbmcgPSAoKSA9PiB7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYW5jZWwtZm9ybS1idG4nKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICByZXNldEZvcm1WYWx1ZXMoKTtcbiAgZWRpdGluZyA9IGZhbHNlO1xufTtcblxuY29uc3Qgc2V0RWRpdGluZyA9IChyZXZpZXcpID0+IHtcbiAgZWRpdGluZyA9IHJldmlldztcbiAgbGV0IGNhbmNlbEVkaXRpbmdCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FuY2VsLWZvcm0tYnRuJyk7XG4gIGNhbmNlbEVkaXRpbmdCdG4uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gIGNhbmNlbEVkaXRpbmdCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBjYW5jZWxFZGl0aW5nKCkpO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmFtZScpLnZhbHVlID0gcmV2aWV3Lm5hbWU7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyYXRpbmcnKS52YWx1ZSA9IHJldmlldy5yYXRpbmc7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXZpZXctZmllbGQnKS52YWx1ZSA9IHJldmlldy5jb21tZW50cztcbiAgbGV0IHJldmlld19pZCA9IHJldmlldy5pZDtcbiAgZ29Ub0JvdHRvbSgpO1xufTtcblxuY29uc3QgZGVsZXRlUmV2aWV3ID0gKHJldmlldykgPT4ge1xuICBsZXQgYXNrID0gd2luZG93LmNvbmZpcm0oYGRlbGV0ZSAke3Jldmlldy5uYW1lfSdzIHJldmlldz9gKTtcbiAgaWYgKGFzayA9PT0gZmFsc2UpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgREJIZWxwZXIuZGVsZXRlUmV2aWV3KHJldmlldy5pZClcbiAgICAudGhlbigoKSA9PiB7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgcmV2aWV3LWxpLSR7cmV2aWV3LmlkfWApLnJlbW92ZSgpO1xuICAgIH0pXG4gICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ3JlcXVlc3QgcHV0IGludG8gcXVlJyk7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgcmV2aWV3LWxpLSR7cmV2aWV3LmlkfWApLnJlbW92ZSgpO1xuICAgIH0pO1xufTtcblxuY29uc3QgZ29Ub0JvdHRvbSA9ICgpID0+IHtcbiAgd2luZG93LnNjcm9sbFRvKDAsIGRvY3VtZW50LmJvZHkuc2Nyb2xsSGVpZ2h0KTtcbn07XG4iLCJjb25zdCBjYWNoZVZlcnNpb24gPSAnMyc7XG5jb25zdCBTVEFUSUNfQ0FDSEUgPSBgcmVzdGF1cmFudC1jYWNoZS12JHtjYWNoZVZlcnNpb259YDtcbmNvbnN0IElNQUdFU19DQUNIRSA9IGBpbWFnZXNfY2FjaGUtdmA7XG5jb25zdCBhbGxDYWNoZXMgPSBbXG4gIFNUQVRJQ19DQUNIRSxcbiAgSU1BR0VTX0NBQ0hFXG5dO1xuaW1wb3J0IHsgb3BlbkRCLCBkZWxldGVEQiwgd3JhcCwgdW53cmFwIH0gZnJvbSAnaWRiJztcbmV4cG9ydCB7IGRiUHJvbWlzZSB9XG5cbmNvbnN0IGRiUHJvbWlzZSA9IG9wZW5EQigncnItZGInLCAzLCB7XG4gIHVwZ3JhZGUoZGIsIG9sZFZlcnNpb24pIHtcbiAgICBzd2l0Y2ggKG9sZFZlcnNpb24pIHtcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgY29uc3Qgc3RvcmUgPSBkYi5jcmVhdGVPYmplY3RTdG9yZSgncmVzdGF1cmFudHMnLCB7IGtleVBhdGg6ICdpZCcgfSk7XG4gICAgICAgIHN0b3JlLmNyZWF0ZUluZGV4KCdpZCcsICdpZCcpO1xuICAgICAgY2FzZSAxOlxuICAgICAgICBjb25zdCByZXZpZXdzU3RvcmUgPSBkYi5jcmVhdGVPYmplY3RTdG9yZSgncmV2aWV3cycsIHtcbiAgICAgICAgICBrZXlQYXRoOiAnaWQnLFxuICAgICAgICAgIC8vIGF1dG9JbmNyZW1lbnQ6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgIHJldmlld3NTdG9yZS5jcmVhdGVJbmRleChcInJlc3RhdXJhbnRfaWRcIiwgXCJyZXN0YXVyYW50X2lkXCIpO1xuICAgICAgY2FzZSAyOlxuICAgICAgICBjb25zdCBwZW5kaW5nU3RvcmUgPSBkYi5jcmVhdGVPYmplY3RTdG9yZSgncGVuZGluZycsIHtcbiAgICAgICAgICBrZXlQYXRoOiAnaWQnLFxuICAgICAgICAgIGF1dG9JbmNyZW1lbnQ6IHRydWVcbiAgICAgICAgfSk7XG4gICAgfVxuICB9XG59KTtcblxuY29uc3QgZ2V0UmVzdGF1cmFudHMgPSAoZXZlbnQpID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICBmZXRjaChldmVudC5yZXF1ZXN0KVxuICAgICAgLnRoZW4ocmVzcCA9PiByZXNwLmpzb24oKSlcbiAgICAgIC50aGVuKGpzb24gPT4geyByZXNvbHZlKGpzb24pOyB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBpc0ltYWdlVVJMKHVybCkge1xuICBsZXQgaW1nVHlwZXMgPSBbXCJwbmdcIiwgXCJqcGdcIiwgXCJqcGVnXCIsIFwic3ZnXCIsIFwiZ2lmXCJdO1xuICBsZXQgaXNJbWFnZSA9IGZhbHNlO1xuICBmb3IgKGxldCB0eXBlIG9mIGltZ1R5cGVzKSB7XG4gICAgaWYgKHVybC5lbmRzV2l0aCh0eXBlKSkgeyBpc0ltYWdlID0gdHJ1ZTsgYnJlYWsgfTtcbiAgfVxuICByZXR1cm4gaXNJbWFnZTtcbn1cblxuc2VsZi5hZGRFdmVudExpc3RlbmVyKCdpbnN0YWxsJywgZXZlbnQgPT4ge1xuICBldmVudC53YWl0VW50aWwoXG4gICAgY2FjaGVzLm9wZW4oU1RBVElDX0NBQ0hFKS50aGVuKGNhY2hlID0+IHtcbiAgICAgIHJldHVybiBjYWNoZS5hZGRBbGwoW1xuICAgICAgICAnLycsXG4gICAgICAgICcuL2FwcC5idW5kbGUuanMnLFxuICAgICAgICAnLi9yZXN0YXVyYW50LmJ1bmRsZS5qcycsXG4gICAgICAgICcuL2ltZy9ycl9pY29uLnBuZycsXG4gICAgICAgICcuL2Nzcy9zdHlsZXMuY3NzJ1xuICAgICAgXSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnZXJyb3Igc2V0dGluZyB1cCBpbnN0YWxsIGV2ZW50IGZvciBzdycpO1xuICAgICAgfSk7XG4gICAgfSlcbiAgKTtcbn0pO1xuXG4vLyBDbGVhbiB1bnVzZWQgY2FjaGVzIHdpdGggbmFtZXMgc3RhcnRpbmcgd2l0aCByZXN0YXVyYW50XG5zZWxmLmFkZEV2ZW50TGlzdGVuZXIoJ2FjdGl2YXRlJywgZXZlbnQgPT4ge1xuICBldmVudC53YWl0VW50aWwoXG4gICAgY2FjaGVzLmtleXMoKS50aGVuKGNhY2hlTmFtZXMgPT4ge1xuICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFxuICAgICAgICBjYWNoZU5hbWVzLmZpbHRlcihjYWNoZU5hbWUgPT4ge1xuICAgICAgICAgIHJldHVybiBjYWNoZU5hbWUuc3RhcnRzV2l0aCgncmVzdGF1cmFudC0nKSAmJlxuICAgICAgICAgICAgY2FjaGVOYW1lICE9IFNUQVRJQ19DQUNIRTtcbiAgICAgICAgfSkubWFwKGNhY2hlTmFtZSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGNhY2hlcy5kZWxldGUoY2FjaGVOYW1lKTtcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfSlcbiAgKTtcbn0pO1xuXG5zZWxmLmFkZEV2ZW50TGlzdGVuZXIoJ2ZldGNoJywgZXZlbnQgPT4ge1xuICBsZXQgY2hlY2tVcmwgPSBuZXcgVVJMKGV2ZW50LnJlcXVlc3QudXJsKTtcbiAgaWYgKGNoZWNrVXJsLnBvcnQgPT09IFwiMTMzN1wiKSB7XG4gICAgbGV0IGlkID0gY2hlY2tVcmwuc2VhcmNoUGFyYW1zLmdldCgncmVzdGF1cmFudF9pZCcpIC0gMDtcbiAgICByZXR1cm4gaGFuZGxlQUpBWEV2ZW50KGV2ZW50LCBpZCk7XG4gIH0gZWxzZSB7XG4gICAgaGFuZGxlTm9uQUpBWEV2ZW50KGV2ZW50KTtcbiAgfVxufSk7XG5cbmNvbnN0IGhhbmRsZUFKQVhFdmVudCA9IChldmVudCwgaWQpID0+IHtcbiAgLy8gT25seSB1c2UgZm9yIGNhY2hpbmcgZm9yIEdldCBldmVudHNcbiAgaWYgKGV2ZW50LnJlcXVlc3QubWV0aG9kICE9PSBcIkdFVFwiKSB7XG4gICAgY29uc29sZS5sb2coZXZlbnQucmVxdWVzdCk7XG4gICAgY29uc29sZS5sb2coZXZlbnQpO1xuICAgIGV2ZW50LnJlc3BvbmRXaXRoKFxuICAgICAgZmV0Y2goZXZlbnQucmVxdWVzdClcbiAgICApXG4gIH0gZWxzZSBpZiAoZXZlbnQucmVxdWVzdC51cmwuaW5kZXhPZihcInJlc3RhdXJhbnRzXCIpID4gLTEpIHtcbiAgICBoYW5kbGVSZXN0YXVyYW50RXZlbnRzKGV2ZW50KTtcbiAgfSBlbHNlIHtcbiAgICBjb25zb2xlLmxvZygnc3RhcnRpbmcgaGFuZGxpbmcgZnJvbSByZXZpZXdzIGV2ZW50JylcbiAgICBoYW5kbGVSZXZpZXdzRXZlbnRzKGV2ZW50LCBpZCk7XG4gIH1cbn1cblxuY29uc3QgaGFuZGxlUmVzdGF1cmFudEV2ZW50cyA9IChldmVudCkgPT4ge1xuICBldmVudC5yZXNwb25kV2l0aChcbiAgICBkYlByb21pc2UudGhlbihkYiA9PiB7XG4gICAgICByZXR1cm4gZGJcbiAgICAgICAgLnRyYW5zYWN0aW9uKCdyZXN0YXVyYW50cycpXG4gICAgICAgIC5vYmplY3RTdG9yZSgncmVzdGF1cmFudHMnKVxuICAgICAgICAuZ2V0QWxsKCk7XG4gICAgfSkudGhlbihkYXRhID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKCdyZXNwb25kaW5nIGZyb20gaGFuZGxlcmVzdGF1cmFudGV2ZW50cyBmcm9tIHNlcnZpY2V3b3JrZXInKTtcbiAgICAgIHJldHVybiAoKGRhdGEubGVuZ3RoICYmIGRhdGEpIHx8IGdldFJlc3RhdXJhbnRzKGV2ZW50KVxuICAgICAgICAudGhlbihyZXN0YXVyYW50cyA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ2ZldGNoZWQgbm93IHN0b3JpbmcnKTtcbiAgICAgICAgICByZXR1cm4gZGJQcm9taXNlLnRoZW4oZGIgPT4ge1xuICAgICAgICAgICAgbGV0IHR4ID0gZGIudHJhbnNhY3Rpb24oJ3Jlc3RhdXJhbnRzJywgJ3JlYWR3cml0ZScpO1xuICAgICAgICAgICAgbGV0IHN0b3JlID0gdHgub2JqZWN0U3RvcmUoJ3Jlc3RhdXJhbnRzJyk7XG4gICAgICAgICAgICByZXN0YXVyYW50cy5mb3JFYWNoKGZ1bmN0aW9uIChyZXN0YXVyYW50KSB7XG4gICAgICAgICAgICAgIHN0b3JlLnB1dChyZXN0YXVyYW50KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHR4LmRvbmU7XG4gICAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnc3RvcmVkIHJlc3RhdXJhbnRzLCBub3cgcmV0dXJuaW5nJyk7XG4gICAgICAgICAgICByZXR1cm4gcmVzdGF1cmFudHM7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgICApXG4gICAgfSlcbiAgICAgIC50aGVuKGZpbmFsUmVzcG9uc2UgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhmaW5hbFJlc3BvbnNlKTtcbiAgICAgICAgcmV0dXJuIG5ldyBSZXNwb25zZShKU09OLnN0cmluZ2lmeShmaW5hbFJlc3BvbnNlKSk7XG4gICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgUmVzcG9uc2UoXCJFcnJvciBmZXRjaGluZyBkYXRhXCIsIHsgc3RhdHVzOiA1MDAgfSk7XG4gICAgICB9KVxuICApXG59XG5cbmNvbnN0IGhhbmRsZVJldmlld3NFdmVudHMgPSAoZXZlbnQsIGlkKSA9PiB7XG4gIGV2ZW50LnJlc3BvbmRXaXRoKFxuICAgIGRiUHJvbWlzZS50aGVuKGRiID0+IHtcbiAgICAgIHJldHVybiBkYlxuICAgICAgICAudHJhbnNhY3Rpb24oJ3Jldmlld3MnKVxuICAgICAgICAub2JqZWN0U3RvcmUoJ3Jldmlld3MnKVxuICAgICAgICAuaW5kZXgoXCJyZXN0YXVyYW50X2lkXCIpXG4gICAgICAgIC5nZXRBbGwoaWQpO1xuICAgIH0pLnRoZW4oZGF0YSA9PiB7XG4gICAgICBjb25zb2xlLmxvZygnc2VydmljZXdvcmtlciBoYW5kbGUgcmV2aWV3cycpO1xuICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICByZXR1cm4gKGRhdGEubGVuZ3RoICYmIGRhdGEpIHx8IGZldGNoKGV2ZW50LnJlcXVlc3QpXG4gICAgICAgIC50aGVuKGZldGNoUmVzcG9uc2UgPT4ge1xuICAgICAgICAgIHJldHVybiBmZXRjaFJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmV2aWV3cyA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ3VzaW5nIHNlcnZpY2V3b3JrZXIgZmV0Y2gnKTtcbiAgICAgICAgICBjb25zb2xlLmxvZygnc3RhcnRpbmcgdG8gc3RvcmUgcmV2aWV3cycpO1xuICAgICAgICAgIHJldHVybiBkYlByb21pc2UudGhlbihkYiA9PiB7XG4gICAgICAgICAgICBsZXQgdHggPSBkYi50cmFuc2FjdGlvbigncmV2aWV3cycsICdyZWFkd3JpdGUnKVxuICAgICAgICAgICAgbGV0IHN0b3JlID0gdHgub2JqZWN0U3RvcmUoJ3Jldmlld3MnKTtcbiAgICAgICAgICAgIHJldmlld3MuZm9yRWFjaChmdW5jdGlvbiAocmV2aWV3KSB7XG4gICAgICAgICAgICAgIHN0b3JlLnB1dChyZXZpZXcpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdHguZG9uZTtcbiAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4gcmV2aWV3cylcbiAgICAgICAgfSlcbiAgICB9KS50aGVuKGZpbmFsUmVzcG9uc2UgPT4ge1xuICAgICAgcmV0dXJuIG5ldyBSZXNwb25zZShKU09OLnN0cmluZ2lmeShmaW5hbFJlc3BvbnNlKSk7XG4gICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgcmV0dXJuIG5ldyBSZXNwb25zZShcIkVycm9yIGZldGNoaW5nIGRhdGFcIiwgeyBzdGF0dXM6IDUwMCB9KTtcbiAgICB9KSlcbn1cblxuY29uc3QgaGFuZGxlTm9uQUpBWEV2ZW50ID0gKGV2ZW50KSA9PiB7XG4gIC8vIENoZWNrIGlmIHRoZSBIVE1MIHJlcXVlc3QgaGFzIHByZXZpb3VzbHkgYmVlbiBjYWNoZWQuIElmIHNvLCByZXR1cm4gdGhlXG4gIC8vIHJlc3BvbnNlIGZyb20gdGhlIGNhY2hlLiBJZiBub3QsIGZldGNoIHRoZSByZXF1ZXN0LCBjYWNoZSBpdCwgYW5kIHRoZW4gcmV0dXJuXG4gIC8vIGl0LlxuICBldmVudC5yZXNwb25kV2l0aChcbiAgICBjYWNoZXMubWF0Y2goZXZlbnQucmVxdWVzdCkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICByZXR1cm4gcmVzcG9uc2UgfHwgZmV0Y2goZXZlbnQucmVxdWVzdCkudGhlbihmZXRjaFJlc3BvbnNlID0+IHtcbiAgICAgICAgbGV0IHVzZUNhY2hlID0gaXNJbWFnZVVSTChldmVudC5yZXF1ZXN0LnVybCkgPyBJTUFHRVNfQ0FDSEUgOiBTVEFUSUNfQ0FDSEU7XG4gICAgICAgIHJldHVybiBjYWNoZXNcbiAgICAgICAgICAub3Blbih1c2VDYWNoZSlcbiAgICAgICAgICAudGhlbihjYWNoZSA9PiB7XG4gICAgICAgICAgICBjYWNoZS5wdXQoZXZlbnQucmVxdWVzdCwgZmV0Y2hSZXNwb25zZS5jbG9uZSgpKTtcbiAgICAgICAgICAgIHJldHVybiBmZXRjaFJlc3BvbnNlO1xuICAgICAgICAgIH0pO1xuICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IFJlc3BvbnNlKFwiQXBwbGljYXRpb24gaXMgbm90IGNvbm5lY3RlZCB0byB0aGUgaW50ZXJuZXRcIiwge1xuICAgICAgICAgIHN0YXR1czogNDA0LFxuICAgICAgICAgIHN0YXR1c1RleHQ6IFwiQXBwbGljYXRpb24gaXMgbm90IGNvbm5lY3RlZCB0byB0aGUgaW50ZXJuZXRcIlxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pXG4gICk7XG5cbiAgLy8gVXBkYXRlcyB0aGUgZGF0YSBmcm9tIHRoZSBuZXR3b3JrIHRvIHVzZSBvbiBuZXh0IHJlcXVlc3QuXG4gIGV2ZW50LndhaXRVbnRpbCh1cGRhdGUoZXZlbnQucmVxdWVzdCkpO1xufVxuXG5jb25zdCB1cGRhdGUgPSAocmVxdWVzdCkgPT4ge1xuICBsZXQgdXNlQ2FjaGUgPSBpc0ltYWdlVVJMKHJlcXVlc3QudXJsKSA/IElNQUdFU19DQUNIRSA6IFNUQVRJQ19DQUNIRTtcbiAgcmV0dXJuIGNhY2hlcy5vcGVuKHVzZUNhY2hlKS50aGVuKGNhY2hlID0+IHtcbiAgICByZXR1cm4gZmV0Y2gocmVxdWVzdCkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICByZXR1cm4gY2FjaGUucHV0KHJlcXVlc3QsIHJlc3BvbnNlKTtcbiAgICB9KTtcbiAgfSk7XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAodHlwZW9mIGl0ICE9ICdmdW5jdGlvbicpIHRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGEgZnVuY3Rpb24hJyk7XG4gIHJldHVybiBpdDtcbn07XG4iLCIvLyAyMi4xLjMuMzEgQXJyYXkucHJvdG90eXBlW0BAdW5zY29wYWJsZXNdXG52YXIgVU5TQ09QQUJMRVMgPSByZXF1aXJlKCcuL193a3MnKSgndW5zY29wYWJsZXMnKTtcbnZhciBBcnJheVByb3RvID0gQXJyYXkucHJvdG90eXBlO1xuaWYgKEFycmF5UHJvdG9bVU5TQ09QQUJMRVNdID09IHVuZGVmaW5lZCkgcmVxdWlyZSgnLi9faGlkZScpKEFycmF5UHJvdG8sIFVOU0NPUEFCTEVTLCB7fSk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgQXJyYXlQcm90b1tVTlNDT1BBQkxFU11ba2V5XSA9IHRydWU7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGF0ID0gcmVxdWlyZSgnLi9fc3RyaW5nLWF0JykodHJ1ZSk7XG5cbiAvLyBgQWR2YW5jZVN0cmluZ0luZGV4YCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWFkdmFuY2VzdHJpbmdpbmRleFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoUywgaW5kZXgsIHVuaWNvZGUpIHtcbiAgcmV0dXJuIGluZGV4ICsgKHVuaWNvZGUgPyBhdChTLCBpbmRleCkubGVuZ3RoIDogMSk7XG59O1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoIWlzT2JqZWN0KGl0KSkgdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYW4gb2JqZWN0IScpO1xuICByZXR1cm4gaXQ7XG59O1xuIiwiLy8gZmFsc2UgLT4gQXJyYXkjaW5kZXhPZlxuLy8gdHJ1ZSAgLT4gQXJyYXkjaW5jbHVkZXNcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuL190by1sZW5ndGgnKTtcbnZhciB0b0Fic29sdXRlSW5kZXggPSByZXF1aXJlKCcuL190by1hYnNvbHV0ZS1pbmRleCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoSVNfSU5DTFVERVMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgkdGhpcywgZWwsIGZyb21JbmRleCkge1xuICAgIHZhciBPID0gdG9JT2JqZWN0KCR0aGlzKTtcbiAgICB2YXIgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpO1xuICAgIHZhciBpbmRleCA9IHRvQWJzb2x1dGVJbmRleChmcm9tSW5kZXgsIGxlbmd0aCk7XG4gICAgdmFyIHZhbHVlO1xuICAgIC8vIEFycmF5I2luY2x1ZGVzIHVzZXMgU2FtZVZhbHVlWmVybyBlcXVhbGl0eSBhbGdvcml0aG1cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlXG4gICAgaWYgKElTX0lOQ0xVREVTICYmIGVsICE9IGVsKSB3aGlsZSAobGVuZ3RoID4gaW5kZXgpIHtcbiAgICAgIHZhbHVlID0gT1tpbmRleCsrXTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgICAgIGlmICh2YWx1ZSAhPSB2YWx1ZSkgcmV0dXJuIHRydWU7XG4gICAgLy8gQXJyYXkjaW5kZXhPZiBpZ25vcmVzIGhvbGVzLCBBcnJheSNpbmNsdWRlcyAtIG5vdFxuICAgIH0gZWxzZSBmb3IgKDtsZW5ndGggPiBpbmRleDsgaW5kZXgrKykgaWYgKElTX0lOQ0xVREVTIHx8IGluZGV4IGluIE8pIHtcbiAgICAgIGlmIChPW2luZGV4XSA9PT0gZWwpIHJldHVybiBJU19JTkNMVURFUyB8fCBpbmRleCB8fCAwO1xuICAgIH0gcmV0dXJuICFJU19JTkNMVURFUyAmJiAtMTtcbiAgfTtcbn07XG4iLCIvLyBnZXR0aW5nIHRhZyBmcm9tIDE5LjEuMy42IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcoKVxudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xudmFyIFRBRyA9IHJlcXVpcmUoJy4vX3drcycpKCd0b1N0cmluZ1RhZycpO1xuLy8gRVMzIHdyb25nIGhlcmVcbnZhciBBUkcgPSBjb2YoZnVuY3Rpb24gKCkgeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpID09ICdBcmd1bWVudHMnO1xuXG4vLyBmYWxsYmFjayBmb3IgSUUxMSBTY3JpcHQgQWNjZXNzIERlbmllZCBlcnJvclxudmFyIHRyeUdldCA9IGZ1bmN0aW9uIChpdCwga2V5KSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGl0W2tleV07XG4gIH0gY2F0Y2ggKGUpIHsgLyogZW1wdHkgKi8gfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIE8sIFQsIEI7XG4gIHJldHVybiBpdCA9PT0gdW5kZWZpbmVkID8gJ1VuZGVmaW5lZCcgOiBpdCA9PT0gbnVsbCA/ICdOdWxsJ1xuICAgIC8vIEBAdG9TdHJpbmdUYWcgY2FzZVxuICAgIDogdHlwZW9mIChUID0gdHJ5R2V0KE8gPSBPYmplY3QoaXQpLCBUQUcpKSA9PSAnc3RyaW5nJyA/IFRcbiAgICAvLyBidWlsdGluVGFnIGNhc2VcbiAgICA6IEFSRyA/IGNvZihPKVxuICAgIC8vIEVTMyBhcmd1bWVudHMgZmFsbGJhY2tcbiAgICA6IChCID0gY29mKE8pKSA9PSAnT2JqZWN0JyAmJiB0eXBlb2YgTy5jYWxsZWUgPT0gJ2Z1bmN0aW9uJyA/ICdBcmd1bWVudHMnIDogQjtcbn07XG4iLCJ2YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwoaXQpLnNsaWNlKDgsIC0xKTtcbn07XG4iLCJ2YXIgY29yZSA9IG1vZHVsZS5leHBvcnRzID0geyB2ZXJzaW9uOiAnMi42LjUnIH07XG5pZiAodHlwZW9mIF9fZSA9PSAnbnVtYmVyJykgX19lID0gY29yZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuIiwiLy8gb3B0aW9uYWwgLyBzaW1wbGUgY29udGV4dCBiaW5kaW5nXG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZm4sIHRoYXQsIGxlbmd0aCkge1xuICBhRnVuY3Rpb24oZm4pO1xuICBpZiAodGhhdCA9PT0gdW5kZWZpbmVkKSByZXR1cm4gZm47XG4gIHN3aXRjaCAobGVuZ3RoKSB7XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuY3Rpb24gKGEpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEpO1xuICAgIH07XG4gICAgY2FzZSAyOiByZXR1cm4gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIpO1xuICAgIH07XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuY3Rpb24gKGEsIGIsIGMpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIsIGMpO1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uICgvKiAuLi5hcmdzICovKSB7XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gIH07XG59O1xuIiwiLy8gNy4yLjEgUmVxdWlyZU9iamVjdENvZXJjaWJsZShhcmd1bWVudClcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmIChpdCA9PSB1bmRlZmluZWQpIHRocm93IFR5cGVFcnJvcihcIkNhbid0IGNhbGwgbWV0aG9kIG9uICBcIiArIGl0KTtcbiAgcmV0dXJuIGl0O1xufTtcbiIsIi8vIFRoYW5rJ3MgSUU4IGZvciBoaXMgZnVubnkgZGVmaW5lUHJvcGVydHlcbm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAnYScsIHsgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9IH0pLmEgIT0gNztcbn0pO1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG52YXIgZG9jdW1lbnQgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5kb2N1bWVudDtcbi8vIHR5cGVvZiBkb2N1bWVudC5jcmVhdGVFbGVtZW50IGlzICdvYmplY3QnIGluIG9sZCBJRVxudmFyIGlzID0gaXNPYmplY3QoZG9jdW1lbnQpICYmIGlzT2JqZWN0KGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGlzID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChpdCkgOiB7fTtcbn07XG4iLCIvLyBJRSA4LSBkb24ndCBlbnVtIGJ1ZyBrZXlzXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgJ2NvbnN0cnVjdG9yLGhhc093blByb3BlcnR5LGlzUHJvdG90eXBlT2YscHJvcGVydHlJc0VudW1lcmFibGUsdG9Mb2NhbGVTdHJpbmcsdG9TdHJpbmcsdmFsdWVPZidcbikuc3BsaXQoJywnKTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBjb3JlID0gcmVxdWlyZSgnLi9fY29yZScpO1xudmFyIGhpZGUgPSByZXF1aXJlKCcuL19oaWRlJyk7XG52YXIgcmVkZWZpbmUgPSByZXF1aXJlKCcuL19yZWRlZmluZScpO1xudmFyIGN0eCA9IHJlcXVpcmUoJy4vX2N0eCcpO1xudmFyIFBST1RPVFlQRSA9ICdwcm90b3R5cGUnO1xuXG52YXIgJGV4cG9ydCA9IGZ1bmN0aW9uICh0eXBlLCBuYW1lLCBzb3VyY2UpIHtcbiAgdmFyIElTX0ZPUkNFRCA9IHR5cGUgJiAkZXhwb3J0LkY7XG4gIHZhciBJU19HTE9CQUwgPSB0eXBlICYgJGV4cG9ydC5HO1xuICB2YXIgSVNfU1RBVElDID0gdHlwZSAmICRleHBvcnQuUztcbiAgdmFyIElTX1BST1RPID0gdHlwZSAmICRleHBvcnQuUDtcbiAgdmFyIElTX0JJTkQgPSB0eXBlICYgJGV4cG9ydC5CO1xuICB2YXIgdGFyZ2V0ID0gSVNfR0xPQkFMID8gZ2xvYmFsIDogSVNfU1RBVElDID8gZ2xvYmFsW25hbWVdIHx8IChnbG9iYWxbbmFtZV0gPSB7fSkgOiAoZ2xvYmFsW25hbWVdIHx8IHt9KVtQUk9UT1RZUEVdO1xuICB2YXIgZXhwb3J0cyA9IElTX0dMT0JBTCA/IGNvcmUgOiBjb3JlW25hbWVdIHx8IChjb3JlW25hbWVdID0ge30pO1xuICB2YXIgZXhwUHJvdG8gPSBleHBvcnRzW1BST1RPVFlQRV0gfHwgKGV4cG9ydHNbUFJPVE9UWVBFXSA9IHt9KTtcbiAgdmFyIGtleSwgb3duLCBvdXQsIGV4cDtcbiAgaWYgKElTX0dMT0JBTCkgc291cmNlID0gbmFtZTtcbiAgZm9yIChrZXkgaW4gc291cmNlKSB7XG4gICAgLy8gY29udGFpbnMgaW4gbmF0aXZlXG4gICAgb3duID0gIUlTX0ZPUkNFRCAmJiB0YXJnZXQgJiYgdGFyZ2V0W2tleV0gIT09IHVuZGVmaW5lZDtcbiAgICAvLyBleHBvcnQgbmF0aXZlIG9yIHBhc3NlZFxuICAgIG91dCA9IChvd24gPyB0YXJnZXQgOiBzb3VyY2UpW2tleV07XG4gICAgLy8gYmluZCB0aW1lcnMgdG8gZ2xvYmFsIGZvciBjYWxsIGZyb20gZXhwb3J0IGNvbnRleHRcbiAgICBleHAgPSBJU19CSU5EICYmIG93biA/IGN0eChvdXQsIGdsb2JhbCkgOiBJU19QUk9UTyAmJiB0eXBlb2Ygb3V0ID09ICdmdW5jdGlvbicgPyBjdHgoRnVuY3Rpb24uY2FsbCwgb3V0KSA6IG91dDtcbiAgICAvLyBleHRlbmQgZ2xvYmFsXG4gICAgaWYgKHRhcmdldCkgcmVkZWZpbmUodGFyZ2V0LCBrZXksIG91dCwgdHlwZSAmICRleHBvcnQuVSk7XG4gICAgLy8gZXhwb3J0XG4gICAgaWYgKGV4cG9ydHNba2V5XSAhPSBvdXQpIGhpZGUoZXhwb3J0cywga2V5LCBleHApO1xuICAgIGlmIChJU19QUk9UTyAmJiBleHBQcm90b1trZXldICE9IG91dCkgZXhwUHJvdG9ba2V5XSA9IG91dDtcbiAgfVxufTtcbmdsb2JhbC5jb3JlID0gY29yZTtcbi8vIHR5cGUgYml0bWFwXG4kZXhwb3J0LkYgPSAxOyAgIC8vIGZvcmNlZFxuJGV4cG9ydC5HID0gMjsgICAvLyBnbG9iYWxcbiRleHBvcnQuUyA9IDQ7ICAgLy8gc3RhdGljXG4kZXhwb3J0LlAgPSA4OyAgIC8vIHByb3RvXG4kZXhwb3J0LkIgPSAxNjsgIC8vIGJpbmRcbiRleHBvcnQuVyA9IDMyOyAgLy8gd3JhcFxuJGV4cG9ydC5VID0gNjQ7ICAvLyBzYWZlXG4kZXhwb3J0LlIgPSAxMjg7IC8vIHJlYWwgcHJvdG8gbWV0aG9kIGZvciBgbGlicmFyeWBcbm1vZHVsZS5leHBvcnRzID0gJGV4cG9ydDtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGV4ZWMpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gISFleGVjKCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTtcbiIsIid1c2Ugc3RyaWN0JztcbnJlcXVpcmUoJy4vZXM2LnJlZ2V4cC5leGVjJyk7XG52YXIgcmVkZWZpbmUgPSByZXF1aXJlKCcuL19yZWRlZmluZScpO1xudmFyIGhpZGUgPSByZXF1aXJlKCcuL19oaWRlJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuL19mYWlscycpO1xudmFyIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG52YXIgd2tzID0gcmVxdWlyZSgnLi9fd2tzJyk7XG52YXIgcmVnZXhwRXhlYyA9IHJlcXVpcmUoJy4vX3JlZ2V4cC1leGVjJyk7XG5cbnZhciBTUEVDSUVTID0gd2tzKCdzcGVjaWVzJyk7XG5cbnZhciBSRVBMQUNFX1NVUFBPUlRTX05BTUVEX0dST1VQUyA9ICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gIC8vICNyZXBsYWNlIG5lZWRzIGJ1aWx0LWluIHN1cHBvcnQgZm9yIG5hbWVkIGdyb3Vwcy5cbiAgLy8gI21hdGNoIHdvcmtzIGZpbmUgYmVjYXVzZSBpdCBqdXN0IHJldHVybiB0aGUgZXhlYyByZXN1bHRzLCBldmVuIGlmIGl0IGhhc1xuICAvLyBhIFwiZ3JvcHNcIiBwcm9wZXJ0eS5cbiAgdmFyIHJlID0gLy4vO1xuICByZS5leGVjID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICByZXN1bHQuZ3JvdXBzID0geyBhOiAnNycgfTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuICByZXR1cm4gJycucmVwbGFjZShyZSwgJyQ8YT4nKSAhPT0gJzcnO1xufSk7XG5cbnZhciBTUExJVF9XT1JLU19XSVRIX09WRVJXUklUVEVOX0VYRUMgPSAoZnVuY3Rpb24gKCkge1xuICAvLyBDaHJvbWUgNTEgaGFzIGEgYnVnZ3kgXCJzcGxpdFwiIGltcGxlbWVudGF0aW9uIHdoZW4gUmVnRXhwI2V4ZWMgIT09IG5hdGl2ZUV4ZWNcbiAgdmFyIHJlID0gLyg/OikvO1xuICB2YXIgb3JpZ2luYWxFeGVjID0gcmUuZXhlYztcbiAgcmUuZXhlYyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG9yaWdpbmFsRXhlYy5hcHBseSh0aGlzLCBhcmd1bWVudHMpOyB9O1xuICB2YXIgcmVzdWx0ID0gJ2FiJy5zcGxpdChyZSk7XG4gIHJldHVybiByZXN1bHQubGVuZ3RoID09PSAyICYmIHJlc3VsdFswXSA9PT0gJ2EnICYmIHJlc3VsdFsxXSA9PT0gJ2InO1xufSkoKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoS0VZLCBsZW5ndGgsIGV4ZWMpIHtcbiAgdmFyIFNZTUJPTCA9IHdrcyhLRVkpO1xuXG4gIHZhciBERUxFR0FURVNfVE9fU1lNQk9MID0gIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgICAvLyBTdHJpbmcgbWV0aG9kcyBjYWxsIHN5bWJvbC1uYW1lZCBSZWdFcCBtZXRob2RzXG4gICAgdmFyIE8gPSB7fTtcbiAgICBPW1NZTUJPTF0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9O1xuICAgIHJldHVybiAnJ1tLRVldKE8pICE9IDc7XG4gIH0pO1xuXG4gIHZhciBERUxFR0FURVNfVE9fRVhFQyA9IERFTEVHQVRFU19UT19TWU1CT0wgPyAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICAgIC8vIFN5bWJvbC1uYW1lZCBSZWdFeHAgbWV0aG9kcyBjYWxsIC5leGVjXG4gICAgdmFyIGV4ZWNDYWxsZWQgPSBmYWxzZTtcbiAgICB2YXIgcmUgPSAvYS87XG4gICAgcmUuZXhlYyA9IGZ1bmN0aW9uICgpIHsgZXhlY0NhbGxlZCA9IHRydWU7IHJldHVybiBudWxsOyB9O1xuICAgIGlmIChLRVkgPT09ICdzcGxpdCcpIHtcbiAgICAgIC8vIFJlZ0V4cFtAQHNwbGl0XSBkb2Vzbid0IGNhbGwgdGhlIHJlZ2V4J3MgZXhlYyBtZXRob2QsIGJ1dCBmaXJzdCBjcmVhdGVzXG4gICAgICAvLyBhIG5ldyBvbmUuIFdlIG5lZWQgdG8gcmV0dXJuIHRoZSBwYXRjaGVkIHJlZ2V4IHdoZW4gY3JlYXRpbmcgdGhlIG5ldyBvbmUuXG4gICAgICByZS5jb25zdHJ1Y3RvciA9IHt9O1xuICAgICAgcmUuY29uc3RydWN0b3JbU1BFQ0lFU10gPSBmdW5jdGlvbiAoKSB7IHJldHVybiByZTsgfTtcbiAgICB9XG4gICAgcmVbU1lNQk9MXSgnJyk7XG4gICAgcmV0dXJuICFleGVjQ2FsbGVkO1xuICB9KSA6IHVuZGVmaW5lZDtcblxuICBpZiAoXG4gICAgIURFTEVHQVRFU19UT19TWU1CT0wgfHxcbiAgICAhREVMRUdBVEVTX1RPX0VYRUMgfHxcbiAgICAoS0VZID09PSAncmVwbGFjZScgJiYgIVJFUExBQ0VfU1VQUE9SVFNfTkFNRURfR1JPVVBTKSB8fFxuICAgIChLRVkgPT09ICdzcGxpdCcgJiYgIVNQTElUX1dPUktTX1dJVEhfT1ZFUldSSVRURU5fRVhFQylcbiAgKSB7XG4gICAgdmFyIG5hdGl2ZVJlZ0V4cE1ldGhvZCA9IC8uL1tTWU1CT0xdO1xuICAgIHZhciBmbnMgPSBleGVjKFxuICAgICAgZGVmaW5lZCxcbiAgICAgIFNZTUJPTCxcbiAgICAgICcnW0tFWV0sXG4gICAgICBmdW5jdGlvbiBtYXliZUNhbGxOYXRpdmUobmF0aXZlTWV0aG9kLCByZWdleHAsIHN0ciwgYXJnMiwgZm9yY2VTdHJpbmdNZXRob2QpIHtcbiAgICAgICAgaWYgKHJlZ2V4cC5leGVjID09PSByZWdleHBFeGVjKSB7XG4gICAgICAgICAgaWYgKERFTEVHQVRFU19UT19TWU1CT0wgJiYgIWZvcmNlU3RyaW5nTWV0aG9kKSB7XG4gICAgICAgICAgICAvLyBUaGUgbmF0aXZlIFN0cmluZyBtZXRob2QgYWxyZWFkeSBkZWxlZ2F0ZXMgdG8gQEBtZXRob2QgKHRoaXNcbiAgICAgICAgICAgIC8vIHBvbHlmaWxsZWQgZnVuY3Rpb24pLCBsZWFzaW5nIHRvIGluZmluaXRlIHJlY3Vyc2lvbi5cbiAgICAgICAgICAgIC8vIFdlIGF2b2lkIGl0IGJ5IGRpcmVjdGx5IGNhbGxpbmcgdGhlIG5hdGl2ZSBAQG1ldGhvZCBtZXRob2QuXG4gICAgICAgICAgICByZXR1cm4geyBkb25lOiB0cnVlLCB2YWx1ZTogbmF0aXZlUmVnRXhwTWV0aG9kLmNhbGwocmVnZXhwLCBzdHIsIGFyZzIpIH07XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB7IGRvbmU6IHRydWUsIHZhbHVlOiBuYXRpdmVNZXRob2QuY2FsbChzdHIsIHJlZ2V4cCwgYXJnMikgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBkb25lOiBmYWxzZSB9O1xuICAgICAgfVxuICAgICk7XG4gICAgdmFyIHN0cmZuID0gZm5zWzBdO1xuICAgIHZhciByeGZuID0gZm5zWzFdO1xuXG4gICAgcmVkZWZpbmUoU3RyaW5nLnByb3RvdHlwZSwgS0VZLCBzdHJmbik7XG4gICAgaGlkZShSZWdFeHAucHJvdG90eXBlLCBTWU1CT0wsIGxlbmd0aCA9PSAyXG4gICAgICAvLyAyMS4yLjUuOCBSZWdFeHAucHJvdG90eXBlW0BAcmVwbGFjZV0oc3RyaW5nLCByZXBsYWNlVmFsdWUpXG4gICAgICAvLyAyMS4yLjUuMTEgUmVnRXhwLnByb3RvdHlwZVtAQHNwbGl0XShzdHJpbmcsIGxpbWl0KVxuICAgICAgPyBmdW5jdGlvbiAoc3RyaW5nLCBhcmcpIHsgcmV0dXJuIHJ4Zm4uY2FsbChzdHJpbmcsIHRoaXMsIGFyZyk7IH1cbiAgICAgIC8vIDIxLjIuNS42IFJlZ0V4cC5wcm90b3R5cGVbQEBtYXRjaF0oc3RyaW5nKVxuICAgICAgLy8gMjEuMi41LjkgUmVnRXhwLnByb3RvdHlwZVtAQHNlYXJjaF0oc3RyaW5nKVxuICAgICAgOiBmdW5jdGlvbiAoc3RyaW5nKSB7IHJldHVybiByeGZuLmNhbGwoc3RyaW5nLCB0aGlzKTsgfVxuICAgICk7XG4gIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG4vLyAyMS4yLjUuMyBnZXQgUmVnRXhwLnByb3RvdHlwZS5mbGFnc1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHRoYXQgPSBhbk9iamVjdCh0aGlzKTtcbiAgdmFyIHJlc3VsdCA9ICcnO1xuICBpZiAodGhhdC5nbG9iYWwpIHJlc3VsdCArPSAnZyc7XG4gIGlmICh0aGF0Lmlnbm9yZUNhc2UpIHJlc3VsdCArPSAnaSc7XG4gIGlmICh0aGF0Lm11bHRpbGluZSkgcmVzdWx0ICs9ICdtJztcbiAgaWYgKHRoYXQudW5pY29kZSkgcmVzdWx0ICs9ICd1JztcbiAgaWYgKHRoYXQuc3RpY2t5KSByZXN1bHQgKz0gJ3knO1xuICByZXR1cm4gcmVzdWx0O1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fc2hhcmVkJykoJ25hdGl2ZS1mdW5jdGlvbi10by1zdHJpbmcnLCBGdW5jdGlvbi50b1N0cmluZyk7XG4iLCIvLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvODYjaXNzdWVjb21tZW50LTExNTc1OTAyOFxudmFyIGdsb2JhbCA9IG1vZHVsZS5leHBvcnRzID0gdHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuTWF0aCA9PSBNYXRoXG4gID8gd2luZG93IDogdHlwZW9mIHNlbGYgIT0gJ3VuZGVmaW5lZCcgJiYgc2VsZi5NYXRoID09IE1hdGggPyBzZWxmXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXctZnVuY1xuICA6IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5pZiAodHlwZW9mIF9fZyA9PSAnbnVtYmVyJykgX19nID0gZ2xvYmFsOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG4iLCJ2YXIgaGFzT3duUHJvcGVydHkgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCBrZXkpIHtcbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwoaXQsIGtleSk7XG59O1xuIiwidmFyIGRQID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJyk7XG52YXIgY3JlYXRlRGVzYyA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IGZ1bmN0aW9uIChvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgcmV0dXJuIGRQLmYob2JqZWN0LCBrZXksIGNyZWF0ZURlc2MoMSwgdmFsdWUpKTtcbn0gOiBmdW5jdGlvbiAob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIHJldHVybiBvYmplY3Q7XG59O1xuIiwidmFyIGRvY3VtZW50ID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuZG9jdW1lbnQ7XG5tb2R1bGUuZXhwb3J0cyA9IGRvY3VtZW50ICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiIsIm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgJiYgIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHJlcXVpcmUoJy4vX2RvbS1jcmVhdGUnKSgnZGl2JyksICdhJywgeyBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDc7IH0gfSkuYSAhPSA3O1xufSk7XG4iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbnZhciBzZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4vX3NldC1wcm90bycpLnNldDtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHRoYXQsIHRhcmdldCwgQykge1xuICB2YXIgUyA9IHRhcmdldC5jb25zdHJ1Y3RvcjtcbiAgdmFyIFA7XG4gIGlmIChTICE9PSBDICYmIHR5cGVvZiBTID09ICdmdW5jdGlvbicgJiYgKFAgPSBTLnByb3RvdHlwZSkgIT09IEMucHJvdG90eXBlICYmIGlzT2JqZWN0KFApICYmIHNldFByb3RvdHlwZU9mKSB7XG4gICAgc2V0UHJvdG90eXBlT2YodGhhdCwgUCk7XG4gIH0gcmV0dXJuIHRoYXQ7XG59O1xuIiwiLy8gZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBhbmQgbm9uLWVudW1lcmFibGUgb2xkIFY4IHN0cmluZ3NcbnZhciBjb2YgPSByZXF1aXJlKCcuL19jb2YnKTtcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnNcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0KCd6JykucHJvcGVydHlJc0VudW1lcmFibGUoMCkgPyBPYmplY3QgOiBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGNvZihpdCkgPT0gJ1N0cmluZycgPyBpdC5zcGxpdCgnJykgOiBPYmplY3QoaXQpO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiB0eXBlb2YgaXQgPT09ICdvYmplY3QnID8gaXQgIT09IG51bGwgOiB0eXBlb2YgaXQgPT09ICdmdW5jdGlvbic7XG59O1xuIiwiLy8gNy4yLjggSXNSZWdFeHAoYXJndW1lbnQpXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbnZhciBjb2YgPSByZXF1aXJlKCcuL19jb2YnKTtcbnZhciBNQVRDSCA9IHJlcXVpcmUoJy4vX3drcycpKCdtYXRjaCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIGlzUmVnRXhwO1xuICByZXR1cm4gaXNPYmplY3QoaXQpICYmICgoaXNSZWdFeHAgPSBpdFtNQVRDSF0pICE9PSB1bmRlZmluZWQgPyAhIWlzUmVnRXhwIDogY29mKGl0KSA9PSAnUmVnRXhwJyk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGNyZWF0ZSA9IHJlcXVpcmUoJy4vX29iamVjdC1jcmVhdGUnKTtcbnZhciBkZXNjcmlwdG9yID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpO1xudmFyIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKTtcbnZhciBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuXG4vLyAyNS4xLjIuMS4xICVJdGVyYXRvclByb3RvdHlwZSVbQEBpdGVyYXRvcl0oKVxucmVxdWlyZSgnLi9faGlkZScpKEl0ZXJhdG9yUHJvdG90eXBlLCByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKSwgZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KSB7XG4gIENvbnN0cnVjdG9yLnByb3RvdHlwZSA9IGNyZWF0ZShJdGVyYXRvclByb3RvdHlwZSwgeyBuZXh0OiBkZXNjcmlwdG9yKDEsIG5leHQpIH0pO1xuICBzZXRUb1N0cmluZ1RhZyhDb25zdHJ1Y3RvciwgTkFNRSArICcgSXRlcmF0b3InKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgTElCUkFSWSA9IHJlcXVpcmUoJy4vX2xpYnJhcnknKTtcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgcmVkZWZpbmUgPSByZXF1aXJlKCcuL19yZWRlZmluZScpO1xudmFyIGhpZGUgPSByZXF1aXJlKCcuL19oaWRlJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJyk7XG52YXIgJGl0ZXJDcmVhdGUgPSByZXF1aXJlKCcuL19pdGVyLWNyZWF0ZScpO1xudmFyIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKTtcbnZhciBnZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4vX29iamVjdC1ncG8nKTtcbnZhciBJVEVSQVRPUiA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpO1xudmFyIEJVR0dZID0gIShbXS5rZXlzICYmICduZXh0JyBpbiBbXS5rZXlzKCkpOyAvLyBTYWZhcmkgaGFzIGJ1Z2d5IGl0ZXJhdG9ycyB3L28gYG5leHRgXG52YXIgRkZfSVRFUkFUT1IgPSAnQEBpdGVyYXRvcic7XG52YXIgS0VZUyA9ICdrZXlzJztcbnZhciBWQUxVRVMgPSAndmFsdWVzJztcblxudmFyIHJldHVyblRoaXMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChCYXNlLCBOQU1FLCBDb25zdHJ1Y3RvciwgbmV4dCwgREVGQVVMVCwgSVNfU0VULCBGT1JDRUQpIHtcbiAgJGl0ZXJDcmVhdGUoQ29uc3RydWN0b3IsIE5BTUUsIG5leHQpO1xuICB2YXIgZ2V0TWV0aG9kID0gZnVuY3Rpb24gKGtpbmQpIHtcbiAgICBpZiAoIUJVR0dZICYmIGtpbmQgaW4gcHJvdG8pIHJldHVybiBwcm90b1traW5kXTtcbiAgICBzd2l0Y2ggKGtpbmQpIHtcbiAgICAgIGNhc2UgS0VZUzogcmV0dXJuIGZ1bmN0aW9uIGtleXMoKSB7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gICAgICBjYXNlIFZBTFVFUzogcmV0dXJuIGZ1bmN0aW9uIHZhbHVlcygpIHsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgICB9IHJldHVybiBmdW5jdGlvbiBlbnRyaWVzKCkgeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICB9O1xuICB2YXIgVEFHID0gTkFNRSArICcgSXRlcmF0b3InO1xuICB2YXIgREVGX1ZBTFVFUyA9IERFRkFVTFQgPT0gVkFMVUVTO1xuICB2YXIgVkFMVUVTX0JVRyA9IGZhbHNlO1xuICB2YXIgcHJvdG8gPSBCYXNlLnByb3RvdHlwZTtcbiAgdmFyICRuYXRpdmUgPSBwcm90b1tJVEVSQVRPUl0gfHwgcHJvdG9bRkZfSVRFUkFUT1JdIHx8IERFRkFVTFQgJiYgcHJvdG9bREVGQVVMVF07XG4gIHZhciAkZGVmYXVsdCA9ICRuYXRpdmUgfHwgZ2V0TWV0aG9kKERFRkFVTFQpO1xuICB2YXIgJGVudHJpZXMgPSBERUZBVUxUID8gIURFRl9WQUxVRVMgPyAkZGVmYXVsdCA6IGdldE1ldGhvZCgnZW50cmllcycpIDogdW5kZWZpbmVkO1xuICB2YXIgJGFueU5hdGl2ZSA9IE5BTUUgPT0gJ0FycmF5JyA/IHByb3RvLmVudHJpZXMgfHwgJG5hdGl2ZSA6ICRuYXRpdmU7XG4gIHZhciBtZXRob2RzLCBrZXksIEl0ZXJhdG9yUHJvdG90eXBlO1xuICAvLyBGaXggbmF0aXZlXG4gIGlmICgkYW55TmF0aXZlKSB7XG4gICAgSXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90b3R5cGVPZigkYW55TmF0aXZlLmNhbGwobmV3IEJhc2UoKSkpO1xuICAgIGlmIChJdGVyYXRvclByb3RvdHlwZSAhPT0gT2JqZWN0LnByb3RvdHlwZSAmJiBJdGVyYXRvclByb3RvdHlwZS5uZXh0KSB7XG4gICAgICAvLyBTZXQgQEB0b1N0cmluZ1RhZyB0byBuYXRpdmUgaXRlcmF0b3JzXG4gICAgICBzZXRUb1N0cmluZ1RhZyhJdGVyYXRvclByb3RvdHlwZSwgVEFHLCB0cnVlKTtcbiAgICAgIC8vIGZpeCBmb3Igc29tZSBvbGQgZW5naW5lc1xuICAgICAgaWYgKCFMSUJSQVJZICYmIHR5cGVvZiBJdGVyYXRvclByb3RvdHlwZVtJVEVSQVRPUl0gIT0gJ2Z1bmN0aW9uJykgaGlkZShJdGVyYXRvclByb3RvdHlwZSwgSVRFUkFUT1IsIHJldHVyblRoaXMpO1xuICAgIH1cbiAgfVxuICAvLyBmaXggQXJyYXkje3ZhbHVlcywgQEBpdGVyYXRvcn0ubmFtZSBpbiBWOCAvIEZGXG4gIGlmIChERUZfVkFMVUVTICYmICRuYXRpdmUgJiYgJG5hdGl2ZS5uYW1lICE9PSBWQUxVRVMpIHtcbiAgICBWQUxVRVNfQlVHID0gdHJ1ZTtcbiAgICAkZGVmYXVsdCA9IGZ1bmN0aW9uIHZhbHVlcygpIHsgcmV0dXJuICRuYXRpdmUuY2FsbCh0aGlzKTsgfTtcbiAgfVxuICAvLyBEZWZpbmUgaXRlcmF0b3JcbiAgaWYgKCghTElCUkFSWSB8fCBGT1JDRUQpICYmIChCVUdHWSB8fCBWQUxVRVNfQlVHIHx8ICFwcm90b1tJVEVSQVRPUl0pKSB7XG4gICAgaGlkZShwcm90bywgSVRFUkFUT1IsICRkZWZhdWx0KTtcbiAgfVxuICAvLyBQbHVnIGZvciBsaWJyYXJ5XG4gIEl0ZXJhdG9yc1tOQU1FXSA9ICRkZWZhdWx0O1xuICBJdGVyYXRvcnNbVEFHXSA9IHJldHVyblRoaXM7XG4gIGlmIChERUZBVUxUKSB7XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIHZhbHVlczogREVGX1ZBTFVFUyA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKFZBTFVFUyksXG4gICAgICBrZXlzOiBJU19TRVQgPyAkZGVmYXVsdCA6IGdldE1ldGhvZChLRVlTKSxcbiAgICAgIGVudHJpZXM6ICRlbnRyaWVzXG4gICAgfTtcbiAgICBpZiAoRk9SQ0VEKSBmb3IgKGtleSBpbiBtZXRob2RzKSB7XG4gICAgICBpZiAoIShrZXkgaW4gcHJvdG8pKSByZWRlZmluZShwcm90bywga2V5LCBtZXRob2RzW2tleV0pO1xuICAgIH0gZWxzZSAkZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqIChCVUdHWSB8fCBWQUxVRVNfQlVHKSwgTkFNRSwgbWV0aG9kcyk7XG4gIH1cbiAgcmV0dXJuIG1ldGhvZHM7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZG9uZSwgdmFsdWUpIHtcbiAgcmV0dXJuIHsgdmFsdWU6IHZhbHVlLCBkb25lOiAhIWRvbmUgfTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHt9O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmYWxzZTtcbiIsIi8vIDE5LjEuMi4yIC8gMTUuMi4zLjUgT2JqZWN0LmNyZWF0ZShPIFssIFByb3BlcnRpZXNdKVxudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgZFBzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwcycpO1xudmFyIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi9fZW51bS1idWcta2V5cycpO1xudmFyIElFX1BST1RPID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpO1xudmFyIEVtcHR5ID0gZnVuY3Rpb24gKCkgeyAvKiBlbXB0eSAqLyB9O1xudmFyIFBST1RPVFlQRSA9ICdwcm90b3R5cGUnO1xuXG4vLyBDcmVhdGUgb2JqZWN0IHdpdGggZmFrZSBgbnVsbGAgcHJvdG90eXBlOiB1c2UgaWZyYW1lIE9iamVjdCB3aXRoIGNsZWFyZWQgcHJvdG90eXBlXG52YXIgY3JlYXRlRGljdCA9IGZ1bmN0aW9uICgpIHtcbiAgLy8gVGhyYXNoLCB3YXN0ZSBhbmQgc29kb215OiBJRSBHQyBidWdcbiAgdmFyIGlmcmFtZSA9IHJlcXVpcmUoJy4vX2RvbS1jcmVhdGUnKSgnaWZyYW1lJyk7XG4gIHZhciBpID0gZW51bUJ1Z0tleXMubGVuZ3RoO1xuICB2YXIgbHQgPSAnPCc7XG4gIHZhciBndCA9ICc+JztcbiAgdmFyIGlmcmFtZURvY3VtZW50O1xuICBpZnJhbWUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgcmVxdWlyZSgnLi9faHRtbCcpLmFwcGVuZENoaWxkKGlmcmFtZSk7XG4gIGlmcmFtZS5zcmMgPSAnamF2YXNjcmlwdDonOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXNjcmlwdC11cmxcbiAgLy8gY3JlYXRlRGljdCA9IGlmcmFtZS5jb250ZW50V2luZG93Lk9iamVjdDtcbiAgLy8gaHRtbC5yZW1vdmVDaGlsZChpZnJhbWUpO1xuICBpZnJhbWVEb2N1bWVudCA9IGlmcmFtZS5jb250ZW50V2luZG93LmRvY3VtZW50O1xuICBpZnJhbWVEb2N1bWVudC5vcGVuKCk7XG4gIGlmcmFtZURvY3VtZW50LndyaXRlKGx0ICsgJ3NjcmlwdCcgKyBndCArICdkb2N1bWVudC5GPU9iamVjdCcgKyBsdCArICcvc2NyaXB0JyArIGd0KTtcbiAgaWZyYW1lRG9jdW1lbnQuY2xvc2UoKTtcbiAgY3JlYXRlRGljdCA9IGlmcmFtZURvY3VtZW50LkY7XG4gIHdoaWxlIChpLS0pIGRlbGV0ZSBjcmVhdGVEaWN0W1BST1RPVFlQRV1bZW51bUJ1Z0tleXNbaV1dO1xuICByZXR1cm4gY3JlYXRlRGljdCgpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuY3JlYXRlIHx8IGZ1bmN0aW9uIGNyZWF0ZShPLCBQcm9wZXJ0aWVzKSB7XG4gIHZhciByZXN1bHQ7XG4gIGlmIChPICE9PSBudWxsKSB7XG4gICAgRW1wdHlbUFJPVE9UWVBFXSA9IGFuT2JqZWN0KE8pO1xuICAgIHJlc3VsdCA9IG5ldyBFbXB0eSgpO1xuICAgIEVtcHR5W1BST1RPVFlQRV0gPSBudWxsO1xuICAgIC8vIGFkZCBcIl9fcHJvdG9fX1wiIGZvciBPYmplY3QuZ2V0UHJvdG90eXBlT2YgcG9seWZpbGxcbiAgICByZXN1bHRbSUVfUFJPVE9dID0gTztcbiAgfSBlbHNlIHJlc3VsdCA9IGNyZWF0ZURpY3QoKTtcbiAgcmV0dXJuIFByb3BlcnRpZXMgPT09IHVuZGVmaW5lZCA/IHJlc3VsdCA6IGRQcyhyZXN1bHQsIFByb3BlcnRpZXMpO1xufTtcbiIsInZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi9faWU4LWRvbS1kZWZpbmUnKTtcbnZhciB0b1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpO1xudmFyIGRQID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuXG5leHBvcnRzLmYgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gT2JqZWN0LmRlZmluZVByb3BlcnR5IDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcykge1xuICBhbk9iamVjdChPKTtcbiAgUCA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBhbk9iamVjdChBdHRyaWJ1dGVzKTtcbiAgaWYgKElFOF9ET01fREVGSU5FKSB0cnkge1xuICAgIHJldHVybiBkUChPLCBQLCBBdHRyaWJ1dGVzKTtcbiAgfSBjYXRjaCAoZSkgeyAvKiBlbXB0eSAqLyB9XG4gIGlmICgnZ2V0JyBpbiBBdHRyaWJ1dGVzIHx8ICdzZXQnIGluIEF0dHJpYnV0ZXMpIHRocm93IFR5cGVFcnJvcignQWNjZXNzb3JzIG5vdCBzdXBwb3J0ZWQhJyk7XG4gIGlmICgndmFsdWUnIGluIEF0dHJpYnV0ZXMpIE9bUF0gPSBBdHRyaWJ1dGVzLnZhbHVlO1xuICByZXR1cm4gTztcbn07XG4iLCJ2YXIgZFAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIGdldEtleXMgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXMoTywgUHJvcGVydGllcykge1xuICBhbk9iamVjdChPKTtcbiAgdmFyIGtleXMgPSBnZXRLZXlzKFByb3BlcnRpZXMpO1xuICB2YXIgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG4gIHZhciBpID0gMDtcbiAgdmFyIFA7XG4gIHdoaWxlIChsZW5ndGggPiBpKSBkUC5mKE8sIFAgPSBrZXlzW2krK10sIFByb3BlcnRpZXNbUF0pO1xuICByZXR1cm4gTztcbn07XG4iLCJ2YXIgcElFID0gcmVxdWlyZSgnLi9fb2JqZWN0LXBpZScpO1xudmFyIGNyZWF0ZURlc2MgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xudmFyIHRvUHJpbWl0aXZlID0gcmVxdWlyZSgnLi9fdG8tcHJpbWl0aXZlJyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgSUU4X0RPTV9ERUZJTkUgPSByZXF1aXJlKCcuL19pZTgtZG9tLWRlZmluZScpO1xudmFyIGdPUEQgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuXG5leHBvcnRzLmYgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gZ09QRCA6IGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBQKSB7XG4gIE8gPSB0b0lPYmplY3QoTyk7XG4gIFAgPSB0b1ByaW1pdGl2ZShQLCB0cnVlKTtcbiAgaWYgKElFOF9ET01fREVGSU5FKSB0cnkge1xuICAgIHJldHVybiBnT1BEKE8sIFApO1xuICB9IGNhdGNoIChlKSB7IC8qIGVtcHR5ICovIH1cbiAgaWYgKGhhcyhPLCBQKSkgcmV0dXJuIGNyZWF0ZURlc2MoIXBJRS5mLmNhbGwoTywgUCksIE9bUF0pO1xufTtcbiIsIi8vIDE5LjEuMi43IC8gMTUuMi4zLjQgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoTylcbnZhciAka2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzLWludGVybmFsJyk7XG52YXIgaGlkZGVuS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKS5jb25jYXQoJ2xlbmd0aCcsICdwcm90b3R5cGUnKTtcblxuZXhwb3J0cy5mID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMgfHwgZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlOYW1lcyhPKSB7XG4gIHJldHVybiAka2V5cyhPLCBoaWRkZW5LZXlzKTtcbn07XG4iLCIvLyAxOS4xLjIuOSAvIDE1LjIuMy4yIE9iamVjdC5nZXRQcm90b3R5cGVPZihPKVxudmFyIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0Jyk7XG52YXIgSUVfUFJPVE8gPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJyk7XG52YXIgT2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5nZXRQcm90b3R5cGVPZiB8fCBmdW5jdGlvbiAoTykge1xuICBPID0gdG9PYmplY3QoTyk7XG4gIGlmIChoYXMoTywgSUVfUFJPVE8pKSByZXR1cm4gT1tJRV9QUk9UT107XG4gIGlmICh0eXBlb2YgTy5jb25zdHJ1Y3RvciA9PSAnZnVuY3Rpb24nICYmIE8gaW5zdGFuY2VvZiBPLmNvbnN0cnVjdG9yKSB7XG4gICAgcmV0dXJuIE8uY29uc3RydWN0b3IucHJvdG90eXBlO1xuICB9IHJldHVybiBPIGluc3RhbmNlb2YgT2JqZWN0ID8gT2JqZWN0UHJvdG8gOiBudWxsO1xufTtcbiIsInZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG52YXIgYXJyYXlJbmRleE9mID0gcmVxdWlyZSgnLi9fYXJyYXktaW5jbHVkZXMnKShmYWxzZSk7XG52YXIgSUVfUFJPVE8gPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iamVjdCwgbmFtZXMpIHtcbiAgdmFyIE8gPSB0b0lPYmplY3Qob2JqZWN0KTtcbiAgdmFyIGkgPSAwO1xuICB2YXIgcmVzdWx0ID0gW107XG4gIHZhciBrZXk7XG4gIGZvciAoa2V5IGluIE8pIGlmIChrZXkgIT0gSUVfUFJPVE8pIGhhcyhPLCBrZXkpICYmIHJlc3VsdC5wdXNoKGtleSk7XG4gIC8vIERvbid0IGVudW0gYnVnICYgaGlkZGVuIGtleXNcbiAgd2hpbGUgKG5hbWVzLmxlbmd0aCA+IGkpIGlmIChoYXMoTywga2V5ID0gbmFtZXNbaSsrXSkpIHtcbiAgICB+YXJyYXlJbmRleE9mKHJlc3VsdCwga2V5KSB8fCByZXN1bHQucHVzaChrZXkpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59O1xuIiwiLy8gMTkuMS4yLjE0IC8gMTUuMi4zLjE0IE9iamVjdC5rZXlzKE8pXG52YXIgJGtleXMgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cy1pbnRlcm5hbCcpO1xudmFyIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi9fZW51bS1idWcta2V5cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5rZXlzIHx8IGZ1bmN0aW9uIGtleXMoTykge1xuICByZXR1cm4gJGtleXMoTywgZW51bUJ1Z0tleXMpO1xufTtcbiIsImV4cG9ydHMuZiA9IHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYml0bWFwLCB2YWx1ZSkge1xuICByZXR1cm4ge1xuICAgIGVudW1lcmFibGU6ICEoYml0bWFwICYgMSksXG4gICAgY29uZmlndXJhYmxlOiAhKGJpdG1hcCAmIDIpLFxuICAgIHdyaXRhYmxlOiAhKGJpdG1hcCAmIDQpLFxuICAgIHZhbHVlOiB2YWx1ZVxuICB9O1xufTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBoaWRlID0gcmVxdWlyZSgnLi9faGlkZScpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpO1xudmFyIFNSQyA9IHJlcXVpcmUoJy4vX3VpZCcpKCdzcmMnKTtcbnZhciAkdG9TdHJpbmcgPSByZXF1aXJlKCcuL19mdW5jdGlvbi10by1zdHJpbmcnKTtcbnZhciBUT19TVFJJTkcgPSAndG9TdHJpbmcnO1xudmFyIFRQTCA9ICgnJyArICR0b1N0cmluZykuc3BsaXQoVE9fU1RSSU5HKTtcblxucmVxdWlyZSgnLi9fY29yZScpLmluc3BlY3RTb3VyY2UgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuICR0b1N0cmluZy5jYWxsKGl0KTtcbn07XG5cbihtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChPLCBrZXksIHZhbCwgc2FmZSkge1xuICB2YXIgaXNGdW5jdGlvbiA9IHR5cGVvZiB2YWwgPT0gJ2Z1bmN0aW9uJztcbiAgaWYgKGlzRnVuY3Rpb24pIGhhcyh2YWwsICduYW1lJykgfHwgaGlkZSh2YWwsICduYW1lJywga2V5KTtcbiAgaWYgKE9ba2V5XSA9PT0gdmFsKSByZXR1cm47XG4gIGlmIChpc0Z1bmN0aW9uKSBoYXModmFsLCBTUkMpIHx8IGhpZGUodmFsLCBTUkMsIE9ba2V5XSA/ICcnICsgT1trZXldIDogVFBMLmpvaW4oU3RyaW5nKGtleSkpKTtcbiAgaWYgKE8gPT09IGdsb2JhbCkge1xuICAgIE9ba2V5XSA9IHZhbDtcbiAgfSBlbHNlIGlmICghc2FmZSkge1xuICAgIGRlbGV0ZSBPW2tleV07XG4gICAgaGlkZShPLCBrZXksIHZhbCk7XG4gIH0gZWxzZSBpZiAoT1trZXldKSB7XG4gICAgT1trZXldID0gdmFsO1xuICB9IGVsc2Uge1xuICAgIGhpZGUoTywga2V5LCB2YWwpO1xuICB9XG4vLyBhZGQgZmFrZSBGdW5jdGlvbiN0b1N0cmluZyBmb3IgY29ycmVjdCB3b3JrIHdyYXBwZWQgbWV0aG9kcyAvIGNvbnN0cnVjdG9ycyB3aXRoIG1ldGhvZHMgbGlrZSBMb0Rhc2ggaXNOYXRpdmVcbn0pKEZ1bmN0aW9uLnByb3RvdHlwZSwgVE9fU1RSSU5HLCBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgcmV0dXJuIHR5cGVvZiB0aGlzID09ICdmdW5jdGlvbicgJiYgdGhpc1tTUkNdIHx8ICR0b1N0cmluZy5jYWxsKHRoaXMpO1xufSk7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBjbGFzc29mID0gcmVxdWlyZSgnLi9fY2xhc3NvZicpO1xudmFyIGJ1aWx0aW5FeGVjID0gUmVnRXhwLnByb3RvdHlwZS5leGVjO1xuXG4gLy8gYFJlZ0V4cEV4ZWNgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtcmVnZXhwZXhlY1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoUiwgUykge1xuICB2YXIgZXhlYyA9IFIuZXhlYztcbiAgaWYgKHR5cGVvZiBleGVjID09PSAnZnVuY3Rpb24nKSB7XG4gICAgdmFyIHJlc3VsdCA9IGV4ZWMuY2FsbChSLCBTKTtcbiAgICBpZiAodHlwZW9mIHJlc3VsdCAhPT0gJ29iamVjdCcpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1JlZ0V4cCBleGVjIG1ldGhvZCByZXR1cm5lZCBzb21ldGhpbmcgb3RoZXIgdGhhbiBhbiBPYmplY3Qgb3IgbnVsbCcpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIGlmIChjbGFzc29mKFIpICE9PSAnUmVnRXhwJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1JlZ0V4cCNleGVjIGNhbGxlZCBvbiBpbmNvbXBhdGlibGUgcmVjZWl2ZXInKTtcbiAgfVxuICByZXR1cm4gYnVpbHRpbkV4ZWMuY2FsbChSLCBTKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciByZWdleHBGbGFncyA9IHJlcXVpcmUoJy4vX2ZsYWdzJyk7XG5cbnZhciBuYXRpdmVFeGVjID0gUmVnRXhwLnByb3RvdHlwZS5leGVjO1xuLy8gVGhpcyBhbHdheXMgcmVmZXJzIHRvIHRoZSBuYXRpdmUgaW1wbGVtZW50YXRpb24sIGJlY2F1c2UgdGhlXG4vLyBTdHJpbmcjcmVwbGFjZSBwb2x5ZmlsbCB1c2VzIC4vZml4LXJlZ2V4cC13ZWxsLWtub3duLXN5bWJvbC1sb2dpYy5qcyxcbi8vIHdoaWNoIGxvYWRzIHRoaXMgZmlsZSBiZWZvcmUgcGF0Y2hpbmcgdGhlIG1ldGhvZC5cbnZhciBuYXRpdmVSZXBsYWNlID0gU3RyaW5nLnByb3RvdHlwZS5yZXBsYWNlO1xuXG52YXIgcGF0Y2hlZEV4ZWMgPSBuYXRpdmVFeGVjO1xuXG52YXIgTEFTVF9JTkRFWCA9ICdsYXN0SW5kZXgnO1xuXG52YXIgVVBEQVRFU19MQVNUX0lOREVYX1dST05HID0gKGZ1bmN0aW9uICgpIHtcbiAgdmFyIHJlMSA9IC9hLyxcbiAgICAgIHJlMiA9IC9iKi9nO1xuICBuYXRpdmVFeGVjLmNhbGwocmUxLCAnYScpO1xuICBuYXRpdmVFeGVjLmNhbGwocmUyLCAnYScpO1xuICByZXR1cm4gcmUxW0xBU1RfSU5ERVhdICE9PSAwIHx8IHJlMltMQVNUX0lOREVYXSAhPT0gMDtcbn0pKCk7XG5cbi8vIG5vbnBhcnRpY2lwYXRpbmcgY2FwdHVyaW5nIGdyb3VwLCBjb3BpZWQgZnJvbSBlczUtc2hpbSdzIFN0cmluZyNzcGxpdCBwYXRjaC5cbnZhciBOUENHX0lOQ0xVREVEID0gLygpPz8vLmV4ZWMoJycpWzFdICE9PSB1bmRlZmluZWQ7XG5cbnZhciBQQVRDSCA9IFVQREFURVNfTEFTVF9JTkRFWF9XUk9ORyB8fCBOUENHX0lOQ0xVREVEO1xuXG5pZiAoUEFUQ0gpIHtcbiAgcGF0Y2hlZEV4ZWMgPSBmdW5jdGlvbiBleGVjKHN0cikge1xuICAgIHZhciByZSA9IHRoaXM7XG4gICAgdmFyIGxhc3RJbmRleCwgcmVDb3B5LCBtYXRjaCwgaTtcblxuICAgIGlmIChOUENHX0lOQ0xVREVEKSB7XG4gICAgICByZUNvcHkgPSBuZXcgUmVnRXhwKCdeJyArIHJlLnNvdXJjZSArICckKD8hXFxcXHMpJywgcmVnZXhwRmxhZ3MuY2FsbChyZSkpO1xuICAgIH1cbiAgICBpZiAoVVBEQVRFU19MQVNUX0lOREVYX1dST05HKSBsYXN0SW5kZXggPSByZVtMQVNUX0lOREVYXTtcblxuICAgIG1hdGNoID0gbmF0aXZlRXhlYy5jYWxsKHJlLCBzdHIpO1xuXG4gICAgaWYgKFVQREFURVNfTEFTVF9JTkRFWF9XUk9ORyAmJiBtYXRjaCkge1xuICAgICAgcmVbTEFTVF9JTkRFWF0gPSByZS5nbG9iYWwgPyBtYXRjaC5pbmRleCArIG1hdGNoWzBdLmxlbmd0aCA6IGxhc3RJbmRleDtcbiAgICB9XG4gICAgaWYgKE5QQ0dfSU5DTFVERUQgJiYgbWF0Y2ggJiYgbWF0Y2gubGVuZ3RoID4gMSkge1xuICAgICAgLy8gRml4IGJyb3dzZXJzIHdob3NlIGBleGVjYCBtZXRob2RzIGRvbid0IGNvbnNpc3RlbnRseSByZXR1cm4gYHVuZGVmaW5lZGBcbiAgICAgIC8vIGZvciBOUENHLCBsaWtlIElFOC4gTk9URTogVGhpcyBkb2Vzbicgd29yayBmb3IgLyguPyk/L1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWxvb3AtZnVuY1xuICAgICAgbmF0aXZlUmVwbGFjZS5jYWxsKG1hdGNoWzBdLCByZUNvcHksIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZm9yIChpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGggLSAyOyBpKyspIHtcbiAgICAgICAgICBpZiAoYXJndW1lbnRzW2ldID09PSB1bmRlZmluZWQpIG1hdGNoW2ldID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWF0Y2g7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcGF0Y2hlZEV4ZWM7XG4iLCIvLyBXb3JrcyB3aXRoIF9fcHJvdG9fXyBvbmx5LiBPbGQgdjggY2FuJ3Qgd29yayB3aXRoIG51bGwgcHJvdG8gb2JqZWN0cy5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXByb3RvICovXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIGNoZWNrID0gZnVuY3Rpb24gKE8sIHByb3RvKSB7XG4gIGFuT2JqZWN0KE8pO1xuICBpZiAoIWlzT2JqZWN0KHByb3RvKSAmJiBwcm90byAhPT0gbnVsbCkgdGhyb3cgVHlwZUVycm9yKHByb3RvICsgXCI6IGNhbid0IHNldCBhcyBwcm90b3R5cGUhXCIpO1xufTtcbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZXQ6IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCAoJ19fcHJvdG9fXycgaW4ge30gPyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgZnVuY3Rpb24gKHRlc3QsIGJ1Z2d5LCBzZXQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHNldCA9IHJlcXVpcmUoJy4vX2N0eCcpKEZ1bmN0aW9uLmNhbGwsIHJlcXVpcmUoJy4vX29iamVjdC1nb3BkJykuZihPYmplY3QucHJvdG90eXBlLCAnX19wcm90b19fJykuc2V0LCAyKTtcbiAgICAgICAgc2V0KHRlc3QsIFtdKTtcbiAgICAgICAgYnVnZ3kgPSAhKHRlc3QgaW5zdGFuY2VvZiBBcnJheSk7XG4gICAgICB9IGNhdGNoIChlKSB7IGJ1Z2d5ID0gdHJ1ZTsgfVxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIHNldFByb3RvdHlwZU9mKE8sIHByb3RvKSB7XG4gICAgICAgIGNoZWNrKE8sIHByb3RvKTtcbiAgICAgICAgaWYgKGJ1Z2d5KSBPLl9fcHJvdG9fXyA9IHByb3RvO1xuICAgICAgICBlbHNlIHNldChPLCBwcm90byk7XG4gICAgICAgIHJldHVybiBPO1xuICAgICAgfTtcbiAgICB9KHt9LCBmYWxzZSkgOiB1bmRlZmluZWQpLFxuICBjaGVjazogY2hlY2tcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgZFAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKTtcbnZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJyk7XG52YXIgU1BFQ0lFUyA9IHJlcXVpcmUoJy4vX3drcycpKCdzcGVjaWVzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKEtFWSkge1xuICB2YXIgQyA9IGdsb2JhbFtLRVldO1xuICBpZiAoREVTQ1JJUFRPUlMgJiYgQyAmJiAhQ1tTUEVDSUVTXSkgZFAuZihDLCBTUEVDSUVTLCB7XG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfVxuICB9KTtcbn07XG4iLCJ2YXIgZGVmID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZjtcbnZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciBUQUcgPSByZXF1aXJlKCcuL193a3MnKSgndG9TdHJpbmdUYWcnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIHRhZywgc3RhdCkge1xuICBpZiAoaXQgJiYgIWhhcyhpdCA9IHN0YXQgPyBpdCA6IGl0LnByb3RvdHlwZSwgVEFHKSkgZGVmKGl0LCBUQUcsIHsgY29uZmlndXJhYmxlOiB0cnVlLCB2YWx1ZTogdGFnIH0pO1xufTtcbiIsInZhciBzaGFyZWQgPSByZXF1aXJlKCcuL19zaGFyZWQnKSgna2V5cycpO1xudmFyIHVpZCA9IHJlcXVpcmUoJy4vX3VpZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiBzaGFyZWRba2V5XSB8fCAoc2hhcmVkW2tleV0gPSB1aWQoa2V5KSk7XG59O1xuIiwidmFyIGNvcmUgPSByZXF1aXJlKCcuL19jb3JlJyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgU0hBUkVEID0gJ19fY29yZS1qc19zaGFyZWRfXyc7XG52YXIgc3RvcmUgPSBnbG9iYWxbU0hBUkVEXSB8fCAoZ2xvYmFsW1NIQVJFRF0gPSB7fSk7XG5cbihtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gIHJldHVybiBzdG9yZVtrZXldIHx8IChzdG9yZVtrZXldID0gdmFsdWUgIT09IHVuZGVmaW5lZCA/IHZhbHVlIDoge30pO1xufSkoJ3ZlcnNpb25zJywgW10pLnB1c2goe1xuICB2ZXJzaW9uOiBjb3JlLnZlcnNpb24sXG4gIG1vZGU6IHJlcXVpcmUoJy4vX2xpYnJhcnknKSA/ICdwdXJlJyA6ICdnbG9iYWwnLFxuICBjb3B5cmlnaHQ6ICfCqSAyMDE5IERlbmlzIFB1c2hrYXJldiAoemxvaXJvY2sucnUpJ1xufSk7XG4iLCJ2YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpO1xudmFyIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG4vLyB0cnVlICAtPiBTdHJpbmcjYXRcbi8vIGZhbHNlIC0+IFN0cmluZyNjb2RlUG9pbnRBdFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoVE9fU1RSSU5HKSB7XG4gIHJldHVybiBmdW5jdGlvbiAodGhhdCwgcG9zKSB7XG4gICAgdmFyIHMgPSBTdHJpbmcoZGVmaW5lZCh0aGF0KSk7XG4gICAgdmFyIGkgPSB0b0ludGVnZXIocG9zKTtcbiAgICB2YXIgbCA9IHMubGVuZ3RoO1xuICAgIHZhciBhLCBiO1xuICAgIGlmIChpIDwgMCB8fCBpID49IGwpIHJldHVybiBUT19TVFJJTkcgPyAnJyA6IHVuZGVmaW5lZDtcbiAgICBhID0gcy5jaGFyQ29kZUF0KGkpO1xuICAgIHJldHVybiBhIDwgMHhkODAwIHx8IGEgPiAweGRiZmYgfHwgaSArIDEgPT09IGwgfHwgKGIgPSBzLmNoYXJDb2RlQXQoaSArIDEpKSA8IDB4ZGMwMCB8fCBiID4gMHhkZmZmXG4gICAgICA/IFRPX1NUUklORyA/IHMuY2hhckF0KGkpIDogYVxuICAgICAgOiBUT19TVFJJTkcgPyBzLnNsaWNlKGksIGkgKyAyKSA6IChhIC0gMHhkODAwIDw8IDEwKSArIChiIC0gMHhkYzAwKSArIDB4MTAwMDA7XG4gIH07XG59O1xuIiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKTtcbnZhciBtYXggPSBNYXRoLm1heDtcbnZhciBtaW4gPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGluZGV4LCBsZW5ndGgpIHtcbiAgaW5kZXggPSB0b0ludGVnZXIoaW5kZXgpO1xuICByZXR1cm4gaW5kZXggPCAwID8gbWF4KGluZGV4ICsgbGVuZ3RoLCAwKSA6IG1pbihpbmRleCwgbGVuZ3RoKTtcbn07XG4iLCIvLyA3LjEuNCBUb0ludGVnZXJcbnZhciBjZWlsID0gTWF0aC5jZWlsO1xudmFyIGZsb29yID0gTWF0aC5mbG9vcjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpc05hTihpdCA9ICtpdCkgPyAwIDogKGl0ID4gMCA/IGZsb29yIDogY2VpbCkoaXQpO1xufTtcbiIsIi8vIHRvIGluZGV4ZWQgb2JqZWN0LCB0b09iamVjdCB3aXRoIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgc3RyaW5nc1xudmFyIElPYmplY3QgPSByZXF1aXJlKCcuL19pb2JqZWN0Jyk7XG52YXIgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBJT2JqZWN0KGRlZmluZWQoaXQpKTtcbn07XG4iLCIvLyA3LjEuMTUgVG9MZW5ndGhcbnZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJyk7XG52YXIgbWluID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXQgPiAwID8gbWluKHRvSW50ZWdlcihpdCksIDB4MWZmZmZmZmZmZmZmZmYpIDogMDsgLy8gcG93KDIsIDUzKSAtIDEgPT0gOTAwNzE5OTI1NDc0MDk5MVxufTtcbiIsIi8vIDcuMS4xMyBUb09iamVjdChhcmd1bWVudClcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIE9iamVjdChkZWZpbmVkKGl0KSk7XG59O1xuIiwiLy8gNy4xLjEgVG9QcmltaXRpdmUoaW5wdXQgWywgUHJlZmVycmVkVHlwZV0pXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbi8vIGluc3RlYWQgb2YgdGhlIEVTNiBzcGVjIHZlcnNpb24sIHdlIGRpZG4ndCBpbXBsZW1lbnQgQEB0b1ByaW1pdGl2ZSBjYXNlXG4vLyBhbmQgdGhlIHNlY29uZCBhcmd1bWVudCAtIGZsYWcgLSBwcmVmZXJyZWQgdHlwZSBpcyBhIHN0cmluZ1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIFMpIHtcbiAgaWYgKCFpc09iamVjdChpdCkpIHJldHVybiBpdDtcbiAgdmFyIGZuLCB2YWw7XG4gIGlmIChTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKSByZXR1cm4gdmFsO1xuICBpZiAodHlwZW9mIChmbiA9IGl0LnZhbHVlT2YpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSkgcmV0dXJuIHZhbDtcbiAgaWYgKCFTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKSByZXR1cm4gdmFsO1xuICB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjb252ZXJ0IG9iamVjdCB0byBwcmltaXRpdmUgdmFsdWVcIik7XG59O1xuIiwidmFyIGlkID0gMDtcbnZhciBweCA9IE1hdGgucmFuZG9tKCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuICdTeW1ib2woJy5jb25jYXQoa2V5ID09PSB1bmRlZmluZWQgPyAnJyA6IGtleSwgJylfJywgKCsraWQgKyBweCkudG9TdHJpbmcoMzYpKTtcbn07XG4iLCJ2YXIgc3RvcmUgPSByZXF1aXJlKCcuL19zaGFyZWQnKSgnd2tzJyk7XG52YXIgdWlkID0gcmVxdWlyZSgnLi9fdWlkJyk7XG52YXIgU3ltYm9sID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuU3ltYm9sO1xudmFyIFVTRV9TWU1CT0wgPSB0eXBlb2YgU3ltYm9sID09ICdmdW5jdGlvbic7XG5cbnZhciAkZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgcmV0dXJuIHN0b3JlW25hbWVdIHx8IChzdG9yZVtuYW1lXSA9XG4gICAgVVNFX1NZTUJPTCAmJiBTeW1ib2xbbmFtZV0gfHwgKFVTRV9TWU1CT0wgPyBTeW1ib2wgOiB1aWQpKCdTeW1ib2wuJyArIG5hbWUpKTtcbn07XG5cbiRleHBvcnRzLnN0b3JlID0gc3RvcmU7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgYWRkVG9VbnNjb3BhYmxlcyA9IHJlcXVpcmUoJy4vX2FkZC10by11bnNjb3BhYmxlcycpO1xudmFyIHN0ZXAgPSByZXF1aXJlKCcuL19pdGVyLXN0ZXAnKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKTtcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG5cbi8vIDIyLjEuMy40IEFycmF5LnByb3RvdHlwZS5lbnRyaWVzKClcbi8vIDIyLjEuMy4xMyBBcnJheS5wcm90b3R5cGUua2V5cygpXG4vLyAyMi4xLjMuMjkgQXJyYXkucHJvdG90eXBlLnZhbHVlcygpXG4vLyAyMi4xLjMuMzAgQXJyYXkucHJvdG90eXBlW0BAaXRlcmF0b3JdKClcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9faXRlci1kZWZpbmUnKShBcnJheSwgJ0FycmF5JywgZnVuY3Rpb24gKGl0ZXJhdGVkLCBraW5kKSB7XG4gIHRoaXMuX3QgPSB0b0lPYmplY3QoaXRlcmF0ZWQpOyAvLyB0YXJnZXRcbiAgdGhpcy5faSA9IDA7ICAgICAgICAgICAgICAgICAgIC8vIG5leHQgaW5kZXhcbiAgdGhpcy5fayA9IGtpbmQ7ICAgICAgICAgICAgICAgIC8vIGtpbmRcbi8vIDIyLjEuNS4yLjEgJUFycmF5SXRlcmF0b3JQcm90b3R5cGUlLm5leHQoKVxufSwgZnVuY3Rpb24gKCkge1xuICB2YXIgTyA9IHRoaXMuX3Q7XG4gIHZhciBraW5kID0gdGhpcy5faztcbiAgdmFyIGluZGV4ID0gdGhpcy5faSsrO1xuICBpZiAoIU8gfHwgaW5kZXggPj0gTy5sZW5ndGgpIHtcbiAgICB0aGlzLl90ID0gdW5kZWZpbmVkO1xuICAgIHJldHVybiBzdGVwKDEpO1xuICB9XG4gIGlmIChraW5kID09ICdrZXlzJykgcmV0dXJuIHN0ZXAoMCwgaW5kZXgpO1xuICBpZiAoa2luZCA9PSAndmFsdWVzJykgcmV0dXJuIHN0ZXAoMCwgT1tpbmRleF0pO1xuICByZXR1cm4gc3RlcCgwLCBbaW5kZXgsIE9baW5kZXhdXSk7XG59LCAndmFsdWVzJyk7XG5cbi8vIGFyZ3VtZW50c0xpc3RbQEBpdGVyYXRvcl0gaXMgJUFycmF5UHJvdG9fdmFsdWVzJSAoOS40LjQuNiwgOS40LjQuNylcbkl0ZXJhdG9ycy5Bcmd1bWVudHMgPSBJdGVyYXRvcnMuQXJyYXk7XG5cbmFkZFRvVW5zY29wYWJsZXMoJ2tleXMnKTtcbmFkZFRvVW5zY29wYWJsZXMoJ3ZhbHVlcycpO1xuYWRkVG9VbnNjb3BhYmxlcygnZW50cmllcycpO1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIGluaGVyaXRJZlJlcXVpcmVkID0gcmVxdWlyZSgnLi9faW5oZXJpdC1pZi1yZXF1aXJlZCcpO1xudmFyIGRQID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZjtcbnZhciBnT1BOID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcG4nKS5mO1xudmFyIGlzUmVnRXhwID0gcmVxdWlyZSgnLi9faXMtcmVnZXhwJyk7XG52YXIgJGZsYWdzID0gcmVxdWlyZSgnLi9fZmxhZ3MnKTtcbnZhciAkUmVnRXhwID0gZ2xvYmFsLlJlZ0V4cDtcbnZhciBCYXNlID0gJFJlZ0V4cDtcbnZhciBwcm90byA9ICRSZWdFeHAucHJvdG90eXBlO1xudmFyIHJlMSA9IC9hL2c7XG52YXIgcmUyID0gL2EvZztcbi8vIFwibmV3XCIgY3JlYXRlcyBhIG5ldyBvYmplY3QsIG9sZCB3ZWJraXQgYnVnZ3kgaGVyZVxudmFyIENPUlJFQ1RfTkVXID0gbmV3ICRSZWdFeHAocmUxKSAhPT0gcmUxO1xuXG5pZiAocmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSAmJiAoIUNPUlJFQ1RfTkVXIHx8IHJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24gKCkge1xuICByZTJbcmVxdWlyZSgnLi9fd2tzJykoJ21hdGNoJyldID0gZmFsc2U7XG4gIC8vIFJlZ0V4cCBjb25zdHJ1Y3RvciBjYW4gYWx0ZXIgZmxhZ3MgYW5kIElzUmVnRXhwIHdvcmtzIGNvcnJlY3Qgd2l0aCBAQG1hdGNoXG4gIHJldHVybiAkUmVnRXhwKHJlMSkgIT0gcmUxIHx8ICRSZWdFeHAocmUyKSA9PSByZTIgfHwgJFJlZ0V4cChyZTEsICdpJykgIT0gJy9hL2knO1xufSkpKSB7XG4gICRSZWdFeHAgPSBmdW5jdGlvbiBSZWdFeHAocCwgZikge1xuICAgIHZhciB0aVJFID0gdGhpcyBpbnN0YW5jZW9mICRSZWdFeHA7XG4gICAgdmFyIHBpUkUgPSBpc1JlZ0V4cChwKTtcbiAgICB2YXIgZmlVID0gZiA9PT0gdW5kZWZpbmVkO1xuICAgIHJldHVybiAhdGlSRSAmJiBwaVJFICYmIHAuY29uc3RydWN0b3IgPT09ICRSZWdFeHAgJiYgZmlVID8gcFxuICAgICAgOiBpbmhlcml0SWZSZXF1aXJlZChDT1JSRUNUX05FV1xuICAgICAgICA/IG5ldyBCYXNlKHBpUkUgJiYgIWZpVSA/IHAuc291cmNlIDogcCwgZilcbiAgICAgICAgOiBCYXNlKChwaVJFID0gcCBpbnN0YW5jZW9mICRSZWdFeHApID8gcC5zb3VyY2UgOiBwLCBwaVJFICYmIGZpVSA/ICRmbGFncy5jYWxsKHApIDogZilcbiAgICAgICwgdGlSRSA/IHRoaXMgOiBwcm90bywgJFJlZ0V4cCk7XG4gIH07XG4gIHZhciBwcm94eSA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICBrZXkgaW4gJFJlZ0V4cCB8fCBkUCgkUmVnRXhwLCBrZXksIHtcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gQmFzZVtrZXldOyB9LFxuICAgICAgc2V0OiBmdW5jdGlvbiAoaXQpIHsgQmFzZVtrZXldID0gaXQ7IH1cbiAgICB9KTtcbiAgfTtcbiAgZm9yICh2YXIga2V5cyA9IGdPUE4oQmFzZSksIGkgPSAwOyBrZXlzLmxlbmd0aCA+IGk7KSBwcm94eShrZXlzW2krK10pO1xuICBwcm90by5jb25zdHJ1Y3RvciA9ICRSZWdFeHA7XG4gICRSZWdFeHAucHJvdG90eXBlID0gcHJvdG87XG4gIHJlcXVpcmUoJy4vX3JlZGVmaW5lJykoZ2xvYmFsLCAnUmVnRXhwJywgJFJlZ0V4cCk7XG59XG5cbnJlcXVpcmUoJy4vX3NldC1zcGVjaWVzJykoJ1JlZ0V4cCcpO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHJlZ2V4cEV4ZWMgPSByZXF1aXJlKCcuL19yZWdleHAtZXhlYycpO1xucmVxdWlyZSgnLi9fZXhwb3J0Jykoe1xuICB0YXJnZXQ6ICdSZWdFeHAnLFxuICBwcm90bzogdHJ1ZSxcbiAgZm9yY2VkOiByZWdleHBFeGVjICE9PSAvLi8uZXhlY1xufSwge1xuICBleGVjOiByZWdleHBFeGVjXG59KTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuL190by1sZW5ndGgnKTtcbnZhciBhZHZhbmNlU3RyaW5nSW5kZXggPSByZXF1aXJlKCcuL19hZHZhbmNlLXN0cmluZy1pbmRleCcpO1xudmFyIHJlZ0V4cEV4ZWMgPSByZXF1aXJlKCcuL19yZWdleHAtZXhlYy1hYnN0cmFjdCcpO1xuXG4vLyBAQG1hdGNoIGxvZ2ljXG5yZXF1aXJlKCcuL19maXgtcmUtd2tzJykoJ21hdGNoJywgMSwgZnVuY3Rpb24gKGRlZmluZWQsIE1BVENILCAkbWF0Y2gsIG1heWJlQ2FsbE5hdGl2ZSkge1xuICByZXR1cm4gW1xuICAgIC8vIGBTdHJpbmcucHJvdG90eXBlLm1hdGNoYCBtZXRob2RcbiAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1zdHJpbmcucHJvdG90eXBlLm1hdGNoXG4gICAgZnVuY3Rpb24gbWF0Y2gocmVnZXhwKSB7XG4gICAgICB2YXIgTyA9IGRlZmluZWQodGhpcyk7XG4gICAgICB2YXIgZm4gPSByZWdleHAgPT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogcmVnZXhwW01BVENIXTtcbiAgICAgIHJldHVybiBmbiAhPT0gdW5kZWZpbmVkID8gZm4uY2FsbChyZWdleHAsIE8pIDogbmV3IFJlZ0V4cChyZWdleHApW01BVENIXShTdHJpbmcoTykpO1xuICAgIH0sXG4gICAgLy8gYFJlZ0V4cC5wcm90b3R5cGVbQEBtYXRjaF1gIG1ldGhvZFxuICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXJlZ2V4cC5wcm90b3R5cGUtQEBtYXRjaFxuICAgIGZ1bmN0aW9uIChyZWdleHApIHtcbiAgICAgIHZhciByZXMgPSBtYXliZUNhbGxOYXRpdmUoJG1hdGNoLCByZWdleHAsIHRoaXMpO1xuICAgICAgaWYgKHJlcy5kb25lKSByZXR1cm4gcmVzLnZhbHVlO1xuICAgICAgdmFyIHJ4ID0gYW5PYmplY3QocmVnZXhwKTtcbiAgICAgIHZhciBTID0gU3RyaW5nKHRoaXMpO1xuICAgICAgaWYgKCFyeC5nbG9iYWwpIHJldHVybiByZWdFeHBFeGVjKHJ4LCBTKTtcbiAgICAgIHZhciBmdWxsVW5pY29kZSA9IHJ4LnVuaWNvZGU7XG4gICAgICByeC5sYXN0SW5kZXggPSAwO1xuICAgICAgdmFyIEEgPSBbXTtcbiAgICAgIHZhciBuID0gMDtcbiAgICAgIHZhciByZXN1bHQ7XG4gICAgICB3aGlsZSAoKHJlc3VsdCA9IHJlZ0V4cEV4ZWMocngsIFMpKSAhPT0gbnVsbCkge1xuICAgICAgICB2YXIgbWF0Y2hTdHIgPSBTdHJpbmcocmVzdWx0WzBdKTtcbiAgICAgICAgQVtuXSA9IG1hdGNoU3RyO1xuICAgICAgICBpZiAobWF0Y2hTdHIgPT09ICcnKSByeC5sYXN0SW5kZXggPSBhZHZhbmNlU3RyaW5nSW5kZXgoUywgdG9MZW5ndGgocngubGFzdEluZGV4KSwgZnVsbFVuaWNvZGUpO1xuICAgICAgICBuKys7XG4gICAgICB9XG4gICAgICByZXR1cm4gbiA9PT0gMCA/IG51bGwgOiBBO1xuICAgIH1cbiAgXTtcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJyk7XG52YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpO1xudmFyIGFkdmFuY2VTdHJpbmdJbmRleCA9IHJlcXVpcmUoJy4vX2FkdmFuY2Utc3RyaW5nLWluZGV4Jyk7XG52YXIgcmVnRXhwRXhlYyA9IHJlcXVpcmUoJy4vX3JlZ2V4cC1leGVjLWFic3RyYWN0Jyk7XG52YXIgbWF4ID0gTWF0aC5tYXg7XG52YXIgbWluID0gTWF0aC5taW47XG52YXIgZmxvb3IgPSBNYXRoLmZsb29yO1xudmFyIFNVQlNUSVRVVElPTl9TWU1CT0xTID0gL1xcJChbJCZgJ118XFxkXFxkP3w8W14+XSo+KS9nO1xudmFyIFNVQlNUSVRVVElPTl9TWU1CT0xTX05PX05BTUVEID0gL1xcJChbJCZgJ118XFxkXFxkPykvZztcblxudmFyIG1heWJlVG9TdHJpbmcgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGl0ID09PSB1bmRlZmluZWQgPyBpdCA6IFN0cmluZyhpdCk7XG59O1xuXG4vLyBAQHJlcGxhY2UgbG9naWNcbnJlcXVpcmUoJy4vX2ZpeC1yZS13a3MnKSgncmVwbGFjZScsIDIsIGZ1bmN0aW9uIChkZWZpbmVkLCBSRVBMQUNFLCAkcmVwbGFjZSwgbWF5YmVDYWxsTmF0aXZlKSB7XG4gIHJldHVybiBbXG4gICAgLy8gYFN0cmluZy5wcm90b3R5cGUucmVwbGFjZWAgbWV0aG9kXG4gICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtc3RyaW5nLnByb3RvdHlwZS5yZXBsYWNlXG4gICAgZnVuY3Rpb24gcmVwbGFjZShzZWFyY2hWYWx1ZSwgcmVwbGFjZVZhbHVlKSB7XG4gICAgICB2YXIgTyA9IGRlZmluZWQodGhpcyk7XG4gICAgICB2YXIgZm4gPSBzZWFyY2hWYWx1ZSA9PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiBzZWFyY2hWYWx1ZVtSRVBMQUNFXTtcbiAgICAgIHJldHVybiBmbiAhPT0gdW5kZWZpbmVkXG4gICAgICAgID8gZm4uY2FsbChzZWFyY2hWYWx1ZSwgTywgcmVwbGFjZVZhbHVlKVxuICAgICAgICA6ICRyZXBsYWNlLmNhbGwoU3RyaW5nKE8pLCBzZWFyY2hWYWx1ZSwgcmVwbGFjZVZhbHVlKTtcbiAgICB9LFxuICAgIC8vIGBSZWdFeHAucHJvdG90eXBlW0BAcmVwbGFjZV1gIG1ldGhvZFxuICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXJlZ2V4cC5wcm90b3R5cGUtQEByZXBsYWNlXG4gICAgZnVuY3Rpb24gKHJlZ2V4cCwgcmVwbGFjZVZhbHVlKSB7XG4gICAgICB2YXIgcmVzID0gbWF5YmVDYWxsTmF0aXZlKCRyZXBsYWNlLCByZWdleHAsIHRoaXMsIHJlcGxhY2VWYWx1ZSk7XG4gICAgICBpZiAocmVzLmRvbmUpIHJldHVybiByZXMudmFsdWU7XG5cbiAgICAgIHZhciByeCA9IGFuT2JqZWN0KHJlZ2V4cCk7XG4gICAgICB2YXIgUyA9IFN0cmluZyh0aGlzKTtcbiAgICAgIHZhciBmdW5jdGlvbmFsUmVwbGFjZSA9IHR5cGVvZiByZXBsYWNlVmFsdWUgPT09ICdmdW5jdGlvbic7XG4gICAgICBpZiAoIWZ1bmN0aW9uYWxSZXBsYWNlKSByZXBsYWNlVmFsdWUgPSBTdHJpbmcocmVwbGFjZVZhbHVlKTtcbiAgICAgIHZhciBnbG9iYWwgPSByeC5nbG9iYWw7XG4gICAgICBpZiAoZ2xvYmFsKSB7XG4gICAgICAgIHZhciBmdWxsVW5pY29kZSA9IHJ4LnVuaWNvZGU7XG4gICAgICAgIHJ4Lmxhc3RJbmRleCA9IDA7XG4gICAgICB9XG4gICAgICB2YXIgcmVzdWx0cyA9IFtdO1xuICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHJlZ0V4cEV4ZWMocngsIFMpO1xuICAgICAgICBpZiAocmVzdWx0ID09PSBudWxsKSBicmVhaztcbiAgICAgICAgcmVzdWx0cy5wdXNoKHJlc3VsdCk7XG4gICAgICAgIGlmICghZ2xvYmFsKSBicmVhaztcbiAgICAgICAgdmFyIG1hdGNoU3RyID0gU3RyaW5nKHJlc3VsdFswXSk7XG4gICAgICAgIGlmIChtYXRjaFN0ciA9PT0gJycpIHJ4Lmxhc3RJbmRleCA9IGFkdmFuY2VTdHJpbmdJbmRleChTLCB0b0xlbmd0aChyeC5sYXN0SW5kZXgpLCBmdWxsVW5pY29kZSk7XG4gICAgICB9XG4gICAgICB2YXIgYWNjdW11bGF0ZWRSZXN1bHQgPSAnJztcbiAgICAgIHZhciBuZXh0U291cmNlUG9zaXRpb24gPSAwO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXN1bHRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHJlc3VsdCA9IHJlc3VsdHNbaV07XG4gICAgICAgIHZhciBtYXRjaGVkID0gU3RyaW5nKHJlc3VsdFswXSk7XG4gICAgICAgIHZhciBwb3NpdGlvbiA9IG1heChtaW4odG9JbnRlZ2VyKHJlc3VsdC5pbmRleCksIFMubGVuZ3RoKSwgMCk7XG4gICAgICAgIHZhciBjYXB0dXJlcyA9IFtdO1xuICAgICAgICAvLyBOT1RFOiBUaGlzIGlzIGVxdWl2YWxlbnQgdG9cbiAgICAgICAgLy8gICBjYXB0dXJlcyA9IHJlc3VsdC5zbGljZSgxKS5tYXAobWF5YmVUb1N0cmluZylcbiAgICAgICAgLy8gYnV0IGZvciBzb21lIHJlYXNvbiBgbmF0aXZlU2xpY2UuY2FsbChyZXN1bHQsIDEsIHJlc3VsdC5sZW5ndGgpYCAoY2FsbGVkIGluXG4gICAgICAgIC8vIHRoZSBzbGljZSBwb2x5ZmlsbCB3aGVuIHNsaWNpbmcgbmF0aXZlIGFycmF5cykgXCJkb2Vzbid0IHdvcmtcIiBpbiBzYWZhcmkgOSBhbmRcbiAgICAgICAgLy8gY2F1c2VzIGEgY3Jhc2ggKGh0dHBzOi8vcGFzdGViaW4uY29tL04yMVF6ZVFBKSB3aGVuIHRyeWluZyB0byBkZWJ1ZyBpdC5cbiAgICAgICAgZm9yICh2YXIgaiA9IDE7IGogPCByZXN1bHQubGVuZ3RoOyBqKyspIGNhcHR1cmVzLnB1c2gobWF5YmVUb1N0cmluZyhyZXN1bHRbal0pKTtcbiAgICAgICAgdmFyIG5hbWVkQ2FwdHVyZXMgPSByZXN1bHQuZ3JvdXBzO1xuICAgICAgICBpZiAoZnVuY3Rpb25hbFJlcGxhY2UpIHtcbiAgICAgICAgICB2YXIgcmVwbGFjZXJBcmdzID0gW21hdGNoZWRdLmNvbmNhdChjYXB0dXJlcywgcG9zaXRpb24sIFMpO1xuICAgICAgICAgIGlmIChuYW1lZENhcHR1cmVzICE9PSB1bmRlZmluZWQpIHJlcGxhY2VyQXJncy5wdXNoKG5hbWVkQ2FwdHVyZXMpO1xuICAgICAgICAgIHZhciByZXBsYWNlbWVudCA9IFN0cmluZyhyZXBsYWNlVmFsdWUuYXBwbHkodW5kZWZpbmVkLCByZXBsYWNlckFyZ3MpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXBsYWNlbWVudCA9IGdldFN1YnN0aXR1dGlvbihtYXRjaGVkLCBTLCBwb3NpdGlvbiwgY2FwdHVyZXMsIG5hbWVkQ2FwdHVyZXMsIHJlcGxhY2VWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBvc2l0aW9uID49IG5leHRTb3VyY2VQb3NpdGlvbikge1xuICAgICAgICAgIGFjY3VtdWxhdGVkUmVzdWx0ICs9IFMuc2xpY2UobmV4dFNvdXJjZVBvc2l0aW9uLCBwb3NpdGlvbikgKyByZXBsYWNlbWVudDtcbiAgICAgICAgICBuZXh0U291cmNlUG9zaXRpb24gPSBwb3NpdGlvbiArIG1hdGNoZWQubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gYWNjdW11bGF0ZWRSZXN1bHQgKyBTLnNsaWNlKG5leHRTb3VyY2VQb3NpdGlvbik7XG4gICAgfVxuICBdO1xuXG4gICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtZ2V0c3Vic3RpdHV0aW9uXG4gIGZ1bmN0aW9uIGdldFN1YnN0aXR1dGlvbihtYXRjaGVkLCBzdHIsIHBvc2l0aW9uLCBjYXB0dXJlcywgbmFtZWRDYXB0dXJlcywgcmVwbGFjZW1lbnQpIHtcbiAgICB2YXIgdGFpbFBvcyA9IHBvc2l0aW9uICsgbWF0Y2hlZC5sZW5ndGg7XG4gICAgdmFyIG0gPSBjYXB0dXJlcy5sZW5ndGg7XG4gICAgdmFyIHN5bWJvbHMgPSBTVUJTVElUVVRJT05fU1lNQk9MU19OT19OQU1FRDtcbiAgICBpZiAobmFtZWRDYXB0dXJlcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBuYW1lZENhcHR1cmVzID0gdG9PYmplY3QobmFtZWRDYXB0dXJlcyk7XG4gICAgICBzeW1ib2xzID0gU1VCU1RJVFVUSU9OX1NZTUJPTFM7XG4gICAgfVxuICAgIHJldHVybiAkcmVwbGFjZS5jYWxsKHJlcGxhY2VtZW50LCBzeW1ib2xzLCBmdW5jdGlvbiAobWF0Y2gsIGNoKSB7XG4gICAgICB2YXIgY2FwdHVyZTtcbiAgICAgIHN3aXRjaCAoY2guY2hhckF0KDApKSB7XG4gICAgICAgIGNhc2UgJyQnOiByZXR1cm4gJyQnO1xuICAgICAgICBjYXNlICcmJzogcmV0dXJuIG1hdGNoZWQ7XG4gICAgICAgIGNhc2UgJ2AnOiByZXR1cm4gc3RyLnNsaWNlKDAsIHBvc2l0aW9uKTtcbiAgICAgICAgY2FzZSBcIidcIjogcmV0dXJuIHN0ci5zbGljZSh0YWlsUG9zKTtcbiAgICAgICAgY2FzZSAnPCc6XG4gICAgICAgICAgY2FwdHVyZSA9IG5hbWVkQ2FwdHVyZXNbY2guc2xpY2UoMSwgLTEpXTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDogLy8gXFxkXFxkP1xuICAgICAgICAgIHZhciBuID0gK2NoO1xuICAgICAgICAgIGlmIChuID09PSAwKSByZXR1cm4gbWF0Y2g7XG4gICAgICAgICAgaWYgKG4gPiBtKSB7XG4gICAgICAgICAgICB2YXIgZiA9IGZsb29yKG4gLyAxMCk7XG4gICAgICAgICAgICBpZiAoZiA9PT0gMCkgcmV0dXJuIG1hdGNoO1xuICAgICAgICAgICAgaWYgKGYgPD0gbSkgcmV0dXJuIGNhcHR1cmVzW2YgLSAxXSA9PT0gdW5kZWZpbmVkID8gY2guY2hhckF0KDEpIDogY2FwdHVyZXNbZiAtIDFdICsgY2guY2hhckF0KDEpO1xuICAgICAgICAgICAgcmV0dXJuIG1hdGNoO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjYXB0dXJlID0gY2FwdHVyZXNbbiAtIDFdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNhcHR1cmUgPT09IHVuZGVmaW5lZCA/ICcnIDogY2FwdHVyZTtcbiAgICB9KTtcbiAgfVxufSk7XG4iLCJ2YXIgJGl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vZXM2LmFycmF5Lml0ZXJhdG9yJyk7XG52YXIgZ2V0S2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJyk7XG52YXIgcmVkZWZpbmUgPSByZXF1aXJlKCcuL19yZWRlZmluZScpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIGhpZGUgPSByZXF1aXJlKCcuL19oaWRlJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJyk7XG52YXIgd2tzID0gcmVxdWlyZSgnLi9fd2tzJyk7XG52YXIgSVRFUkFUT1IgPSB3a3MoJ2l0ZXJhdG9yJyk7XG52YXIgVE9fU1RSSU5HX1RBRyA9IHdrcygndG9TdHJpbmdUYWcnKTtcbnZhciBBcnJheVZhbHVlcyA9IEl0ZXJhdG9ycy5BcnJheTtcblxudmFyIERPTUl0ZXJhYmxlcyA9IHtcbiAgQ1NTUnVsZUxpc3Q6IHRydWUsIC8vIFRPRE86IE5vdCBzcGVjIGNvbXBsaWFudCwgc2hvdWxkIGJlIGZhbHNlLlxuICBDU1NTdHlsZURlY2xhcmF0aW9uOiBmYWxzZSxcbiAgQ1NTVmFsdWVMaXN0OiBmYWxzZSxcbiAgQ2xpZW50UmVjdExpc3Q6IGZhbHNlLFxuICBET01SZWN0TGlzdDogZmFsc2UsXG4gIERPTVN0cmluZ0xpc3Q6IGZhbHNlLFxuICBET01Ub2tlbkxpc3Q6IHRydWUsXG4gIERhdGFUcmFuc2Zlckl0ZW1MaXN0OiBmYWxzZSxcbiAgRmlsZUxpc3Q6IGZhbHNlLFxuICBIVE1MQWxsQ29sbGVjdGlvbjogZmFsc2UsXG4gIEhUTUxDb2xsZWN0aW9uOiBmYWxzZSxcbiAgSFRNTEZvcm1FbGVtZW50OiBmYWxzZSxcbiAgSFRNTFNlbGVjdEVsZW1lbnQ6IGZhbHNlLFxuICBNZWRpYUxpc3Q6IHRydWUsIC8vIFRPRE86IE5vdCBzcGVjIGNvbXBsaWFudCwgc2hvdWxkIGJlIGZhbHNlLlxuICBNaW1lVHlwZUFycmF5OiBmYWxzZSxcbiAgTmFtZWROb2RlTWFwOiBmYWxzZSxcbiAgTm9kZUxpc3Q6IHRydWUsXG4gIFBhaW50UmVxdWVzdExpc3Q6IGZhbHNlLFxuICBQbHVnaW46IGZhbHNlLFxuICBQbHVnaW5BcnJheTogZmFsc2UsXG4gIFNWR0xlbmd0aExpc3Q6IGZhbHNlLFxuICBTVkdOdW1iZXJMaXN0OiBmYWxzZSxcbiAgU1ZHUGF0aFNlZ0xpc3Q6IGZhbHNlLFxuICBTVkdQb2ludExpc3Q6IGZhbHNlLFxuICBTVkdTdHJpbmdMaXN0OiBmYWxzZSxcbiAgU1ZHVHJhbnNmb3JtTGlzdDogZmFsc2UsXG4gIFNvdXJjZUJ1ZmZlckxpc3Q6IGZhbHNlLFxuICBTdHlsZVNoZWV0TGlzdDogdHJ1ZSwgLy8gVE9ETzogTm90IHNwZWMgY29tcGxpYW50LCBzaG91bGQgYmUgZmFsc2UuXG4gIFRleHRUcmFja0N1ZUxpc3Q6IGZhbHNlLFxuICBUZXh0VHJhY2tMaXN0OiBmYWxzZSxcbiAgVG91Y2hMaXN0OiBmYWxzZVxufTtcblxuZm9yICh2YXIgY29sbGVjdGlvbnMgPSBnZXRLZXlzKERPTUl0ZXJhYmxlcyksIGkgPSAwOyBpIDwgY29sbGVjdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgdmFyIE5BTUUgPSBjb2xsZWN0aW9uc1tpXTtcbiAgdmFyIGV4cGxpY2l0ID0gRE9NSXRlcmFibGVzW05BTUVdO1xuICB2YXIgQ29sbGVjdGlvbiA9IGdsb2JhbFtOQU1FXTtcbiAgdmFyIHByb3RvID0gQ29sbGVjdGlvbiAmJiBDb2xsZWN0aW9uLnByb3RvdHlwZTtcbiAgdmFyIGtleTtcbiAgaWYgKHByb3RvKSB7XG4gICAgaWYgKCFwcm90b1tJVEVSQVRPUl0pIGhpZGUocHJvdG8sIElURVJBVE9SLCBBcnJheVZhbHVlcyk7XG4gICAgaWYgKCFwcm90b1tUT19TVFJJTkdfVEFHXSkgaGlkZShwcm90bywgVE9fU1RSSU5HX1RBRywgTkFNRSk7XG4gICAgSXRlcmF0b3JzW05BTUVdID0gQXJyYXlWYWx1ZXM7XG4gICAgaWYgKGV4cGxpY2l0KSBmb3IgKGtleSBpbiAkaXRlcmF0b3JzKSBpZiAoIXByb3RvW2tleV0pIHJlZGVmaW5lKHByb3RvLCBrZXksICRpdGVyYXRvcnNba2V5XSwgdHJ1ZSk7XG4gIH1cbn1cbiIsImNvbnN0IGluc3RhbmNlT2ZBbnkgPSAob2JqZWN0LCBjb25zdHJ1Y3RvcnMpID0+IGNvbnN0cnVjdG9ycy5zb21lKGMgPT4gb2JqZWN0IGluc3RhbmNlb2YgYyk7XG5cbmxldCBpZGJQcm94eWFibGVUeXBlcztcclxubGV0IGN1cnNvckFkdmFuY2VNZXRob2RzO1xyXG4vLyBUaGlzIGlzIGEgZnVuY3Rpb24gdG8gcHJldmVudCBpdCB0aHJvd2luZyB1cCBpbiBub2RlIGVudmlyb25tZW50cy5cclxuZnVuY3Rpb24gZ2V0SWRiUHJveHlhYmxlVHlwZXMoKSB7XHJcbiAgICByZXR1cm4gKGlkYlByb3h5YWJsZVR5cGVzIHx8XHJcbiAgICAgICAgKGlkYlByb3h5YWJsZVR5cGVzID0gW1xyXG4gICAgICAgICAgICBJREJEYXRhYmFzZSxcclxuICAgICAgICAgICAgSURCT2JqZWN0U3RvcmUsXHJcbiAgICAgICAgICAgIElEQkluZGV4LFxyXG4gICAgICAgICAgICBJREJDdXJzb3IsXHJcbiAgICAgICAgICAgIElEQlRyYW5zYWN0aW9uLFxyXG4gICAgICAgIF0pKTtcclxufVxyXG4vLyBUaGlzIGlzIGEgZnVuY3Rpb24gdG8gcHJldmVudCBpdCB0aHJvd2luZyB1cCBpbiBub2RlIGVudmlyb25tZW50cy5cclxuZnVuY3Rpb24gZ2V0Q3Vyc29yQWR2YW5jZU1ldGhvZHMoKSB7XHJcbiAgICByZXR1cm4gKGN1cnNvckFkdmFuY2VNZXRob2RzIHx8XHJcbiAgICAgICAgKGN1cnNvckFkdmFuY2VNZXRob2RzID0gW1xyXG4gICAgICAgICAgICBJREJDdXJzb3IucHJvdG90eXBlLmFkdmFuY2UsXHJcbiAgICAgICAgICAgIElEQkN1cnNvci5wcm90b3R5cGUuY29udGludWUsXHJcbiAgICAgICAgICAgIElEQkN1cnNvci5wcm90b3R5cGUuY29udGludWVQcmltYXJ5S2V5LFxyXG4gICAgICAgIF0pKTtcclxufVxyXG5jb25zdCBjdXJzb3JSZXF1ZXN0TWFwID0gbmV3IFdlYWtNYXAoKTtcclxuY29uc3QgdHJhbnNhY3Rpb25Eb25lTWFwID0gbmV3IFdlYWtNYXAoKTtcclxuY29uc3QgdHJhbnNhY3Rpb25TdG9yZU5hbWVzTWFwID0gbmV3IFdlYWtNYXAoKTtcclxuY29uc3QgdHJhbnNmb3JtQ2FjaGUgPSBuZXcgV2Vha01hcCgpO1xyXG5jb25zdCByZXZlcnNlVHJhbnNmb3JtQ2FjaGUgPSBuZXcgV2Vha01hcCgpO1xyXG5mdW5jdGlvbiBwcm9taXNpZnlSZXF1ZXN0KHJlcXVlc3QpIHtcclxuICAgIGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgY29uc3QgdW5saXN0ZW4gPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHJlcXVlc3QucmVtb3ZlRXZlbnRMaXN0ZW5lcignc3VjY2VzcycsIHN1Y2Nlc3MpO1xyXG4gICAgICAgICAgICByZXF1ZXN0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZXJyb3IpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgY29uc3Qgc3VjY2VzcyA9ICgpID0+IHtcclxuICAgICAgICAgICAgcmVzb2x2ZSh3cmFwKHJlcXVlc3QucmVzdWx0KSk7XHJcbiAgICAgICAgICAgIHVubGlzdGVuKCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zdCBlcnJvciA9ICgpID0+IHtcclxuICAgICAgICAgICAgcmVqZWN0KHJlcXVlc3QuZXJyb3IpO1xyXG4gICAgICAgICAgICB1bmxpc3RlbigpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdzdWNjZXNzJywgc3VjY2Vzcyk7XHJcbiAgICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIGVycm9yKTtcclxuICAgIH0pO1xyXG4gICAgcHJvbWlzZVxyXG4gICAgICAgIC50aGVuKHZhbHVlID0+IHtcclxuICAgICAgICAvLyBTaW5jZSBjdXJzb3JpbmcgcmV1c2VzIHRoZSBJREJSZXF1ZXN0ICgqc2lnaCopLCB3ZSBjYWNoZSBpdCBmb3IgbGF0ZXIgcmV0cmlldmFsXHJcbiAgICAgICAgLy8gKHNlZSB3cmFwRnVuY3Rpb24pLlxyXG4gICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIElEQkN1cnNvcikge1xyXG4gICAgICAgICAgICBjdXJzb3JSZXF1ZXN0TWFwLnNldCh2YWx1ZSwgcmVxdWVzdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIENhdGNoaW5nIHRvIGF2b2lkIFwiVW5jYXVnaHQgUHJvbWlzZSBleGNlcHRpb25zXCJcclxuICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKCgpID0+IHsgfSk7XHJcbiAgICAvLyBUaGlzIG1hcHBpbmcgZXhpc3RzIGluIHJldmVyc2VUcmFuc2Zvcm1DYWNoZSBidXQgZG9lc24ndCBkb2Vzbid0IGV4aXN0IGluIHRyYW5zZm9ybUNhY2hlLiBUaGlzXHJcbiAgICAvLyBpcyBiZWNhdXNlIHdlIGNyZWF0ZSBtYW55IHByb21pc2VzIGZyb20gYSBzaW5nbGUgSURCUmVxdWVzdC5cclxuICAgIHJldmVyc2VUcmFuc2Zvcm1DYWNoZS5zZXQocHJvbWlzZSwgcmVxdWVzdCk7XHJcbiAgICByZXR1cm4gcHJvbWlzZTtcclxufVxyXG5mdW5jdGlvbiBjYWNoZURvbmVQcm9taXNlRm9yVHJhbnNhY3Rpb24odHgpIHtcclxuICAgIC8vIEVhcmx5IGJhaWwgaWYgd2UndmUgYWxyZWFkeSBjcmVhdGVkIGEgZG9uZSBwcm9taXNlIGZvciB0aGlzIHRyYW5zYWN0aW9uLlxyXG4gICAgaWYgKHRyYW5zYWN0aW9uRG9uZU1hcC5oYXModHgpKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIGNvbnN0IGRvbmUgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgY29uc3QgdW5saXN0ZW4gPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHR4LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NvbXBsZXRlJywgY29tcGxldGUpO1xyXG4gICAgICAgICAgICB0eC5yZW1vdmVFdmVudExpc3RlbmVyKCdlcnJvcicsIGVycm9yKTtcclxuICAgICAgICAgICAgdHgucmVtb3ZlRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBlcnJvcik7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zdCBjb21wbGV0ZSA9ICgpID0+IHtcclxuICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICB1bmxpc3RlbigpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgY29uc3QgZXJyb3IgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHJlamVjdCh0eC5lcnJvcik7XHJcbiAgICAgICAgICAgIHVubGlzdGVuKCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0eC5hZGRFdmVudExpc3RlbmVyKCdjb21wbGV0ZScsIGNvbXBsZXRlKTtcclxuICAgICAgICB0eC5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIGVycm9yKTtcclxuICAgICAgICB0eC5hZGRFdmVudExpc3RlbmVyKCdhYm9ydCcsIGVycm9yKTtcclxuICAgIH0pO1xyXG4gICAgLy8gQ2FjaGUgaXQgZm9yIGxhdGVyIHJldHJpZXZhbC5cclxuICAgIHRyYW5zYWN0aW9uRG9uZU1hcC5zZXQodHgsIGRvbmUpO1xyXG59XHJcbmxldCBpZGJQcm94eVRyYXBzID0ge1xyXG4gICAgZ2V0KHRhcmdldCwgcHJvcCwgcmVjZWl2ZXIpIHtcclxuICAgICAgICBpZiAodGFyZ2V0IGluc3RhbmNlb2YgSURCVHJhbnNhY3Rpb24pIHtcclxuICAgICAgICAgICAgLy8gU3BlY2lhbCBoYW5kbGluZyBmb3IgdHJhbnNhY3Rpb24uZG9uZS5cclxuICAgICAgICAgICAgaWYgKHByb3AgPT09ICdkb25lJylcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cmFuc2FjdGlvbkRvbmVNYXAuZ2V0KHRhcmdldCk7XHJcbiAgICAgICAgICAgIC8vIFBvbHlmaWxsIGZvciBvYmplY3RTdG9yZU5hbWVzIGJlY2F1c2Ugb2YgRWRnZS5cclxuICAgICAgICAgICAgaWYgKHByb3AgPT09ICdvYmplY3RTdG9yZU5hbWVzJykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRhcmdldC5vYmplY3RTdG9yZU5hbWVzIHx8IHRyYW5zYWN0aW9uU3RvcmVOYW1lc01hcC5nZXQodGFyZ2V0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBNYWtlIHR4LnN0b3JlIHJldHVybiB0aGUgb25seSBzdG9yZSBpbiB0aGUgdHJhbnNhY3Rpb24sIG9yIHVuZGVmaW5lZCBpZiB0aGVyZSBhcmUgbWFueS5cclxuICAgICAgICAgICAgaWYgKHByb3AgPT09ICdzdG9yZScpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZWNlaXZlci5vYmplY3RTdG9yZU5hbWVzWzFdXHJcbiAgICAgICAgICAgICAgICAgICAgPyB1bmRlZmluZWRcclxuICAgICAgICAgICAgICAgICAgICA6IHJlY2VpdmVyLm9iamVjdFN0b3JlKHJlY2VpdmVyLm9iamVjdFN0b3JlTmFtZXNbMF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIEVsc2UgdHJhbnNmb3JtIHdoYXRldmVyIHdlIGdldCBiYWNrLlxyXG4gICAgICAgIHJldHVybiB3cmFwKHRhcmdldFtwcm9wXSk7XHJcbiAgICB9LFxyXG4gICAgaGFzKHRhcmdldCwgcHJvcCkge1xyXG4gICAgICAgIGlmICh0YXJnZXQgaW5zdGFuY2VvZiBJREJUcmFuc2FjdGlvbiAmJlxyXG4gICAgICAgICAgICAocHJvcCA9PT0gJ2RvbmUnIHx8IHByb3AgPT09ICdzdG9yZScpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcHJvcCBpbiB0YXJnZXQ7XHJcbiAgICB9LFxyXG59O1xyXG5mdW5jdGlvbiBhZGRUcmFwcyhjYWxsYmFjaykge1xyXG4gICAgaWRiUHJveHlUcmFwcyA9IGNhbGxiYWNrKGlkYlByb3h5VHJhcHMpO1xyXG59XHJcbmZ1bmN0aW9uIHdyYXBGdW5jdGlvbihmdW5jKSB7XHJcbiAgICAvLyBEdWUgdG8gZXhwZWN0ZWQgb2JqZWN0IGVxdWFsaXR5ICh3aGljaCBpcyBlbmZvcmNlZCBieSB0aGUgY2FjaGluZyBpbiBgd3JhcGApLCB3ZVxyXG4gICAgLy8gb25seSBjcmVhdGUgb25lIG5ldyBmdW5jIHBlciBmdW5jLlxyXG4gICAgLy8gRWRnZSBkb2Vzbid0IHN1cHBvcnQgb2JqZWN0U3RvcmVOYW1lcyAoYm9vbyksIHNvIHdlIHBvbHlmaWxsIGl0IGhlcmUuXHJcbiAgICBpZiAoZnVuYyA9PT0gSURCRGF0YWJhc2UucHJvdG90eXBlLnRyYW5zYWN0aW9uICYmXHJcbiAgICAgICAgISgnb2JqZWN0U3RvcmVOYW1lcycgaW4gSURCVHJhbnNhY3Rpb24ucHJvdG90eXBlKSkge1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoc3RvcmVOYW1lcywgLi4uYXJncykge1xyXG4gICAgICAgICAgICBjb25zdCB0eCA9IGZ1bmMuY2FsbCh1bndyYXAodGhpcyksIHN0b3JlTmFtZXMsIC4uLmFyZ3MpO1xyXG4gICAgICAgICAgICB0cmFuc2FjdGlvblN0b3JlTmFtZXNNYXAuc2V0KHR4LCBzdG9yZU5hbWVzLnNvcnQgPyBzdG9yZU5hbWVzLnNvcnQoKSA6IFtzdG9yZU5hbWVzXSk7XHJcbiAgICAgICAgICAgIHJldHVybiB3cmFwKHR4KTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgLy8gQ3Vyc29yIG1ldGhvZHMgYXJlIHNwZWNpYWwsIGFzIHRoZSBiZWhhdmlvdXIgaXMgYSBsaXR0bGUgbW9yZSBkaWZmZXJlbnQgdG8gc3RhbmRhcmQgSURCLiBJblxyXG4gICAgLy8gSURCLCB5b3UgYWR2YW5jZSB0aGUgY3Vyc29yIGFuZCB3YWl0IGZvciBhIG5ldyAnc3VjY2Vzcycgb24gdGhlIElEQlJlcXVlc3QgdGhhdCBnYXZlIHlvdSB0aGVcclxuICAgIC8vIGN1cnNvci4gSXQncyBraW5kYSBsaWtlIGEgcHJvbWlzZSB0aGF0IGNhbiByZXNvbHZlIHdpdGggbWFueSB2YWx1ZXMuIFRoYXQgZG9lc24ndCBtYWtlIHNlbnNlXHJcbiAgICAvLyB3aXRoIHJlYWwgcHJvbWlzZXMsIHNvIGVhY2ggYWR2YW5jZSBtZXRob2RzIHJldHVybnMgYSBuZXcgcHJvbWlzZSBmb3IgdGhlIGN1cnNvciBvYmplY3QsIG9yXHJcbiAgICAvLyB1bmRlZmluZWQgaWYgdGhlIGVuZCBvZiB0aGUgY3Vyc29yIGhhcyBiZWVuIHJlYWNoZWQuXHJcbiAgICBpZiAoZ2V0Q3Vyc29yQWR2YW5jZU1ldGhvZHMoKS5pbmNsdWRlcyhmdW5jKSkge1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xyXG4gICAgICAgICAgICAvLyBDYWxsaW5nIHRoZSBvcmlnaW5hbCBmdW5jdGlvbiB3aXRoIHRoZSBwcm94eSBhcyAndGhpcycgY2F1c2VzIElMTEVHQUwgSU5WT0NBVElPTiwgc28gd2UgdXNlXHJcbiAgICAgICAgICAgIC8vIHRoZSBvcmlnaW5hbCBvYmplY3QuXHJcbiAgICAgICAgICAgIGZ1bmMuYXBwbHkodW53cmFwKHRoaXMpLCBhcmdzKTtcclxuICAgICAgICAgICAgcmV0dXJuIHdyYXAoY3Vyc29yUmVxdWVzdE1hcC5nZXQodGhpcykpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcclxuICAgICAgICAvLyBDYWxsaW5nIHRoZSBvcmlnaW5hbCBmdW5jdGlvbiB3aXRoIHRoZSBwcm94eSBhcyAndGhpcycgY2F1c2VzIElMTEVHQUwgSU5WT0NBVElPTiwgc28gd2UgdXNlXHJcbiAgICAgICAgLy8gdGhlIG9yaWdpbmFsIG9iamVjdC5cclxuICAgICAgICByZXR1cm4gd3JhcChmdW5jLmFwcGx5KHVud3JhcCh0aGlzKSwgYXJncykpO1xyXG4gICAgfTtcclxufVxyXG5mdW5jdGlvbiB0cmFuc2Zvcm1DYWNoYWJsZVZhbHVlKHZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKVxyXG4gICAgICAgIHJldHVybiB3cmFwRnVuY3Rpb24odmFsdWUpO1xyXG4gICAgLy8gVGhpcyBkb2Vzbid0IHJldHVybiwgaXQganVzdCBjcmVhdGVzIGEgJ2RvbmUnIHByb21pc2UgZm9yIHRoZSB0cmFuc2FjdGlvbixcclxuICAgIC8vIHdoaWNoIGlzIGxhdGVyIHJldHVybmVkIGZvciB0cmFuc2FjdGlvbi5kb25lIChzZWUgaWRiT2JqZWN0SGFuZGxlcikuXHJcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBJREJUcmFuc2FjdGlvbilcclxuICAgICAgICBjYWNoZURvbmVQcm9taXNlRm9yVHJhbnNhY3Rpb24odmFsdWUpO1xyXG4gICAgaWYgKGluc3RhbmNlT2ZBbnkodmFsdWUsIGdldElkYlByb3h5YWJsZVR5cGVzKCkpKVxyXG4gICAgICAgIHJldHVybiBuZXcgUHJveHkodmFsdWUsIGlkYlByb3h5VHJhcHMpO1xyXG4gICAgLy8gUmV0dXJuIHRoZSBzYW1lIHZhbHVlIGJhY2sgaWYgd2UncmUgbm90IGdvaW5nIHRvIHRyYW5zZm9ybSBpdC5cclxuICAgIHJldHVybiB2YWx1ZTtcclxufVxyXG5mdW5jdGlvbiB3cmFwKHZhbHVlKSB7XHJcbiAgICAvLyBXZSBzb21ldGltZXMgZ2VuZXJhdGUgbXVsdGlwbGUgcHJvbWlzZXMgZnJvbSBhIHNpbmdsZSBJREJSZXF1ZXN0IChlZyB3aGVuIGN1cnNvcmluZyksIGJlY2F1c2VcclxuICAgIC8vIElEQiBpcyB3ZWlyZCBhbmQgYSBzaW5nbGUgSURCUmVxdWVzdCBjYW4geWllbGQgbWFueSByZXNwb25zZXMsIHNvIHRoZXNlIGNhbid0IGJlIGNhY2hlZC5cclxuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIElEQlJlcXVlc3QpXHJcbiAgICAgICAgcmV0dXJuIHByb21pc2lmeVJlcXVlc3QodmFsdWUpO1xyXG4gICAgLy8gSWYgd2UndmUgYWxyZWFkeSB0cmFuc2Zvcm1lZCB0aGlzIHZhbHVlIGJlZm9yZSwgcmV1c2UgdGhlIHRyYW5zZm9ybWVkIHZhbHVlLlxyXG4gICAgLy8gVGhpcyBpcyBmYXN0ZXIsIGJ1dCBpdCBhbHNvIHByb3ZpZGVzIG9iamVjdCBlcXVhbGl0eS5cclxuICAgIGlmICh0cmFuc2Zvcm1DYWNoZS5oYXModmFsdWUpKVxyXG4gICAgICAgIHJldHVybiB0cmFuc2Zvcm1DYWNoZS5nZXQodmFsdWUpO1xyXG4gICAgY29uc3QgbmV3VmFsdWUgPSB0cmFuc2Zvcm1DYWNoYWJsZVZhbHVlKHZhbHVlKTtcclxuICAgIC8vIE5vdCBhbGwgdHlwZXMgYXJlIHRyYW5zZm9ybWVkLlxyXG4gICAgLy8gVGhlc2UgbWF5IGJlIHByaW1pdGl2ZSB0eXBlcywgc28gdGhleSBjYW4ndCBiZSBXZWFrTWFwIGtleXMuXHJcbiAgICBpZiAobmV3VmFsdWUgIT09IHZhbHVlKSB7XHJcbiAgICAgICAgdHJhbnNmb3JtQ2FjaGUuc2V0KHZhbHVlLCBuZXdWYWx1ZSk7XHJcbiAgICAgICAgcmV2ZXJzZVRyYW5zZm9ybUNhY2hlLnNldChuZXdWYWx1ZSwgdmFsdWUpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5ld1ZhbHVlO1xyXG59XHJcbmNvbnN0IHVud3JhcCA9ICh2YWx1ZSkgPT4gcmV2ZXJzZVRyYW5zZm9ybUNhY2hlLmdldCh2YWx1ZSk7XG5cbmV4cG9ydCB7IHdyYXAgYXMgYSwgYWRkVHJhcHMgYXMgYiwgaW5zdGFuY2VPZkFueSBhcyBjLCByZXZlcnNlVHJhbnNmb3JtQ2FjaGUgYXMgZCwgdW53cmFwIGFzIGUgfTtcbiIsImltcG9ydCB7IGEgYXMgd3JhcCwgYiBhcyBhZGRUcmFwcyB9IGZyb20gJy4vY2h1bmsuanMnO1xuZXhwb3J0IHsgZSBhcyB1bndyYXAsIGEgYXMgd3JhcCB9IGZyb20gJy4vY2h1bmsuanMnO1xuXG4vKipcclxuICogT3BlbiBhIGRhdGFiYXNlLlxyXG4gKlxyXG4gKiBAcGFyYW0gbmFtZSBOYW1lIG9mIHRoZSBkYXRhYmFzZS5cclxuICogQHBhcmFtIHZlcnNpb24gU2NoZW1hIHZlcnNpb24uXHJcbiAqIEBwYXJhbSBjYWxsYmFja3MgQWRkaXRpb25hbCBjYWxsYmFja3MuXHJcbiAqL1xyXG5mdW5jdGlvbiBvcGVuREIobmFtZSwgdmVyc2lvbiwgeyBibG9ja2VkLCB1cGdyYWRlLCBibG9ja2luZyB9ID0ge30pIHtcclxuICAgIGNvbnN0IHJlcXVlc3QgPSBpbmRleGVkREIub3BlbihuYW1lLCB2ZXJzaW9uKTtcclxuICAgIGNvbnN0IG9wZW5Qcm9taXNlID0gd3JhcChyZXF1ZXN0KTtcclxuICAgIGlmICh1cGdyYWRlKSB7XHJcbiAgICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCd1cGdyYWRlbmVlZGVkJywgZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICB1cGdyYWRlKHdyYXAocmVxdWVzdC5yZXN1bHQpLCBldmVudC5vbGRWZXJzaW9uLCBldmVudC5uZXdWZXJzaW9uLCB3cmFwKHJlcXVlc3QudHJhbnNhY3Rpb24pKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGlmIChibG9ja2VkKVxyXG4gICAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignYmxvY2tlZCcsICgpID0+IGJsb2NrZWQoKSk7XHJcbiAgICBpZiAoYmxvY2tpbmcpIHtcclxuICAgICAgICBvcGVuUHJvbWlzZS50aGVuKGRiID0+IGRiLmFkZEV2ZW50TGlzdGVuZXIoJ3ZlcnNpb25jaGFuZ2UnLCBibG9ja2luZykpLmNhdGNoKCgpID0+IHsgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gb3BlblByb21pc2U7XHJcbn1cclxuLyoqXHJcbiAqIERlbGV0ZSBhIGRhdGFiYXNlLlxyXG4gKlxyXG4gKiBAcGFyYW0gbmFtZSBOYW1lIG9mIHRoZSBkYXRhYmFzZS5cclxuICovXHJcbmZ1bmN0aW9uIGRlbGV0ZURCKG5hbWUsIHsgYmxvY2tlZCB9ID0ge30pIHtcclxuICAgIGNvbnN0IHJlcXVlc3QgPSBpbmRleGVkREIuZGVsZXRlRGF0YWJhc2UobmFtZSk7XHJcbiAgICBpZiAoYmxvY2tlZClcclxuICAgICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2Jsb2NrZWQnLCAoKSA9PiBibG9ja2VkKCkpO1xyXG4gICAgcmV0dXJuIHdyYXAocmVxdWVzdCkudGhlbigoKSA9PiB1bmRlZmluZWQpO1xyXG59XG5cbmNvbnN0IHJlYWRNZXRob2RzID0gWydnZXQnLCAnZ2V0S2V5JywgJ2dldEFsbCcsICdnZXRBbGxLZXlzJywgJ2NvdW50J107XHJcbmNvbnN0IHdyaXRlTWV0aG9kcyA9IFsncHV0JywgJ2FkZCcsICdkZWxldGUnLCAnY2xlYXInXTtcclxuY29uc3QgY2FjaGVkTWV0aG9kcyA9IG5ldyBNYXAoKTtcclxuZnVuY3Rpb24gZ2V0TWV0aG9kKHRhcmdldCwgcHJvcCkge1xyXG4gICAgaWYgKCEodGFyZ2V0IGluc3RhbmNlb2YgSURCRGF0YWJhc2UgJiZcclxuICAgICAgICAhKHByb3AgaW4gdGFyZ2V0KSAmJlxyXG4gICAgICAgIHR5cGVvZiBwcm9wID09PSAnc3RyaW5nJykpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoY2FjaGVkTWV0aG9kcy5nZXQocHJvcCkpXHJcbiAgICAgICAgcmV0dXJuIGNhY2hlZE1ldGhvZHMuZ2V0KHByb3ApO1xyXG4gICAgY29uc3QgdGFyZ2V0RnVuY05hbWUgPSBwcm9wLnJlcGxhY2UoL0Zyb21JbmRleCQvLCAnJyk7XHJcbiAgICBjb25zdCB1c2VJbmRleCA9IHByb3AgIT09IHRhcmdldEZ1bmNOYW1lO1xyXG4gICAgY29uc3QgaXNXcml0ZSA9IHdyaXRlTWV0aG9kcy5pbmNsdWRlcyh0YXJnZXRGdW5jTmFtZSk7XHJcbiAgICBpZiAoXHJcbiAgICAvLyBCYWlsIGlmIHRoZSB0YXJnZXQgZG9lc24ndCBleGlzdCBvbiB0aGUgdGFyZ2V0LiBFZywgZ2V0QWxsIGlzbid0IGluIEVkZ2UuXHJcbiAgICAhKHRhcmdldEZ1bmNOYW1lIGluICh1c2VJbmRleCA/IElEQkluZGV4IDogSURCT2JqZWN0U3RvcmUpLnByb3RvdHlwZSkgfHxcclxuICAgICAgICAhKGlzV3JpdGUgfHwgcmVhZE1ldGhvZHMuaW5jbHVkZXModGFyZ2V0RnVuY05hbWUpKSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNvbnN0IG1ldGhvZCA9IGFzeW5jIGZ1bmN0aW9uIChzdG9yZU5hbWUsIC4uLmFyZ3MpIHtcclxuICAgICAgICAvLyBpc1dyaXRlID8gJ3JlYWR3cml0ZScgOiB1bmRlZmluZWQgZ3ppcHBzIGJldHRlciwgYnV0IGZhaWxzIGluIEVkZ2UgOihcclxuICAgICAgICBjb25zdCB0eCA9IHRoaXMudHJhbnNhY3Rpb24oc3RvcmVOYW1lLCBpc1dyaXRlID8gJ3JlYWR3cml0ZScgOiAncmVhZG9ubHknKTtcclxuICAgICAgICBsZXQgdGFyZ2V0ID0gdHguc3RvcmU7XHJcbiAgICAgICAgaWYgKHVzZUluZGV4KVxyXG4gICAgICAgICAgICB0YXJnZXQgPSB0YXJnZXQuaW5kZXgoYXJncy5zaGlmdCgpKTtcclxuICAgICAgICBjb25zdCByZXR1cm5WYWwgPSB0YXJnZXRbdGFyZ2V0RnVuY05hbWVdKC4uLmFyZ3MpO1xyXG4gICAgICAgIGlmIChpc1dyaXRlKVxyXG4gICAgICAgICAgICBhd2FpdCB0eC5kb25lO1xyXG4gICAgICAgIHJldHVybiByZXR1cm5WYWw7XHJcbiAgICB9O1xyXG4gICAgY2FjaGVkTWV0aG9kcy5zZXQocHJvcCwgbWV0aG9kKTtcclxuICAgIHJldHVybiBtZXRob2Q7XHJcbn1cclxuYWRkVHJhcHMob2xkVHJhcHMgPT4gKHtcclxuICAgIGdldDogKHRhcmdldCwgcHJvcCwgcmVjZWl2ZXIpID0+IGdldE1ldGhvZCh0YXJnZXQsIHByb3ApIHx8IG9sZFRyYXBzLmdldCh0YXJnZXQsIHByb3AsIHJlY2VpdmVyKSxcclxuICAgIGhhczogKHRhcmdldCwgcHJvcCkgPT4gISFnZXRNZXRob2QodGFyZ2V0LCBwcm9wKSB8fCBvbGRUcmFwcy5oYXModGFyZ2V0LCBwcm9wKSxcclxufSkpO1xuXG5leHBvcnQgeyBvcGVuREIsIGRlbGV0ZURCIH07XG4iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==