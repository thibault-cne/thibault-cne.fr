import typography from '@tailwindcss/typography';
import aspectRatio from '@tailwindcss/aspect-ratio';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {},

	plugins: [typography, aspectRatio]
} satisfies Config;
