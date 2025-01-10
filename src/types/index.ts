import type { Component } from 'svelte';

export type MarkdownPost = {
	metadata: {
		title: string;
		published: string;
		summary: string;
	};
	default: Component;
};

export type MarkdownPostMetadataAndSlug = {
	slug: string;
	metadata: MarkdownPost['metadata'];
};
