<script lang="ts">
	import { useForm } from '$lib/form'
	import { update as schema } from '$lib/zfd/post'

	export let data
	export let form

	const { names, fieldErrors, enhance } = useForm({
		schema,
		form
	})
</script>

<form
	class="flex flex-col gap-3"
	method="post"
	use:enhance
>
	{#if form?.error}
		<div class="border border-red-500 p-3 text-center font-bold">{form.error}</div>
	{/if}

	<input
		type="hidden"
		name={names.id}
		value={data.post.id}
	/>

	{#if $fieldErrors?.id}
		<p class="text-red-500">{$fieldErrors.id}</p>
	{/if}

	<label for={names.title}>Title</label>
	<input
		type="text"
		id={names.title}
		name={names.title}
		value={data.post.title ?? ''}
	/>
	{#if $fieldErrors?.title}
		<p>{$fieldErrors.title}</p>
	{/if}

	<label for={names.content}>Content</label>
	<textarea
		class="w-full"
		id={names.content}
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

	<div>
		<button
			type="submit"
			class="btn">Save</button
		>
	</div>
</form>
