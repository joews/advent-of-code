require('babel-register')({ ignore: false })
const { readFileSync } = require('fs')
const { join } = require('path')
const { pipe, map, filter, reduce } = require('fn')

// JS with lazy streams and function composition
const input = readFileSync(join(__dirname, 'input', '3.txt'), 'utf8')
const lines = input.split('\n')

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

const result = pipe(lines,
  map(parse),
  map(sort),
  filter(isTriangle),
  reduce((a) => a + 1, 0)
)

console.log(result)
