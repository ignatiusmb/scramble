import * as VX from './options.js';
import { decode, jumble } from './utils.js';

export function disorder(el: HTMLElement) {
	const original = el.textContent || '';
	const total = original.length;

	let interval = setInterval(execute, VX.INTERVAL);
	let running = true;
	return {
		original,
		start() {
			if (running) return;
			running = !!(interval = setInterval(execute, VX.INTERVAL));
		},
		stop() {
			running = !!(interval && void clearInterval(interval));
		},
	};

	function execute() {
		el.textContent = jumble(total);
	}
}

export function successive(elements: NodeListOf<HTMLElement>) {
	const list = Array.from(elements, (el) => scramble(el));
	function execute(idx: number) {
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

interface ScrambleOptions {}
export function scramble(node: HTMLElement, {}: ScrambleOptions = {}) {
	let executed = false;
	let timer: NodeJS.Timeout;

	let index = 0;
	const original = node.textContent || '';
	const runner = disorder(node);

	function iterate() {
		timer && clearInterval(timer);
		timer = setInterval(() => {
			if (index >= original.length) clearInterval(timer);
			node.textContent = decode(original, index);
		}, VX.INTERVAL);

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
