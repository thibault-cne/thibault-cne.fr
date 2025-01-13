import typography from '@tailwindcss/typography';
import plugin from 'tailwindcss/plugin';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		extend: {
			textShadow: {
				DEFAULT: '0 0 12px var(--tw-shadow-color)'
			},
			colors: {
				dark: 'rgb(10, 10, 10)',
				light: 'rgb(252, 251, 247)'
			},
			boxShadow: {
				subtle: '0 0 12px var(--tw-shadow-color)'
			}
		}
	},

	plugins: [
		typography,
		plugin(function ({ matchUtilities, theme }) {
			matchUtilities(
				{
					'text-shadow': (value) => ({
						textShadow: value
					})
				},
				{
					values: theme('textShadow')
				}
			);
		})
	]
} satisfies Config;
