import fastifyStatic from '@fastify/static'
import { FastifyInstance } from 'fastify'
import { resolve } from 'path'

const clientFolderPath = resolve(__APP_ROOT__, 'dist/client')

export async function registerClient(instance: FastifyInstance) {
	if (import.meta.env.DEV) return
	await instance.register(fastifyStatic, {
		root: clientFolderPath,
		wildcard: false,
	})

	instance.get('/*', (_request, reply) => {
		return reply.sendFile('index.html')
	})
}
