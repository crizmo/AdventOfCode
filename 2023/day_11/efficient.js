const fs = require('fs');
const grid = fs.readFileSync('day_11/input.txt', 'utf-8').split('\n');

const emptyRows = grid.reduce((emptyRows, row, r) => {
    if (row.split('').every(ch => ch === '.')) {
        emptyRows.push(r);
    }
    return emptyRows;
}, []);

const emptyCols = grid[0].split('').reduce((emptyCols, _, c) => {
    if (grid.every(row => row[c] === '.')) {
        emptyCols.push(c);
    }
    return emptyCols;
}, []);

const points = [];
grid.forEach((row, r) => {
    row.split('').forEach((ch, c) => {
        if (ch === '#') {
            points.push([r, c]);
        }
    });
});

let total = 0;
const scale = 2; // Part 1
// const scale = 1000000; //  Part 2

for (let i = 0; i < points.length; i++) {
    const [r1, c1] = points[i];
    for (let j = 0; j < i; j++) {
        const [r2, c2] = points[j];
        for (let r = Math.min(r1, r2); r < Math.max(r1, r2); r++) {
            total += emptyRows.includes(r) ? scale : 1;
        }
        for (let c = Math.min(c1, c2); c < Math.max(c1, c2); c++) {
            total += emptyCols.includes(c) ? scale : 1;
        }
    }
}

console.log(total);
