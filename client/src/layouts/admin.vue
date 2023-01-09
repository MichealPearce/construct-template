<script lang="ts">
import { onRouteChange } from '@construct/client/includes/onRouteChange'
import { defineComponent, ref } from 'vue'

export default defineComponent({
	name: 'AdminLayout',
})
</script>

<script setup lang="ts">
const menuOpened = ref(false)

onRouteChange(() => {
	menuOpened.value = false
})
</script>

<template>
	<ConstructLayout class="admin-layout">
		<AdminNavigationMain v-model:menu-opened="menuOpened" />

		<div class="content">
			<AdminNavigationSidebar :class="{ opened: menuOpened }" />

			<RouterView />
		</div>
	</ConstructLayout>
</template>

<style lang="scss" scoped>
.admin-layout {
	@include flex(column);

	.content {
		@include flex(column);

		position: relative;
		width: 100%;
		height: 100%;

		overflow: hidden;

		.admin-navigation-sidebar {
			position: absolute;
			left: -100%;
			top: 0px;
			z-index: 99;

			transition: left 0.25s;

			&.opened {
				left: 0px;
			}
		}
	}
}
</style>
