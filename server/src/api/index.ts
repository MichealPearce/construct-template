import { registerAuthRoute } from '@construct/server/api/auth'
import { registerUsersRoute } from '@construct/server/api/users'
import { FastifyInstance } from 'fastify'

export async function registerAPI(instance: FastifyInstance) {
	await instance.register(registerAuthRoute).register(registerUsersRoute)
}
