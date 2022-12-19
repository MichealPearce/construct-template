<script lang="ts">
import { authed } from '@construct/client/middleware/authed'
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'TestIndexPage',
	middleware: [authed],
})
</script>

<script setup lang="ts"></script>

<template>
	<ConstructPage class="test-index-page">
		<h1>Hello Test Index</h1>
	</ConstructPage>
</template>

<style lang="scss" scoped>
.test-index-page {
}
</style>
