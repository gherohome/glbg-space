import"./chunk-UTY7AQCZ.js";var r=`<!DOCTYPE html>
<html lang="zh-Hant">
<head>
<meta charset="utf-8">
<title>寶哥照片量牆</title>
<style>
  :root { --red: #e0301e; --green: #12a150; --line: #d5d8dc; --muted: #6b7178; --bg: #f4f5f7; }
  html, body { margin: 0; height: 100%; font-family: "Microsoft JhengHei", "PingFang TC", "Noto Sans CJK TC", sans-serif; font-size: 13px; color: #222; background: var(--bg); overflow: hidden; }
  #main { display: flex; height: 100%; }
  #stage { position: relative; flex: 1 1 auto; background: #2b2d31; overflow: hidden; }
  #cv { position: absolute; left: 0; top: 0; width: 100%; height: 100%; cursor: crosshair; }
  #loupe { position: absolute; left: 10px; top: 10px; width: 180px; height: 180px; border: 2px solid #fff; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,.5); display: none; background: #000; }
  #hint { position: absolute; left: 50%; top: 10px; transform: translateX(-50%); background: rgba(0,0,0,.72); color: #fff; padding: 6px 14px; border-radius: 16px; font-size: 14px; display: none; white-space: nowrap; }
  #empty { position: absolute; left: 0; right: 0; top: 45%; text-align: center; color: #c9ccd1; font-size: 16px; }
  #busy { position: absolute; right: 12px; bottom: 12px; background: rgba(0,0,0,.72); color: #fff; padding: 6px 12px; border-radius: 4px; display: none; }
  #side { flex: 0 0 300px; width: 300px; overflow-y: auto; background: #fff; border-left: 1px solid var(--line); padding: 10px 12px 16px; box-sizing: border-box; }
  h1 { font-size: 17px; margin: 2px 0 10px; }
  h2 { font-size: 14px; margin: 0 0 6px; }
  section { border-top: 1px solid var(--line); padding: 10px 0; }
  .row { display: flex; align-items: center; margin: 5px 0; }
  .row > * { margin-right: 6px; }
  button { font: inherit; padding: 5px 10px; border: 1px solid #b9bec5; background: #f7f8fa; border-radius: 4px; cursor: pointer; }
  button:hover { background: #eceef1; }
  button.primary { background: #1f6feb; border-color: #1f6feb; color: #fff; width: 100%; padding: 7px 10px; font-size: 14px; }
  button.primary:hover { background: #1a5fca; }
  button:disabled { opacity: .45; cursor: default; }
  input[type=number] { width: 64px; font: inherit; padding: 3px 4px; }
  select { font: inherit; padding: 3px; width: 100%; }
  .small { color: var(--muted); font-size: 12px; line-height: 1.5; }
  .status { font-size: 12px; margin-top: 4px; line-height: 1.5; }
  .ok { color: var(--green); } .bad { color: var(--red); }
  #result { font-size: 13px; line-height: 1.6; }
  #result .big { font-size: 20px; font-weight: bold; }
  .warn { color: #b45309; font-size: 12px; line-height: 1.5; margin: 4px 0; }
  details { border-top: 1px solid var(--line); padding-top: 8px; }
  summary { cursor: pointer; font-weight: bold; }
  ul { padding-left: 18px; margin: 6px 0; }
  #previewModal { position: fixed; left: 0; top: 0; right: 0; bottom: 0; background: rgba(0,0,0,.6); display: none; align-items: center; justify-content: center; }
  #previewModal .box { background: #fff; border-radius: 6px; padding: 8px; max-width: 96%; max-height: 96%; overflow: auto; }
  #previewModal .bar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; font-weight: bold; }
  #pv { display: block; }
</style>
</head>
<body>
<div id="main">
  <div id="stage">
    <canvas id="cv"></canvas>
    <canvas id="loupe" width="180" height="180"></canvas>
    <div id="hint"></div>
    <div id="empty">請先按右邊的「選擇照片」</div>
    <div id="busy">處理中…</div>
  </div>
  <div id="side">
    <h1 id="appTitle">寶哥照片量牆</h1>
    <div>
      <button id="btnPick" class="primary">選擇照片</button>
      <input type="file" id="fileInput" accept="image/jpeg,image/png" style="display:none">
      <div id="fileInfo" class="small"></div>
    </div>
    <section>
      <h2>① 參考紙</h2>
      <div class="row"><span>尺寸</span><input id="refW" type="number" min="10" step="0.5"><span>×</span><input id="refH" type="number" min="10" step="0.5"><span>mm</span></div>
      <div class="small">預設 A4（210 × 297），直貼、橫貼都可以</div>
      <div class="row"><button id="btnDetect">自動找粉紅紙</button><button id="btnPaperManual">手動點紙的四角</button></div>
      <div id="paperStatus" class="status"></div>
    </section>
    <section>
      <h2>② 牆的四個角</h2>
      <div class="row"><button id="btnWall">重新點牆角</button><button id="btnWallClear">清除</button></div>
      <label class="row"><input type="checkbox" id="snap"> 自動吸附牆邊線</label>
      <div id="wallStatus" class="status"></div>
    </section>
    <section>
      <h2>③ 拍攝鏡頭</h2>
      <select id="lens">
        <option value="auto">自動（讀取照片資料）</option>
        <option value="none">不指定（用參考紙推算比例）</option>
        <option value="13">手機 0.5×（13 mm）</option>
        <option value="24">iPhone Pro 1×（24 mm）</option>
        <option value="26">iPhone 1×（26 mm）</option>
        <option value="custom">自訂等效焦距</option>
      </select>
      <div class="row" id="customRow"><span>等效焦距</span><input id="customF" type="number" min="5" step="0.1"><span>mm</span></div>
      <div id="lensStatus" class="small"></div>
    </section>
    <section>
      <h2>④ 結果</h2>
      <div id="result" class="small">還沒有結果</div>
      <div id="warn" class="warn"></div>
      <div class="row"><button id="btnPreview" disabled>預覽校正正視圖</button></div>
      <label class="row"><input type="checkbox" id="addDims"> 加上尺寸標註</label>
      <button id="btnDraw" class="primary" disabled>在 SketchUp 畫出牆面</button>
      <div id="drawStatus" class="small"></div>
    </section>
    <section id="roomSec" style="display:none">
      <h2>⑤ 帶入寶哥畫空間</h2>
      <div class="small">量完一面牆，指定它是空間的「長」或「寬」；可以換照片再量另一面。只量一面也可以，另一邊在建立視窗裡填。</div>
      <div class="row"><button id="btnAsL" disabled>這面設為 長 L</button><button id="btnAsW" disabled>這面設為 寬 W</button></div>
      <div class="small">長 L＝牆A／牆C 的長，寬 W＝牆B／牆D 的長</div>
      <div id="roomVals" class="status"></div>
      <div class="row"><button id="btnRoom" class="primary" disabled>建立空間</button></div>
      <div class="row"><button id="btnRoomClear">清除長寬記錄</button></div>
      <div id="roomStatus" class="small"></div>
    </section>
    <details>
      <summary>操作說明</summary>
      <ul class="small">
        <li>滾輪：縮放。拖曳空白處（或按住右鍵拖曳）：移動畫面。F 鍵：整張顯示</li>
        <li>拖曳圓點可微調位置，拖曳時左上角有放大鏡；按住 Shift 拖曳可細調</li>
        <li>點一下圓點選取後，可用方向鍵微調（按住 Shift 移動較多）</li>
        <li>點牆角順序：左上 → 右上 → 右下 → 左下。被擋住的角，點在估計的位置即可</li>
        <li>紅色實線＝已吸附到牆邊，虛線＝使用你點的位置</li>
        <li>只有和參考紙在同一平面的東西才量得準</li>
        <li>用原始照片最準（LINE 傳過的照片會變模糊、也沒有鏡頭資料）</li>
      </ul>
    </details>
  </div>
</div>
<div id="previewModal"><div class="box"><div class="bar"><span>校正正視圖（藍色格線每格 500 mm）</span><button id="btnClosePreview">關閉</button></div><canvas id="pv"></canvas></div></div>
<script src="geom.js"><\/script>
<script src="imgproc.js"><\/script>
<script src="exif.js"><\/script>
<script src="view.js"><\/script>
<script src="app.js"><\/script>
</body>
</html>
`;var i=`/* 寶哥照片量牆 - geometry (ES2017, no dependencies)
 * Image coordinates: pixel centres at integer positions, x right, y down.
 * World (wall) coordinates: millimetres, x right, y down, origin = paper top-left.
 */
(function (root) {
  'use strict';
  var G = {};
  var SENSOR_DIAG_35MM = 43.2666;   // diagonal of a 36 x 24 mm frame

  // ---------- vectors / 3x3 matrices ----------
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function dot(a, b) { var s = 0; for (var i = 0; i < a.length; i++) s += a[i] * b[i]; return s; }
  function norm(a) { return Math.sqrt(dot(a, a)); }
  function unit(a) { var n = norm(a); return a.map(function (v) { return v / n; }); }
  function sub2(a, b) { return [a[0] - b[0], a[1] - b[1]]; }
  function dist2(a, b) { return Math.hypot(a[0] - b[0], a[1] - b[1]); }
  function mmul(A, B) {
    var C = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    for (var i = 0; i < 3; i++) for (var j = 0; j < 3; j++) for (var k = 0; k < 3; k++) C[i][j] += A[i][k] * B[k][j];
    return C;
  }
  function mvec(A, v) { return [dot(A[0], v), dot(A[1], v), dot(A[2], v)]; }
  function minv(m) {
    var a = m[0][0], b = m[0][1], c = m[0][2], d = m[1][0], e = m[1][1], f = m[1][2], g = m[2][0], h = m[2][1], i = m[2][2];
    var A = e * i - f * h, B = -(d * i - f * g), C = d * h - e * g;
    var det = a * A + b * B + c * C;
    return [[A / det, -(b * i - c * h) / det, (b * f - c * e) / det],
            [B / det, (a * i - c * g) / det, -(a * f - c * d) / det],
            [C / det, -(a * h - b * g) / det, (a * e - b * d) / det]];
  }
  function applyH(H, p) { var v = mvec(H, [p[0], p[1], 1]); return [v[0] / v[2], v[1] / v[2]]; }
  function hom(p) { return [p[0], p[1], 1]; }
  function lineThrough(p, q) { return cross(hom(p), hom(q)); }
  function lineFromPointDir(p, d) { return cross(hom(p), [p[0] + d[0], p[1] + d[1], 1]); }
  function intersect(l1, l2) { var x = cross(l1, l2); return [x[0] / x[2], x[1] / x[2]]; }

  // Gaussian elimination with partial pivoting, solves A x = b (A n x n)
  function solve(A, b) {
    var n = b.length, M = A.map(function (r, i) { return r.slice().concat([b[i]]); });
    for (var c = 0; c < n; c++) {
      var p = c;
      for (var r = c + 1; r < n; r++) if (Math.abs(M[r][c]) > Math.abs(M[p][c])) p = r;
      var t = M[c]; M[c] = M[p]; M[p] = t;
      for (r = c + 1; r < n; r++) {
        var f = M[r][c] / M[c][c];
        for (var k = c; k <= n; k++) M[r][k] -= f * M[c][k];
      }
    }
    var x = new Array(n);
    for (var i = n - 1; i >= 0; i--) {
      var s = M[i][n];
      for (var j = i + 1; j < n; j++) s -= M[i][j] * x[j];
      x[i] = s / M[i][i];
    }
    return x;
  }

  // exact homography from 4 point pairs (like cv2.getPerspectiveTransform)
  function homography4(src, dst) {
    var A = [], b = [];
    for (var i = 0; i < 4; i++) {
      var x = src[i][0], y = src[i][1], u = dst[i][0], v = dst[i][1];
      A.push([x, y, 1, 0, 0, 0, -u * x, -u * y]); b.push(u);
      A.push([0, 0, 0, x, y, 1, -v * x, -v * y]); b.push(v);
    }
    var h = solve(A, b);
    return [[h[0], h[1], h[2]], [h[3], h[4], h[5]], [h[6], h[7], 1]];
  }

  // ---------- robust total-least-squares line fit ----------
  // robustInit: start from a least-median-of-squares line (use for edges that may contain other objects).
  // Without it the fit starts from all points (validated behaviour for the reference sheet's edges).
  function fitLineTLS(P, iters, robustInit) {
    iters = iters || 6;
    var n = P.length, keep = robustInit ? lmedsInit(P) : new Array(n).fill(true), c, d, res = new Array(n), it;
    for (it = 0; it < iters; it++) {
      var sx = 0, sy = 0, m = 0, i;
      for (i = 0; i < n; i++) if (keep[i]) { sx += P[i][0]; sy += P[i][1]; m++; }
      if (m < 2) break;
      c = [sx / m, sy / m];
      var xx = 0, xy = 0, yy = 0;
      for (i = 0; i < n; i++) if (keep[i]) { var dx = P[i][0] - c[0], dy = P[i][1] - c[1]; xx += dx * dx; xy += dx * dy; yy += dy * dy; }
      var ang = 0.5 * Math.atan2(2 * xy, xx - yy);          // principal direction
      d = [Math.cos(ang), Math.sin(ang)];
      var nr = [-d[1], d[0]];
      var kept = [];
      for (i = 0; i < n; i++) { res[i] = (P[i][0] - c[0]) * nr[0] + (P[i][1] - c[1]) * nr[1]; if (keep[i]) kept.push(res[i]); }
      var med = median(kept), dev = median(kept.map(function (v) { return Math.abs(v - med); })) * 1.4826 + 1e-6;
      var thr = Math.max(3 * dev, 0.35), changed = false;
      for (i = 0; i < n; i++) { var k = Math.abs(res[i]) < thr; if (k !== keep[i]) changed = true; keep[i] = k; }
      if (!changed) break;
    }
    var ss = 0, cnt = 0;
    for (var j = 0; j < n; j++) if (keep[j]) { ss += res[j] * res[j]; cnt++; }
    return { p: c, d: d, keep: keep, inliers: cnt, rms: Math.sqrt(ss / Math.max(cnt, 1)) };
  }
  // least-median-of-squares start: robust against a minority of gross outliers (high leverage)
  function lmedsInit(P) {
    var n = P.length, keep = new Array(n).fill(true);
    if (n < 5) return keep;
    var best = null, step = Math.max(1, Math.floor(n / 40));
    for (var i = 0; i < n; i += step) {
      for (var t = 1; t <= 3; t++) {
        var j = (i + Math.floor(t * n / 4)) % n;
        var dx = P[j][0] - P[i][0], dy = P[j][1] - P[i][1], L = Math.hypot(dx, dy);
        if (L < 1e-9) continue;
        var nr = [-dy / L, dx / L], r = new Array(n);
        for (var k = 0; k < n; k++) r[k] = Math.abs((P[k][0] - P[i][0]) * nr[0] + (P[k][1] - P[i][1]) * nr[1]);
        var med = median(r);
        if (!best || med < best.med) best = { med: med, r: r };
      }
    }
    if (!best) return keep;
    var thr = Math.max(2.5 * 1.4826 * best.med, 0.5);
    for (var m = 0; m < n; m++) keep[m] = best.r[m] <= thr;
    return keep;
  }
  function median(a) {
    if (!a.length) return 0;
    var s = a.slice().sort(function (x, y) { return x - y; }), m = s.length >> 1;
    return s.length % 2 ? s[m] : 0.5 * (s[m - 1] + s[m]);
  }

  // ---------- wall measurement ----------
  // wall: 4 image points TL, TR, BR, BL (corners of a real rectangle)
  function vanishingPoints(wall) {
    var top = lineThrough(wall[0], wall[1]), bot = lineThrough(wall[3], wall[2]);
    var lef = lineThrough(wall[0], wall[3]), rig = lineThrough(wall[1], wall[2]);
    return { vh: cross(top, bot), vv: cross(lef, rig) };
  }

  function refRect(w, h) { return [[0, 0], [w, 0], [w, h], [0, h]]; }

  // The reference sheet may be taped upright or sideways: decide from its look in the photo
  // (perspective never turns a 1:1.41 sheet the other way round in a usable photo).
  function orientRef(paper, a, b) {
    var s = Math.min(a, b), l = Math.max(a, b);
    var w = (dist2(paper[0], paper[1]) + dist2(paper[3], paper[2])) / 2;
    var h = (dist2(paper[0], paper[3]) + dist2(paper[1], paper[2])) / 2;
    return h >= w ? [s, l] : [l, s];
  }

  // Method B: perspective from the wall's vanishing line, affine part fitted to the paper.
  function methodB(paper, wall, refW, refH) {
    var vp = vanishingPoints(wall);
    var o = centroid(paper);                                  // origin on the wall -> l3 never 0
    var T = [[1, 0, -o[0]], [0, 1, -o[1]], [0, 0, 1]];
    var l = cross(mvec(T, vp.vh), mvec(T, vp.vv));
    var HP = mmul([[1, 0, 0], [0, 1, 0], [l[0] / l[2], l[1] / l[2], 1]], T);
    var q = paper.map(function (p) { return applyH(HP, p); });
    var wh = orientRef(paper, refW, refH);
    var A = fitAffine(q, refRect(wh[0], wh[1]));
    return { method: 'B', H: mmul(A.M, HP), paperRms: A.rms, paperWH: wh };
  }

  // least squares affine q -> w ; returns 3x3 matrix and rms (mm)
  function fitAffine(q, w) {
    var AtA = [[0, 0, 0], [0, 0, 0], [0, 0, 0]], Atx = [0, 0, 0], Aty = [0, 0, 0];
    for (var i = 0; i < q.length; i++) {
      var r = [q[i][0], q[i][1], 1];
      for (var a = 0; a < 3; a++) { for (var b = 0; b < 3; b++) AtA[a][b] += r[a] * r[b]; Atx[a] += r[a] * w[i][0]; Aty[a] += r[a] * w[i][1]; }
    }
    var px = solve(AtA, Atx), py = solve(AtA, Aty);
    var M = [px, py, [0, 0, 1]], ss = 0;
    for (i = 0; i < q.length; i++) { var m = applyH(M, q[i]); ss += Math.pow(m[0] - w[i][0], 2) + Math.pow(m[1] - w[i][1], 2); }
    return { M: M, rms: Math.sqrt(ss / (2 * q.length)) };
  }

  function centroid(P) {
    var x = 0, y = 0;
    P.forEach(function (p) { x += p[0]; y += p[1]; });
    return [x / P.length, y / P.length];
  }

  // Method C: calibrated camera (focal length known). Plane orientation from the vanishing points,
  // the paper only gives ONE number: the scale (similarity fit).
  function methodC(paper, wall, refW, refH, fpx, imgW, imgH) {
    var vp = vanishingPoints(wall);
    var cx = (imgW - 1) / 2, cy = (imgH - 1) / 2;
    var K = [[fpx, 0, cx], [0, fpx, cy], [0, 0, 1]], Ki = minv(K);
    var rh = unit(mvec(Ki, vp.vh)), rv = unit(mvec(Ki, vp.vv));
    var n = unit(cross(rh, rv));
    var e1 = unit(rh.map(function (v, i) { return v - dot(rh, n) * n[i]; }));
    var e2 = cross(n, e1);
    // plane projection as a homography: image -> (x1, x2) on plane n.X = 1
    var Mp = mmul([e1, e2, n], Ki);
    var q = paper.map(function (p) { return applyH(Mp, p); });
    // orient axes like the paper (TL->TR = +x, TL->BL = +y): flips are applied to the matrix
    var sx = (q[1][0] - q[0][0]) >= 0 ? 1 : -1, sy = (q[3][1] - q[0][1]) >= 0 ? 1 : -1;
    var F = [[sx, 0, 0], [0, sy, 0], [0, 0, 1]];
    Mp = mmul(F, Mp);
    q = paper.map(function (p) { return applyH(Mp, p); });
    var wh = orientRef(paper, refW, refH);
    var S = fitSimilarity(q, refRect(wh[0], wh[1]));
    return { method: 'C', H: mmul(S.M, Mp), paperRms: S.rms, paperWH: wh };
  }

  // similarity (scale, rotation, translation; no reflection) q -> w, Umeyama in 2D
  function fitSimilarity(q, w) {
    var mq = centroid(q), mw = centroid(w), a = 0, b = 0, qq = 0;
    for (var i = 0; i < q.length; i++) {
      var x = q[i][0] - mq[0], y = q[i][1] - mq[1], u = w[i][0] - mw[0], v = w[i][1] - mw[1];
      a += x * u + y * v; b += x * v - y * u; qq += x * x + y * y;
    }
    var th = Math.atan2(b, a), s = Math.hypot(a, b) / qq, c = Math.cos(th), sn = Math.sin(th);
    var M = [[s * c, -s * sn, 0], [s * sn, s * c, 0], [0, 0, 1]];
    var t = sub2(mw, applyH(M, mq)); M[0][2] = t[0]; M[1][2] = t[1];
    var ss = 0;
    for (i = 0; i < q.length; i++) { var m = applyH(M, q[i]); ss += Math.pow(m[0] - w[i][0], 2) + Math.pow(m[1] - w[i][1], 2); }
    return { M: M, rms: Math.sqrt(ss / (2 * q.length)) };
  }

  function wallDims(H, wall) {
    var W = wall.map(function (p) { return applyH(H, p); });
    var ang = function (a, o, b) {
      var u = sub2(a, o), v = sub2(b, o);
      return Math.acos(Math.max(-1, Math.min(1, dot(u, v) / norm(u) / norm(v)))) * 180 / Math.PI;
    };
    var top = dist2(W[0], W[1]), bottom = dist2(W[3], W[2]), left = dist2(W[0], W[3]), right = dist2(W[1], W[2]);
    return { top: top, bottom: bottom, left: left, right: right,
             width: (top + bottom) / 2, height: (left + right) / 2, wallMM: W,
             angles: [ang(W[1], W[0], W[3]), ang(W[0], W[1], W[2]), ang(W[1], W[2], W[3]), ang(W[2], W[3], W[0])] };
  }

  function focalPx(f35, imgW, imgH) { return f35 / SENSOR_DIAG_35MM * Math.hypot(imgW, imgH); }

  // opts: {paper, wall, refW, refH, f35 (or null), imgW, imgH}
  function measure(o) {
    var r;
    if (o.f35) r = methodC(o.paper, o.wall, o.refW, o.refH, focalPx(o.f35, o.imgW, o.imgH), o.imgW, o.imgH);
    else r = methodB(o.paper, o.wall, o.refW, o.refH);
    var d = wallDims(r.H, o.wall);
    for (var k in d) r[k] = d[k];
    if (o.f35) {                                    // cross-check with the paper-only aspect method
      var b = methodB(o.paper, o.wall, o.refW, o.refH), db = wallDims(b.H, o.wall);
      r.check = { width: db.width, height: db.height };
    }
    return r;
  }

  // Monte-Carlo uncertainty (95 %): paper corners sigma sp px, wall corners sigma sw px,
  // plus a systematic paper-edge term (edge position +-0.4 px) combined in quadrature.
  function uncertainty(o, n, sp, sw) {
    n = n || 200; sp = sp || 0.5; sw = sw || 2.0;
    var ws = [], hs = [], seed = 12345;
    function rnd() { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648; }
    function gauss() { var u = Math.max(rnd(), 1e-12), v = rnd(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }
    function jitter(P, s) { return P.map(function (p) { return [p[0] + gauss() * s, p[1] + gauss() * s]; }); }
    for (var i = 0; i < n; i++) {
      var q = {}; for (var k in o) q[k] = o[k];
      q.paper = jitter(o.paper, sp); q.wall = jitter(o.wall, sw);
      try { var r = measure(q); if (isFinite(r.width) && isFinite(r.height)) { ws.push(r.width); hs.push(r.height); } } catch (e) { /* skip */ }
    }
    var sd = function (a) { var m = a.reduce(function (s, v) { return s + v; }, 0) / a.length; return Math.sqrt(a.reduce(function (s, v) { return s + (v - m) * (v - m); }, 0) / a.length); };
    var base = measure(o);
    var pw = (dist2(o.paper[0], o.paper[1]) + dist2(o.paper[3], o.paper[2])) / 2;
    var ph = (dist2(o.paper[0], o.paper[3]) + dist2(o.paper[1], o.paper[2])) / 2;
    var sysW = base.width * 0.8 / Math.min(pw, ph), sysH = base.height * 0.8 / Math.min(pw, ph);
    return { width: Math.sqrt(Math.pow(2 * sd(ws), 2) + sysW * sysW), height: Math.sqrt(Math.pow(2 * sd(hs), 2) + sysH * sysH) };
  }

  G.cross = cross; G.dot = dot; G.mmul = mmul; G.minv = minv; G.applyH = applyH; G.mvec = mvec;
  G.lineThrough = lineThrough; G.lineFromPointDir = lineFromPointDir; G.intersect = intersect;
  G.solve = solve; G.homography4 = homography4; G.fitLineTLS = fitLineTLS; G.median = median;
  G.vanishingPoints = vanishingPoints; G.methodB = methodB; G.methodC = methodC; G.wallDims = wallDims;
  G.measure = measure; G.uncertainty = uncertainty; G.focalPx = focalPx; G.dist = dist2; G.centroid = centroid;
  root.BPWGeom = G;
})(typeof window !== 'undefined' ? window : this);
`;var n=`/* 寶哥照片量牆 - image processing (ES2017): pink sheet detection, sub-pixel edges, wall-edge snapping
 * img = {w, h, data: Uint8ClampedArray RGBA}. Coordinates: pixel centres at integers.
 */
(function (root) {
  'use strict';
  var G = root.BPWGeom;
  var P = {};

  // ---------- basic image helpers ----------
  function gaussKernel(sigma) {
    var r = Math.ceil(4 * sigma), k = [], s = 0;
    for (var i = -r; i <= r; i++) { var v = Math.exp(-i * i / (2 * sigma * sigma)); k.push(v); s += v; }
    return k.map(function (v) { return v / s; });
  }
  function blur(src, w, h, sigma) {                 // separable gaussian, clamped borders
    var k = gaussKernel(sigma), r = (k.length - 1) / 2, tmp = new Float32Array(w * h), out = new Float32Array(w * h);
    var x, y, i, s, xx, yy;
    for (y = 0; y < h; y++) {
      var row = y * w;
      for (x = 0; x < w; x++) {
        s = 0;
        for (i = -r; i <= r; i++) { xx = x + i; if (xx < 0) xx = 0; else if (xx >= w) xx = w - 1; s += k[i + r] * src[row + xx]; }
        tmp[row + x] = s;
      }
    }
    for (y = 0; y < h; y++) {
      for (x = 0; x < w; x++) {
        s = 0;
        for (i = -r; i <= r; i++) { yy = y + i; if (yy < 0) yy = 0; else if (yy >= h) yy = h - 1; s += k[i + r] * tmp[yy * w + x]; }
        out[y * w + x] = s;
      }
    }
    return out;
  }
  // bilinear sample with clamping ("nearest" outside), f is w x h
  function sample(f, w, h, x, y) {
    if (x < 0) x = 0; else if (x > w - 1) x = w - 1;
    if (y < 0) y = 0; else if (y > h - 1) y = h - 1;
    var x0 = Math.floor(x), y0 = Math.floor(y), x1 = Math.min(x0 + 1, w - 1), y1 = Math.min(y0 + 1, h - 1);
    var fx = x - x0, fy = y - y0;
    return (f[y0 * w + x0] * (1 - fx) + f[y0 * w + x1] * fx) * (1 - fy) + (f[y1 * w + x0] * (1 - fx) + f[y1 * w + x1] * fx) * fy;
  }
  // luma (Rec.601), blurred sigma 1 px - used for wall edges
  P.makeLuma = function (img) {
    var n = img.w * img.h, L = new Float32Array(n), d = img.data;
    for (var i = 0, j = 0; i < n; i++, j += 4) L[i] = 0.299 * d[j] + 0.587 * d[j + 1] + 0.114 * d[j + 2];
    return blur(L, img.w, img.h, 1.0);
  };
  // magenta-ness (R+B)/2-G of a region, blurred sigma 0.7 - used for the pink sheet edges
  function magentaROI(img, x0, y0, x1, y1) {
    x0 = Math.max(0, Math.floor(x0)); y0 = Math.max(0, Math.floor(y0));
    x1 = Math.min(img.w - 1, Math.ceil(x1)); y1 = Math.min(img.h - 1, Math.ceil(y1));
    var w = x1 - x0 + 1, h = y1 - y0 + 1, f = new Float32Array(w * h), d = img.data;
    for (var y = 0; y < h; y++) for (var x = 0; x < w; x++) {
      var j = ((y + y0) * img.w + (x + x0)) * 4;
      f[y * w + x] = (d[j] + d[j + 2]) / 2 - d[j + 1];
    }
    return { f: blur(f, w, h, 0.7), w: w, h: h, x0: x0, y0: y0 };
  }

  // ---------- pink sheet: coarse detection ----------
  function downsample(img, k) {                      // box filter, integer factor
    var w = Math.floor(img.w / k), h = Math.floor(img.h / k), out = new Float32Array(w * h * 3), d = img.data, kk = k * k;
    for (var y = 0; y < h; y++) for (var x = 0; x < w; x++) {
      var r = 0, g = 0, b = 0;
      for (var dy = 0; dy < k; dy++) for (var dx = 0; dx < k; dx++) {
        var j = ((y * k + dy) * img.w + (x * k + dx)) * 4; r += d[j]; g += d[j + 1]; b += d[j + 2];
      }
      var o = (y * w + x) * 3; out[o] = r / kk; out[o + 1] = g / kk; out[o + 2] = b / kk;
    }
    return { w: w, h: h, rgb: out };
  }
  function isPink(r, g, b) {
    var mx = Math.max(r, g, b), mn = Math.min(r, g, b);
    if (mx < 100 || mx === mn) return false;
    var s = (mx - mn) / mx;
    if (s < 0.118 || s > 0.63) return false;
    if ((r + b) / 2 - g <= 20) return false;
    var hdeg;
    if (mx === r) hdeg = 60 * (((g - b) / (mx - mn)) % 6);
    else if (mx === g) hdeg = 60 * ((b - r) / (mx - mn) + 2);
    else hdeg = 60 * ((r - g) / (mx - mn) + 4);
    if (hdeg < 0) hdeg += 360;
    return hdeg >= 275 && hdeg < 360;
  }
  function morph(m, w, h, dilate) {
    var o = new Uint8Array(w * h);
    for (var y = 0; y < h; y++) for (var x = 0; x < w; x++) {
      var v = dilate ? 0 : 1;
      for (var dy = -1; dy <= 1; dy++) for (var dx = -1; dx <= 1; dx++) {
        var xx = Math.min(w - 1, Math.max(0, x + dx)), yy = Math.min(h - 1, Math.max(0, y + dy));
        if (dilate) { if (m[yy * w + xx]) v = 1; } else if (!m[yy * w + xx]) v = 0;
      }
      o[y * w + x] = v;
    }
    return o;
  }
  function components(m, w, h) {
    var lab = new Int32Array(w * h), comps = [], stack = new Int32Array(w * h), id = 0;
    for (var s = 0; s < w * h; s++) {
      if (!m[s] || lab[s]) continue;
      id++; var top = 0, area = 0, pts = [];
      stack[top++] = s; lab[s] = id;
      while (top > 0) {
        var p = stack[--top], x = p % w, y = (p - x) / w, border = false;
        area++;
        for (var dy = -1; dy <= 1; dy++) for (var dx = -1; dx <= 1; dx++) {
          if (!dx && !dy) continue;
          var xx = x + dx, yy = y + dy;
          if (xx < 0 || yy < 0 || xx >= w || yy >= h) { border = true; continue; }
          var q = yy * w + xx;
          if (!m[q]) { if (!dx || !dy) border = true; continue; }
          if (!lab[q]) { lab[q] = id; stack[top++] = q; }
        }
        if (border) pts.push([x, y]);
      }
      comps.push({ area: area, pts: pts });
    }
    return comps;
  }
  function hull(pts) {                               // monotone chain, CCW in math coords
    pts = pts.slice().sort(function (a, b) { return a[0] - b[0] || a[1] - b[1]; });
    var cr = function (o, a, b) { return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]); };
    var lo = [], up = [], i;
    for (i = 0; i < pts.length; i++) { while (lo.length >= 2 && cr(lo[lo.length - 2], lo[lo.length - 1], pts[i]) <= 0) lo.pop(); lo.push(pts[i]); }
    for (i = pts.length - 1; i >= 0; i--) { while (up.length >= 2 && cr(up[up.length - 2], up[up.length - 1], pts[i]) <= 0) up.pop(); up.push(pts[i]); }
    up.pop(); lo.pop();
    return lo.concat(up);
  }
  function polyArea(P) {
    var a = 0;
    for (var i = 0; i < P.length; i++) { var j = (i + 1) % P.length; a += P[i][0] * P[j][1] - P[j][0] * P[i][1]; }
    return Math.abs(a) / 2;
  }
  function maxAreaQuad(H) {                          // best inscribed quadrilateral on hull vertices
    if (H.length > 80) { var st = H.length / 80, Hs = []; for (var t = 0; t < 80; t++) Hs.push(H[Math.floor(t * st)]); H = Hs; }
    var n = H.length, best = null, tri = function (a, b, c) { return Math.abs((b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0])) / 2; };
    if (n < 4) return null;
    for (var i = 0; i < n; i++) for (var k = i + 2; k < n; k++) {
      if (i === 0 && k === n - 1) continue;
      var bj = -1, bjA = -1, bl = -1, blA = -1, j, l;
      for (j = i + 1; j < k; j++) { var a1 = tri(H[i], H[j], H[k]); if (a1 > bjA) { bjA = a1; bj = j; } }
      for (l = k + 1; l < n + i; l++) { var a2 = tri(H[i], H[k], H[l % n]); if (a2 > blA) { blA = a2; bl = l % n; } }
      if (bj < 0 || bl < 0) continue;
      if (!best || bjA + blA > best.a) best = { a: bjA + blA, q: [H[i], H[bj], H[k], H[bl]] };
    }
    return best ? best.q : null;
  }
  function orderCorners(pts) {                       // -> TL, TR, BR, BL
    var c = G.centroid(pts);
    var s = pts.slice().sort(function (a, b) { return Math.atan2(a[1] - c[1], a[0] - c[0]) - Math.atan2(b[1] - c[1], b[0] - c[0]); });
    var k = 0;
    for (var i = 1; i < 4; i++) if (s[i][0] + s[i][1] < s[k][0] + s[k][1]) k = i;
    s = s.slice(k).concat(s.slice(0, k));
    if (s[1][0] < s[3][0]) s = [s[0], s[3], s[2], s[1]];
    return s;
  }

  // ---------- sub-pixel edges ----------
  // 50 % crossing of a step edge (port of the tested Python version)
  function edgePointsStep(roi, a, b, inside, half, step, t0, t1) {
    var L = G.dist(a, b), d = [(b[0] - a[0]) / L, (b[1] - a[1]) / L], n = [-d[1], d[0]];
    var mid = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    if ((inside[0] - mid[0]) * n[0] + (inside[1] - mid[1]) * n[1] > 0) n = [-n[0], -n[1]];   // outward
    var us = []; for (var u = -half; u <= half + 1e-9; u += step) us.push(u);
    var pts = [];
    for (var t = t0 * L; t < t1 * L; t += 1.0) {
      var s = [a[0] + t * d[0], a[1] + t * d[1]], prof = new Array(us.length), inV = [], outV = [];
      for (var i = 0; i < us.length; i++) {
        prof[i] = sample(roi.f, roi.w, roi.h, s[0] + us[i] * n[0] - roi.x0, s[1] + us[i] * n[1] - roi.y0);
        if (us[i] <= -half + 3) inV.push(prof[i]);
        if (us[i] >= half - 3) outV.push(prof[i]);
      }
      var lin = G.median(inV), lout = G.median(outV);
      if (Math.abs(lin - lout) < 5) continue;
      var m = (lin + lout) / 2, bestK = -1;
      for (i = 0; i < us.length - 1; i++) {
        if (Math.sign(prof[i] - m) !== Math.sign(prof[i + 1] - m) && (bestK < 0 || Math.abs(us[i]) < Math.abs(us[bestK]))) bestK = i;
      }
      if (bestK < 0) continue;
      var uu = us[bestK] + (m - prof[bestK]) / (prof[bestK + 1] - prof[bestK]) * step;
      pts.push([s[0] + uu * n[0], s[1] + uu * n[1]]);
    }
    return pts;
  }
  function refineQuad(img, quad, half) {
    var xs = quad.map(function (p) { return p[0]; }), ys = quad.map(function (p) { return p[1]; });
    var mg = half + 8;
    var roi = magentaROI(img, Math.min.apply(null, xs) - mg, Math.min.apply(null, ys) - mg, Math.max.apply(null, xs) + mg, Math.max.apply(null, ys) + mg);
    var c = G.centroid(quad), lines = [], info = [];
    for (var i = 0; i < 4; i++) {
      var pts = edgePointsStep(roi, quad[i], quad[(i + 1) % 4], c, half, 0.25, 0.12, 0.88);
      if (pts.length < 6) return null;
      var f = G.fitLineTLS(pts);
      lines.push(G.lineFromPointDir(f.p, f.d)); info.push({ n: pts.length, inliers: f.inliers, rms: f.rms });
    }
    var out = [];
    for (i = 0; i < 4; i++) out.push(G.intersect(lines[(i + 3) % 4], lines[i]));
    return { corners: out, info: info };
  }

  // detect the pink reference sheet. expectRatio = long/short side of the reference sheet
  P.detectPaper = function (img, expectRatio) {
    expectRatio = expectRatio || Math.SQRT2;
    var k = Math.max(1, Math.ceil(Math.max(img.w, img.h) / 1200)), sm = downsample(img, k);
    var m = new Uint8Array(sm.w * sm.h);
    for (var i = 0; i < sm.w * sm.h; i++) m[i] = isPink(sm.rgb[3 * i], sm.rgb[3 * i + 1], sm.rgb[3 * i + 2]) ? 1 : 0;
    m = morph(morph(m, sm.w, sm.h, true), sm.w, sm.h, false);          // closing
    var comps = components(m, sm.w, sm.h), best = null, minArea = Math.max(80, sm.w * sm.h * 0.00004);
    comps.forEach(function (cp) {
      if (cp.area < minArea || cp.pts.length < 8) return;
      var H = hull(cp.pts), ha = polyArea(H);
      if (ha <= 0 || cp.area / ha < 0.85) return;
      var q = maxAreaQuad(H);
      if (!q || polyArea(q) / ha < 0.88) return;
      q = orderCorners(q);
      var w = (G.dist(q[0], q[1]) + G.dist(q[3], q[2])) / 2, h = (G.dist(q[0], q[3]) + G.dist(q[1], q[2])) / 2;
      var ratio = Math.max(w, h) / Math.min(w, h);
      if (ratio > expectRatio * 1.6 || ratio < expectRatio / 1.6) return;
      var score = cp.area * (cp.area / ha);
      if (!best || score > best.score) best = { score: score, q: q };
    });
    if (!best) return null;
    var rough = best.q.map(function (p) { return [k * p[0] + (k - 1) / 2, k * p[1] + (k - 1) / 2]; });
    var half = Math.max(7, 2 * k + 4);
    var r1 = refineQuad(img, rough, half);
    if (!r1) return null;
    var r2 = refineQuad(img, r1.corners, 7) || r1;
    return { corners: r2.corners, rough: rough, info: r2.info };
  };

  // ---------- wall edge snapping ----------
  // strongest edge near segment a-b (either polarity); returns fitted line + quality
  P.measureEdge = function (luma, w, h, a, b, R, t0, t1) {
    var L = G.dist(a, b), d = [(b[0] - a[0]) / L, (b[1] - a[1]) / L], n = [-d[1], d[0]];
    var step = 0.25, us = [], i;
    for (var u = -R; u <= R + 1e-9; u += step) us.push(u);
    var gk = gaussKernel(1.0 / step), gr = (gk.length - 1) / 2, c3 = Math.round(3 / step);
    var pts = [], tried = 0;
    for (var t = t0 * L; t <= t1 * L; t += 1.0) {
      tried++;
      var s = [a[0] + t * d[0], a[1] + t * d[1]], prof = new Array(us.length), sm = new Array(us.length);
      for (i = 0; i < us.length; i++) prof[i] = sample(luma, w, h, s[0] + us[i] * n[0], s[1] + us[i] * n[1]);
      for (i = 0; i < us.length; i++) {
        var acc = 0;
        for (var j = -gr; j <= gr; j++) { var ii = Math.min(us.length - 1, Math.max(0, i + j)); acc += gk[j + gr] * prof[ii]; }
        sm[i] = acc;
      }
      var g = new Array(us.length);
      for (i = 0; i < us.length; i++) {
        var lo = Math.max(0, i - 1), hi = Math.min(us.length - 1, i + 1);
        g[i] = Math.abs((sm[hi] - sm[lo]) / ((hi - lo) * step));
      }
      var k = 2;
      for (i = 2; i < us.length - 2; i++) if (g[i] > g[k]) k = i;
      var contrast = Math.abs(prof[Math.min(k + c3, us.length - 1)] - prof[Math.max(k - c3, 0)]);
      if (contrast < 6) continue;
      var den = g[k - 1] - 2 * g[k] + g[k + 1], off = den !== 0 ? 0.5 * (g[k - 1] - g[k + 1]) / den : 0;
      var uu = us[k] + off * step;
      pts.push([s[0] + uu * n[0], s[1] + uu * n[1]]);
    }
    if (pts.length < 5) return null;
    var f = G.fitLineTLS(pts, 6, true);
    return { p: f.p, d: f.d, inliers: f.inliers, tried: tried, rms: f.rms, pts: pts, keep: f.keep };
  };

  // snap the 4 wall sides (TL,TR,BR,BL user points). A side is only accepted when the edge
  // is clear (enough inliers, small rms, close to the user's segment); otherwise the user's line is kept.
  P.snapWall = function (luma, w, h, user, R, rmsMax) {
    rmsMax = rmsMax || 1.5;
    var sides = [[0, 1], [1, 2], [3, 2], [0, 3]], lines = [], ok = [], info = [];
    sides.forEach(function (sd) {
      var a = user[sd[0]], b = user[sd[1]], userLine = G.lineThrough(a, b), e = null;
      try { e = P.measureEdge(luma, w, h, a, b, R, 0.08, 0.92); } catch (err) { e = null; }
      var accept = false, why = '';
      if (e) {
        var ud = [(b[0] - a[0]) / G.dist(a, b), (b[1] - a[1]) / G.dist(a, b)];
        var angDiff = Math.acos(Math.min(1, Math.abs(ud[0] * e.d[0] + ud[1] * e.d[1]))) * 180 / Math.PI;
        var nrm = [-e.d[1], e.d[0]];
        var offA = Math.abs((a[0] - e.p[0]) * nrm[0] + (a[1] - e.p[1]) * nrm[1]);
        var offB = Math.abs((b[0] - e.p[0]) * nrm[0] + (b[1] - e.p[1]) * nrm[1]);
        var ratio = e.inliers / Math.max(1, e.tried);
        accept = ratio >= 0.35 && e.inliers >= 20 && e.rms <= rmsMax && angDiff <= 2.0 && offA <= R && offB <= R;
        why = 'inl ' + Math.round(ratio * 100) + '% rms ' + e.rms.toFixed(2) + ' ang ' + angDiff.toFixed(2);
      } else why = 'no edge';
      lines.push(accept ? G.lineFromPointDir(e.p, e.d) : userLine);
      ok.push(accept); info.push(why);
    });
    // corners: TL = left x top, TR = top x right, BR = right x bottom, BL = bottom x left
    var corners = [G.intersect(lines[3], lines[0]), G.intersect(lines[0], lines[1]),
                   G.intersect(lines[1], lines[2]), G.intersect(lines[2], lines[3])];
    return { corners: corners, ok: ok, info: info };
  };

  P.sample = sample;
  P.orderCorners = orderCorners;
  root.BPWImg = P;
})(typeof window !== 'undefined' ? window : this);
`;var a=`/* 寶哥照片量牆 - minimal EXIF reader (ES2017): orientation, camera, lens focal length, JPEG size */
(function (root) {
  'use strict';
  var X = {};
  // 2x1 JPEG with orientation 6: browsers that honour EXIF orientation report it as 1x2
  var PROBE = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4QAiRXhpZgAATU0AKgAAAAgAAQESAAMAAAABAAYAAAAAAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAABAAIDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDFoooryz7w/9k=';

  function ascii(dv, off, count) {
    var s = '';
    for (var i = 0; i < count; i++) { var c = dv.getUint8(off + i); if (c === 0) break; s += String.fromCharCode(c); }
    return s.trim();
  }

  function readTiff(dv, t0, out) {
    var le = dv.getUint16(t0) === 0x4949;
    var u16 = function (o) { return dv.getUint16(t0 + o, le); };
    var u32 = function (o) { return dv.getUint32(t0 + o, le); };
    if (u16(2) !== 42) return;
    var SIZE = { 1: 1, 2: 1, 3: 2, 4: 4, 5: 8, 7: 1, 9: 4, 10: 8, 11: 4, 12: 8 };
    function each(ifdOff, fn) {
      var n = u16(ifdOff);
      for (var i = 0; i < n; i++) {
        var e = ifdOff + 2 + i * 12, tag = u16(e), type = u16(e + 2), count = u32(e + 4);
        var size = (SIZE[type] || 1) * count;
        var vo = size <= 4 ? e + 8 : u32(e + 8);        // value offset relative to TIFF start
        try { fn(tag, type, count, vo); } catch (err) { /* ignore broken tag */ }
      }
    }
    function num(type, vo) {
      if (type === 3) return u16(vo);
      if (type === 4) return u32(vo);
      if (type === 5) { var d = u32(vo + 4); return d ? u32(vo) / d : null; }
      if (type === 10) { var sd = dv.getInt32(t0 + vo + 4, le); return sd ? dv.getInt32(t0 + vo, le) / sd : null; }
      if (type === 11) return dv.getFloat32(t0 + vo, le);
      if (type === 12) return dv.getFloat64(t0 + vo, le);
      return null;
    }
    var exifPtr = null;
    each(u32(4), function (tag, type, count, vo) {
      if (tag === 0x0112) out.orientation = u16(vo);
      else if (tag === 0x010F) out.make = ascii(dv, t0 + vo, count);
      else if (tag === 0x0110) out.model = ascii(dv, t0 + vo, count);
      else if (tag === 0x8769) exifPtr = u32(vo);
    });
    if (exifPtr) {
      each(exifPtr, function (tag, type, count, vo) {
        if (tag === 0x920A) out.focal = num(type, vo);
        else if (tag === 0xA405) out.focal35 = num(type, vo) || null;
        else if (tag === 0xA434) out.lens = ascii(dv, t0 + vo, count);
      });
    }
  }

  // bytes: Uint8Array of the whole file
  X.parse = function (bytes) {
    var out = { orientation: 1, make: '', model: '', lens: '', focal: null, focal35: null, sofW: null, sofH: null, isJpeg: false };
    if (bytes.length < 4 || bytes[0] !== 0xFF || bytes[1] !== 0xD8) return out;
    out.isJpeg = true;
    var dv = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength), pos = 2;
    try {
      while (pos + 4 <= bytes.length) {
        if (bytes[pos] !== 0xFF) { pos++; continue; }
        var m = bytes[pos + 1];
        if (m === 0xFF) { pos++; continue; }
        if (m === 0xD8 || m === 0x01 || (m >= 0xD0 && m <= 0xD7)) { pos += 2; continue; }
        if (m === 0xD9 || m === 0xDA) break;
        var len = dv.getUint16(pos + 2), seg = pos + 4;
        if (m === 0xE1 && len >= 8 && bytes[seg] === 0x45 && bytes[seg + 1] === 0x78 && bytes[seg + 2] === 0x69 &&
            bytes[seg + 3] === 0x66 && bytes[seg + 4] === 0 && bytes[seg + 5] === 0) {
          try { readTiff(dv, seg + 6, out); } catch (e) { /* broken EXIF: keep defaults */ }
        } else if (m >= 0xC0 && m <= 0xCF && m !== 0xC4 && m !== 0xC8 && m !== 0xCC) {
          out.sofH = dv.getUint16(seg + 1); out.sofW = dv.getUint16(seg + 3);
        }
        pos += 2 + len;
      }
    } catch (e) { /* truncated file */ }
    if (!(out.orientation >= 1 && out.orientation <= 8)) out.orientation = 1;
    return out;
  };

  var autoOrient = null;
  // resolves true when the browser already applies EXIF orientation to images (Chromium 81+)
  X.browserAutoOrients = function () {
    if (autoOrient !== null) return Promise.resolve(autoOrient);
    return new Promise(function (resolve) {
      var im = new Image();
      im.onload = function () { autoOrient = (im.naturalWidth === 1 && im.naturalHeight === 2); resolve(autoOrient); };
      im.onerror = function () { autoOrient = false; resolve(false); };
      im.src = PROBE;
    });
  };

  // canvas transform that turns raw sensor-oriented pixels (w x h) upright, per EXIF orientation
  X.orientTransform = function (o, w, h) {
    switch (o) {
      case 2: return { w: w, h: h, m: [-1, 0, 0, 1, w, 0] };
      case 3: return { w: w, h: h, m: [-1, 0, 0, -1, w, h] };
      case 4: return { w: w, h: h, m: [1, 0, 0, -1, 0, h] };
      case 5: return { w: h, h: w, m: [0, 1, 1, 0, 0, 0] };
      case 6: return { w: h, h: w, m: [0, 1, -1, 0, h, 0] };
      case 7: return { w: h, h: w, m: [0, -1, -1, 0, h, w] };
      case 8: return { w: h, h: w, m: [0, -1, 1, 0, 0, w] };
      default: return { w: w, h: h, m: [1, 0, 0, 1, 0, 0] };
    }
  };

  root.BPWExif = X;
})(typeof window !== 'undefined' ? window : this);
`;var o=`/* 寶哥照片量牆 - drawing: photo view with zoom/pan, overlays, loupe, rectified preview (ES2017) */
(function (root) {
  'use strict';
  var V = {}, cv, ctx, lp, lctx, dpr = 1, src = null;
  var view = { s: 1, ox: 0, oy: 0 };                 // screen = o + (img + 0.5) * s   (CSS px)
  var SIDES = [[0, 1], [1, 2], [3, 2], [0, 3]];      // top, right, bottom, left (same order as BPWImg.snapWall)
  var LABELS = ['左上', '右上', '右下', '左下'];
  function dist(a, b) { return Math.hypot(a[0] - b[0], a[1] - b[1]); }

  V.init = function (canvas, loupe) { cv = canvas; ctx = cv.getContext('2d'); lp = loupe; lctx = lp.getContext('2d'); V.resize(); };
  V.resize = function () {
    dpr = window.devicePixelRatio || 1;
    var r = cv.getBoundingClientRect();
    cv.width = Math.max(1, Math.round(r.width * dpr)); cv.height = Math.max(1, Math.round(r.height * dpr));
  };
  V.size = function () { var r = cv.getBoundingClientRect(); return [r.width, r.height]; };
  V.setSource = function (canvas) { src = canvas; V.fit(); };
  V.fit = function () {
    if (!src) return;
    var sz = V.size(), m = 16;
    view.s = Math.min((sz[0] - 2 * m) / src.width, (sz[1] - 2 * m) / src.height);
    view.ox = (sz[0] - src.width * view.s) / 2; view.oy = (sz[1] - src.height * view.s) / 2;
  };
  V.toScreen = function (p) { return [view.ox + (p[0] + 0.5) * view.s, view.oy + (p[1] + 0.5) * view.s]; };
  V.toImage = function (x, y) { return [(x - view.ox) / view.s - 0.5, (y - view.oy) / view.s - 0.5]; };
  V.zoomAt = function (x, y, f) {
    var ns = Math.min(40, Math.max(0.02, view.s * f)); f = ns / view.s;
    view.ox = x - (x - view.ox) * f; view.oy = y - (y - view.oy) * f; view.s = ns;
  };
  V.panBy = function (dx, dy) { view.ox += dx; view.oy += dy; };

  // ---------- overlay primitives (c = 2d context, map = image->screen) ----------
  function seg(c, map, a, b, color, w, dashed) {
    var p = map(a), q = map(b);
    c.save(); c.strokeStyle = color; c.lineWidth = w; if (dashed) c.setLineDash([8, 6]);
    c.beginPath(); c.moveTo(p[0], p[1]); c.lineTo(q[0], q[1]); c.stroke(); c.restore();
  }
  function handle(c, map, p, color, selected) {
    var s = map(p);
    c.save(); c.beginPath(); c.arc(s[0], s[1], 6, 0, Math.PI * 2);
    c.fillStyle = color; c.fill(); c.lineWidth = 2; c.strokeStyle = selected ? '#ffd400' : '#fff'; c.stroke();
    if (selected) { c.beginPath(); c.arc(s[0], s[1], 10, 0, Math.PI * 2); c.strokeStyle = '#ffd400'; c.stroke(); }
    c.restore();
  }
  function cross(c, map, p, color) {
    var s = map(p);
    c.save(); c.strokeStyle = color; c.lineWidth = 2; c.beginPath();
    c.moveTo(s[0] - 6, s[1] - 6); c.lineTo(s[0] + 6, s[1] + 6); c.moveTo(s[0] + 6, s[1] - 6); c.lineTo(s[0] - 6, s[1] + 6);
    c.stroke(); c.restore();
  }
  function label(c, map, p, text) {
    var s = map(p);
    c.save(); c.font = '12px "Microsoft JhengHei", sans-serif'; c.fillStyle = 'rgba(0,0,0,.65)';
    var w = c.measureText(text).width + 8; c.fillRect(s[0] + 9, s[1] - 22, w, 17);
    c.fillStyle = '#fff'; c.fillText(text, s[0] + 13, s[1] - 9); c.restore();
  }
  function overlays(c, map, st) {
    if (st.paper) for (var i = 0; i < 4; i++) seg(c, map, st.paper[i], st.paper[(i + 1) % 4], '#12d160', 2, false);
    if (st.wallCorners) {
      for (i = 0; i < 4; i++) seg(c, map, st.wallCorners[SIDES[i][0]], st.wallCorners[SIDES[i][1]], '#ff3b2f', 2, !(st.snapOk && st.snapOk[i]));
      st.wallCorners.forEach(function (q, k) { if (st.wallUser[k] && dist(q, st.wallUser[k]) > 1) cross(c, map, q, '#ffd400'); });
    }
    if (st.pick && st.pick.pts.length) {
      var col = st.pick.kind === 'wall' ? '#ff3b2f' : '#12d160', P = st.pick.pts;
      for (i = 1; i < P.length; i++) seg(c, map, P[i - 1], P[i], col, 2, true);
      if (st.mouse) seg(c, map, P[P.length - 1], st.mouse, col, 1, true);
      if (P.length === 3 && st.mouse) seg(c, map, st.mouse, P[0], col, 1, true);
      P.forEach(function (p) { handle(c, map, p, col, false); });
    }
    if (st.paper) st.paper.forEach(function (p, k) { handle(c, map, p, '#12d160', st.sel && st.sel.kind === 'paper' && st.sel.i === k); });
    if (st.wallUser && st.wallUser.length === 4) st.wallUser.forEach(function (p, k) {
      handle(c, map, p, '#ff3b2f', st.sel && st.sel.kind === 'wall' && st.sel.i === k); label(c, map, p, LABELS[k]);
    });
  }

  V.render = function (st) {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, cv.width, cv.height);
    if (!src) return;
    ctx.setTransform(dpr * view.s, 0, 0, dpr * view.s, dpr * view.ox, dpr * view.oy);
    ctx.imageSmoothingEnabled = view.s < 2;
    ctx.drawImage(src, 0, 0);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    overlays(ctx, V.toScreen, st);
  };

  // magnifier centred on image point p
  V.loupe = function (st, p) {
    if (!src || !p) { lp.style.display = 'none'; return; }
    lp.style.display = 'block';
    var Z = 8, size = lp.width, half = size / 2 / Z, sx = p[0] + 0.5 - half, sy = p[1] + 0.5 - half;
    lctx.setTransform(1, 0, 0, 1, 0, 0); lctx.fillStyle = '#000'; lctx.fillRect(0, 0, size, size);
    lctx.imageSmoothingEnabled = false;
    var x0 = Math.max(0, sx), y0 = Math.max(0, sy), x1 = Math.min(src.width, sx + 2 * half), y1 = Math.min(src.height, sy + 2 * half);
    if (x1 > x0 && y1 > y0) lctx.drawImage(src, x0, y0, x1 - x0, y1 - y0, (x0 - sx) * Z, (y0 - sy) * Z, (x1 - x0) * Z, (y1 - y0) * Z);
    overlays(lctx, function (q) { return [(q[0] + 0.5 - sx) * Z, (q[1] + 0.5 - sy) * Z]; }, st);
    lctx.strokeStyle = 'rgba(255,255,255,.9)'; lctx.lineWidth = 1; lctx.beginPath();
    lctx.moveTo(size / 2, 0); lctx.lineTo(size / 2, size / 2 - 8); lctx.moveTo(size / 2, size / 2 + 8); lctx.lineTo(size / 2, size);
    lctx.moveTo(0, size / 2); lctx.lineTo(size / 2 - 8, size / 2); lctx.moveTo(size / 2 + 8, size / 2); lctx.lineTo(size, size / 2); lctx.stroke();
  };

  // rectified front view. img = {w,h,data}, H: image -> mm, wallMM: wall corners in mm (TL,TR,BR,BL)
  V.renderPreview = function (canvas, img, H, wallMM, dims, maxW, maxH) {
    var G = root.BPWGeom, TL = wallMM[0], TR = wallMM[1], BR = wallMM[2], BL = wallMM[3];
    var a = function (p, q) { return Math.atan2(q[1] - p[1], q[0] - p[0]); };
    var phi = (a(TL, TR) + a(BL, BR) + a(TL, BL) - Math.PI / 2 + a(TR, BR) - Math.PI / 2) / 4;
    var c = Math.cos(phi), s = Math.sin(phi), m = 150, W = dims.width, Hh = dims.height;
    var k = Math.min(maxW / (W + 2 * m), maxH / (Hh + 2 * m));
    var ow = Math.round((W + 2 * m) * k), oh = Math.round((Hh + 2 * m) * k);
    canvas.width = ow; canvas.height = oh;
    var c2 = canvas.getContext('2d'), out = c2.createImageData(ow, oh), od = out.data, d = img.data, iw = img.w, ih = img.h;
    var Hi = G.minv(H);
    for (var v = 0; v < oh; v++) for (var u = 0; u < ow; u++) {
      var ax = (u + 0.5) / k - m, ay = (v + 0.5) / k - m;                  // aligned wall frame (mm)
      var mx = TL[0] + c * ax - s * ay, my = TL[1] + s * ax + c * ay;       // paper frame (mm)
      var X = Hi[0][0] * mx + Hi[0][1] * my + Hi[0][2], Y = Hi[1][0] * mx + Hi[1][1] * my + Hi[1][2], Z = Hi[2][0] * mx + Hi[2][1] * my + Hi[2][2];
      var x = X / Z, y = Y / Z, o = (v * ow + u) * 4;
      if (!(Z > 0 || Z < 0) || x < 0 || y < 0 || x > iw - 1 || y > ih - 1) { od[o] = od[o + 1] = od[o + 2] = 255; od[o + 3] = 255; continue; }
      var x0 = Math.floor(x), y0 = Math.floor(y), x1 = Math.min(x0 + 1, iw - 1), y1 = Math.min(y0 + 1, ih - 1), fx = x - x0, fy = y - y0;
      var i00 = (y0 * iw + x0) * 4, i01 = (y0 * iw + x1) * 4, i10 = (y1 * iw + x0) * 4, i11 = (y1 * iw + x1) * 4;
      for (var ch = 0; ch < 3; ch++) {
        od[o + ch] = (d[i00 + ch] * (1 - fx) + d[i01 + ch] * fx) * (1 - fy) + (d[i10 + ch] * (1 - fx) + d[i11 + ch] * fx) * fy;
      }
      od[o + 3] = 255;
    }
    c2.putImageData(out, 0, 0);
    var X0 = m * k, Y0 = m * k, X1 = (m + W) * k, Y1 = (m + Hh) * k;
    c2.strokeStyle = 'rgba(0,120,255,.8)'; c2.lineWidth = 1;
    for (var gx = 500; gx < W; gx += 500) { c2.beginPath(); c2.moveTo(X0 + gx * k, Y0); c2.lineTo(X0 + gx * k, Y1); c2.stroke(); }
    for (var gy = 500; gy < Hh; gy += 500) { c2.beginPath(); c2.moveTo(X0, Y0 + gy * k); c2.lineTo(X1, Y0 + gy * k); c2.stroke(); }
    c2.strokeStyle = '#e0301e'; c2.lineWidth = 2; c2.strokeRect(X0, Y0, X1 - X0, Y1 - Y0);
    c2.font = 'bold 16px "Microsoft JhengHei", sans-serif'; c2.textAlign = 'center'; c2.textBaseline = 'middle';
    var tag = function (text, x, y, rot) {           // label on a white box so it reads on any photo
      c2.save(); c2.translate(x, y); if (rot) c2.rotate(rot);
      var tw = c2.measureText(text).width + 14;
      c2.fillStyle = 'rgba(255,255,255,.92)'; c2.fillRect(-tw / 2, -12, tw, 24);
      c2.fillStyle = '#e0301e'; c2.fillText(text, 0, 1); c2.restore();
    };
    tag('寬 ' + Math.round(W).toLocaleString('en-US') + ' mm', (X0 + X1) / 2, Math.max(14, Y0 - 16), 0);
    tag('高 ' + Math.round(Hh).toLocaleString('en-US') + ' mm', Math.max(14, X0 - 16), (Y0 + Y1) / 2, -Math.PI / 2);
  };

  root.BPWView = V;
})(typeof window !== 'undefined' ? window : this);
`;var s=`/* 寶哥照片量牆 - application logic (ES2017) */
/* 平板版：和外掛的 photo_wall/app.js 相同，只改了兩處（點選範圍、提示文字可由外部設定），計算完全沒動 */
(function (root) {
  'use strict';
  var G = root.BPWGeom, IP = root.BPWImg, EX = root.BPWExif, V = root.BPWView;
  var MAX_SIDE = 4000, NAMES = ['左上', '右上', '右下', '左下'];
  var $ = function (id) { return document.getElementById(id); };
  var S = {
    img: null, work: null, exif: null, luma: null, name: '', srcSize: null, manualOrient: false,
    paper: null, paperAuto: false, wallUser: [], wallCorners: null, snapOk: null,
    pick: null, pickBackup: null, mouse: null, sel: null, drag: null, pan: null, result: null, chunks: null, meta: null,
    features: { room: false },
    roomRec: { L: null, W: null, HL: null, HW: null, nameL: '', nameW: '' },   // measured sides for 寶哥畫空間 (mm)
    settings: { refW: 210, refH: 297, lens: 'auto', customF: 13, snap: true, addDims: true }
  };
  function hasSU() { return typeof root.sketchup !== 'undefined' && root.sketchup !== null; }
  function fmt(v) { return Math.round(v).toLocaleString('en-US'); }
  function setStatus(id, text, cls) { var e = $(id); e.textContent = text || ''; e.className = (id === 'drawStatus' || id === 'lensStatus' ? 'small ' : 'status ') + (cls || ''); }
  function busy(on, text) { var b = $('busy'); b.textContent = text || '處理中…'; b.style.display = on ? 'block' : 'none'; }
  function later(fn) { setTimeout(fn, 30); }
  function render() { V.render(S); }

  // ---------- settings ----------
  function applySettingsToUI() {
    var s = S.settings;
    $('refW').value = s.refW; $('refH').value = s.refH; $('lens').value = s.lens; $('customF').value = s.customF;
    $('snap').checked = !!s.snap; $('addDims').checked = !!s.addDims;
    $('customRow').style.display = s.lens === 'custom' ? 'flex' : 'none';
  }
  function saveSettings() {
    var j = JSON.stringify(S.settings);
    if (hasSU()) { root.sketchup.saveSettings(j); return; }
    try { root.localStorage.setItem('bpw_settings', j); } catch (e) { /* ignore */ }
  }
  function mergeSettings(o) {
    if (!o) return;
    ['refW', 'refH', 'customF'].forEach(function (k) { var v = parseFloat(o[k]); if (v > 0) S.settings[k] = v; });
    if (typeof o.lens === 'string') S.settings.lens = o.lens;
    if (o.snap !== undefined) S.settings.snap = !!o.snap;
    if (o.addDims !== undefined) S.settings.addDims = !!o.addDims;
  }

  // ---------- loading ----------
  function b64ToBytes(b64) { var bin = atob(b64), n = bin.length, u = new Uint8Array(n); for (var i = 0; i < n; i++) u[i] = bin.charCodeAt(i); return u; }
  function fail(msg) { busy(false); setStatus('paperStatus', msg, 'bad'); }

  function loadBytes(bytes, name, mime) {
    busy(true, '讀取照片…');
    var exif = EX.parse(bytes), url = URL.createObjectURL(new Blob([bytes], { type: mime || 'image/jpeg' })), im = new Image();
    im.onload = function () {
      EX.browserAutoOrients().then(function (auto) {
        try { buildWork(im, exif, auto, name); } catch (e) { fail('照片處理失敗：' + e.message); }
        URL.revokeObjectURL(url);
      });
    };
    im.onerror = function () { URL.revokeObjectURL(url); fail('無法讀取這張照片：只支援 JPG / PNG（iPhone 的 HEIC 請先轉成 JPG）'); };
    im.src = url;
  }

  function buildWork(im, exif, auto, name) {
    var o = exif.orientation || 1, nw = im.naturalWidth, nh = im.naturalHeight, manual = !auto && o > 1;
    var t = manual ? EX.orientTransform(o, nw, nh) : { w: nw, h: nh, m: [1, 0, 0, 1, 0, 0] };
    var k = Math.min(1, MAX_SIDE / Math.max(t.w, t.h)), W = Math.round(t.w * k), H = Math.round(t.h * k);
    var c = document.createElement('canvas'); c.width = W; c.height = H;
    var cx = c.getContext('2d');
    cx.imageSmoothingEnabled = true; if ('imageSmoothingQuality' in cx) cx.imageSmoothingQuality = 'high';
    cx.setTransform(k, 0, 0, k, 0, 0); cx.transform(t.m[0], t.m[1], t.m[2], t.m[3], t.m[4], t.m[5]);
    cx.drawImage(im, 0, 0);
    S.work = c; S.img = { w: W, h: H, data: cx.getImageData(0, 0, W, H).data };
    S.exif = exif; S.name = name; S.srcSize = [t.w, t.h]; S.manualOrient = manual;
    S.paper = null; S.wallUser = []; S.wallCorners = null; S.snapOk = null; S.result = null; S.sel = null; S.pick = null;
    $('empty').style.display = 'none';
    setStatus('drawStatus', ''); setStatus('roomStatus', '');
    V.setSource(c);
    var info = name + '｜' + W + ' × ' + H + ' 像素';
    if (k < 1) info += '（原圖 ' + t.w + ' × ' + t.h + '，已縮小處理）';
    if (manual) info += '，已依照片方向轉正';
    $('fileInfo').textContent = info;
    updateLensStatus(); render(); showResult();
    busy(true, '分析照片…');
    later(function () {
      S.luma = IP.makeLuma(S.img);
      detectPaper();
      busy(false);
      if (S.paper) startPick('wall');
    });
  }

  // ---------- reference sheet ----------
  function paperPx() {
    var p = S.paper;
    return [(G.dist(p[0], p[1]) + G.dist(p[3], p[2])) / 2, (G.dist(p[0], p[3]) + G.dist(p[1], p[2])) / 2];
  }
  function detectPaper() {
    if (!S.img) return;
    var s = S.settings, r = IP.detectPaper(S.img, Math.max(s.refW, s.refH) / Math.min(s.refW, s.refH));
    if (r) {
      S.paper = r.corners; S.paperAuto = true;
      var px = paperPx();
      setStatus('paperStatus', '已自動找到參考紙（約 ' + Math.round(px[0]) + ' × ' + Math.round(px[1]) + ' 像素），可拖曳綠點微調', 'ok');
    } else {
      S.paper = null;
      setStatus('paperStatus', '沒有找到粉紅色參考紙，請按「手動點紙的四角」', 'bad');
    }
    recompute();
  }

  // ---------- picking ----------
  function startPick(kind) {
    if (!S.img) return;
    S.pickBackup = { paper: S.paper, wallUser: S.wallUser };
    S.pick = { kind: kind, pts: [] }; S.sel = null;
    if (kind === 'wall') { S.wallUser = []; S.wallCorners = null; }
    else S.paper = null;
    S.result = null; updateHint(); render(); showResult();
  }
  function cancelPick() {
    if (!S.pick) return;
    S.paper = S.pickBackup.paper; S.wallUser = S.pickBackup.wallUser; S.pick = null;
    $('loupe').style.display = 'none'; updateHint(); recompute();
  }
  function updateHint() {
    var h = $('hint');
    if (!S.pick) { h.style.display = 'none'; return; }
    h.textContent = '請點' + (S.pick.kind === 'wall' ? '牆' : '參考紙') + '的「' + NAMES[S.pick.pts.length] + '角」' + (root.BPW_HINT_TAIL || '（可先用滾輪放大，Esc 取消）');   // 平板版改成觸控說明
    h.style.display = 'block';
  }
  function addPickPoint(p) {
    S.pick.pts.push(p);
    if (S.pick.pts.length === 4) {
      var pts = IP.orderCorners(S.pick.pts), kind = S.pick.kind;
      S.pick = null; $('loupe').style.display = 'none';
      if (kind === 'wall') S.wallUser = pts;
      else { S.paper = pts; S.paperAuto = false; setStatus('paperStatus', '已手動設定參考紙四角，可拖曳綠點微調', 'ok'); }
      recompute();
    }
    updateHint(); render();
  }

  // ---------- measurement ----------
  function currentF35() {
    var L = S.settings.lens;
    if (L === 'none') return null;
    if (L === 'auto') return (S.exif && S.exif.focal35) ? S.exif.focal35 : null;
    if (L === 'custom') return S.settings.customF > 0 ? S.settings.customF : null;
    return parseFloat(L);
  }
  function recompute() {
    S.result = null;
    if (S.img && S.wallUser.length === 4 && !S.pick) {
      if (S.settings.snap && S.luma) {
        var sc = Math.max(1, Math.max(S.img.w, S.img.h) / 2364), R = Math.max(8, Math.round(10 * sc));
        var sn = IP.snapWall(S.luma, S.img.w, S.img.h, S.wallUser, R, 1.5 * sc);
        S.wallCorners = sn.corners; S.snapOk = sn.ok;
      } else { S.wallCorners = S.wallUser.slice(); S.snapOk = [false, false, false, false]; }
    }
    if (S.img && S.paper && S.wallCorners && !S.pick) {
      var o = { paper: S.paper, wall: S.wallCorners, refW: S.settings.refW, refH: S.settings.refH,
                f35: currentF35(), imgW: S.img.w, imgH: S.img.h };
      try {
        var r = G.measure(o);
        if (isFinite(r.width) && isFinite(r.height) && r.width > 0 && r.height > 0) {
          var allSnap = S.snapOk && S.snapOk.every(function (v) { return v; });
          S.result = { r: r, u: G.uncertainty(o, 150, 0.5, allSnap ? 1.5 : 3.0), f35: o.f35 };
        }
      } catch (e) { S.result = null; }
    }
    render(); showResult(); updateWallStatus(); updateLensStatus();
  }

  // ---------- 寶哥畫空間: measured sides -> room ----------
  function cm(mm) { return Math.round(mm) / 10; }
  function roomPayload() {
    var R = S.roomRec, hs = [R.HL, R.HW].filter(function (v) { return v; });
    var H = hs.length ? hs.reduce(function (a, b) { return a + b; }, 0) / hs.length : null;
    return { L: R.L ? cm(R.L) : null, W: R.W ? cm(R.W) : null, H: H ? cm(H) : null };
  }
  function updateRoomUI() {
    $('roomSec').style.display = S.features.room ? 'block' : 'none';
    if (!S.features.room) return;
    var R = S.roomRec, p = roomPayload();
    $('btnAsL').disabled = !S.result; $('btnAsW').disabled = !S.result;
    $('btnRoom').disabled = !(R.L || R.W);
    var line = function (label, v, name, empty) { return label + '：' + (v ? v.toFixed(1) + ' cm　← ' + name : empty); };
    var hNote = R.HL && R.HW ? '（兩面牆平均）' : '';
    $('roomVals').innerHTML = [line('長 L', p.L, R.nameL, '未設定'), line('寬 W', p.W, R.nameW, '未設定'),
      '高 H：' + (p.H ? p.H.toFixed(1) + ' cm' + hNote : '未設定')].map(function (t) {
      return t.replace(/&/g, '&amp;').replace(/</g, '&lt;');
    }).join('<br>');
  }
  function setSide(which) {
    if (!S.result) return;
    var r = S.result.r;
    if (which === 'L') { S.roomRec.L = r.width; S.roomRec.HL = r.height; S.roomRec.nameL = S.name || '這張照片'; }
    else { S.roomRec.W = r.width; S.roomRec.HW = r.height; S.roomRec.nameW = S.name || '這張照片'; }
    setStatus('roomStatus', '已記錄，' + (S.roomRec.L && S.roomRec.W ? '可以按「建立空間」' : '可以再量另一面牆，或直接按「建立空間」'), 'ok');
    updateRoomUI();
  }

  function showResult() {
    var el = $('result'), warn = $('warn'), has = !!S.result;
    $('btnPreview').disabled = !has; $('btnDraw').disabled = !has;
    updateRoomUI();
    if (!has) {
      el.className = 'small';
      el.textContent = !S.img ? '還沒有結果' : !S.paper ? '請先設定參考紙' : S.wallUser.length < 4 ? '請點牆的四個角' : '無法計算，請檢查點的位置';
      warn.textContent = ''; return;
    }
    var r = S.result.r, u = S.result.u, f = S.result.f35, src = S.settings.lens === 'auto' ? '照片資料' : '手動選擇';
    el.className = '';
    el.innerHTML = '<div>寬 <span class="big">' + fmt(r.width) + '</span> mm <span class="small">（約 ±' + fmt(u.width) + '）</span></div>' +
      '<div>高 <span class="big">' + fmt(r.height) + '</span> mm <span class="small">（約 ±' + fmt(u.height) + '）</span></div>' +
      '<div class="small">' + (f ? '用鏡頭焦距 ' + f + ' mm（' + src + '）推算比例，參考紙當比例尺' : '用參考紙推算比例（沒有指定鏡頭）') + '</div>';
    var w = [], px = paperPx(), dev = Math.max.apply(null, r.angles.map(function (a) { return Math.abs(a - 90); }));
    if (Math.min(px[0], px[1]) < 60) w.push('參考紙在照片中只有約 ' + Math.round(Math.min(px[0], px[1])) + ' 像素寬，誤差會比較大：請靠近一點拍或用原始照片。');
    if (r.check) {
      var d = Math.max(Math.abs(r.width - r.check.width) / r.width, Math.abs(r.height - r.check.height) / r.height);
      if (d > 0.02) w.push('用鏡頭焦距和用參考紙推算的比例相差 ' + (d * 100).toFixed(1) + '%：請確認鏡頭設定正確、參考紙有貼平。');
    }
    if (dev > 2.5) w.push('推算出的牆角不是直角（差 ' + dev.toFixed(1) + '°）：請確認四個角點得準、牆面是長方形。');
    if (r.method === 'C' && r.paperRms > 2.0) w.push('參考紙形狀和設定的尺寸不太一致：請確認尺寸設定、紙有貼平，或鏡頭設定是否正確。');
    warn.innerHTML = w.map(function (t) { return '⚠ ' + t; }).join('<br>');
  }
  function updateWallStatus() {
    if (S.wallUser.length < 4 || S.pick) { setStatus('wallStatus', S.pick && S.pick.kind === 'wall' ? '依序點：左上 → 右上 → 右下 → 左下' : ''); return; }
    if (!S.settings.snap) { setStatus('wallStatus', '未啟用吸附，使用你點的位置'); return; }
    var names = ['上', '右', '下', '左'];
    setStatus('wallStatus', '吸附：' + names.map(function (n, i) { return n + (S.snapOk[i] ? '✓' : '✗'); }).join(' ') + '（✗ 的邊用你點的位置）');
  }
  function updateLensStatus() {
    var e = S.exif, t;
    if (!e) t = '';
    else if (e.focal35) t = '照片資料：' + [e.make, e.model].join(' ').trim() + ' 等效焦距 ' + e.focal35 + ' mm' + (e.lens ? '（' + e.lens + '）' : '');
    else t = '照片沒有鏡頭資料（LINE 傳過的照片會被移除）' + (S.settings.lens === 'auto' ? '，目前用參考紙推算比例。若知道是 0.5× 拍的請手動選擇' : '');
    setStatus('lensStatus', t);
  }

  // ---------- canvas interaction ----------
  function pointOf(h) { return h.kind === 'wall' ? S.wallUser[h.i] : S.paper[h.i]; }
  function setPointOf(h, p) { if (h.kind === 'wall') S.wallUser[h.i] = p; else S.paper[h.i] = p; }
  function hitHandle(sx, sy) {
    var best = null, bd = root.BPW_HIT || 12;   // 平板版：手指點的範圍放大（BPW_HIT）
    function test(list, kind) {
      if (!list) return;
      list.forEach(function (p, i) { var s = V.toScreen(p), d = Math.hypot(s[0] - sx, s[1] - sy); if (d < bd) { bd = d; best = { kind: kind, i: i }; } });
    }
    test(S.wallUser.length === 4 ? S.wallUser : null, 'wall'); test(S.paper, 'paper');
    return best;
  }
  function evPos(e) { var r = $('cv').getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; }
  var nudgeTimer = null;

  function bindCanvas() {
    var cv = $('cv');
    cv.addEventListener('pointerdown', function (e) {
      if (!S.img) return;
      var p = evPos(e);
      try { cv.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
      if (e.button === 0 && S.pick) { addPickPoint(V.toImage(p[0], p[1])); return; }
      if (e.button === 0) {
        var h = hitHandle(p[0], p[1]);
        if (h) {
          var s = V.toScreen(pointOf(h));
          S.sel = h; S.drag = { h: h, mx: p[0], my: p[1], start: pointOf(h).slice(), shift: e.shiftKey };
          if (h.kind === 'wall') { S.wallCorners = S.wallUser.slice(); S.snapOk = null; }
          render(); V.loupe(S, pointOf(h)); return;
        }
        S.sel = null;
      }
      S.pan = { x: p[0], y: p[1] }; render();
    });
    cv.addEventListener('pointermove', function (e) {
      if (!S.img) return;
      var p = evPos(e);
      if (S.drag) {
        var f = e.shiftKey ? 0.2 : 1, a = V.toScreen(S.drag.start);   // Shift = fine adjustment
        var q = V.toImage(a[0] + (p[0] - S.drag.mx) * f, a[1] + (p[1] - S.drag.my) * f);
        if (e.shiftKey !== S.drag.shift) { S.drag.shift = e.shiftKey; S.drag.mx = p[0]; S.drag.my = p[1]; S.drag.start = pointOf(S.drag.h).slice(); q = pointOf(S.drag.h); }
        setPointOf(S.drag.h, q);
        if (S.drag.h.kind === 'wall') S.wallCorners = S.wallUser.slice();
        render(); V.loupe(S, q); return;
      }
      if (S.pan) { V.panBy(p[0] - S.pan.x, p[1] - S.pan.y); S.pan = { x: p[0], y: p[1] }; render(); return; }
      if (S.pick) { S.mouse = V.toImage(p[0], p[1]); render(); V.loupe(S, S.mouse); }
    });
    var end = function () {
      if (S.drag) {
        var h = S.drag.h; S.drag = null; $('loupe').style.display = 'none';
        if (h.kind === 'paper' && S.paperAuto) { S.paperAuto = false; setStatus('paperStatus', '參考紙四角已手動微調', 'ok'); }
        recompute();
      }
      S.pan = null;
    };
    cv.addEventListener('pointerup', end);
    cv.addEventListener('pointercancel', end);
    cv.addEventListener('pointerleave', function () { if (S.pick) { S.mouse = null; $('loupe').style.display = 'none'; render(); } });
    cv.addEventListener('wheel', function (e) {
      e.preventDefault(); if (!S.img) return;
      var p = evPos(e); V.zoomAt(p[0], p[1], e.deltaY < 0 ? 1.25 : 0.8); render();
    }, { passive: false });
    cv.addEventListener('contextmenu', function (e) { e.preventDefault(); });
    document.addEventListener('keydown', function (e) {
      var tag = e.target && e.target.tagName;
      if (tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA') return;
      if (e.key === 'Escape') { if ($('previewModal').style.display === 'flex') $('previewModal').style.display = 'none'; else cancelPick(); return; }
      if (e.key === 'f' || e.key === 'F') { V.fit(); render(); return; }
      var dir = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] }[e.key];
      if (dir && S.sel && !S.pick) {
        e.preventDefault();
        var st = e.shiftKey ? 2 : 0.25, q = pointOf(S.sel);
        setPointOf(S.sel, [q[0] + dir[0] * st, q[1] + dir[1] * st]);
        if (S.sel.kind === 'wall') { S.wallCorners = S.wallUser.slice(); S.snapOk = null; }
        render(); V.loupe(S, pointOf(S.sel));
        clearTimeout(nudgeTimer);
        nudgeTimer = setTimeout(function () { $('loupe').style.display = 'none'; recompute(); }, 600);
      }
    });
  }

  // ---------- side panel ----------
  function bindPanel() {
    $('btnPick').onclick = function () { if (hasSU()) root.sketchup.pickImage(); else $('fileInput').click(); };
    $('fileInput').onchange = function () {
      var f = this.files && this.files[0]; if (!f) return;
      var rd = new FileReader();
      rd.onload = function () { loadBytes(new Uint8Array(rd.result), f.name, f.type); };
      rd.readAsArrayBuffer(f); this.value = '';
    };
    $('btnDetect').onclick = function () { if (!S.img) return; S.pick = null; updateHint(); busy(true, '尋找參考紙…'); later(function () { detectPaper(); busy(false); }); };
    $('btnPaperManual').onclick = function () { startPick('paper'); };
    $('btnWall').onclick = function () { startPick('wall'); };
    $('btnWallClear').onclick = function () { S.wallUser = []; S.wallCorners = null; S.result = null; startPick('wall'); };
    var num = function (id, key) {
      $(id).onchange = function () {
        var v = parseFloat(this.value);
        if (!(v > 0)) { this.value = S.settings[key]; return; }
        S.settings[key] = v; saveSettings(); recompute();
      };
    };
    num('refW', 'refW'); num('refH', 'refH'); num('customF', 'customF');
    $('lens').onchange = function () { S.settings.lens = this.value; $('customRow').style.display = this.value === 'custom' ? 'flex' : 'none'; saveSettings(); recompute(); };
    $('snap').onchange = function () { S.settings.snap = this.checked; saveSettings(); recompute(); };
    $('addDims').onchange = function () { S.settings.addDims = this.checked; saveSettings(); };
    $('btnPreview').onclick = function () {
      if (!S.result) return;
      busy(true, '產生預覽…');
      later(function () {
        var r = S.result.r;
        V.renderPreview($('pv'), S.img, r.H, r.wallMM, r, Math.min(1100, root.innerWidth - 60), root.innerHeight - 90);
        busy(false); $('previewModal').style.display = 'flex';
      });
    };
    $('btnClosePreview').onclick = function () { $('previewModal').style.display = 'none'; };
    $('btnDraw').onclick = function () {
      if (!S.result) return;
      var payload = { width: Math.round(S.result.r.width), height: Math.round(S.result.r.height), addDims: !!S.settings.addDims };
      if (hasSU()) { root.sketchup.drawWall(JSON.stringify(payload)); setStatus('drawStatus', '已送到 SketchUp，請在畫面上點一下放置牆面（Esc 取消）', 'ok'); }
      else setStatus('drawStatus', '（目前不在 SketchUp 中）' + JSON.stringify(payload));
    };
    $('btnAsL').onclick = function () { setSide('L'); };
    $('btnAsW').onclick = function () { setSide('W'); };
    $('btnRoomClear').onclick = function () {
      S.roomRec = { L: null, W: null, HL: null, HW: null, nameL: '', nameW: '' };
      setStatus('roomStatus', ''); updateRoomUI();
    };
    $('btnRoom').onclick = function () {
      var p = roomPayload();
      if (!(p.L || p.W)) return;
      if (hasSU() && root.sketchup.createRoom) {
        root.sketchup.createRoom(JSON.stringify(p));
        setStatus('roomStatus', '已開啟寶哥畫空間的「建立空間」視窗，請到 SketchUp 確認數字後按確定', 'ok');
      } else setStatus('roomStatus', '（目前不在 SketchUp 中）' + JSON.stringify(p));
    };
  }

  // ---------- bridge for Ruby ----------
  root.BPW = {
    imgBegin: function (meta) { S.chunks = []; S.meta = meta || {}; busy(true, '讀取照片…'); },
    imgChunk: function (s) { if (S.chunks) S.chunks.push(s); },
    imgEnd: function () {
      if (!S.chunks) return;
      var b64 = S.chunks.join(''); S.chunks = null;
      try { loadBytes(b64ToBytes(b64), S.meta.name || '', S.meta.mime || 'image/jpeg'); } catch (e) { fail('讀取照片失敗：' + e.message); }
    },
    fromRuby: function (msg) {
      if (!msg || msg.type !== 'settings') return;
      if (msg.features) S.features = { room: !!msg.features.room };
      if (msg.title) { document.title = msg.title; $('appTitle').textContent = msg.title; }
      mergeSettings(msg.data); applySettingsToUI(); recompute();
    },
    notify: function (text, ok) { setStatus('drawStatus', text, ok === false ? 'bad' : 'ok'); },
    loadBytes: loadBytes, state: S, recompute: recompute
  };

  function init() {
    V.init($('cv'), $('loupe'));
    bindCanvas(); bindPanel();
    root.addEventListener('resize', function () { V.resize(); render(); });
    if (hasSU()) { applySettingsToUI(); root.sketchup.ready(); }
    else {
      try { mergeSettings(JSON.parse(root.localStorage.getItem('bpw_settings') || 'null')); } catch (e) { /* ignore */ }
      applySettingsToUI();
    }
    showResult();
  }
  init();
})(typeof window !== 'undefined' ? window : this);
`;var l=`/* 寶哥照片量牆 — 平板版轉接（取代 SketchUp 的 sketchup.* 呼叫、加上觸控操作）
   ・選照片：平板的「拍照／照片圖庫」
   ・設定存在平板（localStorage）
   ・「建立空間」：回到 App，開建立空間視窗並帶入量到的長、寬、高
   ・觸控：兩指縮放／平移；點牆角時手指按住可以移動（左上角放大鏡），放開才定點 */
(function (root) {
  'use strict';
  root.BPW_HIT = 28;
  root.BPW_HINT_TAIL = '（兩指可以放大，按住拖曳看放大鏡，放開定點）';
  var KEY = 'bpw_settings';
  function load() { try { return JSON.parse(root.localStorage.getItem(KEY) || 'null'); } catch (e) { return null; } }
  root.sketchup = {
    ready: function () {
      root.BPW.fromRuby({ type: 'settings', title: '照片量牆', features: { room: true }, data: load() || {} });
    },
    pickImage: function () { document.getElementById('fileInput').click(); },
    saveSettings: function (j) { try { root.localStorage.setItem(KEY, j); } catch (e) { /* 無痕模式 */ } },
    drawWall: function () { /* 平板版沒有這個功能 */ },
    createRoom: function (j) {
      var p = JSON.parse(j);
      if (root.parent && root.parent !== root && root.parent.glbgPhotoRoom) root.parent.glbgPhotoRoom(p);
    }
  };

  // ---------- 觸控 ----------
  function setup() {
    var stage = document.getElementById('stage');
    var cv = document.getElementById('cv');
    var V = root.BPWView;
    var touches = {};
    var count = 0;
    var pinch = null;
    var held = null;
    var lastId = null;
    function pos(e) { var r = cv.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; }
    function pts() { return Object.keys(touches).map(function (k) { return touches[k]; }); }
    function send(type, x, y, id) {
      var ev = new PointerEvent(type, { clientX: x, clientY: y, pointerId: id, pointerType: 'touch', isPrimary: true, button: 0, buttons: type === 'pointerup' ? 0 : 1, bubbles: true, cancelable: true });
      ev.__bpw = true;
      cv.dispatchEvent(ev);
    }
    function redraw() { if (root.BPW && root.BPW.state) V.render(root.BPW.state); }
    stage.addEventListener('pointerdown', function (e) {
      if (e.pointerType !== 'touch' || e.__bpw) return;
      touches[e.pointerId] = [e.clientX, e.clientY];
      count = Object.keys(touches).length;
      if (count >= 2) {
        e.stopPropagation(); e.preventDefault();
        held = null;
        if (lastId !== null) send('pointercancel', 0, 0, lastId);
        var p = pts();
        pinch = { d: Math.hypot(p[0][0] - p[1][0], p[0][1] - p[1][1]), c: [(p[0][0] + p[1][0]) / 2, (p[0][1] + p[1][1]) / 2] };
        document.getElementById('loupe').style.display = 'none';
        return;
      }
      lastId = e.pointerId;
      var S = root.BPW && root.BPW.state;
      if (S && S.img && S.pick) {   // 點牆角：先不定點，等手指放開
        e.stopPropagation();
        held = { id: e.pointerId, x: e.clientX, y: e.clientY };
        send('pointermove', e.clientX, e.clientY, e.pointerId);
      }
    }, true);
    stage.addEventListener('pointermove', function (e) {
      if (e.pointerType !== 'touch' || e.__bpw) return;
      if (touches[e.pointerId]) touches[e.pointerId] = [e.clientX, e.clientY];
      if (pinch) {
        e.stopPropagation();
        var p = pts();
        if (p.length < 2) return;
        var d = Math.hypot(p[0][0] - p[1][0], p[0][1] - p[1][1]);
        var c = [(p[0][0] + p[1][0]) / 2, (p[0][1] + p[1][1]) / 2];
        var r = cv.getBoundingClientRect();
        V.panBy(c[0] - pinch.c[0], c[1] - pinch.c[1]);
        if (pinch.d > 1 && d > 1) V.zoomAt(c[0] - r.left, c[1] - r.top, d / pinch.d);
        pinch = { d: d, c: c };
        redraw();
        return;
      }
      if (held && e.pointerId === held.id) { held.x = e.clientX; held.y = e.clientY; }
    }, true);
    function up(e) {
      if (e.pointerType !== 'touch' || e.__bpw) return;
      delete touches[e.pointerId];
      count = Object.keys(touches).length;
      if (pinch) {
        e.stopPropagation();
        if (count === 0) pinch = null;
        return;
      }
      if (held && e.pointerId === held.id) {
        e.stopPropagation();
        var h = held;
        held = null;
        if (e.type === 'pointerup') { send('pointerdown', h.x, h.y, h.id); send('pointerup', h.x, h.y, h.id); }
        document.getElementById('loupe').style.display = 'none';
      }
    }
    stage.addEventListener('pointerup', up, true);
    stage.addEventListener('pointercancel', up, true);
    var ad = document.getElementById('addDims');
    if (ad && ad.parentNode) ad.parentNode.style.display = 'none';
    var em = document.getElementById('empty');
    if (em) em.textContent = '請先按「選擇照片」（可以直接拍照）';
    document.getElementById('fileInput').setAttribute('accept', 'image/*');
    // 操作說明改成觸控版
    var ul = document.querySelector('details ul');
    if (ul) {
      ul.innerHTML = ['兩指張開／捏合：放大縮小；兩指拖曳：移動畫面',
        '點牆角：手指按住可以移動，左上角有放大鏡，放開才定點',
        '拖曳圓點可微調位置（一樣有放大鏡）',
        '點牆角順序：左上 → 右上 → 右下 → 左下。被擋住的角，點在估計的位置即可',
        '紅色實線＝已吸附到牆邊，虛線＝使用你點的位置',
        '只有和參考紙在同一平面的東西才量得準',
        '用原始照片最準（LINE 傳過的照片會變模糊、也沒有鏡頭資料）'].map(function (t) { return '<li>' + t + '</li>'; }).join('');
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setup); else setup();
})(window);
`;var p=`/* 平板版：按鈕、字放大；畫布不讓瀏覽器自己縮放捲動；沒有「在 SketchUp 畫出牆面」 */
html, body { font-size: 15px; -webkit-text-size-adjust: 100%; }
#cv { touch-action: none; }
#side { flex-basis: 320px; width: 320px; -webkit-overflow-scrolling: touch; }
button { min-height: 40px; padding: 6px 12px; font-size: 15px; }
button.primary { min-height: 46px; font-size: 16px; }
input[type=number] { width: 76px; min-height: 36px; font-size: 16px; }
select { min-height: 40px; font-size: 16px; }
input[type=checkbox] { width: 22px; height: 22px; }
.small, .status, .warn { font-size: 13px; }
#hint { font-size: 15px; white-space: normal; max-width: 92%; text-align: center; }
#btnDraw, #drawStatus { display: none !important; }
@media (max-width: 860px) {
  #main { flex-direction: column; }
  #stage { flex: 1 1 60%; }
  #side { flex: 0 0 40%; width: auto; border-left: 0; border-top: 1px solid var(--line); }
}
`;var u=t=>`<script>
${t.replace(/<\/script/gi,"<\\/script")}
<\/script>`;function C(){let t={"geom.js":i,"imgproc.js":n,"exif.js":a,"view.js":o,"app.js":s},e=r.replace("</head>",`<style>
${p}
</style>
</head>`);e=e.replace('<script src="geom.js"><\/script>',`${u(l)}
<script src="geom.js"><\/script>`);for(let[c,d]of Object.entries(t))e=e.replace(`<script src="${c}"><\/script>`,u(d));return e}export{C as photoWallDoc};
