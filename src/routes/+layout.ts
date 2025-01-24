import type { LayoutLoad } from './$types';
import { isMobile as isMobileFunc } from '$lib/utils/mobile';
import { browser } from '$app/environment';

// We can't prerender all pages because of gsap animations
export const prerender = false;

// get url path whenever visiting a new page
export const load: LayoutLoad = ({ url }) => {
	let isMobile = false;

	if (browser) {
		isMobile = isMobileFunc();
	}

	return {
		pathname: url.pathname,
		href: url.href,
		isMobile
	};
};
