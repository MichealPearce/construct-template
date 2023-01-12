import { authRoute } from '@construct/server/api/auth'
import { avatarsRoute } from '@construct/server/api/avatars'
import { userRolesRoute } from '@construct/server/api/userRoles'
import { usersRoute } from '@construct/server/api/users'
import { FastifyInstance } from 'fastify'

export async function registerAPI(instance: FastifyInstance) {
	await instance
		.register(authRoute.register)
		.register(usersRoute.register)
		.register(userRolesRoute.register)
		.register(avatarsRoute.register)
}
