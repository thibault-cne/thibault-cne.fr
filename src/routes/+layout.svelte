<script lang="ts">
	import ThemeInitializer from '$lib/components/themeInitializer.svelte';

	import '../app.css';

	let { children } = $props();
</script>

<ThemeInitializer>
	<!--
	<header
		class="dark:bg-dark-background fixed inset-x-0 top-0 z-10
       bg-white"
	>
		<nav
			class="mx-auto flex h-24 max-w-5xl
 items-center justify-between"
		>
			<span>Thibault Cheneviere</span>
			<div class="flex items-center space-x-10">
				<a href="#about">About</a>
				<a href="todo">Blog</a>
			</div>
		</nav>
	</header>
	-->

	<div class="bg-light dark:bg-dark text-dark dark:text-light transition-colors duration-300">
		<main class=" mx-auto max-w-5xl">
			{@render children()}
		</main>
	</div>
</ThemeInitializer>
