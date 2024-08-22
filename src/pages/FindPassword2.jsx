import Header from '../components/Header';
import { useNavigate, useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
import { useState } from 'react';
import Button from '../components/Button';

const FindPassword2 = () => {
	const nav = useNavigate();
	const location = useLocation();
	const { password } = location.state || {};

	const msg = '임시 비밀번호를 사용해서 로그인 하신 후 바로 비밀번호를 변경하셔야\n 정상적으로 로그인이 가능합니다.';
	console.log(password);

	return (
		<div>
			<div className="header-container">
				<Header />
			</div>
			<div className="main-content h-[800px] flex items-center">
				<div className="mx-[570px] flex-1">
					<h1 className="text-[22px] font-bold">비밀번호 찾기</h1>
					<h1 className="text-[17px] font-medium mt-[20px]">
						안녕하세요 고객님, 요청하신 임시 비밀번호는 다음과 같습니다.
					</h1>
					<div className="flex flex-col h-[177px] bg-blue-commuBg mt-[36px] items-center">
						<div className="pt-[47px] flex gap-5 text-[17px] pb-[24px]">
							<h1 className="font-medium">임시 비밀번호:</h1>
							<h1 className="font-normal text-[#606060]">{password}</h1>
						</div>
						<Button
							type={'findPw'}
							text={'로그인 화면으로 바로가기'}
							onClick={() => {
								nav('/login');
							}}
						/>
					</div>
					<h1 className="mt-[24px] whitespace-pre-line text-[16px] text-[#818181]">{msg}</h1>
				</div>
			</div>
			<div className="footer-container">
				<Footer />
			</div>
		</div>
	);
};

export default FindPassword2;
