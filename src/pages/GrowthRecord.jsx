import { useContext } from 'react';
import { GrowthStateContext } from '../App';
import { useNavigate } from 'react-router-dom';

import GrowthApplyItem from '../components/GrowthApplyItem';
import UseCalendar from '../components/UseCalendar';
import { getDDay } from '../utils/getDDay';
import ActivityCategory from '../components/ActivityCategory';
import { activityInfo } from '../utils/activity-info';

const GrowthRecord = () => {
	const nav = useNavigate();
	const [memberData, jobPostData, applicationData, applicaionDetailData, infoData] = useContext(GrowthStateContext); // 지원현황 데이터 불러오기

	// applicationData를 job_post_id를 기준으로 그룹화
	const groupedData = applicationData.reduce((acc, application) => {
		if (!acc[application.job_post_id]) {
			acc[application.job_post_id] = {
				...application,
				submitDocument: undefined,
				submitInterview: undefined,
			};
		}
		if (application.application_type === 'DOCUMENT') {
			acc[application.job_post_id].submitDocument = application.submission_status;
		} else if (application.application_type === 'INTERVIEW') {
			acc[application.job_post_id].submitInterview = application.submission_status;
		}
		return acc;
	}, {});

	// 객체를 배열로 변환 후 마감일이 짧게 남은 순서대로 정렬
	const combinedData = Object.values(groupedData)
		.filter(application => getDDay(application.job_post_dead_line) >= 0) // 마감일이 지나지 않은 것만 필터링
		.sort((a, b) => getDDay(a.job_post_dead_line) - getDDay(b.job_post_dead_line))
		.slice(0, 9); // 가장 짧은 9개만 노출

	return (
		<div className='flex-grow flex flex-col'>
			<div className='mx-[70px]'>
				<div className="top-container flex justify-between h-full">
					<div className="applicaion-list-container w-[75%] pr-[40px] flex-column mt-[42px]">
						<div className="title-bar h-[21px] mb-[26px] text-[18px] flex justify-between font-medium">
							지원현황
						</div>
						<div className="application-item mx-1/12 h-[450px] flex gap-[3%] gap-y-[1%] flex flex-wrap place-content-start">
							{combinedData.map((application) => {
								const jobPost = jobPostData.find((post) => post.job_post_id === application.job_post_id);

								if (!jobPost) {
									return null; // 공고 데이터를 찾을 수 없는 경우 렌더링하지 않음
								}

								// 아이템 순회하면서 렌더링
								return (
									<GrowthApplyItem
										key={application.job_application_id}
										id={application.job_post_id}
										company={jobPost.company_name}
										position={jobPost.job_part}
										deadline={getDDay(application.job_post_dead_line)}
										date={application.job_post_dead_line}
									/>
								);
							})}
						</div>
					</div>
					<div className='w-[35%] flex-col mt-[30px]'>
						{/* 캘린더 사용 */}
						<div className="calendar-container flex-1 h-[55%] mx-[13px] mt-[42px] content-between">
							<UseCalendar />
						</div>
						{/* 광고 */}
						<div className='ad-container h-[25%] flex'>
							<div className='activity-image rounded-t-[10px] mb-[0px] content-end'>
								<img src="/images/지원현황_광고.png" />
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="activity-container h-[350px] ml-[70px] mr-[71px] ">
				<div className="title-bar h-[21px] mb-[26px] text-[18px] flex justify-between font-medium">활동기록</div>
				<div className="activity-item h-[280px] flex gap-[21px]">
					{activityInfo.map((info) => {
						return (
							<ActivityCategory
								key={info.id}
								category={info.category}
								image={info.image}
								content={info.content}
								navLink={info.nav}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default GrowthRecord;
