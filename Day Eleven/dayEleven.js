const fs = require('node:fs');
const input = fs.readFileSync("./input.txt", "utf8")

const inputToSkyMap = (input) => {
  const data = input.split('\n');
  const rows = data.length;
  const cols = data[0].length;
  const matrix = Array.from({length: rows}, () => Array(cols));
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      matrix[row][col] = data[row][col];
    }
  }
  return matrix;
}

const getIndOfEmptyRows = (matrix) => {
  const rowSet = new Set();
  for (const [i, row] of matrix.entries()) {
    if (row.some(cell => cell == '#')) continue;
    rowSet.add(i);
  }
  return rowSet;
}

const getIndOfEmptyCols = (matrix) => {
  const colSet = new Set();
  for (let col = 0; col < matrix[0].length; col++) {
    const colData = matrix.map(row => row[col]);
    if (colData.some(cell => cell == '#')) continue;
    colSet.add(col);
  }
  return colSet;
}

const getManhattanDist = (cell1, cell2, emptyRowSet, emptyColSet, emptyCost = 1) => {
  const colMin = Math.min(cell1.col, cell2.col);
  const colMax = Math.max(cell1.col, cell2.col);
  const rowMin = Math.min(cell1.row, cell2.row);
  const rowMax = Math.max(cell1.row, cell2.row);
  let counterEmptySpace = 0;
  for (let i = colMin; i <= colMax; i++) {
    if (emptyColSet.has(i)) counterEmptySpace++;
  }
  for (let i = rowMin; i <= rowMax; i++) {
    if (emptyRowSet.has(i)) counterEmptySpace++;
  }
  return (colMax - colMin) + (rowMax - rowMin) + counterEmptySpace * emptyCost;
}

const getGalaxiesPositions = (matrix) => {
  const positions = [];
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix.length; col++) {
      if (matrix[row][col] == '#') positions.push({row, col});
    }
  }
  return positions;
}

const matrix = inputToSkyMap(input);
const emptyRowSet = getIndOfEmptyRows(matrix);
const emptyColSet = getIndOfEmptyCols(matrix);
const positions = getGalaxiesPositions(matrix);
const allPairs = positions.flatMap((pos1, i) => positions.slice(i + 1).map(pos2 => [pos1, pos2]));


const part1 = () => {
  let sum = 0;
for (const [p1, p2] of allPairs) {
  sum += getManhattanDist(p1, p2, emptyRowSet, emptyColSet);
}
return sum
}

const part2 = () => {
  let sum = 0;
for (const [p1, p2] of allPairs) {
  sum += getManhattanDist(p1, p2, emptyRowSet, emptyColSet, 999999);
}
return sum
}

console.log(part1())
console.log(part2())