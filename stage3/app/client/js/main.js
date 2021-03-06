import registration from './registration';
import DBHelper from './dbhelper';
let restaurants, neighborhoods, cuisines;
var newMap;
var markers = [];

// Fetch neighborhoods and cuisines as soon as the page is loaded.
document.addEventListener('DOMContentLoaded', (event) => {
  initMap();
  updateRestaurants();
  fetchNeighborhoods();
  fetchCuisines();
  DBHelper.nextPending();
});

// Fetch all neighborhoods and set their HTML.
const fetchNeighborhoods = () => {
  DBHelper.fetchNeighborhoods((error, neighborhoods) => {
    if (error) {
      // Got an error
      console.error(error);
    } else {
      self.neighborhoods = neighborhoods;
      fillNeighborhoodsHTML();
    }
  });
};

// Set neighborhoods HTML.
const fillNeighborhoodsHTML = (neighborhoods = self.neighborhoods) => {
  const select = document.getElementById('neighborhoods-select');
  select.addEventListener('change', updateRestaurants);
  neighborhoods.forEach((neighborhood) => {
    const option = document.createElement('option');
    option.innerHTML = neighborhood;
    option.value = neighborhood;
    select.append(option);
  });
};

//  Fetch all cuisines and set their HTML.
const fetchCuisines = () => {
  DBHelper.fetchCuisines((error, cuisines) => {
    if (error) {
      // Got an error!
      console.error(error);
    } else {
      self.cuisines = cuisines;
      fillCuisinesHTML();
    }
  });
};

// Set cuisines HTML.
const fillCuisinesHTML = (cuisines = self.cuisines) => {
  const select = document.getElementById('cuisines-select');
  select.addEventListener('change', updateRestaurants);

  cuisines.forEach((cuisine) => {
    const option = document.createElement('option');
    option.innerHTML = cuisine;
    option.value = cuisine;
    select.append(option);
  });
};

// Initialize leaflet map, called from HTML.
const initMap = () => {
  newMap = L.map('mapid', {
    center: [40.722216, -73.987501],
    zoom: 12,
    scrollWheelZoom: false,
  });
  self.newMap = newMap;
  L.tileLayer(
    'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
    {
      attribution:
        '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
      tileSize: 512,
      maxZoom: 18,
      zoomOffset: -1,
      id: 'mapbox/streets-v11',
      accessToken: process.env.API_KEY,
    }
  ).addTo(newMap);
};

//  Update page and map for current restaurants.

const updateRestaurants = () => {
  const cSelect = document.getElementById('cuisines-select');
  const nSelect = document.getElementById('neighborhoods-select');

  const cIndex = cSelect.selectedIndex;
  const nIndex = nSelect.selectedIndex;

  const cuisine = cSelect[cIndex].value;
  const neighborhood = nSelect[nIndex].value;

  DBHelper.fetchRestaurantByCuisineAndNeighborhood(
    cuisine,
    neighborhood,
    (error, restaurants) => {
      if (error) {
        // Got an error!
        console.error(error);
      } else {
        resetRestaurants(restaurants);
        fillRestaurantsHTML();
      }
    }
  );
};

// Clear current restaurants, their HTML and remove their map markers.

const resetRestaurants = (restaurants) => {
  // Remove all restaurants
  self.restaurants = [];
  const ul = document.getElementById('restaurants-list');
  ul.innerHTML = '';

  // Remove all map markers
  if (self.markers) {
    self.markers.forEach((marker) => marker.remove());
  }
  self.markers = [];
  self.restaurants = restaurants;
};

// Create all restaurants HTML and add them to the webpage.

const fillRestaurantsHTML = (restaurants = self.restaurants) => {
  const ul = document.getElementById('restaurants-list');
  restaurants.forEach((restaurant) => {
    ul.append(createRestaurantHTML(restaurant));
  });
  addMarkersToMap();
};

// Create restaurant HTML.

const createRestaurantHTML = (restaurant) => {
  const li = document.createElement('li');

  const image = document.createElement('img');
  const div = document.createElement('div');
  image.className = 'restaurant-img';
  image.setAttribute('alt', restaurant.name);
  image.src = DBHelper.imageUrlForRestaurant(restaurant);
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
  favBtn.setAttribute('title', `toggle favorites for: ${restaurant.name}`);
  favBtn.setAttribute('id', `fav-btn-${restaurant.id}`);
  favBtn.setAttribute('data-restaurant-id', restaurant.id);

  favBtn.addEventListener('click', () => {
    DBHelper.toggleFavBtn(restaurant.id);
  });

  li.append(favBtn);

  const more = document.createElement('button');
  more.classList = 'button button--success';
  more.innerHTML = 'View Details';
  more.setAttribute(
    'aria-label',
    restaurant.name +
      restaurant.neighborhood +
      restaurant.address +
      'View Details'
  );
  more.onclick = () => {
    const url = DBHelper.urlForRestaurant(restaurant);
    window.location = url;
  };
  li.append(more);

  return li;
};

// Add markers for current restaurants to the map.

const addMarkersToMap = (restaurants = self.restaurants) => {
  restaurants.forEach((restaurant) => {
    // Add marker to the map
    const marker = DBHelper.mapMarkerForRestaurant(restaurant, newMap);
    marker.on('click', onClick);
    function onClick() {
      window.location.href = marker.options.url;
    }
    self.markers.push(marker);
  });
};
