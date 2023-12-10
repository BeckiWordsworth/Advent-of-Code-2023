const fs = require('fs')
const input = fs.readFileSync("./input.txt", "utf8").split("\n")

let lineNumber = 0;

const initialSeeds = [...input[lineNumber++].matchAll(/\d+/g)].map(([number]) =>
  Number(number)
);
lineNumber++;

const mappings = [];

while (lineNumber < input.length) {
  lineNumber++;
  const rangeMappings = [];
  mappings.push(rangeMappings);
  while (input[lineNumber]) {
    const line = input[lineNumber];
    const [destinationRangeStart, sourceRangeStart, range] = line
      .split(' ')
      .map((number) => Number(number));
    rangeMappings.push({
      sourceRangeStart,
      destinationRangeStart,
      range,
    });
    lineNumber++;
  }
  lineNumber++;
}

let lowestLocation1 = Number.POSITIVE_INFINITY;
for (const seed of initialSeeds) {
  let mappedValue = seed;
  for (const rangeMappings of mappings) {
    for (const {
      sourceRangeStart,
      destinationRangeStart,
      range,
    } of rangeMappings) {
      if (
        mappedValue >= sourceRangeStart &&
        mappedValue < sourceRangeStart + range
      ) {
        mappedValue -= sourceRangeStart - destinationRangeStart;
        break;
      }
    }
  }

  if (mappedValue < lowestLocation1) {
    lowestLocation1 = mappedValue;
  }
}

console.log(lowestLocation1);

let lineNumber2 = 0;

const initialSeeds2 = [...input[lineNumber2++].matchAll(/\d+/g)].map(([number]) =>
  Number(number)
);
lineNumber2++;

const mappings2 = [];

while (lineNumber2 < input.length) {
  lineNumber2++;
  const rangeMappings = [];
  mappings2.push(rangeMappings);
  while (input[lineNumber2]) {
    const line = input[lineNumber2];
    const [destinationRangeStart, sourceRangeStart, range] = line
      .split(' ')
      .map((number) => Number(number));
    rangeMappings.push({
      sourceRangeStart,
      destinationRangeStart,
      range,
    });
    lineNumber2++;
  }
  rangeMappings.sort((a, b) => {
    return a.sourceRangeStart - b.sourceRangeStart;
  });

  lineNumber2++;
}

let ranges = [];
for (let i = 0; i < initialSeeds2.length; i += 2) {
  const seedStartRange = initialSeeds2[i];
  const range = initialSeeds2[i + 1];
  ranges.push([seedStartRange, seedStartRange + range - 1]);
}
ranges.sort((a, b) => a[0] - b[0]);

for (const rangeMappings of mappings2) {
  const newRanges = [];

  let rangeIndex = 0;
  let mappingIndex = 0;
  let range = ranges[rangeIndex++];
  while (range) {
    const [start, end] = range;
    if (mappingIndex >= rangeMappings.length) {
      newRanges.push([start, end]);
      range = ranges[rangeIndex++];
    } else if (
      start >=
      rangeMappings[mappingIndex].sourceRangeStart +
        rangeMappings[mappingIndex].range
    ) {
      mappingIndex++;
    }
    else if (end < rangeMappings[mappingIndex].sourceRangeStart) {
      newRanges.push([start, end]);
      range = ranges[rangeIndex++];
    } else if (
      start < rangeMappings[mappingIndex].sourceRangeStart
    ) {
      newRanges.push([start, rangeMappings[mappingIndex].sourceRangeStart - 1]);
      range = [rangeMappings[mappingIndex].sourceRangeStart, end];
    } else if (
      start >= rangeMappings[mappingIndex].sourceRangeStart
    ) {
      const newRangeStart =
        start -
        (rangeMappings[mappingIndex].sourceRangeStart -
          rangeMappings[mappingIndex].destinationRangeStart);
      let newRangeEnd;
      if (
        end <
        rangeMappings[mappingIndex].sourceRangeStart +
          rangeMappings[mappingIndex].range
      ) {
        newRangeEnd =
          end -
          (rangeMappings[mappingIndex].sourceRangeStart -
            rangeMappings[mappingIndex].destinationRangeStart);
        range = ranges[rangeIndex++];
      } else {
        newRangeEnd =
          rangeMappings[mappingIndex].destinationRangeStart +
          rangeMappings[mappingIndex].range -
          1;
        range = [
          rangeMappings[mappingIndex].sourceRangeStart +
            rangeMappings[mappingIndex].range,
          end,
        ];
      }
      newRanges.push([newRangeStart, newRangeEnd]);
    }
  }

  ranges = newRanges;
  ranges.sort((a, b) => a[0] - b[0]);
}

let lowestLocation2 = ranges[0][0];

console.log(lowestLocation2);