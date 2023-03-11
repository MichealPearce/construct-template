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
		current.value = UserData.init(data)

		return data
	}

	async function login(creds: LoginCreds) {
		const { data } = await api.post<UserData>('auth', creds)
		current.value = UserData.init(data)
	}

	async function logout() {
		await api.delete('auth')
		current.value = null
	}

	function register(data: RegisterData) {
		return api
			.post<UserRegistrationData>('auth/register', data)
			.then(res => UserRegistrationData.init(res.data))
	}

	async function verifyRegistration(uuid: string) {
		const { data } = await api.post<UserData>('auth/verify', { uuid })

		current.value = UserData.init(data)
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
