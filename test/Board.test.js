var assert = require('assert');

var Board = require('../src/Board');
var Move = require('../src/Move');


describe('Board tests', function() {

    it('should place a move in the correct spot', function() {
        const board = new Board(200);
        const move = new Move('black', 10, 10);
        board.makeMove(move);

        assert.deepStrictEqual(board.getCell(10, 10), move);
    });

    it('should remove a surrounded piece', function() {
        const board = new Board(3);
        
        board.makeMove(new Move('white', 1, 1));
        
        [
            [0, 1],
            [1, 0],
            [2, 1],
            [1, 2]
        ].forEach((coor) => {
            board.makeMove(new Move('black', coor[0], coor[1]));
        });

        assert.deepStrictEqual(board.getCell(1, 1), null);
    });

    it('should remove a corner piece', function() {
        const board = new Board(3);
        
        board.makeMove(new Move('white', 0, 0));
        
        [
            [0, 1],
            [1, 0],
        ].forEach((coor) => {
            board.makeMove(new Move('black', coor[0], coor[1]));
        });

        assert.deepStrictEqual(board.getCell(0, 0), null);
    });

    it('should be able to remove a whole lot of pieces', function() {
        const board = new Board(19);

        const whiteCoor = [
            [10, 11],
            [10, 12],
            [10, 13],
            [11, 10],
            [11, 14],
            [12, 10],
            [12, 14],
            [13, 10],
            [13, 13],
            [14, 11],
            [14, 12],
        ];
        
        whiteCoor.forEach((coor) => {
            board.makeMove(new Move('white', coor[0], coor[1]));
        });

        const blackCoor = [
            [11, 11],
            [11, 12],
            [11, 13],
            [12, 11],
            [12, 13],
            [13, 11],
            [13, 12],
        ];
        
        blackCoor.forEach((coor) => {
            board.makeMove(new Move('black', coor[0], coor[1]));
        });

        //  Finish him!
        board.makeMove(new Move('white', 12, 12));

        blackCoor.forEach((coor) => {
            assert.deepStrictEqual(board.getCell(coor[0], coor[1]), null);
        })
    });
})