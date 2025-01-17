import { GITHUB_PAT } from '$env/static/private';
import type { Repository } from '$lib/types';

//Get data from the Github GraphQl api
export async function get_repo(): Promise<Repository[]> {
	try {
		const res = await fetch('https://api.github.com/graphql', {
			method: 'post',
			headers: {
				Authorization: `Bearer ${GITHUB_PAT}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				query: `{
              user(login: "thibault-cne") {
                pinnedItems(first: 6, types: REPOSITORY) {
                  nodes {
                    ... on Repository {
                      name
                      description
                      url
                      createdAt
                      owner {
                        login
                      }
                    }
                  }
                }
              }
            }`
			})
		});

		const limit = res.headers.get('x-ratelimit-limit');

		if (limit && limit === '0') {
			console.log('Github rate limit reached');
			return [];
		}

		const json = await res.json();
		return json.data.user.pinnedItems.nodes;
	} catch (err) {
		console.log('it was not possible to get the pinned repositories from github', err);
		return [];
	}
}
