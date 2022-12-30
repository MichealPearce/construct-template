import { defineConfig, loadEnv } from 'vite'
import { VitePluginNode } from 'vite-plugin-node'
import { resolve } from 'path'
import { VitePluginEJSImporter } from 'vite-plugin-ejs-importer'

export default defineConfig(env => {
	const envars = loadEnv(env.mode, '../', ['CLIENT_', 'SERVER_'])

	// const clientURL = new URL(envars.CLIENT_URL ?? 'http://localhost:3000')
	const serverURL = new URL(envars.SERVER_URL ?? 'http://localhost:3001')

	return {
		envDir: '../',
		envPrefix: ['SERVER_', 'CLIENT_'],

		define: {
			__APP_ROOT__: `"${resolve('../')}"`,
			__BIN_ROOT__: `"${resolve('../bin')}"`,
		},

		resolve: {
			alias: {
				'@construct/server': resolve('src'),
			},
		},

		server: {
			port: Number(serverURL.port),
		},

		plugins: [
			VitePluginEJSImporter(),
			...VitePluginNode({
				adapter: 'fastify',
				appPath: 'src/index.ts',
			}),
		],

		build: {
			outDir: '../dist',
			emptyOutDir: true,
		},
	}
})
