import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
	gsap.registerPlugin(ScrollTrigger);
}

export type SectionAnimation = {
	tag: string;
	timelineUnderline?: boolean;
};

export function sectionAnimation(sections: SectionAnimation[]) {
	sections.forEach(({ tag, timelineUnderline }) => {
		if (timelineUnderline) {
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: tag,
					start: 'top-=50px 70%',
					end: 'top-=50px 70%',
					toggleActions: 'play none reverse none'
				}
			});

			tl.fromTo(
				tag,
				{
					translateY: '5rem',
					opacity: 0
				},
				{
					translateY: 0,
					opacity: 1,
					duration: 0.5
				}
			);
			tl.to(`${tag}-underline`, {
				width: '100%'
			});
		} else {
			gsap.fromTo(
				tag,
				{
					translateY: '30%',
					opacity: 0
				},
				{
					scrollTrigger: {
						trigger: tag,
						start: 'top-=50px 70%',
						end: 'top-=50px 70%',
						toggleActions: 'play none reverse none'
					},
					translateY: 0,
					opacity: 1,
					duration: 0.5
				}
			);
		}
	});
}
