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
	display_name: string | null
	password?: string
	roles: UserRoleData[]
	registration?: UserRegistrationData
	avatarUUID: string | null
	avatar?: UserAvatarData
}

export interface UserRoleData extends ModelData {
	name: string
	display_name: string
}

export interface AppSessionData extends ModelData {
	id: string
	data: Record<string, any>
}

export interface UserRegistrationData extends ModelUUIDData {
	userUUID: string
	user: UserData
}

export interface AppFileData extends ModelUUIDData {
	name: string
	type: string
	mime: string | null
	size: number | null
	path?: string | null
	url?: string | null
}

export interface UserAvatarData extends AppFileData {
	user?: UserData
}
