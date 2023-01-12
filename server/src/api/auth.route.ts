import { User } from '@construct/server/database/models/User'
import { UserRegistration } from '@construct/server/database/models/UserRegistration'
import { createRoute, Endpoint } from '@construct/server/includes/Endpoint'
import {
	comparePassword,
	hashPassword,
} from '@construct/server/includes/functions'
import { LoginCreds, RegisterData, ServerError } from '@construct/shared'

export const route = createRoute('/auth')

@route.endpoint('GET')
export class AuthGETEndpoint extends Endpoint {
	handle() {
		const authed = this.authed

		if (!authed) throw new ServerError('not logged in', 401)

		const user = User.findOneByOrFail({ uuid: authed.uuid })
		return user
	}
}

@route.endpoint('POST')
export class AuthPOSTEndpoint extends Endpoint<{
	body: LoginCreds
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

@route.endpoint('DELETE')
export class AuthDELETEEndpoint extends Endpoint {
	handle() {
		return this.session.destroy().then(() => ({ success: true }))
	}
}

@route.endpoint('POST', '/register')
export class AuthRegisterEndpoint extends Endpoint<{
	body: RegisterData
}> {
	async handle() {
		const { name, email, password, password_confirmation } = this.request.body

		if (!name || !email || !password || !password_confirmation)
			throw new ServerError('missing fields', 400)
		if (password !== password_confirmation)
			throw new ServerError('passwords do not match', 400)

		const user = await User.init({
			name,
			email,
			password: await hashPassword(password),
		}).save()

		const registration = await UserRegistration.init({
			userUUID: user.uuid,
		}).save()

		return registration
	}
}

@route.endpoint('POST', '/verify')
export class AuthVerifyEndpoint extends Endpoint<{
	body: { uuid: string }
}> {
	async handle() {
		const uuid = this.request.body.uuid
		const registration = await UserRegistration.findOneBy({ uuid })

		if (!registration) throw new ServerError('invalid registration', 400)

		const user = await User.findOneBy({ uuid: registration.userUUID })
		if (!user) {
			this.console.warn('user not found for registration: %s', uuid)
			throw new ServerError('invalid registration', 400)
		}

		await registration.remove()

		this.authed = user
		return user
	}
}
