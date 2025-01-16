<script lang="ts">
	import type { Repository } from '$lib/types';
	import { formatDate } from '$lib/utils/date';

	let { repo }: { repo: Repository } = $props();

	const url = `https://opengraph.githubassets.com/1/${repo.owner.login}/${repo.name}`;
</script>

<div class="flex h-full flex-col space-x-2 py-4 sm:w-80 sm:space-x-4">
	<a href={repo.url} class="block sm:w-80">
		<div class="aspect-w-16 aspect-h-9 overflow-hidden rounded-lg">
			<img src={url} alt={repo.name} class="object-cover" />
		</div>
	</a>
	<div class="flex flex-1 flex-col py-2 sm:py-0">
		<a href={repo.url}>
			<p class="text-gray-60 font-light dark:text-gray-300">
				<span>Created: </span>
				<time datetime={repo.createdAt}>
					{formatDate(repo.createdAt)}
				</time>
			</p>

			<p class="line-clamp-2 pt-2 font-light">
				{repo.description}
			</p>
		</a>

		<div
			class="group/link mt-auto flex space-x-2 font-light text-gray-600
          underline dark:text-gray-300"
		>
			<a href={repo.url} target="_blank">Discover more</a>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
				fill="currentColor"
				class="inline-block h-4 w-4 translate-y-px transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none"
				aria-hidden="true"
				><path
					fill-rule="evenodd"
					d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
					clip-rule="evenodd"
				/></svg
			>
		</div>
	</div>
</div>
