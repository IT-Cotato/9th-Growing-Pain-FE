import { GrowthStateContext } from '../App';
import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import ApplyRecordItem from '../components/ApplyRecordItem';
import { getDDay } from '../utils/getDDay';
import instance from '../api/instance';

const ApplyRecord = () => {
  const [memberData] = useContext(GrowthStateContext);
  const [applyData, setApplyData] = useState([]);  // 서버에서 받아올 데이터를 위한 상태 선언
  const nav = useNavigate();

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

  // 새로운 데이터 형식에서 마감일 기준으로 지원현황 정렬
  const combinedData = applyData.map(company => {
    const submitDocument = company.jobApplications.find(app => app.applicationType === 'DOCUMENT');
    const submitInterview = company.jobApplications.find(app => app.applicationType === 'INTERVIEW');

    return {
      id: company.id,
      companyName: company.companyName,
      jobPart: company.jobPart,
      submitDocument: submitDocument ? submitDocument.status : 'PENDING',
      submitInterview: submitInterview ? submitInterview.status : 'PENDING',
      deadline: Math.min(
        new Date(submitDocument?.endDate || '9999-12-31').getTime(),
        new Date(submitInterview?.endDate || '9999-12-31').getTime()
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
      <div className='detail-item-container h-[700px] mt-[13px] flex-col overflow-y-auto scroll-smooth'>
        {combinedData.map((application) => (
          <ApplyRecordItem
            key={application.id}
            id={application.id}
            company={application.companyName}
            position={application.jobPart}
            submitDocument={application.submitDocument}
            submitInterview={application.submitInterview}
            deadline={new Date(application.deadline).toISOString().slice(0, 10)}
          />
        ))}
      </div>
    </div>
  );
}

export default ApplyRecord;
