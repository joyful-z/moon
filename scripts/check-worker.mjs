import assert from 'node:assert/strict';
import worker from '../worker.mjs';

const base='https://moon.example.workers.dev';
const seen=[];
const env={ASSETS:{fetch:async request=>{seen.push(new URL(request.url).pathname);return new Response('asset-ok')}}};

let response=await worker.fetch(new Request(base+'/'),env);
assert.equal(await response.text(),'asset-ok');
assert.deepEqual(seen,['/']);

response=await worker.fetch(new Request(base+'/api/status'),env);
assert.equal(response.status,200);
assert.deepEqual(await response.json(),{ready:true,qwenConfigured:false,model:'qwen-plus'});
assert.deepEqual(seen,['/']);

const birth={date:'1995-06-15',time:'12:00',timeZone:'Asia/Shanghai',latitude:31.23,longitude:121.47};
response=await worker.fetch(new Request(base+'/api/chart',{method:'POST',headers:{'Content-Type':'application/json',Origin:base},body:JSON.stringify(birth)}),env);
assert.equal(response.status,200);
assert.equal((await response.json()).planets.length,10);
assert.deepEqual(seen,['/']);

console.log('OK: Worker serves static assets and routes status and chart APIs');
