<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'AdminLayout',
})
</script>

<script setup lang="ts"></script>

<template>
	<ConstructLayout class="admin-layout">
		<AdminNavigationSidebar />

		<RouterView />
	</ConstructLayout>
</template>

<style lang="scss" scoped>
.admin-layout {
	@include flex(row);
}
</style>
