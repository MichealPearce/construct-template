import { defineMiddleware } from '@construct/client/includes/functions'
import { useAuth } from '@construct/client/stores/auth'

export const isAdmin = defineMiddleware(function (to, from, context) {
	const auth = useAuth(context)
	const user = auth.current

	if (!user) {
		const redirect = to.fullPath
		return `/login?redirect=${redirect}`
	}

	const adminRole = user.roles.find(role => role.name === 'admin')
	if (!adminRole) return '/'
})
