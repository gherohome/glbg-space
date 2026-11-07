// 寶哥畫空間 平板版 — 離線快取（版本 1.9.0-202611071735）
// 第一次開啟時把整個 App 存到平板上，之後沒有網路也能用；有新版本時自動下載，回案場列表時套用。
const CACHE = 'glbg-space-1.9.0-202611071735';
const FILES = [
  "./",
  "./app.css",
  "./app.js",
  "./chunks/chunk-246JY6NH.js",
  "./chunks/chunk-3QAJGOCR.js",
  "./chunks/chunk-5WQ5VFSH.js",
  "./chunks/chunk-6SJ7E46A.js",
  "./chunks/chunk-FCPHGU7T.js",
  "./chunks/chunk-GZSNPPBS.js",
  "./chunks/chunk-IDKVSD27.js",
  "./chunks/chunk-PP5NXC5D.js",
  "./chunks/chunk-S74JNB4V.js",
  "./chunks/chunk-UTY7AQCZ.js",
  "./chunks/drawing-2KRJUEGO.js",
  "./chunks/dxf-MNBQ47UE.js",
  "./chunks/export-OTYDOLPF.js",
  "./chunks/pdf-OC6QNGSP.js",
  "./chunks/photowall-R57WSBYU.js",
  "./chunks/render-3HLPLJHF.js",
  "./chunks/report-QGPKBY2V.js",
  "./chunks/reportview-ZRSJ3QPA.js",
  "./chunks/shoot-4GEXQ5UL.js",
  "./chunks/xlsx-26WCHSR7.js",
  "./dxf_template.dxf",
  "./icons/favicon-32.png",
  "./icons/icon-180.png",
  "./icons/icon-192.png",
  "./icons/icon-512-maskable.png",
  "./icons/icon-512.png",
  "./index.html",
  "./manifest.webmanifest",
  "./sounds/click.wav",
  "./sounds/click_bell.wav",
  "./sounds/click_pop.wav",
  "./sounds/click_tick.wav",
  "./sounds/click_wood.wav"
];
// PDF 用的中文字型（3.8 MB）：放在固定名稱的快取，改版不用重新下載
const FONT_CACHE = 'glbg-fonts-v1';
const FONTS = [
  "./fonts/tc-bold.ttf.gz",
  "./fonts/tc-regular.ttf.gz"
];

self.addEventListener('install', (e) => {
  e.waitUntil(Promise.all([
    caches.open(CACHE).then((c) => c.addAll(FILES)),
    caches.open(FONT_CACHE).then(async (c) => {
      for (const f of FONTS) {
        if (!(await c.match(f))) await c.add(f);
      }
    }),
  ]).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys()
    .then((keys) => Promise.all(keys.filter((k) => k.startsWith('glbg-space-') && k !== CACHE).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  e.respondWith(
    caches.match(req, { ignoreSearch: true }).then((hit) => hit || fetch(req).then((res) => {
      if (res && res.ok && res.type === 'basic') {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copy));
      }
      return res;
    }).catch(() => caches.match('./index.html'))),
  );
});
