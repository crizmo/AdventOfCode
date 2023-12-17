const fs = require('fs');
const path = require('path');

const D = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').trim();
const lines = D.split('\n');
let p1 = 0;
const N = {};

for (let i = 0; i < lines.length; i++) {
    N[i] = 1;
    const [first, rest] = lines[i].split('|');
    const [id_, card] = first.split(':');
    let card_nums = [];
    let rest_nums = [];
    const card_split = card.split(' ');
    const rest_split = rest.split(' ');
    for (let j = 0; j < card_split.length; j++) {
        if (card_split[j].match(/\d+/)) {
            card_nums.push(parseInt(card_split[j], 10));
        }
    }
    for (let j = 0; j < rest_split.length; j++) {
        if (rest_split[j].match(/\d+/)) {
            rest_nums.push(parseInt(rest_split[j], 10));
        }
    }

    const val = [...new Set(card_nums)].filter(x => rest_nums.includes(x)).length;
    if (val > 0) {
        p1 += 2 ** (val - 1);
    }
}
console.log(p1);

// Haven't done part 2 in JS yet
// If you have a solution, please send a PR! :)