#!/usr/bin/env node --harmony_tailcalls

// Run with --harmony_tailcalls, which only works in strict mode
"use strict";
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
// because the hash changes with each room visit.
// Only withs with a big stack (node --stack-size=65500) or proper tail calls
// (--harmony_tailcalls + strict mode).
function search(passcode) {
  function visit(queue, solutions) {
    // console.log(queue.length)
    if (queue.length === 0) {
      return solutions;
    } else {
      const [head, ...tail] = queue;
      const [[x, y], code] = head;

      // stop this path when we reach the bottom corner for the first time
      return x === 3 && y === 3
        ? visit(tail, [...solutions, code])
        : visit([...tail, ...getNeighbours(head)], solutions);
    }
  }

  const startNode = [[0, 0], passcode];
  return visit([startNode], []);
}

function getLongestPathLength(passcode) {
  const paths = search(passcode);
  const longest = paths.sort((a, b) => b.length - a.length)[0];
  return longest.length - passcode.length;
}

const INPUT = "qtetzkpl";
console.log(getLongestPathLength(INPUT));
