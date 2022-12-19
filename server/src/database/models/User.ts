import { ModelUUID } from '@construct/server/database/Model'
import { UserData } from '@construct/shared'
import { Column, Entity } from 'typeorm'

@Entity()
export class User extends ModelUUID<UserData> implements UserData {
	@Column('varchar', { length: 255, primary: true })
	declare name: string

	@Column('varchar', { length: 255, unique: true })
	declare email: string

	@Column('varchar', { length: 255, select: false })
	declare password?: string
}
