const C='mm12';
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(['./','index.html','manifest.json','icon-192.png'])));self.skipWaiting()});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=C).map(x=>caches.delete(x)))).then(()=>clients.claim())));
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!='GET')return;const own=u.origin==location.origin;if(!own&&!['cdn.jsdelivr.net','www.gstatic.com'].includes(u.host))return;
e.respondWith(caches.open(C).then(async c=>{
if(own)return fetch(e.request).then(r=>{r.ok&&c.put(e.request,r.clone());return r}).catch(()=>c.match(e.request));
const m=await c.match(e.request),n=fetch(e.request).then(r=>{c.put(e.request,r.clone());return r}).catch(()=>m);return m||n}))});
