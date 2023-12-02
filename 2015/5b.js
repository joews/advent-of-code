const input = require("./5-input.js");

function hasRepeatingPair(s) {
  for (let i = 0; i < s.length - 2; i++) {
    const pair = s.slice(i, i + 2);
    if (s.lastIndexOf(pair) >= i + 2) {
      return true;
    }
  }

  return false;
}

function hasSplitPair(s) {
  for (let i = 0; i < s.length - 2; i++) {
    if (s[i] === s[i + 2]) {
      return true;
    }
  }

  return false;
}

let matches = input
  .split("\n")
  .filter((s) => hasRepeatingPair(s) && hasSplitPair(s));

console.log(matches.length);
