/// <reference types="vite/client" />

declare const __APP_ROOT__: string
declare const __BIN_ROOT__: string

declare module '*.ejs' {
	const template: string
	export default template
}
