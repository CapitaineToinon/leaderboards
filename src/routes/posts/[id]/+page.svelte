<script lang="ts">
	import type { PageData } from './$types'

	export let data: PageData
</script>

<h1>{data.post.title}</h1>

<textarea
	value={data.post.content}
	readonly
/>

<p>
	Post written by {#if data.mine}
		<a href="/profile">yourself</a>
	{:else}
		<a href={`/users/${data.post.authorId}`}>{data.post.author.name}</a>
	{/if}
</p>
