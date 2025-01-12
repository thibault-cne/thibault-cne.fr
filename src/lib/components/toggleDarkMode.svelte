<script lang="ts">
	import { darkmode } from '$lib/stores/darkmode';
	import { slide } from 'svelte/transition';

	let inTransition = {
		duration: 400,
		delay: 500
	};

	let outTransition = {
		duration: 400
	};

	function toggleDarkmode() {
		if ($darkmode) {
			$darkmode = false;
			document.documentElement.classList.remove('dark');
			localStorage.setItem('theme', 'light');
		} else {
			$darkmode = true;
			document.documentElement.classList.add('dark');
			localStorage.setItem('theme', 'dark');
		}
	}
</script>

<button
	aria-label="toggle-dark-mode"
	id="toggle-dark-mode"
	class="flex h-10 w-10 items-center justify-center rounded-lg bg-black p-2 text-white dark:bg-white dark:text-black"
	on:click={toggleDarkmode}
>
	{#if $darkmode}
		<div in:slide={inTransition} out:slide={outTransition}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				class="h-6 w-6"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
				></path></svg
			>
		</div>
	{:else}
		<div in:slide={inTransition} out:slide={outTransition}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				class="h-6 w-6"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
				></path></svg
			>
		</div>
	{/if}
</button>
