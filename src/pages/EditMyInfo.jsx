import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { GrowthStateContext } from "../App";
import Button from "../components/Button";
import InputField from "../components/InputField";

const EditMyInfo = () => {
  const nav = useNavigate();
  const [memberData, jobPostData, applicationData, applicaionDetailData, infoData] = useContext(GrowthStateContext);
  
  // 텍스트 카테고리 스타일 (소속, 교육 ...)
  const textCategoryClass = 'font-semibold h-[21px] text-[18px] mb-[24px]';

  return (
    <div className="mypage-edit-info flex flex-col mx-[70px] my-[50px] bg-navy-lightSide rounded-[10px]">
      <div className="h-[258px] mt-[50px] mx-[50px] border-b border-gray-300 text-left">
        <div className="mb-[20px]">
          <div className={textCategoryClass}>소속</div>
          <div>
            <InputField place={'belongInfo'} placeholderText={infoData.belong} />
          </div>
        </div>
        <div>
          <div className={textCategoryClass}>교육</div>
          <div>
            <InputField place={'belongInfo'} placeholderText={infoData.education} />
          </div>
        </div>
      </div>
      <div className="h-[891px] mt-[36px] mx-[50px] text-left">
        <div className="mb-[36px]">
          <div className={textCategoryClass}>스킬</div>
          <div>
            <InputField place={'abilityInfo'} placeholderText={infoData.skill} />
          </div>
        </div>
        <div className="mb-[36px]">
          <div className={textCategoryClass}>이력 및 활동</div>
          <div>
            <InputField place={'abilityInfo'} placeholderText={infoData.activity} />
          </div>
        </div>
        <div className="mb-[36px]">
          <div className={textCategoryClass}>수상내역</div>
          <div>
            <InputField place={'awardInfo'} placeholderText={infoData.award} />
          </div>
        </div>
        <div>
          <div className={textCategoryClass}>토플점수</div>
          <div>
            <InputField place={'belongInfo'} placeholderText={infoData.toefl} />
          </div>
        </div>
      </div>
      <div className="my-[36px] mr-[50px] text-right">
        <Button type="saveMyInfo" text="저장하기" onClick={()=>nav("/user/mypage")} />   {/* onClick 수정해야 함 */}
      </div>
    </div>
  );
};

export default EditMyInfo;