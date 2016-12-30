const { loadInput, fn } = require('./lib.js')
const { pipe, map, filter, reduce } = fn

const WIDTH = 35
const HEIGHT = 29

function parse (line) {
  let match
  if (match = line.match(/\/dev\/grid\/node-x(\d+)-y(\d+)\s+(\d+)T\s+(\d+)T\s+(\d+)/)) {
    const [, x, y, size, used, avail] = match
    return { x: parseInt(x), y: parseInt(y, 10), size: parseInt(size, 10), used: parseInt(used, 10), avail: parseInt(avail, 10) }
  } else {
    return null
  }
}


const input = loadInput('22.txt').trim().split('\n')

const parsed = input.map(parse).filter(x => x)

function at (grid, x, y) {
  return grid[y + (HEIGHT * x)]
}

let viable = 0

for (let xa = 0; xa < WIDTH; xa++) {
  for (let ya = 0; ya < HEIGHT; ya++) {
    for (let xb = 0; xb < WIDTH; xb++) {
      for (let yb = 0; yb < HEIGHT; yb++) {
        // a and b are not the same
        if (!(xa === xb && ya === yb)) {
          const a = at(parsed, xa, ya)
          const b = at(parsed, xb, yb)
          // a is not empty
          // a's used space would fit on b's available space
          if (a.used > 0 && a.used <= b.avail) {
            viable++
          }
        }
      }
    }
  }
}

console.log(viable)
