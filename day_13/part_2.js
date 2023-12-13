function findMirror(grid) {
    for (let r = 1; r < grid.length; r++) {
        const above = grid.slice(0, r).reverse();
        const below = grid.slice(r);

        const mismatchCount = above.reduce((count, row, i) => {
            // Check if row is a string, if so, split it
            const rowArray = Array.isArray(row) ? row : row.split('');

            return count + rowArray.reduce((rowCount, val, j) => {
                // Check if below[i] exists before accessing its elements
                const belowRow = below[i];
                if (belowRow && belowRow[j]) {
                    const belowVal = belowRow[j];
                    return rowCount + (val === belowVal ? 0 : 1);
                } else {
                    return rowCount + 1; // Consider a mismatch if element doesn't exist
                }
            }, 0);
        }, 0);

        if (mismatchCount === 1) {
            return r;
        }
    }
    return 0;
}

let total = 0;

const input = require('fs').readFileSync('./day_13/input.txt', 'utf-8');
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
