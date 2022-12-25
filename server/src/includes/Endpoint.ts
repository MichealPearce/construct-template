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
		protected readonly request: EndpointRequest<Def>,
		protected readonly reply: EndpointReply<Def>,
	) {}

	abstract handle(): any
}

export type EndpointClass<EP extends Endpoint = Endpoint> = ClassType<
	EP,
	ConstructorParameters<typeof Endpoint>,
	typeof Endpoint
>

export function createRoute(path: string) {
	const endpoints = new Set<EndpointClass>()

	function endpoint(method: HTTPMethods, subPath?: string) {
		return function decorateClass(Target: any): any {
			Target.method = method
			Target.url = subPath ? join(path, subPath) : path
			Target.handler = async function (request: any, reply: any) {
				const endpoint = new Target(request, reply)
				return endpoint.handle()
			}

			endpoints.add(Target)
		}
	}

	async function register(instance: FastifyInstance) {
		for (const Endpoint of endpoints) {
			if (Endpoint.register) await Endpoint.register(instance)

			console.log(`Registering ${Endpoint.method} ${Endpoint.url}`)
			instance.route(Endpoint)
		}
	}

	return {
		endpoint,
		register,
	}
}
