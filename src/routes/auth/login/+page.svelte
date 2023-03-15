<script lang="ts">
	import { login as schema } from '$lib/zfd/auth'
	import { useForm } from '$lib/form'
	import Alert from '$ui/Alert.svelte'

	export let form

	const { names, fieldErrors, values, submitted, success, enhance } = useForm({
		schema,
		form
	})
</script>

<form
	method="post"
	use:enhance
	class="flex flex-col gap-3"
>
	{#if form?.error}
		<Alert type="error">{form.error}</Alert>
	{/if}

	<h1 class="text-lg font-bold">Login</h1>

	<label for={names.email}>Email</label>
	<input
		type="email"
		id={names.email}
		name={names.email}
		bind:value={$values.email}
		required
		data-testid={names.email}
	/>
	{#if $fieldErrors?.email}
		<p class="text-red-500">{$fieldErrors.email}</p>
	{/if}
	<button
		type="submit"
		class="btn disabled:opacity-50"
		disabled={!$success && $submitted}
		data-testid="submit">submit</button
	>
</form>
