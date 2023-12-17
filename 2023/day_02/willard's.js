// Part 1:
const fs = require("fs");

let input = fs.readFileSync("./day_02/input.txt", "utf-8").split("\n").map(row => row.split(":"))
let valid = input.filter(games => {
    games[0] = +games[0].match(/\d+/)[0]
    games[1] = games[1].split(";")
    for (let game of games[1]) {
        if (!(
            (+game.match(/(\d+) red/)?.[1] || 0) <= 12 &&
            (+game.match(/(\d+) green/)?.[1] || 0) <= 13 &&
            (+game.match(/(\d+) blue/)?.[1] || 0) <= 14
        ))
            return false
    }
    return true
})
valid.reduce((sum, n) => sum + n[0], 0)
console.log("Part 1: " + valid.reduce((sum, n) => sum + n[0], 0))

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