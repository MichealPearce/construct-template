<script lang="ts">
import { useUserRoles } from '@construct/client/stores/userRoles'
import { extract } from '@construct/shared'
import { computed, defineComponent, onBeforeMount, reactive } from 'vue'

export default defineComponent({
	name: 'AdminRolesLayout',
})
</script>

<script setup lang="ts">
const userRoles = useUserRoles()

const state = reactive<{
	names: Set<string>
	page: number
	limit: number
}>({
	names: new Set(),
	page: 0,
	limit: 10,
})

const items = computed(() => Array.from(state.names).map(userRoles.get))

async function list() {
	try {
		state.page++

		const params = extract(state, ['page', 'limit'])
		const items = await userRoles.list(params)

		for (const item of items) state.names.add(item.name)
	} catch (error) {
		state.page--

		console.error('failed listing user roles', error)
	}
}

onBeforeMount(list)
</script>

<template>
	<ConstructLayout class="admin-roles-layout">
		<div class="roles-sidebar">
			<header>
				<h3>User Roles</h3>

				<ConstructLink to="/admin/roles/create">
					<ConstructButton>Create User Role</ConstructButton>
				</ConstructLink>
			</header>

			<div class="items">
				<ConstructLink
					v-for="item in items"
					:key="item.name"
					:to="`/admin/roles/${item.name}`"
					class="item"
				>
					{{ item.name }}
				</ConstructLink>
			</div>
		</div>

		<RouterView />
	</ConstructLayout>
</template>

<style lang="scss" scoped>
.admin-roles-layout {
	@include flex(row);

	.roles-sidebar {
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
			width: 100%;

			.item {
				width: 100%;
				padding: 1em;
			}
		}
	}
}
</style>
