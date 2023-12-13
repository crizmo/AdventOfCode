const fs = require('fs');
const path = require('path');

const inputs = fs.readFileSync(path.join(__dirname, 'base.txt'), 'utf8').split('\n\n');
console.log(inputs);

function checkIfVerOrHor(input) {
    const inputArr = input.split('\n');
    const inputArrLength = inputArr.length;
    const inputArrElementLength = inputArr[0].length;
    const firstElement = inputArr[0];
    const lastElement = inputArr[inputArrLength - 1];
    const firstElementFirstSymbol = firstElement[0];
    const lastElementLastSymbol = lastElement[inputArrElementLength - 1];
    if (firstElementFirstSymbol !== lastElementLastSymbol) {
        return 'vertical';
    } else {
        return 'horizontal';
    }
}

let horiSum = 0;
let vertSum = 0;

function findHorizontalReflection(input) {
    const inputArr = input.split('\n');
    let matchFound = false;

    let thingy = 0
    for (let i = 0; i < inputArr.length; i++) {
        const element1 = inputArr[i];

        for (let j = i + 1; j < inputArr.length; j++) {
            const element2 = inputArr[j];

            console.log('Comparing element', i, 'with element', j);
            console.log('Element', i, ':', element1);
            console.log('Element', j, ':', element2);

            // To summarize your pattern notes, add up the number of columns to the left of each vertical line of reflection; to that, also add 100 multiplied by the number of rows above each horizontal line of reflection. In the above example, the first pattern's vertical line has 5 columns to its left and the second pattern's horizontal line has 4 rows above it, a total of 405.

            if (element1 === element2) {
                matchFound = true;
                // console.log('Match found between element', i, 'and element', j); write this in green
                thingy += 1;
                console.log('\x1b[32m%s\x1b[0m', 'Match found between element', i + 1, 'and element', j + 1);

            } else {
                // console.log('No match between element', i, 'and element', j); // write this in red
                console.log('\x1b[31m%s\x1b[0m', 'No match between element', i + 1, 'and element', j + 1);
            }
        }
    }
    horiSum = thingy + 1;

    if (!matchFound) {
        console.log('No matches found.');
    }
}

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

    return result.trim(); // Remove trailing newline
}

function findVerticalReflection(input) {
    console.log(input);
    let newInput = convertColumnsToRows(input);
    const inputArr = newInput.split('\n');
    let matchFound = false;

    let thingy = 0

    for (let i = 0; i < inputArr.length; i++) {
        const element1 = inputArr[i];

        for (let j = i + 1; j < inputArr.length; j++) {
            const element2 = inputArr[j];

            console.log('Comparing element', i, 'with element', j);
            console.log('Element', i, ':', element1);
            console.log('Element', j, ':', element2);

            if (element1 === element2) {
                matchFound = true;
                // console.log('Match found between element', i, 'and element', j); write this in green
                console.log('\x1b[32m%s\x1b[0m', 'Match found between element', i + 1, 'and element', j + 1);
                thingy += 1;
            } else {
                // console.log('No match between element', i, 'and element', j); // write this in red
                console.log('\x1b[31m%s\x1b[0m', 'No match between element', i + 1, 'and element', j + 1);
            }
        }
    }
    vertSum = thingy + 1;

    if (!matchFound) {
        console.log('No matches found.');
    }
}

inputs.forEach((input) => {
    if (checkIfVerOrHor(input) === 'horizontal') {
        // in red console log horizontal
        console.log('\x1b[31m%s\x1b[0m', 'horizontal');
        findHorizontalReflection(input);
    }
    else {
        // in green console log vertical
        console.log('\x1b[32m%s\x1b[0m', 'vertical');
        findVerticalReflection(input);
    }

    console.log('Horizontal sum:', horiSum);
    console.log('Vertical sum:', vertSum);

    console.log('Total sum:', (horiSum * 100) + vertSum);
});

