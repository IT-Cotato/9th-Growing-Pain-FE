import React from 'react';

const MemoField = ({ placeholderText, onChange, type, value }) => {
	let inputStyle = 'rounded-[10px] resize-none';

	switch (type) {
		// 지원현황 - 질문
		case 'applyRecordQ':
			inputStyle += ' w-[1180px] h-[56px] border border-white bg-white text-[18px] pl-[40px] font-medium';
			break;
		// 지원현황 - 답변
		case 'applyRecordA':
			inputStyle +=
				' w-full h-full border border-white bg-white text-[18px] rounded-[0px] font-medium leading-[21.48px]';
			break;
		// 활동기록 편집-기본 정보
		case 'activityInfo':
			inputStyle +=
				' w-[60%] h-full border border-white bg-white text-[14px] rounded-[0px] font-medium leading-[21.48px] p-[1%] pt-[4%]';
			break;
		// 활동기록 편집-성과 및 활동내용
		case 'activityContent':
			inputStyle +=
				' w-full h-full border border-white bg-white text-[14px] rounded-[0px] font-medium leading-[21.48px] p-[1%]';
			break;
		// 커뮤니티 - 제목
		case 'communityTitle':
			inputStyle =
				'resize-none h-[47px] pl-[24px] pr-[24px] bg-[#F6F6F6] text-[16px] font-normal placeholder-[#888888] rounded-[10px] pt-[14px]';
			break;
		// 커뮤니티 - 본문
		case 'communityMainText':
			inputStyle =
				'resize-none h-[126px] px-[24px] bg-[#F6F6F6] text-[16px] font-normal placeholder-[#888888] leading-[19.09px] rounded-[10px] pt-[24px]';
			break;
		// 커뮤니티 - 댓글
		case 'communityComment':
			inputStyle =
				'resize-none w-[1295px] h-[47px] pl-[26px] bg-[#F6F6F6] text-[16px] font-normal placeholder-[#888888] leading-[19.09px] pt-[13.5px] rounded-[10px]';
			break;
		// 커뮤니티 - 대댓글
		case 'communityCocoment':
			inputStyle =
				'w-[1258px] h-[47px] pl-[26px] bg-[#F6F6F6] text-[16px] font-normal placeholder-[#888888] leading-[19.09px]';
			break;
		default:
			break;
	}

	return <textarea value={value} type={type} placeholder={placeholderText} className={inputStyle} onChange={onChange} />;
};

export default MemoField;
