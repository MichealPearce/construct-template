import { isAdminUser, not, ServerError, UserData } from '@construct/shared'
import { onRequestHookHandler } from 'fastify'

export const isAdmin: onRequestHookHandler = function (request, _reply, done) {
	const unauthedError = new ServerError('unauthorized', 401)
	const user = request.session.get<UserData | undefined>('authed')

	if (!user || not(isAdminUser(user))) return done(unauthedError)
	return done()
}
