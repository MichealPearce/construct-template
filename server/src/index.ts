import { registerAPI } from '@construct/server/api'
import { registerClient } from '@construct/server/plugins/client'
import { registerDatabase } from '@construct/server/plugins/database'
import fastifyCookie from '@fastify/cookie'
import fastifySession from '@fastify/session'
import fastify from 'fastify'

async function start() {
	const app = fastify({
		ignoreTrailingSlash: true,
	})

	await registerDatabase(app)

	await app
		.register(fastifyCookie)
		.register(fastifySession, {
			secret: import.meta.env.SERVER_SESSION_SECRET,
			cookieName: 'construct-session',
			cookie: {
				httpOnly: true,
				secure: false,
			},
		})
		.register(registerAPI, {
			prefix: '/api',
		})
		.register(registerClient)

	const serverURL = new URL(import.meta.env.SERVER_URL)
	const listenURL = await app.listen({
		host: serverURL.hostname,
		port: Number(serverURL.port),
	})

	console.log(`listening on ${listenURL}`)
}

start()
