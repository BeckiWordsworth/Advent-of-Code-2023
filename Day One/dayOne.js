const fs = require('fs')
const input = fs.readFileSync("./input.txt", "utf8").split("\n")

const partOne = (input) => {
    let total = 0;
    input.forEach((row) => {
        let rowNumber = 0;
        let leftNum = null;
        let rightNum = null;
        let i;
        for(i = 0; i < row.length; i++) {
            let num = Number(row[i]);
            if(!Number.isNaN(num)) {
                if(leftNum == null) {
                    leftNum = num;
                }
                rightNum = num;
            }
        }
        rowNumber = (leftNum * 10) + rightNum;
        total += rowNumber;
    });
    return total;
};

const numbersDic = {
    "zero": 0,
    "one": 1,
    "two": 2,
    "three": 3,
    "four": 4,
    "five": 5,
    "six": 6,
    "seven": 7,
    "eight": 8,
    "nine": 9,
}

const partTwo = (input) => {
    let total = 0;
    input.forEach((row) => {
        let rowNumber = 0;
        let leftNum = null;
        let rightNum = null;
        let i;
        for(i = 0; i < row.length; i++) {
            let num = Number(row[i]);
            if(!Number.isNaN(num)) {
                if(leftNum == null) {
                    leftNum = num;
                }
                rightNum = num;
            } else {
                for(let j = i; j <= 5 + i; j++) {
                    let str = row.substring(i, j);
                    if(numbersDic[str]) {
                        if(leftNum == null) {
                            leftNum = numbersDic[str];
                        }
                        rightNum = numbersDic[str];
                    }
                }
            }
        }
        rowNumber = (leftNum * 10) + rightNum;
        total += rowNumber;
    });
    return total;
};

console.log(partOne(input));
console.log(partTwo(input));