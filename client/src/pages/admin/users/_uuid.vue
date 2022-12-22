<script lang="ts">
import { useUsers } from '@construct/client/stores/users'
import { UserData } from '@construct/shared'
import { defineComponent, onBeforeMount, ref } from 'vue'

export default defineComponent({
	name: 'AdminUsersSinglePage',
})
</script>

<script setup lang="ts">
const users = useUsers()

const props = defineProps<{
	uuid: string
}>()

const user = ref<UserData | null>(null)

async function fetch() {
	try {
		const fetched = await users.fetch(props.uuid)
		user.value = fetched
	} catch (error) {
		console.error('failed to fetch user', error)
	}
}

onBeforeMount(fetch)
</script>

<template>
	<ConstructPage class="admin-users-single-page">
		<template v-if="user">
			{{ user.name }}
			{{ user.display_name }}
			{{ user.email }}
		</template>
	</ConstructPage>
</template>

<style lang="scss" scoped>
.admin-users-single-page {
}
</style>
