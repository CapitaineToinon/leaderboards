<script lang="ts">
	import type { Alert } from '$lib/server/cookies/alert'
	export let type: Alert['type'] = 'info'
	export let dismissible: Alert['dismissible'] = false
</script>

<div
	class="relative"
	class:dismissible
	role="alert"
	data-testid="alert"
>
	{#if dismissible}
		<input
			id="dismiss"
			type="checkbox"
			class="checkbox absolute top-1 right-1"
		/>
	{/if}
	<div
		class="flex items-center justify-center border p-3 font-bold"
		class:border-red-500={type === 'error'}
		data-testid="alert-content"
	>
		<slot />
	</div>
</div>

<style>
	.dismissible:has(.checkbox:checked) {
		display: none;
	}
</style>
