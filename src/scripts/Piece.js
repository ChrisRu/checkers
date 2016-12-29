import { config } from './config.js'

export default class Piece {
	constructor(parent, row, col, color, type) {
		this.parent = parent
		this.row = row
		this.col = col
		this.color = color
		this.type = type
	}

	render(parent) {
		let piece = document.createElement('div')
		piece.classList.add('piece', this.color)
		piece.addEventListener('click', () => {
			console.log(this.possibleMoves)
		})

		let left = this.col * 8
		if (!(this.row % 2)) {
			left += 4
		}
		piece.style.transform = `translate(${left}em, ${this.row * 4}em)`

		parent.appendChild(piece)
	}

	get possibleMoves() {
		let moves = []
		if (this.type === 1) {
			let row

			if (this.color === 'black') {
				row = this.row - 1
			} else {
				row = this.row + 1
			}

			for (let i = this.col; i < this.col + 2; i++) {
				if (i >= 0 && i < config.size) {
					if (this.parent.rows[row][i] === undefined) {
						moves.push({
							row: row,
							col: i
						})
					} else {
						if (this.parent.rows[row][i].color === "white") {
							console.log("white")
						} else {
							console.log("black")
						}
					}
				}
			}
		}
		return moves
	}
}