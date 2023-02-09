<script lang="ts">
	import type { PageData } from './$types'

	export let data: PageData
</script>

<div>
	<slot />
</div>

<div class="mt-3 flex gap-1 empty:hidden">
	{#if data.canUpdate}
		<a
			href={`/posts/${data.post.id}/edit`}
			class="btn btn-primary">Update</a
		>
	{/if}
	{#if data.canDelete}
		<a
			href={`/posts/${data.post.id}/delete`}
			class="btn btn-error">Delete</a
		>
	{/if}
</div>
