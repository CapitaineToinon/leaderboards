<script lang="ts">
	import type { LayoutData } from './$types'
	import { Navbar } from '$ui/navbar'
	import '../app.css'

	export let data: LayoutData
</script>

<Navbar user={data.user} />

<main class="mx-auto max-w-md">
	<slot />
</main>
