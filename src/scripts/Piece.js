import config from './config.js';
import { $ } from './helpers.js';
import Possible from './Possible.js';

export default class Piece {
    constructor(parent, row, col, color, type) {
        this.parent = parent;
        this.row = row;
        this.col = col;
        this.color = color;
        this.type = type;
        this.moves = [];
        this.createElement();
    }

    get calcPos() {
        const y = this.row * config.size;
        let x = this.col * config.size * 2;
        if (!(this.row % 2)) {
            x += config.size;
        }
        return {x, y};
    }

    createElement() {
        let piece = document.createElement('div');
        piece.classList.add('piece', this.color);
        this.element = piece;
    }

    render(storage) {
        const pos = this.calcPos;
        this.element.classList.remove('active');
        this.element.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
        storage.appendChild(this.element);
    }

    moveTo(row, col) {
        this.row = row;
        this.col = col;
        this.parent.clearMoves();
        this.parent.renderPieces();
    }

    renderMoves() {
        this.parent.clearMoves();
        let moves = this.possibleMoves();

        for (let move of moves) {
            const possible = new Possible(this, move.row, move.col);
            this.moves.push(possible);
        
            $('.pieces').appendChild(possible.render());
        }
    }

    possibleMoves() {
        let moves = [];
        if (this.type === 1) {
            let row;

            if (this.color === 'black') {
                row = this.row - 1;
            } else {
                row = this.row + 1;
            }

            for (let i = this.col; i < this.col + 2; i++) {
                if (i - this.row % 2 >= 0 && i < config.cols + this.row % 2) {
                    if (!this.parent.rows[row][i]) {
                        moves.push({ row: row, col: i });
                    } else {
                        if (this.parent.rows[row][i].color === 'white') {
                            console.log('white');
                        } else {
                            console.log('black');
                        }
                    }
                }
            }
        }
        return moves;
    }
}
