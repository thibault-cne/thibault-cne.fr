import type { PageServerLoad } from './$types';
import { get_repo } from '$lib/server/utils/github';
import Keyv from 'keyv';
import type { Repository } from '$lib/types';

const cache: Keyv<Repository[]> = new Keyv();

// We can cache the data for 1 hour as it is not going to change (the pinned repositories)
export const load: PageServerLoad = async ({ setHeaders }) => {
	setHeaders({ 'cache-control': 'public, max-age=3600000' });

	if (await cache.has('repos')) {
		const repos = (await cache.get('repos')) as Repository[];
		return {
			repos
		};
	}

	const repos = await get_repo();
	await cache.set('repos', repos, 3600000);

	return {
		repos
	};
};
