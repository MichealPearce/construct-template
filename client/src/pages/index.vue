<script lang="ts">
import { authed } from '@construct/client/middleware/authed'
import { useAPI } from '@construct/client/plugins/api'
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'IndexPage',
	middleware: [authed],
})
</script>

<script setup lang="ts">
const api = useAPI()

async function login() {
	api.get('users').then(console.log).catch(console.error)
}
</script>

<template>
	<ConstructPage class="index-page">
		<h1>Hello</h1>

		<ConstructButton @click="login">Test</ConstructButton>
	</ConstructPage>
</template>

<style lang="scss" scoped>
.index-page {
}
</style>
