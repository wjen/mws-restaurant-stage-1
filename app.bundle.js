!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/",n(n.s=1)}([function(e,t){class n{static get DATABASE_URL(){return"http://localhost:1337/restaurants"}static fetchRestaurants(e){fetch(n.DATABASE_URL).then(function(t){t.json().then(function(t){e(null,t)})})}static fetchRestaurantById(e,t){n.fetchRestaurants((n,o)=>{if(n)t(n,null);else{const n=o.find(t=>t.id==e);n?t(null,n):t("Restaurant does not exist",null)}})}static fetchRestaurantByCuisine(e,t){n.fetchRestaurants((n,o)=>{if(n)t(n,null);else{const n=o.filter(t=>t.cuisine_type==e);t(null,n)}})}static fetchRestaurantByNeighborhood(e,t){n.fetchRestaurants((n,o)=>{if(n)t(n,null);else{const n=o.filter(t=>t.neighborhood==e);t(null,n)}})}static fetchRestaurantByCuisineAndNeighborhood(e,t,o){n.fetchRestaurants((n,r)=>{if(n)o(n,null);else{let n=r;"all"!=e&&(n=n.filter(t=>t.cuisine_type==e)),"all"!=t&&(n=n.filter(e=>e.neighborhood==t)),o(null,n)}})}static fetchNeighborhoods(e){n.fetchRestaurants((t,n)=>{if(t)e(t,null);else{const t=n.map((e,t)=>n[t].neighborhood),o=t.filter((e,n)=>t.indexOf(e)==n);e(null,o)}})}static fetchCuisines(e){n.fetchRestaurants((t,n)=>{if(t)e(t,null);else{const t=n.map((e,t)=>n[t].cuisine_type),o=t.filter((e,n)=>t.indexOf(e)==n);e(null,o)}})}static urlForRestaurant(e){return`./restaurant.html?id=${e.id}`}static imageUrlForRestaurant(e){return e.photograph?`/img/${e.photograph}.jpg`:`/img/${e.id}.jpg`}static mapMarkerForRestaurant(e,t){const o=new L.marker([e.latlng.lat,e.latlng.lng],{title:e.name,alt:e.name,url:n.urlForRestaurant(e)});return o.addTo(newMap),o}}window.DBHelper=n},function(e,t,n){n(0),e.exports=n(2)},function(e,t,n){"use strict";n.r(t);n(3),n(4);var o;document.addEventListener("DOMContentLoaded",e=>{c(),r(),i()});const r=()=>{DBHelper.fetchNeighborhoods((e,t)=>{e?console.error(e):(self.neighborhoods=t,s())})},s=(e=self.neighborhoods)=>{const t=document.getElementById("neighborhoods-select");t.addEventListener("change",u),e.forEach(e=>{const n=document.createElement("option");n.innerHTML=e,n.value=e,t.append(n)})},i=()=>{DBHelper.fetchCuisines((e,t)=>{e?console.error(e):(self.cuisines=t,a())})},a=(e=self.cuisines)=>{const t=document.getElementById("cuisines-select");t.addEventListener("change",u),e.forEach(e=>{const n=document.createElement("option");n.innerHTML=e,n.value=e,t.append(n)})},c=()=>{o=L.map("map",{center:[40.722216,-73.987501],zoom:12,scrollWheelZoom:!1}),self.newMap=o,L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.jpg70?access_token={mapboxToken}",{mapboxToken:"pk.eyJ1Ijoid2VudGluIiwiYSI6ImNqaXJ0N25iZjFwdjYza3A4MGt1aHU2bjEifQ.DnNFUoN5uzw01l_XK_c7nQ",maxZoom:18,attribution:'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',id:"mapbox.streets"}).addTo(o),u()},u=()=>{const e=document.getElementById("cuisines-select"),t=document.getElementById("neighborhoods-select"),n=e.selectedIndex,o=t.selectedIndex,r=e[n].value,s=t[o].value;DBHelper.fetchRestaurantByCuisineAndNeighborhood(r,s,(e,t)=>{e?console.error(e):(l(t),p())})},l=e=>{self.restaurants=[],document.getElementById("restaurants-list").innerHTML="",self.markers&&self.markers.forEach(e=>e.remove()),self.markers=[],self.restaurants=e},p=(e=self.restaurants)=>{const t=document.getElementById("restaurants-list");e.forEach(e=>{console.log(e),t.append(f(e))}),d()},f=e=>{const t=document.createElement("li"),n=document.createElement("img"),o=document.createElement("div");n.className="restaurant-img",n.setAttribute("alt",e.name),console.log("HELLOO"),n.src=DBHelper.imageUrlForRestaurant(e),console.log(n.src),o.append(n),t.append(o);const r=document.createElement("h1");r.innerHTML=e.name,t.append(r);const s=document.createElement("p");s.innerHTML=e.neighborhood,t.append(s);const i=document.createElement("p");i.innerHTML=e.address,t.append(i);const a=document.createElement("button");return a.classList="button button--success",a.innerHTML="View Details",a.setAttribute("aria-label",e.name+e.neighborhood+e.address+"View Details"),a.onclick=(()=>{const t=DBHelper.urlForRestaurant(e);window.location=t}),t.append(a),t},d=(e=self.restaurants)=>{e.forEach(e=>{const t=DBHelper.mapMarkerForRestaurant(e,o);t.on("click",function(){window.location.href=t.options.url}),self.markers.push(t)})}},function(e,t,n){!function(e){"use strict";function t(e){return new Promise(function(t,n){e.onsuccess=function(){t(e.result)},e.onerror=function(){n(e.error)}})}function n(e,n,o){var r,s=new Promise(function(s,i){t(r=e[n].apply(e,o)).then(s,i)});return s.request=r,s}function o(e,t,n){n.forEach(function(n){Object.defineProperty(e.prototype,n,{get:function(){return this[t][n]},set:function(e){this[t][n]=e}})})}function r(e,t,o,r){r.forEach(function(r){r in o.prototype&&(e.prototype[r]=function(){return n(this[t],r,arguments)})})}function s(e,t,n,o){o.forEach(function(o){o in n.prototype&&(e.prototype[o]=function(){return this[t][o].apply(this[t],arguments)})})}function i(e,t,o,r){r.forEach(function(r){r in o.prototype&&(e.prototype[r]=function(){return e=this[t],(o=n(e,r,arguments)).then(function(e){if(e)return new c(e,o.request)});var e,o})})}function a(e){this._index=e}function c(e,t){this._cursor=e,this._request=t}function u(e){this._store=e}function l(e){this._tx=e,this.complete=new Promise(function(t,n){e.oncomplete=function(){t()},e.onerror=function(){n(e.error)},e.onabort=function(){n(e.error)}})}function p(e,t,n){this._db=e,this.oldVersion=t,this.transaction=new l(n)}function f(e){this._db=e}o(a,"_index",["name","keyPath","multiEntry","unique"]),r(a,"_index",IDBIndex,["get","getKey","getAll","getAllKeys","count"]),i(a,"_index",IDBIndex,["openCursor","openKeyCursor"]),o(c,"_cursor",["direction","key","primaryKey","value"]),r(c,"_cursor",IDBCursor,["update","delete"]),["advance","continue","continuePrimaryKey"].forEach(function(e){e in IDBCursor.prototype&&(c.prototype[e]=function(){var n=this,o=arguments;return Promise.resolve().then(function(){return n._cursor[e].apply(n._cursor,o),t(n._request).then(function(e){if(e)return new c(e,n._request)})})})}),u.prototype.createIndex=function(){return new a(this._store.createIndex.apply(this._store,arguments))},u.prototype.index=function(){return new a(this._store.index.apply(this._store,arguments))},o(u,"_store",["name","keyPath","indexNames","autoIncrement"]),r(u,"_store",IDBObjectStore,["put","add","delete","clear","get","getAll","getKey","getAllKeys","count"]),i(u,"_store",IDBObjectStore,["openCursor","openKeyCursor"]),s(u,"_store",IDBObjectStore,["deleteIndex"]),l.prototype.objectStore=function(){return new u(this._tx.objectStore.apply(this._tx,arguments))},o(l,"_tx",["objectStoreNames","mode"]),s(l,"_tx",IDBTransaction,["abort"]),p.prototype.createObjectStore=function(){return new u(this._db.createObjectStore.apply(this._db,arguments))},o(p,"_db",["name","version","objectStoreNames"]),s(p,"_db",IDBDatabase,["deleteObjectStore","close"]),f.prototype.transaction=function(){return new l(this._db.transaction.apply(this._db,arguments))},o(f,"_db",["name","version","objectStoreNames"]),s(f,"_db",IDBDatabase,["close"]),["openCursor","openKeyCursor"].forEach(function(e){[u,a].forEach(function(t){e in t.prototype&&(t.prototype[e.replace("open","iterate")]=function(){var t,n=(t=arguments,Array.prototype.slice.call(t)),o=n[n.length-1],r=this._store||this._index,s=r[e].apply(r,n.slice(0,-1));s.onsuccess=function(){o(s.result)}})})}),[a,u].forEach(function(e){e.prototype.getAll||(e.prototype.getAll=function(e,t){var n=this,o=[];return new Promise(function(r){n.iterateCursor(e,function(e){e?(o.push(e.value),void 0===t||o.length!=t?e.continue():r(o)):r(o)})})})}),e.openDb=function(e,t,o){var r=n(indexedDB,"open",[e,t]),s=r.request;return s&&(s.onupgradeneeded=function(e){o&&o(new p(s.result,e.oldVersion,s.transaction))}),r.then(function(e){return new f(e)})},e.deleteDb=function(e){return n(indexedDB,"deleteDatabase",[e])},Object.defineProperty(e,"__esModule",{value:!0})}(t)},function(e,t,n){e.exports=n.p+"dd39ef5139edea6a350ba092faba499c.png"}]);