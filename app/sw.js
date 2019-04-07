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
        const reviewsStore = db.createObjectStore('reviews', {keyPath: 'id' });
        reviewsStore.createIndex("restaurant_id", "restaurant_id");
    }
  }
});

// const dbPromise = idb.open("fm-udacity-restaurant", 3, upgradeDB => {
//   switch (upgradeDB.oldVersion) {
//     case 0:
//       upgradeDB.createObjectStore("restaurants", {keyPath: "id"});
//     case 1:
//       {
//         const reviewsStore = upgradeDB.createObjectStore("reviews", {keyPath: "id"});
//         reviewsStore.createIndex("restaurant_id", "restaurant_id");
//       }
//     case 2:
//       upgradeDB.createObjectStore("pending", {
//         keyPath: "id",
//         autoIncrement: true
//       });
//   }
// });
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
  if (checkUrl.port === "1337") {
    handleAJAXEvent(event);
  } else if (event.request.method === "GET") {
    event.respondWith(
      caches.match(event.request).then(response => {
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

const handleAJAXEvent = (event) => {
  if(event.request.url.indexOf("restaurants") > -1) {
    event.respondWith(
      dbPromise.then( db => {
        console.log('starting from idb');
        return db
          .transaction('restaurants')
          .objectStore('restaurants')
          .getAll();
      }).then(data => {
        console.log(data);
        return (data.length && data || fetch(event.request)
          .then( fetchResponse => {
            console.log('still grabbing from fetch');
            return fetchResponse.json();
          }).catch(error => {
            console.log(error);
            reject(error);
          })
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
              console.log('stored, now returning');
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
  )}
}
