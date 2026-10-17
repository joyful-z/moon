import astronomy from './vendor/astronomy-engine/astronomy.js';

const SIGNS = ['白羊座','金牛座','双子座','巨蟹座','狮子座','处女座','天秤座','天蝎座','射手座','摩羯座','水瓶座','双鱼座'];
const BODIES = [
  ['Sun','太阳'],['Moon','月亮'],['Mercury','水星'],['Venus','金星'],['Mars','火星'],
  ['Jupiter','木星'],['Saturn','土星'],['Uranus','天王星'],['Neptune','海王星'],['Pluto','冥王星']
];
const ASPECTS = [[0,'合相',8],[60,'六合',5],[90,'刑相',6],[120,'拱相',6],[180,'冲相',7]];
const norm = value => (value % 360 + 360) % 360;
const signOf = longitude => SIGNS[Math.floor(norm(longitude)/30)];
const round = value => Math.round(value * 100) / 100;

function localDateToUtc(dateText,timeText,timeZone) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateText) || !/^\d{2}:\d{2}$/.test(timeText)) throw new Error('请填写完整的出生日期和时间');
  const [year,month,day] = dateText.split('-').map(Number);
  const [hour,minute] = timeText.split(':').map(Number);
  if (year < 1900 || year > 2100 || month < 1 || month > 12 || day < 1 || day > 31 || hour > 23 || minute > 59) throw new Error('出生日期或时间超出支持范围（1900—2100）');
  const check = new Date(Date.UTC(year,month-1,day,hour,minute));
  if (check.getUTCFullYear()!==year || check.getUTCMonth()!==month-1 || check.getUTCDate()!==day) throw new Error('出生日期无效');
  let formatter;
  try {formatter = new Intl.DateTimeFormat('en-US',{timeZone,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'});} catch {throw new Error('时区名称无效，请使用如 Asia/Shanghai 的格式');}
  const wanted = Date.UTC(year,month-1,day,hour,minute);
  let guess = wanted;
  for(let i=0;i<5;i++) {
    const parts = Object.fromEntries(formatter.formatToParts(new Date(guess)).filter(p=>p.type!=='literal').map(p=>[p.type,Number(p.value)]));
    const actual = Date.UTC(parts.year,parts.month-1,parts.day,parts.hour,parts.minute);
    const delta = wanted-actual;
    guess += delta;
    if(delta===0) break;
  }
  const result = new Date(guess);
  const parts = Object.fromEntries(formatter.formatToParts(result).filter(p=>p.type!=='literal').map(p=>[p.type,Number(p.value)]));
  if(Date.UTC(parts.year,parts.month-1,parts.day,parts.hour,parts.minute)!==wanted) throw new Error('这个当地时间可能处于夏令时跳时，请核对出生时间');
  return result;
}

function ascendant(date,latitude,longitude) {
  // The rising ecliptic point is the eastern solution of altitude = 0.
  const rad = Math.PI/180;
  const phi = latitude*rad;
  const theta = norm(astronomy.SiderealTime(date)*15+longitude)*rad;
  const t = (date.getTime()-Date.UTC(2000,0,1,12))/(36525*86400000);
  const epsilon = (23.43929111-0.013004167*t)*rad;
  const a = Math.cos(phi)*Math.cos(theta);
  const b = Math.cos(phi)*Math.sin(theta)*Math.cos(epsilon)+Math.sin(phi)*Math.sin(epsilon);
  let lambda = norm(Math.atan2(-a,b)/rad);
  const east = angle => -Math.sin(theta)*Math.cos(angle*rad)+Math.cos(theta)*Math.cos(epsilon)*Math.sin(angle*rad);
  if(east(lambda)<0) lambda=norm(lambda+180);
  return lambda;
}

function angleDistance(first,second) {
  const d=Math.abs(norm(first)-norm(second));
  return Math.min(d,360-d);
}

function aspectOf(first,second) {
  const distance=angleDistance(first,second);
  for(const [angle,name,orb] of ASPECTS) if(Math.abs(distance-angle)<=orb) return {name,angle,orb:round(Math.abs(distance-angle))};
  return null;
}

export function calculateChart(input) {
  if(!input || typeof input!=='object') throw new Error('请填写出生资料');
  const {date,time,timeZone} = input;
  const latitude=Number(input.latitude),longitude=Number(input.longitude);
  if(!Number.isFinite(latitude)||!Number.isFinite(longitude)||Math.abs(latitude)>66||Math.abs(longitude)>180) throw new Error('经纬度无效；本版本支持南北纬 66° 以内的地点');
  if(typeof timeZone!=='string'||timeZone.length>60) throw new Error('时区无效');
  const instant=localDateToUtc(date,time,timeZone);
  const rising=ascendant(instant,latitude,longitude);
  const risingIndex=Math.floor(rising/30);
  const planets=BODIES.map(([body,name])=>{
    const point=astronomy.Ecliptic(astronomy.GeoVector(body,instant,true));
    const position=norm(point.elon);
    const signIndex=Math.floor(position/30);
    return {key:body,name,longitude:round(position),sign:SIGNS[signIndex],degree:round(position%30),house:(signIndex-risingIndex+12)%12+1};
  });
  const aspects=[];
  for(let i=0;i<planets.length;i++) for(let j=i+1;j<planets.length;j++) {
    const aspect=aspectOf(planets[i].longitude,planets[j].longitude);
    if(aspect) aspects.push({first:planets[i].name,second:planets[j].name,...aspect});
  }
  aspects.sort((a,b)=>a.orb-b.orb);
  return {date,time,timeZone,latitude,longitude,utc:instant.toISOString(),rising:{longitude:round(rising),sign:SIGNS[risingIndex],degree:round(rising%30)},planets,aspects:aspects.slice(0,12),houseSystem:'整宫制'};
}

export function calculateSynastry(firstInput,secondInput) {
  const first=calculateChart(firstInput),second=calculateChart(secondInput);
  const wanted=new Set(['Sun','Moon','Mercury','Venus','Mars']);
  const contacts=[];
  for(const a of first.planets.filter(p=>wanted.has(p.key))) for(const b of second.planets.filter(p=>wanted.has(p.key))) {
    const aspect=aspectOf(a.longitude,b.longitude);
    if(aspect) contacts.push({first:a.name,second:b.name,...aspect});
  }
  contacts.sort((a,b)=>a.orb-b.orb);
  return {first,second,contacts:contacts.slice(0,10)};
}

export {SIGNS};
