const fs = require('fs');
const input = fs.readFileSync('./day_05/input.txt', 'utf-8').split('\n\n');

let inp = input[0].split(':')[1].split(' ').map(Number);
inp.shift();

const blocks = input.slice(1);

let seeds = [];

for (let i = 0; i < inp.length; i += 2) {
    seeds.push([inp[i], inp[i] + inp[i + 1]]);
}

for (let block of blocks) {
    let ranges = [];
    for (let line of block.split('\n').slice(1)) {
        ranges.push(line.split(' ').map(Number));
    }

    let newSeeds = [];
    while (seeds.length > 0) {
        let [s, e] = seeds.pop();
        let flag = false;
        for (let [a, b, c] of ranges) {
            let os = Math.max(s, b);
            let oe = Math.min(e, b + c);
            if (os < oe) {
                newSeeds.push([os - b + a, oe - b + a]);
                if (os > s) {
                    seeds.push([s, os]);
                }
                if (e > oe) {
                    seeds.push([oe, e]);
                }
                flag = true;
                break;
            }
        }
        if (!flag) {
            newSeeds.push([s, e]);
        }
    }
    seeds = newSeeds;
}

console.log(Math.min(...seeds.map(x => x[0])));