import { defineMiddleware } from '@construct/client/includes/functions'
import { useAuth } from '@construct/client/stores/auth'

export const authed = defineMiddleware(function (to, from, context) {
	const auth = useAuth(context)
	console.log('authed middleware', auth.current)
})
