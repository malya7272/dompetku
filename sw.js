// Service worker Dompetku: app shell offline. Naikkan nomor V saat file app shell berubah.
const V='dompetku-v5',SHELL=['./','index.html','manifest.webmanifest','icons/icon-192.png','icons/icon-512.png','icons/favicon.svg'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
 const r=e.request,u=new URL(r.url);
 if(r.method!=='GET')return;
 if(r.mode==='navigate'){e.respondWith(fetch(r).then(x=>{const c=x.clone();caches.open(V).then(h=>h.put('index.html',c));return x}).catch(()=>caches.match('index.html')));return}
 const font=/(^|\.)(fonts\.googleapis\.com|fonts\.gstatic\.com)$/.test(u.hostname);
 if(u.origin!==location.origin&&!font)return;
 e.respondWith(caches.match(r).then(m=>{const n=fetch(r).then(x=>{if(x.ok||x.type==='opaque'){const c=x.clone();caches.open(V).then(h=>h.put(r,c))}return x}).catch(()=>m);return m||n}))});
