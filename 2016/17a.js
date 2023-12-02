const md5 = require("md5");

// Day 17a in pure functional JavaScript

// returns [up, down, left, right]
function getSides(path) {
  return md5(path).substr(0, 4).split("").map(isOpen);
}

function isOpen(sideChar) {
  return /^[bcdef]$/.test(sideChar);
}

function getNeighbours([[x, y], path]) {
  const [upOpen, downOpen, leftOpen, rightOpen] = getSides(path);

  // TODO find a cleaner functional pattern for predicated list construction
  return [
    y > 0 && upOpen && [[x, y - 1], path + "U"],
    y < 3 && downOpen && [[x, y + 1], path + "D"],
    x > 0 && leftOpen && [[x - 1, y], path + "L"],
    x < 3 && rightOpen && [[x + 1, y], path + "R"],
  ].filter((x) => x);
}

// Functional, tail recursive BFS with no removal of visited nodes
// because the hash changes with each room visit
function search(passcode) {
  function visit([head, ...tail]) {
    const [[x, y], code] = head;

    // stop at the shortest path to the bottom right corner
    return x === 3 && y === 3 ? code : visit([...tail, ...getNeighbours(head)]);
  }

  return visit([[[0, 0], passcode]]);
}

const INPUT = "qtetzkpl";
console.log(search(INPUT).replace(INPUT, ""));
