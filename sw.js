const C='mm4';
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(['./','index.html','manifest.json','icon-192.png'])));self.skipWaiting()});
self.addEventListener('activate',e=>e.waitUntil(clients.claim()));
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!='GET'||!(u.origin==location.origin||u.host=='cdn.jsdelivr.net'))return;
e.respondWith(caches.open(C).then(async c=>{const m=await c.match(e.request);const n=fetch(e.request).then(r=>{c.put(e.request,r.clone());return r}).catch(()=>m);return m||n}))});
