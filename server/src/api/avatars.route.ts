import fs from 'fs/promises'
import { createRoute, Endpoint } from '@construct/server/includes/Endpoint'
import { existsSync } from 'fs'
import { resolve } from 'path'
import { User } from '@construct/server/database/models/User'
import { UserAvatar } from '@construct/server/database/models/UserAvatar'
import { isAdminUser, ServerError } from '@construct/shared'
import { SavedMultipartFile } from '@fastify/multipart'
import { authed } from '@construct/server/middleware/authed'

const avatarsUploadPath = resolve(__BIN_ROOT__, 'avatars')

export const route = createRoute('/avatars', async instance => {
	if (!existsSync(avatarsUploadPath)) {
		instance.log.info(
			'creating avatars upload directory: %s',
			avatarsUploadPath,
		)
		await fs.mkdir(avatarsUploadPath)
	}

	const stats = await fs.stat(avatarsUploadPath)

	if (!stats.isDirectory()) {
		throw new Error('avatars upload path is not a directory')
	}
})

@route.endpoint('GET', '/:uuid')
export class AvatarsGetEndpoint extends Endpoint<{
	params: { uuid: string }
	query: { raw?: boolean }
}> {
	async handle() {
		const avatar = await this.getAvatar()

		if (this.query.raw) return avatar
		return await this.getAvatarFile(avatar.uuid)
	}

	async getAvatar() {
		try {
			const avatar = await UserAvatar.findOne({
				where: [
					{
						uuid: this.params.uuid,
					},
					{
						user: { uuid: this.params.uuid },
					},
				],
			})

			if (!avatar) throw new ServerError('avatar not found', 404)
			return avatar
		} catch (error) {
			this.console.error(error, 'error finding avatar')
			if (error instanceof ServerError) throw error
			else throw new ServerError('error finding avatar', 500)
		}
	}

	async getAvatarFile(uuid: string) {
		const avatarFile = resolve(avatarsUploadPath, uuid)

		if (!existsSync(avatarFile)) {
			throw new ServerError('avatar file not found', 404)
		}

		try {
			return await fs.readFile(avatarFile)
		} catch (error) {
			this.console.error(error, 'error reading avatar file')
			throw new ServerError('error reading avatar file', 500)
		}
	}
}

@route.endpoint('POST', '/:userUUID')
export class AvatarsPostEndpoint extends Endpoint<{
	params: { userUUID: string }
}> {
	static onRequest = [authed]

	async middleware() {
		if (
			this.authed.uuid !== this.params.userUUID ||
			!isAdminUser(this.authed)
		) {
			// request is for current authed user or is not coming from admin
			throw new ServerError('unauthorized', 401)
		}
	}

	async handle() {
		const uploaded = await this.getUploaded()
		const user = await this.getUser()

		if (user.avatarUUID) await this.deleteExistingAvatar(user)
		return await this.saveAvatar(uploaded, user)
	}

	async getUploaded() {
		try {
			const [uploaded] = await this.request.saveRequestFiles()

			if (!uploaded) throw new ServerError('no file uploaded', 400)
			return uploaded
		} catch (error) {
			this.console.error(error, 'error uploading file')

			if (error instanceof ServerError) throw error
			else throw new ServerError('error uploading file', 500)
		}
	}

	async getUser() {
		try {
			const user = await User.findOneBy({
				uuid: this.params.userUUID,
			})

			if (!user) throw new ServerError('user not found', 404)
			return user
		} catch (error) {
			this.console.error(error, 'error finding user')

			if (error instanceof ServerError) throw error
			else throw new ServerError('error finding user', 500)
		}
	}

	async deleteExistingAvatar(user: User) {
		if (!user.avatarUUID) return

		const uuid = user.avatarUUID
		const avatarFile = resolve(avatarsUploadPath, uuid)

		if (!existsSync(avatarFile)) return

		try {
			await fs.unlink(avatarFile)
		} catch (error) {
			this.console.error(error, 'error deleting existing avatar file')
			throw new ServerError('error deleting existing avatar file', 500)
		}

		try {
			await UserAvatar.delete({ uuid })
		} catch (error) {
			this.console.error(error, 'error deleting existing avatar')
			throw new ServerError('error deleting existing avatar', 500)
		}
	}

	async saveAvatar(uploaded: SavedMultipartFile, user: User) {
		const avatar = await UserAvatar.init({
			name: uploaded.filename,
			mime: uploaded.mimetype,
			size: await this.getFileSize(uploaded),
		}).save()

		await this.copyAvatarFile(uploaded, avatar)

		user.avatarUUID = avatar.uuid
		await user.save()
		return avatar
	}

	async getFileSize(uploaded: SavedMultipartFile) {
		try {
			const stats = await fs.stat(uploaded.filepath)
			return stats.size
		} catch (error) {
			this.console.error(error, 'error getting file size')
			return null
		}
	}

	async copyAvatarFile(uploaded: SavedMultipartFile, avatar: UserAvatar) {
		const avatarFile = resolve(avatarsUploadPath, avatar.uuid)

		try {
			await fs.copyFile(uploaded.filepath, avatarFile)
		} catch (error) {
			this.console.error(error, 'error moving avatar file')
			throw new ServerError('error moving avatar file', 500)
		}
	}
}

@route.endpoint('DELETE', '/:userUUID')
export class AvatarsDeleteEndpoint extends Endpoint<{
	params: { userUUID: string }
}> {
	static onRequest = [authed]

	async middleware() {
		if (
			this.authed.uuid !== this.params.userUUID ||
			!isAdminUser(this.authed)
		) {
			// request is for current authed user or is not coming from admin
			throw new ServerError('unauthorized', 401)
		}
	}

	async handle() {
		const user = await this.getUser()
		if (!user.avatarUUID) throw new ServerError('no avatar to delete', 400)

		await this.deleteAvatar(user.avatarUUID)
		return { success: true }
	}

	async getUser() {
		try {
			const user = await User.findOneBy({
				uuid: this.params.userUUID,
			})

			if (!user) throw new ServerError('user not found', 404)
			return user
		} catch (error) {
			this.console.error(error, 'error finding user')

			if (error instanceof ServerError) throw error
			else throw new ServerError('error finding user', 500)
		}
	}

	async deleteAvatar(uuid: string) {
		const avatar = await UserAvatar.findOneBy({ uuid })

		if (!avatar) return this.deleteAvatarFile(uuid)

		await avatar.remove()
		return this.deleteAvatarFile(uuid)
	}

	async deleteAvatarFile(uuid: string) {
		const avatarFile = resolve(avatarsUploadPath, uuid)

		if (!existsSync(avatarFile)) return

		try {
			await fs.unlink(avatarFile)
		} catch (error) {
			this.console.error(error, 'error deleting avatar file')
			throw new ServerError('error deleting avatar file', 500)
		}
	}
}
