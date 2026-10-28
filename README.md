# 寶哥畫空間 平板版 1.0.0

SketchUp 外掛「寶哥畫空間」的平板 App（網頁 App，iPad／Android／電腦瀏覽器都能用，加入主畫面後可離線）。
現場量牆（照片量牆、單面牆畫面）→ 畫空間 → 門窗水電、柱樑、隔間牆、管線、天花造型 →
工程報表（Excel／PDF）、施工圖 PDF、彩色圖 → 匯出 JSON 給 SketchUp（外掛 1.10.0 起可以匯入／匯出）。單位一律公分。

## 資料夾

| 路徑 | 內容 |
|---|---|
| `src/calc/` | 計算模組：由外掛 `calc.rb`、`calc2.rb` 逐函式移植（`ruby.js` 是 Ruby 相容的數字處理） |
| `src/app/` | App：資料模型、3D、單面牆畫面、參數視窗、存檔、管線、隔間牆、報表、施工圖、彩色圖、密碼、音效 |
| `src/photowall/` | 照片量牆：外掛 `photo_wall` 的網頁介面（計算沒改），`tablet.js` 是平板轉接（觸控、選照片、帶入建立空間） |
| `public/` | 首頁、App 圖示、安裝設定、離線快取範本、PDF 字型（`fonts/`，授權見 `fonts/OFL.txt`）、按鈕音效 |
| `plugin/` | SketchUp 外掛（1.10.0 起加了 `json_io.rb` 匯入／匯出平板 JSON；1.10.1 修正 Windows 上「記住上次的資料夾」） |
| `tests/` | 和外掛逐數字比對的測試、平板模擬操作測試 |
| `tools/` | 打包程式、字型子集化工具 |
| `docs/` | JSON 交換格式 |
| `dist/` | 打包結果（放到 GitHub Pages 的就是這個資料夾的內容） |

## 和外掛的對應

| 外掛 | 平板版 |
|---|---|
| `calc.rb`、`calc2.rb` | `src/calc/`（20 萬筆隨機資料逐數字相同） |
| `core.rb`、`tools.rb`、`ui.rb` | `src/app/model.js`、`main.js`、`tools2.js`、`render3d.js`、`viewer.js` |
| `report.rb`、`report_xlsx.rb` | `report.js`（數量、金額：560 個隨機案場、7.3 萬個數值逐一相同）、`xlsx.js`（Excel 的 XML 和外掛逐字相同）、`reportview.js`（畫面、PDF） |
| `drawing.rb`、`drawing2.rb` | `drawing.js`（版面、標註逐段移植；線稿用 `shoot.js` 離屏繪製，剖到的牆加灰底） |
| `figure.rb` | `figure.js`（視角計算）、`shoot.js`、`export.js`（9 張彩色圖 JPG／PDF） |
| `photo_wall/` | `src/photowall/`（原檔＋平板轉接） |
| `auth.rb` | `auth.js`（密碼相同；鎖定後可用安裝密碼重新啟用） |
| `sounds/` | `public/sounds/`、`sound.js` |

## 指令

```bash
npm install
node tools/build.mjs                       # 打包到 dist/（也會產生 preview/ 單檔試用版）
cd dist && python3 -m http.server 8765     # 本機測試伺服器（另開一個終端機）

# 和外掛逐數字比對（需要 Ruby）
ruby tests/golden_gen.rb plugin/glbg_space tests/golden.json && node tests/golden_check.mjs
node <打包後的 report_gen> cases.json 500 && ruby tests/report_golden.rb plugin/glbg_space cases.json golden.json
node <打包後的 report_check> golden.json   # 工程報表
node <打包後的 xlsx_check> golden.json out.xlsx   # Excel
ruby tests/plugin_json_test.rb plugin/glbg_space case.json export.json   # 外掛 JSON 匯入匯出（模擬 SketchUp）

# 平板模擬操作（Playwright；自動測試在本機會跳過密碼）
node tests/e2e_1a.mjs 截圖資料夾
node tests/e2e_1b.mjs 截圖資料夾
node tests/e2e_report.mjs 截圖資料夾 case.json
node tests/e2e_outputs.mjs 截圖資料夾 case.json
node tests/e2e_photowall.mjs 截圖資料夾
node tests/e2e_auth.mjs 截圖資料夾
```

## 放到 GitHub Pages

1. 建一個 GitHub 儲存庫（建議：原始碼放「私人」儲存庫，網站另外一個「公開」儲存庫只放 `dist/` 的內容）。
2. 把 `dist/` 裡的所有檔案（含 `.nojekyll`）放到公開儲存庫的根目錄。
3. 儲存庫「Settings → Pages」：Source 選「Deploy from a branch」、`main`、`/(root)`。
4. 幾分鐘後網址是 `https://帳號.github.io/儲存庫名稱/`。平板用 Safari（iPad）或 Chrome（Android）打開 →「加入主畫面」。
5. 之後改版：重新打包，把新的 `dist/` 覆蓋上去；平板開 App 回到案場列表時會自動更新。
