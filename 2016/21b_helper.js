const { loadInput } = require("./lib.js");

// helper script to generate inline function calls for 21b
// slightly faster than a for loop... which turned out not to be necessary
// because I missed the constraint that all solution chars are unique!
// that reduces the search space from 8**8 to 8!, so per-row efficienty
// becomes irrelevant.

function toCallString(line) {
  let match;
  if ((match = line.match(/swap position (\d+) with position (\d+)/))) {
    return `input = swap(${parseInt(match[1], 10)}, ${parseInt(
      match[2],
      10
    )}, input)`;
  }

  if ((match = line.match(/swap letter (\w+) with letter (\w+)/))) {
    return `input = swapChars('${match[1]}', '${match[2]}', input)`;
  }

  if ((match = line.match(/rotate (left|right) (\d+) steps?/))) {
    return `input = rotate('${match[1]}', ${parseInt(match[2], 10)}, input)`;
  }

  if ((match = line.match(/rotate based on position of letter (\w+)/))) {
    return `input = rotatePosition('${match[1]}', input)`;
  }

  if ((match = line.match(/reverse positions (\d) through (\d)/))) {
    return `input = reverseRange(${parseInt(match[1], 10)}, ${parseInt(
      match[2],
      10
    )}, input)`;
  }

  if ((match = line.match(/move position (\d) to position (\d)/))) {
    return `input = move(${parseInt(match[1], 10)}, ${parseInt(
      match[2],
      10
    )}, input)`;
  }

  throw Error(`unknown line ${line}`);
}

const calls = loadInput("21.txt")
  .trim()
  .split("\n")
  .map(toCallString)
  .join("\n");

console.log(calls);
