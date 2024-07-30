const categoryTag = ({ category }) => {
	const categoryNames = {
		free: '자유',
		study: '스터디',
		contest: '공모전',
		project: '프로젝트',
		portfolio: '포트폴리오',
	};

	const categoryName = categoryNames[category];

	return (
		<div className="flex gap-[11px]">
			{(category === 'project' || category === 'study' || category === 'contest') && (
				<div className="w-[100px] h-[37px] rounded-[10px] bg-gray-line text-center py-[7px] text-[15px] font-normal">
					팀원모집
				</div>
			)}
			<div className="w-[100px] h-[37px] rounded-[10px] bg-gray-line text-center py-[7px] text-[15px] font-normal">
				{categoryName}
			</div>
		</div>
	);
};

export default categoryTag;
