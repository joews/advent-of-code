const { loadInput } = require('./lib.js')

// input
function parse (line) {
  let match
  if ((match = line.match(/\/dev\/grid\/node-x(\d+)-y(\d+)\s+(\d+)T\s+(\d+)T\s+(\d+)/)) !== null) {
    const [, x, y, size, used, avail] = match
    return { x: parseInt(x), y: parseInt(y, 10), size: parseInt(size, 10), used: parseInt(used, 10), avail: parseInt(avail, 10) }
  } else {
    return null
  }
}

// data structure
const WIDTH = 35
const HEIGHT = 29

function at (grid, x, y) {
  return grid[y + HEIGHT * x]
}

function neighbours (node) {
  const { x, y } = node

  const possible = []
  if (x > 0) possible.push(at(x - 1, y))
  if (x < WIDTH - 1) possible.push(at(x + 1, y))
  if (y > 0) possible.push(at(x, y - 1))
  if (y < HEIGHT - 1) possible.push(x, y + 1)

  return possible.filter(n => n.avail <= node.used)
}

// go

const input = loadInput('22.txt').trim().split('\n')
const grid = input.map(parse).filter(x => x)

at (grid, WIDTH - 1, 0).isGoal = true

// while (!grid[0].isGoal) {
//   // TODO!
// }