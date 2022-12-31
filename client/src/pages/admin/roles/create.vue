<script lang="ts">
import { useUserRoles } from '@construct/client/stores/userRoles'
import { defineComponent, reactive } from 'vue'

export default defineComponent({
	name: 'AdminRolesCreatePage',
})
</script>

<script setup lang="ts">
const userRoles = useUserRoles()

const data = reactive({
	name: '',
	display_name: '',
})

async function create() {
	try {
		const newRole = await userRoles.create(data)
		console.log('new role', newRole)
	} catch (error) {
		console.error('failed creating user role', error)
	}
}
</script>

<template>
	<ConstructPage class="admin-roles-create-page">
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
				required
			/>

			<ConstructInput
				v-model="data.display_name"
				name="display_name"
				label="Display Name"
				type="text"
				required
			/>
		</form>
	</ConstructPage>
</template>

<style lang="scss" scoped>
.admin-roles-create-page {
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
