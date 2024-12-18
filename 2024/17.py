# Part 2
target = [2, 4, 1, 7, 7, 5, 1, 7, 4, 6, 0, 3, 5, 5, 3, 0]


def exec(a_init):
    a = a_init
    b = 0
    c = 0

    out = [-1] * len(target)
    out_len = 0

    while a != 0:
        b = a % 8  # 2 4
        b = b ^ 7  # 1 7
        c = a // 2**b  # 7 5
        b = b ^ 7  # 1 7
        b = b ^ c  # 4 6
        a = a // 8  # 0 3

        o = b % 8
        if o != target[out_len]:
            return False

        out[out_len] = o
        out_len += 1

        if out_len > 8:
            print(out[:out_len])

    if out == target:
        print("found it")
        print(a_init)
        return True

    return False


# print("go")
for a in range(int(3.5 * 10**13), int(2.8 * 10**14)):
    if exec(a):
        break


# def part1(a_init):
#     # Part 1
#     a = a_init
#     b = 0
#     c = 0

#     out = []
#     o = 0
#     i = 0

#     while a != 0:
#         i += 1

#         b = a % 8  # 2 4
#         b = b ^ 7  # 1 7
#         c = a // 2**b  # 7 5
#         b = b ^ 7  # 1 7
#         b = b ^ c  # 4 6
#         a = a // 2**3  # 0 3
#         o += 1

#     print(o)

# 1035089,1035092,8086,4041,4046,508,27,24,3
# 7,7,1,4,4,6,0,0,7
# 1,4,6,1,6,4,3,0,3


# Need 16 output values
# Try some big numbers to approximate a range
# -> somewhere in range 10^14
# Start 3.5 * 10**13
# End 2.8 * 10**14
# part1(int(2.9 * 10**14))
