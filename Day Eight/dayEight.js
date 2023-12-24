const fs = require('fs')
const input = fs.readFileSync("./input.txt", "utf8").split("\n")

const newMap = () => {
    let map = {};
    for(let i = 2; i < input.length; i++) {
        let [key, rest] = input[i].split(' = ');
        let [left, right] = rest.split(', ');
        left = left.split('(')[1];
        right = right.split(')')[0];

        map[key] = {
            left,
            right,
        }
    }
    return map;
}

const part1 = (input) => {
    let map = newMap();
    let stepInstructions = input[0].split('');

    let currentStep = 'AAA';
    let stepIdx = 0;
    let stepCount = 0;
    while (currentStep != 'ZZZ') {
        if(stepInstructions[stepIdx] === 'L') {
            currentStep = map[currentStep]['left'];
        } else {
            currentStep = map[currentStep]['right'];
        }
        stepIdx++;
        if(stepIdx == stepInstructions.length) {
            stepIdx = 0;
        }
        stepCount++;
    }
    return(stepCount);
}

const lcm = (arr) => {
    const gcd = (x, y) => (!y ? x : gcd(y, x % y));
    const _lcm = (x, y) => (x * y) / gcd(x, y);
    return arr.reduce((a, b) => _lcm(a, b));
  };

const part2 = (input) => {
    let map = newMap();
    let stepInstructions = input[0].split('');
    
    let currentSteps = []
    Object.keys(map).forEach((key) => {
        if(key[2] === 'A') {
            currentSteps.push(key)
        }
    });

    let stepIdx = 0;
    let stepCounts = Array(currentSteps.length).fill(0);

    for(let i = 0; i < currentSteps.length; i++) {
        while(currentSteps[i][2] != 'Z') {
            if(stepInstructions[stepIdx] === 'L') {
                currentSteps[i] = map[currentSteps[i]]['left'];
            } else {
                currentSteps[i] = map[currentSteps[i]]['right'];
            }
            stepCounts[i] += 1;
            stepIdx++;
            if(stepIdx == stepInstructions.length) {
                stepIdx = 0;
            }
        }
        stepIdx = 0;
    }
    
    return lcm(stepCounts);
}

console.log(part1(input))
console.log(part2(input))