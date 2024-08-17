import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiLock } from 'react-icons/fi';
import Header from '../components/Header';
import Footer from '../components/Footer';
import InputField from '../components/InputField';
import Button from '../components/Button';
import instance from '../api/instance';

import kakaoLogin from '../assets/images/kakaoLogin.png';
import googleLogin from '../assets/images/googleLogin.png';

const Login = () => {
	const [id, setId] = useState('');
	const [pw, setPw] = useState('');
	const [isLogin, setIsLogin] = useState(false); // 로그인 상태 체크

	const REST_API_KEY = import.meta.env.VITE_KAKAO_KEY;
	const REDIRECT_URI = 'http://localhost:5173/oauth';
	const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

	const kakaoLoginHandler = () => {
		window.location.href = link;
	};

	const navigate = useNavigate();

	const login = async (e) => {
		e.preventDefault();
		if (!id) {
			return alert('이메일을 입력하세요.');
		} else if (!pw) {
			return alert('비밀번호를 입력하세요.');
		}

		const payload = {
			email: id,
			password: pw,
		};

		// try {
		// 	const response = await axios.post('/api/auth/login/general', payload, {
		// 		headers: {
		// 			'Content-Type': 'application/json',
		// 		},
		// 	});

		// 	if (response.status === 200) {
		// 		console.log('성공!');
		// 		console.log(response);
		// 		console.log(response.data);
		// 		localStorage.setItem('accessToken', response.data.data.accessToken);
		// 		localStorage.setItem('refreshToken', response.data.data.refreshToken);
		// 		// 로그인 상태 업데이트
		// 		setIsLogin(true);
		// 		navigate('/user/dashboard'); // 회원가입 성공시 페이지 이동
		// 	}
		// } catch (error) {
		// 	if (error.response) {
		// 		// 서버가 응답을 보냈지만 2xx 범위를 벗어나는 상태 코드
		// 		console.error('Error response:', error.response);
		// 		if (error.response.status === 401) {
		// 			alert('존재하지 않는 이메일입니다.');
		// 		} else if (error.response.status === 402) {
		// 			alert('비밀번호가 틀립니다.');
		// 		} else {
		// 			alert('로그인 중 오류가 발생했습니다.');
		// 		}
		// 	} else if (error.request) {
		// 		// 요청이 만들어졌으나 응답을 받지 못함
		// 		console.error('Error request:', error.request);
		// 		alert('서버와의 통신 중 오류가 발생했습니다.');
		// 	} else {
		// 		// 오류를 발생시킨 요청 설정 중에 문제가 발생
		// 		console.error('Error:', error.message);
		// 		alert('로그인 중 오류가 발생했습니다.');
		// 	}
		// }

		try {
			// 기존 axios.post 대신 instance.post 사용
			const response = await instance.post('/api/auth/login/general', payload);

			if (response.status === 200) {
				console.log('성공!');
				console.log(response);
				console.log(response.data);
				// localStorage.setItem('accessToken', response.data.data.accessToken);
				// localStorage.setItem('refreshToken', response.data.data.refreshToken);
				// 로그인 상태 업데이트
				setIsLogin(true);
				console.log(REST_API_KEY);
				navigate('/user/dashboard'); // 회원가입 성공시 페이지 이동
			}
		} catch (error) {
			if (error.response) {
				// 서버가 응답을 보냈지만 2xx 범위를 벗어나는 상태 코드
				console.error('Error response:', error.response);
				if (error.response.status === 401) {
					alert('존재하지 않는 이메일입니다.');
				} else if (error.response.status === 402) {
					alert('비밀번호가 틀립니다.');
				} else {
					alert('로그인 중 오류가 발생했습니다.');
				}
			} else if (error.request) {
				// 요청이 만들어졌으나 응답을 받지 못함
				console.error('Error request:', error.request);
				alert('서버와의 통신 중 오류가 발생했습니다.');
			} else {
				// 오류를 발생시킨 요청 설정 중에 문제가 발생
				console.error('Error:', error.message);
				alert('로그인 중 오류가 발생했습니다.');
			}
		}
	};

	return (
		<div>
			<div className="header-container">
				<Header />
			</div>
			<div className="main-content h-[700px] flex flex-col items-center">
				<h4 className="text-[22px] font-bold mt-[90px]">로그인</h4>
				{/* 로그인 창 전체 */}
				<div className="w-[483px] h-[371px]">
					{/* 이메일, 비밀번호 입력 */}
					<div className="w-[483px] mt-[65px] flex">
						<section className="rounded-[10px]">
							<InputField
								place={'login'}
								type={'text'}
								icon={FiUser}
								placeholderText={'이메일'}
								onChange={(e) => {
									setId(e.target.value);
								}}
								onKeyDown={(e) => {
									if (e.key === 'Enter') {
										login(e);
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
										login(e);
									}
								}}
							/>
						</section>
						<section className="ml-[16px]">
							<Button text={'로그인'} type={'loginPage'} onClick={login} />
						</section>
					</div>
					{/* 소셜 로그인 */}
					<div className="border-t border-[#D7D7D7] mt-[29.5px] pt-[29.5px]">
						<img alt="kakaoLogin" className="cursor-pointer mb-[13px]" src={kakaoLogin} onClick={kakaoLoginHandler} />
						<img alt="googleLogin" className="cursor-pointer" src={googleLogin} />
					</div>
					{/* 아이디 찾기, 비번찾기, 회원가입 */}
					<div className="flex mt-[34px] justify-center w-[183px] items-center mx-auto text-[16px] font-normal">
						<div
							className="border-r-[0.5px] border-[#A4A4A4] pr-3.5 cursor-pointer hover:underline"
							onClick={() => navigate('/FindPassword')}
						>
							비밀번호 찾기
						</div>
						<div className="ml-3.5 cursor-pointer hover:underline" onClick={() => navigate('/signup')}>
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
