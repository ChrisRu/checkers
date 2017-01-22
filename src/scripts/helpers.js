import config from './config.js';

export function $(e) {
    return document.querySelectorAll(e)[1] === undefined
        ? document.querySelector(e)
        : document.querySelectorAll(e);
}

export function shuffle(array) {
    for (let i = array.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [array[i - 1], array[j]] = [array[j], array[i - 1]];
    }
}

export function calcPos(row, col) {
    const y = row * config.size;
    let x = col * config.size * 2;
    if (!(row % 2)) {
        x += config.size;
    }
    return { x, y };
}

export function throttle(callback, wait, context = this) {
    let timeout = null
    let callbackArgs = null

    const later = () => {
        callback.apply(context, callbackArgs)
        timeout = null
    }

    return function () {
        if (!timeout) {
            callbackArgs = arguments
            timeout = setTimeout(later, wait)
        }
    }
}

export function debounce(callback, wait, context = this) {
    let timeout = null
    let callbackArgs = null

    const later = () => callback.apply(context, callbackArgs)

    return function () {
        callbackArgs = arguments
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
    }
}