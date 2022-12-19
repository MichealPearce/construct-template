<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'DefaultLayout',
})
</script>

<script setup lang="ts"></script>

<template>
	<div class="default-layout">
		<RouterView />
	</div>
</template>

<style lang="scss" scoped>
.default-layout {
}
</style>
