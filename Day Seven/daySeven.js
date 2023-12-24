const fs = require('fs')
const input = fs.readFileSync("./input.txt", "utf8").split("\n").filter((line) => line.trim() !== "")


const lines = input
      .map((line) => {
      const [hand, bid] = line.split(" ");

      const score = {};

      const parsedHand = hand.split("").map((v) => {
        score[v] = (score[v] || 0) + 1;
        switch (v) {
          case "T":
            return 10;
          case "J":
            return 0;
          case "Q":
            return 12;
          case "K":
            return 13;
          case "A":
            return 14;
          default:
            return parseInt(v);
        }
      });

      return {
        hand: parsedHand,
        bid: parseInt(bid),
        score: (() => {
          const scores = Object.values(score);
          const jCount = score["J"] || 0;

          if (scores.length === 1) return 7; // five of a kind
          if (scores.length === 2) {
            if (scores[0] === 3 || scores[1] === 3) {
              if (jCount === 2 || jCount === 3) return 7; // five of a kind
              return 5; // full house
            }
            if (jCount === 1 || jCount === 4) return 7; // five of a kind
            return 6; // four of a kind
          }
          if (scores.length === 3) {
            if (scores[0] === 3 || scores[1] === 3 || scores[2] === 3) {
              if (jCount === 1 || jCount === 3) return 6; // four of a kind
              return 4; // three of a kind
            }
            if (jCount === 2) return 6; // four of a kind
            if (jCount === 1) return 5; // full house
            return 3; // two pairs
          }
          if (scores.length === 4) {
            if (jCount === 1 || jCount === 2) return 4; // three of a kind
            return 2; // one pair
          }
          if (jCount === 1) return 2; // one pair
          return 1; // high card
        })(),
      };
    });




const part1 = (input) => {
  const lines = input
    .map((line) => {
      const [hand, bid] = line.split(" ");

      const score = {};

      const parsedHand = hand.split("").map((v) => {
        score[v] = (score[v] || 0) + 1;
        switch (v) {
          case "T":
            return 10;
          case "J":
            return 11;
          case "Q":
            return 12;
          case "K":
            return 13;
          case "A":
            return 14;
          default:
            return parseInt(v);
        }
      });

      return {
        hand: parsedHand,
        bid: parseInt(bid),
        score: (() => {
          const scores = Object.values(score);

          if (scores.length === 1) return 7; 
          if (scores.length === 2) {
            if (scores[0] === 3 || scores[1] === 3) return 5; 
            return 6; 
          }
          if (scores.length === 3) {
            if (scores[0] === 3 || scores[1] === 3 || scores[2] === 3) return 4; 
            return 3; 
          }
          if (scores.length === 4) return 2; 
          return 1; 
        })(),
      };
    });

  lines.sort((a, b) => {
    if (a.score > b.score) return 1;
    if (a.score < b.score) return -1;

    for (let i = 0; i < 5; i++) {
      if (a.hand[i] > b.hand[i]) return 1;
      if (a.hand[i] < b.hand[i]) return -1;
    }

    return 0;
  });

  const result = lines.reduce((result, line, index) => {
    return result + line.bid * (index + 1);
  }, 0);

  return result
};

part1(input)

const part2 = (input) => {
  const lines = input
      .map((line) => {
      const [hand, bid] = line.split(" ");

      const score = {};

      const parsedHand = hand.split("").map((v) => {
        score[v] = (score[v] || 0) + 1;
        switch (v) {
          case "T":
            return 10;
          case "J":
            return 0;
          case "Q":
            return 12;
          case "K":
            return 13;
          case "A":
            return 14;
          default:
            return parseInt(v);
        }
      });

      return {
        hand: parsedHand,
        bid: parseInt(bid),
        score: (() => {
          const scores = Object.values(score);
          const jCount = score["J"] || 0;

          if (scores.length === 1) return 7; 
          if (scores.length === 2) {
            if (scores[0] === 3 || scores[1] === 3) {
              if (jCount === 2 || jCount === 3) return 7; 
              return 5; 
            }
            if (jCount === 1 || jCount === 4) return 7; 
            return 6; 
          }
          if (scores.length === 3) {
            if (scores[0] === 3 || scores[1] === 3 || scores[2] === 3) {
              if (jCount === 1 || jCount === 3) return 6; 
              return 4; 
            }
            if (jCount === 2) return 6; 
            if (jCount === 1) return 5; 
            return 3; 
          }
          if (scores.length === 4) {
            if (jCount === 1 || jCount === 2) return 4; 
            return 2; 
          }
          if (jCount === 1) return 2; 
          return 1; 
        })(),
      };
    });

  const result = lines
    .sort((a, b) => {
      if (a.score > b.score) return 1;
      if (a.score < b.score) return -1;

      for (let i = 0; i < 5; i++) {
        if (a.hand[i] > b.hand[i]) return 1;
        if (a.hand[i] < b.hand[i]) return -1;
      }
      r;
      return 0;
    })
    .reduce((result, line, index) => {
      return result + line.bid * (index + 1);
    }, 0);

 return result
};

console.log(part1(input))
console.log(part2(input))