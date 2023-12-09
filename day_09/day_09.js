// Initially i did it in a very complicated way, but then i found out that it could be done in a much simpler way
let total = 0;

const fs = require("fs");
const path = require("path");
const file = path.join(__dirname, "input.txt");
const lines = fs.readFileSync(file, "utf-8").split("\n");

function ex(array) {
    if (array.every((x) => x === 0)) {
        return 0;
    }

    const deltas = array.slice(1).map((x, i) => x - array[i]);
    const diff = ex(deltas);
    return array[array.length - 1] + diff; // Part 1
    //   return array[0] - diff; // Part 2
}

for (const line of lines) {
    const nums = line.split(" ").map((x) => parseInt(x));
    total += ex(nums);
}

console.log(total);
