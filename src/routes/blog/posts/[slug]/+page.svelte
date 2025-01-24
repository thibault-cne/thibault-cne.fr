<script lang="ts">
	import './prism-night-owl.css';
	import type { PageData } from './$types';
	import CopyCodeInjector from '$lib/components/copy_code_injector.svelte';

	let { data }: { data: PageData } = $props();

	const { post: Post } = data;
</script>

<svelte:head>
	<meta property="og:url" content={data.href} />
	<meta property="og:title" content={data.metadata.title} />
	<meta property="og:description" content={data.metadata.summary} />
	<meta property="og:image" content={data.metadata.imgUrl} />
</svelte:head>

<article>
	<div class="prose dark:prose-invert max-w-none px-4 py-4">
		<CopyCodeInjector>
			<Post />
		</CopyCodeInjector>
	</div>
</article>
