import { User } from '@construct/server/database/models/User'
import { createRoute, Endpoint } from '@construct/server/includes/Endpoint'
import { hashPassword } from '@construct/server/includes/functions'
import { authed } from '@construct/server/middleware/authed'
import { isAdmin } from '@construct/server/middleware/isAdmin'
import { not, ServerError, UserData } from '@construct/shared'
import { defaults } from '@construct/shared/utils/functions'

export const usersRoute = createRoute('/users')

@usersRoute.endpoint('GET')
export class UsersGETEndpoint extends Endpoint<{
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
		const users = await User.find({ skip, take })

		if (not(users.length)) throw new ServerError('page not found', 404)

		return users
	}
}

@usersRoute.endpoint('POST')
export class UsersPOSTEndpoint extends Endpoint<{
	body: Pick<UserData, 'name' | 'display_name' | 'email' | 'password'>
}> {
	static onRequest = [isAdmin]

	async handle() {
		const { name, email, display_name } = this.request.body
		const password = await hashPassword(this.request.body.password!)

		const user = await User.init({
			name,
			display_name,
			email,
			password,
		}).save()

		// because user was initialized with a password, we need to delete it
		delete user.password
		return user
	}
}

@usersRoute.endpoint('GET', '/:uuid')
export class UsersGETUUIDEndpoint extends Endpoint<{
	params: {
		uuid: string
	}
}> {
	static onRequest = [authed]

	async handle() {
		const user = await User.findOneBy({
			uuid: this.request.params.uuid,
		})

		if (not(user)) throw new ServerError('user not found', 404)
		return user
	}
}
