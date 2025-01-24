<script lang="ts">
	let copyButton: HTMLButtonElement;
	let showCheckmark = false;

	function handleClick() {
		const preTagSibling = copyButton.nextElementSibling as HTMLPreElement;

		navigator.clipboard.writeText(preTagSibling.innerText);

		showCheckmark = true;

		setTimeout(() => (showCheckmark = false), 1000);
	}
</script>

<button
	bind:this={copyButton}
	on:click={handleClick}
	class={`absolute top-2 right-2 rounded-md p-1
  shadow-md
  ${showCheckmark ? 'bg-green-900' : 'bg-gray-700 hover:bg-gray-600'}`}
>
	{#if showCheckmark}
		<svg
			class="h-6 w-6 fill-green-300"
			xmlns="http://www.w3.org/2000/svg"
			x="0px"
			y="0px"
			viewBox="0 0 24 24"
		>
			<path
				d="M 19.980469 5.9902344 A 1.0001 1.0001 0 0 0 19.292969 6.2929688 L 9 16.585938 L 5.7070312 13.292969 A 1.0001 1.0001 0 1 0 4.2929688 14.707031 L 8.2929688 18.707031 A 1.0001 1.0001 0 0 0 9.7070312 18.707031 L 20.707031 7.7070312 A 1.0001 1.0001 0 0 0 19.980469 5.9902344 z"
			/>
		</svg>
	{:else}
		<svg
			class="h-6 w-6 fill-white"
			xmlns="http://www.w3.org/2000/svg"
			x="0px"
			y="0px"
			viewBox="0 0 24 24"
		>
			<path
				d="M 4 2 C 2.895 2 2 2.895 2 4 L 2 17 C 2 17.552 2.448 18 3 18 C 3.552 18 4 17.552 4 17 L 4 4 L 17 4 C 17.552 4 18 3.552 18 3 C 18 2.448 17.552 2 17 2 L 4 2 z M 8 6 C 6.895 6 6 6.895 6 8 L 6 20 C 6 21.105 6.895 22 8 22 L 20 22 C 21.105 22 22 21.105 22 20 L 22 8 C 22 6.895 21.105 6 20 6 L 8 6 z M 8 8 L 20 8 L 20 20 L 8 20 L 8 8 z"
			/>
		</svg>
	{/if}
</button>
