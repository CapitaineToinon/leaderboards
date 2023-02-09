<script lang="ts">
	import { enhance } from '$app/forms'
	import type { ActionData, PageData } from './$types'

	export let data: PageData
	export let form: ActionData
</script>

<form
	method="post"
	class="flex flex-col gap-3"
	use:enhance
>
	{#if form?.error}
		<div class="border border-red-500 p-3 text-center font-bold">{form.error}</div>
	{/if}

	<div class="border border-yellow-500 p-3 text-center font-bold">
		Are you sure you want to delete this post?
	</div>
	<input
		type="hidden"
		name="id"
		value={data.post.id}
	/>
	<button
		type="submit"
		class="btn btn-error">Delete</button
	>
</form>
