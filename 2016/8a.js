const { loadInput, fn } = require('./lib.js')
const { pipe, map, filter, toArray } = fn

// Day 8
// In which I accidentally write a procedural matrix library.
// Next time i'm doing this in clojure.

//
// Matrix lib
//
function matrix (cols, rows) {
	const matrix = [...zeroes(rows)]
		.map(row => [...zeroes(cols)]);

	return Object.assign(matrix, { rows, cols })
}

function row (matrix, n) {
	return matrix[n]
}

function setRow(matrix, n, newRow) {
	matrix[n] = newRow
}

function col (matrix, n) {
	return matrix.map(row => row[n])
}

function setCol (matrix, n, newCol) {
	for (let i = 0; i < matrix.length; i ++) {
		matrix[i][n] = newCol[i]
	}
}

// return the sum of all of the cells in `matrix`
function sum (matrix) {
	return matrix.reduce((sum, row) =>
		sum + row.reduce((rowSum, cell) => rowSum + cell
	), 0)
}

function toString (matrix) {
	return matrix.map(row => 
		row.map(c => c ? "#" : ".").join("")
	).join("\n")
}

function print (matrix) {
	console.log(toString(matrix))
	return matrix
}

//
// Challenge logic
//
function parse (line) {
	let match;
	if (match = line.match(/^rect ([\d]+)x([\d]+)$/)) {
		const [, x, y] = match;
		return (matrix) => fill(matrix, +x, +y) 
	}

	if (match = line.match(/rotate ([\w]+) [xy]=([\d]+) by ([\d]+)/)) {
		const [, rowOrCol, index, delta] = match;
		return (matrix) => rotate(matrix, rowOrCol, +index, +delta)
	}

	throw new Error(`Could not parse line: ${line}`)
}

function fill (matrix, width, height) {
	console.log(`> fill ${width} x ${height}`)
	for (let x = 0; x < width; x ++) {
		for (let y = 0; y < height; y ++) {
			matrix[y][x] = 1
		}
	}

	return matrix;
}

function rotate(matrix, rowOrCol, index, delta) {
	switch (rowOrCol) {
		case "row":
			return rotateRow(matrix, index, delta)
		case "column": 
			return rotateColumn(matrix, index, delta)
		default:
			throw new Error(`expected "row" or "column"; got "${rowOrCol}"`)
	}
}

function rotateRow(matrix, n, delta) {
	console.log(`> rotate row ${n} by ${delta}`);
	setRow(matrix, n, rotateArray(row(matrix, n), delta))
	return matrix;
}

function rotateColumn(matrix, n, delta) {
	console.log(`> rotate col ${n} by ${delta}`)
	setCol(matrix, n, rotateArray(col(matrix, n), delta))
	return matrix;
}

function rotateArray (arr, delta) {
	return arr.map((e, i) => arr[mod(i - delta, arr.length)])
}

//
// Utils
//

// modulo over positive and negative numbers
function mod (n, m) {
	return ((n % m) + m) % m
}

function * zeroes (n) {
	for (let i = 0; i < n; i ++) {
		yield 0;
	}
}

// TODO add to fn
function last (iterable) {
	const arr = [...iterable]
	return arr[arr.length - 1]
}

//
// Input
//
const m = matrix(50, 6)
const lines = loadInput('8.txt').trim().split('\n')

// const m = matrix(7, 3)
// const lines = [
// 	"rect 3x2",
// 	"rotate column x=1 by 1",
// 	"rotate row y=0 by 4",
// 	"rotate column x=1 by 1"
// ]

//
// Go!
//
pipe(lines,
	map(parse),
	map(f => f(m)),
	// map(print),
	last,
	print,
	sum,
	console.log
)

