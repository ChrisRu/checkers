export default class Piece {
	constructor(row, col, color, type) {
		this.row = row
		this.col = col
		this.color = color
		this.type = type
	}

	get el() {
		let el = this.createPiece()
		let left = this.col * 8
		if (!(this.row % 2)) {
			left += 4
		}
		const top = this.row * 4
		el.style.transform = `translate(${left}em, ${top}em)`
		return el
	}

	createPiece() {
		let piece = document.createElement('div')
		piece.classList.add('piece', this.color)
		return piece
	}
}