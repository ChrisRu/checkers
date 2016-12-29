import { config } from './config.js'
import Piece from './Piece.js'

export default class Board {
	constructor(parent) {
		this.parent = parent
	}

	initPieces() {
		for (let i = 0; i < config.size * 2; i++) {
			for (let j = 0; j < config.size; j++) {
				if (i < config.size - 1) {
					this.rows[i][j] = new Piece(this, i, j, 'white', 1)
				}
				if (i > config.size) {
					this.rows[i][j] = new Piece(this, i, j, 'black', 1)
				}
			}
		}
	}

	createGrid() {
		this.rows = []
		for (let i = 0; i < config.size * 2; i++) {
			this.rows.push([])
			for (let j = 0; j < config.size; j++) {
				this.rows[i].push(undefined)
			}
		}
		this.initPieces()
	}

	isOddSquare(row, col) {
		if (row % 2) {
			return !(col % 2)
		} else {
			return col % 2
		}
	}

	renderBackground() {
		let background = document.createElement('div')
		background.classList.add('background')

		for (let i = 0; i < config.size * 2; i++) {
			let row = document.createElement('div')
			row.classList.add('row')
			for (let j = 0; j < config.size * 2; j++) {
				let place = document.createElement('div')
				place.classList.add('place')
				if (this.isOddSquare(i, j)) {
					place.classList.add('dark')
				}
				row.appendChild(place)
			}
			background.appendChild(row)
		}

		this.parent.appendChild(background)
	}

	renderPieces() {
		let pieces = document.createElement('div')
		pieces.classList.add('pieces')
		this.parent.appendChild(pieces)
		for (let row of this.rows) {
			for (let piece of row) {
				if (piece !== undefined) {
					piece.render(pieces)
				}
			}
		}
	}

	init() {
		this.parent.innerHTML = ''
		this.createGrid()
		this.renderBackground()
		this.renderPieces()
	}
}