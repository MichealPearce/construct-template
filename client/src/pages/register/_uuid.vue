<script lang="ts">
import { useAuth } from '@construct/client/stores/auth'
import { defineComponent, onBeforeMount } from 'vue'

export default defineComponent({
	name: 'RegisterUUIDPage',
})
</script>

<script setup lang="ts">
const auth = useAuth()
const props = defineProps<{
	uuid: string
}>()

async function verify() {
	try {
		await auth.verifyRegistration(props.uuid)
	} catch (error) {
		console.error('failed to verify registration', error)
	}
}

onBeforeMount(verify)
</script>

<template>
	<ConstructPage class="register-uuid-page">
		<ConstructTitle>Register UUID</ConstructTitle>

		{{ props.uuid }}
	</ConstructPage>
</template>

<style lang="scss" scoped>
.register-uuid-page {
}
</style>

<route>
{
	meta: {
		layout: 'no-layout'
	}
}
</route>
