import config from './config.js';
import Piece from './Piece.js';
import { debounce } from './helpers.js';

export default class Board {
    constructor(element) {
        this.element = element;
    }

    get allPieces() {
        let array = [];
        for (let row of this.rows) {
            for (let piece of row) {
                if (typeof piece !== 'undefined') {
                    array.push(piece);
                }
            }
        }
        return array;
    }

    setEventListeners() {
        this.mouseMove = debounce((e) => {
            this.drag = true;

            const pos = {
                x: e.clientX - this.element.offsetLeft - (this.activeElement.col + 1 * config.scale) + config.scale / 2.5,
                y: e.clientY - this.element.offsetTop - config.scale / 1.5
            }

            this.activeElement.element.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
        }, 2);
        this.element.addEventListener('mousedown', e => {
            if (e.target.classList.contains('piece')) {
                const pieces = this.allPieces.map(piece => piece.element);
                this.setActiveElement(this.allPieces[pieces.indexOf(e.target)]);
            }
        });
        window.addEventListener('mousemove', e => {
            if (typeof this.activeElement !== 'undefined') {
                this.mouseMove(e);
            }
        });

        window.addEventListener('mouseup', e => {
            if (typeof this.activeElement !== 'undefined') {
                this.activeElement.render(this.pieceStorage);
                this.activeElement = undefined;
            }
            this.drag = false;
        });
    }

    setActiveElement(element) {
        this.activeElement = element;
        this.activeElement.renderMoves();
    }

    initPieces() {
        // Check for all rows
        for (let i = 0; i < config.size; i++) {
            // Check for odd row and add a space
            for (let j = (i + 1) % 2; j < config.size; j += 2) {
                // If first half
                if (i < config.size / 2 - 1) {
                    this.rows[i][j] = new Piece(this, i, j, 'white', 'single');
                }
                // If second half
                if (i > config.size / 2) {
                    this.rows[i][j] = new Piece(this, i, j, 'black', 'single');
                }
            }
        }
        console.log(this.rows);
    }

    createGrid() {
        for (let i = 0; i < config.size; i++) {
            this.rows.push([]);
            for (let j = 0; j < config.size; j++) {
                this.rows[i].push(undefined);
            }
        }
    }

    isOddSquare(row, col) {
        if (row % 2) {
            return !(col % 2);
        } else {
            return col % 2;
        }
    }

    renderBackground() {
        let background = document.createElement('div');
        background.classList.add('background');

        for (let i = 0; i < config.size; i++) {
            let row = document.createElement('div');
            row.classList.add('row');
            for (let j = 0; j < config.size; j++) {
                let place = document.createElement('div');
                place.classList.add('place');
                if (this.isOddSquare(i, j)) {
                    place.classList.add('dark');
                }
                row.appendChild(place);
            }
            background.appendChild(row);
        }

        this.element.appendChild(background);
    }

    createPieceStorage() {
        let element = document.createElement('div');
        element.classList.add('pieces');
        this.element.appendChild(element);
        this.pieceStorage = element;
    }

    renderPieces() {
        for (let row of this.rows) {
            for (let piece of row) {
                if (typeof piece !== 'undefined') {
                    piece.render(this.pieceStorage);
                }
            }
        }
    }

    clearMoves() {
        const moves = document.querySelectorAll('.possible');
        if (!moves) {
            return;
        }
        for (let move of moves) {
            move.parentNode.removeChild(move);
        }
    }

    clear() {
        this.rows = [];
    }

    init() {
        this.element.innerHTML = '';
        this.clear();
        this.createGrid();
        this.initPieces();
        this.renderBackground();
        this.createPieceStorage();
        this.renderPieces();
        this.setEventListeners();
    }
}
