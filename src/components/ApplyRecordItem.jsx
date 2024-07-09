import { useNavigate } from "react-router-dom";
import { format } from 'date-fns';

// 지원현황 페이지 - 아이템 컴포넌트
const ApplyRecordItem = ({ id, company, position, submitDocument, submitInterview, deadline }) => {
  const nav = useNavigate();

  return (
    <div className="apply-item-container h-[88px] my-[8px] text-[17px] border rounded-[10px] flex bg-white items-center">
      <div onClick={()=>nav(`/user/growth/apply/${id}`)} className="w-[447px] pl-[67px] cursor-pointer text-left font-medium">{company}</div>
      <div onClick={()=>nav(`/user/growth/apply/${id}`)} className="w-[536px] cursor-pointer text-left">{position}</div>
      <div className="w-[212px] text-left">{`${format(new Date(deadline), '~MM/dd')}`}</div>
      <div className="w-[170px] text-left">{submitDocument ? '✅' : '❌'}</div>
      <div>{submitInterview ? '✅' : '❌'}</div>
    </div>
  );
};

export default ApplyRecordItem;