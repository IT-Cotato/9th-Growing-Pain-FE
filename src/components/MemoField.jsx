import React from 'react';
import { FiMoreHorizontal, FiNavigation } from 'react-icons/fi';

const MemoField = ({ placeholderText, onChange, type, value }) => {
	let inputStyle = 'rounded-[10px] resize-none';

	switch (type) {
		// 지원현황 - 질문
		case 'applyRecordQ':
			inputStyle += ' w-[1180px] h-[56px] border border-white bg-white text-[18px] pl-[40px] font-medium outline-none';
			break;
		// 지원현황 - 답변
		case 'applyRecordA':
			inputStyle +=
				' w-full h-full border border-white bg-white text-[18px] rounded-[0px] font-medium leading-[21.48px] outline-none';
			break;
		// 활동기록 편집-기본 정보
		case 'activityInfo':
			inputStyle +=
				' w-[60%] h-full border border-white bg-white text-[14px] rounded-[0px] font-medium leading-[21.48px] p-[1%] outline-none';
			break;
		// 활동기록 편집-성과 및 활동내용
		case 'activityContent':
			inputStyle +=
				' w-full h-full border border-white bg-white text-[14px] rounded-[0px] font-medium leading-[21.48px] p-[1%] outline-none';
			break;
		// 커뮤니티 - 제목
		case 'communityTitle':
			inputStyle =
				'resize-none h-[47px] pl-[24px] pr-[24px] bg-[#F6F6F6] text-[16px] font-normal placeholder-[#888888] rounded-[10px] pt-[14px] w-full';
			break;
		// 커뮤니티 - 본문
		case 'communityMainText':
			inputStyle =
				'resize-none h-[126px] px-[24px] bg-[#F6F6F6] text-[16px] font-normal placeholder-[#888888] leading-[19.09px] rounded-[10px] pt-[24px] w-full';
			break;
		// 커뮤니티 - 댓글
		case 'communityComment':
			inputStyle =
				'resize-none h-[92px] pl-[26px] bg-[#F6F6F6] text-[16px] font-normal placeholder-[#888888] leading-[19.09px] pt-[24px] rounded-[10px] w-full';
			break;
		// 커뮤니티 - 대댓글
		case 'communityCocoment':
			inputStyle =
				'resize-none h-[47px] pl-[26px] bg-[#F6F6F6] text-[16px] font-normal placeholder-[#888888] leading-[19.09px] pt-[14px] rounded-[10px] w-full';
			break;
		default:
			break;
	}

	return (
		<div className="relative w-full h-[70%]">
			<textarea value={value} type={type} placeholder={placeholderText} className={inputStyle} onChange={(e) => onChange(e.target.value)} />
			{type === 'communityCocoment' && (
				<FiNavigation className="absolute right-4 top-[45%] transform -translate-y-1/2 w-6 h-6 text-gray-700 cursor-pointer" />
			)}
		</div>
	);
};

export default MemoField;
