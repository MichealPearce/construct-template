<script lang="ts">
import { injectUser } from '@construct/client/stores/users'
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'UserEmail',
})
</script>

<script setup lang="ts">
const props = withDefaults(
	defineProps<{
		element?: string
	}>(),
	{
		element: 'span',
	},
)

const user = injectUser()
</script>

<template>
	<component
		:is="props.element"
		v-if="user"
		class="user-email"
	>
		{{ user.email }}
	</component>
</template>

<style lang="scss" scoped>
.user-email {
}
</style>
