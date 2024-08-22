import Header from '../components/Header';
import Footer from '../components/Footer';
import InputField from '../components/InputField';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const FindPassword = () => {
	const nav = useNavigate();
	const [email, setEmail] = useState('');

	const sendEmail = async () => {
		if (!email) {
			return alert('이메일을 입력하세요.');
		}

		const payload = { email: email };

		try {
			const response = await axios.post('/api/auth/reset-password', payload);
			if (response.status === 200) {
				console.log(response.data.message);
				console.log(response.data.data.password);
				nav('/FindPassword2', { state: { password: response.data.data.password } });
			} else {
				alert(response.data.message || '이메일 전송 중 오류가 발생했습니다.');
			}
		} catch (error) {
			console.error('Error:', error);
			alert('이메일 전송 중 오류가 발생했습니다.');
		}
	};

	return (
		<div>
			<div className="header-container">
				<Header />
			</div>
			<div className="main-content h-[700px] flex flex-col items-center">
				<div className="w-[600px] mt-[210px]">
					{/* 텍스트 필드 */}
					<section className="flex flex-col items-center justify-center">
						<h4 className="text-[21px] font-bold">비밀번호를 잊으셨나요?</h4>
						<p className="text-[16px] font-normal mt-[20px]">
							가입된 이메일을 확인 후 비밀번호를 재설정 할 수 있는 임시 비밀번호를 알려드리겠습니다.
						</p>
					</section>
					<section>
						<InputField
							placeholderText={'이메일 입력하기'}
							place={'findPassword'}
							className="mt-[30px]"
							onChange={(e) => {
								setEmail(e.target.value);
							}}
						></InputField>
					</section>
					<section className="flex justify-center gap-[20px] mt-[55px]">
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
							onClick={sendEmail}
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
