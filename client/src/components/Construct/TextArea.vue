<script lang="ts">
import { pick } from '@michealpearce/utils'
import { computed, defineComponent } from 'vue'

export default defineComponent({
	name: 'ConstructTextArea',
})
</script>

<script setup lang="ts">
const props = defineProps<{
	name: string
	modelValue?: any
	type?: string
	placeholder?: string
	autocomplete?: string
	label?: string
	required?: boolean
	title?: string
}>()

const emit = defineEmits<{
	(event: 'update:modelValue', value: any): void
}>()

const value = computed({
	get: () => props.modelValue,
	set: value => emit('update:modelValue', value),
})

const inputProps = computed(() =>
	pick(props, [
		'name',
		'type',
		'placeholder',
		'autocomplete',
		'required',
		'title',
	]),
)
</script>

<template>
	<div class="construct-text-area">
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

		<textarea
			v-bind="inputProps"
			v-model="value"
		/>
	</div>
</template>

<style lang="scss" scoped>
.construct-text-area {
	@include flex(column);
	width: 100%;
	padding: 0.5em;
	row-gap: 0.25em;

	background-color: invert($color-background, 15%);
	color: $color-text;

	border-radius: $border-radius;

	label,
	textarea {
		width: 100%;
	}

	label {
		font-weight: bold;

		.required-mark {
			color: red;
		}
	}

	textarea {
		min-height: 75px;

		font-size: 0.9em;
		padding: 0.75em;
		border: none;
		border-radius: $border-radius;

		resize: vertical;
	}
}
</style>
