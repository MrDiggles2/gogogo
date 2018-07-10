var fs = require('fs');
var path = require('path');
var Parser = require('../src/Parser');
var Drawer = require('../src/Drawer');

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

    const fileArray = process.argv.slice(2);
    const parser = new Parser();

    const drawer = new Drawer({
        unit: 20,
        spacing: 3,
        margin: 3,
        radiusRatio: 0.6,
        vertical: true,

        background: '#000000',
        black: '#505050',
        white: '#FFFFFF',
        outline: 'rgba(0,0,0,0)',
    });

    for (let i = 0; i < fileArray.length; i++) {
        const file = fileArray[i];
	    const filePath = path.join(process.cwd(), file);
        const data = await getData(filePath);
        const board = parser.parse(data);

        drawer.drawBoard(board);
    }

    console.log(drawer.getSVG());
})()
.catch(console.error);