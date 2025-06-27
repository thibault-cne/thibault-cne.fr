import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const lang = params.lang;

	if (!['en', 'fr'].includes(lang)) {
		error(404, 'Lang not found');
	}

	return {
		lang
	};
};
