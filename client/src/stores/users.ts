import { defineStore } from '@construct/client/includes/functions'
import { UserData } from '@construct/shared'
import { reactive } from 'vue'

export const useUsers = defineStore('users', context => {
	const { api } = context

	const cache = new Map<string, number>()
	const items = reactive<{
		[key: string]: UserData
	}>({})

	function get(uuid: string): UserData | undefined {
		return items[uuid]
	}

	/**
	 * Sets a user in the cache
	 */
	function set(data: UserData) {
		if (data.uuid in items) Object.assign(items[data.uuid], data)
		else items[data.uuid] = data

		return items[data.uuid]
	}

	/**
	 * Fetches a user from the API and caches it for 15 minutes
	 */
	function fetch(uuid: string) {
		return new Promise<UserData>((resolve, reject) => {
			if (cache.has(uuid)) {
				const expires = cache.get(uuid)!
				if (expires > Date.now()) resolve(get(uuid)!)
				else cache.delete(uuid)
			}

			return api
				.get<UserData>(`users/${uuid}`)
				.then(res => res.data)
				.then(set)
				.then(item => {
					// 15 minutes
					const expiresAt = Date.now() + 15 * 60 * 1000
					cache.set(uuid, expiresAt)
					resolve(item)
				})
				.catch(reject)
		})
	}

	async function list(params?: Record<string, any>) {
		const data = await api
			.get<UserData[]>('users', { params })
			.then(res => res.data)

		for (const item of data) set(item)

		return data
	}

	async function create(data: {
		name: string
		email: string
		password: string
	}) {
		const item = await api.post('users', data).then(res => res.data)
		return set(item)
	}

	return {
		items,
		get,
		set,
		fetch,
		list,
		create,
	}
})
