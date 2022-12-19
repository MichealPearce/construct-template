<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
	name: 'ConstructLink',
})
</script>

<script setup lang="ts">
const props = defineProps<{
	to: string
}>()

const isInternal = computed(() => props.to.startsWith('/'))
const tagName = computed(() => (isInternal.value ? 'RouterLink' : 'a'))
const attrName = computed(() => (isInternal.value ? 'to' : 'href'))
</script>

<template>
	<component
		:is="tagName"
		:[attrName]="props.to"
		class="construct-link"
	>
		<slot />
	</component>
</template>

<style lang="scss" scoped>
.construct-link {
}
</style>
