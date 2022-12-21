<script lang="ts">
import { isAdmin } from '@construct/client/middleware/isAdmin'
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'AdminPage',
	middleware: [isAdmin],
})
</script>

<script setup lang="ts"></script>

<template>
	<RouterView />
</template>

<route>
{
	meta: {
		layout: 'admin'
	}
}
</route>
