const { loadInput, fn } = require('./lib.js')
const { pipe, map, filter, reduce, toArray, split } = fn

// JS with lazy streams and function composition
const input = loadInput('3.txt')
const lines = input.trim().split('\n')

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

function * flatten (list) {
  for (const child of list) {
    for (const grandchild of child) {
      yield grandchild
    }
  }
}

function parse (line) {
  return line.trim()
    .split(/\s+/)
    .map(n => parseInt(n, 10))
}

function sort (list) {
  return list.sort((a, b) => b - a)
}

function isTriangle ([a, b, c]) {
  return b + c > a
}

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
