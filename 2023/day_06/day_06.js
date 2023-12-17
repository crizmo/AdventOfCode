const times = [48, 93, 84, 66]
const dist = [261, 1192, 1019, 1063]

let T = 48938466;
let D = 261119210191063;

function find(t, d) {
    let ans = 0;
    for (let x = 0; x <= t; x++) {
        let disk = x * (t - x); 
        if (disk >= d) {
            ans += 1;
        }
    }
    return ans;
}

let ans = 1;
for (let i = 0; i < times.length; i++) {
    ans *= find(times[i], dist[i]);
}

console.log("Part 1 :", ans);
console.log("Part 2 :", find(T, D));
