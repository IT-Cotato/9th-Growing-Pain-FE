import { GrowthStateContext } from '../App';
import { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import ApplyRecordItem from '../components/ApplyRecordItem';

const ApplyRecord = () => {
  const [memberData, jobPostData, applicationData, applicaionDetailData] = useContext(GrowthStateContext);   // 지원현황 데이터 불러오기
  const ref = useRef(0);
  const nav = useNavigate();

  // 지원 현황 데이터를 마감일이 짧게 남은 순서대로 정렬
  const sortedApplicationData = [...applicationData].sort((a, b) => {
    return a.job_post_dead_line - b.job_post_dead_line;
  })

  return (
    <div className='flex-col w-[1492px] mx-[70px]'>
      <div className='detail-header flex justify-between items-end h-[88px] pb-[20px]'>
        <div className='detail-header-title font-medium text-[18px]'>지원현황</div>
        <div onClick={()=>nav("/user/growth/apply/record")} className='detail-header-button cursor-pointer flex gap-1 bg-navy-lightSide w-[138px] h-[40px] px-[24px] py-[8px] rounded-[10px]'>
          <PlusCircleIcon className="w-[24px] h-[24px] text-navy-dark" />
          추가하기
        </div>
      </div>
      <div className='detail-category flex h-[61px] pt-[20px] pb-[21px] text-[17px] border-t-2 border-b'>
        <div className='w-[45px] h-[20px] ml-[67px]'>기업명</div>
        <div className='w-[45px] h-[20px] ml-[377px]'>직무명</div>
        <div className='w-[45px] h-[20px] ml-[466px]'>마감일</div>
        <div className='w-[97px] h-[20px] ml-[114px]'>서류 제출 여부</div>
        <div className='w-[97px] h-[20px] ml-[84px]'>면접 제출 여부</div>
      </div>
      <div className='detail-item-container h-[931px] mt-[13px] flex-col'>
        {sortedApplicationData.map((application)=>{
          const jobPost = jobPostData.find(post => post.job_post_id === application.job_post_id);

          if (!jobPost) {
            return null; // 공고 데이터를 찾을 수 없는 경우 렌더링하지 않음
          }

          // 아이템 순회하면서 렌더링
          return (
            <ApplyRecordItem
              key={ref.current++}
              id={application.job_post_id}
              company={jobPost.company_name}
              position={jobPost.job_part}
              submitDocument={application.application_type === 'DOCUMENT' ? application.submission_status : undefined}
              submitInterview={application.application_type === 'INTERVIEW' ? application.submission_status : undefined}
              deadline={application.job_post_dead_line}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ApplyRecord;