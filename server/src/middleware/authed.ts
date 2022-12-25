import { ServerError } from '@construct/shared'
import { onRequestHookHandler } from 'fastify'

export const authed: onRequestHookHandler = function (request, _reply, done) {
	const user = request.session.get('authed')

	if (!user) return done(new ServerError('unauthorized', 401))
	else return done()
}
