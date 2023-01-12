import { inObject, isFunction, isObject } from '@construct/shared'
import { FastifyInstance } from 'fastify'
import { Server } from 'socket.io'

declare module 'fastify' {
	interface FastifyInstance {
		io: Server
	}
}

declare module 'socket.io' {
	interface Socket {
		session: Map<string, any>
	}
}

export async function registerIO(instance: FastifyInstance) {
	const getSession = (sessionID: string, request: any = {}) =>
		new Promise<Record<string, any>>((resolve, reject) =>
			instance.decryptSession(sessionID, request, {}, err =>
				err ? reject(err) : resolve(request.session),
			),
		)

	const io = new Server(instance.server, {
		path: '/io',
		serveClient: false,
		cors: {
			origin: import.meta.env.CLIENT_URL,
		},
	})

	instance.decorate('io', io)

	io.use(async (socket, next) => {
		socket.session = new Map()
		const cookies = instance.parseCookie(socket.request.headers.cookie ?? '')
		const sessionID = cookies['construct-session']

		if (!sessionID) return next()
		try {
			const data = await getSession(sessionID)
			for (const [key, value] of Object.entries(data))
				socket.session.set(key, value)
		} catch (error) {
			instance.log.info(error, 'failed getting session')
		} finally {
			next()
		}
	})

	const sockets = import.meta.glob('../api/**/*.socket.ts', {
		eager: true,
	})

	for (const [path, imported] of Object.entries(sockets)) {
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
