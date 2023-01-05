<script lang="ts">
import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
	name: 'ConstructMenuButton',
})
</script>

<script setup lang="ts">
const props = defineProps<{
	modelValue: boolean
}>()

const emit = defineEmits<{
	(event: 'update:modelValue', value: boolean): void
}>()

const opened = computed({
	get: () => props.modelValue,
	set: value => emit('update:modelValue', value),
})
</script>

<template>
	<ConstructButton
		class="construct-menu-button"
		:class="{ opened }"
		@click="opened = !opened"
	>
		<div class="bar top" />
		<div class="bar middle" />
		<div class="bar bottom" />
	</ConstructButton>
</template>

<style lang="scss" scoped>
.construct-menu-button {
	width: 40px;
	height: 30px;

	// padding: 0px;
	background-color: transparent;

	position: relative;

	.bar {
		content: ' ';
		width: 30px;
		height: 3px;
		background-color: white;
		border-radius: 5px;

		position: absolute;
		transition: all 0.3s ease;
		z-index: 2;

		left: 50%;
		transform: translateX(-50%);
	}

	.bar.top {
		top: 5px;
	}

	.bar.middle {
		top: 50%;
		transform: translate(-50%, -50%);
	}

	.bar.bottom {
		bottom: 5px;
		z-index: 1;
	}
}

.construct-menu-button.opened {
	.bar.top {
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%) rotate(405deg);
	}

	.bar.bottom {
		opacity: 0;
	}

	.bar.middle {
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%) rotate(-405deg);
	}
}
</style>
