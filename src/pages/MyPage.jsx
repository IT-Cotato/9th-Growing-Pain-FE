import { useNavigate } from "react-router-dom";
import { GrowthStateContext } from "../App";
import { useContext } from "react";
import HeaderMyPage from "../components/HeaderMyPage";
import MenubarMyPage from "../components/MenubarMyPage";

const MyPage = () => {
  const nav = useNavigate();
  const [memberData, jobPostData, applicationData, applicaionDetailData, infoData] = useContext(GrowthStateContext);

  // 텍스트 공통 스타일
  const textClass = 'mypage-text h-[55px] mb-[55px] flex-col text-left';
  // 텍스트 카테고리 스타일 (소속, 교육 ...)
  const textCategoryClass = 'font-semibold h-[20px] text-[17px] mb-[16px]';
  // 텍스트 내용 스타일
  const textContentClass = 'font-regular h-[19px] text-[16px]';

  return (
    <div className="h-[1080px]">
      <div className="ml-[70px] mt-[53px]">
        <HeaderMyPage name={infoData.name} company={infoData.company} />
      </div>
      <div className="mypage-content-container">
        <div className="menubar">
          <MenubarMyPage />
        </div>
        <div className="mypage-content h-[766px] flex gap-[24px] mx-[70px] mt-[27px]">
          <div className="mypage-left w-1/3 bg-white rounded-[10px] flex-col">
            <div className="text-right items-end h-[17px] mt-[33px] mr-[28px]">
              <div onClick={()=>nav('/user/mypage/editinfo')} className="cursor-pointer inline text-[14px] text-navy-dark">편집</div>
            </div>
            <div className="h-[220px] flex-col ml-[50px] mr-[47px] flex border-b">
              <div className={textClass}>
                <div className={textCategoryClass}>소속</div>
                <div className={textContentClass}>{infoData.belong}</div>
              </div>
              <div className={textClass}>
                <div className={textCategoryClass}>교육</div>
                <div className={textContentClass}>{infoData.education}</div>
              </div>
            </div>
            <div className="h-[387px] flex-col mt-[55px] ml-[50px] mr-[47px]">
              <div className={textClass}>
                <div className={textCategoryClass}>스킬</div>
                <div className={textContentClass}>{infoData.skill}</div>
              </div>
              <div className={textClass}>
                <div className={textCategoryClass}>이력 및 활동</div>
                <div className={textContentClass}>{infoData.activity}</div>
              </div>
              <div className={textClass}>
                <div className={textCategoryClass}>수상내역</div>
                <div className={textContentClass}>{infoData.award}</div>
              </div>
              <div className={textClass}>
                <div className={textCategoryClass}>토플 점수</div>
                <div className={textContentClass}>{infoData.toefl}</div>
              </div>
            </div>
          </div>
          <div className="mypage-right w-2/3 bg-white w-[943px] rounded-[10px]">
            <div className="text-right items-end h-[17px] mt-[33px] mr-[28px]">
              <div onClick={()=>nav('/user/mypage/editabout')} className="cursor-pointer inline text-[14px] text-navy-dark">편집</div>
            </div>
            <div className="h-[282px] flex-col ml-[50px] mr-[47px] flex border-b">
              <div className={textClass}>
                <div className={textCategoryClass}>경력</div>
                <div className={textContentClass}>{infoData.career}</div>
              </div>
            </div>
            <div className="h-[387px] flex-col mt-[107px] ml-[50px] mr-[47px]">
              <div className={textClass}>
                <div className={textCategoryClass}>나에 대해서</div>
                <div className={textContentClass}>{infoData.about}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPage;