export type FunctionType<
	Result = any,
	Params extends any[] = any[],
	This = any,
> = (this: This, ...args: Params) => Result

export type ClassType<
	Instance extends object = object,
	Params extends any[] = any[],
	Static extends object = {},
> = (new (...args: Params) => Instance) & {
	[Prop in keyof Static]: Static[Prop]
}

export type Entry<A, B> = [A, B]
export type Entries<A, B> = Entry<A, B>[]

export * from './database'

export type LoginCreds = {
	username: string
	password: string
}

export type RegisterData = {
	name: string
	email: string
	password: string
	password_confirmation: string
}
