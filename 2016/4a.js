const { loadInput, fn } = require("./lib.js");
const { pipe, map, filter, reduce } = fn;

// room-name-with-dashes-sectorid[checksum]
function parse(line) {
  const match = /([a-z-]+)-(\d+)\[([a-z]+)]/.exec(line.trim());
  if (match) {
    const [, name, rawSector, checksum] = match;
    const sector = parseInt(rawSector, 10);
    return [name, sector, checksum];
  } else {
    throw new Error(`Bad line: ${line}`);
  }
}

// Return an object where the keys are each char in String `s`
// and the values are the number of times that char appears in s
function countLetters(s) {
  return s
    .split("")
    .filter((c) => c !== "-")
    .reduce((counts, c) => {
      const count = counts[c] || 0;
      return Object.assign(counts, { [c]: count + 1 });
    }, {});
}

function isReal([name, sector, checksum]) {
  const counts = countLetters(name);
  return checksum === computeChecksum(counts);
}

// Return an ordered string of the letters in counting set `count`,
//  ordered by count then alphabetically
function computeChecksum(counts) {
  return Object.keys(counts)
    .sort((a, b) => counts[b] - counts[a] || a.localeCompare(b))
    .slice(0, 5)
    .join("");
}

// Go
// const input = `
// aaaaa-bbb-z-y-x-123[abxyz]
// a-b-c-d-e-f-g-h-987[abcde]
// not-a-real-room-404[oarel]
// totally-real-room-200[decoy]`

const input = loadInput("4.txt");
const data = input.trim().split("\n");

const answer = pipe(
  data,
  map(parse),
  filter(isReal),
  reduce((sum, [, sector]) => sum + sector, 0)
);

console.log(answer);
