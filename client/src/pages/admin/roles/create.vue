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
		<h1>Create User</h1>

		<form @submit.prevent="create">
			<ConstructInput
				v-model="data.name"
				placeholder="Name"
				type="text"
			/>

			<ConstructButton type="submit">Create User</ConstructButton>
		</form>
	</ConstructPage>
</template>

<style lang="scss" scoped>
.admin-roles-create-page {
}
</style>
