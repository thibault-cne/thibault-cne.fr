<script lang="ts">
	import { qr } from '@svelte-put/qr/svg';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let base_url = 'https://file-server.thibault-cne.fr/static/';
	let filename = `cv_thibault_cheneviere_${data.lang}.pdf`;

	let url = `${base_url}${filename}`;
</script>

<div class="flex h-screen w-full flex-col items-center-safe justify-center space-y-6">
	<svg
		use:qr={{
			data: url,
			shape: 'circle'
		}}
		width="400"
		height="400"
	/>
	<p class="text-2xl font-bold">{filename}</p>
</div>
