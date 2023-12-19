const fs = require('fs');
const path = require('path');

const input = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8');

let [block1, _] = input.split("\n\n");

let workflows = {};

block1.split('\n').forEach((line) => {
    let [name, rest] = line.slice(0, -1).split("{");
    let rules = rest.split(",");
    workflows[name] = [[], rules.pop()];
    rules.forEach((rule) => {
        let [comparison, target] = rule.split(":");
        let key = comparison[0];
        let cmp = comparison[1];
        let n = parseInt(comparison.slice(2));
        workflows[name][0].push([key, cmp, n, target]);
    });
});

function count(ranges, name = "in") {
    if (name === "R") {
        return 0;
    }
    if (name === "A") {
        let product = 1;
        for (let [lo, hi] of Object.values(ranges)) {
            product *= hi - lo + 1;
        }
        return product;
    }

    let [rules, fallback] = workflows[name];

    let total = 0;

    for (let [key, cmp, n, target] of rules) {
        let [lo, hi] = ranges[key];
        if (cmp === "<") {
            let T = [lo, n - 1];
            let F = [n, hi];
            if (T[0] <= T[1]) {
                let copy = { ...ranges };
                copy[key] = T;
                total += count(copy, target);
            }
            if (F[0] <= F[1]) {
                ranges = { ...ranges };
                ranges[key] = F;
            } else {
                break;
            }
        } else {
            let T = [n + 1, hi];
            let F = [lo, n];
            if (T[0] <= T[1]) {
                let copy = { ...ranges };
                copy[key] = T;
                total += count(copy, target);
            }
            if (F[0] <= F[1]) {
                ranges = { ...ranges };
                ranges[key] = F;
            } else {
                break;
            }
        }
    }

    total += count(ranges, fallback);

    return total;
}

console.log(count({ x: [1, 4000], m: [1, 4000], a: [1, 4000], s: [1, 4000] }));
