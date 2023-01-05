<script lang="ts">
import { authed } from '@construct/client/middleware/authed'
import { useAPI } from '@construct/client/plugins/api'
import { useAuth } from '@construct/client/stores/auth'
import { provideUser, useUsers } from '@construct/client/stores/users'
import { computed, defineComponent, onMounted } from 'vue'

export default defineComponent({
	name: 'IndexPage',
	middleware: [authed],
})
</script>

<script setup lang="ts">
const auth = useAuth()
const users = useUsers()

const user = computed(() => auth.current)

async function upload(data: FormData) {
	if (!auth.current) return

	try {
		const res = await users.uploadAvatar(auth.current, data)
		console.log(res)
	} catch (error) {
		console.error(error)
	}
}

async function deleteAvatar() {
	if (!auth.current) return

	try {
		const res = await users.deleteAvatar(auth.current)
		console.log(res)
	} catch (error) {
		console.error(error)
	}
}

onMounted(() => {
	if (!auth.current) return

	users.fetchAvatar(auth.current).then(console.log).catch(console.error)
})

provideUser(user)
</script>

<template>
	<ConstructPage class="index-page">
		<h1>Hello</h1>

		<UserAvatar />
		<ConstructForm @submit="upload">
			<ConstructInput
				name="avatar"
				type="file"
			/>
			<ConstructButton type="submit">Upload</ConstructButton>
		</ConstructForm>

		<ConstructButton @click="deleteAvatar">Delete</ConstructButton>
	</ConstructPage>
</template>

<style lang="scss" scoped>
.index-page {
	img {
		max-width: 100%;
	}
}
</style>
