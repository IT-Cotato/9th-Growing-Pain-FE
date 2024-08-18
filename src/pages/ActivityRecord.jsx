import { useLocation, useNavigate } from 'react-router-dom';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import ActivityItem from '../components/ActivityItem';
import { useRef, useEffect, useState } from 'react';
import instance from '../api/instance';

// const activityData = [
// 	{
// 		activity_id: 0,
// 		activity_name: '청소년 봉사활동',
// 		activity_period: '2024.09-2024.10',
// 		role: '국어 과목 과외',
// 		activity_type: '봉사활동',
// 		contribution: 50,
// 		activity_url: 'https://www.edu.com',
// 	},
// 	{
// 		activity_id: 1,
// 		activity_name: '지하철 봉사활동',
// 		activity_period: '2024.09-2024.12',
// 		role: '어른신 돕기',
// 		activity_type: '봉사활동',
// 		contribution: 70,
// 		activity_url: 'https://www.sub.com',
// 	},
// 	{
// 		activity_id: 2,
// 		activity_name: '지하철 봉사활동',
// 		activity_period: '2024.09-2024.12',
// 		role: '어른신 돕기',
// 		activity_type: '봉사활동',
// 		contribution: 100,
// 		activity_url: 'https://www.sub.com',
// 	},
// 	{
// 		activity_id: 3,
// 		activity_name: '취준기록프로젝트',
// 		activity_period: '2024.09-2024.12',
// 		role: '프론트엔드',
// 		activity_type: '프로젝트',
// 		contribution: 60,
// 		activity_url: 'https://www.sub.com',
// 	},
// 	{
// 		activity_id: 4,
// 		activity_name: '브랜딩',
// 		activity_period: '2024.09-2024.12',
// 		role: '아이디어',
// 		activity_type: '공모전',
// 		contribution: 30,
// 		activity_url: 'https://www.sub.com',
// 	},
// 	{
// 		activity_id: 5,
// 		activity_name: '공모전',
// 		activity_period: '2024.09-2024.12',
// 		role: '아이디어',
// 		activity_type: '공모전',
// 		contribution: 80,
// 		activity_url: 'https://www.sub.com',
// 	},
// 	{
// 		activity_id: 6,
// 		activity_name: '서포터즈',
// 		activity_period: '2024.09-2024.12',
// 		role: 'SNS',
// 		activity_type: '대외활동',
// 		contribution: 50,
// 		activity_url: 'https://www.sub.com',
// 	},
// 	{
// 		activity_id: 7,
// 		activity_name: '대외활동',
// 		activity_period: '2024.09-2024.12',
// 		role: '아이디어',
// 		activity_type: '대외활동',
// 		contribution: 80,
// 		activity_url: 'https://www.sub.com',
// 	},
// 	{
// 		activity_id: 8,
// 		activity_name: '집가고싶다이미집이지만더강력하게집에가고싶다',
// 		activity_period: '2024.09-2024.12',
// 		role: '아이디어',
// 		activity_type: '여분통',
// 		contribution: 80,
// 		activity_url: 'https://www.sub.com',
// 	},
// ];

const categoryMap = {
	extracurricular: 'EXTRA_ACTIVITY',
	service: 'SERVICE_ACTIVITY',
	project: 'PROJECT_ACTIVITY',
	contest: 'CONTEST_ACTIVITY',
	club: 'CLUB_ACTIVITY',
	extra: 'EXTRA_ACTIVITY',
};

const ActivityRecord = () => {
	const [activityData, setActivityData] = useState([]);
	const location = useLocation();
	const nav = useNavigate();

	const currentCategory = location.pathname.split('/').pop();

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
  }, []);

	// 데이터 DELETE
	const handleDelete = async (deletedData) => {
		alert('삭제하시겠습니까?');
		// console.log('저장할 데이터:', deletedData);
		// const deletedId = deletedData.id;

		// try {
		// 	const response = await instance.delete(`/api/activity-logs/${deletedId}`, deletedData);
		// 	console.log('서버 응답:', response.data);
		// } catch (error) {
		// 	console.error('에러 발생:', error);
		// }
	};

	// 카테고리별 내용 필터링
	const filteredActivities = activityData.filter(
		(item) => item.activityCategory === currentCategory
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
			<div className="activity-record-content h-[3zzz0%] mx-[70px] mt-[-10px] grid grid-cols-2 gap-x-[2%] gap-y-[3%]">
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
							onDelete={handleDelete}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default ActivityRecord;
