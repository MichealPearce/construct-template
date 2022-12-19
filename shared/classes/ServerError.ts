import { ConstructError } from './ConstructError'

export class ServerError extends ConstructError {
	public readonly statusCode: number
	public readonly code: number

	constructor(message: string, statusCode = 500) {
		super(message)

		this.statusCode = statusCode
		this.code = statusCode
	}
}
