#include <stdio.h>

// Brute force 20b with C
// I figured it would take less time to run that it would take to combine
// the conditions.

// Usage:
// gcc -O3 20b.c -o 20b.out && ./20b.out

// Generate input:
// # cat input/20.txt | perl -pe 's/([\d]+)-([\d]+)/if (i >= $1 && i <= $2) continue;/g' > ./20a_conditions.c

// 2016 timings (hardware unknown :-) )
// runs in 7 mins with O3
// runs in 18 mins with no optimisation
// JavaScript port runs in 31 mins

// 2023 
// Github Codespace: 40s

unsigned int result = 0;
unsigned int MAX = 4294967295;

int main (void) {
  for (unsigned int i = 0; i < MAX; i ++) {
    if (i % 10000000 == 0) {
        printf("Progress - %u\n", MAX - i);
    }

    #include "./20_conditions.c"
    result ++;
  }

  printf("Result: %u\n", result);
}

