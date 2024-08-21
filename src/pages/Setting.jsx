import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import instance from '../api/instance';
import HeaderMyPage from '../components/HeaderMyPage';
import MenubarMyPage from '../components/MenubarMyPage';
import Button from '../components/Button';
import InputField from '../components/InputField';

const Setting = () => {
	const nav = useNavigate();
	const [passwordFormData, setPasswordFormData] = useState({
    currentPassword: "",
    newPassword: "",
  });
	const [formData, setFormData] = useState({
    field: "",
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

	// 입력값을 업데이트하는 함수
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordFormData({
      ...passwordFormData,
      [name]: value
    });
		setFormData({
			...formData,
			[name]: value,
		});
  };

	// 저장 버튼 클릭 시 서버로 POST 요청
  const handlePasswordSave = async () => {
    try {
      const payload = {
        ...passwordFormData,
      };
      const response = await instance.post('/api/auth/change-password', payload);
      if (response.data.status === 'success') {
				console.log('비밀번호 변경 성공!');
				alert('비밀번호가 변경되었습니다');
      }
    } catch (error) {
      console.error('비밀번호 변경 실패:', error);
    }
  };

	// 저장 버튼 클릭 시 서버로 POST 요청
  const handleSave = async () => {
    try {
      const payload = {
        ...formData,
      };
      const response = await instance.post('/api/member/additional-info', payload);
      if (response.data.status === 'success') {
				sessionStorage.setItem('field', formData.field)
        alert('분야 정보가 변경되었습니다');
      }
    } catch (error) {
      console.error('Error saving info data:', error);
    }
  };

	// 비밀번호와 분야 정보를 모두 저장하는 함수
  const handleSaveAll = async () => {
    await handlePasswordSave(); // 비밀번호 저장
    await handleSave();         // 분야 정보 저장
    nav("/user/mypage");        // 저장 후 마이페이지로 이동
  };

	return (
		<div>
			<div className="mx-[70px] mt-[53px]">
				<div>
					<HeaderMyPage />
				</div>
				<div className="mypage-content-container flex-col">
					<div className="menubar">
						<MenubarMyPage />
					</div>
					<div className="mypage-setting-content h-[692px] bg-white flex flex-col mt-[28px] mb-[153px] rounded-[10px]">
						<div className="h-[41px] flex mx-[50px] mt-[50px] border-b">
							<div>개인 정보</div>
						</div>
						<div className="h-[292px] flex-col mx-[50px] mt-[50px] text-left">
							<div>이메일</div>
							<div className="mt-[53px] flex items-center">
								<div className="w-[90px] mr-[50px]">현재 비밀번호</div>
								<div className='w-[80%]'>
									<InputField
										place={'setting'}
										type={'password'}
										placeholderText={'현재 비밀번호를 입력해주세요.'}
										value={passwordFormData.currentPassword}
										name="currentPassword"
										onChange={handleInputChange}
									/>
								</div>
							</div>
							<div className="mt-[39px] flex items-center">
								<div className="w-[90px] mr-[50px]">새 비밀번호</div>
								<div className='w-[80%]'>
									<InputField
										place={'setting'}
										type={'password'}
										placeholderText={'새 비밀번호를 입력해주세요.'}
										value={passwordFormData.newPassword}
										name="newPassword"
										onChange={handleInputChange}
									/>
								</div>
							</div>
							<div className="mt-[37px] flex items-center">
								<div className="w-[90px] mr-[50px]">분야</div>
								<div className='w-[80%]'>
									<InputField
										place={'setting'}
										placeholderText={formData.field}
										value={formData.field}
										name="field"
										onChange={handleInputChange}
									/>
								</div>
							</div>
						</div>
						<div className="mt-[173px] mr-[50px] text-right">
							<Button
								type="saveMyInfo"
								text="저장하기"
								onClick={handleSaveAll}
							/>{' '}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Setting;
