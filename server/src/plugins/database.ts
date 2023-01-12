import { AppFile } from '@construct/server/database/models/AppFile'
import { AppSession } from '@construct/server/database/models/AppSession'
import { User } from '@construct/server/database/models/User'
import { UserAvatar } from '@construct/server/database/models/UserAvatar'
import { UserRegistration } from '@construct/server/database/models/UserRegistration'
import { UserRole } from '@construct/server/database/models/UserRole'
import { hashPassword } from '@construct/server/includes/functions'
import { ConstructError } from '@construct/shared'
import { FastifyInstance } from 'fastify'
import { resolve } from 'path'
import { DataSource } from 'typeorm'

export async function registerDatabase(instance: FastifyInstance) {
	const source = new DataSource({
		type: 'sqlite',
		database: resolve(__BIN_ROOT__, 'database.sqlite'),
		entities: [
			User,
			UserRole,
			AppSession,
			UserRegistration,
			AppFile,
			UserAvatar,
		],
		synchronize: true,
		// logging: true,
	})

	try {
		instance.log.info('connecting to database...')
		await source.initialize()
		instance.log.info('connected to database')
	} catch (error) {
		throw new ConstructError('failed to connect to database', error)
	}

	instance.decorate('database', source)
	await setupRootUser()
	// await createTestUsers()
}

async function setupRootUser() {
	console.info('checking for admin role')
	const adminRole = await UserRole.findOneByOrFail({
		name: 'admin',
	}).catch(() => {
		console.info('creating admin role')
		return UserRole.init({
			name: 'admin',
			display_name: 'Admin',
		}).save()
	})

	console.info('checking for root user')
	await User.findOneByOrFail({
		name: 'root',
	}).catch(async () => {
		console.info('creating root user')
		return User.init({
			name: 'root',
			display_name: '[ROOT]',
			email: 'root@localhost.com',
			password: await hashPassword('root'),
			roles: [adminRole],
		}).save()
	})
}
