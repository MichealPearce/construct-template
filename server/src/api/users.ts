import { User } from '@construct/server/database/models/User'
import { authed } from '@construct/server/middleware/authed'
import { not, ServerError } from '@construct/shared'
import { defaults } from '@construct/shared/utils/functions'
import { FastifyInstance } from 'fastify'

export async function registerUsersRoute(instance: FastifyInstance) {
	instance.get<{
		Querystring: {
			page?: number
			limit?: number
		}
	}>(
		'/users',
		{
			onRequest: [authed],
		},
		async function (request, reply) {
			const opts = defaults(request.query, {
				page: 0,
				limit: 10,
			})

			const users = await User.find({
				skip: opts.page * opts.limit,
				take: opts.limit,
			})

			if (not(users.length)) return new ServerError('page not found', 404)

			return users
		},
	)
}
