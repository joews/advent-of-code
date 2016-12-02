// Advent of code day 1

const input = 'R3, L5, R1, R2, L5, R2, R3, L2, L5, R5, L4, L3, R5, L1, R3, R4, R1, L3, R3, L2, L5, L2, R4, R5, R5, L4, L3, L3, R4, R4, R5, L5, L3, R2, R2, L3, L4, L5, R1, R3, L3, R2, L3, R5, L194, L2, L5, R2, R1, R1, L1, L5, L4, R4, R2, R2, L4, L1, R2, R53, R3, L5, R72, R2, L5, R3, L4, R187, L4, L5, L2, R1, R3, R5, L4, L4, R2, R5, L5, L4, L3, R5, L2, R1, R1, R4, L1, R2, L3, R5, L4, R2, L3, R1, L4, R4, L1, L2, R3, L1, L1, R4, R3, L4, R2, R5, L2, L3, L3, L1, R3, R5, R2, R3, R1, R2, L1, L4, L5, L2, R4, R5, L2, R4, R4, L3, R2, R1, L4, R3, L3, L4, L3, L1, R3, L2, R2, L4, L4, L5, R3, R5, R3, L2, R5, L2, L1, L5, L1, R2, R4, L5, R2, L4, L5, L4, L5, L2, L5, L4, R5, R3, R2, R2, L3, R3, L2, L5'

// const input = "R8, R4, R4, R8";

const pos = {
  x: 0,
  y: 0
}

const visited = new Set()
let heading = 0

let deltas = [
  ['x', 1],
  ['y', 1],
  ['x', -1],
  ['y', -1]
]

input.split(', ').some(step => {
  const dir = step[0]
  const distance = parseInt(step.substr(1), 10)

  if (dir === 'L') heading -= 1
  if (dir === 'R') heading += 1
  if (heading < 0) heading = 4 + heading // no % on negative numbers
  heading = heading % 4

  const [axis, n] = deltas[heading]

  for (let i = 0; i < distance; i++) {
    pos[axis] += n
    const key = `${pos.x},${pos.y}`
    if (visited.has(key)) {
      console.log('hit at: ' + key)

      // comment out this line to not break at the first repeat, and get the part 1 answer again!
      return true
    } else {
      visited.add(key)
    }
  }
})

console.log(Math.abs(pos.x) + Math.abs(pos.y))
