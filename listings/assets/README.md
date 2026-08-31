# サムネイル画像の作り方

スキルマーケットのサービス画像（**3:2 / 660×440px 推奨**、出力は 1320×880）を作る手順。

```
listings/assets/
├─ 02-teiji-jikko.png     ← 出品37160 に登録している画像（完成品）
├─ 03-henkou-kenchi.png   ← 出品37161
├─ 04-gyomu-system.png    ← 出品37162
├─ 01-ai-shindan.png      ← 出品34217（旧・Canva製）
├─ build-thumbnails.mjs   ← pptx を組み立てる
├─ pptx/*.pptx            ← PowerPointで直接編集できる元ファイル（1ファイル1スライド）
└─ illust/                ← イラストの元。SVG → 透過PNG
   ├─ gen-illust.mjs
   └─ *.svg / *.html / *.png
```

## 手順

```bash
# 1. イラストを SVG から透過PNGにする（イラストを変えたときだけ）
node listings/assets/illust/gen-illust.mjs
CH="/c/Program Files/Google/Chrome/Application/chrome.exe"
for f in 01-teiji 02-kenchi 03-system; do
  "$CH" --headless --disable-gpu --hide-scrollbars --default-background-color=00000000 \
    --force-device-scale-factor=2 --window-size=600,600 \
    --screenshot="$(cygpath -w "$PWD/listings/assets/illust/$f.png")" \
    "file:///$(cygpath -w "$PWD/listings/assets/illust/$f.html")"
done

# 2. pptx を組み立てる
node listings/assets/build-thumbnails.mjs

# 3. pptx を PNG にする（LibreOffice）
SO="/c/Program Files/LibreOffice/program/soffice.exe"
for f in 02-teiji-jikko 03-henkou-kenchi 04-gyomu-system; do
  "$SO" --headless --norestore \
    --convert-to 'png:impress_png_Export:{"PixelWidth":{"type":"long","value":1320},"PixelHeight":{"type":"long","value":880}}' \
    --outdir "$(cygpath -w "$PWD/listings/assets")" \
    "$(cygpath -w "$PWD/listings/assets/pptx/$f.pptx")"
done
```

**出力したPNGは必ず目視で確認する。** フォント置換や文字の見切れは実行ログには出ない。

## 手で編集したいとき

`pptx/*.pptx` を PowerPoint で開けば、文字も配置も自由に変えられる。
イラストを Canva や AI 生成の画像に差し替える場合は、画像を右クリック →「図の変更」。
編集後は PowerPoint の「ファイル → エクスポート → 画像」、
または上の手順3（LibreOffice）で PNG にする。

**PowerPoint で編集したら、`build-thumbnails.mjs` を再実行しないこと**（pptx が上書きされる）。
スクリプト側にも同じ変更を入れるか、以後は pptx を正とする。

## 決まりごと（実測にもとづく）

2026-08-31 に IT・プログラミング カテゴリの上位出品のサムネイルを実測して決めた方針。

| 決めたこと | 理由 |
|---|---|
| 背景は明るく（`FFFDF8`） | 上位のサムネイルは白・クリーム系。濃紺は一覧で沈む |
| 見出しは7文字×2行まで、34pt | 一覧のサムネイルは約110×73px。この大きさで読めるのは見出しだけ |
| イラストを必ず入れる | 上位は全部イラスト入り。文字だけの画像は上位に無い |
| 見出しフォントは `HGP創英角ｺﾞｼｯｸUB` | 太くて親しみやすい。**半角カナ**（ｺﾞｼｯｸ）でないとフォントが解決されず明朝に置換される |
| 装飾の下線・カラーバーを使わない | AI生成っぽさが出る |

## 落とし穴

- **`HGP創英角ゴシックUB`（全角カナ）はヒットしない。** レジストリの登録名は
  `HG創英角ｺﾞｼｯｸUB & HGP創英角ｺﾞｼｯｸUB & HGS創英角ｺﾞｼｯｸUB` で、カナが半角。
  間違えると LibreOffice が明朝で描画する（PowerPoint では正しく出るので気づきにくい）
- **`soffice --convert-to png` は1枚目のスライドしか書き出さない。** だから1ファイル1スライドにしている
- **pptx スキルの `scripts/office/soffice.py` は Windows では動かない**（`socket.AF_UNIX` が無い）。
  `soffice.exe` を直接呼ぶこと
- **`scripts/office/validate.py` は `PYTHONUTF8=1` を付けて実行する。**
  付けないと cp932 で読もうとして、正常なファイルでも「FAILED」になる
