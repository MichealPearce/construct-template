<script lang="ts">
import { authed } from '@construct/client/middleware/authed'
import { useAuth } from '@construct/client/stores/auth'
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'IndexPage',
	middleware: [authed],
})
</script>

<script setup lang="ts">
const auth = useAuth()

async function login() {
	try {
		await auth.login({
			username: 'test',
			password: 'password',
		})

		console.log(auth.current)
	} catch (error) {
		console.error(error)
	}
}
</script>

<template>
	<ConstructPage class="index-page">
		<h1>Hello</h1>

		<button @click="login">Test</button>
	</ConstructPage>
</template>

<style lang="scss" scoped>
.index-page {
}
</style>
