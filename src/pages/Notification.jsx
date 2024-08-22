import { useState, useEffect } from 'react';
import NotificationItem from '../components/NotificationItem';
import 프사 from '../assets/images/logo.png';
import instance from '../api/instance';

const applies = [
	{
		job_post_id: 0,
		job_application_id: 1,
		company_name: '토스',
		application_type: "DOCUMENT",
		job_post_dead_line: new Date('2024-08-09').getTime(),
	},
	{
		job_post_id: 0,
		job_application_id: 2,
		company_name: '토스',
		application_type: "INTERVIEW",
		job_post_dead_line: new Date('2024-08-17').getTime(),
	},
	{
		job_post_id: 1,
		job_application_id: 3,
		company_name: '네이버',
		application_type: "INTERVIEW",
		job_post_dead_line: new Date('2024-08-10').getTime(),
	},
	{
		job_post_id: 2,
		job_application_id: 4,
		company_name: '카카오',
		application_type: "INTERVIEW",
		job_post_dead_line: new Date('2024-08-10').getTime(),
	},
	{
		job_post_id: 3,
		job_application_id: 5,
		company_name: '당근',
		application_type: "DOCUMENT",
		job_post_dead_line: new Date('2024-08-14').getTime(),
	},
]

const filterApplies = (applies) => {
	const now = Date.now();
	const notifications = applies.reduce((acc, apply) => {
		const daysLeft = Math.ceil((apply.job_post_dead_line - now) / (1000 * 60 * 60 * 24)) - 1;
		if ([7, 3, 1].includes(daysLeft)) {
			acc.push({
				id: apply.job_application_id,
				job_application_id: apply.job_application_id,
				job_post_id: apply.job_post_id,
				content: `등록하신 ${apply.company_name} ${apply.application_type === 'DOCUMENT' ? '서류' : '면접'} 마감 ${daysLeft}일 전이에요!`,
			});
		}
		return acc;
	}, []);
	return notifications;
};

const Notification = () => {
	const [applyNotifications, setApplyNotifications] = useState([]);
	const [repliesData, setRepliesData] = useState([]);

	// 서버로부터 데이터 GET
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get('/api/comment/member');
        if (response.data && response.data.status === 'success') {
          console.log('댓글 알림 GET 성공: ', response.data.data.commentList);
          // 받아온 데이터를 replies에 저장하고 시간순으로 정렬
          const sortedReplies = response.data.data.commentList.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setRepliesData(sortedReplies);
        }
      } catch (error) {
        console.error('댓글 알림 GET 실패: ', error);
      }
    };

    fetchData();
  }, []);

	useEffect(() => {
		const initialNotifications = filterApplies(applies);
		setApplyNotifications(initialNotifications);
	}, []);

	// repliesData가 null일 때 로딩 스피너나 대체 UI를 표시할 수 있음
  if (!repliesData) {
    return <div>Loading...</div>;  // 데이터를 불러오는 동안 표시될 내용
  }

	return (
		<div className='notification-page mx-[50px] my-[35px] h-[90%]'>
			<div className='notification-container flex gap-[25px] h-[100%]'>
				<div className='community-notification w-[50%] h-[100%] flex flex-col'>
					<p className='text-[19px] font-medium text-left text-navy-dark mb-[17px]'>커뮤니티 알림</p>
					<div className='notification-content bg-white flex-1 rounded-[10px] p-[30px]'>
						{repliesData.map(reply => (
							reply && (
								<NotificationItem
									key={reply.commentId}
									id={reply.postId}
									profile={프사}
									nickname={reply.memberNickname}
									time={reply.createdAt}
									content={reply.content}
									type='community'
								/>
							)
						))}
					</div>
				</div>
				<div className='apply-notification w-[50%] h-[100%] flex flex-col'>
					<p className='text-[19px] font-medium text-left text-navy-dark mb-[17px]'>성장 기록 알림</p>
					<div className='notification-content bg-white flex-1 rounded-[10px] p-[30px]'>
						{applyNotifications.map(apply => (
              <NotificationItem
								key={apply.job_application_id+'a'}
								id={apply.job_post_id}
                content={apply.content}
                type='apply'
              />
            ))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Notification;
