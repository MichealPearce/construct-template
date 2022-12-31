<script lang="ts">
import { injectUser } from '@construct/client/stores/users'
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'UserDisplayName',
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
		class="user-display-name"
	>
		{{ user.display_name }}
	</component>
</template>

<style lang="scss" scoped>
.user-display-name {
}
</style>
