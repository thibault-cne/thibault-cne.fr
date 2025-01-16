import type { MarkdownPostMetadataAndSlug } from '$lib/types';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ data, fetch }) => {
	// get posts from api with sveltekit special fetch
	const response = await fetch('/api/posts');

	// get posts from response
	const posts: MarkdownPostMetadataAndSlug[] = await response.json();

	return {
		...data,
		posts
	};
};
