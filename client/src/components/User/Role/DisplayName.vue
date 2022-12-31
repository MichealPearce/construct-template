<script lang="ts">
import { injectUserRole } from '@construct/client/stores/userRoles'
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'UserRoleDisplayName',
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
		class="user-role-display-name"
	>
		<slot :userRoleDisplayName="userRole.display_name">
			{{ userRole.display_name }}
		</slot>
	</component>
</template>

<style lang="scss" scoped>
.user-role-display-name {
}
</style>
