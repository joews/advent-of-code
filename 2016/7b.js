const { loadInput } = require('./lib.js')

// stateful parser works better than regex for the inside/outside
// bracket restriction
function parse(line) {
	let inBrackets = false;
	const outs = []
	const ins = []

	for (const c of line) {
		if (c === "[") {
			inBrackets = true
			// add a sentinel so we don't accidentally match across
			// bracket-delimited regions
			outs.push("|")
		} else if (c === "]") {
			inBrackets = false
			ins.push("|")
		}	else if (inBrackets) {
			ins.push(c)
		} else {
			outs.push(c)
		}
	}

	return [line, outs.join(''), ins.join('')]
}

function isValid([line, outs, ins]) {
	// regex doesn't work so well for finding ABAs
	// because /([a-z])[a-z]\1/ advances the parser 2 characters
	// past the first A so we miss overlaps. That can be avoided with
	// lookaheads, e.g. /([a-z])(?=[a-z]\1)/. Then the matches have to 
	// be made with RegExp#exec in a while loop to get each match `index`.
	// Just writing a parser in a for loop is simpler.
	for (let i = 0; i < outs.length - 2; i ++) {
		const str = outs.substr(i, 3);

		// don't match the bracket change sentinel
		if (!/[a-z]{3}/.exec(str)) {
			continue;
		}

		const [a, b, c] = str;
		if (a === c && a !== b) {
			const bab = [b, a, b].join('')
			if (ins.indexOf(bab) >= 0) {
				return true
			}
		}
	}

	return false
}

const lines = loadInput('7.txt').trim().split('\n')

// const lines = [
// "aba[bab]xyz",
// "xyx[xyx]xyx",
// "aaa[kek]eke",
// "zazbz[bzb]cdb"
// ]

const result = lines.map(parse).filter(isValid).length;
console.log(result)
