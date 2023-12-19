const fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, 'input.txt'); // Update with your input file path

const dirs = { "U": [-1, 0], "D": [1, 0], "L": [0, -1], "R": [0, 1] };

let b = 0;
let points = [[0, 0]];

const inputLines = fs.readFileSync(inputFile, 'utf-8').split('\n');

for (const line of inputLines) {
    const [d, n] = line.split(' ');
    const [dr, dc] = dirs[d];
    const num = parseInt(n);

    b += num;
    const [r, c] = points[points.length - 1];
    points.push([r + dr * num, c + dc * num]);
}

const A = Math.abs(points.reduce((acc, _, i, arr) => {
    const [r, c] = arr[i];
    const [rPrev, cPrev] = arr[(i - 1 + arr.length) % arr.length];
    const [rNext, cNext] = arr[(i + 1) % arr.length];
    return acc + r * (cPrev - cNext);
}, 0)) / 2;

const result = A - b / 2 + 1;
console.log(result + b);
