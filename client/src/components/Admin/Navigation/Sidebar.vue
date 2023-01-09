<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'AdminNavigationSidebar',
})
</script>

<script setup lang="ts"></script>

<template>
	<nav class="admin-navigation-sidebar">
		<header>
			<h1>Admin</h1>
		</header>

		<div class="menu">
			<ConstructLink to="/">Home</ConstructLink>
			<ConstructLink to="/admin">Dashboard</ConstructLink>
			<ConstructLink to="/admin/users">Users</ConstructLink>
			<ConstructLink to="/admin/roles">Roles</ConstructLink>
			<ConstructLink to="/login?logout=true">Logout</ConstructLink>
		</div>
	</nav>
</template>

<style lang="scss" scoped>
.admin-navigation-sidebar {
	@include flex(column);
	min-width: 200px;
	width: 20%;
	max-width: 100%;
	height: 100%;

	background-color: darken($color-background, 20%);

	header {
		@include flex(column, center, center);
		width: 100%;
		height: 100px;
	}

	.menu {
		@include flex(column);
		width: 100%;

		.construct-link {
			width: 100%;
			padding: 1em 1.5em;

			transition: all 0.25s;

			&:hover {
				background-color: invert($color-background);
				color: invert($color-text);
			}
		}
	}
}
</style>
