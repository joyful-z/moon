import {readFile, writeFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const source=await readFile(path.join(root,'scripts','yijing-gutenberg.txt'),'utf8');
const names='乾 坤 屯 蒙 需 讼 师 比 小畜 履 泰 否 同人 大有 谦 豫 随 蛊 临 观 噬嗑 贲 剥 复 无妄 大畜 颐 大过 坎 离 咸 恒 遁 大壮 晋 明夷 家人 睽 蹇 解 损 益 夬 姤 萃 升 困 井 革 鼎 震 艮 渐 归妹 丰 旅 巽 兑 涣 节 中孚 小过 既济 未济'.split(' ');
const sections=[...source.matchAll(/^第\s*[一二三四五六七八九十百]+\s*卦\s*$/gm)];
if(sections.length!==64)throw new Error(`Expected 64 hexagrams, got ${sections.length}`);
const text=sections.map((section,index)=>{
  const block=source.slice(section.index+(section[0].length),sections[index+1]?.index??source.indexOf('*** END OF THE PROJECT GUTENBERG EBOOK'));
  const lines=block.split(/\r?\n/).map(line=>line.trim()).filter(Boolean);
  const title=lines[0].split('：')[0];
  const judgmentStart=lines.findIndex(line=>line.startsWith(`${title}：`));
  if(judgmentStart<0)throw new Error(`Missing judgment: ${index+1} ${title}`);
  const judgment=[];
  for(let i=judgmentStart;i<lines.length;i++){
    if(i>judgmentStart && /^(彖曰|象曰|初[六九]：|[六九][二三四五]：|上[六九]：)/.test(lines[i]))break;
    judgment.push(lines[i].replace(/^\s+/u,''));
  }
  const six=[];
  for(const line of lines){
    const match=line.match(/^(初[六九]|[六九][二三四五]|上[六九])：(.+)/);
    if(!match)continue;
    const position=match[1].startsWith('初')?0:match[1].startsWith('上')?5:'二三四五'.indexOf(match[1][1])+1;
    if(!six[position])six[position]=`${match[1]}：${match[2]}`;
  }
  if(six.length!==6||six.some(value=>!value))throw new Error(`Missing line: ${index+1} ${title} ${JSON.stringify(six)}`);
  const special=lines.find(line=>/^用[六九]：/.test(line))||'';
  return {name:names[index],originalName:title,judgment:judgment.join('').replaceAll(/\s{2,}/g,' '),lines:six,special};
});
const output=`// 公版《易經》原文，底本：Project Gutenberg eBook #25501。\n// https://www.gutenberg.org/ebooks/25501\nconst YIJING_TEXT = ${JSON.stringify(text,null,2)};\n`;
await writeFile(path.join(root,'dist','yijing-text.js'),output,'utf8');
console.log(`Built ${text.length} hexagrams and ${text.reduce((sum,item)=>sum+item.lines.length,0)} line texts.`);
