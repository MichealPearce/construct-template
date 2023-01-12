import { FunctionType } from '../types'

export type Is<Thing, Match> = Thing extends Match ? Thing : never
export type Not<Thing, Match> = Thing extends Match ? never : Thing

export function is<Thing, Match>(
	condition: any,
): condition is Is<Thing, Match> {
	return !!condition
}

export function not<Thing, Match>(
	condition: any,
): condition is Not<Thing, Match> {
	return !condition
}

export function isDefined<T>(thing: T): thing is Not<T, undefined> {
	return typeof thing !== 'undefined'
}

export function notDefined<T>(thing: T): thing is Is<T, undefined> {
	return typeof thing === 'undefined'
}

export function isNull<T>(thing: T): thing is Is<T, null> {
	return thing === null
}

export function notNull<T>(thing: T): thing is Not<T, null> {
	return not(isNull(thing))
}

export function isObject<T extends object>(
	thing: unknown,
): thing is Is<T, object> {
	return typeof thing === 'object' && notNull(thing)
}

export function notObject<T>(thing: T): thing is Not<T, object> {
	return not(isObject(thing))
}

export function inObject<
	T extends Record<any, any>,
	Props extends string | number | symbol,
>(
	thing: unknown,
	props: Props[],
): thing is {
	[P in Props]: T[P]
} {
	return isObject(thing) && props.every(prop => prop in thing)
}

export function isFunction<T extends FunctionType>(
	thing: unknown,
): thing is Is<T, FunctionType> {
	return typeof thing === 'function'
}

export function notFunction<T>(thing: T): thing is Not<T, FunctionType> {
	return not(isFunction(thing))
}

export function isString<T>(thing: T): thing is Is<T, string> {
	return typeof thing === 'string'
}

export function notString<T>(thing: T): thing is Not<T, string> {
	return not(isString(thing))
}

export function isNumber<T>(thing: T): thing is Is<T, number> {
	return typeof thing === 'number'
}

export function notNumber<T>(thing: T): thing is Not<T, number> {
	return not(isNumber(thing))
}

export function isBoolean<T>(thing: T): thing is Is<T, boolean> {
	return typeof thing === 'boolean'
}

export function notBoolean<T>(thing: T): thing is Not<T, boolean> {
	return not(isBoolean(thing))
}

export function isArray<T>(thing: T): thing is Is<T, any[]> {
	return Array.isArray(thing)
}

export function notArray<T>(thing: T): thing is Not<T, any[]> {
	return not(isArray(thing))
}

export function isPromise<T>(thing: T): thing is Is<T, Promise<any>> {
	return isObject(thing) && thing instanceof Promise
}

export function notPromise<T>(thing: T): thing is Not<T, Promise<any>> {
	return not(isPromise(thing))
}

export function isSet<T>(thing: T): thing is Is<T, Set<any>> {
	return isObject(thing) && thing instanceof Set
}

export function notSet<T>(thing: T): thing is Not<T, Set<any>> {
	return not(isSet(thing))
}

export function isMap<T>(thing: T): thing is Is<T, Map<any, any>> {
	return isObject(thing) && thing instanceof Map
}

export function notMap<T>(thing: T): thing is Not<T, Map<any, any>> {
	return not(isMap(thing))
}

export function isDate<T>(thing: T): thing is Is<T, Date> {
	return isObject(thing) && thing instanceof Date
}

export function notDate<T>(thing: T): thing is Not<T, Date> {
	return not(isDate(thing))
}

export function isRegExp<T>(thing: T): thing is Is<T, RegExp> {
	return isObject(thing) && thing instanceof RegExp
}

export function notRegExp<T>(thing: T): thing is Not<T, RegExp> {
	return not(isRegExp(thing))
}

export function isSymbol<T>(thing: T): thing is Is<T, symbol> {
	return typeof thing === 'symbol'
}

export function notSymbol<T>(thing: T): thing is Not<T, symbol> {
	return not(isSymbol(thing))
}

export function isBigInt<T>(thing: T): thing is Is<T, bigint> {
	return typeof thing === 'bigint'
}

export function notBigInt<T>(thing: T): thing is Not<T, bigint> {
	return not(isBigInt(thing))
}

export function isPrimitive<T>(
	thing: T,
): thing is Is<T, string | number | boolean | symbol | bigint> {
	return (
		isString(thing) ||
		isNumber(thing) ||
		isBoolean(thing) ||
		isSymbol(thing) ||
		isBigInt(thing)
	)
}

export function notPrimitive<T>(
	thing: T,
): thing is Not<T, string | number | boolean | symbol | bigint> {
	return not(isPrimitive(thing))
}

export function isIterable<T>(thing: T): thing is Is<T, Iterable<any>> {
	return (
		inObject(thing, [Symbol.iterator]) && isFunction(thing[Symbol.iterator])
	)
}

export function notIterable<T>(thing: T): thing is Not<T, Iterable<any>> {
	return not(isIterable(thing))
}

export function isAsyncIterable<T>(
	thing: T,
): thing is Is<T, AsyncIterable<any>> {
	return (
		inObject(thing, [Symbol.asyncIterator]) &&
		isFunction(thing[Symbol.asyncIterator])
	)
}

export function notAsyncIterable<T>(
	thing: T,
): thing is Not<T, AsyncIterable<any>> {
	return not(isAsyncIterable(thing))
}
