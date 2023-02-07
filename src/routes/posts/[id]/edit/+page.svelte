<script lang="ts">
	import { useForm } from '$lib/form'
	import { update as schema } from '$lib/zfd/post'
	import type { PageData } from './$types'

	export let data: PageData

	const { names, fieldErrors, enhance } = useForm({
		schema
	})
</script>

<form
	class="flex flex-col gap-3"
	method="post"
	use:enhance
>
	<input
		type="hidden"
		name={names.id}
		value={data.post.id}
	/>

	{#if $fieldErrors?.id}
		<p>{$fieldErrors.id}</p>
	{/if}

	<input
		type="text"
		name={names.title}
		value={data.post.title ?? ''}
	/>
	{#if $fieldErrors?.title}
		<p>{$fieldErrors.title}</p>
	{/if}

	<textarea
		name={names.content}
		value={data.post.content ?? ''}
	/>

	{#if $fieldErrors?.content}
		<p>{$fieldErrors.content}</p>
	{/if}

	<div>
		<input
			type="checkbox"
			id={names.published}
			name={names.published}
			checked={data.post.published ?? false}
		/>
		<label for={names.published}>Published</label>
	</div>

	{#if $fieldErrors?.published}
		<p>{$fieldErrors.published}</p>
	{/if}

	<button type="submit">Save</button>
</form>
