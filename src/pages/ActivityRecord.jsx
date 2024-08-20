import { useLocation, useNavigate } from 'react-router-dom';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import ActivityItem from '../components/ActivityItem';
import { useRef, useEffect, useState } from 'react';
import instance from '../api/instance';

const categoryMap = {
	extracurricular: 'EXTRA_ACTIVITY',
	service: 'VOLUNTEER_ACTIVITY',
	project: 'PROJECT',
	contest: 'COMPETITIONS',
	club: 'CLUB',
	extra: 'EXTRA_SPACE',
};

const ActivityRecord = () => {
	const [activityData, setActivityData] = useState([]);
	const location = useLocation();
	const nav = useNavigate();

	const currentCategory = location.pathname.split('/').pop();
	const currentType = categoryMap[currentCategory];

	// 서버로부터 데이터 GET
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get('/api/activity-logs');
        if (response.data && response.data.status === 'success') {
          console.log(response.data.data);
          setActivityData(response.data.data);  // 받아온 데이터를 applyData 상태에 저장
        }
      } catch (error) {
        console.error('Error fetching apply data:', error);
      }
    };

    fetchData();
  }, [currentCategory]);

	// 카테고리별 내용 필터링
	const filteredActivities = activityData.filter(
		(item) => item.activityCategory === currentType
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
				<div onClick={() => nav('/user/growth/activity/category/club')} className={`${isActive('/user/growth/activity/category/club')}`}>
					동아리
				</div>
				<div
					onClick={() => nav('/user/growth/activity/category/extra')}
					className={`${isActive('/user/growth/activity/category/extra')} rounded-r-[10px]`}
				>
					여분통
				</div>
			</div>
			<div className="plus-container h-[40px] mx-[70px] content-end z-10">
				<div className="plus-button w-[115px] flex gap-1 cursor-pointer" onClick={()=>nav(`/user/growth/activity/${currentCategory}/new`)}>
					<PlusCircleIcon className="w-[24px] h-[24px] text-navy-dark" />
					활동 추가하기
				</div>
			</div>
			<div className="activity-record-content h-[30%] mx-[70px] mt-[-10px] grid grid-cols-2 gap-x-[2%] gap-y-[12%]">
				{filteredActivities.map((item) => {
					return (
						<ActivityItem
							key={item.id}
							id={item.id}
							name={item.activityName}
							period={item.activityDuration}
							role={item.role}
							type={item.activityType}
							contribution={item.contribution}
							url={item.url}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default ActivityRecord;
