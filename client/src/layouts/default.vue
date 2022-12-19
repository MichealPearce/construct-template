<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'DefaultLayout',
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
