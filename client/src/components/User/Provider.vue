<script lang="ts">
import { provideUser } from '@construct/client/stores/users'
import { UserData } from '@construct/shared'
import { computed, defineComponent } from 'vue'

export default defineComponent({
	name: 'UserProvider',
})
</script>

<script setup lang="ts">
const props = defineProps<{
	user: UserData | null
}>()

const user = computed(() => props.user)

provideUser(user)
</script>

<template>
	<slot />
</template>
