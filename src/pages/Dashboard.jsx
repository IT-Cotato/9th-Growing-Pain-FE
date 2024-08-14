import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Sidebar from '../components/Sidebar';
import GrowthApplyItem from '../components/GrowthApplyItem';
import UseCalendar from '../components/UseCalendar';
import DashToday from '../components/DashToday';
import InputField from '../components/InputField';
import Button from '../components/Button';

import { getDDay } from '../utils/getDDay';
import { todayTalk } from '../utils/today-talk';

// 새로운 데이터 형식
// const applyData = [
//   {
// 		"companyName": "토스",
// 		"jobPart": "프론트엔드",
// 		"jobApplications": [
// 				{
// 						"applicationType": "DOCUMENT",
// 						"status": "PENDING",
// 						"endDate": new Date('2024-08-27').getTime()
// 				},
// 				{
// 						"applicationType": "INTERVIEW",
// 						"status": "PENDING",
// 						"endDate": new Date('2024-08-30').getTime()
// 				}
// 		]
// 	},
//   {
// 		"companyName": "네이버",
// 		"jobPart": "AE",
// 		"jobApplications": [
// 				{
// 						"applicationType": "DOCUMENT",
// 						"status": "PASSED",
// 						"endDate": new Date('2024-09-19').getTime()
// 				},
// 				{
// 						"applicationType": "INTERVIEW",
// 						"status": "PASSED",
// 						"endDate": new Date('2024-09-19').getTime()
// 				}
// 		]
//   },
//   {
// 		"companyName": "카카오",
// 		"jobPart": "PM",
// 		"jobApplications": [
// 				{
// 						"applicationType": "INTERVIEW",
// 						"status": "FAILED",
// 						"endDate": new Date('2024-08-17').getTime()
// 				}
// 		]
//   },
//   {
// 		"companyName": "당근",
// 		"jobPart": "UI/UX 디자이너",
// 		"jobApplications": [
// 				{
// 						"applicationType": "INTERVIEW",
// 						"status": "PASSED",
// 						"endDate": new Date('2024-08-15').getTime()
// 				}
// 		]
//   },
//   {
// 		"companyName": "라인",
// 		"jobPart": "프론트엔드",
// 		"jobApplications": [
// 				{
// 						"applicationType": "DOCUMENT",
// 						"status": "PENDING",
// 						"endDate": new Date('2024-08-17').getTime()
// 				}
// 		]
//   },
//   {
// 		"companyName": "기업은행",
// 		"jobPart": "AE",
// 		"jobApplications": [
// 				{
// 						"applicationType": "DOCUMENT",
// 						"status": "PASSED",
// 						"endDate": new Date('2024-08-14').getTime()
// 				}
// 		]
//   },
//   {
// 		"companyName": "배민",
// 		"jobPart": "백엔드",
// 		"jobApplications": [
// 				{
// 						"applicationType": "DOCUMENT",
// 						"status": "PASSED",
// 						"endDate": new Date('2024-08-20').getTime()
// 				}
// 		]
//   },
//   {
// 		"companyName": "쿠팡",
// 		"jobPart": "프론트엔드",
// 		"jobApplications": [
// 				{
// 						"applicationType": "DOCUMENT",
// 						"status": "PASSED",
// 						"endDate": new Date('2024-08-10').getTime()
// 				}
// 		]
//   },
//   {
// 		"companyName": "Google",
// 		"jobPart": "PM",
// 		"jobApplications": [
// 				{
// 						"applicationType": "INTERVIEW",
// 						"status": "PASSED",
// 						"endDate": new Date('2024-08-10').getTime()
// 				}
// 		]
//   }
// ];

