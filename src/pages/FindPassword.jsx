import Header from '../components/Header';
import Footer from '../components/Footer';
import InputField from '../components/InputField';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const FindPassword = () => {
	const nav = useNavigate();
	const [email, setEmail] = useState('');

	return (
		<div>
			<div className="header-container">
				<Header />
			</div>
			<div className="main-content h-[700px] flex flex-col items-center">
				<div className="w-[502px] h-[279px] mt-[210px]">
					{/* 텍스트 필드 */}
					<section className="flex flex-col items-center justify-center">
						<h4 className="text-[21px] font-bold">비밀번호를 잊으셨나요?</h4>
						<p className="text-[16px] font-normal mt-[20px]">
							가입된 이메일을 확인 후 비밀번호를 재설정 할 수 있는 링크를 보내드릴게요.
						</p>
					</section>
					<section>
						<InputField
							placeholderText={'이메일 입력하기'}
							place={'findPassword'}
							className="mt-[55px]"
							// setEmail에 저장하고 이메일 전송하는 Handler만들기
							onChange={(e) => {
								setEmail(e.target.value);
							}}
						></InputField>
						<p className="text-[14px] font-normal] text-[#26408B] flex justify-end cursor-pointer hover:underline">
							재전송
						</p>
					</section>
					<section className="flex justify-center gap-[20px] mt-[26px]">
						<button
							className="w-[102px] h-[40px] rounded-[10px] border-[1px] border-[#26408B]  text-[16px]"
							onClick={() => {
								nav(-1);
							}}
						>
							닫기
						</button>
						<button
							className="w-[102px] h-[40px] rounded-[10px] bg-[#26408B] text-[16px] text-white"
							onClick={() => {
								nav('/FindPassword2');
							}}
						>
							다음
						</button>
					</section>
				</div>
			</div>
			<div className="footer-container">
				<Footer />
			</div>
		</div>
	);
};

export default FindPassword;
