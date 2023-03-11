import { UserData } from '@construct/shared'
import { Endpoint, EndpointDefinition } from '@michealpearce/classy-fastify'

export abstract class ConstructEndpoint<
	Def extends EndpointDefinition = EndpointDefinition,
> extends Endpoint<Def> {
	get session() {
		return this.request.session
	}

	get authed() {
		return this.session.get('authed')
	}

	set authed(user: UserData) {
		this.session.set('authed', user)
	}
}
