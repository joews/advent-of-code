// Day 21b hack

function swap (i, j, chars) {
  const lastI = chars[i]
  chars[i] = chars[j]
  chars[j] = lastI
  return chars
}

function swapChars (a, b, chars) {
  return chars.map(c => {
    if (c === a) return b
    if (c === b) return a
    return c
  })
}

function rotate (dir, n, chars) {
  const start = n % chars.length
  if (dir === 'left') {
    return chars.concat(chars).slice(start, start + chars.length)
  } else if (dir === 'right') {
    return rotate('left', chars.length - (n % chars.length), chars)
  } else {
    throw new Error(`wat ${dir}`)
  }
}

function rotatePosition (c, chars) {
  const i = chars.indexOf(c)
  const boost = i >= 4 ? 2 : 1
  return rotate('right', i + boost, chars)
}

function reverseRange (start, end, chars) {
  const range = chars.slice(start, end + 1).reverse()
  chars.splice(start, range.length, ...range)
  return chars
}

function move (x, y, chars) {
  const [moved] = chars.splice(x, 1)
  chars.splice(y, 0, moved)
  return chars
}

function execute (input) {
  input = move(0, 3, input)
  input = rotate('right', 0, input)
  input = rotate('right', 1, input)
  input = move(1, 5, input)
  input = swapChars('h', 'b', input)
  input = reverseRange(1, 3, input)
  input = swapChars('a', 'g', input)
  input = swapChars('b', 'h', input)
  input = rotatePosition('c', input)
  input = swapChars('d', 'c', input)
  input = rotatePosition('c', input)
  input = swap(6, 5, input)
  input = rotate('right', 7, input)
  input = swapChars('b', 'h', input)
  input = move(4, 3, input)
  input = swap(1, 0, input)
  input = swap(7, 5, input)
  input = move(7, 1, input)
  input = swapChars('c', 'a', input)
  input = move(7, 5, input)
  input = rotate('right', 4, input)
  input = swap(0, 5, input)
  input = move(3, 1, input)
  input = swapChars('c', 'h', input)
  input = rotatePosition('d', input)
  input = reverseRange(0, 2, input)
  input = rotatePosition('g', input)
  input = move(6, 7, input)
  input = move(2, 5, input)
  input = swap(1, 0, input)
  input = swapChars('f', 'c', input)
  input = rotate('right', 1, input)
  input = reverseRange(2, 4, input)
  input = rotate('left', 1, input)
  input = rotatePosition('h', input)
  input = rotate('right', 1, input)
  input = rotate('right', 5, input)
  input = swap(6, 3, input)
  input = move(0, 5, input)
  input = swapChars('g', 'f', input)
  input = reverseRange(2, 7, input)
  input = reverseRange(4, 6, input)
  input = swap(4, 1, input)
  input = move(2, 1, input)
  input = move(3, 1, input)
  input = swapChars('b', 'a', input)
  input = rotatePosition('b', input)
  input = reverseRange(3, 5, input)
  input = move(0, 2, input)
  input = rotatePosition('b', input)
  input = reverseRange(4, 5, input)
  input = rotatePosition('g', input)
  input = reverseRange(0, 5, input)
  input = swapChars('h', 'c', input)
  input = reverseRange(2, 5, input)
  input = swap(7, 5, input)
  input = swapChars('g', 'd', input)
  input = swapChars('d', 'e', input)
  input = move(1, 2, input)
  input = move(3, 2, input)
  input = swapChars('d', 'g', input)
  input = swap(3, 7, input)
  input = swapChars('b', 'f', input)
  input = rotate('right', 3, input)
  input = move(5, 3, input)
  input = move(1, 2, input)
  input = rotatePosition('b', input)
  input = rotatePosition('c', input)
  input = reverseRange(2, 3, input)
  input = move(2, 3, input)
  input = rotate('right', 1, input)
  input = move(7, 0, input)
  input = rotate('right', 3, input)
  input = move(6, 3, input)
  input = rotatePosition('e', input)
  input = swapChars('c', 'b', input)
  input = swapChars('f', 'd', input)
  input = swap(2, 5, input)
  input = swapChars('f', 'g', input)
  input = rotatePosition('a', input)
  input = reverseRange(3, 4, input)
  input = rotate('left', 7, input)
  input = rotate('left', 6, input)
  input = swapChars('g', 'b', input)
  input = reverseRange(3, 6, input)
  input = rotate('right', 6, input)
  input = rotatePosition('c', input)
  input = rotatePosition('b', input)
  input = rotate('left', 1, input)
  input = reverseRange(3, 7, input)
  input = swapChars('f', 'g', input)
  input = swap(4, 1, input)
  input = rotatePosition('d', input)
  input = move(0, 4, input)
  input = swap(7, 6, input)
  input = rotate('right', 6, input)
  input = rotatePosition('e', input)
  input = move(7, 3, input)
  input = rotate('right', 3, input)
  input = swap(1, 2, input)
  return input
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
  return permArr
};

const target = 'fbgdceah'.split('');
const permutations = permute(target);

for (let i = 0; i< permutations.length; i ++) {
  // most of the hash mutate their argument
  let test = permutations[i].slice()
  let p = execute(test)
 
  // lazy array equality, quick enough
  if (p.toString() === target.toString()) {
    console.log(permutations[i].join(""))
    break
  }
}