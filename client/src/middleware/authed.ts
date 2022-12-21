import { defineMiddleware } from '@construct/client/includes/functions'
import { useAuth } from '@construct/client/stores/auth'

export const authed = defineMiddleware(async function (to, from, context) {
	const auth = useAuth(context)

	const isLoggedOut = !auth.current
	const isLoginPage = to.fullPath.startsWith('/login')
	const isNotLoginPage = !isLoginPage

	if (isLoggedOut && isNotLoginPage) {
		const redirect = to.fullPath
		return `/login?redirect=${redirect}`
	}
})
