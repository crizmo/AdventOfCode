// Part 1
const fs = require('fs');
const input = fs.readFileSync('./day_05/input.txt', 'utf-8').split('\n\n');

let seeds = input[0].split(':')[1].split(' ').map(Number);
seeds.shift();
// console.log(seeds);

const blocks = input.slice(1);
// console.log(blocks);

for (let block of blocks) {
    let ranges = [];
    for (let line of block.split('\n').slice(1)) {
        ranges.push(line.split(' ').map(Number));
    }
    // console.log(ranges);

    let newSeeds = [];
    var flag = false;
    for (let x of seeds) {
        for (let [a, b, c] of ranges) {
            if (b <= x && x < b + c) {
                newSeeds.push(x - b + a);
                flag = true;
                break;
            }
        }
        if (!flag) {
            newSeeds.push(x);
        }
        flag = false;
    }
    seeds = newSeeds;
    // console.log(seeds);
}

console.log(Math.min(...seeds));
