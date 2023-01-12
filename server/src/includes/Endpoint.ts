import { ClassType, FunctionType, UserData } from '@construct/shared'
import {
	FastifyInstance,
	FastifyReply,
	FastifyRequest,
	HTTPMethods,
	onRequestHookHandler,
	RawReplyDefaultExpression,
	RawRequestDefaultExpression,
	RawServerDefault,
} from 'fastify'
import { join } from 'path'

export interface EndpointDefinition {
	body?: unknown
	query?: unknown
	params?: unknown
}

export type EndpointDefToGeneric<Def extends EndpointDefinition> = {
	Body: Def['body']
	Querystring: Def['query']
	Params: Def['params']
}

export type EndpointRequest<Def extends EndpointDefinition> = FastifyRequest<
	EndpointDefToGeneric<Def>
>
export type EndpointReply<Def extends EndpointDefinition> = FastifyReply<
	RawServerDefault,
	RawRequestDefaultExpression,
	RawReplyDefaultExpression,
	EndpointDefToGeneric<Def>
>

export abstract class Endpoint<
	Def extends EndpointDefinition = EndpointDefinition,
> {
	declare static method: HTTPMethods
	declare static url: string
	declare static handler: FunctionType

	declare static onRequest?: onRequestHookHandler | onRequestHookHandler[]

	static register?(instance: FastifyInstance): void

	get params() {
		return this.request.params
	}

	get query() {
		return this.request.query
	}

	get body() {
		return this.request.body
	}

	get headers() {
		return this.request.headers
	}

	get console() {
		return this.request.log
	}

	get session() {
		return this.request.session
	}

	get authed() {
		return this.session.get('authed')
	}

	set authed(user: UserData) {
		this.session.set('authed', user)
	}

	constructor(
		protected readonly instance: FastifyInstance,
		protected readonly request: EndpointRequest<Def>,
		protected readonly reply: EndpointReply<Def>,
	) {}

	middleware?(): void | Promise<void>

	abstract handle(): any
}

export type EndpointClass<EP extends Endpoint = Endpoint> = ClassType<
	EP,
	ConstructorParameters<typeof Endpoint>,
	typeof Endpoint
>

export function createRoute(
	path: string,
	onRegister?: (instance: FastifyInstance) => void | Promise<void>,
) {
	const endpoints = new Set<EndpointClass>()
	const middleware = new Set<FunctionType>()

	function endpoint(method: HTTPMethods, subPath?: string) {
		return function decorateClass(Target: any): any {
			Target.method = method
			Target.url = subPath ? join(path, subPath) : path
			Target.handler = async function (request: any, reply: any) {
				const endpoint = new Target(this, request, reply)

				for (const handler of middleware)
					await handler.call(this, request, reply)

				if (endpoint.middleware) await endpoint.middleware()
				return endpoint.handle()
			}

			endpoints.add(Target)
		}
	}

	async function register(instance: FastifyInstance) {
		if (onRegister) await onRegister(instance)

		for (const Endpoint of endpoints) {
			if (Endpoint.register) await Endpoint.register(instance)

			instance.log.info(`Registering ${Endpoint.method} ${Endpoint.url}`)
			instance.route(Endpoint)
		}
	}

	return Object.assign(register, {
		middleware,
		endpoint,
	})
}
