import { defineStore } from '@construct/client/includes/functions'
import { UserRoleData } from '@construct/shared'
import { inject, InjectionKey, provide, reactive, Ref } from 'vue'

export type UserRoleInjectionValue = Ref<UserRoleData | null>
export const UserRoleInjectionKey: InjectionKey<UserRoleInjectionValue> =
	Symbol('userRole')

export const provideUserRole = (userRole: UserRoleInjectionValue) =>
	provide(UserRoleInjectionKey, userRole)
export const injectUserRole = () => inject(UserRoleInjectionKey)!

export const useUserRoles = defineStore('userRoles', context => {
	const { api } = context

	const items = reactive<{
		[name: string]: UserRoleData
	}>({})

	function get(name: string) {
		return items[name]
	}

	function set(data: UserRoleData) {
		if (data.name in items) Object.assign(items[data.name], data)
		else items[data.name] = data

		return get(data.name)!
	}

	async function list(params?: Record<string, any>) {
		const data = await api
			.get<UserRoleData[]>('users/roles', { params })
			.then(res => res.data)

		for (const item of data) items[item.name] = item

		return data
	}

	function create(data: { name: string }) {
		return api
			.post<UserRoleData>('users/roles', data)
			.then(res => res.data)
			.then(set)
	}

	return {
		items,
		get,
		set,
		list,
		create,
	}
})
