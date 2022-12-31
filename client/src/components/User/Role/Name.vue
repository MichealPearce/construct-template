<script lang="ts">
import { injectUserRole } from '@construct/client/stores/userRoles'
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'UserRoleName',
})
</script>

<script setup lang="ts">
const userRole = injectUserRole()
const props = withDefaults(
	defineProps<{
		element?: string
	}>(),
	{
		element: 'span',
	},
)
</script>

<template>
	<component
		:is="props.element"
		v-if="userRole"
		class="user-role-name"
	>
		<slot :userRoleName="userRole.name">
			{{ userRole.name }}
		</slot>
	</component>
</template>

<style lang="scss" scoped>
.user-role-name {
}
</style>
