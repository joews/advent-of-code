const input = require("./5-input.js");

let matches = input
  .split("\n")
  .filter(
    (s) =>
      (s.match(/[aeiou]/g) || []).length >= 3 &&
      s.split("").some((c, i) => c === s[i - 1]) &&
      s.match(/ab|cd|pq|xy/) === null
  );

console.log(matches.length);
