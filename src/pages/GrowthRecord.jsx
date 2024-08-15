import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import GrowthApplyItem from '../components/GrowthApplyItem';
import UseCalendar from '../components/UseCalendar';
import { getDDay } from '../utils/getDDay';
import ActivityCategory from '../components/ActivityCategory';
import { activityInfo } from '../utils/activity-info';

const GrowthRecord = () => {
	const nav = useNavigate();
  const [applyData, setApplyData] = useState([]);

	// 서버로부터 데이터 GET
	useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://5ecc59c9-4083-4c5b-9271-8a9fca225f08.mock.pstmn.io/api/job-posts/');
        if (response.data && response.data.status === 'success') {
          const fetchedData = response.data.data;
          
          // 타임스탬프를 Date 객체로 변환
          const formattedData = fetchedData.map(company => {
            return {
              ...company,
              jobApplications: company.jobApplications.map(application => ({
                ...application,
                endDate: new Date(application.endDate) // 타임스탬프를 Date 객체로 변환
              }))
            };
          });

          setApplyData(formattedData); // 변환된 데이터를 상태에 저장
        }
      } catch (error) {
        console.error('Error fetching apply data:', error);
      }
    };

    fetchData();
  }, []);

  // 서류와 면접 데이터 합치기
  const combinedData = applyData.map((company, index) => {
    const submitDocument = company.jobApplications.find(app => app.applicationType === 'DOCUMENT');
    const submitInterview = company.jobApplications.find(app => app.applicationType === 'INTERVIEW');

    return {
      index,
      companyName: company.companyName,
      jobPart: company.jobPart,
      submitDocument: submitDocument ? submitDocument.status === 'PASSED' : false,
      submitInterview: submitInterview ? submitInterview.status === 'PASSED' : false,
      deadline: Math.min(
        submitDocument?.endDate.getTime() || Infinity,  // getTime()을 사용하여 비교
        submitInterview?.endDate.getTime() || Infinity  // getTime()을 사용하여 비교
      )
    };
  }).filter(application => getDDay(application.deadline) >= 0) // 마감일이 지나지 않은 것만 필터링
    .sort((a, b) => getDDay(a.deadline) - getDDay(b.deadline))
    .slice(0, 9); // 가장 짧은 6개만 노출

	// 원본 데이터에 인덱스를 부여하여 관리
	const [dataWithIndex, setDataWithIndex] = useState(() => {
		return applyData.map((item, index) => ({
			...item,
			index
		}));
	});

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
							<UseCalendar applicationData={combinedData} />
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