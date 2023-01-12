import { User } from '@construct/server/database/models/User'
import { UserRole } from '@construct/server/database/models/UserRole'
import { createRoute, Endpoint } from '@construct/server/includes/Endpoint'
import { hashPassword } from '@construct/server/includes/functions'
import { authed } from '@construct/server/middleware/authed'
import { isAdmin } from '@construct/server/middleware/isAdmin'
import { isNull, not, ServerError, UserData } from '@construct/shared'
import { defaults, extract } from '@construct/shared/utils/functions'

export const route = createRoute('/users')

@route.endpoint('GET')
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

@route.endpoint('POST')
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

@route.endpoint('GET', '/:uuid')
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

@route.endpoint('PATCH', '/:uuid')
export class UsersPATCHUUIDEndpoint extends Endpoint<{
	params: {
		uuid: string
	}
	body: Pick<UserData, 'name' | 'display_name' | 'email'>
}> {
	static onRequest = [authed]

	get data() {
		return extract(this.request.body, ['name', 'display_name', 'email'])
	}

	async handle() {
		const user = await User.findOneBy({
			uuid: this.request.params.uuid,
		})

		if (isNull(user)) throw new ServerError('user not found', 404)

		return user.assign(this.data).save()
	}
}

@route.endpoint('POST', '/:uuid/roles/:name')
export class UsersAddRoleEndpoint extends Endpoint<{
	params: { uuid: string; name: string }
}> {
	static onRequest = [isAdmin]

	async handle() {
		const user = await User.findOneBy({
			uuid: this.request.params.uuid,
		})

		if (isNull(user)) throw new ServerError('user not found', 404)

		const role = await UserRole.findOneBy({
			name: this.request.params.name,
		})

		if (isNull(role)) throw new ServerError('role not found', 404)

		return user.addRole(role)
	}
}

@route.endpoint('DELETE', '/:uuid/roles/:name')
export class UsersRemoveRoleEndpoint extends Endpoint<{
	params: { uuid: string; name: string }
}> {
	static onRequest = [isAdmin]

	async handle() {
		const user = await User.findOneBy({
			uuid: this.request.params.uuid,
		})

		if (isNull(user)) throw new ServerError('user not found', 404)

		const role = await UserRole.findOneBy({
			name: this.request.params.name,
		})

		if (isNull(role)) throw new ServerError('role not found', 404)

		return user.removeRole(role)
	}
}
