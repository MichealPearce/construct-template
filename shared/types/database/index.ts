export type BaseModelData = Record<string, any>

export interface ModelData extends BaseModelData {
	created: Date | string
	updated?: Date | string
	deleted?: Date | string
}

export interface ModelIDData extends ModelData {
	id: number
}

export interface ModelUUIDData extends ModelData {
	uuid: string
}

export interface UserData extends ModelUUIDData {
	name: string
	email: string
	password?: string
	roles: UserRoleData[]
}

export interface AppSessionData extends ModelData {
	id: string
	data: Record<string, any>
}

export interface UserRoleData extends ModelData {
	name: string
}
