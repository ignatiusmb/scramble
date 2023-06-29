import { decode, jumble } from './utils.js';

const INTERVAL = 42;

/**
 * @param {HTMLElement} element node anchor
 */
export function disorder(element) {
	const original = element.textContent || '';
	const total = original.length;

	let interval = setInterval(execute, INTERVAL);
	let running = true;
	return {
		original,
		start() {
			if (running) return;
			running = !!(interval = setInterval(execute, INTERVAL));
		},
		stop() {
			running = !!(interval && void clearInterval(interval));
		},
	};

	function execute() {
		element.textContent = jumble(total);
	}
}

/**
 * @param {HTMLElement} node element anchor
 */
export function scramble(node) {
	let executed = false;
	/** @type {number} */
	let timer;

	let index = 0;
	const original = node.textContent || '';
	const runner = disorder(node);

	function iterate() {
		timer && clearInterval(timer);
		timer = setInterval(() => {
			if (index >= original.length) clearInterval(timer);
			node.textContent = decode(original, index);
		}, INTERVAL);

		if (index++ >= original.length) clearTimeout(timer);
		else setTimeout(iterate, 432);
	}

	return {
		worker: runner,
		get finished() {
			return index >= original.length;
		},
		run() {
			if (executed) return;
			executed = true;
			runner.stop();
			iterate();
		},
		destroy() {
			runner.stop();
			timer && clearInterval(timer);
		},
	};
}

/**
 * @param {NodeListOf<HTMLElement>} elements node list
 */
export function successive(elements) {
	const list = Array.from(elements, (el) => scramble(el));

	/** @param {number} idx */
	function execute(idx) {
		if (idx >= list.length) return;
		function check() {
			list[idx].finished ? execute(idx + 1) : setTimeout(check, 1000);
		}
		list[idx].run(), setTimeout(check, 1000);
	}
	return {
		run: () => execute(0),
	};
}
