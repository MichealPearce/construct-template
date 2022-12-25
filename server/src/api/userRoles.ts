import { UserRole } from '@construct/server/database/models/UserRole'
import { createRoute, Endpoint } from '@construct/server/includes/Endpoint'
import { authed } from '@construct/server/middleware/authed'
import { isAdmin } from '@construct/server/middleware/isAdmin'
import { defaults, not, ServerError } from '@construct/shared'

export const userRolesRoute = createRoute('/users/roles')

@userRolesRoute.endpoint('GET')
export class UserRolesListEndpoint extends Endpoint<{
	query: {
		page?: number
		limit?: number
	}
}> {
	static onRequest = [authed]

	get opts() {
		return defaults(this.request.query, {
			page: 0,
			limit: 10,
		})
	}

	async handle() {
		const opts = this.opts
		const skip = Math.max(0, (opts.page - 1) * opts.limit)
		const take = Math.max(1, opts.limit)
		const roles = await UserRole.find({ skip, take })

		if (not(roles.length)) throw new ServerError('page not found', 404)
		return roles
	}
}

@userRolesRoute.endpoint('POST')
export class UserRolesCreateEndpoint extends Endpoint<{
	body: {
		name: string
	}
}> {
	static onRequest = [isAdmin]

	async handle() {
		const { name } = this.request.body
		return UserRole.init({ name }).save()
	}
}
