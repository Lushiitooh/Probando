/* Service worker de Pokechill.
   Estrategia deliberada:
     - El "cascarón" (html/js/css/fuentes) va por red primero y cae a caché.
       Así una actualización se ve al recargar y no hay que pelearse con
       versiones pegadas, que es justo el problema que sufrimos al desarrollar.
     - Las imágenes van por caché primero: son 20 MB que nunca cambian.
*/

// Al subir este número, el evento activate borra todas las cachés anteriores.
// Hay que subirlo cuando cambie la forma de cachear, para que nadie se quede
// con una caché envenenada de la versión anterior.
const VERSION = 'pokechill-v2';
const CASCARA = [
  './', './index.html', './styles.css',
  './scripts/HackTimer.js', './scripts/fuse.js',
  './scripts/moveDictionary.js', './scripts/itemDictionary.js',
  './scripts/pkmnDictionary.js', './scripts/areasDictionary.js',
  './scripts/es.js', './scripts/script.js', './scripts/teams.js',
  './scripts/explore.js', './scripts/shop.js', './scripts/dictionarySearch.js',
  './scripts/tooltip.js', './scripts/decor.js',
  './scripts/extras.js', './scripts/progreso.js', './scripts/paneles.js',
  './scripts/combate2.js', './scripts/coleccion.js', './scripts/paneles2.js',
  './scripts/extras2.js', './scripts/paneles3.js',
  './scripts/asesor.js', './scripts/paneles4.js',
  './scripts/auto.js', './scripts/prestigio2.js', './scripts/combate3.js',
  './scripts/economia.js', './scripts/social.js', './scripts/paneles5.js',
  './scripts/PR/challengesDictionary.js', './scripts/PR/challenges.js',
  './scripts/modos.js', './scripts/panelesModos.js',
  './scripts/save.js',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(CASCARA)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;

  const esImagen = /\.(png|jpg|jpeg|gif|webp|ttf|woff2?)$/i.test(new URL(req.url).pathname);

  if (esImagen) {
    // caché primero: los sprites no cambian nunca
    e.respondWith(
      caches.match(req).then(hit => hit || fetch(req).then(res => {
        const copia = res.clone();
        caches.open(VERSION).then(c => c.put(req, copia));
        return res;
      }).catch(() => hit))
    );
    return;
  }

  // Red primero para el código, y BYPASSEANDO la caché HTTP del navegador.
  // Sin el cache:'reload' esto no funcionaba: el fetch de aquí dentro se
  // resolvía contra la caché del navegador y devolvía el archivo viejo, que
  // además se volvía a guardar. Resultado: publicabas un cambio, recargabas,
  // y seguías ejecutando el código de antes sin ninguna pista de por qué.
  e.respondWith(
    fetch(req, { cache: 'reload' }).then(res => {
      const copia = res.clone();
      caches.open(VERSION).then(c => c.put(req, copia));
      return res;
    }).catch(() => fetch(req).catch(() => caches.match(req)))
  );
});
