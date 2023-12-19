const fs = require('fs');
const path = require('path');

const input = fs.readFileSync(path.resolve(__dirname, 'base.txt'), 'utf8');

let [block1, block2] = input.split("\n\n");

let workflows = {};

block1.split('\n').forEach((line) => {
    let [name, rest] = line.slice(0, -1).split("{");
    console.log(name, rest);
    let rules = rest.split(",");
    console.log(rules);
    workflows[name] = [[], rules.pop()];
    rules.forEach((rule) => {
        let [comparison, target] = rule.split(":");
        let key = comparison[0];
        let comp = comparison[1];
        let n = parseInt(comparison.slice(2));
        workflows[name][0].push([key, comp, n, target]);
    });
    // console.log(workflows[name]);
});


const ops = {
    ">": (a, b) => a > b,
    "<": (a, b) => a < b
};

function accept(item, name = "in") {
    if (name === "R") {
        return false;
    }
    if (name === "A") {
        return true;
    }

    let [rules, fallback] = workflows[name];

    for (let [key, comp, n, target] of rules) { 
        if (ops[comp](item[key], n)) {
            return accept(item, target);
        }
    }

    return accept(item, fallback);
}

let total = 0;

block2.split('\n').forEach((line) => {
    let item = {};
    line.slice(1, -1).split(",").forEach((segment) => {
        let [ch, n] = segment.split("=");
        item[ch] = parseInt(n);
    });

    if (accept(item)) {
        total += Object.values(item).reduce((acc, val) => acc + val, 0);
    }
});

console.log(total);
