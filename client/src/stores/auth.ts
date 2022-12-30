import { defineStore } from '@construct/client/includes/functions'
import {
	LoginCreds,
	RegisterData,
	UserData,
	UserRegistrationData,
} from '@construct/shared'
import { ref } from 'vue'

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

	function register(data: RegisterData) {
		return api
			.post<UserRegistrationData>('auth/register', data)
			.then(res => res.data)
	}

	async function verifyRegistration(uuid: string) {
		const user = await api
			.post<UserData>('auth/verify', { uuid })
			.then(res => res.data)

		current.value = user
		return current.value
	}

	return {
		current,
		fetch,
		login,
		logout,
		register,
		verifyRegistration,
	}
})
