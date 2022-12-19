import { User } from '@construct/server/database/models/User'
import { UserRole } from '@construct/server/database/models/UserRole'
import { hashPassword } from '@construct/server/includes/functions'
import { FastifyInstance } from 'fastify'
import { resolve } from 'path'
import { DataSource } from 'typeorm'

export async function registerDatabase(instance: FastifyInstance) {
	const source = new DataSource({
		type: 'sqlite',
		database: resolve(__BIN_ROOT__, 'database.sqlite'),
		entities: [User, UserRole],
		synchronize: true,
		logging: true,
	})

	try {
		console.log('connecting to database...')
		await source.initialize()
		console.log('connected to database')
	} catch (error) {
		console.error('failed to connect to database', error)
	}

	instance.decorate('database', source)
	await setupRootUser()
}

async function setupRootUser() {
	const adminRole = await UserRole.findOneByOrFail({
		name: 'admin',
	}).catch(() =>
		UserRole.init({
			name: 'admin',
		}).save(),
	)

	await User.findOneByOrFail({
		name: 'root',
	}).catch(async () =>
		User.init({
			name: 'root',
			email: 'root@localhost.com',
			password: await hashPassword('root'),
			roles: [adminRole],
		}).save(),
	)
}
