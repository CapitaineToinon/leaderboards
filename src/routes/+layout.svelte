<script lang="ts">
	import Navbar from '$ui/Navbar.svelte'
	import type { LayoutData } from './$types'
	import '../app.css'

	export let data: LayoutData
</script>

{#if data.flashMessage}
	<div class="flex items-center justify-center border-b bg-blue-300/10 p-3 font-bold">
		{data.flashMessage}
	</div>
{/if}

<Navbar user={data.user} />

<main class="mx-auto max-w-md">
	<slot />
</main>
