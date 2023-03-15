import { BaseModel } from '@michealpearce/typeorm-models'
import {
	ClassType,
	inObject,
	isArray,
	isDefined,
	isObject,
} from '@michealpearce/utils'

export const models = new Set<ClassType<BaseModel<any>>>()
const modelFiles = import.meta.glob('./models/**/*.ts', {
	eager: true,
})

for (const [path, mod] of Object.entries(modelFiles)) {
	if (isObject(mod) && inObject(mod, ['model']) && isDefined(mod.model)) {
		console.info(`registering model: ${path}`, mod.model)

		if (isArray(mod.model)) mod.model.forEach((model: any) => models.add(model))
		else models.add(mod.model)
	}
}
