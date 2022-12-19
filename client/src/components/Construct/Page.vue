<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'ConstructPage',
})
</script>

<script setup lang="ts"></script>

<template>
	<div class="construct-page">
		<slot />
	</div>
</template>

<style lang="scss" scoped>
.construct-page {
	width: 100%;
	height: 100%;

	overflow: hidden;
	overflow-y: auto;
}
</style>
