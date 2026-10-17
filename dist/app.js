const MAJOR_CARDS = [
  ['愚者','✦','新的开始 · 自由 · 信任','犹豫 · 鲁莽 · 漫无方向','一个新阶段正在向你敞开。即使还看不清全貌，也可以带着好奇心迈出小小的一步。','你或许正在起点徘徊。先辨认风险与真正的渴望，再决定下一步。','如果暂时放下对结果的担忧，你最想尝试什么？'],
  ['魔术师','✧','创造 · 行动 · 潜能','分散 · 迟疑 · 失去信心','你已经拥有一些可用的资源。把想法落到一件具体的小事上，力量便会慢慢显现。','也许你把能力分散在太多方向。先选择一件重要的事，重新找回掌控感。','你手中已有哪项资源，可以从今天开始使用？'],
  ['女祭司','☾','直觉 · 宁静 · 内在智慧','忽略直觉 · 隐瞒 · 迷惘','答案未必需要立刻说出口。给自己一点安静，留意反复浮现的感受与线索。','外界的声音可能盖过了你的心声。暂缓判断，看看自己真正知道些什么。','当周围安静下来，你内心最清晰的声音是什么？'],
  ['皇后','❀','滋养 · 丰盛 · 关怀','消耗 · 依赖 · 忽略自己','让关怀从自己开始。你正在培育的关系或计划，需要耐心与持续的照料。','付出过多可能让你感到疲惫。试着把一部分温柔和时间留给自己。','哪一件小事能让你感到被好好照顾？'],
  ['皇帝','♜','结构 · 稳定 · 边界','僵化 · 控制 · 压力','清晰的边界与安排，能让眼前的事更加稳固。选择你愿意承担的责任。','过紧的控制也可能限制新的可能。看看哪些规则可以稍微松动。','你需要建立什么边界，才能更安心地前进？'],
  ['教皇','✶','学习 · 传统 · 指引','质疑 · 束缚 · 自主','借鉴可靠的经验与指引，会帮助你看见更完整的道路。','一套熟悉的方法可能已不完全适合你。允许自己重新理解它的意义。','你想保留哪些经验，又想改变哪种旧做法？'],
  ['恋人','♡','联结 · 选择 · 价值','摇摆 · 失衡 · 不一致','重要的选择值得与你珍视的价值观相互对照。坦诚沟通会让联结更深。','若内心与行动不一致，不妨先停下来确认真正的需求。','这个选择怎样才能更贴近你重视的事？'],
  ['战车','✧','方向 · 决心 · 前进','失控 · 急躁 · 阻力','聚焦一个方向，带着决心稳步前进。你不必同时解决所有问题。','过快的速度可能让你忽略内在的拉扯。调整节奏，重新握稳方向。','你现在最值得投入的一步是什么？'],
  ['力量','♌','勇气 · 温柔 · 韧性','自我怀疑 · 压抑 · 疲惫','真正的力量也可以很温柔。耐心地面对挑战，比与自己较劲更有帮助。','如果你已经很累，承认脆弱并寻求支持也是勇气。','你能用什么更温柔的方式对待自己？'],
  ['隐者','✺','独处 · 探索 · 洞察','孤立 · 逃避 · 迷失','放慢脚步，把注意力带回自己。独处能帮助你听清下一步的方向。','独处与隔绝之间有一道细线。需要时，让值得信任的人靠近。','此刻你需要怎样的安静或陪伴？'],
  ['命运之轮','✥','变化 · 周期 · 转机','停滞 · 抵抗 · 重复','变化正在发生。你无法控制所有转折，却可以选择如何回应它们。','重复的模式也许值得观察。找到其中能由你改变的一小部分。','面对变化，你可以主动调整什么？'],
  ['正义','⚖','平衡 · 诚实 · 判断','偏见 · 逃避 · 失衡','尽量看清事实，也诚实面对自己的感受。公平的决定需要完整的信息。','如果事情显得不公，先理清责任与界限，再采取行动。','还有哪一面事实值得你认真倾听？'],
  ['倒吊人','◇','暂停 · 换位 · 放下','拖延 · 抗拒 · 消耗','暂时停下来，不代表没有前进。换个角度，也许能看到新的出路。','若暂停变成了停滞，问问自己正在等待什么，以及是否可以先做一点点。','换一个视角，这件事会呈现什么不同？'],
  ['死神','✦','结束 · 转化 · 新生','抗拒 · 留恋 · 停滞','某个阶段正在结束。为它留出告别的空间，新的可能才能逐渐生长。','舍不得放下是自然的。先辨认你想保留的意义，再慢慢松开形式。','什么已经完成了它在你生命中的使命？'],
  ['节制','♧','调和 · 耐心 · 节奏','失衡 · 过度 · 急切','把不同需求放在一起慢慢调和。稳定的小步，比用力过猛更适合现在。','你或许正被两种极端拉扯。试着寻找可持续的中间地带。','怎样的节奏能让你走得更长远？'],
  ['恶魔','⛓','觉察 · 欲望 · 束缚','松绑 · 对抗 · 依赖','看见让你难以放手的习惯或关系，是恢复选择权的第一步。','你可能已意识到束缚所在。改变可以从一个清晰的边界开始。','是什么让你觉得自己别无选择？'],
  ['高塔','⚡','震动 · 真相 · 重建','抗拒变化 · 余波 · 修复','意外的变化可能打破旧有结构。先照顾好眼前的自己，再考虑如何重建。','变化后的余波需要时间消化。无需催促自己马上恢复如常。','在变化之中，什么仍是你可以依靠的？'],
  ['星星','✧','希望 · 修复 · 信任','失望 · 怀疑 · 疏离','一线希望正在出现。给自己留一点恢复的时间，也留一点对未来的信任。','希望变得微弱时，不必强迫自己乐观。寻找一个真实而微小的亮点。','现在有什么值得你重新相信？'],
  ['月亮','☽','感受 · 梦境 · 未知','困惑 · 焦虑 · 逐渐看清','眼前仍有不确定性。先接纳自己的感受，等更多信息浮现再做判断。','模糊之处可能正逐渐清晰。把猜测与事实分开，会让你更安心。','哪些是事实，哪些只是此刻的担忧？'],
  ['太阳','☼','清晰 · 喜悦 · 活力','疲惫 · 阴影 · 延迟','把目光放在已经生长的部分。坦率表达与简单的快乐，能带来更多能量。','如果光亮暂时被遮住，允许自己休息；喜悦不需要被勉强制造。','最近哪一刻让你感到真切的明亮？'],
  ['审判','✺','觉醒 · 回顾 · 呼唤','自责 · 迟疑 · 旧事','回望走过的路，你或许已经准备好回应一个更真实的方向。','过去的评价不必决定现在的你。用新的眼光看待自己的成长。','你正在听见怎样的内在呼唤？'],
  ['世界','◎','完成 · 整合 · 开阔','未竟 · 缺口 · 过渡','一个阶段的成果值得被看见。带着已有的经验，走向更开阔的下一程。','也许还有一处尚未收尾。给它一个恰当的结束，再开启新的篇章。','你想怎样庆祝或整理这一阶段的收获？']
].map((row, index) => ({
  id:index,
  roman:['0','I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII','XIII','XIV','XV','XVI','XVII','XVIII','XIX','XX','XXI'][index],
  name:row[0],symbol:row[1],upright:row[2],reversed:row[3],
  uprightText:row[4],reversedText:row[5],reflection:row[6],suit:'大阿尔卡那',
  image:'./assets/rws-pam-a/RWS Tarot '+String(index).padStart(2,'0')+' '+[
    'Fool','Magician','High Priestess','Empress','Emperor','Hierophant','Lovers','Chariot',
    'Strength','Hermit','Wheel of Fortune','Justice','Hanged Man','Death','Temperance',
    'Devil','Tower','Star','Moon','Sun','Judgement','World'
  ][index]+'.jpg'
}));
const CARDS = [...MAJOR_CARDS,...MINOR_CARDS];
if(WAITE_MEANINGS.length!==CARDS.length)throw new Error('韦特牌义数据必须覆盖完整的 78 张牌');
CARDS.forEach((card,index)=>{
  const [upright,reversed,uprightText,reversedText]=WAITE_MEANINGS[index];
  Object.assign(card,{upright,reversed,uprightText,reversedText,reflection:'这张牌的原著释义，与你的问题在哪一点相合或相反？'});
});
if(PLAIN_MEANINGS.length!==CARDS.length)throw new Error('通俗牌义必须覆盖完整的 78 张牌');
CARDS.forEach((card,index)=>{
  const [plainUpright,plainReversed]=PLAIN_MEANINGS[index];
  Object.assign(card,{plainUpright,plainReversed});
});

