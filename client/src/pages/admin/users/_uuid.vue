<script lang="ts">
import { useFetch } from '@construct/client/plugins/fetch'
import { provideUser, useUsers } from '@construct/client/stores/users'
import { computed, defineComponent } from 'vue'

export default defineComponent({
	name: 'AdminUsersSinglePage',
})
</script>

<script setup lang="ts">
const users = useUsers()

const props = defineProps<{
	uuid: string
}>()

const fetched = useFetch(() => users.fetch(props.uuid))
const user = computed(() => fetched.result)

provideUser(user)
</script>

<template>
	<ConstructPage
		v-if="fetched.pending"
		class="loading"
	>
		loading...
	</ConstructPage>
	<template v-else-if="fetched.error"> something done broke </template>
	<RouterView v-else-if="user" />
</template>

<style lang="scss" scoped>
.loading {
	@include flex(column, center, center);
}
</style>
