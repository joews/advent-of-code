const { loadInput, fn } = require("./lib.js");
const { pipe, map, toArray } = fn;

// Day 23

//
// Parser
//
function parse(line) {
  const match = line.match(/(\S+) (\S+)(?: (\S+))?/);
  const [, op, arg1, arg2] = match;
  return {
    op,
    arg1: parseArg(arg1),
    arg2: parseArg(arg2),
  };
}

function parseArg(raw) {
  if (!raw) return null;
  const asNum = parseInt(raw, 10);
  if (isNaN(asNum)) {
    // register
    return raw;
  } else {
    // int
    return asNum;
  }
}

//
// Interpreter
//

// Part A
const state = { a: 0, b: 0, c: 0, d: 0 };

let ir = 0;
let instructions;

const visitors = {
  cpy({ arg1: source, arg2: reg }) {
    // Check that this hasn't been tgl-d into a meaningless instruction
    if (!isLiteral(reg)) {
      state[reg] = resolve(source);
    }

    ir++;
  },

  inc({ arg1: reg }) {
    // Check that this hasn't been tgl-d into a meaningless instruction
    if (!isLiteral(reg)) {
      state[reg] = state[reg] + 1;
    }

    ir++;
  },

  dec({ arg1: reg }) {
    // Check that this hasn't been tgl-d into a meaningless instruction
    if (!isLiteral(reg)) {
      state[reg] = state[reg] - 1;
    }

    ir++;
  },

  jnz({ arg1: check, arg2: delta }) {
    if (resolve(check) != 0) {
      ir = ir + resolve(delta);
    } else {
      ir++;
    }
  },

  dump() {
    console.log(state);
    ir++;
  },

  tgl({ arg1: offset }) {
    const target = instructions[ir + resolve(offset)];

    // Check for bad pointer
    if (target) {
      switch (target.op) {
        case "dump": {
          break;
        }
        case "inc": {
          target.op = "dec";
          break;
        }
        case "dec": {
          target.op = "inc";
          break;
        }
        case "tgl": {
          target.op = "inc";
          break;
        }
        case "jnz": {
          target.op = "cpy";
          break;
        }
        case "cpy": {
          target.op = "jnz";
          break;
        }
        default: {
          throw new Error(`Unknown op [${target.op}]`);
        }
      }
    }

    ir++;
  },
};

function isLiteral(symbol) {
  return typeof symbol === "number";
}

function resolve(symbol) {
  if (isLiteral(symbol)) {
    return symbol;
  } else {
    return state[symbol];
  }
}

const TOO_FAR = 30000000;

function execute(inputInstructions) {
  let i = 0;

  ir = 0;
  instructions = inputInstructions;

  while (ir < instructions.length && i < TOO_FAR) {
    const instruction = instructions[ir];
    // console.log(ir + 1, input[ir]); // log line no
    visitors[instruction.op](instruction);
    // console.log(`-> `, state);
    i++;
  }

  if (i === TOO_FAR) {
    console.log(`Aborted after ${TOO_FAR} steps.`);
  }

  return state;
}

// const input = `cpy 2 a
// tgl a
// tgl a
// tgl a
// cpy 1 a
// dec a
// dec a`.split("\n");

// Part A
state.a = 7;

const input = loadInput("23.txt").trim().split("\n");
pipe(input, map(parse), toArray, execute, console.log);
