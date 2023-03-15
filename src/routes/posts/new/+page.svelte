<script lang="ts">
	import { useForm } from '$lib/form'
	import { create as schema } from '$lib/zfd/post'

	export let form

	const { names, fieldErrors, values, enhance } = useForm({
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

	<label for={names.title}>Title</label>
	<input
		type="text"
		id={names.title}
		name={names.title}
		bind:value={$values.title}
	/>
	{#if $fieldErrors?.title}
		<p class="text-red-500">{$fieldErrors.title}</p>
	{/if}

	<label for={names.content}>Content</label>
	<textarea
		id={names.content}
		name={names.content}
		bind:value={$values.content}
	/>

	{#if $fieldErrors?.content}
		<p class="text-red-500">{$fieldErrors.content}</p>
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
		<p class="text-red-500">{$fieldErrors.published}</p>
	{/if}

	<div>
		<button
			type="submit"
			class="btn">Save</button
		>
	</div>
</form>
