import { registerAuthRoute } from '@construct/server/api/auth'
import { registerUserRolesRoute } from '@construct/server/api/userRoles'
import { registerUsersRoute } from '@construct/server/api/users'
import { FastifyInstance } from 'fastify'

export async function registerAPI(instance: FastifyInstance) {
	await instance
		.register(registerAuthRoute)
		.register(registerUsersRoute)
		.register(registerUserRolesRoute)
}
