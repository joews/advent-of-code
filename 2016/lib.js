const { readFileSync } = require("fs");
const { join } = require("path");

// 2023 - switch to local copy of fn for CommonJS modules
const fn = require("./fn.js");

module.exports = {
  fn,
  loadInput(filename) {
    return readFileSync(join(__dirname, "input", filename), "utf8");
  },
};
