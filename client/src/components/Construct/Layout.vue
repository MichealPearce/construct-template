<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'ConstructLayout',
})
</script>

<script setup lang="ts"></script>

<template>
	<div class="construct-layout">
		<slot />
	</div>
</template>

<style lang="scss" scoped>
.construct-layout {
	width: 100%;
	height: 100%;

	overflow: hidden;
}
</style>
