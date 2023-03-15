<script lang="ts">
	import { enhance } from '$app/forms'

	export let data
</script>

{#if data.user}
	<form
		method="post"
		use:enhance
	>
		<button type="submit">Logout</button>
	</form>
{:else}
	<p>You are already logged out.</p>
{/if}
