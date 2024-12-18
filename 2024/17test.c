#include <stdio.h>
#include <stdlib.h>
#include <time.h>

// #define TIMING_INTERVAL 1'000'000'000
#define TIMING_INTERVAL 1000000000



// Target array to match
unsigned long target[] = {0, 3, 5, 4, 3, 0};

int TARGET_LEN = sizeof(target) / sizeof(target[0]);

int exec(unsigned long a_init) {
    unsigned long a = a_init;
    unsigned long b = 0;
    unsigned long c = 0;
    int out_len = 0;

    while (a != 0) { 
        a = a >> 3;          // 0,3
        int o = a % 8;      // 5,4

        printf("%d,", o);

        if (o != target[out_len]) {
            return 0;
        }
        
        out_len++;
    } // 3,0 
    printf("\n");

    return 1;
}

int main() {
    unsigned long start_a = 110000;
    unsigned long end_a =   117440 * 2;

    struct timespec start, interval_start, interval_end;
    long long total_ms, interval_ms;
    clock_gettime(CLOCK_MONOTONIC, &start);
    interval_start = start;

    printf("ok go\n");
    // printf("%ld\n", interval_start.tv_nsec);

    long i = 0;
    for (unsigned long a = start_a; a < end_a; a++) {
        if (i % TIMING_INTERVAL == 0) {
            clock_gettime(CLOCK_MONOTONIC, &interval_end);
            interval_ms = (interval_end.tv_sec - interval_start.tv_sec) * 1000 +
                          (interval_end.tv_nsec - interval_start.tv_nsec) / 1000000;

            // printf("Interval %d (iterations %d to %d):\n", 
            //        (i + 1) / TIMING_INTERVAL, 
            //        i - TIMING_INTERVAL + 1, 
            //        i);
            // printf("%lldms\n", interval_ms);

            interval_start = interval_end;
        }

        if (exec(a)) {
            printf("Solution:\n");
            printf("%ld\n", a);
            break;
        }

        i ++;
    }
    return 0;
}