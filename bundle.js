!function(n){var e={};function t(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return n[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=n,t.c=e,t.d=function(n,e,r){t.o(n,e)||Object.defineProperty(n,e,{enumerable:!0,get:r})},t.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},t.t=function(n,e){if(1&e&&(n=t(n)),8&e)return n;if(4&e&&"object"==typeof n&&n&&n.__esModule)return n;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:n}),2&e&&"string"!=typeof n)for(var o in n)t.d(r,o,function(e){return n[e]}.bind(null,o));return r},t.n=function(n){var e=n&&n.__esModule?function(){return n.default}:function(){return n};return t.d(e,"a",e),e},t.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},t.p="/",t(t.s=1)}([function(n,e,t){n.exports=t.p+"dd39ef5139edea6a350ba092faba499c.png"},function(n,e,t){t(2),t(3),n.exports=t(5)},function(n,e){class t{static get DATABASE_URL(){return"http://localhost:1337/restaurants"}static fetchRestaurants(n){fetch(t.DATABASE_URL).then(function(e){e.json().then(function(e){n(null,e)})})}static fetchRestaurantById(n,e){t.fetchRestaurants((t,r)=>{if(t)e(t,null);else{const t=r.find(e=>e.id==n);t?e(null,t):e("Restaurant does not exist",null)}})}static fetchRestaurantByCuisine(n,e){t.fetchRestaurants((t,r)=>{if(t)e(t,null);else{const t=r.filter(e=>e.cuisine_type==n);e(null,t)}})}static fetchRestaurantByNeighborhood(n,e){t.fetchRestaurants((t,r)=>{if(t)e(t,null);else{const t=r.filter(e=>e.neighborhood==n);e(null,t)}})}static fetchRestaurantByCuisineAndNeighborhood(n,e,r){t.fetchRestaurants((t,o)=>{if(t)r(t,null);else{let t=o;"all"!=n&&(t=t.filter(e=>e.cuisine_type==n)),"all"!=e&&(t=t.filter(n=>n.neighborhood==e)),r(null,t)}})}static fetchNeighborhoods(n){t.fetchRestaurants((e,t)=>{if(e)n(e,null);else{const e=t.map((n,e)=>t[e].neighborhood),r=e.filter((n,t)=>e.indexOf(n)==t);n(null,r)}})}static fetchCuisines(n){t.fetchRestaurants((e,t)=>{if(e)n(e,null);else{const e=t.map((n,e)=>t[e].cuisine_type),r=e.filter((n,t)=>e.indexOf(n)==t);n(null,r)}})}static urlForRestaurant(n){return`./restaurant.html?id=${n.id}`}static imageUrlForRestaurant(n){return n.photograph?`/img/${n.photograph}.jpg`:`/img/${n.id}.jpg`}static mapMarkerForRestaurant(n,e){const r=new L.marker([n.latlng.lat,n.latlng.lng],{title:n.name,alt:n.name,url:t.urlForRestaurant(n)});return r.addTo(newMap),r}}window.DBHelper=t},function(n,e,t){"use strict";t.r(e);t(4);var r=t(0),o=t.n(r);var i;document.addEventListener("DOMContentLoaded",n=>{d(),s(),l(),a()});const a=()=>{const n=document.querySelector(".icon");var e=new Image;e.src=o.a,console.log("bye"),n.appendChild(e)},s=()=>{DBHelper.fetchNeighborhoods((n,e)=>{n?console.error(n):(self.neighborhoods=e,c())})},c=(n=self.neighborhoods)=>{const e=document.getElementById("neighborhoods-select");e.addEventListener("change",p),n.forEach(n=>{const t=document.createElement("option");t.innerHTML=n,t.value=n,e.append(t)})},l=()=>{DBHelper.fetchCuisines((n,e)=>{n?console.error(n):(self.cuisines=e,u())})},u=(n=self.cuisines)=>{const e=document.getElementById("cuisines-select");e.addEventListener("change",p),n.forEach(n=>{const t=document.createElement("option");t.innerHTML=n,t.value=n,e.append(t)})},d=()=>{i=L.map("map",{center:[40.722216,-73.987501],zoom:12,scrollWheelZoom:!1}),self.newMap=i,L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.jpg70?access_token={mapboxToken}",{mapboxToken:"pk.eyJ1Ijoid2VudGluIiwiYSI6ImNqaXJ0N25iZjFwdjYza3A4MGt1aHU2bjEifQ.DnNFUoN5uzw01l_XK_c7nQ",maxZoom:18,attribution:'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',id:"mapbox.streets"}).addTo(i),p()},p=()=>{const n=document.getElementById("cuisines-select"),e=document.getElementById("neighborhoods-select"),t=n.selectedIndex,r=e.selectedIndex,o=n[t].value,i=e[r].value;DBHelper.fetchRestaurantByCuisineAndNeighborhood(o,i,(n,e)=>{n?console.error(n):(f(e),h())})},f=n=>{self.restaurants=[],document.getElementById("restaurants-list").innerHTML="",self.markers&&self.markers.forEach(n=>n.remove()),self.markers=[],self.restaurants=n},h=(n=self.restaurants)=>{const e=document.getElementById("restaurants-list");n.forEach(n=>{console.log(n),e.append(m(n))}),g()},m=n=>{const e=document.createElement("li"),t=document.createElement("img"),r=document.createElement("div");t.className="restaurant-img",t.setAttribute("alt",n.name),console.log("HELLOO"),t.src=DBHelper.imageUrlForRestaurant(n),console.log(t.src),r.append(t),e.append(r);const o=document.createElement("h1");o.innerHTML=n.name,e.append(o);const i=document.createElement("p");i.innerHTML=n.neighborhood,e.append(i);const a=document.createElement("p");a.innerHTML=n.address,e.append(a);const s=document.createElement("button");return s.classList="button button--success",s.innerHTML="View Details",s.setAttribute("aria-label",n.name+n.neighborhood+n.address+"View Details"),s.onclick=(()=>{const e=DBHelper.urlForRestaurant(n);window.location=e}),e.append(s),e},g=(n=self.restaurants)=>{n.forEach(n=>{const e=DBHelper.mapMarkerForRestaurant(n,i);e.on("click",function(){window.location.href=e.options.url}),self.markers.push(e)})}},function(n,e,t){!function(n){"use strict";function e(n){return new Promise(function(e,t){n.onsuccess=function(){e(n.result)},n.onerror=function(){t(n.error)}})}function t(n,t,r){var o,i=new Promise(function(i,a){e(o=n[t].apply(n,r)).then(i,a)});return i.request=o,i}function r(n,e,t){t.forEach(function(t){Object.defineProperty(n.prototype,t,{get:function(){return this[e][t]},set:function(n){this[e][t]=n}})})}function o(n,e,r,o){o.forEach(function(o){o in r.prototype&&(n.prototype[o]=function(){return t(this[e],o,arguments)})})}function i(n,e,t,r){r.forEach(function(r){r in t.prototype&&(n.prototype[r]=function(){return this[e][r].apply(this[e],arguments)})})}function a(n,e,r,o){o.forEach(function(o){o in r.prototype&&(n.prototype[o]=function(){return n=this[e],(r=t(n,o,arguments)).then(function(n){if(n)return new c(n,r.request)});var n,r})})}function s(n){this._index=n}function c(n,e){this._cursor=n,this._request=e}function l(n){this._store=n}function u(n){this._tx=n,this.complete=new Promise(function(e,t){n.oncomplete=function(){e()},n.onerror=function(){t(n.error)},n.onabort=function(){t(n.error)}})}function d(n,e,t){this._db=n,this.oldVersion=e,this.transaction=new u(t)}function p(n){this._db=n}r(s,"_index",["name","keyPath","multiEntry","unique"]),o(s,"_index",IDBIndex,["get","getKey","getAll","getAllKeys","count"]),a(s,"_index",IDBIndex,["openCursor","openKeyCursor"]),r(c,"_cursor",["direction","key","primaryKey","value"]),o(c,"_cursor",IDBCursor,["update","delete"]),["advance","continue","continuePrimaryKey"].forEach(function(n){n in IDBCursor.prototype&&(c.prototype[n]=function(){var t=this,r=arguments;return Promise.resolve().then(function(){return t._cursor[n].apply(t._cursor,r),e(t._request).then(function(n){if(n)return new c(n,t._request)})})})}),l.prototype.createIndex=function(){return new s(this._store.createIndex.apply(this._store,arguments))},l.prototype.index=function(){return new s(this._store.index.apply(this._store,arguments))},r(l,"_store",["name","keyPath","indexNames","autoIncrement"]),o(l,"_store",IDBObjectStore,["put","add","delete","clear","get","getAll","getKey","getAllKeys","count"]),a(l,"_store",IDBObjectStore,["openCursor","openKeyCursor"]),i(l,"_store",IDBObjectStore,["deleteIndex"]),u.prototype.objectStore=function(){return new l(this._tx.objectStore.apply(this._tx,arguments))},r(u,"_tx",["objectStoreNames","mode"]),i(u,"_tx",IDBTransaction,["abort"]),d.prototype.createObjectStore=function(){return new l(this._db.createObjectStore.apply(this._db,arguments))},r(d,"_db",["name","version","objectStoreNames"]),i(d,"_db",IDBDatabase,["deleteObjectStore","close"]),p.prototype.transaction=function(){return new u(this._db.transaction.apply(this._db,arguments))},r(p,"_db",["name","version","objectStoreNames"]),i(p,"_db",IDBDatabase,["close"]),["openCursor","openKeyCursor"].forEach(function(n){[l,s].forEach(function(e){n in e.prototype&&(e.prototype[n.replace("open","iterate")]=function(){var e,t=(e=arguments,Array.prototype.slice.call(e)),r=t[t.length-1],o=this._store||this._index,i=o[n].apply(o,t.slice(0,-1));i.onsuccess=function(){r(i.result)}})})}),[s,l].forEach(function(n){n.prototype.getAll||(n.prototype.getAll=function(n,e){var t=this,r=[];return new Promise(function(o){t.iterateCursor(n,function(n){n?(r.push(n.value),void 0===e||r.length!=e?n.continue():o(r)):o(r)})})})}),n.openDb=function(n,e,r){var o=t(indexedDB,"open",[n,e]),i=o.request;return i&&(i.onupgradeneeded=function(n){r&&r(new d(i.result,n.oldVersion,i.transaction))}),o.then(function(n){return new p(n)})},n.deleteDb=function(n){return t(indexedDB,"deleteDatabase",[n])},Object.defineProperty(n,"__esModule",{value:!0})}(e)},function(n,e,t){var r=t(6);"string"==typeof r&&(r=[[n.i,r,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};t(8)(r,o);r.locals&&(n.exports=r.locals)},function(n,e,t){(n.exports=t(7)(!1)).push([n.i,'@charset "utf-8";\n/* CSS Document */\n* {\n  box-sizing: border-box;\n  margin:0;\n  padding:0;\n}\n\n/* Define base font-size here; most elements will inherit this. */\nhtml{\n    font-size:1em;      /* Assuming 16px... */\n    line-height:1.5;\n    font-family: Arial, Helvetica, sans-serif;\n    color: #333;\n}\n\nbody,td,th,p{\n\tfont-family: Arial, Helvetica, sans-serif;\n\tfont-size: 1em;\n\tcolor: #333;\n\tline-height: 1.5;\n}\nbody {\n  max-width: 1100px;\n\tbackground-color: #fdfdfd;\n\tmargin: 0 auto;\n\tposition:relative;\n}\n\nmain, section {\n  width: 100%;\n}\nul, li {\n\tfont-family: Arial, Helvetica, sans-serif;\n\tfont-size: 10pt;\n\tcolor: #333;\n}\na {\n\tcolor: orange;\n\ttext-decoration: none;\n}\na:hover, a:focus {\n\tcolor: #3397db;\n\ttext-decoration: none;\n}\na img{\n\tborder: none 0px #fff;\n}\nh1, h2, h3, h4, h5, h6 {\n  font-family: Arial, Helvetica, sans-serif;\n  margin: 0 0 20px;\n}\narticle, aside, canvas, details, figcaption, figure, footer, header, hgroup, menu, nav, section {\n\tdisplay: block;\n}\n.maincontent {\n  background-color: #f3f3f3;\n  min-height: 100%;\n}\n#footer {\n  background-color: #444;\n  color: #aaa;\n  font-size: 8pt;\n  letter-spacing: 1px;\n  padding: 25px;\n  text-align: center;\n  text-transform: uppercase;\n}\n\n.navigation h1 a:hover, .navigation h1 a:focus, a:focus, a:hover, button:hover,\nbutton:focus {\n  /*background: rgba(85,172,238 ,1);*/\n  color: rgba(85,172,238 ,1);\n  text-decoration: underline;\n  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .14),\n              0 3px 1px -2px rgba(0, 0, 0, .2),\n              0 1px 5px 0 rgba(0, 0, 0, .12);\n}\n#restaurants-list li button:hover, #restaurants-list li .button:focus,\n.filter-options select:hover, .filter-options select:focus {\n  background-color:rgba(85,172,238 ,1);\n  color: #fff;\n  text-decoration: underline;\n  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .14),\n              0 3px 1px -2px rgba(0, 0, 0, .2),\n              0 1px 5px 0 rgba(0, 0, 0, .12);\n}\n\n/* ====================== Navigation ====================== */\nheader {\n    width: 100%;\n    background: #333;\n}\nul {\n  padding: 0;\n  list-style: none;\n}\n.navigation {\n  display:flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0 10px;\n  color: rgba(117,117,117 ,1);\n}\n.navigation h1 {\n text-align: center;\n font-size: 1em;\n margin-bottom: 0;\n}\n\n.navigation li {\n  height: 100%;\n}\n\n.navigation .navigation__title {\n flex-grow: 1;\n}\n.navigation img {\n  width: 48px;\n  height: 48px;\n  background-color: white;\n}\n.navigation h1 a {\n  color: #fff;\n  font-size: 48px;\n  font-weight: 200;\n  letter-spacing: 10px;\n  margin: 10px auto;\n  font-family: \'Pacifico\', cursive;\n}\n#breadcrumb {\n    padding: 10px;\n    list-style: none;\n    background-color: #eee;\n    font-size: 17px;\n    margin: 0;\n    width: 100%;\n}\n\n/* Display list items side by side */\n#breadcrumb li {\n    display: inline;\n}\n\n/* Add a slash symbol (/) before/behind each list item */\n#breadcrumb li+li:before {\n    padding: 8px;\n    color: black;\n    content: "/\\00a0";\n}\n\n/* Add a color to all links inside the list */\n#breadcrumb li a {\n    color: #0275d8;\n    text-decoration: none;\n}\n\n/* Add a color on mouse-over */\n#breadcrumb li a:hover {\n    color: #01447e;\n    text-decoration: underline;\n}\n/* ====================== Map ====================== */\n#map {\n  height: 400px;\n  width: 100%;\n  background-color: #ccc;\n}\n/* ====================== Restaurant Filtering ====================== */\n.filter-options {\n  width: 100%;\n  background-color: #333;\n  align-items: center;\n}\n.filter-options h2 {\n  color: white;\n  font-size: 1rem;\n  font-weight: normal;\n  line-height: 1;\n  margin: 0 10px;\n  padding-top: 10px;\n}\n.filter-options select {\n  background-color: white;\n  border: 1px solid #fff;\n  font-family: Arial,sans-serif;\n  font-size: 11pt;\n  height: 35px;\n  letter-spacing: 0;\n  margin: 10px;\n  padding: 10px;\n  width: 200px;\n}\n.filter-label {\n  display: none;\n}\n\n.filter-section {\n  width: 100%;\n}\n\n/* ====================== Restaurant Listing ====================== */\n\n/*========\n===Flexbox on list and content\n========*/\n\n#restaurants-list {\n  display: flex;\n  flex-wrap: wrap;\n  width: 100%;\n  background-color: #f3f3f3;\n  list-style: outside none none;\n  margin: 0;\n  padding: 30px 15px 60px;\n  text-align: center;\n}\n#restaurants-list li {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  flex-grow: 1;\n  background-color: #fff;\n  border: 2px solid #ccc;\n  font-family: Arial,sans-serif;\n  margin: 15px;\n  min-height: 380px;\n  padding: 0 30px 25px;\n  text-align: left;\n  width: 100%;\n}\n#restaurants-list .restaurant-img {\n  background-color: #ccc;\n  display: block;\n  margin: 0;\n  max-width: 100%;\n  max-height: 300px;\n  min-width: 100%;\n}\n#restaurants-list li h1 {\n  color: #f18200;\n  font-family: Arial,sans-serif;\n  font-size: 14pt;\n  font-weight: 200;\n  letter-spacing: 0;\n  line-height: 1.3;\n  margin: 20px 0 10px;\n  text-transform: uppercase;\n\n}\n#restaurants-list p {\n  margin: 0;\n  font-size: 11pt;\n}\n#restaurants-list li button {\n  background-color: orange;\n  border-bottom: 3px solid #eee;\n  color: #fff;\n  display: inline-block;\n  font-size: 10pt;\n  margin: 15px 0 0;\n  padding: 8px 30px 10px;\n  text-align: center;\n  text-decoration: none;\n  text-transform: uppercase;\n}\n\n\n/* ====================== Restaurant Details ====================== */\n.inside header {\n  /*position: fixed;*/\n  /*top: 0;*/\n  width: 100%;\n  /*z-index: 1000;*/\n}\n.inside #map-container {\n  /*background: blue none repeat scroll 0 0;*/\n  height: 200px;\n  padding-bottom: 10px;\n}\n.inside #map {\n  background-color: #ccc;\n  height: 100%;\n  width: 100%;\n}\n.inside #footer {\n/*  bottom: 0;\n  position: absolute;*/\n  width: 100%;\n}\n#restaurant-name {\n  color: #f18200;\n  font-family: Arial,sans-serif;\n  font-size: 24pt;\n  font-weight: 200;\n  letter-spacing: 0;\n  margin: 10px auto;\n  text-transform: uppercase;\n  line-height: 1.1;\n}\n#restaurant-img {\n\twidth: 100%;\n  max-height: 80vh;\n}\n#restaurant-address {\n  font-size: 1.3em;\n  margin: 10px 0px;\n  width: 50%;\n}\n#restaurant-cuisine {\n  background-color: #333;\n  color: #ddd;\n  font-size: 1.2em;\n  font-weight: 300;\n  letter-spacing: 10px;\n  margin: 0 0 20px;\n  padding: 2px 0;\n  text-align: center;\n  text-transform: uppercase;\n\twidth: 100%;\n}\n#restaurant-container, #reviews-container {\n  border-bottom: 1px solid #d9d9d9;\n  border-top: 1px solid #fff;\n  padding: 20px;\n  width: 100%;\n  display:flex;\n  flex-wrap: wrap;\n}\n#reviews-container {\n  padding: 30px 40px 40px;\n}\n#reviews-container h2 {\n  color: #f58500;\n  font-size: 24pt;\n  font-weight: 300;\n  letter-spacing: -1px;\n  padding-bottom: 1pt;\n  margin: 0 auto;\n}\n#reviews-list {\n  margin: 0;\n  padding: 0;\n}\n#reviews-list li {\n  background-color: #fff;\n  border: 2px solid #f3f3f3;\n  display: block;\n  list-style-type: none;\n  margin: 0 0 30px;\n  overflow: hidden;\n  padding: 10px 20px 20px;\n  /*position: relative;*/\n  width: 100%;\n}\n#reviews-list li p {\n  margin: 0 0 10px;\n}\n#restaurant-hours {\n  width: 50%;\n}\n#restaurant-hours td {\n  color: #666;\n  font-size: 1em;\n}\n\n\n\n\n/*//////////\n// Media Queries\n//////////*/\n\n@media screen and (min-width: 1000px) {\n  #restaurants-list li {\n    max-width: 30%;\n  }\n}\n@media screen and (max-width: 999px) and (min-width: 671px) {\n  #restaurants-list li {\n    min-width: 290px;\n    width: 45%;\n    max-width: 45%;\n  }\n}\n\n@media screen and (max-width: 670px) {\n  header {\n    /*min-height: 50px;*/\n  }\n  #restaurants-list li {\n    max-width: 80%;\n    margin: 8px auto;\n  }\n  .navigation h1 a{\n    font-size: 2.6em;\n  }\n  .navigation img {\n    width: 30px;\n    height: 30px;\n  }\n}\n\n@media screen and (max-width: 540px) {\n\n  .navigation h1 a{\n    font-size: 1.7em;\n    display: inline-block;\n  }\n  .navigation img {\n    display: none;\n  }\n  .filter-options select {\n    width: 50%);\n  }\n  #restaurant-container h1, #reviews-container h2 {\n    font-size: 1.5em;\n  }\n  #restaurant-img {\n    width: 100%;\n    height: 400px;\n  }\n  #restaurant-address {\n    width: 100%;\n  }\n  #restaurant-hours {\n    width: 100%;\n  }\n  #restaurant-hours td {\n    font-size: 1em;\n  }\n  #restaurant-cuisine {\n    font-size: 1em;\n  }\n}\n@media screen and (max-width: 450px) {\n  .filter-options select {\n    width: calc(100% - 24px);\n    margin: 10px;\n  }\n  #reviews-container {\n    padding: 0;\n  }\n}\n',""])},function(n,e,t){"use strict";n.exports=function(n){var e=[];return e.toString=function(){return this.map(function(e){var t=function(n,e){var t=n[1]||"",r=n[3];if(!r)return t;if(e&&"function"==typeof btoa){var o=(a=r,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(a))))+" */"),i=r.sources.map(function(n){return"/*# sourceURL="+r.sourceRoot+n+" */"});return[t].concat(i).concat([o]).join("\n")}var a;return[t].join("\n")}(e,n);return e[2]?"@media "+e[2]+"{"+t+"}":t}).join("")},e.i=function(n,t){"string"==typeof n&&(n=[[null,n,""]]);for(var r={},o=0;o<this.length;o++){var i=this[o][0];null!=i&&(r[i]=!0)}for(o=0;o<n.length;o++){var a=n[o];null!=a[0]&&r[a[0]]||(t&&!a[2]?a[2]=t:t&&(a[2]="("+a[2]+") and ("+t+")"),e.push(a))}},e}},function(n,e,t){var r,o,i={},a=(r=function(){return window&&document&&document.all&&!window.atob},function(){return void 0===o&&(o=r.apply(this,arguments)),o}),s=function(n){var e={};return function(n,t){if("function"==typeof n)return n();if(void 0===e[n]){var r=function(n,e){return e?e.querySelector(n):document.querySelector(n)}.call(this,n,t);if(window.HTMLIFrameElement&&r instanceof window.HTMLIFrameElement)try{r=r.contentDocument.head}catch(n){r=null}e[n]=r}return e[n]}}(),c=null,l=0,u=[],d=t(9);function p(n,e){for(var t=0;t<n.length;t++){var r=n[t],o=i[r.id];if(o){o.refs++;for(var a=0;a<o.parts.length;a++)o.parts[a](r.parts[a]);for(;a<r.parts.length;a++)o.parts.push(x(r.parts[a],e))}else{var s=[];for(a=0;a<r.parts.length;a++)s.push(x(r.parts[a],e));i[r.id]={id:r.id,refs:1,parts:s}}}}function f(n,e){for(var t=[],r={},o=0;o<n.length;o++){var i=n[o],a=e.base?i[0]+e.base:i[0],s={css:i[1],media:i[2],sourceMap:i[3]};r[a]?r[a].parts.push(s):t.push(r[a]={id:a,parts:[s]})}return t}function h(n,e){var t=s(n.insertInto);if(!t)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var r=u[u.length-1];if("top"===n.insertAt)r?r.nextSibling?t.insertBefore(e,r.nextSibling):t.appendChild(e):t.insertBefore(e,t.firstChild),u.push(e);else if("bottom"===n.insertAt)t.appendChild(e);else{if("object"!=typeof n.insertAt||!n.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var o=s(n.insertAt.before,t);t.insertBefore(e,o)}}function m(n){if(null===n.parentNode)return!1;n.parentNode.removeChild(n);var e=u.indexOf(n);e>=0&&u.splice(e,1)}function g(n){var e=document.createElement("style");if(void 0===n.attrs.type&&(n.attrs.type="text/css"),void 0===n.attrs.nonce){var r=function(){0;return t.nc}();r&&(n.attrs.nonce=r)}return b(e,n.attrs),h(n,e),e}function b(n,e){Object.keys(e).forEach(function(t){n.setAttribute(t,e[t])})}function x(n,e){var t,r,o,i;if(e.transform&&n.css){if(!(i="function"==typeof e.transform?e.transform(n.css):e.transform.default(n.css)))return function(){};n.css=i}if(e.singleton){var a=l++;t=c||(c=g(e)),r=w.bind(null,t,a,!1),o=w.bind(null,t,a,!0)}else n.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(t=function(n){var e=document.createElement("link");return void 0===n.attrs.type&&(n.attrs.type="text/css"),n.attrs.rel="stylesheet",b(e,n.attrs),h(n,e),e}(e),r=function(n,e,t){var r=t.css,o=t.sourceMap,i=void 0===e.convertToAbsoluteUrls&&o;(e.convertToAbsoluteUrls||i)&&(r=d(r));o&&(r+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */");var a=new Blob([r],{type:"text/css"}),s=n.href;n.href=URL.createObjectURL(a),s&&URL.revokeObjectURL(s)}.bind(null,t,e),o=function(){m(t),t.href&&URL.revokeObjectURL(t.href)}):(t=g(e),r=function(n,e){var t=e.css,r=e.media;r&&n.setAttribute("media",r);if(n.styleSheet)n.styleSheet.cssText=t;else{for(;n.firstChild;)n.removeChild(n.firstChild);n.appendChild(document.createTextNode(t))}}.bind(null,t),o=function(){m(t)});return r(n),function(e){if(e){if(e.css===n.css&&e.media===n.media&&e.sourceMap===n.sourceMap)return;r(n=e)}else o()}}n.exports=function(n,e){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(e=e||{}).attrs="object"==typeof e.attrs?e.attrs:{},e.singleton||"boolean"==typeof e.singleton||(e.singleton=a()),e.insertInto||(e.insertInto="head"),e.insertAt||(e.insertAt="bottom");var t=f(n,e);return p(t,e),function(n){for(var r=[],o=0;o<t.length;o++){var a=t[o];(s=i[a.id]).refs--,r.push(s)}n&&p(f(n,e),e);for(o=0;o<r.length;o++){var s;if(0===(s=r[o]).refs){for(var c=0;c<s.parts.length;c++)s.parts[c]();delete i[s.id]}}}};var y,v=(y=[],function(n,e){return y[n]=e,y.filter(Boolean).join("\n")});function w(n,e,t,r){var o=t?"":r.css;if(n.styleSheet)n.styleSheet.cssText=v(e,o);else{var i=document.createTextNode(o),a=n.childNodes;a[e]&&n.removeChild(a[e]),a.length?n.insertBefore(i,a[e]):n.appendChild(i)}}},function(n,e){n.exports=function(n){var e="undefined"!=typeof window&&window.location;if(!e)throw new Error("fixUrls requires window.location");if(!n||"string"!=typeof n)return n;var t=e.protocol+"//"+e.host,r=t+e.pathname.replace(/\/[^\/]*$/,"/");return n.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(n,e){var o,i=e.trim().replace(/^"(.*)"$/,function(n,e){return e}).replace(/^'(.*)'$/,function(n,e){return e});return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(i)?n:(o=0===i.indexOf("//")?i:0===i.indexOf("/")?t+i:r+i.replace(/^\.\//,""),"url("+JSON.stringify(o)+")")})}}]);