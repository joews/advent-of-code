// Disc #1 has 5 positions; at time=0, it is at position 2.
// Disc #2 has 13 positions; at time=0, it is at position 7.
// Disc #3 has 17 positions; at time=0, it is at position 10.
// Disc #4 has 3 positions; at time=0, it is at position 2.
// Disc #5 has 19 positions; at time=0, it is at position 9.
// Disc #6 has 7 positions; at time=0, it is at position 0.

const input = [
  [5, 2],
  [13, 7],
  [17, 10],
  [3, 2],
  [19, 9],
  [7, 0],
];

function done() {
  return input.every(
    ([size, position], i) => position === (input.length - i - 1) % size
  );
}

function step() {
  input.forEach(([size, position], i) => {
    input[i][1] = (position + 1) % size;
  });
}

let time = 0;
while (!done()) {
  time++;
  step();
}

console.log(time - input.length);
