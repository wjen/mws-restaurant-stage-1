const cacheVersion = '3';
const STATIC_CACHE = `restaurant-cache-v${cacheVersion}`;
const IMAGES_CACHE = `images_cache-v`;
const allCaches = [
  STATIC_CACHE,
  IMAGES_CACHE
];
import { openDB, deleteDB, wrap, unwrap } from 'idb';
export {dbPromise}

const dbPromise = openDB('rr-db', 3, {
  upgrade(db, oldVersion) {
    switch (oldVersion) {
      case 0:
        const store = db.createObjectStore('restaurants', { keyPath: 'id' });
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

 const getRestaurants = (event) => {
    return new Promise(function(resolve, reject) {
      fetch(event.request)
      .then(resp => resp.json())
      .then(json => { resolve(json); })
      .catch(error => {
        console.log(error);
        reject(error);
      });
    });
  }

function isImageURL(url) {
  let imgTypes = ["png", "jpg", "jpeg", "svg", "gif"];
  let isImage = false;
  for (let type of imgTypes) {
    if (url.endsWith(type)) { isImage = true; break};
  }
  return isImage;
}

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then(cache => {
      return cache.addAll([
        '/',
        './app.bundle.js',
        './restaurant.bundle.js',
        './img/rr_icon.png',
      ]).catch(error => {
        console.log('error setting up install event for sw');
      });
    })
  );
});

// Clean unused caches with names starting with restaurant
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => {
          return cacheName.startsWith('restaurant-') &&
                 cacheName != STATIC_CACHE;
        }).map(cacheName => {
          return caches.delete(cacheName);
        })
      );
    })
  );
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
  if(event.request.method !== "GET") {
    event.respondWith( fetch(event.request))
  } else if(event.request.url.indexOf("restaurants") > -1) {
    handleRestaurantEvents(event);
  } else {
    console.log('starting handling from reviews event')
    handleReviewsEvents(event, id);
  }
}

const handleRestaurantEvents = (event) => {
  event.respondWith(
      dbPromise.then( db => {
        return db
          .transaction('restaurants')
          .objectStore('restaurants')
          .getAll();
      }).then(data => {
        return ((data.length && data) || getRestaurants(event)
          .then( restaurants => {
            console.log('fetched now storing');
            return dbPromise.then(db => {
              let tx = db.transaction('restaurants', 'readwrite');
              let store = tx.objectStore('restaurants');
              restaurants.forEach(function(restaurant){
                store.put(restaurant);
              });
              return tx.done;
            }).then( () => {
              console.log('stored restaurants, now returning');
              return restaurants;
            });
          })
        )
      })
        .then(finalResponse => {
          console.log(finalResponse);
          return new Response(JSON.stringify(finalResponse));
        }).catch(error => {
          return new Response("Error fetching data", {status: 500});
    })
  )
}

const handleReviewsEvents = (event, id) => {
  event.respondWith(
    dbPromise.then(db => {
      return db
        .transaction('reviews')
        .objectStore('reviews')
        .index("restaurant_id")
        .getAll(id);
    }).then( data => {
      console.log('serviceworker handle reviews');
      console.log(data);
      return (data.length && data) || fetch(event.request)
        .then(fetchResponse => {
          return fetchResponse.json();
        })
        .then( reviews => {
          console.log('using serviceworker fetch');
          console.log('starting to store reviews');
          return dbPromise.then(db => {
            let tx = db.transaction('reviews', 'readwrite')
            let store = tx.objectStore('reviews');
            reviews.forEach(function(review) {
              store.put(review);
            });
            return tx.done;
          })
          .then( () => reviews)
        })
    }).then(finalResponse => {
      return new Response(JSON.stringify(finalResponse));
    }).catch(error => {
      return new Response("Error fetching data", {status: 500});
    }))
}

const handleNonAJAXEvent = (event) => {
  // Check if the HTML request has previously been cached. If so, return the
  // response from the cache. If not, fetch the request, cache it, and then return
  // it.
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).then(fetchResponse => {
        let useCache = isImageURL(event.request.url) ?  IMAGES_CACHE : STATIC_CACHE;
        return caches
          .open(useCache)
          .then(cache => {
            cache.put(event.request, fetchResponse.clone());
            return fetchResponse;
        });
      }).catch(error => {
        return new Response("Application is not connected to the internet", {
          status: 404,
          statusText: "Application is not connected to the internet"
        });
      });
    })
  );

  // Updates the data from the network to use on next request.
  event.waitUntil(update(event.request));
}

const update = (request) => {
  let useCache = isImageURL(request.url) ?  IMAGES_CACHE : STATIC_CACHE;
  return caches.open(useCache).then(cache => {
    return fetch(request).then(response => {
      return cache.put(request, response);
    });
  });
}
