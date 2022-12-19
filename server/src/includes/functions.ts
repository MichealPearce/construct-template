import { compare, hash } from 'bcrypt'

export function hashPassword(input: string): Promise<string> {
	return hash(input, 10)
}

export function comparePassword(input: string, hash: string): Promise<boolean> {
	return compare(input, hash)
}
