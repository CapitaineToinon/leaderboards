<script lang="ts">
	import Navbar from '$ui/Navbar.svelte'
	import type { LayoutData } from './$types'
	import '../app.css'

	export let data: LayoutData
</script>

<Navbar user={data.user} />

<main class="mx-auto max-w-md">
	<slot />
</main>
