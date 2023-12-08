const letterMap = { "T": "A", "J": "B", "Q": "C", "K": "D", "A": "E" };

function classify(hand) {
    const counts = Array.from(new Set(hand)).map(card => hand.split(card).length - 1);

    if (counts.includes(5)) {
        return 6;
    }
    if (counts.includes(4)) {
        return 5;
    }
    if (counts.includes(3)) {
        if (counts.includes(2)) {
            return 4;
        }
        return 3;
    }
    if (counts.filter(count => count === 2).length === 4) {
        return 2;
    }
    if (counts.includes(2)) {
        return 1;
    }
    return 0;
}

function strength(hand) {
    return [classify(hand), hand.split('').map(card => letterMap[card] || card)];
}

const plays = [];

const fs = require('fs');
const data = fs.readFileSync('./day_07/input.txt', 'utf-8');
const lines = data.trim().split('\n');

for (const line of lines) {
    const [hand, bid] = line.split(' ');
    plays.push([hand, parseInt(bid)]);
}

plays.sort((a, b) => {
    const [strengthA, transformedHandA] = strength(a[0]);
    const [strengthB, transformedHandB] = strength(b[0]);

    if (strengthA !== strengthB) {
        return strengthA - strengthB;
    }

    const transformedHandStringA = transformedHandA.join('');
    const transformedHandStringB = transformedHandB.join('');
    
    return transformedHandStringA.localeCompare(transformedHandStringB);
});

let total = 0;

for (let rank = 1; rank <= plays.length; rank++) {
    const [hand, bid] = plays[rank - 1];
    total += rank * bid;
}

console.log(total);