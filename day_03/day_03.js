const fs = require('fs');

const data = fs.readFileSync('./day_03/input.txt', 'utf8').trim();
const lines = data.split('\n');
const G = lines.map(line => line.split('')); // grid
const R = G.length; // rows
const C = G[0].length; // columns

let p1 = 0;
const nums = new Map();

for (let r = 0; r < R; r++) {
  const gears = new Set();
  let n = 0;
  let has_part = false;

  for (let c = 0; c <= C; c++) {
    if (c < C && /\d/.test(G[r][c])) {
      n = n * 10 + parseInt(G[r][c], 10);

      [-1, 0, 1].forEach(rr => {
        [-1, 0, 1].forEach(cc => {
          const newRow = r + rr;
          const newCol = c + cc;

          if (0 <= newRow && newRow < R && 0 <= newCol && newCol < C) {
            const ch = G[newRow][newCol];
            if (!/\d/.test(ch) && ch !== '.') {
              has_part = true;
            }
            if (ch === '*') {
              gears.add([newRow, newCol].toString());
            }
          }
        });
      });
    } else if (n > 0) {
      gears.forEach(gear => {
        if (!nums.has(gear)) {
          nums.set(gear, []);
        }
        nums.get(gear).push(n);
      });

      if (has_part) {
        p1 += n;
      }

      n = 0;
      has_part = false;
      gears.clear();
    }
  }
}

console.log("Part 1:", p1);

let p2 = 0;
for (const [key, value] of nums.entries()) {
  if (value.length === 2) {
    p2 += value[0] * value[1];
  }
}
console.log("Part 2:", p2);
