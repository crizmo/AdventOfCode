const fs = require('fs');
const path = require('path');
const grid = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8').split('\n')

function calc(r, c, dr, dc) {
    const a = [{ r, c, dr, dc }];
    const seen = new Set();
    const q = [...a];

    while (q.length > 0) {
        const { r, c, dr, dc } = q.shift();

        let newR = r + dr;
        let newC = c + dc;

        if (newR < 0 || newR >= grid.length || newC < 0 || newC >= grid[0].length) {
            continue;
        }

        const ch = grid[newR][newC];

        if (ch === "." || (ch === "-" && dc !== 0) || (ch === "|" && dr !== 0)) {
            const newState = { r: newR, c: newC, dr, dc };
            const stateStr = JSON.stringify(newState);
            if (!seen.has(stateStr)) {
                seen.add(stateStr);
                q.push(newState);
            }
        } else if (ch === "/") {
            const newState = { r: newR, c: newC, dr: -dc, dc: -dr };
            const stateStr = JSON.stringify(newState);
            if (!seen.has(stateStr)) {
                seen.add(stateStr);
                q.push(newState);
            }
        } else if (ch === "\\") {
            const newState = { r: newR, c: newC, dr: dc, dc: dr };
            const stateStr = JSON.stringify(newState);
            if (!seen.has(stateStr)) {
                seen.add(stateStr);
                q.push(newState);
            }
        } else {
            const directions = ch === "|" ? [{ dr: 1, dc: 0 }, { dr: -1, dc: 0 }] : [{ dr: 0, dc: 1 }, { dr: 0, dc: -1 }];

            for (const { dr, dc } of directions) {
                const newState = { r: newR, c: newC, dr, dc };
                const stateStr = JSON.stringify(newState);
                if (!seen.has(stateStr)) {
                    seen.add(stateStr);
                    q.push(newState);
                }
            }
        }
    }

    const coords = new Set(Array.from(seen).map(JSON.parse).map(({ r, c }) => `${r},${c}`));

    return coords.size;
}

let maxVal = 0;

for (let r = 0; r < grid.length; r++) {
    maxVal = Math.max(maxVal, calc(r, -1, 0, 1));
    maxVal = Math.max(maxVal, calc(r, grid[0].length, 0, -1));
}

for (let c = 0; c < grid[0].length; c++) {
    maxVal = Math.max(maxVal, calc(-1, c, 1, 0));
    maxVal = Math.max(maxVal, calc(grid.length, c, -1, 0));
}

console.log(maxVal);
