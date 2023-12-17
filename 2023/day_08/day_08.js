// // --- Part One ---

let start = 'AAA';
let end = 'ZZZ';
let left = 'L';
let right = 'R';

let input = 'LLLRRRLLRLRLLRRRLRLRRLRRLRRRLRRLLLRLRRLLRLRRRLRRRLLLRLLLLRLRRLLLRRRLRRRLRLRRRLLLLRLRLLRRLLRRRLRRLRLRRRLRRRLLLRLRRRLRRRLRRLLRRLRRRLLRLRLRLRLRLRRRLRLRRLRLRLRLRRLRRLRLRLRRLLRRLRRRLRRLRRLRRRLRRLRLLRLRLLRRLRRRLRLRLRRLLRRLRRRLRRLRRRLRLRRRLRRLRLRRLRLRRLLLRRLRRLRRRLRLRRLRRRLRLRLRRLRLLRRRR';

const fs = require('fs');
const data = fs.readFileSync('./day_08/input.txt', 'utf-8');
const lines = data.trim().split('\n');

let map = {};
for (const line of lines) {
    const [node, children] = line.split(' = ');
    const [left, right] = children.slice(1, -1).split(', ');
    map[node] = [left, right];
}

let steps = 0;

let current = start;

while (current !== end) {
    let direction = input[steps % input.length];

    current = map[current][direction === left ? 0 : 1];

    steps++;
}

console.log(steps);

// // --- Part Two ---

// const fs = require('fs');
// const data = fs.readFileSync('./day_08/input.txt', 'utf-8');
// const lines = data.trim().split('\n'); 

// let map = {};
// for (const line of lines) {
//     const [node, children] = line.split(' = ');
//     const [left, right] = children.slice(1, -1).split(', ');
//     map[node] = [left, right];
// }

// let input = 'LLLRRRLLRLRLLRRRLRLRRLRRLRRRLRRLLLRLRRLLRLRRRLRRRLLLRLLLLRLRRLLLRRRLRRRLRLRRRLLLLRLRLLRRLLRRRLRRLRLRRRLRRRLLLRLRRRLRRRLRRLLRRLRRRLLRLRLRLRLRLRRRLRLRRLRLRLRLRRLRRLRLRLRRLLRRLRRRLRRLRRLRRRLRRLRLLRLRLLRRLRRRLRLRLRRLLRRLRRRLRRLRRRLRLRRRLRRLRLRRLRLRRLLLRRLRRLRRRLRLRRLRRRLRLRLRRLRLLRRRR';

// let steps = 0;
// let start = 'XCA'
// let end = 'JNZ'

// let current = start;

// while (current !== end) {
//     let direction = input[steps % input.length];
//     console.log(direction);
//     current = map[current][direction === 'L' ? 0 : 1];

//     steps++;
//     console.log(current);
//     console.log(steps);
// }

// console.log(steps);

// // tried to do in brute force 
// check ./day_08/lcm.js for efficient solution for both part 1 and part 2