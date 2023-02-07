<script lang="ts">
	import { useForm } from '$lib/form'
	import { create as schema } from '$lib/zfd/post'

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
		type="text"
		name={names.title}
	/>
	{#if $fieldErrors?.title}
		<p>{$fieldErrors.title}</p>
	{/if}

	<textarea name={names.content} />

	{#if $fieldErrors?.content}
		<p>{$fieldErrors.content}</p>
	{/if}

	<div>
		<input
			type="checkbox"
			id={names.published}
			name={names.published}
		/>
		<label for={names.published}>Published</label>
	</div>

	{#if $fieldErrors?.published}
		<p>{$fieldErrors.published}</p>
	{/if}

	<button type="submit">Save</button>
</form>
