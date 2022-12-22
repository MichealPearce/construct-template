<script lang="ts">
import { useUsers } from '@construct/client/stores/users'
import { defineComponent, reactive } from 'vue'

export default defineComponent({
	name: 'AdminUsersCreatePage',
})
</script>

<script setup lang="ts">
const users = useUsers()

const data = reactive({
	name: '',
	display_name: '',
	email: '',
	password: '',
})

async function create() {
	try {
		const newUser = await users.create(data)
		console.log(newUser)
	} catch (error) {
		console.log('failed creating user', error)
	}
}
</script>

<template>
	<ConstructPage class="admin-users-create-page">
		<h1>Create User</h1>

		<form @submit.prevent="create">
			<ConstructInput
				v-model="data.name"
				placeholder="Name"
				type="text"
			/>
			<ConstructInput
				v-model="data.display_name"
				placeholder="Display Name"
				type="text"
			/>
			<ConstructInput
				v-model="data.email"
				placeholder="Email"
				type="email"
			/>
			<ConstructInput
				v-model="data.password"
				placeholder="Password"
				type="password"
				autocomplete="new-password"
			/>

			<ConstructButton type="submit">Create User</ConstructButton>
		</form>
	</ConstructPage>
</template>

<style lang="scss" scoped>
.admin-users-create-page {
}
</style>
