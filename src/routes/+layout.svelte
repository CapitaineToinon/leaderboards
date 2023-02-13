<script lang="ts">
	import type { Alerts } from '$lib/server/cookies/alert'
	import type { LayoutData } from './$types'
	import Navbar from '$ui/Navbar.svelte'
	import Alert from '$ui/Alert.svelte'
	import '../app.css'

	export let data: LayoutData

	let alerts: Alerts = []

	$: if (data.alerts) {
		alerts = data.alerts
	}
</script>

<Navbar user={data.user} />

<main class="mx-auto max-w-md">
	{#if alerts.length}
		<div class="mb-3">
			{#each alerts as alert (alert.id)}
				<Alert dismissible={alert.dismissible}>
					{alert.text}
				</Alert>
			{/each}
		</div>
	{/if}

	<slot />
</main>
