import { User } from '@construct/server/database/models/User'
import { hashPassword } from '@construct/server/includes/functions'
import { authed } from '@construct/server/middleware/authed'
import { isAdmin } from '@construct/server/middleware/isAdmin'
import { not, ServerError, UserData } from '@construct/shared'
import { defaults } from '@construct/shared/utils/functions'
import { FastifyInstance } from 'fastify'

export async function registerUsersRoute(instance: FastifyInstance) {
	instance.route<{
		Querystring: {
			page?: number
			limit?: number
		}
	}>({
		method: 'GET',
		url: '/users',
		onRequest: [authed],
		async handler(request, _reply) {
			const opts = defaults(request.query, {
				page: 0,
				limit: 10,
			})

			const skip = Math.max(0, (opts.page - 1) * opts.limit)
			const take = Math.max(1, opts.limit)
			const users = await User.find({ skip, take })

			if (not(users.length)) return new ServerError('page not found', 404)

			return users
		},
	})

	// TODO: add password confirmation check
	// TODO: add validators for inputs
	instance.route<{
		Body: Pick<UserData, 'name' | 'email' | 'password'>
	}>({
		method: 'POST',
		url: '/users',
		onRequest: [isAdmin],
		async handler(request, _reply) {
			const { name, email } = request.body
			const password = await hashPassword(request.body.password!)

			const user = await User.init({ name, email, password }).save()

			// because user was initialized with a password, we need to delete it
			delete user.password
			return user
		},
	})
}
