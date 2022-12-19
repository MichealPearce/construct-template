export type BaseModelData = Record<string, any>

export interface ModelData extends BaseModelData {
	created: string
	updated: string | null
	deleted: string | null
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
}

export interface AppSessionData extends ModelData {
	id: string
	data: Record<string, any>
}
