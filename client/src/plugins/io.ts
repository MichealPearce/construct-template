import { useContext } from '@construct/client/includes/functions'
import { ClientContext } from '@construct/client/types'
import IO, { Socket } from 'socket.io-client'

declare module '@construct/client/types' {
	interface ClientContext {
		io: (namespace?: string) => Socket
	}
}

export function setupIO(context: ClientContext) {
	const io = (namespace = '/') =>
		IO(namespace, {
			path: '/io',
			withCredentials: true,
		})

	context.io = io
}

export function useSocket(namespace?: string, context = useContext()) {
	return context.io(namespace)
}
