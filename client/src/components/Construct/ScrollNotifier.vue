<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'ConstructScrollNotifier',
	inheritAttrs: false,
})
</script>

<script lang="ts" setup>
const emit = defineEmits<{
	(e: 'scroll-start'): void
	(e: 'scrolled', percent: number): void
	(e: 'scroll-end'): void
}>()

let processing = false

function handleEvent(event: Event | WheelEvent) {
	const target = event.target as HTMLElement

	const scrolled = target.scrollTop + target.offsetHeight
	const scrolledPercent = scrolled / target.scrollHeight

	console.log('scrolled', scrolledPercent)
	emit('scrolled', scrolledPercent)
	if (scrolledPercent >= 1) emit('scroll-end')
	else if (scrolledPercent <= 0) emit('scroll-start')
}

function handle(event: Event) {
	if (processing) return
	else processing = true
	handleEvent(event)
	processing = false
}
</script>

<template>
	<slot :handle="handle" />
</template>
