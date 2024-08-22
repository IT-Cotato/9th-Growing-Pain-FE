import React from 'react';
import { FiAlertTriangle } from 'react-icons/fi';

const InputField = ({
	placeholderText,
	className,
	icon: Icon,
	onChange,
	type,
	onKeyDown,
	place,
	value,
	showError,
	name,
}) => {
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
			inputStyle =
				'bg-[#FFFFFF] rounded-[10px] w-[447px] h-[48px] pl-[20px] placeholder:text-[17px] mb-[15px] outline-none';
			break;
		case 'belongInfoReadOnly':
			inputStyle =
				'bg-[#FFFFFF] rounded-[10px] w-[447px] h-[48px] pl-[20px] placeholder:text-[17px] mb-[15px] outline-none disabled';
			break;
		case 'abilityInfo':
			inputStyle = 'bg-[#FFFFFF] rounded-[10px] w-4/5 h-[128px] pl-[20px] placeholder:text-[17px] outline-none';
			break;
		case 'awardInfo':
			inputStyle = 'bg-[#FFFFFF] rounded-[10px] w-4/5 h-[90px] pl-[20px] placeholder:text-[17px] outline-none';
			break;
		case 'setting':
			inputStyle =
				'bg-[#F5F5F5] rounded-[10px] w-[60%] h-[48px] pl-[20px] placeholder:text-[14px] font-normal outline-none';
			break;
		case 'careerInfo':
			inputStyle =
				'bg-[#FFFFFF] rounded-[10px] w-full h-[350px] pl-[20px] placeholder:text-[17px] placeholder:text-wrap outline-none break-all';
			break;
		case 'aboutInfo':
			inputStyle =
				'bg-[#FFFFFF] rounded-[10px] w-full h-[325px] pl-[20px] placeholder:text-[17px] placeholder:text-wrap outline-none';
			break;
		case 'applyTitle':
			inputStyle =
				'bg-[#FFFFFF] rounded-[10px] w-full h-[56px] font-semibold pl-[40px] placeholder:text-[18px] placeholder:text-wrap outline-none';
			break;
		// 대쉬보드 페이지-오늘의 다짐
		case 'dashToday':
			inputStyle =
				'bg-[#EDEDED] rounded-[10px] w-[100%] h-[35px] pl-[10px] font-normal text-[13px] placeholder:text-[13px] outline-none';
			break;
		case 'applyCompany':
			inputStyle = ' bg-gray-background outline-none font-medium text-[22px] text-left mb-[5px] justify-start';
			break;
		case 'applyPart':
			inputStyle = ' bg-gray-background outline-none font-medium text-[16px] justify-start';
			break;
		default:
			break;
	}

	return (
		<div className={`relative ${className}`}>
			{Icon && <Icon className="absolute left-[20px] top-1/2 transform -translate-y-1/2" size={24} color="#888888" />}
			<input
				type={type}
				placeholder={placeholderText}
				className={`${inputStyle} ${className}`}
				onChange={onChange}
				onKeyDown={onKeyDown}
				value={value}
				name={name}
			/>
			{showError && (
				<FiAlertTriangle
					className="absolute right-[20px] top-1/2 transform -translate-y-1/2 text-[#ED1516]"
					size={20}
				/>
			)}
		</div>
	);
};

export default InputField;
