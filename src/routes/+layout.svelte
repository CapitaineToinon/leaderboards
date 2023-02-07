<script lang="ts">
	import { enhance } from '$app/forms'
	import type { LayoutData } from './$types'
	import '../app.css'

	export let data: LayoutData
</script>

<nav class="mb-3 border-b py-3">
	<ul class="mx-auto flex max-w-md gap-3">
		<li>
			<a href="/">Home</a>
		</li>
		{#if data.user}
			<li>
				<form
					action="/auth/logout"
					method="post"
					use:enhance
				>
					<button type="submit">Logout</button>
				</form>
			</li>
		{:else}
			<li>
				<a href="/auth/login">Login</a>
			</li>
			<li>
				<a href="/auth/signin">Sign in</a>
			</li>
		{/if}
	</ul>
</nav>

<main class="mx-auto max-w-md">
	<slot />
</main>
