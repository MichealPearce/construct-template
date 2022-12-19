import { setupAPI } from '@construct/client/plugins/api'
import { setupRouter } from '@construct/client/plugins/router'
import { ClientContext } from '@construct/client/types'
import { createApp, reactive } from 'vue'
import App from './App.vue'

const context = {
	app: createApp(App),
	state: reactive({}),
} as ClientContext

setupRouter(context)
setupAPI(context)

context.app.provide('context', context)

context.app.mount('#app')
