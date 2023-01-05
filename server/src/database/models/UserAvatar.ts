import { AppFile } from '@construct/server/database/models/AppFile'
import { User } from '@construct/server/database/models/User'
import { UserAvatarData } from '@construct/shared'
import { ChildEntity, OneToOne } from 'typeorm'

@ChildEntity()
export class UserAvatar
	extends AppFile<UserAvatarData>
	implements UserAvatarData
{
	@OneToOne(() => User, user => user.avatar)
	declare user?: User
}
