import { React, useRef } from "react";
import ProgressBar from "./ProgressBar";

const ActivityItem = ({id, name, period, role, type, contribution, url}) => {
  const titleClass = "text-[17px] font-semibold";
  const contentClass = "text-[15px] font-regular text-gray-content";

  return (
    <div className="activity-item flex-col w-[727px] h-[452px]">
      <div className="activity-number-container flex justify-end">
        <div className="activity-number bg-navy-activityNum rounded-t-[10px] w-[43px] h-[36px] font-medium flex justify-center items-center">{id+1}</div>
      </div>
      <div className="activity-item-container w-[727px] h-[416px] flex rounded-[10px] rounded-tr-[0px] border-2 border-gray-line">
        <div className="left w-[344px] h-[416px] pl-[50px] pt-[50px] pb-[50px] text-left">
          <div className="h-[117px] border-r-2">
            <div className={titleClass}>활동명</div>
            <div className={contentClass}>{name}</div>
          </div>
          <div className="h-[142px] border-r-2">
            <div className={titleClass}>역할</div>
            <div className={contentClass}>
              {Object.entries(role).map(([key, item]) => (
                <div key={key}>{`${item}`}</div>
              ))}
            </div>
          </div>
          <div className="h-[50px] border-r-2">
            <div className={titleClass}>기여도</div>
            <div className={`${contentClass} flex align-center items-center`}>
              <div>{`${contribution}%`}</div>
              <ProgressBar contribution={contribution} />
            </div>
          </div>
        </div>
        <div className="center w-[329px] pl-[50px] pt-[50px] pb-[50px] text-left">
          <div className="h-[117px]">
            <div className={titleClass}>활동기간</div>
            <div className={contentClass}>{period}</div>
          </div>
          <div className="h-[142px]">
            <div className={titleClass}>활동유형</div>
            <div className={contentClass}>{type}</div>
          </div>
          <div className="h-[50px]">
            <div className={titleClass}>URL</div>
            <div className={contentClass}>{url}</div>
          </div>
        </div>
        <div className="activity-edit-button flex-1 pt-[24px] text-left">
          <div className="cursor-pointer inline text-[15px] text-navy-dark">편집</div>
        </div>
      </div>
    </div>
  );
};

export default ActivityItem;