import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "../components/Button";
import InputField from "../components/InputField";
import MemoField from "../components/MemoField";
import instance from "../api/instance";

const EditMyAbout = () => {
  const nav = useNavigate();
  const [formData, setFormData] = useState({
    career: "",
    aboutMe: ""
  });

  // 서버로부터 데이터 GET
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get('/api/member/info');
        if (response.data && response.data.status === 'success') {
          console.log(response.data.data);
          // 받아온 데이터를 formData에 저장
          setFormData({
            field: response.data.data.field || "",
            belong: response.data.data.belong || "",
            job: response.data.data.job || "",
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
  if (!formData) {
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
    <div className="mypage-edit-about flex flex-col mx-[70px] my-[50px] bg-navy-lightSide rounded-[10px]">
      <div className="mt-[50px] mx-[50px] border-b border-gray-300 text-left">
        <div className="mb-[20px]">
          <div className={textCategoryClass}>경력</div>
          <div>
            <MemoField
              type={'careerInfo'}
              placeholderText='경력을 입력하세요.'
              value={formData.career}
              name="career"
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
      <div className="mt-[36px] mx-[50px] text-left">
        <div className="mb-[36px]">
          <div className={textCategoryClass}>나에 대해서</div>
          <div>
            <MemoField
              type={'aboutInfo'}
              placeholderText='나에 대해서 소개해보세요.'
              value={formData.aboutMe}
              name="aboutMe"
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
      <div className="my-[36px] mr-[50px] text-right">
        <Button type="saveMyInfo" text="저장하기" onClick={handleSave} />   {/* onClick 수정해야 함 */}
      </div>
    </div>
  );
};

export default EditMyAbout;