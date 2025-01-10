<script lang="ts">
	import './prism-night-owl.css';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const { post: Post } = data;
</script>

<article>
	<div class="prose max-w-none px-4 py-4 dark:prose-invert">
		<Post />
	</div>
</article>
