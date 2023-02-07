<script lang="ts">
	import type { PageData } from './$types'

	export let data: PageData
</script>

<div>
	{#if data.canUpdate}
		<a href={`/posts/${data.post.id}/edit`}>Update</a>
	{/if}
	{#if data.canDelete}
		<a href={`/posts/${data.post.id}/delete`}>Delete</a>
	{/if}
</div>

<div>
	<slot />
</div>
