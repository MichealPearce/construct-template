import { ClientContext, MiddlewareHandler } from '@construct/client/types'
import { setupLayouts } from 'layouts-generated'
import {
	createRouter,
	createWebHistory,
	Router,
	RouteRecordRaw,
} from 'vue-router'
import generatedRoutes from 'virtual:generated-pages'
import { isDefined } from '@construct/shared'

declare module '@construct/client/types' {
	interface ClientContext {
		router: Router
	}
}

declare module '@vue/runtime-core' {
	export interface ComponentCustomProperties {
		middleware?: MiddlewareHandler[]
	}
}

declare module 'vue-router' {
	interface RouteMeta {
		middleware?: MiddlewareHandler[]
	}
}

export function setupRouter(context: ClientContext) {
	const routes = setupRouteMeta(setupLayouts(generatedRoutes))
	const router = createRouter({ routes, history: createWebHistory() })

	router.beforeEach(async (to, from) => {
		const middlewares = new Set<MiddlewareHandler>()

		for (const matched of to.matched) {
			if (!matched.meta?.middleware) continue
			for (const middleware of matched.meta.middleware)
				middlewares.add(middleware)
		}

		for (const middleware of middlewares) {
			const result = await middleware(to, from, context)
			if (isDefined(result)) return result
		}
	})

	context.router = router
	context.app.use(router)
}

export function setupRouteMeta(routes: RouteRecordRaw[]): RouteRecordRaw[] {
	for (const route of routes) {
		if (route.children) setupRouteMeta(route.children)

		const c = route.component
		if (!c) continue
		const middleware = (c as any).middleware

		if (!middleware) continue

		if (!route.meta) route.meta = { middleware }
		else if (route.meta.middleware) route.meta.middleware.push(...middleware)
		else route.meta.middleware = middleware
	}

	return routes
}
