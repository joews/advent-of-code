const { loadInput } = require('./lib.js')

function parse (line) {
  let match
  if ((match = line.match(/\/dev\/grid\/node-x(\d+)-y(\d+)\s+(\d+)T\s+(\d+)T\s+(\d+)/)) !== null) {
    const [, x, y, size, used, avail] = match
    return { x: parseInt(x), y: parseInt(y, 10), size: parseInt(size, 10), used: parseInt(used, 10), avail: parseInt(avail, 10) }
  } else {
    return null
  }
}

const input = loadInput('22.txt').trim().split('\n')
const parsed = input.map(parse).filter(x => x)

const viablePairs = parsed.filter(a =>
  parsed.some(b =>
    a !== b && a.used > 0 && a.used <= b.avail))

console.log(viablePairs.length)
