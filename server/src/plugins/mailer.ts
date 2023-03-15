import { config } from '@construct/server/config'
import { FastifyInstance } from 'fastify'
import { createTransport, Transporter } from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'

declare module '@construct/server/config' {
	export interface ConstructServerConfig {
		mailer?: SMTPTransport | SMTPTransport.Options | string
	}
}

declare module 'fastify' {
	interface FastifyInstance {
		mailer: Transporter
	}
}

export async function registerMailer(instance: FastifyInstance) {
	if (import.meta.env.SERVER_SMTP_ENABLED !== 'true' || !config.mailer) {
		instance.log.warn('SMTP is disabled')
		return
	}

	const transporter = createTransport(config.mailer)

	try {
		instance.log.info('Testing SMTP connection')
		await transporter.verify()
		instance.log.info('SMTP connection successful')
	} catch (error) {
		instance.log.error(error, 'SMTP connection failed')
	}

	instance.decorate('mailer', transporter)
}
