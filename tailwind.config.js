/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./src/**/*.{js,jsx}',
		'./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./node_modules/@material-tailwind/react/theme/components**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				gray: {
					light: '#D1D1D1',
					dark: '#6F6F6F',
				},
			},
		},
	},
	plugins: [],
};
