"use strict";
const md5 = require("md5");

const input = "yzbqklnj";
const target = "00000";

let i = 0;
while (!md5(input + i).startsWith(target)) {
  i++;
}

console.log(i);
