import React from 'react';

const MemoField = ({ placeholderText, onChange, type }) => {
	let inputStyle = 'rounded-[10px]';

	switch (type) {
		// 지원현황 - 질문
		case 'applyRecordQ':
			inputStyle += 'w-[1180px] h-[56px] border border-white bg-white text-[18px] pl-[40px] font-medium';
			break;
		// 지원현황 - 답변
		case 'applyRecordA':
			inputStyle +=
				'w-[1143px] h-[638px] border border-white bg-white text-[18px] pl-[40px] font-medium leading-[21.48px]';
			break;
		// 커뮤니티 - 제목
		case 'communityTitle':
			inputStyle += 'w-[1065px] h-[47px] pl-[26px] bg-[#F6F6F6] text-[16px] font-normal text-[#888888]';
			break;
		// 커뮤니티 - 본문
		case 'communityMainText':
			inputStyle =
				'w-[1065px] h-[126px] pl-[27px] bg-[#F6F6F6] text-[16px] font-normal text-[#888888] leading-[19.09px]';
			break;
		// 커뮤니티 - 댓글
		case 'communityComment':
			inputStyle =
				'w-[1342px] h-[47px] pl-[26px] bg-[#F6F6F6] text-[16px] font-normal text-[#888888] leading-[19.09px]';
			break;
		// 커뮤니티 - 대댓글
		case 'communityCocoment':
			inputStyle =
				'w-[1258px] h-[47px] pl-[26px] bg-[#F6F6F6] text-[16px] font-normal text-[#888888] leading-[19.09px]';
			break;
		default:
			break;
	}

	return <input type={type} placeholder={placeholderText} className={inputStyle} onChange={onChange} />;
};

export default MemoField;
