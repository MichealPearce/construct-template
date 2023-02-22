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
