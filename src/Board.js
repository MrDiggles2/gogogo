module.exports = class Board {

    constructor(length = 19) {
        this.length = length;
        this.boardArray = this.makeBlankBoard(this.length);
    }

    makeBlankBoard(length) {
        let board = [];
        for (let i = 0; i < length; i++) {
            board.push([]);
            for (let j = 0 ; j < length; j++) {
                board[i].push(null);
            }
        }
        return board;
    }

    getCell(x, y) {
        return this.boardArray[x][y];
    }

    makeMove(move) {
        const { color, x, y } = move;

        if (x >= this.length || y >= this.length) {
            throw new Error(`out of bounds! ${move.toString()}`);
        }

        this.boardArray[x][y] = move;

        this.clearSurrounded(move, this.makeBlankBoard())
    }

    isInBound(x, y) {
        return (x >= 0 && x <this.length) && (y >= 0 && y < this.length);
    }

    getAdjacent(cell) {
        const ret = [];

        if (this.isInBound(cell.x, cell.y + 1)) ret.push(this.getCell(cell.x, cell.y + 1));
        if (this.isInBound(cell.x + 1, cell.y)) ret.push(this.getCell(cell.x + 1, cell.y));
        if (this.isInBound(cell.x, cell.y - 1)) ret.push(this.getCell(cell.x, cell.y - 1));
        if (this.isInBound(cell.x - 1, cell.y)) ret.push(this.getCell(cell.x - 1, cell.y));

        return ret;
    }

    remove(cell) {
        this.boardArray[cell.x][cell.y] = null;
    }

    clearSurrounded(move) {
        let adjCellArray = this.getAdjacent(move)
            .filter(adjCell => adjCell !== null)
            .filter(adjCell => adjCell.color !== move.color);
            
        const visitedBoardArray = this.makeBlankBoard(this.length);

        let result = adjCellArray
            .map(cell => {
                return this.scanForSurrounded(cell, visitedBoardArray);
            })
            .filter(cellsMarkedForDelete => cellsMarkedForDelete !== false)
            .reduce((acc, cellsMarkedForDelete) => {
                return acc.concat(cellsMarkedForDelete);
            }, []);

        result.forEach((cell) => {
            this.remove(cell)
        });
    }

    //  returns an array of cells to remove or false if no cells should be removed
    scanForSurrounded(cell, visitedBoardArray) {
        const adjCellArray = this.getAdjacent(cell);

        if (adjCellArray.includes(null)) {
            return false;
        }

        if (visitedBoardArray[cell.x][cell.y]) {
            return [];
        }

        visitedBoardArray[cell.x][cell.y] = true;

        const resultArray = adjCellArray
            .filter(adjCell => adjCell.color === cell.color)
            .filter(adjCell => !visitedBoardArray[adjCell.x][adjCell.y])
            .map(adj => this.scanForSurrounded(adj, visitedBoardArray))
            .reduce((acc, cellArray) => {
                return acc.concat(cellArray);
            }, []);

        resultArray.push(cell);

        if (resultArray.includes(false)) {
            return false;
        }

        return resultArray;
    }

    toString(board = this.boardArray) {
        return board.map(row => {
            return row.map(entry => {
                if (entry === null) return "_";
                return entry.color === "black" ? "B" : "W"
            }).join("  ");;
        }).join("\n")
    }

}