const fs = require('fs');

function convertDigits(line) {
    const p1Digits = [];
    const p2Digits = [];

    for (let i = 0; i < line.length; i++) {
        const c = line[i];

        if (!isNaN(c)) {
            p1Digits.push(c);
            p2Digits.push(c);
        }

        const digitMap = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
        for (let d = 0; d < digitMap.length; d++) {
            const val = digitMap[d];
            if (line.startsWith(val, i)) {
                p2Digits.push((d + 1).toString());
            }
        }
    }

    return { p1Digits, p2Digits };
}

function main() {
    try {
        const data = fs.readFileSync('./day_01/input.txt', 'utf8').trim();
        const lines = data.split('\n');
        let p1 = 0;
        let p2 = 0;

        for (const line of lines) {
            const { p1Digits, p2Digits } = convertDigits(line);
            p1 += parseInt(p1Digits[0] + p1Digits[p1Digits.length - 1]) || 0;
            p2 += parseInt(p2Digits[0] + p2Digits[p2Digits.length - 1]) || 0;
        }

        console.log(p1);
        console.log(p2);
    } catch (err) {
        console.error(err);
    }
}

main();
