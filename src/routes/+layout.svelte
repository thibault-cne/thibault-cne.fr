<script lang="ts">
	import ThemeInitializer from '$lib/components/theme_initializer.svelte';
	import Particle from '$lib/components/particle.svelte';
	import type { LayoutData } from './$types';
	import type { Snippet } from 'svelte';

	import { darkmode } from '$lib/stores/darkmode';

	import '../app.css';

	let { children, data }: { children: Snippet<[]>; data: LayoutData } = $props();

	let canvasContainerRef: HTMLDivElement = $state() as HTMLDivElement;
</script>

<ThemeInitializer>
	{#if !data.isMobile}
		<Particle
			{canvasContainerRef}
			quantity={150}
			color={$darkmode ? '#ffffff' : '#000000'}
			size={0.6}
		/>
	{/if}

	<div
		bind:this={canvasContainerRef}
		class="scroll-auto bg-slate-200 text-dark transition-colors duration-300 dark:bg-slate-800 dark:text-light lg:scroll-smooth"
	>
		<main class="relative z-10">
			{@render children()}
		</main>
	</div>
</ThemeInitializer>
