<script lang="ts">
import { authed } from '@construct/client/middleware/authed'
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'DefaultLayout',
	middleware: [authed],
})
</script>

<script setup lang="ts"></script>

<template>
	<ConstructLayout class="default-layout">
		<NavigationMain />

		<RouterView />
	</ConstructLayout>
</template>

<style lang="scss" scoped>
.default-layout {
}
</style>
