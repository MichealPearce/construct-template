import { Model } from '@construct/server/database/Model'
import { AppSessionData } from '@construct/shared'
import { Column, Entity } from 'typeorm'

@Entity()
export class AppSession
	extends Model<AppSessionData>
	implements AppSessionData
{
	@Column('varchar', { length: 255, primary: true })
	declare id: string

	@Column('simple-json')
	declare data: any
}
