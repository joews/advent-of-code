// Day 19a in procedural JS
const INPUT = 3018458

const elves = new Array(INPUT).fill(1)

let i = 0

while (true) {
  let elfIndex = i % INPUT

  if (elves[elfIndex] === 0) {
    // console.log(`elf ${now + 1} has no presents`)
  } else if (elves[elfIndex] === INPUT) {
    console.log(`elf ${elfIndex + 1} has all the presents`)
    break
  } else {
    // fast forward to find the next elf with gifts
    for (let j = 1; j < INPUT; j++) {
      let targetElfIndex = (elfIndex + j) % INPUT
      if (elves[targetElfIndex] > 0) {
        // we found an elf to steal from
        let presents = elves[targetElfIndex]
        elves[elfIndex] += presents
        elves[targetElfIndex] = 0

        // console.log(`elf ${now + 1} stole ${presents} from ${target + 1}`)
        break
      }
    }
  }

  i++
}
