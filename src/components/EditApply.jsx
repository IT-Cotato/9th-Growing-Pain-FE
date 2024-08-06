import React, { useEffect, useState } from 'react';
import { PlusCircleIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import InputField from './InputField';
import Toggle from './Toggle';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DatePicker.css'
import Button from './Button';

const EditApply = ({ jobPostData = {}, applicationData = [], applicaionDetailData = [], onSave }) => {
  // 지원 기간
  const [applyDate, setApplyDate] = useState(null);

  // 질문과 대답
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState(applicaionDetailData);

  // 서류나 면접
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  // 타입별 페이지
  const [questionsByPage, setQuestionsByPage] = useState([]);

  // 토글 내용
  const [submissionStatus, setSubmissionStatus] = useState('제출 여부 선택');
  const [resultStatus, setResultStatus] = useState('결과 선택');

  const currentQStyle = 'bg-white h-[40px] content-center cursor-pointer';
  const otherQstyle = 'bg-gray-300 h-[40px] content-center cursor-pointer';

  const currentPStyle = 'bg-navy-lightSide cursor-pointer rounded-t-[10px]';
  const otherPstyle = 'bg-white cursor-pointer rounded-t-[10px]';

  useEffect(() => {
    setQuestionsByPage(
      applicationData.map((app, index) => ({
        pageIndex: index,
        questions: applicaionDetailData.filter(detail => detail.application_detail_id === index),
      }))
    );
  }, [applicationData, applicaionDetailData]);

  const addQuestion = () => {
    const newQuestion = {
      job_post_id: jobPostData.job_post_id,
      application_detail_id: currentPageIndex,
      id: questionsByPage[currentPageIndex].questions.length,
      title: '새로운 질문 제목',
      content: '새로운 질문 내용',
    };
    const updatedQuestionsByPage = [...questionsByPage];
    updatedQuestionsByPage[currentPageIndex].questions.push(newQuestion);
    setQuestionsByPage(updatedQuestionsByPage);
  };

  const removeQuestion = (index) => {
    const updatedQuestionsByPage = [...questionsByPage];
    updatedQuestionsByPage[currentPageIndex].questions = updatedQuestionsByPage[currentPageIndex].questions.filter((_, i) => i !== index);
    setQuestionsByPage(updatedQuestionsByPage);
    if (currentQuestionIndex >= updatedQuestionsByPage[currentPageIndex].questions.length) {
      setCurrentQuestionIndex(updatedQuestionsByPage[currentPageIndex].questions.length - 1);
    }
  };

  const addPage = () => {
    const newPage = {
      job_post_id: jobPostData.job_post_id,
      application_detail_id: applicationData.length,
      id: questionsByPage.length,
      title: '새로운 면접 제목',
      content: '새로운 면접 내용',
    };
    setQuestionsByPage([...questionsByPage, { pageIndex: questionsByPage.length, questions: [newPage] }]);
  };

  // 나중에 저장할 코드
  const handleSave = () => {
    const savedData = {
      companyName: jobPostData.company_name,
      jobPart: jobPostData.job_part,
      memberId: jobPostData.member_id,
      jobApplications: applicationData.map((app, index) => ({
        applicationType: app.application_type,
        place: app.place,
        result: app.result,
        submissionStatus: app.submissionStatus,
        applicationStartDate: app.applicationStartDate,
        applicationCloseDate: new Date(applyDate).getTime(),
        memberId: app.memberId,
        jobPostId: jobPostData.job_post_id,
        applicationDetails: questionsByPage[index].questions.map(question => ({
          title: question.title,
          content: question.content,
        })),
      })),
    };
    onSave(savedData);
  };

  const currentQuestions = questionsByPage[currentPageIndex]?.questions || [];

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questionsByPage];
    updatedQuestions[currentPageIndex].questions[index][field] = value;
    setQuestionsByPage(updatedQuestions);
  };

  return (
    <div>
      <div className='mx-[70px] mt-[50px]'>
        <div className='header-container'>
            <div className="header h-[62px] flex">
              <div className="header-content flex-col w-full">
                <div className="font-medium text-[22px] text-left mb-[5px]">{jobPostData.company_name || "회사 이름"}</div>
                <div className="font-medium text-[16px] text-left">{jobPostData.job_part || "직무"}</div>
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
              <div className='plus-button flex w-full gap-2 justify-center items-center cursor-pointer bg-navy-interviewBtn rounded-tr-[10px]' onClick={addPage}>
                <PlusCircleIcon className="w-[24px] h-[24px] text-navy-dark text-center" />
                면접 추가
              </div>
            </div>
          </div>
          <div className='apply-content h-[744px] flex flex-1 bg-navy-lightSide'>
            <div className='left-content-container flex-1 flex-col ml-[50px] mb-[50px] mt-[44px]'>
              <div className='title flex-1'>
                <InputField
                  place={'applyTitle'}
                  placeholderText="제목을 입력하세요"
                  value={currentQuestions[currentQuestionIndex]?.title || ''} 
                  onChange={(e) => handleQuestionChange(currentQuestionIndex, 'title', e.target.value)}
                />
              </div>
              <div className='answer flex mt-[20px] h-[90%]'>
                <div className='answer-content flex-1 p-[40px] bg-white rounded-[10px] rounded-tr-[0px]'>
                  <textarea 
                    placeholder="내용을 입력하세요"
                    className='w-full h-full border border-white bg-white text-[18px] rounded-[0px] font-medium leading-[21.48px] outline-none'
                    value = {currentQuestions[currentQuestionIndex]?.content || ''}
                    
                  />
                </div>
                <div className='sidebar w-[3%] h-full'>
                  <div className='flex flex-col'>
                    {currentQuestions.map((question, index) => (
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
                      className='max-w-[202px] w-[100%] h-[42px] text-center rounded-[10px] outline-none'
                      placeholderText='지원기간을 선택하세요.'
                      showPopperArrow={false}
                      selected={applyDate} 
                      onChange={(date) => setApplyDate(date)} />
                  </div>
                </div>
                <div className='submit w-[100%] flex flex-col items-start mb-[44px] z-20'>
                  <p className='font-medium text-[18px] mb-[10px]'>제출여부</p>
                  <Toggle menuItems={["➖", "✔️", "❌"]} bg={'bg-white'} placeholder={'제출 여부 선택'} onChange={setSubmissionStatus} />
                </div>
                <div className='result w-[100%] flex flex-col items-start mb-[44px] z-10'>
                  <p className='font-medium text-[18px] mb-[10px]'>결과</p>
                  <Toggle menuItems={["➖", "✔️", "❌"]} bg={'bg-white'} placeholder={'결과 선택'} onChange={setResultStatus} />
                </div>
                <div className='save-button w-[100%] mt-[260px] flex justify-start'>
                  <Button type={'applySave'} text={'저장하기'} onClick={handleSave} />
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
