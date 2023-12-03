// Day 21b hack

function swap(i, j, chars) {
  const lastI = chars[i];
  chars[i] = chars[j];
  chars[j] = lastI;
  return chars;
}

function swapChars(a, b, chars) {
  return chars.map((c) => {
    if (c === a) return b;
    if (c === b) return a;
    return c;
  });
}

function rotate(dir, n, chars) {
  const start = n % chars.length;
  if (dir === "left") {
    return chars.concat(chars).slice(start, start + chars.length);
  } else if (dir === "right") {
    return rotate("left", chars.length - (n % chars.length), chars);
  } else {
    throw new Error(`wat ${dir}`);
  }
}

function rotatePosition(c, chars) {
  const i = chars.indexOf(c);
  const boost = i >= 4 ? 2 : 1;
  return rotate("right", i + boost, chars);
}

function reverseRange(start, end, chars) {
  const range = chars.slice(start, end + 1).reverse();
  chars.splice(start, range.length, ...range);
  return chars;
}

function move(x, y, chars) {
  const [moved] = chars.splice(x, 1);
  chars.splice(y, 0, moved);
  return chars;
}

function execute(input) {
  // generated by 21b_helper.js
  input = rotate("right", 3, input);
  input = swapChars("b", "a", input);
  input = move(3, 4, input);
  input = swap(0, 7, input);
  input = swapChars("f", "h", input);
  input = rotatePosition("f", input);
  input = rotatePosition("b", input);
  input = swap(3, 0, input);
  input = swap(6, 1, input);
  input = move(4, 0, input);
  input = rotatePosition("d", input);
  input = swapChars("d", "h", input);
  input = reverseRange(5, 6, input);
  input = rotatePosition("h", input);
  input = reverseRange(4, 5, input);
  input = move(3, 6, input);
  input = rotatePosition("e", input);
  input = rotatePosition("c", input);
  input = rotate("right", 2, input);
  input = reverseRange(5, 6, input);
  input = rotate("right", 3, input);
  input = rotatePosition("b", input);
  input = rotate("right", 5, input);
  input = swap(5, 6, input);
  input = move(6, 4, input);
  input = rotate("left", 0, input);
  input = swap(3, 5, input);
  input = move(4, 7, input);
  input = reverseRange(0, 7, input);
  input = rotate("left", 4, input);
  input = rotatePosition("d", input);
  input = rotate("left", 3, input);
  input = swap(0, 7, input);
  input = rotatePosition("e", input);
  input = swapChars("e", "a", input);
  input = rotatePosition("c", input);
  input = swap(3, 2, input);
  input = rotatePosition("d", input);
  input = reverseRange(2, 4, input);
  input = rotatePosition("g", input);
  input = move(3, 0, input);
  input = move(3, 5, input);
  input = swapChars("b", "d", input);
  input = reverseRange(1, 5, input);
  input = reverseRange(0, 1, input);
  input = rotatePosition("a", input);
  input = reverseRange(2, 5, input);
  input = swap(1, 6, input);
  input = swapChars("f", "e", input);
  input = swap(5, 1, input);
  input = rotatePosition("a", input);
  input = move(1, 6, input);
  input = swapChars("e", "d", input);
  input = reverseRange(4, 7, input);
  input = swap(7, 5, input);
  input = swapChars("c", "g", input);
  input = swapChars("e", "g", input);
  input = rotate("left", 4, input);
  input = swapChars("c", "a", input);
  input = rotate("left", 0, input);
  input = swap(0, 1, input);
  input = reverseRange(1, 4, input);
  input = rotatePosition("d", input);
  input = swap(4, 2, input);
  input = rotate("right", 0, input);
  input = swap(1, 0, input);
  input = swapChars("c", "a", input);
  input = swap(7, 3, input);
  input = swapChars("a", "f", input);
  input = reverseRange(3, 7, input);
  input = rotate("right", 1, input);
  input = swapChars("h", "c", input);
  input = move(1, 3, input);
  input = swap(4, 2, input);
  input = rotatePosition("b", input);
  input = reverseRange(5, 6, input);
  input = move(5, 3, input);
  input = swapChars("b", "g", input);
  input = rotate("right", 6, input);
  input = reverseRange(6, 7, input);
  input = swap(2, 5, input);
  input = rotatePosition("e", input);
  input = swap(1, 7, input);
  input = swap(1, 5, input);
  input = reverseRange(2, 7, input);
  input = reverseRange(5, 7, input);
  input = rotate("left", 3, input);
  input = rotatePosition("b", input);
  input = rotate("left", 3, input);
  input = swapChars("e", "c", input);
  input = rotatePosition("a", input);
  input = swapChars("f", "a", input);
  input = swap(0, 6, input);
  input = swap(4, 7, input);
  input = reverseRange(0, 5, input);
  input = reverseRange(3, 5, input);
  input = swapChars("d", "e", input);
  input = move(0, 7, input);
  input = move(1, 3, input);
  input = reverseRange(4, 7, input);

  return input;
}

// sanity check
// console.log(execute('abcdefgh'.split('')).join(''))

// brute force

// permute credit Andreas Wong on Stack Overflow
// http://stackoverflow.com/a/9960925/2806996
var permArr = [],
  usedChars = [];

function permute(input) {
  var i, ch;
  for (i = 0; i < input.length; i++) {
    ch = input.splice(i, 1)[0];
    usedChars.push(ch);
    if (input.length == 0) {
      permArr.push(usedChars.slice());
    }
    permute(input);
    input.splice(i, 0, ch);
    usedChars.pop();
  }
  return permArr;
}

const target = "fbgdceah".split("");
const permutations = permute(target);

for (let i = 0; i < permutations.length; i++) {
  // most of the hash mutate their argument
  let test = permutations[i].slice();
  let p = execute(test);

  // lazy array equality, quick enough
  if (p.toString() === target.toString()) {
    console.log(permutations[i].join(""));
    break;
  }
}
