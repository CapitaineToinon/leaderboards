<script lang="ts">
	export let data
</script>

<div class="flex flex-col gap-3">
	{#each data.posts as post}
		<a href={`/posts/${post.id}`}>
			<h2 class="font-bold">{post.title}</h2>
			<p class="overflow-hidden text-ellipsis whitespace-nowrap">{post.content}</p>
			<p>by {post.author.name}</p>
		</a>
	{:else}
		No posts yet
	{/each}
</div>
