// 寶哥畫空間 平板版 — 離線快取（版本 1.8.0-202611071605）
// 第一次開啟時把整個 App 存到平板上，之後沒有網路也能用；有新版本時自動下載，回案場列表時套用。
const CACHE = 'glbg-space-1.8.0-202611071605';
const FILES = [
  "./",
  "./app.css",
  "./app.js",
  "./chunks/chunk-3QAJGOCR.js",
  "./chunks/chunk-6GKKVAM3.js",
  "./chunks/chunk-7NWGC3QB.js",
  "./chunks/chunk-FCPHGU7T.js",
  "./chunks/chunk-IKBCAHLL.js",
  "./chunks/chunk-PP5NXC5D.js",
  "./chunks/chunk-RVHDIIN6.js",
  "./chunks/chunk-UTY7AQCZ.js",
  "./chunks/chunk-V34AADLM.js",
  "./chunks/chunk-VHA77EVY.js",
  "./chunks/drawing-S5YT7MOA.js",
  "./chunks/dxf-MNBQ47UE.js",
  "./chunks/export-7PNHUJNM.js",
  "./chunks/pdf-OC6QNGSP.js",
  "./chunks/photowall-R57WSBYU.js",
  "./chunks/render-Q5FKRTIG.js",
  "./chunks/report-CLNQAGIJ.js",
  "./chunks/reportview-TC4BAMHA.js",
  "./chunks/shoot-H5X6EACA.js",
  "./chunks/xlsx-EOOG54KO.js",
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
