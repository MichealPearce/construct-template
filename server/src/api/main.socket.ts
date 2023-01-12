import { definePlugin } from '@construct/server/includes/definePlugin'

export const socket = definePlugin(instance => {
	const io = instance.io

	io.on('connection', socket => {
		instance.log.info('user connected')

		socket.on('disconnect', () => {
			instance.log.info('user disconnected')
		})
	})
})
