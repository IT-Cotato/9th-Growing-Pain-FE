import { useLocation, useNavigate } from 'react-router-dom';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import ActivityItem from '../components/ActivityItem';
import { useRef } from 'react';

const activityData = [
	{
		activity_id: 0,
		activity_name: '청소년 봉사활동',
		activity_period: '2024.09-2024.10',
		role: '국어 과목 과외',
		activity_type: '봉사활동',
		contribution: 50,
		activity_url: 'https://www.edu.com',
	},
	{
		activity_id: 1,
		activity_name: '지하철 봉사활동',
		activity_period: '2024.09-2024.12',
		role: '어른신 돕기',
		activity_type: '봉사활동',
		contribution: 70,
		activity_url: 'https://www.sub.com',
	},
	{
		activity_id: 2,
		activity_name: '지하철 봉사활동',
		activity_period: '2024.09-2024.12',
		role: '어른신 돕기',
		activity_type: '봉사활동',
		contribution: 100,
		activity_url: 'https://www.sub.com',
	},
	{
		activity_id: 3,
		activity_name: '취준기록프로젝트',
		activity_period: '2024.09-2024.12',
		role: '프론트엔드',
		activity_type: '프로젝트',
		contribution: 60,
		activity_url: 'https://www.sub.com',
	},
	{
		activity_id: 4,
		activity_name: '브랜딩',
		activity_period: '2024.09-2024.12',
		role: '아이디어',
		activity_type: '공모전',
		contribution: 30,
		activity_url: 'https://www.sub.com',
	},
	{
		activity_id: 5,
		activity_name: '공모전',
		activity_period: '2024.09-2024.12',
		role: '아이디어',
		activity_type: '공모전',
		contribution: 80,
		activity_url: 'https://www.sub.com',
	},
	{
		activity_id: 6,
		activity_name: '서포터즈',
		activity_period: '2024.09-2024.12',
		role: 'SNS',
		activity_type: '대외활동',
		contribution: 50,
		activity_url: 'https://www.sub.com',
	},
	{
		activity_id: 7,
		activity_name: '대외활동',
		activity_period: '2024.09-2024.12',
		role: '아이디어',
		activity_type: '대외활동',
		contribution: 80,
		activity_url: 'https://www.sub.com',
	},
	{
		activity_id: 8,
		activity_name: '집가고싶다이미집이지만더강력하게집에가고싶다',
		activity_period: '2024.09-2024.12',
		role: '아이디어',
		activity_type: '여분통',
		contribution: 80,
		activity_url: 'https://www.sub.com',
	},
];

const categoryMap = {
	extracurricular: '대외활동',
	service: '봉사활동',
	project: '프로젝트',
	contest: '공모전',
	club: '동아리',
	extra: '여분통',
};

const ActivityRecord = () => {
	const location = useLocation();
	const nav = useNavigate();
	const ref = useRef(9);

	const currentCategory = location.pathname.split('/').pop();
	const categoryName = categoryMap[currentCategory];

	// 카테고리별 내용 필터링
	const filteredActivities = activityData.filter(
		(item) => item.activity_type === categoryName
	);

	// 기본 카테고리 메뉴 스타일
	const categoryBarMenuClass =
		'flex-1 content-center bg-navy-lightSide cursor-pointer hover:bg-gray-lightSide hover:rounded-[10px]';
	// 현재 위치한 카테고리 메뉴 스타일
	const selectCategoryClass = 'flex-1 content-center bg-navy-dark rounded-[10px] cursor-pointer text-white';

	// 현재 페이지에 해당하는 메뉴바의 색상 유지
	const isActive = (path) => (location.pathname === path ? selectCategoryClass : categoryBarMenuClass);

	return (
		<div className="activity-container flex-col flex-grow">
			<div className="category-bar bg-navy-lightSide flex h-[50px] mx-[70px] mt-[40px] rounded-[10px] cursor-pointer">
				<div
					onClick={() => nav('/user/growth/activity/category/extracurricular')}
					className={`${isActive('/user/growth/activity/category/extracurricular')} rounded-l-[10px]`}
				>
					대외활동
				</div>
				<div
					onClick={() => nav('/user/growth/activity/category/service')}
					className={`${isActive('/user/growth/activity/category/service')}`}
				>
					봉사활동
				</div>
				<div
					onClick={() => nav('/user/growth/activity/category/project')}
					className={`${isActive('/user/growth/activity/category/project')}`}
				>
					프로젝트
				</div>
				<div
					onClick={() => nav('/user/growth/activity/category/contest')}
					className={`${isActive('/user/growth/activity/category/contest')}`}
				>
					공모전
				</div>
				<div onClick={() => nav('/user/growth/activity/category/club')} className={`${isActive('/user/growth/activity/club')}`}>
					동아리
				</div>
				<div
					onClick={() => nav('/user/growth/activity/category/extra')}
					className={`${isActive('/user/growth/activity/extra')} rounded-r-[10px]`}
				>
					여분통
				</div>
			</div>
			<div className="plus-container h-[40px] mx-[70px] content-end z-10">
				<div className="plus-button w-[115px] flex gap-1 cursor-pointer" onClick={()=>nav(`/user/growth/activity/new/${ref.current}`)}>
					<PlusCircleIcon className="w-[24px] h-[24px] text-navy-dark" />
					활동 추가하기
				</div>
			</div>
			<div className="activity-record-content h-[30%] mx-[70px] mt-[-10px] grid grid-cols-2 gap-x-[2%] gap-y-[3%]">
				{filteredActivities.map((item) => {
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
