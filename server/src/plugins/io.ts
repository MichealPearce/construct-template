import { inObject, isFunction, isObject } from '@construct/shared'
import { FastifyInstance } from 'fastify'
import { Server } from 'socket.io'

declare module 'fastify' {
	interface FastifyInstance {
		io: Server
	}
}

export async function registerIO(instance: FastifyInstance) {
	const io = new Server(instance.server, {
		path: '/io',
		serveClient: false,
		cors: {
			origin: import.meta.env.CLIENT_URL,
		},
	})

	instance.decorate('io', io)

	const namespaces = import.meta.glob('../api/**/*.socket.ts', {
		eager: true,
	})

	for (const [path, imported] of Object.entries(namespaces)) {
		if (
			isObject(imported) &&
			inObject(imported, ['socket']) &&
			isFunction(imported.socket)
		) {
			instance.log.info('registering socket: %s', path)
			await instance.register(imported.socket)
		}
	}
}
