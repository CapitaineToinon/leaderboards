<script>
	import { page } from '$app/stores'
</script>

{#if $page.error?.message === 'NOT_FOUND'}
	<div>Post not found</div>
{:else if $page.error?.message === 'FORBIDDEN'}
	<div>FORBIDDEN</div>
{:else}
	<div>Internal Server Error</div>
{/if}
