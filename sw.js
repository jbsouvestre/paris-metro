var __wpo = {"assets":{"main":["./dist/main.ce96a47a5b70f5f1c32e.min.js","./"],"additional":[],"optional":[]},"hashesMap":{"3ce7dcdd862817c3e666eeb13bd7bd57":"./dist/main.ce96a47a5b70f5f1c32e.min.js","c85a7958e3ebf9114cafefa9584562db":"./"},"strategy":"all","version":"5/16/2016, 4:02:25 PM","name":"webpack-offline","relativePaths":true};

!function(n){function e(r){if(t[r])return t[r].exports;var o=t[r]={exports:{},id:r,loaded:!1};return n[r].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var t={};return e.m=n,e.c=t,e.p="",e(0)}([function(n,e,t){"use strict";function r(n){function e(){if(!l.additional.length)return Promise.resolve();var n=void 0;return n="changed"===f?r("additional"):t("additional"),n["catch"](function(n){console.error("[SW]:","Cache section `additional` failed to load")})}function t(e){var t=l[e];return caches.open(m).then(function(e){return o(e,t,{bust:n.version})}).then(function(){a("Cached assets: "+e,t)})["catch"](function(n){throw console.error(n),n})}function r(e){return c().then(function(r){if(!r)return t(e);var i=r[0],c=r[1],s=r[2],u=s.hashmap,f=s.version;if(!s.hashmap||f===n.version)return t(e);var d=Object.keys(u).map(function(n){return u[n]}),v=c.map(function(n){var e=new URL(n.url);return e.search="",e.toString()}),p=l[e],g=[],x=p.filter(function(n){return-1===v.indexOf(n)||-1===d.indexOf(n)});Object.keys(h).forEach(function(n){var e=h[n];if(-1!==p.indexOf(e)&&-1===x.indexOf(e)&&-1===g.indexOf(e)){var t=u[n];t&&-1!==v.indexOf(t)?g.push([t,e]):x.push(e)}}),a("Changed assets: "+e,x),a("Moved assets: "+e,g);var O=Promise.all(g.map(function(n){return i.match(n[0]).then(function(e){return[n[1],e]})}));return caches.open(m).then(function(e){var t=O.then(function(n){return Promise.all(n.map(function(n){return e.put(n[0],n[1])}))});return Promise.all([t,o(e,x,{bust:n.version})])})})}function i(){return caches.keys().then(function(n){var e=n.map(function(n){return 0===n.indexOf(v)&&0!==n.indexOf(m)?(console.log("[SW]:","Delete cache:",n),caches["delete"](n)):void 0});return Promise.all(e)})}function c(){return caches.keys().then(function(n){for(var e=n.length,t=void 0;e--&&(t=n[e],0!==t.indexOf(v)););if(t){var r=void 0;return caches.open(t).then(function(n){return r=n,n.match(new URL(g,location).toString())}).then(function(n){return n?Promise.all([r,r.keys(),n.json()]):void 0})}})}function s(){return caches.open(m).then(function(e){var t=new Response(JSON.stringify({version:n.version,hashmap:h}));return e.put(new URL(g,location).toString(),t)})}function u(){Object.keys(l).forEach(function(n){l[n]=l[n].map(function(n){var e=new URL(n,location);return e.search="",e.toString()})}),h=Object.keys(h).reduce(function(n,e){var t=new URL(h[e],location);return t.search="",n[e]=t.toString(),n},{})}var f=n.strategy,l=n.assets,h=n.hashesMap,d={all:n.version,changed:n.version},v=n.name,p=d[f],m=v+":"+p,g="__offline_webpack__data";u();var x=[].concat(l.main,l.additional,l.optional);self.addEventListener("install",function(n){console.log("[SW]:","Install event");var e=void 0;e="changed"===f?r("main"):t("main"),n.waitUntil(e)}),self.addEventListener("activate",function(n){console.log("[SW]:","Activate event");var t=e();t=t.then(s),t=t.then(i),t=t.then(function(){return self.clients&&self.clients.claim?self.clients.claim():void 0}),n.waitUntil(t)}),self.addEventListener("fetch",function(n){var e=new URL(n.request.url);e.search="";var t=e.toString();if("GET"!==n.request.method||-1===x.indexOf(t))return void(e.origin!==location.origin&&-1!==navigator.userAgent.indexOf("Firefox/44.")&&n.respondWith(fetch(n.request)));var r=caches.match(t,{cacheName:m})["catch"](function(){}).then(function(e){return e?e:fetch(n.request).then(function(n){if(!n||!n.ok)return n;var e=n.clone();return caches.open(m).then(function(n){return n.put(t,e)}).then(function(){console.log("[SW]:","Cache asset: "+t)}),n})});n.respondWith(r)}),self.addEventListener("message",function(n){var e=n.data;if(e)switch(e.action){case"skipWaiting":self.skipWaiting&&self.skipWaiting()}})}function o(n,e,t){var r=t&&t.bust;return Promise.all(e.map(function(n){return r&&(n=i(n,r)),fetch(n)})).then(function(t){if(t.some(function(n){return!n.ok}))return Promise.reject(new Error("Wrong response status"));var r=t.map(function(t,r){return n.put(e[r],t)});return Promise.all(r)})}function i(n,e){var t=-1!==n.indexOf("?");return n+(t?"&":"?")+"__uncache="+encodeURIComponent(e)}function a(n,e){console.groupCollapsed("[SW]:",n),e.forEach(function(n){console.log("Asset:",n)}),console.groupEnd()}t(1),r(__wpo),n.exports=t(2)},function(n,e){"use strict"},function(n,e){}]);