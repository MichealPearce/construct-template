import { Entries } from '../types'
import { isPrimitive, not } from './is'

export const noop = (): void => undefined

export const sleep = (ms: number) =>
	new Promise(resolve => setTimeout(resolve, ms))

export function toEntries<A extends Record<any, any>>(
	target: A,
): Entries<keyof A, A[keyof A]> {
	return Object.entries(target) as any
}

export function fromEntries<A extends Record<any, any>>(
	entries: Entries<keyof A, A[keyof A]>,
): A {
	return Object.fromEntries(entries) as any
}

export function clone<A extends Record<any, any>>(target: A): A {
	return fromEntries(toEntries(target))
}

export function cloneDeep<A extends Record<any, any>>(target: A): A {
	return fromEntries(
		toEntries(target).map(([key, value]) => [
			key,
			isPrimitive(value) ? value : cloneDeep(value),
		]),
	)
}

/**
 * returns a copy `main` with the values of `sources` merged in
 *
 * @export
 * @template A
 * @template B
 * @param {A} main
 * @param {...B[]} sources
 * @return {*}  {(A & B)}
 */
export function defaults<A extends Record<any, any>, B extends A>(
	main: A,
	...sources: B[]
): A & B {
	return sources.reduce((result: any, current) => {
		for (const [key, value] of Object.entries(current))
			if (not(key in result)) result[key] = value

		return result
	}, clone(main))
}

export function defaultsDeep<A extends Record<any, any>, B extends A>(
	main: A,
	...sources: B[]
): A & B {
	return sources.reduce((result: any, current) => {
		for (const [key, value] of Object.entries(current))
			if (not(key in result)) result[key] = value
			else if (isPrimitive(value)) result[key] = value
			else result[key] = defaultsDeep(result[key], value)

		return result
	}, cloneDeep(main))
}
