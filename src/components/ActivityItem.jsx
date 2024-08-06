import { React, useRef } from "react";
import ProgressBar from "./ProgressBar";
import { useNavigate } from "react-router-dom";

const ActivityItem = ({id, name, period, role, type, contribution, url}) => {
  const nav = useNavigate();

  const titleClass = "text-[17px] font-semibold";
  const contentClass = "text-[15px] font-regular text-gray-content";

  return (
    <div className="w-full pb-[20px]">
      <div className="activity-item flex-1 h-[250px]">
        <div className="activity-number-container flex justify-end">
          <div className="activity-number bg-navy-activityNum rounded-t-[10px] w-[35px] h-[30px] font-medium flex justify-center items-center">{id+1}</div>
        </div>
        <div className="activity-item-container bg-white drop-shadow-sm h-[250px] flex rounded-[10px] rounded-tr-[0px] border-2 border-gray-line">
          <div className="left w-6/12 h-[250px] pl-[50px] py-[25px] text-left">
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
          <div className="center w-5/12 pl-[50px] py-[25px] text-left">
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
          <div className="activity-edit-button w-1/12 flex-1 pt-[15px] text-left">
            <div className="cursor-pointer text-[15px] text-navy-dark" onClick={()=>nav(`/user/growth/activity/detail/${id}`)}>편집</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityItem;