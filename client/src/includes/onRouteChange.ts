import { FunctionType } from '@construct/shared'
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'

export function onRouteChange(func: FunctionType) {
	const route = useRoute()
	const routeName = computed(() => route.name)

	watch(routeName, func)
}
