// Disc #1 has 13 positions; at time=0, it is at position 1.
// Disc #2 has 19 positions; at time=0, it is at position 10.
// Disc #3 has 3 positions; at time=0, it is at position 2.
// Disc #4 has 7 positions; at time=0, it is at position 1.
// Disc #5 has 5 positions; at time=0, it is at position 3.
// Disc #6 has 17 positions; at time=0, it is at position 5.

const input = [
  [13, 1],
  [19, 10],
  [3, 2],
  [7, 1],
  [5, 3],
  [17, 5],
  [11, 0]
]

function done () {
  return input.every(([size, position], i) => 
    position === (input.length - i - 1) % size
  )
}

function step () {
  input.forEach(([size, position], i) => {
    input[i][1] = (position + 1) % size
  })
}

let time = 0
while (!done()) {
  time++
  step()
}

console.log(time - input.length)
