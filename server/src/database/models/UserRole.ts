import { Model } from '@construct/server/database/Model'
import { User } from '@construct/server/database/models/User'
import { UserRoleData } from '@construct/shared'
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm'

@Entity()
export class UserRole extends Model<UserRoleData> implements UserRoleData {
	@Column('varchar', { length: 255, primary: true })
	declare name: string

	@Column('varchar', { length: 255 })
	declare display_name: string

	@ManyToMany(() => User, user => user.roles)
	@JoinTable()
	declare users?: User[]
}
