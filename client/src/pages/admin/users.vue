<script lang="ts">
import { useUsers } from '@construct/client/stores/users'
import { UserData } from '@construct/shared'
import { computed, defineComponent, onBeforeMount, reactive } from 'vue'
import { RouterView, useRoute } from 'vue-router'

export default defineComponent({
	name: 'AdminUsersLayout',
})
</script>

<script setup lang="ts">
const route = useRoute()
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

			<div class="items">
				<ConstructLink
					v-for="user of items"
					:to="`/admin/users/${user.uuid}`"
					class="item"
				>
					<ConstructButton>
						{{ user.name }}
					</ConstructButton>
				</ConstructLink>
			</div>
		</div>

		<RouterView :key="route.path" />
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

		.items {
			@include flex(column);
			row-gap: 1em;
			width: 100%;
			padding: 1em;

			.item {
				width: 100%;

				.construct-button {
					@include flex(row, space-between, center);
					width: 100%;
					text-transform: capitalize;
				}
			}
		}
	}
}
</style>
