module.exports = class Move {
    constructor(color, x, y) {
        this.color = color;
        this.x = x;
        this.y = y;
    }

    toString() {
        return `${this.color}: ${this.x} ${this.y}`;
    }

}