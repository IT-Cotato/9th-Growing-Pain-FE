import { useState, useEffect } from 'react';
import NotificationItem from '../components/NotificationItem';
import 프사 from '/images/공모전.png';

const replies = [
	{
		post_id: 1,
		id: 1,
		userProfile: 프사,
		nickname: '김현중',
		position: 'Designer',
		createdTime: new Date('2024-08-01 10:23:34'),
		content: '이번에 이직 성공한 회사 동료도 고졸인데 연봉 6천받고 쿠팡 lv4로 이직',
		heart: 3,
	},
	{
		post_id: 1,
		id: 2,
		userProfile: 프사,
		nickname: '조은솔',
		position: 'Manager',
		createdTime: new Date('2024-08-02 13:23:34'),
		content:
			'오래된 얘기지만, 저도 학점이 낮은데요. 휴학도 1년씩 두번하고요. ‘학점이 왜 이렇게 낮아요?’ 라고 면접관이 물어보길래 ‘원없이 놀아봤습니다.’ 라고 했습니다.',
		heart: 2,
	},
	{
		post_id: 1,
		id: 3,
		userProfile: 프사,
		nickname: '김수윤',
		position: 'Manager',
		createdTime: new Date('2024-08-03 10:23:34'),
		content:
			'직종마다 다르기는 하지만 그래도 평균 3점대 이상이라면 완전 나쁜 점수는 아닙니다. 물론 높은 편도 아니지만... 이것 때문에 취업이 불가능한 정도는 아니니까요. 일단 다른 스펙들을 최대한 채우고 사실대로 대학교 때에는 그리 공부에 집중하지 않았다고 대답하는 정도면 되지 않을까요?',
		heart: 2,
	},
];

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

	useEffect(() => {
		const initialNotifications = filterApplies(applies);
		setApplyNotifications(initialNotifications);
	}, []);

	return (
		<div className='notification-page mx-[50px] my-[35px] h-[90%]'>
			<div className='notification-container flex gap-[25px] h-[100%]'>
				<div className='community-notification w-[50%] h-[100%] flex flex-col'>
					<p className='text-[19px] font-medium text-left text-navy-dark mb-[17px]'>커뮤니티 알림</p>
					<div className='notification-content bg-white flex-1 rounded-[10px] p-[30px]'>
						{replies.map(reply => (
							<NotificationItem
								key={reply.id+'c'}
								id={reply.post_id}
								profile={reply.userProfile}
								nickname={reply.nickname}
								time={reply.createdTime}
								content={reply.content}
								type='community'
							/>
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
