<script lang="ts">
import { useAuth } from '@construct/client/stores/auth'
import { provideUser } from '@construct/client/stores/users'
import { computed, defineComponent } from 'vue'

export default defineComponent({
	name: 'AdminNavigationmain',
})
</script>

<script setup lang="ts">
const auth = useAuth()

const props = defineProps<{
	menuOpened: boolean
}>()

const emit = defineEmits<{
	(event: 'update:menuOpened', value: boolean): void
}>()

const opened = computed({
	get: () => props.menuOpened,
	set: value => emit('update:menuOpened', value),
})

const user = computed(() => auth.current)

provideUser(user)
</script>

<template>
	<nav class="admin-navigation-main">
		<div class="user-profile">
			<UserAvatar />
			<UserDisplayName />
		</div>

		<ConstructMenuButton v-model="opened" />
	</nav>
</template>

<style lang="scss" scoped>
.admin-navigation-main {
	@include flex(row, space-between, center);
	width: 100%;
	height: 60px;
	padding: 0px 0.5em;

	background-color: darken($color-background, 20%);

	.user-profile {
		--user-avatar-size: 40px;

		@include flex(row, flex-start, center);
		column-gap: 0.5em;

		.user-avatar {
			font-size: 20px;
		}
	}
}
</style>
