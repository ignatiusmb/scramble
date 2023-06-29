/**
 * @param {string} original
 * @param {number} length
 */
export function decode(original, length) {
	const text = original.slice(0, length);
	return text + jumble(original.length - length);
}

/**
 * @param {number} length
 */
export function jumble(length) {
	return Array.from({ length }, () => {
		const code = Math.random() * (126 - 33) + 33;
		return String.fromCharCode(code);
	}).join('');
}

/**
 * @param {HTMLElement} el
 */
export function inViewport(el) {
	const rect = el.getBoundingClientRect();
	const { innerWidth, innerHeight } = window;
	return (
		rect.bottom > 0 &&
		rect.right > 0 &&
		rect.left < (innerWidth || document.documentElement.clientWidth) &&
		rect.top < (innerHeight || document.documentElement.clientHeight)
	);
}
