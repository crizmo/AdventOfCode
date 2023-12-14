const fs = require('fs');
const path = require('path');

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')

let rocks = 'O';
let empty = '.';

function convertColumnsToRows(input) {
    const inputArr = input.split('\n');
    const numRows = inputArr.length;
    const numCols = inputArr[0].length;

    let result = '';

    for (let col = 0; col < numCols; col++) {
        let newRow = '';
        for (let row = 0; row < numRows; row++) {
            newRow += inputArr[row][col];
        }
        result += newRow + '\n';
    }

    return result.trim(); 
}

function convertRowsToColumns(input) {
    const inputArr = input.split('\n');
    const numRows = inputArr.length;
    const numCols = inputArr[0].length;

    let result = '';

    for (let row = 0; row < numRows; row++) {
        let newRow = '';
        for (let col = 0; col < numCols; col++) {
            newRow += inputArr[col][row];
        }
        result += newRow + '\n';
    }

    return result.trim(); 
}

function tiltNorth(input) {
    let newInput = convertColumnsToRows(input);

    let inputArr = newInput.split('\n');
    let movedArr = [];

    for (let i = 0; i < inputArr.length; i++) {
        let element = inputArr[i];
        let elementArr = element.split('');

        for (let j = 0; j < elementArr.length; j++) {
            let currentChar = elementArr[j];
            if (currentChar === rocks) {
                let k = j - 1;
                while (k >= 0 && elementArr[k] === empty) {
                    elementArr[k] = rocks;
                    elementArr[k + 1] = empty;
                    k--;
                }
            }
            if (currentChar === empty) {
                let k = j - 1;
                while (k >= 0 && elementArr[k] === empty) {
                    elementArr[k] = rocks;
                    elementArr[k] = empty;
                    k--;
                }
            }
        }
        movedArr.push(elementArr.join(''));
    }

    let finalResult = movedArr.join('\n');
    let finalfinal = convertRowsToColumns(finalResult);
    return finalfinal;
}

let movedInput = tiltNorth(input);
function calculateLoad(input){  
    let inputArr = input.split('\n');
    let numRows = inputArr.length;
    let numCols = inputArr[0].length;
    
    let totalLoad = 0;

    for (let row = 0; row < numRows; row++) {
        let element = inputArr[row];
        let elementArr = element.split('');
        let load = 0;

        for (let col = 0; col < numCols; col++) {
            let currentChar = elementArr[col];
            if (currentChar === rocks) {
                load += numRows - row;
            }
        }
        totalLoad += load;
    }
    return totalLoad;
}

let totalLoad = calculateLoad(movedInput);
console.log(totalLoad);
