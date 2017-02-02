import config from './config.js';
import Piece from './Piece.js';
import { debounce } from './helpers.js';

export default class Board {
    constructor(element) {
        this.element = element;
        this.lastMoveColor = 'black';
    }

    get allPieces() {
        return []
            .concat(...this.rows)
            .filter(piece => typeof piece !== 'undefined');
    }

    addEventListeners() {
        this.element.addEventListener('click', e => {
            if (e.target.classList.contains('piece')) {
                const pieces = this.allPieces.map(piece => piece.element);
                const piece = this.allPieces[pieces.indexOf(e.target)];
                if (piece.color !== this.lastMoveColor) {
                    piece.renderMoves();
                }
            }
        });
    }

    initPieces() {
        this.rows = Array(config.size)
            .fill(Array(config.size)
                .fill(undefined));
        
        for (let i = 0; i < config.size; i++) {
            for (let j = (i + 1) % 2; j < config.size; j += 2) {
                if (i < config.size / 2 - 1) {
                    this.rows[i][j] = new Piece(this, i, j, 'white', 'single');
                    console.log('white');
                } else if (i > config.size / 2) {
                    this.rows[i][j] = new Piece(this, i, j, 'black', 'single');
                    console.log('black');
                } else {
                    console.log('empty')
                }
            }
        }
        console.log(this.rows);
    }

    isOddSquare(row, col) {
        return row % 2 ? !(col % 2) : col % 2;
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

    initPieceStorage() {
        let element = document.createElement('div');
        element.classList.add('pieces');
        this.element.appendChild(element);
        this.pieceStorage = element;
    }

    renderPieces() {
        this.allPieces.map(e => e.render(this.pieceStorage));
    }

    clearMoves() {
        const moves = document.querySelectorAll('.possible');
        if (moves.length <= 0) {
            return;
        }
        console.log(moves);
        moves.map(move => move.parentNode.removeChild(move));
    }

    init() {
        this.element.innerHTML = '';
        this.initPieces();
        this.renderBackground();
        this.initPieceStorage();
        this.renderPieces();
        this.addEventListeners();
    }
}
