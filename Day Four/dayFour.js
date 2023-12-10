const fs = require('fs')
const input = fs.readFileSync("./input.txt", "utf8").split("\n")

let totalPoints1 = 0;
for(const line of input) {
  const [_, winningNumbersStr, numbersWeHaveStr] = line.match(/^Card\s+\d+: (.+) \| (.+)$/);
  const winningNumbersSet = new Set([...winningNumbersStr.matchAll(/\d+/g)].map(([number]) => number));

  let points = 0;
  for (const [number] of numbersWeHaveStr.matchAll(/\d+/g)) {
    if (winningNumbersSet.has(number)) {
      if (points === 0) points = 1;
      else points *= 2;
    }
  }
  totalPoints1 += points;
}

console.log(totalPoints1);

const numberOfCards = new Array(input.length).fill(1);

let totalPoints2 = 0;
for (let index = 0; index < input.length; index++) {
  const line = input[index];
  const [_, winningNumbersStr, numbersWeHaveStr] = line.match(
    /^Card\s+\d+: (.+) \| (.+)$/
  );
  const winningNumbersSet = new Set(
    [...winningNumbersStr.matchAll(/\d+/g)].map(([number]) => number)
  );

  let matches = 0;
  for (const [number] of numbersWeHaveStr.matchAll(/\d+/g)) {
    if (winningNumbersSet.has(number)) {
      matches++;
    }
  }

  for (let i = 0; i < matches; i++) {
    numberOfCards[index + i + 1] += numberOfCards[index];
  }

  totalPoints2 += numberOfCards[index];
}

console.log(totalPoints2);