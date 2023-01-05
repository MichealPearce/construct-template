<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
	name: 'TestPage',
})
</script>

<script setup lang="ts">
const opened = ref(false)
</script>

<template>
	<ConstructPage class="test-page">
		<ConstructMenuButton v-model="opened" />
	</ConstructPage>
</template>

<style lang="scss" scoped>
.test-page {
}
</style>
