<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'TestPage',
})
</script>

<script setup lang="ts"></script>

<template>
	<ConstructPage class="test-page">
		<h1>Test Page</h1>
	</ConstructPage>
</template>

<style lang="scss" scoped>
.test-page {
}
</style>
