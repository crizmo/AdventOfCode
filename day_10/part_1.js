const fs = require('fs');
const input = fs.readFileSync('./day_10/input.txt').toString().split('\n');

let sr, sc;
for (let r = 0; r < input.length; r++) {
    for (let c = 0; c < input[r].length; c++) {
        if (input[r][c] === 'S') {
            sr = r;
            sc = c;
            break;
        }
    }
}

const loop = new Set();
const q = [[sr, sc]];

while (q.length) {
    const [r, c] = q.shift();
    const ch = input[r][c];

    if (r > 0 && 'S|JL'.includes(ch) && '|7F'.includes(input[r - 1][c]) && !loop.has(`${r - 1},${c}`)) {
        loop.add(`${r - 1},${c}`);
        q.push([r - 1, c]);
    }

    if (r < input.length - 1 && 'S|7F'.includes(ch) && '|JL'.includes(input[r + 1][c]) && !loop.has(`${r + 1},${c}`)) {
        loop.add(`${r + 1},${c}`);
        q.push([r + 1, c]);
    }

    if (c > 0 && 'S-J7'.includes(ch) && '-LF'.includes(input[r][c - 1]) && !loop.has(`${r},${c - 1}`)) {
        loop.add(`${r},${c - 1}`);
        q.push([r, c - 1]);
    }

    if (c < input[r].length - 1 && 'S-LF'.includes(ch) && '-J7'.includes(input[r][c + 1]) && !loop.has(`${r},${c + 1}`)) {
        loop.add(`${r},${c + 1}`);
        q.push([r, c + 1]);
    }
}

console.log(loop.size / 2);

// My initial solution was too slow and basically bad. This is a much better solution inspired by a youtube video.