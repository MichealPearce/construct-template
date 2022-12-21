import { AppSession } from '@construct/server/database/models/AppSession'
import type * as Fastify from 'fastify'

type Callback = (err?: Error) => void
type CallbackSession = (err: Error | null, result: Fastify.Session) => void

export class SessionStore {
	get(id: string, callback: CallbackSession) {
		return AppSession.findOneBy({ id })
			.then(session => callback(null, session?.data ?? {}))
			.catch(err => callback(err, {} as any))
	}

	set(id: string, data: Fastify.Session, callback: Callback) {
		return AppSession.init({ id, data })
			.save()
			.then(() => callback())
			.catch(callback)
	}

	destroy(id: string, callback: Callback) {
		return AppSession.delete({ id })
			.then(() => callback())
			.catch(callback)
	}
}
