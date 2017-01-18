import config from './config.js';

export default class Possible {
    constructor(parent, row, col) {
        this.parent = parent;
        this.row = row;
        this.col = col;
    }

    render() {
        let possible = document.createElement('div');
        possible.classList.add('possible');

        let left = this.col * config.size * 2;
        if ((this.row % 2) - 1) {
            left -= config.size;
        }
        possible.style.transform = `translate(${left}px, ${this.row * config.size}px)`;
        possible.addEventListener('click', () => {
            this.drag && this.click()
        });
        possible.addEventListener('mouseup', () => {
            !this.drag && this.click()
        });
        return possible;
    }

    click() {
        this.parent.moveTo(this.row, this.col);
    }
}