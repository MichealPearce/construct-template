<script lang="ts">
import { onRouteChange } from '@construct/client/includes/onRouteChange'
import { useAuth } from '@construct/client/stores/auth'
import { isAdminUser } from '@construct/shared'
import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
	name: 'NavigationMain',
})
</script>

<script setup lang="ts">
const auth = useAuth()
const mobileMenuOpened = ref(false)

const isAdmin = computed(() =>
	auth.current ? isAdminUser(auth.current) : false,
)

onRouteChange(() => {
	mobileMenuOpened.value = false
})
</script>

<template>
	<nav class="navigation-main">
		<div class="branding">
			<h1 class="brand-name">Construct</h1>
		</div>

		<div
			class="menu"
			:class="{ opened: mobileMenuOpened }"
		>
			<ConstructLink to="/">Home</ConstructLink>

			<ConstructLink
				v-if="isAdmin"
				to="/admin"
			>
				Admin
			</ConstructLink>

			<ConstructLink
				v-if="auth.current"
				to="/login?logout=true"
			>
				Logout
			</ConstructLink>
			<ConstructLink
				v-else
				to="/login"
			>
				Login
			</ConstructLink>
		</div>

		<ConstructMenuButton v-model="mobileMenuOpened" />
	</nav>
</template>

<style lang="scss" scoped>
.navigation-main {
	@include flex(row, space-between, center);
	width: 100%;

	.branding {
		padding: 0px 1em;
	}

	.menu {
		@include flex(column, center, center);
		width: 100%;
		height: 100%;

		position: fixed;
		top: 0;
		left: 0px;

		background-color: rgba(black, 0.23);

		opacity: 0;
		visibility: hidden;
		transition: all 0.3s ease;
		z-index: 99;

		.construct-link {
			padding: 0.5em 1em;
			font-size: 1.25em;
		}

		&.opened {
			opacity: 1;
			visibility: visible;
		}
	}

	.construct-menu-button {
		z-index: 100;
		margin-right: 1em;
	}
}
</style>
