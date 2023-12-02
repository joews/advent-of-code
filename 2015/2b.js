const s = require("./2-input.js");

let result2 = 0;
for (let line of s.split("\n")) {
  const [l, w, h] = line.split("x");
  const minSide = [l, w, h].sort((a, b) => a - b).slice(0, 2);
  result2 += l * w * h;
  result2 += 2 * minSide[0] + 2 * minSide[1];
}

console.log(result2);
