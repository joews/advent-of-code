const { loadInput, fn } = require('./lib.js')
const { pipe, map, filter, reduce, toArray } = fn


// Day 9
// Decompression with input and output generators
// The tokeniser and parser are stateful parsers, which ended up with a lot of procedural code
// behind the generator interfaces. Simple string iteration with an explicit index
// would probably have been simpler.
// TODO: avoid slurping the input to make this a proper stream algorithm
// This is hard because Node streams are async and generators are sync.
// I think it can be done with co.

// A character stream
function * tokenise (str) {
	for (let i = 0; i < str.length; i ++) {
		if (!/\s/.test(input[i])) {
			yield input[i]
		}
	}
}

// instruction stream
function * parse (tokens) {
	let inMarker = false;
	let inRegion = false;
	let remainingRegionChars = -1;

	let markerBuffer = ""

	for (const token of tokens) {

		if (inRegion) {
			remainingRegionChars -= 1
			if (remainingRegionChars === 0) {
				inRegion = false
				remainingRegionChars -1
			}
		}

		switch (token) {
			case "(":
				if (!inRegion) {
					inMarker = true
					break
				}
				// else fall through to char
			case ")":
				if (!inRegion) {
					const marker = makeMarkerInstruction(markerBuffer)
					yield marker

					markerBuffer = ""
					inMarker = false

					inRegion = true
					remainingRegionChars = marker.length
					break
				}
				// else fall through to char
			default:
				if (inMarker) {
					markerBuffer += token
				} else {
					yield makeCharInstruction(token)
				}
		}
	}
}

// data structure factories
function makeMarkerInstruction (markerString) {
	const match = markerString.match(/(\d+)x(\d+)/)
	if (match) {
		const [, length, repeats] = match
		return { type: "MARKER", length: parseInt(length, 10), repeats: parseInt(repeats, 10) }
	} else {
		throw new Error("Bad marker: " + markerString)
	}
}

function makeCharInstruction (value) {
	return { type: "CHAR", value }
}

// process instructions to emit a stream of decompressed data
function * decompress (instructions) {
	let position = 0;

	let marker = null
	let remainingChars = -1;
	let buffer = "";

	for (const instruction of instructions) {
		// console.log(instruction)

		switch (instruction.type) {
			case "MARKER":
				marker = instruction
				remainingChars = marker.length
				break
			case "CHAR":
				if (marker) {
					if (remainingChars > 1) {
						// console.log(` - char marker ${remainingChars} left`)
						remainingChars -= 1
						buffer += instruction.value
					} else if (remainingChars === 1) {
						// console.log(` - char marker full`)
						buffer += instruction.value
						yield buffer.repeat(marker.repeats)

						remainingChars = -1
						marker = null
						buffer = ""
					} else {
						throw new Error("Marker buffer in invalid state")
					}
				} else {
					// console.log(` - char no marker`)
					yield instruction.value
				}
				break
			default:
				throw new Error("bad instruction: " + JSON.stringify(instruction))
		}
	}

	if (buffer.length > 0) {
		yield buffer;
	}
	
}

const input = loadInput("9.txt").trim();
// const input = "ADVENT A(1x5)BC (3x3)XYZ A(2x2)BCD(2x2)EFG (6x1)(1x3)A X(8x2)(3x3)ABCY"
// const input = "ADVENT"
// const input = "A(1x5)BC"
// const input = "A(2x2)BCD(2x2)EFG"
// const input = "(6x1)(1x3)A" 
// const input = "X(8x4)(3x3)ABC(1x2)Y" // FIXME bug here - the marker starting after repeat isn't caught

const result = pipe(input,
	tokenise,
	parse,
	decompress,
	reduce((sum, chunk) => sum + chunk.length, 0),
	console.log
)