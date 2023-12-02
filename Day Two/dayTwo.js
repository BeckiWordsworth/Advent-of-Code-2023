const fs = require('fs')
const input = fs.readFileSync("./input.txt", "utf8").split("\n")

const maxRed = 12;
const maxGreen = 13;
const maxBlue = 14;

const parseSubGame = (subGame) => {
    const map = {};
    let colours = subGame.split(',');
    colours.forEach((colourAndValue) => {
        let trimmed = colourAndValue.trim();
        const [num, colour] = trimmed.split(' ');
        map[colour] = Number(num)
    });
    return map;
}

const part1 = (input) => {
    let sum = 0;
    input.forEach((game, index) => {
        let isPossible = true;
        const gameNum = index + 1;
        const [_x, gameData] = game.split(':');
        const subGames = gameData.split(';').map((subGame) => subGame.trim());
        subGames.forEach((subGame) => {
            let map = parseSubGame(subGame);
            if(map['green'] && (map['green'] > maxGreen)) {
                isPossible = false;
            }
            if(map['red'] && (map['red'] > maxRed)) {
                isPossible = false;
            }
            if(map['blue'] && (map['blue'] > maxBlue)) {
                isPossible = false;
            }
        })
        if(isPossible) {
            sum = gameNum + sum;
        }
    })
    return sum;
};

const part2 = (input) => {
  let sum = 0;
  input.forEach((game, index) => {
      const [_x, gameData] = game.split(':');
      const subGames = gameData.split(';').map((subGame) => subGame.trim());
      let minReqRed = 0;
      let minReqBlue = 0;
      let minReqGreen = 0;
      subGames.forEach((subGame) => {
          let map = parseSubGame(subGame);
          if(map['green'] && (map['green'] > minReqGreen)) {
              minReqGreen = map['green'];
          }
          if(map['red'] && (map['red'] > minReqRed)) {
              minReqRed = map['red'];
          }
          if(map['blue'] && (map['blue'] > minReqBlue)) {
              minReqBlue = map['blue'];
          }
      })
      sum = sum + (minReqGreen * minReqRed * minReqBlue);
  })
  return sum;
};

console.log(part1(input));
console.log(part2(input));