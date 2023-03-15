<script lang="ts">
	import { enhance } from '$app/forms'
	import type { User } from '@prisma/client'

	export let user: User | null
</script>

<nav class="mb-3 border-b py-3">
	<div class="mx-auto flex max-w-md justify-between">
		<a href="/">Home</a>
		<ul class="flex gap-3">
			{#if user}
				<li>
					<a href="/profile">{user.name}</a>
				</li>
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
	</div>
</nav>
