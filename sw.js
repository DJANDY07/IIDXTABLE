const C = 'iidx-table-1128966';
const FILES = ["./", "./index.html", "./manifest.webmanifest", "./icon.svg", "./fonts/inter.woff2", "./fonts/archivo.woff2", "./fonts/plexmono-400.woff2", "./fonts/plexmono-600.woff2", "./fonts/caveat.woff2", "./fonts/oswald.woff2", "./fonts/notosanssc.woff2", "./fonts/fusion-pixel.woff2"];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(C).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(ks => Promise.all(ks.filter(k => k !== C).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request)
      .then(r => { const cp = r.clone(); caches.open(C).then(c => c.put(e.request, cp)); return r; })
      .catch(() => caches.match(e.request).then(r => r || caches.match('./index.html')))
  );
});
