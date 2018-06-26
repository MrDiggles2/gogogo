var fs = require('fs');
var path = require('path');
var Parser = require('../src/Parser');
var svg = require('svg-builder')



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

	const data = await getData(filePath);
	const parser = new Parser();
	const board = parser.parse(data);

	const builder = svg.newInstance();
	const unit = 50;
	builder.width(unit * 19).height(unit * 19);

	board.boardArray.forEach((row, i) => {
		row.forEach((entry, j) => {
			if (entry === null) return;

			builder.circle({
				r: unit / 2,
				fill: entry.color === 'black' ? '#00000' : '#FFFFFF',
				'stroke-width': 1,
				stroke: '#808080',
				cx: i * unit + unit/2,
				cy: j * unit + unit/2,
			});
		});
	});

	console.log(builder.render());
})()
.catch(console.error);