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
/******/ 	return __webpack_require__(__webpack_require__.s = "./app/src/restaurant_info.js");
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
//           autoIncrement: true
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
    return "./restaurant.html?id=".concat(restaurant.id);
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
      _sw_js__WEBPACK_IMPORTED_MODULE_1__["dbPromise"].then(db => {
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
      let url = "http://localhost:1337/restaurants/".concat(restaurant.id, "/?is_favorite=").concat(restaurant.is_favorite);
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

}

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

/***/ "./app/src/restaurant_info.js":
/*!************************************!*\
  !*** ./app/src/restaurant_info.js ***!
  \************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es6_regexp_constructor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es6.regexp.constructor */ "./node_modules/core-js/modules/es6.regexp.constructor.js");
/* harmony import */ var core_js_modules_es6_regexp_constructor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_regexp_constructor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es6_regexp_replace__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es6.regexp.replace */ "./node_modules/core-js/modules/es6.regexp.replace.js");
/* harmony import */ var core_js_modules_es6_regexp_replace__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_regexp_replace__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _registration__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./registration */ "./app/src/registration.js");
/* harmony import */ var _dbhelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dbhelper */ "./app/src/dbhelper.js");




let restaurant;
let submitBtn;
var newMap;
/**
 * Initialize map as soon as the page is loaded.
 */

document.addEventListener('DOMContentLoaded', event => {
  initMap();
  submitBtn = document.getElementById('submit-form-btn');
  submitBtn.addEventListener('click', submitReview);
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
  _dbhelper__WEBPACK_IMPORTED_MODULE_3__["default"].nextPending();
};
/* window.initMap = () => {
  fetchRestaurantFromURL((error, restaurant) => {
    if (error) { // Got an error!
      console.error(error);
    } else {
      self.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: restaurant.latlng,
        scrollwheel: false
      });
      fillBreadcrumb();
      DBHelper.mapMarkerForRestaurant(self.restaurant, self.map);
    }
  });
} */

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
  const container = document.getElementById('reviews-container');
  const title = document.createElement('h2');
  title.innerHTML = 'Reviews';
  container.appendChild(title);

  if (!reviews) {
    const noReviews = document.createElement('p');
    noReviews.innerHTML = 'No reviews yet!';
    container.appendChild(noReviews);
    return;
  }

  const ul = document.getElementById('reviews-list');
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
  const rating = document.createElement('p');
  rating.innerHTML = "Rating: ".concat(review.rating);
  li.appendChild(rating);
  const comments = document.createElement('p');
  comments.innerHTML = review.comments;
  li.appendChild(comments);
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
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp("[?&]".concat(name, "(=([^&#]*)|&|#|$)")),
        results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

const submitReview = () => {
  console.log('submit review function');
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

  formData.restaurant_id = self.restaurant.id;
  _dbhelper__WEBPACK_IMPORTED_MODULE_3__["default"].saveNewReview(formData).then(result => {
    console.log(result);
    let alertMsg = 'Created Review';
    alert(alertMsg);
    let new_review_block = createReviewHTML(result);
    const ul = document.getElementById('reviews-list');
    ul.appendChild(new_review_block);
    var element = document.getElementById("review-li-".concat(result.id));

    if (element.scrollIntoView && element.scrollIntoView.constructor === Function) {
      element.scrollIntoView(true);
    }
  });
};

const getFormValues = () => {
  return {
    name: document.getElementById('name').value.trim(),
    rating: document.getElementById('rating').value.trim(),
    comments: document.getElementById('review-field').value.trim()
  };
};

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
    return cache.addAll(['/', './app.bundle.js', './restaurant.bundle.js']).catch(error => {
      console.log('error setting up install event for sw');
    });
  }));
}); //clean unused caches starting with restaurant

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(cacheNames => {
    console.log('Clearing Old Caches');
    return Promise.all(cacheNames.filter(cacheName => {
      return cacheName.startsWith('restaurant-') && cacheName != STATIC_CACHE;
    }).map(cacheName => {
      console.log("Deleting ".concat(cacheName));
      return caches.delete(cacheName);
    }));
  }));
});
self.addEventListener('fetch', event => {
  let checkUrl = new URL(event.request.url);

  if (checkUrl.port === "1337") {
    let id = checkUrl.searchParams.get('restaurant_id') - 0;
    console.log(id);
    return handleAJAXEvent(event, id);
  } else {
    handleNonAJAXEvent(event);
  }
});

