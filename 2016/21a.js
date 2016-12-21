const { loadInput } = require('./lib.js')

function swap (i, j, chars) {
  const lastI = chars[i]
  chars[i] = chars[j]
  chars[j] = lastI
  return chars
}

function swapChars (a, b, chars) {
  return chars.map(c => {
    if (c === a) return b
    if (c === b) return a
    return c
  })
}

function rotate (dir, n, chars) {
  const start = n % chars.length
  if (dir === 'left') {
    return chars.concat(chars).slice(start, start + chars.length)
  } else if (dir === 'right') {
    return rotate('left', chars.length - (n % chars.length), chars)
  } else {
    throw new Error(`wat ${dir}`)
  }
}

function rotatePosition (c, chars) {
  const i = chars.indexOf(c)
  const boost = i >= 4 ? 2 : 1
  return rotate('right', i + boost, chars)
}

function reverseRange (start, end, chars) {
  const range = chars.slice(start, end + 1).reverse()
  chars.splice(start, range.length, ...range)
  return chars
}

function move (x, y, chars) {
  const [moved] = chars.splice(x, 1)
  chars.splice(y, 0, moved)
  return chars
}

function execute (line, input) {
  let match
  if (match = line.match(/swap position (\d+) with position (\d+)/)) {
    return swap(parseInt(match[1], 10), parseInt(match[2], 10), input)
  }

  if (match = line.match(/swap letter (\w+) with letter (\w+)/)) {
    return swapChars(match[1], match[2], input)
  }

  if (match = line.match(/rotate (left|right) (\d+) steps?/)) {
    return rotate(match[1], parseInt(match[2], 10), input)
  }

  if (match = line.match(/rotate based on position of letter (\w+)/)) {
    return rotatePosition(match[1], input)
  }

  if (match = line.match(/reverse positions (\d) through (\d)/)) {
    return reverseRange(parseInt(match[1], 10), parseInt(match[2], 10), input)
  }

  if (match = line.match(/move position (\d) to position (\d)/)) {
    return move(parseInt(match[1], 10), parseInt(match[2], 10), input)
  }

  throw Error(`unknown line ${line}`)
}

// const text = 'abcde'

// const INPUT = `
// swap position 4 with position 0
// swap letter d with letter b
// reverse positions 0 through 4
// rotate left 1 step 
// move position 1 to position 4
// move position 3 to position 0
// rotate based on position of letter b
// rotate based on position of letter d`

const text = 'abcdefgh'
const INPUT = loadInput('21.txt')

function reducer (lastHash, line) {
  const b = execute(line, lastHash)
  console.log(`${line} -> ${b.join('')}`)
  return b
}

const result = INPUT.trim().split('\n')
  .reduce(reducer, text.split(''))
  .join('')

console.log(result)
