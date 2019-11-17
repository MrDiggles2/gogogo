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
					resolve(data);
				}
			}
		);
	});
};

(async () => {
    let argsArray = process.argv.slice(2);

    let config = {};
    let fileArray = argsArray;

    if (argsArray[0] === '-c') {
        const configPath = path.join(process.cwd(), argsArray[1]);
        config = require(configPath);
        fileArray = argsArray.slice(2);
    }

    const drawer = new Drawer(config);
    const parser = new Parser();

    for (let i = 0; i < fileArray.length; i++) {
        const file = fileArray[i];
        const filePath = path.join(process.cwd(), file);
        const data = await getData(filePath);
        const board = parser.parse(data.split('\n'));

        drawer.drawBoard(board);
    }

    const outPath = path.join(process.cwd(), './out.svg');

    fs.writeFileSync(
        outPath,
        drawer.getSVG() + "\n"
    );

    console.log(`Output written to "${outPath}"`);
})();
