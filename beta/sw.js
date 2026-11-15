// 寶哥畫空間 平板版 — 離線快取（版本 1.15.0-beta-202611151316）
// 第一次開啟時把整個 App 存到平板上，之後沒有網路也能用；有新版本時自動下載，回案場列表時套用。
const CACHE = 'glbg-beta-1.15.0-beta-202611151316';
const FILES = [
  "./",
  "./app.css",
  "./app.js",
  "./chunks/chunk-3QAJGOCR.js",
  "./chunks/chunk-FCPHGU7T.js",
  "./chunks/chunk-J4VYA7HK.js",
  "./chunks/chunk-MDKPKOJX.js",
  "./chunks/chunk-PP5NXC5D.js",
  "./chunks/chunk-RX7KPBZG.js",
  "./chunks/chunk-UTY7AQCZ.js",
  "./chunks/chunk-WC3YB5ZV.js",
  "./chunks/chunk-XJZ65WCE.js",
  "./chunks/chunk-XR53OXLB.js",
  "./chunks/drawing-DBVG6Z4C.js",
  "./chunks/dxf-MNBQ47UE.js",
  "./chunks/export-MSD3BWKI.js",
  "./chunks/pdf-OC6QNGSP.js",
  "./chunks/photowall-R57WSBYU.js",
  "./chunks/render-CVFQR6EI.js",
  "./chunks/report-SRLGZUKH.js",
  "./chunks/reportview-3PZPBXG3.js",
  "./chunks/shoot-GMCXWDCB.js",
  "./chunks/xlsx-ZVAI44LR.js",
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
    .then((keys) => Promise.all(keys.filter((k) => k.startsWith('glbg-beta-') && k !== CACHE).map((k) => caches.delete(k))))
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
