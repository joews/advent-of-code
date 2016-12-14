const md5 = require('md5')

const INPUT = 'zpqevtbw'

function hash (i) {
  if (table[i]) return table[i]

  let h = md5(`${INPUT}${i}`)
  for (let i = 0; i < 2016; i++) {
    h = md5(h)
  }

  return h
}

function isKey (i) {
  const hash = table[i]
  const has3 = hash.match(/(.)\1\1/)
  if (has3) {
    for (let j = i + 1; j < i + 1001; j++) {
      if (table[j].match(`${has3[1]}{5}`)) {
        return true
      }
    }
  }

  return false
}

// generate a lookup table upfront
// guess N is similar to last time
const N = 2.5e4
const table = new Array(N)

console.log('building table')
for (let i = 0; i < N + 1000; i++) {
  if (i % 500 === 0) console.log(i)
  table[i] = hash(i)
}

console.log('done building table')

let found = 0
for (let i = 0; i < N; i++) {
  if (isKey(i)) {
    console.log(i)
    found++
  }

  if (found === 64) {
    break
  }
}

console.log(`Found ${found} keys in ${N} hashes`)
