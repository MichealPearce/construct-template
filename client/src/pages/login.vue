<script lang="ts">
import { useAuth } from '@construct/client/stores/auth'
import { defineComponent, reactive } from 'vue'

export default defineComponent({
	name: 'LoginPage',
})
</script>

<script setup lang="ts">
const auth = useAuth()

const creds = reactive({
	username: '',
	password: '',
})

async function login() {
	try {
		await auth.login(creds)
		console.log(auth.current)
	} catch (error) {
		console.log('failed login', error)
		alert('invalid username or password')
	}
}
</script>

<template>
	<ConstructPage class="login-page">
		<form @submit.prevent="login">
			<h1>Login</h1>

			<ConstructInput
				v-model="creds.username"
				placeholder="Username"
				type="text"
				autocomplete="username"
			/>

			<ConstructInput
				v-model="creds.password"
				placeholder="Password"
				type="password"
				autocomplete="current-password"
			/>

			<ConstructButton type="submit">Login</ConstructButton>
		</form>
	</ConstructPage>
</template>

<style lang="scss" scoped>
.login-page {
}
</style>
