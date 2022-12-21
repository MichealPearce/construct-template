import { UserRole } from '@construct/server/database/models/UserRole'
import { authed } from '@construct/server/middleware/authed'
import { isAdmin } from '@construct/server/middleware/isAdmin'
import { defaults, not, ServerError } from '@construct/shared'
import { FastifyInstance } from 'fastify'

export async function registerUserRolesRoute(instance: FastifyInstance) {
	instance.route<{
		Querystring: {
			page?: number
			limit?: number
		}
	}>({
		method: 'GET',
		url: '/users/roles',
		onRequest: [authed],
		async handler(request, reply) {
			const opts = defaults(request.query, {
				page: 0,
				limit: 10,
			})

			const skip = Math.max(0, (opts.page - 1) * opts.limit)
			const take = Math.max(1, opts.limit)
			const roles = await UserRole.find({ skip, take })

			if (not(roles.length)) throw new ServerError('page not found', 404)
			return roles
		},
	})

	instance.route<{
		Body: {
			name: string
		}
	}>({
		method: 'POST',
		url: '/users/roles',
		onRequest: [isAdmin],
		handler(request, reply) {
			const { name } = request.body
			return UserRole.init({ name }).save()
		},
	})
}
