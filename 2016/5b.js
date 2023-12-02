const md5 = require("md5");

const input = "ffykfhsq";
const LENGTH = 8;

let found = 0;
const passwordChars = [];
const fiveZeros = /^00000/;

for (let i = 0; found < LENGTH; i++) {
  const hash = md5(input + i);
  if (fiveZeros.test(hash)) {
    const index = parseInt(hash[5]);
    if (!isNaN(index) && index < 8 && passwordChars[index] === undefined) {
      passwordChars[index] = hash[6];
      found++;
    }
  }
}

console.log(passwordChars.join(""));
