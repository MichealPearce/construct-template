import { ClientContext, MiddlewareHandler } from '@construct/client/types'
import { inject, unref, UnwrapRef } from 'vue'

export function useContext() {
	return inject('context') as ClientContext
}

export function defineMiddleware(handler: MiddlewareHandler) {
	return handler
}

export type StoreDefinition<State = any> = (context: ClientContext) => State

export function defineStore<State>(
	namespace: string,
	definition: StoreDefinition<State>,
) {
	return function useStore(context = useContext()): UnwrapRef<State> {
		if (!context.state[namespace])
			context.state[namespace] = unref(definition(context))

		return context.state[namespace]
	}
}
