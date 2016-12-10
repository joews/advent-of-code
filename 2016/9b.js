const { loadInput, fn } = require('./lib.js')
const { pipe, toArray } = fn

// Day 9b
// The ugliest procedural code I have written for a while! I started with the same
// streaming approach, but I had to slurp the parsed list of instructions because
// recursive expansion of markers needed explicit control over iterator position.
// I don't know a better pattern to do this yet.

// A character stream
function * tokenise (str) {
  for (let i = 0; i < str.length; i++) {
    if (!/\s/.test(input[i])) {
      yield input[i]
    }
  }
}

// instruction stream
function * parse (tokens) {
  let inMarker = false
  let markerBuffer = ''

  for (const token of tokens) {
    switch (token) {
      case '(':
        inMarker = true
        break
      case ')':
        yield makeMarkerInstruction(markerBuffer)

        markerBuffer = ''
        inMarker = false
        break
      default:
        if (inMarker) {
          markerBuffer += token
        } else {
          yield CHAR
        }
    }
  }
}

// Return the total number of decompressed characters in the given Array of instructions
function count (instructions) {
  let total = 0
  let i = 0

  while (i < instructions.length) {
    const instruction = instructions[i]
    // console.log(instruction)

    if (instruction.type === 'CHAR') {
      // consume the char, adding 1 to the total
      total++
      i++
    } else {
      // consume the marker, which adds nothing to the total
      i++

      // group the instructions that are repeated by this marker
      let consumed = 0
      let group = []

      while (consumed < instruction.span) {
        const next = instructions[i++]
        group.push(next)
        consumed += next.strLength
      }

      total += (instruction.repeats * count(group))
    }
  }

  return total
}

// data structure factories
function makeMarkerInstruction (markerString) {
  const match = markerString.match(/(\d+)x(\d+)/)
  if (match) {
    const [, length, repeats] = match
    return {
      type: 'MARKER',
      span: parseInt(length, 10),
      repeats: parseInt(repeats, 10),
      strLength: markerString.length + 2
    }
  } else {
    throw new Error('Bad marker: ' + markerString)
  }
}

const CHAR = { type: 'CHAR', strLength: 1 }

const input = loadInput('9.txt').trim()
// const input = "ADVENT"
// const input = "X(8x2)(3x3)ABCY"
// const input = "(27x12)(20x12)(13x14)(7x10)(1x12)A"
// const input = "(25x3)(3x3)ABC(2x3)XY(5x2)PQRSTX(18x9)(3x2)TWO(5x7)SEVEN"

pipe(input,
  tokenise,
  parse,
  toArray,
  count,
  console.log
)
