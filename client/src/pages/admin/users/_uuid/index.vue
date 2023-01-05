<script lang="ts">
import { injectUser } from '@construct/client/stores/users'
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'AdminUsersSinglePage',
})
</script>

<script setup lang="ts">
const user = injectUser()
</script>

<template>
	<ConstructPage
		v-if="user"
		class="admin-users-single-page"
	>
		<header>
			<UserAvatar />

			<aside>
				<UserDisplayName element="h2" />
				<UserName v-slot="{ userName }">@{{ userName }}</UserName>
			</aside>

			<ConstructLink
				class="edit-link"
				:to="`/admin/users/${user.uuid}/edit`"
			>
				<ConstructButton>Edit</ConstructButton>
			</ConstructLink>
		</header>

		<div class="user-roles">
			<ConstructTitle level="2">User Roles</ConstructTitle>

			<div class="roles">
				<template
					v-for="userRole of user.roles"
					:key="userRole.name"
				>
					<div class="user-role">
						<UserRoleProvider :user-role="userRole">
							<UserRoleName />
						</UserRoleProvider>
					</div>
				</template>
			</div>
		</div>
	</ConstructPage>
</template>

<style lang="scss" scoped>
.admin-users-single-page {
	@include flex(column);
	row-gap: 1em;
	padding: 2em 10%;

	header {
		@include flex(row, space-between, center);
		width: 100%;
		column-gap: 1em;

		aside {
			@include flex(column);
			flex: 1;

			.user-display-name {
				padding: 0px;
			}

			.user-name {
				color: darken($color-text, 20%);
				font-weight: bold;
			}
		}

		.edit-link {
			text-decoration: none;
		}
	}

	.user-roles {
		@include flex(column);
		row-gap: 1em;
		width: 100%;

		.construct-title {
			padding: 0px;
		}

		.add-role-form {
			@include flex(row, space-between, stretch);
			width: 100%;
			column-gap: 0.5em;
		}

		.roles {
			@include flex(row);
			width: 100%;
			gap: 0.5em;

			.user-role {
				@include flex(row, space-between, center);
				padding: 1em 1.5em;

				background-color: invert($color-background, 15%);
				border-radius: $border-radius;
			}
		}
	}
}
</style>
