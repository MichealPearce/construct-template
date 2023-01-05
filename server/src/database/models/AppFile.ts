import { ModelUUID } from '@construct/server/database/Model'
import { AppFileData } from '@construct/shared'
import { Column, Entity, TableInheritance } from 'typeorm'

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class AppFile<Data extends AppFileData = AppFileData>
	extends ModelUUID<Data>
	implements AppFileData
{
	@Column('varchar')
	declare name: string

	@Column('varchar')
	declare type: string

	@Column('varchar', { nullable: true })
	declare mime: string | null

	@Column('int', { nullable: true })
	declare size: number | null

	@Column('varchar', { nullable: true })
	declare path: string | null

	@Column('varchar', { nullable: true })
	declare url: string | null
}
