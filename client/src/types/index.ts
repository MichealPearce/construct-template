import { App } from 'vue'
import {
	NavigationGuard,
	RouteLocationNormalized,
	RouteLocationRaw,
} from 'vue-router'

export interface ClientState {}

export interface ClientContext {
	app: App
	state: ClientState
}

type NavigationGuardReturn = void | Error | RouteLocationRaw | boolean
export type MiddlewareHandler = (
	to: RouteLocationNormalized,
	from: RouteLocationNormalized,
	context: ClientContext,
) => NavigationGuardReturn | Promise<NavigationGuardReturn>
