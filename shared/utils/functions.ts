import { Entries, UserData } from '../types'
import { isArray, isObject, isPrimitive, not } from './is'

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

export function cloneDeep<A>(target: A): A {
	if (isArray(target)) return target.map(cloneDeep) as A
	else if (isObject(target))
		return fromEntries(
			toEntries(target).map(([key, value]) => [key, cloneDeep(value)]),
		) as A
	else return target
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

export function extract<A extends Record<any, any>, Key extends keyof A>(
	target: A,
	keys: Key[],
): {
	[key in Key]: A[key]
} {
	return keys.reduce((result: any, key) => {
		if (key in target) result[key] = target[key]
		return result
	}, {})
}

export function isAdminUser(user: UserData) {
	return user.roles.some(role => role.name === 'admin')
}

export function colorFromString(str: string) {
	let hash = 0
	for (let i = 0; i < str.length; i++) {
		hash = str.charCodeAt(i) + ((hash << 5) - hash)
	}

	let color = '#'
	for (let i = 0; i < 3; i++) {
		let value = (hash >> (i * 8)) & 0xff

		let g = '00' + value.toString(16)
		color += g.substring(g.length - 2)
	}
	return color
}
