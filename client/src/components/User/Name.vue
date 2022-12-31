<script lang="ts">
import { injectUser } from '@construct/client/stores/users'
import { isCoreComponent } from '@vue/compiler-core'
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'UserName',
	components: { isCoreComponent },
})
</script>

<script setup lang="ts">
const props = withDefaults(
	defineProps<{
		element?: string
	}>(),
	{
		element: 'span',
	},
)

const user = injectUser()
</script>

<template>
	<component
		:is="props.element"
		v-if="user"
		class="user-name"
	>
		<slot
			:user="user"
			:userName="user.name"
		>
			{{ user.name }}
		</slot>
	</component>
</template>

<style lang="scss" scoped>
.user-name {
}
</style>
