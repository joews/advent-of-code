const { loadInput, fn } = require('./lib.js')
const { pipe, map, toArray } = fn

// Day 12 in procedural JavaScript

//
// Parser
//
function parse (line) {
  const match = line.match(/(\S+) (\S+)(?: (\S+))?/)
  const [, op, arg1, arg2] = match
  return {
    op,
    arg1: parseArg(arg1),
    arg2: parseArg(arg2)
  }
}

function parseArg (raw) {
  if (!raw) return null
  const asNum = parseInt(raw, 10)
  if (isNaN(asNum)) {
    // register
    return raw
  } else {
    // int
    return asNum
  }
}

//
// Interpreter
//
const state = { a: 0, b: 0, c: 1, d: 0 }
let ir = 0

const visitors = {
  cpy ({ arg1: source, arg2: reg }) {
    state[reg] = resolve(source)
    ir++
  },

  inc ({ arg1: reg }) {
    state[reg] = state[reg] + 1
    ir++
  },

  dec ({ arg1: reg }) {
    state[reg] = state[reg] - 1
    ir++
  },

  jnz ({ arg1: check, arg2: delta }) {
    if (resolve(check) !== 0) {
      ir = ir + delta
    } else {
      ir++
    }
  }
}

function resolve (symbol) {
  if (typeof symbol === 'number') {
    return symbol
  } else {
    return state[symbol]
  }
}

const TOO_FAR = 30000000

function execute (instructions) {
  let i = 0
  while (ir < instructions.length && i < TOO_FAR) {
    const instruction = instructions[ir]
    visitors[instruction.op](instruction)
    // console.log(ir)
    // console.log(instruction)
    // console.log (state)
    i++
  }

  return state
}

// const input = `
// cpy 41 a
// inc a
// inc a
// dec a
// jnz a 2
// dec a`

const input = loadInput('12.txt').trim()

pipe(input.trim().split('\n'),
  map(parse),
  toArray,
  execute,
  console.log
)
