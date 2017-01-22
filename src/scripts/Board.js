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
                x: e.clientX - this.element.offsetLeft - (this.activeElement.col + 1 * config.size) + config.size / 2.5,
                y: e.clientY - this.element.offsetTop - config.size / 1.5
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
        this.activeElement.element.classList.add('active');
    }

    initPieces() {
        for (let i = 0; i < config.cols * 2; i++) {
            for (let j = 0; j < config.cols; j++) {
                if (i < config.cols - 1) {
                    this.rows[i][j] = new Piece(this, i, j, 'white', 'single');
                }
                if (i > config.cols) {
                    this.rows[i][j] = new Piece(this, i, j, 'black', 'single');
                }
            }
        }
    }

    createGrid() {
        for (let i = 0; i < config.cols * 2; i++) {
            this.rows.push([]);
            for (let j = 0; j < config.cols; j++) {
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

        for (let i = 0; i < config.cols * 2; i++) {
            let row = document.createElement('div');
            row.classList.add('row');
            for (let j = 0; j < config.cols * 2; j++) {
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
