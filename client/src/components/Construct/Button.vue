<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'ConstructButton',
})
</script>

<script setup lang="ts"></script>

<template>
	<button class="construct-button">
		<slot />
	</button>
</template>

<style lang="scss" scoped>
.construct-button {
}
</style>
