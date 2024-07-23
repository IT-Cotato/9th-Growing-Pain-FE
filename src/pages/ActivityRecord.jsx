import { useLocation, useNavigate } from 'react-router-dom';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import ActivityItem from '../components/ActivityItem';

const activityData = [
	{
		activity_id: 0,
		activity_name: '청소년 봉사활동',
		activity_period: '2024.09-2024.10',
		role: ['국어 과목 과외', '커리큘럼 파기', '학생 개인별 맞춤 수업 구상'],
		activity_type: '교육 봉사',
		contribution: 50,
		activity_url: 'https://www.edu.com',
	},
	{
		activity_id: 1,
		activity_name: '지하철 봉사활동',
		activity_period: '2024.09-2024.12',
		role: ['어른신 돕기'],
		activity_type: '교육 봉사',
		contribution: 70,
		activity_url: 'https://www.sub.com',
	},
	{
		activity_id: 2,
		activity_name: '지하철 봉사활동',
		activity_period: '2024.09-2024.12',
		role: ['어른신 돕기'],
		activity_type: '교육 봉사',
		contribution: 100,
		activity_url: 'https://www.sub.com',
	},
];

const ActivityRecord = () => {
	const location = useLocation();
	const nav = useNavigate();

	// 기본 카테고리 메뉴 스타일
	const categoryBarMenuClass =
		'flex-1 content-center bg-navy-lightSide cursor-pointer hover:bg-gray-lightSide hover:rounded-[10px]';
	// 현재 위치한 카테고리 메뉴 스타일
	const selectCategoryClass = 'flex-1 content-center bg-navy-dark rounded-[10px] cursor-pointer text-white';

	// 현재 페이지에 해당하는 메뉴바의 색상 유지
	const isActive = (path) => (location.pathname === path ? selectCategoryClass : categoryBarMenuClass);

	return (
		<div className="activity-container flex-col">
			<div className="category-bar bg-navy-lightSide flex h-[50px] mx-[70px] mt-[50px] rounded-[10px]">
				<div
					onClick={() => nav('/user/growth/activity/extracurricular')}
					className={`${isActive('/user/growth/activity/extracurricular')} rounded-l-[10px]`}
				>
					대외활동
				</div>
				<div
					onClick={() => nav('/user/growth/activity/service')}
					className={`${isActive('/user/growth/activity/service')}`}
				>
					봉사활동
				</div>
				<div
					onClick={() => nav('/user/growth/activity/project')}
					className={`${isActive('/user/growth/activity/project')}`}
				>
					프로젝트
				</div>
				<div
					onClick={() => nav('/user/growth/activity/contest')}
					className={`${isActive('/user/growth/activity/contest')}`}
				>
					공모전
				</div>
				<div onClick={() => nav('/user/growth/activity/club')} className={`${isActive('/user/growth/activity/club')}`}>
					동아리
				</div>
				<div
					onClick={() => nav('/user/growth/activity/extra')}
					className={`${isActive('/user/growth/activity/extra')} rounded-r-[10px]`}
				>
					여분통
				</div>
			</div>
			<div className="plus-container h-[49px] mx-[70px] content-end top-[-21px] z-100 relative">
				<div className="plus-button w-[115px] flex gap-1 absolute cursor-pointer">
					<PlusCircleIcon className="w-[24px] h-[24px] text-navy-dark" />
					활동 추가하기
				</div>
			</div>
			{/* "활동 추가하기" 버튼과 일단 안 겹치게 구현하고 나중에 겹치게 수정 */}
			<div className="activity-record-content h-[895px] mx-[70px] grid grid-cols-2 gap-x-[2%] gap-y-[1%]">
				{activityData.map((item) => {
					return (
						<ActivityItem
							key={item.activity_id}
							id={item.activity_id}
							name={item.activity_name}
							period={item.activity_period}
							role={item.role}
							type={item.activity_type}
							contribution={item.contribution}
							url={item.activity_url}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default ActivityRecord;
