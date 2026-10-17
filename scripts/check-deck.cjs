const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');

const root = path.resolve(__dirname, '..');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'dist/assets/rws-pam-a/manifest.json'), 'utf8'));
const appElement = {innerHTML:'',focus(){}};
const toastElement = {textContent:'',classList:{add(){},remove(){}},scrollIntoView(){}};
const store = new Map();
const context = vm.createContext({
  document:{getElementById:id=>id==='app'?appElement:toastElement,addEventListener(){}},
  localStorage:{getItem:key=>store.get(key)??null,setItem:(key,value)=>store.set(key,value)},
  window:{scrollTo(){},crypto:require('node:crypto').webcrypto},
  crypto:require('node:crypto').webcrypto,
  setTimeout,clearTimeout,Uint32Array,assert,fs,path,root,manifest,appElement
});
const minor = fs.readFileSync(path.join(root,'dist/minor-cards.js'),'utf8');
const waite = fs.readFileSync(path.join(root,'dist/waite-meanings.js'),'utf8');
const plain = fs.readFileSync(path.join(root,'dist/plain-meanings.js'),'utf8');
const yijing = fs.readFileSync(path.join(root,'dist/yijing-text.js'),'utf8');
const bookAnswers = fs.readFileSync(path.join(root,'dist/book-answers.js'),'utf8');
const oracleCards = fs.readFileSync(path.join(root,'dist/oracle-cards.js'),'utf8');
const experiences = fs.readFileSync(path.join(root,'dist/experiences.js'),'utf8');
const app = fs.readFileSync(path.join(root,'dist/app.js'),'utf8');
vm.runInContext(minor,context);
vm.runInContext(waite,context);
vm.runInContext(plain,context);
vm.runInContext(yijing,context);
vm.runInContext(bookAnswers,context);
vm.runInContext(oracleCards,context);
vm.runInContext(experiences,context);
vm.runInContext(app+`
  assert(BOOK_ANSWERS.length>=365);
  assert.equal(new Set(BOOK_ANSWERS).size,BOOK_ANSWERS.length);
  assert.equal(MODES.length,8);
  assert.equal(ORACLE_CARDS.length,365);
  assert.equal(new Set(ORACLE_CARDS.map(card=>card[0])).size,365);
  assert(ORACLE_CARDS.every(card=>card.length===5&&card.every(part=>typeof part==='string'&&part.trim())));
  assert.equal(HEX_MATRIX.length,8);
  assert(HEX_MATRIX.every(row=>row.length===8));
  assert.equal(YIJING_TEXT.length,64);
  assert(YIJING_TEXT.every(item=>item.judgment&&item.lines.length===6));
  assert.equal(hexagram([7,7,7,7,7,7]).data.name,'乾');
  assert.equal(hexagram([8,8,8,8,8,8]).data.name,'坤');
  assert.equal(hexagram([9,9,9,9,9,9],true).data.name,'坤');
  assert(appElement.innerHTML.includes('daily-oracle'));
  assert.equal((appElement.innerHTML.match(/class="mode-tile"/g)||[]).length,6);
  assert(!appElement.innerHTML.includes('data-exp-mode="oracle"'));
  assert(!appElement.innerHTML.includes('data-exp-mode="numerology"'));
  drawDailyOracle();assert(readDailyOracle());
  for(const mode of MODES.slice(1)){
    exp.mode=mode[0];state.screen='experience';render();
    assert(appElement.innerHTML.includes(mode[1]),mode[1]);
  }
  exp.hex=castHexagram();assert.equal(exp.hex.lines.length,6);
  assert(exp.hex.primary.source.judgment);
  assert.equal(calculateNumber('1995-06-15').life,9);
  assert.equal(CARDS.length,78);
  assert.equal(WAITE_MEANINGS.length,78);
  assert.equal(PLAIN_MEANINGS.length,78);
  assert.equal(new Set(CARDS.map(card=>card.id)).size,78);
  assert(CARDS.every(card=>card.upright&&card.reversed&&card.uprightText&&card.reversedText));
  assert(CARDS.every(card=>card.plainUpright&&card.plainReversed));
  assert(CARDS[0].upright.includes('愚行'));
  assert(CARDS[25].reversed.includes('繁荣'));
  assert(CARDS[37].reversedText.includes('没有为圣杯二单列'));
  assert.equal(manifest.files.length,78);
  assert.equal(new Set(manifest.files.map(file=>file.sha256)).size,78);
  for(const card of CARDS){
    assert.equal(card.image.startsWith('./assets/rws-pam-a/'),true);
    const image=path.join(root,'dist',card.image.slice(2));
    assert.equal(fs.existsSync(image),true,card.name);
    assert.equal(fs.statSync(image).size>100000,true,card.name);
  }
  state.screen='library'; render();
  assert.equal((appElement.innerHTML.match(/class="library-card"/g)||[]).length,78);
  state.topic='自我探索'; state.spread=3; newDeck();
  assert.equal(state.deck.length,78);
  assert.equal(new Set(state.deck).size,78);
  assert.equal((appElement.innerHTML.match(/class="draw-card /g)||[]).length,78);
  assert(appElement.innerHTML.includes('deck-viewport'));
  state.picked=[{index:0,reversed:false},{index:1,reversed:true},{index:2,reversed:false}];
  reveal();
  assert.equal(state.result.cards.length,3);
  assert.equal((appElement.innerHTML.match(/class="reading-image"/g)||[]).length,3);
  assert(appElement.innerHTML.includes('reading-original'));
  assert.equal(JSON.parse(localStorage.getItem('yueyin-oracle-result')).cards.length,3);
`,context);
const entry=fs.readFileSync('E:/sites/月隐先知.html','utf8');
assert(entry.includes('http://127.0.0.1:4173/'));
assert(fs.readFileSync(path.join(root,'dist/index.html'),'utf8').includes('月隐先知'));
console.log('OK: 8 modes, daily oracle, 64 hexagrams, numerology, 78 Tarot images/meanings, full-deck slider, result, local entry.');
