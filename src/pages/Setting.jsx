import { GrowthStateContext } from '../App';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderMyPage from '../components/HeaderMyPage';
import MenubarMyPage from '../components/MenubarMyPage';
import Button from '../components/Button';
import InputField from '../components/InputField';

const Setting = () => {
	const nav = useNavigate();
	const [memberData, jobPostData, applicationData, applicaionDetailData, infoData] = useContext(GrowthStateContext);

	return (
		<div>
			<div className="mx-[70px] mt-[53px]">
				<div>
					<HeaderMyPage name={infoData.name} company={infoData.company} />
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
								<div>
									<InputField place={'setting'} placeholderText={'현재 비밀번호를 입력해주세요.'} />
								</div>
							</div>
							<div className="mt-[39px] flex items-center">
								<div className="w-[90px] mr-[50px]">새 비밀번호</div>
								<div>
									<InputField place={'setting'} placeholderText={'새 비밀번호를 입력해주세요.'} />
								</div>
							</div>
							<div className="mt-[37px] flex items-center">
								<div className="w-[90px] mr-[50px]">분야</div>
								<div>
									<InputField place={'setting'} />
								</div>
							</div>
						</div>
						<div className="mt-[173px] mr-[50px] text-right">
							<Button type="saveMyInfo" text="저장하기" onClick={() => nav('/user/mypage')} />{' '}
							{/* onClick 수정해야 함 */}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Setting;
