import { ServerError, UserData } from '@construct/shared'
import { onRequestHookHandler } from 'fastify'

export const isAdmin: onRequestHookHandler = function (request, _reply, done) {
	const unauthedError = new ServerError('unauthorized', 401)
	const user = request.session.get<UserData | undefined>('user')

	if (!user) return done(unauthedError)

	const hasAdminRole = user.roles.some(role => role.name === 'admin')
	if (!hasAdminRole) return done(unauthedError)
}
