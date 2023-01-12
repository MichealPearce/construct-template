import { UserRole } from '@construct/server/database/models/UserRole'
import { createRoute, Endpoint } from '@construct/server/includes/Endpoint'
import { authed } from '@construct/server/middleware/authed'
import { isAdmin } from '@construct/server/middleware/isAdmin'
import {
	defaults,
	extract,
	not,
	ServerError,
	UserRoleData,
} from '@construct/shared'

export const route = createRoute('/users/roles')

@route.endpoint('GET')
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

@route.endpoint('POST')
export class UserRolesCreateEndpoint extends Endpoint<{
	body: Pick<UserRoleData, 'name' | 'display_name'>
}> {
	static onRequest = [isAdmin]

	get data() {
		return extract(this.request.body, ['name', 'display_name'])
	}

	async handle() {
		return UserRole.init(this.data).save()
	}
}
