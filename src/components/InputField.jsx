import React from 'react';

const InputField = ({ placeholderText, className, icon: Icon, onChange, type, onKeyDown, place }) => {
	let inputStyle = 'border border-[#26408B] rounded-[10px] w-[336px] h-14 pl-[65px] placeholder:text-[17px]';

	switch (place) {
		// 회원가입 페이지
		case 'signup':
			inputStyle =
				'bg-[#EDEDED] rounded-[10px] w-[548px] h-[48px] pl-[20px] placeholder:text-[16px] text-[#888888] font-normal';
			break;
		// 로그인 페이지
		case 'login':
			inputStyle =
				'border bg-[#EDEDED] rounded-[10px] w-[336px] h-[48px] pl-[65px] placeholder:text-[16px] font-normal';
			break;
		// 회원가입 페이지의 이메일 입력창
		case 'signupEmail':
			inputStyle = 'bg-[#EDEDED] rounded-[10px] w-[247px] h-[48px] pl-[20px] placeholder:text-[17px]';
			break;
		// 회원가입 페이지의 소속 입력창
		case 'singupBelong':
			inputStyle = 'bg-[#EDEDED] rounded-[10px] w-[400px] h-[48px] pl-[20px] font-normal placeholder:text-[16px]';
			break;
		// 비밀번호 찾기 페이지의 이메일 입력창
		case 'findPassword':
			inputStyle = 'bg-[#EDEDED] rounded-[10px] w-[502px] h-[48px] pl-[20px] placeholder:text-[16px]';
			break;
		// 마이페이지 페이지에서 사용하는 입력창
		case 'belongInfo':
			inputStyle = 'bg-[#FFFFFF] rounded-[10px] w-[447px] h-[48px] pl-[20px] placeholder:text-[17px]';
			break;
		case 'abilityInfo':
			inputStyle = 'bg-[#FFFFFF] rounded-[10px] w-[1392px] h-[128px] pl-[20px] placeholder:text-[17px]';
			break;
		case 'awardInfo':
			inputStyle = 'bg-[#FFFFFF] rounded-[10px] w-[1392px] h-[90px] pl-[20px] placeholder:text-[17px]';
			break;
		case 'setting':
			inputStyle =
				'bg-[#F5F5F5] rounded-[10px] w-[612px] h-[48px] pl-[20px] placeholder:text-[14px] font-normal';
			break;
		default:
			break;
	}

	return (
		<div className={`relative ${className}`}>
			{Icon && <Icon className="absolute left-[30px] top-1/2 transform -translate-y-1/2" size={24} color="#888888" />}
			<input
				type={type}
				placeholder={placeholderText}
				className={inputStyle}
				onChange={onChange}
				onKeyDown={onKeyDown}
			/>
		</div>
	);
};

export default InputField;
