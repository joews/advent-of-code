const { readFileSync } = require('fs')
const { join } = require('path')

// babel for fn imports
require('babel-register')({ ignore: false })
const fn = require('fn')

module.exports = {
  fn,
  loadInput (filename) {
    return readFileSync(join(__dirname, 'input', filename), 'utf8')
  }
}
