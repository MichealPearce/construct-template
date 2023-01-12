import { SessionStore } from '@construct/server/includes/SessionStore'
import { registerClient } from '@construct/server/plugins/client'
import { registerDatabase } from '@construct/server/plugins/database'
import { registerIO } from '@construct/server/plugins/io'
import { registerMailer } from '@construct/server/plugins/mailer'
import { registerRoutes } from '@construct/server/plugins/routes'
import fastifyCookie from '@fastify/cookie'
import fastifyMultipart from '@fastify/multipart'
import fastifySession from '@fastify/session'
import fastify from 'fastify'

async function start() {
	const app = fastify({
		ignoreTrailingSlash: true,
		logger: true,
	})

	await app
		.register(fastifyCookie)
		.register(fastifySession, {
			secret: import.meta.env.SERVER_SESSION_SECRET,
			cookieName: 'construct-session',
			cookie: {
				httpOnly: true,
				secure: import.meta.env.PROD,
			},
			store: new SessionStore(),
		})
		.register(fastifyMultipart)

	await registerDatabase(app)
	await registerMailer(app)
	await registerIO(app)

	await app.register(registerRoutes).register(registerClient)

	const serverURL = new URL(import.meta.env.SERVER_URL)
	await app.listen({
		host: serverURL.hostname,
		port: Number(serverURL.port),
	})
}

start()
