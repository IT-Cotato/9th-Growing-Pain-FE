import React from 'react';

const Button = ({ type, text }) => {
	let buttonClasses = 'py-3 px-9 rounded-[10px] h-11 flex items-center justify-center';
	// 디자인 더 나오면 버튼 추가&수정해야할듯

	// 타입에 따라 클래스를 추가
	switch (type) {
		// '회원가입' 버튼
		case 'application':
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
		// 정보 수정, 회원가입에 쓰이는 회색 버튼
		default:
			buttonClasses += ' bg-gray-400 text-black';
			break;
	}

	return <button className={buttonClasses}>{text}</button>;
};

export default Button;
