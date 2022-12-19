import { isPromise } from './is'

export type Rollable = void | undefined | Promise<void | undefined>
export type RollableFunc = () => Rollable

export function roll(...funcs: RollableFunc[]): Rollable {
	let rolling: Rollable

	for (const func of funcs) {
		if (isPromise(rolling)) rolling = rolling.then(func)
		else rolling = func()
	}

	return rolling
}
