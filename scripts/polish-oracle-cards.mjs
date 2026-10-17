import {readFile,writeFile,unlink} from 'node:fs/promises';
import {existsSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const file=path.join(root,'dist','oracle-cards.js');
const progressFile=path.join(root,'scripts','oracle-polish-progress.json');
const source=await readFile(file,'utf8');
const block=source.match(/const ORACLE_CARDS = \[[\s\S]*?\n\];/);
if(!block)throw new Error('Oracle array missing');
const original=vm.runInNewContext(`${block[0]};ORACLE_CARDS`);
if(original.length!==365)throw new Error(`Expected 365 cards, got ${original.length}`);
const progress=existsSync(progressFile)?JSON.parse(await readFile(progressFile,'utf8')):null;
const polished=progress?.cards||original.slice(0,36);
const start=progress?.nextIndex||36;

const keyFile=path.join(root,'.secrets','qwen-api-key.dpapi');
const pwsh=path.join(process.env.USERPROFILE||'','.cache','codex-runtimes','codex-primary-runtime','dependencies','native','powershell','pwsh.exe');
const escaped=keyFile.replaceAll("'","''");
const command=`$cipher=([System.IO.File]::ReadAllText('${escaped}')).Trim();$secure=ConvertTo-SecureString -String $cipher;$ptr=[Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure);try{[Console]::Out.Write([Runtime.InteropServices.Marshal]::PtrToStringBSTR($ptr))}finally{[Runtime.InteropServices.Marshal]::ZeroFreeBSTR($ptr)}`;
const result=spawnSync(existsSync(pwsh)?pwsh:'pwsh.exe',['-NoProfile','-NonInteractive','-Command',command],{encoding:'utf8',windowsHide:true});
const key=process.env.QWEN_API_KEY||result.stdout.trim();if(!key)throw new Error('Qwen key unavailable');
const batchLimit=Number(process.argv[2]||365);

for(let index=start;index<original.length&&index<batchLimit;index+=20){
  const batch=original.slice(index,index+20);
  const input=batch.map(([name,,theme,meaning,action])=>({name,theme,meaning,action}));
  const response=await fetch('https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions',{
    method:'POST',headers:{Authorization:`Bearer ${key}`,'Content-Type':'application/json'},
    body:JSON.stringify({model:'qwen-plus',temperature:0.35,max_tokens:6000,messages:[
      {role:'system',content:'你是神谕卡文案编辑。将初稿改成自然、平实、可用的中文。只输出合法 JSON 数组，不要 Markdown。保留每张牌的牌名和核心主题，不做未来预言。'},
      {role:'user',content:`逐张编辑以下 ${batch.length} 张原创神谕卡，严格按原顺序返回 ${batch.length} 个对象，每个对象只有 name、meaning、action。name 必须原样保留。meaning 为 35—70 个汉字，像成熟朋友解释一张反思卡：说明常见处境及一个新角度，不假装知道用户经历，不断言他人的心理；action 为 12—30 个汉字，给今天自然、简单、真正有意义的一步。请把初稿中的晦涩意象、管理黑话、虚构场景和无意义的动作改掉，例如“触摸旧物温度”“数心跳”“说出接触的材质”“静看一件物品十分钟”“新建空白文档”都不合适。可以建议写下真实想法、核对事实、与人沟通、调整一项安排、完成一件小任务、休息。风格参考：主题“暂停观察”，释义“答案暂时不清楚时，安静会帮助你分辨事实和猜测。”，建议“重要回应先放十分钟再决定。” 不要套用同一个句式，不要复制示例。待编辑卡片：${JSON.stringify(input)}。只返回 JSON 数组。`}
    ]})
  });
  if(!response.ok)throw new Error(`Qwen HTTP ${response.status}`);
  const data=await response.json();
  let content=data?.choices?.[0]?.message?.content?.trim()||'';
  if(content.startsWith('```'))content=content.replace(/^```(?:json)?\s*/,'').replace(/\s*```$/,'');
  const output=JSON.parse(content);
  if(!Array.isArray(output)||output.length<batch.length)throw new Error(`Batch at ${index} returned ${output?.length} items`);
  for(let offset=0;offset<batch.length;offset++){
    const draft=batch[offset],edited=output[offset];
    if(edited?.name!==draft[0]||typeof edited.meaning!=='string'||typeof edited.action!=='string')throw new Error(`Mismatched card at ${index+offset}`);
    const meaning=edited.meaning.trim(),action=edited.action.trim();
    if([...meaning].length<20||[...meaning].length>110||[...action].length<6||[...action].length>50)throw new Error(`Invalid edited length at ${index+offset}`);
    polished.push([draft[0],draft[1],draft[2],meaning,action]);
  }
  await writeFile(progressFile,JSON.stringify({nextIndex:index+batch.length,cards:polished}),'utf8');
  console.log(`Edited ${polished.length}/${original.length}`);
}
if(polished.length!==365){console.log(`Checkpoint saved at ${polished.length} cards.`);process.exitCode=process.argv[2]?0:1}
else{
  await writeFile(file,`// 月隐先知原创神谕卡：原有 36 张 + Qwen 辅助创作并编辑的新增卡。\nconst ORACLE_CARDS = ${JSON.stringify(polished,null,2)};\n`,'utf8');
  if(existsSync(progressFile))await unlink(progressFile);
  console.log('Saved 365 edited oracle cards.');
}
