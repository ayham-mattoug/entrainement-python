// Service worker : rend l'appli installable et utilisable hors ligne.
// - Fichiers de l'appli : réseau d'abord (pour recevoir les mises à jour), cache si hors ligne.
// - Bibliothèques (CodeMirror, Pyodide) : cache d'abord, car leurs adresses ont un numéro de version.
const VERSION = "v1";
const CACHE_APPLI = "appli-" + VERSION;
const CACHE_LIBS = "libs-" + VERSION;
const FICHIERS = [
  "./",
  "index.html",
  "exercices.js",
  "worker.js",
  "manifest.json",
  "icons/icon-192.png",
  "icons/icon-512.png",
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE_APPLI).then((c) => c.addAll(FICHIERS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((cles) => Promise.all(cles.filter((k) => k !== CACHE_APPLI && k !== CACHE_LIBS).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.pathname.includes("/api/")) return; // jamais en cache

  if (url.origin === self.location.origin) {
    e.respondWith(
      fetch(req)
        .then((rep) => {
          const copie = rep.clone();
          caches.open(CACHE_APPLI).then((c) => c.put(req, copie));
          return rep;
        })
        .catch(() => caches.match(req, { ignoreSearch: true }))
    );
  } else if (url.hostname === "cdn.jsdelivr.net" || url.hostname === "cdnjs.cloudflare.com") {
    e.respondWith(
      caches.match(req).then((trouve) => trouve || fetch(req).then((rep) => {
        if (rep.ok || rep.type === "opaque") {
          const copie = rep.clone();
          caches.open(CACHE_LIBS).then((c) => c.put(req, copie));
        }
        return rep;
      }))
    );
  }
});
