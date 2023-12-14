const fs = require('fs');

const inputFilePath = './day_14/input.txt';
const input = fs.readFileSync(inputFilePath, 'utf8');
const totalCycles = 1e9;

const tilt = (grid, row, col) => {
    const numRows = grid.length;
    const numCols = grid[0].length;

    const stepRow = row !== 0 ? -row : 1;
    const stepCol = col !== 0 ? -col : 1;

    for (let rows = row === 1 ? numRows - 1 : 0; 0 <= rows && rows < numRows; rows += stepRow) { // row means row , col means col
        for (let cols = col === 1 ? numCols - 1 : 0; 0 <= cols && cols < numCols; cols += stepCol) {
            if (grid[rows][cols] === 'O') {
                tiltCell(grid, rows, cols, row, col);
            }
        }
    }

    return grid;
};


const tiltCell = (grid, startRow, startCol, row, col) => {
    let [x, y] = [startRow, startCol];
    while (
        0 <= x + row &&
        x + row < grid.length &&
        0 <= y + col &&
        y + col < grid[x + row].length &&
        grid[x + row][y + col] === '.'
    ) {
        x += row;
        y += col;
    }
    [grid[startRow][startCol], grid[x][y]] = ['.', 'O'];
};

const calculateResult = (grid) => {
    return grid.reduce((acc, rows, rowIndex) =>
        acc + rows.reduce((rowSum, cell, colIndex) =>
            rowSum + (cell === 'O' ? grid.length - rowIndex : 0), 0), 0);
};

const solve = (input) => {
    let grid = input.split('\n').map((line) => line.split(''));
    const previousStates = new Map();

    for (let cycles = 0; cycles < totalCycles; cycles++) {
        const gridState = grid.map((line) => line.join('')).join('\n');

        if (previousStates.has(gridState)) {
            cycles += Math.floor((totalCycles - cycles) / (cycles - previousStates.get(gridState))) *
                (cycles - previousStates.get(gridState));
        }

        previousStates.set(gridState, cycles);
        grid = tilt(tilt(tilt(tilt(grid, -1, 0), 0, -1), 1, 0), 0, 1);
    }

    const result = calculateResult(grid);
    return result;
};

console.log(solve(input));
