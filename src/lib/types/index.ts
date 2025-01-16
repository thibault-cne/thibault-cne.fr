import type { Component } from 'svelte';

export type MarkdownPost = {
	metadata: {
		title: string;
		published: string;
		summary: string;
		imgUrl: string;
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

export type Repository = {
	name: string;
	description: string;
	url: string;
	createdAt: string;
	owner: {
		login: string;
	};
};
