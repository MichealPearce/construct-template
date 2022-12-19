import { ClientContext } from '@construct/client/types'
import axios, { AxiosInstance } from 'axios'

declare module '@construct/client/types' {
	interface ClientContext {
		api: AxiosInstance
	}
}

export function setupAPI(context: ClientContext) {
	const baseURL = new URL('/api', import.meta.env.CLIENT_URL).href

	const api = axios.create({
		baseURL,
	})

	context.api = api
	context.app.provide('api', api)
}
