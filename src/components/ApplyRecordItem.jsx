import { useNavigate } from "react-router-dom";
import { format } from 'date-fns';

// 지원현황 페이지 - 아이템 컴포넌트
const ApplyRecordItem = ({ id, company, position, submitDocument, submitInterview, deadline }) => {
  const nav = useNavigate();

  return (
    <div className="apply-item-container h-[88px] my-[8px] text-[17px] border rounded-[10px] flex gap-[60px] bg-white items-center">
      <div onClick={()=>nav(`/user/growth/apply/${id}`)} className="w-3/12 ml-[67px] cursor-pointer text-left font-medium">{company}</div>
      <div onClick={()=>nav(`/user/growth/apply/${id}`)} className="w-4/12 ml-[30px] cursor-pointer text-left">{position}</div>
      <div className="w-1/12 mr-[20px]">{`${format(new Date(deadline), '~MM/dd')}`}</div>
      <div className="w-2/12 mr-[20px]">{submitDocument === undefined ? '➖' : (submitDocument ? '✅' : '❌')}</div>
      <div className="w-2/12 mr-[20px]">{submitInterview === undefined ? '➖' : (submitInterview ? '✅' : '❌')}</div>
    </div>
  );
};

export default ApplyRecordItem;