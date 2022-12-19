import { User } from '@construct/server/database/models/User'
import { FastifyInstance } from 'fastify'
import { resolve } from 'path'
import { DataSource } from 'typeorm'

export async function registerDatabase(instance: FastifyInstance) {
	const source = new DataSource({
		type: 'sqlite',
		database: resolve(__BIN_ROOT__, 'database.sqlite'),
		entities: [User],
		synchronize: true,
	})

	try {
		console.log('connecting to database...')
		await source.initialize()
		console.log('connected to database')
	} catch (error) {
		console.error('failed to connect to database', error)
	}

	instance.decorate('database', source)
}
