import {readFile,writeFile} from 'node:fs/promises';
import {existsSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const file=path.join(root,'dist','book-answers.js');
const source=await readFile(file,'utf8');
const block=source.match(/const BOOK_ANSWERS = \[[\s\S]*?\n\];/);
if(!block)throw new Error('Answer array missing');
const original=vm.runInNewContext(`${block[0]};BOOK_ANSWERS`);
const secretFile=path.join(root,'.secrets','qwen-api-key.dpapi');
const pwsh=path.join(process.env.USERPROFILE||'','.cache','codex-runtimes','codex-primary-runtime','dependencies','native','powershell','pwsh.exe');
const escaped=secretFile.replaceAll("'","''");
const command=`$cipher=([System.IO.File]::ReadAllText('${escaped}')).Trim();$secure=ConvertTo-SecureString -String $cipher;$ptr=[Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure);try{[Console]::Out.Write([Runtime.InteropServices.Marshal]::PtrToStringBSTR($ptr))}finally{[Runtime.InteropServices.Marshal]::ZeroFreeBSTR($ptr)}`;
const result=spawnSync(existsSync(pwsh)?pwsh:'pwsh.exe',['-NoProfile','-NonInteractive','-Command',command],{encoding:'utf8',windowsHide:true});
const key=process.env.QWEN_API_KEY||result.stdout.trim();if(!key)throw new Error('Qwen key unavailable');
const polished=original.slice(0,36);
for(let start=36;start<original.length;start+=40){
  const input=original.slice(start,start+40);
  const response=await fetch('https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions',{
    method:'POST',headers:{Authorization:`Bearer ${key}`,'Content-Type':'application/json'},
    body:JSON.stringify({model:'qwen-plus',temperature:0.25,max_tokens:3800,messages:[
      {role:'system',content:'你是中文编辑，专门把生硬、晦涩的句子改成自然、简短、有用的口语提示。只输出合法 JSON 字符串数组。不要虚构用户现实信息。'},
      {role:'user',content:`逐条改写下面 ${input.length} 条“答案之书”文字，输出同样 ${input.length} 条，并严格保持原顺序。每条 8—24 个汉字，像一位清醒的朋友说话。用“可以……”“先……”“不必……”“也许……”“如果……就……”等语气，表达可能性和行动；不能假装知道用户的真实情况。禁用管理或科技黑话，例如：变量、模块、框架、结构、系统、校准、闭环、阈值、参数、权重、支点、赋值、迭代、信息密度、指标、基准、界面。禁用诗意比喻和具体人物故事。每条都应能独立回答一个没有提供背景的日常问题。原句是待修改草稿，不需要保留其措辞。只返回 JSON 数组：${JSON.stringify(input)}`}
    ]})
  });
  if(!response.ok)throw new Error(`Qwen response HTTP ${response.status}`);
  const data=await response.json();
  let content=data?.choices?.[0]?.message?.content?.trim()||'';
  if(content.startsWith('```'))content=content.replace(/^```(?:json)?\s*/,'').replace(/\s*```$/,'');
  const output=JSON.parse(content);
  if(!Array.isArray(output)||output.length<input.length)throw new Error(`Batch ${start} returned ${output?.length} answers, expected at least ${input.length}`);
  polished.push(...output.slice(0,input.length).map(item=>String(item).trim()));
  console.log(`Polished ${polished.length}/${original.length}`);
}
const seen=new Set();
const answers=polished.filter(item=>{const id=item.replace(/[\s，。！？；、…“”‘’·,.!?;:'"()（）]/g,'').toLowerCase();if([...item].length<7||[...item].length>32||seen.has(id))return false;seen.add(id);return true});
if(answers.length<365)throw new Error(`Only ${answers.length} unique answers after editing`);
await writeFile(file,`// 月隐先知原创答案库：AI 辅助创作，经编辑筛选去重。\nconst BOOK_ANSWERS = ${JSON.stringify(answers,null,2)};\n`,'utf8');
console.log(`Saved ${answers.length} edited answers.`);
