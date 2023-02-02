<script lang="ts">
	import type { ActionData } from './$types';
	import { login as schema } from '$lib/zfd/auth';
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

{#if form?.data}
	<h1>Welcome back, {form.data.email}!</h1>
{/if}

<form method="post" use:enhance>
	<input type="email" name={names.email} bind:value={$values.email} required />
	{#if $fieldErrors?.email}
		<p>{$fieldErrors.email}</p>
	{/if}
	<button type="submit" disabled={!$success && $submitted}>submit</button>
</form>
