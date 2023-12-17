const fs = require('fs');
let input = fs.readFileSync('./day_15/base.txt', 'utf8');

let steps = input.split(',');
let result = 0;

function hash(s) {
    let result = 0;
    for (let i = 0; i < s.length; i++) {
        result += s.charCodeAt(i);
        result *= 17;
        result %= 256;
    }
    return result;
}

result = steps.reduce((acc, step) => {
    return acc + hash(step);
}, 0);

console.log(result); // 1320