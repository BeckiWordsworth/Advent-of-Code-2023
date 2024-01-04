const fs = require('node:fs');
const input = fs.readFileSync("./input.txt", "utf8")

const inputToSprings = (input) => {
  const lines = input.split('\n');
  const springs = [];
  for (const line of lines) {
    const [springStr, dmg] = line.split(' ');
    const damaged = dmg.split(',').map(Number);
    springs.push({springStr, damaged});
  }
  return springs;
}

const getNumArrangements = (springStr, damaged) => {
  if (springStr.length == 0) return damaged.length == 0 ? 1 : 0;
  if (damaged.length == 0) return springStr.includes('#') ? 0 : 1;

  if (springStr[0] == '.') {
    return getNumArrangements(springStr.slice(1), damaged);
  }
  if (springStr[0] == '#') {
    const [dmg, ...restDamaged] = damaged;
    if (springStr.slice(0, dmg).includes('.')) return 0;
    if (springStr[dmg] == '#') return 0;
    if (springStr.length < dmg) return 0;
    return getNumArrangements(springStr.slice(dmg + 1), restDamaged);
  }
  return getNumArrangements('#' + springStr.slice(1), damaged)
       + getNumArrangements('.' + springStr.slice(1), damaged);
}

const part1 = () => {
  const springs = inputToSprings(input);
let sum = 0;
for (const spring of springs) {
  sum += getNumArrangements(spring.springStr, spring.damaged);
}
return sum
}


console.log(part1())
