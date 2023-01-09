<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'AdminRolesIndexPage',
})
</script>

<script setup lang="ts"></script>

<template>
	<ConstructPage class="admin-roles-index-page">
		<h1>Select a Roles</h1>
	</ConstructPage>
</template>

<style lang="scss" scoped>
.admin-roles-index-page {
	@include flex(column, center, center);
}
</style>
