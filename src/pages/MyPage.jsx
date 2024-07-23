import { useNavigate } from "react-router-dom";
import { GrowthStateContext } from "../App";
import { useContext } from "react";
import HeaderMyPage from "../components/HeaderMyPage";
import MenubarMyPage from "../components/MenubarMyPage";

const MyPage = () => {
  const nav = useNavigate();
  const [memberData, jobPostData, applicationData, applicaionDetailData, infoData] = useContext(GrowthStateContext);

  // 텍스트 공통 스타일
  const textClass = 'mypage-text mb-[55px] flex-col text-left';
  // 텍스트 카테고리 스타일 (소속, 교육 ...)
  const textCategoryClass = 'font-semibold text-[17px] mb-[16px]';
  // 텍스트 내용 스타일
  const textContentClass = 'font-regular text-[16px] text-wrap';

  return (
    <div>
      <div className="mx-[70px] mt-[53px]">
        <div>
          <HeaderMyPage name={infoData.name} company={infoData.company} />
        </div>
        <div className="mypage-content-container flex-grow flex flex-col">
          <div className="menubar">
            <MenubarMyPage />
          </div>
          <div className="mypage-content flex">
            <div className="mypage-left w-2/5 h-[765px] bg-white rounded-[10px] px-[50px] pt-[40px] pb-[50px] mr-[24px] mt-[28px] mb-[50px]">
              <div className="flex-col flex-grow">
                <div className="text-right h-[15px] relative right-[10px]">
                  <div onClick={()=>nav('/user/mypage/editinfo')} className="cursor-pointer inline text-[14px] text-navy-dark">편집</div>
                </div>
                <div className="h-[220px] flex-col border-b">
                  <div className={textClass}>
                    <div className={textCategoryClass}>소속</div>
                    <div className={textContentClass}>{infoData.belong}</div>
                  </div>
                  <div className={textClass}>
                    <div className={textCategoryClass}>교육</div>
                    <div className={textContentClass}>{infoData.education}</div>
                  </div>
                </div>
              </div>
              <div className="h-[387px] py-[30px] flex-col">
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
            <div className="mypage-right w-3/5 h-[765px] bg-white rounded-[10px] px-[50px] pt-[40px] pb-[50px] mt-[28px] mb-[50px]">
              <div className="text-right items-end h-[17px]">
                <div onClick={()=>nav('/user/mypage/editabout')} className="cursor-pointer inline text-[14px] text-navy-dark">편집</div>
              </div>
              <div className="h-[300px] flex-col flex border-b">
                <div className={textClass}>
                  <div className={textCategoryClass}>경력</div>
                  <div className={textContentClass}>{infoData.career}</div>
                </div>
              </div>
              <div className="h-[387px] flex-col pt-[107px]">
                <div className={textClass}>
                  <div className={textCategoryClass}>나에 대해서</div>
                  <div className={textContentClass}>{infoData.about}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPage;