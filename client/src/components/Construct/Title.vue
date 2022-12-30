<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
	name: 'ConstructTitle',
})
</script>

<script setup lang="ts">
type Props = {
	level?: '1' | '2' | '3' | '4' | '5' | '6'
}

const props = withDefaults(defineProps<Props>(), {
	level: '1',
})

const tagName = computed(() => `h${props.level}`)
</script>

<template>
	<component
		:is="tagName"
		class="construct-title"
	>
		<slot />
	</component>
</template>

<style lang="scss" scoped>
.construct-title {
}
</style>
