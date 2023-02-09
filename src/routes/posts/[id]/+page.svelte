<script lang="ts">
	import type { PageData } from './$types'

	export let data: PageData

	$: href = data.mine ? '/profile' : `/users/${data.post.authorId}`
	$: name = data.mine ? 'yourself' : data.post.author.name
</script>

<div class="flex flex-col gap-3">
	<h1 class="text-2xl font-bold">{data.post.title}</h1>
	<p class="whitespace-pre-wrap">{data.post.content}</p>
	<p class="border-t py-3 text-sm text-black/80">
		Post written by
		<a
			{href}
			class="underline">{name}</a
		>
	</p>
</div>

<div class="mt-3 flex gap-3 empty:hidden">
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
