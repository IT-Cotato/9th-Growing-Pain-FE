import React, { useState } from 'react';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import InputField from './InputField';
import MemoField from './MemoField';

const EditApply = ({key, jobPostData, applicationData, applicaionDetailData}) => {
  console.log(jobPostData, applicationData, applicaionDetailData)
  console.log(jobPostData.company_name)

  return (
    <div>
      <div className='mx-[70px] mt-[50px]'>
        <div className='header-container'>
            <div className="header h-[62px] flex">
              <div className="header-content flex-col">
                <div className="font-medium text-[22px] text-left mb-[5px]">{jobPostData.company_name}</div>
                <div className="font-medium text-[16px]">{jobPostData.job_part}</div>
              </div>
          </div>
        </div>
        <div className='content-container h-[894px] mt-[24px] mb-[50px] flex flex-col'>
          <div className='select-type flex h-[56px] bg-navy-lightSide rounded-tl-[10px]'>
            <div className='type-container flex flex-1 items-center justify-center'>
              <div className=''>서류</div>
            </div>
            <div className='plus-button-container flex w-[13%]'>
              <div className='plus-button flex w-full gap-2 justify-center items-center cursor-pointer bg-navy-interviewBtn rounded-tr-[10px]'>
                <PlusCircleIcon className="w-[24px] h-[24px] text-navy-dark text-center" />
                면접 추가
              </div>
            </div>
          </div>
          <div className='apply-content h-[744px] flex flex-1 bg-navy-lightSide'>
            <div className='left-content-container flex-1 flex-col ml-[50px] mb-[50px] mt-[44px]'>
              <div className='title flex-1'>
                <InputField place={'applyTitle'} placeholderText={applicaionDetailData[0].title} />
              </div>
              <div className='answer flex mt-[27px]'>
                <div className='answer-content flex-1'>
                  <MemoField type={'applyRecordA'} />
                </div>
                <div className='sidebar w-[3%] bg-slate-500'></div>
              </div>
            </div>
            <div className='right-content-container w-1/6 ml-[24px] mt-[118px] mr-[33px] mb-[50px] bg-slate-500'></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditApply;
