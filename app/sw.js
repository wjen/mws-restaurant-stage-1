const cacheVersion = '5';
const STATIC_CACHE = `static_cache-v${cacheVersion}`;
const IMAGES_CACHE = `images_cache-v`;
const allCaches = [
  STATIC_CACHE,
  IMAGES_CACHE
];

import { openDB, deleteDB, wrap, unwrap } from 'idb';

const dbPromise = openDB('rr-db', 2, {
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
    }
  }
});

// const getRestaurants = (event) => {
//   console.log(event.request);
//   fetch(event.request)
//     .then( fetchResponse => {
//       console.log('still grabbing from fetch');
//       return fetchResponse.json();
//     }).catch(error => {
//       console.log(error);
//       reject(error);
//     })
// }
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
        '/src/main.js',
        '/src/dbhelper.js',
        '/restaurant.html',
        '/index.html',
        '/src/restaurant_info.js',
        '/src/styles.css',
        '/src/rr-icon512.png'
      ]).catch(error => {
        console.log('error opening cache' + error);
      });
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      Promise.all(
         cacheNames.map(cache => {
          if(!allCaches.includes(cache)) {
            return caches.delete(cache);
          }
        })
      )
    })
  );
});


self.addEventListener('fetch', event => {
  let checkUrl = new URL(event.request.url);
  let id = checkUrl.searchParams.get('restaurant_id') - 0;
  if (checkUrl.port === "1337") {
    return handleAJAXEvent(event, id);
  } else if (event.request.method === "GET") {
    event.respondWith(
      caches.match(event.request).then(response => {
        console.log('this should not show');
        return (response || fetch(event.request).then(fetchResponse => {
          let useCache = isImageURL(event.request.url) ?  IMAGES_CACHE : STATIC_CACHE;
          return caches.open(useCache).then(cache => {
             cache.put(event.request, fetchResponse.clone());
             return fetchResponse;
          });
        }));
      }).catch(error => {
        console.log(error);
      })
    );
  } else {
    event.respondWith( fetch(event.request) );
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
        console.log('starting from idb');
        return db
          .transaction('restaurants')
          .objectStore('restaurants')
          .getAll();
      }).then(data => {
        console.log(data);
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
        console.log(finalResponse);
          return new Response(JSON.stringify(finalResponse));
        }).catch(error => {
          return new Response("Error fetching data", {status: 500});
        }))

}
