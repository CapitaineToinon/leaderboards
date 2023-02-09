<script lang="ts">
	import type { PageData } from './$types'

	export let data: PageData
</script>

<h1 class="text-2xl font-bold">{data.post.title}</h1>
<p class="whitespace-pre-wrap">{data.post.content}</p>

<p>
	Post written by {#if data.mine}
		<a href="/profile">yourself</a>
	{:else}
		<a href={`/users/${data.post.authorId}`}>{data.post.author.name}</a>
	{/if}
</p>
