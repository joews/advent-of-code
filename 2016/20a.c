#include <stdio.h>

// Brute force 20a with C
// I figured it would take less time to run that it would take to combine
// the conditions. 

// runs in about 3s.
// runs in about 7s with no optimisation.

// Usage
// gcc -O3 20a.c -o 20a.out && ./20a.out

// Generate input:
// # cat input/20.txt | perl -pe 's/([\d]+)-([\d]+)/if (i >= $1 && i <= $2) continue;/g' > ./20a_conditions.c

int main (void) {
  for (unsigned int i = 0; i < 4294967295; i ++) {
    #include "./20_conditions.c"

    printf("%u\n", i);
    break;
  }
}


