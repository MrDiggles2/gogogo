
var Move = require('./Move');
var Board = require('./Board');

module.exports = class Parser {

    parse(lines) {
        let board = new Board();
        let moves = [];

        const moveRegexp = /\;([W|B])\[(..)\]/;
        const endOfGameRegexp = /(?<!C\[.)\)(?!.*\])/;
    
        for (let i = 0; i < lines.length; i++) {
            let line = lines[i];
            let parsedMove = moveRegexp.exec(line);
    
            if (parsedMove !== null) {
                if (parsedMove.length !== 3) {
                    throw new Error(`Didn't parse the expected number of bits. Input ${line}, output: ${parsedMove.join(",")}`);
                }
                
                const color = parsedMove[1] === 'W' ? 'white' : 'black'
                const x = +parsedMove[2].substring(0, 1).charCodeAt(0) - 97;
                const y = +parsedMove[2].substring(1, 2).charCodeAt(0) - 97;
                
                moves.push(new Move(color, x, y));
            }
    
            const end = endOfGameRegexp.exec(line);
            if (end !== null) {
                break;
            }
        }
    
        moves.forEach(move => board.makeMove(move));
        
        return board;
    }
}