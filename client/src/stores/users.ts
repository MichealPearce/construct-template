import { defineStore } from '@construct/client/includes/functions'
import { UserData } from '@construct/shared'
import { reactive } from 'vue'

export const useUsers = defineStore('users', context => {
	const { api } = context

	const items = reactive<{
		[key: string]: UserData
	}>({})

	function get(uuid: string): UserData | undefined {
		return items[uuid]
	}

	async function list(params?: Record<string, any>) {
		const data = await api
			.get<UserData[]>('users', { params })
			.then(res => res.data)

		for (const item of data) items[item.uuid] = item

		return data
	}

	async function create(data: {
		name: string
		email: string
		password: string
	}) {
		const newUser = await api.post('users', data).then(res => res.data)
		items[newUser.uuid] = newUser
		return newUser
	}

	return {
		items,
		get,
		list,
		create,
	}
})
