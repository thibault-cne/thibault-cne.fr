<script lang="ts">
	import './prism-night-owl.css';
	import type { PageData } from './$types';

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
	<div class="prose max-w-none px-4 py-4 dark:prose-invert">
		<Post />
	</div>
</article>
