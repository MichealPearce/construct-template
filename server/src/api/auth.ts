import { User } from '@construct/server/database/models/User'
import { createRoute, Endpoint } from '@construct/server/includes/Endpoint'
import { comparePassword } from '@construct/server/includes/functions'
import { ServerError } from '@construct/shared'

export const authRoute = createRoute('/auth')

@authRoute.endpoint('GET')
export class AuthGETEndpoint extends Endpoint {
	handle() {
		const user = this.authed

		if (!user) throw new ServerError('not logged in', 401)
		return user
	}
}

@authRoute.endpoint('POST')
export class AuthPOSTEndpoint extends Endpoint<{
	body: { username: string; password: string }
}> {
	async handle() {
		const invalidError = new ServerError('invalid username or password', 401)
		const { username, password } = this.request.body

		const user = await User.findOne({
			where: {
				name: username,
			},
			select: {
				uuid: true,
				name: true,
				password: true,
			},
		})

		if (!user) {
			this.console.info('user not found: %s', username)
			throw invalidError
		}

		const valid = await comparePassword(password, user.password!)

		if (!valid) throw invalidError

		const fulluser = await User.findOneByOrFail({
			name: username,
		})

		this.authed = fulluser
		return fulluser
	}
}

@authRoute.endpoint('DELETE')
export class AuthDELETEEndpoint extends Endpoint {
	handle() {
		return this.session.destroy().then(() => ({ success: true }))
	}
}
