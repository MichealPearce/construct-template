import { registerAuthRoute } from '@construct/server/api/auth'
import { FastifyInstance } from 'fastify'

export async function registerAPI(instance: FastifyInstance) {
	await instance.register(registerAuthRoute)
}
