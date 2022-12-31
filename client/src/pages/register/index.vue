<script lang="ts">
import { useAuth } from '@construct/client/stores/auth'
import { UserData } from '@construct/shared'
import { defineComponent, onBeforeMount, reactive } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
	name: 'RegisterPage',
})
</script>

<script setup lang="ts">
const router = useRouter()
const auth = useAuth()

const data = reactive({
	name: '',
	email: '',
	password: '',
	password_confirmation: '',
})

async function registerUser() {
	try {
		const registration = await auth.register(data)

		console.log(registration)
	} catch (error) {
		console.error('failed to register user', error)
	}
}

onBeforeMount(() => {
	if (auth.current) return router.push('/')
})
</script>

<template>
	<ConstructPage class="register-page">
		<form @submit.prevent="registerUser">
			<ConstructTitle>Register</ConstructTitle>

			<ConstructInput
				v-model="data.name"
				name="name"
				label="Name"
				type="text"
				placeholder="username..."
			/>

			<ConstructInput
				v-model="data.email"
				name="email"
				label="Email"
				type="text"
				placeholder="email..."
			/>

			<ConstructInput
				v-model="data.password"
				name="password"
				label="Password"
				type="password"
				placeholder="password..."
			/>

			<ConstructInput
				v-model="data.password_confirmation"
				name="password_confirmation"
				label="Password Again"
				type="password"
				placeholder="password again..."
			/>

			<ConstructButton type="submit">Register</ConstructButton>
		</form>
	</ConstructPage>
</template>

<style lang="scss" scoped>
.register-page {
}
</style>

<route>
{
	meta: {
		layout: 'no-layout'
	}
}
</route>
