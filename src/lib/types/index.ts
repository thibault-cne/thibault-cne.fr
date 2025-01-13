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

export type Circle = {
	x: number;
	y: number;
	translateX: number;
	translateY: number;
	size: number;
	alpha: number;
	targetAlpha: number;
	dx: number;
	dy: number;
	magnetism: number;
};
