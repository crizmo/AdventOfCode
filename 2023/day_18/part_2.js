const fs = require('fs');
const path = require('path');

const points = [[0, 0]];
const dirs = {"U": [-1, 0], "D": [1, 0], "L": [0, -1], "R": [0, 1]};

let b = 0;

const lines = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf-8').split('\n');

for (let i = 0; i < lines.length; i++) {
    const [, , x] = lines[i].split(' ');
    const xSubstring = x.slice(2, -1);
    const [dr, dc] = dirs["RDLU"[parseInt(xSubstring[xSubstring.length - 1], 10)]];
    const n = parseInt(xSubstring.slice(0, -1), 16);
    b += n;
    const [r, c] = points[points.length - 1];
    points.push([r + dr * n, c + dc * n]);
}

const A = Math.abs(points.reduce((acc, _, i) => {
    const [r, c] = points[i];
    const [prevR, prevC] = points[(i - 1 + points.length) % points.length];
    const [nextR, nextC] = points[(i + 1) % points.length];
    return acc + r * (prevC - nextC);
}, 0) / 2);

const result = A - Math.floor(b / 2) + 1;

console.log(result + b);