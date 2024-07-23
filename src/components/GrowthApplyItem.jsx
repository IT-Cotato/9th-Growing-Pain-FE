import { useNavigate } from "react-router-dom";
import { format } from 'date-fns';

const ApplicationStatus = ({ id, company, position, deadline, date }) => {
  const nav = useNavigate();
	let deadlineColor = '';

  // 디데이에 따른 css
	if (Number(deadline) <= 7) {
		deadlineColor = 'deadline-container flex flex-1 place-content-start text-left text-red-600'; // 마감일이 7일 이내일 때 빨간색 텍스트
	} else {
		deadlineColor = 'deadline-container flex flex-1 place-content-start text-left text-black'; // 그 외에는 검은색 텍스트
	}

	return (
    // 지원현황 컴포넌트 - 클릭하면 해당 공모의 상세 페이지로 이동
		<div onClick={()=>nav(`/user/growth/apply/${id}`)} className="apply-item-container cursor-pointer relative flex-col text-[17px] w-[30%] h-[151px] p-[24px] bg-white border rounded-[10px] box-border shadow-[0px_2px_2px_rgba(0,0,0,0.1)]">
      <div className={deadlineColor}>     {/* 디데이에 따라 스타일 다르게 적용 */}
        <div className="rounded-[10px] bg-gray-dday px-[10px] font-medium text-[14px]">D-{deadline}</div>
      </div>
      {/* 경계선 기준 위의 내용 - 회사명, 직무 */}
      <div className="top-container h-[89px] pt-[12px] flex-col text-left">
        <div className="font-medium text-[18px] mb-[10px]">{company}</div>
        <div className="flex justify-between text-gray-600">
          <div className="font-ragular text-[16px]">{position}</div>
          <div className="font-ragular text-[16px]">{`${format(new Date(date), '~MM/dd')}`}</div>
        </div>
      </div>
    </div>
	);
};

export default ApplicationStatus;
