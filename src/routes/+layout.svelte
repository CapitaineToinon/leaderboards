<script lang="ts">
	import '../app.css';
</script>

<nav class="mb-3 border-b py-3">
	<ul class="mx-auto flex max-w-md gap-3">
		<li>
			<a href="/">Home</a>
		</li>
		<li>
			<a href="/auth/login">Login</a>
		</li>
		<li>
			<a href="/auth/signin">Sign in</a>
		</li>
	</ul>
</nav>

<main class="mx-auto max-w-md">
	<slot />
</main>
