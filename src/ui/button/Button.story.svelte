<script lang="ts">
	import type { Hst } from '@histoire/plugin-svelte'
	import Button from './Button.svelte'

	export let Hst: Hst
</script>

<Hst.Story>
	<Hst.Variant title="primary"><Button type="primary">Priamry</Button></Hst.Variant>
</Hst.Story>
