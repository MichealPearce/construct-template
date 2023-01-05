import { defineStore } from '@construct/client/includes/functions'
import { UserAvatarData, UserData } from '@construct/shared'
import { inject, InjectionKey, provide, reactive, Ref } from 'vue'

export type UserInjectionValue = Ref<UserData | null>
export const UserInjectionKey: InjectionKey<UserInjectionValue> = Symbol('user')

export const provideUser = (user: UserInjectionValue) =>
	provide(UserInjectionKey, user)
export const injectUser = () => inject(UserInjectionKey)!

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

	function update(uuid: string, data: Partial<UserData>) {
		return api
			.patch(`users/${uuid}`, data)
			.then(res => res.data)
			.then(set)
	}

	function addRole(uuid: string, name: string) {
		return api
			.post(`users/${uuid}/roles/${name}`)
			.then(res => res.data)
			.then(set)
	}

	function removeRole(uuid: string, name: string) {
		return api
			.delete(`users/${uuid}/roles/${name}`)
			.then(res => res.data)
			.then(set)
	}

	function uploadAvatar(user: UserData, data: FormData) {
		return api
			.post<UserAvatarData>(`avatars/${user.uuid}`, data)
			.then(res => res.data)
			.then(avatar => {
				user.avatarUUID = avatar.uuid
				user.avatar = avatar
				return avatar
			})
	}

	function fetchAvatar(user: UserData) {
		return api
			.get<UserAvatarData>(`avatars/${user.uuid}?raw=true`)
			.then(res => res.data)
			.then(avatar => {
				user.avatarUUID = avatar.uuid
				user.avatar = avatar
				return avatar
			})
	}

	function deleteAvatar(user: UserData) {
		return api.delete(`avatars/${user.uuid}`).then(() => {
			user.avatarUUID = null
			delete user.avatar
		})
	}

	return {
		items,
		get,
		set,
		fetch,
		list,
		create,
		update,
		addRole,
		removeRole,
		uploadAvatar,
		fetchAvatar,
		deleteAvatar,
	}
})