const handleAJAXEvent = (event, id) => {
  // Only use for caching for Get events
  if (event.request.method !== "GET") {
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
  console.log(useCache);
  return caches.open(useCache).then(cache => {
    return fetch(request).then(response => {
      console.log('updating the cache');
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




/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NyYy9kYmhlbHBlci5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc3JjL3JlZ2lzdHJhdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc3JjL3Jlc3RhdXJhbnRfaW5mby5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc3cuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fYS1mdW5jdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19hZGQtdG8tdW5zY29wYWJsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fYWR2YW5jZS1zdHJpbmctaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fYW4tb2JqZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2FycmF5LWluY2x1ZGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2NsYXNzb2YuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fY29mLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2NvcmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fY3R4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2RlZmluZWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fZGVzY3JpcHRvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fZG9tLWNyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19lbnVtLWJ1Zy1rZXlzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2V4cG9ydC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19mYWlscy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19maXgtcmUtd2tzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2ZsYWdzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2Z1bmN0aW9uLXRvLXN0cmluZy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faGFzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2hpZGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faHRtbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pZTgtZG9tLWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pbmhlcml0LWlmLXJlcXVpcmVkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2lvYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faXMtb2JqZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2lzLXJlZ2V4cC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pdGVyLWNyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pdGVyLWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pdGVyLXN0ZXAuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faXRlcmF0b3JzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2xpYnJhcnkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWNyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19vYmplY3QtZHAuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWRwcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19vYmplY3QtZ29wZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19vYmplY3QtZ29wbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19vYmplY3QtZ3BvLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1rZXlzLWludGVybmFsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1rZXlzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1waWUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fcHJvcGVydHktZGVzYy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19yZWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19yZWdleHAtZXhlYy1hYnN0cmFjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19yZWdleHAtZXhlYy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19zZXQtcHJvdG8uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fc2V0LXNwZWNpZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fc2V0LXRvLXN0cmluZy10YWcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fc2hhcmVkLWtleS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19zaGFyZWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fc3RyaW5nLWF0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3RvLWFic29sdXRlLWluZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3RvLWludGVnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fdG8taW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL190by1sZW5ndGguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fdG8tb2JqZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3RvLXByaW1pdGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL191aWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fd2tzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LmFycmF5Lml0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnJlZ2V4cC5jb25zdHJ1Y3Rvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5yZWdleHAuZXhlYy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5yZWdleHAubWF0Y2guanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYucmVnZXhwLnJlcGxhY2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pZGIvYnVpbGQvZXNtL2NodW5rLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pZGIvYnVpbGQvZXNtL2luZGV4LmpzIl0sIm5hbWVzIjpbIkRCSGVscGVyIiwiREFUQUJBU0VfVVJMIiwicG9ydCIsIkRBVEFCQVNFX1JFVklFV1NfVVJMIiwiZmV0Y2hSZXN0YXVyYW50cyIsImNhbGxiYWNrIiwiZmV0Y2giLCJ0aGVuIiwicmVzcG9uc2UiLCJqc29uIiwicmVzdGF1cmFudHMiLCJmZXRjaFJldmlld3MiLCJyZXN0YXVyYW50X2lkIiwiZmV0Y2hVUkwiLCJyZXZpZXdzIiwiY2F0Y2giLCJlcnJvciIsImZldGNoUmVzdGF1cmFudEJ5SWQiLCJpZCIsInJlc3RhdXJhbnQiLCJmaW5kIiwiciIsImZldGNoUmVzdGF1cmFudEJ5Q3Vpc2luZSIsImN1aXNpbmUiLCJyZXN1bHRzIiwiZmlsdGVyIiwiY3Vpc2luZV90eXBlIiwiZmV0Y2hSZXN0YXVyYW50QnlOZWlnaGJvcmhvb2QiLCJuZWlnaGJvcmhvb2QiLCJmZXRjaFJlc3RhdXJhbnRCeUN1aXNpbmVBbmROZWlnaGJvcmhvb2QiLCJmZXRjaE5laWdoYm9yaG9vZHMiLCJuZWlnaGJvcmhvb2RzIiwibWFwIiwidiIsImkiLCJ1bmlxdWVOZWlnaGJvcmhvb2RzIiwiaW5kZXhPZiIsImZldGNoQ3Vpc2luZXMiLCJjdWlzaW5lcyIsInVuaXF1ZUN1aXNpbmVzIiwidXJsRm9yUmVzdGF1cmFudCIsImltYWdlVXJsRm9yUmVzdGF1cmFudCIsInBob3RvZ3JhcGgiLCJtYXBNYXJrZXJGb3JSZXN0YXVyYW50IiwibWFya2VyIiwiTCIsImxhdGxuZyIsImxhdCIsImxuZyIsInRpdGxlIiwibmFtZSIsImFsdCIsInVybCIsImFkZFRvIiwibmV3TWFwIiwidXBkYXRlQ2FjaGVkUmVzdGF1cmFudFJldmlldyIsImZvcm1EYXRhIiwiY29uc29sZSIsImxvZyIsImRiUHJvbWlzZSIsImRiIiwidHgiLCJ0cmFuc2FjdGlvbiIsInN0b3JlIiwib2JqZWN0U3RvcmUiLCJwdXQiLCJkb25lIiwic2F2ZU5ld1JldmlldyIsIm1ldGhvZCIsImFkZFBlbmRpbmdSZXF1ZXN0VG9RdWUiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImRhdGEiLCJuZXh0UGVuZGluZyIsImF0dGVtcHRDb21taXRQZW5kaW5nIiwiaiIsImJvZHkiLCJvYmplY3RTdG9yZU5hbWVzIiwibGVuZ3RoIiwiY2xvc2UiLCJvcGVuQ3Vyc29yIiwiY3Vyc29yIiwidmFsdWUiLCJkZWxldGUiLCJwcm9wZXJ0aWVzIiwiSlNPTiIsInN0cmluZ2lmeSIsIm9rIiwicmVkaXJlY3RlZCIsImRlbHR4Iiwic3luY1Jlc3RhdXJhbnQiLCJpc19mYXZvcml0ZSIsInBhcmFtcyIsImUiLCJ1cGRhdGVSZXN0YXVyYW50SW5EQiIsIm5ld19yZXN0YXVyYW50IiwiY29tcGxldGUiLCJ0b2dnbGVGYXZCdG4iLCJnZXQiLCJPYmplY3QiLCJhc3NpZ24iLCJmYXZCdG4iLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiaW5uZXJIVE1MIiwic3R5bGUiLCJiYWNrZ3JvdW5kIiwibmF2aWdhdG9yIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsInNlcnZpY2VXb3JrZXIiLCJyZWdpc3RlciIsInJlZ2lzdHJhdGlvbiIsInJlZ2lzdHJhdGlvbkVycm9yIiwic3VibWl0QnRuIiwiZXZlbnQiLCJpbml0TWFwIiwic3VibWl0UmV2aWV3IiwiZmV0Y2hSZXN0YXVyYW50RnJvbVVSTCIsImNlbnRlciIsInpvb20iLCJzY3JvbGxXaGVlbFpvb20iLCJzZWxmIiwidGlsZUxheWVyIiwibWFwYm94VG9rZW4iLCJtYXhab29tIiwiYXR0cmlidXRpb24iLCJmaWxsQnJlYWRjcnVtYiIsImdldFBhcmFtZXRlckJ5TmFtZSIsImZpbGxSZXN0YXVyYW50SFRNTCIsImFkZHJlc3MiLCJpbWFnZSIsImNsYXNzTmFtZSIsInNyYyIsIm9wZXJhdGluZ19ob3VycyIsImZpbGxSZXN0YXVyYW50SG91cnNIVE1MIiwiZmlsbFJldmlld3NIVE1MIiwib3BlcmF0aW5nSG91cnMiLCJob3VycyIsImtleSIsInJvdyIsImNyZWF0ZUVsZW1lbnQiLCJkYXkiLCJhcHBlbmRDaGlsZCIsInRpbWUiLCJjb250YWluZXIiLCJub1Jldmlld3MiLCJ1bCIsImZvckVhY2giLCJyZXZpZXciLCJjcmVhdGVSZXZpZXdIVE1MIiwibGkiLCJzZXRBdHRyaWJ1dGUiLCJkYXRlIiwiRGF0ZSIsImNyZWF0ZWRBdCIsInRvRGF0ZVN0cmluZyIsInJhdGluZyIsImNvbW1lbnRzIiwiYnJlYWRjcnVtYiIsImxvY2F0aW9uIiwiaHJlZiIsInJlcGxhY2UiLCJyZWdleCIsIlJlZ0V4cCIsImV4ZWMiLCJkZWNvZGVVUklDb21wb25lbnQiLCJnZXRGb3JtVmFsdWVzIiwidGVzdCIsImFsZXJ0IiwicmVzdWx0IiwiYWxlcnRNc2ciLCJuZXdfcmV2aWV3X2Jsb2NrIiwiZWxlbWVudCIsInNjcm9sbEludG9WaWV3IiwiY29uc3RydWN0b3IiLCJGdW5jdGlvbiIsInRyaW0iLCJjYWNoZVZlcnNpb24iLCJTVEFUSUNfQ0FDSEUiLCJJTUFHRVNfQ0FDSEUiLCJhbGxDYWNoZXMiLCJvcGVuREIiLCJ1cGdyYWRlIiwib2xkVmVyc2lvbiIsImNyZWF0ZU9iamVjdFN0b3JlIiwia2V5UGF0aCIsImNyZWF0ZUluZGV4IiwicmV2aWV3c1N0b3JlIiwiYXV0b0luY3JlbWVudCIsInBlbmRpbmdTdG9yZSIsImdldFJlc3RhdXJhbnRzIiwicmVxdWVzdCIsInJlc3AiLCJpc0ltYWdlVVJMIiwiaW1nVHlwZXMiLCJpc0ltYWdlIiwidHlwZSIsImVuZHNXaXRoIiwid2FpdFVudGlsIiwiY2FjaGVzIiwib3BlbiIsImNhY2hlIiwiYWRkQWxsIiwia2V5cyIsImNhY2hlTmFtZXMiLCJhbGwiLCJjYWNoZU5hbWUiLCJzdGFydHNXaXRoIiwiY2hlY2tVcmwiLCJVUkwiLCJzZWFyY2hQYXJhbXMiLCJoYW5kbGVBSkFYRXZlbnQiLCJoYW5kbGVOb25BSkFYRXZlbnQiLCJyZXNwb25kV2l0aCIsImhhbmRsZVJlc3RhdXJhbnRFdmVudHMiLCJoYW5kbGVSZXZpZXdzRXZlbnRzIiwiZ2V0QWxsIiwiZmluYWxSZXNwb25zZSIsIlJlc3BvbnNlIiwic3RhdHVzIiwiaW5kZXgiLCJmZXRjaFJlc3BvbnNlIiwibWF0Y2giLCJ1c2VDYWNoZSIsImNsb25lIiwic3RhdHVzVGV4dCIsInVwZGF0ZSJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7QUFHQTtDQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWUsTUFBTUEsUUFBTixDQUFlO0FBRTVCOzs7O0FBSUEsYUFBV0MsWUFBWCxHQUEwQjtBQUN4QixVQUFNQyxJQUFJLEdBQUcsSUFBYixDQUR3QixDQUNQOztBQUNqQixzQ0FBMkJBLElBQTNCO0FBQ0Q7O0FBRUQsYUFBV0Msb0JBQVgsR0FBa0M7QUFDaEMsVUFBTUQsSUFBSSxHQUFHLElBQWIsQ0FEZ0MsQ0FDZDs7QUFDbEIsc0NBQTJCQSxJQUEzQjtBQUNEO0FBRUQ7Ozs7O0FBS0EsU0FBT0UsZ0JBQVAsQ0FBd0JDLFFBQXhCLEVBQWtDO0FBQ2hDQyxTQUFLLENBQUNOLFFBQVEsQ0FBQ0MsWUFBVixDQUFMLENBQTZCTSxJQUE3QixDQUFrQyxVQUFTQyxRQUFULEVBQW1CO0FBQ25EQSxjQUFRLENBQUNDLElBQVQsR0FBZ0JGLElBQWhCLENBQXFCLFVBQVNHLFdBQVQsRUFBc0I7QUFDekNMLGdCQUFRLENBQUMsSUFBRCxFQUFPSyxXQUFQLENBQVI7QUFDRCxPQUZEO0FBR0QsS0FKRDtBQUtEOztBQUVELFNBQU9DLFlBQVAsQ0FBcUJDLGFBQXJCLEVBQW9DUCxRQUFwQyxFQUE4QztBQUM1QyxRQUFJUSxRQUFRLEdBQUdiLFFBQVEsQ0FBQ0csb0JBQVQsR0FBZ0Msa0JBQWhDLEdBQXFEUyxhQUFwRTtBQUNBTixTQUFLLENBQUNPLFFBQUQsQ0FBTCxDQUFnQk4sSUFBaEIsQ0FBc0JDLFFBQVEsSUFBSTtBQUNoQyxhQUFPQSxRQUFRLENBQUNDLElBQVQsRUFBUDtBQUNELEtBRkQsRUFFR0YsSUFGSCxDQUVRTyxPQUFPLElBQUk7QUFDZlQsY0FBUSxDQUFDLElBQUQsRUFBT1MsT0FBUCxDQUFSO0FBQ0QsS0FKSCxFQUlLQyxLQUpMLENBSVdDLEtBQUssSUFBSTtBQUNoQlgsY0FBUSxDQUFDVyxLQUFELEVBQVEsSUFBUixDQUFSO0FBQ0QsS0FOSDtBQU9ELEdBdEMyQixDQXdDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTs7Ozs7QUFHQSxTQUFPQyxtQkFBUCxDQUEyQkMsRUFBM0IsRUFBK0JiLFFBQS9CLEVBQXlDO0FBQ3ZDO0FBQ0FMLFlBQVEsQ0FBQ0ksZ0JBQVQsQ0FBMEIsQ0FBQ1ksS0FBRCxFQUFRTixXQUFSLEtBQXdCO0FBQ2hELFVBQUlNLEtBQUosRUFBVztBQUNUWCxnQkFBUSxDQUFDVyxLQUFELEVBQVEsSUFBUixDQUFSO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsY0FBTUcsVUFBVSxHQUFHVCxXQUFXLENBQUNVLElBQVosQ0FBaUJDLENBQUMsSUFBSUEsQ0FBQyxDQUFDSCxFQUFGLElBQVFBLEVBQTlCLENBQW5COztBQUNBLFlBQUlDLFVBQUosRUFBZ0I7QUFBRTtBQUNoQmQsa0JBQVEsQ0FBQyxJQUFELEVBQU9jLFVBQVAsQ0FBUjtBQUNELFNBRkQsTUFFTztBQUFFO0FBQ1BkLGtCQUFRLENBQUMsMkJBQUQsRUFBOEIsSUFBOUIsQ0FBUjtBQUNEO0FBQ0Y7QUFDRixLQVhEO0FBWUQ7QUFFRDs7Ozs7QUFHQSxTQUFPaUIsd0JBQVAsQ0FBZ0NDLE9BQWhDLEVBQXlDbEIsUUFBekMsRUFBbUQ7QUFDakQ7QUFDQUwsWUFBUSxDQUFDSSxnQkFBVCxDQUEwQixDQUFDWSxLQUFELEVBQVFOLFdBQVIsS0FBd0I7QUFDaEQsVUFBSU0sS0FBSixFQUFXO0FBQ1RYLGdCQUFRLENBQUNXLEtBQUQsRUFBUSxJQUFSLENBQVI7QUFDRCxPQUZELE1BRU87QUFDTDtBQUNBLGNBQU1RLE9BQU8sR0FBR2QsV0FBVyxDQUFDZSxNQUFaLENBQW1CSixDQUFDLElBQUlBLENBQUMsQ0FBQ0ssWUFBRixJQUFrQkgsT0FBMUMsQ0FBaEI7QUFDQWxCLGdCQUFRLENBQUMsSUFBRCxFQUFPbUIsT0FBUCxDQUFSO0FBQ0Q7QUFDRixLQVJEO0FBU0Q7QUFFRDs7Ozs7QUFHQSxTQUFPRyw2QkFBUCxDQUFxQ0MsWUFBckMsRUFBbUR2QixRQUFuRCxFQUE2RDtBQUMzRDtBQUNBTCxZQUFRLENBQUNJLGdCQUFULENBQTBCLENBQUNZLEtBQUQsRUFBUU4sV0FBUixLQUF3QjtBQUNoRCxVQUFJTSxLQUFKLEVBQVc7QUFDVFgsZ0JBQVEsQ0FBQ1csS0FBRCxFQUFRLElBQVIsQ0FBUjtBQUNELE9BRkQsTUFFTztBQUNMO0FBQ0EsY0FBTVEsT0FBTyxHQUFHZCxXQUFXLENBQUNlLE1BQVosQ0FBbUJKLENBQUMsSUFBSUEsQ0FBQyxDQUFDTyxZQUFGLElBQWtCQSxZQUExQyxDQUFoQjtBQUNBdkIsZ0JBQVEsQ0FBQyxJQUFELEVBQU9tQixPQUFQLENBQVI7QUFDRDtBQUNGLEtBUkQ7QUFTRDtBQUVEOzs7OztBQUdBLFNBQU9LLHVDQUFQLENBQStDTixPQUEvQyxFQUF3REssWUFBeEQsRUFBc0V2QixRQUF0RSxFQUFnRjtBQUM5RTtBQUNBTCxZQUFRLENBQUNJLGdCQUFULENBQTBCLENBQUNZLEtBQUQsRUFBUU4sV0FBUixLQUF3QjtBQUNoRCxVQUFJTSxLQUFKLEVBQVc7QUFDVFgsZ0JBQVEsQ0FBQ1csS0FBRCxFQUFRLElBQVIsQ0FBUjtBQUNELE9BRkQsTUFFTztBQUNMLFlBQUlRLE9BQU8sR0FBR2QsV0FBZDs7QUFDQSxZQUFJYSxPQUFPLElBQUksS0FBZixFQUFzQjtBQUFFO0FBQ3RCQyxpQkFBTyxHQUFHQSxPQUFPLENBQUNDLE1BQVIsQ0FBZUosQ0FBQyxJQUFJQSxDQUFDLENBQUNLLFlBQUYsSUFBa0JILE9BQXRDLENBQVY7QUFDRDs7QUFDRCxZQUFJSyxZQUFZLElBQUksS0FBcEIsRUFBMkI7QUFBRTtBQUMzQkosaUJBQU8sR0FBR0EsT0FBTyxDQUFDQyxNQUFSLENBQWVKLENBQUMsSUFBSUEsQ0FBQyxDQUFDTyxZQUFGLElBQWtCQSxZQUF0QyxDQUFWO0FBQ0Q7O0FBQ0R2QixnQkFBUSxDQUFDLElBQUQsRUFBT21CLE9BQVAsQ0FBUjtBQUNEO0FBQ0YsS0FiRDtBQWNEO0FBRUQ7Ozs7O0FBR0EsU0FBT00sa0JBQVAsQ0FBMEJ6QixRQUExQixFQUFvQztBQUNsQztBQUNBTCxZQUFRLENBQUNJLGdCQUFULENBQTBCLENBQUNZLEtBQUQsRUFBUU4sV0FBUixLQUF3QjtBQUNoRCxVQUFJTSxLQUFKLEVBQVc7QUFDVFgsZ0JBQVEsQ0FBQ1csS0FBRCxFQUFRLElBQVIsQ0FBUjtBQUNELE9BRkQsTUFFTztBQUNMO0FBQ0EsY0FBTWUsYUFBYSxHQUFHckIsV0FBVyxDQUFDc0IsR0FBWixDQUFnQixDQUFDQyxDQUFELEVBQUlDLENBQUosS0FBVXhCLFdBQVcsQ0FBQ3dCLENBQUQsQ0FBWCxDQUFlTixZQUF6QyxDQUF0QixDQUZLLENBR0w7O0FBQ0EsY0FBTU8sbUJBQW1CLEdBQUdKLGFBQWEsQ0FBQ04sTUFBZCxDQUFxQixDQUFDUSxDQUFELEVBQUlDLENBQUosS0FBVUgsYUFBYSxDQUFDSyxPQUFkLENBQXNCSCxDQUF0QixLQUE0QkMsQ0FBM0QsQ0FBNUI7QUFDQTdCLGdCQUFRLENBQUMsSUFBRCxFQUFPOEIsbUJBQVAsQ0FBUjtBQUNEO0FBQ0YsS0FWRDtBQVdEO0FBRUQ7Ozs7O0FBR0EsU0FBT0UsYUFBUCxDQUFxQmhDLFFBQXJCLEVBQStCO0FBQzdCO0FBQ0FMLFlBQVEsQ0FBQ0ksZ0JBQVQsQ0FBMEIsQ0FBQ1ksS0FBRCxFQUFRTixXQUFSLEtBQXdCO0FBQ2hELFVBQUlNLEtBQUosRUFBVztBQUNUWCxnQkFBUSxDQUFDVyxLQUFELEVBQVEsSUFBUixDQUFSO0FBQ0QsT0FGRCxNQUVPO0FBQ0w7QUFDQSxjQUFNc0IsUUFBUSxHQUFHNUIsV0FBVyxDQUFDc0IsR0FBWixDQUFnQixDQUFDQyxDQUFELEVBQUlDLENBQUosS0FBVXhCLFdBQVcsQ0FBQ3dCLENBQUQsQ0FBWCxDQUFlUixZQUF6QyxDQUFqQixDQUZLLENBR0w7O0FBQ0EsY0FBTWEsY0FBYyxHQUFHRCxRQUFRLENBQUNiLE1BQVQsQ0FBZ0IsQ0FBQ1EsQ0FBRCxFQUFJQyxDQUFKLEtBQVVJLFFBQVEsQ0FBQ0YsT0FBVCxDQUFpQkgsQ0FBakIsS0FBdUJDLENBQWpELENBQXZCO0FBQ0E3QixnQkFBUSxDQUFDLElBQUQsRUFBT2tDLGNBQVAsQ0FBUjtBQUNEO0FBQ0YsS0FWRDtBQVdEO0FBRUQ7Ozs7O0FBR0EsU0FBT0MsZ0JBQVAsQ0FBd0JyQixVQUF4QixFQUFvQztBQUNsQywwQ0FBZ0NBLFVBQVUsQ0FBQ0QsRUFBM0M7QUFDRDtBQUVEOzs7OztBQUdBLFNBQU91QixxQkFBUCxDQUE2QnRCLFVBQTdCLEVBQXlDO0FBQ3ZDLFFBQUcsQ0FBQ0EsVUFBVSxDQUFDdUIsVUFBZixFQUEyQjtBQUN6Qiw0QkFBZ0J2QixVQUFVLENBQUNELEVBQTNCO0FBQ0Q7O0FBQ0QsMEJBQWdCQyxVQUFVLENBQUN1QixVQUEzQjtBQUNEO0FBRUQ7Ozs7O0FBR0EsU0FBT0Msc0JBQVAsQ0FBOEJ4QixVQUE5QixFQUEwQ2EsR0FBMUMsRUFBK0M7QUFDN0M7QUFDQSxVQUFNWSxNQUFNLEdBQUcsSUFBSUMsQ0FBQyxDQUFDRCxNQUFOLENBQWEsQ0FBQ3pCLFVBQVUsQ0FBQzJCLE1BQVgsQ0FBa0JDLEdBQW5CLEVBQXdCNUIsVUFBVSxDQUFDMkIsTUFBWCxDQUFrQkUsR0FBMUMsQ0FBYixFQUNiO0FBQUNDLFdBQUssRUFBRTlCLFVBQVUsQ0FBQytCLElBQW5CO0FBQ0FDLFNBQUcsRUFBRWhDLFVBQVUsQ0FBQytCLElBRGhCO0FBRUFFLFNBQUcsRUFBRXBELFFBQVEsQ0FBQ3dDLGdCQUFULENBQTBCckIsVUFBMUI7QUFGTCxLQURhLENBQWY7QUFLRXlCLFVBQU0sQ0FBQ1MsS0FBUCxDQUFhQyxNQUFiO0FBQ0YsV0FBT1YsTUFBUDtBQUNEOztBQUVELFNBQU9XLDRCQUFQLENBQW9DQyxRQUFwQyxFQUE4QztBQUM1Q0MsV0FBTyxDQUFDQyxHQUFSLENBQVksK0JBQVosRUFBNkNGLFFBQTdDO0FBQ0EsV0FBT0csZ0RBQVMsQ0FBQ3BELElBQVYsQ0FBZ0JxRCxFQUFFLElBQUk7QUFDM0IsWUFBTUMsRUFBRSxHQUFHRCxFQUFFLENBQUNFLFdBQUgsQ0FBZSxTQUFmLEVBQTBCLFdBQTFCLENBQVg7QUFDQSxZQUFNQyxLQUFLLEdBQUdGLEVBQUUsQ0FBQ0csV0FBSCxDQUFlLFNBQWYsQ0FBZDtBQUNBUCxhQUFPLENBQUNDLEdBQVIsQ0FBWSx5QkFBWjtBQUNBSyxXQUFLLENBQUNFLEdBQU4sQ0FBVVQsUUFBVjtBQUNBQyxhQUFPLENBQUNDLEdBQVIsQ0FBWSxrQ0FBWjtBQUNBLGFBQU9HLEVBQUUsQ0FBQ0ssSUFBVjtBQUNELEtBUE0sQ0FBUDtBQVFEOztBQUVELFNBQU9DLGFBQVAsQ0FBcUJYLFFBQXJCLEVBQStCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBLFVBQU1KLEdBQUcsR0FBR3BELFFBQVEsQ0FBQ0csb0JBQXJCO0FBQ0EsVUFBTWlFLE1BQU0sR0FBRyxNQUFmO0FBQ0FwRSxZQUFRLENBQUN1RCw0QkFBVCxDQUFzQ0MsUUFBdEM7QUFDQSxXQUFPeEQsUUFBUSxDQUFDcUUsc0JBQVQsQ0FBZ0NqQixHQUFoQyxFQUFxQ2dCLE1BQXJDLEVBQTZDWixRQUE3QyxFQUF1RGpELElBQXZELENBQTRERSxJQUFJLElBQUlBLElBQXBFLENBQVA7QUFFRDs7QUFFRCxTQUFPNEQsc0JBQVAsQ0FBOEJqQixHQUE5QixFQUFtQ2dCLE1BQW5DLEVBQTJDWixRQUEzQyxFQUFxRDtBQUNuRDtBQUNBLFdBQU8sSUFBSWMsT0FBSixDQUFZLENBQUNDLE9BQUQsRUFBVUMsTUFBVixLQUFxQjtBQUN0Q2Isc0RBQVMsQ0FBQ3BELElBQVYsQ0FBZXFELEVBQUUsSUFBSTtBQUNyQixjQUFNQyxFQUFFLEdBQUdELEVBQUUsQ0FBQ0UsV0FBSCxDQUFlLFNBQWYsRUFBMEIsV0FBMUIsQ0FBWDtBQUNBLGNBQU1DLEtBQUssR0FBR0YsRUFBRSxDQUFDRyxXQUFILENBQWUsU0FBZixDQUFkO0FBQ0FELGFBQUssQ0FBQ0UsR0FBTixDQUFVO0FBQ1JRLGNBQUksRUFBRTtBQUNKckIsZUFESTtBQUVKZ0Isa0JBRkk7QUFHSlo7QUFISTtBQURFLFNBQVY7QUFPRCxPQVZDLEVBVUN6QyxLQVZELENBVU9DLEtBQUssSUFBSTtBQUNoQnlDLGVBQU8sQ0FBQ0MsR0FBUixDQUFZMUMsS0FBWjtBQUNELE9BWkMsRUFZQ1QsSUFaRCxDQVlNUCxRQUFRLENBQUMwRSxXQUFULENBQXFCLENBQUMxRCxLQUFELEVBQVFQLElBQVIsS0FBaUI7QUFDNUNnRCxlQUFPLENBQUNDLEdBQVIsQ0FBWWpELElBQVo7QUFDQSxlQUFPOEQsT0FBTyxDQUFDOUQsSUFBRCxDQUFkO0FBQ0QsT0FITyxDQVpOO0FBZ0JILEtBakJRLENBQVA7QUFrQkQ7O0FBRUQsU0FBT2lFLFdBQVAsQ0FBbUJyRSxRQUFuQixFQUE2QjtBQUMzQkwsWUFBUSxDQUFDMkUsb0JBQVQsQ0FBOEIzRSxRQUFRLENBQUMwRSxXQUF2QyxFQUFvRG5FLElBQXBELENBQXlEcUUsQ0FBQyxJQUFJO0FBQzVEbkIsYUFBTyxDQUFDQyxHQUFSLENBQVlrQixDQUFaO0FBQ0F2RSxjQUFRLENBQUMsSUFBRCxFQUFPdUUsQ0FBUCxDQUFSO0FBQ0QsS0FIRDtBQUlEOztBQUVELFNBQU9ELG9CQUFQLENBQTRCdEUsUUFBNUIsRUFBc0M7QUFDcEM7QUFDQSxRQUFJK0MsR0FBSjtBQUNBLFFBQUlnQixNQUFKO0FBQ0EsUUFBSVMsSUFBSjtBQUVBLFdBQU8sSUFBSVAsT0FBSixDQUFhLENBQUNDLE9BQUQsRUFBVUMsTUFBVixLQUFxQjtBQUFFYixzREFBUyxDQUFDcEQsSUFBVixDQUFlcUQsRUFBRSxJQUFJO0FBQzlELFlBQUksQ0FBQ0EsRUFBRSxDQUFDa0IsZ0JBQUgsQ0FBb0JDLE1BQXpCLEVBQWlDO0FBQy9CdEIsaUJBQU8sQ0FBQ0MsR0FBUixDQUFZLGtCQUFaO0FBQ0FFLFlBQUUsQ0FBQ29CLEtBQUg7QUFDQTtBQUNEOztBQUNELGNBQU1uQixFQUFFLEdBQUdELEVBQUUsQ0FBQ0UsV0FBSCxDQUFlLFNBQWYsRUFBMEIsV0FBMUIsQ0FBWDtBQUNBLGNBQU1DLEtBQUssR0FBR0YsRUFBRSxDQUFDRyxXQUFILENBQWUsU0FBZixDQUFkO0FBQ0FELGFBQUssQ0FBQ2tCLFVBQU4sR0FBbUIxRSxJQUFuQixDQUF5QjJFLE1BQU0sSUFBSTtBQUNqQyxjQUFJLENBQUNBLE1BQUwsRUFBYTtBQUNUO0FBQ0Q7O0FBQ0gsZ0JBQU1DLEtBQUssR0FBR0QsTUFBTSxDQUFDQyxLQUFyQjtBQUNBL0IsYUFBRyxHQUFHOEIsTUFBTSxDQUFDQyxLQUFQLENBQWFWLElBQWIsQ0FBa0JyQixHQUF4QjtBQUNBZ0IsZ0JBQU0sR0FBR2MsTUFBTSxDQUFDQyxLQUFQLENBQWFWLElBQWIsQ0FBa0JMLE1BQTNCO0FBQ0FTLGNBQUksR0FBR0ssTUFBTSxDQUFDQyxLQUFQLENBQWFWLElBQWIsQ0FBa0JqQixRQUF6QixDQVBpQyxDQVVqQztBQUNBOztBQUNBLGNBQUssQ0FBQ0osR0FBRCxJQUFRLENBQUNnQixNQUFWLElBQXNCQSxNQUFNLEtBQUssTUFBWCxJQUFxQixDQUFDUyxJQUFoRCxFQUF1RDtBQUNyREssa0JBQU0sQ0FDSEUsTUFESCxHQUVHN0UsSUFGSCxDQUVRRixRQUFRLEVBRmhCO0FBR0E7QUFDRDs7QUFBQTtBQUVELGdCQUFNZ0YsVUFBVSxHQUFHO0FBQ2pCUixnQkFBSSxFQUFFUyxJQUFJLENBQUNDLFNBQUwsQ0FBZVYsSUFBZixDQURXO0FBRWpCVCxrQkFBTSxFQUFFQTtBQUZTLFdBQW5CO0FBSUE5RCxlQUFLLENBQUM4QyxHQUFELEVBQU1pQyxVQUFOLENBQUwsQ0FBdUI5RSxJQUF2QixDQUE0QkMsUUFBUSxJQUFJO0FBQ3hDO0FBQ0UsZ0JBQUksQ0FBQ0EsUUFBUSxDQUFDZ0YsRUFBVixJQUFnQixDQUFDaEYsUUFBUSxDQUFDaUYsVUFBOUIsRUFBMEM7QUFDeENoQyxxQkFBTyxDQUFDQyxHQUFSLENBQVkseUNBQVo7QUFDQUQscUJBQU8sQ0FBQ0MsR0FBUixDQUFZbEQsUUFBWjtBQUNBO0FBQ0Q7O0FBQ0QsbUJBQU9BLFFBQVEsQ0FBQ0MsSUFBVCxFQUFQO0FBQ0QsV0FSRCxFQVFHRixJQVJILENBUVNxRSxDQUFDLElBQUk7QUFDWixrQkFBTWMsS0FBSyxHQUFHOUIsRUFBRSxDQUFDRSxXQUFILENBQWUsU0FBZixFQUEwQixXQUExQixDQUFkO0FBQ0Esa0JBQU1DLEtBQUssR0FBRzJCLEtBQUssQ0FBQzFCLFdBQU4sQ0FBa0IsU0FBbEIsQ0FBZDtBQUNBRCxpQkFBSyxDQUFDa0IsVUFBTixHQUNHMUUsSUFESCxDQUNTMkUsTUFBTSxJQUFJO0FBQ2ZBLG9CQUFNLENBQUNFLE1BQVAsR0FDQzdFLElBREQsQ0FDTSxNQUFNO0FBQ1ZGLHdCQUFRO0FBQ1JvRCx1QkFBTyxDQUFDQyxHQUFSLENBQVlrQixDQUFaO0FBQ0EsdUJBQU9MLE9BQU8sQ0FBQ0ssQ0FBRCxDQUFkO0FBQ0QsZUFMRDtBQU1ELGFBUkg7QUFTQW5CLG1CQUFPLENBQUNDLEdBQVIsQ0FBWSxpQ0FBWjtBQUNELFdBckJELEVBcUJHM0MsS0FyQkgsQ0FxQlNDLEtBQUssSUFBSTtBQUNoQnlDLG1CQUFPLENBQUNDLEdBQVIsQ0FBWTFDLEtBQVo7QUFDQTtBQUNELFdBeEJEO0FBeUJELFNBaEREO0FBaURELE9BekQwQztBQTBEMUMsS0ExRE0sQ0FBUDtBQTJERDs7QUFFRCxTQUFPMkUsY0FBUCxDQUFzQnhFLFVBQXRCLEVBQWtDO0FBQy9CLFFBQUk7QUFDRixVQUFJaUMsR0FBRywrQ0FBd0NqQyxVQUFVLENBQUNELEVBQW5ELDJCQUFzRUMsVUFBVSxDQUFDeUUsV0FBakYsQ0FBUDtBQUNBLFVBQUlDLE1BQU0sR0FBRztBQUFDekIsY0FBTSxFQUFFO0FBQVQsT0FBYjtBQUNBLGFBQU85RCxLQUFLLENBQUM4QyxHQUFELEVBQU15QyxNQUFOLENBQUwsQ0FBbUJ0RixJQUFuQixDQUF3QixVQUFTYyxDQUFULEVBQVc7QUFBRSxlQUFPQSxDQUFDLENBQUNaLElBQUYsRUFBUDtBQUFpQixPQUF0RCxDQUFQO0FBQ0QsS0FKRCxDQUtBLE9BQU1xRixDQUFOLEVBQVM7QUFDUHJDLGFBQU8sQ0FBQ0MsR0FBUixDQUFZLDJDQUFaLEVBQXlEb0MsQ0FBekQsRUFBNEQzRSxVQUE1RDtBQUNEO0FBQ0g7O0FBQ0UsU0FBTzRFLG9CQUFQLENBQTRCQyxjQUE1QixFQUE0QztBQUMxQyxXQUFPckMsZ0RBQVMsQ0FBQ3BELElBQVYsQ0FBZSxVQUFTcUQsRUFBVCxFQUFZO0FBQ2hDLFVBQUlDLEVBQUUsR0FBR0QsRUFBRSxDQUFDRSxXQUFILENBQWUsYUFBZixFQUE4QixXQUE5QixDQUFUO0FBQ0EsVUFBSUMsS0FBSyxHQUFHRixFQUFFLENBQUNHLFdBQUgsQ0FBZSxhQUFmLENBQVo7QUFDQUQsV0FBSyxDQUFDRSxHQUFOLENBQVUrQixjQUFWO0FBQ0EsYUFBT25DLEVBQUUsQ0FBQ29DLFFBQVY7QUFDRCxLQUxNLEVBS0oxRixJQUxJLENBS0MsWUFBVTtBQUNmLGFBQU8rRCxPQUFPLENBQUNDLE9BQVIsQ0FBZ0J5QixjQUFoQixDQUFQO0FBQ0YsS0FQTSxDQUFQO0FBUUQ7O0FBRUosU0FBT0UsWUFBUCxDQUFvQnRGLGFBQXBCLEVBQW1DO0FBQ2pDLFdBQU8rQyxnREFBUyxDQUFDcEQsSUFBVixDQUFnQnFELEVBQUUsSUFBSTtBQUMzQixVQUFJQyxFQUFFLEdBQUdELEVBQUUsQ0FBQ0UsV0FBSCxDQUFlLGFBQWYsQ0FBVDtBQUNBLFVBQUlDLEtBQUssR0FBR0YsRUFBRSxDQUFDRyxXQUFILENBQWUsYUFBZixDQUFaO0FBQ0EsYUFBT0QsS0FBSyxDQUFDb0MsR0FBTixDQUFVdkYsYUFBVixDQUFQO0FBQ0QsS0FKTSxFQUlKTCxJQUpJLENBSUVZLFVBQVUsSUFBSTtBQUNyQnNDLGFBQU8sQ0FBQ0MsR0FBUixDQUFZdkMsVUFBWjtBQUNBLFlBQU02RSxjQUFjLEdBQUdJLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjLEVBQWQsRUFBa0JsRixVQUFsQixDQUF2QjtBQUNBNkUsb0JBQWMsQ0FBQ0osV0FBZixHQUE4QnpFLFVBQVUsQ0FBQ3lFLFdBQVgsS0FBMkIsTUFBM0IsSUFBcUN6RSxVQUFVLENBQUN5RSxXQUFYLEtBQTJCLElBQWpFLEdBQzdCLE9BRDZCLEdBQ25CLE1BRFY7QUFFQTVGLGNBQVEsQ0FBQzJGLGNBQVQsQ0FBd0JLLGNBQXhCO0FBQ0EsYUFBT2hHLFFBQVEsQ0FBQytGLG9CQUFULENBQThCQyxjQUE5QixDQUFQO0FBQ0QsS0FYTSxFQVdKekYsSUFYSSxDQVdFeUYsY0FBYyxJQUFJO0FBQ3pCLFlBQU1NLE1BQU0sR0FBR0MsUUFBUSxDQUFDQyxjQUFULG1CQUFtQ1IsY0FBYyxDQUFDOUUsRUFBbEQsRUFBZjs7QUFDQSxVQUFHOEUsY0FBYyxDQUFDSixXQUFmLEtBQStCLE1BQS9CLElBQXlDSSxjQUFjLENBQUNKLFdBQWYsS0FBK0IsSUFBM0UsRUFBaUY7QUFDL0VVLGNBQU0sQ0FBQ0csU0FBUCxHQUFtQixZQUFuQjtBQUNBSCxjQUFNLENBQUNJLEtBQVAsQ0FBYUMsVUFBYixHQUEwQixTQUExQjtBQUNELE9BSEQsTUFHTztBQUNMTCxjQUFNLENBQUNHLFNBQVAsR0FBbUIsaUJBQW5CO0FBQ0FILGNBQU0sQ0FBQ0ksS0FBUCxDQUFhQyxVQUFiLEdBQTBCLE1BQTFCO0FBQ0Q7QUFDRixLQXBCTSxDQUFQO0FBcUJEOztBQW5XMkIsQzs7Ozs7Ozs7Ozs7O0FDM0I5QjtBQUFlLGdFQUFDLFlBQVk7QUFFMUIsTUFBSSxtQkFBbUJDLFNBQXZCLEVBQWtDO0FBQ2pDQyxVQUFNLENBQUNDLGdCQUFQLENBQXdCLE1BQXhCLEVBQWdDLE1BQU07QUFDcENGLGVBQVMsQ0FBQ0csYUFBVixDQUF3QkMsUUFBeEIsQ0FBaUMsMEJBQWpDLEVBQTZEekcsSUFBN0QsQ0FBa0UwRyxZQUFZLElBQUk7QUFDaEZ4RCxlQUFPLENBQUNDLEdBQVIsQ0FBWSxpQkFBWixFQUErQnVELFlBQS9CO0FBQ0QsT0FGRCxFQUVHbEcsS0FGSCxDQUVTbUcsaUJBQWlCLElBQUk7QUFDNUJ6RCxlQUFPLENBQUNDLEdBQVIsQ0FBWSwwQkFBWixFQUF3Q3dELGlCQUF4QztBQUNELE9BSkQ7QUFLRCxLQU5EO0FBT0E7QUFFRixDQVpjLEdBQWYsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTtBQUNBLElBQUkvRixVQUFKO0FBQ0EsSUFBSWdHLFNBQUo7QUFDQSxJQUFJN0QsTUFBSjtBQUVBOzs7O0FBR0FpRCxRQUFRLENBQUNPLGdCQUFULENBQTBCLGtCQUExQixFQUErQ00sS0FBRCxJQUFXO0FBQ3ZEQyxTQUFPO0FBRVBGLFdBQVMsR0FBR1osUUFBUSxDQUFDQyxjQUFULENBQXdCLGlCQUF4QixDQUFaO0FBQ0FXLFdBQVMsQ0FBQ0wsZ0JBQVYsQ0FBMkIsT0FBM0IsRUFBb0NRLFlBQXBDO0FBQ0QsQ0FMRDtBQU9BOzs7O0FBR0EsTUFBTUQsT0FBTyxHQUFHLE1BQU07QUFDcEJFLHdCQUFzQixDQUFDLENBQUN2RyxLQUFELEVBQVFHLFVBQVIsS0FBdUI7QUFDNUMsUUFBSUgsS0FBSixFQUFXO0FBQUU7QUFDWHlDLGFBQU8sQ0FBQ3pDLEtBQVIsQ0FBY0EsS0FBZDtBQUNELEtBRkQsTUFFTztBQUNMc0MsWUFBTSxHQUFHVCxDQUFDLENBQUNiLEdBQUYsQ0FBTSxLQUFOLEVBQWE7QUFDcEJ3RixjQUFNLEVBQUUsQ0FBQ3JHLFVBQVUsQ0FBQzJCLE1BQVgsQ0FBa0JDLEdBQW5CLEVBQXdCNUIsVUFBVSxDQUFDMkIsTUFBWCxDQUFrQkUsR0FBMUMsQ0FEWTtBQUVwQnlFLFlBQUksRUFBRSxFQUZjO0FBR3BCQyx1QkFBZSxFQUFFO0FBSEcsT0FBYixDQUFUO0FBS0FDLFVBQUksQ0FBQ3JFLE1BQUwsR0FBY0EsTUFBZDtBQUNBVCxPQUFDLENBQUMrRSxTQUFGLENBQVksbUZBQVosRUFBaUc7QUFDL0ZDLG1CQUFXLEVBQUUsMEZBRGtGO0FBRS9GQyxlQUFPLEVBQUUsRUFGc0Y7QUFHL0ZDLG1CQUFXLEVBQUUsOEZBQ1gsMEVBRFcsR0FFWCx3REFMNkY7QUFNL0Y3RyxVQUFFLEVBQUU7QUFOMkYsT0FBakcsRUFPR21DLEtBUEgsQ0FPU0MsTUFQVDtBQVFBMEUsb0JBQWM7QUFDZGhJLHVEQUFRLENBQUMyQyxzQkFBVCxDQUFnQ2dGLElBQUksQ0FBQ3hHLFVBQXJDLEVBQWlEd0csSUFBSSxDQUFDckUsTUFBdEQ7QUFDRDtBQUNGLEdBckJxQixDQUF0QjtBQXNCQXRELG1EQUFRLENBQUMwRSxXQUFUO0FBQ0QsQ0F4QkQ7QUEwQkE7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQkE7Ozs7O0FBR0EsTUFBTTZDLHNCQUFzQixHQUFJbEgsUUFBRCxJQUFjO0FBQzNDLE1BQUlzSCxJQUFJLENBQUN4RyxVQUFULEVBQXFCO0FBQUU7QUFDckJkLFlBQVEsQ0FBQyxJQUFELEVBQU9zSCxJQUFJLENBQUN4RyxVQUFaLENBQVI7QUFDQXNDLFdBQU8sQ0FBQ0MsR0FBUixDQUFZLGlDQUFaO0FBQ0E7QUFDRDs7QUFFRCxRQUFNeEMsRUFBRSxHQUFHK0csa0JBQWtCLENBQUMsSUFBRCxDQUE3Qjs7QUFDQSxNQUFJLENBQUMvRyxFQUFMLEVBQVM7QUFBRTtBQUNURixTQUFLLEdBQUcseUJBQVI7QUFDQVgsWUFBUSxDQUFDVyxLQUFELEVBQVEsSUFBUixDQUFSO0FBQ0QsR0FIRCxNQUdPO0FBQ0xoQixxREFBUSxDQUFDaUIsbUJBQVQsQ0FBNkJDLEVBQTdCLEVBQWlDLENBQUNGLEtBQUQsRUFBUUcsVUFBUixLQUF1QjtBQUN0RHdHLFVBQUksQ0FBQ3hHLFVBQUwsR0FBa0JBLFVBQWxCOztBQUNBLFVBQUksQ0FBQ0EsVUFBTCxFQUFpQjtBQUNmc0MsZUFBTyxDQUFDekMsS0FBUixDQUFjQSxLQUFkO0FBQ0E7QUFDRDs7QUFDRGtILHdCQUFrQjtBQUNsQjdILGNBQVEsQ0FBQyxJQUFELEVBQU9jLFVBQVAsQ0FBUjtBQUNELEtBUkQ7QUFTRDtBQUNGLENBdEJEO0FBdUJBOzs7OztBQUdBLE1BQU0rRyxrQkFBa0IsR0FBRyxTQUFyQkEsa0JBQXFCLEdBQWtDO0FBQUEsTUFBakMvRyxVQUFpQyx1RUFBcEJ3RyxJQUFJLENBQUN4RyxVQUFlO0FBQzNELFFBQU0rQixJQUFJLEdBQUdxRCxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsaUJBQXhCLENBQWI7QUFDQXRELE1BQUksQ0FBQ3VELFNBQUwsR0FBaUJ0RixVQUFVLENBQUMrQixJQUE1QjtBQUVBLFFBQU1pRixPQUFPLEdBQUc1QixRQUFRLENBQUNDLGNBQVQsQ0FBd0Isb0JBQXhCLENBQWhCO0FBQ0EyQixTQUFPLENBQUMxQixTQUFSLGNBQXdCdEYsVUFBVSxDQUFDK0IsSUFBbkMsbUJBQWdEL0IsVUFBVSxDQUFDZ0gsT0FBM0Q7QUFFQSxRQUFNQyxLQUFLLEdBQUc3QixRQUFRLENBQUNDLGNBQVQsQ0FBd0IsZ0JBQXhCLENBQWQ7QUFDQTRCLE9BQUssQ0FBQ0MsU0FBTixHQUFrQixnQkFBbEI7QUFDQUQsT0FBSyxDQUFDRSxHQUFOLEdBQVl0SSxpREFBUSxDQUFDeUMscUJBQVQsQ0FBK0J0QixVQUEvQixDQUFaO0FBRUEsUUFBTUksT0FBTyxHQUFHZ0YsUUFBUSxDQUFDQyxjQUFULENBQXdCLG9CQUF4QixDQUFoQjtBQUNBakYsU0FBTyxDQUFDa0YsU0FBUixHQUFvQnRGLFVBQVUsQ0FBQ08sWUFBL0IsQ0FaMkQsQ0FjM0Q7O0FBQ0EsTUFBSVAsVUFBVSxDQUFDb0gsZUFBZixFQUFnQztBQUM5QkMsMkJBQXVCO0FBQ3hCLEdBakIwRCxDQWtCM0Q7OztBQUNBeEksbURBQVEsQ0FBQ1csWUFBVCxDQUFzQlEsVUFBVSxDQUFDRCxFQUFqQyxFQUFxQyxDQUFDRixLQUFELEVBQVFGLE9BQVIsS0FBb0I7QUFDdkQySCxtQkFBZSxDQUFDM0gsT0FBRCxDQUFmO0FBRUQsR0FIRDtBQUlELENBdkJEO0FBMEJBOzs7OztBQUdBLE1BQU0wSCx1QkFBdUIsR0FBRyxTQUExQkEsdUJBQTBCLEdBQXNEO0FBQUEsTUFBckRFLGNBQXFELHVFQUFwQ2YsSUFBSSxDQUFDeEcsVUFBTCxDQUFnQm9ILGVBQW9CO0FBQ3BGLFFBQU1JLEtBQUssR0FBR3BDLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixrQkFBeEIsQ0FBZDs7QUFDQSxPQUFLLElBQUlvQyxHQUFULElBQWdCRixjQUFoQixFQUFnQztBQUM5QixVQUFNRyxHQUFHLEdBQUd0QyxRQUFRLENBQUN1QyxhQUFULENBQXVCLElBQXZCLENBQVo7QUFFQSxVQUFNQyxHQUFHLEdBQUd4QyxRQUFRLENBQUN1QyxhQUFULENBQXVCLElBQXZCLENBQVo7QUFDQUMsT0FBRyxDQUFDdEMsU0FBSixHQUFnQm1DLEdBQWhCO0FBQ0FDLE9BQUcsQ0FBQ0csV0FBSixDQUFnQkQsR0FBaEI7QUFFQSxVQUFNRSxJQUFJLEdBQUcxQyxRQUFRLENBQUN1QyxhQUFULENBQXVCLElBQXZCLENBQWI7QUFDQUcsUUFBSSxDQUFDeEMsU0FBTCxHQUFpQmlDLGNBQWMsQ0FBQ0UsR0FBRCxDQUEvQjtBQUNBQyxPQUFHLENBQUNHLFdBQUosQ0FBZ0JDLElBQWhCO0FBRUFOLFNBQUssQ0FBQ0ssV0FBTixDQUFrQkgsR0FBbEI7QUFDRDtBQUNGLENBZkQ7QUFpQkE7Ozs7O0FBR0EsTUFBTUosZUFBZSxHQUFHLFNBQWxCQSxlQUFrQixHQUF1QztBQUFBLE1BQXRDM0gsT0FBc0MsdUVBQTVCNkcsSUFBSSxDQUFDeEcsVUFBTCxDQUFnQkwsT0FBWTtBQUM3RCxRQUFNb0ksU0FBUyxHQUFHM0MsUUFBUSxDQUFDQyxjQUFULENBQXdCLG1CQUF4QixDQUFsQjtBQUNBLFFBQU12RCxLQUFLLEdBQUdzRCxRQUFRLENBQUN1QyxhQUFULENBQXVCLElBQXZCLENBQWQ7QUFDQTdGLE9BQUssQ0FBQ3dELFNBQU4sR0FBa0IsU0FBbEI7QUFDQXlDLFdBQVMsQ0FBQ0YsV0FBVixDQUFzQi9GLEtBQXRCOztBQUVBLE1BQUksQ0FBQ25DLE9BQUwsRUFBYztBQUNaLFVBQU1xSSxTQUFTLEdBQUc1QyxRQUFRLENBQUN1QyxhQUFULENBQXVCLEdBQXZCLENBQWxCO0FBQ0FLLGFBQVMsQ0FBQzFDLFNBQVYsR0FBc0IsaUJBQXRCO0FBQ0F5QyxhQUFTLENBQUNGLFdBQVYsQ0FBc0JHLFNBQXRCO0FBQ0E7QUFDRDs7QUFDRCxRQUFNQyxFQUFFLEdBQUc3QyxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsY0FBeEIsQ0FBWDtBQUNBMUYsU0FBTyxDQUFDdUksT0FBUixDQUFnQkMsTUFBTSxJQUFJO0FBQ3hCRixNQUFFLENBQUNKLFdBQUgsQ0FBZU8sZ0JBQWdCLENBQUNELE1BQUQsQ0FBL0I7QUFDRCxHQUZEO0FBR0FKLFdBQVMsQ0FBQ0YsV0FBVixDQUFzQkksRUFBdEI7QUFDRCxDQWpCRDtBQW1CQTs7Ozs7QUFHQSxNQUFNRyxnQkFBZ0IsR0FBSUQsTUFBRCxJQUFZO0FBQ25DLFFBQU1FLEVBQUUsR0FBR2pELFFBQVEsQ0FBQ3VDLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBWDtBQUNBVSxJQUFFLENBQUNDLFlBQUgsQ0FBZ0IsSUFBaEIsc0JBQW1DSCxNQUFNLENBQUNwSSxFQUExQztBQUNBLFFBQU1nQyxJQUFJLEdBQUdxRCxRQUFRLENBQUN1QyxhQUFULENBQXVCLEdBQXZCLENBQWI7QUFDQTVGLE1BQUksQ0FBQ3VELFNBQUwsR0FBaUI2QyxNQUFNLENBQUNwRyxJQUF4QjtBQUNBc0csSUFBRSxDQUFDUixXQUFILENBQWU5RixJQUFmO0FBRUEsUUFBTXdHLElBQUksR0FBR25ELFFBQVEsQ0FBQ3VDLGFBQVQsQ0FBdUIsR0FBdkIsQ0FBYjtBQUNBWSxNQUFJLENBQUNqRCxTQUFMLEdBQWlCLCtCQUFnQyxJQUFJa0QsSUFBSixDQUFTTCxNQUFNLENBQUNNLFNBQWhCLENBQUQsQ0FBNkJDLFlBQTdCLEVBQWhEO0FBQ0FMLElBQUUsQ0FBQ1IsV0FBSCxDQUFlVSxJQUFmO0FBRUEsUUFBTUksTUFBTSxHQUFHdkQsUUFBUSxDQUFDdUMsYUFBVCxDQUF1QixHQUF2QixDQUFmO0FBQ0FnQixRQUFNLENBQUNyRCxTQUFQLHFCQUE4QjZDLE1BQU0sQ0FBQ1EsTUFBckM7QUFDQU4sSUFBRSxDQUFDUixXQUFILENBQWVjLE1BQWY7QUFFQSxRQUFNQyxRQUFRLEdBQUd4RCxRQUFRLENBQUN1QyxhQUFULENBQXVCLEdBQXZCLENBQWpCO0FBQ0FpQixVQUFRLENBQUN0RCxTQUFULEdBQXFCNkMsTUFBTSxDQUFDUyxRQUE1QjtBQUNBUCxJQUFFLENBQUNSLFdBQUgsQ0FBZWUsUUFBZjtBQUdBLFNBQU9QLEVBQVA7QUFDRCxDQXJCRDtBQXVCQTs7Ozs7QUFHQSxNQUFNeEIsY0FBYyxHQUFHLFNBQWpCQSxjQUFpQixHQUFnQztBQUFBLE1BQS9CN0csVUFBK0IsdUVBQXBCd0csSUFBSSxDQUFDeEcsVUFBZTtBQUNyRCxRQUFNNkksVUFBVSxHQUFHekQsUUFBUSxDQUFDQyxjQUFULENBQXdCLFlBQXhCLENBQW5CO0FBQ0EsUUFBTWdELEVBQUUsR0FBR2pELFFBQVEsQ0FBQ3VDLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBWDtBQUNBVSxJQUFFLENBQUMvQyxTQUFILEdBQWV0RixVQUFVLENBQUMrQixJQUExQjtBQUNBOEcsWUFBVSxDQUFDaEIsV0FBWCxDQUF1QlEsRUFBdkI7QUFDRCxDQUxEO0FBT0E7Ozs7O0FBR0EsTUFBTXZCLGtCQUFrQixHQUFHLENBQUMvRSxJQUFELEVBQU9FLEdBQVAsS0FBZTtBQUN4QyxNQUFJLENBQUNBLEdBQUwsRUFDRUEsR0FBRyxHQUFHeUQsTUFBTSxDQUFDb0QsUUFBUCxDQUFnQkMsSUFBdEI7QUFDRmhILE1BQUksR0FBR0EsSUFBSSxDQUFDaUgsT0FBTCxDQUFhLFNBQWIsRUFBd0IsTUFBeEIsQ0FBUDtBQUNBLFFBQU1DLEtBQUssR0FBRyxJQUFJQyxNQUFKLGVBQWtCbkgsSUFBbEIsdUJBQWQ7QUFBQSxRQUNFMUIsT0FBTyxHQUFHNEksS0FBSyxDQUFDRSxJQUFOLENBQVdsSCxHQUFYLENBRFo7QUFFQSxNQUFJLENBQUM1QixPQUFMLEVBQ0UsT0FBTyxJQUFQO0FBQ0YsTUFBSSxDQUFDQSxPQUFPLENBQUMsQ0FBRCxDQUFaLEVBQ0UsT0FBTyxFQUFQO0FBQ0YsU0FBTytJLGtCQUFrQixDQUFDL0ksT0FBTyxDQUFDLENBQUQsQ0FBUCxDQUFXMkksT0FBWCxDQUFtQixLQUFuQixFQUEwQixHQUExQixDQUFELENBQXpCO0FBQ0QsQ0FYRDs7QUFhQSxNQUFNN0MsWUFBWSxHQUFHLE1BQU07QUFDekI3RCxTQUFPLENBQUNDLEdBQVIsQ0FBWSx3QkFBWjtBQUVBLE1BQUlGLFFBQVEsR0FBR2dILGFBQWEsRUFBNUI7O0FBQ0EsTUFBRyxDQUFDLGtCQUFrQkMsSUFBbEIsQ0FBdUJqSCxRQUFRLENBQUNOLElBQWhDLENBQUosRUFBMkM7QUFDekN3SCxTQUFLLENBQUMsMERBQUQsQ0FBTDtBQUNBO0FBQ0Q7O0FBQ0QsTUFBRyxDQUFDLGNBQWNELElBQWQsQ0FBbUJqSCxRQUFRLENBQUNzRyxNQUE1QixDQUFKLEVBQXlDO0FBQ3ZDWSxTQUFLLENBQUMsb0NBQUQsQ0FBTDtBQUNBO0FBQ0Q7O0FBQ0QsTUFBR2xILFFBQVEsQ0FBQ3VHLFFBQVQsQ0FBa0JoRixNQUFsQixHQUEyQixDQUE5QixFQUFpQztBQUMvQjJGLFNBQUssQ0FBQyxnREFBRCxDQUFMO0FBQ0E7QUFDRDs7QUFDRGxILFVBQVEsQ0FBQzVDLGFBQVQsR0FBeUIrRyxJQUFJLENBQUN4RyxVQUFMLENBQWdCRCxFQUF6QztBQUNBbEIsbURBQVEsQ0FBQ21FLGFBQVQsQ0FBdUJYLFFBQXZCLEVBQWlDakQsSUFBakMsQ0FBdUNvSyxNQUFNLElBQUk7QUFDL0NsSCxXQUFPLENBQUNDLEdBQVIsQ0FBWWlILE1BQVo7QUFDQSxRQUFJQyxRQUFRLEdBQUcsZ0JBQWY7QUFDQUYsU0FBSyxDQUFDRSxRQUFELENBQUw7QUFDQSxRQUFJQyxnQkFBZ0IsR0FBR3RCLGdCQUFnQixDQUFDb0IsTUFBRCxDQUF2QztBQUNBLFVBQU12QixFQUFFLEdBQUc3QyxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsY0FBeEIsQ0FBWDtBQUNBNEMsTUFBRSxDQUFDSixXQUFILENBQWU2QixnQkFBZjtBQUNBLFFBQUlDLE9BQU8sR0FBR3ZFLFFBQVEsQ0FBQ0MsY0FBVCxxQkFBcUNtRSxNQUFNLENBQUN6SixFQUE1QyxFQUFkOztBQUNBLFFBQUc0SixPQUFPLENBQUNDLGNBQVIsSUFBMEJELE9BQU8sQ0FBQ0MsY0FBUixDQUF1QkMsV0FBdkIsS0FBdUNDLFFBQXBFLEVBQThFO0FBQzVFSCxhQUFPLENBQUNDLGNBQVIsQ0FBdUIsSUFBdkI7QUFDRDtBQUNGLEdBWEQ7QUFZRCxDQTdCRDs7QUErQkEsTUFBTVAsYUFBYSxHQUFHLE1BQU07QUFDMUIsU0FBTztBQUNMdEgsUUFBSSxFQUFFcUQsUUFBUSxDQUFDQyxjQUFULENBQXdCLE1BQXhCLEVBQWdDckIsS0FBaEMsQ0FBc0MrRixJQUF0QyxFQUREO0FBRUxwQixVQUFNLEVBQUV2RCxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsUUFBeEIsRUFBa0NyQixLQUFsQyxDQUF3QytGLElBQXhDLEVBRkg7QUFHTG5CLFlBQVEsRUFBRXhELFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixjQUF4QixFQUF3Q3JCLEtBQXhDLENBQThDK0YsSUFBOUM7QUFITCxHQUFQO0FBS0QsQ0FORCxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqUEEsTUFBTUMsWUFBWSxHQUFHLEdBQXJCO0FBQ0EsTUFBTUMsWUFBWSwrQkFBd0JELFlBQXhCLENBQWxCO0FBQ0EsTUFBTUUsWUFBWSxtQkFBbEI7QUFDQSxNQUFNQyxTQUFTLEdBQUcsQ0FDaEJGLFlBRGdCLEVBRWhCQyxZQUZnQixDQUFsQjtBQUlBO0FBQ0E7QUFFQSxNQUFNMUgsU0FBUyxHQUFHNEgsa0RBQU0sQ0FBQyxPQUFELEVBQVUsQ0FBVixFQUFhO0FBQ25DQyxTQUFPLENBQUM1SCxFQUFELEVBQUs2SCxVQUFMLEVBQWlCO0FBQ3RCLFlBQVFBLFVBQVI7QUFDRSxXQUFLLENBQUw7QUFDRSxjQUFNMUgsS0FBSyxHQUFHSCxFQUFFLENBQUM4SCxpQkFBSCxDQUFxQixhQUFyQixFQUFvQztBQUFFQyxpQkFBTyxFQUFFO0FBQVgsU0FBcEMsQ0FBZDtBQUNBNUgsYUFBSyxDQUFDNkgsV0FBTixDQUFrQixJQUFsQixFQUF3QixJQUF4Qjs7QUFDRixXQUFLLENBQUw7QUFDRSxjQUFNQyxZQUFZLEdBQUdqSSxFQUFFLENBQUM4SCxpQkFBSCxDQUFxQixTQUFyQixFQUFnQztBQUNuREMsaUJBQU8sRUFBRSxJQUQwQztBQUVuREcsdUJBQWEsRUFBRTtBQUZvQyxTQUFoQyxDQUFyQjtBQUlBRCxvQkFBWSxDQUFDRCxXQUFiLENBQXlCLGVBQXpCLEVBQTBDLGVBQTFDOztBQUNGLFdBQUssQ0FBTDtBQUNFLGNBQU1HLFlBQVksR0FBR25JLEVBQUUsQ0FBQzhILGlCQUFILENBQXFCLFNBQXJCLEVBQWdDO0FBQ25EQyxpQkFBTyxFQUFFLElBRDBDO0FBRW5ERyx1QkFBYSxFQUFFO0FBRm9DLFNBQWhDLENBQXJCO0FBWEo7QUFnQkQ7O0FBbEJrQyxDQUFiLENBQXhCOztBQXFCQyxNQUFNRSxjQUFjLEdBQUk1RSxLQUFELElBQVc7QUFDL0IsU0FBTyxJQUFJOUMsT0FBSixDQUFZLFVBQVNDLE9BQVQsRUFBa0JDLE1BQWxCLEVBQTBCO0FBQzNDbEUsU0FBSyxDQUFDOEcsS0FBSyxDQUFDNkUsT0FBUCxDQUFMLENBQ0MxTCxJQURELENBQ00yTCxJQUFJLElBQUlBLElBQUksQ0FBQ3pMLElBQUwsRUFEZCxFQUVDRixJQUZELENBRU1FLElBQUksSUFBSTtBQUFFOEQsYUFBTyxDQUFDOUQsSUFBRCxDQUFQO0FBQWdCLEtBRmhDLEVBR0NNLEtBSEQsQ0FHT0MsS0FBSyxJQUFJO0FBQ2R5QyxhQUFPLENBQUNDLEdBQVIsQ0FBWTFDLEtBQVo7QUFDQXdELFlBQU0sQ0FBQ3hELEtBQUQsQ0FBTjtBQUNELEtBTkQ7QUFPRCxHQVJNLENBQVA7QUFTRCxDQVZGOztBQVlELFNBQVNtTCxVQUFULENBQW9CL0ksR0FBcEIsRUFBeUI7QUFDdkIsTUFBSWdKLFFBQVEsR0FBRyxDQUFDLEtBQUQsRUFBUSxLQUFSLEVBQWUsTUFBZixFQUF1QixLQUF2QixFQUE4QixLQUE5QixDQUFmO0FBQ0EsTUFBSUMsT0FBTyxHQUFHLEtBQWQ7O0FBQ0EsT0FBSyxJQUFJQyxJQUFULElBQWlCRixRQUFqQixFQUEyQjtBQUN6QixRQUFJaEosR0FBRyxDQUFDbUosUUFBSixDQUFhRCxJQUFiLENBQUosRUFBd0I7QUFBRUQsYUFBTyxHQUFHLElBQVY7QUFBZ0I7QUFBTTs7QUFBQTtBQUNqRDs7QUFDRCxTQUFPQSxPQUFQO0FBQ0Q7O0FBRUQxRSxJQUFJLENBQUNiLGdCQUFMLENBQXNCLFNBQXRCLEVBQWlDTSxLQUFLLElBQUk7QUFDeENBLE9BQUssQ0FBQ29GLFNBQU4sQ0FDRUMsTUFBTSxDQUFDQyxJQUFQLENBQVl0QixZQUFaLEVBQTBCN0ssSUFBMUIsQ0FBK0JvTSxLQUFLLElBQUk7QUFDdEMsV0FBT0EsS0FBSyxDQUFDQyxNQUFOLENBQWEsQ0FDbEIsR0FEa0IsRUFFbEIsaUJBRmtCLEVBR2xCLHdCQUhrQixDQUFiLEVBSUo3TCxLQUpJLENBSUVDLEtBQUssSUFBSTtBQUNoQnlDLGFBQU8sQ0FBQ0MsR0FBUixDQUFZLHVDQUFaO0FBQ0QsS0FOTSxDQUFQO0FBT0QsR0FSRCxDQURGO0FBV0QsQ0FaRCxFLENBY0E7O0FBQ0FpRSxJQUFJLENBQUNiLGdCQUFMLENBQXNCLFVBQXRCLEVBQWtDTSxLQUFLLElBQUk7QUFDekNBLE9BQUssQ0FBQ29GLFNBQU4sQ0FDRUMsTUFBTSxDQUFDSSxJQUFQLEdBQWN0TSxJQUFkLENBQW1CdU0sVUFBVSxJQUFJO0FBQy9CckosV0FBTyxDQUFDQyxHQUFSLENBQVkscUJBQVo7QUFDQSxXQUFPWSxPQUFPLENBQUN5SSxHQUFSLENBQ0xELFVBQVUsQ0FBQ3JMLE1BQVgsQ0FBa0J1TCxTQUFTLElBQUk7QUFDN0IsYUFBT0EsU0FBUyxDQUFDQyxVQUFWLENBQXFCLGFBQXJCLEtBQ0FELFNBQVMsSUFBSTVCLFlBRHBCO0FBRUQsS0FIRCxFQUdHcEosR0FISCxDQUdPZ0wsU0FBUyxJQUFJO0FBQ2xCdkosYUFBTyxDQUFDQyxHQUFSLG9CQUF3QnNKLFNBQXhCO0FBQ0EsYUFBT1AsTUFBTSxDQUFDckgsTUFBUCxDQUFjNEgsU0FBZCxDQUFQO0FBQ0QsS0FORCxDQURLLENBQVA7QUFTRCxHQVhELENBREY7QUFjRCxDQWZEO0FBa0JBckYsSUFBSSxDQUFDYixnQkFBTCxDQUFzQixPQUF0QixFQUErQk0sS0FBSyxJQUFJO0FBQ3RDLE1BQUk4RixRQUFRLEdBQUcsSUFBSUMsR0FBSixDQUFRL0YsS0FBSyxDQUFDNkUsT0FBTixDQUFjN0ksR0FBdEIsQ0FBZjs7QUFDQSxNQUFJOEosUUFBUSxDQUFDaE4sSUFBVCxLQUFrQixNQUF0QixFQUE4QjtBQUM1QixRQUFJZ0IsRUFBRSxHQUFHZ00sUUFBUSxDQUFDRSxZQUFULENBQXNCakgsR0FBdEIsQ0FBMEIsZUFBMUIsSUFBNkMsQ0FBdEQ7QUFDQTFDLFdBQU8sQ0FBQ0MsR0FBUixDQUFZeEMsRUFBWjtBQUNBLFdBQU9tTSxlQUFlLENBQUNqRyxLQUFELEVBQVFsRyxFQUFSLENBQXRCO0FBQ0QsR0FKRCxNQUlPO0FBQ0xvTSxzQkFBa0IsQ0FBQ2xHLEtBQUQsQ0FBbEI7QUFDRDtBQUNGLENBVEQ7O0FBV0EsTUFBTWlHLGVBQWUsR0FBRyxDQUFDakcsS0FBRCxFQUFRbEcsRUFBUixLQUFlO0FBQ3JDO0FBQ0EsTUFBR2tHLEtBQUssQ0FBQzZFLE9BQU4sQ0FBYzdILE1BQWQsS0FBeUIsS0FBNUIsRUFBbUM7QUFDakNnRCxTQUFLLENBQUNtRyxXQUFOLENBQW1Cak4sS0FBSyxDQUFDOEcsS0FBSyxDQUFDNkUsT0FBUCxDQUF4QjtBQUNELEdBRkQsTUFFTyxJQUFHN0UsS0FBSyxDQUFDNkUsT0FBTixDQUFjN0ksR0FBZCxDQUFrQmhCLE9BQWxCLENBQTBCLGFBQTFCLElBQTJDLENBQUMsQ0FBL0MsRUFBa0Q7QUFDdkRvTCwwQkFBc0IsQ0FBQ3BHLEtBQUQsQ0FBdEI7QUFDRCxHQUZNLE1BRUE7QUFDTDNELFdBQU8sQ0FBQ0MsR0FBUixDQUFZLHNDQUFaO0FBQ0ErSix1QkFBbUIsQ0FBQ3JHLEtBQUQsRUFBUWxHLEVBQVIsQ0FBbkI7QUFDRDtBQUNGLENBVkQ7O0FBWUEsTUFBTXNNLHNCQUFzQixHQUFJcEcsS0FBRCxJQUFXO0FBQ3hDQSxPQUFLLENBQUNtRyxXQUFOLENBQ0k1SixTQUFTLENBQUNwRCxJQUFWLENBQWdCcUQsRUFBRSxJQUFJO0FBQ3BCLFdBQU9BLEVBQUUsQ0FDTkUsV0FESSxDQUNRLGFBRFIsRUFFSkUsV0FGSSxDQUVRLGFBRlIsRUFHSjBKLE1BSEksRUFBUDtBQUlELEdBTEQsRUFLR25OLElBTEgsQ0FLUWtFLElBQUksSUFBSTtBQUNkLFdBQVNBLElBQUksQ0FBQ00sTUFBTCxJQUFlTixJQUFoQixJQUF5QnVILGNBQWMsQ0FBQzVFLEtBQUQsQ0FBZCxDQUM5QjdHLElBRDhCLENBQ3hCRyxXQUFXLElBQUk7QUFDcEIrQyxhQUFPLENBQUNDLEdBQVIsQ0FBWSxxQkFBWjtBQUNBLGFBQU9DLFNBQVMsQ0FBQ3BELElBQVYsQ0FBZXFELEVBQUUsSUFBSTtBQUMxQixZQUFJQyxFQUFFLEdBQUdELEVBQUUsQ0FBQ0UsV0FBSCxDQUFlLGFBQWYsRUFBOEIsV0FBOUIsQ0FBVDtBQUNBLFlBQUlDLEtBQUssR0FBR0YsRUFBRSxDQUFDRyxXQUFILENBQWUsYUFBZixDQUFaO0FBQ0F0RCxtQkFBVyxDQUFDMkksT0FBWixDQUFvQixVQUFTbEksVUFBVCxFQUFvQjtBQUN0QzRDLGVBQUssQ0FBQ0UsR0FBTixDQUFVOUMsVUFBVjtBQUNELFNBRkQ7QUFHQSxlQUFPMEMsRUFBRSxDQUFDSyxJQUFWO0FBQ0QsT0FQTSxFQU9KM0QsSUFQSSxDQU9FLE1BQU07QUFDYmtELGVBQU8sQ0FBQ0MsR0FBUixDQUFZLG1DQUFaO0FBQ0EsZUFBT2hELFdBQVA7QUFDRCxPQVZNLENBQVA7QUFXRCxLQWQ4QixDQUFqQztBQWdCRCxHQXRCRCxFQXVCR0gsSUF2QkgsQ0F1QlFvTixhQUFhLElBQUk7QUFDckJsSyxXQUFPLENBQUNDLEdBQVIsQ0FBWWlLLGFBQVo7QUFDQSxXQUFPLElBQUlDLFFBQUosQ0FBYXRJLElBQUksQ0FBQ0MsU0FBTCxDQUFlb0ksYUFBZixDQUFiLENBQVA7QUFDRCxHQTFCSCxFQTBCSzVNLEtBMUJMLENBMEJXQyxLQUFLLElBQUk7QUFDaEIsV0FBTyxJQUFJNE0sUUFBSixDQUFhLHFCQUFiLEVBQW9DO0FBQUNDLFlBQU0sRUFBRTtBQUFULEtBQXBDLENBQVA7QUFDTCxHQTVCQyxDQURKO0FBK0JELENBaENEOztBQWtDQSxNQUFNSixtQkFBbUIsR0FBRyxDQUFDckcsS0FBRCxFQUFRbEcsRUFBUixLQUFlO0FBQ3pDa0csT0FBSyxDQUFDbUcsV0FBTixDQUNFNUosU0FBUyxDQUFDcEQsSUFBVixDQUFlcUQsRUFBRSxJQUFJO0FBQ25CLFdBQU9BLEVBQUUsQ0FDTkUsV0FESSxDQUNRLFNBRFIsRUFFSkUsV0FGSSxDQUVRLFNBRlIsRUFHSjhKLEtBSEksQ0FHRSxlQUhGLEVBSUpKLE1BSkksQ0FJR3hNLEVBSkgsQ0FBUDtBQUtELEdBTkQsRUFNR1gsSUFOSCxDQU1Ta0UsSUFBSSxJQUFJO0FBQ2ZoQixXQUFPLENBQUNDLEdBQVIsQ0FBWSw4QkFBWjtBQUNBRCxXQUFPLENBQUNDLEdBQVIsQ0FBWWUsSUFBWjtBQUNBLFdBQVFBLElBQUksQ0FBQ00sTUFBTCxJQUFlTixJQUFoQixJQUF5Qm5FLEtBQUssQ0FBQzhHLEtBQUssQ0FBQzZFLE9BQVAsQ0FBTCxDQUM3QjFMLElBRDZCLENBQ3hCd04sYUFBYSxJQUFJO0FBQ3JCLGFBQU9BLGFBQWEsQ0FBQ3ROLElBQWQsRUFBUDtBQUNELEtBSDZCLEVBSTdCRixJQUo2QixDQUl2Qk8sT0FBTyxJQUFJO0FBQ2hCMkMsYUFBTyxDQUFDQyxHQUFSLENBQVksMkJBQVo7QUFDQUQsYUFBTyxDQUFDQyxHQUFSLENBQVksMkJBQVo7QUFDQSxhQUFPQyxTQUFTLENBQUNwRCxJQUFWLENBQWVxRCxFQUFFLElBQUk7QUFDMUIsWUFBSUMsRUFBRSxHQUFHRCxFQUFFLENBQUNFLFdBQUgsQ0FBZSxTQUFmLEVBQTBCLFdBQTFCLENBQVQ7QUFDQSxZQUFJQyxLQUFLLEdBQUdGLEVBQUUsQ0FBQ0csV0FBSCxDQUFlLFNBQWYsQ0FBWjtBQUNBbEQsZUFBTyxDQUFDdUksT0FBUixDQUFnQixVQUFTQyxNQUFULEVBQWlCO0FBQy9CdkYsZUFBSyxDQUFDRSxHQUFOLENBQVVxRixNQUFWO0FBQ0QsU0FGRDtBQUdBLGVBQU96RixFQUFFLENBQUNLLElBQVY7QUFDRCxPQVBNLEVBUU4zRCxJQVJNLENBUUEsTUFBTU8sT0FSTixDQUFQO0FBU0QsS0FoQjZCLENBQWhDO0FBaUJELEdBMUJELEVBMEJHUCxJQTFCSCxDQTBCUW9OLGFBQWEsSUFBSTtBQUN2QixXQUFPLElBQUlDLFFBQUosQ0FBYXRJLElBQUksQ0FBQ0MsU0FBTCxDQUFlb0ksYUFBZixDQUFiLENBQVA7QUFDRCxHQTVCRCxFQTRCRzVNLEtBNUJILENBNEJTQyxLQUFLLElBQUk7QUFDaEIsV0FBTyxJQUFJNE0sUUFBSixDQUFhLHFCQUFiLEVBQW9DO0FBQUNDLFlBQU0sRUFBRTtBQUFULEtBQXBDLENBQVA7QUFDRCxHQTlCRCxDQURGO0FBZ0NELENBakNEOztBQW1DQSxNQUFNUCxrQkFBa0IsR0FBSWxHLEtBQUQsSUFBVztBQUNwQztBQUNBO0FBQ0E7QUFDQUEsT0FBSyxDQUFDbUcsV0FBTixDQUNFZCxNQUFNLENBQUN1QixLQUFQLENBQWE1RyxLQUFLLENBQUM2RSxPQUFuQixFQUE0QjFMLElBQTVCLENBQWlDQyxRQUFRLElBQUk7QUFDM0MsV0FBT0EsUUFBUSxJQUFJRixLQUFLLENBQUM4RyxLQUFLLENBQUM2RSxPQUFQLENBQUwsQ0FBcUIxTCxJQUFyQixDQUEwQndOLGFBQWEsSUFBSTtBQUM1RCxVQUFJRSxRQUFRLEdBQUc5QixVQUFVLENBQUMvRSxLQUFLLENBQUM2RSxPQUFOLENBQWM3SSxHQUFmLENBQVYsR0FBaUNpSSxZQUFqQyxHQUFnREQsWUFBL0Q7QUFDQSxhQUFPcUIsTUFBTSxDQUNWQyxJQURJLENBQ0N1QixRQURELEVBRUoxTixJQUZJLENBRUNvTSxLQUFLLElBQUk7QUFDYkEsYUFBSyxDQUFDMUksR0FBTixDQUFVbUQsS0FBSyxDQUFDNkUsT0FBaEIsRUFBeUI4QixhQUFhLENBQUNHLEtBQWQsRUFBekI7QUFDQSxlQUFPSCxhQUFQO0FBQ0gsT0FMTSxDQUFQO0FBTUQsS0FSa0IsRUFRaEJoTixLQVJnQixDQVFWQyxLQUFLLElBQUk7QUFDaEIsYUFBTyxJQUFJNE0sUUFBSixDQUFhLDhDQUFiLEVBQTZEO0FBQ2xFQyxjQUFNLEVBQUUsR0FEMEQ7QUFFbEVNLGtCQUFVLEVBQUU7QUFGc0QsT0FBN0QsQ0FBUDtBQUlELEtBYmtCLENBQW5CO0FBY0QsR0FmRCxDQURGLEVBSm9DLENBdUJwQzs7QUFDQS9HLE9BQUssQ0FBQ29GLFNBQU4sQ0FBZ0I0QixNQUFNLENBQUNoSCxLQUFLLENBQUM2RSxPQUFQLENBQXRCO0FBQ0QsQ0F6QkQ7O0FBMkJBLE1BQU1tQyxNQUFNLEdBQUluQyxPQUFELElBQWE7QUFDMUIsTUFBSWdDLFFBQVEsR0FBRzlCLFVBQVUsQ0FBQ0YsT0FBTyxDQUFDN0ksR0FBVCxDQUFWLEdBQTJCaUksWUFBM0IsR0FBMENELFlBQXpEO0FBQ0EzSCxTQUFPLENBQUNDLEdBQVIsQ0FBWXVLLFFBQVo7QUFDQSxTQUFPeEIsTUFBTSxDQUFDQyxJQUFQLENBQVl1QixRQUFaLEVBQXNCMU4sSUFBdEIsQ0FBMkJvTSxLQUFLLElBQUk7QUFDekMsV0FBT3JNLEtBQUssQ0FBQzJMLE9BQUQsQ0FBTCxDQUFlMUwsSUFBZixDQUFvQkMsUUFBUSxJQUFJO0FBQ3JDaUQsYUFBTyxDQUFDQyxHQUFSLENBQVksb0JBQVo7QUFDQSxhQUFPaUosS0FBSyxDQUFDMUksR0FBTixDQUFVZ0ksT0FBVixFQUFtQnpMLFFBQW5CLENBQVA7QUFDRCxLQUhNLENBQVA7QUFJRCxHQUxNLENBQVA7QUFNRCxDQVRELEM7Ozs7Ozs7Ozs7O0FDNU1BO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNIQTtBQUNBLGtCQUFrQixtQkFBTyxDQUFDLHNEQUFRO0FBQ2xDO0FBQ0EsMENBQTBDLG1CQUFPLENBQUMsd0RBQVMsNkJBQTZCO0FBQ3hGO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ05hO0FBQ2IsU0FBUyxtQkFBTyxDQUFDLGtFQUFjOztBQUUvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNQQSxlQUFlLG1CQUFPLENBQUMsa0VBQWM7QUFDckM7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ0pBO0FBQ0E7QUFDQSxnQkFBZ0IsbUJBQU8sQ0FBQyxvRUFBZTtBQUN2QyxlQUFlLG1CQUFPLENBQUMsa0VBQWM7QUFDckMsc0JBQXNCLG1CQUFPLENBQUMsa0ZBQXNCO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSyxZQUFZLGVBQWU7QUFDaEM7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7Ozs7Ozs7Ozs7O0FDdEJBO0FBQ0EsVUFBVSxtQkFBTyxDQUFDLHNEQUFRO0FBQzFCLFVBQVUsbUJBQU8sQ0FBQyxzREFBUTtBQUMxQjtBQUNBLDJCQUEyQixrQkFBa0IsRUFBRTs7QUFFL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHLFlBQVk7QUFDZjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDdEJBLGlCQUFpQjs7QUFFakI7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNKQSw2QkFBNkI7QUFDN0IsdUNBQXVDOzs7Ozs7Ozs7Ozs7QUNEdkM7QUFDQSxnQkFBZ0IsbUJBQU8sQ0FBQyxvRUFBZTtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNKQTtBQUNBLGtCQUFrQixtQkFBTyxDQUFDLDBEQUFVO0FBQ3BDLGlDQUFpQyxRQUFRLG1CQUFtQixVQUFVLEVBQUUsRUFBRTtBQUMxRSxDQUFDOzs7Ozs7Ozs7Ozs7QUNIRCxlQUFlLG1CQUFPLENBQUMsa0VBQWM7QUFDckMsZUFBZSxtQkFBTyxDQUFDLDREQUFXO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ05BO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNIQSxhQUFhLG1CQUFPLENBQUMsNERBQVc7QUFDaEMsV0FBVyxtQkFBTyxDQUFDLHdEQUFTO0FBQzVCLFdBQVcsbUJBQU8sQ0FBQyx3REFBUztBQUM1QixlQUFlLG1CQUFPLENBQUMsZ0VBQWE7QUFDcEMsVUFBVSxtQkFBTyxDQUFDLHNEQUFRO0FBQzFCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtGQUFrRix1QkFBdUI7QUFDekcsaUVBQWlFO0FBQ2pFLCtEQUErRDtBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2QsY0FBYztBQUNkLGNBQWM7QUFDZCxjQUFjO0FBQ2QsZUFBZTtBQUNmLGVBQWU7QUFDZixlQUFlO0FBQ2YsZ0JBQWdCO0FBQ2hCOzs7Ozs7Ozs7Ozs7QUMxQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ05hO0FBQ2IsbUJBQU8sQ0FBQyw0RUFBbUI7QUFDM0IsZUFBZSxtQkFBTyxDQUFDLGdFQUFhO0FBQ3BDLFdBQVcsbUJBQU8sQ0FBQyx3REFBUztBQUM1QixZQUFZLG1CQUFPLENBQUMsMERBQVU7QUFDOUIsY0FBYyxtQkFBTyxDQUFDLDhEQUFZO0FBQ2xDLFVBQVUsbUJBQU8sQ0FBQyxzREFBUTtBQUMxQixpQkFBaUIsbUJBQU8sQ0FBQyxzRUFBZ0I7O0FBRXpDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsNENBQTRDO0FBQ3JFO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLFVBQVU7QUFDdkM7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLG1CQUFtQixhQUFhO0FBQzNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDLFdBQVc7QUFDeEQ7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLHFDQUFxQztBQUNyRTtBQUNBO0FBQ0EsMkJBQTJCLGdDQUFnQztBQUMzRDtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUMvRmE7QUFDYjtBQUNBLGVBQWUsbUJBQU8sQ0FBQyxrRUFBYztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDWkEsaUJBQWlCLG1CQUFPLENBQUMsNERBQVc7Ozs7Ozs7Ozs7OztBQ0FwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDOzs7Ozs7Ozs7Ozs7QUNMekMsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDSEEsU0FBUyxtQkFBTyxDQUFDLGtFQUFjO0FBQy9CLGlCQUFpQixtQkFBTyxDQUFDLDBFQUFrQjtBQUMzQyxpQkFBaUIsbUJBQU8sQ0FBQyxzRUFBZ0I7QUFDekM7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNQQSxlQUFlLG1CQUFPLENBQUMsNERBQVc7QUFDbEM7Ozs7Ozs7Ozs7OztBQ0RBLGtCQUFrQixtQkFBTyxDQUFDLHNFQUFnQixNQUFNLG1CQUFPLENBQUMsMERBQVU7QUFDbEUsK0JBQStCLG1CQUFPLENBQUMsb0VBQWUsZ0JBQWdCLG1CQUFtQixVQUFVLEVBQUUsRUFBRTtBQUN2RyxDQUFDOzs7Ozs7Ozs7Ozs7QUNGRCxlQUFlLG1CQUFPLENBQUMsa0VBQWM7QUFDckMscUJBQXFCLG1CQUFPLENBQUMsa0VBQWM7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7Ozs7Ozs7Ozs7O0FDUkE7QUFDQSxVQUFVLG1CQUFPLENBQUMsc0RBQVE7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ0xBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDRkE7QUFDQSxlQUFlLG1CQUFPLENBQUMsa0VBQWM7QUFDckMsVUFBVSxtQkFBTyxDQUFDLHNEQUFRO0FBQzFCLFlBQVksbUJBQU8sQ0FBQyxzREFBUTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ1BhO0FBQ2IsYUFBYSxtQkFBTyxDQUFDLDBFQUFrQjtBQUN2QyxpQkFBaUIsbUJBQU8sQ0FBQywwRUFBa0I7QUFDM0MscUJBQXFCLG1CQUFPLENBQUMsa0ZBQXNCO0FBQ25EOztBQUVBO0FBQ0EsbUJBQU8sQ0FBQyx3REFBUyxxQkFBcUIsbUJBQU8sQ0FBQyxzREFBUSw0QkFBNEIsYUFBYSxFQUFFOztBQUVqRztBQUNBLHFEQUFxRCw0QkFBNEI7QUFDakY7QUFDQTs7Ozs7Ozs7Ozs7OztBQ1phO0FBQ2IsY0FBYyxtQkFBTyxDQUFDLDhEQUFZO0FBQ2xDLGNBQWMsbUJBQU8sQ0FBQyw0REFBVztBQUNqQyxlQUFlLG1CQUFPLENBQUMsZ0VBQWE7QUFDcEMsV0FBVyxtQkFBTyxDQUFDLHdEQUFTO0FBQzVCLGdCQUFnQixtQkFBTyxDQUFDLGtFQUFjO0FBQ3RDLGtCQUFrQixtQkFBTyxDQUFDLHNFQUFnQjtBQUMxQyxxQkFBcUIsbUJBQU8sQ0FBQyxrRkFBc0I7QUFDbkQscUJBQXFCLG1CQUFPLENBQUMsb0VBQWU7QUFDNUMsZUFBZSxtQkFBTyxDQUFDLHNEQUFRO0FBQy9CLDhDQUE4QztBQUM5QztBQUNBO0FBQ0E7O0FBRUEsOEJBQThCLGFBQWE7O0FBRTNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsb0NBQW9DO0FBQzdFLDZDQUE2QyxvQ0FBb0M7QUFDakYsS0FBSyw0QkFBNEIsb0NBQW9DO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsbUJBQW1CO0FBQ25DO0FBQ0E7QUFDQSxrQ0FBa0MsMkJBQTJCO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDcEVBO0FBQ0EsVUFBVTtBQUNWOzs7Ozs7Ozs7Ozs7QUNGQTs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0EsZUFBZSxtQkFBTyxDQUFDLGtFQUFjO0FBQ3JDLFVBQVUsbUJBQU8sQ0FBQyxvRUFBZTtBQUNqQyxrQkFBa0IsbUJBQU8sQ0FBQywwRUFBa0I7QUFDNUMsZUFBZSxtQkFBTyxDQUFDLG9FQUFlO0FBQ3RDLHlCQUF5QjtBQUN6Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLG1CQUFPLENBQUMsb0VBQWU7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsbUJBQU8sQ0FBQyx3REFBUztBQUNuQiw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOzs7Ozs7Ozs7Ozs7QUN4Q0EsZUFBZSxtQkFBTyxDQUFDLGtFQUFjO0FBQ3JDLHFCQUFxQixtQkFBTyxDQUFDLDRFQUFtQjtBQUNoRCxrQkFBa0IsbUJBQU8sQ0FBQyx3RUFBaUI7QUFDM0M7O0FBRUEsWUFBWSxtQkFBTyxDQUFDLHNFQUFnQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRyxZQUFZO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2ZBLFNBQVMsbUJBQU8sQ0FBQyxrRUFBYztBQUMvQixlQUFlLG1CQUFPLENBQUMsa0VBQWM7QUFDckMsY0FBYyxtQkFBTyxDQUFDLHNFQUFnQjs7QUFFdEMsaUJBQWlCLG1CQUFPLENBQUMsc0VBQWdCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ1pBLFVBQVUsbUJBQU8sQ0FBQyxvRUFBZTtBQUNqQyxpQkFBaUIsbUJBQU8sQ0FBQywwRUFBa0I7QUFDM0MsZ0JBQWdCLG1CQUFPLENBQUMsb0VBQWU7QUFDdkMsa0JBQWtCLG1CQUFPLENBQUMsd0VBQWlCO0FBQzNDLFVBQVUsbUJBQU8sQ0FBQyxzREFBUTtBQUMxQixxQkFBcUIsbUJBQU8sQ0FBQyw0RUFBbUI7QUFDaEQ7O0FBRUEsWUFBWSxtQkFBTyxDQUFDLHNFQUFnQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUcsWUFBWTtBQUNmO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2ZBO0FBQ0EsWUFBWSxtQkFBTyxDQUFDLHdGQUF5QjtBQUM3QyxpQkFBaUIsbUJBQU8sQ0FBQywwRUFBa0I7O0FBRTNDO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQSxVQUFVLG1CQUFPLENBQUMsc0RBQVE7QUFDMUIsZUFBZSxtQkFBTyxDQUFDLGtFQUFjO0FBQ3JDLGVBQWUsbUJBQU8sQ0FBQyxvRUFBZTtBQUN0Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOzs7Ozs7Ozs7Ozs7QUNaQSxVQUFVLG1CQUFPLENBQUMsc0RBQVE7QUFDMUIsZ0JBQWdCLG1CQUFPLENBQUMsb0VBQWU7QUFDdkMsbUJBQW1CLG1CQUFPLENBQUMsNEVBQW1CO0FBQzlDLGVBQWUsbUJBQU8sQ0FBQyxvRUFBZTs7QUFFdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNoQkE7QUFDQSxZQUFZLG1CQUFPLENBQUMsd0ZBQXlCO0FBQzdDLGtCQUFrQixtQkFBTyxDQUFDLDBFQUFrQjs7QUFFNUM7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNOQSxjQUFjOzs7Ozs7Ozs7Ozs7QUNBZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNQQSxhQUFhLG1CQUFPLENBQUMsNERBQVc7QUFDaEMsV0FBVyxtQkFBTyxDQUFDLHdEQUFTO0FBQzVCLFVBQVUsbUJBQU8sQ0FBQyxzREFBUTtBQUMxQixVQUFVLG1CQUFPLENBQUMsc0RBQVE7QUFDMUIsZ0JBQWdCLG1CQUFPLENBQUMsb0ZBQXVCO0FBQy9DO0FBQ0E7O0FBRUEsbUJBQU8sQ0FBQyx3REFBUztBQUNqQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7OztBQzlCWTs7QUFFYixjQUFjLG1CQUFPLENBQUMsOERBQVk7QUFDbEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNwQmE7O0FBRWIsa0JBQWtCLG1CQUFPLENBQUMsMERBQVU7O0FBRXBDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsMEJBQTBCO0FBQzdDO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7QUN6REE7QUFDQTtBQUNBLGVBQWUsbUJBQU8sQ0FBQyxrRUFBYztBQUNyQyxlQUFlLG1CQUFPLENBQUMsa0VBQWM7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRDtBQUNsRDtBQUNBO0FBQ0EsY0FBYyxtQkFBTyxDQUFDLHNEQUFRLGlCQUFpQixtQkFBTyxDQUFDLHNFQUFnQjtBQUN2RTtBQUNBO0FBQ0EsT0FBTyxZQUFZLGNBQWM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSyxHQUFHO0FBQ1I7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3hCYTtBQUNiLGFBQWEsbUJBQU8sQ0FBQyw0REFBVztBQUNoQyxTQUFTLG1CQUFPLENBQUMsa0VBQWM7QUFDL0Isa0JBQWtCLG1CQUFPLENBQUMsc0VBQWdCO0FBQzFDLGNBQWMsbUJBQU8sQ0FBQyxzREFBUTs7QUFFOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsYUFBYTtBQUNuQyxHQUFHO0FBQ0g7Ozs7Ozs7Ozs7OztBQ1pBLFVBQVUsbUJBQU8sQ0FBQyxrRUFBYztBQUNoQyxVQUFVLG1CQUFPLENBQUMsc0RBQVE7QUFDMUIsVUFBVSxtQkFBTyxDQUFDLHNEQUFROztBQUUxQjtBQUNBLG9FQUFvRSxpQ0FBaUM7QUFDckc7Ozs7Ozs7Ozs7OztBQ05BLGFBQWEsbUJBQU8sQ0FBQyw0REFBVztBQUNoQyxVQUFVLG1CQUFPLENBQUMsc0RBQVE7QUFDMUI7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNKQSxXQUFXLG1CQUFPLENBQUMsd0RBQVM7QUFDNUIsYUFBYSxtQkFBTyxDQUFDLDREQUFXO0FBQ2hDO0FBQ0Esa0RBQWtEOztBQUVsRDtBQUNBLHFFQUFxRTtBQUNyRSxDQUFDO0FBQ0Q7QUFDQSxRQUFRLG1CQUFPLENBQUMsOERBQVk7QUFDNUI7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7QUNYRCxnQkFBZ0IsbUJBQU8sQ0FBQyxvRUFBZTtBQUN2QyxjQUFjLG1CQUFPLENBQUMsOERBQVk7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNoQkEsZ0JBQWdCLG1CQUFPLENBQUMsb0VBQWU7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ0xBO0FBQ0EsY0FBYyxtQkFBTyxDQUFDLDhEQUFZO0FBQ2xDLGNBQWMsbUJBQU8sQ0FBQyw4REFBWTtBQUNsQztBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ0xBO0FBQ0EsZ0JBQWdCLG1CQUFPLENBQUMsb0VBQWU7QUFDdkM7QUFDQTtBQUNBLDJEQUEyRDtBQUMzRDs7Ozs7Ozs7Ozs7O0FDTEE7QUFDQSxjQUFjLG1CQUFPLENBQUMsOERBQVk7QUFDbEM7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNKQTtBQUNBLGVBQWUsbUJBQU8sQ0FBQyxrRUFBYztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDSkEsWUFBWSxtQkFBTyxDQUFDLDREQUFXO0FBQy9CLFVBQVUsbUJBQU8sQ0FBQyxzREFBUTtBQUMxQixhQUFhLG1CQUFPLENBQUMsNERBQVc7QUFDaEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7QUNWYTtBQUNiLHVCQUF1QixtQkFBTyxDQUFDLG9GQUF1QjtBQUN0RCxXQUFXLG1CQUFPLENBQUMsa0VBQWM7QUFDakMsZ0JBQWdCLG1CQUFPLENBQUMsa0VBQWM7QUFDdEMsZ0JBQWdCLG1CQUFPLENBQUMsb0VBQWU7O0FBRXZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLG1CQUFPLENBQUMsc0VBQWdCO0FBQ3pDLGdDQUFnQztBQUNoQyxjQUFjO0FBQ2QsaUJBQWlCO0FBQ2pCO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDakNBLGFBQWEsbUJBQU8sQ0FBQyw0REFBVztBQUNoQyx3QkFBd0IsbUJBQU8sQ0FBQyxzRkFBd0I7QUFDeEQsU0FBUyxtQkFBTyxDQUFDLGtFQUFjO0FBQy9CLFdBQVcsbUJBQU8sQ0FBQyxzRUFBZ0I7QUFDbkMsZUFBZSxtQkFBTyxDQUFDLGtFQUFjO0FBQ3JDLGFBQWEsbUJBQU8sQ0FBQywwREFBVTtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxJQUFJLG1CQUFPLENBQUMsc0VBQWdCLHNCQUFzQixtQkFBTyxDQUFDLDBEQUFVO0FBQ3BFLE1BQU0sbUJBQU8sQ0FBQyxzREFBUTtBQUN0QjtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGtCQUFrQixFQUFFO0FBQzVDLDBCQUEwQixnQkFBZ0I7QUFDMUMsS0FBSztBQUNMO0FBQ0Esb0NBQW9DLGlCQUFpQjtBQUNyRDtBQUNBO0FBQ0EsRUFBRSxtQkFBTyxDQUFDLGdFQUFhO0FBQ3ZCOztBQUVBLG1CQUFPLENBQUMsc0VBQWdCOzs7Ozs7Ozs7Ozs7O0FDMUNYO0FBQ2IsaUJBQWlCLG1CQUFPLENBQUMsc0VBQWdCO0FBQ3pDLG1CQUFPLENBQUMsNERBQVc7QUFDbkI7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7OztBQ1JZOztBQUViLGVBQWUsbUJBQU8sQ0FBQyxrRUFBYztBQUNyQyxlQUFlLG1CQUFPLENBQUMsa0VBQWM7QUFDckMseUJBQXlCLG1CQUFPLENBQUMsd0ZBQXlCO0FBQzFELGlCQUFpQixtQkFBTyxDQUFDLHdGQUF5Qjs7QUFFbEQ7QUFDQSxtQkFBTyxDQUFDLG9FQUFlO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7OztBQ3ZDWTs7QUFFYixlQUFlLG1CQUFPLENBQUMsa0VBQWM7QUFDckMsZUFBZSxtQkFBTyxDQUFDLGtFQUFjO0FBQ3JDLGVBQWUsbUJBQU8sQ0FBQyxrRUFBYztBQUNyQyxnQkFBZ0IsbUJBQU8sQ0FBQyxvRUFBZTtBQUN2Qyx5QkFBeUIsbUJBQU8sQ0FBQyx3RkFBeUI7QUFDMUQsaUJBQWlCLG1CQUFPLENBQUMsd0ZBQXlCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQU8sQ0FBQyxvRUFBZTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLG9CQUFvQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsbUJBQW1CO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7QUNySEQsaUJBQWlCLG1CQUFPLENBQUMsa0ZBQXNCO0FBQy9DLGNBQWMsbUJBQU8sQ0FBQyxzRUFBZ0I7QUFDdEMsZUFBZSxtQkFBTyxDQUFDLGdFQUFhO0FBQ3BDLGFBQWEsbUJBQU8sQ0FBQyw0REFBVztBQUNoQyxXQUFXLG1CQUFPLENBQUMsd0RBQVM7QUFDNUIsZ0JBQWdCLG1CQUFPLENBQUMsa0VBQWM7QUFDdEMsVUFBVSxtQkFBTyxDQUFDLHNEQUFRO0FBQzFCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsb0RBQW9ELHdCQUF3QjtBQUM1RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUN6REE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxzQkFBc0IsRUFBRTtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWlHOzs7Ozs7Ozs7Ozs7O0FDcExqRztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQXNEO0FBQ0Y7O0FBRXBEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLDZCQUE2QixLQUFLO0FBQ2xFO0FBQ0Esd0JBQXdCLG1EQUFJO0FBQzVCO0FBQ0E7QUFDQSxvQkFBb0IsbURBQUksc0RBQXNELG1EQUFJO0FBQ2xGLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRGQUE0RixFQUFFO0FBQzlGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsVUFBVSxLQUFLO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBLFdBQVcsbURBQUk7QUFDZjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1EQUFRO0FBQ1I7QUFDQTtBQUNBLENBQUM7O0FBRTJCIiwiZmlsZSI6InJlc3RhdXJhbnQuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9hcHAvc3JjL3Jlc3RhdXJhbnRfaW5mby5qc1wiKTtcbiIsIi8qKlxuICogQ29tbW9uIGRhdGFiYXNlIGhlbHBlciBmdW5jdGlvbnMuXG4gKi9cbmltcG9ydCB7IG9wZW5EQiwgZGVsZXRlREIsIHdyYXAsIHVud3JhcCB9IGZyb20gJ2lkYic7XG5pbXBvcnQge2RiUHJvbWlzZX0gZnJvbSAnLi4vc3cuanMnO1xuXG4vLyBjb25zdCBkYlByb21pc2UgPSBvcGVuREIoJ3JyLWRiJywgMywge1xuLy8gICB1cGdyYWRlKGRiLCBvbGRWZXJzaW9uKSB7XG4vLyAgICAgc3dpdGNoIChvbGRWZXJzaW9uKSB7XG4vLyAgICAgICBjYXNlIDA6XG4vLyAgICAgICAgIGNvbnN0IHN0b3JlID0gZGIuY3JlYXRlT2JqZWN0U3RvcmUoJ3Jlc3RhdXJhbnRzJywgeyBrZXlQYXRoOiAnaWQnLCB9KTtcbi8vICAgICAgICAgc3RvcmUuY3JlYXRlSW5kZXgoJ2lkJywgJ2lkJyk7XG4vLyAgICAgICBjYXNlIDE6XG4vLyAgICAgICAgIGNvbnN0IHJldmlld3NTdG9yZSA9IGRiLmNyZWF0ZU9iamVjdFN0b3JlKCdyZXZpZXdzJywge1xuLy8gICAgICAgICAgIGtleVBhdGg6ICdpZCcsXG4vLyAgICAgICAgICAgYXV0b0luY3JlbWVudDogdHJ1ZVxuLy8gICAgICAgICB9KTtcbi8vICAgICAgICAgcmV2aWV3c1N0b3JlLmNyZWF0ZUluZGV4KFwicmVzdGF1cmFudF9pZFwiLCBcInJlc3RhdXJhbnRfaWRcIik7XG4vLyAgICAgICBjYXNlIDI6XG4vLyAgICAgICAgIGNvbnN0IHBlbmRpbmdTdG9yZSA9IGRiLmNyZWF0ZU9iamVjdFN0b3JlKCdwZW5kaW5nJywge1xuLy8gICAgICAgICAgIGtleVBhdGg6ICdpZCcsXG4vLyAgICAgICAgICAgYXV0b0luY3JlbWVudDogdHJ1ZVxuLy8gICAgICAgICB9KVxuLy8gICAgIH1cbi8vICAgfVxuLy8gfSk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERCSGVscGVyIHtcblxuICAvKipcbiAgICogRGF0YWJhc2UgVVJMLlxuICAgKiBDaGFuZ2UgdGhpcyB0byByZXN0YXVyYW50cy5qc29uIGZpbGUgbG9jYXRpb24gb24geW91ciBzZXJ2ZXIuXG4gICAqL1xuICBzdGF0aWMgZ2V0IERBVEFCQVNFX1VSTCgpIHtcbiAgICBjb25zdCBwb3J0ID0gMTMzNy8vIENoYW5nZSB0aGlzIHRvIHlvdXIgc2VydmVyIHBvcnRcbiAgICByZXR1cm4gYGh0dHA6Ly9sb2NhbGhvc3Q6JHtwb3J0fS9yZXN0YXVyYW50c2A7XG4gIH1cblxuICBzdGF0aWMgZ2V0IERBVEFCQVNFX1JFVklFV1NfVVJMKCkge1xuICAgIGNvbnN0IHBvcnQgPSAxMzM3IC8vIENoYW5nZSB0aGlzIHRvIHlvdXIgc2VydmVyIHBvcnRcbiAgICByZXR1cm4gYGh0dHA6Ly9sb2NhbGhvc3Q6JHtwb3J0fS9yZXZpZXdzYDtcbiAgfVxuXG4gIC8qKlxuICAgKiBGZXRjaCBhbGwgcmVzdGF1cmFudHMuXG4gICAqL1xuXG5cbiAgc3RhdGljIGZldGNoUmVzdGF1cmFudHMoY2FsbGJhY2spIHtcbiAgICBmZXRjaChEQkhlbHBlci5EQVRBQkFTRV9VUkwpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgIHJlc3BvbnNlLmpzb24oKS50aGVuKGZ1bmN0aW9uKHJlc3RhdXJhbnRzKSB7XG4gICAgICAgIGNhbGxiYWNrKG51bGwsIHJlc3RhdXJhbnRzKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIGZldGNoUmV2aWV3cyggcmVzdGF1cmFudF9pZCwgY2FsbGJhY2spIHtcbiAgICBsZXQgZmV0Y2hVUkwgPSBEQkhlbHBlci5EQVRBQkFTRV9SRVZJRVdTX1VSTCArIFwiLz9yZXN0YXVyYW50X2lkPVwiICsgcmVzdGF1cmFudF9pZDtcbiAgICBmZXRjaChmZXRjaFVSTCkudGhlbiggcmVzcG9uc2UgPT4ge1xuICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICB9KS50aGVuKHJldmlld3MgPT4ge1xuICAgICAgICBjYWxsYmFjayhudWxsLCByZXZpZXdzKTtcbiAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgY2FsbGJhY2soZXJyb3IsIG51bGwpO1xuICAgICAgfSk7XG4gIH1cblxuICAvLyAgIHN0YXRpYyBmZXRjaFJlc3RhdXJhbnRSZXZpZXdzQnlJZChpZCwgY2FsbGJhY2spIHtcbiAgLy8gICAvLyBGZXRjaCBhbGwgcmV2aWV3cyBmb3IgdGhlIHNwZWNpZmljIHJlc3RhdXJhbnRcbiAgLy8gICBjb25zdCBmZXRjaFVSTCA9IERCSGVscGVyLkRBVEFCQVNFX1JFVklFV1NfVVJMICsgXCIvP3Jlc3RhdXJhbnRfaWQ9XCIgKyBpZDtcbiAgLy8gICBmZXRjaChmZXRjaFVSTCwge21ldGhvZDogXCJHRVRcIn0pLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAvLyAgICAgaWYgKCFyZXNwb25zZS5jbG9uZSgpLm9rICYmICFyZXNwb25zZS5jbG9uZSgpLnJlZGlyZWN0ZWQpIHtcbiAgLy8gICAgICAgdGhyb3cgXCJObyByZXZpZXdzIGF2YWlsYWJsZVwiO1xuICAvLyAgICAgfVxuICAvLyAgICAgcmVzcG9uc2VcbiAgLy8gICAgICAgLmpzb24oKVxuICAvLyAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAvLyAgICAgICAgIGNhbGxiYWNrKG51bGwsIHJlc3VsdCk7XG4gIC8vICAgICAgIH0pXG4gIC8vICAgfSkuY2F0Y2goZXJyb3IgPT4gY2FsbGJhY2soZXJyb3IsIG51bGwpKTtcbiAgLy8gfVxuICAvKipcbiAgICogRmV0Y2ggYSByZXN0YXVyYW50IGJ5IGl0cyBJRC5cbiAgICovXG4gIHN0YXRpYyBmZXRjaFJlc3RhdXJhbnRCeUlkKGlkLCBjYWxsYmFjaykge1xuICAgIC8vIGZldGNoIGFsbCByZXN0YXVyYW50cyB3aXRoIHByb3BlciBlcnJvciBoYW5kbGluZy5cbiAgICBEQkhlbHBlci5mZXRjaFJlc3RhdXJhbnRzKChlcnJvciwgcmVzdGF1cmFudHMpID0+IHtcbiAgICAgIGlmIChlcnJvcikge1xuICAgICAgICBjYWxsYmFjayhlcnJvciwgbnVsbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCByZXN0YXVyYW50ID0gcmVzdGF1cmFudHMuZmluZChyID0+IHIuaWQgPT0gaWQpO1xuICAgICAgICBpZiAocmVzdGF1cmFudCkgeyAvLyBHb3QgdGhlIHJlc3RhdXJhbnRcbiAgICAgICAgICBjYWxsYmFjayhudWxsLCByZXN0YXVyYW50KTtcbiAgICAgICAgfSBlbHNlIHsgLy8gUmVzdGF1cmFudCBkb2VzIG5vdCBleGlzdCBpbiB0aGUgZGF0YWJhc2VcbiAgICAgICAgICBjYWxsYmFjaygnUmVzdGF1cmFudCBkb2VzIG5vdCBleGlzdCcsIG51bGwpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogRmV0Y2ggcmVzdGF1cmFudHMgYnkgYSBjdWlzaW5lIHR5cGUgd2l0aCBwcm9wZXIgZXJyb3IgaGFuZGxpbmcuXG4gICAqL1xuICBzdGF0aWMgZmV0Y2hSZXN0YXVyYW50QnlDdWlzaW5lKGN1aXNpbmUsIGNhbGxiYWNrKSB7XG4gICAgLy8gRmV0Y2ggYWxsIHJlc3RhdXJhbnRzICB3aXRoIHByb3BlciBlcnJvciBoYW5kbGluZ1xuICAgIERCSGVscGVyLmZldGNoUmVzdGF1cmFudHMoKGVycm9yLCByZXN0YXVyYW50cykgPT4ge1xuICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgIGNhbGxiYWNrKGVycm9yLCBudWxsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEZpbHRlciByZXN0YXVyYW50cyB0byBoYXZlIG9ubHkgZ2l2ZW4gY3Vpc2luZSB0eXBlXG4gICAgICAgIGNvbnN0IHJlc3VsdHMgPSByZXN0YXVyYW50cy5maWx0ZXIociA9PiByLmN1aXNpbmVfdHlwZSA9PSBjdWlzaW5lKTtcbiAgICAgICAgY2FsbGJhY2sobnVsbCwgcmVzdWx0cyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogRmV0Y2ggcmVzdGF1cmFudHMgYnkgYSBuZWlnaGJvcmhvb2Qgd2l0aCBwcm9wZXIgZXJyb3IgaGFuZGxpbmcuXG4gICAqL1xuICBzdGF0aWMgZmV0Y2hSZXN0YXVyYW50QnlOZWlnaGJvcmhvb2QobmVpZ2hib3Job29kLCBjYWxsYmFjaykge1xuICAgIC8vIEZldGNoIGFsbCByZXN0YXVyYW50c1xuICAgIERCSGVscGVyLmZldGNoUmVzdGF1cmFudHMoKGVycm9yLCByZXN0YXVyYW50cykgPT4ge1xuICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgIGNhbGxiYWNrKGVycm9yLCBudWxsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEZpbHRlciByZXN0YXVyYW50cyB0byBoYXZlIG9ubHkgZ2l2ZW4gbmVpZ2hib3Job29kXG4gICAgICAgIGNvbnN0IHJlc3VsdHMgPSByZXN0YXVyYW50cy5maWx0ZXIociA9PiByLm5laWdoYm9yaG9vZCA9PSBuZWlnaGJvcmhvb2QpO1xuICAgICAgICBjYWxsYmFjayhudWxsLCByZXN1bHRzKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGZXRjaCByZXN0YXVyYW50cyBieSBhIGN1aXNpbmUgYW5kIGEgbmVpZ2hib3Job29kIHdpdGggcHJvcGVyIGVycm9yIGhhbmRsaW5nLlxuICAgKi9cbiAgc3RhdGljIGZldGNoUmVzdGF1cmFudEJ5Q3Vpc2luZUFuZE5laWdoYm9yaG9vZChjdWlzaW5lLCBuZWlnaGJvcmhvb2QsIGNhbGxiYWNrKSB7XG4gICAgLy8gRmV0Y2ggYWxsIHJlc3RhdXJhbnRzXG4gICAgREJIZWxwZXIuZmV0Y2hSZXN0YXVyYW50cygoZXJyb3IsIHJlc3RhdXJhbnRzKSA9PiB7XG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgY2FsbGJhY2soZXJyb3IsIG51bGwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IHJlc3VsdHMgPSByZXN0YXVyYW50c1xuICAgICAgICBpZiAoY3Vpc2luZSAhPSAnYWxsJykgeyAvLyBmaWx0ZXIgYnkgY3Vpc2luZVxuICAgICAgICAgIHJlc3VsdHMgPSByZXN1bHRzLmZpbHRlcihyID0+IHIuY3Vpc2luZV90eXBlID09IGN1aXNpbmUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuZWlnaGJvcmhvb2QgIT0gJ2FsbCcpIHsgLy8gZmlsdGVyIGJ5IG5laWdoYm9yaG9vZFxuICAgICAgICAgIHJlc3VsdHMgPSByZXN1bHRzLmZpbHRlcihyID0+IHIubmVpZ2hib3Job29kID09IG5laWdoYm9yaG9vZCk7XG4gICAgICAgIH1cbiAgICAgICAgY2FsbGJhY2sobnVsbCwgcmVzdWx0cyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogRmV0Y2ggYWxsIG5laWdoYm9yaG9vZHMgd2l0aCBwcm9wZXIgZXJyb3IgaGFuZGxpbmcuXG4gICAqL1xuICBzdGF0aWMgZmV0Y2hOZWlnaGJvcmhvb2RzKGNhbGxiYWNrKSB7XG4gICAgLy8gRmV0Y2ggYWxsIHJlc3RhdXJhbnRzXG4gICAgREJIZWxwZXIuZmV0Y2hSZXN0YXVyYW50cygoZXJyb3IsIHJlc3RhdXJhbnRzKSA9PiB7XG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgY2FsbGJhY2soZXJyb3IsIG51bGwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gR2V0IGFsbCBuZWlnaGJvcmhvb2RzIGZyb20gYWxsIHJlc3RhdXJhbnRzXG4gICAgICAgIGNvbnN0IG5laWdoYm9yaG9vZHMgPSByZXN0YXVyYW50cy5tYXAoKHYsIGkpID0+IHJlc3RhdXJhbnRzW2ldLm5laWdoYm9yaG9vZClcbiAgICAgICAgLy8gUmVtb3ZlIGR1cGxpY2F0ZXMgZnJvbSBuZWlnaGJvcmhvb2RzXG4gICAgICAgIGNvbnN0IHVuaXF1ZU5laWdoYm9yaG9vZHMgPSBuZWlnaGJvcmhvb2RzLmZpbHRlcigodiwgaSkgPT4gbmVpZ2hib3Job29kcy5pbmRleE9mKHYpID09IGkpXG4gICAgICAgIGNhbGxiYWNrKG51bGwsIHVuaXF1ZU5laWdoYm9yaG9vZHMpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEZldGNoIGFsbCBjdWlzaW5lcyB3aXRoIHByb3BlciBlcnJvciBoYW5kbGluZy5cbiAgICovXG4gIHN0YXRpYyBmZXRjaEN1aXNpbmVzKGNhbGxiYWNrKSB7XG4gICAgLy8gRmV0Y2ggYWxsIHJlc3RhdXJhbnRzXG4gICAgREJIZWxwZXIuZmV0Y2hSZXN0YXVyYW50cygoZXJyb3IsIHJlc3RhdXJhbnRzKSA9PiB7XG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgY2FsbGJhY2soZXJyb3IsIG51bGwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gR2V0IGFsbCBjdWlzaW5lcyBmcm9tIGFsbCByZXN0YXVyYW50c1xuICAgICAgICBjb25zdCBjdWlzaW5lcyA9IHJlc3RhdXJhbnRzLm1hcCgodiwgaSkgPT4gcmVzdGF1cmFudHNbaV0uY3Vpc2luZV90eXBlKVxuICAgICAgICAvLyBSZW1vdmUgZHVwbGljYXRlcyBmcm9tIGN1aXNpbmVzXG4gICAgICAgIGNvbnN0IHVuaXF1ZUN1aXNpbmVzID0gY3Vpc2luZXMuZmlsdGVyKCh2LCBpKSA9PiBjdWlzaW5lcy5pbmRleE9mKHYpID09IGkpXG4gICAgICAgIGNhbGxiYWNrKG51bGwsIHVuaXF1ZUN1aXNpbmVzKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXN0YXVyYW50IHBhZ2UgVVJMLlxuICAgKi9cbiAgc3RhdGljIHVybEZvclJlc3RhdXJhbnQocmVzdGF1cmFudCkge1xuICAgIHJldHVybiAoYC4vcmVzdGF1cmFudC5odG1sP2lkPSR7cmVzdGF1cmFudC5pZH1gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXN0YXVyYW50IGltYWdlIFVSTC5cbiAgICovXG4gIHN0YXRpYyBpbWFnZVVybEZvclJlc3RhdXJhbnQocmVzdGF1cmFudCkge1xuICAgIGlmKCFyZXN0YXVyYW50LnBob3RvZ3JhcGgpIHtcbiAgICAgIHJldHVybiAoYC9pbWcvJHtyZXN0YXVyYW50LmlkfS5qcGdgKVxuICAgIH1cbiAgICByZXR1cm4gKGAvaW1nLyR7cmVzdGF1cmFudC5waG90b2dyYXBofS5qcGdgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNYXAgbWFya2VyIGZvciBhIHJlc3RhdXJhbnQuXG4gICAqL1xuICBzdGF0aWMgbWFwTWFya2VyRm9yUmVzdGF1cmFudChyZXN0YXVyYW50LCBtYXApIHtcbiAgICAvLyBodHRwczovL2xlYWZsZXRqcy5jb20vcmVmZXJlbmNlLTEuMy4wLmh0bWwjbWFya2VyXG4gICAgY29uc3QgbWFya2VyID0gbmV3IEwubWFya2VyKFtyZXN0YXVyYW50LmxhdGxuZy5sYXQsIHJlc3RhdXJhbnQubGF0bG5nLmxuZ10sXG4gICAgICB7dGl0bGU6IHJlc3RhdXJhbnQubmFtZSxcbiAgICAgIGFsdDogcmVzdGF1cmFudC5uYW1lLFxuICAgICAgdXJsOiBEQkhlbHBlci51cmxGb3JSZXN0YXVyYW50KHJlc3RhdXJhbnQpXG4gICAgICB9KVxuICAgICAgbWFya2VyLmFkZFRvKG5ld01hcCk7XG4gICAgcmV0dXJuIG1hcmtlcjtcbiAgfVxuXG4gIHN0YXRpYyB1cGRhdGVDYWNoZWRSZXN0YXVyYW50UmV2aWV3KGZvcm1EYXRhKSB7XG4gICAgY29uc29sZS5sb2coJ3VwZGF0aW5nIGNhY2hlIGZvciBuZXcgcmV2aWV3JywgZm9ybURhdGEpO1xuICAgIHJldHVybiBkYlByb21pc2UudGhlbiggZGIgPT4ge1xuICAgICAgY29uc3QgdHggPSBkYi50cmFuc2FjdGlvbigncmV2aWV3cycsICdyZWFkd3JpdGUnKTtcbiAgICAgIGNvbnN0IHN0b3JlID0gdHgub2JqZWN0U3RvcmUoJ3Jldmlld3MnKTtcbiAgICAgIGNvbnNvbGUubG9nKCdwdXR0aW5nIHJldmlldyBpbiBzdG9yZScpO1xuICAgICAgc3RvcmUucHV0KGZvcm1EYXRhKTtcbiAgICAgIGNvbnNvbGUubG9nKCdzdWNjZXNzZnVsbHkgcHV0IHJldmlldyBpbiBzdG9yZScpO1xuICAgICAgcmV0dXJuIHR4LmRvbmU7XG4gICAgfSlcbiAgfVxuXG4gIHN0YXRpYyBzYXZlTmV3UmV2aWV3KGZvcm1EYXRhKSB7XG4gICAgLy8gQmxvY2sgYW55IG1vcmUgY2xpY2tzIG9uIHRoZSBzdWJtaXQgYnV0dG9uIHVudGlsIHRoZSBjYWxsYmFja1xuICAgIC8vIGNvbnN0IGJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3VibWl0LWZvcm0tYnRuXCIpO1xuICAgIC8vIGJ0bi5vbmNsaWNrID0gbnVsbDtcbiAgICBjb25zdCB1cmwgPSBEQkhlbHBlci5EQVRBQkFTRV9SRVZJRVdTX1VSTDtcbiAgICBjb25zdCBtZXRob2QgPSBcIlBPU1RcIjtcbiAgICBEQkhlbHBlci51cGRhdGVDYWNoZWRSZXN0YXVyYW50UmV2aWV3KGZvcm1EYXRhKTtcbiAgICByZXR1cm4gREJIZWxwZXIuYWRkUGVuZGluZ1JlcXVlc3RUb1F1ZSh1cmwsIG1ldGhvZCwgZm9ybURhdGEpLnRoZW4oanNvbiA9PiBqc29uKTtcblxuICB9XG5cbiAgc3RhdGljIGFkZFBlbmRpbmdSZXF1ZXN0VG9RdWUodXJsLCBtZXRob2QsIGZvcm1EYXRhKSB7XG4gICAgLy9vcGVuIGRhdGFiYXNlIGFuZCBhZGQgcmVxdWVzdCBkZXRhaWxzIHRvIHRoZSBwZW5kaW5nIHN0b3JlXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGRiUHJvbWlzZS50aGVuKGRiID0+IHtcbiAgICAgIGNvbnN0IHR4ID0gZGIudHJhbnNhY3Rpb24oJ3BlbmRpbmcnLCAncmVhZHdyaXRlJyk7XG4gICAgICBjb25zdCBzdG9yZSA9IHR4Lm9iamVjdFN0b3JlKCdwZW5kaW5nJyk7XG4gICAgICBzdG9yZS5wdXQoe1xuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgdXJsLFxuICAgICAgICAgIG1ldGhvZCxcbiAgICAgICAgICBmb3JtRGF0YVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICB9KS50aGVuKERCSGVscGVyLm5leHRQZW5kaW5nKChlcnJvciwganNvbikgPT4ge1xuICAgICAgY29uc29sZS5sb2coanNvbik7XG4gICAgICByZXR1cm4gcmVzb2x2ZShqc29uKTtcbiAgICB9KSk7XG4gIH0pO1xuICB9XG5cbiAgc3RhdGljIG5leHRQZW5kaW5nKGNhbGxiYWNrKSB7XG4gICAgREJIZWxwZXIuYXR0ZW1wdENvbW1pdFBlbmRpbmcoREJIZWxwZXIubmV4dFBlbmRpbmcpLnRoZW4oaiA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhqKTtcbiAgICAgIGNhbGxiYWNrKG51bGwsIGopO1xuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIGF0dGVtcHRDb21taXRQZW5kaW5nKGNhbGxiYWNrKSB7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIHRoZSBwZW5kaW5nIGl0ZW1zIHVudGlsIHRoZXJlIGlzIGEgbmV0d29yayBmYWlsdXJlXG4gICAgbGV0IHVybDtcbiAgICBsZXQgbWV0aG9kO1xuICAgIGxldCBib2R5O1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKCAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7IGRiUHJvbWlzZS50aGVuKGRiID0+IHtcbiAgICAgIGlmICghZGIub2JqZWN0U3RvcmVOYW1lcy5sZW5ndGgpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJEQiBub3QgYXZhaWxhYmxlXCIpO1xuICAgICAgICBkYi5jbG9zZSgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCB0eCA9IGRiLnRyYW5zYWN0aW9uKCdwZW5kaW5nJywgJ3JlYWR3cml0ZScpO1xuICAgICAgY29uc3Qgc3RvcmUgPSB0eC5vYmplY3RTdG9yZSgncGVuZGluZycpO1xuICAgICAgc3RvcmUub3BlbkN1cnNvcigpLnRoZW4oIGN1cnNvciA9PiB7XG4gICAgICAgIGlmICghY3Vyc29yKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICBjb25zdCB2YWx1ZSA9IGN1cnNvci52YWx1ZTtcbiAgICAgICAgdXJsID0gY3Vyc29yLnZhbHVlLmRhdGEudXJsO1xuICAgICAgICBtZXRob2QgPSBjdXJzb3IudmFsdWUuZGF0YS5tZXRob2Q7XG4gICAgICAgIGJvZHkgPSBjdXJzb3IudmFsdWUuZGF0YS5mb3JtRGF0YTtcblxuXG4gICAgICAgIC8vIElmIHdlIGRvbid0IGhhdmUgYSBwYXJhbWV0ZXIgdGhlbiB3ZSdyZSBvbiBhIGJhZCByZWNvcmQgdGhhdCBzaG91bGQgYmUgdG9zc2VkXG4gICAgICAgIC8vIGFuZCB0aGVuIG1vdmUgb25cbiAgICAgICAgaWYgKCghdXJsIHx8ICFtZXRob2QpIHx8IChtZXRob2QgPT09IFwiUE9TVFwiICYmICFib2R5KSkge1xuICAgICAgICAgIGN1cnNvclxuICAgICAgICAgICAgLmRlbGV0ZSgpXG4gICAgICAgICAgICAudGhlbihjYWxsYmFjaygpKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgcHJvcGVydGllcyA9IHtcbiAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShib2R5KSxcbiAgICAgICAgICBtZXRob2Q6IG1ldGhvZFxuICAgICAgICB9XG4gICAgICAgIGZldGNoKHVybCwgcHJvcGVydGllcykudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgIC8vIElmIHdlIGRvbid0IGdldCBhIGdvb2QgcmVzcG9uc2UgdGhlbiBhc3N1bWUgd2UncmUgb2ZmbGluZVxuICAgICAgICAgIGlmICghcmVzcG9uc2Uub2sgJiYgIXJlc3BvbnNlLnJlZGlyZWN0ZWQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0aGlzIGlzIHRoZSByZXNwb25zZSBhbmQgd2UgYXJlIG9mZmxpbmUnKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgfSkudGhlbiggaiA9PiB7XG4gICAgICAgICAgY29uc3QgZGVsdHggPSBkYi50cmFuc2FjdGlvbigncGVuZGluZycsICdyZWFkd3JpdGUnKTtcbiAgICAgICAgICBjb25zdCBzdG9yZSA9IGRlbHR4Lm9iamVjdFN0b3JlKCdwZW5kaW5nJyk7XG4gICAgICAgICAgc3RvcmUub3BlbkN1cnNvcigpXG4gICAgICAgICAgICAudGhlbiggY3Vyc29yID0+IHtcbiAgICAgICAgICAgICAgY3Vyc29yLmRlbGV0ZSgpXG4gICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGopO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKGopO1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICBjb25zb2xlLmxvZygnZGVsZXRlZCBpdGVtIGZyb20gcGVuZGluZyBzdG9yZScpO1xuICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfSlcbiAgICB9KVxuICB9XG5cbiAgc3RhdGljIHN5bmNSZXN0YXVyYW50KHJlc3RhdXJhbnQpIHtcbiAgICAgdHJ5IHtcbiAgICAgICBsZXQgdXJsID0gYGh0dHA6Ly9sb2NhbGhvc3Q6MTMzNy9yZXN0YXVyYW50cy8ke3Jlc3RhdXJhbnQuaWR9Lz9pc19mYXZvcml0ZT0ke3Jlc3RhdXJhbnQuaXNfZmF2b3JpdGV9YDtcbiAgICAgICBsZXQgcGFyYW1zID0ge21ldGhvZDogJ1BVVCd9O1xuICAgICAgIHJldHVybiBmZXRjaCh1cmwsIHBhcmFtcykudGhlbihmdW5jdGlvbihyKXsgcmV0dXJuIHIuanNvbigpIH0pO1xuICAgICB9XG4gICAgIGNhdGNoKGUpIHtcbiAgICAgICBjb25zb2xlLmxvZygnZXJyb3IgdXBkYXRpbmcgcmVzdGF1cmFudCBiYWNrZW5kIGRhdGEuLi4nLCBlLCByZXN0YXVyYW50KTtcbiAgICAgfVxuICB9XG4gICAgIHN0YXRpYyB1cGRhdGVSZXN0YXVyYW50SW5EQihuZXdfcmVzdGF1cmFudCkge1xuICAgICAgIHJldHVybiBkYlByb21pc2UudGhlbihmdW5jdGlvbihkYil7XG4gICAgICAgICBsZXQgdHggPSBkYi50cmFuc2FjdGlvbigncmVzdGF1cmFudHMnLCAncmVhZHdyaXRlJyk7XG4gICAgICAgICBsZXQgc3RvcmUgPSB0eC5vYmplY3RTdG9yZSgncmVzdGF1cmFudHMnKTtcbiAgICAgICAgIHN0b3JlLnB1dChuZXdfcmVzdGF1cmFudCk7XG4gICAgICAgICByZXR1cm4gdHguY29tcGxldGVcbiAgICAgICB9KS50aGVuKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShuZXdfcmVzdGF1cmFudCk7XG4gICAgICAgfSk7XG4gICAgIH1cblxuICBzdGF0aWMgdG9nZ2xlRmF2QnRuKHJlc3RhdXJhbnRfaWQpIHtcbiAgICByZXR1cm4gZGJQcm9taXNlLnRoZW4oIGRiID0+IHtcbiAgICAgIGxldCB0eCA9IGRiLnRyYW5zYWN0aW9uKCdyZXN0YXVyYW50cycpO1xuICAgICAgbGV0IHN0b3JlID0gdHgub2JqZWN0U3RvcmUoJ3Jlc3RhdXJhbnRzJyk7XG4gICAgICByZXR1cm4gc3RvcmUuZ2V0KHJlc3RhdXJhbnRfaWQpO1xuICAgIH0pLnRoZW4oIHJlc3RhdXJhbnQgPT4ge1xuICAgICAgY29uc29sZS5sb2cocmVzdGF1cmFudCk7XG4gICAgICBjb25zdCBuZXdfcmVzdGF1cmFudCA9IE9iamVjdC5hc3NpZ24oe30sIHJlc3RhdXJhbnQpO1xuICAgICAgbmV3X3Jlc3RhdXJhbnQuaXNfZmF2b3JpdGUgPSAocmVzdGF1cmFudC5pc19mYXZvcml0ZSA9PT0gJ3RydWUnIHx8IHJlc3RhdXJhbnQuaXNfZmF2b3JpdGUgPT09IHRydWUpID9cbiAgICAgICdmYWxzZScgOiAndHJ1ZSc7XG4gICAgICBEQkhlbHBlci5zeW5jUmVzdGF1cmFudChuZXdfcmVzdGF1cmFudCk7XG4gICAgICByZXR1cm4gREJIZWxwZXIudXBkYXRlUmVzdGF1cmFudEluREIobmV3X3Jlc3RhdXJhbnQpO1xuICAgIH0pLnRoZW4oIG5ld19yZXN0YXVyYW50ID0+IHtcbiAgICAgIGNvbnN0IGZhdkJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBmYXYtYnRuLSR7bmV3X3Jlc3RhdXJhbnQuaWR9YCk7XG4gICAgICBpZihuZXdfcmVzdGF1cmFudC5pc19mYXZvcml0ZSA9PT0gJ3RydWUnIHx8IG5ld19yZXN0YXVyYW50LmlzX2Zhdm9yaXRlID09PSB0cnVlKSB7XG4gICAgICAgIGZhdkJ0bi5pbm5lckhUTUwgPSAnRmF2b3JpdGVkISc7XG4gICAgICAgIGZhdkJ0bi5zdHlsZS5iYWNrZ3JvdW5kID0gJ2hvdHBpbmsnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZmF2QnRuLmlubmVySFRNTCA9ICdBZGQgdG8gZmF2b3JpdGUnO1xuICAgICAgICBmYXZCdG4uc3R5bGUuYmFja2dyb3VuZCA9ICdncmV5JztcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbn1cblxuIiwiZXhwb3J0IGRlZmF1bHQgKGZ1bmN0aW9uICgpIHtcblxuICBpZiAoJ3NlcnZpY2VXb3JrZXInIGluIG5hdmlnYXRvcikge1xuICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XG4gICAgIG5hdmlnYXRvci5zZXJ2aWNlV29ya2VyLnJlZ2lzdGVyKCcvc2VydmljZXdvcmtlci5idW5kbGUuanMnKS50aGVuKHJlZ2lzdHJhdGlvbiA9PiB7XG4gICAgICAgY29uc29sZS5sb2coJ1NXIHJlZ2lzdGVyZWQ6ICcsIHJlZ2lzdHJhdGlvbik7XG4gICAgIH0pLmNhdGNoKHJlZ2lzdHJhdGlvbkVycm9yID0+IHtcbiAgICAgICBjb25zb2xlLmxvZygnU1cgcmVnaXN0cmF0aW9uIGZhaWxlZDogJywgcmVnaXN0cmF0aW9uRXJyb3IpO1xuICAgICB9KTtcbiAgIH0pO1xuICB9XG5cbn0pKCk7XG5cblxuIiwiaW1wb3J0IHJlZ2lzdHJhdGlvbiBmcm9tICcuL3JlZ2lzdHJhdGlvbic7XG5pbXBvcnQgREJIZWxwZXIgZnJvbSAnLi9kYmhlbHBlcic7XG5sZXQgcmVzdGF1cmFudDtcbmxldCBzdWJtaXRCdG47XG52YXIgbmV3TWFwO1xuXG4vKipcbiAqIEluaXRpYWxpemUgbWFwIGFzIHNvb24gYXMgdGhlIHBhZ2UgaXMgbG9hZGVkLlxuICovXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKGV2ZW50KSA9PiB7XG4gIGluaXRNYXAoKTtcblxuICBzdWJtaXRCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3VibWl0LWZvcm0tYnRuJyk7XG4gIHN1Ym1pdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHN1Ym1pdFJldmlldyk7XG59KTtcblxuLyoqXG4gKiBJbml0aWFsaXplIGxlYWZsZXQgbWFwXG4gKi9cbmNvbnN0IGluaXRNYXAgPSAoKSA9PiB7XG4gIGZldGNoUmVzdGF1cmFudEZyb21VUkwoKGVycm9yLCByZXN0YXVyYW50KSA9PiB7XG4gICAgaWYgKGVycm9yKSB7IC8vIEdvdCBhbiBlcnJvciFcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXdNYXAgPSBMLm1hcCgnbWFwJywge1xuICAgICAgICBjZW50ZXI6IFtyZXN0YXVyYW50LmxhdGxuZy5sYXQsIHJlc3RhdXJhbnQubGF0bG5nLmxuZ10sXG4gICAgICAgIHpvb206IDE2LFxuICAgICAgICBzY3JvbGxXaGVlbFpvb206IGZhbHNlXG4gICAgICB9KTtcbiAgICAgIHNlbGYubmV3TWFwID0gbmV3TWFwO1xuICAgICAgTC50aWxlTGF5ZXIoJ2h0dHBzOi8vYXBpLnRpbGVzLm1hcGJveC5jb20vdjQve2lkfS97en0ve3h9L3t5fS5qcGc3MD9hY2Nlc3NfdG9rZW49e21hcGJveFRva2VufScsIHtcbiAgICAgICAgbWFwYm94VG9rZW46ICdway5leUoxSWpvaWQyVnVkR2x1SWl3aVlTSTZJbU5xYVhKME4yNWlaakZ3ZGpZemEzQTRNR3QxYUhVMmJqRWlmUS5Ebk5GVW9ONXV6dzAxbF9YS19jN25RJyxcbiAgICAgICAgbWF4Wm9vbTogMTgsXG4gICAgICAgIGF0dHJpYnV0aW9uOiAnTWFwIGRhdGEgJmNvcHk7IDxhIGhyZWY9XCJodHRwczovL3d3dy5vcGVuc3RyZWV0bWFwLm9yZy9cIj5PcGVuU3RyZWV0TWFwPC9hPiBjb250cmlidXRvcnMsICcgK1xuICAgICAgICAgICc8YSBocmVmPVwiaHR0cHM6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL2xpY2Vuc2VzL2J5LXNhLzIuMC9cIj5DQy1CWS1TQTwvYT4sICcgK1xuICAgICAgICAgICdJbWFnZXJ5IMKpIDxhIGhyZWY9XCJodHRwczovL3d3dy5tYXBib3guY29tL1wiPk1hcGJveDwvYT4nLFxuICAgICAgICBpZDogJ21hcGJveC5zdHJlZXRzJ1xuICAgICAgfSkuYWRkVG8obmV3TWFwKTtcbiAgICAgIGZpbGxCcmVhZGNydW1iKCk7XG4gICAgICBEQkhlbHBlci5tYXBNYXJrZXJGb3JSZXN0YXVyYW50KHNlbGYucmVzdGF1cmFudCwgc2VsZi5uZXdNYXApO1xuICAgIH1cbiAgfSk7XG4gIERCSGVscGVyLm5leHRQZW5kaW5nKCk7XG59XG5cbi8qIHdpbmRvdy5pbml0TWFwID0gKCkgPT4ge1xuICBmZXRjaFJlc3RhdXJhbnRGcm9tVVJMKChlcnJvciwgcmVzdGF1cmFudCkgPT4ge1xuICAgIGlmIChlcnJvcikgeyAvLyBHb3QgYW4gZXJyb3IhXG4gICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2VsZi5tYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAnKSwge1xuICAgICAgICB6b29tOiAxNixcbiAgICAgICAgY2VudGVyOiByZXN0YXVyYW50LmxhdGxuZyxcbiAgICAgICAgc2Nyb2xsd2hlZWw6IGZhbHNlXG4gICAgICB9KTtcbiAgICAgIGZpbGxCcmVhZGNydW1iKCk7XG4gICAgICBEQkhlbHBlci5tYXBNYXJrZXJGb3JSZXN0YXVyYW50KHNlbGYucmVzdGF1cmFudCwgc2VsZi5tYXApO1xuICAgIH1cbiAgfSk7XG59ICovXG5cbi8qKlxuICogR2V0IGN1cnJlbnQgcmVzdGF1cmFudCBmcm9tIHBhZ2UgVVJMLlxuICovXG5jb25zdCBmZXRjaFJlc3RhdXJhbnRGcm9tVVJMID0gKGNhbGxiYWNrKSA9PiB7XG4gIGlmIChzZWxmLnJlc3RhdXJhbnQpIHsgLy8gcmVzdGF1cmFudCBhbHJlYWR5IGZldGNoZWQhXG4gICAgY2FsbGJhY2sobnVsbCwgc2VsZi5yZXN0YXVyYW50KVxuICAgIGNvbnNvbGUubG9nKCdzZWxmIHJlc3RhdXJhbnQgYWxyZWFkeSBmZXRjaGVkJyk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgaWQgPSBnZXRQYXJhbWV0ZXJCeU5hbWUoJ2lkJyk7XG4gIGlmICghaWQpIHsgLy8gbm8gaWQgZm91bmQgaW4gVVJMXG4gICAgZXJyb3IgPSAnTm8gcmVzdGF1cmFudCBpZCBpbiBVUkwnXG4gICAgY2FsbGJhY2soZXJyb3IsIG51bGwpO1xuICB9IGVsc2Uge1xuICAgIERCSGVscGVyLmZldGNoUmVzdGF1cmFudEJ5SWQoaWQsIChlcnJvciwgcmVzdGF1cmFudCkgPT4ge1xuICAgICAgc2VsZi5yZXN0YXVyYW50ID0gcmVzdGF1cmFudDtcbiAgICAgIGlmICghcmVzdGF1cmFudCkge1xuICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgZmlsbFJlc3RhdXJhbnRIVE1MKCk7XG4gICAgICBjYWxsYmFjayhudWxsLCByZXN0YXVyYW50KVxuICAgIH0pO1xuICB9XG59XG4vKipcbiAqIENyZWF0ZSByZXN0YXVyYW50IEhUTUwgYW5kIGFkZCBpdCB0byB0aGUgd2VicGFnZVxuICovXG5jb25zdCBmaWxsUmVzdGF1cmFudEhUTUwgPSAocmVzdGF1cmFudCA9IHNlbGYucmVzdGF1cmFudCkgPT4ge1xuICBjb25zdCBuYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc3RhdXJhbnQtbmFtZScpO1xuICBuYW1lLmlubmVySFRNTCA9IHJlc3RhdXJhbnQubmFtZTtcblxuICBjb25zdCBhZGRyZXNzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc3RhdXJhbnQtYWRkcmVzcycpO1xuICBhZGRyZXNzLmlubmVySFRNTCA9IGAgJHtyZXN0YXVyYW50Lm5hbWV9IDxicj4gJHtyZXN0YXVyYW50LmFkZHJlc3N9YDtcblxuICBjb25zdCBpbWFnZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXN0YXVyYW50LWltZycpO1xuICBpbWFnZS5jbGFzc05hbWUgPSAncmVzdGF1cmFudC1pbWcnXG4gIGltYWdlLnNyYyA9IERCSGVscGVyLmltYWdlVXJsRm9yUmVzdGF1cmFudChyZXN0YXVyYW50KTtcblxuICBjb25zdCBjdWlzaW5lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc3RhdXJhbnQtY3Vpc2luZScpO1xuICBjdWlzaW5lLmlubmVySFRNTCA9IHJlc3RhdXJhbnQuY3Vpc2luZV90eXBlO1xuXG4gIC8vIGZpbGwgb3BlcmF0aW5nIGhvdXJzXG4gIGlmIChyZXN0YXVyYW50Lm9wZXJhdGluZ19ob3Vycykge1xuICAgIGZpbGxSZXN0YXVyYW50SG91cnNIVE1MKCk7XG4gIH1cbiAgLy8gZmlsbCByZXZpZXdzXG4gIERCSGVscGVyLmZldGNoUmV2aWV3cyhyZXN0YXVyYW50LmlkLCAoZXJyb3IsIHJldmlld3MpID0+IHtcbiAgICBmaWxsUmV2aWV3c0hUTUwocmV2aWV3cyk7XG5cbiAgfSk7XG59XG5cblxuLyoqXG4gKiBDcmVhdGUgcmVzdGF1cmFudCBvcGVyYXRpbmcgaG91cnMgSFRNTCB0YWJsZSBhbmQgYWRkIGl0IHRvIHRoZSB3ZWJwYWdlLlxuICovXG5jb25zdCBmaWxsUmVzdGF1cmFudEhvdXJzSFRNTCA9IChvcGVyYXRpbmdIb3VycyA9IHNlbGYucmVzdGF1cmFudC5vcGVyYXRpbmdfaG91cnMpID0+IHtcbiAgY29uc3QgaG91cnMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzdGF1cmFudC1ob3VycycpO1xuICBmb3IgKGxldCBrZXkgaW4gb3BlcmF0aW5nSG91cnMpIHtcbiAgICBjb25zdCByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpO1xuXG4gICAgY29uc3QgZGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKTtcbiAgICBkYXkuaW5uZXJIVE1MID0ga2V5O1xuICAgIHJvdy5hcHBlbmRDaGlsZChkYXkpO1xuXG4gICAgY29uc3QgdGltZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJyk7XG4gICAgdGltZS5pbm5lckhUTUwgPSBvcGVyYXRpbmdIb3Vyc1trZXldO1xuICAgIHJvdy5hcHBlbmRDaGlsZCh0aW1lKTtcblxuICAgIGhvdXJzLmFwcGVuZENoaWxkKHJvdyk7XG4gIH1cbn1cblxuLyoqXG4gKiBDcmVhdGUgYWxsIHJldmlld3MgSFRNTCBhbmQgYWRkIHRoZW0gdG8gdGhlIHdlYnBhZ2UuXG4gKi9cbmNvbnN0IGZpbGxSZXZpZXdzSFRNTCA9IChyZXZpZXdzID0gc2VsZi5yZXN0YXVyYW50LnJldmlld3MpID0+IHtcbiAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jldmlld3MtY29udGFpbmVyJyk7XG4gIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcbiAgdGl0bGUuaW5uZXJIVE1MID0gJ1Jldmlld3MnO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQodGl0bGUpO1xuXG4gIGlmICghcmV2aWV3cykge1xuICAgIGNvbnN0IG5vUmV2aWV3cyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICBub1Jldmlld3MuaW5uZXJIVE1MID0gJ05vIHJldmlld3MgeWV0ISc7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKG5vUmV2aWV3cyk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnN0IHVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jldmlld3MtbGlzdCcpO1xuICByZXZpZXdzLmZvckVhY2gocmV2aWV3ID0+IHtcbiAgICB1bC5hcHBlbmRDaGlsZChjcmVhdGVSZXZpZXdIVE1MKHJldmlldykpO1xuICB9KTtcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKHVsKTtcbn1cblxuLyoqXG4gKiBDcmVhdGUgcmV2aWV3IEhUTUwgYW5kIGFkZCBpdCB0byB0aGUgd2VicGFnZS5cbiAqL1xuY29uc3QgY3JlYXRlUmV2aWV3SFRNTCA9IChyZXZpZXcpID0+IHtcbiAgY29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICBsaS5zZXRBdHRyaWJ1dGUoJ2lkJywgYHJldmlldy1saS0ke3Jldmlldy5pZH1gKVxuICBjb25zdCBuYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICBuYW1lLmlubmVySFRNTCA9IHJldmlldy5uYW1lO1xuICBsaS5hcHBlbmRDaGlsZChuYW1lKTtcblxuICBjb25zdCBkYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICBkYXRlLmlubmVySFRNTCA9ICc8c3Ryb25nPkNyZWF0ZWQ6PC9zdHJvbmc+ICcgKyAobmV3IERhdGUocmV2aWV3LmNyZWF0ZWRBdCkpLnRvRGF0ZVN0cmluZygpO1xuICBsaS5hcHBlbmRDaGlsZChkYXRlKTtcblxuICBjb25zdCByYXRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gIHJhdGluZy5pbm5lckhUTUwgPSBgUmF0aW5nOiAke3Jldmlldy5yYXRpbmd9YDtcbiAgbGkuYXBwZW5kQ2hpbGQocmF0aW5nKTtcblxuICBjb25zdCBjb21tZW50cyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgY29tbWVudHMuaW5uZXJIVE1MID0gcmV2aWV3LmNvbW1lbnRzO1xuICBsaS5hcHBlbmRDaGlsZChjb21tZW50cyk7XG5cblxuICByZXR1cm4gbGk7XG59XG5cbi8qKlxuICogQWRkIHJlc3RhdXJhbnQgbmFtZSB0byB0aGUgYnJlYWRjcnVtYiBuYXZpZ2F0aW9uIG1lbnVcbiAqL1xuY29uc3QgZmlsbEJyZWFkY3J1bWIgPSAocmVzdGF1cmFudD1zZWxmLnJlc3RhdXJhbnQpID0+IHtcbiAgY29uc3QgYnJlYWRjcnVtYiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdicmVhZGNydW1iJyk7XG4gIGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgbGkuaW5uZXJIVE1MID0gcmVzdGF1cmFudC5uYW1lO1xuICBicmVhZGNydW1iLmFwcGVuZENoaWxkKGxpKTtcbn1cblxuLyoqXG4gKiBHZXQgYSBwYXJhbWV0ZXIgYnkgbmFtZSBmcm9tIHBhZ2UgVVJMLlxuICovXG5jb25zdCBnZXRQYXJhbWV0ZXJCeU5hbWUgPSAobmFtZSwgdXJsKSA9PiB7XG4gIGlmICghdXJsKVxuICAgIHVybCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuICBuYW1lID0gbmFtZS5yZXBsYWNlKC9bXFxbXFxdXS9nLCAnXFxcXCQmJyk7XG4gIGNvbnN0IHJlZ2V4ID0gbmV3IFJlZ0V4cChgWz8mXSR7bmFtZX0oPShbXiYjXSopfCZ8I3wkKWApLFxuICAgIHJlc3VsdHMgPSByZWdleC5leGVjKHVybCk7XG4gIGlmICghcmVzdWx0cylcbiAgICByZXR1cm4gbnVsbDtcbiAgaWYgKCFyZXN1bHRzWzJdKVxuICAgIHJldHVybiAnJztcbiAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChyZXN1bHRzWzJdLnJlcGxhY2UoL1xcKy9nLCAnICcpKTtcbn1cblxuY29uc3Qgc3VibWl0UmV2aWV3ID0gKCkgPT4ge1xuICBjb25zb2xlLmxvZygnc3VibWl0IHJldmlldyBmdW5jdGlvbicpO1xuXG4gIGxldCBmb3JtRGF0YSA9IGdldEZvcm1WYWx1ZXMoKTtcbiAgaWYoIS9bYS16QS1aXXsyLH0kL2dpLnRlc3QoZm9ybURhdGEubmFtZSkpIHtcbiAgICBhbGVydCgnbmFtZSBpbnB1dCBtdXN0IGJlIGxldHRlcnMgb25seSwgbWluaW11bSBvZiAyIGNoYXJhY3RlcnMnKTtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYoIS9bMS01XXsxfSQvZ2kudGVzdChmb3JtRGF0YS5yYXRpbmcpKSB7XG4gICAgYWxlcnQoJ3JhdGluZyBpbnB1dCBtdXN0IGJlIGEgbnVtYmVyLCAxLTUnKTtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYoZm9ybURhdGEuY29tbWVudHMubGVuZ3RoIDwgMykge1xuICAgIGFsZXJ0KCdjb21tZW50cyBpbnB1dCBtdXN0IGJlIG1pbmltdW0gb2YgMyBjaGFyYWN0ZXJzJyk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGZvcm1EYXRhLnJlc3RhdXJhbnRfaWQgPSBzZWxmLnJlc3RhdXJhbnQuaWQ7XG4gIERCSGVscGVyLnNhdmVOZXdSZXZpZXcoZm9ybURhdGEpLnRoZW4oIHJlc3VsdCA9PiB7XG4gICAgY29uc29sZS5sb2cocmVzdWx0KTtcbiAgICBsZXQgYWxlcnRNc2cgPSAnQ3JlYXRlZCBSZXZpZXcnO1xuICAgIGFsZXJ0KGFsZXJ0TXNnKTtcbiAgICBsZXQgbmV3X3Jldmlld19ibG9jayA9IGNyZWF0ZVJldmlld0hUTUwocmVzdWx0KTtcbiAgICBjb25zdCB1bCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXZpZXdzLWxpc3QnKTtcbiAgICB1bC5hcHBlbmRDaGlsZChuZXdfcmV2aWV3X2Jsb2NrKTtcbiAgICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGByZXZpZXctbGktJHtyZXN1bHQuaWR9YCk7XG4gICAgaWYoZWxlbWVudC5zY3JvbGxJbnRvVmlldyAmJiBlbGVtZW50LnNjcm9sbEludG9WaWV3LmNvbnN0cnVjdG9yID09PSBGdW5jdGlvbikge1xuICAgICAgZWxlbWVudC5zY3JvbGxJbnRvVmlldyh0cnVlKTtcbiAgICB9XG4gIH0pO1xufVxuXG5jb25zdCBnZXRGb3JtVmFsdWVzID0gKCkgPT4ge1xuICByZXR1cm4ge1xuICAgIG5hbWU6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYW1lJykudmFsdWUudHJpbSgpLFxuICAgIHJhdGluZzogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JhdGluZycpLnZhbHVlLnRyaW0oKSxcbiAgICBjb21tZW50czogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jldmlldy1maWVsZCcpLnZhbHVlLnRyaW0oKVxuICB9XG59XG5cbiIsImNvbnN0IGNhY2hlVmVyc2lvbiA9ICczJztcbmNvbnN0IFNUQVRJQ19DQUNIRSA9IGByZXN0YXVyYW50LWNhY2hlLXYke2NhY2hlVmVyc2lvbn1gO1xuY29uc3QgSU1BR0VTX0NBQ0hFID0gYGltYWdlc19jYWNoZS12YDtcbmNvbnN0IGFsbENhY2hlcyA9IFtcbiAgU1RBVElDX0NBQ0hFLFxuICBJTUFHRVNfQ0FDSEVcbl07XG5pbXBvcnQgeyBvcGVuREIsIGRlbGV0ZURCLCB3cmFwLCB1bndyYXAgfSBmcm9tICdpZGInO1xuZXhwb3J0IHtkYlByb21pc2V9XG5cbmNvbnN0IGRiUHJvbWlzZSA9IG9wZW5EQigncnItZGInLCAzLCB7XG4gIHVwZ3JhZGUoZGIsIG9sZFZlcnNpb24pIHtcbiAgICBzd2l0Y2ggKG9sZFZlcnNpb24pIHtcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgY29uc3Qgc3RvcmUgPSBkYi5jcmVhdGVPYmplY3RTdG9yZSgncmVzdGF1cmFudHMnLCB7IGtleVBhdGg6ICdpZCcgfSk7XG4gICAgICAgIHN0b3JlLmNyZWF0ZUluZGV4KCdpZCcsICdpZCcpO1xuICAgICAgY2FzZSAxOlxuICAgICAgICBjb25zdCByZXZpZXdzU3RvcmUgPSBkYi5jcmVhdGVPYmplY3RTdG9yZSgncmV2aWV3cycsIHtcbiAgICAgICAgICBrZXlQYXRoOiAnaWQnLFxuICAgICAgICAgIGF1dG9JbmNyZW1lbnQ6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgIHJldmlld3NTdG9yZS5jcmVhdGVJbmRleChcInJlc3RhdXJhbnRfaWRcIiwgXCJyZXN0YXVyYW50X2lkXCIpO1xuICAgICAgY2FzZSAyOlxuICAgICAgICBjb25zdCBwZW5kaW5nU3RvcmUgPSBkYi5jcmVhdGVPYmplY3RTdG9yZSgncGVuZGluZycsIHtcbiAgICAgICAgICBrZXlQYXRoOiAnaWQnLFxuICAgICAgICAgIGF1dG9JbmNyZW1lbnQ6IHRydWVcbiAgICAgICAgfSk7XG4gICAgfVxuICB9XG59KTtcblxuIGNvbnN0IGdldFJlc3RhdXJhbnRzID0gKGV2ZW50KSA9PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgZmV0Y2goZXZlbnQucmVxdWVzdClcbiAgICAgIC50aGVuKHJlc3AgPT4gcmVzcC5qc29uKCkpXG4gICAgICAudGhlbihqc29uID0+IHsgcmVzb2x2ZShqc29uKTsgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbmZ1bmN0aW9uIGlzSW1hZ2VVUkwodXJsKSB7XG4gIGxldCBpbWdUeXBlcyA9IFtcInBuZ1wiLCBcImpwZ1wiLCBcImpwZWdcIiwgXCJzdmdcIiwgXCJnaWZcIl07XG4gIGxldCBpc0ltYWdlID0gZmFsc2U7XG4gIGZvciAobGV0IHR5cGUgb2YgaW1nVHlwZXMpIHtcbiAgICBpZiAodXJsLmVuZHNXaXRoKHR5cGUpKSB7IGlzSW1hZ2UgPSB0cnVlOyBicmVha307XG4gIH1cbiAgcmV0dXJuIGlzSW1hZ2U7XG59XG5cbnNlbGYuYWRkRXZlbnRMaXN0ZW5lcignaW5zdGFsbCcsIGV2ZW50ID0+IHtcbiAgZXZlbnQud2FpdFVudGlsKFxuICAgIGNhY2hlcy5vcGVuKFNUQVRJQ19DQUNIRSkudGhlbihjYWNoZSA9PiB7XG4gICAgICByZXR1cm4gY2FjaGUuYWRkQWxsKFtcbiAgICAgICAgJy8nLFxuICAgICAgICAnLi9hcHAuYnVuZGxlLmpzJyxcbiAgICAgICAgJy4vcmVzdGF1cmFudC5idW5kbGUuanMnLFxuICAgICAgXSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnZXJyb3Igc2V0dGluZyB1cCBpbnN0YWxsIGV2ZW50IGZvciBzdycpO1xuICAgICAgfSk7XG4gICAgfSlcbiAgKTtcbn0pO1xuXG4vL2NsZWFuIHVudXNlZCBjYWNoZXMgc3RhcnRpbmcgd2l0aCByZXN0YXVyYW50XG5zZWxmLmFkZEV2ZW50TGlzdGVuZXIoJ2FjdGl2YXRlJywgZXZlbnQgPT4ge1xuICBldmVudC53YWl0VW50aWwoXG4gICAgY2FjaGVzLmtleXMoKS50aGVuKGNhY2hlTmFtZXMgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ0NsZWFyaW5nIE9sZCBDYWNoZXMnKTtcbiAgICAgIHJldHVybiBQcm9taXNlLmFsbChcbiAgICAgICAgY2FjaGVOYW1lcy5maWx0ZXIoY2FjaGVOYW1lID0+IHtcbiAgICAgICAgICByZXR1cm4gY2FjaGVOYW1lLnN0YXJ0c1dpdGgoJ3Jlc3RhdXJhbnQtJykgJiZcbiAgICAgICAgICAgICAgICAgY2FjaGVOYW1lICE9IFNUQVRJQ19DQUNIRTtcbiAgICAgICAgfSkubWFwKGNhY2hlTmFtZSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coYERlbGV0aW5nICR7Y2FjaGVOYW1lfWApO1xuICAgICAgICAgIHJldHVybiBjYWNoZXMuZGVsZXRlKGNhY2hlTmFtZSk7XG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH0pXG4gICk7XG59KTtcblxuXG5zZWxmLmFkZEV2ZW50TGlzdGVuZXIoJ2ZldGNoJywgZXZlbnQgPT4ge1xuICBsZXQgY2hlY2tVcmwgPSBuZXcgVVJMKGV2ZW50LnJlcXVlc3QudXJsKTtcbiAgaWYgKGNoZWNrVXJsLnBvcnQgPT09IFwiMTMzN1wiKSB7XG4gICAgbGV0IGlkID0gY2hlY2tVcmwuc2VhcmNoUGFyYW1zLmdldCgncmVzdGF1cmFudF9pZCcpIC0gMDtcbiAgICBjb25zb2xlLmxvZyhpZCk7XG4gICAgcmV0dXJuIGhhbmRsZUFKQVhFdmVudChldmVudCwgaWQpO1xuICB9IGVsc2Uge1xuICAgIGhhbmRsZU5vbkFKQVhFdmVudChldmVudCk7XG4gIH1cbn0pO1xuXG5jb25zdCBoYW5kbGVBSkFYRXZlbnQgPSAoZXZlbnQsIGlkKSA9PiB7XG4gIC8vIE9ubHkgdXNlIGZvciBjYWNoaW5nIGZvciBHZXQgZXZlbnRzXG4gIGlmKGV2ZW50LnJlcXVlc3QubWV0aG9kICE9PSBcIkdFVFwiKSB7XG4gICAgZXZlbnQucmVzcG9uZFdpdGgoIGZldGNoKGV2ZW50LnJlcXVlc3QpKVxuICB9IGVsc2UgaWYoZXZlbnQucmVxdWVzdC51cmwuaW5kZXhPZihcInJlc3RhdXJhbnRzXCIpID4gLTEpIHtcbiAgICBoYW5kbGVSZXN0YXVyYW50RXZlbnRzKGV2ZW50KTtcbiAgfSBlbHNlIHtcbiAgICBjb25zb2xlLmxvZygnc3RhcnRpbmcgaGFuZGxpbmcgZnJvbSByZXZpZXdzIGV2ZW50JylcbiAgICBoYW5kbGVSZXZpZXdzRXZlbnRzKGV2ZW50LCBpZCk7XG4gIH1cbn1cblxuY29uc3QgaGFuZGxlUmVzdGF1cmFudEV2ZW50cyA9IChldmVudCkgPT4ge1xuICBldmVudC5yZXNwb25kV2l0aChcbiAgICAgIGRiUHJvbWlzZS50aGVuKCBkYiA9PiB7XG4gICAgICAgIHJldHVybiBkYlxuICAgICAgICAgIC50cmFuc2FjdGlvbigncmVzdGF1cmFudHMnKVxuICAgICAgICAgIC5vYmplY3RTdG9yZSgncmVzdGF1cmFudHMnKVxuICAgICAgICAgIC5nZXRBbGwoKTtcbiAgICAgIH0pLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgIHJldHVybiAoKGRhdGEubGVuZ3RoICYmIGRhdGEpIHx8IGdldFJlc3RhdXJhbnRzKGV2ZW50KVxuICAgICAgICAgIC50aGVuKCByZXN0YXVyYW50cyA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZmV0Y2hlZCBub3cgc3RvcmluZycpO1xuICAgICAgICAgICAgcmV0dXJuIGRiUHJvbWlzZS50aGVuKGRiID0+IHtcbiAgICAgICAgICAgICAgbGV0IHR4ID0gZGIudHJhbnNhY3Rpb24oJ3Jlc3RhdXJhbnRzJywgJ3JlYWR3cml0ZScpO1xuICAgICAgICAgICAgICBsZXQgc3RvcmUgPSB0eC5vYmplY3RTdG9yZSgncmVzdGF1cmFudHMnKTtcbiAgICAgICAgICAgICAgcmVzdGF1cmFudHMuZm9yRWFjaChmdW5jdGlvbihyZXN0YXVyYW50KXtcbiAgICAgICAgICAgICAgICBzdG9yZS5wdXQocmVzdGF1cmFudCk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICByZXR1cm4gdHguZG9uZTtcbiAgICAgICAgICAgIH0pLnRoZW4oICgpID0+IHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3N0b3JlZCByZXN0YXVyYW50cywgbm93IHJldHVybmluZycpO1xuICAgICAgICAgICAgICByZXR1cm4gcmVzdGF1cmFudHM7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICB9KVxuICAgICAgICAudGhlbihmaW5hbFJlc3BvbnNlID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhmaW5hbFJlc3BvbnNlKTtcbiAgICAgICAgICByZXR1cm4gbmV3IFJlc3BvbnNlKEpTT04uc3RyaW5naWZ5KGZpbmFsUmVzcG9uc2UpKTtcbiAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJldHVybiBuZXcgUmVzcG9uc2UoXCJFcnJvciBmZXRjaGluZyBkYXRhXCIsIHtzdGF0dXM6IDUwMH0pO1xuICAgIH0pXG4gIClcbn1cblxuY29uc3QgaGFuZGxlUmV2aWV3c0V2ZW50cyA9IChldmVudCwgaWQpID0+IHtcbiAgZXZlbnQucmVzcG9uZFdpdGgoXG4gICAgZGJQcm9taXNlLnRoZW4oZGIgPT4ge1xuICAgICAgcmV0dXJuIGRiXG4gICAgICAgIC50cmFuc2FjdGlvbigncmV2aWV3cycpXG4gICAgICAgIC5vYmplY3RTdG9yZSgncmV2aWV3cycpXG4gICAgICAgIC5pbmRleChcInJlc3RhdXJhbnRfaWRcIilcbiAgICAgICAgLmdldEFsbChpZCk7XG4gICAgfSkudGhlbiggZGF0YSA9PiB7XG4gICAgICBjb25zb2xlLmxvZygnc2VydmljZXdvcmtlciBoYW5kbGUgcmV2aWV3cycpO1xuICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICByZXR1cm4gKGRhdGEubGVuZ3RoICYmIGRhdGEpIHx8IGZldGNoKGV2ZW50LnJlcXVlc3QpXG4gICAgICAgIC50aGVuKGZldGNoUmVzcG9uc2UgPT4ge1xuICAgICAgICAgIHJldHVybiBmZXRjaFJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oIHJldmlld3MgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCd1c2luZyBzZXJ2aWNld29ya2VyIGZldGNoJyk7XG4gICAgICAgICAgY29uc29sZS5sb2coJ3N0YXJ0aW5nIHRvIHN0b3JlIHJldmlld3MnKTtcbiAgICAgICAgICByZXR1cm4gZGJQcm9taXNlLnRoZW4oZGIgPT4ge1xuICAgICAgICAgICAgbGV0IHR4ID0gZGIudHJhbnNhY3Rpb24oJ3Jldmlld3MnLCAncmVhZHdyaXRlJylcbiAgICAgICAgICAgIGxldCBzdG9yZSA9IHR4Lm9iamVjdFN0b3JlKCdyZXZpZXdzJyk7XG4gICAgICAgICAgICByZXZpZXdzLmZvckVhY2goZnVuY3Rpb24ocmV2aWV3KSB7XG4gICAgICAgICAgICAgIHN0b3JlLnB1dChyZXZpZXcpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdHguZG9uZTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC50aGVuKCAoKSA9PiByZXZpZXdzKVxuICAgICAgICB9KVxuICAgIH0pLnRoZW4oZmluYWxSZXNwb25zZSA9PiB7XG4gICAgICByZXR1cm4gbmV3IFJlc3BvbnNlKEpTT04uc3RyaW5naWZ5KGZpbmFsUmVzcG9uc2UpKTtcbiAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICByZXR1cm4gbmV3IFJlc3BvbnNlKFwiRXJyb3IgZmV0Y2hpbmcgZGF0YVwiLCB7c3RhdHVzOiA1MDB9KTtcbiAgICB9KSlcbn1cblxuY29uc3QgaGFuZGxlTm9uQUpBWEV2ZW50ID0gKGV2ZW50KSA9PiB7XG4gIC8vIENoZWNrIGlmIHRoZSBIVE1MIHJlcXVlc3QgaGFzIHByZXZpb3VzbHkgYmVlbiBjYWNoZWQuIElmIHNvLCByZXR1cm4gdGhlXG4gIC8vIHJlc3BvbnNlIGZyb20gdGhlIGNhY2hlLiBJZiBub3QsIGZldGNoIHRoZSByZXF1ZXN0LCBjYWNoZSBpdCwgYW5kIHRoZW4gcmV0dXJuXG4gIC8vIGl0LlxuICBldmVudC5yZXNwb25kV2l0aChcbiAgICBjYWNoZXMubWF0Y2goZXZlbnQucmVxdWVzdCkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICByZXR1cm4gcmVzcG9uc2UgfHwgZmV0Y2goZXZlbnQucmVxdWVzdCkudGhlbihmZXRjaFJlc3BvbnNlID0+IHtcbiAgICAgICAgbGV0IHVzZUNhY2hlID0gaXNJbWFnZVVSTChldmVudC5yZXF1ZXN0LnVybCkgPyAgSU1BR0VTX0NBQ0hFIDogU1RBVElDX0NBQ0hFO1xuICAgICAgICByZXR1cm4gY2FjaGVzXG4gICAgICAgICAgLm9wZW4odXNlQ2FjaGUpXG4gICAgICAgICAgLnRoZW4oY2FjaGUgPT4ge1xuICAgICAgICAgICAgY2FjaGUucHV0KGV2ZW50LnJlcXVlc3QsIGZldGNoUmVzcG9uc2UuY2xvbmUoKSk7XG4gICAgICAgICAgICByZXR1cm4gZmV0Y2hSZXNwb25zZTtcbiAgICAgICAgfSk7XG4gICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgUmVzcG9uc2UoXCJBcHBsaWNhdGlvbiBpcyBub3QgY29ubmVjdGVkIHRvIHRoZSBpbnRlcm5ldFwiLCB7XG4gICAgICAgICAgc3RhdHVzOiA0MDQsXG4gICAgICAgICAgc3RhdHVzVGV4dDogXCJBcHBsaWNhdGlvbiBpcyBub3QgY29ubmVjdGVkIHRvIHRoZSBpbnRlcm5ldFwiXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSlcbiAgKTtcblxuICAvLyBVcGRhdGVzIHRoZSBkYXRhIGZyb20gdGhlIG5ldHdvcmsgdG8gdXNlIG9uIG5leHQgcmVxdWVzdC5cbiAgZXZlbnQud2FpdFVudGlsKHVwZGF0ZShldmVudC5yZXF1ZXN0KSk7XG59XG5cbmNvbnN0IHVwZGF0ZSA9IChyZXF1ZXN0KSA9PiB7XG4gIGxldCB1c2VDYWNoZSA9IGlzSW1hZ2VVUkwocmVxdWVzdC51cmwpID8gIElNQUdFU19DQUNIRSA6IFNUQVRJQ19DQUNIRTtcbiAgY29uc29sZS5sb2codXNlQ2FjaGUpO1xuICByZXR1cm4gY2FjaGVzLm9wZW4odXNlQ2FjaGUpLnRoZW4oY2FjaGUgPT4ge1xuICAgIHJldHVybiBmZXRjaChyZXF1ZXN0KS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKCd1cGRhdGluZyB0aGUgY2FjaGUnKTtcbiAgICAgIHJldHVybiBjYWNoZS5wdXQocmVxdWVzdCwgcmVzcG9uc2UpO1xuICAgIH0pO1xuICB9KTtcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmICh0eXBlb2YgaXQgIT0gJ2Z1bmN0aW9uJykgdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYSBmdW5jdGlvbiEnKTtcbiAgcmV0dXJuIGl0O1xufTtcbiIsIi8vIDIyLjEuMy4zMSBBcnJheS5wcm90b3R5cGVbQEB1bnNjb3BhYmxlc11cbnZhciBVTlNDT1BBQkxFUyA9IHJlcXVpcmUoJy4vX3drcycpKCd1bnNjb3BhYmxlcycpO1xudmFyIEFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGU7XG5pZiAoQXJyYXlQcm90b1tVTlNDT1BBQkxFU10gPT0gdW5kZWZpbmVkKSByZXF1aXJlKCcuL19oaWRlJykoQXJyYXlQcm90bywgVU5TQ09QQUJMRVMsIHt9KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICBBcnJheVByb3RvW1VOU0NPUEFCTEVTXVtrZXldID0gdHJ1ZTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgYXQgPSByZXF1aXJlKCcuL19zdHJpbmctYXQnKSh0cnVlKTtcblxuIC8vIGBBZHZhbmNlU3RyaW5nSW5kZXhgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtYWR2YW5jZXN0cmluZ2luZGV4XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChTLCBpbmRleCwgdW5pY29kZSkge1xuICByZXR1cm4gaW5kZXggKyAodW5pY29kZSA/IGF0KFMsIGluZGV4KS5sZW5ndGggOiAxKTtcbn07XG4iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmICghaXNPYmplY3QoaXQpKSB0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhbiBvYmplY3QhJyk7XG4gIHJldHVybiBpdDtcbn07XG4iLCIvLyBmYWxzZSAtPiBBcnJheSNpbmRleE9mXG4vLyB0cnVlICAtPiBBcnJheSNpbmNsdWRlc1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpO1xudmFyIHRvQWJzb2x1dGVJbmRleCA9IHJlcXVpcmUoJy4vX3RvLWFic29sdXRlLWluZGV4Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChJU19JTkNMVURFUykge1xuICByZXR1cm4gZnVuY3Rpb24gKCR0aGlzLCBlbCwgZnJvbUluZGV4KSB7XG4gICAgdmFyIE8gPSB0b0lPYmplY3QoJHRoaXMpO1xuICAgIHZhciBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aCk7XG4gICAgdmFyIGluZGV4ID0gdG9BYnNvbHV0ZUluZGV4KGZyb21JbmRleCwgbGVuZ3RoKTtcbiAgICB2YXIgdmFsdWU7XG4gICAgLy8gQXJyYXkjaW5jbHVkZXMgdXNlcyBTYW1lVmFsdWVaZXJvIGVxdWFsaXR5IGFsZ29yaXRobVxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgICBpZiAoSVNfSU5DTFVERVMgJiYgZWwgIT0gZWwpIHdoaWxlIChsZW5ndGggPiBpbmRleCkge1xuICAgICAgdmFsdWUgPSBPW2luZGV4KytdO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlbGYtY29tcGFyZVxuICAgICAgaWYgKHZhbHVlICE9IHZhbHVlKSByZXR1cm4gdHJ1ZTtcbiAgICAvLyBBcnJheSNpbmRleE9mIGlnbm9yZXMgaG9sZXMsIEFycmF5I2luY2x1ZGVzIC0gbm90XG4gICAgfSBlbHNlIGZvciAoO2xlbmd0aCA+IGluZGV4OyBpbmRleCsrKSBpZiAoSVNfSU5DTFVERVMgfHwgaW5kZXggaW4gTykge1xuICAgICAgaWYgKE9baW5kZXhdID09PSBlbCkgcmV0dXJuIElTX0lOQ0xVREVTIHx8IGluZGV4IHx8IDA7XG4gICAgfSByZXR1cm4gIUlTX0lOQ0xVREVTICYmIC0xO1xuICB9O1xufTtcbiIsIi8vIGdldHRpbmcgdGFnIGZyb20gMTkuMS4zLjYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZygpXG52YXIgY29mID0gcmVxdWlyZSgnLi9fY29mJyk7XG52YXIgVEFHID0gcmVxdWlyZSgnLi9fd2tzJykoJ3RvU3RyaW5nVGFnJyk7XG4vLyBFUzMgd3JvbmcgaGVyZVxudmFyIEFSRyA9IGNvZihmdW5jdGlvbiAoKSB7IHJldHVybiBhcmd1bWVudHM7IH0oKSkgPT0gJ0FyZ3VtZW50cyc7XG5cbi8vIGZhbGxiYWNrIGZvciBJRTExIFNjcmlwdCBBY2Nlc3MgRGVuaWVkIGVycm9yXG52YXIgdHJ5R2V0ID0gZnVuY3Rpb24gKGl0LCBrZXkpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gaXRba2V5XTtcbiAgfSBjYXRjaCAoZSkgeyAvKiBlbXB0eSAqLyB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgTywgVCwgQjtcbiAgcmV0dXJuIGl0ID09PSB1bmRlZmluZWQgPyAnVW5kZWZpbmVkJyA6IGl0ID09PSBudWxsID8gJ051bGwnXG4gICAgLy8gQEB0b1N0cmluZ1RhZyBjYXNlXG4gICAgOiB0eXBlb2YgKFQgPSB0cnlHZXQoTyA9IE9iamVjdChpdCksIFRBRykpID09ICdzdHJpbmcnID8gVFxuICAgIC8vIGJ1aWx0aW5UYWcgY2FzZVxuICAgIDogQVJHID8gY29mKE8pXG4gICAgLy8gRVMzIGFyZ3VtZW50cyBmYWxsYmFja1xuICAgIDogKEIgPSBjb2YoTykpID09ICdPYmplY3QnICYmIHR5cGVvZiBPLmNhbGxlZSA9PSAnZnVuY3Rpb24nID8gJ0FyZ3VtZW50cycgOiBCO1xufTtcbiIsInZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChpdCkuc2xpY2UoOCwgLTEpO1xufTtcbiIsInZhciBjb3JlID0gbW9kdWxlLmV4cG9ydHMgPSB7IHZlcnNpb246ICcyLjYuNScgfTtcbmlmICh0eXBlb2YgX19lID09ICdudW1iZXInKSBfX2UgPSBjb3JlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG4iLCIvLyBvcHRpb25hbCAvIHNpbXBsZSBjb250ZXh0IGJpbmRpbmdcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChmbiwgdGhhdCwgbGVuZ3RoKSB7XG4gIGFGdW5jdGlvbihmbik7XG4gIGlmICh0aGF0ID09PSB1bmRlZmluZWQpIHJldHVybiBmbjtcbiAgc3dpdGNoIChsZW5ndGgpIHtcbiAgICBjYXNlIDE6IHJldHVybiBmdW5jdGlvbiAoYSkge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSk7XG4gICAgfTtcbiAgICBjYXNlIDI6IHJldHVybiBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYik7XG4gICAgfTtcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jdGlvbiAoYSwgYiwgYykge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYiwgYyk7XG4gICAgfTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24gKC8qIC4uLmFyZ3MgKi8pIHtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcbiAgfTtcbn07XG4iLCIvLyA3LjIuMSBSZXF1aXJlT2JqZWN0Q29lcmNpYmxlKGFyZ3VtZW50KVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKGl0ID09IHVuZGVmaW5lZCkgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY2FsbCBtZXRob2Qgb24gIFwiICsgaXQpO1xuICByZXR1cm4gaXQ7XG59O1xuIiwiLy8gVGhhbmsncyBJRTggZm9yIGhpcyBmdW5ueSBkZWZpbmVQcm9wZXJ0eVxubW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sICdhJywgeyBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDc7IH0gfSkuYSAhPSA3O1xufSk7XG4iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbnZhciBkb2N1bWVudCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLmRvY3VtZW50O1xuLy8gdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgaXMgJ29iamVjdCcgaW4gb2xkIElFXG52YXIgaXMgPSBpc09iamVjdChkb2N1bWVudCkgJiYgaXNPYmplY3QoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXMgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGl0KSA6IHt9O1xufTtcbiIsIi8vIElFIDgtIGRvbid0IGVudW0gYnVnIGtleXNcbm1vZHVsZS5leHBvcnRzID0gKFxuICAnY29uc3RydWN0b3IsaGFzT3duUHJvcGVydHksaXNQcm90b3R5cGVPZixwcm9wZXJ0eUlzRW51bWVyYWJsZSx0b0xvY2FsZVN0cmluZyx0b1N0cmluZyx2YWx1ZU9mJ1xuKS5zcGxpdCgnLCcpO1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIGNvcmUgPSByZXF1aXJlKCcuL19jb3JlJyk7XG52YXIgaGlkZSA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcbnZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lJyk7XG52YXIgY3R4ID0gcmVxdWlyZSgnLi9fY3R4Jyk7XG52YXIgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG5cbnZhciAkZXhwb3J0ID0gZnVuY3Rpb24gKHR5cGUsIG5hbWUsIHNvdXJjZSkge1xuICB2YXIgSVNfRk9SQ0VEID0gdHlwZSAmICRleHBvcnQuRjtcbiAgdmFyIElTX0dMT0JBTCA9IHR5cGUgJiAkZXhwb3J0Lkc7XG4gIHZhciBJU19TVEFUSUMgPSB0eXBlICYgJGV4cG9ydC5TO1xuICB2YXIgSVNfUFJPVE8gPSB0eXBlICYgJGV4cG9ydC5QO1xuICB2YXIgSVNfQklORCA9IHR5cGUgJiAkZXhwb3J0LkI7XG4gIHZhciB0YXJnZXQgPSBJU19HTE9CQUwgPyBnbG9iYWwgOiBJU19TVEFUSUMgPyBnbG9iYWxbbmFtZV0gfHwgKGdsb2JhbFtuYW1lXSA9IHt9KSA6IChnbG9iYWxbbmFtZV0gfHwge30pW1BST1RPVFlQRV07XG4gIHZhciBleHBvcnRzID0gSVNfR0xPQkFMID8gY29yZSA6IGNvcmVbbmFtZV0gfHwgKGNvcmVbbmFtZV0gPSB7fSk7XG4gIHZhciBleHBQcm90byA9IGV4cG9ydHNbUFJPVE9UWVBFXSB8fCAoZXhwb3J0c1tQUk9UT1RZUEVdID0ge30pO1xuICB2YXIga2V5LCBvd24sIG91dCwgZXhwO1xuICBpZiAoSVNfR0xPQkFMKSBzb3VyY2UgPSBuYW1lO1xuICBmb3IgKGtleSBpbiBzb3VyY2UpIHtcbiAgICAvLyBjb250YWlucyBpbiBuYXRpdmVcbiAgICBvd24gPSAhSVNfRk9SQ0VEICYmIHRhcmdldCAmJiB0YXJnZXRba2V5XSAhPT0gdW5kZWZpbmVkO1xuICAgIC8vIGV4cG9ydCBuYXRpdmUgb3IgcGFzc2VkXG4gICAgb3V0ID0gKG93biA/IHRhcmdldCA6IHNvdXJjZSlba2V5XTtcbiAgICAvLyBiaW5kIHRpbWVycyB0byBnbG9iYWwgZm9yIGNhbGwgZnJvbSBleHBvcnQgY29udGV4dFxuICAgIGV4cCA9IElTX0JJTkQgJiYgb3duID8gY3R4KG91dCwgZ2xvYmFsKSA6IElTX1BST1RPICYmIHR5cGVvZiBvdXQgPT0gJ2Z1bmN0aW9uJyA/IGN0eChGdW5jdGlvbi5jYWxsLCBvdXQpIDogb3V0O1xuICAgIC8vIGV4dGVuZCBnbG9iYWxcbiAgICBpZiAodGFyZ2V0KSByZWRlZmluZSh0YXJnZXQsIGtleSwgb3V0LCB0eXBlICYgJGV4cG9ydC5VKTtcbiAgICAvLyBleHBvcnRcbiAgICBpZiAoZXhwb3J0c1trZXldICE9IG91dCkgaGlkZShleHBvcnRzLCBrZXksIGV4cCk7XG4gICAgaWYgKElTX1BST1RPICYmIGV4cFByb3RvW2tleV0gIT0gb3V0KSBleHBQcm90b1trZXldID0gb3V0O1xuICB9XG59O1xuZ2xvYmFsLmNvcmUgPSBjb3JlO1xuLy8gdHlwZSBiaXRtYXBcbiRleHBvcnQuRiA9IDE7ICAgLy8gZm9yY2VkXG4kZXhwb3J0LkcgPSAyOyAgIC8vIGdsb2JhbFxuJGV4cG9ydC5TID0gNDsgICAvLyBzdGF0aWNcbiRleHBvcnQuUCA9IDg7ICAgLy8gcHJvdG9cbiRleHBvcnQuQiA9IDE2OyAgLy8gYmluZFxuJGV4cG9ydC5XID0gMzI7ICAvLyB3cmFwXG4kZXhwb3J0LlUgPSA2NDsgIC8vIHNhZmVcbiRleHBvcnQuUiA9IDEyODsgLy8gcmVhbCBwcm90byBtZXRob2QgZm9yIGBsaWJyYXJ5YFxubW9kdWxlLmV4cG9ydHMgPSAkZXhwb3J0O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZXhlYykge1xuICB0cnkge1xuICAgIHJldHVybiAhIWV4ZWMoKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xucmVxdWlyZSgnLi9lczYucmVnZXhwLmV4ZWMnKTtcbnZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lJyk7XG52YXIgaGlkZSA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4vX2ZhaWxzJyk7XG52YXIgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbnZhciB3a3MgPSByZXF1aXJlKCcuL193a3MnKTtcbnZhciByZWdleHBFeGVjID0gcmVxdWlyZSgnLi9fcmVnZXhwLWV4ZWMnKTtcblxudmFyIFNQRUNJRVMgPSB3a3MoJ3NwZWNpZXMnKTtcblxudmFyIFJFUExBQ0VfU1VQUE9SVFNfTkFNRURfR1JPVVBTID0gIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgLy8gI3JlcGxhY2UgbmVlZHMgYnVpbHQtaW4gc3VwcG9ydCBmb3IgbmFtZWQgZ3JvdXBzLlxuICAvLyAjbWF0Y2ggd29ya3MgZmluZSBiZWNhdXNlIGl0IGp1c3QgcmV0dXJuIHRoZSBleGVjIHJlc3VsdHMsIGV2ZW4gaWYgaXQgaGFzXG4gIC8vIGEgXCJncm9wc1wiIHByb3BlcnR5LlxuICB2YXIgcmUgPSAvLi87XG4gIHJlLmV4ZWMgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgIHJlc3VsdC5ncm91cHMgPSB7IGE6ICc3JyB9O1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG4gIHJldHVybiAnJy5yZXBsYWNlKHJlLCAnJDxhPicpICE9PSAnNyc7XG59KTtcblxudmFyIFNQTElUX1dPUktTX1dJVEhfT1ZFUldSSVRURU5fRVhFQyA9IChmdW5jdGlvbiAoKSB7XG4gIC8vIENocm9tZSA1MSBoYXMgYSBidWdneSBcInNwbGl0XCIgaW1wbGVtZW50YXRpb24gd2hlbiBSZWdFeHAjZXhlYyAhPT0gbmF0aXZlRXhlY1xuICB2YXIgcmUgPSAvKD86KS87XG4gIHZhciBvcmlnaW5hbEV4ZWMgPSByZS5leGVjO1xuICByZS5leGVjID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gb3JpZ2luYWxFeGVjLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7IH07XG4gIHZhciByZXN1bHQgPSAnYWInLnNwbGl0KHJlKTtcbiAgcmV0dXJuIHJlc3VsdC5sZW5ndGggPT09IDIgJiYgcmVzdWx0WzBdID09PSAnYScgJiYgcmVzdWx0WzFdID09PSAnYic7XG59KSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChLRVksIGxlbmd0aCwgZXhlYykge1xuICB2YXIgU1lNQk9MID0gd2tzKEtFWSk7XG5cbiAgdmFyIERFTEVHQVRFU19UT19TWU1CT0wgPSAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICAgIC8vIFN0cmluZyBtZXRob2RzIGNhbGwgc3ltYm9sLW5hbWVkIFJlZ0VwIG1ldGhvZHNcbiAgICB2YXIgTyA9IHt9O1xuICAgIE9bU1lNQk9MXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDc7IH07XG4gICAgcmV0dXJuICcnW0tFWV0oTykgIT0gNztcbiAgfSk7XG5cbiAgdmFyIERFTEVHQVRFU19UT19FWEVDID0gREVMRUdBVEVTX1RPX1NZTUJPTCA/ICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gICAgLy8gU3ltYm9sLW5hbWVkIFJlZ0V4cCBtZXRob2RzIGNhbGwgLmV4ZWNcbiAgICB2YXIgZXhlY0NhbGxlZCA9IGZhbHNlO1xuICAgIHZhciByZSA9IC9hLztcbiAgICByZS5leGVjID0gZnVuY3Rpb24gKCkgeyBleGVjQ2FsbGVkID0gdHJ1ZTsgcmV0dXJuIG51bGw7IH07XG4gICAgaWYgKEtFWSA9PT0gJ3NwbGl0Jykge1xuICAgICAgLy8gUmVnRXhwW0BAc3BsaXRdIGRvZXNuJ3QgY2FsbCB0aGUgcmVnZXgncyBleGVjIG1ldGhvZCwgYnV0IGZpcnN0IGNyZWF0ZXNcbiAgICAgIC8vIGEgbmV3IG9uZS4gV2UgbmVlZCB0byByZXR1cm4gdGhlIHBhdGNoZWQgcmVnZXggd2hlbiBjcmVhdGluZyB0aGUgbmV3IG9uZS5cbiAgICAgIHJlLmNvbnN0cnVjdG9yID0ge307XG4gICAgICByZS5jb25zdHJ1Y3RvcltTUEVDSUVTXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHJlOyB9O1xuICAgIH1cbiAgICByZVtTWU1CT0xdKCcnKTtcbiAgICByZXR1cm4gIWV4ZWNDYWxsZWQ7XG4gIH0pIDogdW5kZWZpbmVkO1xuXG4gIGlmIChcbiAgICAhREVMRUdBVEVTX1RPX1NZTUJPTCB8fFxuICAgICFERUxFR0FURVNfVE9fRVhFQyB8fFxuICAgIChLRVkgPT09ICdyZXBsYWNlJyAmJiAhUkVQTEFDRV9TVVBQT1JUU19OQU1FRF9HUk9VUFMpIHx8XG4gICAgKEtFWSA9PT0gJ3NwbGl0JyAmJiAhU1BMSVRfV09SS1NfV0lUSF9PVkVSV1JJVFRFTl9FWEVDKVxuICApIHtcbiAgICB2YXIgbmF0aXZlUmVnRXhwTWV0aG9kID0gLy4vW1NZTUJPTF07XG4gICAgdmFyIGZucyA9IGV4ZWMoXG4gICAgICBkZWZpbmVkLFxuICAgICAgU1lNQk9MLFxuICAgICAgJydbS0VZXSxcbiAgICAgIGZ1bmN0aW9uIG1heWJlQ2FsbE5hdGl2ZShuYXRpdmVNZXRob2QsIHJlZ2V4cCwgc3RyLCBhcmcyLCBmb3JjZVN0cmluZ01ldGhvZCkge1xuICAgICAgICBpZiAocmVnZXhwLmV4ZWMgPT09IHJlZ2V4cEV4ZWMpIHtcbiAgICAgICAgICBpZiAoREVMRUdBVEVTX1RPX1NZTUJPTCAmJiAhZm9yY2VTdHJpbmdNZXRob2QpIHtcbiAgICAgICAgICAgIC8vIFRoZSBuYXRpdmUgU3RyaW5nIG1ldGhvZCBhbHJlYWR5IGRlbGVnYXRlcyB0byBAQG1ldGhvZCAodGhpc1xuICAgICAgICAgICAgLy8gcG9seWZpbGxlZCBmdW5jdGlvbiksIGxlYXNpbmcgdG8gaW5maW5pdGUgcmVjdXJzaW9uLlxuICAgICAgICAgICAgLy8gV2UgYXZvaWQgaXQgYnkgZGlyZWN0bHkgY2FsbGluZyB0aGUgbmF0aXZlIEBAbWV0aG9kIG1ldGhvZC5cbiAgICAgICAgICAgIHJldHVybiB7IGRvbmU6IHRydWUsIHZhbHVlOiBuYXRpdmVSZWdFeHBNZXRob2QuY2FsbChyZWdleHAsIHN0ciwgYXJnMikgfTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHsgZG9uZTogdHJ1ZSwgdmFsdWU6IG5hdGl2ZU1ldGhvZC5jYWxsKHN0ciwgcmVnZXhwLCBhcmcyKSB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IGRvbmU6IGZhbHNlIH07XG4gICAgICB9XG4gICAgKTtcbiAgICB2YXIgc3RyZm4gPSBmbnNbMF07XG4gICAgdmFyIHJ4Zm4gPSBmbnNbMV07XG5cbiAgICByZWRlZmluZShTdHJpbmcucHJvdG90eXBlLCBLRVksIHN0cmZuKTtcbiAgICBoaWRlKFJlZ0V4cC5wcm90b3R5cGUsIFNZTUJPTCwgbGVuZ3RoID09IDJcbiAgICAgIC8vIDIxLjIuNS44IFJlZ0V4cC5wcm90b3R5cGVbQEByZXBsYWNlXShzdHJpbmcsIHJlcGxhY2VWYWx1ZSlcbiAgICAgIC8vIDIxLjIuNS4xMSBSZWdFeHAucHJvdG90eXBlW0BAc3BsaXRdKHN0cmluZywgbGltaXQpXG4gICAgICA/IGZ1bmN0aW9uIChzdHJpbmcsIGFyZykgeyByZXR1cm4gcnhmbi5jYWxsKHN0cmluZywgdGhpcywgYXJnKTsgfVxuICAgICAgLy8gMjEuMi41LjYgUmVnRXhwLnByb3RvdHlwZVtAQG1hdGNoXShzdHJpbmcpXG4gICAgICAvLyAyMS4yLjUuOSBSZWdFeHAucHJvdG90eXBlW0BAc2VhcmNoXShzdHJpbmcpXG4gICAgICA6IGZ1bmN0aW9uIChzdHJpbmcpIHsgcmV0dXJuIHJ4Zm4uY2FsbChzdHJpbmcsIHRoaXMpOyB9XG4gICAgKTtcbiAgfVxufTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8vIDIxLjIuNS4zIGdldCBSZWdFeHAucHJvdG90eXBlLmZsYWdzXG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuICB2YXIgdGhhdCA9IGFuT2JqZWN0KHRoaXMpO1xuICB2YXIgcmVzdWx0ID0gJyc7XG4gIGlmICh0aGF0Lmdsb2JhbCkgcmVzdWx0ICs9ICdnJztcbiAgaWYgKHRoYXQuaWdub3JlQ2FzZSkgcmVzdWx0ICs9ICdpJztcbiAgaWYgKHRoYXQubXVsdGlsaW5lKSByZXN1bHQgKz0gJ20nO1xuICBpZiAodGhhdC51bmljb2RlKSByZXN1bHQgKz0gJ3UnO1xuICBpZiAodGhhdC5zdGlja3kpIHJlc3VsdCArPSAneSc7XG4gIHJldHVybiByZXN1bHQ7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19zaGFyZWQnKSgnbmF0aXZlLWZ1bmN0aW9uLXRvLXN0cmluZycsIEZ1bmN0aW9uLnRvU3RyaW5nKTtcbiIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy84NiNpc3N1ZWNvbW1lbnQtMTE1NzU5MDI4XG52YXIgZ2xvYmFsID0gbW9kdWxlLmV4cG9ydHMgPSB0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnICYmIHdpbmRvdy5NYXRoID09IE1hdGhcbiAgPyB3aW5kb3cgOiB0eXBlb2Ygc2VsZiAhPSAndW5kZWZpbmVkJyAmJiBzZWxmLk1hdGggPT0gTWF0aCA/IHNlbGZcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5ldy1mdW5jXG4gIDogRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcbmlmICh0eXBlb2YgX19nID09ICdudW1iZXInKSBfX2cgPSBnbG9iYWw7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcbiIsInZhciBoYXNPd25Qcm9wZXJ0eSA9IHt9Lmhhc093blByb3BlcnR5O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIGtleSkge1xuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChpdCwga2V5KTtcbn07XG4iLCJ2YXIgZFAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKTtcbnZhciBjcmVhdGVEZXNjID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gZnVuY3Rpb24gKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICByZXR1cm4gZFAuZihvYmplY3QsIGtleSwgY3JlYXRlRGVzYygxLCB2YWx1ZSkpO1xufSA6IGZ1bmN0aW9uIChvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgcmV0dXJuIG9iamVjdDtcbn07XG4iLCJ2YXIgZG9jdW1lbnQgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5kb2N1bWVudDtcbm1vZHVsZS5leHBvcnRzID0gZG9jdW1lbnQgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuIiwibW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSAmJiAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkocmVxdWlyZSgnLi9fZG9tLWNyZWF0ZScpKCdkaXYnKSwgJ2EnLCB7IGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gNzsgfSB9KS5hICE9IDc7XG59KTtcbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xudmFyIHNldFByb3RvdHlwZU9mID0gcmVxdWlyZSgnLi9fc2V0LXByb3RvJykuc2V0O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodGhhdCwgdGFyZ2V0LCBDKSB7XG4gIHZhciBTID0gdGFyZ2V0LmNvbnN0cnVjdG9yO1xuICB2YXIgUDtcbiAgaWYgKFMgIT09IEMgJiYgdHlwZW9mIFMgPT0gJ2Z1bmN0aW9uJyAmJiAoUCA9IFMucHJvdG90eXBlKSAhPT0gQy5wcm90b3R5cGUgJiYgaXNPYmplY3QoUCkgJiYgc2V0UHJvdG90eXBlT2YpIHtcbiAgICBzZXRQcm90b3R5cGVPZih0aGF0LCBQKTtcbiAgfSByZXR1cm4gdGhhdDtcbn07XG4iLCIvLyBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIGFuZCBub24tZW51bWVyYWJsZSBvbGQgVjggc3RyaW5nc1xudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QoJ3onKS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgwKSA/IE9iamVjdCA6IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gY29mKGl0KSA9PSAnU3RyaW5nJyA/IGl0LnNwbGl0KCcnKSA6IE9iamVjdChpdCk7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PT0gJ29iamVjdCcgPyBpdCAhPT0gbnVsbCA6IHR5cGVvZiBpdCA9PT0gJ2Z1bmN0aW9uJztcbn07XG4iLCIvLyA3LjIuOCBJc1JlZ0V4cChhcmd1bWVudClcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xudmFyIE1BVENIID0gcmVxdWlyZSgnLi9fd2tzJykoJ21hdGNoJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgaXNSZWdFeHA7XG4gIHJldHVybiBpc09iamVjdChpdCkgJiYgKChpc1JlZ0V4cCA9IGl0W01BVENIXSkgIT09IHVuZGVmaW5lZCA/ICEhaXNSZWdFeHAgOiBjb2YoaXQpID09ICdSZWdFeHAnKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgY3JlYXRlID0gcmVxdWlyZSgnLi9fb2JqZWN0LWNyZWF0ZScpO1xudmFyIGRlc2NyaXB0b3IgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG52YXIgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpO1xudmFyIEl0ZXJhdG9yUHJvdG90eXBlID0ge307XG5cbi8vIDI1LjEuMi4xLjEgJUl0ZXJhdG9yUHJvdG90eXBlJVtAQGl0ZXJhdG9yXSgpXG5yZXF1aXJlKCcuL19oaWRlJykoSXRlcmF0b3JQcm90b3R5cGUsIHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpLCBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9KTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIE5BTUUsIG5leHQpIHtcbiAgQ29uc3RydWN0b3IucHJvdG90eXBlID0gY3JlYXRlKEl0ZXJhdG9yUHJvdG90eXBlLCB7IG5leHQ6IGRlc2NyaXB0b3IoMSwgbmV4dCkgfSk7XG4gIHNldFRvU3RyaW5nVGFnKENvbnN0cnVjdG9yLCBOQU1FICsgJyBJdGVyYXRvcicpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBMSUJSQVJZID0gcmVxdWlyZSgnLi9fbGlicmFyeScpO1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lJyk7XG52YXIgaGlkZSA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKTtcbnZhciAkaXRlckNyZWF0ZSA9IHJlcXVpcmUoJy4vX2l0ZXItY3JlYXRlJyk7XG52YXIgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpO1xudmFyIGdldFByb3RvdHlwZU9mID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdwbycpO1xudmFyIElURVJBVE9SID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJyk7XG52YXIgQlVHR1kgPSAhKFtdLmtleXMgJiYgJ25leHQnIGluIFtdLmtleXMoKSk7IC8vIFNhZmFyaSBoYXMgYnVnZ3kgaXRlcmF0b3JzIHcvbyBgbmV4dGBcbnZhciBGRl9JVEVSQVRPUiA9ICdAQGl0ZXJhdG9yJztcbnZhciBLRVlTID0gJ2tleXMnO1xudmFyIFZBTFVFUyA9ICd2YWx1ZXMnO1xuXG52YXIgcmV0dXJuVGhpcyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKEJhc2UsIE5BTUUsIENvbnN0cnVjdG9yLCBuZXh0LCBERUZBVUxULCBJU19TRVQsIEZPUkNFRCkge1xuICAkaXRlckNyZWF0ZShDb25zdHJ1Y3RvciwgTkFNRSwgbmV4dCk7XG4gIHZhciBnZXRNZXRob2QgPSBmdW5jdGlvbiAoa2luZCkge1xuICAgIGlmICghQlVHR1kgJiYga2luZCBpbiBwcm90bykgcmV0dXJuIHByb3RvW2tpbmRdO1xuICAgIHN3aXRjaCAoa2luZCkge1xuICAgICAgY2FzZSBLRVlTOiByZXR1cm4gZnVuY3Rpb24ga2V5cygpIHsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgICAgIGNhc2UgVkFMVUVTOiByZXR1cm4gZnVuY3Rpb24gdmFsdWVzKCkgeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICAgIH0gcmV0dXJuIGZ1bmN0aW9uIGVudHJpZXMoKSB7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gIH07XG4gIHZhciBUQUcgPSBOQU1FICsgJyBJdGVyYXRvcic7XG4gIHZhciBERUZfVkFMVUVTID0gREVGQVVMVCA9PSBWQUxVRVM7XG4gIHZhciBWQUxVRVNfQlVHID0gZmFsc2U7XG4gIHZhciBwcm90byA9IEJhc2UucHJvdG90eXBlO1xuICB2YXIgJG5hdGl2ZSA9IHByb3RvW0lURVJBVE9SXSB8fCBwcm90b1tGRl9JVEVSQVRPUl0gfHwgREVGQVVMVCAmJiBwcm90b1tERUZBVUxUXTtcbiAgdmFyICRkZWZhdWx0ID0gJG5hdGl2ZSB8fCBnZXRNZXRob2QoREVGQVVMVCk7XG4gIHZhciAkZW50cmllcyA9IERFRkFVTFQgPyAhREVGX1ZBTFVFUyA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKCdlbnRyaWVzJykgOiB1bmRlZmluZWQ7XG4gIHZhciAkYW55TmF0aXZlID0gTkFNRSA9PSAnQXJyYXknID8gcHJvdG8uZW50cmllcyB8fCAkbmF0aXZlIDogJG5hdGl2ZTtcbiAgdmFyIG1ldGhvZHMsIGtleSwgSXRlcmF0b3JQcm90b3R5cGU7XG4gIC8vIEZpeCBuYXRpdmVcbiAgaWYgKCRhbnlOYXRpdmUpIHtcbiAgICBJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvdHlwZU9mKCRhbnlOYXRpdmUuY2FsbChuZXcgQmFzZSgpKSk7XG4gICAgaWYgKEl0ZXJhdG9yUHJvdG90eXBlICE9PSBPYmplY3QucHJvdG90eXBlICYmIEl0ZXJhdG9yUHJvdG90eXBlLm5leHQpIHtcbiAgICAgIC8vIFNldCBAQHRvU3RyaW5nVGFnIHRvIG5hdGl2ZSBpdGVyYXRvcnNcbiAgICAgIHNldFRvU3RyaW5nVGFnKEl0ZXJhdG9yUHJvdG90eXBlLCBUQUcsIHRydWUpO1xuICAgICAgLy8gZml4IGZvciBzb21lIG9sZCBlbmdpbmVzXG4gICAgICBpZiAoIUxJQlJBUlkgJiYgdHlwZW9mIEl0ZXJhdG9yUHJvdG90eXBlW0lURVJBVE9SXSAhPSAnZnVuY3Rpb24nKSBoaWRlKEl0ZXJhdG9yUHJvdG90eXBlLCBJVEVSQVRPUiwgcmV0dXJuVGhpcyk7XG4gICAgfVxuICB9XG4gIC8vIGZpeCBBcnJheSN7dmFsdWVzLCBAQGl0ZXJhdG9yfS5uYW1lIGluIFY4IC8gRkZcbiAgaWYgKERFRl9WQUxVRVMgJiYgJG5hdGl2ZSAmJiAkbmF0aXZlLm5hbWUgIT09IFZBTFVFUykge1xuICAgIFZBTFVFU19CVUcgPSB0cnVlO1xuICAgICRkZWZhdWx0ID0gZnVuY3Rpb24gdmFsdWVzKCkgeyByZXR1cm4gJG5hdGl2ZS5jYWxsKHRoaXMpOyB9O1xuICB9XG4gIC8vIERlZmluZSBpdGVyYXRvclxuICBpZiAoKCFMSUJSQVJZIHx8IEZPUkNFRCkgJiYgKEJVR0dZIHx8IFZBTFVFU19CVUcgfHwgIXByb3RvW0lURVJBVE9SXSkpIHtcbiAgICBoaWRlKHByb3RvLCBJVEVSQVRPUiwgJGRlZmF1bHQpO1xuICB9XG4gIC8vIFBsdWcgZm9yIGxpYnJhcnlcbiAgSXRlcmF0b3JzW05BTUVdID0gJGRlZmF1bHQ7XG4gIEl0ZXJhdG9yc1tUQUddID0gcmV0dXJuVGhpcztcbiAgaWYgKERFRkFVTFQpIHtcbiAgICBtZXRob2RzID0ge1xuICAgICAgdmFsdWVzOiBERUZfVkFMVUVTID8gJGRlZmF1bHQgOiBnZXRNZXRob2QoVkFMVUVTKSxcbiAgICAgIGtleXM6IElTX1NFVCA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKEtFWVMpLFxuICAgICAgZW50cmllczogJGVudHJpZXNcbiAgICB9O1xuICAgIGlmIChGT1JDRUQpIGZvciAoa2V5IGluIG1ldGhvZHMpIHtcbiAgICAgIGlmICghKGtleSBpbiBwcm90bykpIHJlZGVmaW5lKHByb3RvLCBrZXksIG1ldGhvZHNba2V5XSk7XG4gICAgfSBlbHNlICRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogKEJVR0dZIHx8IFZBTFVFU19CVUcpLCBOQU1FLCBtZXRob2RzKTtcbiAgfVxuICByZXR1cm4gbWV0aG9kcztcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChkb25lLCB2YWx1ZSkge1xuICByZXR1cm4geyB2YWx1ZTogdmFsdWUsIGRvbmU6ICEhZG9uZSB9O1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge307XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZhbHNlO1xuIiwiLy8gMTkuMS4yLjIgLyAxNS4yLjMuNSBPYmplY3QuY3JlYXRlKE8gWywgUHJvcGVydGllc10pXG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBkUHMgPSByZXF1aXJlKCcuL19vYmplY3QtZHBzJyk7XG52YXIgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuL19lbnVtLWJ1Zy1rZXlzJyk7XG52YXIgSUVfUFJPVE8gPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJyk7XG52YXIgRW1wdHkgPSBmdW5jdGlvbiAoKSB7IC8qIGVtcHR5ICovIH07XG52YXIgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG5cbi8vIENyZWF0ZSBvYmplY3Qgd2l0aCBmYWtlIGBudWxsYCBwcm90b3R5cGU6IHVzZSBpZnJhbWUgT2JqZWN0IHdpdGggY2xlYXJlZCBwcm90b3R5cGVcbnZhciBjcmVhdGVEaWN0ID0gZnVuY3Rpb24gKCkge1xuICAvLyBUaHJhc2gsIHdhc3RlIGFuZCBzb2RvbXk6IElFIEdDIGJ1Z1xuICB2YXIgaWZyYW1lID0gcmVxdWlyZSgnLi9fZG9tLWNyZWF0ZScpKCdpZnJhbWUnKTtcbiAgdmFyIGkgPSBlbnVtQnVnS2V5cy5sZW5ndGg7XG4gIHZhciBsdCA9ICc8JztcbiAgdmFyIGd0ID0gJz4nO1xuICB2YXIgaWZyYW1lRG9jdW1lbnQ7XG4gIGlmcmFtZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICByZXF1aXJlKCcuL19odG1sJykuYXBwZW5kQ2hpbGQoaWZyYW1lKTtcbiAgaWZyYW1lLnNyYyA9ICdqYXZhc2NyaXB0Oic7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tc2NyaXB0LXVybFxuICAvLyBjcmVhdGVEaWN0ID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cuT2JqZWN0O1xuICAvLyBodG1sLnJlbW92ZUNoaWxkKGlmcmFtZSk7XG4gIGlmcmFtZURvY3VtZW50ID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQ7XG4gIGlmcmFtZURvY3VtZW50Lm9wZW4oKTtcbiAgaWZyYW1lRG9jdW1lbnQud3JpdGUobHQgKyAnc2NyaXB0JyArIGd0ICsgJ2RvY3VtZW50LkY9T2JqZWN0JyArIGx0ICsgJy9zY3JpcHQnICsgZ3QpO1xuICBpZnJhbWVEb2N1bWVudC5jbG9zZSgpO1xuICBjcmVhdGVEaWN0ID0gaWZyYW1lRG9jdW1lbnQuRjtcbiAgd2hpbGUgKGktLSkgZGVsZXRlIGNyZWF0ZURpY3RbUFJPVE9UWVBFXVtlbnVtQnVnS2V5c1tpXV07XG4gIHJldHVybiBjcmVhdGVEaWN0KCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5jcmVhdGUgfHwgZnVuY3Rpb24gY3JlYXRlKE8sIFByb3BlcnRpZXMpIHtcbiAgdmFyIHJlc3VsdDtcbiAgaWYgKE8gIT09IG51bGwpIHtcbiAgICBFbXB0eVtQUk9UT1RZUEVdID0gYW5PYmplY3QoTyk7XG4gICAgcmVzdWx0ID0gbmV3IEVtcHR5KCk7XG4gICAgRW1wdHlbUFJPVE9UWVBFXSA9IG51bGw7XG4gICAgLy8gYWRkIFwiX19wcm90b19fXCIgZm9yIE9iamVjdC5nZXRQcm90b3R5cGVPZiBwb2x5ZmlsbFxuICAgIHJlc3VsdFtJRV9QUk9UT10gPSBPO1xuICB9IGVsc2UgcmVzdWx0ID0gY3JlYXRlRGljdCgpO1xuICByZXR1cm4gUHJvcGVydGllcyA9PT0gdW5kZWZpbmVkID8gcmVzdWx0IDogZFBzKHJlc3VsdCwgUHJvcGVydGllcyk7XG59O1xuIiwidmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgSUU4X0RPTV9ERUZJTkUgPSByZXF1aXJlKCcuL19pZTgtZG9tLWRlZmluZScpO1xudmFyIHRvUHJpbWl0aXZlID0gcmVxdWlyZSgnLi9fdG8tcHJpbWl0aXZlJyk7XG52YXIgZFAgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG5cbmV4cG9ydHMuZiA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBPYmplY3QuZGVmaW5lUHJvcGVydHkgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKSB7XG4gIGFuT2JqZWN0KE8pO1xuICBQID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGFuT2JqZWN0KEF0dHJpYnV0ZXMpO1xuICBpZiAoSUU4X0RPTV9ERUZJTkUpIHRyeSB7XG4gICAgcmV0dXJuIGRQKE8sIFAsIEF0dHJpYnV0ZXMpO1xuICB9IGNhdGNoIChlKSB7IC8qIGVtcHR5ICovIH1cbiAgaWYgKCdnZXQnIGluIEF0dHJpYnV0ZXMgfHwgJ3NldCcgaW4gQXR0cmlidXRlcykgdGhyb3cgVHlwZUVycm9yKCdBY2Nlc3NvcnMgbm90IHN1cHBvcnRlZCEnKTtcbiAgaWYgKCd2YWx1ZScgaW4gQXR0cmlidXRlcykgT1tQXSA9IEF0dHJpYnV0ZXMudmFsdWU7XG4gIHJldHVybiBPO1xufTtcbiIsInZhciBkUCA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgZ2V0S2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzIDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyhPLCBQcm9wZXJ0aWVzKSB7XG4gIGFuT2JqZWN0KE8pO1xuICB2YXIga2V5cyA9IGdldEtleXMoUHJvcGVydGllcyk7XG4gIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgdmFyIGkgPSAwO1xuICB2YXIgUDtcbiAgd2hpbGUgKGxlbmd0aCA+IGkpIGRQLmYoTywgUCA9IGtleXNbaSsrXSwgUHJvcGVydGllc1tQXSk7XG4gIHJldHVybiBPO1xufTtcbiIsInZhciBwSUUgPSByZXF1aXJlKCcuL19vYmplY3QtcGllJyk7XG52YXIgY3JlYXRlRGVzYyA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG52YXIgdG9QcmltaXRpdmUgPSByZXF1aXJlKCcuL190by1wcmltaXRpdmUnKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciBJRThfRE9NX0RFRklORSA9IHJlcXVpcmUoJy4vX2llOC1kb20tZGVmaW5lJyk7XG52YXIgZ09QRCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG5cbmV4cG9ydHMuZiA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBnT1BEIDogZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApIHtcbiAgTyA9IHRvSU9iamVjdChPKTtcbiAgUCA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBpZiAoSUU4X0RPTV9ERUZJTkUpIHRyeSB7XG4gICAgcmV0dXJuIGdPUEQoTywgUCk7XG4gIH0gY2F0Y2ggKGUpIHsgLyogZW1wdHkgKi8gfVxuICBpZiAoaGFzKE8sIFApKSByZXR1cm4gY3JlYXRlRGVzYyghcElFLmYuY2FsbChPLCBQKSwgT1tQXSk7XG59O1xuIiwiLy8gMTkuMS4yLjcgLyAxNS4yLjMuNCBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhPKVxudmFyICRrZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMtaW50ZXJuYWwnKTtcbnZhciBoaWRkZW5LZXlzID0gcmVxdWlyZSgnLi9fZW51bS1idWcta2V5cycpLmNvbmNhdCgnbGVuZ3RoJywgJ3Byb3RvdHlwZScpO1xuXG5leHBvcnRzLmYgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyB8fCBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKE8pIHtcbiAgcmV0dXJuICRrZXlzKE8sIGhpZGRlbktleXMpO1xufTtcbiIsIi8vIDE5LjEuMi45IC8gMTUuMi4zLjIgT2JqZWN0LmdldFByb3RvdHlwZU9mKE8pXG52YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKTtcbnZhciBJRV9QUk9UTyA9IHJlcXVpcmUoJy4vX3NoYXJlZC1rZXknKSgnSUVfUFJPVE8nKTtcbnZhciBPYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmdldFByb3RvdHlwZU9mIHx8IGZ1bmN0aW9uIChPKSB7XG4gIE8gPSB0b09iamVjdChPKTtcbiAgaWYgKGhhcyhPLCBJRV9QUk9UTykpIHJldHVybiBPW0lFX1BST1RPXTtcbiAgaWYgKHR5cGVvZiBPLmNvbnN0cnVjdG9yID09ICdmdW5jdGlvbicgJiYgTyBpbnN0YW5jZW9mIE8uY29uc3RydWN0b3IpIHtcbiAgICByZXR1cm4gTy5jb25zdHJ1Y3Rvci5wcm90b3R5cGU7XG4gIH0gcmV0dXJuIE8gaW5zdGFuY2VvZiBPYmplY3QgPyBPYmplY3RQcm90byA6IG51bGw7XG59O1xuIiwidmFyIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpO1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcbnZhciBhcnJheUluZGV4T2YgPSByZXF1aXJlKCcuL19hcnJheS1pbmNsdWRlcycpKGZhbHNlKTtcbnZhciBJRV9QUk9UTyA9IHJlcXVpcmUoJy4vX3NoYXJlZC1rZXknKSgnSUVfUFJPVE8nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqZWN0LCBuYW1lcykge1xuICB2YXIgTyA9IHRvSU9iamVjdChvYmplY3QpO1xuICB2YXIgaSA9IDA7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgdmFyIGtleTtcbiAgZm9yIChrZXkgaW4gTykgaWYgKGtleSAhPSBJRV9QUk9UTykgaGFzKE8sIGtleSkgJiYgcmVzdWx0LnB1c2goa2V5KTtcbiAgLy8gRG9uJ3QgZW51bSBidWcgJiBoaWRkZW4ga2V5c1xuICB3aGlsZSAobmFtZXMubGVuZ3RoID4gaSkgaWYgKGhhcyhPLCBrZXkgPSBuYW1lc1tpKytdKSkge1xuICAgIH5hcnJheUluZGV4T2YocmVzdWx0LCBrZXkpIHx8IHJlc3VsdC5wdXNoKGtleSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG4iLCIvLyAxOS4xLjIuMTQgLyAxNS4yLjMuMTQgT2JqZWN0LmtleXMoTylcbnZhciAka2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzLWludGVybmFsJyk7XG52YXIgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuL19lbnVtLWJ1Zy1rZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24ga2V5cyhPKSB7XG4gIHJldHVybiAka2V5cyhPLCBlbnVtQnVnS2V5cyk7XG59O1xuIiwiZXhwb3J0cy5mID0ge30ucHJvcGVydHlJc0VudW1lcmFibGU7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChiaXRtYXAsIHZhbHVlKSB7XG4gIHJldHVybiB7XG4gICAgZW51bWVyYWJsZTogIShiaXRtYXAgJiAxKSxcbiAgICBjb25maWd1cmFibGU6ICEoYml0bWFwICYgMiksXG4gICAgd3JpdGFibGU6ICEoYml0bWFwICYgNCksXG4gICAgdmFsdWU6IHZhbHVlXG4gIH07XG59O1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIGhpZGUgPSByZXF1aXJlKCcuL19oaWRlJyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgU1JDID0gcmVxdWlyZSgnLi9fdWlkJykoJ3NyYycpO1xudmFyICR0b1N0cmluZyA9IHJlcXVpcmUoJy4vX2Z1bmN0aW9uLXRvLXN0cmluZycpO1xudmFyIFRPX1NUUklORyA9ICd0b1N0cmluZyc7XG52YXIgVFBMID0gKCcnICsgJHRvU3RyaW5nKS5zcGxpdChUT19TVFJJTkcpO1xuXG5yZXF1aXJlKCcuL19jb3JlJykuaW5zcGVjdFNvdXJjZSA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gJHRvU3RyaW5nLmNhbGwoaXQpO1xufTtcblxuKG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKE8sIGtleSwgdmFsLCBzYWZlKSB7XG4gIHZhciBpc0Z1bmN0aW9uID0gdHlwZW9mIHZhbCA9PSAnZnVuY3Rpb24nO1xuICBpZiAoaXNGdW5jdGlvbikgaGFzKHZhbCwgJ25hbWUnKSB8fCBoaWRlKHZhbCwgJ25hbWUnLCBrZXkpO1xuICBpZiAoT1trZXldID09PSB2YWwpIHJldHVybjtcbiAgaWYgKGlzRnVuY3Rpb24pIGhhcyh2YWwsIFNSQykgfHwgaGlkZSh2YWwsIFNSQywgT1trZXldID8gJycgKyBPW2tleV0gOiBUUEwuam9pbihTdHJpbmcoa2V5KSkpO1xuICBpZiAoTyA9PT0gZ2xvYmFsKSB7XG4gICAgT1trZXldID0gdmFsO1xuICB9IGVsc2UgaWYgKCFzYWZlKSB7XG4gICAgZGVsZXRlIE9ba2V5XTtcbiAgICBoaWRlKE8sIGtleSwgdmFsKTtcbiAgfSBlbHNlIGlmIChPW2tleV0pIHtcbiAgICBPW2tleV0gPSB2YWw7XG4gIH0gZWxzZSB7XG4gICAgaGlkZShPLCBrZXksIHZhbCk7XG4gIH1cbi8vIGFkZCBmYWtlIEZ1bmN0aW9uI3RvU3RyaW5nIGZvciBjb3JyZWN0IHdvcmsgd3JhcHBlZCBtZXRob2RzIC8gY29uc3RydWN0b3JzIHdpdGggbWV0aG9kcyBsaWtlIExvRGFzaCBpc05hdGl2ZVxufSkoRnVuY3Rpb24ucHJvdG90eXBlLCBUT19TVFJJTkcsIGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICByZXR1cm4gdHlwZW9mIHRoaXMgPT0gJ2Z1bmN0aW9uJyAmJiB0aGlzW1NSQ10gfHwgJHRvU3RyaW5nLmNhbGwodGhpcyk7XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuL19jbGFzc29mJyk7XG52YXIgYnVpbHRpbkV4ZWMgPSBSZWdFeHAucHJvdG90eXBlLmV4ZWM7XG5cbiAvLyBgUmVnRXhwRXhlY2AgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1yZWdleHBleGVjXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChSLCBTKSB7XG4gIHZhciBleGVjID0gUi5leGVjO1xuICBpZiAodHlwZW9mIGV4ZWMgPT09ICdmdW5jdGlvbicpIHtcbiAgICB2YXIgcmVzdWx0ID0gZXhlYy5jYWxsKFIsIFMpO1xuICAgIGlmICh0eXBlb2YgcmVzdWx0ICE9PSAnb2JqZWN0Jykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignUmVnRXhwIGV4ZWMgbWV0aG9kIHJldHVybmVkIHNvbWV0aGluZyBvdGhlciB0aGFuIGFuIE9iamVjdCBvciBudWxsJyk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgaWYgKGNsYXNzb2YoUikgIT09ICdSZWdFeHAnKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignUmVnRXhwI2V4ZWMgY2FsbGVkIG9uIGluY29tcGF0aWJsZSByZWNlaXZlcicpO1xuICB9XG4gIHJldHVybiBidWlsdGluRXhlYy5jYWxsKFIsIFMpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHJlZ2V4cEZsYWdzID0gcmVxdWlyZSgnLi9fZmxhZ3MnKTtcblxudmFyIG5hdGl2ZUV4ZWMgPSBSZWdFeHAucHJvdG90eXBlLmV4ZWM7XG4vLyBUaGlzIGFsd2F5cyByZWZlcnMgdG8gdGhlIG5hdGl2ZSBpbXBsZW1lbnRhdGlvbiwgYmVjYXVzZSB0aGVcbi8vIFN0cmluZyNyZXBsYWNlIHBvbHlmaWxsIHVzZXMgLi9maXgtcmVnZXhwLXdlbGwta25vd24tc3ltYm9sLWxvZ2ljLmpzLFxuLy8gd2hpY2ggbG9hZHMgdGhpcyBmaWxlIGJlZm9yZSBwYXRjaGluZyB0aGUgbWV0aG9kLlxudmFyIG5hdGl2ZVJlcGxhY2UgPSBTdHJpbmcucHJvdG90eXBlLnJlcGxhY2U7XG5cbnZhciBwYXRjaGVkRXhlYyA9IG5hdGl2ZUV4ZWM7XG5cbnZhciBMQVNUX0lOREVYID0gJ2xhc3RJbmRleCc7XG5cbnZhciBVUERBVEVTX0xBU1RfSU5ERVhfV1JPTkcgPSAoZnVuY3Rpb24gKCkge1xuICB2YXIgcmUxID0gL2EvLFxuICAgICAgcmUyID0gL2IqL2c7XG4gIG5hdGl2ZUV4ZWMuY2FsbChyZTEsICdhJyk7XG4gIG5hdGl2ZUV4ZWMuY2FsbChyZTIsICdhJyk7XG4gIHJldHVybiByZTFbTEFTVF9JTkRFWF0gIT09IDAgfHwgcmUyW0xBU1RfSU5ERVhdICE9PSAwO1xufSkoKTtcblxuLy8gbm9ucGFydGljaXBhdGluZyBjYXB0dXJpbmcgZ3JvdXAsIGNvcGllZCBmcm9tIGVzNS1zaGltJ3MgU3RyaW5nI3NwbGl0IHBhdGNoLlxudmFyIE5QQ0dfSU5DTFVERUQgPSAvKCk/Py8uZXhlYygnJylbMV0gIT09IHVuZGVmaW5lZDtcblxudmFyIFBBVENIID0gVVBEQVRFU19MQVNUX0lOREVYX1dST05HIHx8IE5QQ0dfSU5DTFVERUQ7XG5cbmlmIChQQVRDSCkge1xuICBwYXRjaGVkRXhlYyA9IGZ1bmN0aW9uIGV4ZWMoc3RyKSB7XG4gICAgdmFyIHJlID0gdGhpcztcbiAgICB2YXIgbGFzdEluZGV4LCByZUNvcHksIG1hdGNoLCBpO1xuXG4gICAgaWYgKE5QQ0dfSU5DTFVERUQpIHtcbiAgICAgIHJlQ29weSA9IG5ldyBSZWdFeHAoJ14nICsgcmUuc291cmNlICsgJyQoPyFcXFxccyknLCByZWdleHBGbGFncy5jYWxsKHJlKSk7XG4gICAgfVxuICAgIGlmIChVUERBVEVTX0xBU1RfSU5ERVhfV1JPTkcpIGxhc3RJbmRleCA9IHJlW0xBU1RfSU5ERVhdO1xuXG4gICAgbWF0Y2ggPSBuYXRpdmVFeGVjLmNhbGwocmUsIHN0cik7XG5cbiAgICBpZiAoVVBEQVRFU19MQVNUX0lOREVYX1dST05HICYmIG1hdGNoKSB7XG4gICAgICByZVtMQVNUX0lOREVYXSA9IHJlLmdsb2JhbCA/IG1hdGNoLmluZGV4ICsgbWF0Y2hbMF0ubGVuZ3RoIDogbGFzdEluZGV4O1xuICAgIH1cbiAgICBpZiAoTlBDR19JTkNMVURFRCAmJiBtYXRjaCAmJiBtYXRjaC5sZW5ndGggPiAxKSB7XG4gICAgICAvLyBGaXggYnJvd3NlcnMgd2hvc2UgYGV4ZWNgIG1ldGhvZHMgZG9uJ3QgY29uc2lzdGVudGx5IHJldHVybiBgdW5kZWZpbmVkYFxuICAgICAgLy8gZm9yIE5QQ0csIGxpa2UgSUU4LiBOT1RFOiBUaGlzIGRvZXNuJyB3b3JrIGZvciAvKC4/KT8vXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbG9vcC1mdW5jXG4gICAgICBuYXRpdmVSZXBsYWNlLmNhbGwobWF0Y2hbMF0sIHJlQ29weSwgZnVuY3Rpb24gKCkge1xuICAgICAgICBmb3IgKGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aCAtIDI7IGkrKykge1xuICAgICAgICAgIGlmIChhcmd1bWVudHNbaV0gPT09IHVuZGVmaW5lZCkgbWF0Y2hbaV0gPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBtYXRjaDtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBwYXRjaGVkRXhlYztcbiIsIi8vIFdvcmtzIHdpdGggX19wcm90b19fIG9ubHkuIE9sZCB2OCBjYW4ndCB3b3JrIHdpdGggbnVsbCBwcm90byBvYmplY3RzLlxuLyogZXNsaW50LWRpc2FibGUgbm8tcHJvdG8gKi9cbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgY2hlY2sgPSBmdW5jdGlvbiAoTywgcHJvdG8pIHtcbiAgYW5PYmplY3QoTyk7XG4gIGlmICghaXNPYmplY3QocHJvdG8pICYmIHByb3RvICE9PSBudWxsKSB0aHJvdyBUeXBlRXJyb3IocHJvdG8gKyBcIjogY2FuJ3Qgc2V0IGFzIHByb3RvdHlwZSFcIik7XG59O1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNldDogT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8ICgnX19wcm90b19fJyBpbiB7fSA/IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICBmdW5jdGlvbiAodGVzdCwgYnVnZ3ksIHNldCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgc2V0ID0gcmVxdWlyZSgnLi9fY3R4JykoRnVuY3Rpb24uY2FsbCwgcmVxdWlyZSgnLi9fb2JqZWN0LWdvcGQnKS5mKE9iamVjdC5wcm90b3R5cGUsICdfX3Byb3RvX18nKS5zZXQsIDIpO1xuICAgICAgICBzZXQodGVzdCwgW10pO1xuICAgICAgICBidWdneSA9ICEodGVzdCBpbnN0YW5jZW9mIEFycmF5KTtcbiAgICAgIH0gY2F0Y2ggKGUpIHsgYnVnZ3kgPSB0cnVlOyB9XG4gICAgICByZXR1cm4gZnVuY3Rpb24gc2V0UHJvdG90eXBlT2YoTywgcHJvdG8pIHtcbiAgICAgICAgY2hlY2soTywgcHJvdG8pO1xuICAgICAgICBpZiAoYnVnZ3kpIE8uX19wcm90b19fID0gcHJvdG87XG4gICAgICAgIGVsc2Ugc2V0KE8sIHByb3RvKTtcbiAgICAgICAgcmV0dXJuIE87XG4gICAgICB9O1xuICAgIH0oe30sIGZhbHNlKSA6IHVuZGVmaW5lZCksXG4gIGNoZWNrOiBjaGVja1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBkUCA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpO1xudmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKTtcbnZhciBTUEVDSUVTID0gcmVxdWlyZSgnLi9fd2tzJykoJ3NwZWNpZXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoS0VZKSB7XG4gIHZhciBDID0gZ2xvYmFsW0tFWV07XG4gIGlmIChERVNDUklQVE9SUyAmJiBDICYmICFDW1NQRUNJRVNdKSBkUC5mKEMsIFNQRUNJRVMsIHtcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9XG4gIH0pO1xufTtcbiIsInZhciBkZWYgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpO1xudmFyIFRBRyA9IHJlcXVpcmUoJy4vX3drcycpKCd0b1N0cmluZ1RhZycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCwgdGFnLCBzdGF0KSB7XG4gIGlmIChpdCAmJiAhaGFzKGl0ID0gc3RhdCA/IGl0IDogaXQucHJvdG90eXBlLCBUQUcpKSBkZWYoaXQsIFRBRywgeyBjb25maWd1cmFibGU6IHRydWUsIHZhbHVlOiB0YWcgfSk7XG59O1xuIiwidmFyIHNoYXJlZCA9IHJlcXVpcmUoJy4vX3NoYXJlZCcpKCdrZXlzJyk7XG52YXIgdWlkID0gcmVxdWlyZSgnLi9fdWlkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuIHNoYXJlZFtrZXldIHx8IChzaGFyZWRba2V5XSA9IHVpZChrZXkpKTtcbn07XG4iLCJ2YXIgY29yZSA9IHJlcXVpcmUoJy4vX2NvcmUnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBTSEFSRUQgPSAnX19jb3JlLWpzX3NoYXJlZF9fJztcbnZhciBzdG9yZSA9IGdsb2JhbFtTSEFSRURdIHx8IChnbG9iYWxbU0hBUkVEXSA9IHt9KTtcblxuKG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgcmV0dXJuIHN0b3JlW2tleV0gfHwgKHN0b3JlW2tleV0gPSB2YWx1ZSAhPT0gdW5kZWZpbmVkID8gdmFsdWUgOiB7fSk7XG59KSgndmVyc2lvbnMnLCBbXSkucHVzaCh7XG4gIHZlcnNpb246IGNvcmUudmVyc2lvbixcbiAgbW9kZTogcmVxdWlyZSgnLi9fbGlicmFyeScpID8gJ3B1cmUnIDogJ2dsb2JhbCcsXG4gIGNvcHlyaWdodDogJ8KpIDIwMTkgRGVuaXMgUHVzaGthcmV2ICh6bG9pcm9jay5ydSknXG59KTtcbiIsInZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJyk7XG52YXIgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbi8vIHRydWUgIC0+IFN0cmluZyNhdFxuLy8gZmFsc2UgLT4gU3RyaW5nI2NvZGVQb2ludEF0XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChUT19TVFJJTkcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICh0aGF0LCBwb3MpIHtcbiAgICB2YXIgcyA9IFN0cmluZyhkZWZpbmVkKHRoYXQpKTtcbiAgICB2YXIgaSA9IHRvSW50ZWdlcihwb3MpO1xuICAgIHZhciBsID0gcy5sZW5ndGg7XG4gICAgdmFyIGEsIGI7XG4gICAgaWYgKGkgPCAwIHx8IGkgPj0gbCkgcmV0dXJuIFRPX1NUUklORyA/ICcnIDogdW5kZWZpbmVkO1xuICAgIGEgPSBzLmNoYXJDb2RlQXQoaSk7XG4gICAgcmV0dXJuIGEgPCAweGQ4MDAgfHwgYSA+IDB4ZGJmZiB8fCBpICsgMSA9PT0gbCB8fCAoYiA9IHMuY2hhckNvZGVBdChpICsgMSkpIDwgMHhkYzAwIHx8IGIgPiAweGRmZmZcbiAgICAgID8gVE9fU1RSSU5HID8gcy5jaGFyQXQoaSkgOiBhXG4gICAgICA6IFRPX1NUUklORyA/IHMuc2xpY2UoaSwgaSArIDIpIDogKGEgLSAweGQ4MDAgPDwgMTApICsgKGIgLSAweGRjMDApICsgMHgxMDAwMDtcbiAgfTtcbn07XG4iLCJ2YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpO1xudmFyIG1heCA9IE1hdGgubWF4O1xudmFyIG1pbiA9IE1hdGgubWluO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaW5kZXgsIGxlbmd0aCkge1xuICBpbmRleCA9IHRvSW50ZWdlcihpbmRleCk7XG4gIHJldHVybiBpbmRleCA8IDAgPyBtYXgoaW5kZXggKyBsZW5ndGgsIDApIDogbWluKGluZGV4LCBsZW5ndGgpO1xufTtcbiIsIi8vIDcuMS40IFRvSW50ZWdlclxudmFyIGNlaWwgPSBNYXRoLmNlaWw7XG52YXIgZmxvb3IgPSBNYXRoLmZsb29yO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGlzTmFOKGl0ID0gK2l0KSA/IDAgOiAoaXQgPiAwID8gZmxvb3IgOiBjZWlsKShpdCk7XG59O1xuIiwiLy8gdG8gaW5kZXhlZCBvYmplY3QsIHRvT2JqZWN0IHdpdGggZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBzdHJpbmdzXG52YXIgSU9iamVjdCA9IHJlcXVpcmUoJy4vX2lvYmplY3QnKTtcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIElPYmplY3QoZGVmaW5lZChpdCkpO1xufTtcbiIsIi8vIDcuMS4xNSBUb0xlbmd0aFxudmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKTtcbnZhciBtaW4gPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpdCA+IDAgPyBtaW4odG9JbnRlZ2VyKGl0KSwgMHgxZmZmZmZmZmZmZmZmZikgOiAwOyAvLyBwb3coMiwgNTMpIC0gMSA9PSA5MDA3MTk5MjU0NzQwOTkxXG59O1xuIiwiLy8gNy4xLjEzIFRvT2JqZWN0KGFyZ3VtZW50KVxudmFyIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gT2JqZWN0KGRlZmluZWQoaXQpKTtcbn07XG4iLCIvLyA3LjEuMSBUb1ByaW1pdGl2ZShpbnB1dCBbLCBQcmVmZXJyZWRUeXBlXSlcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xuLy8gaW5zdGVhZCBvZiB0aGUgRVM2IHNwZWMgdmVyc2lvbiwgd2UgZGlkbid0IGltcGxlbWVudCBAQHRvUHJpbWl0aXZlIGNhc2Vcbi8vIGFuZCB0aGUgc2Vjb25kIGFyZ3VtZW50IC0gZmxhZyAtIHByZWZlcnJlZCB0eXBlIGlzIGEgc3RyaW5nXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCwgUykge1xuICBpZiAoIWlzT2JqZWN0KGl0KSkgcmV0dXJuIGl0O1xuICB2YXIgZm4sIHZhbDtcbiAgaWYgKFMgJiYgdHlwZW9mIChmbiA9IGl0LnRvU3RyaW5nKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpIHJldHVybiB2YWw7XG4gIGlmICh0eXBlb2YgKGZuID0gaXQudmFsdWVPZikgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKSByZXR1cm4gdmFsO1xuICBpZiAoIVMgJiYgdHlwZW9mIChmbiA9IGl0LnRvU3RyaW5nKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpIHJldHVybiB2YWw7XG4gIHRocm93IFR5cGVFcnJvcihcIkNhbid0IGNvbnZlcnQgb2JqZWN0IHRvIHByaW1pdGl2ZSB2YWx1ZVwiKTtcbn07XG4iLCJ2YXIgaWQgPSAwO1xudmFyIHB4ID0gTWF0aC5yYW5kb20oKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gJ1N5bWJvbCgnLmNvbmNhdChrZXkgPT09IHVuZGVmaW5lZCA/ICcnIDoga2V5LCAnKV8nLCAoKytpZCArIHB4KS50b1N0cmluZygzNikpO1xufTtcbiIsInZhciBzdG9yZSA9IHJlcXVpcmUoJy4vX3NoYXJlZCcpKCd3a3MnKTtcbnZhciB1aWQgPSByZXF1aXJlKCcuL191aWQnKTtcbnZhciBTeW1ib2wgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5TeW1ib2w7XG52YXIgVVNFX1NZTUJPTCA9IHR5cGVvZiBTeW1ib2wgPT0gJ2Z1bmN0aW9uJztcblxudmFyICRleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmFtZSkge1xuICByZXR1cm4gc3RvcmVbbmFtZV0gfHwgKHN0b3JlW25hbWVdID1cbiAgICBVU0VfU1lNQk9MICYmIFN5bWJvbFtuYW1lXSB8fCAoVVNFX1NZTUJPTCA/IFN5bWJvbCA6IHVpZCkoJ1N5bWJvbC4nICsgbmFtZSkpO1xufTtcblxuJGV4cG9ydHMuc3RvcmUgPSBzdG9yZTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBhZGRUb1Vuc2NvcGFibGVzID0gcmVxdWlyZSgnLi9fYWRkLXRvLXVuc2NvcGFibGVzJyk7XG52YXIgc3RlcCA9IHJlcXVpcmUoJy4vX2l0ZXItc3RlcCcpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpO1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcblxuLy8gMjIuMS4zLjQgQXJyYXkucHJvdG90eXBlLmVudHJpZXMoKVxuLy8gMjIuMS4zLjEzIEFycmF5LnByb3RvdHlwZS5rZXlzKClcbi8vIDIyLjEuMy4yOSBBcnJheS5wcm90b3R5cGUudmFsdWVzKClcbi8vIDIyLjEuMy4zMCBBcnJheS5wcm90b3R5cGVbQEBpdGVyYXRvcl0oKVxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19pdGVyLWRlZmluZScpKEFycmF5LCAnQXJyYXknLCBmdW5jdGlvbiAoaXRlcmF0ZWQsIGtpbmQpIHtcbiAgdGhpcy5fdCA9IHRvSU9iamVjdChpdGVyYXRlZCk7IC8vIHRhcmdldFxuICB0aGlzLl9pID0gMDsgICAgICAgICAgICAgICAgICAgLy8gbmV4dCBpbmRleFxuICB0aGlzLl9rID0ga2luZDsgICAgICAgICAgICAgICAgLy8ga2luZFxuLy8gMjIuMS41LjIuMSAlQXJyYXlJdGVyYXRvclByb3RvdHlwZSUubmV4dCgpXG59LCBmdW5jdGlvbiAoKSB7XG4gIHZhciBPID0gdGhpcy5fdDtcbiAgdmFyIGtpbmQgPSB0aGlzLl9rO1xuICB2YXIgaW5kZXggPSB0aGlzLl9pKys7XG4gIGlmICghTyB8fCBpbmRleCA+PSBPLmxlbmd0aCkge1xuICAgIHRoaXMuX3QgPSB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIHN0ZXAoMSk7XG4gIH1cbiAgaWYgKGtpbmQgPT0gJ2tleXMnKSByZXR1cm4gc3RlcCgwLCBpbmRleCk7XG4gIGlmIChraW5kID09ICd2YWx1ZXMnKSByZXR1cm4gc3RlcCgwLCBPW2luZGV4XSk7XG4gIHJldHVybiBzdGVwKDAsIFtpbmRleCwgT1tpbmRleF1dKTtcbn0sICd2YWx1ZXMnKTtcblxuLy8gYXJndW1lbnRzTGlzdFtAQGl0ZXJhdG9yXSBpcyAlQXJyYXlQcm90b192YWx1ZXMlICg5LjQuNC42LCA5LjQuNC43KVxuSXRlcmF0b3JzLkFyZ3VtZW50cyA9IEl0ZXJhdG9ycy5BcnJheTtcblxuYWRkVG9VbnNjb3BhYmxlcygna2V5cycpO1xuYWRkVG9VbnNjb3BhYmxlcygndmFsdWVzJyk7XG5hZGRUb1Vuc2NvcGFibGVzKCdlbnRyaWVzJyk7XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgaW5oZXJpdElmUmVxdWlyZWQgPSByZXF1aXJlKCcuL19pbmhlcml0LWlmLXJlcXVpcmVkJyk7XG52YXIgZFAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mO1xudmFyIGdPUE4gPSByZXF1aXJlKCcuL19vYmplY3QtZ29wbicpLmY7XG52YXIgaXNSZWdFeHAgPSByZXF1aXJlKCcuL19pcy1yZWdleHAnKTtcbnZhciAkZmxhZ3MgPSByZXF1aXJlKCcuL19mbGFncycpO1xudmFyICRSZWdFeHAgPSBnbG9iYWwuUmVnRXhwO1xudmFyIEJhc2UgPSAkUmVnRXhwO1xudmFyIHByb3RvID0gJFJlZ0V4cC5wcm90b3R5cGU7XG52YXIgcmUxID0gL2EvZztcbnZhciByZTIgPSAvYS9nO1xuLy8gXCJuZXdcIiBjcmVhdGVzIGEgbmV3IG9iamVjdCwgb2xkIHdlYmtpdCBidWdneSBoZXJlXG52YXIgQ09SUkVDVF9ORVcgPSBuZXcgJFJlZ0V4cChyZTEpICE9PSByZTE7XG5cbmlmIChyZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpICYmICghQ09SUkVDVF9ORVcgfHwgcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbiAoKSB7XG4gIHJlMltyZXF1aXJlKCcuL193a3MnKSgnbWF0Y2gnKV0gPSBmYWxzZTtcbiAgLy8gUmVnRXhwIGNvbnN0cnVjdG9yIGNhbiBhbHRlciBmbGFncyBhbmQgSXNSZWdFeHAgd29ya3MgY29ycmVjdCB3aXRoIEBAbWF0Y2hcbiAgcmV0dXJuICRSZWdFeHAocmUxKSAhPSByZTEgfHwgJFJlZ0V4cChyZTIpID09IHJlMiB8fCAkUmVnRXhwKHJlMSwgJ2knKSAhPSAnL2EvaSc7XG59KSkpIHtcbiAgJFJlZ0V4cCA9IGZ1bmN0aW9uIFJlZ0V4cChwLCBmKSB7XG4gICAgdmFyIHRpUkUgPSB0aGlzIGluc3RhbmNlb2YgJFJlZ0V4cDtcbiAgICB2YXIgcGlSRSA9IGlzUmVnRXhwKHApO1xuICAgIHZhciBmaVUgPSBmID09PSB1bmRlZmluZWQ7XG4gICAgcmV0dXJuICF0aVJFICYmIHBpUkUgJiYgcC5jb25zdHJ1Y3RvciA9PT0gJFJlZ0V4cCAmJiBmaVUgPyBwXG4gICAgICA6IGluaGVyaXRJZlJlcXVpcmVkKENPUlJFQ1RfTkVXXG4gICAgICAgID8gbmV3IEJhc2UocGlSRSAmJiAhZmlVID8gcC5zb3VyY2UgOiBwLCBmKVxuICAgICAgICA6IEJhc2UoKHBpUkUgPSBwIGluc3RhbmNlb2YgJFJlZ0V4cCkgPyBwLnNvdXJjZSA6IHAsIHBpUkUgJiYgZmlVID8gJGZsYWdzLmNhbGwocCkgOiBmKVxuICAgICAgLCB0aVJFID8gdGhpcyA6IHByb3RvLCAkUmVnRXhwKTtcbiAgfTtcbiAgdmFyIHByb3h5ID0gZnVuY3Rpb24gKGtleSkge1xuICAgIGtleSBpbiAkUmVnRXhwIHx8IGRQKCRSZWdFeHAsIGtleSwge1xuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBCYXNlW2tleV07IH0sXG4gICAgICBzZXQ6IGZ1bmN0aW9uIChpdCkgeyBCYXNlW2tleV0gPSBpdDsgfVxuICAgIH0pO1xuICB9O1xuICBmb3IgKHZhciBrZXlzID0gZ09QTihCYXNlKSwgaSA9IDA7IGtleXMubGVuZ3RoID4gaTspIHByb3h5KGtleXNbaSsrXSk7XG4gIHByb3RvLmNvbnN0cnVjdG9yID0gJFJlZ0V4cDtcbiAgJFJlZ0V4cC5wcm90b3R5cGUgPSBwcm90bztcbiAgcmVxdWlyZSgnLi9fcmVkZWZpbmUnKShnbG9iYWwsICdSZWdFeHAnLCAkUmVnRXhwKTtcbn1cblxucmVxdWlyZSgnLi9fc2V0LXNwZWNpZXMnKSgnUmVnRXhwJyk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgcmVnZXhwRXhlYyA9IHJlcXVpcmUoJy4vX3JlZ2V4cC1leGVjJyk7XG5yZXF1aXJlKCcuL19leHBvcnQnKSh7XG4gIHRhcmdldDogJ1JlZ0V4cCcsXG4gIHByb3RvOiB0cnVlLFxuICBmb3JjZWQ6IHJlZ2V4cEV4ZWMgIT09IC8uLy5leGVjXG59LCB7XG4gIGV4ZWM6IHJlZ2V4cEV4ZWNcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpO1xudmFyIGFkdmFuY2VTdHJpbmdJbmRleCA9IHJlcXVpcmUoJy4vX2FkdmFuY2Utc3RyaW5nLWluZGV4Jyk7XG52YXIgcmVnRXhwRXhlYyA9IHJlcXVpcmUoJy4vX3JlZ2V4cC1leGVjLWFic3RyYWN0Jyk7XG5cbi8vIEBAbWF0Y2ggbG9naWNcbnJlcXVpcmUoJy4vX2ZpeC1yZS13a3MnKSgnbWF0Y2gnLCAxLCBmdW5jdGlvbiAoZGVmaW5lZCwgTUFUQ0gsICRtYXRjaCwgbWF5YmVDYWxsTmF0aXZlKSB7XG4gIHJldHVybiBbXG4gICAgLy8gYFN0cmluZy5wcm90b3R5cGUubWF0Y2hgIG1ldGhvZFxuICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXN0cmluZy5wcm90b3R5cGUubWF0Y2hcbiAgICBmdW5jdGlvbiBtYXRjaChyZWdleHApIHtcbiAgICAgIHZhciBPID0gZGVmaW5lZCh0aGlzKTtcbiAgICAgIHZhciBmbiA9IHJlZ2V4cCA9PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiByZWdleHBbTUFUQ0hdO1xuICAgICAgcmV0dXJuIGZuICE9PSB1bmRlZmluZWQgPyBmbi5jYWxsKHJlZ2V4cCwgTykgOiBuZXcgUmVnRXhwKHJlZ2V4cClbTUFUQ0hdKFN0cmluZyhPKSk7XG4gICAgfSxcbiAgICAvLyBgUmVnRXhwLnByb3RvdHlwZVtAQG1hdGNoXWAgbWV0aG9kXG4gICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtcmVnZXhwLnByb3RvdHlwZS1AQG1hdGNoXG4gICAgZnVuY3Rpb24gKHJlZ2V4cCkge1xuICAgICAgdmFyIHJlcyA9IG1heWJlQ2FsbE5hdGl2ZSgkbWF0Y2gsIHJlZ2V4cCwgdGhpcyk7XG4gICAgICBpZiAocmVzLmRvbmUpIHJldHVybiByZXMudmFsdWU7XG4gICAgICB2YXIgcnggPSBhbk9iamVjdChyZWdleHApO1xuICAgICAgdmFyIFMgPSBTdHJpbmcodGhpcyk7XG4gICAgICBpZiAoIXJ4Lmdsb2JhbCkgcmV0dXJuIHJlZ0V4cEV4ZWMocngsIFMpO1xuICAgICAgdmFyIGZ1bGxVbmljb2RlID0gcngudW5pY29kZTtcbiAgICAgIHJ4Lmxhc3RJbmRleCA9IDA7XG4gICAgICB2YXIgQSA9IFtdO1xuICAgICAgdmFyIG4gPSAwO1xuICAgICAgdmFyIHJlc3VsdDtcbiAgICAgIHdoaWxlICgocmVzdWx0ID0gcmVnRXhwRXhlYyhyeCwgUykpICE9PSBudWxsKSB7XG4gICAgICAgIHZhciBtYXRjaFN0ciA9IFN0cmluZyhyZXN1bHRbMF0pO1xuICAgICAgICBBW25dID0gbWF0Y2hTdHI7XG4gICAgICAgIGlmIChtYXRjaFN0ciA9PT0gJycpIHJ4Lmxhc3RJbmRleCA9IGFkdmFuY2VTdHJpbmdJbmRleChTLCB0b0xlbmd0aChyeC5sYXN0SW5kZXgpLCBmdWxsVW5pY29kZSk7XG4gICAgICAgIG4rKztcbiAgICAgIH1cbiAgICAgIHJldHVybiBuID09PSAwID8gbnVsbCA6IEE7XG4gICAgfVxuICBdO1xufSk7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0Jyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuL190by1sZW5ndGgnKTtcbnZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJyk7XG52YXIgYWR2YW5jZVN0cmluZ0luZGV4ID0gcmVxdWlyZSgnLi9fYWR2YW5jZS1zdHJpbmctaW5kZXgnKTtcbnZhciByZWdFeHBFeGVjID0gcmVxdWlyZSgnLi9fcmVnZXhwLWV4ZWMtYWJzdHJhY3QnKTtcbnZhciBtYXggPSBNYXRoLm1heDtcbnZhciBtaW4gPSBNYXRoLm1pbjtcbnZhciBmbG9vciA9IE1hdGguZmxvb3I7XG52YXIgU1VCU1RJVFVUSU9OX1NZTUJPTFMgPSAvXFwkKFskJmAnXXxcXGRcXGQ/fDxbXj5dKj4pL2c7XG52YXIgU1VCU1RJVFVUSU9OX1NZTUJPTFNfTk9fTkFNRUQgPSAvXFwkKFskJmAnXXxcXGRcXGQ/KS9nO1xuXG52YXIgbWF5YmVUb1N0cmluZyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXQgPT09IHVuZGVmaW5lZCA/IGl0IDogU3RyaW5nKGl0KTtcbn07XG5cbi8vIEBAcmVwbGFjZSBsb2dpY1xucmVxdWlyZSgnLi9fZml4LXJlLXdrcycpKCdyZXBsYWNlJywgMiwgZnVuY3Rpb24gKGRlZmluZWQsIFJFUExBQ0UsICRyZXBsYWNlLCBtYXliZUNhbGxOYXRpdmUpIHtcbiAgcmV0dXJuIFtcbiAgICAvLyBgU3RyaW5nLnByb3RvdHlwZS5yZXBsYWNlYCBtZXRob2RcbiAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1zdHJpbmcucHJvdG90eXBlLnJlcGxhY2VcbiAgICBmdW5jdGlvbiByZXBsYWNlKHNlYXJjaFZhbHVlLCByZXBsYWNlVmFsdWUpIHtcbiAgICAgIHZhciBPID0gZGVmaW5lZCh0aGlzKTtcbiAgICAgIHZhciBmbiA9IHNlYXJjaFZhbHVlID09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IHNlYXJjaFZhbHVlW1JFUExBQ0VdO1xuICAgICAgcmV0dXJuIGZuICE9PSB1bmRlZmluZWRcbiAgICAgICAgPyBmbi5jYWxsKHNlYXJjaFZhbHVlLCBPLCByZXBsYWNlVmFsdWUpXG4gICAgICAgIDogJHJlcGxhY2UuY2FsbChTdHJpbmcoTyksIHNlYXJjaFZhbHVlLCByZXBsYWNlVmFsdWUpO1xuICAgIH0sXG4gICAgLy8gYFJlZ0V4cC5wcm90b3R5cGVbQEByZXBsYWNlXWAgbWV0aG9kXG4gICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtcmVnZXhwLnByb3RvdHlwZS1AQHJlcGxhY2VcbiAgICBmdW5jdGlvbiAocmVnZXhwLCByZXBsYWNlVmFsdWUpIHtcbiAgICAgIHZhciByZXMgPSBtYXliZUNhbGxOYXRpdmUoJHJlcGxhY2UsIHJlZ2V4cCwgdGhpcywgcmVwbGFjZVZhbHVlKTtcbiAgICAgIGlmIChyZXMuZG9uZSkgcmV0dXJuIHJlcy52YWx1ZTtcblxuICAgICAgdmFyIHJ4ID0gYW5PYmplY3QocmVnZXhwKTtcbiAgICAgIHZhciBTID0gU3RyaW5nKHRoaXMpO1xuICAgICAgdmFyIGZ1bmN0aW9uYWxSZXBsYWNlID0gdHlwZW9mIHJlcGxhY2VWYWx1ZSA9PT0gJ2Z1bmN0aW9uJztcbiAgICAgIGlmICghZnVuY3Rpb25hbFJlcGxhY2UpIHJlcGxhY2VWYWx1ZSA9IFN0cmluZyhyZXBsYWNlVmFsdWUpO1xuICAgICAgdmFyIGdsb2JhbCA9IHJ4Lmdsb2JhbDtcbiAgICAgIGlmIChnbG9iYWwpIHtcbiAgICAgICAgdmFyIGZ1bGxVbmljb2RlID0gcngudW5pY29kZTtcbiAgICAgICAgcngubGFzdEluZGV4ID0gMDtcbiAgICAgIH1cbiAgICAgIHZhciByZXN1bHRzID0gW107XG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gcmVnRXhwRXhlYyhyeCwgUyk7XG4gICAgICAgIGlmIChyZXN1bHQgPT09IG51bGwpIGJyZWFrO1xuICAgICAgICByZXN1bHRzLnB1c2gocmVzdWx0KTtcbiAgICAgICAgaWYgKCFnbG9iYWwpIGJyZWFrO1xuICAgICAgICB2YXIgbWF0Y2hTdHIgPSBTdHJpbmcocmVzdWx0WzBdKTtcbiAgICAgICAgaWYgKG1hdGNoU3RyID09PSAnJykgcngubGFzdEluZGV4ID0gYWR2YW5jZVN0cmluZ0luZGV4KFMsIHRvTGVuZ3RoKHJ4Lmxhc3RJbmRleCksIGZ1bGxVbmljb2RlKTtcbiAgICAgIH1cbiAgICAgIHZhciBhY2N1bXVsYXRlZFJlc3VsdCA9ICcnO1xuICAgICAgdmFyIG5leHRTb3VyY2VQb3NpdGlvbiA9IDA7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlc3VsdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcmVzdWx0ID0gcmVzdWx0c1tpXTtcbiAgICAgICAgdmFyIG1hdGNoZWQgPSBTdHJpbmcocmVzdWx0WzBdKTtcbiAgICAgICAgdmFyIHBvc2l0aW9uID0gbWF4KG1pbih0b0ludGVnZXIocmVzdWx0LmluZGV4KSwgUy5sZW5ndGgpLCAwKTtcbiAgICAgICAgdmFyIGNhcHR1cmVzID0gW107XG4gICAgICAgIC8vIE5PVEU6IFRoaXMgaXMgZXF1aXZhbGVudCB0b1xuICAgICAgICAvLyAgIGNhcHR1cmVzID0gcmVzdWx0LnNsaWNlKDEpLm1hcChtYXliZVRvU3RyaW5nKVxuICAgICAgICAvLyBidXQgZm9yIHNvbWUgcmVhc29uIGBuYXRpdmVTbGljZS5jYWxsKHJlc3VsdCwgMSwgcmVzdWx0Lmxlbmd0aClgIChjYWxsZWQgaW5cbiAgICAgICAgLy8gdGhlIHNsaWNlIHBvbHlmaWxsIHdoZW4gc2xpY2luZyBuYXRpdmUgYXJyYXlzKSBcImRvZXNuJ3Qgd29ya1wiIGluIHNhZmFyaSA5IGFuZFxuICAgICAgICAvLyBjYXVzZXMgYSBjcmFzaCAoaHR0cHM6Ly9wYXN0ZWJpbi5jb20vTjIxUXplUUEpIHdoZW4gdHJ5aW5nIHRvIGRlYnVnIGl0LlxuICAgICAgICBmb3IgKHZhciBqID0gMTsgaiA8IHJlc3VsdC5sZW5ndGg7IGorKykgY2FwdHVyZXMucHVzaChtYXliZVRvU3RyaW5nKHJlc3VsdFtqXSkpO1xuICAgICAgICB2YXIgbmFtZWRDYXB0dXJlcyA9IHJlc3VsdC5ncm91cHM7XG4gICAgICAgIGlmIChmdW5jdGlvbmFsUmVwbGFjZSkge1xuICAgICAgICAgIHZhciByZXBsYWNlckFyZ3MgPSBbbWF0Y2hlZF0uY29uY2F0KGNhcHR1cmVzLCBwb3NpdGlvbiwgUyk7XG4gICAgICAgICAgaWYgKG5hbWVkQ2FwdHVyZXMgIT09IHVuZGVmaW5lZCkgcmVwbGFjZXJBcmdzLnB1c2gobmFtZWRDYXB0dXJlcyk7XG4gICAgICAgICAgdmFyIHJlcGxhY2VtZW50ID0gU3RyaW5nKHJlcGxhY2VWYWx1ZS5hcHBseSh1bmRlZmluZWQsIHJlcGxhY2VyQXJncykpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlcGxhY2VtZW50ID0gZ2V0U3Vic3RpdHV0aW9uKG1hdGNoZWQsIFMsIHBvc2l0aW9uLCBjYXB0dXJlcywgbmFtZWRDYXB0dXJlcywgcmVwbGFjZVZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocG9zaXRpb24gPj0gbmV4dFNvdXJjZVBvc2l0aW9uKSB7XG4gICAgICAgICAgYWNjdW11bGF0ZWRSZXN1bHQgKz0gUy5zbGljZShuZXh0U291cmNlUG9zaXRpb24sIHBvc2l0aW9uKSArIHJlcGxhY2VtZW50O1xuICAgICAgICAgIG5leHRTb3VyY2VQb3NpdGlvbiA9IHBvc2l0aW9uICsgbWF0Y2hlZC5sZW5ndGg7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBhY2N1bXVsYXRlZFJlc3VsdCArIFMuc2xpY2UobmV4dFNvdXJjZVBvc2l0aW9uKTtcbiAgICB9XG4gIF07XG5cbiAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1nZXRzdWJzdGl0dXRpb25cbiAgZnVuY3Rpb24gZ2V0U3Vic3RpdHV0aW9uKG1hdGNoZWQsIHN0ciwgcG9zaXRpb24sIGNhcHR1cmVzLCBuYW1lZENhcHR1cmVzLCByZXBsYWNlbWVudCkge1xuICAgIHZhciB0YWlsUG9zID0gcG9zaXRpb24gKyBtYXRjaGVkLmxlbmd0aDtcbiAgICB2YXIgbSA9IGNhcHR1cmVzLmxlbmd0aDtcbiAgICB2YXIgc3ltYm9scyA9IFNVQlNUSVRVVElPTl9TWU1CT0xTX05PX05BTUVEO1xuICAgIGlmIChuYW1lZENhcHR1cmVzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIG5hbWVkQ2FwdHVyZXMgPSB0b09iamVjdChuYW1lZENhcHR1cmVzKTtcbiAgICAgIHN5bWJvbHMgPSBTVUJTVElUVVRJT05fU1lNQk9MUztcbiAgICB9XG4gICAgcmV0dXJuICRyZXBsYWNlLmNhbGwocmVwbGFjZW1lbnQsIHN5bWJvbHMsIGZ1bmN0aW9uIChtYXRjaCwgY2gpIHtcbiAgICAgIHZhciBjYXB0dXJlO1xuICAgICAgc3dpdGNoIChjaC5jaGFyQXQoMCkpIHtcbiAgICAgICAgY2FzZSAnJCc6IHJldHVybiAnJCc7XG4gICAgICAgIGNhc2UgJyYnOiByZXR1cm4gbWF0Y2hlZDtcbiAgICAgICAgY2FzZSAnYCc6IHJldHVybiBzdHIuc2xpY2UoMCwgcG9zaXRpb24pO1xuICAgICAgICBjYXNlIFwiJ1wiOiByZXR1cm4gc3RyLnNsaWNlKHRhaWxQb3MpO1xuICAgICAgICBjYXNlICc8JzpcbiAgICAgICAgICBjYXB0dXJlID0gbmFtZWRDYXB0dXJlc1tjaC5zbGljZSgxLCAtMSldO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OiAvLyBcXGRcXGQ/XG4gICAgICAgICAgdmFyIG4gPSArY2g7XG4gICAgICAgICAgaWYgKG4gPT09IDApIHJldHVybiBtYXRjaDtcbiAgICAgICAgICBpZiAobiA+IG0pIHtcbiAgICAgICAgICAgIHZhciBmID0gZmxvb3IobiAvIDEwKTtcbiAgICAgICAgICAgIGlmIChmID09PSAwKSByZXR1cm4gbWF0Y2g7XG4gICAgICAgICAgICBpZiAoZiA8PSBtKSByZXR1cm4gY2FwdHVyZXNbZiAtIDFdID09PSB1bmRlZmluZWQgPyBjaC5jaGFyQXQoMSkgOiBjYXB0dXJlc1tmIC0gMV0gKyBjaC5jaGFyQXQoMSk7XG4gICAgICAgICAgICByZXR1cm4gbWF0Y2g7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNhcHR1cmUgPSBjYXB0dXJlc1tuIC0gMV07XG4gICAgICB9XG4gICAgICByZXR1cm4gY2FwdHVyZSA9PT0gdW5kZWZpbmVkID8gJycgOiBjYXB0dXJlO1xuICAgIH0pO1xuICB9XG59KTtcbiIsInZhciAkaXRlcmF0b3JzID0gcmVxdWlyZSgnLi9lczYuYXJyYXkuaXRlcmF0b3InKTtcbnZhciBnZXRLZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKTtcbnZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lJyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgaGlkZSA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKTtcbnZhciB3a3MgPSByZXF1aXJlKCcuL193a3MnKTtcbnZhciBJVEVSQVRPUiA9IHdrcygnaXRlcmF0b3InKTtcbnZhciBUT19TVFJJTkdfVEFHID0gd2tzKCd0b1N0cmluZ1RhZycpO1xudmFyIEFycmF5VmFsdWVzID0gSXRlcmF0b3JzLkFycmF5O1xuXG52YXIgRE9NSXRlcmFibGVzID0ge1xuICBDU1NSdWxlTGlzdDogdHJ1ZSwgLy8gVE9ETzogTm90IHNwZWMgY29tcGxpYW50LCBzaG91bGQgYmUgZmFsc2UuXG4gIENTU1N0eWxlRGVjbGFyYXRpb246IGZhbHNlLFxuICBDU1NWYWx1ZUxpc3Q6IGZhbHNlLFxuICBDbGllbnRSZWN0TGlzdDogZmFsc2UsXG4gIERPTVJlY3RMaXN0OiBmYWxzZSxcbiAgRE9NU3RyaW5nTGlzdDogZmFsc2UsXG4gIERPTVRva2VuTGlzdDogdHJ1ZSxcbiAgRGF0YVRyYW5zZmVySXRlbUxpc3Q6IGZhbHNlLFxuICBGaWxlTGlzdDogZmFsc2UsXG4gIEhUTUxBbGxDb2xsZWN0aW9uOiBmYWxzZSxcbiAgSFRNTENvbGxlY3Rpb246IGZhbHNlLFxuICBIVE1MRm9ybUVsZW1lbnQ6IGZhbHNlLFxuICBIVE1MU2VsZWN0RWxlbWVudDogZmFsc2UsXG4gIE1lZGlhTGlzdDogdHJ1ZSwgLy8gVE9ETzogTm90IHNwZWMgY29tcGxpYW50LCBzaG91bGQgYmUgZmFsc2UuXG4gIE1pbWVUeXBlQXJyYXk6IGZhbHNlLFxuICBOYW1lZE5vZGVNYXA6IGZhbHNlLFxuICBOb2RlTGlzdDogdHJ1ZSxcbiAgUGFpbnRSZXF1ZXN0TGlzdDogZmFsc2UsXG4gIFBsdWdpbjogZmFsc2UsXG4gIFBsdWdpbkFycmF5OiBmYWxzZSxcbiAgU1ZHTGVuZ3RoTGlzdDogZmFsc2UsXG4gIFNWR051bWJlckxpc3Q6IGZhbHNlLFxuICBTVkdQYXRoU2VnTGlzdDogZmFsc2UsXG4gIFNWR1BvaW50TGlzdDogZmFsc2UsXG4gIFNWR1N0cmluZ0xpc3Q6IGZhbHNlLFxuICBTVkdUcmFuc2Zvcm1MaXN0OiBmYWxzZSxcbiAgU291cmNlQnVmZmVyTGlzdDogZmFsc2UsXG4gIFN0eWxlU2hlZXRMaXN0OiB0cnVlLCAvLyBUT0RPOiBOb3Qgc3BlYyBjb21wbGlhbnQsIHNob3VsZCBiZSBmYWxzZS5cbiAgVGV4dFRyYWNrQ3VlTGlzdDogZmFsc2UsXG4gIFRleHRUcmFja0xpc3Q6IGZhbHNlLFxuICBUb3VjaExpc3Q6IGZhbHNlXG59O1xuXG5mb3IgKHZhciBjb2xsZWN0aW9ucyA9IGdldEtleXMoRE9NSXRlcmFibGVzKSwgaSA9IDA7IGkgPCBjb2xsZWN0aW9ucy5sZW5ndGg7IGkrKykge1xuICB2YXIgTkFNRSA9IGNvbGxlY3Rpb25zW2ldO1xuICB2YXIgZXhwbGljaXQgPSBET01JdGVyYWJsZXNbTkFNRV07XG4gIHZhciBDb2xsZWN0aW9uID0gZ2xvYmFsW05BTUVdO1xuICB2YXIgcHJvdG8gPSBDb2xsZWN0aW9uICYmIENvbGxlY3Rpb24ucHJvdG90eXBlO1xuICB2YXIga2V5O1xuICBpZiAocHJvdG8pIHtcbiAgICBpZiAoIXByb3RvW0lURVJBVE9SXSkgaGlkZShwcm90bywgSVRFUkFUT1IsIEFycmF5VmFsdWVzKTtcbiAgICBpZiAoIXByb3RvW1RPX1NUUklOR19UQUddKSBoaWRlKHByb3RvLCBUT19TVFJJTkdfVEFHLCBOQU1FKTtcbiAgICBJdGVyYXRvcnNbTkFNRV0gPSBBcnJheVZhbHVlcztcbiAgICBpZiAoZXhwbGljaXQpIGZvciAoa2V5IGluICRpdGVyYXRvcnMpIGlmICghcHJvdG9ba2V5XSkgcmVkZWZpbmUocHJvdG8sIGtleSwgJGl0ZXJhdG9yc1trZXldLCB0cnVlKTtcbiAgfVxufVxuIiwiY29uc3QgaW5zdGFuY2VPZkFueSA9IChvYmplY3QsIGNvbnN0cnVjdG9ycykgPT4gY29uc3RydWN0b3JzLnNvbWUoYyA9PiBvYmplY3QgaW5zdGFuY2VvZiBjKTtcblxubGV0IGlkYlByb3h5YWJsZVR5cGVzO1xyXG5sZXQgY3Vyc29yQWR2YW5jZU1ldGhvZHM7XHJcbi8vIFRoaXMgaXMgYSBmdW5jdGlvbiB0byBwcmV2ZW50IGl0IHRocm93aW5nIHVwIGluIG5vZGUgZW52aXJvbm1lbnRzLlxyXG5mdW5jdGlvbiBnZXRJZGJQcm94eWFibGVUeXBlcygpIHtcclxuICAgIHJldHVybiAoaWRiUHJveHlhYmxlVHlwZXMgfHxcclxuICAgICAgICAoaWRiUHJveHlhYmxlVHlwZXMgPSBbXHJcbiAgICAgICAgICAgIElEQkRhdGFiYXNlLFxyXG4gICAgICAgICAgICBJREJPYmplY3RTdG9yZSxcclxuICAgICAgICAgICAgSURCSW5kZXgsXHJcbiAgICAgICAgICAgIElEQkN1cnNvcixcclxuICAgICAgICAgICAgSURCVHJhbnNhY3Rpb24sXHJcbiAgICAgICAgXSkpO1xyXG59XHJcbi8vIFRoaXMgaXMgYSBmdW5jdGlvbiB0byBwcmV2ZW50IGl0IHRocm93aW5nIHVwIGluIG5vZGUgZW52aXJvbm1lbnRzLlxyXG5mdW5jdGlvbiBnZXRDdXJzb3JBZHZhbmNlTWV0aG9kcygpIHtcclxuICAgIHJldHVybiAoY3Vyc29yQWR2YW5jZU1ldGhvZHMgfHxcclxuICAgICAgICAoY3Vyc29yQWR2YW5jZU1ldGhvZHMgPSBbXHJcbiAgICAgICAgICAgIElEQkN1cnNvci5wcm90b3R5cGUuYWR2YW5jZSxcclxuICAgICAgICAgICAgSURCQ3Vyc29yLnByb3RvdHlwZS5jb250aW51ZSxcclxuICAgICAgICAgICAgSURCQ3Vyc29yLnByb3RvdHlwZS5jb250aW51ZVByaW1hcnlLZXksXHJcbiAgICAgICAgXSkpO1xyXG59XHJcbmNvbnN0IGN1cnNvclJlcXVlc3RNYXAgPSBuZXcgV2Vha01hcCgpO1xyXG5jb25zdCB0cmFuc2FjdGlvbkRvbmVNYXAgPSBuZXcgV2Vha01hcCgpO1xyXG5jb25zdCB0cmFuc2FjdGlvblN0b3JlTmFtZXNNYXAgPSBuZXcgV2Vha01hcCgpO1xyXG5jb25zdCB0cmFuc2Zvcm1DYWNoZSA9IG5ldyBXZWFrTWFwKCk7XHJcbmNvbnN0IHJldmVyc2VUcmFuc2Zvcm1DYWNoZSA9IG5ldyBXZWFrTWFwKCk7XHJcbmZ1bmN0aW9uIHByb21pc2lmeVJlcXVlc3QocmVxdWVzdCkge1xyXG4gICAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICBjb25zdCB1bmxpc3RlbiA9ICgpID0+IHtcclxuICAgICAgICAgICAgcmVxdWVzdC5yZW1vdmVFdmVudExpc3RlbmVyKCdzdWNjZXNzJywgc3VjY2Vzcyk7XHJcbiAgICAgICAgICAgIHJlcXVlc3QucmVtb3ZlRXZlbnRMaXN0ZW5lcignZXJyb3InLCBlcnJvcik7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zdCBzdWNjZXNzID0gKCkgPT4ge1xyXG4gICAgICAgICAgICByZXNvbHZlKHdyYXAocmVxdWVzdC5yZXN1bHQpKTtcclxuICAgICAgICAgICAgdW5saXN0ZW4oKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IGVycm9yID0gKCkgPT4ge1xyXG4gICAgICAgICAgICByZWplY3QocmVxdWVzdC5lcnJvcik7XHJcbiAgICAgICAgICAgIHVubGlzdGVuKCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ3N1Y2Nlc3MnLCBzdWNjZXNzKTtcclxuICAgICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZXJyb3IpO1xyXG4gICAgfSk7XHJcbiAgICBwcm9taXNlXHJcbiAgICAgICAgLnRoZW4odmFsdWUgPT4ge1xyXG4gICAgICAgIC8vIFNpbmNlIGN1cnNvcmluZyByZXVzZXMgdGhlIElEQlJlcXVlc3QgKCpzaWdoKiksIHdlIGNhY2hlIGl0IGZvciBsYXRlciByZXRyaWV2YWxcclxuICAgICAgICAvLyAoc2VlIHdyYXBGdW5jdGlvbikuXHJcbiAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgSURCQ3Vyc29yKSB7XHJcbiAgICAgICAgICAgIGN1cnNvclJlcXVlc3RNYXAuc2V0KHZhbHVlLCByZXF1ZXN0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gQ2F0Y2hpbmcgdG8gYXZvaWQgXCJVbmNhdWdodCBQcm9taXNlIGV4Y2VwdGlvbnNcIlxyXG4gICAgfSlcclxuICAgICAgICAuY2F0Y2goKCkgPT4geyB9KTtcclxuICAgIC8vIFRoaXMgbWFwcGluZyBleGlzdHMgaW4gcmV2ZXJzZVRyYW5zZm9ybUNhY2hlIGJ1dCBkb2Vzbid0IGRvZXNuJ3QgZXhpc3QgaW4gdHJhbnNmb3JtQ2FjaGUuIFRoaXNcclxuICAgIC8vIGlzIGJlY2F1c2Ugd2UgY3JlYXRlIG1hbnkgcHJvbWlzZXMgZnJvbSBhIHNpbmdsZSBJREJSZXF1ZXN0LlxyXG4gICAgcmV2ZXJzZVRyYW5zZm9ybUNhY2hlLnNldChwcm9taXNlLCByZXF1ZXN0KTtcclxuICAgIHJldHVybiBwcm9taXNlO1xyXG59XHJcbmZ1bmN0aW9uIGNhY2hlRG9uZVByb21pc2VGb3JUcmFuc2FjdGlvbih0eCkge1xyXG4gICAgLy8gRWFybHkgYmFpbCBpZiB3ZSd2ZSBhbHJlYWR5IGNyZWF0ZWQgYSBkb25lIHByb21pc2UgZm9yIHRoaXMgdHJhbnNhY3Rpb24uXHJcbiAgICBpZiAodHJhbnNhY3Rpb25Eb25lTWFwLmhhcyh0eCkpXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgY29uc3QgZG9uZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICBjb25zdCB1bmxpc3RlbiA9ICgpID0+IHtcclxuICAgICAgICAgICAgdHgucmVtb3ZlRXZlbnRMaXN0ZW5lcignY29tcGxldGUnLCBjb21wbGV0ZSk7XHJcbiAgICAgICAgICAgIHR4LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZXJyb3IpO1xyXG4gICAgICAgICAgICB0eC5yZW1vdmVFdmVudExpc3RlbmVyKCdhYm9ydCcsIGVycm9yKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IGNvbXBsZXRlID0gKCkgPT4ge1xyXG4gICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgIHVubGlzdGVuKCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zdCBlcnJvciA9ICgpID0+IHtcclxuICAgICAgICAgICAgcmVqZWN0KHR4LmVycm9yKTtcclxuICAgICAgICAgICAgdW5saXN0ZW4oKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHR4LmFkZEV2ZW50TGlzdGVuZXIoJ2NvbXBsZXRlJywgY29tcGxldGUpO1xyXG4gICAgICAgIHR4LmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZXJyb3IpO1xyXG4gICAgICAgIHR4LmFkZEV2ZW50TGlzdGVuZXIoJ2Fib3J0JywgZXJyb3IpO1xyXG4gICAgfSk7XHJcbiAgICAvLyBDYWNoZSBpdCBmb3IgbGF0ZXIgcmV0cmlldmFsLlxyXG4gICAgdHJhbnNhY3Rpb25Eb25lTWFwLnNldCh0eCwgZG9uZSk7XHJcbn1cclxubGV0IGlkYlByb3h5VHJhcHMgPSB7XHJcbiAgICBnZXQodGFyZ2V0LCBwcm9wLCByZWNlaXZlcikge1xyXG4gICAgICAgIGlmICh0YXJnZXQgaW5zdGFuY2VvZiBJREJUcmFuc2FjdGlvbikge1xyXG4gICAgICAgICAgICAvLyBTcGVjaWFsIGhhbmRsaW5nIGZvciB0cmFuc2FjdGlvbi5kb25lLlxyXG4gICAgICAgICAgICBpZiAocHJvcCA9PT0gJ2RvbmUnKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRyYW5zYWN0aW9uRG9uZU1hcC5nZXQodGFyZ2V0KTtcclxuICAgICAgICAgICAgLy8gUG9seWZpbGwgZm9yIG9iamVjdFN0b3JlTmFtZXMgYmVjYXVzZSBvZiBFZGdlLlxyXG4gICAgICAgICAgICBpZiAocHJvcCA9PT0gJ29iamVjdFN0b3JlTmFtZXMnKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGFyZ2V0Lm9iamVjdFN0b3JlTmFtZXMgfHwgdHJhbnNhY3Rpb25TdG9yZU5hbWVzTWFwLmdldCh0YXJnZXQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIE1ha2UgdHguc3RvcmUgcmV0dXJuIHRoZSBvbmx5IHN0b3JlIGluIHRoZSB0cmFuc2FjdGlvbiwgb3IgdW5kZWZpbmVkIGlmIHRoZXJlIGFyZSBtYW55LlxyXG4gICAgICAgICAgICBpZiAocHJvcCA9PT0gJ3N0b3JlJykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlY2VpdmVyLm9iamVjdFN0b3JlTmFtZXNbMV1cclxuICAgICAgICAgICAgICAgICAgICA/IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICAgICAgICAgIDogcmVjZWl2ZXIub2JqZWN0U3RvcmUocmVjZWl2ZXIub2JqZWN0U3RvcmVOYW1lc1swXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gRWxzZSB0cmFuc2Zvcm0gd2hhdGV2ZXIgd2UgZ2V0IGJhY2suXHJcbiAgICAgICAgcmV0dXJuIHdyYXAodGFyZ2V0W3Byb3BdKTtcclxuICAgIH0sXHJcbiAgICBoYXModGFyZ2V0LCBwcm9wKSB7XHJcbiAgICAgICAgaWYgKHRhcmdldCBpbnN0YW5jZW9mIElEQlRyYW5zYWN0aW9uICYmXHJcbiAgICAgICAgICAgIChwcm9wID09PSAnZG9uZScgfHwgcHJvcCA9PT0gJ3N0b3JlJykpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwcm9wIGluIHRhcmdldDtcclxuICAgIH0sXHJcbn07XHJcbmZ1bmN0aW9uIGFkZFRyYXBzKGNhbGxiYWNrKSB7XHJcbiAgICBpZGJQcm94eVRyYXBzID0gY2FsbGJhY2soaWRiUHJveHlUcmFwcyk7XHJcbn1cclxuZnVuY3Rpb24gd3JhcEZ1bmN0aW9uKGZ1bmMpIHtcclxuICAgIC8vIER1ZSB0byBleHBlY3RlZCBvYmplY3QgZXF1YWxpdHkgKHdoaWNoIGlzIGVuZm9yY2VkIGJ5IHRoZSBjYWNoaW5nIGluIGB3cmFwYCksIHdlXHJcbiAgICAvLyBvbmx5IGNyZWF0ZSBvbmUgbmV3IGZ1bmMgcGVyIGZ1bmMuXHJcbiAgICAvLyBFZGdlIGRvZXNuJ3Qgc3VwcG9ydCBvYmplY3RTdG9yZU5hbWVzIChib29vKSwgc28gd2UgcG9seWZpbGwgaXQgaGVyZS5cclxuICAgIGlmIChmdW5jID09PSBJREJEYXRhYmFzZS5wcm90b3R5cGUudHJhbnNhY3Rpb24gJiZcclxuICAgICAgICAhKCdvYmplY3RTdG9yZU5hbWVzJyBpbiBJREJUcmFuc2FjdGlvbi5wcm90b3R5cGUpKSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChzdG9yZU5hbWVzLCAuLi5hcmdzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHR4ID0gZnVuYy5jYWxsKHVud3JhcCh0aGlzKSwgc3RvcmVOYW1lcywgLi4uYXJncyk7XHJcbiAgICAgICAgICAgIHRyYW5zYWN0aW9uU3RvcmVOYW1lc01hcC5zZXQodHgsIHN0b3JlTmFtZXMuc29ydCA/IHN0b3JlTmFtZXMuc29ydCgpIDogW3N0b3JlTmFtZXNdKTtcclxuICAgICAgICAgICAgcmV0dXJuIHdyYXAodHgpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICAvLyBDdXJzb3IgbWV0aG9kcyBhcmUgc3BlY2lhbCwgYXMgdGhlIGJlaGF2aW91ciBpcyBhIGxpdHRsZSBtb3JlIGRpZmZlcmVudCB0byBzdGFuZGFyZCBJREIuIEluXHJcbiAgICAvLyBJREIsIHlvdSBhZHZhbmNlIHRoZSBjdXJzb3IgYW5kIHdhaXQgZm9yIGEgbmV3ICdzdWNjZXNzJyBvbiB0aGUgSURCUmVxdWVzdCB0aGF0IGdhdmUgeW91IHRoZVxyXG4gICAgLy8gY3Vyc29yLiBJdCdzIGtpbmRhIGxpa2UgYSBwcm9taXNlIHRoYXQgY2FuIHJlc29sdmUgd2l0aCBtYW55IHZhbHVlcy4gVGhhdCBkb2Vzbid0IG1ha2Ugc2Vuc2VcclxuICAgIC8vIHdpdGggcmVhbCBwcm9taXNlcywgc28gZWFjaCBhZHZhbmNlIG1ldGhvZHMgcmV0dXJucyBhIG5ldyBwcm9taXNlIGZvciB0aGUgY3Vyc29yIG9iamVjdCwgb3JcclxuICAgIC8vIHVuZGVmaW5lZCBpZiB0aGUgZW5kIG9mIHRoZSBjdXJzb3IgaGFzIGJlZW4gcmVhY2hlZC5cclxuICAgIGlmIChnZXRDdXJzb3JBZHZhbmNlTWV0aG9kcygpLmluY2x1ZGVzKGZ1bmMpKSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XHJcbiAgICAgICAgICAgIC8vIENhbGxpbmcgdGhlIG9yaWdpbmFsIGZ1bmN0aW9uIHdpdGggdGhlIHByb3h5IGFzICd0aGlzJyBjYXVzZXMgSUxMRUdBTCBJTlZPQ0FUSU9OLCBzbyB3ZSB1c2VcclxuICAgICAgICAgICAgLy8gdGhlIG9yaWdpbmFsIG9iamVjdC5cclxuICAgICAgICAgICAgZnVuYy5hcHBseSh1bndyYXAodGhpcyksIGFyZ3MpO1xyXG4gICAgICAgICAgICByZXR1cm4gd3JhcChjdXJzb3JSZXF1ZXN0TWFwLmdldCh0aGlzKSk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xyXG4gICAgICAgIC8vIENhbGxpbmcgdGhlIG9yaWdpbmFsIGZ1bmN0aW9uIHdpdGggdGhlIHByb3h5IGFzICd0aGlzJyBjYXVzZXMgSUxMRUdBTCBJTlZPQ0FUSU9OLCBzbyB3ZSB1c2VcclxuICAgICAgICAvLyB0aGUgb3JpZ2luYWwgb2JqZWN0LlxyXG4gICAgICAgIHJldHVybiB3cmFwKGZ1bmMuYXBwbHkodW53cmFwKHRoaXMpLCBhcmdzKSk7XHJcbiAgICB9O1xyXG59XHJcbmZ1bmN0aW9uIHRyYW5zZm9ybUNhY2hhYmxlVmFsdWUodmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpXHJcbiAgICAgICAgcmV0dXJuIHdyYXBGdW5jdGlvbih2YWx1ZSk7XHJcbiAgICAvLyBUaGlzIGRvZXNuJ3QgcmV0dXJuLCBpdCBqdXN0IGNyZWF0ZXMgYSAnZG9uZScgcHJvbWlzZSBmb3IgdGhlIHRyYW5zYWN0aW9uLFxyXG4gICAgLy8gd2hpY2ggaXMgbGF0ZXIgcmV0dXJuZWQgZm9yIHRyYW5zYWN0aW9uLmRvbmUgKHNlZSBpZGJPYmplY3RIYW5kbGVyKS5cclxuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIElEQlRyYW5zYWN0aW9uKVxyXG4gICAgICAgIGNhY2hlRG9uZVByb21pc2VGb3JUcmFuc2FjdGlvbih2YWx1ZSk7XHJcbiAgICBpZiAoaW5zdGFuY2VPZkFueSh2YWx1ZSwgZ2V0SWRiUHJveHlhYmxlVHlwZXMoKSkpXHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm94eSh2YWx1ZSwgaWRiUHJveHlUcmFwcyk7XHJcbiAgICAvLyBSZXR1cm4gdGhlIHNhbWUgdmFsdWUgYmFjayBpZiB3ZSdyZSBub3QgZ29pbmcgdG8gdHJhbnNmb3JtIGl0LlxyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG59XHJcbmZ1bmN0aW9uIHdyYXAodmFsdWUpIHtcclxuICAgIC8vIFdlIHNvbWV0aW1lcyBnZW5lcmF0ZSBtdWx0aXBsZSBwcm9taXNlcyBmcm9tIGEgc2luZ2xlIElEQlJlcXVlc3QgKGVnIHdoZW4gY3Vyc29yaW5nKSwgYmVjYXVzZVxyXG4gICAgLy8gSURCIGlzIHdlaXJkIGFuZCBhIHNpbmdsZSBJREJSZXF1ZXN0IGNhbiB5aWVsZCBtYW55IHJlc3BvbnNlcywgc28gdGhlc2UgY2FuJ3QgYmUgY2FjaGVkLlxyXG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgSURCUmVxdWVzdClcclxuICAgICAgICByZXR1cm4gcHJvbWlzaWZ5UmVxdWVzdCh2YWx1ZSk7XHJcbiAgICAvLyBJZiB3ZSd2ZSBhbHJlYWR5IHRyYW5zZm9ybWVkIHRoaXMgdmFsdWUgYmVmb3JlLCByZXVzZSB0aGUgdHJhbnNmb3JtZWQgdmFsdWUuXHJcbiAgICAvLyBUaGlzIGlzIGZhc3RlciwgYnV0IGl0IGFsc28gcHJvdmlkZXMgb2JqZWN0IGVxdWFsaXR5LlxyXG4gICAgaWYgKHRyYW5zZm9ybUNhY2hlLmhhcyh2YWx1ZSkpXHJcbiAgICAgICAgcmV0dXJuIHRyYW5zZm9ybUNhY2hlLmdldCh2YWx1ZSk7XHJcbiAgICBjb25zdCBuZXdWYWx1ZSA9IHRyYW5zZm9ybUNhY2hhYmxlVmFsdWUodmFsdWUpO1xyXG4gICAgLy8gTm90IGFsbCB0eXBlcyBhcmUgdHJhbnNmb3JtZWQuXHJcbiAgICAvLyBUaGVzZSBtYXkgYmUgcHJpbWl0aXZlIHR5cGVzLCBzbyB0aGV5IGNhbid0IGJlIFdlYWtNYXAga2V5cy5cclxuICAgIGlmIChuZXdWYWx1ZSAhPT0gdmFsdWUpIHtcclxuICAgICAgICB0cmFuc2Zvcm1DYWNoZS5zZXQodmFsdWUsIG5ld1ZhbHVlKTtcclxuICAgICAgICByZXZlcnNlVHJhbnNmb3JtQ2FjaGUuc2V0KG5ld1ZhbHVlLCB2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV3VmFsdWU7XHJcbn1cclxuY29uc3QgdW53cmFwID0gKHZhbHVlKSA9PiByZXZlcnNlVHJhbnNmb3JtQ2FjaGUuZ2V0KHZhbHVlKTtcblxuZXhwb3J0IHsgd3JhcCBhcyBhLCBhZGRUcmFwcyBhcyBiLCBpbnN0YW5jZU9mQW55IGFzIGMsIHJldmVyc2VUcmFuc2Zvcm1DYWNoZSBhcyBkLCB1bndyYXAgYXMgZSB9O1xuIiwiaW1wb3J0IHsgYSBhcyB3cmFwLCBiIGFzIGFkZFRyYXBzIH0gZnJvbSAnLi9jaHVuay5qcyc7XG5leHBvcnQgeyBlIGFzIHVud3JhcCwgYSBhcyB3cmFwIH0gZnJvbSAnLi9jaHVuay5qcyc7XG5cbi8qKlxyXG4gKiBPcGVuIGEgZGF0YWJhc2UuXHJcbiAqXHJcbiAqIEBwYXJhbSBuYW1lIE5hbWUgb2YgdGhlIGRhdGFiYXNlLlxyXG4gKiBAcGFyYW0gdmVyc2lvbiBTY2hlbWEgdmVyc2lvbi5cclxuICogQHBhcmFtIGNhbGxiYWNrcyBBZGRpdGlvbmFsIGNhbGxiYWNrcy5cclxuICovXHJcbmZ1bmN0aW9uIG9wZW5EQihuYW1lLCB2ZXJzaW9uLCB7IGJsb2NrZWQsIHVwZ3JhZGUsIGJsb2NraW5nIH0gPSB7fSkge1xyXG4gICAgY29uc3QgcmVxdWVzdCA9IGluZGV4ZWREQi5vcGVuKG5hbWUsIHZlcnNpb24pO1xyXG4gICAgY29uc3Qgb3BlblByb21pc2UgPSB3cmFwKHJlcXVlc3QpO1xyXG4gICAgaWYgKHVwZ3JhZGUpIHtcclxuICAgICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ3VwZ3JhZGVuZWVkZWQnLCBldmVudCA9PiB7XHJcbiAgICAgICAgICAgIHVwZ3JhZGUod3JhcChyZXF1ZXN0LnJlc3VsdCksIGV2ZW50Lm9sZFZlcnNpb24sIGV2ZW50Lm5ld1ZlcnNpb24sIHdyYXAocmVxdWVzdC50cmFuc2FjdGlvbikpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgaWYgKGJsb2NrZWQpXHJcbiAgICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdibG9ja2VkJywgKCkgPT4gYmxvY2tlZCgpKTtcclxuICAgIGlmIChibG9ja2luZykge1xyXG4gICAgICAgIG9wZW5Qcm9taXNlLnRoZW4oZGIgPT4gZGIuYWRkRXZlbnRMaXN0ZW5lcigndmVyc2lvbmNoYW5nZScsIGJsb2NraW5nKSkuY2F0Y2goKCkgPT4geyB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBvcGVuUHJvbWlzZTtcclxufVxyXG4vKipcclxuICogRGVsZXRlIGEgZGF0YWJhc2UuXHJcbiAqXHJcbiAqIEBwYXJhbSBuYW1lIE5hbWUgb2YgdGhlIGRhdGFiYXNlLlxyXG4gKi9cclxuZnVuY3Rpb24gZGVsZXRlREIobmFtZSwgeyBibG9ja2VkIH0gPSB7fSkge1xyXG4gICAgY29uc3QgcmVxdWVzdCA9IGluZGV4ZWREQi5kZWxldGVEYXRhYmFzZShuYW1lKTtcclxuICAgIGlmIChibG9ja2VkKVxyXG4gICAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignYmxvY2tlZCcsICgpID0+IGJsb2NrZWQoKSk7XHJcbiAgICByZXR1cm4gd3JhcChyZXF1ZXN0KS50aGVuKCgpID0+IHVuZGVmaW5lZCk7XHJcbn1cblxuY29uc3QgcmVhZE1ldGhvZHMgPSBbJ2dldCcsICdnZXRLZXknLCAnZ2V0QWxsJywgJ2dldEFsbEtleXMnLCAnY291bnQnXTtcclxuY29uc3Qgd3JpdGVNZXRob2RzID0gWydwdXQnLCAnYWRkJywgJ2RlbGV0ZScsICdjbGVhciddO1xyXG5jb25zdCBjYWNoZWRNZXRob2RzID0gbmV3IE1hcCgpO1xyXG5mdW5jdGlvbiBnZXRNZXRob2QodGFyZ2V0LCBwcm9wKSB7XHJcbiAgICBpZiAoISh0YXJnZXQgaW5zdGFuY2VvZiBJREJEYXRhYmFzZSAmJlxyXG4gICAgICAgICEocHJvcCBpbiB0YXJnZXQpICYmXHJcbiAgICAgICAgdHlwZW9mIHByb3AgPT09ICdzdHJpbmcnKSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmIChjYWNoZWRNZXRob2RzLmdldChwcm9wKSlcclxuICAgICAgICByZXR1cm4gY2FjaGVkTWV0aG9kcy5nZXQocHJvcCk7XHJcbiAgICBjb25zdCB0YXJnZXRGdW5jTmFtZSA9IHByb3AucmVwbGFjZSgvRnJvbUluZGV4JC8sICcnKTtcclxuICAgIGNvbnN0IHVzZUluZGV4ID0gcHJvcCAhPT0gdGFyZ2V0RnVuY05hbWU7XHJcbiAgICBjb25zdCBpc1dyaXRlID0gd3JpdGVNZXRob2RzLmluY2x1ZGVzKHRhcmdldEZ1bmNOYW1lKTtcclxuICAgIGlmIChcclxuICAgIC8vIEJhaWwgaWYgdGhlIHRhcmdldCBkb2Vzbid0IGV4aXN0IG9uIHRoZSB0YXJnZXQuIEVnLCBnZXRBbGwgaXNuJ3QgaW4gRWRnZS5cclxuICAgICEodGFyZ2V0RnVuY05hbWUgaW4gKHVzZUluZGV4ID8gSURCSW5kZXggOiBJREJPYmplY3RTdG9yZSkucHJvdG90eXBlKSB8fFxyXG4gICAgICAgICEoaXNXcml0ZSB8fCByZWFkTWV0aG9kcy5pbmNsdWRlcyh0YXJnZXRGdW5jTmFtZSkpKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgY29uc3QgbWV0aG9kID0gYXN5bmMgZnVuY3Rpb24gKHN0b3JlTmFtZSwgLi4uYXJncykge1xyXG4gICAgICAgIC8vIGlzV3JpdGUgPyAncmVhZHdyaXRlJyA6IHVuZGVmaW5lZCBnemlwcHMgYmV0dGVyLCBidXQgZmFpbHMgaW4gRWRnZSA6KFxyXG4gICAgICAgIGNvbnN0IHR4ID0gdGhpcy50cmFuc2FjdGlvbihzdG9yZU5hbWUsIGlzV3JpdGUgPyAncmVhZHdyaXRlJyA6ICdyZWFkb25seScpO1xyXG4gICAgICAgIGxldCB0YXJnZXQgPSB0eC5zdG9yZTtcclxuICAgICAgICBpZiAodXNlSW5kZXgpXHJcbiAgICAgICAgICAgIHRhcmdldCA9IHRhcmdldC5pbmRleChhcmdzLnNoaWZ0KCkpO1xyXG4gICAgICAgIGNvbnN0IHJldHVyblZhbCA9IHRhcmdldFt0YXJnZXRGdW5jTmFtZV0oLi4uYXJncyk7XHJcbiAgICAgICAgaWYgKGlzV3JpdGUpXHJcbiAgICAgICAgICAgIGF3YWl0IHR4LmRvbmU7XHJcbiAgICAgICAgcmV0dXJuIHJldHVyblZhbDtcclxuICAgIH07XHJcbiAgICBjYWNoZWRNZXRob2RzLnNldChwcm9wLCBtZXRob2QpO1xyXG4gICAgcmV0dXJuIG1ldGhvZDtcclxufVxyXG5hZGRUcmFwcyhvbGRUcmFwcyA9PiAoe1xyXG4gICAgZ2V0OiAodGFyZ2V0LCBwcm9wLCByZWNlaXZlcikgPT4gZ2V0TWV0aG9kKHRhcmdldCwgcHJvcCkgfHwgb2xkVHJhcHMuZ2V0KHRhcmdldCwgcHJvcCwgcmVjZWl2ZXIpLFxyXG4gICAgaGFzOiAodGFyZ2V0LCBwcm9wKSA9PiAhIWdldE1ldGhvZCh0YXJnZXQsIHByb3ApIHx8IG9sZFRyYXBzLmhhcyh0YXJnZXQsIHByb3ApLFxyXG59KSk7XG5cbmV4cG9ydCB7IG9wZW5EQiwgZGVsZXRlREIgfTtcbiJdLCJzb3VyY2VSb290IjoiIn0=