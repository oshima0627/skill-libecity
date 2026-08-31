import fs from 'fs';
const cards=[
 {id:'02-teiji-jikko', accent:'#38bdf8', kicker:'定時実行の自動化',
  head:['毎朝のPC作業を、','無人で。'],
  chips:['スリープから自動復帰','二重実行を防止','失敗はLINEに通知'],
  price:'15,000円'},
 {id:'03-henkou-kenchi', accent:'#4ade80', kicker:'サイトの変更検知',
  head:['見に行くのを','忘れて損をしない。'],
  chips:['実質的な変更だけ通知','PDFにも対応','パソコン不要'],
  price:'10,000円'},
 {id:'04-gyomu-system', accent:'#fbbf24', kicker:'業務システム開発',
  head:['テストを付けて、','納品します。'],
  chips:['相談・見積もりは無料','納品実績 自動テスト362件','ソースコードもお渡し'],
  price:'150,000円〜'},
];
const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;');
for(const c of cards){
 const html=`<!doctype html><html lang="ja"><meta charset="utf-8"><style>
 *{margin:0;padding:0;box-sizing:border-box}
 html,body{width:660px;height:440px}
 body{background:#0f1f33;color:#fff;font-family:"Yu Gothic UI","Meiryo","MS PGothic",sans-serif;
      display:flex;flex-direction:column;justify-content:space-between;padding:40px 44px;
      border-left:14px solid ${c.accent}}
 .kicker{font-size:22px;font-weight:700;color:${c.accent};letter-spacing:.06em}
 h1{font-size:52px;font-weight:700;line-height:1.28;letter-spacing:.01em;margin-top:14px}
 ul{list-style:none;display:flex;flex-direction:column;gap:11px;margin-top:6px}
 li{font-size:22px;font-weight:700;color:#dbe7f5;display:flex;align-items:center;gap:12px}
 li::before{content:"";width:11px;height:11px;background:${c.accent};border-radius:2px;flex:none}
 .foot{display:flex;justify-content:space-between;align-items:flex-end;
       border-top:1px solid #2b4360;padding-top:16px}
 .name{font-size:21px;font-weight:700;color:#9db4cd}
 .price{font-size:34px;font-weight:700;color:${c.accent}}
 </style>
 <div><div class="kicker">${esc(c.kicker)}</div><h1>${c.head.map(esc).join('<br>')}</h1></div>
 <ul>${c.chips.map(t=>`<li>${esc(t)}</li>`).join('')}</ul>
 <div class="foot"><div class="name">なおたか@沖縄の業務システム屋×AI</div><div class="price">${esc(c.price)}</div></div>
 </html>`;
 fs.writeFileSync('listings/assets/'+c.id+'.html',html,'utf8');
 console.log('wrote '+c.id+'.html');
}
// 使い方（リポジトリ直下で実行）:
//   node listings/assets/generate-thumbnails.mjs
//   "/c/Program Files/Google/Chrome/Application/chrome.exe" --headless --disable-gpu \
//     --hide-scrollbars --force-device-scale-factor=2 --window-size=660,440 \
//     --screenshot=listings/assets/<id>.png file:///<絶対パス>/listings/assets/<id>.html
// 出力は 1320x880（3:2）。スキルマーケットの推奨比率に一致する。
