export type BaseModelData = object

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
	display_name: string
	password?: string
	roles: UserRoleData[]
}

export interface UserRoleData extends ModelData {
	name: string
	display_name: string
}

export interface AppSessionData extends ModelData {
	id: string
	data: Record<string, any>
}
