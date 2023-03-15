<script lang="ts">
	export let data
</script>

<div class="flex flex-col">
	<a
		href="/posts/new"
		class="btn">New post</a
	>

	{#each data.posts as post}
		<a
			class="py-3"
			href={`/posts/${post.id}`}
		>
			<h2 class="font-bold">{post.title}</h2>
			<p class="overflow-hidden text-ellipsis whitespace-nowrap">{post.content}</p>

			{#if post.published}
				<p class="text-green-500">Published</p>
			{:else}
				<p class="text-red-500">Draft</p>
			{/if}
		</a>
	{:else}
		<div>You have no posts yet</div>
	{/each}
</div>
