const fs = require('fs');

const input = fs.readFileSync(process.argv[2], 'utf8').trim().split(/\n/);
const [R, C, F, N, B, T] = input[0].split(/\s/).map(Number);
const rides = input.slice(1).map((l,i) => {
  const [a, b, x, y, s, f] = l.split(/\s/).map(Number);
  l1 = Math.abs(a - x); // x length of the ride
  l2 = Math.abs(b - y); // y length of the ride
  lf = l1 + l2; // full length
  return {a, b, x, y, s, f, i, l1, l2, lf};
})

const vs = []
for (let i = 0; i < F; i++) { // create vehicles at the start point
  vs.push({x: 0, y: 0, r: [], t: 0})
}

rides.sort((a,b) => a.f - b.f); // sort rides with final time

rides.forEach(r => {
  co = [];
  for (const v of vs) {
    ld1 = Math.abs(r.a - v.x);
    ld2 = Math.abs(r.b - v.y);
    ldf = ld1 + ld2; // length to start point
    lf = r.lf + ldf; // full length of the ride 
    tabr = v.t + ldf; // arrival time on the start point
    w = tabr + 1 >= r.s ? 0 : r.s - tabr; // waiting time
    tf = v.t + lf + w; // arrival time on the finish point
    tb = tf; // estimate variable
    if (tf < r.f) { // the vehicle can finsh the ride in time
      co.push({tb, tf, r, v})
    }
  }
  if (co.length) {
    co.sort((a,b) => a.tb - b.tb) // sort with estimate variable
    // add the ride to the best vehicle
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