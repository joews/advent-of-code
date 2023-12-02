// Day 19b in procedural JS

// This was difficult! my first thought was to use JS Arrays, and resize with `splice` each time
// we remove an elf. But slice is O(N) so the algorithm goes O(N^2), which is not tenable for this
// puzzle's input. So I tried to keep a constant sized array, nulling out the removed elves. That
// nearly worked but I couldn't get the modulo arithmetic to calculate the opposite elf right.
// Then I realised that the first approach was far simpler, just with the wrong data structure. So
// I implemented a tiny circular, mutable, doubly-linked list. It has O(1) node removal (with an
// external reference to a node and O(1) empty check, so the overall algorithm is O(N) (runs in < 1s).
// It's important to track the current and opposite elves to avoid an expensive seek from the current
// elf to its opposite on each turn.

// const INPUT = 5
const INPUT = 3017957;

//
// Data structure
//

// mutable circular doubly-linked list
// - constant time delete and empty check
function makeList(length) {
  // nodes: [prev, value, next]
  let first = [null, 1, null];
  let last = first;
  let next;

  for (let i = 1; i < length; i++) {
    next = [last, i + 1, null];
    last[2] = next;
    last = next;
  }

  // join the circle
  next[2] = first;
  first[0] = last;

  return first;
}

function remove(node) {
  const [prev, , next] = node;

  // single element list
  if (node === next) {
    node[2] = null;
    node[0] = null;
  } else {
    // connect the next and previous nodes
    prev[2] = node[2];
    node[2][0] = prev;
  }
}

function value(node) {
  return node[1];
}

function next(node) {
  return node[2];
}

// return the node that is `n` positions from `node`
function seek(node, n) {
  let target = node;
  for (let i = 0; i < n; i++) {
    target = next(target);
  }

  return target;
}

//
// Puzzle state
//
const elves = makeList(INPUT);

let remainingElfCount = INPUT;
let currentElf = elves;

// the distance from the current elf to the elf opposite
let distanceToOpposite = Math.floor(remainingElfCount / 2);

// seek (O(N)) to set the initial opposite index
// we track opposites through the algorithm so that subsequent seeks are smaller
let opposite = seek(currentElf, distanceToOpposite);

//
// Main loop
//
while (currentElf !== null && remainingElfCount > 1) {
  // console.log(`elf ${node[1]} steals from elf ${opposite[1]}, who leaves`)
  remove(opposite);

  // set state for the next iteration
  currentElf = next(currentElf);
  remainingElfCount--;

  // seeking from the current elf to its opposite is too slow (seek is O(N) so the main loop is O(N^2)).
  // instead work out the distance from the last opposite node to the new opposite, which is O(1) because
  // they are a small number of nodes appart.
  const fromNodeToLastOpposite = distanceToOpposite - 1;
  const fromNodeToNewOpposite = Math.floor(remainingElfCount / 2);
  const oldOppositeToNewOpposite =
    fromNodeToNewOpposite - fromNodeToLastOpposite + 1;

  distanceToOpposite = Math.floor(remainingElfCount / 2);
  opposite = seek(opposite, oldOppositeToNewOpposite);

  // the simpler, slower N^2 version:
  // opposite = seek(node, seekToOpposite)
}

console.log(`Last elf standing:`, value(currentElf));
