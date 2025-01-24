<script lang="ts">
	import ToggleDarkMode from '$lib/components/dark_mode_btn.svelte';
	import PostListing from '$lib/components/post_listing.svelte';
	import RepositoryListing from '$lib/components/repo_listing.svelte';
	import ScaleHover from '$lib/components/scale_hover.svelte';
	import type { PageData } from './$types';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

	import { sectionAnimation } from '$lib/utils/gsap';
	import { titleCase } from '$lib/utils/string';

	let { data }: { data: PageData } = $props();

	gsap.registerPlugin(ScrollTrigger);

	$effect(() => {
		let tl = gsap.timeline({
			scrollTrigger: {
				trigger: '#about',
				start: 'top 70%',
				end: 'top 70%',
				toggleActions: 'play none reverse none'
			}
		});

		tl.to('#job', {
			'--highlight-mask-size': '100% 100%',
			duration: 0.5
		});
		tl.to('#docker', {
			'--highlight-mask-size': '100% 100%',
			duration: 0.5
		});
		tl.to('#kubernetes', {
			'--highlight-mask-size': '100% 100%',
			duration: 0.5
		});
		tl.to('#github', {
			'--highlight-mask-size': '100% 100%',
			duration: 0.5
		});
	});

	$effect(() => {
		sectionAnimation([
			{ tag: '#about' },
			{ tag: '#blog', timelineUnderline: true },
			{ tag: '#project', timelineUnderline: true }
		]);
	});
</script>

<svelte:head>
	<meta property="og:url" content="https://thibault-cne.fr" />
	<meta property="og:title" content="Thibault Cheneviere" />
	<meta property="og:description" content="Thibault Cheneviere's portfolio website" />
	<meta property="og:image" content="https://thibault-cne.fr/favicon.png" />
</svelte:head>

