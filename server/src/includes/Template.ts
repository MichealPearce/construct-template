import { render } from 'ejs'

export class Template<Data extends Record<any, any> = Record<any, any>> {
	constructor(public readonly template: string) {}

	render(data?: Data) {
		return render(this.template, data, {
			async: true,
			localsName: '$data',
			strict: true,
			context: this,
		})
	}
}
