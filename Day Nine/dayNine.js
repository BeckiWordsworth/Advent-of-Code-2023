const fs = require('node:fs');
const input = fs.readFileSync("./input.txt", "utf8").toString().trim().split('\n');

const getNextSeq = (arr) => {
    let nextArr = [];
    for (let i = 1; i < arr.length; i++) {
        nextArr.push(arr[i] - arr[i-1]);
    }
    return nextArr;
}

const part1 = (input) => {

  let result = 0;

  input.forEach(line => {
    let seq = line.split(" ").map(x => parseInt(x));
    let lastValues = [seq[seq.length-1]];
    let nextArr = seq;

    do {
        nextArr = getNextSeq(nextArr);
        lastValues.push(nextArr[nextArr.length-1]); 
    }  
    while (!nextArr.every(e => e === nextArr[0]));

    result = result + lastValues.reduce((x, y) => {return x + y}, 0);

}
);
return result
}


const part2 = (input) => {

  let result = 0;

  input.forEach(line => {
    let seq = line.split(" ").map(x => parseInt(x));
    let firstValues = [seq[0]];
    let nextArr = seq;
  
    do {
        nextArr = getNextSeq(nextArr);
        firstValues.push(nextArr[0]); 
    }  
    while (!nextArr.every(e => e === nextArr[0]));
  
    let ext = 0;
    for(let i = firstValues.length-1; i >= 0; i--) {
        ext = firstValues[i] - ext;
    }
  
    result = result + ext;
  });
return result
 }


console.log(part1(input));
console.log(part2(input));