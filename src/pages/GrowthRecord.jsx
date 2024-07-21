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

	// 지원 현황 데이터를 마감일이 짧게 남은 순서대로 정렬
	const sortedApplicationData = [...applicationData]
		.sort((a, b) => {
			return getDDay(a.job_post_dead_line) - getDDay(b.job_post_dead_line);
		})
		.slice(0, 9); // 가장 짧은 6개만 노출

	return (
		<div>
			<div className="top-container flex justify-between ml-[70px] mr-[70px] h-full">
				<div className="applicaion-list-container flex-column mt-[42px]">
					<div className="title-bar h-[21px] mb-[26px] text-[18px] flex justify-between font-medium">
						지원현황
					</div>
					<div className="application-item mx-auto h-[508px] flex gap-[35px] gap-y-[36px] flex flex-wrap place-content-start">
						{sortedApplicationData.map((application) => {
							const jobPost = jobPostData.find((post) => post.job_post_id === application.job_post_id);

							if (!jobPost) {
								return null; // 공고 데이터를 찾을 수 없는 경우 렌더링하지 않음
							}

							// 아이템 순회하면서 렌더링
							return (
								<GrowthApplyItem
									key={application.job_post_id}
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
				<div className='w-[430px] flex-col mt-[42px]'>
					{/* 캘린더 사용 */}
					<div className="calendar-container flex-1 mx-[13px] mt-[42px] content-between">
						<UseCalendar />
					</div>
					{/* 광고 */}
					<div className='ad-container h-[151px]'>
						<img src="/images/지원현황_광고.png" className="activity-image rounded-t-[10px]" />
					</div>
				</div>
			</div>
			<div className="activity-container h-[350px] ml-[70px] mr-[71px] mt-[54px]">
				<div className="title-bar h-[21px] mb-[26px] text-[18px] flex justify-between font-medium">활동기록</div>
				<div className="activity-item h-[340px] flex gap-[21px]">
					{activityInfo.map((info) => {
						return (
							<ActivityCategory
								key={info.key}
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
