import config from './config.js';
import { $, calcPos } from './helpers.js';
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

    createElement() {
        let piece = document.createElement('div');
        piece.classList.add('piece', this.color);
        this.element = piece;
    }

    render(storage) {
        const pos = calcPos(this.row, this.col);
        this.element.classList.remove('active');
        this.element.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
        storage.appendChild(this.element);
    }

    moveTo(row, col) {
        this.parent.rows[this.row][this.col] = undefined;
        this.row = row;
        this.col = col;
        this.parent.rows[this.row][this.col] = this;
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

    testMove(row, col) {
        const rows = this.parent.rows;

        // If on board
        if (col >= 0 && col < config.cols) {

            // If empty place
            if (typeof rows[row][col] === 'undefined') {
                return { row, col };
            } else {

                // If opposite piece
                if (rows[row][col].color !== this.color) {
                    // If black go up, if white go down
                    const newRow = this.color === 'black' ? row - 1 : row + 1;
                    // If new col is bigger than the piece, add 
                    const newCol = this.col > col ? col + !(newRow % 2) : col - !(newRow % 2) + 1;
                    console.log({ row: newRow, col: newCol });
                    if (typeof rows[newRow][newCol] === 'undefined') {
                        return { row: newRow, col: newCol };
                    }
                }
            }
        }
    }

    checkDirections(row, col) {
        let moves = [];

        col += row % 2;

        // North
        for (let i = col - 1; i <= col; i++) {
            const move = this.testMove(row, i);
            typeof move !== 'undefined' && moves.push(move);
        }

        return moves;
    }

    possibleMoves() {
        let moves = [];

        // If single piece
        if (this.type === 'single') {

            // If black, go up, if white go down
            const row = this.color === 'black' ? this.row - 1 : this.row + 1;

            // Check for all possible directions
            moves = this.checkDirections(row, this.col);
        }
        return moves;
    }
}
