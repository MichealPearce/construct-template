<script lang="ts">
import { useFetch } from '@construct/client/plugins/fetch'
import { useUserRoles } from '@construct/client/stores/userRoles'
import { injectUser, useUsers } from '@construct/client/stores/users'
import { cloneDeep, UserRoleData } from '@construct/shared'
import { computed } from '@vue/reactivity'
import { defineComponent, ref } from 'vue'

export default defineComponent({
	name: 'AdminUsersSingleEditPage',
})
</script>

<script setup lang="ts">
const users = useUsers()
const userRoles = useUserRoles()

const user = injectUser()
const clonedUser = ref(cloneDeep(user.value!))

const roleToAdd = ref<UserRoleData | null>(null)

const fetchedUserRoles = useFetch(() => userRoles.list({ limit: 100 }))
const userRoleOptions = computed(() =>
	fetchedUserRoles.result
		?.filter(role => !user.value?.roles.find(r => r.name === role.name))
		.map(role => ({
			value: role,
			label: role.display_name,
		})),
)

async function update() {
	const data = clonedUser.value

	try {
		const updatedUser = await users.update(data.uuid, data)
		console.log(updatedUser)
	} catch (error) {
		console.error('failed updating user', error)
	}
}

async function addRole() {
	try {
		await users.addRole(user.value!.uuid, roleToAdd.value!.name)
		roleToAdd.value = null
	} catch (error) {
		console.error('failed to add user role', error)
	}
}

async function removeRole(role: UserRoleData) {
	try {
		await users.removeRole(user.value!.uuid, role.name)
	} catch (error) {
		console.error('failed to remove user role', error)
	}
}
</script>

<template>
	<ConstructPage
		v-if="user"
		class="admin-users-single-edit-page"
	>
		<form
			class="user-details-form"
			@submit.prevent="update"
		>
			<header>
				<ConstructTitle>Edit User</ConstructTitle>

				<ConstructButton type="submit">Update User</ConstructButton>
			</header>

			<ConstructInput
				v-model="clonedUser.display_name"
				name="display_name"
				label="Display Name"
			/>

			<ConstructInput
				v-model="clonedUser.email"
				name="email"
				label="Email"
			/>
		</form>

		<div class="user-roles">
			<ConstructTitle>User Roles</ConstructTitle>

			<form
				v-if="userRoleOptions"
				class="add-role-form"
				@submit.prevent="addRole"
			>
				<ConstructSelect
					v-model="roleToAdd"
					name="add_role"
					:options="userRoleOptions"
				>
					<template #default-text>--- select role ---</template>
				</ConstructSelect>

				<ConstructButton type="submit">Add</ConstructButton>
			</form>

			<div class="roles">
				<template
					v-for="userRole of user.roles"
					:key="userRole.name"
				>
					<div class="user-role">
						<UserRoleProvider :user-role="userRole">
							<UserRoleDisplayName />

							<ConstructButton @click="removeRole(userRole)">
								<i class="fa-solid fa-trash-can"></i>
							</ConstructButton>
						</UserRoleProvider>
					</div>
				</template>
			</div>
		</div>
	</ConstructPage>
</template>

<style lang="scss" scoped>
.admin-users-single-edit-page {
	@include flex(column);
	row-gap: 1em;
	padding: 2em 10%;

	header {
		@include flex(row, space-between, center);
		width: 100%;
	}

	.construct-title {
		padding: 0px;
	}

	.user-details-form {
		@include flex(column);
		width: 100%;
		row-gap: 1em;
	}

	.user-roles {
		@include flex(column);
		row-gap: 1em;
		width: 100%;

		.add-role-form {
			@include flex(row, space-between, stretch);
			width: 100%;
			column-gap: 0.5em;
		}

		.roles {
			@include flex(column);
			width: 100%;
			row-gap: 0.5em;

			.user-role {
				@include flex(row, space-between, center);
				width: 100%;
				padding: 1em;

				background-color: invert($color-background, 15%);
				border-radius: $border-radius;
			}
		}
	}
}
</style>
