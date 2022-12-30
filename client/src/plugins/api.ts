import { useContext } from '@construct/client/includes/functions'
import { useAuth } from '@construct/client/stores/auth'
import { ClientContext } from '@construct/client/types'
import { noop } from '@construct/shared'
import axios, { AxiosInstance } from 'axios'

declare module '@construct/client/types' {
	interface ClientContext {
		api: AxiosInstance
	}
}

export async function setupAPI(context: ClientContext) {
	const baseURL = new URL('/api', __API_URL__).href

	const api = axios.create({
		baseURL,
	})

	context.api = api
	context.app.provide('api', api)

	const auth = useAuth(context)
	await auth.fetch().catch(noop)
}

export function useAPI(context: ClientContext = useContext()) {
	return context.api
}
