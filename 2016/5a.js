const md5 = require('md5')

const input = 'abbhdwsy'
const LENGTH = 8

const passwordChars = []
const fiveZeros = /^00000/

for (let i = 0; passwordChars.length < LENGTH; i++) {
  const hash = md5(input + i)
  if (fiveZeros.test(hash)) {
    passwordChars.push(hash[5])
  }
}

console.log(passwordChars.join(''))
