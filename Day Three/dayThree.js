const fs = require('fs')
const input = fs.readFileSync('input.txt', 'utf8').split('\n');

let sum1 = 0;

const checkIsSymbol = (row, column) => {
  return (
    row >= 0 &&
    row < input.length &&
    column >= 0 &&
    column < input[row].length &&
    !/[0-9.]/.test(input[row][column])
  );
}

const isAdjacentToSymbol = (row, startColumn, endColumn) => {
  for (
    let columnToSearch = startColumn - 1;
    columnToSearch <= endColumn + 1;
    columnToSearch++
  ) {
    if (checkIsSymbol(row - 1, columnToSearch)) {
      return true;
    }
    if (checkIsSymbol(row + 1, columnToSearch)) {
      return true;
    }
  }
  if (checkIsSymbol(row, startColumn - 1)) return true;
  if (checkIsSymbol(row, endColumn + 1)) return true;
  return false;
}

for (let row = 0; row < input.length; row++) {
  const line = input[row];
  let column = 0;
  while (column < line.length) {
    if (/[0-9]/.test(line[column])) {
      const startColumn = column;
      while (column < line.length && /[0-9]/.test(line[column])) {
        column++;
      }
      const endColumn = column - 1;
      const number = Number(line.slice(startColumn, endColumn + 1));
      if (isAdjacentToSymbol(row, startColumn, endColumn)) {
        sum1 += number;
      }
    } else {
      column++;
    }
  }
}

console.log(sum1);

const visited = new Set();
let sum2 = 0;
for (let row = 0; row < input.length; row++) {
  const line = input[row];
  for (let column = 0; column < input[row].length; column++) {
    if (input[row][column] === '*') {
      let count = 0;
      let multiplication = 1;
      for (const [rowToSearch, columnToSearch] of [
        [row - 1, column - 1],
        [row - 1, column],
        [row - 1, column + 1],
        [row, column - 1],
        [row, column + 1],
        [row + 1, column - 1],
        [row + 1, column],
        [row + 1, column + 1],
      ]) {
        if (
          isWithinBoundary(rowToSearch, columnToSearch) &&
          !visited.has(`${rowToSearch},${columnToSearch}`) &&
          /[0-9]/.test(input[rowToSearch][columnToSearch])
        ) {
          count++;
          const number = getNumber(rowToSearch, columnToSearch);
          multiplication *= number;
        }
      }

      if (count === 2) {
        sum2 += multiplication;
      }
    }
  }
}

const isWithinBoundary = (row, column) => {
  return (
    row >= 0 && row < input.length && column >= 0 && column < input[row].length
  );
}

const getNumber = (row, column) => {
  let startColumn = column;
  let endColumn = column;

  visited.add(`${row},${column}`);

  while (startColumn > 0 && /[0-9]/.test(input[row][startColumn - 1])) {
    startColumn--;
    visited.add(`${row},${startColumn}`);
  }

  while (
    endColumn < input[row].length - 1 &&
    /[0-9]/.test(input[row][endColumn + 1])
  ) {
    endColumn++;
    visited.add(`${row},${endColumn}`);
  }

  return Number(input[row].slice(startColumn, endColumn + 1));
}

console.log(sum2);