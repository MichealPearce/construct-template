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
		<form @submit.prevent="create">
			<header>
				<ConstructTitle>Create User</ConstructTitle>

				<ConstructButton type="submit">Create User</ConstructButton>
			</header>

			<ConstructInput
				v-model="data.name"
				name="name"
				label="Name"
				type="text"
			/>
			<ConstructInput
				v-model="data.display_name"
				name="display_name"
				label="Display Name"
				type="text"
			/>
			<ConstructInput
				v-model="data.email"
				name="email"
				label="Email"
				type="email"
			/>
			<ConstructInput
				v-model="data.password"
				name="password"
				label="Password"
				type="password"
				autocomplete="new-password"
			/>
		</form>
	</ConstructPage>
</template>

<style lang="scss" scoped>
.admin-users-create-page {
	@include flex(column);
	row-gap: 1em;
	padding: 2em 10%;

	header {
		@include flex(row, space-between, center);
		width: 100%;
	}

	form {
		@include flex(column);
		row-gap: 1em;
		width: 100%;
	}
}
</style>
