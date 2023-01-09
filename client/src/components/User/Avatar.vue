<script lang="ts">
import { injectUser } from '@construct/client/stores/users'
import { colorFromString } from '@construct/shared'
import { computed, defineComponent } from 'vue'

export default defineComponent({
	name: 'UserAvatar',
})
</script>

<script setup lang="ts">
const user = injectUser()

const avatar = computed(() => {
	if (!user.value) return null
	return user.value.avatarUUID
})

const bgColor = computed(() => {
	if (!user.value) return colorFromString('James Randall')
	return colorFromString(user.value.name)
})
</script>

<template>
	<div class="user-avatar">
		<img
			v-if="avatar"
			:src="`/api/avatars/${avatar}`"
		/>
		<i
			v-else
			class="fa-solid fa-user"
		/>
	</div>
</template>

<style lang="scss" scoped>
$size: var(--user-avatar-size, 50px);

.user-avatar {
	@include flex(column, center, center);
	width: $size;
	height: $size;

	background-color: v-bind(bgColor);

	border-radius: $user-avatar-radius;
	overflow: hidden;
	font-size: 24px;

	img {
		width: 100%;
		height: 100%;

		object-fit: cover;
		object-position: center;
	}
}
</style>
