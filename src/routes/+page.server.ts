import type { PageServerLoad } from './$types';
import { get_repo } from '$lib/server/utils/github';

// get url path whenever visiting a new page
export const load: PageServerLoad = async () => {
	const repos = await get_repo();

	return {
		repos
	};
};
