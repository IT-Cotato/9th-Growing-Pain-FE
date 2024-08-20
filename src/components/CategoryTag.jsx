// const CategoryTag = ({ category }) => {
// 	const categoryNames = {
// 		FREE: '자유',
// 		STUDY: '스터디',
// 		CONTEST: '공모전',
// 		PROJECT: '프로젝트',
// 		PORTFOLIO: '포트폴리오',
// 	};

// 	const categoryName = categoryNames[category];

// 	return (
// 		<div className="flex gap-[11px]">
// 			{location.pathname === '/user/community/total' &&
// 				(category === 'PROJECT' || category === 'STUDY' || category === 'CONTEST') && (
// 					<div className="w-[100px] h-[37px] rounded-[10px] bg-gray-line text-center py-[7px] text-[15px] font-normal">
// 						팀원모집
// 					</div>
// 				)}
// 			<div className="w-[100px] h-[37px] rounded-[10px] bg-gray-line text-center py-[7px] text-[15px] font-normal">
// 				{categoryName}
// 			</div>
// 		</div>
// 	);
// };

// export default CategoryTag;

import React from 'react';
import { useLocation } from 'react-router-dom';

const CategoryTag = ({ category }) => {
	const location = useLocation(); // 현재 위치 정보 가져오기

	const categoryNames = {
		FREE: '자유',
		STUDY: '스터디',
		CONTEST: '공모전',
		PROJECT: '프로젝트',
		PORTFOLIO: '포트폴리오',
	};

	const categoryName = categoryNames[category] || '미정';

	return (
		<div className="flex gap-[11px]">
			{location.pathname === '/user/community/total' &&
				(category === 'PROJECT' || category === 'STUDY' || category === 'CONTEST') && (
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

export default CategoryTag;
