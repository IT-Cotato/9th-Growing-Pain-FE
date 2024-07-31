import React, { useEffect, useState } from 'react';
import { PlusCircleIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import InputField from './InputField';
import Toggle from './Toggle';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DatePicker.css'

const EditApply = ({key, jobPostData, applicationData, applicaionDetailData}) => {
  // 지원 기간
  const [applyDate, setApplyDate] = useState(null);

  // 질문과 대답
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState(applicaionDetailData);

  // 서류나 면접
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const currentQStyle = 'bg-white h-[40px] content-center cursor-pointer';
  const otherQstyle = 'bg-gray-300 h-[40px] content-center cursor-pointer';

  const currentPStyle = 'bg-navy-lightSide cursor-pointer rounded-t-[10px]';
  const otherPstyle = 'bg-white cursor-pointer rounded-t-[10px]';

  const addQuestion = () => {
    const newQuestion = {
      job_post_id: jobPostData.job_post_id,
      application_detail_id: currentPageIndex,
      id: questions.length,
      title: '새로운 질문 제목',
      content: '새로운 질문 내용',
    };
    setQuestions([...questions, newQuestion]);
  };

  const removeQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
    if (currentQuestionIndex >= updatedQuestions.length) {
      setCurrentQuestionIndex(updatedQuestions.length - 1);
    }
  };

  const addPage = () => {
    const newPage = {
      job_post_id: jobPostData.job_post_id,
      application_detail_id: applicationData.length,
      id: questions.length,
      title: '새로운 면접 제목',
      content: '새로운 면접 내용',
    };
    setQuestions([...questions, newPage]);
  };

  return (
    <div>
      <div className='mx-[70px] mt-[50px]'>
        <div className='header-container'>
            <div className="header h-[62px] flex">
              <div className="header-content flex-col">
                <div className="font-medium text-[22px] text-left mb-[5px]">{jobPostData.company_name}</div>
                <div className="font-medium text-[16px] text-left pl-[5%]">{jobPostData.job_part}</div>
              </div>
          </div>
        </div>
        <div className='content-container h-[894px] mt-[24px] mb-[50px] flex flex-col'>
          <div className='select-type flex h-[56px] rounded-tl-[10px]'>
              {applicationData.map((app, index) => (
                <div key={index} className='type-container flex flex-1 items-center justify-center'>
                  <div className={`w-[100%] h-[100%] content-center ${currentPageIndex === index ? currentPStyle : otherPstyle}`} onClick={() => setCurrentPageIndex(index)}>
                    {app.application_type === 'DOCUMENT' ? '서류' : '면접'}
                  </div>
                </div>
              ))}
            <div className='plus-button-container bg-navy-lightSide flex w-[13%]'>
              <div className='plus-button flex w-full gap-2 justify-center items-center cursor-pointer bg-navy-interviewBtn rounded-tr-[10px]'>
                <PlusCircleIcon className="w-[24px] h-[24px] text-navy-dark text-center" />
                면접 추가
              </div>
            </div>
          </div>
          <div className='apply-content h-[744px] flex flex-1 bg-navy-lightSide'>
            <div className='left-content-container flex-1 flex-col ml-[50px] mb-[50px] mt-[44px]'>
              <div className='title flex-1'>
                <InputField place={'applyTitle'} placeholderText="제목을 입력하세요" value={questions[currentQuestionIndex]?.title || ''} />
              </div>
              <div className='answer flex mt-[20px] h-[90%]'>
                <div className='answer-content flex-1 p-[40px] bg-white rounded-[10px] rounded-tr-[0px]'>
                  <textarea 
                    placeholder="내용을 입력하세요"
                    className='w-full h-full border border-white bg-white text-[18px] rounded-[0px] font-medium leading-[21.48px]'>
                      {questions[currentQuestionIndex]?.content || ''}
                  </textarea>
                </div>
                <div className='sidebar w-[3%] h-full'>
                  <div className='flex flex-col'>
                    {questions.map((question, index) => (
                      <div
                        key={index}
                        className={`Q${index + 1}-button ${currentQuestionIndex === index ? currentQStyle : otherQstyle} ${index === 0 ? 'rounded-tr-[10px]' : ''}`}
                        onClick={() => setCurrentQuestionIndex(index)}
                      >
                        {index + 1}
                      </div>
                    ))}
                    <div onClick={addQuestion} className='plus-button bg-navy-applyPlusButton h-[40px] content-center cursor-pointer'>+</div>
                    <div onClick={() => removeQuestion(currentQuestionIndex)} className='minus-button bg-navy-applyMinusButton h-[40px] rounded-br-[10px] content-center cursor-pointer'>-</div>
                  </div>
                </div>
              </div>
            </div>
            <div className='right-content-container w-1/6 ml-[24px] mt-[118px] mr-[33px] mb-[50px]'>
              <div className='w-[100%] flex flex-col items-start'>
                <div className='period w-[100%] flex flex-col items-start mb-[44px] z-30'>
                  <p className='font-medium text-[18px] mb-[10px]'>지원기간</p>
                  <div>
                    <DatePicker 
                      className='max-w-[202px] w-[100%] h-[42px] text-center rounded-[10px]'
                      placeholderText='지원기간을 선택하세요.'
                      showPopperArrow={false}
                      selected={applyDate} 
                      onChange={(date) => setApplyDate(date)} />
                  </div>
                </div>
                <div className='submit w-[100%] flex flex-col items-start mb-[44px] z-20'>
                  <p className='font-medium text-[18px] mb-[10px]'>제출여부</p>
                  <Toggle menuItems={["➖", "✔️", "❌"]} bg={'bg-white'} placeholder={'제출 여부 선택'} />
                </div>
                <div className='result w-[100%] flex flex-col items-start mb-[44px] z-10'>
                  <p className='font-medium text-[18px] mb-[10px]'>결과</p>
                  <Toggle menuItems={["➖", "✔️", "❌"]} bg={'bg-white'} placeholder={'결과 선택'} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditApply;
