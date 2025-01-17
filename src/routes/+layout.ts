import type { LayoutLoad } from './$types';

// We can't prerender all pages because of gsap animations
export const prerender = false;

// get url path whenever visiting a new page
export const load: LayoutLoad = ({ url }) => {
	return {
		pathname: url.pathname,
		href: url.href
	};
};
