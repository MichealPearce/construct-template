import { registerAPI } from '@construct/server/api'
import { registerClient } from '@construct/server/plugins/client'
import { registerDatabase } from '@construct/server/plugins/database'
import fastify from 'fastify'

async function start() {
	const app = fastify({
		ignoreTrailingSlash: true,
		logger: true,
	})

	await registerDatabase(app)

	await app
		.register(registerAPI, {
			prefix: '/api',
		})
		.register(registerClient)

	const serverURL = new URL(import.meta.env.SERVER_URL)
	await app.listen({
		host: serverURL.hostname,
		port: Number(serverURL.port),
	})
}

start()
