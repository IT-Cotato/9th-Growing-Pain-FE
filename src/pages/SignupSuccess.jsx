import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import { FaCheck } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import React from 'react';

const SignupSuccess = () => {
	const nav = useNavigate();
	return (
		<div>
			<div className="header-container">
				<Header />
			</div>
			<div className="main-content h-[700px] flex items-center justify-center">
				<div className="w-[282px] h-[333px] items-center justify-center flex flex-col">
					{/* 체크 아이콘 */}
					<div className="flex items-center justify-center w-[132px] h-[132px] mb-[20px]">
						<FaCheck className="w-[100px] h-[100px] text-[#26408B]" />
					</div>
					<p className="text-[22px] font-bold">회원가입이 완료 되었습니다.</p>
					<p className="mt-[20px]">회원가입을 축하합니다.</p>
					<p className="mb-[62px]">알차고 실속있는 서비스로 찾아뵙겠습니다.</p>
					<Button
						type={'signupSuccess'}
						text={'시작하기'}
						onClick={() => {
							nav('/login');
						}}
					/>
				</div>
			</div>
			<div className="footer-container">
				<Footer />
			</div>
		</div>
	);
};

export default SignupSuccess;
