import { config } from './config.js'
import { isOddSquare } from './helpers.js'
import Place from './Place.js'

export default class Board {
	constructor(parent) {
		this.parent = parent
		this.initPieces()
	}

	initPieces() {
		this.rows = []
		for (let i = 0; i < config.rows; i++) {
			this.rows.push([])
			for (let j = 0; j < config.cols; j++) {
				let place
				let type

				if (isOddSquare(i, j)) {
					if (i < 4) {
						type = 1
					}
					if (i > 5) {
						type = 2
					}
				}

				switch(type) {
					case 1:
						place = new Place(i, j, 1)
						break
					case 2:
						place = new Place(i, j, 2)
						break
					default:
						place = new Place(i, j, 0)
				}
				
				this.rows[i].push(place)
			}
		}
	}

	render() {
		this.parent.innerHTML = ''
		for (let row of this.rows) {
			let newRow = document.createElement('div')
			newRow.classList.add('row')
			for (let place of row) {
				newRow.appendChild(place.el)
			}
			this.parent.appendChild(newRow)
		}
	}

	clear() {
		this.rows = []
		for (let i = 0; i < config.rows; i++) {
			this.rows.push([])
			for (let j = 0; j < config.cols; j++) {
				let place
				place = new Place(i,j,0)
				this.rows[i].push(place)
			}
		}
	}

	init() {
		this.render()
	}
}