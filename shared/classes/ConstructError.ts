export class ConstructError extends Error {
	get name() {
		return this.constructor.name
	}

	public readonly isError = true

	constructor(message: string, public readonly cause?: any) {
		super(message, { cause })
	}
}
