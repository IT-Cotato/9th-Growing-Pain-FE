import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "../components/Button";
import InputField from "../components/InputField";
import instance from "../api/instance";

const jobMap = {
  "COLLEGE_STUDENT": "대학생",
  "GRADUTE": "졸업생",
  "JOB_SEEKER": "구직자",
  "PREPARING_FOR_JOB_CHACE": "이직자",
}

const EditMyInfo = () => {
  const nav = useNavigate();
  const [infoData, setInfoData] = useState();
  const [formData, setFormData] = useState({
    educationBackground: "",
    skill: "",
    activityHistory: "",
    award: "",
    languageScore: "",
  });

  // 서버로부터 데이터 GET
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get('/api/member/info');
        if (response.data && response.data.status === 'success') {
          console.log(response.data.data);
          setInfoData(response.data.data);  // 받아온 데이터를 applyData 상태에 저장
          // 받아온 데이터를 formData에 저장
          setFormData({
            educationBackground: response.data.data.educationBackground || "",
            skill: response.data.data.skill || "",
            activityHistory: response.data.data.activityHistory || "",
            award: response.data.data.award || "",
            languageScore: response.data.data.languageScore || "",
            career: response.data.data.career || "",
            aboutMe: response.data.data.aboutMe || ""
          });
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

  // 입력값을 업데이트하는 함수
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // 저장 버튼 클릭 시 서버로 POST 요청
  const handleSave = async () => {
    try {
      const payload = {
        ...formData,
      };
      const response = await instance.post('/api/member/additional-info', payload);
      if (response.data.status === 'success') {
        nav("/user/mypage"); // 저장 후 마이페이지로 이동
      }
    } catch (error) {
      console.error('Error saving info data:', error);
    }
  };
  
  // 텍스트 카테고리 스타일 (소속, 교육 ...)
  const textCategoryClass = 'font-semibold h-[21px] text-[18px] mb-[20px]';

  return (
    <div className="mypage-edit-info flex flex-col mx-[70px] my-[50px] bg-navy-lightSide rounded-[10px]">
      <div className="h-[340px] mt-[50px] mx-[50px] border-b border-gray-400 text-left">
        <div>
          <div className={textCategoryClass}>소속</div>
          <div>
            <input
              type="text"
              placeholder={infoData.belong}
              className={`rounded-[10px] w-[336px] h-14 placeholder:text-[17px] bg-[#FFFFFF] rounded-[10px] w-[447px] h-[48px] pl-[20px] mb-[15px] outline-none`}
              readOnly
            />
            {/* <InputField
              place={'belongInfoReadOnly'}
              placeholderText={infoData.belong}
              value={formData.belong}
            /> */}
          </div>
        </div>
        <div>
          <div className={textCategoryClass}>직업</div>
          <div>
            <input
              type="text"
              placeholder={jobMap[infoData.job]}
              className={`rounded-[10px] w-[336px] h-14 placeholder:text-[17px] bg-[#FFFFFF] rounded-[10px] w-[447px] h-[48px] pl-[20px] mb-[15px] outline-none`}
              readOnly
            />
            {/* <InputField 
              place={'belongInfoReadOnly'}
              placeholderText={jobMap[infoData.job]}
              value={formData.job}
            /> */}
          </div>
        </div>
        <div className="mb-[40px]">
          <div className={textCategoryClass}>학력</div>
          <div>
            <InputField
              place={'belongInfo'}
              placeholderText={infoData.educationBackground}
              value={formData.educationBackground}
              name="educationBackground"
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
      <div className="h-[891px] mt-[36px] mx-[50px] text-left">
        <div className="mb-[36px]">
          <div className={textCategoryClass}>스킬</div>
          <div>
            <InputField 
              place={'abilityInfo'}
              placeholderText="본인 스킬을 입력해주세요."
              value={formData.skill}
              name="skill"
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="mb-[36px]">
          <div className={textCategoryClass}>이력 및 활동</div>
          <div>
            <InputField
              place={'abilityInfo'}
              placeholderText="이력 및 활동을 입력해주세요."
              value={formData.activityHistory}
              name="activityHistory"
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="mb-[36px]">
          <div className={textCategoryClass}>수상내역</div>
          <div>
            <InputField
              place={'awardInfo'}
              placeholderText="수상내역을 입력해주세요."
              value={formData.award}
              name="award"
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div>
          <div className={textCategoryClass}>토플점수</div>
          <div>
            <InputField
              place={'belongInfo'}
              placeholderText={infoData.languageScore}
              value={formData.languageScore}
              name="languageScore"
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
      <div className="mb-[36px] mr-[50px] text-right">
        <Button type="saveMyInfo" text="저장하기" onClick={handleSave} />   {/* onClick 수정해야 함 */}
      </div>
    </div>
  );
};

export default EditMyInfo;