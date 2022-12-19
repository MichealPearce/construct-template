<script lang="ts">
import { extract } from '@construct/shared'
import { computed, defineComponent } from 'vue'

export default defineComponent({
	name: 'ConstructInput',
})
</script>

<script setup lang="ts">
const props = defineProps<{
	modelValue: any
	type?: string
	placeholder?: string
	autocomplete?: string
}>()

const emit = defineEmits<{
	(event: 'update:modelValue', value: any): void
}>()

const value = computed({
	get: () => props.modelValue,
	set: value => emit('update:modelValue', value),
})

const inputProps = computed(() =>
	extract(props, ['type', 'placeholder', 'autocomplete']),
)
</script>

<template>
	<div class="construct-input">
		<input
			v-bind="inputProps"
			v-model="value"
		/>
	</div>
</template>

<style lang="scss" scoped>
.construct-input {
}
</style>
