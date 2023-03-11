import {
	ModelData,
	ModelUUIDData,
	Nullable,
} from '@michealpearce/typeorm-models'

export {
	BaseModelData,
	ModelData,
	ModelIDData,
	ModelUUIDData,
} from '@michealpearce/typeorm-models'

export class UserData extends ModelUUIDData {
	declare name: string
	declare email: string
	declare display_name: Nullable<string>

	// not selected by default
	declare password?: string

	declare roles: UserRoleData[]

	declare registration?: UserRegistrationData

	declare avatarUUID: Nullable<string>
	declare avatar?: UserAvatarData
}

export class UserRoleData extends ModelData {
	declare name: string
	declare display_name: string
}

export class AppSessionData extends ModelData {
	declare id: string
	declare data: Record<string, any>
}

export class UserRegistrationData extends ModelUUIDData {
	declare userUUID: string
	declare user: UserData
}

export class AppFileData extends ModelUUIDData {
	declare name: string
	declare type: string
	declare mime: Nullable<string>
	declare size: Nullable<number>
	declare path: Nullable<string>
	declare url: Nullable<string>
}

export class UserAvatarData extends AppFileData {
	declare user?: UserData
}
