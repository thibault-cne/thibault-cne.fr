export function isMobile() {
	return window.matchMedia('only screen and (max-width: 480px)').matches;
}
