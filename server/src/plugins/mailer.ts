import { FastifyInstance } from 'fastify'
import { createTransport } from 'nodemailer'

export async function registerMailer(instance: FastifyInstance) {
	const transporter = createTransport({
		host: import.meta.env.SERVER_SMTP_HOST,
		port: Number(import.meta.env.SERVER_SMTP_PORT),
	})
}
