import { useNavigate } from "react-router-dom";
import HeaderMyPage from "../components/HeaderMyPage";
import MenubarMyPage from "../components/MenubarMyPage";
import MemoField from "../components/MemoField";
import { useState, useEffect } from "react";
import instance from "../api/instance";

const jobMap = {
  "COLLEGE_STUDENT": "대학생",
  "GRADUTE": "졸업생",
  "JOB_SEEKER": "구직자",
  "PREPARING_FOR_JOB_CHACE": "이직자",
}

const MyPage = () => {
  const nav = useNavigate();
  const [infoData, setInfoData] = useState();

  // 서버로부터 데이터 GET
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get('/api/member/info');
        if (response.data && response.data.status === 'success') {
          console.log(response.data.data);
          setInfoData(response.data.data);  // 받아온 데이터를 applyData 상태에 저장
        }
      } catch (error) {
        console.error('Error fetching apply data:', error);
      }
    };

    fetchData();
  }, []);

  // infoData가 null일 때 로딩 스피너나 대체 UI를 표시할 수 있음
  if (!infoData) {
    return <div>Loading...</div>;  // 데이터를 불러오는 동안 표시될 내용
  }

  // 텍스트 공통 스타일
  const textClass = 'mypage-text mb-[30px] flex-col text-left';
  // 텍스트 카테고리 스타일 (소속, 교육 ...)
  const textCategoryClass = 'font-semibold text-[17px] mb-[14px]';
  // 텍스트 내용 스타일
  const textContentClass = 'font-regular text-[16px] text-wrap';

  return (
    <div>
      <div className="mx-[70px] mt-[53px]">
        <div>
          <HeaderMyPage />
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
                <div className="h-[300px] flex-col border-b">
                  <div className={textClass}>
                    <div className={textCategoryClass}>소속</div>
                    <div className={textContentClass}>{infoData.belong}</div>
                  </div>
                  <div className={textClass}>
                    <div className={textCategoryClass}>직업</div>
                    <div className={textContentClass}>{jobMap[infoData.job]}</div>
                  </div>
                  <div className={textClass}>
                    <div className={textCategoryClass}>학력</div>
                    <div className={textContentClass}>{infoData.educationBackground}</div>
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
                  <div className={textContentClass}>{infoData.activityHistory}</div>
                </div>
                <div className={textClass}>
                  <div className={textCategoryClass}>수상내역</div>
                  <div className={textContentClass}>{infoData.award}</div>
                </div>
                <div className={textClass}>
                  <div className={textCategoryClass}>토플 점수</div>
                  <div className={textContentClass}>{infoData.languageScore}</div>
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
                  <MemoField
                    type={'careerInfoView'}
                    placeholderText="경력을 입력하세요."
                    value={infoData.career}
                    name="career"
                  />
                </div>
              </div>
              <div className="h-[387px] flex-col pt-[70px]">
                <div className={textClass}>
                  <div className={textCategoryClass}>나에 대해서</div>
                  <MemoField
                    type={'aboutInfoView'}
                    placeholderText="경력을 입력하세요."
                    value={infoData.aboutMe}
                    name="aboutMe"
                  />
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