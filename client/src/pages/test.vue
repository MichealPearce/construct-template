<script lang="ts">
import { useSocket } from '@construct/client/plugins/io'
import { defineComponent, ref } from 'vue'

export default defineComponent({
	name: 'TestPage',
})
</script>

<script setup lang="ts">
const socket = useSocket()
</script>

<template>
	<ConstructPage class="test-page">
		<ConstructTextArea
			name="test"
			label="Test"
			required
		/>

		<ConstructSelect
			name="testSelect"
			label="Test Select"
			:options="[{ label: 'Test', value: 'test' }]"
			required
		/>
	</ConstructPage>
</template>

<style lang="scss" scoped>
.test-page {
}
</style>
