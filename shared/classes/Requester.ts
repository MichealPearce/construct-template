import { clone, defaults, notString } from '../utils'

export interface RequesterOptions {
	headers?: Record<string, string>
	credentials?: RequestInit['credentials']
	mode?: RequestInit['mode']
}

export interface RequesterConfig extends Omit<RequestInit, 'body'> {
	body?: any
}

export class Requester {
	public readonly url: URL

	constructor(url: string, public readonly options: RequesterOptions = {}) {
		this.url = new URL(url)
	}

	protected getURL(url: string) {
		const base = new URL(this.url)

		// URL will not merge paths
		if (base.pathname.length)
			url = [...base.pathname.split('/'), ...url.split('/')].join('/')

		return new URL(url, base)
	}

	protected getBody(body?: any) {
		if (body && notString(body))
			if (
				body instanceof FormData ||
				body instanceof Blob ||
				body instanceof URLSearchParams ||
				body instanceof ReadableStream
			)
				return body
			else return JSON.stringify(body)
		return body
	}

	protected getConfig(config: RequesterConfig = {}) {
		const { options } = this

		if (config.body) config.body = this.getBody(config.body)
		if (options.credentials) config.credentials = options.credentials
		if (options.mode) config.mode = options.mode

		if (options.headers)
			if (config.headers)
				config.headers = { ...options.headers, ...config.headers }
			// don't want it being mutated
			else config.headers = clone(options.headers)

		return config
	}

	request(url: string, config?: RequesterConfig) {
		return fetch(this.getURL(url), this.getConfig(config))
	}

	get(url: string, config: RequesterConfig = {}) {
		return this.request(url, {
			...config,
			method: 'GET',
		})
	}

	post(url: string, body?: any, config: RequesterConfig = {}) {
		return this.request(url, {
			...config,
			method: 'POST',
			body,
		})
	}

	put(url: string, body?: any, config: RequesterConfig = {}) {
		return this.request(url, {
			...config,
			method: 'PUT',
			body,
		})
	}

	patch(url: string, body?: any, config: RequesterConfig = {}) {
		return this.request(url, {
			...config,
			method: 'PATCH',
			body,
		})
	}

	delete(url: string, config: RequesterConfig = {}) {
		return this.request(url, {
			...config,
			method: 'DELETE',
		})
	}
}

export class JSONRequester extends Requester {
	constructor(url: string, public readonly options: RequesterOptions = {}) {
		options.headers = defaults(options.headers ?? {}, {
			'Content-Type': 'application/json',
		})

		super(url, options)
	}

	request<R = unknown>(url: string, config: RequesterConfig = {}): Promise<R> {
		return super.request(url, config).then(res => res.json())
	}

	get<R = unknown>(url: string, config: RequesterConfig = {}): Promise<R> {
		return this.request<R>(url, {
			...config,
			method: 'GET',
		})
	}

	post<R = unknown>(
		url: string,
		body?: any,
		config: RequesterConfig = {},
	): Promise<R> {
		return this.request<R>(url, {
			...config,
			method: 'POST',
			body,
		})
	}

	put<R = unknown>(
		url: string,
		body?: any,
		config: RequesterConfig = {},
	): Promise<R> {
		return this.request<R>(url, {
			...config,
			method: 'PUT',
			body,
		})
	}

	patch<R = unknown>(
		url: string,
		body?: any,
		config: RequesterConfig = {},
	): Promise<R> {
		return this.request<R>(url, {
			...config,
			method: 'PATCH',
			body,
		})
	}

	delete<R = unknown>(url: string, config: RequesterConfig = {}): Promise<R> {
		return this.request<R>(url, {
			...config,
			method: 'DELETE',
		})
	}
}
