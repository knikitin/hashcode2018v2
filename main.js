const fs = require('fs');

const input = fs.readFileSync(process.argv[2], 'utf8').trim().split(/\n/);
const [R, C, F, N, B, T] = input[0].split(/\s/).map(Number);

console.log(input[0]);