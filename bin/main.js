var fs = require('fs');
var path = require('path');
var Parser = require('../src/Parser');

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

(async () => {
	const filePath = path.join(process.cwd(), process.argv[2]);
	console.log(`Reading from: ${filePath}`);
	const data = await getData(filePath);
	const parser = new Parser();
	const board = parser.parse(data);
	console.log(board.toString());
})()
.catch(console.error);