<script lang="ts">
import { useAuth } from '@construct/client/stores/auth'
import { defineComponent, onBeforeMount, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
	name: 'LoginPage',
})
</script>

<script setup lang="ts">
const auth = useAuth()
const router = useRouter()
const route = useRoute()

const creds = reactive({
	username: '',
	password: '',
})

async function login() {
	try {
		await auth.login(creds)

		if (route.query.redirect) router.push(route.query.redirect as string)
		else router.push('/')
	} catch (error) {
		console.log('failed login', error)
		alert('invalid username or password')
	}
}

onBeforeMount(() => {
	if (route.query.logout)
		return auth.logout().finally(() => {
			window.location.href = '/login'
		})

	if (auth.current) router.push('/')
})
</script>

<template>
	<ConstructPage class="login-page">
		<ConstructForm @submit="login">
			<h1>Login</h1>

			<ConstructInput
				v-model="creds.username"
				name="username"
				placeholder="Username"
				type="text"
				autocomplete="username"
			/>

			<ConstructInput
				v-model="creds.password"
				name="password"
				placeholder="Password"
				type="password"
				autocomplete="current-password"
			/>

			<ConstructButton type="submit">Login</ConstructButton>
		</ConstructForm>
	</ConstructPage>
</template>

<style lang="scss" scoped>
.login-page {
	@include flex(column, center, center);

	.construct-form {
		@include flex(column);
		row-gap: 1em;
	}
}
</style>

<route>
{
	meta: {
		layout: 'no-layout',
	},
}
</route>
