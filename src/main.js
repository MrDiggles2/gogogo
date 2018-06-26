
var fs = require('fs');
var path = require('path');
var Move = require('./Move');
var Board = require('./Board');

getData = async (filePath) => {
	return new Promise((resolve, reject) => {
		fs.readFile(
			filePath,
			{encoding: 'utf-8'},
			(err, data) => {
				if (err) {
					reject(err);
				} else {
					resolve(data.split("\n"));
				}
			}
		);
	});
};

sanatize = async (data) => {
	let ret = [];
	const moveRegexp = /\;([W|B])\[(..)\]/;
	const endOfGameRegexp = /(?<!C\[.)\)(?!.*\])/;

	for (let i = 0; i < data.length; i++) {
		let row = data[i];
		let parsedMove = moveRegexp.exec(row);

		if (parsedMove !== null) {
			if (parsedMove.length !== 3) {
				throw new Error(`Didn't parse the expected number of bits. Input ${row}, output: ${parsedMove.join(",")}`);
			}
			
			const color = parsedMove[1] === 'W' ? 'white' : 'black'
			const x = +parsedMove[2].substring(0, 1).charCodeAt(0) - 97;
			const y = +parsedMove[2].substring(1, 2).charCodeAt(0) - 97;
			
			ret.push(new Move(color, x, y));
		}

		const end = endOfGameRegexp.exec(row);
		if (end !== null) {
			break;
		}
	}

	return ret;
};

async function main(filePath) {
	let data = await getData(filePath);
	let sanatizedData = await sanatize(data);

	let board = new Board();
	sanatizedData.forEach(row => board.makeMove(row));
	console.log(board.toString());
};


const filePath = path.join(__dirname, process.argv[2]);
main(filePath);

console.log()