import { random } from 'mauss/utils';

export function decode(original: string, length: number) {
	const text = original.slice(0, length);
	return text + jumble(original.length - length);
}

export function jumble(length: number) {
	return Array.from({ length }, () => String.fromCharCode(random.int(33, 126))).join('');
}

export function inViewport(el: HTMLElement) {
	const rect = el.getBoundingClientRect();
	const { innerWidth, innerHeight } = window;
	return (
		rect.bottom > 0 &&
		rect.right > 0 &&
		rect.left < (innerWidth || document.documentElement.clientWidth) &&
		rect.top < (innerHeight || document.documentElement.clientHeight)
	);
}
