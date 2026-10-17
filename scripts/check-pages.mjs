import assert from 'node:assert/strict';
import {onRequest} from '../functions/api/[endpoint].js';

const origin='https://moon-veil-oracle.pages.dev';
const birth={date:'1995-06-15',time:'12:00',timeZone:'Asia/Shanghai',latitude:31.23,longitude:121.47};
const call=(pathname,method='GET',body,env={})=>onRequest({request:new Request(origin+pathname,{method,headers:method==='POST'?{'Content-Type':'application/json',Origin:origin}:{},body:body===undefined?undefined:JSON.stringify(body)}),env});

let response=await call('/api/status');
assert.equal(response.status,200);
assert.equal((await response.json()).qwenConfigured,false);

response=await call('/api/chart','POST',birth);
assert.equal(response.status,200);
const chart=await response.json();
assert.equal(chart.planets.length,10);
assert.equal(chart.rising.sign,'处女座');

response=await call('/api/synastry','POST',{first:birth,second:{...birth,date:'1993-11-20'}});
assert.equal(response.status,200);
assert.equal((await response.json()).first.planets.length,10);

response=await call('/api/reading','POST',{topic:'感情',spread:1,question:'怎么办',cards:[{id:0,reversed:false}]});
assert.equal(response.status,503);

response=await onRequest({request:new Request(origin+'/api/chart',{method:'POST',headers:{'Content-Type':'application/json',Origin:'https://untrusted.example'},body:JSON.stringify(birth)}),env:{}});
assert.equal(response.status,403);

const originalFetch=globalThis.fetch;
let calls=0;
globalThis.fetch=async(_url,options)=>{
  calls++;
  assert.equal(options.headers.Authorization,'Bearer test-key');
  const payload=JSON.parse(options.body);
  assert.equal(payload.model,'qwen-plus');
  return new Response(JSON.stringify({choices:[{message:{content:'可读的测试解读'}}]}),{status:200,headers:{'Content-Type':'application/json'}});
};
try{
  response=await call('/api/reading','POST',{topic:'感情',spread:1,question:'怎么办',cards:[{id:0,reversed:false}]},{QWEN_API_KEY:'test-key'});
  assert.equal((await response.json()).answer,'可读的测试解读');
  response=await call('/api/chart-interpretation','POST',birth,{QWEN_API_KEY:'test-key'});
  assert.equal((await response.json()).answer,'可读的测试解读');
  response=await call('/api/hex-interpretation','POST',{lines:[7,7,7,7,7,7],question:'下一步呢'},{QWEN_API_KEY:'test-key'});
  assert.equal((await response.json()).answer,'可读的测试解读');
  assert.equal(calls,3);
}finally{globalThis.fetch=originalFetch}
console.log('OK: Pages status, chart, synastry, origin guard, and three Qwen routes');
