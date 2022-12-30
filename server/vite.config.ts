import { defineConfig, loadEnv, Plugin } from 'vite'
import { VitePluginNode } from 'vite-plugin-node'
import { resolve } from 'path'
import { readFile } from 'fs/promises'

function EJSPlugin(): Plugin {
	const fileRegex = /\.(ejs)$/

	return {
		name: 'ejs-importer',
		enforce: 'pre',
		async load(id) {
			if (!fileRegex.test(id)) return
			const fileData = await readFile(id, 'utf8')
			return `export default ${JSON.stringify(fileData)}`
		},
	}
}

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
			EJSPlugin(),
			...VitePluginNode({
				adapter: 'fastify',
				appPath: 'src/index.ts',
				tsCompiler: 'swc',
			}),
		],

		build: {
			outDir: '../dist',
			emptyOutDir: true,
		},
	}
})
