import { isOddSquare } from "./helpers.js";

export default class Place {
	constructor(row, col, type) {
		this.row = row;
		this.col = col;
		this.type = type;
	}

	get el() {
		let el = document.createElement("div");
		el.classList.add("place");
		if (isOddSquare(this.row, this.col)) {
			el.classList.add("dark");
		}
		if (this.type === 1) {
			el.appendChild(this.createPiece("black"));
		} else if (this.type === 2) {
			el.appendChild(this.createPiece("white"));
		}
		el.addEventListener("mouseup", e => this.mouseUp(e))
		return el;
	}

	createPiece(type) {
		let piece = document.createElement("div");
		piece.classList.add("piece", type);
		piece.addEventListener("mousedown", e => this.mouseDown(e));
		window.addEventListener("mousemove", e => this.mouseMove(e));
		return piece;
	}

	mouseDown(e) {
		this.selected = e.toElement;
		this.selected.classList.add("selected");
	}

	mouseMove(e) {
		if (this.selected === undefined) {
			return;
		}
		this.selected.style.top  = e.clientY - this.selected.offsetTop;
		this.selected.style.left = e.clientX - this.selected.offsetLeft;
	}

	mouseUp(e) {
		if (this.selected === undefined) {
			return;
		}
		this.selected.classList.remove("selected");
		const newEl = this.selected;
		this.selected.parentNode.removeChild(this.selected);
		e.toElement.appendChild(newEl);
		this.selected = undefined;
	}
}