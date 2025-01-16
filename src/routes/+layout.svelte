<script lang="ts">
	import ThemeInitializer from '$lib/components/theme_initializer.svelte';
	import Particle from '$lib/components/particle.svelte';

	import { darkmode } from '$lib/stores/darkmode';

	import '../app.css';

	let { children } = $props();

	let canvasContainerRef: HTMLDivElement = $state() as HTMLDivElement;
</script>

<ThemeInitializer>
	<Particle
		{canvasContainerRef}
		quantity={150}
		color={$darkmode ? '#ffffff' : '#000000'}
		size={0.6}
	/>

	<div
		bind:this={canvasContainerRef}
		class="scroll-auto bg-slate-200 text-dark transition-colors duration-300 dark:bg-slate-800 dark:text-light lg:scroll-smooth"
	>
		<main class="relative z-10">
			{@render children()}
		</main>
	</div>
</ThemeInitializer>
