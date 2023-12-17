// --- Part Two ---
const fs = require('fs');
const path = require('path');

const input = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf8');

let floor = 0;
let position = 0;
let basementPosition = null;

for (let i = 0; i < input.length; i++) {
    position++;
    if (input[i] === '(') {
        floor++;
    } else if (input[i] === ')') {
        floor--;
    }

    if (floor === -1 && !basementPosition) {
        basementPosition = position;
    }
}

console.log(basementPosition);