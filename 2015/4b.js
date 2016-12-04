"use strict"
const md5 = require("md5")

const input = "iwrupvqb"
const target = "000000";

let i = 0;
while(!md5(input + i).startsWith(target)) {
  i ++;
}

console.log(i);
