import { defineStore } from '@construct/client/includes/functions'
import { UserData } from '@construct/shared'
import { ref } from 'vue'

export type LoginCreds = {
	username: string
	password: string
}

export const useAuth = defineStore('auth', context => {
	const { api } = context

	const current = ref<UserData | null>(null)

	async function fetch() {
		const { data } = await api.get<UserData>('auth')
		current.value = data

		return data
	}

	async function login(creds: LoginCreds) {
		const { data } = await api.post<UserData>('auth', creds)
		current.value = data
	}

	async function logout() {
		await api.delete('auth')
		current.value = null
	}

	return {
		current,
		fetch,
		login,
		logout,
	}
})
