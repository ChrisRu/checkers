export function $(e) {
	return document.querySelectorAll(e)[1] === undefined ? document.querySelector(e) : document.querySelectorAll(e)
}

export function shuffle(array) {
	for (let i = array.length; i; i--) {
		let j = Math.floor(Math.random() * i);
		[array[i - 1], array[j]] = [array[j], array[i - 1]]
	}
}

export function isOddSquare(i, j) {
	if (i % 2) {
		return !(j % 2);
	} else {
		return j % 2;
	}
}