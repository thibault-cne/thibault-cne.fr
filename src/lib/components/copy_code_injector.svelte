<script lang="ts">
	import { mount } from 'svelte';
	import CopyCodeBtn from './copy_code_btn.svelte';

	let { children } = $props();

	$effect(() => {
		const preTags = document.getElementsByTagName('pre');

		for (let preTag of preTags) {
			const classList = Array.from(preTag.classList);

			const isCodeBlock = classList.some((className) => className.startsWith('language-'));

			if (isCodeBlock) {
				const preTagParent = preTag.parentNode;

				const newCodeBlockWrapper = document.createElement('div');
				newCodeBlockWrapper.className = 'relative';

				mount(CopyCodeBtn, { target: newCodeBlockWrapper });

				if (preTagParent) {
					preTagParent.replaceChild(newCodeBlockWrapper, preTag);
					newCodeBlockWrapper.appendChild(preTag);
				}
			}
		}
	});
</script>

{@render children()}
