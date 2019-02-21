const fs = require('fs');

const source = fs.readFileSync(process.argv[2].slice(0, -4), 'utf8').trim().split(/\n/);
const [R, C, F, N, B, T] = source[0].split(/\s/).map(Number);
const rides = source.slice(1).map((l,i) => {
  const [a, b, x, y, s, f] = l.split(/\s/).map(Number);
  l1 = Math.abs(a - x);
  l2 = Math.abs(b - y);
  lf = l1 + l2;
  return {a, b, x, y, s, f, i, l1, l2, lf};
})

const input = fs.readFileSync(process.argv[2], 'utf8').trim().split(/\n/);
vs = []
input.forEach((l, i) => {
    [c, ...rs ] = l.split(/\s/);
    if (c > N) {
        console.log('error in ' + i + ' line. count of rides > ' + N);
    }
    if (c != rs.length) {
        console.log('error in ' + i + ' line. count of rides');
    }
    rs.forEach(r => {
        if (r > N) {
            console.log('Very big ride in ' + i + 'line. Ride: ' + r);
        }
    })
    vs.push({c, rs, i});
})

// Any ride can be assigned to a vehicle at most once
ar = [];
vs.forEach((v, i) => {
    v.rs.forEach((rn, i) => {
        if (ar.indexOf(rn) > -1) {
            console.log('error in ' + v.i + ' line. double ride: ' + rn);
        } else {
            ar.push(rn)
        }
    })
})

// Score
score = 0;
vs.forEach((v, i) => {
    v.t = 0;
    v.x = 0;
    v.y = 0;
    v.rs.forEach((rn, i) => {
        r = rides[parseInt(rn)];
        ld1 = Math.abs(r.a - v.x);
        ld2 = Math.abs(r.b - v.y);
        ldf = ld1 + ld2;
        lf = r.lf + ldf;
        tabr = v.t + ldf;
        w = tabr >= r.s ? 0 : r.s - tabr;
        inTime = tabr < r.s ? true : false;
        tf = v.t + lf + w;
        if (tf < r.f) {
            score = score + r.lf;
            if (inTime) {
                score = score + B;    
            }
        }

    })
})

console.log('finish: ' + score)
// загрузить исходные данные
// сделать расчет пути машины
// время до маршрута - ожидание - бонус за вовремя - время до финиша - проверка с финишем - начисление бонуса за вовремя
