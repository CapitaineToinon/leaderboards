<script lang="ts">
	import type { ActionData } from './$types'
	import { login as schema } from '$lib/zfd/auth'
	import { useForm } from '$lib/form'

	export let form: ActionData

	const { names, fieldErrors, values, submitted, success, enhance } = useForm({
		schema,
		form
	})
</script>

{#if form?.error}
	<h1>{form.error}</h1>
{/if}

<form
	method="post"
	use:enhance
	class="flex flex-col gap-3"
>
	<h1 class="text-lg font-bold">Login</h1>
	<input
		type="email"
		name={names.email}
		bind:value={$values.email}
		required
	/>
	{#if $fieldErrors?.email}
		<p>{$fieldErrors.email}</p>
	{/if}
	<button
		type="submit"
		class="border py-2 disabled:opacity-50"
		disabled={!$success && $submitted}>submit</button
	>
</form>
