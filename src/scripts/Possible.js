import config from './config.js';
import { calcPos } from './helpers.js';

export default class Possible {
    constructor(parent, row, col) {
        this.parent = parent;
        this.row = row;
        this.col = col;
    }

    render(storage) {
        let possible = document.createElement('div');
        possible.classList.add('possible');

        const pos = calcPos(this.row, this.col)
        possible.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
        possible.addEventListener('click', () => {
            this.drag && this.click()
        });
        possible.addEventListener('mouseup', () => {
            !this.drag && this.click()
        });
        storage.appendChild(this.element);
    }

    click() {
        this.parent.moveTo(this.row, this.col);
    }
}