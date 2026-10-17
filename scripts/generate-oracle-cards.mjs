import {readFile,writeFile,unlink} from 'node:fs/promises';
import {existsSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const outputFile=path.join(root,'dist','oracle-cards.js');
const progressFile=path.join(root,'scripts','oracle-progress.json');
const source=await readFile(existsSync(outputFile)?outputFile:path.join(root,'dist','experiences.js'),'utf8');
const originalBlock=source.match(/const ORACLE_CARDS = \[[\s\S]*?\n\];/);
if(!originalBlock)throw new Error('Original oracle cards missing');
const originals=vm.runInNewContext(`${originalBlock[0]};ORACLE_CARDS`).slice(0,36);
if(originals.length!==36)throw new Error('Expected 36 original oracle cards');

function loadKey(){
  if(process.env.QWEN_API_KEY)return process.env.QWEN_API_KEY;
  const file=path.join(root,'.secrets','qwen-api-key.dpapi');
  const pwsh=path.join(process.env.USERPROFILE||'','.cache','codex-runtimes','codex-primary-runtime','dependencies','native','powershell','pwsh.exe');
  const escaped=file.replaceAll("'","''");
  const command=`$cipher=([System.IO.File]::ReadAllText('${escaped}')).Trim();$secure=ConvertTo-SecureString -String $cipher;$ptr=[Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure);try{[Console]::Out.Write([Runtime.InteropServices.Marshal]::PtrToStringBSTR($ptr))}finally{[Runtime.InteropServices.Marshal]::ZeroFreeBSTR($ptr)}`;
  const result=spawnSync(existsSync(pwsh)?pwsh:'pwsh.exe',['-NoProfile','-NonInteractive','-Command',command],{encoding:'utf8',windowsHide:true});
  return result.status===0?result.stdout.trim():'';
}
const key=loadKey();if(!key)throw new Error('Qwen key unavailable');
const progress=existsSync(progressFile)?JSON.parse(await readFile(progressFile,'utf8')):null;
const cards=progress?.cards||[...originals];
const startBatch=progress?.nextBatch||0;
const names=new Set(cards.map(card=>card[0]));
const normalize=value=>value.replace(/[\s，。！？；、…“”‘’·,.!?;:'"()（）]/g,'');
const meanings=new Set(cards.map(card=>normalize(card[3])));
const symbols=[...new Set(originals.map(card=>card[1]))];
const directions=[
  '开始与尝试','等待与耐心','关系与倾听','界限与拒绝','勇气与谨慎','休息与照顾自己',
  '创作与学习','变化与告别','合作与求助','真实与澄清','专注与取舍','感谢与收获',
  '独处与陪伴','希望与修复','节奏与安排','意外与灵活','承诺与责任','好奇与探索',
  '面对失误','重新选择','情绪识别','长期坚持','表达需求','放下比较'
];
const batchLimit=Number(process.argv[2]||24);
for(let batch=startBatch;cards.length<365&&batch<batchLimit;batch++){
  const theme=directions[batch%directions.length];
  const response=await fetch('https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions',{
    method:'POST',headers:{Authorization:`Bearer ${key}`,'Content-Type':'application/json'},
    body:JSON.stringify({model:'qwen-plus',temperature:0.62,max_tokens:5500,messages:[
      {role:'system',content:'你是“月隐先知”网站的中文神谕卡编辑。只返回合法 JSON 数组，不要 Markdown。卡片供日常自我观察，每张由诗意但简短的名字、清楚的主题、平实的释义、实用的小建议组成。释义不能写成场景小说或描摹道具；建议不能是无意义的仪式。不要复制已有牌库或出版内容。'},
      {role:'user',content:`请创作 20 张全新的中文神谕卡，本批偏重“${theme}”，但每张角度应不同。每项对象只有 name、theme、meaning、action 四字段。name 为独特的 2—5 个汉字牌名；theme 为 3—8 个汉字的明确主题；meaning 为 30—65 汉字，解释一种常见处境及可思考的角度；action 为 10—25 汉字，给出普通人今天确实能做的一件小事。请严格沿用以下网站现有神谕卡的语气与信息密度，但不能复制它们：${JSON.stringify(originals.slice(0,8).map(([name,,theme,meaning,action])=>({name,theme,meaning,action})))}。特别禁止：虚构用户正在做某事；描写某件具体物品的细节、触感、位置和秒数；要求找道具、做奇怪的感官练习；空泛鸡汤、假装预知未来、重复“相信自己”“迈出第一步”。卡名不要与已有的重复：${[...names].join('、')}。只返回 JSON 数组。`}
    ]})
  });
  if(!response.ok)throw new Error(`Qwen HTTP ${response.status}`);
  const data=await response.json();
  let content=data?.choices?.[0]?.message?.content?.trim()||'';
  if(content.startsWith('```'))content=content.replace(/^```(?:json)?\s*/,'').replace(/\s*```$/,'');
  let items;try{items=JSON.parse(content)}catch{throw new Error(`Invalid JSON in batch ${batch+1}`)}
  if(!Array.isArray(items))throw new Error(`Batch ${batch+1} is not an array`);
  let added=0,renamed=0;const rejected={};const examples=[];
  for(const item of items){
    if(!item||typeof item!=='object'){rejected.shape=(rejected.shape||0)+1;continue}
    const {name,theme,meaning,action}=item;
    if([name,theme,meaning,action].some(value=>typeof value!=='string')){rejected.fields=(rejected.fields||0)+1;if(examples.length<2)examples.push(item);continue}
    const n=name.trim(),t=theme.trim(),m=meaning.trim(),a=action.trim();
    if(!/^[\u3400-\u9fff]{2,6}$/.test(n)||[...t].length<2||[...t].length>14||[...m].length<20||[...m].length>115||[...a].length<6||[...a].length>45){rejected.length=(rejected.length||0)+1;if(examples.length<2)examples.push(item);continue}
    if(meanings.has(normalize(m))){rejected.duplicateMeaning=(rejected.duplicateMeaning||0)+1;continue}
    let cardName=n;
    if(names.has(cardName)){
      const letters=[...n],topic=[...t];
      const candidates=[letters.slice(0,3).join('')+topic.slice(0,3).join(''),letters.slice(0,2).join('')+topic.slice(0,3).join(''),t];
      cardName=candidates.find(value=>/^[\u3400-\u9fff]{2,6}$/.test(value)&&!names.has(value));
      if(!cardName){rejected.duplicateName=(rejected.duplicateName||0)+1;if(examples.length<2)examples.push(item);continue}
      renamed++;
    }
    cards.push([cardName,symbols[(cards.length-36)%symbols.length],t,m,a]);names.add(cardName);meanings.add(normalize(m));added++;
  }
  await writeFile(progressFile,JSON.stringify({nextBatch:batch+1,cards}), 'utf8');
  console.log(`Batch ${batch+1}: ${items.length} received, +${added} (${renamed} renamed); total ${cards.length}; rejected ${JSON.stringify(rejected)}; examples ${JSON.stringify(examples)}`);
}
if(cards.length<365){if(process.argv[2]){console.log(`Checkpoint saved at ${cards.length} cards.`);process.exit(0)}throw new Error(`Only ${cards.length} unique oracle cards`)}
const finalCards=cards.slice(0,365);
await writeFile(outputFile,`// 月隐先知原创神谕卡：原有 36 张 + Qwen 辅助创作、筛选的新增卡。\nconst ORACLE_CARDS = ${JSON.stringify(finalCards,null,2)};\n`,'utf8');
if(existsSync(progressFile))await unlink(progressFile);
console.log(`Saved ${finalCards.length} unique oracle cards.`);
