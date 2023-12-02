function isOpen(x, y) {
  const n = x * x + 3 * x + 2 * x * y + y + y * y + INPUT;
  const ones = count1Bits(n);
  return ones % 2 === 0;
}

// return the number of 1s in the binary representation of n
function count1Bits(n) {
  let ones = 0;
  const maxBit = Math.floor(Math.log2(n));

  for (let i = maxBit; i >= 0; i--) {
    if (Math.pow(2, i) & n) {
      ones++;
    }
  }
  // console.log("=======================")
  return ones;
}

function isAvailable([x, y]) {
  return x >= 0 && y >= 0 && isOpen(x, y);
}

// Return an array of the possible moves from [x, y]
//   1
// 4   2
//   3
function neighbor([x, y]) {
  return [
    [x, y - 1],
    [x + 1, y],
    [x, y + 1],
    [x - 1, y],
  ].filter(isAvailable);
}

function search(startNode) {
  const queue = [[startNode, 0]];
  const visited = new Set();
  const seen = new Set();

  while (true) {
    const [node, depth] = queue[0];
    visited.add(node.toString());

    console.log(node);
    if (depth === 50) break;

    neighbor(node).forEach((n) => {
      const s = n.toString();
      seen.add(s);
      if (!visited.has(s)) {
        queue.push([n, depth + 1]);
      }
    });

    queue.shift();
  }

  console.log(seen.size);
}

// const INPUT = 10
const INPUT = 1352;

const START = [1, 1];

// Go
search(START);
