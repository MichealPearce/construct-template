import { User } from '@construct/server/database/models/User'
import { comparePassword } from '@construct/server/includes/functions'
import { ServerError } from '@construct/shared'
import { FastifyInstance } from 'fastify'

export async function registerAuthRoute(instance: FastifyInstance) {
	instance.get('/auth', request => {
		const user = request.session.get('user')

		if (!user) throw new ServerError('not logged in', 401)
		return user
	})

	instance.post<{
		Body: {
			username: string
			password: string
		}
	}>('/auth', async request => {
		const invalidError = new ServerError('invalid username or password', 401)
		const { username, password } = request.body

		const user = await User.findOne({
			where: {
				name: username,
			},
			select: {
				name: true,
				password: true,
			},
		})

		if (!user) {
			console.info('user not found', username)
			throw invalidError
		}

		const valid = await comparePassword(password, user.password!)

		if (!valid) throw invalidError

		const fulluser = await User.findOneByOrFail({
			name: username,
		})

		request.session.set('user', fulluser)
		return fulluser
	})
}
