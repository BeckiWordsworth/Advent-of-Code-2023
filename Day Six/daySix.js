const fs = require('fs')
const input = fs.readFileSync("./input.txt", "utf8").split("\n")

const buildRaces = (input) => {
    milliSecondsArr = input[0].split(':')[1].replace(/\s+/g, ' ').trim().split(' ').map((str) => Number(str.trim()));
    distancesArr = input[1].split(':')[1].replace(/\s+/g, ' ').trim().split(' ').map((str) => Number(str.trim()));

    return milliSecondsArr.map((milliSeconds, idx) => {
        return {
            milliSeconds,
            distance: distancesArr[idx]
        }
    });
}

const part1 = (input) => {
    const races = buildRaces(input);
    let result = null;
    races.forEach((race) => {
        let waysToWin = 0
        for(let i = 1; i < race.milliSeconds; i++) {
            if(i * (race.milliSeconds - i) > race.distance) {
                waysToWin += 1;
            }
        }
        result = result === null || 0 ? waysToWin : result * waysToWin;
    })
    return result;
}


const buildRacePart2 = (input) => {
    milliSeconds = Number(input[0].split(':')[1].replace(/\s+/g, '').trim());
    distance = Number(input[1].split(':')[1].replace(/\s+/g, '').trim());

    return {
        milliSeconds,
        distance,
    }
}

const part2 = (input) => {
    const race = buildRacePart2(input);
    let waysToWin = 0;
    for(let i = 1; i < race.milliSeconds; i++) {
        if(i * (race.milliSeconds - i) > race.distance) {
            waysToWin += 1;
        }
    }
    return waysToWin;
}

console.log(part1(input))
console.log(part2(input))

