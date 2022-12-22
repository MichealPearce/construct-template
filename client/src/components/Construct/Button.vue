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
	@include flex(column, center, center);
	padding: 0.5em 1em;

	background-color: $color-primary;
	color: $color-primary-text;

	border: none;
	cursor: pointer;
	border-radius: $border-radius;

	transform: scale(1);
	transition: transform 0.15s;
	transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);

	&:active {
		transform: scale(0.9);
	}
}
</style>
