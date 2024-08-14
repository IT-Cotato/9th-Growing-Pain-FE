import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import InputField from '../components/InputField';
import Button from '../components/Button';
import axios from 'axios';
import { data } from 'autoprefixer';

const Signup = () => {
	const [emailFirst, setEmailFirst] = useState(''); // 이메일 앞부분 저장
	const [userEmail, setUserEmail] = useState(''); // 전체 이메일 저장
	const [password, setPassword] = useState(''); // 비밀번호 저장
	const [confirmPassword, setConfirmPassword] = useState(''); // 비밀번호 확인 저장

	// Error 관련 State
	const [emailError, setEmailError] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const [confirmError, setConfirmError] = useState('');

	// 중복 검사 State
	const [isEmailCheck, setIsEmailCheck] = useState(false); // 아이디 중복 검사 여부
	const [isEmailAvailable, setIsEmailAvailable] = useState(false); // 아이디 사용 여부

	const navigate = useNavigate();

	// 이메일 도메인 선택하면 전체 이메일을 만들고, userEmail에 저장
	const onChangeEmailHandler = (e) => {
		const emailDomain = e.target.value;
		const completeEmail = `${emailFirst}@${emailDomain}`;
		setUserEmail(completeEmail);
	};

	// 비밀번호 확인하기 버튼 누르면 -> 인수로 비밀번호와 비밀번호 확인하기 전달하면서 passwordCheckHandler 부름
	const onChangePasswordHandler = () => {
		passwordCheckHandler(password, confirmPassword);
	};

	// const emailCheckHandler = async (userEmail) => {
	// 	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 이메일 형식
	// 	if (!emailRegex.test(userEmail)) {
	// 		setEmailError('유효한 이메일 주소를 입력해주세요.');
	// 		setIsEmailAvailable(false);
	// 		return false;
	// 	}

	// 	try {
	// 		const response = await axios.post(
	// 			`http://43.201.210.211:8080/api/auth/login/general`,
	// 			{
	// 				params: {
	// 					id: userEmail,
	// 					password: '',
	// 				},
	// 			},
	// 			{
	// 				headers: {
	// 					'Content-Type': 'application/json',
	// 				},
	// 			},
	// 		);

	// 		if (response.data.available) {
	// 			setEmailError('사용 가능한 이메일입니다.');
	// 			setIsEmailCheck(true);
	// 			setIsEmailAvailable(true);
	// 			return true;
	// 		} else {
	// 			setEmailError('이미 사용중인 이메일입니다.');
	// 			setIsEmailAvailable(false);
	// 			return false;
	// 		}
	// 	} catch (error) {
	// 		alert('서버 오류입니다. 관리자에게 문의하세요');
	// 		console.error(error);
	// 		return false;
	// 	}
	// };

	// 비밀번호가 형식에 맞는지 && 비밀번호와 비밀번호 확인하기 두 개의 비밀번호가 일치하는지
	const passwordCheckHandler = (password, confirmPassword) => {
		const passwordRegex = /^[a-z0-9]{8,16}$/;
		if (!passwordRegex.test(password)) {
			setPasswordError('영문과 숫자를 포함하여 8~16자의 비밀번호를 입력해주세요.');
			return false;
		} else if (password !== confirmPassword) {
			setConfirmError('비밀번호가 일치하지 않습니다.');
			return false;
		} else {
			setPasswordError('');
			setConfirmError('');
			alert('사용가능한 비밀번호입니다!');
			return true;
		}
	};

	// 회원가입 버튼 누르면 -> 이메일 중복확인, 비밀번호 확인, 닉네임 중복확인을 모두 했는지 확인. -> payload에 사용자 정보 넣어서 백엔드에게 보내기
	const signupHandler = async (e) => {
		e.preventDefault();

		// const isPasswordValid = passwordCheckHandler(password, confirmPassword);
		// if (!isPasswordValid) return;

		// const emailCheckResult = await emailCheckHandler(userEmail);
		// if (!emailCheckResult) return;

		// if (!isEmailCheck || !isEmailAvailable) {
		// 	alert('이메일 중복 검사를 해주세요');
		// 	return;
		// }

		const payload = {
			email: userEmail,
			password: password,
		};

		try {
			const response = await axios.post(
				'api/auth/login/general',
				{
					email: userEmail,
					password: password,
				},
				{
					headers: {
						'Content-Type': 'application/json',
					},
				},
			);

			if (response.status === 200) {
				console.log('기본정보 입력 받기 성공!', response);
				localStorage.setItem('accessToken', response.data.data.accessToken);
				localStorage.setItem('refreshToken', response.data.data.refreshToken);
				navigate('/addInfo');
			}
		} catch (error) {
			console.error('오류 발생:', error);
			alert('회원가입에 실패하였습니다. 다시 시도해주세요');
		}
	};

	return (
		<div>
			<div className="header-container">
				<Header />
			</div>
			<div className="main-content h-[700px] mt-[177px] flex flex-col items-center mb-[300px]">
				<h4 className="text-[22px] font-bold">회원가입</h4>
				<div className="mt-[55px]">
					{/* 이메일  */}
					<section className="flex items-center">
						<InputField
							place={'signupEmail'}
							placeholderText={'이메일'}
							onChange={(e) => setEmailFirst(e.target.value)}
							showError={`${emailError ? 'true' : ''}`}
							className={`${emailError ? 'bg-[#FFEEEE] rounded-[10px]' : 'bg-[#EDEDED] rounded-[10px]'}`}
						/>
						<p className="text-[17px] font-normal text-[#888888] ml-[12px]">@</p>
						<select
							onChange={onChangeEmailHandler}
							className="bg-[#EDEDED] w-[261px] h-[48px] rounded-[10px] pl-[20px] ml-[13px] mr-[20px] text-[17px] font-normal text-[#888888]"
						>
							<option value="" hidden>
								선택
							</option>
							<option>gmail.com</option>
							<option>naver.com</option>
							<option>kakao.com</option>
							<option>outlook.com</option>
						</select>
						<Button text={'중복확인'} onClick={() => alert('사용가능한 이메일입니다!')} />
					</section>
					{/* 이메일 오류 메시지 */}
					{/* <p className="text-red-500 text-[12px] flex"> {emailError ? emailError : '\u00A0'}</p> */}
					{/* 비밀번호  */}
					<section className="flex gap-[20px] mt-[22px]">
						<InputField
							place={'signup'}
							placeholderText={'비밀번호 (8~16자의 영문,숫자)'}
							type="password"
							onChange={(e) => setPassword(e.target.value)}
							showError={`${passwordError === '영문과 숫자를 포함하여 8~16자의 비밀번호를 입력해주세요.' ? 'true' : ''}`}
							className={`${passwordError ? 'bg-[#FFEEEE] rounded-[10px]' : 'bg-[#EDEDED] rounded-[10px]'}`}
						/>
					</section>
					{/* 비밀번호 오류 메세지 */}
					{/* <p className="text-red-500 text-[12px] flex">{passwordError ? passwordError : '\u00A0'}</p> */}
					{/* 비밀번호 확인 */}
					<section className="flex gap-[20px] mt-[22px]">
						<InputField
							place={'signup'}
							placeholderText={'비밀번호 확인'}
							type="password"
							onChange={(e) => setConfirmPassword(e.target.value)}
							showError={`${confirmError === '비밀번호가 일치하지 않습니다.' ? 'true' : ''}`}
							className={`${confirmError ? 'bg-[#FFEEEE] rounded-[10px]' : 'bg-[#EDEDED] rounded-[10px]'}`}
						/>
						<Button text={'확인하기'} onClick={onChangePasswordHandler} />
					</section>
					{/* 비밀번호와 비밀번호 확인하기 일치하지 않음 오류메세지 */}
					<p className="text-red-500 text-[12px] flex">{confirmError}</p>
				</div>
				<div>
					{/* 회원가입 버튼 */}
					<div className="mt-[62px]">
						<Button type={'signupSuccess'} text={'다음'} onClick={signupHandler} />
					</div>
				</div>
			</div>
			<div className="footer-container">
				<Footer />
			</div>
		</div>
	);
};

export default Signup;