<section id="hero" class="relative h-screen">
	<div class="absolute top-8 right-8 z-10"><ToggleDarkMode /></div>
	<div class="flex h-full flex-col items-center justify-center pb-24">
		<h1 class="text-shadow text-4xl shadow-gray-600 md:text-6xl lg:text-7xl dark:shadow-gray-100">
			<span class="font-mono font-bold">Thibault</span>
			<span class="font-garamond font-normal italic">Cheneviere</span>
		</h1>
		<span
			class="bg-gradient-to-r from-[#9C83FF] to-[#FF9051] bg-clip-text text-xl font-semibold text-transparent md:min-h-16 md:text-4xl lg:min-h-20 lg:text-5xl"
			>Software Engineer</span
		>
		<div class="mt-12 flex flex-col items-center space-y-6 sm:flex-row sm:space-y-0 sm:space-x-6">
			<a
				href="https://github.com/thibault-cne"
				target="_blank"
				class="shadow-subtle flex h-16 w-48 items-center justify-around rounded-full bg-[#2dba4e] text-lg font-bold shadow-[#2dba4e] transition duration-300 hover:scale-110"
			>
				<span class="text-2xl text-white">GitHub</span>
				<svg
					viewBox="0 0 256 250"
					class="ml-2 h-6 w-6"
					fill="white"
					xmlns="http://www.w3.org/2000/svg"
					preserveAspectRatio="xMidYMid"
				>
					<path
						d="M128.001 0C57.317 0 0 57.307 0 128.001c0 56.554 36.676 104.535 87.535 121.46 6.397 1.185 8.746-2.777 8.746-6.158 0-3.052-.12-13.135-.174-23.83-35.61 7.742-43.124-15.103-43.124-15.103-5.823-14.795-14.213-18.73-14.213-18.73-11.613-7.944.876-7.78.876-7.78 12.853.902 19.621 13.19 19.621 13.19 11.417 19.568 29.945 13.911 37.249 10.64 1.149-8.272 4.466-13.92 8.127-17.116-28.431-3.236-58.318-14.212-58.318-63.258 0-13.975 5-25.394 13.188-34.358-1.329-3.224-5.71-16.242 1.24-33.874 0 0 10.749-3.44 35.21 13.121 10.21-2.836 21.16-4.258 32.038-4.307 10.878.049 21.837 1.47 32.066 4.307 24.431-16.56 35.165-13.12 35.165-13.12 6.967 17.63 2.584 30.65 1.255 33.873 8.207 8.964 13.173 20.383 13.173 34.358 0 49.163-29.944 59.988-58.447 63.157 4.591 3.972 8.682 11.762 8.682 23.704 0 17.126-.148 30.91-.148 35.126 0 3.407 2.304 7.398 8.792 6.14C219.37 232.5 256 184.537 256 128.002 256 57.307 198.691 0 128.001 0Zm-80.06 182.34c-.282.636-1.283.827-2.194.39-.929-.417-1.45-1.284-1.15-1.922.276-.655 1.279-.838 2.205-.399.93.418 1.46 1.293 1.139 1.931Zm6.296 5.618c-.61.566-1.804.303-2.614-.591-.837-.892-.994-2.086-.375-2.66.63-.566 1.787-.301 2.626.591.838.903 1 2.088.363 2.66Zm4.32 7.188c-.785.545-2.067.034-2.86-1.104-.784-1.138-.784-2.503.017-3.05.795-.547 2.058-.055 2.861 1.075.782 1.157.782 2.522-.019 3.08Zm7.304 8.325c-.701.774-2.196.566-3.29-.49-1.119-1.032-1.43-2.496-.726-3.27.71-.776 2.213-.558 3.315.49 1.11 1.03 1.45 2.505.701 3.27Zm9.442 2.81c-.31 1.003-1.75 1.459-3.199 1.033-1.448-.439-2.395-1.613-2.103-2.626.301-1.01 1.747-1.484 3.207-1.028 1.446.436 2.396 1.602 2.095 2.622Zm10.744 1.193c.036 1.055-1.193 1.93-2.715 1.95-1.53.034-2.769-.82-2.786-1.86 0-1.065 1.202-1.932 2.733-1.958 1.522-.03 2.768.818 2.768 1.868Zm10.555-.405c.182 1.03-.875 2.088-2.387 2.37-1.485.271-2.861-.365-3.05-1.386-.184-1.056.893-2.114 2.376-2.387 1.514-.263 2.868.356 3.061 1.403Z"
					/>
				</svg>
			</a>
			<a
				href="https://linkedin.com/in/thibault-cne"
				target="_blank"
				class="shadow-subtle flex h-16 w-48 items-center justify-around space-x-2 rounded-full bg-[#0a66c2] text-lg font-bold text-white shadow-[#0a66c2] transition duration-300 hover:scale-110"
			>
				<span class="text-2xl text-white">Linkedin</span>
				<svg
					class="ml-2 h-6 w-6 fill-white"
					xmlns="http://www.w3.org/2000/svg"
					preserveAspectRatio="xMidYMid"
					viewBox="0 0 256 256"
					><path
						d="M218.123 218.127h-37.931v-59.403c0-14.165-.253-32.4-19.728-32.4-19.756 0-22.779 15.434-22.779 31.369v60.43h-37.93V95.967h36.413v16.694h.51a39.907 39.907 0 0 1 35.928-19.733c38.445 0 45.533 25.288 45.533 58.186l-.016 67.013ZM56.955 79.27c-12.157.002-22.014-9.852-22.016-22.009-.002-12.157 9.851-22.014 22.008-22.016 12.157-.003 22.014 9.851 22.016 22.008A22.013 22.013 0 0 1 56.955 79.27m18.966 138.858H37.95V95.967h37.97v122.16ZM237.033.018H18.89C8.58-.098.125 8.161-.001 18.471v219.053c.122 10.315 8.576 18.582 18.89 18.474h218.144c10.336.128 18.823-8.139 18.966-18.474V18.454c-.147-10.33-8.635-18.588-18.966-18.453"
					/></svg
				>
			</a>
		</div>
	</div>
	<div class="absolute bottom-5 left-1/2 translate-x-1/2 animate-bounce">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="h-12 w-12"><path d="m6 9 6 6 6-6"></path></svg
		>
	</div>
