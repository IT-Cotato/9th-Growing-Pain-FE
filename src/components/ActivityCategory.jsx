import { useNavigate } from "react-router-dom";

const ActivityCategory = ({category, image, content, navLink}) => {
  const nav = useNavigate();

  return (
    <div onClick={() => nav(`${navLink}`)} className="activity-container cursor-pointer h-[304px] rounded-[10px] bg-navy-lightSide box-border shadow-[0px_2px_2px_rgba(0,0,0,0.1)]">
      <div className="activity-img-container">
        <img src={image} className="activity-image rounded-t-[10px]" />
      </div>
      <div className="activity-text-field m-[24px] mb-[34px] flex-col text-left">
        <div className="activity-category font-medium text-[17px] mb-[14px]">
          {category}
        </div>
        <div className="activity-content font-regular text-[15px] leading-[25px]">
          {content}
        </div>
      </div>
    </div>
  );
};

export default ActivityCategory;