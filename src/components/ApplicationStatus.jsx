// overflow 됐을 때 어떻게 할지를 모르겠음....

const ApplicationStatus = ({ position, company, deadline }) => {
	let deadlineColor = '';

	if (Number(deadline) <= 7) {
		deadlineColor = 'text-red-600'; // 마감일이 7일 이내일 때 빨간색 텍스트
	} else {
		deadlineColor = 'text-black'; // 그 외에는 검은색 텍스트
	}

	return (
		<div className="relative flex flex-col p-4 w-[507px] h-[129px] border border-[#DDE4F0] shadow-[0px_2px_2px_rgba(0,0,0,0.1)] rounded-[10px] box-border">
			{/* 회사 이름 */}
			<div className="absolute left-[28px] top-[22px] font-pretendard text-[19px] leading-[25px] font-medium text-black">
				{company}
			</div>

			{/* 포지션 */}
			<div className="absolute left-[28px] top-[59px] font-pretenard text-[17px] font-normal leading-[18px]">
				{position}
			</div>

			{/* 마감일 */}
			<div
				className={`absolute left-[420px] top-[87px] text-[17px] leading-[18px] font-normal text-base ${deadlineColor}`}
			>{`서류 D-${deadline}`}</div>
		</div>
	);
};

export default ApplicationStatus;
