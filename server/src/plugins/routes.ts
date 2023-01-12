import { definePlugin } from '@construct/server/includes/definePlugin'
import { isObject, inObject, isFunction } from '@construct/shared'

export const registerRoutes = definePlugin(async instance => {
	const routes = import.meta.glob('../api/**/*.route.ts', {
		eager: true,
	})

	for (const [path, imported] of Object.entries(routes)) {
		if (
			isObject(imported) &&
			inObject(imported, ['route']) &&
			isFunction(imported.route)
		) {
			instance.log.info(`Registering route: ${path}`)
			await instance.register(imported.route, {
				prefix: '/api',
			})
		}
	}
}, true)
