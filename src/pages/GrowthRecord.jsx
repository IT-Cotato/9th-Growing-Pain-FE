import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import GrowthApplyItem from '../components/GrowthApplyItem';
import UseCalendar from '../components/UseCalendar';
import { getDDay } from '../utils/getDDay';
import ActivityCategory from '../components/ActivityCategory';
import { activityInfo } from '../utils/activity-info';

const applyData = [
  {
		"companyName": "토스",
		"jobPart": "프론트엔드",
		"jobApplications": [
				{
						"applicationType": "DOCUMENT",
						"status": "PENDING",
						"endDate": new Date('2024-08-27').getTime()
				},
				{
						"applicationType": "INTERVIEW",
						"status": "PENDING",
						"endDate": new Date('2024-08-30').getTime()
				}
		]
	},
  {
		"companyName": "네이버",
		"jobPart": "AE",
		"jobApplications": [
				{
						"applicationType": "DOCUMENT",
						"status": "PASSED",
						"endDate": new Date('2024-09-19').getTime()
				},
				{
						"applicationType": "INTERVIEW",
						"status": "PASSED",
						"endDate": new Date('2024-09-19').getTime()
				}
		]
  },
  {
		"companyName": "카카오",
		"jobPart": "PM",
		"jobApplications": [
				{
						"applicationType": "INTERVIEW",
						"status": "FAILED",
						"endDate": new Date('2024-08-17').getTime()
				}
		]
  },
  {
		"companyName": "당근",
		"jobPart": "UI/UX 디자이너",
		"jobApplications": [
				{
						"applicationType": "INTERVIEW",
						"status": "PASSED",
						"endDate": new Date('2024-08-15').getTime()
				}
		]
  },
  {
		"companyName": "라인",
		"jobPart": "프론트엔드",
		"jobApplications": [
				{
						"applicationType": "DOCUMENT",
						"status": "PENDING",
						"endDate": new Date('2024-08-17').getTime()
				}
		]
  },
  {
		"companyName": "기업은행",
		"jobPart": "AE",
		"jobApplications": [
				{
						"applicationType": "DOCUMENT",
						"status": "PASSED",
						"endDate": new Date('2024-08-14').getTime()
				}
		]
  },
  {
		"companyName": "배민",
		"jobPart": "백엔드",
		"jobApplications": [
				{
						"applicationType": "DOCUMENT",
						"status": "PASSED",
						"endDate": new Date('2024-08-20').getTime()
				}
		]
  },
  {
		"companyName": "쿠팡",
		"jobPart": "프론트엔드",
		"jobApplications": [
				{
						"applicationType": "DOCUMENT",
						"status": "PASSED",
						"endDate": new Date('2024-08-10').getTime()
				}
		]
  },
  {
		"companyName": "Google",
		"jobPart": "PM",
		"jobApplications": [
				{
						"applicationType": "INTERVIEW",
						"status": "PASSED",
						"endDate": new Date('2024-08-10').getTime()
				}
		]
  }
];

const GrowthRecord = () => {
	const nav = useNavigate();

	// 원본 데이터에 인덱스를 부여하여 관리
	const [dataWithIndex, setDataWithIndex] = useState(() => {
		return applyData.map((item, index) => ({
			...item,
			index
		}));
	});

	// 마감일 계산 및 정렬
	const combinedData = dataWithIndex.map((company) => {
		const submitDocument = company.jobApplications.find(app => app.applicationType === 'DOCUMENT');
		const submitInterview = company.jobApplications.find(app => app.applicationType === 'INTERVIEW');

		return {
			index: company.index,
			companyName: company.companyName,
			jobPart: company.jobPart,
			submitDocument: submitDocument ? submitDocument.status === 'PASSED' : false,
			submitInterview: submitInterview ? submitInterview.status === 'PASSED' : false,
			deadline: Math.min(
				submitDocument?.endDate || Infinity,
				submitInterview?.endDate || Infinity
			)
		};
	}).filter(application => getDDay(application.deadline) >= 0) // 마감일이 지나지 않은 것만 필터링
		.sort((a, b) => getDDay(a.deadline) - getDDay(b.deadline))
		.slice(0, 9); // 가장 짧은 9개만 노출

	return (
		<div className='flex-grow flex flex-col'>
			<div className='mx-[70px]'>
				<div className="top-container flex justify-between h-full">
					<div className="application-list-container w-[75%] pr-[40px] flex-column mt-[42px]">
						<div className="title-bar h-[21px] mb-[26px] text-[18px] flex justify-between font-medium">
							지원현황
						</div>
						<div className="application-item mx-1/12 h-[450px] flex gap-[3%] gap-y-[1%] flex flex-wrap place-content-start">
							{combinedData.map((application) => (
								<GrowthApplyItem
									key={application.index}  // 인덱스를 key로 사용
									id={application.index}  // 인덱스를 ID로 사용
									company={application.companyName}
									position={application.jobPart}
									deadline={getDDay(application.deadline)}
									date={application.deadline}
								/>
							))}
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
					{activityInfo.map((info) => (
						<ActivityCategory
							key={info.id}
							category={info.category}
							image={info.image}
							content={info.content}
							navLink={info.nav}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default GrowthRecord;