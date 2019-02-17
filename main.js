const fs = require('fs');

const input = fs.readFileSync(process.argv[2], 'utf8').trim().split(/\n/);
const [R, C, F, N, B, T] = input[0].split(/\s/).map(Number);
const rides = input.slice(1).map(l => {
  const [a, b, x, y, s, f] = l.split(/\s/).map(Number);
  return {a, b, x, y, s, f};
})

const v = []
for (let i = 0; i < F; i++) {
  v.push({x: 0, y: 0, r: [], t: 0})
}
// sort rides by start time
rides.sort((a,b) => a.s - b.s);
