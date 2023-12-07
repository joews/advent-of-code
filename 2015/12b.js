const input = require("./input/12.json");

function num(value) {
  return typeof value == "number" ? value : 0;
}

function recursiveSum(arr, sum) {
  return arr.reduce((a, e) => a + visit(e, sum), 0);
}

function visit(o, sum = 0) {
  if (Array.isArray(o)) {
    return sum + recursiveSum(o);
  } else if (typeof o == "object") {
    const values = Object.values(o);
    if (values.includes("red")) {
      return sum;
    }

    return sum + recursiveSum(values);
  } else {
    return sum + num(o);
  }
}

const result = visit(input);
console.log("Part 2", result);
