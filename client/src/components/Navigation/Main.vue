<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'NavigationMain',
})
</script>

<script setup lang="ts"></script>

<template>
	<nav class="navigation-main">
		<div class="branding">
			<h1 class="brand-name">Construct</h1>
		</div>

		<menu> menu </menu>
	</nav>
</template>

<style lang="scss" scoped>
.navigation-main {
	@include flex(row, space-between, center);
	width: 100%;
}
</style>
