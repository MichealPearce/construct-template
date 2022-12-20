import { defineMiddleware } from '@construct/client/includes/functions'
import { useAuth } from '@construct/client/stores/auth'

export const isAdmin = defineMiddleware(function (to, from, context) {
	const auth = useAuth(context)
	const user = auth.current

	if (!user) return '/login'

	const adminRole = user.roles.find(role => role.name === 'admin')
	if (!adminRole) return '/'
})
