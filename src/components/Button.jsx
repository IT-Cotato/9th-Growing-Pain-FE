import React from 'react';

// 페이지 라우팅을 위해 onClick 추가 (06.28_은솔)
const Button = ({ type, text, onClick }) => {
	let buttonClasses = 'py-3 px-9 rounded-[10px] h-11 flex items-center justify-center';
	// 디자인 더 나오면 버튼 추가&수정해야할듯

	// 타입에 따라 클래스를 추가
	switch (type) {
		// 헤더의 '회원가입' 버튼
		case 'signup':
			buttonClasses += ' bg-white border-2 border-navy-dark text-black';
			break;
		// '로그인' 버튼
		case 'login':
			buttonClasses += ' bg-navy-dark text-white';
			break;
		// 메인 화면에 '자소서 관리 시작하기' 버튼
		case 'main':
			buttonClasses += ' bg-navy-light text-white rounded-full';
			break;
		// login 페이지의 '로그인' 버튼
		case 'loginPage':
			buttonClasses = 'w-[131px] h-[129px] rounded-[10px] bg-[#26408B] text-white text-[17px] font-medium';
			break;
		// 회원가입 페이지의 '회원가입' 버튼
		case 'signupPage':
			buttonClasses = 'w-[192px] h-[56px] rounded-[10px] bg-[#26408B] text-white text-[17px] font-medium';
			break;
		// 정보 수정, 회원가입에 쓰이는 회색 버튼
		default:
			buttonClasses = 'h-14 rounded-[10px] py-3 px-9 w-[135px] bg-[#CDCDCD] text-black text-[18px]';
			break;
	}

	return (
		<button className={buttonClasses} onClick={onClick}>
			{text}
		</button>
	);
};

export default Button;
