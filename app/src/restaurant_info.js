import registration from './registration';
import DBHelper from './dbhelper';
let restaurant;
let submitBtn;
var newMap;
import {dbPromise} from '../sw.js';

/**
 * Initialize map as soon as the page is loaded.
 */
document.addEventListener('DOMContentLoaded', (event) => {
  initMap();

  submitBtn = document.getElementById('submit-form-btn');
  submitBtn.addEventListener('click', submitReview);

  //check for pending reviews on page load and pop
  DBHelper.nextPending();
 });

/**
 * Initialize leaflet map
 */
const initMap = () => {
  fetchRestaurantFromURL((error, restaurant) => {
    if (error) { // Got an error!
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
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
          '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
          'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox.streets'
      }).addTo(newMap);
      fillBreadcrumb();
      DBHelper.mapMarkerForRestaurant(self.restaurant, self.newMap);
    }
  });
}

/**
 * Get current restaurant from page URL.
 */
const fetchRestaurantFromURL = (callback) => {
  if (self.restaurant) { // restaurant already fetched!
    callback(null, self.restaurant)
    console.log('self restaurant already fetched');
    return;
  }

  const id = getParameterByName('id');
  if (!id) { // no id found in URL
    error = 'No restaurant id in URL'
    callback(error, null);
  } else {
    DBHelper.fetchRestaurantById(id, (error, restaurant) => {
      self.restaurant = restaurant;
      if (!restaurant) {
        console.error(error);
        return;
      }
      fillRestaurantHTML();
      callback(null, restaurant);
    });
  }
}
/**
 * Create restaurant HTML and add it to the webpage
 */
const fillRestaurantHTML = (restaurant = self.restaurant) => {
  const name = document.getElementById('restaurant-name');
  name.innerHTML = restaurant.name;

  const address = document.getElementById('restaurant-address');
  address.innerHTML = ` ${restaurant.name} <br> ${restaurant.address}`;

  const image = document.getElementById('restaurant-img');
  image.className = 'restaurant-img'
  image.src = DBHelper.imageUrlForRestaurant(restaurant);

  const cuisine = document.getElementById('restaurant-cuisine');
  cuisine.innerHTML = restaurant.cuisine_type;

  // fill operating hours
  if (restaurant.operating_hours) {
    fillRestaurantHoursHTML();
  }
  // fill reviews
  DBHelper.fetchReviews(restaurant.id, (error, reviews) => {
    fillReviewsHTML(reviews);

  });
}


/**
 * Create restaurant operating hours HTML table and add it to the webpage.
 */
const fillRestaurantHoursHTML = (operatingHours = self.restaurant.operating_hours) => {
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
}

/**
 * Create all reviews HTML and add them to the webpage.
 */
const fillReviewsHTML = (reviews = self.restaurant.reviews) => {
  console.log(reviews);
  const container = document.getElementById('reviews-container');

  // Reset the container on every call to prevent duplication
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
  // const ul = document.getElementById('reviews-list');
  const ul = document.createElement('ul');
  ul.id = 'reviews-list';
  reviews.forEach(review => {
    ul.appendChild(createReviewHTML(review));
  });
  container.appendChild(ul);
}

/**
 * Create review HTML and add it to the webpage.
 */
const createReviewHTML = (review) => {
  const li = document.createElement('li');
  li.setAttribute('id', `review-li-${review.id}`)
  const name = document.createElement('p');
  name.innerHTML = review.name;
  li.appendChild(name);

  const date = document.createElement('p');
  date.innerHTML = '<strong>Created:</strong> ' + (new Date(review.createdAt)).toDateString();
  li.appendChild(date);

  const rating = document.createElement('p');
  rating.innerHTML = `Rating: ${review.rating}`;
  li.appendChild(rating);

  const comments = document.createElement('p');
  comments.innerHTML = review.comments;
  li.appendChild(comments);

  return li;
}

/**
 * Add restaurant name to the breadcrumb navigation menu
 */
const fillBreadcrumb = (restaurant=self.restaurant) => {
  const breadcrumb = document.getElementById('breadcrumb');
  const li = document.createElement('li');
  li.innerHTML = restaurant.name;
  breadcrumb.appendChild(li);
}

/**
 * Get a parameter by name from page URL.
 */
const getParameterByName = (name, url) => {
  let x = new URL(window.location.href);
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  console.log(url);
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`),
  results = regex.exec(url);
  console.log(results);
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

const submitReview = () => {
  let formData = getFormValues();
  if(!/[a-zA-Z]{2,}$/gi.test(formData.name)) {
    alert('name input must be letters only, minimum of 2 characters');
    return;
  }
  if(!/[1-5]{1}$/gi.test(formData.rating)) {
    alert('rating input must be a number, 1-5');
    return;
  }
  if(formData.comments.length < 3) {
    alert('comments input must be minimum of 3 characters');
    return;
  }
  formData.restaurant_id = self.restaurant.id;
  formData.createdAt = Date.now();
  formData.updatedAt = Date.now();
  DBHelper.saveNewReview(formData).then( result => {
    let alertMsg = 'Created Review';
    alert(alertMsg);
    let new_review_block = createReviewHTML(result);
    const ul = document.getElementById('reviews-list');
    ul.appendChild(new_review_block);
    var element = document.getElementById(`review-li-${result.id}`);
    element.scrollIntoView(true);
    resetFormValues();
  }).catch(error => {
    console.log(`${error}: reloading reviews from db`);
    const section = document.getElementById('reviews-container');
    dbPromise.then(db => {
      return db
        .transaction('reviews')
        .objectStore('reviews')
        .index('restaurant_id')
        .getAll(formData.restaurant_id);
    }).then(reviews => {
        console.log(reviews);
        fillReviewsHTML(reviews);
    })

  });
}

const getFormValues = () => {
  return {
    name: document.getElementById('name').value.trim(),
    rating: document.getElementById('rating').value.trim(),
    comments: document.getElementById('review-field').value.trim()
  }
}

const resetFormValues = () => {
  document.getElementById('name').value = '';
  document.getElementById('rating').value = '';
  document.getElementById('review-field').value = '';
}

