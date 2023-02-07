<script lang="ts">
	import { enhance } from '$app/forms'
	import type { ActionData, PageData } from './$types'

	export let data: PageData
	export let form: ActionData
</script>

{#if form?.error}
	<h1>{form?.error}</h1>
{/if}

<form
	method="post"
	use:enhance
>
	<div>Are you sure you want to delete this post?</div>
	<input
		type="hidden"
		name="id"
		value={data.post.id}
	/>
	<button type="submit">Delete</button>
</form>
