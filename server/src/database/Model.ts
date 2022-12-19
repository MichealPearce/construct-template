import {
	BaseModelData,
	ClassType,
	ModelData,
	ModelIDData,
	ModelUUIDData,
} from '@construct/shared'
import {
	BaseEntity,
	CreateDateColumn,
	DeleteDateColumn,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'

export abstract class BaseModel<Data extends BaseModelData> extends BaseEntity {
	static init<M extends BaseModel<any>>(
		this: ClassType<M>,
		data: Partial<M['@data']> = {},
	): M {
		return new this().assign(data)
	}

	// type only property, does not exist
	declare '@data': Data

	assign(data: Partial<Data>): this {
		return Object.assign(this, data)
	}
}

export abstract class Model<Data extends ModelData>
	extends BaseModel<Data>
	implements ModelData
{
	@CreateDateColumn()
	declare created: Date

	@UpdateDateColumn()
	declare updated?: Date

	@DeleteDateColumn()
	declare deleted?: Date
}

export abstract class ModelID<Data extends ModelIDData>
	extends Model<Data>
	implements ModelIDData
{
	@PrimaryGeneratedColumn()
	declare id: number
}

export abstract class ModelUUID<Data extends ModelUUIDData>
	extends Model<Data>
	implements ModelUUIDData
{
	@PrimaryGeneratedColumn('uuid')
	declare uuid: string
}
