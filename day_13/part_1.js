function findMirror(grid) {
    for (let r = 1; r < grid.length; r++) {
        const above = grid.slice(0, r).reverse();
        const below = grid.slice(r);

        const aboveTrimmed = above.slice(0, below.length);
        const belowTrimmed = below.slice(0, above.length);

        if (aboveTrimmed.join('\n') === belowTrimmed.join('\n')) {
            console.log('\x1b[32m%s\x1b[0m', 'Match found between row', r, 'and row', r + 1);
            return r;
        }
    }
    return 0;
}

let total = 0;

const input = require('fs').readFileSync('./day_13/base.txt', 'utf-8');
const blocks = input.split('\n\n');

blocks.forEach((block) => {
    const grid = block.split('\n');

    const row = findMirror(grid);
    total += row * 100;

    const transposedGrid = grid[0].split('').map((_, i) => grid.map(row => row[i]));
    const col = findMirror(transposedGrid);
    total += col;
});

console.log(total);
