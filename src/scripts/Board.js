import config from './config.js';
import Piece from './Piece.js';

export default class Board {
    constructor(element, size) {
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
        this.element.addEventListener('mousedown', e => {
            if (e.target.classList.contains('piece')) {
                const pieces = this.allPieces.map(piece => piece.element);
                this.setActiveElement(this.allPieces[pieces.indexOf(e.target)]);
                console.log(this.activeElement);
            }
        });
        document.body.addEventListener('mousemove', e => {
            if (typeof this.activeElement !== 'undefined') {
                this.drag = true;

                const pos = {
                    x: e.clientX - (this.activeElement.col + 1 * config.size * 11.5),
                    y: e.clientY - config.size
                }
                console.log('calc');
                console.log(pos.x);

                this.activeElement.element.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
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
                    this.rows[i][j] = new Piece(this, i, j, 'white', 1);
                }
                if (i > config.cols) {
                    this.rows[i][j] = new Piece(this, i, j, 'black', 1);
                }
            }
        }
    }

    createGrid() {
        for (let i = 0; i < config.cols * 2; i++) {
            this.rows.push([]);
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
