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
	// const [formData, setFormData] = useState({
  //   educationBackground: "",
  //   skill: "",
  //   activityHistory: "",
  //   award: "",
  //   languageScore: "",
  // });


	// 입력값을 업데이트하는 함수
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordFormData({
      ...passwordFormData,
      [name]: value
    });
		// setFormData({
		// 	...formData,
		// 	[name]: value,
		// });
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
        nav("/user/mypage"); // 저장 후 마이페이지로 이동
      }
    } catch (error) {
      console.error('비밀번호 변경 실패:', error);
    }
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
									<InputField place={'setting'} />
								</div>
							</div>
						</div>
						<div className="mt-[173px] mr-[50px] text-right">
							<Button
								type="saveMyInfo"
								text="저장하기"
								onClick={() => {
									handlePasswordSave();
								}}
							/>{' '}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Setting;
