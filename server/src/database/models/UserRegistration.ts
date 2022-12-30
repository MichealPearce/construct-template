import { ModelUUID } from '@construct/server/database/Model'
import { User } from '@construct/server/database/models/User'
import { UserRegistrationData } from '@construct/shared'
import { Column, Entity, OneToOne } from 'typeorm'

@Entity()
export class UserRegistration
	extends ModelUUID<UserRegistrationData>
	implements UserRegistrationData
{
	@Column('varchar', { name: 'user_uuid' })
	declare userUUID: string

	@OneToOne(() => User, user => user.registration)
	declare user: User
}
