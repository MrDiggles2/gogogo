var svg = require('svg-builder')

module.exports = class Drawer {
    constructor(config) {
        this.config = config;

        this.builder = svg.newInstance();

        this.cursorX = this.config.margin;
        this.cursorY = this.config.margin;

        this.circleArray = [];
    }

    getSVG() {
        if (this.config.vertical) {
            this.builder.rect({
                x: 0,
                y: 0,
                height: (this.cursorY + this.config.margin) * this.config.unit,
                width: (this.cursorX + 19 + this.config.margin) * this.config.unit,
                fill: this.config.background
            });
        }
        else {
            this.builder.rect({
                x: 0,
                y: 0,
                height: (this.cursorY + 19 + this.config.margin) * this.config.unit,
                width: (this.cursorX + this.config.margin) * this.config.unit,
                fill: this.config.background
            });
            
        }

        this.circleArray.forEach((circleParam) => {
            this.builder.circle(circleParam);
        });

        return this.builder.render();
    }

    recalculateDimen() {
        if (this.config.vertical) {
            this.builder
                .width((this.cursorX + 19 + this.config.margin) * this.config.unit)
                .height((this.cursorY + this.config.margin - this.config.spacing) * this.config.unit)
        }
        else {
            this.builder
                .width((this.cursorX + this.config.margin - this.config.spacing) * this.config.unit)
                .height((this.cursorY + 19 + this.config.margin) * this.config.unit)
        }
    }

    drawBoard(board) {
        const originX = this.cursorX;
        const originY = this.cursorY;

        board.boardArray.forEach((row, i) => {
            row.forEach((entry, j) => {
                if (entry === null) return;
                
                this.circleArray.push({
                    r: this.config.unit / 2 * this.config.radiusRatio,
                    fill: entry.color === 'black' ? this.config.black : this.config.white,
                    'stroke-width': 1,
                    stroke: this.config.outline,
                    cx: (i + originX) * this.config.unit + this.config.unit/2,
                    cy: (j + originY) * this.config.unit + this.config.unit/2,
                });
            });
        });

        if (this.config.vertical) {
            this.cursorY += board.boardArray.length;
            this.cursorY += this.config.spacing;
        }
        else {
            this.cursorX += board.boardArray.length;
            this.cursorX += this.config.spacing;
        }

        this.recalculateDimen();
    }
}