// --- Part One ---
const fs = require('fs');
const path = require('path');

const input = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf8');

const floor = input.split('').reduce((acc, curr) => {
    if (curr === '(') {
        return acc + 1;
    } else if (curr === ')') {
        return acc - 1;
    }
}, 0);

console.log(floor);