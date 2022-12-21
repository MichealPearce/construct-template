import { defineStore } from '@construct/client/includes/functions'
import { UserRoleData } from '@construct/shared'
import { reactive } from 'vue'

export const useUserRoles = defineStore('userRoles', context => {
	const { api } = context

	const items = reactive<{
		[name: string]: UserRoleData
	}>({})

	function get(name: string) {
		return items[name]
	}

	async function list(params?: Record<string, any>) {
		const data = await api
			.get<UserRoleData[]>('users/roles', { params })
			.then(res => res.data)

		for (const item of data) items[item.name] = item

		return data
	}

	async function create(data: { name: string }) {
		const item = await api
			.post<UserRoleData>('users/roles', data)
			.then(res => res.data)

		items[item.name] = item

		return item
	}

	return {
		items,
		get,
		list,
		create,
	}
})
