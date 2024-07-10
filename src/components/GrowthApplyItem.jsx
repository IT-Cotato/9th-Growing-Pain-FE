import { useNavigate } from "react-router-dom";

const ApplicationStatus = ({ id, company, position, submitDocument, submitInterview, deadline }) => {
  const nav = useNavigate();
	let deadlineColor = '';

  // 디데이에 따른 css
	if (Number(deadline) <= 7) {
		deadlineColor = 'deadline-container flex-1 place-content-end text-right text-red-600'; // 마감일이 7일 이내일 때 빨간색 텍스트
	} else {
		deadlineColor = 'deadline-container flex-1 place-content-end text-right text-black'; // 그 외에는 검은색 텍스트
	}

	return (
    // 지원현황 컴포넌트 - 클릭하면 해당 공모의 상세 페이지로 이동
		<div onClick={()=>nav(`/user/growth/apply/${id}`)} className="apply-item-container cursor-pointer relative flex-col text-[17px] w-[312px] h-[239px] px-[39px] pt-[36px] pb-[35px] bg-white border rounded-[10px] box-border shadow-[0px_2px_2px_rgba(0,0,0,0.1)]">
      {/* 경계선 기준 위의 내용 - 회사명, 직무 */}
      <div className="top-container h-[89px] flex-col text-left">
        <div className="font-medium text-[20px] mb-[10px]">{company}</div>
        <div className="font-ragular text-[18px]">{position}</div>
      </div>
      {/* 경계선 기준 아래의 내용 - 제출여부, 디데이 */}
      <div className="bottom-container h-[75px] border-t flex place-content-between relative">
        <div className="submit-container mt-[28px] w-1/2 text-left">
          <div>서류 제출: {submitDocument ? '✅' : '❌'}</div>
          <div>면접 제출: {submitInterview ? '✅' : '❌'}</div>
        </div>
        <div className={deadlineColor}>     {/* 디데이에 따라 스타일 다르게 적용 */}
          <div>서류 D-{deadline}</div>
        </div>
      </div>
    </div>
	);
};

export default ApplicationStatus;
