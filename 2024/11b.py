# Part 2
from itertools import chain
import math
import time

input_str = "814 1183689 0 1 766231 4091 93836 46"

input = [int(c) for c in input_str.split(" ")]
CYCLES = 75


def cycle(stone, cycles):
    # print(" -> cycle", cycles)

    if cycles == 0:
        return 1

    if stone == 0:
        return cycle(1, cycles - 1)

    num_digits = math.floor(math.log10(stone)) + 1
    if num_digits % 2 == 0:
        divisor = 10 ** (num_digits // 2)
        first_half = stone // divisor
        second_half = stone % divisor
        return cycle(first_half, cycles - 1) + cycle(second_half, cycles - 1)

    return cycle(stone * 2024, cycles - 1)


result = 0
for s in input:
    print("stone", s)
    result += cycle(s, CYCLES)

print(result)
