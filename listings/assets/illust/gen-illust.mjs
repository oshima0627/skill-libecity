// サムネイル用イラストを SVG で生成する。
// 出力: listings/assets/illust/<id>.svg → Chrome ヘッドレスで透過PNG化する。
import fs from 'fs';
import path from 'path';

const OUT = path.dirname(new URL(import.meta.url).pathname.replace(/^\//, ''));

const C = {
  ink: '#1f3348',      // 線・濃い部分
  cream: '#fff6e5',
  sky: '#5cc4f2',
  skyD: '#2a9fd6',
  mint: '#4fc98a',
  mintD: '#2fa36a',
  amber: '#f7b32b',
  amberD: '#d99312',
  coral: '#f4715f',
  indigo: '#4f63c4',
  teal: '#159aa6',
  gray: '#dfe7ee',
  white: '#ffffff',
};

const wrap = (inner) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
  <g stroke="${C.ink}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" fill="none">
  ${inner}
  </g></svg>`;

// ---------------------------------------------------------------- A: 定時実行
// 大きな丸時計（7:30）＋ ノートPC ＋ 歯車のループ ＋ Zzz
const A = wrap(`
  <circle cx="300" cy="300" r="250" fill="${C.cream}" stroke="none"/>

  <!-- 目覚まし時計（7時30分） -->
  <g>
    <path d="M136 148 l-28 -30" /><path d="M320 148 l28 -30" />
    <circle cx="228" cy="236" r="112" fill="${C.white}"/>
    <circle cx="228" cy="236" r="91" fill="${C.sky}" stroke="none" opacity="0.15"/>
    <line x1="228" y1="236" x2="228" y2="322" stroke-width="8"/>
    <line x1="228" y1="236" x2="185" y2="279" stroke-width="14"/>
    <circle cx="228" cy="236" r="12" fill="${C.ink}" stroke="none"/>
    <line x1="228" y1="138" x2="228" y2="152"/>
    <line x1="228" y1="320" x2="228" y2="334"/>
    <line x1="130" y1="236" x2="144" y2="236"/>
    <line x1="312" y1="236" x2="326" y2="236"/>
  </g>

  <!-- 歯車（時間が来たら勝手に動く） -->
  <g transform="translate(448,158)">
    <circle cx="0" cy="0" r="36" fill="${C.amber}"/>
    <circle cx="0" cy="0" r="14" fill="${C.white}"/>
    <line x1="0" y1="-50" x2="0" y2="-36"/><line x1="0" y1="36" x2="0" y2="50"/>
    <line x1="-50" y1="0" x2="-36" y2="0"/><line x1="36" y1="0" x2="50" y2="0"/>
    <line x1="-36" y1="-36" x2="-26" y2="-26"/><line x1="26" y1="26" x2="36" y2="36"/>
    <line x1="36" y1="-36" x2="26" y2="-26"/><line x1="-26" y1="26" x2="-36" y2="36"/>
  </g>

  <!-- 時刻が来たら実行される矢印 -->
  <g stroke="${C.skyD}" stroke-width="14">
    <path d="M292 338 l50 30"/>
    <path d="M318 364 l26 6 l-4 -26"/>
  </g>

  <!-- ノートPC（無人で動いている） -->
  <path d="M312 494 h176 l32 54 h-240 z" fill="${C.gray}"/>
  <rect x="334" y="382" width="132" height="112" rx="10" fill="${C.white}"/>
  <rect x="350" y="398" width="100" height="66" rx="6" fill="${C.skyD}" stroke="none" opacity="0.22"/>
  <path d="M372 428 l17 17 l30 -34" stroke="${C.mintD}" stroke-width="13"/>
`);

// ------------------------------------------------------------ B: サイト変更検知
// 3枚のページカード ＋ 虫眼鏡 ＋ 変化したカードのキラッ ＋ スマホ通知
const B = wrap(`
  <circle cx="300" cy="300" r="250" fill="${C.cream}" stroke="none"/>

  <!-- カード（監視対象のページ） -->
  <g>
    <rect x="92" y="206" width="146" height="192" rx="14" fill="${C.white}"/>
    <path d="M92 240 v-20 a14 14 0 0 1 14 -14 h118 a14 14 0 0 1 14 14 v20 z" fill="${C.gray}"/>
    <line x1="116" y1="272" x2="214" y2="272" stroke-width="12"/>
    <line x1="116" y1="306" x2="192" y2="306" stroke-width="12"/>
    <line x1="116" y1="340" x2="206" y2="340" stroke-width="12"/>
  </g>
  <g>
    <rect x="224" y="176" width="158" height="222" rx="14" fill="${C.white}"/>
    <path d="M224 212 v-22 a14 14 0 0 1 14 -14 h130 a14 14 0 0 1 14 14 v22 z" fill="${C.mint}"/>
    <line x1="250" y1="248" x2="356" y2="248" stroke-width="12"/>
    <line x1="250" y1="286" x2="330" y2="286" stroke="${C.coral}" stroke-width="15"/>
    <line x1="250" y1="324" x2="350" y2="324" stroke-width="12"/>
    <line x1="250" y1="362" x2="302" y2="362" stroke-width="12"/>
  </g>

  <!-- 変化のキラッ -->
  <g stroke="${C.amberD}" stroke-width="11">
    <line x1="404" y1="148" x2="404" y2="116"/>
    <line x1="430" y1="166" x2="456" y2="148"/>
    <line x1="378" y1="166" x2="352" y2="148"/>
  </g>

  <!-- 虫眼鏡（変わった行を見つける） -->
  <circle cx="330" cy="288" r="58" fill="${C.sky}" fill-opacity="0.20" stroke-width="10"/>
  <line x1="372" y1="330" x2="416" y2="374" stroke-width="17"/>

  <!-- スマホ＋通知ベル -->
  <rect x="400" y="352" width="116" height="176" rx="18" fill="${C.white}"/>
  <line x1="432" y1="376" x2="484" y2="376" stroke-width="9"/>
  <g transform="translate(458,448)">
    <path d="M-36 20 h72 c-9 -7 -10 -12 -10 -30 v-14 a26 26 0 0 0 -52 0 v14 c0 18 -1 23 -10 30 z" fill="${C.mint}"/>
    <line x1="0" y1="-50" x2="0" y2="-42"/>
    <path d="M-10 30 a10 10 0 0 0 20 0"/>
  </g>
`);

// ------------------------------------------------------- C: 業務システム開発
// 紙の山 →（矢印）→ 整ったアプリ画面 ＋ 合格チェックバッジ
const C3 = wrap(`
  <circle cx="300" cy="300" r="250" fill="${C.cream}" stroke="none"/>

  <!-- 紙の山（左・散らかっている） -->
  <g>
    <rect x="82" y="378" width="152" height="36" rx="8" fill="${C.white}"/>
    <rect x="92" y="338" width="152" height="36" rx="8" fill="${C.white}" transform="rotate(-6 168 356)"/>
    <rect x="86" y="296" width="152" height="36" rx="8" fill="${C.white}" transform="rotate(5 162 314)"/>
    <rect x="96" y="252" width="152" height="36" rx="8" fill="${C.white}" transform="rotate(-8 172 270)"/>
    <line x1="108" y1="396" x2="172" y2="396" stroke-width="9"/>
  </g>

  <!-- 矢印 -->
  <g stroke="${C.amberD}" stroke-width="21">
    <path d="M258 330 h66"/>
    <path d="M310 306 l28 24 l-28 24"/>
  </g>

  <!-- アプリ画面（右・整っている） -->
  <rect x="360" y="196" width="192" height="164" rx="14" fill="${C.white}"/>
  <path d="M360 232 v-22 a14 14 0 0 1 14 -14 h164 a14 14 0 0 1 14 14 v22 z" fill="${C.sky}"/>
  <g stroke-width="13">
    <line x1="390" y1="330" x2="390" y2="292"/>
    <line x1="424" y1="330" x2="424" y2="266"/>
    <line x1="458" y1="330" x2="458" y2="304"/>
  </g>
  <line x1="492" y1="270" x2="528" y2="270" stroke-width="10"/>
  <line x1="492" y1="300" x2="528" y2="300" stroke-width="10"/>
  <line x1="492" y1="330" x2="514" y2="330" stroke-width="10"/>

  <!-- テスト合格バッジ -->
  <circle cx="452" cy="440" r="70" fill="${C.mint}"/>
  <path d="M420 440 l22 24 l42 -50" stroke="${C.white}" stroke-width="17"/>
`);


// ------------------------------------------------------- D: AI活用の現状診断書
// 診断書 ＋ ○が2つ・×が1つ（「やらない方がいい事」も書くのが差別化）＋ ペン
const D = wrap(`
  <circle cx="300" cy="300" r="250" fill="${C.cream}" stroke="none"/>

  <!-- 診断書 -->
  <rect x="140" y="132" width="286" height="330" rx="18" fill="${C.white}"/>
  <path d="M140 196 v-46 a18 18 0 0 1 18 -18 h250 a18 18 0 0 1 18 18 v46 z" fill="${C.indigo}"/>
  <line x1="176" y1="164" x2="286" y2="164" stroke="${C.white}" stroke-width="13"/>

  <!-- やる事（○） -->
  <circle cx="192" cy="252" r="22" fill="${C.mint}"/>
  <path d="M181 252 l8 9 l15 -18" stroke="${C.white}" stroke-width="9"/>
  <line x1="232" y1="252" x2="392" y2="252" stroke-width="14"/>

  <circle cx="192" cy="322" r="22" fill="${C.mint}"/>
  <path d="M181 322 l8 9 l15 -18" stroke="${C.white}" stroke-width="9"/>
  <line x1="232" y1="322" x2="364" y2="322" stroke-width="14"/>

  <!-- やらない方がいい事（×） -->
  <circle cx="192" cy="392" r="22" fill="${C.coral}"/>
  <path d="M184 384 l16 16 M200 384 l-16 16" stroke="${C.white}" stroke-width="9"/>
  <line x1="232" y1="392" x2="380" y2="392" stroke="${C.coral}" stroke-width="14"/>

  <!-- ペン（書いて渡す） -->
  <g transform="rotate(38 452 400)">
    <rect x="432" y="318" width="40" height="128" rx="12" fill="${C.amber}"/>
    <path d="M432 446 h40 l-20 40 z" fill="${C.white}"/>
    <line x1="432" y1="358" x2="472" y2="358"/>
  </g>
`);

// --------------------------------------------------- E: 問い合わせのAI自動返信
// 受信メール ＋ ロボット ＋ すぐ飛んでいく返信メール
const E = wrap(`
  <circle cx="300" cy="300" r="250" fill="${C.cream}" stroke="none"/>

  <!-- 届いた問い合わせメール（左上） -->
  <g>
    <rect x="84" y="132" width="158" height="110" rx="12" fill="${C.white}"/>
    <path d="M84 146 l79 58 l79 -58"/>
    <circle cx="256" cy="136" r="21" fill="${C.coral}" stroke-width="6"/>
  </g>

  <!-- AI が読んで返す -->
  <g>
    <line x1="300" y1="250" x2="300" y2="220"/>
    <circle cx="300" cy="210" r="14" fill="${C.coral}"/>
    <rect x="222" y="250" width="156" height="132" rx="30" fill="${C.white}"/>
    <circle cx="264" cy="302" r="14" fill="${C.ink}" stroke="none"/>
    <circle cx="336" cy="302" r="14" fill="${C.ink}" stroke="none"/>
    <path d="M272 340 q28 22 56 0"/>
    <path d="M222 298 h-22 M378 298 h22"/>
  </g>

  <!-- すぐ飛んでいく返信（右下） -->
  <g>
    <rect x="356" y="404" width="160" height="110" rx="12" fill="${C.white}"/>
    <path d="M356 418 l80 58 l80 -58"/>
  </g>
  <g stroke="${C.skyD}" stroke-width="13">
    <line x1="330" y1="430" x2="272" y2="430"/>
    <line x1="330" y1="482" x2="286" y2="482"/>
  </g>
`);

// ----------------------------------------------- F: 毎日の繰り返し作業を自動化
// 表（コピペ・転記）→ 自動処理の循環 → チャットへ通知
const F = wrap(`
  <circle cx="300" cy="300" r="250" fill="${C.cream}" stroke="none"/>

  <!-- コピペ・転記のもとになる表（左上） -->
  <g>
    <rect x="78" y="130" width="184" height="150" rx="12" fill="${C.white}"/>
    <path d="M78 166 v-24 a12 12 0 0 1 12 -12 h160 a12 12 0 0 1 12 12 v24 z" fill="${C.teal}"/>
    <line x1="78" y1="224" x2="262" y2="224"/>
    <line x1="170" y1="166" x2="170" y2="280"/>
  </g>

  <!-- 転記して通知するところまで自動 -->
  <g stroke="${C.teal}" stroke-width="20">
    <path d="M282 204 h30"/>
    <path d="M300 182 l26 22 l-26 22"/>
  </g>

  <!-- 通知（右上） -->
  <g>
    <rect x="336" y="130" width="188" height="140" rx="22" fill="${C.white}"/>
    <path d="M372 270 v46 l46 -46 z" fill="${C.white}"/>
    <line x1="366" y1="176" x2="494" y2="176" stroke-width="14"/>
    <line x1="366" y1="220" x2="452" y2="220" stroke="${C.teal}" stroke-width="14"/>
  </g>

  <!-- 仕組みとして回り続ける -->
  <g transform="translate(258,424)">
    <circle cx="0" cy="0" r="56" fill="${C.teal}"/>
    <circle cx="0" cy="0" r="21" fill="${C.white}"/>
    <line x1="0" y1="-76" x2="0" y2="-56"/><line x1="0" y1="56" x2="0" y2="76"/>
    <line x1="-76" y1="0" x2="-56" y2="0"/><line x1="56" y1="0" x2="76" y2="0"/>
    <line x1="-54" y1="-54" x2="-40" y2="-40"/><line x1="40" y1="40" x2="54" y2="54"/>
    <line x1="54" y1="-54" x2="40" y2="-40"/><line x1="-40" y1="40" x2="-54" y2="54"/>
  </g>
  <g transform="translate(372,472)">
    <circle cx="0" cy="0" r="40" fill="${C.amber}"/>
    <circle cx="0" cy="0" r="15" fill="${C.white}"/>
    <line x1="0" y1="-56" x2="0" y2="-40"/><line x1="0" y1="40" x2="0" y2="56"/>
    <line x1="-56" y1="0" x2="-40" y2="0"/><line x1="40" y1="0" x2="56" y2="0"/>
    <line x1="-40" y1="-40" x2="-28" y2="-28"/><line x1="28" y1="28" x2="40" y2="40"/>
    <line x1="40" y1="-40" x2="28" y2="-28"/><line x1="-28" y1="28" x2="-40" y2="40"/>
  </g>
`);

for (const [id, svg] of [['01-teiji', A], ['02-kenchi', B], ['03-system', C3], ['04-shindan', D], ['05-mail', E], ['06-jidoka', F]]) {
  fs.writeFileSync(path.join(OUT, id + '.svg'), svg, 'utf8');
  fs.writeFileSync(
    path.join(OUT, id + '.html'),
    `<!doctype html><meta charset="utf-8"><style>html,body{margin:0;width:600px;height:600px;background:transparent}</style>${svg}`,
    'utf8'
  );
  console.log('wrote ' + id);
}
