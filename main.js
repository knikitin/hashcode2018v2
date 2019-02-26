const fs = require('fs');

const input = fs.readFileSync(process.argv[2], 'utf8').trim().split(/\n/);
const [R, C, F, N, B, T] = input[0].split(/\s/).map(Number);
const rides = input.slice(1).map((l,i) => {
  const [a, b, x, y, s, f] = l.split(/\s/).map(Number);
  l1 = Math.abs(a - x);
  l2 = Math.abs(b - y);
  lf = l1 + l2;
  return {a, b, x, y, s, f, i, l1, l2, lf};
})

const vs = []
for (let i = 0; i < F; i++) {
  vs.push({x: 0, y: 0, r: [], t: 0})
}

rides.sort((a,b) => a.f - b.f);

rides.forEach(r => {
  co = [];
  for (const v of vs) {
    ld1 = Math.abs(r.a - v.x);
    ld2 = Math.abs(r.b - v.y);
    ldf = ld1 + ld2;
    lf = r.lf + ldf;
    tabr = v.t + ldf;
    w = tabr + 1 >= r.s ? 0 : r.s - tabr;
    tf = v.t + lf + w;
    tb = tf;
    if (tf < r.f) {
      co.push({tb, tf, r, v})
    }
  }
  if (co.length) {
    co.sort((a,b) => a.tb - b.tb)
    co[0].r.v = co[0].v;
    co[0].v.r.push(co[0].r);
    co[0].v.t = co[0].tf;
    co[0].v.x = co[0].r.x; 
    co[0].v.y = co[0].r.y; 
  }
});
  
vs.forEach(v => {
  s = v.r.length;
  v.r.forEach(r => s = s + " " + r.i);
  console.log(s);
})

// https://github.com/sbrodehl/Hashcode2k18/blob/master/Online%20Qualification%20Round/online_qualification_round_2018.pdf