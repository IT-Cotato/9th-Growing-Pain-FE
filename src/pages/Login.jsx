import Header from '../components/Header';
import Footer from '../components/Footer';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import kakaoLogin from '../assets/images/kakaoLogin.png';
import googleLogin from '../assets/images/googleLogin.png';
import { FiUser, FiLock } from 'react-icons/fi';

const Login = () => {
	const [id, setId] = useState('');
	const [pw, setPw] = useState('');
	const [loginCheck, setLoginCheck] = useState(false); // 로그인 상태 체크

	// MockId & Pw
	const realId = 'yongari';
	const realPw = '111234asdf';

	const login = () => {
		if (realId === id && realPw === pw) {
			nav('/');
		} else {
			alert('아이디 혹은 비밀번호가 일치하지 않습니다.');
		}
	};

	const nav = useNavigate();

	return (
		<div>
			<div className="header-container">
				<Header />
			</div>
			<div className="main-content h-[700px] flex flex-col items-center">
				<h4 className="text-[24px] font-bold mt-[90px]">로그인</h4>
				{/* 로그인 창 전체 */}
				<div className="w-[483px] h-[371px]">
					{/* 아이디, 비밀번호 입력 */}
					<div className="w-[483px] h-[129px] mt-[60px] flex">
						<section className="rounded-[10px]">
							<InputField
								place={'login'}
								type={'text'}
								icon={FiUser}
								placeholderText={'아이디'}
								onChange={(e) => {
									setId(e.target.value);
								}}
								onKeyDown={(e) => {
									if (e.key === 'Enter') {
										login();
									}
								}}
							/>
							<InputField
								place={'login'}
								type={'password'}
								icon={FiLock}
								className="mt-[16px]"
								placeholderText={'비밀번호'}
								onChange={(e) => {
									setPw(e.target.value);
								}}
								onKeyDown={(e) => {
									if (e.key === 'Enter') {
										login();
									}
								}}
							/>
						</section>
						<section className="ml-[16px]">
							<Button text={'로그인'} type={'loginPage'} onClick={login} />
						</section>
					</div>
					{/* 소셜 로그인 */}
					<div className="border-t border-[#D7D7D7] mt-[30px] pt-[30px]">
						<img alt="kakaoLogin" className="cursor-pointer mb-[13px]" src={kakaoLogin} />
						<img alt="googleLogin" className="cursor-pointer" src={googleLogin} />
					</div>
					{/* 아이디 찾기, 비번찾기, 회원가입 */}
					<div className="flex mt-[33px] justify-center w-[270px] items-center mx-auto text-[16px] font-normal">
						<div
							className="border-r-[0.5px] border-[#A4A4A4] pr-3 cursor-pointer hover:underline"
							onClick={() => nav('/FindID')}
						>
							아이디 찾기
						</div>
						<div
							className="border-r-[0.5px] border-[#A4A4A4] pr-3 ml-3 cursor-pointer hover:underline"
							onClick={() => nav('/FindPassword')}
						>
							비밀번호 찾기
						</div>
						<div className="ml-3 cursor-pointer hover:underline" onClick={() => nav('/signup')}>
							회원가입
						</div>
					</div>
				</div>
			</div>
			<div className="footer-container">
				<Footer />
			</div>
		</div>
	);
};

export default Login;
