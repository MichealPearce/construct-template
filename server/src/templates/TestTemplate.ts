import { Template } from '@construct/server/includes/Template'
import TestTemplateFile from './TestTemplate.ejs'

export class TestTemplate extends Template<{
	name: string
}> {
	constructor() {
		super(TestTemplateFile)
	}
}
