const aStar = require('a-star')


function isOpen (x, y) {
  const n = x * x + 3 * x + 2 * x * y + y + y * y + INPUT
  const ones = count1Bits(n)
  return ones % 2 === 0
}

// return the number of 1s in the binary representation of n
function count1Bits (n) {
  let ones = 0
  const maxBit = Math.floor(Math.log2(n))

  for (let i = maxBit; i >= 0; i--) {
    if (Math.pow(2, i) & n) {
      ones++
    }
  }
  // console.log("=======================")
  return ones
}

function isAvailable ([x, y]) {
  return x >= 0 && y >= 0 && isOpen(x, y)
}

// Return an array of the possible moves from [x, y]
//   1
// 4   2
//   3
function neighbor ([x, y]) {
  return [[x, y - 1], [x + 1, y], [x, y + 1], [x - 1, y]].filter(isAvailable)
}

// constant const function
function constant () {
  return 1
}

// are we there yet?
function isEnd ([x, y]) {
  return x === TARGET[0] && y === TARGET[1]
}


// const INPUT = 10
// const START = [1, 1]
// const TARGET = [7, 4]

const INPUT = 1350
const START = [1, 1]
const TARGET = [31, 39]

// Go
const path = aStar({
  start: START,
  neighbor,
  isEnd,
  distance: constant,
  heuristic: constant
})

console.log(path.cost)
