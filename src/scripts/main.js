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
				let type;

				if (i % 2) {
					if (j % 2 === 1) {
						if (i < 4) {
							type = 1;
						}
						if (i > 5) {
							type = 2;
						}
					}
				} else {
					if (j % 2 === 0) {
						if (i < 4) {
							type = 1;
						}
						if (i > 5) {
							type = 2;
						}
					}
				}

				switch(type) {
					case 1:
						place = new Place(i, j, 1);
						break;
					case 2:
						place = new Place(i, j, 2);
						break;
					default:
						place = new Place(i, j, 0)
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
				if (i % 2) {
					if (j % 2 === 1) {
						place.classList.add("dark")
					}
				} else {
					if (j % 2 === 0) {
						place.classList.add("dark");
					}
				}

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