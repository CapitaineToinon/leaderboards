<script lang="ts">
	import type { ActionData } from './$types';
	import { signin as schema } from '$lib/zfd/auth';
	import { useForm } from '$lib/form';

	export let form: ActionData;

	const { names, fieldErrors, values, submitted, success, enhance } = useForm({
		schema,
		form
	});
</script>

{#if form?.error}
	<h1>{form.error}</h1>
{/if}

<form method="post" class="flex flex-col gap-3" use:enhance>
	<h1 class="text-lg font-bold">Sign in</h1>
	<input type="email" name={names.email} bind:value={$values.email} required />
	{#if $fieldErrors?.email}
		<p>{$fieldErrors.email}</p>
	{/if}
	<input type="text" name={names.name} bind:value={$values.name} required />
	{#if $fieldErrors?.name}
		<p>{$fieldErrors.name}</p>
	{/if}
	<button type="submit" class="border py-2 disabled:opacity-50" disabled={!$success && $submitted}
		>submit</button
	>
</form>
