import { inObject, Is, isFunction, Rollable } from '../utils'

export type RegisterHandler = (...args: any[]) => Rollable

export interface Registrable {
	register(...args: any[]): Rollable
}

export function isRegistrable<T>(thing: T): thing is Is<T, Registrable> {
	return inObject(thing, ['register']) && isFunction(thing.register)
}