// 대쉬보드만 Layout 따로 적용 (라우팅 중첩 해결)
const Dashboard = () => {
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
        submitDocument?.endDate || Infinity,  // getTime()을 사용하여 비교
        submitInterview?.endDate || Infinity  // getTime()을 사용하여 비교
      )
    };
  }).filter(application => getDDay(application.deadline) >= 0) // 마감일이 지나지 않은 것만 필터링
    .sort((a, b) => getDDay(a.deadline) - getDDay(b.deadline))
    .slice(0, 6); // 가장 짧은 6개만 노출

  // 랜덤으로 5개의 다짐을 선택하는 함수
  const getRandomTalks = () => {
    const shuffled = [...todayTalk].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 5);
  };

  // 오늘의 다짐 state
  const [randomTalks, setRandomTalks] = useState(getRandomTalks());
  const [fadeClass, setFadeClass] = useState('fade-in');

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeClass('animate-pulse'); // 애니메이션 클래스 적용
      setTimeout(() => {
        setRandomTalks(getRandomTalks());
        setFadeClass('');
      }, 1000); // 애니메이션이 끝날 시간 (1초)
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="layout flex min-h-screen bg-gray-background">
      <div className="flex min-h-screen w-2/7">
        <Sidebar />
      </div>
      <div className="dashboard-container flex flex-col h-full">
        <div className='content-container flex justify-between h-full mx-[70px] mb-[40px]'>
          <div className="left-container w-[75%] pr-[40px] flex-column mt-[42px] h-full">
            <div className='banner-container h-[17%] mb-[1%]'>
              <img src="/images/대쉬보드_배너.png" className="activity-image rounded-t-[10px]" />
            </div>
            <div className="title-bar h-[21px] mb-[26px] mt-[2%] text-[18px] flex justify-between font-medium">
              지원현황
            </div>
            <div className="application-item mx-1/12 h-[300px] flex gap-[3%] gap-y-[3%] grow flex-wrap place-content-start">
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
            <div className='community-noti-container h-[320px] mt-[2%] flex gap-[2%]'>
              <div className='content w-[49%] h-full bg-blue-dashInfo rounded-[10px] box-border shadow-[0px_2px_2px_rgba(0,0,0,0.1)]'>
                <div className='content-area p-[15px] h-full flex-col text-left'>
                  <div className='text h-[60%]'>
                    <div className='text-[16px] font-medium'>커뮤니티 공지</div>
                    <div className='text-[15px] font-semiBold py-[15px]'>{`[커뮤니티 이용 규칙]`}</div>
                    <div className='text-[14px] font-regular'>
                      커뮤니티는 다양한 주제로 여러 사용자가 소통할 수 있는 공간입니다.
                      사용자의 원활한 서비스 이용을 위해 아래의 커뮤니티 이용 기준을 제정하여 운영하고 있습니다.
                    </div>
                  </div>
                  <div className='image h-[40%]' >
                    <img src='/images/커뮤니티_확성기.png' className='h-full' />
                  </div>
                </div>
              </div>
              <div className='content w-[49%] h-full bg-blue-dashCommunity rounded-[10px] box-border shadow-[0px_2px_2px_rgba(0,0,0,0.1)]'>
                <div className='content-area p-[15px] h-full flex-col text-left'>
                  <div className='text-[16px] font-medium'>인기글</div>
                  <div className='text-[18px] font-semiBold py-[15px]'>기계공학인데 제 스펙이 좀 별로인지...</div>
                  <div className='text-[14px] font-regular'>
                    1. 학점 3.69/어학 토스 Ih/일반기계기사 <br />
                    2. 학회 포스터 발표 1회(+2저자 포스터발표1회) <br />
                    3. 공모전 4등(이건 3등까지 수여해서 본선진출에 의의) <br />
                    4. 교내 창업동아리 상(교내라서 좀 글킨해여..)
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='right-container w-[35%] flex-col mt-[30px] h-full'>
            {/* 캘린더 사용 */}
            <div className="calendar-container flex-1 h-[45%] mx-[13px] mt-[10px] content-between">
              <UseCalendar applicationData={combinedData} />
            </div>
            {/* 광고 */}
            <div className='ad-container h-[15%] flex'>
              <div className='activity-image rounded-t-[10px] mb-[0px] content-end'>
                <img src="/images/지원현황_광고.png" />
              </div>
            </div>
            {/* 오늘의 다짐 */}
            <div className='today-container h-[380px] mt-[10%]'>
              <div className='bg-white rounded-[10px] w-full h-full p-[15px] box-border shadow-[0px_2px_2px_rgba(0,0,0,0.1)]'>
                <div className='title-area h-[20%] flex-col text-left'>
                  <p className='text-[16px] font-medium'>오늘의 다짐</p>
                  <p className='text-[14px] font-medium text-navy-dark my-[10px]'>총 200,304명이 오늘의 다짐을 남겼어요!</p>
                </div>
                <div className={`content-area h-[65%] ${fadeClass}`}>
                  {randomTalks.map((talk, index) => (
                    <DashToday key={index} member={talk.member} content={talk.content} last={index === randomTalks.length - 1} />
                  ))}
                </div>
                <div className='input-area flex-1 h-[15%] flex'>
                  <div className='input-area flex flex-1 items-end'>
                    <InputField place={'dashToday'} className={'w-[80%] pr-[10px]'} placeholderText={'오늘의 다짐을 써보세요 (최대 30자)'} />
                    <Button text={'보내기'} type={'dashToday'} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;