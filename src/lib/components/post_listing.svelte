<script lang="ts">
	import type { MarkdownPostMetadataAndSlug } from '$lib/types';
	import { formatDate } from '$lib/utils/date';

	let { post }: { post: MarkdownPostMetadataAndSlug } = $props();

	let href = `/blog/posts/${post.slug}`;
</script>

<article class="cursor-pointer p-4">
	<a {href} target="_blank" class="sm:flex sm:space-x-4">
		<div class="block sm:w-80">
			<div class="aspect-w-16 aspect-h-9 overflow-hidden rounded-lg">
				<img src={post.metadata.imgUrl} alt={post.metadata.title} class="object-cover" />
			</div>
		</div>

		<div class="flex flex-1 flex-col py-2 sm:py-0">
			<h3 class="mb-1 text-xl font-medium">
				{post.metadata.title}
			</h3>
			<p class="text-gray-60 font-light dark:text-gray-300">
				<span>Published: </span>
				<time datetime={post.metadata.published}>
					{formatDate(post.metadata.published)}
				</time>
			</p>

			<p class="py-2 font-light">
				{post.metadata.summary}
			</p>

			<div
				class="mt-auto font-light text-gray-600
          underline dark:text-gray-300"
			>
				<span>Read more...</span>
			</div>
		</div>
	</a>
</article>
