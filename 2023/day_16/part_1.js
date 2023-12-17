const fs = require('fs');
const path = require('path');
const grid = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8').split('\n').map(line => line.split(''));

const a = [{ r: 0, c: -1, dr: 0, dc: 1 }];
const seen = new Set();
const q = [...a];

while (q.length > 0) {
    const { r, c, dr, dc } = q.shift();

    const newR = r + dr;
    const newC = c + dc;

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

console.log(coords.size);
