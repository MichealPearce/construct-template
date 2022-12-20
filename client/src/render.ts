import { setupAPI } from '@construct/client/plugins/api'
import { setupRouter } from '@construct/client/plugins/router'
import { ClientContext } from '@construct/client/types'
import { createApp, reactive } from 'vue'
import App from './App.vue'

const context = {
	app: createApp(App),
	state: reactive({}),
} as ClientContext

async function mount() {
	context.app.provide('context', context)
	await setupAPI(context)
	setupRouter(context)

	context.app.mount('#app')
}

mount()
