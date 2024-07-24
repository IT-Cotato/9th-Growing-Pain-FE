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
					// 활동기록 컨테이너 라인 색
					line: '#F1F1F1',
					// 활동기록 텍스트 색상
					content: '#A8A8A8',
					// 커뮤니티 포지션 색상
					commuPosition: '#5B5B5B',
					// 커뮤니티 시간 색상
					commuTime: '#8C8C8C',
					// 배경색
					background: '#F6F9FC',
					// 마이페이지(커뮤니티 활동) 삭제 버튼
					deleteBtn: '#9A9A9A',
					// 지원현황 디데이 배경
					dday: "#F4F6FA",
				},
				navy: {
					// 로그인 & 회원가입 버튼 색
					dark: '#26408B',
					// 자소서 관리 시작 버튼 색
					light: '#5D5A88',
					// 사이드바 배경 색 + 성장기록 활동기록 탭
					lightSide: '#F1F2F7',
					// 사이드바 기록하기 버튼 텍스트 색
					sideText: '#5D5FEF',
					// 활동기록 페이지 기록 숫자
					activityNum: '#C7D5FF',
					// 커뮤니티 배경 색
					communityBg: '#F6F9FC',
					// 마이페이지(커뮤니티) 토글 색상
					mypageToggle: '#EDF6FF',
					// 면접 추가 버튼
					interviewBtn: "#C5D2F7",
				},
				red: {
					// 일반 빨간색
					normal: '#FF0000',
					// 커뮤니티 하트
					heart: '#E31515',
				},
				blue: {
					// 커뮤니티 글 배경
					commuBg: '#F1F5FF',
				},
			},
		},
		fontFamily: {
			// 폰트는 통일일 것 같아서 굵기만 조절 (원래 사이즈 조절하듯이 사용하기!)
			regular: ['Pretendard-Regular'],
			medium: ['Pretendard-Medium'],
			bold: ['Pretendard-Bold'],
			seimbold: ['Pretendard-SemiBold'],
		},
		plugins: [],
	},
};
