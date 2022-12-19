<script lang="ts">
import { useAuth } from '@construct/client/stores/auth'
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'NavigationMain',
})
</script>

<script setup lang="ts">
const auth = useAuth()
</script>

<template>
	<nav class="navigation-main">
		<div class="branding">
			<h1 class="brand-name">Construct</h1>
		</div>

		<menu>
			<ConstructLink to="/">Home</ConstructLink>

			<template v-if="auth.current">
				{{ auth.current.name }}
			</template>
		</menu>
	</nav>
</template>

<style lang="scss" scoped>
.navigation-main {
	@include flex(row, space-between, center);
	width: 100%;
}
</style>