const app = document.getElementById('app');
const saved = readSaved();
const state = {screen:'home', topic:'自我探索', spread:1, question:'', deck:[], picked:[], result:saved, libraryFilter:'全部', selectedCardId:null, aiStatus:'idle', aiError:''};
const topics = [{name:'感情',hint:'关系与内心联结'},{name:'事业',hint:'方向与成长选择'},{name:'自我探索',hint:'与自己温柔相遇'}];
const positions = ['过去','现在','未来'];
const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
function readSaved(){try{const data=JSON.parse(localStorage.getItem('yueyin-oracle-result'));if(!data||!Array.isArray(data.cards)||![1,3].includes(data.spread))return null;const valid=data.cards.length===data.spread&&data.cards.every(c=>Number.isInteger(c.id)&&c.id>=0&&c.id<CARDS.length&&typeof c.reversed==='boolean');return valid?data:null}catch{return null}}
function persist(){try{localStorage.setItem('yueyin-oracle-result',JSON.stringify(state.result))}catch{}}
function randomInt(max){if(window.crypto?.getRandomValues){const arr=new Uint32Array(1);const limit=0x100000000-0x100000000%max;do{crypto.getRandomValues(arr)}while(arr[0]>=limit);return arr[0]%max}return Math.floor(Math.random()*max)}
function shuffle(items){const result=[...items];for(let i=result.length-1;i>0;i--){const j=randomInt(i+1);[result[i],result[j]]=[result[j],result[i]]}return result}
function setScreen(screen){state.screen=screen;render();window.scrollTo({top:0,behavior:'smooth'});app.focus({preventScroll:true})}
function toast(message){const el=document.getElementById('toast');el.textContent=message;el.classList.add('show');clearTimeout(toast.timer);toast.timer=setTimeout(()=>el.classList.remove('show'),2600)}
function progress(active){return `<div class="progress" aria-label="第 ${active} 步，共 3 步"><span class="${active===1?'active':''}">01 提问</span><span class="progress-line"></span><span class="${active===2?'active':''}">02 抽牌</span><span class="progress-line"></span><span class="${active===3?'active':''}">03 解读</span></div>`}
function renderForm(){app.innerHTML=`<section class="flow"><div class="flow-top"><button class="back-link" data-action="home">← 返回首页</button>${progress(1)}</div><div class="flow-heading"><div class="eyebrow">THE QUESTION</div><h2>此刻，你想探索什么？</h2><p>没有标准答案，只需从你真正关心的地方开始。</p></div><div class="ritual-panel"><div class="field-label">01 / 选择一个主题</div><div class="choice-grid">${topics.map(t=>`<button class="choice ${state.topic===t.name?'selected':''}" data-topic="${t.name}" aria-pressed="${state.topic===t.name}"><span class="choice-title">${t.name}</span><span class="choice-hint">${t.hint}</span></button>`).join('')}</div><label class="field-label" for="question">02 / 写下你的问题 <span style="font-weight:300;color:#988ca7">（选填）</span></label><textarea id="question" class="question-box" maxlength="160" placeholder="例如：我该如何面对眼前的变化？">${escapeHtml(state.question)}</textarea><p class="field-note">可以提出开放式问题；填写后，问题与抽到的牌会发送给 Qwen 生成专属解读。</p><div class="field-label spread-heading">03 / 选择牌阵</div><div class="spread-grid"><button class="choice spread-choice ${state.spread===1?'selected':''}" data-spread="1" aria-pressed="${state.spread===1}"><span class="spread-icon">✧</span><span><span class="choice-title">单张启示</span><span class="choice-hint">聚焦当下的一份提醒</span></span></button><button class="choice spread-choice ${state.spread===3?'selected':''}" data-spread="3" aria-pressed="${state.spread===3}"><span class="spread-icon">✧ ✧ ✧</span><span><span class="choice-title">时光三牌</span><span class="choice-hint">过去、现在与未来</span></span></button></div></div><div class="flow-action"><button class="primary-btn" data-action="draw">继续，去抽牌 <span aria-hidden="true">→</span></button></div></section>`}
function newDeck(){state.deck=shuffle(CARDS.map(c=>c.id));state.picked=[];setScreen('draw')}
function renderDraw(){const count=state.picked.length;app.innerHTML=`<section class="flow"><div class="flow-top"><button class="back-link" data-action="form">← 返回提问</button>${progress(2)}</div><div class="flow-heading draw-header"><div class="eyebrow">THE DRAW</div><h2>滑动牌阵，凭直觉抽牌</h2><p>完整的 78 张牌已洗好。左右滑动牌背，选择 ${state.spread} 张。</p></div><div class="draw-status" aria-live="polite">78 张牌参与洗牌 · 已选择 ${count} / ${state.spread} 张</div><div class="deck-stage"><button type="button" class="deck-arrow" data-action="slide-left" aria-label="向左浏览牌阵">‹</button><div class="deck-viewport" id="deck-viewport" tabindex="0" aria-label="可左右滑动的 78 张牌背"><div class="deck" role="group" aria-label="完整 78 张塔罗牌背">${state.deck.map((id,index)=>{const selected=state.picked.some(p=>p.index===index);return `<button type="button" class="draw-card ${selected?'selected':''}" data-card-index="${index}" aria-label="${selected?'已选中的第':'选择第'}${index+1}张牌" ${selected||count>=state.spread?'disabled':''}><span class="draw-card-inner"><span class="draw-card-glyph">☾</span></span></button>`}).join('')}</div></div><button type="button" class="deck-arrow" data-action="slide-right" aria-label="向右浏览牌阵">›</button></div><p class="draw-hint">可用手指、触控板或两侧箭头滑动；同一次抽牌不会重复。</p><div class="draw-action">${count===state.spread?'<button class="primary-btn" data-action="reveal">翻开我的牌 <span aria-hidden="true">→</span></button>':''}</div></section>`}
function cardText(card,position){const base=card.reversed?card.data.plainReversed:card.data.plainUpright;if(state.result.spread===1)return base;const prefix=position==='过去'?'回看过去：':position==='现在'?'放在当下：':'望向未来：';return prefix+base}
function aiPanel(result){
  if(!result.question)return '';
  const body=result.aiText?escapeHtml(result.aiText):state.aiStatus==='loading'?'正在把你的问题与牌义放在一起解读，请稍等……':state.aiStatus==='error'?escapeHtml(state.aiError||'生成暂时失败，请稍后重试。'):'点击下方按钮生成针对这个问题的解读。';
  const retry=!result.aiText&&state.aiStatus!=='loading'?'<button type="button" class="outline-btn" data-action="retry-ai">重新生成解读</button>':'';
  return `<section class="ai-reading" aria-live="polite"><div class="eyebrow">YOUR QUESTION · QWEN</div><h3>关于你的问题</h3><p>${body}</p>${retry}<div class="ai-note">由 Qwen 结合你的问题和抽到的牌生成，供自我探索；它不能预知未来。</div></section>`;
}
function renderResult(){
  const result=state.result;if(!result){setScreen('home');return}
  const cards=result.cards.map(c=>({data:CARDS[c.id],reversed:c.reversed}));
  app.innerHTML=`<section class="result-page"><div class="flow-top"><button class="back-link" data-action="home">← 返回首页</button>${progress(3)}</div><div class="flow-heading"><div class="eyebrow">YOUR READING</div><h2>这是属于你的牌面</h2><p>先读通俗解释；韦特原著释义保留在每张牌下方。</p></div><div class="result-question"><strong>${escapeHtml(result.topic)}</strong>${result.question?` · “${escapeHtml(result.question)}”`:' · 此刻的探索'}</div><div class="result-grid ${result.spread===1?'single-result':''}" style="--result-columns:${result.spread}">${cards.map((card,index)=>`<article class="result-card"><div class="result-position">${result.spread===1?'此刻的启示':`${String(index+1).padStart(2,'0')} · ${positions[index]}`}</div><div class="reading-visual ${card.reversed?'reverse':''}"><img class="reading-image" src="${escapeHtml(card.data.image)}" alt="${escapeHtml(card.data.name)}原版牌面" /></div><h3 class="reading-name">${escapeHtml(card.data.name)}</h3><div class="reading-orientation">${card.reversed?'逆位':'正位'}</div><div class="reading-divider"></div><p class="reading-text">${escapeHtml(cardText(card,positions[index]))}</p><div class="reading-original"><span>韦特原著释义 · ${card.reversed?'逆位':'正位'}</span><p>${escapeHtml(card.reversed?card.data.reversedText:card.data.uprightText)}</p></div></article>`).join('')}</div>${aiPanel(result)}<div class="result-actions"><button class="outline-btn" data-action="copy">复制解读</button><button class="outline-btn" data-action="print">打印 / 保存 PDF</button><button class="outline-btn" data-action="download">保存牌面摘要</button><button class="primary-btn" data-action="restart">重新抽牌 <span aria-hidden="true">↗</span></button></div></section>`;
}
function renderLibrary(){
  const filters=['全部','大阿尔卡那','权杖','圣杯','宝剑','星币'];
  const cards=state.libraryFilter==='全部'?CARDS:CARDS.filter(card=>card.suit===state.libraryFilter);
  app.innerHTML=`<section class="library-page"><div class="library-head"><div class="eyebrow">THE ORIGINAL DECK</div><h2>78 张牌，78 个故事</h2><p>完整的韦特—史密斯塔罗牌面。点击任意一张，细看 Pamela Colman Smith 的原版画作。</p><div class="library-filters" role="group" aria-label="筛选牌组">${filters.map(filter=>`<button type="button" data-library-filter="${filter}" class="${state.libraryFilter===filter?'selected':''}" aria-pressed="${state.libraryFilter===filter}">${filter}</button>`).join('')}</div></div><div class="library-grid">${cards.map(card=>`<button class="library-card" data-open-card="${card.id}"><img src="${escapeHtml(card.image)}" alt="${escapeHtml(card.name)}原版牌面" loading="lazy"><span>${escapeHtml(card.name)}</span></button>`).join('')}</div><p class="library-source">牌面取自 <a href="https://commons.wikimedia.org/wiki/Category:Rider-Waite-Smith_tarot_deck_(TaionWC)" target="_blank" rel="noopener">Wikimedia Commons 的 Pam-A 原版扫描集</a>。保留原图色彩、边框与英文牌名。</p></section>`;
}
function renderDetail(){
  const card=CARDS[state.selectedCardId];
  if(!card){setScreen('library');return}
  app.innerHTML=`<section class="detail-page"><button class="back-link" data-action="library">← 返回 78 张牌</button><div class="detail-layout"><div class="detail-art"><img src="${escapeHtml(card.image)}" alt="${escapeHtml(card.name)}原版牌面"></div><div class="detail-copy"><div class="eyebrow">${escapeHtml(card.suit)} · ${card.roman}</div><h2>${escapeHtml(card.name)}</h2><h3>正位 · 通俗解释</h3><p>${escapeHtml(card.plainUpright)}</p><p class="detail-original">韦特原著释义：${escapeHtml(card.uprightText)}</p><h3>逆位 · 通俗解释</h3><p>${escapeHtml(card.plainReversed)}</p><p class="detail-original">韦特原著释义：${escapeHtml(card.reversedText)}</p></div></div></section>`;
}
function renderGuide(){app.innerHTML=`<section class="guide"><div class="flow-heading"><div class="eyebrow">A GENTLE GUIDE</div><h2>让一张牌，开启一次对话。</h2><p>塔罗不替你决定未来。它提供一个角度，帮助你听见自己的想法。</p></div><div class="guide-grid"><article class="guide-item"><span class="guide-num">01</span><h3>静心提问</h3><p>选择你在意的主题。与其问“结果会是什么”，不如问“我能如何理解或面对这件事”。</p></article><article class="guide-item"><span class="guide-num">02</span><h3>凭直觉选牌</h3><p>选择单张牌，或过去、现在、未来三张牌。无需分析哪张“更好”，只要跟随第一眼的感觉。</p></article><article class="guide-item"><span class="guide-num">03</span><h3>留下触动</h3><p>阅读牌义时，留意与你经历产生联系的部分。把它当作提问的起点，而非必须遵从的结论。</p></article></div><div class="guide-cta"><button class="primary-btn" data-action="start">开始我的占卜 <span aria-hidden="true">→</span></button></div></section>`}
function renderHome(){app.innerHTML=homeOracle()+homeModes()}
function render(){if(state.screen==='home')renderHome();else if(state.screen==='form')renderForm();else if(state.screen==='draw')renderDraw();else if(state.screen==='result')renderResult();else if(state.screen==='library')renderLibrary();else if(state.screen==='detail')renderDetail();else if(state.screen==='experience')renderExperience();else renderGuide()}
function reveal(){if(state.picked.length!==state.spread)return;state.result={topic:state.topic,spread:state.spread,question:state.question.trim(),cards:state.picked.map(p=>({id:state.deck[p.index],reversed:p.reversed}))};state.aiStatus='idle';state.aiError='';persist();setScreen('result');if(state.result.question)requestAiReading()}
async function requestAiReading(){
  const result=state.result;if(!result?.question||state.aiStatus==='loading')return;
  state.aiStatus='loading';state.aiError='';renderResult();
  try{
    const response=await fetch('/api/reading',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({topic:result.topic,spread:result.spread,question:result.question,cards:result.cards})});
    const data=await response.json();
    if(!response.ok||typeof data.answer!=='string'||!data.answer.trim())throw new Error(data.error||'暂时无法生成解读');
    if(state.result!==result)return;
    result.aiText=data.answer.trim();state.aiStatus='done';persist();renderResult();
  }catch(error){
    if(state.result!==result)return;
    state.aiStatus='error';state.aiError=error.message||'本机解读服务暂时不可用';renderResult();
  }
}
function resultText(){const r=state.result;const lines=['月隐先知 · 我的牌面',`主题：${r.topic}`,r.question?`问题：${r.question}`:''];r.cards.forEach((c,i)=>{const data=CARDS[c.id];lines.push(`${r.spread===1?'此刻的启示':positions[i]}｜${data.name} · ${c.reversed?'逆位':'正位'}`,`通俗解释：${c.reversed?data.plainReversed:data.plainUpright}`,`韦特原著释义：${c.reversed?data.reversedText:data.uprightText}`)});if(r.aiText)lines.push(`关于你的问题（Qwen）：${r.aiText}`);return lines.filter(Boolean).join('\n')}
async function copyResult(){const value=resultText();try{await navigator.clipboard.writeText(value);toast('解读已复制')}catch{const box=document.createElement('textarea');box.value=value;document.body.append(box);box.select();try{document.execCommand('copy');toast('解读已复制')}catch{toast('复制失败，请手动选择文字')}box.remove()}}
function xml(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]))}
function wrapText(text,max){const chars=[...text];const lines=[];while(chars.length)lines.push(chars.splice(0,max).join(''));return lines}
function downloadResult(){const r=state.result;const width=960;const cardBlock=165;const height=330+r.cards.length*cardBlock+80;let y=235;const parts=[`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><defs><linearGradient id="bg" x2="1" y2="1"><stop stop-color="#2d2040"/><stop offset="1" stop-color="#171124"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#bg)"/><rect x="28" y="28" width="904" height="${height-56}" rx="12" fill="none" stroke="#d9b978" opacity=".65"/><rect x="39" y="39" width="882" height="${height-78}" rx="8" fill="none" stroke="#d9b978" opacity=".22"/><text x="480" y="92" text-anchor="middle" fill="#d9b978" font-size="17" letter-spacing="6" font-family="serif">✧ MOON VEIL ORACLE ✧</text><text x="480" y="145" text-anchor="middle" fill="#f4eee8" font-size="35" font-family="serif">月隐先知 · 我的牌面</text><text x="480" y="190" text-anchor="middle" fill="#b8abc7" font-size="18" font-family="sans-serif">${xml(r.topic)}${r.question?' · '+xml([...r.question].slice(0,25).join('')):''}</text>`];r.cards.forEach((c,i)=>{const data=CARDS[c.id],label=r.spread===1?'此刻的启示':positions[i];parts.push(`<line x1="110" y1="${y-20}" x2="850" y2="${y-20}" stroke="#d9b978" opacity=".25"/><text x="120" y="${y+24}" fill="#d9b978" font-size="31" font-family="serif">${xml(data.symbol)}  ${xml(label)} · ${xml(data.name)} ${c.reversed?'逆位':'正位'}</text><text x="120" y="${y+57}" fill="#cbb9d2" font-size="17" font-family="sans-serif">${xml(c.reversed?data.reversed:data.upright)}</text>`);wrapText(c.reversed?data.plainReversed:data.plainUpright,35).slice(0,3).forEach((line,j)=>parts.push(`<text x="120" y="${y+91+j*28}" fill="#eee6f2" font-size="20" font-family="sans-serif">${xml(line)}</text>`));y+=cardBlock});parts.push(`<text x="480" y="${height-72}" text-anchor="middle" fill="#9386a4" font-size="14" font-family="sans-serif">塔罗解读用于自我探索与娱乐</text></svg>`);const blob=new Blob([parts.join('')],{type:'image/svg+xml;charset=utf-8'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='月隐先知-牌面摘要.svg';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);toast('牌面摘要已保存')}
function slideDeck(direction){const viewport=document.getElementById('deck-viewport');if(viewport)viewport.scrollBy({left:direction*viewport.clientWidth*.75,behavior:'smooth'})}
document.addEventListener('click',event=>{
  const topic=event.target.closest('[data-topic]');if(topic){state.topic=topic.dataset.topic;renderForm();return}
  const spread=event.target.closest('[data-spread]');if(spread){state.spread=Number(spread.dataset.spread);renderForm();return}
  const card=event.target.closest('[data-card-index]');
  if(card&&state.screen==='draw'){
    const index=Number(card.dataset.cardIndex);
    if(state.picked.length<state.spread&&!state.picked.some(p=>p.index===index)){
      const left=document.getElementById('deck-viewport')?.scrollLeft||0;
      state.picked.push({index,reversed:randomInt(2)===0});renderDraw();
      document.getElementById('deck-viewport').scrollLeft=left;
    }
    return;
  }
  const filter=event.target.closest('[data-library-filter]');if(filter){state.libraryFilter=filter.dataset.libraryFilter;renderLibrary();return}
  const detail=event.target.closest('[data-open-card]');if(detail){state.selectedCardId=Number(detail.dataset.openCard);setScreen('detail');return}
  const target=event.target.closest('[data-action]');if(!target)return;
  switch(target.dataset.action){
    case'home':setScreen('home');break;case'library':setScreen('library');break;case'guide':setScreen('guide');break;
    case'start':setScreen('form');break;case'form':setScreen('form');break;case'draw':newDeck();break;
    case'slide-left':slideDeck(-1);break;case'slide-right':slideDeck(1);break;
    case'reveal':reveal();break;case'resume':if(state.result)setScreen('result');break;
    case'retry-ai':requestAiReading();break;
    case'restart':state.question='';state.topic='自我探索';state.spread=1;setScreen('form');break;
    case'copy':copyResult();break;case'print':window.print();break;case'download':downloadResult();break;
  }
});
document.addEventListener('wheel',event=>{const viewport=event.target.closest?.('#deck-viewport');if(viewport&&Math.abs(event.deltaY)>Math.abs(event.deltaX)){viewport.scrollLeft+=event.deltaY;event.preventDefault()}},{passive:false});
document.addEventListener('keydown',event=>{if(event.target.id==='deck-viewport'&&['ArrowLeft','ArrowRight'].includes(event.key)){slideDeck(event.key==='ArrowRight'?1:-1);event.preventDefault()}});
document.addEventListener('input',event=>{if(event.target.id==='question')state.question=event.target.value});
render();

