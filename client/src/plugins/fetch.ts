import { useContext } from '@construct/client/includes/functions'
import { ClientContext } from '@construct/client/types'
import { ConstructError, FunctionType } from '@construct/shared'
import { onBeforeMount, reactive } from 'vue'

export type UseFetch<Result> = {
	refresh: () => Promise<void>
	result: Result | null
	error: Error | null
	pending: boolean
}

export function registerFetch(context: ClientContext) {}

export function useFetch<
	Handler extends FunctionType,
	Result extends Awaited<ReturnType<Handler>>,
>(handler: Handler): UseFetch<Result> {
	const state = reactive<{
		pending: boolean
		error: Error | null
		result: any
	}>({
		pending: false,
		result: null,
		error: null,
	})

	async function fetch() {
		state.pending = true

		try {
			state.result = await handler()
		} catch (error) {
			state.error = new ConstructError('fetch failed', error)
		} finally {
			state.pending = false
		}
	}

	onBeforeMount(fetch)

	return {
		refresh: () => fetch(),
		get result() {
			return state.result
		},
		get error() {
			return state.error
		},
		get pending() {
			return state.pending
		},
	}
}
