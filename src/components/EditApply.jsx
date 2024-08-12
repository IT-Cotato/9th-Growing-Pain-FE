import React, { useEffect, useState, useRef } from 'react';
import { PlusCircleIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import InputField from './InputField';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DatePicker.css';
import Button from './Button';

const EditApply = ({ jobPostData = {}, applicationData = [], onSave }) => {
  // 상태 정의
  const [companyName, setCompanyName] = useState(jobPostData.companyName); // 회사명 상태
  const [jobPart, setJobPart] = useState(jobPostData.jobPart); // 직무 상태
  const [applyDate, setApplyDate] = useState(null); // 지원 기간
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // 질문과 대답
  const [currentPageIndex, setCurrentPageIndex] = useState(0); // 서류나 면접
  const [applicationDataState, setApplicationData] = useState(applicationData); // 초기값으로 `applicationData` 사용
  const [submissionStatus, setSubmissionStatus] = useState('PENDING'); // 토글 내용
  const [resultStatus, setResultStatus] = useState('PENDING'); // 토글 내용
  const [currentSubmissionIcon, setCurrentSubmissionIcon] = useState('➖');
  const [currentResultIcon, setCurrentResultIcon] = useState('➖');
  const [isToggleOpen, setIsToggleOpen] = useState(false); // 페이지 추가 토글
  const [isSubmissionDropdownOpen, setIsSubmissionDropdownOpen] = useState(false); // 제출 여부 드롭다운
  const [isResultDropdownOpen, setIsResultDropdownOpen] = useState(false); // 결과 드롭다운
  const toggleRef = useRef(null); // 토글 참조용
  const submissionRef = useRef(null); // 제출 여부 드롭다운 참조
  const resultRef = useRef(null); // 결과 드롭다운 참조
  const appIdRef = useRef(0);
  const detailIdRef = useRef(0);

  const handleSaveRef = useRef();   // 언마운트시 데이터 실시간 참조를 위한 Ref

  const currentQStyle = 'bg-white h-[40px] content-center cursor-pointer';
  const otherQstyle = 'bg-gray-300 h-[40px] content-center cursor-pointer';
  const currentPStyle = 'bg-navy-lightSide cursor-pointer rounded-tl-[10px]';
  const otherPstyle = 'bg-white cursor-pointer rounded-tl-[10px]';

  // 문서 페이지별 토글 내용 렌더링
  useEffect(() => {
    if (applicationDataState.length > 0) {
      const currentPage = applicationDataState[currentPageIndex];
      setSubmissionStatus(currentPage.submissionStatus || 'PENDING');
      setResultStatus(currentPage.result || 'PENDING');

      // 상태 아이콘 업데이트
      setCurrentSubmissionIcon(getStatusIcon(currentPage?.submissionStatus || 'PENDING'));
      setCurrentResultIcon(getStatusIcon(currentPage?.result || 'PENDING'));

      // applyDate 업데이트
      if (currentPage.applicationCloseDate) {
        setApplyDate(new Date(currentPage.applicationCloseDate));
      } else {
        setApplyDate(null); // null로 초기화
      }
    }
    setCurrentQuestionIndex(0);
  }, [currentPageIndex, applicationDataState]);

  // 토글 핸들러
  const handleToggleClick = () => {
    setIsToggleOpen(prevState => !prevState);
  };

  const handleDropdownClick = (type) => {
    if (type === 'submission') {
      setIsSubmissionDropdownOpen(!isSubmissionDropdownOpen);
    } else if (type === 'result') {
      setIsResultDropdownOpen(!isResultDropdownOpen);
    }
  };

  const handleClickOutside = (event) => {
    if (toggleRef.current && !toggleRef.current.contains(event.target) && !event.target.closest('.plus-button-container')) {
      setIsToggleOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 질문 추가 (+ 버튼 클릭)
  const addQuestion = () => {
    const newQuestion = {
      title: '새로운 질문 제목',
      content: '새로운 질문 내용',
    };
    const updatedApplicationData = [...applicationDataState];
    updatedApplicationData[currentPageIndex].applicationDetails.push(newQuestion);
    setApplicationData(updatedApplicationData);
  };

  // 질문 삭제 (- 버튼 클릭)
  const removeQuestion = (index) => {
    const updatedApplicationData = [...applicationDataState];
    updatedApplicationData[currentPageIndex].applicationDetails = 
      updatedApplicationData[currentPageIndex].applicationDetails.filter((_, i) => i !== index);
    setApplicationData(updatedApplicationData);
    if (currentQuestionIndex >= updatedApplicationData[currentPageIndex].applicationDetails.length) {
      setCurrentQuestionIndex(updatedApplicationData[currentPageIndex].applicationDetails.length - 1);
    }
  };

  // 문서 페이지 추가 (면접 추가 버튼 클릭-문서 타입 선택)
  const handleAddPage = (type) => {
    const newPage = {
      applicationType: type,
      applicationDetails: [{
        title: `새로운 ${type === 'DOCUMENT' ? '서류' : type === 'INTERVIEW' ? '면접' : '피드백'} 제목`,
        content: `새로운 ${type === 'DOCUMENT' ? '서류' : type === 'INTERVIEW' ? '면접' : '피드백'} 내용`,
      }],
      submissionStatus: 'PENDING', // 기본값 추가
      result: 'PENDING', // 기본값 추가
    };

    setApplicationData([...applicationDataState, newPage]);
    setCurrentPageIndex(applicationDataState.length); // 새로 추가한 페이지로 이동
    setIsToggleOpen(false); // 토글 닫기
  };

  // 데이터 저장 (Record-생성, Detail-업데이트)
  const handleSave = () => {
    const savedData = {
      companyName: companyName, // 수정된 회사명
      jobPart: jobPart, // 수정된 직무명
      memberId: jobPostData.memberId,
      jobApplications: applicationDataState.map((app) => ({
        id: appIdRef.current++,
        applicationType: app.applicationType,
        place: app.place,
        result: app.result,
        submissionStatus: app.submissionStatus,
        applicationStartDate: app.applicationStartDate,
        applicationCloseDate: new Date(applyDate).getTime(),
        memberId: jobPostData.memberId,
        jobPostId: jobPostData.jobPostId,
        applicationDetails: app.applicationDetails.map(question => ({
          id: detailIdRef.current++,
          title: question.title,
          content: question.content,
        })),
      })),
    };
    onSave(savedData); // 부모 컴포넌트로 저장된 데이터 전달
  };

  useEffect(() => {
    handleSaveRef.current = handleSave;
  }, [companyName, jobPart, applyDate, currentQuestionIndex, currentPageIndex, applicationDataState, submissionStatus, resultStatus]);

  useEffect(() => {
    // 언마운트시 데이터 저장(저장 버튼과 같은 기능)
    return () => {
      if (handleSaveRef.current) {
        handleSaveRef.current();
      }
    };
  }, [])

  // 현재 보여져야 하는 질문
  const currentQuestions = applicationDataState[currentPageIndex]?.applicationDetails || [];

  // 질문 내용 수정 핸들러
  const handleQuestionChange = (index, field, value) => {
    const updatedApplicationData = [...applicationDataState];
    updatedApplicationData[currentPageIndex].applicationDetails[index][field] = value;
    setApplicationData(updatedApplicationData);
  };

  // 지원기간 수정 핸들러
  const handleApplyDateChange = (date) => {
    const updatedApplicationData = [...applicationDataState];
    updatedApplicationData[currentPageIndex].applicationCloseDate = date ? date.getTime() : null;
    setApplicationData(updatedApplicationData);
    setApplyDate(date); // DatePicker의 선택된 날짜 상태를 업데이트
  };

  // 아이콘 상태에 따른 반환 함수
  const getStatusIcon = (status) => {
    switch (status) {
      case 'PASSED':
        return '✔️';
      case 'FAILED':
        return '❌';
      case 'PENDING':
      default:
        return '➖';
    }
  };

  return (
    <div>
      <div className='mx-[70px] mt-[50px]'>
        <div className='header-container'>
          <div className="header h-[62px] flex">
            <div className="header-content flex-col w-full">
              <InputField
                place={'applyCompany'}
                placeholderText="회사 이름"
                className={'flex'}
                value={companyName} 
                onChange={(e) => setCompanyName(e.target.value)} // 회사명 수정
              />
              <InputField
                place={'applyPart'}
                placeholderText="직무"
                className={'flex'}
                value={jobPart} 
                onChange={(e) => setJobPart(e.target.value)} // 직무명 수정
              />
            </div>
          </div>
        </div>
        <div className='content-container h-[894px] mt-[24px] mb-[50px] flex flex-col'>
          <div className='select-type flex h-[56px] rounded-tl-[10px]'>
            {applicationDataState.map((page, index) => (
              <div key={index} className='type-container flex flex-1 items-center justify-center'>
                <div className={`w-[100%] h-[100%] content-center ${currentPageIndex === index ? currentPStyle : otherPstyle}`} onClick={() => setCurrentPageIndex(index)}>
                  {page.applicationType === 'DOCUMENT' ? '서류' : page.applicationType === 'INTERVIEW' ? '면접' : '피드백'}
                </div>
              </div>
            ))}
            <div className='plus-button-container bg-navy-lightSide flex w-[13%] relative'>
              <div className='plus-button flex w-full gap-2 justify-center items-center cursor-pointer bg-navy-interviewBtn rounded-tr-[10px]' ref={toggleRef} onClick={handleToggleClick}>
                <PlusCircleIcon className="w-[24px] h-[24px] text-navy-dark text-center" />
                면접 추가
              </div>
              {isToggleOpen && (
                <div className='absolute top-full left-0 w-full bg-white border border-navy-interviewBtn rounded-[10px] mt-[5px] z-50'>
                  <div className='flex flex-col'>
                    <div className='p-[10px] cursor-pointer hover:text-navy-sideText' onClick={() => handleAddPage('DOCUMENT')}>서류 추가</div>
                    <div className='p-[10px] cursor-pointer hover:text-navy-sideText border-y' onClick={() => handleAddPage('INTERVIEW')}>면접 추가</div>
                    <div className='p-[10px] cursor-pointer hover:text-navy-sideText' onClick={() => handleAddPage('FEEDBACK')}>면접피드백 추가</div>
                  </div>
                </div>
              )}
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
                    className='w-full h-full border border-white bg-white text-[18px] rounded-[0px] font-medium leading-[21.48px] outline-none resize-none'
                    value={currentQuestions[currentQuestionIndex]?.content || ''}
                    onChange={(e) => handleQuestionChange(currentQuestionIndex, 'content', e.target.value)}
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
                      onChange={handleApplyDateChange} />
                  </div>
                </div>
                <div className='submit w-[100%] flex flex-col items-start mb-[44px] z-20'>
                  <p className='font-medium text-[18px] mb-[10px]'>제출여부</p>
                  <div className='w-[100%] relative' ref={submissionRef}>
                    <div className='w-[100%] flex justify-between items-center bg-white border rounded-[10px] cursor-pointer px-[20px] py-[10px]' onClick={() => handleDropdownClick('submission')}>
                      <div>{currentSubmissionIcon}</div>
                      <ChevronDownIcon className='w-[24px] h-[24px] text-navy-dark' />
                    </div>
                    {isSubmissionDropdownOpen && (
                      <div className='absolute top-full left-0 w-full bg-white border rounded-[10px] shadow-lg mt-[5px] z-50'>
                        {['➖', '✔️', '❌'].map((icon, index) => (
                          <div key={index} className='cursor-pointer p-[10px] hover:bg-gray-lightSide flex items-center text-center justify-center' onClick={() => { setSubmissionStatus(icon); setCurrentSubmissionIcon(icon); setIsSubmissionDropdownOpen(false); }}>
                            {icon}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className='result w-[100%] flex flex-col items-start mb-[44px] z-10'>
                  <p className='font-medium text-[18px] mb-[10px]'>결과</p>
                  <div className='w-[100%] relative' ref={resultRef}>
                    <div className='w-[100%] flex justify-between items-center bg-white border rounded-[10px] cursor-pointer px-[20px] py-[10px]' onClick={() => handleDropdownClick('result')}>
                      <div>{currentResultIcon}</div>
                      <ChevronDownIcon className='w-[24px] h-[24px] text-navy-dark' />
                    </div>
                    {isResultDropdownOpen && (
                      <div className='absolute top-full left-0 w-full bg-white border rounded-[10px] shadow-lg mt-[5px] z-50'>
                        {['➖', '✔️', '❌'].map((icon, index) => (
                          <div key={index} className='cursor-pointer p-[10px] hover:bg-gray-lightSide flex items-center text-center justify-center' onClick={() => { setResultStatus(icon); setCurrentResultIcon(icon); setIsResultDropdownOpen(false); }}>
                            {icon}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
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
