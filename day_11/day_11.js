const fs = require('fs');
const input = fs.readFileSync('day_11/input.txt', 'utf-8').split('\n');
console.log(input);

let empty = '.';
let galaxy = '#';

function expandUniverse(input) {
    let expandedUniverse = [];
    let expandedRow = [];
    let expandedCol = [];

    // find the rows and columns that contain no galaxies
    for (let row = 0; row < input.length; row++) {
        let hasGalaxy = false;
        for (let col = 0; col < input[row].length; col++) {
            if (input[row][col] === galaxy) {
                hasGalaxy = true;
                break;
            }
        }
        if (!hasGalaxy) {
            expandedRow.push(row);
        }
    }

    for (let col = 0; col < input[0].length; col++) {
        let hasGalaxy = false;
        for (let row = 0; row < input.length; row++) {
            if (input[row][col] === galaxy) {
                hasGalaxy = true;
                break;
            }
        }
        if (!hasGalaxy) {
            expandedCol.push(col);
        }
    }

    // expand the universe
    for (let row = 0; row < input.length; row++) {
        let newRow = '';
        for (let col = 0; col < input[row].length; col++) {
            if (expandedRow.includes(row) || expandedCol.includes(col)) {
                newRow += input[row][col] + input[row][col];
            } else {
                newRow += input[row][col];
            }
        }
        expandedUniverse.push(newRow);
    }

    return expandedUniverse;
}

let expandedUniverse = expandUniverse(input);
console.log(expandedUniverse);

function convertToNumberedUniverse(input) {
    let numberedUniverse = [];
    let galaxyNumber = 1;
    for (let row = 0; row < input.length; row++) {
        let newRow = '';
        for (let col = 0; col < input[row].length; col++) {
            if (input[row][col] === galaxy) {
                newRow += galaxyNumber;
                galaxyNumber++;
            } else {
                newRow += input[row][col];
            }
        }
        numberedUniverse.push(newRow);
    }

    return numberedUniverse;
}

// lets show the numbered universe
let numberedUniverse = convertToNumberedUniverse(expandedUniverse);
console.log(numberedUniverse);

function findAllGalaxies(input) {
    let galaxies = [];
    for (let row = 0; row < input.length; row++) {
        for (let col = 0; col < input[row].length; col++) {
            if (input[row][col] !== empty) {
                galaxies.push(input[row][col]);
            }
        }
    }

    return galaxies;
}

// lets find all the galaxies
let galaxies = findAllGalaxies(numberedUniverse);
console.log(galaxies);

// lets pair up all the galaxies
function pairUpGalaxies(galaxies) {
    let pairs = [];
    for (let i = 0; i < galaxies.length; i++) {
        for (let j = i + 1; j < galaxies.length; j++) {
            pairs.push([galaxies[i], galaxies[j]]);
        }
    }

    return pairs;
}

// lets pair up all the galaxies
let pairs = pairUpGalaxies(galaxies);
console.log(pairs);

// lets find the shortest path between all the pairs of galaxies
function findShortestPathBetweenGalaxies(input, pairs) {
    let shortestPaths = [];
    for (let i = 0; i < pairs.length; i++) {
        console.log(pairs[i]);
        let galaxy1 = pairs[i][0];
        let galaxy2 = pairs[i][1];
        let galaxy1Coords = [];
        let galaxy2Coords = [];

        for (let row = 0; row < input.length; row++) {
            for (let col = 0; col < input[row].length; col++) {
                if (input[row][col] == galaxy1) {
                    galaxy1Coords.push(row);
                    galaxy1Coords.push(col);
                }
                if (input[row][col] == galaxy2) {
                    galaxy2Coords.push(row);
                    galaxy2Coords.push(col);
                }
            }
        }

        let manhattanDistance = 0
        if (galaxy1Coords[0] == galaxy2Coords[0]) {
            manhattanDistance = Math.abs(galaxy1Coords[1] - galaxy2Coords[1]);
        } else if (galaxy1Coords[1] == galaxy2Coords[1]) {
            manhattanDistance = Math.abs(galaxy1Coords[0] - galaxy2Coords[0]);
        } else {
            manhattanDistance = Math.abs(galaxy1Coords[0] - galaxy2Coords[0]) + Math.abs(galaxy1Coords[1] - galaxy2Coords[1]) + 1;
        }

        shortestPaths.push(manhattanDistance);
    }

    return shortestPaths;
}

// lets find the shortest path between all the pairs of galaxies
let shortestPaths = findShortestPathBetweenGalaxies(numberedUniverse, pairs);
console.log(shortestPaths);

// lets find the sum of the shortest paths
function sumOfShortestPaths(shortestPaths) {
    let sum = 0;
    for (let i = 0; i < shortestPaths.length; i++) {
        sum += shortestPaths[i];
    }

    return sum;
}

// lets find the sum of the shortest paths
let sum = sumOfShortestPaths(shortestPaths);

console.log(sum);