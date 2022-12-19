import { registerClient } from '@construct/server/plugins/client'
import { registerDatabase } from '@construct/server/plugins/database'
import fastify from 'fastify'

async function start() {
	const app = fastify({
		ignoreTrailingSlash: true,
	})

	await registerDatabase(app)
	await app.register(registerClient)

	const serverURL = new URL(import.meta.env.SERVER_URL)
	const listenURL = await app.listen({
		host: serverURL.hostname,
		port: Number(serverURL.port),
	})

	console.log(`listening on ${listenURL}`)
}

start()
