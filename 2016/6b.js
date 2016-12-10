const { loadInput, fn } = require('./lib.js')
const { pipe, map, toArray } = fn

// JS with lazy streams and function composition

// transpose the matrix m
function transpose (m) {
  const out = m[0].map(() => [])

  for (let i = 0; i < m.length; i++) {
    for (let j = 0; j < m[0].length; j++) {
      out[j][i] = m[i][j]
    }
  }

  return out
}

function parse (line) {
  return line.trim()
    .split('')
}

function countLetters (chars) {
  return chars
    .reduce((counts, c) => {
      const count = counts[c] || 0
      return Object.assign(counts, { [c]: count + 1 })
    }, {})
}

function getBottomLetter (countingMap) {
  return Object.keys(countingMap)
    .reduce(([ minC, minN ], c) => {
      return countingMap[c] < minN
        ? [c, countingMap[c]]
        : [minC, minN]
    }, [null, Infinity])[0]
}

const input = loadInput('6.txt')
const lines = input.trim().split('\n')

const result = pipe(lines,
  map(parse),
  toArray,
  transpose,
  map(countLetters),
  map(getBottomLetter),
  toArray).join('')

console.log(result)
