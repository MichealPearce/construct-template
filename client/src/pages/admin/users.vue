<script lang="ts">
import { useUsers } from '@construct/client/stores/users'
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

let errorTimeout: any

async function list() {
	if (errorTimeout) return

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
		errorTimeout = setTimeout(() => {
			errorTimeout = null
		}, 5000)
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
					<ConstructButton>Create</ConstructButton>
				</ConstructLink>
			</header>

			<ConstructScrollNotifier
				v-slot="{ handle }"
				@scroll-end="list"
			>
				<div
					class="items"
					@wheel.passive.self="handle"
					@scroll.passive.self="handle"
				>
					<ConstructLink
						v-for="user of items"
						:to="`/admin/users/${user.uuid}`"
						class="item"
					>
						{{ user.display_name ?? user.name }}
					</ConstructLink>
				</div>
			</ConstructScrollNotifier>
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
			padding: 1em;
		}

		.items {
			@include flex(column);
			row-gap: 1em;
			width: 100%;
			padding: 1em;
			flex: 1;
			overflow: auto;

			.item {
				flex-shrink: 0;
				width: 100%;
				padding: 0.75em 1em;

				background-color: invert($color-background, 15%);
				color: $color-text;

				text-overflow: ellipsis;
				text-transform: capitalize;

				overflow: hidden;
				white-space: nowrap;
				border-radius: $border-radius;

				transition: all 0.25s ease-in-out;

				&:hover {
					background-color: invert($color-background, 35%);
				}

				&.router-link-active {
					background-color: $color-primary;
					color: $color-primary-text;
				}
			}
		}
	}
}
</style>
