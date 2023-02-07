<script lang="ts">
	import type { PageData } from './$types'

	export let data: PageData
</script>

<a href="/posts/new">New post</a>

{#each data.posts as post}
	<a href={`/posts/${post.id}`}>
		<h2>{post.title}</h2>
		<p>{post.content}</p>
	</a>
{:else}
	<div>You have no posts yet</div>
{/each}
