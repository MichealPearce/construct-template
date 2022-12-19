import { ModelUUID } from '@construct/server/database/Model'
import { UserRole } from '@construct/server/database/models/UserRole'
import { UserData } from '@construct/shared'
import { Column, Entity, ManyToMany } from 'typeorm'

@Entity()
export class User extends ModelUUID<UserData> implements UserData {
	@Column('varchar', { length: 255, primary: true })
	declare name: string

	@Column('varchar', { length: 255, unique: true })
	declare email: string

	@Column('varchar', { length: 255, select: false })
	declare password?: string

	@ManyToMany(() => UserRole, role => role.users, { eager: true })
	declare roles: UserRole[]
}
