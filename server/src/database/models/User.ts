import { ModelUUID } from '@construct/server/database/Model'
import { UserAvatar } from '@construct/server/database/models/UserAvatar'
import { UserRegistration } from '@construct/server/database/models/UserRegistration'
import { UserRole } from '@construct/server/database/models/UserRole'
import { UserData } from '@construct/shared'
import { Column, Entity, JoinColumn, ManyToMany, OneToOne } from 'typeorm'

@Entity()
export class User extends ModelUUID<UserData> implements UserData {
	@Column('varchar', { length: 255, primary: true })
	declare name: string

	@Column('varchar', { length: 255, nullable: true })
	declare display_name: string | null

	@Column('varchar', { length: 255, unique: true })
	declare email: string

	@Column('varchar', { length: 255, select: false })
	declare password?: string

	@ManyToMany(() => UserRole, role => role.users, { eager: true })
	declare roles: UserRole[]

	@OneToOne(() => UserRegistration, registration => registration.user, {
		eager: true,
	})
	@JoinColumn({ name: 'registration_uuid' })
	declare registration?: UserRegistration

	@Column('varchar', { name: 'avatar_uuid', length: 255, nullable: true })
	declare avatarUUID: string | null

	@OneToOne(() => UserAvatar, avatar => avatar.user, { onDelete: 'SET NULL' })
	@JoinColumn({ name: 'avatar_uuid' })
	declare avatar?: UserAvatar

	addRole(role: UserRole) {
		this.roles.push(role)
		return this.save()
	}

	removeRole(role: UserRole) {
		this.roles = this.roles.filter(r => r.name !== role.name)
		return this.save()
	}

	hasRole(role: UserRole) {
		return this.roles.some(r => r.name === role.name)
	}
}
