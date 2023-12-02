const fs = require("fs");


// Part 1:
const input = fs.readFileSync("./day_02/input.txt", "utf-8").split("\n");

const parseInput = (input) => {
    const parsedInput = [];
    input.forEach((line) => {
        const game = {};
        const cubes = [];
        const splitLine = line.split(":");
        const id = splitLine[0].split(" ")[1];
        game.id = parseInt(id);
        const cubesSplit = splitLine[1].split(";");
        cubesSplit.forEach((cube) => {
            const cubeSplit = cube.split(",");
            cubeSplit.forEach((cube) => {
                const cubeSplit = cube.split(" ");
                const amount = parseInt(cubeSplit[1]);
                const color = cubeSplit[2];
                const cubeObject = { amount, color };
                cubes.push(cubeObject);
            });
        });
        game.cubes = cubes;
        parsedInput.push(game);
    });
    return parsedInput;
}

const parsedInput = parseInput(input);
const checkIfPossible = (parsedInput, red, green, blue) => {
    console.log(red, green, blue);
    const possibleGames = [];
    parsedInput.forEach((game) => {
        let isPossible = true;
        game.cubes.forEach((cube) => {
            if (cube.color === "red" && cube.amount > red) { isPossible = false; }
            if (cube.color === "green" && cube.amount > green) { isPossible = false; }
            if (cube.color === "blue" && cube.amount > blue) { isPossible = false; }
        });
        if (isPossible) possibleGames.push(game.id);
    });
    return possibleGames;
}

const possibleGames = checkIfPossible(parsedInput, 12, 13, 14);
const sumOfPossibleGames = possibleGames.reduce((acc, cur) => {
    return acc + cur;
}, 0);

console.log("Part 1:",sumOfPossibleGames);

// not the most efficient solution, but it works

// Part 2:
let input2 = fs.readFileSync("./day_02/input.txt", "utf-8").split("\n").map(row => row.split(":"))

let part2 = input2.reduce((sum, games) => {
    games[0] = +games[0].match(/\d+/)[0]
    games[1] = games[1].split(";")
    let r = 0
    let g = 0
    let b = 0
    for (let game of games[1]) {
        r = Math.max(r, (+game.match(/(\d+) red/)?.[1] || 0))
        g = Math.max(g, (+game.match(/(\d+) green/)?.[1] || 0))
        b = Math.max(b, (+game.match(/(\d+) blue/)?.[1] || 0))
    }
    return sum + r * g * b
}, 0)    

console.log("Part 2: " + part2)
// this is willard's [ replit discord member ] solution for part 2, which is much more efficient than mine