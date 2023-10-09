import { useCallback, useRef } from 'react';

type IDebounce = {
	(fn: Function, delay: number): Function;
}

const debounce: IDebounce = (fn, delay) => {
	let timer: any = null;
	return (...args: any[]) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			fn(...args);
		}, delay);
	}
}

type IUseDebounce = {
	(fn: Function, delay: number, dep: any[]): void;
}

const useDebounce: IUseDebounce = (fn, delay, dep = []) => {
  const { current } = useRef<Function>(fn);

	return useCallback(
		debounce((...args: any[]) => current(...args), delay),
		dep
	);
}

export { useDebounce };
