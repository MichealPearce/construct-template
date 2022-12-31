<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
	name: 'ConstructSelect',
})
</script>

<script setup lang="ts">
const props = defineProps<{
	modelValue: any
	options: { value: any; label: string }[]
	name: string
	label?: string
}>()

const emit = defineEmits<{
	(event: 'update:modelValue', value: any): void
}>()

const value = computed({
	get: () => props.modelValue,
	set: value => emit('update:modelValue', value),
})
</script>

<template>
	<div class="construct-select">
		<label
			v-if="props.label"
			:for="props.name"
		>
			{{ props.label }}
		</label>

		<select
			v-model="value"
			:name="props.name"
		>
			<option
				:value="null"
				selected
				disabled
			>
				<slot name="default-text">--- select a option ---</slot>
			</option>

			<option
				v-for="option in props.options"
				:value="option.value"
				v-text="option.label"
			/>
		</select>
	</div>
</template>

<style lang="scss" scoped>
.construct-select {
	@include flex(column);
	width: 100%;
	padding: 0.5em;
	row-gap: 0.25em;

	background-color: invert($color-background, 15%);
	color: $color-text;

	border-radius: $border-radius;

	label,
	select {
		width: 100%;
	}

	select {
		padding: 0.75em;
		border: none;
		border-radius: $border-radius;
	}
}

.construct-select.no-padding {
	padding: 0;
}
</style>
