// Debug - write out 23 assembunny as JS

// Setup
let a = 0,
  b = 0,
  c = 0,
  d = 0;
a = 7;

// Start
// lines 1-4
b = a; // b = 7
b--; // b = 6
d = a; // d = 7
a = 0; // a = 0

// a = 0, b = 6, c = 0, d = 7
// code agrees

// lines 5-10
// repeat $d (7) times
// while (d > 0) {
//   c = b; // c = 6

// lines 6-8
//   // while (c > 0) {
//   //     a ++
//   //     c --
//   // }
//   // while loop becomes:
//   c = 0;
//   a = a + 6;

//   d--;
// }
// while loop becomes:
c = 0;
d = 0;
a = 42;

// State at this point (line 10)
// a = 42, b = 6, c = 0, d = 0
// code agrees

// line 11-13
b--; // b = 5
c = b; // c = 5
d = c; // d = 5

// Lines 14-16
while (d > 0) {
  d--;
  c++;
}
// while loop becomes:
c += d; // c = 10

// State at line 16:
// a = 42, b = 5, c = 10, d = 0
// code agrees

// Line 16
// toggle line 26 (null pointer)
