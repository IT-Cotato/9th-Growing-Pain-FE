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
					// Footer - 구분선
					light: '#D1D1D1',
					// Footer - 글자들
					dark: '#6F6F6F',
				},
				navy: {
					// 로그인 & 회원가입 버튼 색
					dark: '#26408B',
					// 자소서 관리 시작 버튼 색
					light: '#5D5A88',
				},
			},
		},
		plugins: [],
	},
};
