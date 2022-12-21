<script lang="ts">
import { useUsers } from '@construct/client/stores/users'
import { UserData } from '@construct/shared'
import { computed, defineComponent, onBeforeMount, reactive } from 'vue'
import { RouterView } from 'vue-router'

export default defineComponent({
	name: 'AdminUsersPage',
})
</script>

<script setup lang="ts">
const users = useUsers()

const state = reactive<{
	uuids: Set<string>
	page: number
	limit: number
}>({
	uuids: new Set(),
	page: 0,
	limit: 10,
})

const items = computed(() =>
	Array.from(state.uuids).map(uuid => users.get(uuid)!),
)

async function list() {
	try {
		state.page++

		const items = await users.list({
			page: state.page,
			limit: state.limit,
		})

		for (const item of items) state.uuids.add(item.uuid)
	} catch (error) {
		state.page--

		console.error('failed listing users', error)
	}
}

onBeforeMount(list)
</script>

<template>
	<ConstructLayout class="admin-users-layout">
		<div class="users-sidebar">
			<header>
				<h3>Users</h3>

				<ConstructLink to="/admin/users/create">
					<ConstructButton>Create User</ConstructButton>
				</ConstructLink>
			</header>

			<ConstructLink
				v-for="user of items"
				:to="`/admin/users/${user.uuid}`"
			>
				{{ user.name }}
			</ConstructLink>
		</div>

		<RouterView />
	</ConstructLayout>
</template>

<style lang="scss" scoped>
.admin-users-layout {
	@include flex(row);

	.users-sidebar {
		@include flex(column);
		min-width: 200px;
		width: 25%;
		max-width: 300px;
		flex-shrink: 0;

		height: 100%;

		border-right: 1px solid black;

		header {
			@include flex(row, space-between, center);
			width: 100%;
			padding: 0.5em;
		}
	}
}
</style>
