import { $ } from "./helpers.js";

const rows = 10;
const cols = 10;

class Board {
	constructor(parent) {
		this.parent = parent;
		this.initPieces();
	}

	initPieces() {
		this.rows = [];
		for (let i = 0; i < rows; i++) {
			this.rows.push([]);
			for (let j = 0; j < cols; j++) {
				let place;
				if (i < 4) {
					place = new Place(i,j,1)
				} else if (i > 5) {
					place = new Place(i,j,2)
				} else {
					place = new Place(i,j,0)
				}
				this.rows[i].push(place);
			}
		}
	}

	createPiece(type) {
		let piece = document.createElement("div");
		piece.classList.add("piece", type);
		piece.addEventListener("mousedown", function() {
			this.style.backgroundColor = "red";
		});
		piece.addEventListener("mouseup", function() {
			this.style.backgroundColor = "blue";
		});
		return piece;
	}

	render() {
		this.parent.innerHTML = "";
		this.parent.style.width = rows * 3 + "em";
		for (let i = 0; i < this.rows.length; i++) {
			let row = document.createElement("div");
			row.classList.add("row");
			for (let j = 0; j < this.rows[i].length; j++) {
				let place = document.createElement("div");
				place.classList.add("place");

				if (this.rows[i][j].type === 1) {
					place.appendChild(this.createPiece("black"));
				} else if (this.rows[i][j].type === 2) {
					place.appendChild(this.createPiece("white"));
				}

				row.appendChild(place);
			}
			this.parent.appendChild(row);
		}
	}

	clear() {
		this.rows = [];
		for (let i = 0; i < rows; i++) {
			this.rows.push([]);
			for (let j = 0; j < cols; j++) {
				let place;
				place = new Place(i,j,0)
				this.rows[i].push(place);
			}
		}
		this.render();
	}


	init() {
		this.render();
	}
}

class Place {
	constructor(row, col, type) {
		this.row = row;
		this.col = col;
		this.type = type;
	}
}

let board1 = new Board($(".board"));
board1.init();