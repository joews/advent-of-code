// Advent of code day 1

const input = 'R3, L5, R1, R2, L5, R2, R3, L2, L5, R5, L4, L3, R5, L1, R3, R4, R1, L3, R3, L2, L5, L2, R4, R5, R5, L4, L3, L3, R4, R4, R5, L5, L3, R2, R2, L3, L4, L5, R1, R3, L3, R2, L3, R5, L194, L2, L5, R2, R1, R1, L1, L5, L4, R4, R2, R2, L4, L1, R2, R53, R3, L5, R72, R2, L5, R3, L4, R187, L4, L5, L2, R1, R3, R5, L4, L4, R2, R5, L5, L4, L3, R5, L2, R1, R1, R4, L1, R2, L3, R5, L4, R2, L3, R1, L4, R4, L1, L2, R3, L1, L1, R4, R3, L4, R2, R5, L2, L3, L3, L1, R3, R5, R2, R3, R1, R2, L1, L4, L5, L2, R4, R5, L2, R4, R4, L3, R2, R1, L4, R3, L3, L4, L3, L1, R3, L2, R2, L4, L4, L5, R3, R5, R3, L2, R5, L2, L1, L5, L1, R2, R4, L5, R2, L4, L5, L4, L5, L2, L5, L4, R5, R3, R2, R2, L3, R3, L2, L5'

// const input = "R5, L5, R5, R3";

let east = 0
let north = 0

let heading = 0

input.split(', ').forEach(step => {
  const dir = step[0]
  const distance = parseInt(step.substr(1), 10)

  if (dir === 'L') heading -= 1
  if (dir === 'R') heading += 1
  if (heading < 0) heading = 4 + heading
  heading = heading % 4

  console.log(distance)

  if (heading === 0) north += distance
  else if (heading === 1) east += distance
  else if (heading === 2) north -= distance
  else if (heading === 3) east -= distance
  else throw new Error(heading + 'wat')
})

console.log(Math.abs(east) + Math.abs(north))
