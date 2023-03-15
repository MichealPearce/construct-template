import { models } from '@construct/server/database/models'
import { resolve } from 'path'

export interface ConstructServerConfig {}

export const config: ConstructServerConfig = {
	database: {
		type: 'sqlite',
		database: resolve(__BIN_ROOT__, 'database.sqlite'),
		entities: Array.from(models),
		synchronize: true,
		// logging: true,
	},
	mailer: {
		host: import.meta.env.SERVER_SMTP_HOST,
		port: Number(import.meta.env.SERVER_SMTP_PORT),
		secure: false,
		auth: {
			user: import.meta.env.SERVER_SMTP_USER,
			pass: import.meta.env.SERVER_SMTP_PASS,
		},
	},
	io: {
		path: '/io',
		serveClient: false,
		cors: {
			origin: import.meta.env.CLIENT_URL,
		},
	},
}
