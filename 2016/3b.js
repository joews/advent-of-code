const { loadInput, fn } = require('./lib.js')
const { pipe, map, filter, reduce, split, flatten } = fn

// JS with lazy streams and function composition

// transpose the 3x3 matrix m
function transpose (m) {
  const out = [[], [], []]
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      out[j][i] = m[i][j]
    }
  }

  return out
}

function parse (line) {
  return line.trim()
    .split(/\s+/)
    .map(n => parseInt(n, 10))
}

function sort (list) {
  return list.sort((a, b) => b - a)
}

// a, b, c are the side lengths of a possible triangle, sorted descending
// returns true if the lengths make a valid triangle, false if they don't.
function isTriangle ([a, b, c]) {
  return b + c > a
}

const input = loadInput('3.txt')
const lines = input.trim().split('\n')

// transpose the input by treating 3-segments of columns as rows
const transposed = pipe(lines,
  map(parse),
  split(3),
  map(transpose),
  flatten)

const result = pipe(transposed,
  map(sort),
  filter(isTriangle),
  reduce((a) => a + 1, 0)
)

console.log(result)
