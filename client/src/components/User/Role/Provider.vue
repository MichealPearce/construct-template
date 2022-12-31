<script lang="ts">
import {
	provideUserRole,
	UserRoleInjectionValue,
} from '@construct/client/stores/userRoles'
import { UserRoleData } from '@construct/shared'
import { computed, defineComponent } from 'vue'

export default defineComponent({
	name: 'UserRoleProvider',
})
</script>

<script setup lang="ts">
const props = defineProps<{
	userRole: UserRoleData | null
}>()

const userRole = computed(() => props.userRole)

provideUserRole(userRole)
</script>

<template>
	<slot />
</template>
