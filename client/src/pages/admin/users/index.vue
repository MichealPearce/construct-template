<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'AdminUsersIndexPage',
})
</script>

<script setup lang="ts"></script>

<template>
	<ConstructPage class="admin-users-index-page">
		<h1>Select a User</h1>
	</ConstructPage>
</template>

<style lang="scss" scoped>
.admin-users-index-page {
	@include flex(column, center, center);
}
</style>
