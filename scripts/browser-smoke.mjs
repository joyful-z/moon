import assert from 'node:assert/strict';

const DEBUG='http://127.0.0.1:9229';
let tab;
for(let attempt=0;attempt<30;attempt++){
  try { const pages=await (await fetch(`${DEBUG}/json/list`)).json();tab=pages.find(page=>page.type==='page'&&page.url.includes('127.0.0.1:4173'));if(tab)break; } catch {}
  await new Promise(resolve=>setTimeout(resolve,200));
}
assert(tab,'Headless Chrome did not open the local site');
const ws=new WebSocket(tab.webSocketDebuggerUrl);
await new Promise((resolve,reject)=>{ws.addEventListener('open',resolve,{once:true});ws.addEventListener('error',reject,{once:true})});
let id=0;
const pending=new Map();
ws.addEventListener('message',event=>{
  const message=JSON.parse(event.data);
  if(!message.id||!pending.has(message.id))return;
  const item=pending.get(message.id);pending.delete(message.id);
  message.error?item.reject(new Error(message.error.message)):item.resolve(message.result);
});
const send=(method,params={})=>new Promise((resolve,reject)=>{const next=++id;pending.set(next,{resolve,reject});ws.send(JSON.stringify({id:next,method,params}))});
const evaluate=async expression=>{
  const result=await send('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true});
  if(result.exceptionDetails)throw new Error(result.exceptionDetails.text);
  return result.result.value;
};
const waitFor=async expression=>{
  for(let i=0;i<30;i++){if(await evaluate(expression))return;await new Promise(resolve=>setTimeout(resolve,150))}
  throw new Error(`Browser condition failed: ${expression}`);
};
const home=async()=>evaluate("document.querySelector('.brand').click()");
const mode=async name=>{await home();await evaluate(`document.querySelector('[data-exp-mode="${name}"]').click()`)};

await send('Page.navigate',{url:'http://127.0.0.1:4173/'});
await waitFor("document.querySelectorAll('.mode-tile').length===6");
assert(await evaluate("ORACLE_CARDS.length===365 && new Set(ORACLE_CARDS.map(card=>card[0])).size===365"));
assert.equal(await evaluate("document.querySelector('[data-exp-mode=oracle]')"),null);
assert.equal(await evaluate("document.querySelector('[data-exp-mode=numerology]')"),null);
if(await evaluate("!!document.querySelector('[data-exp-action=daily]')"))await evaluate(`document.querySelector('[data-exp-action="daily"]').click()`);
await waitFor("!!document.querySelector('.daily-oracle .oracle-action')");

await mode('zodiac');
await waitFor("!!document.querySelector('.sky-facts')");
assert(await evaluate("document.querySelector('.zodiac-sources').textContent.includes('Astrodienst')"));
const firstZodiacTheme=await evaluate("document.querySelector('.daily-cue>span').textContent");
await evaluate(`document.querySelector('[data-exp-zodiac="5"]').click()`);
assert.equal(await evaluate("document.querySelector('.zodiac-description h3').textContent"),'处女座');
assert.notEqual(await evaluate("document.querySelector('.daily-cue>span').textContent"),firstZodiacTheme);

await evaluate("openMode('oracle')");
await evaluate(`document.querySelector('[data-exp-action="oracle-draw"]').click()`);
await waitFor("!!document.querySelector('.oracle-mode .oracle-action')");
assert(await evaluate("exp.oracle>=0 && exp.oracle<365"));
await evaluate("exp.oracle=364;renderOracle()");
assert(await evaluate("document.querySelector('.oracle-mode .oracle-face-name').textContent===ORACLE_CARDS[364][0]"));

await mode('book');
assert.equal(await evaluate("document.querySelector('.book-source-note')"),null);
assert(await evaluate("BOOK_ANSWERS.length>=365"));
await evaluate(`document.querySelector('.book-cover').click()`);
assert(await evaluate("document.querySelector('.book-stage').classList.contains('is-turning')"));
await waitFor("document.querySelector('.book-answer blockquote').textContent.trim().length>0");
assert(await evaluate("document.querySelector('.book-answer blockquote').textContent.trim().length>0"));
const firstBookPage=await evaluate("document.querySelector('.book-answer span').textContent");
await evaluate(`document.querySelector('#book-question').value='我该从哪里开始？';document.querySelector('.book-controls [data-exp-action="book-open"]').click()`);
await waitFor("document.querySelector('.book-answer span').textContent!=="+JSON.stringify(firstBookPage));
assert.equal(await evaluate("document.querySelector('#book-question').value"),'我该从哪里开始？');

await evaluate("openMode('numerology')");
await evaluate(`document.querySelector('[name="birth-date"]').value='1995-06-15';document.querySelector('[data-exp-form="number"]').requestSubmit()`);
assert.equal(await evaluate("document.querySelector('.number-orb strong').textContent"),'9');

await mode('iching');
for(let throwNumber=1;throwNumber<=6;throwNumber++){
  await evaluate(`document.querySelector('[data-exp-action="hex-cast"]').click()`);
  if(throwNumber===1)assert(await evaluate("document.querySelector('.coin-stage').classList.contains('is-tossing')"));
  await waitFor(`document.querySelectorAll('.cast-step.complete').length===${throwNumber}`);
}
await waitFor("document.querySelectorAll('.hex-panel').length===2");
assert(await evaluate("!!document.querySelector('.hex-reading blockquote')"));
assert(await evaluate("!!document.querySelector('.exp-ai-reading')"));

await mode('chart');
await evaluate(`document.querySelector('[name="a-date"]').value='1995-06-15';document.querySelector('[name="a-time"]').value='12:00';document.querySelector('[data-exp-form="chart"]').requestSubmit()`);
await waitFor("!!document.querySelector('.chart-result')");
assert.equal(await evaluate("document.querySelectorAll('.chart-data tbody tr').length"),10);
assert(await evaluate("!!document.querySelector('.exp-ai-reading')"));

await mode('synastry');
await evaluate(`document.querySelector('[name="a-date"]').value='1995-06-15';document.querySelector('[name="a-time"]').value='12:00';document.querySelector('[name="b-date"]').value='1993-11-20';document.querySelector('[name="b-time"]').value='08:30';document.querySelector('[data-exp-form="synastry"]').requestSubmit()`);
await waitFor("!!document.querySelector('.synastry-overview')");
assert.equal(await evaluate("document.querySelectorAll('.synastry-charts .chart-wheel').length"),2);
assert(await evaluate("document.querySelectorAll('.contact-grid article p').length")>0);

await mode('tarot');
await waitFor("!!document.querySelector('.ritual-panel')");
console.log('OK: homepage oracle, zodiac, oracle, book, numerology, I Ching, chart, synastry, and Tarot navigation.');
ws.close();
