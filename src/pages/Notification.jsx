import 프사 from '/images/공모전.png';

const replies = [
	{
		id: 2,
		userProfile: 프사,
		nickname: '김현중',
		position: 'Designer',
		createdTime: '1 hour ago',
		content: '이번에 이직 성공한 회사 동료도 고졸인데 연봉 6천받고 쿠팡 lv4로 이직',
		heart: 3,
	},
	{
		id: 3,
		userProfile: 프사,
		nickname: '조은솔',
		position: 'Manager',
		createdTime: '30 minutes ago',
		content:
			'오래된 얘기지만, 저도 학점이 낮은데요. 휴학도 1년씩 두번하고요. ‘학점이 왜 이렇게 낮아요?’ 라고 면접관이 물어보길래 ‘원없이 놀아봤습니다.’ 라고 했습니다.',
		heart: 2,
	},
	{
		id: 6,
		userProfile: 프사,
		nickname: '김수윤',
		position: 'Manager',
		createdTime: '30 minutes ago',
		content:
			'직종마다 다르기는 하지만 그래도 평균 3점대 이상이라면 완전 나쁜 점수는 아닙니다. 물론 높은 편도 아니지만... 이것 때문에 취업이 불가능한 정도는 아니니까요. 일단 다른 스펙들을 최대한 채우고 사실대로 대학교 때에는 그리 공부에 집중하지 않았다고 대답하는 정도면 되지 않을까요?',
		heart: 2,
	},
];

const applies = [
	{
		job_post_id: 0,
		application_type: "DOCUMENT",
		job_post_dead_line: new Date('2024-09-17').getTime(),
	},
	{
		job_post_id: 0,
		application_type: "DOCUMENT",
		job_post_dead_line: new Date('2024-09-17').getTime(),
	},
	{
		job_post_id: 0,
		application_type: "DOCUMENT",
		job_post_dead_line: new Date('2024-09-17').getTime(),
	},
	{
		job_post_id: 0,
		application_type: "DOCUMENT",
		job_post_dead_line: new Date('2024-09-17').getTime(),
	},
	{
		job_post_id: 0,
		application_type: "DOCUMENT",
		job_post_dead_line: new Date('2024-09-17').getTime(),
	},
]

const Notification = () => {
	return <div>Notification 페이지입니다</div>;
};

export default Notification;
