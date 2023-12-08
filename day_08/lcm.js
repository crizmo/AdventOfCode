const fs = require('fs');
const data = fs.readFileSync('./day_08/e.txt', 'utf-8');
const lines = data.trim().split('\n');

function lcm(xs) {
    let ans = 1;
    for (const x of xs) {
        ans = (x * ans) / gcd(x, ans);
    }
    return ans;
}

function gcd(a, b) {
    if (b === 0) {
        return a;
    }
    return gcd(b, a % b);
}

let GO = {
    'L': {},
    'R': {}
};
let [steps, rule] = data.split('\n\n');

for (const line of rule.split('\n')) {
    let [st, lr] = line.split('=');
    st = st.trim();
    let [left, right] = lr.split(',');
    left = left.trim().slice(1).trim();
    right = right.slice(0, -1).trim();
    GO['L'][st] = left;
    GO['R'][st] = right;
}

function solve(part2) {
    let POS = [];
    for (const s in GO['L']) {
        if (part2 ? s.endsWith('A') : s.endsWith('AAA')) {
            POS.push(s);
        }
    }
    let T = {};
    let t = 0;
    while (true) {
        let NP = [];
        for (let i = 0; i < POS.length; i++) {
            let p = POS[i];
            p = GO[steps[t % steps.length]][p];
            if (p.endsWith('Z')) {
                T[i] = t + 1;
                if (Object.keys(T).length === POS.length) {
                    return lcm(Object.values(T));
                }
            }
            NP.push(p);
        }
        POS = NP;
        t++;
    }
}

console.log(solve(false));
console.log(solve(true));

