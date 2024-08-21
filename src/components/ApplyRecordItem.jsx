import { useNavigate } from "react-router-dom";
import { format } from 'date-fns';
import instance from "../api/instance";

// 지원현황 페이지 - 아이템 컴포넌트
const ApplyRecordItem = ({ id, company, position, submitDocument, submitInterview, deadline }) => {
  const nav = useNavigate();

  // 삭제 함수 추가
  const handleDelete = async () => {
    try {
      await instance.delete(`/api/job-posts/${id}`);
      alert('삭제되었습니다.');
      window.location.reload();
    } catch (error) {
      console.error('삭제 실패:', error);
      alert('삭제에 실패했습니다.');
    }
  };

  return (
    <div className="apply-item-container h-[88px] my-[8px] text-[16px] border rounded-[10px] flex gap-[60px] bg-white items-center">
      <div onClick={()=>nav(`/user/growth/apply/${id}`)} className="w-2/12 ml-[67px] cursor-pointer text-left font-medium">{company}</div>
      <div onClick={()=>nav(`/user/growth/apply/${id}`)} className="w-3/12 ml-[30px] cursor-pointer text-left">{position}</div>
      <div className="w-1/12 mr-[20px]">{`${format(new Date(deadline), '~MM/dd')}`}</div>
      <div className="w-1/12 mr-[20px]">{submitDocument === "PASSED" ? '✔️' : (submitDocument === "FAILED" ? '❌' : '➖')}</div>
      <div className="w-1/12 mr-[20px]">{submitInterview === "PASSED" ? '✔️' : (submitInterview === "FAILED"? '❌' : '➖')}</div>
      <div onClick={handleDelete} className="w-1/12 mr-[20px] cursor-pointer">삭제</div>
    </div>
  );
};

export default ApplyRecordItem;