</section>

<section id="about" class="bg-gray-100 py-20 dark:bg-gray-900">
	<div class="container mx-auto px-4">
		<h1 class="font-garamond mb-8 text-center text-3xl font-normal italic md:text-4xl">About Me</h1>
		<div
			class="flex flex-col items-center justify-center space-y-8 font-mono md:flex-row md:items-start md:space-y-0 md:space-x-12"
		>
			<div class="h-64 w-64 flex-shrink-0 overflow-hidden rounded-full">
				<img class="h-full w-full object-cover" src="/favicon.png" alt="profile" />
			</div>

			<div class="max-w-2xl text-center md:text-left">
				<p class="font-mono text-lg md:text-xl">
					Hello! I'm Thibault a graduate <span
						id="job"
						class="highlight highlight-spread-sm after:bg-indigo-500">Full Stack</span
					>
					Software Engineer based in Melbourne. I am also proeficient with deployment tools like
					<span id="docker" class="highlight highlight-spread-sm after:bg-[#1d63ed]">Docker</span>,
					<span id="kubernetes" class="highlight highlight-spread-sm after:bg-[#326ce5]"
						>Kubernetes</span
					>, and
					<span id="github" class="highlight highlight-spread-sm after:bg-[#2dba4e]">GitHub</span>
					to ensure
					<span>efficient and seamless</span>
					deployments.
				</p>
				<br />
				<p class="font-mono text-lg md:text-xl">
					I am passionate about sports, motorsport and cooking. When I'm not coding, you will find
					me either practicing or trying out new recipes.
				</p>
			</div>
		</div>
	</div>
</section>

{#snippet sectionHeader(name: string)}
	<h1 class="text-center">
		<span id={`${name}-title`} class="font-garamond relative text-3xl italic md:text-4xl"
			>{titleCase(name)}
			<span
				id={`${name}-underline`}
				class="bg-dark dark:bg-light absolute bottom-0 left-0 block h-[0.1rem] w-0"
			></span>
		</span>
	</h1>
{/snippet}

<section id="blog" class="pt-24">
	{@render sectionHeader('blog')}

	<div class="group/list mx-auto mt-8 max-w-xs sm:max-w-lg md:max-w-3xl">
		{#each data.posts as post}
			<ScaleHover><PostListing {post} /></ScaleHover>
		{/each}
	</div>
</section>

<section id="project" class="pt-24">
	{@render sectionHeader('project')}

	<div class="mx-auto mt-8 max-w-xs sm:max-w-lg md:max-w-3xl lg:max-w-7xl">
		<div
			class="group/list grid auto-rows-fr grid-cols-1 place-items-center sm:grid-cols-2 2xl:grid-cols-3"
		>
			{#each data.repos as repo}
				<ScaleHover class="flex h-full w-full items-center justify-center"
					><RepositoryListing {repo} /></ScaleHover
				>
			{/each}
		</div>
	</div>
</section>

<footer class="bg-light mt-8 w-full py-4 text-center dark:bg-slate-900">
	<a href="https://github.com/thibault-cne">made with love by thibault-cne</a>
</footer>

<style>
	.animate-bounce {
		animation: bounce 2s infinite;
	}

	@keyframes bounce {
		0%,
		20%,
		50%,
		80%,
		100% {
			transform: translateX(-50%) translateY(0);
		}
		40% {
			transform: translateX(-50%) translateY(-20px);
		}
		60% {
			transform: translateX(-50%) translateY(-10px);
		}
	}
</style>
