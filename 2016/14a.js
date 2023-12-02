const md5 = require("md5");

const INPUT = "ahsbgdzn";

function hash(i) {
  return md5(`${INPUT}${i}`);
}

function isKey(i) {
  const hash = table[i];
  const has3 = hash.match(/(.)\1\1/);
  if (has3) {
    for (let j = i + 1; j < i + 1001; j++) {
      if (table[j].match(`${has3[1]}{5}`)) {
        return true;
      }
    }
  }

  return false;
}

// generate a lookup table upfront
const N = 1e5;
const table = new Array(N);

for (let i = 0; i < N + 1000; i++) {
  table[i] = hash(i);
}

let found = 0;
for (let i = 0; i < N; i++) {
  if (isKey(i)) {
    console.log(i);
    found++;
  }

  if (found === 64) {
    break;
  }
}

console.log(`Found ${found} keys in ${N} hashes`);
