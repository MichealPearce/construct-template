<script lang="ts">
import { pick } from '@michealpearce/utils'
import { computed, defineComponent } from 'vue'

export default defineComponent({
	name: 'ConstructSelect',
})
</script>

<script setup lang="ts">
const props = defineProps<{
	modelValue?: any
	options: { value: any; label: string }[]
	name: string
	label?: string
	required?: boolean
	title?: string
}>()

const emit = defineEmits<{
	(event: 'update:modelValue', value: any): void
}>()

const value = computed({
	get: () => props.modelValue ?? null,
	set: value => emit('update:modelValue', value),
})

const inputProps = computed(() => pick(props, ['name', 'required', 'title']))
</script>

<template>
	<div class="construct-select">
		<label
			v-if="props.label"
			class="input-label"
			:for="props.name"
		>
			{{ props.label }}
			<span
				v-if="props.required"
				class="required-mark"
				v-text="'*'"
			/>
		</label>

		<select
			v-bind="inputProps"
			v-model="value"
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

	label {
		font-weight: bold;

		.required-mark {
			color: red;
		}
	}

	select {
		font-size: 0.9em;
		padding: 0.75em;
		border: none;
		border-radius: $border-radius;
	}
}

.construct-select.no-padding {
	padding: 0;
}
</style>
