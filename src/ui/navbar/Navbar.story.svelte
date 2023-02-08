<script lang="ts">
	import type { Hst } from '@histoire/plugin-svelte'
	import Navbar from './Navbar.svelte'

	export let Hst: Hst
</script>

<Hst.Story>
	<Hst.Variant title="anon"><Navbar user={null} /></Hst.Variant>
	<Hst.Variant title="user">
		<Navbar
			user={{
				id: 0,
				email: 'example@histoire.dev',
				name: 'Histoire'
			}}
		/>
	</Hst.Variant>
</Hst.Story>
