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
      newMap = L.map('map', {
        center: [restaurant.latlng.lat, restaurant.latlng.lng],
        zoom: 16,
        scrollWheelZoom: false
      });
      self.newMap = newMap;
      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.jpg70?access_token={mapboxToken}', {
        mapboxToken: 'pk.eyJ1Ijoid2VudGluIiwiYSI6ImNqaXJ0N25iZjFwdjYza3A4MGt1aHU2bjEifQ.DnNFUoN5uzw01l_XK_c7nQ',
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' + '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' + 'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox.streets'
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2pzL2RiaGVscGVyLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9qcy9yZWdpc3RyYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2pzL3Jlc3RhdXJhbnRfaW5mby5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3cuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fYS1mdW5jdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19hZGQtdG8tdW5zY29wYWJsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fYWR2YW5jZS1zdHJpbmctaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fYW4tb2JqZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2FycmF5LWluY2x1ZGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2NsYXNzb2YuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fY29mLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2NvcmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fY3R4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2RlZmluZWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fZGVzY3JpcHRvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fZG9tLWNyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19lbnVtLWJ1Zy1rZXlzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2V4cG9ydC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19mYWlscy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19maXgtcmUtd2tzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2ZsYWdzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2Z1bmN0aW9uLXRvLXN0cmluZy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faGFzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2hpZGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faHRtbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pZTgtZG9tLWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pbmhlcml0LWlmLXJlcXVpcmVkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2lvYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faXMtb2JqZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2lzLXJlZ2V4cC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pdGVyLWNyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pdGVyLWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pdGVyLXN0ZXAuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faXRlcmF0b3JzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2xpYnJhcnkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWNyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19vYmplY3QtZHAuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWRwcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19vYmplY3QtZ29wZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19vYmplY3QtZ29wbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19vYmplY3QtZ3BvLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1rZXlzLWludGVybmFsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1rZXlzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1waWUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fcHJvcGVydHktZGVzYy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19yZWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19yZWdleHAtZXhlYy1hYnN0cmFjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19yZWdleHAtZXhlYy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19zZXQtcHJvdG8uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fc2V0LXNwZWNpZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fc2V0LXRvLXN0cmluZy10YWcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fc2hhcmVkLWtleS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19zaGFyZWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fc3RyaW5nLWF0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3RvLWFic29sdXRlLWluZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3RvLWludGVnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fdG8taW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL190by1sZW5ndGguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fdG8tb2JqZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3RvLXByaW1pdGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL191aWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fd2tzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LmFycmF5Lml0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnJlZ2V4cC5jb25zdHJ1Y3Rvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5yZWdleHAuZXhlYy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5yZWdleHAubWF0Y2guanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYucmVnZXhwLnJlcGxhY2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pZGIvYnVpbGQvZXNtL2NodW5rLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pZGIvYnVpbGQvZXNtL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiXSwibmFtZXMiOlsiREJIZWxwZXIiLCJEQVRBQkFTRV9VUkwiLCJwb3J0IiwicHJvY2VzcyIsImVudiIsIkRBVEFCQVNFX1JFVklFV1NfVVJMIiwiZmV0Y2hSZXN0YXVyYW50cyIsImNhbGxiYWNrIiwiZmV0Y2giLCJ0aGVuIiwicmVzcG9uc2UiLCJqc29uIiwicmVzdGF1cmFudHMiLCJmZXRjaFJldmlld3MiLCJyZXN0YXVyYW50X2lkIiwiZmV0Y2hVUkwiLCJyZXZpZXdzIiwiY2F0Y2giLCJlcnJvciIsImZldGNoUmVzdGF1cmFudEJ5SWQiLCJpZCIsInJlc3RhdXJhbnQiLCJmaW5kIiwiciIsImZldGNoUmVzdGF1cmFudEJ5Q3Vpc2luZSIsImN1aXNpbmUiLCJyZXN1bHRzIiwiZmlsdGVyIiwiY3Vpc2luZV90eXBlIiwiZmV0Y2hSZXN0YXVyYW50QnlOZWlnaGJvcmhvb2QiLCJuZWlnaGJvcmhvb2QiLCJmZXRjaFJlc3RhdXJhbnRCeUN1aXNpbmVBbmROZWlnaGJvcmhvb2QiLCJmZXRjaE5laWdoYm9yaG9vZHMiLCJuZWlnaGJvcmhvb2RzIiwibWFwIiwidiIsImkiLCJ1bmlxdWVOZWlnaGJvcmhvb2RzIiwiaW5kZXhPZiIsImZldGNoQ3Vpc2luZXMiLCJjdWlzaW5lcyIsInVuaXF1ZUN1aXNpbmVzIiwidXJsRm9yUmVzdGF1cmFudCIsImltYWdlVXJsRm9yUmVzdGF1cmFudCIsInBob3RvZ3JhcGgiLCJtYXBNYXJrZXJGb3JSZXN0YXVyYW50IiwibWFya2VyIiwiTCIsImxhdGxuZyIsImxhdCIsImxuZyIsInRpdGxlIiwibmFtZSIsImFsdCIsInVybCIsImFkZFRvIiwibmV3TWFwIiwidXBkYXRlQ2FjaGVkUmVzdGF1cmFudFJldmlldyIsImZvcm1EYXRhIiwiY29uc29sZSIsImxvZyIsImRiUHJvbWlzZSIsImRiIiwidHgiLCJ0cmFuc2FjdGlvbiIsInN0b3JlIiwib2JqZWN0U3RvcmUiLCJwdXQiLCJkb25lIiwiZWRpdFJldmlldyIsImVkaXRpbmciLCJnZXQiLCJyZXZpZXciLCJuZXdSZXZpZXciLCJPYmplY3QiLCJhc3NpZ24iLCJjb21wbGV0ZSIsInN1Ym1pdFJldmlldyIsIm1ldGhvZCIsImFkZFBlbmRpbmdSZXF1ZXN0VG9RdWUiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImRhdGEiLCJuZXh0UGVuZGluZyIsImF0dGVtcHRDb21taXRQZW5kaW5nIiwiaiIsImJvZHkiLCJvYmplY3RTdG9yZU5hbWVzIiwibGVuZ3RoIiwiY2xvc2UiLCJvcGVuQ3Vyc29yIiwiY3Vyc29yIiwidmFsdWUiLCJkZWxldGUiLCJwcm9wZXJ0aWVzIiwiSlNPTiIsInN0cmluZ2lmeSIsIm9rIiwicmVkaXJlY3RlZCIsImRlbHR4Iiwic3luY1Jlc3RhdXJhbnQiLCJpc19mYXZvcml0ZSIsInVwZGF0ZVJlc3RhdXJhbnRJbkRCIiwibmV3X3Jlc3RhdXJhbnQiLCJ0b2dnbGVGYXZCdG4iLCJmYXZCdG4iLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiaW5uZXJIVE1MIiwic3R5bGUiLCJiYWNrZ3JvdW5kIiwiZGVsZXRlQ2FjaGVkUmV2aWV3IiwicmV2aWV3X2lkIiwiZGVsZXRlUmV2aWV3IiwiZGVsZXRlVGVtcFJldmlldyIsInRlbXBfaWQiLCJuYXZpZ2F0b3IiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwic2VydmljZVdvcmtlciIsInJlZ2lzdGVyIiwicmVnaXN0cmF0aW9uIiwicmVnaXN0cmF0aW9uRXJyb3IiLCJzdWJtaXRCdG4iLCJldmVudCIsImluaXRNYXAiLCJmZXRjaFJlc3RhdXJhbnRGcm9tVVJMIiwiY2VudGVyIiwiem9vbSIsInNjcm9sbFdoZWVsWm9vbSIsInNlbGYiLCJ0aWxlTGF5ZXIiLCJtYXBib3hUb2tlbiIsIm1heFpvb20iLCJhdHRyaWJ1dGlvbiIsImZpbGxCcmVhZGNydW1iIiwiZ2V0UGFyYW1ldGVyQnlOYW1lIiwiZmlsbFJlc3RhdXJhbnRIVE1MIiwiYWRkcmVzcyIsImltYWdlIiwiY2xhc3NOYW1lIiwic3JjIiwib3BlcmF0aW5nX2hvdXJzIiwiZmlsbFJlc3RhdXJhbnRIb3Vyc0hUTUwiLCJmaWxsUmV2aWV3c0hUTUwiLCJvcGVyYXRpbmdIb3VycyIsImhvdXJzIiwia2V5Iiwicm93IiwiY3JlYXRlRWxlbWVudCIsImRheSIsImFwcGVuZENoaWxkIiwidGltZSIsImNvbnRhaW5lciIsIm5vUmV2aWV3cyIsInVsIiwiZm9yRWFjaCIsImNyZWF0ZVJldmlld0hUTUwiLCJsaSIsInNldEF0dHJpYnV0ZSIsImRhdGUiLCJEYXRlIiwiY3JlYXRlZEF0IiwidG9EYXRlU3RyaW5nIiwidXBkYXRlZEF0IiwidXBkYXRlRGF0ZSIsInJhdGluZyIsImNvbW1lbnRzIiwiZWRpdEJ0biIsImVkaXRJY29uIiwiY2xhc3NMaXN0IiwiYWRkIiwic2V0RWRpdGluZyIsImFwcGVuZCIsImRlbGV0ZUJ0biIsImRlbGV0ZUljb24iLCJicmVhZGNydW1iIiwieCIsIlVSTCIsImxvY2F0aW9uIiwiaHJlZiIsInJlcGxhY2UiLCJyZWdleCIsIlJlZ0V4cCIsImV4ZWMiLCJkZWNvZGVVUklDb21wb25lbnQiLCJnZXRGb3JtVmFsdWVzIiwidGVzdCIsImFsZXJ0Iiwibm93IiwiTnVtYmVyIiwicmVzdWx0IiwiYWxlcnRNc2ciLCJuZXdSZXZpZXdFbGVtIiwib2xkUmV2aWV3RWxlbSIsInBhcmVudEVsZW0iLCJwYXJlbnRFbGVtZW50IiwicmVwbGFjZUNoaWxkIiwiZWxlbWVudCIsInNjcm9sbEludG9WaWV3IiwicmVzZXRGb3JtVmFsdWVzIiwic2VjdGlvbiIsImluZGV4IiwiZ2V0QWxsIiwidHJpbSIsImNhbmNlbEVkaXRpbmciLCJkaXNwbGF5IiwiY2FuY2VsRWRpdGluZ0J0biIsImdvVG9Cb3R0b20iLCJhc2siLCJjb25maXJtIiwicmVtb3ZlIiwic2Nyb2xsVG8iLCJzY3JvbGxIZWlnaHQiLCJjYWNoZVZlcnNpb24iLCJTVEFUSUNfQ0FDSEUiLCJJTUFHRVNfQ0FDSEUiLCJhbGxDYWNoZXMiLCJvcGVuREIiLCJ1cGdyYWRlIiwib2xkVmVyc2lvbiIsImNyZWF0ZU9iamVjdFN0b3JlIiwia2V5UGF0aCIsImNyZWF0ZUluZGV4IiwicmV2aWV3c1N0b3JlIiwicGVuZGluZ1N0b3JlIiwiYXV0b0luY3JlbWVudCIsImdldFJlc3RhdXJhbnRzIiwicmVxdWVzdCIsInJlc3AiLCJpc0ltYWdlVVJMIiwiaW1nVHlwZXMiLCJpc0ltYWdlIiwidHlwZSIsImVuZHNXaXRoIiwid2FpdFVudGlsIiwiY2FjaGVzIiwib3BlbiIsImNhY2hlIiwiYWRkQWxsIiwia2V5cyIsImNhY2hlTmFtZXMiLCJhbGwiLCJjYWNoZU5hbWUiLCJzdGFydHNXaXRoIiwiY2hlY2tVcmwiLCJzZWFyY2hQYXJhbXMiLCJoYW5kbGVBSkFYRXZlbnQiLCJoYW5kbGVOb25BSkFYRXZlbnQiLCJyZXNwb25kV2l0aCIsImhhbmRsZVJlc3RhdXJhbnRFdmVudHMiLCJoYW5kbGVSZXZpZXdzRXZlbnRzIiwiZmluYWxSZXNwb25zZSIsIlJlc3BvbnNlIiwic3RhdHVzIiwiZmV0Y2hSZXNwb25zZSIsIm1hdGNoIiwidXNlQ2FjaGUiLCJjbG9uZSIsInN0YXR1c1RleHQiLCJ1cGRhdGUiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBRWUsTUFBTUEsUUFBTixDQUFlO0FBRTVCLGFBQVdDLFlBQVgsR0FBMEI7QUFDeEIsVUFBTUMsSUFBSSxHQUFHLElBQWIsQ0FEd0IsQ0FDTjs7QUFDbEIsV0FBT0MsT0FBTyxDQUFDQyxHQUFSLENBQVlILFlBQVosa0RBQVA7QUFDRDs7QUFFRCxhQUFXSSxvQkFBWCxHQUFrQztBQUNo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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbURBQVE7QUFDUjtBQUNBO0FBQ0EsQ0FBQzs7QUFFMkI7Ozs7Ozs7Ozs7OztBQzVFNUI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFDQUFxQzs7QUFFckM7QUFDQTtBQUNBOztBQUVBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsVUFBVSIsImZpbGUiOiJyZXN0YXVyYW50LmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vY2xpZW50L2pzL3Jlc3RhdXJhbnRfaW5mby5qc1wiKTtcbiIsImltcG9ydCB7IG9wZW5EQiwgZGVsZXRlREIsIHdyYXAsIHVud3JhcCB9IGZyb20gJ2lkYic7XG5pbXBvcnQge2RiUHJvbWlzZX0gZnJvbSAnLi4vc3cuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEQkhlbHBlciB7XG5cbiAgc3RhdGljIGdldCBEQVRBQkFTRV9VUkwoKSB7XG4gICAgY29uc3QgcG9ydCA9IDEzMzcgLy8gQ2hhbmdlIHRoaXMgdG8geW91ciBzZXJ2ZXIgcG9ydFxuICAgIHJldHVybiBwcm9jZXNzLmVudi5EQVRBQkFTRV9VUkwgfHwgYGh0dHBzOi8vbXdzYmFja2VuZC5oZXJva3VhcHAuY29tL3Jlc3RhdXJhbnRzYDtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgREFUQUJBU0VfUkVWSUVXU19VUkwoKSB7XG4gICAgY29uc3QgcG9ydCA9IDEzMzcgLy8gQ2hhbmdlIHRoaXMgdG8geW91ciBzZXJ2ZXIgcG9ydFxuICAgIHJldHVybiBgaHR0cHM6Ly9td3NiYWNrZW5kLmhlcm9rdWFwcC5jb20vcmV2aWV3c2A7XG4gIH1cblxuICAvKipcbiAgICogRmV0Y2ggYWxsIHJlc3RhdXJhbnRzLlxuICAgKi9cblxuICBzdGF0aWMgZmV0Y2hSZXN0YXVyYW50cyhjYWxsYmFjaykge1xuICAgIGZldGNoKERCSGVscGVyLkRBVEFCQVNFX1VSTCkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgcmVzcG9uc2UuanNvbigpLnRoZW4oZnVuY3Rpb24ocmVzdGF1cmFudHMpIHtcbiAgICAgICAgY2FsbGJhY2sobnVsbCwgcmVzdGF1cmFudHMpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgZmV0Y2hSZXZpZXdzKCByZXN0YXVyYW50X2lkLCBjYWxsYmFjaykge1xuICAgIGxldCBmZXRjaFVSTCA9IERCSGVscGVyLkRBVEFCQVNFX1JFVklFV1NfVVJMICsgXCIvP3Jlc3RhdXJhbnRfaWQ9XCIgKyByZXN0YXVyYW50X2lkO1xuICAgIGZldGNoKGZldGNoVVJMKS50aGVuKCByZXNwb25zZSA9PiB7XG4gICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgIH0pLnRoZW4ocmV2aWV3cyA9PiB7XG4gICAgICAgIGNhbGxiYWNrKG51bGwsIHJldmlld3MpO1xuICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBjYWxsYmFjayhlcnJvciwgbnVsbCk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyBmZXRjaFJlc3RhdXJhbnRCeUlkKGlkLCBjYWxsYmFjaykge1xuICAgIC8vIGZldGNoIGFsbCByZXN0YXVyYW50cyB3aXRoIHByb3BlciBlcnJvciBoYW5kbGluZy5cbiAgICBEQkhlbHBlci5mZXRjaFJlc3RhdXJhbnRzKChlcnJvciwgcmVzdGF1cmFudHMpID0+IHtcbiAgICAgIGlmIChlcnJvcikge1xuICAgICAgICBjYWxsYmFjayhlcnJvciwgbnVsbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCByZXN0YXVyYW50ID0gcmVzdGF1cmFudHMuZmluZChyID0+IHIuaWQgPT0gaWQpO1xuICAgICAgICBpZiAocmVzdGF1cmFudCkgeyAvLyBHb3QgdGhlIHJlc3RhdXJhbnRcbiAgICAgICAgICBjYWxsYmFjayhudWxsLCByZXN0YXVyYW50KTtcbiAgICAgICAgfSBlbHNlIHsgLy8gUmVzdGF1cmFudCBkb2VzIG5vdCBleGlzdCBpbiB0aGUgZGF0YWJhc2VcbiAgICAgICAgICBjYWxsYmFjaygnUmVzdGF1cmFudCBkb2VzIG5vdCBleGlzdCcsIG51bGwpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogRmV0Y2ggcmVzdGF1cmFudHMgYnkgYSBjdWlzaW5lIHR5cGUgd2l0aCBwcm9wZXIgZXJyb3IgaGFuZGxpbmcuXG4gICAqL1xuICBzdGF0aWMgZmV0Y2hSZXN0YXVyYW50QnlDdWlzaW5lKGN1aXNpbmUsIGNhbGxiYWNrKSB7XG4gICAgLy8gRmV0Y2ggYWxsIHJlc3RhdXJhbnRzICB3aXRoIHByb3BlciBlcnJvciBoYW5kbGluZ1xuICAgIERCSGVscGVyLmZldGNoUmVzdGF1cmFudHMoKGVycm9yLCByZXN0YXVyYW50cykgPT4ge1xuICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgIGNhbGxiYWNrKGVycm9yLCBudWxsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEZpbHRlciByZXN0YXVyYW50cyB0byBoYXZlIG9ubHkgZ2l2ZW4gY3Vpc2luZSB0eXBlXG4gICAgICAgIGNvbnN0IHJlc3VsdHMgPSByZXN0YXVyYW50cy5maWx0ZXIociA9PiByLmN1aXNpbmVfdHlwZSA9PSBjdWlzaW5lKTtcbiAgICAgICAgY2FsbGJhY2sobnVsbCwgcmVzdWx0cyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogRmV0Y2ggcmVzdGF1cmFudHMgYnkgYSBuZWlnaGJvcmhvb2Qgd2l0aCBwcm9wZXIgZXJyb3IgaGFuZGxpbmcuXG4gICAqL1xuICBzdGF0aWMgZmV0Y2hSZXN0YXVyYW50QnlOZWlnaGJvcmhvb2QobmVpZ2hib3Job29kLCBjYWxsYmFjaykge1xuICAgIC8vIEZldGNoIGFsbCByZXN0YXVyYW50c1xuICAgIERCSGVscGVyLmZldGNoUmVzdGF1cmFudHMoKGVycm9yLCByZXN0YXVyYW50cykgPT4ge1xuICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgIGNhbGxiYWNrKGVycm9yLCBudWxsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEZpbHRlciByZXN0YXVyYW50cyB0byBoYXZlIG9ubHkgZ2l2ZW4gbmVpZ2hib3Job29kXG4gICAgICAgIGNvbnN0IHJlc3VsdHMgPSByZXN0YXVyYW50cy5maWx0ZXIociA9PiByLm5laWdoYm9yaG9vZCA9PSBuZWlnaGJvcmhvb2QpO1xuICAgICAgICBjYWxsYmFjayhudWxsLCByZXN1bHRzKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGZXRjaCByZXN0YXVyYW50cyBieSBhIGN1aXNpbmUgYW5kIGEgbmVpZ2hib3Job29kIHdpdGggcHJvcGVyIGVycm9yIGhhbmRsaW5nLlxuICAgKi9cbiAgc3RhdGljIGZldGNoUmVzdGF1cmFudEJ5Q3Vpc2luZUFuZE5laWdoYm9yaG9vZChjdWlzaW5lLCBuZWlnaGJvcmhvb2QsIGNhbGxiYWNrKSB7XG4gICAgLy8gRmV0Y2ggYWxsIHJlc3RhdXJhbnRzXG4gICAgREJIZWxwZXIuZmV0Y2hSZXN0YXVyYW50cygoZXJyb3IsIHJlc3RhdXJhbnRzKSA9PiB7XG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgY2FsbGJhY2soZXJyb3IsIG51bGwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IHJlc3VsdHMgPSByZXN0YXVyYW50c1xuICAgICAgICBpZiAoY3Vpc2luZSAhPSAnYWxsJykgeyAvLyBmaWx0ZXIgYnkgY3Vpc2luZVxuICAgICAgICAgIHJlc3VsdHMgPSByZXN1bHRzLmZpbHRlcihyID0+IHIuY3Vpc2luZV90eXBlID09IGN1aXNpbmUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuZWlnaGJvcmhvb2QgIT0gJ2FsbCcpIHsgLy8gZmlsdGVyIGJ5IG5laWdoYm9yaG9vZFxuICAgICAgICAgIHJlc3VsdHMgPSByZXN1bHRzLmZpbHRlcihyID0+IHIubmVpZ2hib3Job29kID09IG5laWdoYm9yaG9vZCk7XG4gICAgICAgIH1cbiAgICAgICAgY2FsbGJhY2sobnVsbCwgcmVzdWx0cyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogRmV0Y2ggYWxsIG5laWdoYm9yaG9vZHMgd2l0aCBwcm9wZXIgZXJyb3IgaGFuZGxpbmcuXG4gICAqL1xuICBzdGF0aWMgZmV0Y2hOZWlnaGJvcmhvb2RzKGNhbGxiYWNrKSB7XG4gICAgLy8gRmV0Y2ggYWxsIHJlc3RhdXJhbnRzXG4gICAgREJIZWxwZXIuZmV0Y2hSZXN0YXVyYW50cygoZXJyb3IsIHJlc3RhdXJhbnRzKSA9PiB7XG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgY2FsbGJhY2soZXJyb3IsIG51bGwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gR2V0IGFsbCBuZWlnaGJvcmhvb2RzIGZyb20gYWxsIHJlc3RhdXJhbnRzXG4gICAgICAgIGNvbnN0IG5laWdoYm9yaG9vZHMgPSByZXN0YXVyYW50cy5tYXAoKHYsIGkpID0+IHJlc3RhdXJhbnRzW2ldLm5laWdoYm9yaG9vZClcbiAgICAgICAgLy8gUmVtb3ZlIGR1cGxpY2F0ZXMgZnJvbSBuZWlnaGJvcmhvb2RzXG4gICAgICAgIGNvbnN0IHVuaXF1ZU5laWdoYm9yaG9vZHMgPSBuZWlnaGJvcmhvb2RzLmZpbHRlcigodiwgaSkgPT4gbmVpZ2hib3Job29kcy5pbmRleE9mKHYpID09IGkpXG4gICAgICAgIGNhbGxiYWNrKG51bGwsIHVuaXF1ZU5laWdoYm9yaG9vZHMpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEZldGNoIGFsbCBjdWlzaW5lcyB3aXRoIHByb3BlciBlcnJvciBoYW5kbGluZy5cbiAgICovXG4gIHN0YXRpYyBmZXRjaEN1aXNpbmVzKGNhbGxiYWNrKSB7XG4gICAgLy8gRmV0Y2ggYWxsIHJlc3RhdXJhbnRzXG4gICAgREJIZWxwZXIuZmV0Y2hSZXN0YXVyYW50cygoZXJyb3IsIHJlc3RhdXJhbnRzKSA9PiB7XG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgY2FsbGJhY2soZXJyb3IsIG51bGwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gR2V0IGFsbCBjdWlzaW5lcyBmcm9tIGFsbCByZXN0YXVyYW50c1xuICAgICAgICBjb25zdCBjdWlzaW5lcyA9IHJlc3RhdXJhbnRzLm1hcCgodiwgaSkgPT4gcmVzdGF1cmFudHNbaV0uY3Vpc2luZV90eXBlKVxuICAgICAgICAvLyBSZW1vdmUgZHVwbGljYXRlcyBmcm9tIGN1aXNpbmVzXG4gICAgICAgIGNvbnN0IHVuaXF1ZUN1aXNpbmVzID0gY3Vpc2luZXMuZmlsdGVyKCh2LCBpKSA9PiBjdWlzaW5lcy5pbmRleE9mKHYpID09IGkpXG4gICAgICAgIGNhbGxiYWNrKG51bGwsIHVuaXF1ZUN1aXNpbmVzKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXN0YXVyYW50IHBhZ2UgVVJMLlxuICAgKi9cbiAgc3RhdGljIHVybEZvclJlc3RhdXJhbnQocmVzdGF1cmFudCkge1xuICAgIHJldHVybiAoYC9yZXN0YXVyYW50Lmh0bWw/aWQ9JHtyZXN0YXVyYW50LmlkfWApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc3RhdXJhbnQgaW1hZ2UgVVJMLlxuICAgKi9cbiAgc3RhdGljIGltYWdlVXJsRm9yUmVzdGF1cmFudChyZXN0YXVyYW50KSB7XG4gICAgaWYoIXJlc3RhdXJhbnQucGhvdG9ncmFwaCkge1xuICAgICAgcmV0dXJuIChgL2ltZy8ke3Jlc3RhdXJhbnQuaWR9LmpwZ2ApXG4gICAgfVxuICAgIHJldHVybiAoYC9pbWcvJHtyZXN0YXVyYW50LnBob3RvZ3JhcGh9LmpwZ2ApO1xuICB9XG5cbiAgLyoqXG4gICAqIE1hcCBtYXJrZXIgZm9yIGEgcmVzdGF1cmFudC5cbiAgICovXG4gIHN0YXRpYyBtYXBNYXJrZXJGb3JSZXN0YXVyYW50KHJlc3RhdXJhbnQsIG1hcCkge1xuICAgIC8vIGh0dHBzOi8vbGVhZmxldGpzLmNvbS9yZWZlcmVuY2UtMS4zLjAuaHRtbCNtYXJrZXJcbiAgICBjb25zdCBtYXJrZXIgPSBuZXcgTC5tYXJrZXIoW3Jlc3RhdXJhbnQubGF0bG5nLmxhdCwgcmVzdGF1cmFudC5sYXRsbmcubG5nXSxcbiAgICAgIHt0aXRsZTogcmVzdGF1cmFudC5uYW1lLFxuICAgICAgYWx0OiByZXN0YXVyYW50Lm5hbWUsXG4gICAgICB1cmw6IERCSGVscGVyLnVybEZvclJlc3RhdXJhbnQocmVzdGF1cmFudClcbiAgICAgIH0pXG4gICAgICBtYXJrZXIuYWRkVG8obmV3TWFwKTtcbiAgICByZXR1cm4gbWFya2VyO1xuICB9XG5cbiAgc3RhdGljIHVwZGF0ZUNhY2hlZFJlc3RhdXJhbnRSZXZpZXcoZm9ybURhdGEpIHtcbiAgICBjb25zb2xlLmxvZygndXBkYXRpbmcgY2FjaGUgZm9yIG5ldyByZXZpZXcnLCBmb3JtRGF0YSk7XG4gICAgcmV0dXJuIGRiUHJvbWlzZS50aGVuKCBkYiA9PiB7XG4gICAgICBjb25zdCB0eCA9IGRiLnRyYW5zYWN0aW9uKCdyZXZpZXdzJywgJ3JlYWR3cml0ZScpO1xuICAgICAgY29uc3Qgc3RvcmUgPSB0eC5vYmplY3RTdG9yZSgncmV2aWV3cycpO1xuICAgICAgc3RvcmUucHV0KGZvcm1EYXRhKTtcbiAgICAgIGNvbnNvbGUubG9nKCdzdWNjZXNzZnVsbHkgcHV0IHJldmlldyBpbiBzdG9yZScpO1xuICAgICAgcmV0dXJuIHR4LmRvbmU7XG4gICAgfSlcbiAgfVxuXG4vKipcbiogR3JhYiB0aGUgb3JpZ2luYWwgcmV2aWV3IGZyb20gdGhlIGRiIGFuZCByZXBsYWNlIHdpdGggZWRpdGVkIHJldmlld1xuKi9cbiAgc3RhdGljIGVkaXRSZXZpZXcoZm9ybURhdGEsIGVkaXRpbmcpIHtcbiAgICByZXR1cm4gZGJQcm9taXNlLnRoZW4oZGIgPT4ge1xuICAgICAgbGV0IHR4ID0gZGIudHJhbnNhY3Rpb24oJ3Jldmlld3MnKTtcbiAgICAgIGxldCBzdG9yZSA9IHR4Lm9iamVjdFN0b3JlKCdyZXZpZXdzJyk7XG4gICAgICByZXR1cm4gc3RvcmUuZ2V0KGVkaXRpbmcuaWQpO1xuICAgIH0pLnRoZW4oIHJldmlldyA9PiB7XG4gICAgICByZXR1cm4gZGJQcm9taXNlLnRoZW4oZGIgPT4ge1xuICAgICAgICBsZXQgdHggPSBkYi50cmFuc2FjdGlvbigncmV2aWV3cycsICdyZWFkd3JpdGUnKTtcbiAgICAgICAgbGV0IHN0b3JlID0gdHgub2JqZWN0U3RvcmUoJ3Jldmlld3MnKTtcbiAgICAgICAgbGV0IG5ld1JldmlldyA9IE9iamVjdC5hc3NpZ24oe30sIHJldmlldywgZm9ybURhdGEpO1xuICAgICAgICBzdG9yZS5wdXQobmV3UmV2aWV3KTtcbiAgICAgICAgcmV0dXJuIHR4LmNvbXBsZXRlO1xuICAgICAgfSlcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyBzdWJtaXRSZXZpZXcoZm9ybURhdGEsIGVkaXRpbmcpIHtcbiAgICBjb25zb2xlLmxvZyhlZGl0aW5nKTtcbiAgICBjb25zdCBtZXRob2QgPSBlZGl0aW5nID8gXCJQVVRcIiA6IFwiUE9TVFwiO1xuICAgIGNvbnN0IHVybCA9IGVkaXRpbmcgPyBgJHtEQkhlbHBlci5EQVRBQkFTRV9SRVZJRVdTX1VSTH0vJHtlZGl0aW5nLmlkfWAgOiBEQkhlbHBlci5EQVRBQkFTRV9SRVZJRVdTX1VSTDtcbiAgICBpZiAoZWRpdGluZykge1xuICAgICAgREJIZWxwZXIuZWRpdFJldmlldyhmb3JtRGF0YSwgZWRpdGluZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIERCSGVscGVyLnVwZGF0ZUNhY2hlZFJlc3RhdXJhbnRSZXZpZXcoZm9ybURhdGEpO1xuICAgIH1cbiAgICByZXR1cm4gREJIZWxwZXIuYWRkUGVuZGluZ1JlcXVlc3RUb1F1ZSh1cmwsIG1ldGhvZCwgZm9ybURhdGEpO1xuICB9XG5cbiAgc3RhdGljIGFkZFBlbmRpbmdSZXF1ZXN0VG9RdWUodXJsLCBtZXRob2QsIGZvcm1EYXRhKSB7XG4gICAgLy9vcGVuIGRhdGFiYXNlIGFuZCBhZGQgcmVxdWVzdCBkZXRhaWxzIHRvIHRoZSBwZW5kaW5nIHN0b3JlXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGRiUHJvbWlzZS50aGVuKGRiID0+IHtcbiAgICAgIGNvbnN0IHR4ID0gZGIudHJhbnNhY3Rpb24oJ3BlbmRpbmcnLCAncmVhZHdyaXRlJyk7XG4gICAgICBjb25zdCBzdG9yZSA9IHR4Lm9iamVjdFN0b3JlKCdwZW5kaW5nJyk7XG4gICAgICByZXR1cm4gc3RvcmUucHV0KHtcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIHVybCxcbiAgICAgICAgICBtZXRob2QsXG4gICAgICAgICAgZm9ybURhdGFcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhgRXJyb3IgcHV0dGluZyBkYXRhIGluIHBlbmRpbmcgZGI6ICR7ZXJyb3J9YCk7XG4gICAgfSkudGhlbihEQkhlbHBlci5uZXh0UGVuZGluZygoZXJyb3IsIGpzb24pID0+IHtcbiAgICAgIGlmIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgIHJldHVybiByZWplY3QoZXJyb3IpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc29sdmUoanNvbik7XG4gICAgfSkpO1xuICB9KTtcbiAgfVxuXG4gIHN0YXRpYyBuZXh0UGVuZGluZyhjYWxsYmFjaykge1xuICAgIERCSGVscGVyLmF0dGVtcHRDb21taXRQZW5kaW5nKERCSGVscGVyLm5leHRQZW5kaW5nKS50aGVuKGogPT4ge1xuICAgICAgY29uc29sZS5sb2coaik7XG4gICAgICBjYWxsYmFjayhudWxsLCBqKTtcbiAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgY2FsbGJhY2soZXJyb3IpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIGF0dGVtcHRDb21taXRQZW5kaW5nKGNhbGxiYWNrKSB7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIHRoZSBwZW5kaW5nIGl0ZW1zIHVudGlsIHRoZXJlIGlzIGEgbmV0d29yayBmYWlsdXJlXG4gICAgbGV0IHVybDtcbiAgICBsZXQgbWV0aG9kO1xuICAgIGxldCBib2R5O1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKCAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBkYlByb21pc2UudGhlbihkYiA9PiB7XG4gICAgICAgIGlmICghZGIub2JqZWN0U3RvcmVOYW1lcy5sZW5ndGgpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIkRCIG5vdCBhdmFpbGFibGVcIik7XG4gICAgICAgICAgZGIuY2xvc2UoKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdHggPSBkYi50cmFuc2FjdGlvbigncGVuZGluZycsICdyZWFkd3JpdGUnKTtcbiAgICAgICAgY29uc3Qgc3RvcmUgPSB0eC5vYmplY3RTdG9yZSgncGVuZGluZycpO1xuICAgICAgICBzdG9yZS5vcGVuQ3Vyc29yKCkudGhlbiggY3Vyc29yID0+IHtcbiAgICAgICAgICBpZiAoIWN1cnNvcikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ25vIG1vcmUgY3Vyc29ycycpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCB2YWx1ZSA9IGN1cnNvci52YWx1ZTtcbiAgICAgICAgICB1cmwgPSB2YWx1ZS5kYXRhLnVybDtcbiAgICAgICAgICBtZXRob2QgPSB2YWx1ZS5kYXRhLm1ldGhvZDtcbiAgICAgICAgICBib2R5ID0gdmFsdWUuZGF0YS5mb3JtRGF0YTtcblxuICAgICAgICAgIC8vIElmIHdlIGRvbid0IGhhdmUgYSBwYXJhbWV0ZXIgdGhlbiB3ZSdyZSBvbiBhIGJhZCByZWNvcmQgdGhhdCBzaG91bGQgYmUgdG9zc2VkXG4gICAgICAgICAgLy8gYW5kIHRoZW4gbW92ZSBvblxuICAgICAgICAgIGlmICgoIXVybCB8fCAhbWV0aG9kKSB8fCAobWV0aG9kID09PSBcIlBPU1RcIiAmJiAhYm9keSkpIHtcbiAgICAgICAgICAgIGN1cnNvclxuICAgICAgICAgICAgICAuZGVsZXRlKClcbiAgICAgICAgICAgICAgLnRoZW4oY2FsbGJhY2spO1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZGVsZXRlZCBhIGJhZCBjdXJzb3InKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgY29uc3QgcHJvcGVydGllcyA9IHtcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGJvZHkpLFxuICAgICAgICAgICAgbWV0aG9kOiBtZXRob2RcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBmZXRjaCh1cmwsIHByb3BlcnRpZXMpLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuXG4gICAgICAgICAgICBpZiAoIXJlc3BvbnNlLm9rICYmICFyZXNwb25zZS5yZWRpcmVjdGVkKSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0aGlzIGlzIHRoZSByZXNwb25zZSBhbmQgd2UgYXJlIG9mZmxpbmUnKTtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpLnRoZW4oanNvbiA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGRlbHR4ID0gZGIudHJhbnNhY3Rpb24oJ3BlbmRpbmcnLCAncmVhZHdyaXRlJyk7XG4gICAgICAgICAgICAgIGNvbnN0IHN0b3JlID0gZGVsdHgub2JqZWN0U3RvcmUoJ3BlbmRpbmcnKTtcbiAgICAgICAgICAgICAgcmV0dXJuIHN0b3JlLm9wZW5DdXJzb3IoKVxuICAgICAgICAgICAgICAudGhlbiggY3Vyc29yID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY3Vyc29yLmRlbGV0ZSgpXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coY3Vyc29yLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdkZWxldGVkIGl0ZW0gZnJvbSBwZW5kaW5nIHN0b3JlJyk7XG4gICAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coanNvbik7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShqc29uKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgICByZXR1cm4gcmVqZWN0KCdubyBuZXR3b3JrJyk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgc3luY1Jlc3RhdXJhbnQocmVzdGF1cmFudCkge1xuICAgICAgIGxldCB1cmwgPSBgaHR0cHM6Ly9td3NiYWNrZW5kLmhlcm9rdWFwcC5jb20vcmVzdGF1cmFudHMvJHtyZXN0YXVyYW50LmlkfS8/aXNfZmF2b3JpdGU9JHtyZXN0YXVyYW50LmlzX2Zhdm9yaXRlfWA7XG4gICAgICAgbGV0IG1ldGhvZCA9ICdQVVQnO1xuICAgICAgIERCSGVscGVyLmFkZFBlbmRpbmdSZXF1ZXN0VG9RdWUodXJsLCBtZXRob2QpLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgIGNvbnNvbGUubG9nKCdlcnJvciB1cGRhdGluZyByZXN0YXVyYW50IGJhY2tlbmQgZGF0YS4uLicsIGVycm9yLCByZXN0YXVyYW50KTtcbiAgICAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyB1cGRhdGVSZXN0YXVyYW50SW5EQihuZXdfcmVzdGF1cmFudCkge1xuICAgIHJldHVybiBkYlByb21pc2UudGhlbihmdW5jdGlvbihkYil7XG4gICAgICBsZXQgdHggPSBkYi50cmFuc2FjdGlvbigncmVzdGF1cmFudHMnLCAncmVhZHdyaXRlJyk7XG4gICAgICBsZXQgc3RvcmUgPSB0eC5vYmplY3RTdG9yZSgncmVzdGF1cmFudHMnKTtcbiAgICAgIHN0b3JlLnB1dChuZXdfcmVzdGF1cmFudCk7XG4gICAgICByZXR1cm4gdHguY29tcGxldGVcbiAgICB9KS50aGVuKGZ1bmN0aW9uKCl7XG4gICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShuZXdfcmVzdGF1cmFudCk7XG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgdG9nZ2xlRmF2QnRuKHJlc3RhdXJhbnRfaWQpIHtcbiAgICByZXR1cm4gZGJQcm9taXNlLnRoZW4oIGRiID0+IHtcbiAgICAgIGxldCB0eCA9IGRiLnRyYW5zYWN0aW9uKCdyZXN0YXVyYW50cycpO1xuICAgICAgbGV0IHN0b3JlID0gdHgub2JqZWN0U3RvcmUoJ3Jlc3RhdXJhbnRzJyk7XG4gICAgICByZXR1cm4gc3RvcmUuZ2V0KHJlc3RhdXJhbnRfaWQpO1xuICAgIH0pLnRoZW4oIHJlc3RhdXJhbnQgPT4ge1xuICAgICAgY29uc29sZS5sb2cocmVzdGF1cmFudCk7XG4gICAgICBjb25zdCBuZXdfcmVzdGF1cmFudCA9IE9iamVjdC5hc3NpZ24oe30sIHJlc3RhdXJhbnQpO1xuICAgICAgbmV3X3Jlc3RhdXJhbnQuaXNfZmF2b3JpdGUgPSAocmVzdGF1cmFudC5pc19mYXZvcml0ZSA9PT0gJ3RydWUnIHx8IHJlc3RhdXJhbnQuaXNfZmF2b3JpdGUgPT09IHRydWUpID9cbiAgICAgICdmYWxzZScgOiAndHJ1ZSc7XG4gICAgICBEQkhlbHBlci5zeW5jUmVzdGF1cmFudChuZXdfcmVzdGF1cmFudCk7XG4gICAgICByZXR1cm4gREJIZWxwZXIudXBkYXRlUmVzdGF1cmFudEluREIobmV3X3Jlc3RhdXJhbnQpO1xuICAgIH0pLnRoZW4oIG5ld19yZXN0YXVyYW50ID0+IHtcbiAgICAgIGNvbnN0IGZhdkJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBmYXYtYnRuLSR7bmV3X3Jlc3RhdXJhbnQuaWR9YCk7XG4gICAgICBpZihuZXdfcmVzdGF1cmFudC5pc19mYXZvcml0ZSA9PT0gJ3RydWUnIHx8IG5ld19yZXN0YXVyYW50LmlzX2Zhdm9yaXRlID09PSB0cnVlKSB7XG4gICAgICAgIGZhdkJ0bi5pbm5lckhUTUwgPSAnRmF2b3JpdGVkISc7XG4gICAgICAgIGZhdkJ0bi5zdHlsZS5iYWNrZ3JvdW5kID0gJ2hvdHBpbmsnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZmF2QnRuLmlubmVySFRNTCA9ICdBZGQgdG8gZmF2b3JpdGUnO1xuICAgICAgICBmYXZCdG4uc3R5bGUuYmFja2dyb3VuZCA9ICdncmV5JztcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgc3RhdGljIGRlbGV0ZUNhY2hlZFJldmlldyhyZXZpZXdfaWQpIHtcbiAgICByZXR1cm4gZGJQcm9taXNlLnRoZW4oZGIgPT4ge1xuICAgICAgbGV0IHR4ID0gZGIudHJhbnNhY3Rpb24oJ3Jldmlld3MnLCAncmVhZHdyaXRlJylcbiAgICAgIGxldCBzdG9yZSA9ICB0eC5vYmplY3RTdG9yZSgncmV2aWV3cycpO1xuICAgICAgc3RvcmUuZGVsZXRlKHJldmlld19pZCk7XG4gICAgICBjb25zb2xlLmxvZygnZGVsZXRlZCByZXZpZXcgZnJvbSBpZGInKTtcbiAgICAgIHJldHVybiB0eC5jb21wbGV0ZTtcbiAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICBjb25zb2xlLmxvZygnZXJyb3IgZGVsZXRpbmcgcmV2aWV3OiAnLCBlcnJvcik7XG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgZGVsZXRlUmV2aWV3KHJldmlld19pZCkge1xuICAgIGNvbnN0IHVybCA9IGAke0RCSGVscGVyLkRBVEFCQVNFX1JFVklFV1NfVVJMfS8ke3Jldmlld19pZH1gO1xuICAgIGNvbnNvbGUubG9nKHVybCk7XG4gICAgY29uc3QgbWV0aG9kID0gXCJERUxFVEVcIjtcbiAgICBEQkhlbHBlci5kZWxldGVDYWNoZWRSZXZpZXcocmV2aWV3X2lkKTtcbiAgICByZXR1cm4gREJIZWxwZXIuYWRkUGVuZGluZ1JlcXVlc3RUb1F1ZSh1cmwsIG1ldGhvZCk7XG4gIH1cblxuICBzdGF0aWMgZGVsZXRlVGVtcFJldmlldyh0ZW1wX2lkKSB7XG4gICAgZGJQcm9taXNlLnRoZW4oZGIgPT4ge1xuICAgICAgbGV0IHR4ID0gZGIudHJhbnNhY3Rpb24oJ3Jldmlld3MnLCAncmVhZHdyaXRlJylcbiAgICAgIGxldCBzdG9yZSA9IHR4Lm9iamVjdFN0b3JlKCdyZXZpZXdzJyk7XG4gICAgICBzdG9yZS5kZWxldGUodGVtcF9pZCk7XG4gICAgICBjb25zb2xlLmxvZygnZGVsZXRlZCBvbGR2ZXJzaW9uIG9mIHJldmlldyB3aXRoIG9sZCBpZCcpO1xuICAgICAgcmV0dXJuIHR4LmNvbXBsZXRlO1xuICAgIH0pLmNhdGNoKCBlcnJvciA9PiB7XG4gICAgICBjb25zb2xlLmxvZygnZXJyb3IgZGVsZXRpbmcgdGVtcCByZXZpZXc6ICcsIGVycm9yKTtcbiAgICB9KVxuICB9XG59XG5cblxuIiwiZXhwb3J0IGRlZmF1bHQgKGZ1bmN0aW9uICgpIHtcblxuICBpZiAoJ3NlcnZpY2VXb3JrZXInIGluIG5hdmlnYXRvcikge1xuICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XG4gICAgIG5hdmlnYXRvci5zZXJ2aWNlV29ya2VyLnJlZ2lzdGVyKCcvc2VydmljZXdvcmtlci5idW5kbGUuanMnKS50aGVuKHJlZ2lzdHJhdGlvbiA9PiB7XG4gICAgICAgY29uc29sZS5sb2coJ1NXIHJlZ2lzdGVyZWQ6ICcsIHJlZ2lzdHJhdGlvbik7XG4gICAgIH0pLmNhdGNoKHJlZ2lzdHJhdGlvbkVycm9yID0+IHtcbiAgICAgICBjb25zb2xlLmxvZygnU1cgcmVnaXN0cmF0aW9uIGZhaWxlZDogJywgcmVnaXN0cmF0aW9uRXJyb3IpO1xuICAgICB9KTtcbiAgIH0pO1xuICB9XG5cbn0pKCk7XG5cblxuIiwiaW1wb3J0IHJlZ2lzdHJhdGlvbiBmcm9tICcuL3JlZ2lzdHJhdGlvbic7XG5pbXBvcnQgREJIZWxwZXIgZnJvbSAnLi9kYmhlbHBlcic7XG5sZXQgcmVzdGF1cmFudDtcbmxldCBzdWJtaXRCdG47XG52YXIgbmV3TWFwO1xubGV0IGVkaXRpbmcgPSBmYWxzZTtcbmltcG9ydCB7ZGJQcm9taXNlfSBmcm9tICcuLi9zdy5qcyc7XG5cbi8qKlxuICogSW5pdGlhbGl6ZSBtYXAgYXMgc29vbiBhcyB0aGUgcGFnZSBpcyBsb2FkZWQuXG4gKi9cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoZXZlbnQpID0+IHtcbiAgaW5pdE1hcCgpO1xuXG4gIHN1Ym1pdEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdWJtaXQtZm9ybS1idG4nKTtcbiAgc3VibWl0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc3VibWl0UmV2aWV3KTtcblxuICAvL2NoZWNrIGZvciBwZW5kaW5nIHJldmlld3Mgb24gcGFnZSBsb2FkIGFuZCBwb3BcbiAgREJIZWxwZXIubmV4dFBlbmRpbmcoKTtcbiB9KTtcblxuLyoqXG4gKiBJbml0aWFsaXplIGxlYWZsZXQgbWFwXG4gKi9cbmNvbnN0IGluaXRNYXAgPSAoKSA9PiB7XG4gIGZldGNoUmVzdGF1cmFudEZyb21VUkwoKGVycm9yLCByZXN0YXVyYW50KSA9PiB7XG4gICAgaWYgKGVycm9yKSB7IC8vIEdvdCBhbiBlcnJvciFcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXdNYXAgPSBMLm1hcCgnbWFwJywge1xuICAgICAgICBjZW50ZXI6IFtyZXN0YXVyYW50LmxhdGxuZy5sYXQsIHJlc3RhdXJhbnQubGF0bG5nLmxuZ10sXG4gICAgICAgIHpvb206IDE2LFxuICAgICAgICBzY3JvbGxXaGVlbFpvb206IGZhbHNlXG4gICAgICB9KTtcbiAgICAgIHNlbGYubmV3TWFwID0gbmV3TWFwO1xuICAgICAgTC50aWxlTGF5ZXIoJ2h0dHBzOi8vYXBpLnRpbGVzLm1hcGJveC5jb20vdjQve2lkfS97en0ve3h9L3t5fS5qcGc3MD9hY2Nlc3NfdG9rZW49e21hcGJveFRva2VufScsIHtcbiAgICAgICAgbWFwYm94VG9rZW46ICdway5leUoxSWpvaWQyVnVkR2x1SWl3aVlTSTZJbU5xYVhKME4yNWlaakZ3ZGpZemEzQTRNR3QxYUhVMmJqRWlmUS5Ebk5GVW9ONXV6dzAxbF9YS19jN25RJyxcbiAgICAgICAgbWF4Wm9vbTogMTgsXG4gICAgICAgIGF0dHJpYnV0aW9uOiAnTWFwIGRhdGEgJmNvcHk7IDxhIGhyZWY9XCJodHRwczovL3d3dy5vcGVuc3RyZWV0bWFwLm9yZy9cIj5PcGVuU3RyZWV0TWFwPC9hPiBjb250cmlidXRvcnMsICcgK1xuICAgICAgICAgICc8YSBocmVmPVwiaHR0cHM6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL2xpY2Vuc2VzL2J5LXNhLzIuMC9cIj5DQy1CWS1TQTwvYT4sICcgK1xuICAgICAgICAgICdJbWFnZXJ5IMKpIDxhIGhyZWY9XCJodHRwczovL3d3dy5tYXBib3guY29tL1wiPk1hcGJveDwvYT4nLFxuICAgICAgICBpZDogJ21hcGJveC5zdHJlZXRzJ1xuICAgICAgfSkuYWRkVG8obmV3TWFwKTtcbiAgICAgIGZpbGxCcmVhZGNydW1iKCk7XG4gICAgICBEQkhlbHBlci5tYXBNYXJrZXJGb3JSZXN0YXVyYW50KHNlbGYucmVzdGF1cmFudCwgc2VsZi5uZXdNYXApO1xuICAgIH1cbiAgfSk7XG59XG5cbi8qKlxuICogR2V0IGN1cnJlbnQgcmVzdGF1cmFudCBmcm9tIHBhZ2UgVVJMLlxuICovXG5jb25zdCBmZXRjaFJlc3RhdXJhbnRGcm9tVVJMID0gKGNhbGxiYWNrKSA9PiB7XG4gIGlmIChzZWxmLnJlc3RhdXJhbnQpIHsgLy8gcmVzdGF1cmFudCBhbHJlYWR5IGZldGNoZWQhXG4gICAgY2FsbGJhY2sobnVsbCwgc2VsZi5yZXN0YXVyYW50KVxuICAgIGNvbnNvbGUubG9nKCdzZWxmIHJlc3RhdXJhbnQgYWxyZWFkeSBmZXRjaGVkJyk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgaWQgPSBnZXRQYXJhbWV0ZXJCeU5hbWUoJ2lkJyk7XG4gIGlmICghaWQpIHsgLy8gbm8gaWQgZm91bmQgaW4gVVJMXG4gICAgZXJyb3IgPSAnTm8gcmVzdGF1cmFudCBpZCBpbiBVUkwnXG4gICAgY2FsbGJhY2soZXJyb3IsIG51bGwpO1xuICB9IGVsc2Uge1xuICAgIERCSGVscGVyLmZldGNoUmVzdGF1cmFudEJ5SWQoaWQsIChlcnJvciwgcmVzdGF1cmFudCkgPT4ge1xuICAgICAgc2VsZi5yZXN0YXVyYW50ID0gcmVzdGF1cmFudDtcbiAgICAgIGlmICghcmVzdGF1cmFudCkge1xuICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgZmlsbFJlc3RhdXJhbnRIVE1MKCk7XG4gICAgICBjYWxsYmFjayhudWxsLCByZXN0YXVyYW50KTtcbiAgICB9KTtcbiAgfVxufVxuLyoqXG4gKiBDcmVhdGUgcmVzdGF1cmFudCBIVE1MIGFuZCBhZGQgaXQgdG8gdGhlIHdlYnBhZ2VcbiAqL1xuY29uc3QgZmlsbFJlc3RhdXJhbnRIVE1MID0gKHJlc3RhdXJhbnQgPSBzZWxmLnJlc3RhdXJhbnQpID0+IHtcbiAgY29uc3QgbmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXN0YXVyYW50LW5hbWUnKTtcbiAgbmFtZS5pbm5lckhUTUwgPSByZXN0YXVyYW50Lm5hbWU7XG5cbiAgY29uc3QgYWRkcmVzcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXN0YXVyYW50LWFkZHJlc3MnKTtcbiAgYWRkcmVzcy5pbm5lckhUTUwgPSBgICR7cmVzdGF1cmFudC5uYW1lfSA8YnI+ICR7cmVzdGF1cmFudC5hZGRyZXNzfWA7XG5cbiAgY29uc3QgaW1hZ2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzdGF1cmFudC1pbWcnKTtcbiAgaW1hZ2UuY2xhc3NOYW1lID0gJ3Jlc3RhdXJhbnQtaW1nJ1xuICBpbWFnZS5zcmMgPSBEQkhlbHBlci5pbWFnZVVybEZvclJlc3RhdXJhbnQocmVzdGF1cmFudCk7XG5cbiAgY29uc3QgY3Vpc2luZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXN0YXVyYW50LWN1aXNpbmUnKTtcbiAgY3Vpc2luZS5pbm5lckhUTUwgPSByZXN0YXVyYW50LmN1aXNpbmVfdHlwZTtcblxuICAvLyBmaWxsIG9wZXJhdGluZyBob3Vyc1xuICBpZiAocmVzdGF1cmFudC5vcGVyYXRpbmdfaG91cnMpIHtcbiAgICBmaWxsUmVzdGF1cmFudEhvdXJzSFRNTCgpO1xuICB9XG4gIC8vIGZpbGwgcmV2aWV3c1xuICBEQkhlbHBlci5mZXRjaFJldmlld3MocmVzdGF1cmFudC5pZCwgKGVycm9yLCByZXZpZXdzKSA9PiB7XG4gICAgZmlsbFJldmlld3NIVE1MKHJldmlld3MpO1xuXG4gIH0pO1xufVxuXG5cbi8qKlxuICogQ3JlYXRlIHJlc3RhdXJhbnQgb3BlcmF0aW5nIGhvdXJzIEhUTUwgdGFibGUgYW5kIGFkZCBpdCB0byB0aGUgd2VicGFnZS5cbiAqL1xuY29uc3QgZmlsbFJlc3RhdXJhbnRIb3Vyc0hUTUwgPSAob3BlcmF0aW5nSG91cnMgPSBzZWxmLnJlc3RhdXJhbnQub3BlcmF0aW5nX2hvdXJzKSA9PiB7XG4gIGNvbnN0IGhvdXJzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc3RhdXJhbnQtaG91cnMnKTtcbiAgZm9yIChsZXQga2V5IGluIG9wZXJhdGluZ0hvdXJzKSB7XG4gICAgY29uc3Qgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKTtcblxuICAgIGNvbnN0IGRheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJyk7XG4gICAgZGF5LmlubmVySFRNTCA9IGtleTtcbiAgICByb3cuYXBwZW5kQ2hpbGQoZGF5KTtcblxuICAgIGNvbnN0IHRpbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpO1xuICAgIHRpbWUuaW5uZXJIVE1MID0gb3BlcmF0aW5nSG91cnNba2V5XTtcbiAgICByb3cuYXBwZW5kQ2hpbGQodGltZSk7XG5cbiAgICBob3Vycy5hcHBlbmRDaGlsZChyb3cpO1xuICB9XG59XG5cbi8qKlxuICogQ3JlYXRlIGFsbCByZXZpZXdzIEhUTUwgYW5kIGFkZCB0aGVtIHRvIHRoZSB3ZWJwYWdlLlxuICovXG5jb25zdCBmaWxsUmV2aWV3c0hUTUwgPSAocmV2aWV3cyA9IHNlbGYucmVzdGF1cmFudC5yZXZpZXdzKSA9PiB7XG4gIGNvbnNvbGUubG9nKHJldmlld3MpO1xuICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmV2aWV3cy1jb250YWluZXInKTtcblxuICAvLyBSZXNldCB0aGUgY29udGFpbmVyIG9uIGV2ZXJ5IGNhbGwgdG8gcHJldmVudCBkdXBsaWNhdGlvblxuICBjb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG4gIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcbiAgdGl0bGUuaW5uZXJIVE1MID0gJ1Jldmlld3MnO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQodGl0bGUpO1xuXG4gIGlmICghcmV2aWV3cykge1xuICAgIGNvbnN0IG5vUmV2aWV3cyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICBub1Jldmlld3MuaW5uZXJIVE1MID0gJ05vIHJldmlld3MgeWV0ISc7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKG5vUmV2aWV3cyk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnN0IHVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgdWwuaWQgPSAncmV2aWV3cy1saXN0JztcbiAgcmV2aWV3cy5mb3JFYWNoKHJldmlldyA9PiB7XG4gICAgdWwuYXBwZW5kQ2hpbGQoY3JlYXRlUmV2aWV3SFRNTChyZXZpZXcpKTtcbiAgfSk7XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZCh1bCk7XG59XG5cbi8qKlxuICogQ3JlYXRlIHJldmlldyBIVE1MIGFuZCBhZGQgaXQgdG8gdGhlIHdlYnBhZ2UuXG4gKi9cbmNvbnN0IGNyZWF0ZVJldmlld0hUTUwgPSAocmV2aWV3KSA9PiB7XG4gIGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgbGkuc2V0QXR0cmlidXRlKCdpZCcsIGByZXZpZXctbGktJHtyZXZpZXcuaWR9YClcbiAgY29uc3QgbmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgbmFtZS5pbm5lckhUTUwgPSByZXZpZXcubmFtZTtcbiAgbGkuYXBwZW5kQ2hpbGQobmFtZSk7XG5cbiAgY29uc3QgZGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgZGF0ZS5pbm5lckhUTUwgPSAnPHN0cm9uZz5DcmVhdGVkOjwvc3Ryb25nPiAnICsgKG5ldyBEYXRlKHJldmlldy5jcmVhdGVkQXQpKS50b0RhdGVTdHJpbmcoKTtcbiAgbGkuYXBwZW5kQ2hpbGQoZGF0ZSk7XG5cbiAgaWYgKHJldmlldy5jcmVhdGVkQXQgIT09IHJldmlldy51cGRhdGVkQXQpIHtcbiAgICBjb25zdCB1cGRhdGVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIHVwZGF0ZURhdGUuaW5uZXJIVE1MID0gJzxzdHJvbmc+VXBkYXRlZDo8L3N0cm9uZz4gJyArIChuZXcgRGF0ZShyZXZpZXcudXBkYXRlZEF0KSkudG9EYXRlU3RyaW5nKCk7XG4gICAgbGkuYXBwZW5kQ2hpbGQodXBkYXRlRGF0ZSk7XG4gIH1cblxuICBjb25zdCByYXRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gIHJhdGluZy5pbm5lckhUTUwgPSBgUmF0aW5nOiAke3Jldmlldy5yYXRpbmd9YDtcbiAgbGkuYXBwZW5kQ2hpbGQocmF0aW5nKTtcblxuICBjb25zdCBjb21tZW50cyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgY29tbWVudHMuaW5uZXJIVE1MID0gcmV2aWV3LmNvbW1lbnRzO1xuICBsaS5hcHBlbmRDaGlsZChjb21tZW50cyk7XG5cbiAgLy8gU2V0IHVwIGFuZCB1c2UgZm9udGF3ZXNvbWUgaWNvbnMgZm9yIGVkaXQgYW5kIGRlbGV0ZVxuICBjb25zdCBlZGl0QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gIGNvbnN0IGVkaXRJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuICBlZGl0QnRuLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbGxlZGJ5JywgYGVkaXQgcmV2aWV3ICR7cmV2aWV3LmlkfWApO1xuICBlZGl0QnRuLnNldEF0dHJpYnV0ZSgndGl0bGUnLCBgZWRpdCByZXZpZXcgYnV0dG9uYCk7XG4gIGVkaXRCdG4uY2xhc3NMaXN0LmFkZCgncmV2aWV3LWJ0bicpO1xuICBlZGl0QnRuLnRpdGxlID0gJ3N0YXJ0IGVkaXRpbmcgYnV0dG9uJztcbiAgZWRpdEljb24uY2xhc3NMaXN0LmFkZCgnZmFzJywgJ2ZhLWVkaXQnLCAnZmEtMngnKTtcbiAgZWRpdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHNldEVkaXRpbmcocmV2aWV3KSk7XG4gIGVkaXRCdG4uYXBwZW5kKGVkaXRJY29uKTtcbiAgbGkuYXBwZW5kQ2hpbGQoZWRpdEJ0bik7XG5cbiAgY29uc3QgZGVsZXRlQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gIGNvbnN0IGRlbGV0ZUljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG4gIGRlbGV0ZUJ0bi5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWxsZWRieScsIGBkZWxldGUgcmV2aWV3ICR7cmV2aWV3LmlkfWApO1xuICBkZWxldGVCdG4uc2V0QXR0cmlidXRlKCd0aXRsZScsIGBkZWxldGUgcmV2aWV3IGJ1dHRvbmApO1xuICBkZWxldGVCdG4uY2xhc3NMaXN0LmFkZCgncmV2aWV3LWJ0bicpO1xuICBkZWxldGVJY29uLmNsYXNzTGlzdC5hZGQoJ2ZhcycsICdmYS10cmFzaC1hbHQnLCAnZmEtMngnKTtcbiAgZGVsZXRlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gZGVsZXRlUmV2aWV3KHJldmlldykpO1xuICBkZWxldGVCdG4uYXBwZW5kKGRlbGV0ZUljb24pO1xuICBsaS5hcHBlbmRDaGlsZChkZWxldGVCdG4pO1xuXG4gIHJldHVybiBsaTtcbn1cblxuLyoqXG4gKiBBZGQgcmVzdGF1cmFudCBuYW1lIHRvIHRoZSBicmVhZGNydW1iIG5hdmlnYXRpb24gbWVudVxuICovXG5jb25zdCBmaWxsQnJlYWRjcnVtYiA9IChyZXN0YXVyYW50PXNlbGYucmVzdGF1cmFudCkgPT4ge1xuICBjb25zdCBicmVhZGNydW1iID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JyZWFkY3J1bWInKTtcbiAgY29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICBsaS5pbm5lckhUTUwgPSByZXN0YXVyYW50Lm5hbWU7XG4gIGJyZWFkY3J1bWIuYXBwZW5kQ2hpbGQobGkpO1xufVxuXG4vKipcbiAqIEdldCBhIHBhcmFtZXRlciBieSBuYW1lIGZyb20gcGFnZSBVUkwuXG4gKi9cbmNvbnN0IGdldFBhcmFtZXRlckJ5TmFtZSA9IChuYW1lLCB1cmwpID0+IHtcbiAgbGV0IHggPSBuZXcgVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcbiAgaWYgKCF1cmwpIHVybCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuICBuYW1lID0gbmFtZS5yZXBsYWNlKC9bXFxbXFxdXS9nLCAnXFxcXCQmJyk7XG4gIGNvbnNvbGUubG9nKHVybCk7XG4gIGNvbnN0IHJlZ2V4ID0gbmV3IFJlZ0V4cChgWz8mXSR7bmFtZX0oPShbXiYjXSopfCZ8I3wkKWApLFxuICByZXN1bHRzID0gcmVnZXguZXhlYyh1cmwpO1xuICBjb25zb2xlLmxvZyhyZXN1bHRzKTtcbiAgaWYgKCFyZXN1bHRzWzJdKSByZXR1cm4gJyc7XG4gIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQocmVzdWx0c1syXS5yZXBsYWNlKC9cXCsvZywgJyAnKSk7XG59XG5cbmNvbnN0IHN1Ym1pdFJldmlldyA9ICgpID0+IHtcbiAgY29uc29sZS5sb2coZWRpdGluZyk7XG4gIGxldCBmb3JtRGF0YSA9IGdldEZvcm1WYWx1ZXMoKTtcbiAgaWYoIS9bYS16QS1aXXsyLH0kL2dpLnRlc3QoZm9ybURhdGEubmFtZSkpIHtcbiAgICBhbGVydCgnbmFtZSBpbnB1dCBtdXN0IGJlIGxldHRlcnMgb25seSwgbWluaW11bSBvZiAyIGNoYXJhY3RlcnMnKTtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYoIS9bMS01XXsxfSQvZ2kudGVzdChmb3JtRGF0YS5yYXRpbmcpKSB7XG4gICAgYWxlcnQoJ3JhdGluZyBpbnB1dCBtdXN0IGJlIGEgbnVtYmVyLCAxLTUnKTtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYoZm9ybURhdGEuY29tbWVudHMubGVuZ3RoIDwgMykge1xuICAgIGFsZXJ0KCdjb21tZW50cyBpbnB1dCBtdXN0IGJlIG1pbmltdW0gb2YgMyBjaGFyYWN0ZXJzJyk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKGVkaXRpbmcpIHtcbiAgICBmb3JtRGF0YS51cGRhdGVkQXQgPSBEYXRlLm5vdygpO1xuICB9IGVsc2Uge1xuICAgIGZvcm1EYXRhLmlkID0gRGF0ZS5ub3coKTtcbiAgICBmb3JtRGF0YS5yZXN0YXVyYW50X2lkID0gTnVtYmVyKGdldFBhcmFtZXRlckJ5TmFtZSgnaWQnKSk7XG4gIH1cblxuICBEQkhlbHBlci5zdWJtaXRSZXZpZXcoZm9ybURhdGEsIGVkaXRpbmcpLnRoZW4oIHJlc3VsdCA9PiB7XG4gICAgbGV0IGFsZXJ0TXNnID0gZWRpdGluZyA/ICdFZGl0ZWQgUmV2aWV3JyA6ICdDcmVhdGVkIFJldmlldyc7XG4gICAgYWxlcnQoYWxlcnRNc2cpO1xuICAgIGxldCBuZXdSZXZpZXdFbGVtID0gY3JlYXRlUmV2aWV3SFRNTChyZXN1bHQpO1xuICAgIGlmIChlZGl0aW5nKSB7XG4gICAgICBsZXQgb2xkUmV2aWV3RWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGByZXZpZXctbGktJHtyZXN1bHQuaWR9YCk7XG4gICAgICBsZXQgcGFyZW50RWxlbSA9IG9sZFJldmlld0VsZW0ucGFyZW50RWxlbWVudDtcbiAgICAgIHBhcmVudEVsZW0ucmVwbGFjZUNoaWxkKG5ld1Jldmlld0VsZW0sIG9sZFJldmlld0VsZW0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB1bCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXZpZXdzLWxpc3QnKTtcbiAgICAgIHVsLmFwcGVuZENoaWxkKG5ld1Jldmlld0VsZW0pO1xuICAgIH1cbiAgICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGByZXZpZXctbGktJHtyZXN1bHQuaWR9YCk7XG4gICAgZWxlbWVudC5zY3JvbGxJbnRvVmlldyh0cnVlKTtcbiAgICByZXNldEZvcm1WYWx1ZXMoKTtcbiAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgIC8vIElmIG5vIG5ldHdvcmssIGZhbGxiYWNrIHRvIGdldCByZXZpZXdzIGZyb20gZGJcbiAgICBsZXQgYWxlcnRNc2cgPSBlZGl0aW5nID8gJ0VkaXRlZCBSZXZpZXcnIDogJ0NyZWF0ZWQgUmV2aWV3JztcbiAgICBhbGVydChhbGVydE1zZyk7XG4gICAgY29uc29sZS5sb2coYCR7ZXJyb3J9OiByZWxvYWRpbmcgcmV2aWV3cyBmcm9tIGRiYCk7XG4gICAgY29uc3Qgc2VjdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXZpZXdzLWNvbnRhaW5lcicpO1xuICAgIGRiUHJvbWlzZS50aGVuKGRiID0+IHtcbiAgICAgIHJldHVybiBkYlxuICAgICAgICAudHJhbnNhY3Rpb24oJ3Jldmlld3MnKVxuICAgICAgICAub2JqZWN0U3RvcmUoJ3Jldmlld3MnKVxuICAgICAgICAuaW5kZXgoJ3Jlc3RhdXJhbnRfaWQnKVxuICAgICAgICAuZ2V0QWxsKGZvcm1EYXRhLnJlc3RhdXJhbnRfaWQpO1xuICAgIH0pLnRoZW4ocmV2aWV3cyA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhyZXZpZXdzKTtcbiAgICAgIGZpbGxSZXZpZXdzSFRNTChyZXZpZXdzKTtcbiAgICAgIHJlc2V0Rm9ybVZhbHVlcygpO1xuICAgIH0pXG5cbiAgfSk7XG59XG5cbmNvbnN0IGdldEZvcm1WYWx1ZXMgPSAoKSA9PiB7XG4gIHJldHVybiB7XG4gICAgbmFtZTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25hbWUnKS52YWx1ZS50cmltKCksXG4gICAgcmF0aW5nOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmF0aW5nJykudmFsdWUudHJpbSgpLFxuICAgIGNvbW1lbnRzOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmV2aWV3LWZpZWxkJykudmFsdWUudHJpbSgpXG4gIH1cbn1cblxuY29uc3QgcmVzZXRGb3JtVmFsdWVzID0gKCkgPT4ge1xuICBlZGl0aW5nID0gZmFsc2U7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYW1lJykudmFsdWUgPSAnJztcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JhdGluZycpLnZhbHVlID0gJyc7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXZpZXctZmllbGQnKS52YWx1ZSA9ICcnO1xufVxuXG5jb25zdCBjYW5jZWxFZGl0aW5nID0gKCkgPT4ge1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FuY2VsLWZvcm0tYnRuJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgcmVzZXRGb3JtVmFsdWVzKCk7XG4gIGVkaXRpbmcgPSBmYWxzZTtcbn1cblxuY29uc3Qgc2V0RWRpdGluZyA9IChyZXZpZXcpID0+IHtcbiAgZWRpdGluZyA9IHJldmlldztcbiAgbGV0IGNhbmNlbEVkaXRpbmdCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FuY2VsLWZvcm0tYnRuJyk7XG4gIGNhbmNlbEVkaXRpbmdCdG4uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gIGNhbmNlbEVkaXRpbmdCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBjYW5jZWxFZGl0aW5nKCkgKTtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25hbWUnKS52YWx1ZSA9IHJldmlldy5uYW1lO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmF0aW5nJykudmFsdWUgPSByZXZpZXcucmF0aW5nO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmV2aWV3LWZpZWxkJykudmFsdWUgPSByZXZpZXcuY29tbWVudHM7XG4gIGxldCByZXZpZXdfaWQgPSByZXZpZXcuaWQ7XG4gIGdvVG9Cb3R0b20oKTtcbn1cblxuY29uc3QgZGVsZXRlUmV2aWV3ID0gKHJldmlldykgPT4ge1xuICBsZXQgYXNrID0gd2luZG93LmNvbmZpcm0oYGRlbGV0ZSAke3Jldmlldy5uYW1lfSdzIHJldmlldz9gKTtcbiAgaWYgKGFzayA9PT0gZmFsc2UpIHsgcmV0dXJuIH1cbiAgREJIZWxwZXIuZGVsZXRlUmV2aWV3KHJldmlldy5pZCkudGhlbigoKSA9PiB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHJldmlldy1saS0ke3Jldmlldy5pZH1gKS5yZW1vdmUoKTtcbiAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdyZXF1ZXN0IHB1dCBpbnRvIHF1ZScpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGByZXZpZXctbGktJHtyZXZpZXcuaWR9YCkucmVtb3ZlKCk7XG4gIH0pO1xufVxuXG5jb25zdCBnb1RvQm90dG9tID0gKCkgPT4ge1xuICB3aW5kb3cuc2Nyb2xsVG8oMCwgZG9jdW1lbnQuYm9keS5zY3JvbGxIZWlnaHQpO1xufVxuIiwiY29uc3QgY2FjaGVWZXJzaW9uID0gJzMnO1xuY29uc3QgU1RBVElDX0NBQ0hFID0gYHJlc3RhdXJhbnQtY2FjaGUtdiR7Y2FjaGVWZXJzaW9ufWA7XG5jb25zdCBJTUFHRVNfQ0FDSEUgPSBgaW1hZ2VzX2NhY2hlLXZgO1xuY29uc3QgYWxsQ2FjaGVzID0gW1xuICBTVEFUSUNfQ0FDSEUsXG4gIElNQUdFU19DQUNIRVxuXTtcbmltcG9ydCB7IG9wZW5EQiwgZGVsZXRlREIsIHdyYXAsIHVud3JhcCB9IGZyb20gJ2lkYic7XG5leHBvcnQge2RiUHJvbWlzZX1cblxuY29uc3QgZGJQcm9taXNlID0gb3BlbkRCKCdyci1kYicsIDMsIHtcbiAgdXBncmFkZShkYiwgb2xkVmVyc2lvbikge1xuICAgIHN3aXRjaCAob2xkVmVyc2lvbikge1xuICAgICAgY2FzZSAwOlxuICAgICAgICBjb25zdCBzdG9yZSA9IGRiLmNyZWF0ZU9iamVjdFN0b3JlKCdyZXN0YXVyYW50cycsIHsga2V5UGF0aDogJ2lkJyB9KTtcbiAgICAgICAgc3RvcmUuY3JlYXRlSW5kZXgoJ2lkJywgJ2lkJyk7XG4gICAgICBjYXNlIDE6XG4gICAgICAgIGNvbnN0IHJldmlld3NTdG9yZSA9IGRiLmNyZWF0ZU9iamVjdFN0b3JlKCdyZXZpZXdzJywge1xuICAgICAgICAgIGtleVBhdGg6ICdpZCcsXG4gICAgICAgICAgLy8gYXV0b0luY3JlbWVudDogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgcmV2aWV3c1N0b3JlLmNyZWF0ZUluZGV4KFwicmVzdGF1cmFudF9pZFwiLCBcInJlc3RhdXJhbnRfaWRcIik7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIGNvbnN0IHBlbmRpbmdTdG9yZSA9IGRiLmNyZWF0ZU9iamVjdFN0b3JlKCdwZW5kaW5nJywge1xuICAgICAgICAgIGtleVBhdGg6ICdpZCcsXG4gICAgICAgICAgYXV0b0luY3JlbWVudDogdHJ1ZVxuICAgICAgICB9KTtcbiAgICB9XG4gIH1cbn0pO1xuXG4gY29uc3QgZ2V0UmVzdGF1cmFudHMgPSAoZXZlbnQpID0+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICBmZXRjaChldmVudC5yZXF1ZXN0KVxuICAgICAgLnRoZW4ocmVzcCA9PiByZXNwLmpzb24oKSlcbiAgICAgIC50aGVuKGpzb24gPT4geyByZXNvbHZlKGpzb24pOyB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuZnVuY3Rpb24gaXNJbWFnZVVSTCh1cmwpIHtcbiAgbGV0IGltZ1R5cGVzID0gW1wicG5nXCIsIFwianBnXCIsIFwianBlZ1wiLCBcInN2Z1wiLCBcImdpZlwiXTtcbiAgbGV0IGlzSW1hZ2UgPSBmYWxzZTtcbiAgZm9yIChsZXQgdHlwZSBvZiBpbWdUeXBlcykge1xuICAgIGlmICh1cmwuZW5kc1dpdGgodHlwZSkpIHsgaXNJbWFnZSA9IHRydWU7IGJyZWFrfTtcbiAgfVxuICByZXR1cm4gaXNJbWFnZTtcbn1cblxuc2VsZi5hZGRFdmVudExpc3RlbmVyKCdpbnN0YWxsJywgZXZlbnQgPT4ge1xuICBldmVudC53YWl0VW50aWwoXG4gICAgY2FjaGVzLm9wZW4oU1RBVElDX0NBQ0hFKS50aGVuKGNhY2hlID0+IHtcbiAgICAgIHJldHVybiBjYWNoZS5hZGRBbGwoW1xuICAgICAgICAnLycsXG4gICAgICAgICcuL2FwcC5idW5kbGUuanMnLFxuICAgICAgICAnLi9yZXN0YXVyYW50LmJ1bmRsZS5qcycsXG4gICAgICAgICcuL2ltZy9ycl9pY29uLnBuZycsXG4gICAgICAgICcuL2Nzcy9zdHlsZXMuY3NzJ1xuICAgICAgXSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnZXJyb3Igc2V0dGluZyB1cCBpbnN0YWxsIGV2ZW50IGZvciBzdycpO1xuICAgICAgfSk7XG4gICAgfSlcbiAgKTtcbn0pO1xuXG4vLyBDbGVhbiB1bnVzZWQgY2FjaGVzIHdpdGggbmFtZXMgc3RhcnRpbmcgd2l0aCByZXN0YXVyYW50XG5zZWxmLmFkZEV2ZW50TGlzdGVuZXIoJ2FjdGl2YXRlJywgZXZlbnQgPT4ge1xuICBldmVudC53YWl0VW50aWwoXG4gICAgY2FjaGVzLmtleXMoKS50aGVuKGNhY2hlTmFtZXMgPT4ge1xuICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFxuICAgICAgICBjYWNoZU5hbWVzLmZpbHRlcihjYWNoZU5hbWUgPT4ge1xuICAgICAgICAgIHJldHVybiBjYWNoZU5hbWUuc3RhcnRzV2l0aCgncmVzdGF1cmFudC0nKSAmJlxuICAgICAgICAgICAgICAgICBjYWNoZU5hbWUgIT0gU1RBVElDX0NBQ0hFO1xuICAgICAgICB9KS5tYXAoY2FjaGVOYW1lID0+IHtcbiAgICAgICAgICByZXR1cm4gY2FjaGVzLmRlbGV0ZShjYWNoZU5hbWUpO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9KVxuICApO1xufSk7XG5cbnNlbGYuYWRkRXZlbnRMaXN0ZW5lcignZmV0Y2gnLCBldmVudCA9PiB7XG4gIGxldCBjaGVja1VybCA9IG5ldyBVUkwoZXZlbnQucmVxdWVzdC51cmwpO1xuICBpZiAoY2hlY2tVcmwucG9ydCA9PT0gXCIxMzM3XCIpIHtcbiAgICBsZXQgaWQgPSBjaGVja1VybC5zZWFyY2hQYXJhbXMuZ2V0KCdyZXN0YXVyYW50X2lkJykgLSAwO1xuICAgIHJldHVybiBoYW5kbGVBSkFYRXZlbnQoZXZlbnQsIGlkKTtcbiAgfSBlbHNlIHtcbiAgICBoYW5kbGVOb25BSkFYRXZlbnQoZXZlbnQpO1xuICB9XG59KTtcblxuY29uc3QgaGFuZGxlQUpBWEV2ZW50ID0gKGV2ZW50LCBpZCkgPT4ge1xuICAvLyBPbmx5IHVzZSBmb3IgY2FjaGluZyBmb3IgR2V0IGV2ZW50c1xuICBpZihldmVudC5yZXF1ZXN0Lm1ldGhvZCAhPT0gXCJHRVRcIikge1xuICAgIGNvbnNvbGUubG9nKGV2ZW50LnJlcXVlc3QpO1xuICAgIGNvbnNvbGUubG9nKGV2ZW50KTtcbiAgICBldmVudC5yZXNwb25kV2l0aChcbiAgICAgIGZldGNoKGV2ZW50LnJlcXVlc3QpXG4gICAgKVxuICB9IGVsc2UgaWYoZXZlbnQucmVxdWVzdC51cmwuaW5kZXhPZihcInJlc3RhdXJhbnRzXCIpID4gLTEpIHtcbiAgICBoYW5kbGVSZXN0YXVyYW50RXZlbnRzKGV2ZW50KTtcbiAgfSBlbHNlIHtcbiAgICBjb25zb2xlLmxvZygnc3RhcnRpbmcgaGFuZGxpbmcgZnJvbSByZXZpZXdzIGV2ZW50JylcbiAgICBoYW5kbGVSZXZpZXdzRXZlbnRzKGV2ZW50LCBpZCk7XG4gIH1cbn1cblxuY29uc3QgaGFuZGxlUmVzdGF1cmFudEV2ZW50cyA9IChldmVudCkgPT4ge1xuICBldmVudC5yZXNwb25kV2l0aChcbiAgICAgIGRiUHJvbWlzZS50aGVuKCBkYiA9PiB7XG4gICAgICAgIHJldHVybiBkYlxuICAgICAgICAgIC50cmFuc2FjdGlvbigncmVzdGF1cmFudHMnKVxuICAgICAgICAgIC5vYmplY3RTdG9yZSgncmVzdGF1cmFudHMnKVxuICAgICAgICAgIC5nZXRBbGwoKTtcbiAgICAgIH0pLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdyZXNwb25kaW5nIGZyb20gaGFuZGxlcmVzdGF1cmFudGV2ZW50cyBmcm9tIHNlcnZpY2V3b3JrZXInKTtcbiAgICAgICAgcmV0dXJuICgoZGF0YS5sZW5ndGggJiYgZGF0YSkgfHwgZ2V0UmVzdGF1cmFudHMoZXZlbnQpXG4gICAgICAgICAgLnRoZW4oIHJlc3RhdXJhbnRzID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdmZXRjaGVkIG5vdyBzdG9yaW5nJyk7XG4gICAgICAgICAgICByZXR1cm4gZGJQcm9taXNlLnRoZW4oZGIgPT4ge1xuICAgICAgICAgICAgICBsZXQgdHggPSBkYi50cmFuc2FjdGlvbigncmVzdGF1cmFudHMnLCAncmVhZHdyaXRlJyk7XG4gICAgICAgICAgICAgIGxldCBzdG9yZSA9IHR4Lm9iamVjdFN0b3JlKCdyZXN0YXVyYW50cycpO1xuICAgICAgICAgICAgICByZXN0YXVyYW50cy5mb3JFYWNoKGZ1bmN0aW9uKHJlc3RhdXJhbnQpe1xuICAgICAgICAgICAgICAgIHN0b3JlLnB1dChyZXN0YXVyYW50KTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHJldHVybiB0eC5kb25lO1xuICAgICAgICAgICAgfSkudGhlbiggKCkgPT4ge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnc3RvcmVkIHJlc3RhdXJhbnRzLCBub3cgcmV0dXJuaW5nJyk7XG4gICAgICAgICAgICAgIHJldHVybiByZXN0YXVyYW50cztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pXG4gICAgICAgIClcbiAgICAgIH0pXG4gICAgICAgIC50aGVuKGZpbmFsUmVzcG9uc2UgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGZpbmFsUmVzcG9uc2UpO1xuICAgICAgICAgIHJldHVybiBuZXcgUmVzcG9uc2UoSlNPTi5zdHJpbmdpZnkoZmluYWxSZXNwb25zZSkpO1xuICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBSZXNwb25zZShcIkVycm9yIGZldGNoaW5nIGRhdGFcIiwge3N0YXR1czogNTAwfSk7XG4gICAgfSlcbiAgKVxufVxuXG5jb25zdCBoYW5kbGVSZXZpZXdzRXZlbnRzID0gKGV2ZW50LCBpZCkgPT4ge1xuICBldmVudC5yZXNwb25kV2l0aChcbiAgICBkYlByb21pc2UudGhlbihkYiA9PiB7XG4gICAgICByZXR1cm4gZGJcbiAgICAgICAgLnRyYW5zYWN0aW9uKCdyZXZpZXdzJylcbiAgICAgICAgLm9iamVjdFN0b3JlKCdyZXZpZXdzJylcbiAgICAgICAgLmluZGV4KFwicmVzdGF1cmFudF9pZFwiKVxuICAgICAgICAuZ2V0QWxsKGlkKTtcbiAgICB9KS50aGVuKCBkYXRhID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKCdzZXJ2aWNld29ya2VyIGhhbmRsZSByZXZpZXdzJyk7XG4gICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgIHJldHVybiAoZGF0YS5sZW5ndGggJiYgZGF0YSkgfHwgZmV0Y2goZXZlbnQucmVxdWVzdClcbiAgICAgICAgLnRoZW4oZmV0Y2hSZXNwb25zZSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGZldGNoUmVzcG9uc2UuanNvbigpO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbiggcmV2aWV3cyA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ3VzaW5nIHNlcnZpY2V3b3JrZXIgZmV0Y2gnKTtcbiAgICAgICAgICBjb25zb2xlLmxvZygnc3RhcnRpbmcgdG8gc3RvcmUgcmV2aWV3cycpO1xuICAgICAgICAgIHJldHVybiBkYlByb21pc2UudGhlbihkYiA9PiB7XG4gICAgICAgICAgICBsZXQgdHggPSBkYi50cmFuc2FjdGlvbigncmV2aWV3cycsICdyZWFkd3JpdGUnKVxuICAgICAgICAgICAgbGV0IHN0b3JlID0gdHgub2JqZWN0U3RvcmUoJ3Jldmlld3MnKTtcbiAgICAgICAgICAgIHJldmlld3MuZm9yRWFjaChmdW5jdGlvbihyZXZpZXcpIHtcbiAgICAgICAgICAgICAgc3RvcmUucHV0KHJldmlldyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0eC5kb25lO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLnRoZW4oICgpID0+IHJldmlld3MpXG4gICAgICAgIH0pXG4gICAgfSkudGhlbihmaW5hbFJlc3BvbnNlID0+IHtcbiAgICAgIHJldHVybiBuZXcgUmVzcG9uc2UoSlNPTi5zdHJpbmdpZnkoZmluYWxSZXNwb25zZSkpO1xuICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgIHJldHVybiBuZXcgUmVzcG9uc2UoXCJFcnJvciBmZXRjaGluZyBkYXRhXCIsIHtzdGF0dXM6IDUwMH0pO1xuICAgIH0pKVxufVxuXG5jb25zdCBoYW5kbGVOb25BSkFYRXZlbnQgPSAoZXZlbnQpID0+IHtcbiAgLy8gQ2hlY2sgaWYgdGhlIEhUTUwgcmVxdWVzdCBoYXMgcHJldmlvdXNseSBiZWVuIGNhY2hlZC4gSWYgc28sIHJldHVybiB0aGVcbiAgLy8gcmVzcG9uc2UgZnJvbSB0aGUgY2FjaGUuIElmIG5vdCwgZmV0Y2ggdGhlIHJlcXVlc3QsIGNhY2hlIGl0LCBhbmQgdGhlbiByZXR1cm5cbiAgLy8gaXQuXG4gIGV2ZW50LnJlc3BvbmRXaXRoKFxuICAgIGNhY2hlcy5tYXRjaChldmVudC5yZXF1ZXN0KS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgIHJldHVybiByZXNwb25zZSB8fCBmZXRjaChldmVudC5yZXF1ZXN0KS50aGVuKGZldGNoUmVzcG9uc2UgPT4ge1xuICAgICAgICBsZXQgdXNlQ2FjaGUgPSBpc0ltYWdlVVJMKGV2ZW50LnJlcXVlc3QudXJsKSA/ICBJTUFHRVNfQ0FDSEUgOiBTVEFUSUNfQ0FDSEU7XG4gICAgICAgIHJldHVybiBjYWNoZXNcbiAgICAgICAgICAub3Blbih1c2VDYWNoZSlcbiAgICAgICAgICAudGhlbihjYWNoZSA9PiB7XG4gICAgICAgICAgICBjYWNoZS5wdXQoZXZlbnQucmVxdWVzdCwgZmV0Y2hSZXNwb25zZS5jbG9uZSgpKTtcbiAgICAgICAgICAgIHJldHVybiBmZXRjaFJlc3BvbnNlO1xuICAgICAgICAgIH0pO1xuICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IFJlc3BvbnNlKFwiQXBwbGljYXRpb24gaXMgbm90IGNvbm5lY3RlZCB0byB0aGUgaW50ZXJuZXRcIiwge1xuICAgICAgICAgIHN0YXR1czogNDA0LFxuICAgICAgICAgIHN0YXR1c1RleHQ6IFwiQXBwbGljYXRpb24gaXMgbm90IGNvbm5lY3RlZCB0byB0aGUgaW50ZXJuZXRcIlxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pXG4gICk7XG5cbiAgLy8gVXBkYXRlcyB0aGUgZGF0YSBmcm9tIHRoZSBuZXR3b3JrIHRvIHVzZSBvbiBuZXh0IHJlcXVlc3QuXG4gIGV2ZW50LndhaXRVbnRpbCh1cGRhdGUoZXZlbnQucmVxdWVzdCkpO1xufVxuXG5jb25zdCB1cGRhdGUgPSAocmVxdWVzdCkgPT4ge1xuICBsZXQgdXNlQ2FjaGUgPSBpc0ltYWdlVVJMKHJlcXVlc3QudXJsKSA/ICBJTUFHRVNfQ0FDSEUgOiBTVEFUSUNfQ0FDSEU7XG4gIHJldHVybiBjYWNoZXMub3Blbih1c2VDYWNoZSkudGhlbihjYWNoZSA9PiB7XG4gICAgcmV0dXJuIGZldGNoKHJlcXVlc3QpLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgcmV0dXJuIGNhY2hlLnB1dChyZXF1ZXN0LCByZXNwb25zZSk7XG4gICAgfSk7XG4gIH0pO1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKHR5cGVvZiBpdCAhPSAnZnVuY3Rpb24nKSB0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhIGZ1bmN0aW9uIScpO1xuICByZXR1cm4gaXQ7XG59O1xuIiwiLy8gMjIuMS4zLjMxIEFycmF5LnByb3RvdHlwZVtAQHVuc2NvcGFibGVzXVxudmFyIFVOU0NPUEFCTEVTID0gcmVxdWlyZSgnLi9fd2tzJykoJ3Vuc2NvcGFibGVzJyk7XG52YXIgQXJyYXlQcm90byA9IEFycmF5LnByb3RvdHlwZTtcbmlmIChBcnJheVByb3RvW1VOU0NPUEFCTEVTXSA9PSB1bmRlZmluZWQpIHJlcXVpcmUoJy4vX2hpZGUnKShBcnJheVByb3RvLCBVTlNDT1BBQkxFUywge30pO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIEFycmF5UHJvdG9bVU5TQ09QQUJMRVNdW2tleV0gPSB0cnVlO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBhdCA9IHJlcXVpcmUoJy4vX3N0cmluZy1hdCcpKHRydWUpO1xuXG4gLy8gYEFkdmFuY2VTdHJpbmdJbmRleGAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hZHZhbmNlc3RyaW5naW5kZXhcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKFMsIGluZGV4LCB1bmljb2RlKSB7XG4gIHJldHVybiBpbmRleCArICh1bmljb2RlID8gYXQoUywgaW5kZXgpLmxlbmd0aCA6IDEpO1xufTtcbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKCFpc09iamVjdChpdCkpIHRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGFuIG9iamVjdCEnKTtcbiAgcmV0dXJuIGl0O1xufTtcbiIsIi8vIGZhbHNlIC0+IEFycmF5I2luZGV4T2Zcbi8vIHRydWUgIC0+IEFycmF5I2luY2x1ZGVzXG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJyk7XG52YXIgdG9BYnNvbHV0ZUluZGV4ID0gcmVxdWlyZSgnLi9fdG8tYWJzb2x1dGUtaW5kZXgnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKElTX0lOQ0xVREVTKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoJHRoaXMsIGVsLCBmcm9tSW5kZXgpIHtcbiAgICB2YXIgTyA9IHRvSU9iamVjdCgkdGhpcyk7XG4gICAgdmFyIGxlbmd0aCA9IHRvTGVuZ3RoKE8ubGVuZ3RoKTtcbiAgICB2YXIgaW5kZXggPSB0b0Fic29sdXRlSW5kZXgoZnJvbUluZGV4LCBsZW5ndGgpO1xuICAgIHZhciB2YWx1ZTtcbiAgICAvLyBBcnJheSNpbmNsdWRlcyB1c2VzIFNhbWVWYWx1ZVplcm8gZXF1YWxpdHkgYWxnb3JpdGhtXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlbGYtY29tcGFyZVxuICAgIGlmIChJU19JTkNMVURFUyAmJiBlbCAhPSBlbCkgd2hpbGUgKGxlbmd0aCA+IGluZGV4KSB7XG4gICAgICB2YWx1ZSA9IE9baW5kZXgrK107XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlXG4gICAgICBpZiAodmFsdWUgIT0gdmFsdWUpIHJldHVybiB0cnVlO1xuICAgIC8vIEFycmF5I2luZGV4T2YgaWdub3JlcyBob2xlcywgQXJyYXkjaW5jbHVkZXMgLSBub3RcbiAgICB9IGVsc2UgZm9yICg7bGVuZ3RoID4gaW5kZXg7IGluZGV4KyspIGlmIChJU19JTkNMVURFUyB8fCBpbmRleCBpbiBPKSB7XG4gICAgICBpZiAoT1tpbmRleF0gPT09IGVsKSByZXR1cm4gSVNfSU5DTFVERVMgfHwgaW5kZXggfHwgMDtcbiAgICB9IHJldHVybiAhSVNfSU5DTFVERVMgJiYgLTE7XG4gIH07XG59O1xuIiwiLy8gZ2V0dGluZyB0YWcgZnJvbSAxOS4xLjMuNiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nKClcbnZhciBjb2YgPSByZXF1aXJlKCcuL19jb2YnKTtcbnZhciBUQUcgPSByZXF1aXJlKCcuL193a3MnKSgndG9TdHJpbmdUYWcnKTtcbi8vIEVTMyB3cm9uZyBoZXJlXG52YXIgQVJHID0gY29mKGZ1bmN0aW9uICgpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKSA9PSAnQXJndW1lbnRzJztcblxuLy8gZmFsbGJhY2sgZm9yIElFMTEgU2NyaXB0IEFjY2VzcyBEZW5pZWQgZXJyb3JcbnZhciB0cnlHZXQgPSBmdW5jdGlvbiAoaXQsIGtleSkge1xuICB0cnkge1xuICAgIHJldHVybiBpdFtrZXldO1xuICB9IGNhdGNoIChlKSB7IC8qIGVtcHR5ICovIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHZhciBPLCBULCBCO1xuICByZXR1cm4gaXQgPT09IHVuZGVmaW5lZCA/ICdVbmRlZmluZWQnIDogaXQgPT09IG51bGwgPyAnTnVsbCdcbiAgICAvLyBAQHRvU3RyaW5nVGFnIGNhc2VcbiAgICA6IHR5cGVvZiAoVCA9IHRyeUdldChPID0gT2JqZWN0KGl0KSwgVEFHKSkgPT0gJ3N0cmluZycgPyBUXG4gICAgLy8gYnVpbHRpblRhZyBjYXNlXG4gICAgOiBBUkcgPyBjb2YoTylcbiAgICAvLyBFUzMgYXJndW1lbnRzIGZhbGxiYWNrXG4gICAgOiAoQiA9IGNvZihPKSkgPT0gJ09iamVjdCcgJiYgdHlwZW9mIE8uY2FsbGVlID09ICdmdW5jdGlvbicgPyAnQXJndW1lbnRzJyA6IEI7XG59O1xuIiwidmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGl0KS5zbGljZSg4LCAtMSk7XG59O1xuIiwidmFyIGNvcmUgPSBtb2R1bGUuZXhwb3J0cyA9IHsgdmVyc2lvbjogJzIuNi41JyB9O1xuaWYgKHR5cGVvZiBfX2UgPT0gJ251bWJlcicpIF9fZSA9IGNvcmU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcbiIsIi8vIG9wdGlvbmFsIC8gc2ltcGxlIGNvbnRleHQgYmluZGluZ1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGZuLCB0aGF0LCBsZW5ndGgpIHtcbiAgYUZ1bmN0aW9uKGZuKTtcbiAgaWYgKHRoYXQgPT09IHVuZGVmaW5lZCkgcmV0dXJuIGZuO1xuICBzd2l0Y2ggKGxlbmd0aCkge1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmN0aW9uIChhKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhKTtcbiAgICB9O1xuICAgIGNhc2UgMjogcmV0dXJuIGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiKTtcbiAgICB9O1xuICAgIGNhc2UgMzogcmV0dXJuIGZ1bmN0aW9uIChhLCBiLCBjKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiLCBjKTtcbiAgICB9O1xuICB9XG4gIHJldHVybiBmdW5jdGlvbiAoLyogLi4uYXJncyAqLykge1xuICAgIHJldHVybiBmbi5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICB9O1xufTtcbiIsIi8vIDcuMi4xIFJlcXVpcmVPYmplY3RDb2VyY2libGUoYXJndW1lbnQpXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoaXQgPT0gdW5kZWZpbmVkKSB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjYWxsIG1ldGhvZCBvbiAgXCIgKyBpdCk7XG4gIHJldHVybiBpdDtcbn07XG4iLCIvLyBUaGFuaydzIElFOCBmb3IgaGlzIGZ1bm55IGRlZmluZVByb3BlcnR5XG5tb2R1bGUuZXhwb3J0cyA9ICFyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ2EnLCB7IGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gNzsgfSB9KS5hICE9IDc7XG59KTtcbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xudmFyIGRvY3VtZW50ID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuZG9jdW1lbnQ7XG4vLyB0eXBlb2YgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBpcyAnb2JqZWN0JyBpbiBvbGQgSUVcbnZhciBpcyA9IGlzT2JqZWN0KGRvY3VtZW50KSAmJiBpc09iamVjdChkb2N1bWVudC5jcmVhdGVFbGVtZW50KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpcyA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaXQpIDoge307XG59O1xuIiwiLy8gSUUgOC0gZG9uJ3QgZW51bSBidWcga2V5c1xubW9kdWxlLmV4cG9ydHMgPSAoXG4gICdjb25zdHJ1Y3RvcixoYXNPd25Qcm9wZXJ0eSxpc1Byb3RvdHlwZU9mLHByb3BlcnR5SXNFbnVtZXJhYmxlLHRvTG9jYWxlU3RyaW5nLHRvU3RyaW5nLHZhbHVlT2YnXG4pLnNwbGl0KCcsJyk7XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgY29yZSA9IHJlcXVpcmUoJy4vX2NvcmUnKTtcbnZhciBoaWRlID0gcmVxdWlyZSgnLi9faGlkZScpO1xudmFyIHJlZGVmaW5lID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUnKTtcbnZhciBjdHggPSByZXF1aXJlKCcuL19jdHgnKTtcbnZhciBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcblxudmFyICRleHBvcnQgPSBmdW5jdGlvbiAodHlwZSwgbmFtZSwgc291cmNlKSB7XG4gIHZhciBJU19GT1JDRUQgPSB0eXBlICYgJGV4cG9ydC5GO1xuICB2YXIgSVNfR0xPQkFMID0gdHlwZSAmICRleHBvcnQuRztcbiAgdmFyIElTX1NUQVRJQyA9IHR5cGUgJiAkZXhwb3J0LlM7XG4gIHZhciBJU19QUk9UTyA9IHR5cGUgJiAkZXhwb3J0LlA7XG4gIHZhciBJU19CSU5EID0gdHlwZSAmICRleHBvcnQuQjtcbiAgdmFyIHRhcmdldCA9IElTX0dMT0JBTCA/IGdsb2JhbCA6IElTX1NUQVRJQyA/IGdsb2JhbFtuYW1lXSB8fCAoZ2xvYmFsW25hbWVdID0ge30pIDogKGdsb2JhbFtuYW1lXSB8fCB7fSlbUFJPVE9UWVBFXTtcbiAgdmFyIGV4cG9ydHMgPSBJU19HTE9CQUwgPyBjb3JlIDogY29yZVtuYW1lXSB8fCAoY29yZVtuYW1lXSA9IHt9KTtcbiAgdmFyIGV4cFByb3RvID0gZXhwb3J0c1tQUk9UT1RZUEVdIHx8IChleHBvcnRzW1BST1RPVFlQRV0gPSB7fSk7XG4gIHZhciBrZXksIG93biwgb3V0LCBleHA7XG4gIGlmIChJU19HTE9CQUwpIHNvdXJjZSA9IG5hbWU7XG4gIGZvciAoa2V5IGluIHNvdXJjZSkge1xuICAgIC8vIGNvbnRhaW5zIGluIG5hdGl2ZVxuICAgIG93biA9ICFJU19GT1JDRUQgJiYgdGFyZ2V0ICYmIHRhcmdldFtrZXldICE9PSB1bmRlZmluZWQ7XG4gICAgLy8gZXhwb3J0IG5hdGl2ZSBvciBwYXNzZWRcbiAgICBvdXQgPSAob3duID8gdGFyZ2V0IDogc291cmNlKVtrZXldO1xuICAgIC8vIGJpbmQgdGltZXJzIHRvIGdsb2JhbCBmb3IgY2FsbCBmcm9tIGV4cG9ydCBjb250ZXh0XG4gICAgZXhwID0gSVNfQklORCAmJiBvd24gPyBjdHgob3V0LCBnbG9iYWwpIDogSVNfUFJPVE8gJiYgdHlwZW9mIG91dCA9PSAnZnVuY3Rpb24nID8gY3R4KEZ1bmN0aW9uLmNhbGwsIG91dCkgOiBvdXQ7XG4gICAgLy8gZXh0ZW5kIGdsb2JhbFxuICAgIGlmICh0YXJnZXQpIHJlZGVmaW5lKHRhcmdldCwga2V5LCBvdXQsIHR5cGUgJiAkZXhwb3J0LlUpO1xuICAgIC8vIGV4cG9ydFxuICAgIGlmIChleHBvcnRzW2tleV0gIT0gb3V0KSBoaWRlKGV4cG9ydHMsIGtleSwgZXhwKTtcbiAgICBpZiAoSVNfUFJPVE8gJiYgZXhwUHJvdG9ba2V5XSAhPSBvdXQpIGV4cFByb3RvW2tleV0gPSBvdXQ7XG4gIH1cbn07XG5nbG9iYWwuY29yZSA9IGNvcmU7XG4vLyB0eXBlIGJpdG1hcFxuJGV4cG9ydC5GID0gMTsgICAvLyBmb3JjZWRcbiRleHBvcnQuRyA9IDI7ICAgLy8gZ2xvYmFsXG4kZXhwb3J0LlMgPSA0OyAgIC8vIHN0YXRpY1xuJGV4cG9ydC5QID0gODsgICAvLyBwcm90b1xuJGV4cG9ydC5CID0gMTY7ICAvLyBiaW5kXG4kZXhwb3J0LlcgPSAzMjsgIC8vIHdyYXBcbiRleHBvcnQuVSA9IDY0OyAgLy8gc2FmZVxuJGV4cG9ydC5SID0gMTI4OyAvLyByZWFsIHByb3RvIG1ldGhvZCBmb3IgYGxpYnJhcnlgXG5tb2R1bGUuZXhwb3J0cyA9ICRleHBvcnQ7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChleGVjKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZXhlYygpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG5yZXF1aXJlKCcuL2VzNi5yZWdleHAuZXhlYycpO1xudmFyIHJlZGVmaW5lID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUnKTtcbnZhciBoaWRlID0gcmVxdWlyZSgnLi9faGlkZScpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi9fZmFpbHMnKTtcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xudmFyIHdrcyA9IHJlcXVpcmUoJy4vX3drcycpO1xudmFyIHJlZ2V4cEV4ZWMgPSByZXF1aXJlKCcuL19yZWdleHAtZXhlYycpO1xuXG52YXIgU1BFQ0lFUyA9IHdrcygnc3BlY2llcycpO1xuXG52YXIgUkVQTEFDRV9TVVBQT1JUU19OQU1FRF9HUk9VUFMgPSAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICAvLyAjcmVwbGFjZSBuZWVkcyBidWlsdC1pbiBzdXBwb3J0IGZvciBuYW1lZCBncm91cHMuXG4gIC8vICNtYXRjaCB3b3JrcyBmaW5lIGJlY2F1c2UgaXQganVzdCByZXR1cm4gdGhlIGV4ZWMgcmVzdWx0cywgZXZlbiBpZiBpdCBoYXNcbiAgLy8gYSBcImdyb3BzXCIgcHJvcGVydHkuXG4gIHZhciByZSA9IC8uLztcbiAgcmUuZXhlYyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgcmVzdWx0Lmdyb3VwcyA9IHsgYTogJzcnIH07XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcbiAgcmV0dXJuICcnLnJlcGxhY2UocmUsICckPGE+JykgIT09ICc3Jztcbn0pO1xuXG52YXIgU1BMSVRfV09SS1NfV0lUSF9PVkVSV1JJVFRFTl9FWEVDID0gKGZ1bmN0aW9uICgpIHtcbiAgLy8gQ2hyb21lIDUxIGhhcyBhIGJ1Z2d5IFwic3BsaXRcIiBpbXBsZW1lbnRhdGlvbiB3aGVuIFJlZ0V4cCNleGVjICE9PSBuYXRpdmVFeGVjXG4gIHZhciByZSA9IC8oPzopLztcbiAgdmFyIG9yaWdpbmFsRXhlYyA9IHJlLmV4ZWM7XG4gIHJlLmV4ZWMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBvcmlnaW5hbEV4ZWMuYXBwbHkodGhpcywgYXJndW1lbnRzKTsgfTtcbiAgdmFyIHJlc3VsdCA9ICdhYicuc3BsaXQocmUpO1xuICByZXR1cm4gcmVzdWx0Lmxlbmd0aCA9PT0gMiAmJiByZXN1bHRbMF0gPT09ICdhJyAmJiByZXN1bHRbMV0gPT09ICdiJztcbn0pKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKEtFWSwgbGVuZ3RoLCBleGVjKSB7XG4gIHZhciBTWU1CT0wgPSB3a3MoS0VZKTtcblxuICB2YXIgREVMRUdBVEVTX1RPX1NZTUJPTCA9ICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gICAgLy8gU3RyaW5nIG1ldGhvZHMgY2FsbCBzeW1ib2wtbmFtZWQgUmVnRXAgbWV0aG9kc1xuICAgIHZhciBPID0ge307XG4gICAgT1tTWU1CT0xdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gNzsgfTtcbiAgICByZXR1cm4gJydbS0VZXShPKSAhPSA3O1xuICB9KTtcblxuICB2YXIgREVMRUdBVEVTX1RPX0VYRUMgPSBERUxFR0FURVNfVE9fU1lNQk9MID8gIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgICAvLyBTeW1ib2wtbmFtZWQgUmVnRXhwIG1ldGhvZHMgY2FsbCAuZXhlY1xuICAgIHZhciBleGVjQ2FsbGVkID0gZmFsc2U7XG4gICAgdmFyIHJlID0gL2EvO1xuICAgIHJlLmV4ZWMgPSBmdW5jdGlvbiAoKSB7IGV4ZWNDYWxsZWQgPSB0cnVlOyByZXR1cm4gbnVsbDsgfTtcbiAgICBpZiAoS0VZID09PSAnc3BsaXQnKSB7XG4gICAgICAvLyBSZWdFeHBbQEBzcGxpdF0gZG9lc24ndCBjYWxsIHRoZSByZWdleCdzIGV4ZWMgbWV0aG9kLCBidXQgZmlyc3QgY3JlYXRlc1xuICAgICAgLy8gYSBuZXcgb25lLiBXZSBuZWVkIHRvIHJldHVybiB0aGUgcGF0Y2hlZCByZWdleCB3aGVuIGNyZWF0aW5nIHRoZSBuZXcgb25lLlxuICAgICAgcmUuY29uc3RydWN0b3IgPSB7fTtcbiAgICAgIHJlLmNvbnN0cnVjdG9yW1NQRUNJRVNdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gcmU7IH07XG4gICAgfVxuICAgIHJlW1NZTUJPTF0oJycpO1xuICAgIHJldHVybiAhZXhlY0NhbGxlZDtcbiAgfSkgOiB1bmRlZmluZWQ7XG5cbiAgaWYgKFxuICAgICFERUxFR0FURVNfVE9fU1lNQk9MIHx8XG4gICAgIURFTEVHQVRFU19UT19FWEVDIHx8XG4gICAgKEtFWSA9PT0gJ3JlcGxhY2UnICYmICFSRVBMQUNFX1NVUFBPUlRTX05BTUVEX0dST1VQUykgfHxcbiAgICAoS0VZID09PSAnc3BsaXQnICYmICFTUExJVF9XT1JLU19XSVRIX09WRVJXUklUVEVOX0VYRUMpXG4gICkge1xuICAgIHZhciBuYXRpdmVSZWdFeHBNZXRob2QgPSAvLi9bU1lNQk9MXTtcbiAgICB2YXIgZm5zID0gZXhlYyhcbiAgICAgIGRlZmluZWQsXG4gICAgICBTWU1CT0wsXG4gICAgICAnJ1tLRVldLFxuICAgICAgZnVuY3Rpb24gbWF5YmVDYWxsTmF0aXZlKG5hdGl2ZU1ldGhvZCwgcmVnZXhwLCBzdHIsIGFyZzIsIGZvcmNlU3RyaW5nTWV0aG9kKSB7XG4gICAgICAgIGlmIChyZWdleHAuZXhlYyA9PT0gcmVnZXhwRXhlYykge1xuICAgICAgICAgIGlmIChERUxFR0FURVNfVE9fU1lNQk9MICYmICFmb3JjZVN0cmluZ01ldGhvZCkge1xuICAgICAgICAgICAgLy8gVGhlIG5hdGl2ZSBTdHJpbmcgbWV0aG9kIGFscmVhZHkgZGVsZWdhdGVzIHRvIEBAbWV0aG9kICh0aGlzXG4gICAgICAgICAgICAvLyBwb2x5ZmlsbGVkIGZ1bmN0aW9uKSwgbGVhc2luZyB0byBpbmZpbml0ZSByZWN1cnNpb24uXG4gICAgICAgICAgICAvLyBXZSBhdm9pZCBpdCBieSBkaXJlY3RseSBjYWxsaW5nIHRoZSBuYXRpdmUgQEBtZXRob2QgbWV0aG9kLlxuICAgICAgICAgICAgcmV0dXJuIHsgZG9uZTogdHJ1ZSwgdmFsdWU6IG5hdGl2ZVJlZ0V4cE1ldGhvZC5jYWxsKHJlZ2V4cCwgc3RyLCBhcmcyKSB9O1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4geyBkb25lOiB0cnVlLCB2YWx1ZTogbmF0aXZlTWV0aG9kLmNhbGwoc3RyLCByZWdleHAsIGFyZzIpIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgZG9uZTogZmFsc2UgfTtcbiAgICAgIH1cbiAgICApO1xuICAgIHZhciBzdHJmbiA9IGZuc1swXTtcbiAgICB2YXIgcnhmbiA9IGZuc1sxXTtcblxuICAgIHJlZGVmaW5lKFN0cmluZy5wcm90b3R5cGUsIEtFWSwgc3RyZm4pO1xuICAgIGhpZGUoUmVnRXhwLnByb3RvdHlwZSwgU1lNQk9MLCBsZW5ndGggPT0gMlxuICAgICAgLy8gMjEuMi41LjggUmVnRXhwLnByb3RvdHlwZVtAQHJlcGxhY2VdKHN0cmluZywgcmVwbGFjZVZhbHVlKVxuICAgICAgLy8gMjEuMi41LjExIFJlZ0V4cC5wcm90b3R5cGVbQEBzcGxpdF0oc3RyaW5nLCBsaW1pdClcbiAgICAgID8gZnVuY3Rpb24gKHN0cmluZywgYXJnKSB7IHJldHVybiByeGZuLmNhbGwoc3RyaW5nLCB0aGlzLCBhcmcpOyB9XG4gICAgICAvLyAyMS4yLjUuNiBSZWdFeHAucHJvdG90eXBlW0BAbWF0Y2hdKHN0cmluZylcbiAgICAgIC8vIDIxLjIuNS45IFJlZ0V4cC5wcm90b3R5cGVbQEBzZWFyY2hdKHN0cmluZylcbiAgICAgIDogZnVuY3Rpb24gKHN0cmluZykgeyByZXR1cm4gcnhmbi5jYWxsKHN0cmluZywgdGhpcyk7IH1cbiAgICApO1xuICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuLy8gMjEuMi41LjMgZ2V0IFJlZ0V4cC5wcm90b3R5cGUuZmxhZ3NcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciB0aGF0ID0gYW5PYmplY3QodGhpcyk7XG4gIHZhciByZXN1bHQgPSAnJztcbiAgaWYgKHRoYXQuZ2xvYmFsKSByZXN1bHQgKz0gJ2cnO1xuICBpZiAodGhhdC5pZ25vcmVDYXNlKSByZXN1bHQgKz0gJ2knO1xuICBpZiAodGhhdC5tdWx0aWxpbmUpIHJlc3VsdCArPSAnbSc7XG4gIGlmICh0aGF0LnVuaWNvZGUpIHJlc3VsdCArPSAndSc7XG4gIGlmICh0aGF0LnN0aWNreSkgcmVzdWx0ICs9ICd5JztcbiAgcmV0dXJuIHJlc3VsdDtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX3NoYXJlZCcpKCduYXRpdmUtZnVuY3Rpb24tdG8tc3RyaW5nJywgRnVuY3Rpb24udG9TdHJpbmcpO1xuIiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzg2I2lzc3VlY29tbWVudC0xMTU3NTkwMjhcbnZhciBnbG9iYWwgPSBtb2R1bGUuZXhwb3J0cyA9IHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93Lk1hdGggPT0gTWF0aFxuICA/IHdpbmRvdyA6IHR5cGVvZiBzZWxmICE9ICd1bmRlZmluZWQnICYmIHNlbGYuTWF0aCA9PSBNYXRoID8gc2VsZlxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmV3LWZ1bmNcbiAgOiBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuaWYgKHR5cGVvZiBfX2cgPT0gJ251bWJlcicpIF9fZyA9IGdsb2JhbDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuIiwidmFyIGhhc093blByb3BlcnR5ID0ge30uaGFzT3duUHJvcGVydHk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCwga2V5KSB7XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGl0LCBrZXkpO1xufTtcbiIsInZhciBkUCA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpO1xudmFyIGNyZWF0ZURlc2MgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBmdW5jdGlvbiAob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIHJldHVybiBkUC5mKG9iamVjdCwga2V5LCBjcmVhdGVEZXNjKDEsIHZhbHVlKSk7XG59IDogZnVuY3Rpb24gKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICByZXR1cm4gb2JqZWN0O1xufTtcbiIsInZhciBkb2N1bWVudCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLmRvY3VtZW50O1xubW9kdWxlLmV4cG9ydHMgPSBkb2N1bWVudCAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4iLCJtb2R1bGUuZXhwb3J0cyA9ICFyZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpICYmICFyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyZXF1aXJlKCcuL19kb20tY3JlYXRlJykoJ2RpdicpLCAnYScsIHsgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9IH0pLmEgIT0gNztcbn0pO1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG52YXIgc2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKCcuL19zZXQtcHJvdG8nKS5zZXQ7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh0aGF0LCB0YXJnZXQsIEMpIHtcbiAgdmFyIFMgPSB0YXJnZXQuY29uc3RydWN0b3I7XG4gIHZhciBQO1xuICBpZiAoUyAhPT0gQyAmJiB0eXBlb2YgUyA9PSAnZnVuY3Rpb24nICYmIChQID0gUy5wcm90b3R5cGUpICE9PSBDLnByb3RvdHlwZSAmJiBpc09iamVjdChQKSAmJiBzZXRQcm90b3R5cGVPZikge1xuICAgIHNldFByb3RvdHlwZU9mKHRoYXQsIFApO1xuICB9IHJldHVybiB0aGF0O1xufTtcbiIsIi8vIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgYW5kIG5vbi1lbnVtZXJhYmxlIG9sZCBWOCBzdHJpbmdzXG52YXIgY29mID0gcmVxdWlyZSgnLi9fY29mJyk7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdCgneicpLnByb3BlcnR5SXNFbnVtZXJhYmxlKDApID8gT2JqZWN0IDogZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBjb2YoaXQpID09ICdTdHJpbmcnID8gaXQuc3BsaXQoJycpIDogT2JqZWN0KGl0KTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdHlwZW9mIGl0ID09PSAnb2JqZWN0JyA/IGl0ICE9PSBudWxsIDogdHlwZW9mIGl0ID09PSAnZnVuY3Rpb24nO1xufTtcbiIsIi8vIDcuMi44IElzUmVnRXhwKGFyZ3VtZW50KVxudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG52YXIgY29mID0gcmVxdWlyZSgnLi9fY29mJyk7XG52YXIgTUFUQ0ggPSByZXF1aXJlKCcuL193a3MnKSgnbWF0Y2gnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHZhciBpc1JlZ0V4cDtcbiAgcmV0dXJuIGlzT2JqZWN0KGl0KSAmJiAoKGlzUmVnRXhwID0gaXRbTUFUQ0hdKSAhPT0gdW5kZWZpbmVkID8gISFpc1JlZ0V4cCA6IGNvZihpdCkgPT0gJ1JlZ0V4cCcpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBjcmVhdGUgPSByZXF1aXJlKCcuL19vYmplY3QtY3JlYXRlJyk7XG52YXIgZGVzY3JpcHRvciA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcbnZhciBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4vX3NldC10by1zdHJpbmctdGFnJyk7XG52YXIgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcblxuLy8gMjUuMS4yLjEuMSAlSXRlcmF0b3JQcm90b3R5cGUlW0BAaXRlcmF0b3JdKClcbnJlcXVpcmUoJy4vX2hpZGUnKShJdGVyYXRvclByb3RvdHlwZSwgcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJyksIGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgTkFNRSwgbmV4dCkge1xuICBDb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBjcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUsIHsgbmV4dDogZGVzY3JpcHRvcigxLCBuZXh0KSB9KTtcbiAgc2V0VG9TdHJpbmdUYWcoQ29uc3RydWN0b3IsIE5BTUUgKyAnIEl0ZXJhdG9yJyk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIExJQlJBUlkgPSByZXF1aXJlKCcuL19saWJyYXJ5Jyk7XG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyIHJlZGVmaW5lID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUnKTtcbnZhciBoaWRlID0gcmVxdWlyZSgnLi9faGlkZScpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpO1xudmFyICRpdGVyQ3JlYXRlID0gcmVxdWlyZSgnLi9faXRlci1jcmVhdGUnKTtcbnZhciBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4vX3NldC10by1zdHJpbmctdGFnJyk7XG52YXIgZ2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKCcuL19vYmplY3QtZ3BvJyk7XG52YXIgSVRFUkFUT1IgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKTtcbnZhciBCVUdHWSA9ICEoW10ua2V5cyAmJiAnbmV4dCcgaW4gW10ua2V5cygpKTsgLy8gU2FmYXJpIGhhcyBidWdneSBpdGVyYXRvcnMgdy9vIGBuZXh0YFxudmFyIEZGX0lURVJBVE9SID0gJ0BAaXRlcmF0b3InO1xudmFyIEtFWVMgPSAna2V5cyc7XG52YXIgVkFMVUVTID0gJ3ZhbHVlcyc7XG5cbnZhciByZXR1cm5UaGlzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoQmFzZSwgTkFNRSwgQ29uc3RydWN0b3IsIG5leHQsIERFRkFVTFQsIElTX1NFVCwgRk9SQ0VEKSB7XG4gICRpdGVyQ3JlYXRlKENvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KTtcbiAgdmFyIGdldE1ldGhvZCA9IGZ1bmN0aW9uIChraW5kKSB7XG4gICAgaWYgKCFCVUdHWSAmJiBraW5kIGluIHByb3RvKSByZXR1cm4gcHJvdG9ba2luZF07XG4gICAgc3dpdGNoIChraW5kKSB7XG4gICAgICBjYXNlIEtFWVM6IHJldHVybiBmdW5jdGlvbiBrZXlzKCkgeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICAgICAgY2FzZSBWQUxVRVM6IHJldHVybiBmdW5jdGlvbiB2YWx1ZXMoKSB7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gICAgfSByZXR1cm4gZnVuY3Rpb24gZW50cmllcygpIHsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgfTtcbiAgdmFyIFRBRyA9IE5BTUUgKyAnIEl0ZXJhdG9yJztcbiAgdmFyIERFRl9WQUxVRVMgPSBERUZBVUxUID09IFZBTFVFUztcbiAgdmFyIFZBTFVFU19CVUcgPSBmYWxzZTtcbiAgdmFyIHByb3RvID0gQmFzZS5wcm90b3R5cGU7XG4gIHZhciAkbmF0aXZlID0gcHJvdG9bSVRFUkFUT1JdIHx8IHByb3RvW0ZGX0lURVJBVE9SXSB8fCBERUZBVUxUICYmIHByb3RvW0RFRkFVTFRdO1xuICB2YXIgJGRlZmF1bHQgPSAkbmF0aXZlIHx8IGdldE1ldGhvZChERUZBVUxUKTtcbiAgdmFyICRlbnRyaWVzID0gREVGQVVMVCA/ICFERUZfVkFMVUVTID8gJGRlZmF1bHQgOiBnZXRNZXRob2QoJ2VudHJpZXMnKSA6IHVuZGVmaW5lZDtcbiAgdmFyICRhbnlOYXRpdmUgPSBOQU1FID09ICdBcnJheScgPyBwcm90by5lbnRyaWVzIHx8ICRuYXRpdmUgOiAkbmF0aXZlO1xuICB2YXIgbWV0aG9kcywga2V5LCBJdGVyYXRvclByb3RvdHlwZTtcbiAgLy8gRml4IG5hdGl2ZVxuICBpZiAoJGFueU5hdGl2ZSkge1xuICAgIEl0ZXJhdG9yUHJvdG90eXBlID0gZ2V0UHJvdG90eXBlT2YoJGFueU5hdGl2ZS5jYWxsKG5ldyBCYXNlKCkpKTtcbiAgICBpZiAoSXRlcmF0b3JQcm90b3R5cGUgIT09IE9iamVjdC5wcm90b3R5cGUgJiYgSXRlcmF0b3JQcm90b3R5cGUubmV4dCkge1xuICAgICAgLy8gU2V0IEBAdG9TdHJpbmdUYWcgdG8gbmF0aXZlIGl0ZXJhdG9yc1xuICAgICAgc2V0VG9TdHJpbmdUYWcoSXRlcmF0b3JQcm90b3R5cGUsIFRBRywgdHJ1ZSk7XG4gICAgICAvLyBmaXggZm9yIHNvbWUgb2xkIGVuZ2luZXNcbiAgICAgIGlmICghTElCUkFSWSAmJiB0eXBlb2YgSXRlcmF0b3JQcm90b3R5cGVbSVRFUkFUT1JdICE9ICdmdW5jdGlvbicpIGhpZGUoSXRlcmF0b3JQcm90b3R5cGUsIElURVJBVE9SLCByZXR1cm5UaGlzKTtcbiAgICB9XG4gIH1cbiAgLy8gZml4IEFycmF5I3t2YWx1ZXMsIEBAaXRlcmF0b3J9Lm5hbWUgaW4gVjggLyBGRlxuICBpZiAoREVGX1ZBTFVFUyAmJiAkbmF0aXZlICYmICRuYXRpdmUubmFtZSAhPT0gVkFMVUVTKSB7XG4gICAgVkFMVUVTX0JVRyA9IHRydWU7XG4gICAgJGRlZmF1bHQgPSBmdW5jdGlvbiB2YWx1ZXMoKSB7IHJldHVybiAkbmF0aXZlLmNhbGwodGhpcyk7IH07XG4gIH1cbiAgLy8gRGVmaW5lIGl0ZXJhdG9yXG4gIGlmICgoIUxJQlJBUlkgfHwgRk9SQ0VEKSAmJiAoQlVHR1kgfHwgVkFMVUVTX0JVRyB8fCAhcHJvdG9bSVRFUkFUT1JdKSkge1xuICAgIGhpZGUocHJvdG8sIElURVJBVE9SLCAkZGVmYXVsdCk7XG4gIH1cbiAgLy8gUGx1ZyBmb3IgbGlicmFyeVxuICBJdGVyYXRvcnNbTkFNRV0gPSAkZGVmYXVsdDtcbiAgSXRlcmF0b3JzW1RBR10gPSByZXR1cm5UaGlzO1xuICBpZiAoREVGQVVMVCkge1xuICAgIG1ldGhvZHMgPSB7XG4gICAgICB2YWx1ZXM6IERFRl9WQUxVRVMgPyAkZGVmYXVsdCA6IGdldE1ldGhvZChWQUxVRVMpLFxuICAgICAga2V5czogSVNfU0VUID8gJGRlZmF1bHQgOiBnZXRNZXRob2QoS0VZUyksXG4gICAgICBlbnRyaWVzOiAkZW50cmllc1xuICAgIH07XG4gICAgaWYgKEZPUkNFRCkgZm9yIChrZXkgaW4gbWV0aG9kcykge1xuICAgICAgaWYgKCEoa2V5IGluIHByb3RvKSkgcmVkZWZpbmUocHJvdG8sIGtleSwgbWV0aG9kc1trZXldKTtcbiAgICB9IGVsc2UgJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LkYgKiAoQlVHR1kgfHwgVkFMVUVTX0JVRyksIE5BTUUsIG1ldGhvZHMpO1xuICB9XG4gIHJldHVybiBtZXRob2RzO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGRvbmUsIHZhbHVlKSB7XG4gIHJldHVybiB7IHZhbHVlOiB2YWx1ZSwgZG9uZTogISFkb25lIH07XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7fTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZmFsc2U7XG4iLCIvLyAxOS4xLjIuMiAvIDE1LjIuMy41IE9iamVjdC5jcmVhdGUoTyBbLCBQcm9wZXJ0aWVzXSlcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIGRQcyA9IHJlcXVpcmUoJy4vX29iamVjdC1kcHMnKTtcbnZhciBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKTtcbnZhciBJRV9QUk9UTyA9IHJlcXVpcmUoJy4vX3NoYXJlZC1rZXknKSgnSUVfUFJPVE8nKTtcbnZhciBFbXB0eSA9IGZ1bmN0aW9uICgpIHsgLyogZW1wdHkgKi8gfTtcbnZhciBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcblxuLy8gQ3JlYXRlIG9iamVjdCB3aXRoIGZha2UgYG51bGxgIHByb3RvdHlwZTogdXNlIGlmcmFtZSBPYmplY3Qgd2l0aCBjbGVhcmVkIHByb3RvdHlwZVxudmFyIGNyZWF0ZURpY3QgPSBmdW5jdGlvbiAoKSB7XG4gIC8vIFRocmFzaCwgd2FzdGUgYW5kIHNvZG9teTogSUUgR0MgYnVnXG4gIHZhciBpZnJhbWUgPSByZXF1aXJlKCcuL19kb20tY3JlYXRlJykoJ2lmcmFtZScpO1xuICB2YXIgaSA9IGVudW1CdWdLZXlzLmxlbmd0aDtcbiAgdmFyIGx0ID0gJzwnO1xuICB2YXIgZ3QgPSAnPic7XG4gIHZhciBpZnJhbWVEb2N1bWVudDtcbiAgaWZyYW1lLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIHJlcXVpcmUoJy4vX2h0bWwnKS5hcHBlbmRDaGlsZChpZnJhbWUpO1xuICBpZnJhbWUuc3JjID0gJ2phdmFzY3JpcHQ6JzsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1zY3JpcHQtdXJsXG4gIC8vIGNyZWF0ZURpY3QgPSBpZnJhbWUuY29udGVudFdpbmRvdy5PYmplY3Q7XG4gIC8vIGh0bWwucmVtb3ZlQ2hpbGQoaWZyYW1lKTtcbiAgaWZyYW1lRG9jdW1lbnQgPSBpZnJhbWUuY29udGVudFdpbmRvdy5kb2N1bWVudDtcbiAgaWZyYW1lRG9jdW1lbnQub3BlbigpO1xuICBpZnJhbWVEb2N1bWVudC53cml0ZShsdCArICdzY3JpcHQnICsgZ3QgKyAnZG9jdW1lbnQuRj1PYmplY3QnICsgbHQgKyAnL3NjcmlwdCcgKyBndCk7XG4gIGlmcmFtZURvY3VtZW50LmNsb3NlKCk7XG4gIGNyZWF0ZURpY3QgPSBpZnJhbWVEb2N1bWVudC5GO1xuICB3aGlsZSAoaS0tKSBkZWxldGUgY3JlYXRlRGljdFtQUk9UT1RZUEVdW2VudW1CdWdLZXlzW2ldXTtcbiAgcmV0dXJuIGNyZWF0ZURpY3QoKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmNyZWF0ZSB8fCBmdW5jdGlvbiBjcmVhdGUoTywgUHJvcGVydGllcykge1xuICB2YXIgcmVzdWx0O1xuICBpZiAoTyAhPT0gbnVsbCkge1xuICAgIEVtcHR5W1BST1RPVFlQRV0gPSBhbk9iamVjdChPKTtcbiAgICByZXN1bHQgPSBuZXcgRW1wdHkoKTtcbiAgICBFbXB0eVtQUk9UT1RZUEVdID0gbnVsbDtcbiAgICAvLyBhZGQgXCJfX3Byb3RvX19cIiBmb3IgT2JqZWN0LmdldFByb3RvdHlwZU9mIHBvbHlmaWxsXG4gICAgcmVzdWx0W0lFX1BST1RPXSA9IE87XG4gIH0gZWxzZSByZXN1bHQgPSBjcmVhdGVEaWN0KCk7XG4gIHJldHVybiBQcm9wZXJ0aWVzID09PSB1bmRlZmluZWQgPyByZXN1bHQgOiBkUHMocmVzdWx0LCBQcm9wZXJ0aWVzKTtcbn07XG4iLCJ2YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBJRThfRE9NX0RFRklORSA9IHJlcXVpcmUoJy4vX2llOC1kb20tZGVmaW5lJyk7XG52YXIgdG9QcmltaXRpdmUgPSByZXF1aXJlKCcuL190by1wcmltaXRpdmUnKTtcbnZhciBkUCA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcblxuZXhwb3J0cy5mID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpIHtcbiAgYW5PYmplY3QoTyk7XG4gIFAgPSB0b1ByaW1pdGl2ZShQLCB0cnVlKTtcbiAgYW5PYmplY3QoQXR0cmlidXRlcyk7XG4gIGlmIChJRThfRE9NX0RFRklORSkgdHJ5IHtcbiAgICByZXR1cm4gZFAoTywgUCwgQXR0cmlidXRlcyk7XG4gIH0gY2F0Y2ggKGUpIHsgLyogZW1wdHkgKi8gfVxuICBpZiAoJ2dldCcgaW4gQXR0cmlidXRlcyB8fCAnc2V0JyBpbiBBdHRyaWJ1dGVzKSB0aHJvdyBUeXBlRXJyb3IoJ0FjY2Vzc29ycyBub3Qgc3VwcG9ydGVkIScpO1xuICBpZiAoJ3ZhbHVlJyBpbiBBdHRyaWJ1dGVzKSBPW1BdID0gQXR0cmlidXRlcy52YWx1ZTtcbiAgcmV0dXJuIE87XG59O1xuIiwidmFyIGRQID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBnZXRLZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gT2JqZWN0LmRlZmluZVByb3BlcnRpZXMgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKE8sIFByb3BlcnRpZXMpIHtcbiAgYW5PYmplY3QoTyk7XG4gIHZhciBrZXlzID0gZ2V0S2V5cyhQcm9wZXJ0aWVzKTtcbiAgdmFyIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICB2YXIgaSA9IDA7XG4gIHZhciBQO1xuICB3aGlsZSAobGVuZ3RoID4gaSkgZFAuZihPLCBQID0ga2V5c1tpKytdLCBQcm9wZXJ0aWVzW1BdKTtcbiAgcmV0dXJuIE87XG59O1xuIiwidmFyIHBJRSA9IHJlcXVpcmUoJy4vX29iamVjdC1waWUnKTtcbnZhciBjcmVhdGVEZXNjID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpO1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcbnZhciB0b1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpO1xudmFyIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi9faWU4LWRvbS1kZWZpbmUnKTtcbnZhciBnT1BEID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcblxuZXhwb3J0cy5mID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IGdPUEQgOiBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUCkge1xuICBPID0gdG9JT2JqZWN0KE8pO1xuICBQID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGlmIChJRThfRE9NX0RFRklORSkgdHJ5IHtcbiAgICByZXR1cm4gZ09QRChPLCBQKTtcbiAgfSBjYXRjaCAoZSkgeyAvKiBlbXB0eSAqLyB9XG4gIGlmIChoYXMoTywgUCkpIHJldHVybiBjcmVhdGVEZXNjKCFwSUUuZi5jYWxsKE8sIFApLCBPW1BdKTtcbn07XG4iLCIvLyAxOS4xLjIuNyAvIDE1LjIuMy40IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKE8pXG52YXIgJGtleXMgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cy1pbnRlcm5hbCcpO1xudmFyIGhpZGRlbktleXMgPSByZXF1aXJlKCcuL19lbnVtLWJ1Zy1rZXlzJykuY29uY2F0KCdsZW5ndGgnLCAncHJvdG90eXBlJyk7XG5cbmV4cG9ydHMuZiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzIHx8IGZ1bmN0aW9uIGdldE93blByb3BlcnR5TmFtZXMoTykge1xuICByZXR1cm4gJGtleXMoTywgaGlkZGVuS2V5cyk7XG59O1xuIiwiLy8gMTkuMS4yLjkgLyAxNS4yLjMuMiBPYmplY3QuZ2V0UHJvdG90eXBlT2YoTylcbnZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpO1xudmFyIElFX1BST1RPID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpO1xudmFyIE9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YgfHwgZnVuY3Rpb24gKE8pIHtcbiAgTyA9IHRvT2JqZWN0KE8pO1xuICBpZiAoaGFzKE8sIElFX1BST1RPKSkgcmV0dXJuIE9bSUVfUFJPVE9dO1xuICBpZiAodHlwZW9mIE8uY29uc3RydWN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBPIGluc3RhbmNlb2YgTy5jb25zdHJ1Y3Rvcikge1xuICAgIHJldHVybiBPLmNvbnN0cnVjdG9yLnByb3RvdHlwZTtcbiAgfSByZXR1cm4gTyBpbnN0YW5jZW9mIE9iamVjdCA/IE9iamVjdFByb3RvIDogbnVsbDtcbn07XG4iLCJ2YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xudmFyIGFycmF5SW5kZXhPZiA9IHJlcXVpcmUoJy4vX2FycmF5LWluY2x1ZGVzJykoZmFsc2UpO1xudmFyIElFX1BST1RPID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmplY3QsIG5hbWVzKSB7XG4gIHZhciBPID0gdG9JT2JqZWN0KG9iamVjdCk7XG4gIHZhciBpID0gMDtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICB2YXIga2V5O1xuICBmb3IgKGtleSBpbiBPKSBpZiAoa2V5ICE9IElFX1BST1RPKSBoYXMoTywga2V5KSAmJiByZXN1bHQucHVzaChrZXkpO1xuICAvLyBEb24ndCBlbnVtIGJ1ZyAmIGhpZGRlbiBrZXlzXG4gIHdoaWxlIChuYW1lcy5sZW5ndGggPiBpKSBpZiAoaGFzKE8sIGtleSA9IG5hbWVzW2krK10pKSB7XG4gICAgfmFycmF5SW5kZXhPZihyZXN1bHQsIGtleSkgfHwgcmVzdWx0LnB1c2goa2V5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcbiIsIi8vIDE5LjEuMi4xNCAvIDE1LjIuMy4xNCBPYmplY3Qua2V5cyhPKVxudmFyICRrZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMtaW50ZXJuYWwnKTtcbnZhciBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiBrZXlzKE8pIHtcbiAgcmV0dXJuICRrZXlzKE8sIGVudW1CdWdLZXlzKTtcbn07XG4iLCJleHBvcnRzLmYgPSB7fS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGJpdG1hcCwgdmFsdWUpIHtcbiAgcmV0dXJuIHtcbiAgICBlbnVtZXJhYmxlOiAhKGJpdG1hcCAmIDEpLFxuICAgIGNvbmZpZ3VyYWJsZTogIShiaXRtYXAgJiAyKSxcbiAgICB3cml0YWJsZTogIShiaXRtYXAgJiA0KSxcbiAgICB2YWx1ZTogdmFsdWVcbiAgfTtcbn07XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgaGlkZSA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciBTUkMgPSByZXF1aXJlKCcuL191aWQnKSgnc3JjJyk7XG52YXIgJHRvU3RyaW5nID0gcmVxdWlyZSgnLi9fZnVuY3Rpb24tdG8tc3RyaW5nJyk7XG52YXIgVE9fU1RSSU5HID0gJ3RvU3RyaW5nJztcbnZhciBUUEwgPSAoJycgKyAkdG9TdHJpbmcpLnNwbGl0KFRPX1NUUklORyk7XG5cbnJlcXVpcmUoJy4vX2NvcmUnKS5pbnNwZWN0U291cmNlID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiAkdG9TdHJpbmcuY2FsbChpdCk7XG59O1xuXG4obW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoTywga2V5LCB2YWwsIHNhZmUpIHtcbiAgdmFyIGlzRnVuY3Rpb24gPSB0eXBlb2YgdmFsID09ICdmdW5jdGlvbic7XG4gIGlmIChpc0Z1bmN0aW9uKSBoYXModmFsLCAnbmFtZScpIHx8IGhpZGUodmFsLCAnbmFtZScsIGtleSk7XG4gIGlmIChPW2tleV0gPT09IHZhbCkgcmV0dXJuO1xuICBpZiAoaXNGdW5jdGlvbikgaGFzKHZhbCwgU1JDKSB8fCBoaWRlKHZhbCwgU1JDLCBPW2tleV0gPyAnJyArIE9ba2V5XSA6IFRQTC5qb2luKFN0cmluZyhrZXkpKSk7XG4gIGlmIChPID09PSBnbG9iYWwpIHtcbiAgICBPW2tleV0gPSB2YWw7XG4gIH0gZWxzZSBpZiAoIXNhZmUpIHtcbiAgICBkZWxldGUgT1trZXldO1xuICAgIGhpZGUoTywga2V5LCB2YWwpO1xuICB9IGVsc2UgaWYgKE9ba2V5XSkge1xuICAgIE9ba2V5XSA9IHZhbDtcbiAgfSBlbHNlIHtcbiAgICBoaWRlKE8sIGtleSwgdmFsKTtcbiAgfVxuLy8gYWRkIGZha2UgRnVuY3Rpb24jdG9TdHJpbmcgZm9yIGNvcnJlY3Qgd29yayB3cmFwcGVkIG1ldGhvZHMgLyBjb25zdHJ1Y3RvcnMgd2l0aCBtZXRob2RzIGxpa2UgTG9EYXNoIGlzTmF0aXZlXG59KShGdW5jdGlvbi5wcm90b3R5cGUsIFRPX1NUUklORywgZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gIHJldHVybiB0eXBlb2YgdGhpcyA9PSAnZnVuY3Rpb24nICYmIHRoaXNbU1JDXSB8fCAkdG9TdHJpbmcuY2FsbCh0aGlzKTtcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4vX2NsYXNzb2YnKTtcbnZhciBidWlsdGluRXhlYyA9IFJlZ0V4cC5wcm90b3R5cGUuZXhlYztcblxuIC8vIGBSZWdFeHBFeGVjYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXJlZ2V4cGV4ZWNcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKFIsIFMpIHtcbiAgdmFyIGV4ZWMgPSBSLmV4ZWM7XG4gIGlmICh0eXBlb2YgZXhlYyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHZhciByZXN1bHQgPSBleGVjLmNhbGwoUiwgUyk7XG4gICAgaWYgKHR5cGVvZiByZXN1bHQgIT09ICdvYmplY3QnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdSZWdFeHAgZXhlYyBtZXRob2QgcmV0dXJuZWQgc29tZXRoaW5nIG90aGVyIHRoYW4gYW4gT2JqZWN0IG9yIG51bGwnKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICBpZiAoY2xhc3NvZihSKSAhPT0gJ1JlZ0V4cCcpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdSZWdFeHAjZXhlYyBjYWxsZWQgb24gaW5jb21wYXRpYmxlIHJlY2VpdmVyJyk7XG4gIH1cbiAgcmV0dXJuIGJ1aWx0aW5FeGVjLmNhbGwoUiwgUyk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgcmVnZXhwRmxhZ3MgPSByZXF1aXJlKCcuL19mbGFncycpO1xuXG52YXIgbmF0aXZlRXhlYyA9IFJlZ0V4cC5wcm90b3R5cGUuZXhlYztcbi8vIFRoaXMgYWx3YXlzIHJlZmVycyB0byB0aGUgbmF0aXZlIGltcGxlbWVudGF0aW9uLCBiZWNhdXNlIHRoZVxuLy8gU3RyaW5nI3JlcGxhY2UgcG9seWZpbGwgdXNlcyAuL2ZpeC1yZWdleHAtd2VsbC1rbm93bi1zeW1ib2wtbG9naWMuanMsXG4vLyB3aGljaCBsb2FkcyB0aGlzIGZpbGUgYmVmb3JlIHBhdGNoaW5nIHRoZSBtZXRob2QuXG52YXIgbmF0aXZlUmVwbGFjZSA9IFN0cmluZy5wcm90b3R5cGUucmVwbGFjZTtcblxudmFyIHBhdGNoZWRFeGVjID0gbmF0aXZlRXhlYztcblxudmFyIExBU1RfSU5ERVggPSAnbGFzdEluZGV4JztcblxudmFyIFVQREFURVNfTEFTVF9JTkRFWF9XUk9ORyA9IChmdW5jdGlvbiAoKSB7XG4gIHZhciByZTEgPSAvYS8sXG4gICAgICByZTIgPSAvYiovZztcbiAgbmF0aXZlRXhlYy5jYWxsKHJlMSwgJ2EnKTtcbiAgbmF0aXZlRXhlYy5jYWxsKHJlMiwgJ2EnKTtcbiAgcmV0dXJuIHJlMVtMQVNUX0lOREVYXSAhPT0gMCB8fCByZTJbTEFTVF9JTkRFWF0gIT09IDA7XG59KSgpO1xuXG4vLyBub25wYXJ0aWNpcGF0aW5nIGNhcHR1cmluZyBncm91cCwgY29waWVkIGZyb20gZXM1LXNoaW0ncyBTdHJpbmcjc3BsaXQgcGF0Y2guXG52YXIgTlBDR19JTkNMVURFRCA9IC8oKT8/Ly5leGVjKCcnKVsxXSAhPT0gdW5kZWZpbmVkO1xuXG52YXIgUEFUQ0ggPSBVUERBVEVTX0xBU1RfSU5ERVhfV1JPTkcgfHwgTlBDR19JTkNMVURFRDtcblxuaWYgKFBBVENIKSB7XG4gIHBhdGNoZWRFeGVjID0gZnVuY3Rpb24gZXhlYyhzdHIpIHtcbiAgICB2YXIgcmUgPSB0aGlzO1xuICAgIHZhciBsYXN0SW5kZXgsIHJlQ29weSwgbWF0Y2gsIGk7XG5cbiAgICBpZiAoTlBDR19JTkNMVURFRCkge1xuICAgICAgcmVDb3B5ID0gbmV3IFJlZ0V4cCgnXicgKyByZS5zb3VyY2UgKyAnJCg/IVxcXFxzKScsIHJlZ2V4cEZsYWdzLmNhbGwocmUpKTtcbiAgICB9XG4gICAgaWYgKFVQREFURVNfTEFTVF9JTkRFWF9XUk9ORykgbGFzdEluZGV4ID0gcmVbTEFTVF9JTkRFWF07XG5cbiAgICBtYXRjaCA9IG5hdGl2ZUV4ZWMuY2FsbChyZSwgc3RyKTtcblxuICAgIGlmIChVUERBVEVTX0xBU1RfSU5ERVhfV1JPTkcgJiYgbWF0Y2gpIHtcbiAgICAgIHJlW0xBU1RfSU5ERVhdID0gcmUuZ2xvYmFsID8gbWF0Y2guaW5kZXggKyBtYXRjaFswXS5sZW5ndGggOiBsYXN0SW5kZXg7XG4gICAgfVxuICAgIGlmIChOUENHX0lOQ0xVREVEICYmIG1hdGNoICYmIG1hdGNoLmxlbmd0aCA+IDEpIHtcbiAgICAgIC8vIEZpeCBicm93c2VycyB3aG9zZSBgZXhlY2AgbWV0aG9kcyBkb24ndCBjb25zaXN0ZW50bHkgcmV0dXJuIGB1bmRlZmluZWRgXG4gICAgICAvLyBmb3IgTlBDRywgbGlrZSBJRTguIE5PVEU6IFRoaXMgZG9lc24nIHdvcmsgZm9yIC8oLj8pPy9cbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1sb29wLWZ1bmNcbiAgICAgIG5hdGl2ZVJlcGxhY2UuY2FsbChtYXRjaFswXSwgcmVDb3B5LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZvciAoaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoIC0gMjsgaSsrKSB7XG4gICAgICAgICAgaWYgKGFyZ3VtZW50c1tpXSA9PT0gdW5kZWZpbmVkKSBtYXRjaFtpXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hdGNoO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHBhdGNoZWRFeGVjO1xuIiwiLy8gV29ya3Mgd2l0aCBfX3Byb3RvX18gb25seS4gT2xkIHY4IGNhbid0IHdvcmsgd2l0aCBudWxsIHByb3RvIG9iamVjdHMuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1wcm90byAqL1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBjaGVjayA9IGZ1bmN0aW9uIChPLCBwcm90bykge1xuICBhbk9iamVjdChPKTtcbiAgaWYgKCFpc09iamVjdChwcm90bykgJiYgcHJvdG8gIT09IG51bGwpIHRocm93IFR5cGVFcnJvcihwcm90byArIFwiOiBjYW4ndCBzZXQgYXMgcHJvdG90eXBlIVwiKTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2V0OiBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHwgKCdfX3Byb3RvX18nIGluIHt9ID8gLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIGZ1bmN0aW9uICh0ZXN0LCBidWdneSwgc2V0KSB7XG4gICAgICB0cnkge1xuICAgICAgICBzZXQgPSByZXF1aXJlKCcuL19jdHgnKShGdW5jdGlvbi5jYWxsLCByZXF1aXJlKCcuL19vYmplY3QtZ29wZCcpLmYoT2JqZWN0LnByb3RvdHlwZSwgJ19fcHJvdG9fXycpLnNldCwgMik7XG4gICAgICAgIHNldCh0ZXN0LCBbXSk7XG4gICAgICAgIGJ1Z2d5ID0gISh0ZXN0IGluc3RhbmNlb2YgQXJyYXkpO1xuICAgICAgfSBjYXRjaCAoZSkgeyBidWdneSA9IHRydWU7IH1cbiAgICAgIHJldHVybiBmdW5jdGlvbiBzZXRQcm90b3R5cGVPZihPLCBwcm90bykge1xuICAgICAgICBjaGVjayhPLCBwcm90byk7XG4gICAgICAgIGlmIChidWdneSkgTy5fX3Byb3RvX18gPSBwcm90bztcbiAgICAgICAgZWxzZSBzZXQoTywgcHJvdG8pO1xuICAgICAgICByZXR1cm4gTztcbiAgICAgIH07XG4gICAgfSh7fSwgZmFsc2UpIDogdW5kZWZpbmVkKSxcbiAgY2hlY2s6IGNoZWNrXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIGRQID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJyk7XG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpO1xudmFyIFNQRUNJRVMgPSByZXF1aXJlKCcuL193a3MnKSgnc3BlY2llcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChLRVkpIHtcbiAgdmFyIEMgPSBnbG9iYWxbS0VZXTtcbiAgaWYgKERFU0NSSVBUT1JTICYmIEMgJiYgIUNbU1BFQ0lFU10pIGRQLmYoQywgU1BFQ0lFUywge1xuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH1cbiAgfSk7XG59O1xuIiwidmFyIGRlZiA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmY7XG52YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgVEFHID0gcmVxdWlyZSgnLi9fd2tzJykoJ3RvU3RyaW5nVGFnJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCB0YWcsIHN0YXQpIHtcbiAgaWYgKGl0ICYmICFoYXMoaXQgPSBzdGF0ID8gaXQgOiBpdC5wcm90b3R5cGUsIFRBRykpIGRlZihpdCwgVEFHLCB7IGNvbmZpZ3VyYWJsZTogdHJ1ZSwgdmFsdWU6IHRhZyB9KTtcbn07XG4iLCJ2YXIgc2hhcmVkID0gcmVxdWlyZSgnLi9fc2hhcmVkJykoJ2tleXMnKTtcbnZhciB1aWQgPSByZXF1aXJlKCcuL191aWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gc2hhcmVkW2tleV0gfHwgKHNoYXJlZFtrZXldID0gdWlkKGtleSkpO1xufTtcbiIsInZhciBjb3JlID0gcmVxdWlyZSgnLi9fY29yZScpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIFNIQVJFRCA9ICdfX2NvcmUtanNfc2hhcmVkX18nO1xudmFyIHN0b3JlID0gZ2xvYmFsW1NIQVJFRF0gfHwgKGdsb2JhbFtTSEFSRURdID0ge30pO1xuXG4obW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICByZXR1cm4gc3RvcmVba2V5XSB8fCAoc3RvcmVba2V5XSA9IHZhbHVlICE9PSB1bmRlZmluZWQgPyB2YWx1ZSA6IHt9KTtcbn0pKCd2ZXJzaW9ucycsIFtdKS5wdXNoKHtcbiAgdmVyc2lvbjogY29yZS52ZXJzaW9uLFxuICBtb2RlOiByZXF1aXJlKCcuL19saWJyYXJ5JykgPyAncHVyZScgOiAnZ2xvYmFsJyxcbiAgY29weXJpZ2h0OiAnwqkgMjAxOSBEZW5pcyBQdXNoa2FyZXYgKHpsb2lyb2NrLnJ1KSdcbn0pO1xuIiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKTtcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xuLy8gdHJ1ZSAgLT4gU3RyaW5nI2F0XG4vLyBmYWxzZSAtPiBTdHJpbmcjY29kZVBvaW50QXRcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKFRPX1NUUklORykge1xuICByZXR1cm4gZnVuY3Rpb24gKHRoYXQsIHBvcykge1xuICAgIHZhciBzID0gU3RyaW5nKGRlZmluZWQodGhhdCkpO1xuICAgIHZhciBpID0gdG9JbnRlZ2VyKHBvcyk7XG4gICAgdmFyIGwgPSBzLmxlbmd0aDtcbiAgICB2YXIgYSwgYjtcbiAgICBpZiAoaSA8IDAgfHwgaSA+PSBsKSByZXR1cm4gVE9fU1RSSU5HID8gJycgOiB1bmRlZmluZWQ7XG4gICAgYSA9IHMuY2hhckNvZGVBdChpKTtcbiAgICByZXR1cm4gYSA8IDB4ZDgwMCB8fCBhID4gMHhkYmZmIHx8IGkgKyAxID09PSBsIHx8IChiID0gcy5jaGFyQ29kZUF0KGkgKyAxKSkgPCAweGRjMDAgfHwgYiA+IDB4ZGZmZlxuICAgICAgPyBUT19TVFJJTkcgPyBzLmNoYXJBdChpKSA6IGFcbiAgICAgIDogVE9fU1RSSU5HID8gcy5zbGljZShpLCBpICsgMikgOiAoYSAtIDB4ZDgwMCA8PCAxMCkgKyAoYiAtIDB4ZGMwMCkgKyAweDEwMDAwO1xuICB9O1xufTtcbiIsInZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJyk7XG52YXIgbWF4ID0gTWF0aC5tYXg7XG52YXIgbWluID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpbmRleCwgbGVuZ3RoKSB7XG4gIGluZGV4ID0gdG9JbnRlZ2VyKGluZGV4KTtcbiAgcmV0dXJuIGluZGV4IDwgMCA/IG1heChpbmRleCArIGxlbmd0aCwgMCkgOiBtaW4oaW5kZXgsIGxlbmd0aCk7XG59O1xuIiwiLy8gNy4xLjQgVG9JbnRlZ2VyXG52YXIgY2VpbCA9IE1hdGguY2VpbDtcbnZhciBmbG9vciA9IE1hdGguZmxvb3I7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXNOYU4oaXQgPSAraXQpID8gMCA6IChpdCA+IDAgPyBmbG9vciA6IGNlaWwpKGl0KTtcbn07XG4iLCIvLyB0byBpbmRleGVkIG9iamVjdCwgdG9PYmplY3Qgd2l0aCBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIHN0cmluZ3NcbnZhciBJT2JqZWN0ID0gcmVxdWlyZSgnLi9faW9iamVjdCcpO1xudmFyIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gSU9iamVjdChkZWZpbmVkKGl0KSk7XG59O1xuIiwiLy8gNy4xLjE1IFRvTGVuZ3RoXG52YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpO1xudmFyIG1pbiA9IE1hdGgubWluO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGl0ID4gMCA/IG1pbih0b0ludGVnZXIoaXQpLCAweDFmZmZmZmZmZmZmZmZmKSA6IDA7IC8vIHBvdygyLCA1MykgLSAxID09IDkwMDcxOTkyNTQ3NDA5OTFcbn07XG4iLCIvLyA3LjEuMTMgVG9PYmplY3QoYXJndW1lbnQpXG52YXIgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBPYmplY3QoZGVmaW5lZChpdCkpO1xufTtcbiIsIi8vIDcuMS4xIFRvUHJpbWl0aXZlKGlucHV0IFssIFByZWZlcnJlZFR5cGVdKVxudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG4vLyBpbnN0ZWFkIG9mIHRoZSBFUzYgc3BlYyB2ZXJzaW9uLCB3ZSBkaWRuJ3QgaW1wbGVtZW50IEBAdG9QcmltaXRpdmUgY2FzZVxuLy8gYW5kIHRoZSBzZWNvbmQgYXJndW1lbnQgLSBmbGFnIC0gcHJlZmVycmVkIHR5cGUgaXMgYSBzdHJpbmdcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCBTKSB7XG4gIGlmICghaXNPYmplY3QoaXQpKSByZXR1cm4gaXQ7XG4gIHZhciBmbiwgdmFsO1xuICBpZiAoUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSkgcmV0dXJuIHZhbDtcbiAgaWYgKHR5cGVvZiAoZm4gPSBpdC52YWx1ZU9mKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpIHJldHVybiB2YWw7XG4gIGlmICghUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSkgcmV0dXJuIHZhbDtcbiAgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY29udmVydCBvYmplY3QgdG8gcHJpbWl0aXZlIHZhbHVlXCIpO1xufTtcbiIsInZhciBpZCA9IDA7XG52YXIgcHggPSBNYXRoLnJhbmRvbSgpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiAnU3ltYm9sKCcuY29uY2F0KGtleSA9PT0gdW5kZWZpbmVkID8gJycgOiBrZXksICcpXycsICgrK2lkICsgcHgpLnRvU3RyaW5nKDM2KSk7XG59O1xuIiwidmFyIHN0b3JlID0gcmVxdWlyZSgnLi9fc2hhcmVkJykoJ3drcycpO1xudmFyIHVpZCA9IHJlcXVpcmUoJy4vX3VpZCcpO1xudmFyIFN5bWJvbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLlN5bWJvbDtcbnZhciBVU0VfU1lNQk9MID0gdHlwZW9mIFN5bWJvbCA9PSAnZnVuY3Rpb24nO1xuXG52YXIgJGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gIHJldHVybiBzdG9yZVtuYW1lXSB8fCAoc3RvcmVbbmFtZV0gPVxuICAgIFVTRV9TWU1CT0wgJiYgU3ltYm9sW25hbWVdIHx8IChVU0VfU1lNQk9MID8gU3ltYm9sIDogdWlkKSgnU3ltYm9sLicgKyBuYW1lKSk7XG59O1xuXG4kZXhwb3J0cy5zdG9yZSA9IHN0b3JlO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGFkZFRvVW5zY29wYWJsZXMgPSByZXF1aXJlKCcuL19hZGQtdG8tdW5zY29wYWJsZXMnKTtcbnZhciBzdGVwID0gcmVxdWlyZSgnLi9faXRlci1zdGVwJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJyk7XG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xuXG4vLyAyMi4xLjMuNCBBcnJheS5wcm90b3R5cGUuZW50cmllcygpXG4vLyAyMi4xLjMuMTMgQXJyYXkucHJvdG90eXBlLmtleXMoKVxuLy8gMjIuMS4zLjI5IEFycmF5LnByb3RvdHlwZS52YWx1ZXMoKVxuLy8gMjIuMS4zLjMwIEFycmF5LnByb3RvdHlwZVtAQGl0ZXJhdG9yXSgpXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2l0ZXItZGVmaW5lJykoQXJyYXksICdBcnJheScsIGZ1bmN0aW9uIChpdGVyYXRlZCwga2luZCkge1xuICB0aGlzLl90ID0gdG9JT2JqZWN0KGl0ZXJhdGVkKTsgLy8gdGFyZ2V0XG4gIHRoaXMuX2kgPSAwOyAgICAgICAgICAgICAgICAgICAvLyBuZXh0IGluZGV4XG4gIHRoaXMuX2sgPSBraW5kOyAgICAgICAgICAgICAgICAvLyBraW5kXG4vLyAyMi4xLjUuMi4xICVBcnJheUl0ZXJhdG9yUHJvdG90eXBlJS5uZXh0KClcbn0sIGZ1bmN0aW9uICgpIHtcbiAgdmFyIE8gPSB0aGlzLl90O1xuICB2YXIga2luZCA9IHRoaXMuX2s7XG4gIHZhciBpbmRleCA9IHRoaXMuX2krKztcbiAgaWYgKCFPIHx8IGluZGV4ID49IE8ubGVuZ3RoKSB7XG4gICAgdGhpcy5fdCA9IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gc3RlcCgxKTtcbiAgfVxuICBpZiAoa2luZCA9PSAna2V5cycpIHJldHVybiBzdGVwKDAsIGluZGV4KTtcbiAgaWYgKGtpbmQgPT0gJ3ZhbHVlcycpIHJldHVybiBzdGVwKDAsIE9baW5kZXhdKTtcbiAgcmV0dXJuIHN0ZXAoMCwgW2luZGV4LCBPW2luZGV4XV0pO1xufSwgJ3ZhbHVlcycpO1xuXG4vLyBhcmd1bWVudHNMaXN0W0BAaXRlcmF0b3JdIGlzICVBcnJheVByb3RvX3ZhbHVlcyUgKDkuNC40LjYsIDkuNC40LjcpXG5JdGVyYXRvcnMuQXJndW1lbnRzID0gSXRlcmF0b3JzLkFycmF5O1xuXG5hZGRUb1Vuc2NvcGFibGVzKCdrZXlzJyk7XG5hZGRUb1Vuc2NvcGFibGVzKCd2YWx1ZXMnKTtcbmFkZFRvVW5zY29wYWJsZXMoJ2VudHJpZXMnKTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBpbmhlcml0SWZSZXF1aXJlZCA9IHJlcXVpcmUoJy4vX2luaGVyaXQtaWYtcmVxdWlyZWQnKTtcbnZhciBkUCA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmY7XG52YXIgZ09QTiA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BuJykuZjtcbnZhciBpc1JlZ0V4cCA9IHJlcXVpcmUoJy4vX2lzLXJlZ2V4cCcpO1xudmFyICRmbGFncyA9IHJlcXVpcmUoJy4vX2ZsYWdzJyk7XG52YXIgJFJlZ0V4cCA9IGdsb2JhbC5SZWdFeHA7XG52YXIgQmFzZSA9ICRSZWdFeHA7XG52YXIgcHJvdG8gPSAkUmVnRXhwLnByb3RvdHlwZTtcbnZhciByZTEgPSAvYS9nO1xudmFyIHJlMiA9IC9hL2c7XG4vLyBcIm5ld1wiIGNyZWF0ZXMgYSBuZXcgb2JqZWN0LCBvbGQgd2Via2l0IGJ1Z2d5IGhlcmVcbnZhciBDT1JSRUNUX05FVyA9IG5ldyAkUmVnRXhwKHJlMSkgIT09IHJlMTtcblxuaWYgKHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgJiYgKCFDT1JSRUNUX05FVyB8fCByZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uICgpIHtcbiAgcmUyW3JlcXVpcmUoJy4vX3drcycpKCdtYXRjaCcpXSA9IGZhbHNlO1xuICAvLyBSZWdFeHAgY29uc3RydWN0b3IgY2FuIGFsdGVyIGZsYWdzIGFuZCBJc1JlZ0V4cCB3b3JrcyBjb3JyZWN0IHdpdGggQEBtYXRjaFxuICByZXR1cm4gJFJlZ0V4cChyZTEpICE9IHJlMSB8fCAkUmVnRXhwKHJlMikgPT0gcmUyIHx8ICRSZWdFeHAocmUxLCAnaScpICE9ICcvYS9pJztcbn0pKSkge1xuICAkUmVnRXhwID0gZnVuY3Rpb24gUmVnRXhwKHAsIGYpIHtcbiAgICB2YXIgdGlSRSA9IHRoaXMgaW5zdGFuY2VvZiAkUmVnRXhwO1xuICAgIHZhciBwaVJFID0gaXNSZWdFeHAocCk7XG4gICAgdmFyIGZpVSA9IGYgPT09IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gIXRpUkUgJiYgcGlSRSAmJiBwLmNvbnN0cnVjdG9yID09PSAkUmVnRXhwICYmIGZpVSA/IHBcbiAgICAgIDogaW5oZXJpdElmUmVxdWlyZWQoQ09SUkVDVF9ORVdcbiAgICAgICAgPyBuZXcgQmFzZShwaVJFICYmICFmaVUgPyBwLnNvdXJjZSA6IHAsIGYpXG4gICAgICAgIDogQmFzZSgocGlSRSA9IHAgaW5zdGFuY2VvZiAkUmVnRXhwKSA/IHAuc291cmNlIDogcCwgcGlSRSAmJiBmaVUgPyAkZmxhZ3MuY2FsbChwKSA6IGYpXG4gICAgICAsIHRpUkUgPyB0aGlzIDogcHJvdG8sICRSZWdFeHApO1xuICB9O1xuICB2YXIgcHJveHkgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAga2V5IGluICRSZWdFeHAgfHwgZFAoJFJlZ0V4cCwga2V5LCB7XG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIEJhc2Vba2V5XTsgfSxcbiAgICAgIHNldDogZnVuY3Rpb24gKGl0KSB7IEJhc2Vba2V5XSA9IGl0OyB9XG4gICAgfSk7XG4gIH07XG4gIGZvciAodmFyIGtleXMgPSBnT1BOKEJhc2UpLCBpID0gMDsga2V5cy5sZW5ndGggPiBpOykgcHJveHkoa2V5c1tpKytdKTtcbiAgcHJvdG8uY29uc3RydWN0b3IgPSAkUmVnRXhwO1xuICAkUmVnRXhwLnByb3RvdHlwZSA9IHByb3RvO1xuICByZXF1aXJlKCcuL19yZWRlZmluZScpKGdsb2JhbCwgJ1JlZ0V4cCcsICRSZWdFeHApO1xufVxuXG5yZXF1aXJlKCcuL19zZXQtc3BlY2llcycpKCdSZWdFeHAnKTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciByZWdleHBFeGVjID0gcmVxdWlyZSgnLi9fcmVnZXhwLWV4ZWMnKTtcbnJlcXVpcmUoJy4vX2V4cG9ydCcpKHtcbiAgdGFyZ2V0OiAnUmVnRXhwJyxcbiAgcHJvdG86IHRydWUsXG4gIGZvcmNlZDogcmVnZXhwRXhlYyAhPT0gLy4vLmV4ZWNcbn0sIHtcbiAgZXhlYzogcmVnZXhwRXhlY1xufSk7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJyk7XG52YXIgYWR2YW5jZVN0cmluZ0luZGV4ID0gcmVxdWlyZSgnLi9fYWR2YW5jZS1zdHJpbmctaW5kZXgnKTtcbnZhciByZWdFeHBFeGVjID0gcmVxdWlyZSgnLi9fcmVnZXhwLWV4ZWMtYWJzdHJhY3QnKTtcblxuLy8gQEBtYXRjaCBsb2dpY1xucmVxdWlyZSgnLi9fZml4LXJlLXdrcycpKCdtYXRjaCcsIDEsIGZ1bmN0aW9uIChkZWZpbmVkLCBNQVRDSCwgJG1hdGNoLCBtYXliZUNhbGxOYXRpdmUpIHtcbiAgcmV0dXJuIFtcbiAgICAvLyBgU3RyaW5nLnByb3RvdHlwZS5tYXRjaGAgbWV0aG9kXG4gICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtc3RyaW5nLnByb3RvdHlwZS5tYXRjaFxuICAgIGZ1bmN0aW9uIG1hdGNoKHJlZ2V4cCkge1xuICAgICAgdmFyIE8gPSBkZWZpbmVkKHRoaXMpO1xuICAgICAgdmFyIGZuID0gcmVnZXhwID09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IHJlZ2V4cFtNQVRDSF07XG4gICAgICByZXR1cm4gZm4gIT09IHVuZGVmaW5lZCA/IGZuLmNhbGwocmVnZXhwLCBPKSA6IG5ldyBSZWdFeHAocmVnZXhwKVtNQVRDSF0oU3RyaW5nKE8pKTtcbiAgICB9LFxuICAgIC8vIGBSZWdFeHAucHJvdG90eXBlW0BAbWF0Y2hdYCBtZXRob2RcbiAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1yZWdleHAucHJvdG90eXBlLUBAbWF0Y2hcbiAgICBmdW5jdGlvbiAocmVnZXhwKSB7XG4gICAgICB2YXIgcmVzID0gbWF5YmVDYWxsTmF0aXZlKCRtYXRjaCwgcmVnZXhwLCB0aGlzKTtcbiAgICAgIGlmIChyZXMuZG9uZSkgcmV0dXJuIHJlcy52YWx1ZTtcbiAgICAgIHZhciByeCA9IGFuT2JqZWN0KHJlZ2V4cCk7XG4gICAgICB2YXIgUyA9IFN0cmluZyh0aGlzKTtcbiAgICAgIGlmICghcnguZ2xvYmFsKSByZXR1cm4gcmVnRXhwRXhlYyhyeCwgUyk7XG4gICAgICB2YXIgZnVsbFVuaWNvZGUgPSByeC51bmljb2RlO1xuICAgICAgcngubGFzdEluZGV4ID0gMDtcbiAgICAgIHZhciBBID0gW107XG4gICAgICB2YXIgbiA9IDA7XG4gICAgICB2YXIgcmVzdWx0O1xuICAgICAgd2hpbGUgKChyZXN1bHQgPSByZWdFeHBFeGVjKHJ4LCBTKSkgIT09IG51bGwpIHtcbiAgICAgICAgdmFyIG1hdGNoU3RyID0gU3RyaW5nKHJlc3VsdFswXSk7XG4gICAgICAgIEFbbl0gPSBtYXRjaFN0cjtcbiAgICAgICAgaWYgKG1hdGNoU3RyID09PSAnJykgcngubGFzdEluZGV4ID0gYWR2YW5jZVN0cmluZ0luZGV4KFMsIHRvTGVuZ3RoKHJ4Lmxhc3RJbmRleCksIGZ1bGxVbmljb2RlKTtcbiAgICAgICAgbisrO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG4gPT09IDAgPyBudWxsIDogQTtcbiAgICB9XG4gIF07XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpO1xudmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKTtcbnZhciBhZHZhbmNlU3RyaW5nSW5kZXggPSByZXF1aXJlKCcuL19hZHZhbmNlLXN0cmluZy1pbmRleCcpO1xudmFyIHJlZ0V4cEV4ZWMgPSByZXF1aXJlKCcuL19yZWdleHAtZXhlYy1hYnN0cmFjdCcpO1xudmFyIG1heCA9IE1hdGgubWF4O1xudmFyIG1pbiA9IE1hdGgubWluO1xudmFyIGZsb29yID0gTWF0aC5mbG9vcjtcbnZhciBTVUJTVElUVVRJT05fU1lNQk9MUyA9IC9cXCQoWyQmYCddfFxcZFxcZD98PFtePl0qPikvZztcbnZhciBTVUJTVElUVVRJT05fU1lNQk9MU19OT19OQU1FRCA9IC9cXCQoWyQmYCddfFxcZFxcZD8pL2c7XG5cbnZhciBtYXliZVRvU3RyaW5nID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpdCA9PT0gdW5kZWZpbmVkID8gaXQgOiBTdHJpbmcoaXQpO1xufTtcblxuLy8gQEByZXBsYWNlIGxvZ2ljXG5yZXF1aXJlKCcuL19maXgtcmUtd2tzJykoJ3JlcGxhY2UnLCAyLCBmdW5jdGlvbiAoZGVmaW5lZCwgUkVQTEFDRSwgJHJlcGxhY2UsIG1heWJlQ2FsbE5hdGl2ZSkge1xuICByZXR1cm4gW1xuICAgIC8vIGBTdHJpbmcucHJvdG90eXBlLnJlcGxhY2VgIG1ldGhvZFxuICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXN0cmluZy5wcm90b3R5cGUucmVwbGFjZVxuICAgIGZ1bmN0aW9uIHJlcGxhY2Uoc2VhcmNoVmFsdWUsIHJlcGxhY2VWYWx1ZSkge1xuICAgICAgdmFyIE8gPSBkZWZpbmVkKHRoaXMpO1xuICAgICAgdmFyIGZuID0gc2VhcmNoVmFsdWUgPT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogc2VhcmNoVmFsdWVbUkVQTEFDRV07XG4gICAgICByZXR1cm4gZm4gIT09IHVuZGVmaW5lZFxuICAgICAgICA/IGZuLmNhbGwoc2VhcmNoVmFsdWUsIE8sIHJlcGxhY2VWYWx1ZSlcbiAgICAgICAgOiAkcmVwbGFjZS5jYWxsKFN0cmluZyhPKSwgc2VhcmNoVmFsdWUsIHJlcGxhY2VWYWx1ZSk7XG4gICAgfSxcbiAgICAvLyBgUmVnRXhwLnByb3RvdHlwZVtAQHJlcGxhY2VdYCBtZXRob2RcbiAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1yZWdleHAucHJvdG90eXBlLUBAcmVwbGFjZVxuICAgIGZ1bmN0aW9uIChyZWdleHAsIHJlcGxhY2VWYWx1ZSkge1xuICAgICAgdmFyIHJlcyA9IG1heWJlQ2FsbE5hdGl2ZSgkcmVwbGFjZSwgcmVnZXhwLCB0aGlzLCByZXBsYWNlVmFsdWUpO1xuICAgICAgaWYgKHJlcy5kb25lKSByZXR1cm4gcmVzLnZhbHVlO1xuXG4gICAgICB2YXIgcnggPSBhbk9iamVjdChyZWdleHApO1xuICAgICAgdmFyIFMgPSBTdHJpbmcodGhpcyk7XG4gICAgICB2YXIgZnVuY3Rpb25hbFJlcGxhY2UgPSB0eXBlb2YgcmVwbGFjZVZhbHVlID09PSAnZnVuY3Rpb24nO1xuICAgICAgaWYgKCFmdW5jdGlvbmFsUmVwbGFjZSkgcmVwbGFjZVZhbHVlID0gU3RyaW5nKHJlcGxhY2VWYWx1ZSk7XG4gICAgICB2YXIgZ2xvYmFsID0gcnguZ2xvYmFsO1xuICAgICAgaWYgKGdsb2JhbCkge1xuICAgICAgICB2YXIgZnVsbFVuaWNvZGUgPSByeC51bmljb2RlO1xuICAgICAgICByeC5sYXN0SW5kZXggPSAwO1xuICAgICAgfVxuICAgICAgdmFyIHJlc3VsdHMgPSBbXTtcbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSByZWdFeHBFeGVjKHJ4LCBTKTtcbiAgICAgICAgaWYgKHJlc3VsdCA9PT0gbnVsbCkgYnJlYWs7XG4gICAgICAgIHJlc3VsdHMucHVzaChyZXN1bHQpO1xuICAgICAgICBpZiAoIWdsb2JhbCkgYnJlYWs7XG4gICAgICAgIHZhciBtYXRjaFN0ciA9IFN0cmluZyhyZXN1bHRbMF0pO1xuICAgICAgICBpZiAobWF0Y2hTdHIgPT09ICcnKSByeC5sYXN0SW5kZXggPSBhZHZhbmNlU3RyaW5nSW5kZXgoUywgdG9MZW5ndGgocngubGFzdEluZGV4KSwgZnVsbFVuaWNvZGUpO1xuICAgICAgfVxuICAgICAgdmFyIGFjY3VtdWxhdGVkUmVzdWx0ID0gJyc7XG4gICAgICB2YXIgbmV4dFNvdXJjZVBvc2l0aW9uID0gMDtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVzdWx0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICByZXN1bHQgPSByZXN1bHRzW2ldO1xuICAgICAgICB2YXIgbWF0Y2hlZCA9IFN0cmluZyhyZXN1bHRbMF0pO1xuICAgICAgICB2YXIgcG9zaXRpb24gPSBtYXgobWluKHRvSW50ZWdlcihyZXN1bHQuaW5kZXgpLCBTLmxlbmd0aCksIDApO1xuICAgICAgICB2YXIgY2FwdHVyZXMgPSBbXTtcbiAgICAgICAgLy8gTk9URTogVGhpcyBpcyBlcXVpdmFsZW50IHRvXG4gICAgICAgIC8vICAgY2FwdHVyZXMgPSByZXN1bHQuc2xpY2UoMSkubWFwKG1heWJlVG9TdHJpbmcpXG4gICAgICAgIC8vIGJ1dCBmb3Igc29tZSByZWFzb24gYG5hdGl2ZVNsaWNlLmNhbGwocmVzdWx0LCAxLCByZXN1bHQubGVuZ3RoKWAgKGNhbGxlZCBpblxuICAgICAgICAvLyB0aGUgc2xpY2UgcG9seWZpbGwgd2hlbiBzbGljaW5nIG5hdGl2ZSBhcnJheXMpIFwiZG9lc24ndCB3b3JrXCIgaW4gc2FmYXJpIDkgYW5kXG4gICAgICAgIC8vIGNhdXNlcyBhIGNyYXNoIChodHRwczovL3Bhc3RlYmluLmNvbS9OMjFRemVRQSkgd2hlbiB0cnlpbmcgdG8gZGVidWcgaXQuXG4gICAgICAgIGZvciAodmFyIGogPSAxOyBqIDwgcmVzdWx0Lmxlbmd0aDsgaisrKSBjYXB0dXJlcy5wdXNoKG1heWJlVG9TdHJpbmcocmVzdWx0W2pdKSk7XG4gICAgICAgIHZhciBuYW1lZENhcHR1cmVzID0gcmVzdWx0Lmdyb3VwcztcbiAgICAgICAgaWYgKGZ1bmN0aW9uYWxSZXBsYWNlKSB7XG4gICAgICAgICAgdmFyIHJlcGxhY2VyQXJncyA9IFttYXRjaGVkXS5jb25jYXQoY2FwdHVyZXMsIHBvc2l0aW9uLCBTKTtcbiAgICAgICAgICBpZiAobmFtZWRDYXB0dXJlcyAhPT0gdW5kZWZpbmVkKSByZXBsYWNlckFyZ3MucHVzaChuYW1lZENhcHR1cmVzKTtcbiAgICAgICAgICB2YXIgcmVwbGFjZW1lbnQgPSBTdHJpbmcocmVwbGFjZVZhbHVlLmFwcGx5KHVuZGVmaW5lZCwgcmVwbGFjZXJBcmdzKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVwbGFjZW1lbnQgPSBnZXRTdWJzdGl0dXRpb24obWF0Y2hlZCwgUywgcG9zaXRpb24sIGNhcHR1cmVzLCBuYW1lZENhcHR1cmVzLCByZXBsYWNlVmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwb3NpdGlvbiA+PSBuZXh0U291cmNlUG9zaXRpb24pIHtcbiAgICAgICAgICBhY2N1bXVsYXRlZFJlc3VsdCArPSBTLnNsaWNlKG5leHRTb3VyY2VQb3NpdGlvbiwgcG9zaXRpb24pICsgcmVwbGFjZW1lbnQ7XG4gICAgICAgICAgbmV4dFNvdXJjZVBvc2l0aW9uID0gcG9zaXRpb24gKyBtYXRjaGVkLmxlbmd0aDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGFjY3VtdWxhdGVkUmVzdWx0ICsgUy5zbGljZShuZXh0U291cmNlUG9zaXRpb24pO1xuICAgIH1cbiAgXTtcblxuICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWdldHN1YnN0aXR1dGlvblxuICBmdW5jdGlvbiBnZXRTdWJzdGl0dXRpb24obWF0Y2hlZCwgc3RyLCBwb3NpdGlvbiwgY2FwdHVyZXMsIG5hbWVkQ2FwdHVyZXMsIHJlcGxhY2VtZW50KSB7XG4gICAgdmFyIHRhaWxQb3MgPSBwb3NpdGlvbiArIG1hdGNoZWQubGVuZ3RoO1xuICAgIHZhciBtID0gY2FwdHVyZXMubGVuZ3RoO1xuICAgIHZhciBzeW1ib2xzID0gU1VCU1RJVFVUSU9OX1NZTUJPTFNfTk9fTkFNRUQ7XG4gICAgaWYgKG5hbWVkQ2FwdHVyZXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgbmFtZWRDYXB0dXJlcyA9IHRvT2JqZWN0KG5hbWVkQ2FwdHVyZXMpO1xuICAgICAgc3ltYm9scyA9IFNVQlNUSVRVVElPTl9TWU1CT0xTO1xuICAgIH1cbiAgICByZXR1cm4gJHJlcGxhY2UuY2FsbChyZXBsYWNlbWVudCwgc3ltYm9scywgZnVuY3Rpb24gKG1hdGNoLCBjaCkge1xuICAgICAgdmFyIGNhcHR1cmU7XG4gICAgICBzd2l0Y2ggKGNoLmNoYXJBdCgwKSkge1xuICAgICAgICBjYXNlICckJzogcmV0dXJuICckJztcbiAgICAgICAgY2FzZSAnJic6IHJldHVybiBtYXRjaGVkO1xuICAgICAgICBjYXNlICdgJzogcmV0dXJuIHN0ci5zbGljZSgwLCBwb3NpdGlvbik7XG4gICAgICAgIGNhc2UgXCInXCI6IHJldHVybiBzdHIuc2xpY2UodGFpbFBvcyk7XG4gICAgICAgIGNhc2UgJzwnOlxuICAgICAgICAgIGNhcHR1cmUgPSBuYW1lZENhcHR1cmVzW2NoLnNsaWNlKDEsIC0xKV07XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6IC8vIFxcZFxcZD9cbiAgICAgICAgICB2YXIgbiA9ICtjaDtcbiAgICAgICAgICBpZiAobiA9PT0gMCkgcmV0dXJuIG1hdGNoO1xuICAgICAgICAgIGlmIChuID4gbSkge1xuICAgICAgICAgICAgdmFyIGYgPSBmbG9vcihuIC8gMTApO1xuICAgICAgICAgICAgaWYgKGYgPT09IDApIHJldHVybiBtYXRjaDtcbiAgICAgICAgICAgIGlmIChmIDw9IG0pIHJldHVybiBjYXB0dXJlc1tmIC0gMV0gPT09IHVuZGVmaW5lZCA/IGNoLmNoYXJBdCgxKSA6IGNhcHR1cmVzW2YgLSAxXSArIGNoLmNoYXJBdCgxKTtcbiAgICAgICAgICAgIHJldHVybiBtYXRjaDtcbiAgICAgICAgICB9XG4gICAgICAgICAgY2FwdHVyZSA9IGNhcHR1cmVzW24gLSAxXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjYXB0dXJlID09PSB1bmRlZmluZWQgPyAnJyA6IGNhcHR1cmU7XG4gICAgfSk7XG4gIH1cbn0pO1xuIiwidmFyICRpdGVyYXRvcnMgPSByZXF1aXJlKCcuL2VzNi5hcnJheS5pdGVyYXRvcicpO1xudmFyIGdldEtleXMgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpO1xudmFyIHJlZGVmaW5lID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBoaWRlID0gcmVxdWlyZSgnLi9faGlkZScpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpO1xudmFyIHdrcyA9IHJlcXVpcmUoJy4vX3drcycpO1xudmFyIElURVJBVE9SID0gd2tzKCdpdGVyYXRvcicpO1xudmFyIFRPX1NUUklOR19UQUcgPSB3a3MoJ3RvU3RyaW5nVGFnJyk7XG52YXIgQXJyYXlWYWx1ZXMgPSBJdGVyYXRvcnMuQXJyYXk7XG5cbnZhciBET01JdGVyYWJsZXMgPSB7XG4gIENTU1J1bGVMaXN0OiB0cnVlLCAvLyBUT0RPOiBOb3Qgc3BlYyBjb21wbGlhbnQsIHNob3VsZCBiZSBmYWxzZS5cbiAgQ1NTU3R5bGVEZWNsYXJhdGlvbjogZmFsc2UsXG4gIENTU1ZhbHVlTGlzdDogZmFsc2UsXG4gIENsaWVudFJlY3RMaXN0OiBmYWxzZSxcbiAgRE9NUmVjdExpc3Q6IGZhbHNlLFxuICBET01TdHJpbmdMaXN0OiBmYWxzZSxcbiAgRE9NVG9rZW5MaXN0OiB0cnVlLFxuICBEYXRhVHJhbnNmZXJJdGVtTGlzdDogZmFsc2UsXG4gIEZpbGVMaXN0OiBmYWxzZSxcbiAgSFRNTEFsbENvbGxlY3Rpb246IGZhbHNlLFxuICBIVE1MQ29sbGVjdGlvbjogZmFsc2UsXG4gIEhUTUxGb3JtRWxlbWVudDogZmFsc2UsXG4gIEhUTUxTZWxlY3RFbGVtZW50OiBmYWxzZSxcbiAgTWVkaWFMaXN0OiB0cnVlLCAvLyBUT0RPOiBOb3Qgc3BlYyBjb21wbGlhbnQsIHNob3VsZCBiZSBmYWxzZS5cbiAgTWltZVR5cGVBcnJheTogZmFsc2UsXG4gIE5hbWVkTm9kZU1hcDogZmFsc2UsXG4gIE5vZGVMaXN0OiB0cnVlLFxuICBQYWludFJlcXVlc3RMaXN0OiBmYWxzZSxcbiAgUGx1Z2luOiBmYWxzZSxcbiAgUGx1Z2luQXJyYXk6IGZhbHNlLFxuICBTVkdMZW5ndGhMaXN0OiBmYWxzZSxcbiAgU1ZHTnVtYmVyTGlzdDogZmFsc2UsXG4gIFNWR1BhdGhTZWdMaXN0OiBmYWxzZSxcbiAgU1ZHUG9pbnRMaXN0OiBmYWxzZSxcbiAgU1ZHU3RyaW5nTGlzdDogZmFsc2UsXG4gIFNWR1RyYW5zZm9ybUxpc3Q6IGZhbHNlLFxuICBTb3VyY2VCdWZmZXJMaXN0OiBmYWxzZSxcbiAgU3R5bGVTaGVldExpc3Q6IHRydWUsIC8vIFRPRE86IE5vdCBzcGVjIGNvbXBsaWFudCwgc2hvdWxkIGJlIGZhbHNlLlxuICBUZXh0VHJhY2tDdWVMaXN0OiBmYWxzZSxcbiAgVGV4dFRyYWNrTGlzdDogZmFsc2UsXG4gIFRvdWNoTGlzdDogZmFsc2Vcbn07XG5cbmZvciAodmFyIGNvbGxlY3Rpb25zID0gZ2V0S2V5cyhET01JdGVyYWJsZXMpLCBpID0gMDsgaSA8IGNvbGxlY3Rpb25zLmxlbmd0aDsgaSsrKSB7XG4gIHZhciBOQU1FID0gY29sbGVjdGlvbnNbaV07XG4gIHZhciBleHBsaWNpdCA9IERPTUl0ZXJhYmxlc1tOQU1FXTtcbiAgdmFyIENvbGxlY3Rpb24gPSBnbG9iYWxbTkFNRV07XG4gIHZhciBwcm90byA9IENvbGxlY3Rpb24gJiYgQ29sbGVjdGlvbi5wcm90b3R5cGU7XG4gIHZhciBrZXk7XG4gIGlmIChwcm90bykge1xuICAgIGlmICghcHJvdG9bSVRFUkFUT1JdKSBoaWRlKHByb3RvLCBJVEVSQVRPUiwgQXJyYXlWYWx1ZXMpO1xuICAgIGlmICghcHJvdG9bVE9fU1RSSU5HX1RBR10pIGhpZGUocHJvdG8sIFRPX1NUUklOR19UQUcsIE5BTUUpO1xuICAgIEl0ZXJhdG9yc1tOQU1FXSA9IEFycmF5VmFsdWVzO1xuICAgIGlmIChleHBsaWNpdCkgZm9yIChrZXkgaW4gJGl0ZXJhdG9ycykgaWYgKCFwcm90b1trZXldKSByZWRlZmluZShwcm90bywga2V5LCAkaXRlcmF0b3JzW2tleV0sIHRydWUpO1xuICB9XG59XG4iLCJjb25zdCBpbnN0YW5jZU9mQW55ID0gKG9iamVjdCwgY29uc3RydWN0b3JzKSA9PiBjb25zdHJ1Y3RvcnMuc29tZShjID0+IG9iamVjdCBpbnN0YW5jZW9mIGMpO1xuXG5sZXQgaWRiUHJveHlhYmxlVHlwZXM7XHJcbmxldCBjdXJzb3JBZHZhbmNlTWV0aG9kcztcclxuLy8gVGhpcyBpcyBhIGZ1bmN0aW9uIHRvIHByZXZlbnQgaXQgdGhyb3dpbmcgdXAgaW4gbm9kZSBlbnZpcm9ubWVudHMuXHJcbmZ1bmN0aW9uIGdldElkYlByb3h5YWJsZVR5cGVzKCkge1xyXG4gICAgcmV0dXJuIChpZGJQcm94eWFibGVUeXBlcyB8fFxyXG4gICAgICAgIChpZGJQcm94eWFibGVUeXBlcyA9IFtcclxuICAgICAgICAgICAgSURCRGF0YWJhc2UsXHJcbiAgICAgICAgICAgIElEQk9iamVjdFN0b3JlLFxyXG4gICAgICAgICAgICBJREJJbmRleCxcclxuICAgICAgICAgICAgSURCQ3Vyc29yLFxyXG4gICAgICAgICAgICBJREJUcmFuc2FjdGlvbixcclxuICAgICAgICBdKSk7XHJcbn1cclxuLy8gVGhpcyBpcyBhIGZ1bmN0aW9uIHRvIHByZXZlbnQgaXQgdGhyb3dpbmcgdXAgaW4gbm9kZSBlbnZpcm9ubWVudHMuXHJcbmZ1bmN0aW9uIGdldEN1cnNvckFkdmFuY2VNZXRob2RzKCkge1xyXG4gICAgcmV0dXJuIChjdXJzb3JBZHZhbmNlTWV0aG9kcyB8fFxyXG4gICAgICAgIChjdXJzb3JBZHZhbmNlTWV0aG9kcyA9IFtcclxuICAgICAgICAgICAgSURCQ3Vyc29yLnByb3RvdHlwZS5hZHZhbmNlLFxyXG4gICAgICAgICAgICBJREJDdXJzb3IucHJvdG90eXBlLmNvbnRpbnVlLFxyXG4gICAgICAgICAgICBJREJDdXJzb3IucHJvdG90eXBlLmNvbnRpbnVlUHJpbWFyeUtleSxcclxuICAgICAgICBdKSk7XHJcbn1cclxuY29uc3QgY3Vyc29yUmVxdWVzdE1hcCA9IG5ldyBXZWFrTWFwKCk7XHJcbmNvbnN0IHRyYW5zYWN0aW9uRG9uZU1hcCA9IG5ldyBXZWFrTWFwKCk7XHJcbmNvbnN0IHRyYW5zYWN0aW9uU3RvcmVOYW1lc01hcCA9IG5ldyBXZWFrTWFwKCk7XHJcbmNvbnN0IHRyYW5zZm9ybUNhY2hlID0gbmV3IFdlYWtNYXAoKTtcclxuY29uc3QgcmV2ZXJzZVRyYW5zZm9ybUNhY2hlID0gbmV3IFdlYWtNYXAoKTtcclxuZnVuY3Rpb24gcHJvbWlzaWZ5UmVxdWVzdChyZXF1ZXN0KSB7XHJcbiAgICBjb25zdCBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHVubGlzdGVuID0gKCkgPT4ge1xyXG4gICAgICAgICAgICByZXF1ZXN0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3N1Y2Nlc3MnLCBzdWNjZXNzKTtcclxuICAgICAgICAgICAgcmVxdWVzdC5yZW1vdmVFdmVudExpc3RlbmVyKCdlcnJvcicsIGVycm9yKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IHN1Y2Nlc3MgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHJlc29sdmUod3JhcChyZXF1ZXN0LnJlc3VsdCkpO1xyXG4gICAgICAgICAgICB1bmxpc3RlbigpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgY29uc3QgZXJyb3IgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHJlamVjdChyZXF1ZXN0LmVycm9yKTtcclxuICAgICAgICAgICAgdW5saXN0ZW4oKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignc3VjY2VzcycsIHN1Y2Nlc3MpO1xyXG4gICAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCBlcnJvcik7XHJcbiAgICB9KTtcclxuICAgIHByb21pc2VcclxuICAgICAgICAudGhlbih2YWx1ZSA9PiB7XHJcbiAgICAgICAgLy8gU2luY2UgY3Vyc29yaW5nIHJldXNlcyB0aGUgSURCUmVxdWVzdCAoKnNpZ2gqKSwgd2UgY2FjaGUgaXQgZm9yIGxhdGVyIHJldHJpZXZhbFxyXG4gICAgICAgIC8vIChzZWUgd3JhcEZ1bmN0aW9uKS5cclxuICAgICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBJREJDdXJzb3IpIHtcclxuICAgICAgICAgICAgY3Vyc29yUmVxdWVzdE1hcC5zZXQodmFsdWUsIHJlcXVlc3QpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBDYXRjaGluZyB0byBhdm9pZCBcIlVuY2F1Z2h0IFByb21pc2UgZXhjZXB0aW9uc1wiXHJcbiAgICB9KVxyXG4gICAgICAgIC5jYXRjaCgoKSA9PiB7IH0pO1xyXG4gICAgLy8gVGhpcyBtYXBwaW5nIGV4aXN0cyBpbiByZXZlcnNlVHJhbnNmb3JtQ2FjaGUgYnV0IGRvZXNuJ3QgZG9lc24ndCBleGlzdCBpbiB0cmFuc2Zvcm1DYWNoZS4gVGhpc1xyXG4gICAgLy8gaXMgYmVjYXVzZSB3ZSBjcmVhdGUgbWFueSBwcm9taXNlcyBmcm9tIGEgc2luZ2xlIElEQlJlcXVlc3QuXHJcbiAgICByZXZlcnNlVHJhbnNmb3JtQ2FjaGUuc2V0KHByb21pc2UsIHJlcXVlc3QpO1xyXG4gICAgcmV0dXJuIHByb21pc2U7XHJcbn1cclxuZnVuY3Rpb24gY2FjaGVEb25lUHJvbWlzZUZvclRyYW5zYWN0aW9uKHR4KSB7XHJcbiAgICAvLyBFYXJseSBiYWlsIGlmIHdlJ3ZlIGFscmVhZHkgY3JlYXRlZCBhIGRvbmUgcHJvbWlzZSBmb3IgdGhpcyB0cmFuc2FjdGlvbi5cclxuICAgIGlmICh0cmFuc2FjdGlvbkRvbmVNYXAuaGFzKHR4KSlcclxuICAgICAgICByZXR1cm47XHJcbiAgICBjb25zdCBkb25lID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHVubGlzdGVuID0gKCkgPT4ge1xyXG4gICAgICAgICAgICB0eC5yZW1vdmVFdmVudExpc3RlbmVyKCdjb21wbGV0ZScsIGNvbXBsZXRlKTtcclxuICAgICAgICAgICAgdHgucmVtb3ZlRXZlbnRMaXN0ZW5lcignZXJyb3InLCBlcnJvcik7XHJcbiAgICAgICAgICAgIHR4LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Fib3J0JywgZXJyb3IpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgY29uc3QgY29tcGxldGUgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgdW5saXN0ZW4oKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IGVycm9yID0gKCkgPT4ge1xyXG4gICAgICAgICAgICByZWplY3QodHguZXJyb3IpO1xyXG4gICAgICAgICAgICB1bmxpc3RlbigpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdHguYWRkRXZlbnRMaXN0ZW5lcignY29tcGxldGUnLCBjb21wbGV0ZSk7XHJcbiAgICAgICAgdHguYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCBlcnJvcik7XHJcbiAgICAgICAgdHguYWRkRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBlcnJvcik7XHJcbiAgICB9KTtcclxuICAgIC8vIENhY2hlIGl0IGZvciBsYXRlciByZXRyaWV2YWwuXHJcbiAgICB0cmFuc2FjdGlvbkRvbmVNYXAuc2V0KHR4LCBkb25lKTtcclxufVxyXG5sZXQgaWRiUHJveHlUcmFwcyA9IHtcclxuICAgIGdldCh0YXJnZXQsIHByb3AsIHJlY2VpdmVyKSB7XHJcbiAgICAgICAgaWYgKHRhcmdldCBpbnN0YW5jZW9mIElEQlRyYW5zYWN0aW9uKSB7XHJcbiAgICAgICAgICAgIC8vIFNwZWNpYWwgaGFuZGxpbmcgZm9yIHRyYW5zYWN0aW9uLmRvbmUuXHJcbiAgICAgICAgICAgIGlmIChwcm9wID09PSAnZG9uZScpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJhbnNhY3Rpb25Eb25lTWFwLmdldCh0YXJnZXQpO1xyXG4gICAgICAgICAgICAvLyBQb2x5ZmlsbCBmb3Igb2JqZWN0U3RvcmVOYW1lcyBiZWNhdXNlIG9mIEVkZ2UuXHJcbiAgICAgICAgICAgIGlmIChwcm9wID09PSAnb2JqZWN0U3RvcmVOYW1lcycpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0YXJnZXQub2JqZWN0U3RvcmVOYW1lcyB8fCB0cmFuc2FjdGlvblN0b3JlTmFtZXNNYXAuZ2V0KHRhcmdldCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gTWFrZSB0eC5zdG9yZSByZXR1cm4gdGhlIG9ubHkgc3RvcmUgaW4gdGhlIHRyYW5zYWN0aW9uLCBvciB1bmRlZmluZWQgaWYgdGhlcmUgYXJlIG1hbnkuXHJcbiAgICAgICAgICAgIGlmIChwcm9wID09PSAnc3RvcmUnKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVjZWl2ZXIub2JqZWN0U3RvcmVOYW1lc1sxXVxyXG4gICAgICAgICAgICAgICAgICAgID8gdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICAgICAgICAgOiByZWNlaXZlci5vYmplY3RTdG9yZShyZWNlaXZlci5vYmplY3RTdG9yZU5hbWVzWzBdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBFbHNlIHRyYW5zZm9ybSB3aGF0ZXZlciB3ZSBnZXQgYmFjay5cclxuICAgICAgICByZXR1cm4gd3JhcCh0YXJnZXRbcHJvcF0pO1xyXG4gICAgfSxcclxuICAgIGhhcyh0YXJnZXQsIHByb3ApIHtcclxuICAgICAgICBpZiAodGFyZ2V0IGluc3RhbmNlb2YgSURCVHJhbnNhY3Rpb24gJiZcclxuICAgICAgICAgICAgKHByb3AgPT09ICdkb25lJyB8fCBwcm9wID09PSAnc3RvcmUnKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHByb3AgaW4gdGFyZ2V0O1xyXG4gICAgfSxcclxufTtcclxuZnVuY3Rpb24gYWRkVHJhcHMoY2FsbGJhY2spIHtcclxuICAgIGlkYlByb3h5VHJhcHMgPSBjYWxsYmFjayhpZGJQcm94eVRyYXBzKTtcclxufVxyXG5mdW5jdGlvbiB3cmFwRnVuY3Rpb24oZnVuYykge1xyXG4gICAgLy8gRHVlIHRvIGV4cGVjdGVkIG9iamVjdCBlcXVhbGl0eSAod2hpY2ggaXMgZW5mb3JjZWQgYnkgdGhlIGNhY2hpbmcgaW4gYHdyYXBgKSwgd2VcclxuICAgIC8vIG9ubHkgY3JlYXRlIG9uZSBuZXcgZnVuYyBwZXIgZnVuYy5cclxuICAgIC8vIEVkZ2UgZG9lc24ndCBzdXBwb3J0IG9iamVjdFN0b3JlTmFtZXMgKGJvb28pLCBzbyB3ZSBwb2x5ZmlsbCBpdCBoZXJlLlxyXG4gICAgaWYgKGZ1bmMgPT09IElEQkRhdGFiYXNlLnByb3RvdHlwZS50cmFuc2FjdGlvbiAmJlxyXG4gICAgICAgICEoJ29iamVjdFN0b3JlTmFtZXMnIGluIElEQlRyYW5zYWN0aW9uLnByb3RvdHlwZSkpIHtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHN0b3JlTmFtZXMsIC4uLmFyZ3MpIHtcclxuICAgICAgICAgICAgY29uc3QgdHggPSBmdW5jLmNhbGwodW53cmFwKHRoaXMpLCBzdG9yZU5hbWVzLCAuLi5hcmdzKTtcclxuICAgICAgICAgICAgdHJhbnNhY3Rpb25TdG9yZU5hbWVzTWFwLnNldCh0eCwgc3RvcmVOYW1lcy5zb3J0ID8gc3RvcmVOYW1lcy5zb3J0KCkgOiBbc3RvcmVOYW1lc10pO1xyXG4gICAgICAgICAgICByZXR1cm4gd3JhcCh0eCk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIC8vIEN1cnNvciBtZXRob2RzIGFyZSBzcGVjaWFsLCBhcyB0aGUgYmVoYXZpb3VyIGlzIGEgbGl0dGxlIG1vcmUgZGlmZmVyZW50IHRvIHN0YW5kYXJkIElEQi4gSW5cclxuICAgIC8vIElEQiwgeW91IGFkdmFuY2UgdGhlIGN1cnNvciBhbmQgd2FpdCBmb3IgYSBuZXcgJ3N1Y2Nlc3MnIG9uIHRoZSBJREJSZXF1ZXN0IHRoYXQgZ2F2ZSB5b3UgdGhlXHJcbiAgICAvLyBjdXJzb3IuIEl0J3Mga2luZGEgbGlrZSBhIHByb21pc2UgdGhhdCBjYW4gcmVzb2x2ZSB3aXRoIG1hbnkgdmFsdWVzLiBUaGF0IGRvZXNuJ3QgbWFrZSBzZW5zZVxyXG4gICAgLy8gd2l0aCByZWFsIHByb21pc2VzLCBzbyBlYWNoIGFkdmFuY2UgbWV0aG9kcyByZXR1cm5zIGEgbmV3IHByb21pc2UgZm9yIHRoZSBjdXJzb3Igb2JqZWN0LCBvclxyXG4gICAgLy8gdW5kZWZpbmVkIGlmIHRoZSBlbmQgb2YgdGhlIGN1cnNvciBoYXMgYmVlbiByZWFjaGVkLlxyXG4gICAgaWYgKGdldEN1cnNvckFkdmFuY2VNZXRob2RzKCkuaW5jbHVkZXMoZnVuYykpIHtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcclxuICAgICAgICAgICAgLy8gQ2FsbGluZyB0aGUgb3JpZ2luYWwgZnVuY3Rpb24gd2l0aCB0aGUgcHJveHkgYXMgJ3RoaXMnIGNhdXNlcyBJTExFR0FMIElOVk9DQVRJT04sIHNvIHdlIHVzZVxyXG4gICAgICAgICAgICAvLyB0aGUgb3JpZ2luYWwgb2JqZWN0LlxyXG4gICAgICAgICAgICBmdW5jLmFwcGx5KHVud3JhcCh0aGlzKSwgYXJncyk7XHJcbiAgICAgICAgICAgIHJldHVybiB3cmFwKGN1cnNvclJlcXVlc3RNYXAuZ2V0KHRoaXMpKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XHJcbiAgICAgICAgLy8gQ2FsbGluZyB0aGUgb3JpZ2luYWwgZnVuY3Rpb24gd2l0aCB0aGUgcHJveHkgYXMgJ3RoaXMnIGNhdXNlcyBJTExFR0FMIElOVk9DQVRJT04sIHNvIHdlIHVzZVxyXG4gICAgICAgIC8vIHRoZSBvcmlnaW5hbCBvYmplY3QuXHJcbiAgICAgICAgcmV0dXJuIHdyYXAoZnVuYy5hcHBseSh1bndyYXAodGhpcyksIGFyZ3MpKTtcclxuICAgIH07XHJcbn1cclxuZnVuY3Rpb24gdHJhbnNmb3JtQ2FjaGFibGVWYWx1ZSh2YWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJylcclxuICAgICAgICByZXR1cm4gd3JhcEZ1bmN0aW9uKHZhbHVlKTtcclxuICAgIC8vIFRoaXMgZG9lc24ndCByZXR1cm4sIGl0IGp1c3QgY3JlYXRlcyBhICdkb25lJyBwcm9taXNlIGZvciB0aGUgdHJhbnNhY3Rpb24sXHJcbiAgICAvLyB3aGljaCBpcyBsYXRlciByZXR1cm5lZCBmb3IgdHJhbnNhY3Rpb24uZG9uZSAoc2VlIGlkYk9iamVjdEhhbmRsZXIpLlxyXG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgSURCVHJhbnNhY3Rpb24pXHJcbiAgICAgICAgY2FjaGVEb25lUHJvbWlzZUZvclRyYW5zYWN0aW9uKHZhbHVlKTtcclxuICAgIGlmIChpbnN0YW5jZU9mQW55KHZhbHVlLCBnZXRJZGJQcm94eWFibGVUeXBlcygpKSlcclxuICAgICAgICByZXR1cm4gbmV3IFByb3h5KHZhbHVlLCBpZGJQcm94eVRyYXBzKTtcclxuICAgIC8vIFJldHVybiB0aGUgc2FtZSB2YWx1ZSBiYWNrIGlmIHdlJ3JlIG5vdCBnb2luZyB0byB0cmFuc2Zvcm0gaXQuXHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbn1cclxuZnVuY3Rpb24gd3JhcCh2YWx1ZSkge1xyXG4gICAgLy8gV2Ugc29tZXRpbWVzIGdlbmVyYXRlIG11bHRpcGxlIHByb21pc2VzIGZyb20gYSBzaW5nbGUgSURCUmVxdWVzdCAoZWcgd2hlbiBjdXJzb3JpbmcpLCBiZWNhdXNlXHJcbiAgICAvLyBJREIgaXMgd2VpcmQgYW5kIGEgc2luZ2xlIElEQlJlcXVlc3QgY2FuIHlpZWxkIG1hbnkgcmVzcG9uc2VzLCBzbyB0aGVzZSBjYW4ndCBiZSBjYWNoZWQuXHJcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBJREJSZXF1ZXN0KVxyXG4gICAgICAgIHJldHVybiBwcm9taXNpZnlSZXF1ZXN0KHZhbHVlKTtcclxuICAgIC8vIElmIHdlJ3ZlIGFscmVhZHkgdHJhbnNmb3JtZWQgdGhpcyB2YWx1ZSBiZWZvcmUsIHJldXNlIHRoZSB0cmFuc2Zvcm1lZCB2YWx1ZS5cclxuICAgIC8vIFRoaXMgaXMgZmFzdGVyLCBidXQgaXQgYWxzbyBwcm92aWRlcyBvYmplY3QgZXF1YWxpdHkuXHJcbiAgICBpZiAodHJhbnNmb3JtQ2FjaGUuaGFzKHZhbHVlKSlcclxuICAgICAgICByZXR1cm4gdHJhbnNmb3JtQ2FjaGUuZ2V0KHZhbHVlKTtcclxuICAgIGNvbnN0IG5ld1ZhbHVlID0gdHJhbnNmb3JtQ2FjaGFibGVWYWx1ZSh2YWx1ZSk7XHJcbiAgICAvLyBOb3QgYWxsIHR5cGVzIGFyZSB0cmFuc2Zvcm1lZC5cclxuICAgIC8vIFRoZXNlIG1heSBiZSBwcmltaXRpdmUgdHlwZXMsIHNvIHRoZXkgY2FuJ3QgYmUgV2Vha01hcCBrZXlzLlxyXG4gICAgaWYgKG5ld1ZhbHVlICE9PSB2YWx1ZSkge1xyXG4gICAgICAgIHRyYW5zZm9ybUNhY2hlLnNldCh2YWx1ZSwgbmV3VmFsdWUpO1xyXG4gICAgICAgIHJldmVyc2VUcmFuc2Zvcm1DYWNoZS5zZXQobmV3VmFsdWUsIHZhbHVlKTtcclxuICAgIH1cclxuICAgIHJldHVybiBuZXdWYWx1ZTtcclxufVxyXG5jb25zdCB1bndyYXAgPSAodmFsdWUpID0+IHJldmVyc2VUcmFuc2Zvcm1DYWNoZS5nZXQodmFsdWUpO1xuXG5leHBvcnQgeyB3cmFwIGFzIGEsIGFkZFRyYXBzIGFzIGIsIGluc3RhbmNlT2ZBbnkgYXMgYywgcmV2ZXJzZVRyYW5zZm9ybUNhY2hlIGFzIGQsIHVud3JhcCBhcyBlIH07XG4iLCJpbXBvcnQgeyBhIGFzIHdyYXAsIGIgYXMgYWRkVHJhcHMgfSBmcm9tICcuL2NodW5rLmpzJztcbmV4cG9ydCB7IGUgYXMgdW53cmFwLCBhIGFzIHdyYXAgfSBmcm9tICcuL2NodW5rLmpzJztcblxuLyoqXHJcbiAqIE9wZW4gYSBkYXRhYmFzZS5cclxuICpcclxuICogQHBhcmFtIG5hbWUgTmFtZSBvZiB0aGUgZGF0YWJhc2UuXHJcbiAqIEBwYXJhbSB2ZXJzaW9uIFNjaGVtYSB2ZXJzaW9uLlxyXG4gKiBAcGFyYW0gY2FsbGJhY2tzIEFkZGl0aW9uYWwgY2FsbGJhY2tzLlxyXG4gKi9cclxuZnVuY3Rpb24gb3BlbkRCKG5hbWUsIHZlcnNpb24sIHsgYmxvY2tlZCwgdXBncmFkZSwgYmxvY2tpbmcgfSA9IHt9KSB7XHJcbiAgICBjb25zdCByZXF1ZXN0ID0gaW5kZXhlZERCLm9wZW4obmFtZSwgdmVyc2lvbik7XHJcbiAgICBjb25zdCBvcGVuUHJvbWlzZSA9IHdyYXAocmVxdWVzdCk7XHJcbiAgICBpZiAodXBncmFkZSkge1xyXG4gICAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcigndXBncmFkZW5lZWRlZCcsIGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgdXBncmFkZSh3cmFwKHJlcXVlc3QucmVzdWx0KSwgZXZlbnQub2xkVmVyc2lvbiwgZXZlbnQubmV3VmVyc2lvbiwgd3JhcChyZXF1ZXN0LnRyYW5zYWN0aW9uKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpZiAoYmxvY2tlZClcclxuICAgICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2Jsb2NrZWQnLCAoKSA9PiBibG9ja2VkKCkpO1xyXG4gICAgaWYgKGJsb2NraW5nKSB7XHJcbiAgICAgICAgb3BlblByb21pc2UudGhlbihkYiA9PiBkYi5hZGRFdmVudExpc3RlbmVyKCd2ZXJzaW9uY2hhbmdlJywgYmxvY2tpbmcpKS5jYXRjaCgoKSA9PiB7IH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG9wZW5Qcm9taXNlO1xyXG59XHJcbi8qKlxyXG4gKiBEZWxldGUgYSBkYXRhYmFzZS5cclxuICpcclxuICogQHBhcmFtIG5hbWUgTmFtZSBvZiB0aGUgZGF0YWJhc2UuXHJcbiAqL1xyXG5mdW5jdGlvbiBkZWxldGVEQihuYW1lLCB7IGJsb2NrZWQgfSA9IHt9KSB7XHJcbiAgICBjb25zdCByZXF1ZXN0ID0gaW5kZXhlZERCLmRlbGV0ZURhdGFiYXNlKG5hbWUpO1xyXG4gICAgaWYgKGJsb2NrZWQpXHJcbiAgICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdibG9ja2VkJywgKCkgPT4gYmxvY2tlZCgpKTtcclxuICAgIHJldHVybiB3cmFwKHJlcXVlc3QpLnRoZW4oKCkgPT4gdW5kZWZpbmVkKTtcclxufVxuXG5jb25zdCByZWFkTWV0aG9kcyA9IFsnZ2V0JywgJ2dldEtleScsICdnZXRBbGwnLCAnZ2V0QWxsS2V5cycsICdjb3VudCddO1xyXG5jb25zdCB3cml0ZU1ldGhvZHMgPSBbJ3B1dCcsICdhZGQnLCAnZGVsZXRlJywgJ2NsZWFyJ107XHJcbmNvbnN0IGNhY2hlZE1ldGhvZHMgPSBuZXcgTWFwKCk7XHJcbmZ1bmN0aW9uIGdldE1ldGhvZCh0YXJnZXQsIHByb3ApIHtcclxuICAgIGlmICghKHRhcmdldCBpbnN0YW5jZW9mIElEQkRhdGFiYXNlICYmXHJcbiAgICAgICAgIShwcm9wIGluIHRhcmdldCkgJiZcclxuICAgICAgICB0eXBlb2YgcHJvcCA9PT0gJ3N0cmluZycpKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKGNhY2hlZE1ldGhvZHMuZ2V0KHByb3ApKVxyXG4gICAgICAgIHJldHVybiBjYWNoZWRNZXRob2RzLmdldChwcm9wKTtcclxuICAgIGNvbnN0IHRhcmdldEZ1bmNOYW1lID0gcHJvcC5yZXBsYWNlKC9Gcm9tSW5kZXgkLywgJycpO1xyXG4gICAgY29uc3QgdXNlSW5kZXggPSBwcm9wICE9PSB0YXJnZXRGdW5jTmFtZTtcclxuICAgIGNvbnN0IGlzV3JpdGUgPSB3cml0ZU1ldGhvZHMuaW5jbHVkZXModGFyZ2V0RnVuY05hbWUpO1xyXG4gICAgaWYgKFxyXG4gICAgLy8gQmFpbCBpZiB0aGUgdGFyZ2V0IGRvZXNuJ3QgZXhpc3Qgb24gdGhlIHRhcmdldC4gRWcsIGdldEFsbCBpc24ndCBpbiBFZGdlLlxyXG4gICAgISh0YXJnZXRGdW5jTmFtZSBpbiAodXNlSW5kZXggPyBJREJJbmRleCA6IElEQk9iamVjdFN0b3JlKS5wcm90b3R5cGUpIHx8XHJcbiAgICAgICAgIShpc1dyaXRlIHx8IHJlYWRNZXRob2RzLmluY2x1ZGVzKHRhcmdldEZ1bmNOYW1lKSkpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjb25zdCBtZXRob2QgPSBhc3luYyBmdW5jdGlvbiAoc3RvcmVOYW1lLCAuLi5hcmdzKSB7XHJcbiAgICAgICAgLy8gaXNXcml0ZSA/ICdyZWFkd3JpdGUnIDogdW5kZWZpbmVkIGd6aXBwcyBiZXR0ZXIsIGJ1dCBmYWlscyBpbiBFZGdlIDooXHJcbiAgICAgICAgY29uc3QgdHggPSB0aGlzLnRyYW5zYWN0aW9uKHN0b3JlTmFtZSwgaXNXcml0ZSA/ICdyZWFkd3JpdGUnIDogJ3JlYWRvbmx5Jyk7XHJcbiAgICAgICAgbGV0IHRhcmdldCA9IHR4LnN0b3JlO1xyXG4gICAgICAgIGlmICh1c2VJbmRleClcclxuICAgICAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0LmluZGV4KGFyZ3Muc2hpZnQoKSk7XHJcbiAgICAgICAgY29uc3QgcmV0dXJuVmFsID0gdGFyZ2V0W3RhcmdldEZ1bmNOYW1lXSguLi5hcmdzKTtcclxuICAgICAgICBpZiAoaXNXcml0ZSlcclxuICAgICAgICAgICAgYXdhaXQgdHguZG9uZTtcclxuICAgICAgICByZXR1cm4gcmV0dXJuVmFsO1xyXG4gICAgfTtcclxuICAgIGNhY2hlZE1ldGhvZHMuc2V0KHByb3AsIG1ldGhvZCk7XHJcbiAgICByZXR1cm4gbWV0aG9kO1xyXG59XHJcbmFkZFRyYXBzKG9sZFRyYXBzID0+ICh7XHJcbiAgICBnZXQ6ICh0YXJnZXQsIHByb3AsIHJlY2VpdmVyKSA9PiBnZXRNZXRob2QodGFyZ2V0LCBwcm9wKSB8fCBvbGRUcmFwcy5nZXQodGFyZ2V0LCBwcm9wLCByZWNlaXZlciksXHJcbiAgICBoYXM6ICh0YXJnZXQsIHByb3ApID0+ICEhZ2V0TWV0aG9kKHRhcmdldCwgcHJvcCkgfHwgb2xkVHJhcHMuaGFzKHRhcmdldCwgcHJvcCksXHJcbn0pKTtcblxuZXhwb3J0IHsgb3BlbkRCLCBkZWxldGVEQiB9O1xuIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbiJdLCJzb3VyY2VSb290IjoiIn0=