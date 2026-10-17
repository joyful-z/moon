import {readFile,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const dist=path.join(root,'dist');
let html=await readFile(path.join(root,'index.template.html'),'utf8');
const styles=['styles.css','experiences.css'];
const scripts=['minor-cards.js','waite-meanings.js','plain-meanings.js','yijing-text.js','book-answers.js','oracle-cards.js','experiences.js','app.js'];

for(const name of styles){
  const tag=`<link rel="stylesheet" href="./${name}" />`;
  if(!html.includes(tag))throw new Error(`Missing stylesheet tag: ${name}`);
  const css=(await readFile(path.join(dist,name),'utf8')).replace(/[ \t]+$/gm,'').replace(/<\/style/gi,'<\\/style');
  html=html.replace(tag,`<style data-source="${name}">\n${css}\n</style>`);
}

const inline=[];
for(const name of scripts){
  const tag=`<script src="./${name}" defer></script>`;
  if(!html.includes(tag))throw new Error(`Missing script tag: ${name}`);
  html=html.replace(tag,'');
  const js=(await readFile(path.join(dist,name),'utf8')).replace(/[ \t]+$/gm,'').replace(/<\/script/gi,'<\\/script');
  inline.push(`<script data-source="${name}">\n${js}\n</script>`);
}

if(!html.includes('</body>'))throw new Error('Missing body close tag');
html=html.replace('</body>',`${inline.join('\n')}\n</body>`);
html=html.replace(/^[ \t]+$/gm,'');
await writeFile(path.join(dist,'index.html'),html,'utf8');
console.log(`Built self-contained entry page: ${Buffer.byteLength(html)} bytes`);
