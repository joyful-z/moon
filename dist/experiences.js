const MODES = [
  ['tarot','塔罗占卜','78 张韦特—史密斯原版牌','✦'],
  ['zodiac','十二星座','认识你的星座，领取今日提示','♈'],
  ['chart','出生星盘','计算出生时的天空位置','☉'],
  ['synastry','双人合盘','看见两张星盘的互动','☍'],
  ['numerology','数字命理','从生日探索生命灵数','∞'],
  ['oracle','神谕卡','抽取一句此刻的提醒','☾'],
  ['book','答案之书','翻开一页，换个角度提问','✧'],
  ['iching','易经六爻／卦象','三枚铜钱起卦，阅读变化','☰']
];

const ZODIAC = [
  ['白羊座','♈','3.21—4.19','行动与开创','你愿意先走一步，也需要给热情一个清晰方向。','先说明自己的需要，再邀请对方回应。','选一件最重要的事开始，不必同时冲向所有目标。'],
  ['金牛座','♉','4.20—5.20','稳定与感官','你重视可靠的节奏，也能从具体的美好里恢复力量。','把在意说出来，不让沉默替你表达。','检查眼前的方法是否仍然值得坚持。'],
  ['双子座','♊','5.21—6.20','好奇与交流','多角度的思考是你的优势，聚焦会让灵感真正落地。','认真听完一个答案，再提出下一个问题。','给散落的想法排一个先后顺序。'],
  ['巨蟹座','♋','6.21—7.22','照料与归属','你擅长感受气氛，也值得为自己的情绪留出空间。','表达关心时，也说清自己的边界。','先整理让你安心的环境，再处理难题。'],
  ['狮子座','♌','7.23—8.22','创造与表达','你能点亮场面，真正的自信也容得下别人的光。','用真诚的赞赏代替猜测。','拿出一个能代表你心意的作品。'],
  ['处女座','♍','8.23—9.22','细节与改进','你的观察力能让事情更好，但不必把每一步都做到完美。','少一点替对方修正，多一点询问。','先完成可用的版本，再慢慢打磨。'],
  ['天秤座','♎','9.23—10.22','平衡与关系','你看得见不同立场，自己的偏好也应在天平上。','温和而直接地说出你的选择。','确定一个判断标准，减少反复权衡。'],
  ['天蝎座','♏','10.23—11.21','深度与转化','你愿意触及问题的核心，也可以给信任留一些时间。','说出真实感受，而不是测试对方。','把注意力放在能改变的一环。'],
  ['射手座','♐','11.22—12.21','探索与远方','你需要成长的空间，一个具体的承诺能让远方更接近。','分享愿景，也问问对方当下需要什么。','把大目标拆成今天能完成的一步。'],
  ['摩羯座','♑','12.22—1.19','责任与建设','你善于长期投入，休息同样是计划的一部分。','让亲近的人看见你的感受，不只看见你的负责。','确认这份努力是否仍指向你真正重视的事。'],
  ['水瓶座','♒','1.20—2.18','独立与新意','你的不同视角很珍贵，连接会让想法产生更大的作用。','解释你的思路，也给不同意见留座位。','试一个小规模的新方法，观察真实反馈。'],
  ['双鱼座','♓','2.19—3.20','想象与共情','你容易感受到微妙之处，清楚的边界会保护这份敏锐。','分清自己的情绪与对方的情绪。','给灵感安排一段不被打扰的实践时间。']
];

const ZODIAC_DAILY_THEMES = [
  ['自身节奏','先留意自己的精力与情绪，再决定今天要接住多少事。'],
  ['资源安排','检查时间和预算，把资源留给真正重要的事。'],
  ['沟通学习','把想法说具体，也给新的信息留一点空间。'],
  ['家庭与安定','关注让你安心的人和环境，先处理一件家中的小事。'],
  ['创造表达','给兴趣或创意一点时间，不急着评判成果。'],
  ['日常习惯','从一项可完成的日常事务开始，调整自己的节奏。'],
  ['关系合作','先听清对方的需要，再表达你的边界。'],
  ['共享与界限','厘清共同承担的事，避免把猜测当成约定。'],
  ['探索视野','为想了解的领域找一条可靠资料，迈出学习的一步。'],
  ['目标责任','确认今天的努力与长期方向是否一致。'],
  ['朋友与社群','主动联系一个能互相支持的人。'],
  ['休息整理','给自己一点独处和收尾的时间，暂缓不急的决定。']
];

const CITIES = [
  ['上海','Asia/Shanghai',31.23,121.47],['北京','Asia/Shanghai',39.90,116.40],['广州','Asia/Shanghai',23.13,113.26],['深圳','Asia/Shanghai',22.54,114.06],
  ['成都','Asia/Shanghai',30.67,104.07],['重庆','Asia/Shanghai',29.56,106.55],['杭州','Asia/Shanghai',30.27,120.15],['南京','Asia/Shanghai',32.06,118.80],
  ['武汉','Asia/Shanghai',30.59,114.31],['西安','Asia/Shanghai',34.34,108.94],['天津','Asia/Shanghai',39.13,117.20],['沈阳','Asia/Shanghai',41.80,123.43],
  ['哈尔滨','Asia/Shanghai',45.80,126.53],['昆明','Asia/Shanghai',25.04,102.71],['长沙','Asia/Shanghai',28.23,112.94],['郑州','Asia/Shanghai',34.75,113.62],
  ['青岛','Asia/Shanghai',36.07,120.38],['厦门','Asia/Shanghai',24.48,118.08],['福州','Asia/Shanghai',26.08,119.30],['乌鲁木齐','Asia/Shanghai',43.82,87.62],
  ['拉萨','Asia/Shanghai',29.65,91.13],['香港','Asia/Hong_Kong',22.32,114.17],['澳门','Asia/Macau',22.20,113.54],['台北','Asia/Taipei',25.03,121.57],
  ['东京','Asia/Tokyo',35.68,139.69],['首尔','Asia/Seoul',37.57,126.98],['新加坡','Asia/Singapore',1.35,103.82],['曼谷','Asia/Bangkok',13.76,100.50],
  ['伦敦','Europe/London',51.51,-0.13],['巴黎','Europe/Paris',48.86,2.35],['纽约','America/New_York',40.71,-74.01],['洛杉矶','America/Los_Angeles',34.05,-118.24],
  ['悉尼','Australia/Sydney',-33.87,151.21]
];

