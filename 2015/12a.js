const input = require("./input/12.json");

function num(value) {
  return typeof value == "number" ? value : 0;
}

function recursiveSum(arr, sum) {
  return arr.reduce((a, e) => a + visit(e, sum), 0);
}

// Part 1
function visit(o, sum = 0) {
  if (Array.isArray(o)) {
    return sum + recursiveSum(o);
  } else if (typeof o == "object") {
    return sum + recursiveSum(Object.values(o));
  } else {
    return sum + num(o);
  }
}

const result = visit(input);
console.log("Part 1", result);
