<script lang="ts">
	import type { ActionData } from './$types'
	import { signin as schema } from '$lib/zfd/auth'
	import { useForm } from '$lib/form'

	export let form: ActionData

	const { names, fieldErrors, values, submitted, success, enhance } = useForm({
		schema,
		form
	})
</script>

<form
	method="post"
	class="flex flex-col gap-3"
	use:enhance
>
	{#if form?.error}
		<div class="border border-red-500 p-3 text-center font-bold">{form.error}</div>
	{/if}

	<h1 class="text-lg font-bold">Sign in</h1>

	<label for={names.email}>Email</label>
	<input
		type="email"
		id={names.email}
		name={names.email}
		bind:value={$values.email}
		class={$fieldErrors?.email ? 'border-red-500' : ''}
		required
	/>
	{#if $fieldErrors?.email}
		<p class="text-red-500">{$fieldErrors.email}</p>
	{/if}

	<label for={names.name}>Name</label>
	<input
		type="text"
		id={names.name}
		name={names.name}
		bind:value={$values.name}
		required
	/>
	{#if $fieldErrors?.name}
		<p class="text-red-500">{$fieldErrors.name}</p>
	{/if}

	<button
		type="submit"
		class="btn disabled:opacity-50"
		disabled={!$success && $submitted}>submit</button
	>
</form>
