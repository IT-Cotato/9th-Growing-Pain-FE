import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import instance from '../api/instance';

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
        const response = await instance.get('/api/job-posts');
        if (response.data && response.data.status === 'success') {
          console.log(response.data.data);
          setApplyData(response.data.data);  // 받아온 데이터를 applyData 상태에 저장
        }
      } catch (error) {
        console.error('Error fetching apply data:', error);
      }
    };

    fetchData();
  }, []);

	// 데이터에 인덱스 추가
  const dataWithIndex = applyData.map((item, index) => ({
    ...item,
    index
  }));

  // 새로운 데이터 형식에서 마감일 기준으로 지원현황 정렬
  const combinedData = dataWithIndex.map(company => {
    const submitDocument = company.jobApplications.find(app => app.applicationType === 'DOCUMENT');
    const submitInterview = company.jobApplications.find(app => app.applicationType === 'INTERVIEW');

    return {
      index: company.index,  // 인덱스 추가
      companyName: company.companyName,
      jobPart: company.jobPart,
      submitDocument: submitDocument ? submitDocument.status : 'PENDING',
      submitInterview: submitInterview ? submitInterview.status : 'PENDING',
      deadline: Math.min(
        new Date(submitDocument?.endDate || '9999-12-31').getTime(),
        new Date(submitInterview?.endDate || '9999-12-31').getTime()
      )
    };
  }).sort((a, b) => getDDay(a.deadline) - getDDay(b.deadline)).slice(0, 9);

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