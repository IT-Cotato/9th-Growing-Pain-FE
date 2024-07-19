import { button } from '@material-tailwind/react';
import React from 'react';

// 페이지 라우팅을 위해 onClick 추가 (06.28_은솔)
const Button = ({ type, text, onClick }) => {
	let buttonClasses = 'py-3 px-9 rounded-[10px] h-11 flex items-center justify-center';
	// 디자인 더 나오면 버튼 추가&수정해야할듯

	// 타입에 따라 클래스를 추가
	switch (type) {
		// 헤더의 '회원가입' 버튼
		case 'signup':
			buttonClasses = 'w-[102px] h-[36px] bg-white rounded-[10px] border-2 border-navy-dark text-black';
			break;
		// 헤더의 '로그인' 버튼
		case 'login':
			buttonClasses = 'w-[92px] h-[36px] bg-navy-dark text-white w-[100px] h-[36px] rounded-[10px]';
			break;
		// 메인 화면에 '자소서 관리 시작하기' 버튼
		case 'main':
			buttonClasses += ' bg-navy-light text-white rounded-full';
			break;
		// login 페이지의 '로그인' 버튼
		case 'loginPage':
			buttonClasses = 'w-[131px] h-[113px] rounded-[10px] bg-[#26408B] text-white text-[17px] font-medium';
			break;
		// 회원가입 페이지의 '회원가입' 버튼
		case 'signupPage':
			buttonClasses = 'w-[128px] h-[48px] rounded-[10px] bg-[#26408B] text-white text-[17px] font-medium';
			break;
		// 회원가입 완료 페이지 '시작하기' 버튼
		case 'signupSuccess':
			buttonClasses = 'w-[276px] h-[48px] rounded-[10px] bg-[#26408B] text-white text-[17px] font-medium';
			break;
		// 커뮤니티 페이지 '저장하기' 버튼
		case 'communitySave':
			buttonClasses = 'w-[111px] h-[38px] rounded-[10px] bg-[#26408B] text-white text-[15px] font-normal';
			break;
		// login 페이지의 '로그인' 버튼
		case 'saveMyInfo':
			buttonClasses = 'w-[131px] h-[45px] rounded-[10px] bg-[#26408B] text-white text-[17px] font-medium';
			break;
		// 비밀번호 찾기 페이지 버튼
		case 'findPw':
			buttonClasses = 'w-[276px] h-[40px] rounded-[10px] bg-[#26408B] text-white text-[17px] font-medium';
			break;
		// 정보 수정, 회원가입에 쓰이는 회색 버튼
		default:
			buttonClasses = 'rounded-[10px] py-3 px-9 w-[135px] h-[48px] bg-[#E3EAFF] text-[#1F1F1F] text-[16px] font-medium';
			break;
	}

	return (
		<button className={buttonClasses} onClick={onClick}>
			{text}
		</button>
	);
};

export default Button;
