function $(e) {
	return document.querySelectorAll(e)[1] === undefined ? document.querySelector(e) : document.querySelectorAll(e)
}

function shuffle(array) {
	for (let i = array.length; i; i--) {
		let j = Math.floor(Math.random() * i);
		[array[i - 1], array[j]] = [array[j], array[i - 1]]
	}
}