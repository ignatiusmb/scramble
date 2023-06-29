declare module '@ignatiusmb/scramble' {
	export function disorder(element: HTMLElement): {
		original: string;
		start(): void;
		stop(): void;
	};

	export function scramble(node: HTMLElement): {
		worker: ReturnType<typeof disorder>;
		readonly finished: boolean;
		run(): void;
		destroy(): void;
	};

	export function successive(elements: NodeListOf<HTMLElement>): {
		run(): void;
	};
}
