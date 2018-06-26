module.exports = class Board {

    constructor() {
        this.length = 19;
        this.boardArray = [];

        for (let i = 0; i < 19; i++) {
            this.boardArray.push([]);
            for (let j = 0 ; j < this.length; j++) {
                this.boardArray[i].push(null);
            }
        }
    }

    makeMove(move) {
        const { color, x, y } = move;

        if (x >= this.length || y >= this.length) {
            throw new Error(`out of bounds! ${move.toString()}`);
        }

        this.boardArray[x][y] = move;
    }

    toString() {
        return this.boardArray.map(row => {
            return row.map(entry => {
                if (entry === null) return "_";
                return entry.color === "black" ? "B" : "W"
            }).join("  ");;
        }).join("\n")
    }

}