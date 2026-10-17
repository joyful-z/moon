import assert from 'node:assert/strict';
import {calculateChart,calculateSynastry} from '../chart.mjs';

const shanghai={date:'1995-06-15',time:'12:00',timeZone:'Asia/Shanghai',latitude:31.23,longitude:121.47};
const chart=calculateChart(shanghai);
assert.equal(chart.utc,'1995-06-15T04:00:00.000Z');
assert.equal(chart.planets.length,10);
assert.equal(chart.planets[0].sign,'双子座');
assert.equal(chart.rising.sign,'处女座');
assert(chart.planets.every(planet=>planet.longitude>=0&&planet.longitude<360&&planet.house>=1&&planet.house<=12));

const later=calculateChart({...shanghai,time:'18:00'});
assert.notEqual(later.rising.sign,chart.rising.sign);

const newYork=calculateChart({date:'2024-07-01',time:'12:00',timeZone:'America/New_York',latitude:40.71,longitude:-74.01});
assert.equal(newYork.utc,'2024-07-01T16:00:00.000Z');

const pair=calculateSynastry(shanghai,{date:'1993-11-20',time:'08:30',timeZone:'Asia/Shanghai',latitude:39.9,longitude:116.4});
assert.equal(pair.first.planets.length,10);
assert.equal(pair.second.planets.length,10);
assert(pair.contacts.every(contact=>contact.orb>=0));

assert.throws(()=>calculateChart({...shanghai,date:'2024-02-30'}));
assert.throws(()=>calculateChart({...shanghai,timeZone:'Invalid/Timezone'}));
console.log('OK: birth time zones, planets, rising sign, synastry, and invalid input.');
