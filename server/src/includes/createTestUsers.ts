import { User } from '@construct/server/database/models/User'
import { hashPassword } from '@construct/server/includes/functions'

export async function createTestUsers() {
	const user = {
		name: 'test',
		display_name: 'Test',
		email: 'test@localhost.com',
		password: await hashPassword('password'),
	}

	const users: User[] = []

	for (let i = 0; i < 100; i++) {
		users.push(
			User.init({
				name: user.name + i,
				display_name: user.display_name + i,
				email: `test${i}@localhost.com`,
				password: user.password,
			}),
		)
	}

	await User.save(users)

	console.log('Test users created')
}
