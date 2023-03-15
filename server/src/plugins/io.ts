import { config } from '@construct/server/config'
import { inObject, isFunction, isObject } from '@michealpearce/utils'
import { FastifyInstance } from 'fastify'
import { Server, ServerOptions } from 'socket.io'

declare module '@construct/server/config' {
	export interface ConstructServerConfig {
		io?: Partial<ServerOptions> | false
	}
}

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
	if (config.io === false) {
		instance.log.info('socket.io disabled')
		return
	}

	const getSession = (sessionID: string, request: any = {}) =>
		new Promise<Record<string, any>>((resolve, reject) =>
			instance.decryptSession(sessionID, request, {}, err =>
				err ? reject(err) : resolve(request.session),
			),
		)

	const io = new Server(instance.server, config.io)

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
