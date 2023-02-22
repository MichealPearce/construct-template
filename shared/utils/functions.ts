import { UserData } from '../types'

export function isAdminUser(user: UserData) {
	return user.roles.some(role => role.name === 'admin')
}
