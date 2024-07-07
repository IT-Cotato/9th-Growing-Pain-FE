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
					// 사이드바 메뉴 호버 색
					lightSide: '#E4E7F4',
				},
				navy: {
					// 로그인 & 회원가입 버튼 색
					dark: '#26408B',
					// 자소서 관리 시작 버튼 색
					light: '#5D5A88',
					// 사이드바 배경 색 + 성장기록 활동기록 탭
					lightSide: '#F1F2F7',
					// 사이드바 기록하기 버튼 텍스트 색
					sideText: "#5D5FEF",
				},
				red: {
					// 일반 빨간색
					normal: "#FF0000"
				}
			},
		},
		fontFamily: {					// 폰트는 통일일 것 같아서 굵기만 조절 (원래 사이즈 조절하듯이 사용하기!)
			'regular': ['Pretendard-Regular'],
			'medium': ['Pretendard-Medium'],
			'bold': ['Pretendard-Bold'],
		},
		plugins: [],
	},
};
