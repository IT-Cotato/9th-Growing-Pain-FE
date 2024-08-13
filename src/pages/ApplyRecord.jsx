import { GrowthStateContext } from '../App';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import ApplyRecordItem from '../components/ApplyRecordItem';
import { getDDay } from '../utils/getDDay';

// 서버에서 받은 새로운 데이터 형식
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

const ApplyRecord = () => {
  const [memberData] = useContext(GrowthStateContext);
  const nav = useNavigate();

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
      submitDocument: submitDocument ? submitDocument.status === 'PASSED' : false,
      submitInterview: submitInterview ? submitInterview.status === 'PASSED' : false,
      deadline: Math.min(
        submitDocument?.endDate || Infinity,
        submitInterview?.endDate || Infinity
      )
    };
  }).sort((a, b) => getDDay(a.deadline) - getDDay(b.deadline));

  return (
    <div className='flex-col mx-[70px]'>
      <div className='detail-header flex justify-between items-end h-[88px] pb-[20px]'>
        <div className='detail-header-title font-medium text-[18px]'>지원현황</div>
        <div onClick={() => nav("/user/growth/apply/record")} className='detail-header-button cursor-pointer flex gap-1 bg-navy-lightSide w-[138px] h-[40px] px-[24px] py-[8px] rounded-[10px]'>
          <PlusCircleIcon className="w-[24px] h-[24px] text-navy-dark" />
          추가하기
        </div>
      </div>
      <div className='detail-category flex h-[61px] pt-[20px] pb-[21px] gap-[60px] text-[16px] border-t-2 border-b'>
        <div className='w-2/12 h-[20px] ml-[67px] text-left'>기업명</div>
        <div className='w-3/12 h-[20px] ml-[35px] text-left'>직무명</div>
        <div className='w-1/12 h-[20px] mr-[20px]'>마감일</div>
        <div className='w-1/12 h-[20px] mr-[20px]'>서류 제출</div>
        <div className='w-1/12 h-[20px] mr-[20px]'>면접 합격</div>
        <div className="w-1/12 mr-[20px]"></div>
      </div>
      <div className='detail-item-container h-[931px] mt-[13px] flex-col'>
        {combinedData.map((application) => (
          <ApplyRecordItem
            key={application.index}  // 인덱스를 key로 사용
            id={application.index}  // 인덱스를 ID로 사용
            company={application.companyName}
            position={application.jobPart}
            submitDocument={application.submitDocument}
            submitInterview={application.submitInterview}
            deadline={application.deadline}
          />
        ))}
      </div>
    </div>
  );
}

export default ApplyRecord;