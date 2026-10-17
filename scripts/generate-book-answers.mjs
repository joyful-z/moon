import {readFile,writeFile} from 'node:fs/promises';
import {existsSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const source=await readFile(path.join(root,'dist','book-answers.js'),'utf8');
const oldBlock=source.match(/const BOOK_ANSWERS = \[[\s\S]*?\n\];/);
if(!oldBlock)throw new Error('Original answer list missing');
const original=vm.runInNewContext(`${oldBlock[0]};BOOK_ANSWERS`).slice(0,36);
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
const normalize=value=>value.replace(/[\s，。！？；、…“”‘’·,.!?;:'"()（）]/g,'').toLowerCase();
const answers=[...original],seen=new Set(answers.map(normalize));
const directions=[
  '明确地鼓励行动', '建议暂缓决定', '温和地表达否定', '谨慎地表达肯定',
  '沟通与关系', '信息与判断', '调整方法', '边界与取舍',
  '时机与准备', '提问与自我观察', '合作与求助', '专注与休息'
];
for(let batch=0;answers.length<400&&batch<12;batch++){
  const theme=directions[batch%directions.length];
  const response=await fetch('https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions',{
    method:'POST',headers:{Authorization:`Bearer ${key}`,'Content-Type':'application/json'},
    body:JSON.stringify({model:'qwen-plus',temperature:0.66,max_tokens:3600,messages:[
      {role:'system',content:'你是中文答案之书的原创编辑。输出一个合法 JSON 字符串数组，不要 Markdown。每句是抽到的一页，必须能独立回应大多数日常提问。内容是简洁判断或建议，不能是虚构故事、场景描写、诗歌、谜语或微小说。绝不引用、翻译、改写任何已出版《答案之书》或网站文字。'},
      {role:'user',content:`请写 50 条全新的中文随机答案，本批侧重“${theme}”，但要有不同结论和语气。每条 8—22 个汉字，最多一句话，不要编号。好答案示例（只参考形式，不复制）："可以试，但先给自己设一个期限。"、"目前信息不足，先别答应。"、"问清对方的真实期待，再做选择。"、"这件事不值得你继续勉强。"。严格禁止：具体人物、代词“他/她”、物品、地点、日期、数字、身体动作、琐碎生活细节、比喻、意象、心理戏、假设性的事件细节，以及“你刚刚/上周/对方发来/你删掉”等虚构情节。不要空泛的“相信自己”“顺其自然”，也不要每句都以“把”字开头。已有句子请避免重复：${answers.slice(-50).join('｜')}。逐条自检是否可回答“我该这么做吗？”或“我该怎么办？”。只返回 JSON 数组。`}
    ]})
  });
  if(!response.ok)throw new Error(`Qwen response HTTP ${response.status}`);
  const data=await response.json();
  let content=data?.choices?.[0]?.message?.content?.trim()||'';
  if(content.startsWith('```'))content=content.replace(/^```(?:json)?\s*/,'').replace(/\s*```$/,'');
  let items;try{items=JSON.parse(content)}catch{throw new Error(`Invalid JSON from batch ${batch+1}`)}
  if(!Array.isArray(items))throw new Error(`Batch ${batch+1} is not an array`);
  let added=0;
  for(const value of items){
    if(typeof value!=='string')continue;
    const answer=value.trim().replace(/^\d+[.、]\s*/,''),length=[...answer].length,id=normalize(answer);
    if(length<8||length>28||seen.has(id)||/^(第\d|答案：)/.test(answer)||/[他她它]|\d|[0-9]/.test(answer))continue;
    answers.push(answer);seen.add(id);added++;
  }
  console.log(`Batch ${batch+1}: +${added}; total ${answers.length}`);
}
if(answers.length<365)throw new Error(`Only ${answers.length} unique answers`);
const output=`// 月隐先知原创答案库：原有 36 条 + Qwen 辅助创作并去重。\nconst BOOK_ANSWERS = ${JSON.stringify(answers,null,2)};\n`;
await writeFile(path.join(root,'dist','book-answers.js'),output,'utf8');
console.log(`Saved ${answers.length} unique original answers.`);
