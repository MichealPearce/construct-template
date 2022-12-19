import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import Components from 'unplugin-vue-components/vite'

// https://vitejs.dev/config/
export default defineConfig(env => {
	const envars = loadEnv(env.mode, '../', ['CLIENT_', 'SERVER_'])

	const clientURL = new URL(envars.CLIENT_URL ?? 'http://localhost:3000')
	const serverURL = new URL(envars.SERVER_URL ?? 'http://localhost:3001')

	return {
		envDir: '../',
		envPrefix: 'CLIENT_',

		server: {
			port: Number(clientURL.port),

			proxy: {
				'/api': {
					target: serverURL.origin,
					changeOrigin: true,
				},
				'/socket.io': {
					target: serverURL.origin,
					changeOrigin: true,
					ws: true,
				},
			},
		},

		plugins: [
			vue(),
			Pages({
				routeStyle: 'nuxt',
			}),
			Layouts(),
			Components({
				dts: 'src/types/components.d.ts',
				deep: true,
				directoryAsNamespace: true,
			}),
		],
	}
})
