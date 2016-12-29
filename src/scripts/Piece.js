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
			console.log(this.possibleMoves())
		})

		let left = this.col * 8
		if (!(this.row % 2)) {
			left += 4
		}
		piece.style.transform = `translate(${left}em, ${this.row * 4}em)`

		parent.appendChild(piece)
	}

	possibleMoves() {
		let moves = []
		if (this.type === 1) {
			if (this.color === 'black') {
				if (this.row + 1 === this.parent.rows) {
					moves.push(this.row[3])
				}
			}
		}
		return moves
	}
}