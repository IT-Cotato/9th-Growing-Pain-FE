import { React, useRef } from "react";
import ProgressBar from "./ProgressBar"; 
import { useNavigate } from "react-router-dom";
import instance from "../api/instance";

const ActivityItem = ({id, name, period, role, type, contribution, url }) => {
  const nav = useNavigate();

  // 삭제 함수
  const handleDelete = async () => {
    try {
      await instance.delete(`/api/activity-logs/${id}`);
      alert('삭제되었습니다.');
      window.location.reload();
    } catch (error) {
      console.error('삭제 실패:', error);
      alert('삭제에 실패했습니다.');
    }
  };

  const titleClass = "text-[17px] font-semibold";
  const contentClass = "text-[15px] font-regular text-gray-content";

  return (
    <div className="w-full pb-[20px]">
      <div className="activity-item flex-1 h-[250px]">
        <div className="activity-number-container flex justify-end">
          <div className="activity-number bg-navy-activityNum rounded-t-[10px] w-[35px] h-[30px] font-medium flex justify-center items-center">{id}</div>
        </div>
        <div className="activity-item-container bg-white drop-shadow-sm h-[290px] flex-col rounded-[10px] rounded-tr-[0px] border-2 border-gray-line">
          <div className="activity-edit-button flex mt-[15px] mr-[15px] gap-[15px] justify-end">
            <div className="cursor-pointer text-[15px] text-navy-dark" onClick={()=>nav(`/user/growth/activity/detail/${id}`)}>편집</div>
            <div className="cursor-pointer text-[15px] text-navy-dark" onClick={handleDelete}>삭제</div>
          </div>
          <div className="content-container flex">
            <div className="left w-6/12 h-[250px] pl-[50px] pt-[15px] pb-[25px] text-left">
              <div className="h-[70px] border-r-2">
                <div className={titleClass}>활동명</div>
                <div className={contentClass}>{name}</div>
              </div>
              <div className="h-[70px] border-r-2">
                <div className={titleClass}>역할</div>
                <div className={contentClass}>
                  {`${role}`}
                </div>
              </div>
              <div className="h-[40px] border-r-2">
                <div className={titleClass}>기여도</div>
                <div className={`${contentClass} flex align-center items-center`}>
                  <div>{`${contribution}%`}</div>
                  <ProgressBar contribution={contribution} />
                </div>
              </div>
            </div>
            <div className="center w-5/12 pl-[50px] pt-[15px] pb-[25px] text-left">
              <div className="h-[70px]">
                <div className={titleClass}>활동기간</div>
                <div className={contentClass}>{period}</div>
              </div>
              <div className="h-[70px]">
                <div className={titleClass}>활동유형</div>
                <div className={contentClass}>{type}</div>
              </div>
              <div className="h-[40px]">
                <div className={titleClass}>URL</div>
                <div className={contentClass}>{url}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityItem;