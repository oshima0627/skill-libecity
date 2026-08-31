// スキルマーケットのサムネイルを PowerPoint (.pptx) で組み立てる。
//
//   node listings/assets/build-thumbnails.mjs
//
// 出力: listings/assets/pptx/<id>.pptx（1ファイル1スライド・3:2）
// PNG 化は soffice で行う。手順は listings/assets/README.md を参照。
//
// イラストは listings/assets/illust/*.png（gen-illust.mjs で生成した透過PNG）。
// PowerPoint で開けば文字も配置も自由に編集できる。差し替えたい場合は
// 画像を右クリック →「図の変更」で Canva や AI 生成の画像に置き換えられる。

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pptxgen from 'pptxgenjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, 'pptx');
fs.mkdirSync(OUT, { recursive: true });

const INK = '1F3348';
const MUTED = '6B7E90';
const BG = 'FFFDF8';
const HEAD_FONT = 'HGP創英角ｺﾞｼｯｸUB'; // 半角カナ。レジストリ登録名と一致させること
const BODY_FONT = 'メイリオ';

const CARDS = [
  {
    id: '02-teiji-jikko',
    accent: '2A9FD6',
    kicker: '定時実行の自動化',
    head: ['毎朝のPC作業、', '無人で。'],
    illust: '01-teiji.png',
    notes: 'リベシティ スキルマーケット 出品37160 のサムネイル',
  },
  {
    id: '03-henkou-kenchi',
    accent: '2FA36A',
    kicker: 'サイトの変更検知',
    head: ['更新を、', '見逃さない。'],
    illust: '02-kenchi.png',
    notes: 'リベシティ スキルマーケット 出品37161 のサムネイル',
  },
  {
    id: '04-gyomu-system',
    accent: 'D99312',
    kicker: '業務システム開発',
    head: ['テストを付けて', '納品します。'],
    illust: '03-system.png',
    notes: 'リベシティ スキルマーケット 出品37162 のサムネイル',
  },
  {
    id: '01-ai-shindan',
    accent: '4F63C4',
    kicker: 'AI活用の現状診断',
    head: ['やらない事も、', '書きます。'],
    illust: '04-shindan.png',
    notes: 'リベシティ スキルマーケット 出品34217 のサムネイル',
  },
  {
    id: '05-mail-ai',
    accent: 'DB553F',
    kicker: '問い合わせの自動返信',
    head: ['返信を、', '待たせない。'],
    illust: '05-mail.png',
    notes: 'リベシティ スキルマーケット 出品34218 のサムネイル',
  },
  {
    id: '06-sagyo-jidoka',
    accent: '10808A',
    kicker: '毎日の繰り返し作業',
    head: ['コピペと転記、', 'やめませんか。'],
    illust: '06-jidoka.png',
    notes: 'リベシティ スキルマーケット 出品34120 のサムネイル',
  },
];

for (const c of CARDS) {
  const pres = new pptxgen();
  pres.defineLayout({ name: 'THUMB32', width: 6.6, height: 4.4 });
  pres.layout = 'THUMB32';

  const slide = pres.addSlide();
  slide.background = { color: BG };

  // イラスト（右）
  slide.addImage({
    path: path.join(HERE, 'illust', c.illust),
    x: 3.42,
    y: 0.66,
    w: 3.05,
    h: 3.05,
  });

  // キッカー
  slide.addText(c.kicker, {
    isTextBox: true,
    x: 0.42,
    y: 1.18,
    w: 3.0,
    h: 0.32,
    margin: 0,
    fontFace: BODY_FONT,
    fontSize: 15,
    bold: true,
    color: c.accent,
    charSpacing: 1,
  });

  // 見出し
  slide.addText(c.head.map((t, i) => ({ text: t, options: { breakLine: i < c.head.length - 1 } })), {
    isTextBox: true,
    x: 0.4,
    y: 1.58,
    w: 3.2,
    h: 1.3,
    margin: 0,
    fontFace: HEAD_FONT,
    fontSize: 34,
    color: INK,
    lineSpacingMultiple: 1.16,
    valign: 'top',
  });

  // 名前
  slide.addText('なおたか@沖縄の業務システム屋×AI', {
    isTextBox: true,
    x: 0.42,
    y: 3.02,
    w: 3.2,
    h: 0.3,
    margin: 0,
    fontFace: BODY_FONT,
    fontSize: 11,
    color: MUTED,
  });

  slide.addNotes(c.notes);

  const file = path.join(OUT, c.id + '.pptx');
  await pres.writeFile({ fileName: file });
  console.log('wrote ' + file);
}