const exp = {mode:'zodiac',zodiac:0,zodiacSky:null,zodiacLoading:false,zodiacErrorDay:null,oracle:null,oracleQuestion:'',book:null,bookQuestion:'',bookTurning:false,hex:null,hexQuestion:'',hexThrows:[],hexRolling:false,hexAi:{status:'idle',text:'',error:''},number:null,chart:null,chartInput:null,chartAi:{status:'idle',text:'',error:''},synastry:null};
const localDay = () => {const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`};
const ORACLE_DECK_VERSION='365-complete-v1';
function readDailyOracle(){try{const value=JSON.parse(localStorage.getItem('yueyin-daily-oracle'));return value?.day===localDay()&&value.deckVersion===ORACLE_DECK_VERSION&&Number.isInteger(value.id)&&ORACLE_CARDS[value.id]?value:null}catch{return null}}
function drawDailyOracle(){const value={day:localDay(),deckVersion:ORACLE_DECK_VERSION,id:randomInt(ORACLE_CARDS.length)};try{localStorage.setItem('yueyin-daily-oracle',JSON.stringify(value))}catch{}renderHome();document.getElementById('daily-oracle')?.scrollIntoView({behavior:'smooth',block:'center'})}
function oracleMarkup(card,caption){const index=ORACLE_CARDS.indexOf(card)+1;return `<div class="oracle-face"><span class="oracle-face-top">MOON VEIL ORACLE · ${escapeHtml(caption)}</span><span class="oracle-face-symbol" aria-hidden="true">${card[1]}</span><span class="oracle-face-name">${escapeHtml(card[0])}</span><span class="oracle-face-theme">${escapeHtml(card[2])}</span><span class="oracle-face-index">${String(index).padStart(3,'0')} / ${ORACLE_CARDS.length}</span></div><div class="oracle-copy"><div class="eyebrow">${escapeHtml(card[2])}</div><h3>${escapeHtml(card[0])}</h3><p>${escapeHtml(card[3])}</p><div class="oracle-action"><strong>给今天的建议</strong>${escapeHtml(card[4])}</div></div>`}
function homeOracle(){const daily=readDailyOracle();return `<section id="daily-oracle" class="daily-oracle"><div class="section-head"><span class="eyebrow">TODAY'S ORACLE</span><h2>今天，月亮想对你说</h2></div><div class="daily-oracle-body">${daily?oracleMarkup(ORACLE_CARDS[daily.id],'今日神谕'):`<div class="oracle-face oracle-back"><span class="oracle-face-top">A SMALL MOMENT FOR YOU</span><span class="oracle-face-symbol" aria-hidden="true">☾</span><span class="oracle-face-name">今日神谕</span></div><div class="oracle-copy"><div class="eyebrow">PAUSE · BREATHE · DRAW</div><h3>为今天抽一张牌</h3><button class="primary-btn" data-exp-action="daily">抽取今日神谕 <span aria-hidden="true">→</span></button></div>`}</div></section>`}
function homeModes(){return `<section class="experience-section"><div class="section-head"><span class="eyebrow">EXPLORE YOUR WAY</span><h2>选择一种探索方式</h2></div><div class="mode-grid">${MODES.filter(([key])=>!['oracle','numerology'].includes(key)).map(([key,title,hint,symbol],index)=>`<button class="mode-tile" type="button" data-exp-mode="${key}"><span class="mode-index">${String(index+1).padStart(2,'0')}</span><span class="mode-symbol" aria-hidden="true">${symbol}\ufe0e</span><strong>${title}</strong><span>${hint}</span><span class="mode-arrow" aria-hidden="true">↗</span></button>`).join('')}</div></section>`}
function openMode(mode){if(mode==='tarot'){setScreen('form');return}if(!MODES.some(item=>item[0]===mode))return;exp.mode=mode;setScreen('experience')}
function shell(title,kicker,description,body){return `<section class="experience-page"><button class="back-link" data-action="home">← 返回首页</button><div class="experience-heading"><div class="eyebrow">${kicker}</div><h2>${title}</h2><p>${description}</p></div>${body}</section>`}

function beijingDay(){const parts=new Intl.DateTimeFormat('en-US',{timeZone:'Asia/Shanghai',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());const value=Object.fromEntries(parts.filter(part=>part.type!=='literal').map(part=>[part.type,part.value]));return `${value.year}-${value.month}-${value.day}`}
async function loadZodiacSky(){
  const day=beijingDay();
  if(exp.zodiacLoading||exp.zodiacSky?.day===day||exp.zodiacErrorDay===day)return;
  exp.zodiacLoading=true;
  try{
    const response=await fetch('/api/chart',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({date:day,time:'12:00',timeZone:'Asia/Shanghai',latitude:0,longitude:0})});
    if(!response.ok)throw new Error('星历暂时不可用');
    const chart=await response.json();
    const sun=chart.planets?.find(item=>item.key==='Sun'),moon=chart.planets?.find(item=>item.key==='Moon');
    if(!sun||!moon||!ZODIAC.some(item=>item[0]===moon.sign))throw new Error('天体位置数据不完整');
    exp.zodiacSky={day,sun,moon};
    exp.zodiacErrorDay=null;
  }catch{exp.zodiacErrorDay=day}
  finally{exp.zodiacLoading=false;if(state.screen==='experience'&&exp.mode==='zodiac')renderZodiac()}
}
function zodiacDailyMarkup(){
  const sky=exp.zodiacSky?.day===beijingDay()?exp.zodiacSky:null;
  const source=`<div class="zodiac-sources">位置由本站的 <a href="https://github.com/cosinekitty/astronomy" target="_blank" rel="noopener">Astronomy Engine</a> 计算；月亮行运与主题的读法参考 <a href="https://www.astro.com/astrology/in_hand2_moon_effects_n.htm" target="_blank" rel="noopener">Astrodienst / Robert Hand</a>。<a href="https://www.astro.com/horoscopes" target="_blank" rel="noopener">查看 Astrodienst 专业日运 ↗</a></div>`;
  if(!sky)return `<div class="daily-cue" role="status"><span>今日星空</span><p>${exp.zodiacErrorDay===beijingDay()?'本机暂时无法计算今天的天体位置。':'正在计算今天的太阳与月亮位置…'}</p>${source}</div>`;
  const moonIndex=ZODIAC.findIndex(item=>item[0]===sky.moon.sign);
  const themeIndex=(moonIndex-exp.zodiac+12)%12;
  const [theme,action]=ZODIAC_DAILY_THEMES[themeIndex];
  return `<div class="daily-cue"><span>今日主题 · ${escapeHtml(theme)}</span><p>以你选择的太阳星座为起点，今天的月亮落在第 ${themeIndex+1} 个星座位置。${escapeHtml(action)}</p><div class="sky-facts">${escapeHtml(sky.day)} 北京时间 12:00 · 太阳 ${escapeHtml(sky.sun.sign)} ${sky.sun.degree}° · 月亮 ${escapeHtml(sky.moon.sign)} ${sky.moon.degree}°</div>${source}</div>`;
}
function renderZodiac(){
  const z=ZODIAC[exp.zodiac];
  const body=`<div class="zodiac-grid">${ZODIAC.map((item,index)=>`<button type="button" class="zodiac-choice ${index===exp.zodiac?'active':''}" data-exp-zodiac="${index}" aria-pressed="${index===exp.zodiac}"><span>${item[1]}\ufe0e</span>${item[0]}</button>`).join('')}</div><div class="zodiac-result"><div class="zodiac-emblem">${z[1]}\ufe0e</div><div class="zodiac-description"><span class="eyebrow">${z[2]} · ${z[3]}</span><h3>${z[0]}</h3><p>${z[4]}</p><div class="zodiac-notes"><div><strong>关系中的提醒</strong>${z[5]}</div><div><strong>行动中的提醒</strong>${z[6]}</div></div></div></div>${zodiacDailyMarkup()}`;
  app.innerHTML=shell('十二星座','THE ZODIAC','选择太阳星座，查看按当天月亮位置整理的主题，并阅读专业占星来源。',body);
  void loadZodiacSky();
}

function birthFields(prefix,title){return `<fieldset class="birth-fields"><legend>${title}</legend><div class="birth-grid"><label>出生日期<input name="${prefix}-date" type="date" min="1900-01-01" max="2100-12-31" required></label><label>出生时间<input name="${prefix}-time" type="time" required></label><label>出生城市<select name="${prefix}-city">${CITIES.map((city,index)=>`<option value="${index}">${city[0]}</option>`).join('')}<option value="custom">其他城市 · 手动填写</option></select></label></div><details class="custom-city"><summary>其他城市：手动填写经纬度与时区</summary><div class="birth-grid"><label>纬度（北纬为正）<input name="${prefix}-latitude" type="number" step="0.01" min="-66" max="66" placeholder="如 31.23"></label><label>经度（东经为正）<input name="${prefix}-longitude" type="number" step="0.01" min="-180" max="180" placeholder="如 121.47"></label><label>IANA 时区<input name="${prefix}-timezone" type="text" placeholder="如 Asia/Shanghai"></label></div></details></fieldset>`}
function birthFrom(form,prefix){
  const data=new FormData(form),city=data.get(`${prefix}-city`);
  const record={date:String(data.get(`${prefix}-date`)||''),time:String(data.get(`${prefix}-time`)||'')};
  if(city==='custom'){
    record.latitude=Number(data.get(`${prefix}-latitude`));record.longitude=Number(data.get(`${prefix}-longitude`));record.timeZone=String(data.get(`${prefix}-timezone`)||'').trim();
    if(!data.get(`${prefix}-latitude`)||!data.get(`${prefix}-longitude`)||!record.timeZone)throw new Error('请填全其他城市的经纬度和时区');
  } else {
    const selected=CITIES[Number(city)];if(!selected)throw new Error('请选择出生城市');
    record.latitude=selected[2];record.longitude=selected[3];record.timeZone=selected[1];record.city=selected[0];
  }
  return record;
}
function chartWheel(chart,label){
  const signs=['♈︎','♉︎','♊︎','♋︎','♌︎','♍︎','♎︎','♏︎','♐︎','♑︎','♒︎','♓︎'];
  const polar=(longitude,radius)=>{const angle=(longitude-90)*Math.PI/180;return [160+Math.cos(angle)*radius,160+Math.sin(angle)*radius]};
  const spokes=Array.from({length:12},(_,i)=>{const [x1,y1]=polar(i*30,105),[x2,y2]=polar(i*30,151);const [tx,ty]=polar(i*30+15,133);return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/><text x="${tx}" y="${ty+5}" class="wheel-sign" text-anchor="middle">${signs[i]}</text>`}).join('');
  const markers=chart.planets.map((planet,index)=>{const [x,y]=polar(planet.longitude,98-(index%4)*16);return `<g><title>${planet.name} ${planet.sign} ${planet.degree}°</title><circle cx="${x}" cy="${y}" r="11"/><text x="${x}" y="${y+4}" text-anchor="middle">${planet.name[0]}</text></g>`}).join('');
  const [rx,ry]=polar(chart.rising.longitude,153);
  return `<div class="chart-wheel"><svg viewBox="0 0 320 320" role="img" aria-label="${escapeHtml(label)}的十二星座星盘轮图"><circle class="wheel-ring" cx="160" cy="160" r="151"/><circle class="wheel-ring" cx="160" cy="160" r="105"/><g class="wheel-spokes">${spokes}</g><g class="wheel-planets">${markers}</g><circle class="wheel-rising" cx="${rx}" cy="${ry}" r="5"/><text class="wheel-center" x="160" y="156" text-anchor="middle">${escapeHtml(label)}</text><text class="wheel-center-sub" x="160" y="178" text-anchor="middle">ASC ${escapeHtml(chart.rising.sign)}</text></svg></div>`
}
function planetRow(p){return `<tr><th scope="row">${p.name}</th><td>${p.sign} ${p.degree.toFixed(1)}°</td><td>第 ${p.house} 宫</td></tr>`}
function chartSummary(chart){const sun=chart.planets[0],moon=chart.planets[1];return `太阳在${sun.sign}，提醒你留意自己主动表达的方式；月亮在${moon.sign}，可以作为观察情绪需求的象征；上升在${chart.rising.sign}，描述你与外界相遇的起点。`}
function chartResult(chart,label){return `<div class="chart-result"><div class="chart-main">${chartWheel(chart,label)}<div class="chart-main-copy"><span class="eyebrow">YOUR SKY AT BIRTH</span><h3>${escapeHtml(label)} · 基础星盘</h3><p>${chartSummary(chart)}</p><div class="big-three"><span>☉ 太阳 <strong>${chart.planets[0].sign}</strong></span><span>☽ 月亮 <strong>${chart.planets[1].sign}</strong></span><span>↗ 上升 <strong>${chart.rising.sign}</strong></span></div><small>出生时刻：${escapeHtml(chart.date)} ${escapeHtml(chart.time)} · ${escapeHtml(chart.timeZone)}｜宫位采用整宫制。</small></div></div><div class="chart-data"><div><h4>行星落点</h4><table><thead><tr><th>天体</th><th>星座与度数</th><th>宫位</th></tr></thead><tbody>${chart.planets.map(planetRow).join('')}</tbody></table></div><div><h4>主要相位</h4><div class="aspect-list">${chart.aspects.slice(0,8).map(a=>`<p>${a.first}与${a.second} · ${a.name}<small>容许度 ${a.orb}°</small></p>`).join('')||'<p>当前未筛出容许度内的主要相位。</p>'}</div></div></div></div>`}
function aiExplanation(title,kicker,reading,retryAction,retryLabel){
  const body=reading.status==='loading'?'正在结合计算结果生成详细解读，请稍等……':reading.status==='error'?escapeHtml(reading.error||'解读暂时不可用，请重试。'):reading.text?escapeHtml(reading.text):'准备解读中……';
  return `<section class="exp-ai-reading" aria-live="polite"><span class="eyebrow">${kicker}</span><h3>${title}</h3><div class="exp-ai-body">${body}</div>${reading.status==='error'?`<button type="button" class="outline-btn" data-exp-action="${retryAction}">重新生成解读</button>`:''}${retryLabel&&reading.status==='done'?`<button type="button" class="outline-btn" data-exp-action="${retryAction}">${retryLabel}</button>`:''}</section>`;
}
function renderChart(){const body=exp.chart?`${chartResult(exp.chart,'你的星盘')}${aiExplanation('更详细的星盘解读','QWEN · NATAL CHART',exp.chartAi,'chart-ai-retry')}<div class="experience-actions"><button type="button" class="outline-btn" data-exp-action="chart-reset">重新输入出生资料</button></div>`:`<form class="experience-form" data-exp-form="chart">${birthFields('a','你的出生资料')}<p class="form-help">出生时间会影响上升星座。城市列表使用当地法定时区；若不在列表中，可手动填写经纬度和 IANA 时区。出生资料在本机计算，星体落点与相位会发送给 Qwen 生成详细解读。</p><button class="primary-btn" type="submit">生成出生星盘 →</button><p class="form-status" data-exp-status role="status"></p></form>`;app.innerHTML=shell('出生星盘','NATAL CHART','根据日期、时间与地点计算太阳、月亮、行星和上升的位置，显示整宫制宫位。',body)}
async function loadChartAi(){
  const chart=exp.chart,input=exp.chartInput;if(!chart||!input)return;
  exp.chartAi={status:'loading',text:'',error:''};if(state.screen==='experience'&&exp.mode==='chart')renderChart();
  try{
    const response=await fetch('/api/chart-interpretation',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(input)});
    const data=await response.json();if(!response.ok||!data.answer)throw new Error(data.error||'详细解读暂时不可用');
    if(exp.chart!==chart)return;exp.chartAi={status:'done',text:data.answer,error:''};
  }catch(error){if(exp.chart!==chart)return;exp.chartAi={status:'error',text:'',error:error.message||'暂时无法连接 Qwen'}}
  if(state.screen==='experience'&&exp.mode==='chart')renderChart();
}
function contactHint(contact){
  const theme={太阳:'表达与方向',月亮:'情绪需要',水星:'沟通方式',金星:'亲近与欣赏',火星:'行动节奏'};
  const relation=['合相','六合','拱相'].includes(contact.name)?'容易彼此呼应，可以谈谈怎样把这份默契用在现实里。':'可能带来不同的节奏，适合把期待和边界说清楚。';
  return `${theme[contact.first]}与${theme[contact.second]}相遇：${relation}`;
}
function renderSynastry(){
  const result=exp.synastry;
  const body=result?`<div class="synastry-overview"><div><strong>第一位</strong><span>太阳 ${result.first.planets[0].sign} · 月亮 ${result.first.planets[1].sign} · 上升 ${result.first.rising.sign}</span></div><span class="synastry-link">☍</span><div><strong>第二位</strong><span>太阳 ${result.second.planets[0].sign} · 月亮 ${result.second.planets[1].sign} · 上升 ${result.second.rising.sign}</span></div></div><div class="synastry-charts">${chartWheel(result.first,"第一位")}${chartWheel(result.second,"第二位")}</div><div class="synastry-content"><h3>两张星盘的主要联系</h3><p>相位描述天体之间的角度，是讨论相处模式的线索，不代表关系好坏或必然结果。</p><div class="contact-grid">${result.contacts.map(c=>`<article><span>${c.name}</span><strong>第一位${c.first} × 第二位${c.second}</strong><small>角度接近 ${c.angle}° · 容许度 ${c.orb}°</small><p>${contactHint(c)}</p></article>`).join('')||'<p>在当前容许度内没有筛出个人行星间的主要联系。</p>'}</div><div class="daily-cue"><span>可以一起讨论</span><p>你们在哪些事情上容易理解彼此？遇到不同节奏时，怎样说清需要和边界？</p></div></div><div class="experience-actions"><button type="button" class="outline-btn" data-exp-action="synastry-reset">重新输入两人的资料</button></div>`:`<form class="experience-form" data-exp-form="synastry">${birthFields('a','第一位的出生资料')}${birthFields('b','第二位的出生资料')}<button class="primary-btn" type="submit">查看双人合盘 →</button><p class="form-status" data-exp-status role="status"></p></form>`;
  app.innerHTML=shell('双人合盘','SYNASTRY','用两张星盘讨论相处方式与差异，给关系一个新的观察角度。',body);
}

const NUMBER_MEANINGS = {
  1:['开创者','你重视自主与行动。尝试带头时，也给他人留下参与空间。','从一个真正属于你的选择开始。'],
  2:['协调者','你擅长觉察关系里的细微变化。表达自己的立场同样重要。','在照顾别人前，先说出自己的需要。'],
  3:['表达者','想法与创造力希望流动。挑一个出口，让灵感被看见。','完成一件能分享的小作品。'],
  4:['建造者','稳定与秩序是你的资源。适时调整规则，能让结构更有弹性。','整理一项长期计划的下一步。'],
  5:['探索者','变化带来活力。给探索设定一个可落地的边界，选择会更自由。','为新尝试设一个小范围。'],
  6:['照料者','你在意责任与和谐。关怀自己，才能让关怀持续。','把一部分照顾留给自己。'],
  7:['思考者','你愿意深入理解。把洞察带回现实，可以减少独自承担的压力。','把一个想法讲给可信的人听。'],
  8:['实践者','你关注成果和影响力。让目标与内在价值一致，努力会更稳。','检查眼前目标为何重要。'],
  9:['理想者','你能看见更广的图景。给理想安排具体的一步，也允许有边界。','选一件今天就能做的善意小事。'],
  11:['启发者','敏锐与灵感让你看到可能性。用清晰的节奏承接这些感受。','记录一个灵感并写出第一步。'],
  22:['实践理想者','宏大的想法需要稳定结构。先把理想放进现实的日程。','把愿景拆成可验证的小任务。'],
  33:['温柔引导者','你容易承担照料与支持。让付出建立在自己的余力之上。','明确一处自己也需要被支持的地方。']
};
function digitSum(value){return String(value).replace(/\D/g,'').split('').reduce((sum,digit)=>sum+Number(digit),0)}
function reduceNumber(value,master=true){while(value>9 && !(master&&[11,22,33].includes(value)))value=digitSum(value);return value}
function calculateNumber(date){
  if(!/^\d{4}-\d{2}-\d{2}$/.test(date))throw new Error('请选择出生日期');
  const [year,month,day]=date.split('-').map(Number),valid=new Date(Date.UTC(year,month-1,day));
  if(valid.getUTCFullYear()!==year||valid.getUTCMonth()!==month-1||valid.getUTCDate()!==day)throw new Error('出生日期无效');
  const life=reduceNumber(digitSum(date));
  const personalYear=reduceNumber(digitSum(`${month}${day}${new Date().getFullYear()}`),false);
  return {date,life,personalYear};
}
function renderNumerology(){const result=exp.number;const meaning=result&&NUMBER_MEANINGS[result.life];const body=result?`<div class="number-result"><div class="number-orb"><small>LIFE PATH</small><strong>${result.life}</strong><span>${meaning[0]}</span></div><div class="number-copy"><span class="eyebrow">你的生命灵数</span><h3>${meaning[0]}</h3><p>${meaning[1]}</p><div class="oracle-action"><strong>试着这样做</strong>${meaning[2]}</div><p class="number-year">${new Date().getFullYear()} 个人年数字：<strong>${result.personalYear}</strong> · 可把它当作这一年的自我观察主题。</p></div></div><div class="experience-actions"><button class="outline-btn" data-exp-action="number-reset">重新计算</button></div>`:`<form class="experience-form compact-form" data-exp-form="number"><label>出生日期<input name="birth-date" type="date" required></label><p class="form-help">常见生命灵数算法：把出生年月日的数字相加并化简；11、22、33 保留为主数字。个人年由当年年份与生日月日计算。</p><button class="primary-btn" type="submit">计算生命灵数 →</button><p class="form-status" data-exp-status role="status"></p></form>`;app.innerHTML=shell('数字命理','NUMEROLOGY','从生日数字读一个象征性主题，作为认识自己的另一个入口。',body)}
function renderOracle(){const card=exp.oracle===null?null:ORACLE_CARDS[exp.oracle];const body=`<div class="oracle-mode"><div class="oracle-question"><label for="oracle-question">写下此刻想关注的事 <small>（选填）</small></label><textarea id="oracle-question" maxlength="160" placeholder="例如：今天我最需要留意什么？">${escapeHtml(exp.oracleQuestion)}</textarea><button class="primary-btn" data-exp-action="oracle-draw">${card?'再抽一张神谕卡':'抽取神谕卡'} →</button></div>${card?`<div class="daily-oracle-body">${oracleMarkup(card,'神谕卡')}</div>${exp.oracleQuestion?`<p class="question-echo">你的问题：“${escapeHtml(exp.oracleQuestion)}”——把牌面当作一个思考角度，再决定对你有用的部分。</p>`:''}`:`<div class="oracle-face oracle-back"><span class="oracle-face-top">LISTEN TO YOURSELF</span><span class="oracle-face-symbol">☾</span><span class="oracle-face-name">静心 · 抽卡</span></div>`}</div>`;app.innerHTML=shell('神谕卡','ORACLE CARDS',`从 ${ORACLE_CARDS.length} 张原创神谕牌中抽取一张，看看此刻的提醒。`,body)}
function renderBook(){
  const open=exp.book!==null;
  const answer=open?BOOK_ANSWERS[exp.book]:'';
  const body=`<div class="book-experience">
    <div class="book-prompt"><label for="book-question">心里默念，或写下你的问题 <small>（选填）</small></label><textarea id="book-question" maxlength="160" placeholder="不写也可以，直接翻开这本书。">${escapeHtml(exp.bookQuestion)}</textarea></div>
    <div class="book-stage ${open?'is-open':'is-closed'}" id="book-stage">
      <div class="book-object">
        <div class="book-spread" aria-hidden="${open?'false':'true'}">
          <div class="book-page book-page-left"><span class="book-page-kicker">MOON VEIL ORACLE</span><div class="book-page-moon">☾</div><span class="book-page-footer">随机的一页 · 此刻的提醒</span></div>
          <div class="book-page book-page-right"><span class="book-page-kicker">THE BOOK OF ANSWERS</span><div class="book-answer" role="status" aria-live="polite"><span>${open?`第 ${String(exp.book+1).padStart(3,'0')} 页`:'轻轻翻开'}</span><blockquote>${escapeHtml(answer)}</blockquote><small>${exp.bookQuestion?`写给“${escapeHtml(exp.bookQuestion)}”的一句提示`:'给此刻的一句提示'}</small></div><span class="book-page-footer">月隐先知 · 原创答案</span></div>
          <div class="book-turn-leaf leaf-one" aria-hidden="true"></div><div class="book-turn-leaf leaf-two" aria-hidden="true"></div><div class="book-turn-leaf leaf-three" aria-hidden="true"></div>
        </div>
        <button class="book-cover" type="button" data-exp-action="book-open" aria-label="点击书封，随机翻开答案之书"><span>MOON VEIL<br>ANSWERS</span><strong>✧</strong><small>月隐先知 · 原创</small></button>
      </div>
    </div>
    <div class="book-controls"><button class="primary-btn" type="button" data-exp-action="book-open">${open?'再翻一页':'翻开答案之书'} →</button>${open?'<button class="outline-btn" type="button" data-exp-action="book-close">合上书</button>':''}</div>
  </div>`;
  app.innerHTML=shell('答案之书','THE BOOK OF ANSWERS',`从本站原创的 ${BOOK_ANSWERS.length} 页里随机翻开一页。你可以写问题，也可以直接翻书。`,body);
}
function turnBook(){
  if(exp.bookTurning)return;
  exp.bookQuestion=document.getElementById('book-question')?.value.trim()||'';
  let next=randomInt(BOOK_ANSWERS.length);
  if(next===exp.book)next=(next+1)%BOOK_ANSWERS.length;
  exp.bookTurning=true;
  const stage=document.getElementById('book-stage');
  stage?.classList.remove('is-closed','is-open');
  stage?.classList.add('is-turning');
  document.querySelectorAll('.book-controls button,.book-cover').forEach(button=>button.disabled=true);
  const reduced=window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  setTimeout(()=>{
    exp.book=next;exp.bookTurning=false;
    if(exp.mode==='book'&&state.screen==='experience')renderBook();
  },reduced?0:1650);
}

const TRIGRAMS=[['乾','111','天'],['兑','110','泽'],['离','101','火'],['震','100','雷'],['巽','011','风'],['坎','010','水'],['艮','001','山'],['坤','000','地']];
const HEX_MATRIX=[
  ['乾|主动开创，也要守住分寸。','履|谨慎前行，留意礼与边界。','同人|寻找志同道合的人，坦诚协作。','无妄|回到真实动机，不靠侥幸推进。','姤|留意突然而来的相遇与影响。','讼|争执中先辨清事实，再决定是否继续。','遁|适时退让，为长远留出空间。','否|沟通受阻时，先稳住自己。'],
  ['夬|该作决定时，保持清楚与克制。','兑|坦诚交流，分享真实的喜悦。','革|改变旧方式前，先看时机是否成熟。','随|顺应变化，也别丢失自己的方向。','大过|承担过重时，先加固支撑。','困|资源有限时，守住最重要的事。','咸|互相感应，尊重双方的回应。','萃|聚集力量，把共同目标说清楚。'],
  ['大有|已有收获时，保持谦逊与分享。','睽|差异不必立即消除，先找到可合作之处。','离|让事实与内心都更明亮。','噬嗑|面对障碍，清楚而公正地处理。','鼎|把旧材料转化为新的秩序。','未济|尚未完成，越接近终点越要细心。','旅|在陌生环境里，轻装并守礼。','晋|进展出现时，稳稳接住机会。'],
  ['大壮|力量增长，也需要节制。','归妹|关系中的角色与期待值得厘清。','丰|丰盛之时，也要留意变化。','震|突发之事过后，重新找回镇定。','恒|重要的事需要长期而稳定的投入。','解|压力松动时，及时处理遗留问题。','小过|适合谨慎处理小事，避免冒进。','豫|热情可贵，先做好准备。'],
  ['小畜|先积蓄资源，时机成熟再推进。','中孚|以真诚建立信任，言行一致。','家人|关系需要清晰的责任与照顾。','益|让资源流向真正需要之处。','巽|用柔和而持续的方式进入局面。','涣|分散时，重新凝聚共同目标。','渐|循序渐进，给成长足够时间。','观|退一步观察，才能看清全局。'],
  ['需|等待时继续准备，不必焦躁。','节|设定适度的边界与节奏。','既济|事情已成，也要留意后续维护。','屯|起步艰难，先建立可靠的基础。','井|回到长期滋养自己的资源。','坎|困难反复时，稳住判断与行动。','蹇|遇阻时寻找帮助，调整路径。','比|与可信的人建立相互支持。'],
  ['大畜|积累能力，等待合适的出口。','损|有意识地减少，换取更重要的东西。','贲|形式与内容都要照顾，别只顾外表。','颐|留意你如何养护身心与言语。','蛊|旧问题需要修复，而非回避。','蒙|保持学习姿态，向可靠经验求教。','艮|该停的时候停，先看清界限。','剥|旧结构正在松动，先保护核心。'],
  ['泰|顺畅之时，维持开放和交流。','临|走近事务，带着责任和关怀。','明夷|光亮暂受遮蔽，保护重要的信念。','复|转折之后，重新回到起点。','升|稳步向上，依靠持续的积累。','师|众人协作时，需要清楚的目标。','谦|保有实力，也保有谦逊。','坤|承载与配合，让事物有生长的土壤。']
].map(row=>row.map(item=>{const [name,hint]=item.split('|');return {name,hint}}));
const YIJING_BY_NAME=new Map(YIJING_TEXT.map(item=>[item.name,item]));
if(YIJING_BY_NAME.size!==64||HEX_MATRIX.some(row=>row.some(item=>!YIJING_BY_NAME.has(item.name))))throw new Error('《易經》原文与六十四卦映射不完整');
function hexagram(lines,changed=false){
  const bits=lines.map(value=>changed?(value===6?1:value===9?0:value%2):(value%2));
  const lower=bits.slice(0,3).join(''),upper=bits.slice(3).join('');
  const upperIndex=TRIGRAMS.findIndex(item=>item[1]===upper),lowerIndex=TRIGRAMS.findIndex(item=>item[1]===lower);
  const data=HEX_MATRIX[upperIndex][lowerIndex];
  return {data,source:YIJING_BY_NAME.get(data.name),upper:TRIGRAMS[upperIndex],lower:TRIGRAMS[lowerIndex],bits};
}
function castHexagram(lines=Array.from({length:6},()=>Array.from({length:3},()=>2+randomInt(2)).reduce((a,b)=>a+b,0))){return {lines,primary:hexagram(lines),changed:hexagram(lines,true)}}
function hexLines(lines,changed=false){return `<div class="hex-lines" role="img" aria-label="六爻卦象，从下向上排列">${lines.map((value,index)=>({value,index})).reverse().map(({value,index})=>{const yang=changed?(value===6?true:value===9?false:value%2===1):value%2===1;return `<div class="hex-line"><span>${index+1} 爻</span><div class="hex-bars ${yang?'yang':'yin'}"><i></i>${yang?'':'<i></i>'}</div><small>${[6,9].includes(value)?(changed?'变后':'动爻'):''}</small></div>`}).join('')}</div>`}
function hexReading(result){
  const moving=result.lines.flatMap((value,index)=>[6,9].includes(value)?[{value,index,text:result.primary.source.lines[index]}]:[]);
  const special=moving.length===6&&result.lines.every(value=>value===9||value===6)?result.primary.source.special:'';
  return `<section class="hex-reading"><span class="eyebrow">依据《周易》古经的阅读顺序</span><h3>先看本卦，再看动爻</h3><p class="hex-reading-intro">卦辞描述整体局面；${moving.length?`第 ${moving.map(item=>item.index+1).join('、')} 爻发生变化，阅读对应爻辞，再参考之卦的卦辞。多爻同时变化时，各家取舍不同，本页同时列出所有动爻供你对照。`:'本次没有动爻，重点阅读本卦卦辞。'}</p><div class="hex-source-block"><strong>本卦 · ${escapeHtml(result.primary.source.originalName)} · 卦辞</strong><blockquote>${escapeHtml(result.primary.source.judgment)}</blockquote><p>白话观察：${escapeHtml(result.primary.data.hint)}</p></div>${moving.length?`<div class="hex-source-block"><strong>动爻 · 从下往上</strong><ol>${moving.map(item=>`<li><span>第 ${item.index+1} 爻 · ${item.value===6?'老阴':'老阳'}</span>${escapeHtml(item.text)}</li>`).join('')}</ol>${special?`<p class="hex-special">全爻皆动 · ${escapeHtml(special)}</p>`:''}</div><div class="hex-source-block"><strong>之卦 · ${escapeHtml(result.changed.source.originalName)} · 卦辞</strong><blockquote>${escapeHtml(result.changed.source.judgment)}</blockquote><p>白话观察：${escapeHtml(result.changed.data.hint)}</p></div>`:''}</section>`;
}
async function loadHexAi(){
  const result=exp.hex;if(!result)return;
  exp.hexAi={status:'loading',text:'',error:''};if(state.screen==='experience'&&exp.mode==='iching')renderIChing();
  try{
    const response=await fetch('/api/hex-interpretation',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({lines:result.lines,question:exp.hexQuestion})});
    const data=await response.json();if(!response.ok||!data.answer)throw new Error(data.error||'白话解读暂时不可用');
    if(exp.hex!==result)return;exp.hexAi={status:'done',text:data.answer,error:''};
  }catch(error){if(exp.hex!==result)return;exp.hexAi={status:'error',text:'',error:error.message||'暂时无法连接 Qwen'}}
  if(state.screen==='experience'&&exp.mode==='iching')renderIChing();
}
function renderIChing(){
  const result=exp.hex;
  const throws=exp.hexThrows;
  const last=throws.at(-1)?.coins||[null,null,null];
  const coinStage=`<div class="coin-stage" aria-label="三枚铜钱">${last.map((value,index)=>`<span class="cast-coin ${value===null?'unturned':''}" aria-label="第 ${index+1} 枚，${value===null?'待掷':value===3?'正面，记 3':'反面，记 2'}"><i>${value===3?'正':value===2?'反':'☯'}</i></span>`).join('')}</div>`;
  const progress=`<div class="cast-progress" aria-live="polite">${Array.from({length:6},(_,index)=>`<div class="cast-step ${throws[index]?'complete':''}"><span>${index+1}</span><strong>${throws[index]?.total||'—'}</strong><small>${throws[index]?([6,9].includes(throws[index].total)?'动爻':'静爻'):'待掷'}</small></div>`).join('')}</div>`;
  const body=`<div class="iching-intro"><div class="trigram-mark">☰<br>☷</div><div><h3>亲手掷六次，成一卦</h3><p>每次点击掷出三枚铜钱：正面记 3、反面记 2。从初爻向上记录六次；6、9 为动爻，变化后形成之卦。</p><label for="hex-question">你想观察的问题 <small>（选填）</small></label><textarea id="hex-question" maxlength="160" placeholder="例如：我该怎样面对这个新机会？">${escapeHtml(exp.hexQuestion)}</textarea></div></div><section class="coin-ritual"><span class="eyebrow">THREE COINS · SIX LINES</span><h3>${result?'六爻已成':`第 ${throws.length+1} 次 · ${['初','二','三','四','五','上'][throws.length]}爻`}</h3>${coinStage}<p class="coin-rule">正面 = 3　·　反面 = 2　·　6、9 为动爻</p><button class="primary-btn" data-exp-action="hex-cast">${result?'重新起卦':`掷出第 ${throws.length+1} 爻`} →</button>${progress}</section>${result?`<div class="hex-result"><div class="hex-panel"><span class="eyebrow">本卦 · ${result.primary.upper[0]}上${result.primary.lower[0]}下</span><h3>${result.primary.data.name}</h3>${hexLines(result.lines)}</div><div class="hex-transition">→<small>${result.lines.filter(value=>[6,9].includes(value)).length} 个动爻</small></div><div class="hex-panel"><span class="eyebrow">${result.lines.some(value=>[6,9].includes(value))?'之卦':'无动爻 · 仍为本卦'}</span><h3>${result.changed.data.name}</h3>${hexLines(result.lines,true)}</div></div>${hexReading(result)}${aiExplanation('卦象白话解读','QWEN · I CHING',exp.hexAi,'hex-ai-refresh','结合当前问题重新解读')}<p class="hex-note">六次结果从下往上：${result.lines.join('、')}。</p>`:''}`;
  app.innerHTML=shell('易经六爻／卦象','THE SIX LINES','用三枚铜钱法模拟起卦，阅读本卦、动爻与之卦。',body);
}

function renderExperience(){switch(exp.mode){case'zodiac':renderZodiac();break;case'chart':renderChart();break;case'synastry':renderSynastry();break;case'numerology':renderNumerology();break;case'oracle':renderOracle();break;case'book':renderBook();break;case'iching':renderIChing();break;default:renderZodiac()}}

document.addEventListener('click',event=>{
  const modeButton=event.target.closest('[data-exp-mode]');if(modeButton){openMode(modeButton.dataset.expMode);return}
  const zodiacButton=event.target.closest('[data-exp-zodiac]');if(zodiacButton){exp.zodiac=Number(zodiacButton.dataset.expZodiac);renderZodiac();return}
  const button=event.target.closest('[data-exp-action]');if(!button)return;
  switch(button.dataset.expAction){
    case'daily':drawDailyOracle();break;
    case'oracle-draw':{
      exp.oracleQuestion=document.getElementById('oracle-question')?.value.trim()||'';
      let next=randomInt(ORACLE_CARDS.length);if(next===exp.oracle)next=(next+1)%ORACLE_CARDS.length;
      exp.oracle=next;renderOracle();break;
    }
    case'book-open':turnBook();break;
    case'book-close':exp.book=null;renderBook();break;
    case'hex-cast':{
      if(exp.hexRolling)break;
      if(exp.hex){exp.hex=null;exp.hexThrows=[];exp.hexQuestion='';exp.hexAi={status:'idle',text:'',error:''};renderIChing();break}
      exp.hexQuestion=document.getElementById('hex-question')?.value.trim()||'';
      const coins=Array.from({length:3},()=>2+randomInt(2));
      exp.hexRolling=true;
      button.disabled=true;
      document.querySelector('.coin-stage')?.classList.add('is-tossing');
      setTimeout(()=>{
        exp.hexThrows.push({coins,total:coins.reduce((sum,value)=>sum+value,0)});
        exp.hexRolling=false;
        if(exp.hexThrows.length===6)exp.hex=castHexagram(exp.hexThrows.map(item=>item.total));
        renderIChing();
        if(exp.hex)void loadHexAi();
      },760);
      break;
    }
    case'hex-ai-refresh':exp.hexQuestion=document.getElementById('hex-question')?.value.trim()||'';void loadHexAi();break;
    case'chart-ai-retry':void loadChartAi();break;
    case'chart-reset':exp.chart=null;exp.chartInput=null;exp.chartAi={status:'idle',text:'',error:''};renderChart();break;
    case'synastry-reset':exp.synastry=null;renderSynastry();break;
    case'number-reset':exp.number=null;renderNumerology();break;
  }
});

document.addEventListener('change',event=>{
  if(event.target.matches('select[name$="-city"]')&&event.target.value==='custom')event.target.closest('fieldset')?.querySelector('details')?.setAttribute('open','');
});

document.addEventListener('submit',async event=>{
  const form=event.target.closest('[data-exp-form]');if(!form)return;
  event.preventDefault();
  const mode=form.dataset.expForm,status=form.querySelector('[data-exp-status]'),submit=form.querySelector('button[type="submit"]');
  try {
    if(mode==='number') {exp.number=calculateNumber(String(new FormData(form).get('birth-date')||''));renderNumerology();return}
    const payload=mode==='chart'?birthFrom(form,'a'):{first:birthFrom(form,'a'),second:birthFrom(form,'b')};
    submit.disabled=true;status.textContent='正在计算天空位置，请稍等……';
    const response=await fetch(mode==='chart'?'/api/chart':'/api/synastry',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
    const data=await response.json();
    if(!response.ok)throw new Error(data.error||'暂时无法计算，请检查出生资料');
    if(state.screen!=='experience'||exp.mode!==mode)return;
    if(mode==='chart'){exp.chart=data;exp.chartInput=payload;exp.chartAi={status:'idle',text:'',error:''};renderChart();void loadChartAi()}else{exp.synastry=data;renderSynastry()}
  } catch(error) {status.textContent=error.message||'资料有误，请检查后重试';submit.disabled=false}
});
