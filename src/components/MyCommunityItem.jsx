import { useNavigate } from "react-router-dom";
import { format } from 'date-fns';
import instance from "../api/instance";

const categoryMap = {
  'FREE': '자유게시판',
  'PORTFOLIO': '포트폴리오',
  'TEAM': '팀원모집',
}

// 지원현황 페이지 - 아이템 컴포넌트
const MyCommunityItem = ({ id, commentId, category, title, writer, date, menu }) => {
  const nav = useNavigate();

  // 삭제 함수 추가
  const handleDelete = async () => {
    try {
      switch (menu) {
        case "작성한 글": {
          await instance.delete(`/api/post/${id}/delete`);
          alert('삭제되었습니다.');
          window.location.reload();
          break;
        }

        case "작성한 댓글": {
          await instance.delete(`/api/comment/${commentId}`);
          alert('삭제되었습니다.');
          window.location.reload();
          break;
        }

        case "저장한 글": {
          await instance.delete(`/api/post/saves/${id}`);
          alert('저장이 취소되었습니다.');
          window.location.reload();
          break;
        }
      }
    } catch (error) {
      console.error('삭제 실패:', error);
      alert('삭제에 실패했습니다.');
    }
  };

  return (
    <div className='apply-item-container h-[88px] my-[5px] text-[15px] rounded-[10px] border flex gap-[50px] flex bg-white items-center'>
      <div onClick={()=>{nav(`/user/community/total#postId=${id}`)}} className='w-2/12 pl-[40px] cursor-pointer text-left font-medium'>{categoryMap[category]}</div>
      <div onClick={()=>{nav(`/user/community/total#postId=${id}`)}} className='w-6/12 pl-[100px] cursor-pointer text-left'>{title}</div>
      <div onClick={()=>{nav(`/user/community/total#postId=${id}`)}} className='w-1/12 cursor-pointer'>{writer}</div>
      <div onClick={()=>{nav(`/user/community/total#postId=${id}`)}} className='w-2/12'>{`${format(new Date(date), 'yyyy.MM.dd')}`}</div>
      <div onClick={handleDelete} className='w-1/12 cursor-pointer text-[15px] text-gray-deleteBtn text-center'>
        {menu === "작성한 글" || menu === "작성한 댓글" ? "삭제" : menu === "저장한 글" ? "저장 취소" : ""}
      </div>
    </div>
  );
};

export default MyCommunityItem;