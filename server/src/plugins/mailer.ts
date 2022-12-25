import { FastifyInstance } from 'fastify'
import { createTransport, Transporter } from 'nodemailer'

declare module 'fastify' {
	interface FastifyInstance {
		mailer: Transporter
	}
}

export async function registerMailer(instance: FastifyInstance) {
	if (import.meta.env.SERVER_SMTP_ENABLED !== 'true') {
		instance.log.warn('SMTP is disabled')
		return
	}

	const transporter = createTransport({
		host: import.meta.env.SERVER_SMTP_HOST,
		port: Number(import.meta.env.SERVER_SMTP_PORT),
		secure: false,
		auth: {
			user: import.meta.env.SERVER_SMTP_USER,
			pass: import.meta.env.SERVER_SMTP_PASS,
		},
	})

	try {
		instance.log.info('Testing SMTP connection')
		await transporter.verify()
		instance.log.info('SMTP connection successful')
	} catch (error) {
		instance.log.error(error, 'SMTP connection failed')
	}

	instance.decorate('mailer', transporter)
}
