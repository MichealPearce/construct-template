import { FastifyInstance, FastifyPluginOptions } from 'fastify'

const Override = Symbol.for('override-skip')

export type PluginRegisterHandler<Options extends FastifyPluginOptions> = {
	(instance: FastifyInstance, options?: Options): Promise<void> | void
	[Override]?: boolean
}

export function definePlugin<Options extends FastifyPluginOptions>(
	register: PluginRegisterHandler<Options>,
	global = false,
): PluginRegisterHandler<Options> {
	const handle: PluginRegisterHandler<Options> = async (instance, options) =>
		register(instance, options)

	return Object.assign(handle, {
		[Override]: global,
	})
}
