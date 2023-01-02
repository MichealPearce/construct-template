<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'ConstructForm',
})
</script>

<script setup lang="ts">
const emit = defineEmits<{
	(event: 'submit', data: FormData): void
}>()

const handleSubmit = (event: Event) =>
	emit('submit', new FormData(event.target as HTMLFormElement))
</script>

<template>
	<form
		class="construct-form"
		@submit.prevent="handleSubmit"
	>
		<slot />
	</form>
</template>

<style lang="scss" scoped>
.construct-form {
}
</style>
