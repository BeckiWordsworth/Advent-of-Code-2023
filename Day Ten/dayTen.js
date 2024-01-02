const fs = require('node:fs');
const input = fs.readFileSync("./input.txt", "utf8")

const inputToMatrix = (input) => {
  const data = input.split('\n');
  const rows = data.length;
  const cols = data[0].length;
  let start;
  const matrix = Array.from({length: rows}, () => Array(cols));
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      matrix[row][col] = {
        value: data[row][col],
        row,
        col,
      };
      matrix[row][col].neighbors = tileNeighbors(matrix[row][col], matrix);
      if (matrix[row][col].value == 'S') start = matrix[row][col];
    }
  }
  return {matrix, rows, cols, start};
}


const tileNeighbors = (tile, matrix) => {
  const neighbors = [];
  if (tile.value == '.') return [];
  if (tile.value == '|') {
    neighbors.push({row: tile.row - 1, col: tile.col});
    neighbors.push({row: tile.row + 1, col: tile.col});
  } else if (tile.value == '-') {
    neighbors.push({row: tile.row, col: tile.col - 1});
    neighbors.push({row: tile.row, col: tile.col + 1});
  } else if (tile.value == 'L') {
    neighbors.push({row: tile.row - 1, col: tile.col});
    neighbors.push({row: tile.row, col: tile.col + 1});
  } else if (tile.value == 'J') {
    neighbors.push({row: tile.row - 1, col: tile.col});
    neighbors.push({row: tile.row, col: tile.col - 1});
  } else if (tile.value == '7') {
    neighbors.push({row: tile.row + 1, col: tile.col});
    neighbors.push({row: tile.row, col: tile.col - 1});
  } else if (tile.value == 'F') {
    neighbors.push({row: tile.row + 1, col: tile.col});
    neighbors.push({row: tile.row, col: tile.col + 1});
  }
  return neighbors.filter(n => isValidRowCol(n.row, n.col, matrix));
}

const isValidRowCol = (row, col, matrix) => {
  return row >= 0 && row < matrix.length && col >= 0 && col < matrix[0].length;
}

const getDestination = (from, tile, matrix) => {
  const dest = tile.neighbors.find(n => n.row != from.row ||  n.col != from.col)
  if (!dest) return null;
  return matrix[dest.row][dest.col];
}

const {matrix, rows, cols, start} = inputToMatrix(input);

let maxLoop = [];

const part1 = () => {
for (const tileType of ['|', '-', 'L', 'J', '7', 'F']) {
  start.value = tileType;
  start.neighbors = tileNeighbors(start, matrix);
  let from = start;
  let destination = matrix[from.neighbors[0].row][from.neighbors[0].col];
  let loop = [start];
  while (destination && destination != start) {
    const nextDest = getDestination(from, destination, matrix);
    from = destination;
    loop.push(from);
    destination = nextDest;
  }
  if (destination != start) continue;
  if (loop.length > maxLoop.length) maxLoop = loop;
}

return (maxLoop.length) / 2

}

console.log(part1())

// Part 2
const matrixDoubled = Array.from({length: rows * 2 + 1}, () => {
  return Array.from({length: cols * 2 + 1}, () => ({value: '.'}));
});
const theLoopSet = new Set(maxLoop.map(tile => `${tile.row * 2 + 1}:${tile.col * 2 + 1}`));

for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    const dblRow = row * 2 + 1;
    const dblCol = col * 2 + 1;
    matrixDoubled[dblRow][dblCol] = {...matrix[row][col]};
  }
}

for (let row = 0; row < matrixDoubled.length; row++) {
  for (let col = 0; col < matrixDoubled[0].length; col++) {
    matrixDoubled[row][col].row = row;
    matrixDoubled[row][col].col = col;
    if (theLoopSet.has(`${row}:${col}`)) {
      const neighbors = tileNeighbors(matrixDoubled[row][col], matrixDoubled);
      matrixDoubled[row][col].value = 'X';
      for (const n of neighbors) matrixDoubled[n.row][n.col].value = 'X';
    }
  }
}

const tileNeighborsP2 = (tile, matrix) => {
  const neighbors = [
    {row: tile.row - 1, col: tile.col}, // N
    {row: tile.row, col: tile.col + 1}, // E
    {row: tile.row + 1, col: tile.col}, // S
    {row: tile.row, col: tile.col - 1}, // W
  ];
  return neighbors
    .filter(n => isValidRowCol(n.row, n.col, matrix))
    .filter(n => matrix[n.row][n.col].value != 'X');
}

const bfs = (row, col, matrix) => {
  const flowMap = new Map();
  const frontier = [];
  frontier.push({row, col});
  flowMap.set(`${row}:${col}`, {row, col});

  while (frontier.length > 0) {

    const cell = frontier.shift();
    const neighbors = tileNeighborsP2(matrix[cell.row][cell.col], matrix);
    for (const neighbor of neighbors) {
      if (flowMap.has(`${neighbor.row}:${neighbor.col}`)) continue;
      frontier.push(neighbor);
      flowMap.set(`${neighbor.row}:${neighbor.col}`, neighbor);
    }
  }
  return flowMap;
}

const flowMap = bfs(0, 0, matrixDoubled);
for (const tile of flowMap.values()) {
  matrixDoubled[tile.row][tile.col].value = 'X';
}

let sum = 0;
for (let row = 1; row < matrixDoubled.length; row+=2) {
  for (let col = 1; col < matrixDoubled[0].length; col+=2) {
    if (matrixDoubled[row][col].value != 'X') sum++
  }
}
console.log(sum);