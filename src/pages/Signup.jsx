import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import InputField from '../components/InputField';
import Button from '../components/Button';

const Signup = () => {
	const [emailFirst, setEmailFirst] = useState(''); // 이메일 앞부분 저장
	const [userEmail, setUserEmail] = useState(''); // 전체 이메일 저장
	const [password, setPassword] = useState(''); // 비밀번호 저장
	const [confirmPassword, setConfirmPassword] = useState(''); // 비밀번호 확인 저장
	const [nickname, setNickname] = useState(''); // 닉네임 저장
	const [field, setField] = useState(''); // 분야 저장
	const [job, setJob] = useState(''); // 직업 저장
	const [department, setDepartment] = useState(''); // 소속 저장

	// Error 관련 State
	const [emailError, setEmailError] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const [nicknameError, setNicknameError] = useState('');
	const [confirmError, setConfirmError] = useState('');

	// 중복 검사 State
	const [isEmailCheck, setIsEmailCheck] = useState(false); // 아이디 중복 검사 여부
	const [isEmailAvailable, setIsEmailAvailable] = useState(false); // 아이디 사용 여부
	const [isNicknameCheck, setIsNicknameCheck] = useState(false); // 닉네임 중복 검사 여부
	const [isNicknameAvailable, setIsNicknameAvailable] = useState(false); // 닉네임 사용 여부

	const [isLogin, setIsLogin] = useState(false);
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

	// 이메일 중복확인 버튼 누르면 -> userEmail이 형식에 맞는지 확인 -> 이미 사용중인 이메일인지 검사
	const emailCheckHandler = async (userEmail) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 이메일 형식
		if (!emailRegex.test(userEmail)) {
			setEmailError('유효한 이메일 주소를 입력해주세요.');
			setIsEmailAvailable(false);
			return false;
		}
		try {
			const response = await fetch('http://3.35.80.178:8080/api/path/join/email', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email: userEmail }),
			});
			const responseData = await response.json();
			if (responseData.available) {
				setEmailError('사용 가능한 이메일입니다.');
				setIsEmailCheck(true);
				setIsEmailAvailable(true);
				return true;
			} else {
				setEmailError('이미 사용중인 이메일입니다.');
				setIsEmailAvailable(false);
				return false;
			}
		} catch (error) {
			alert('서버 오류입니다. 관리자에게 문의하세요');
			console.error(error);
			return false;
		}
	};

	// 닉네임 중복확인 버튼 누르면 -> 닉네임이 3글자 이상인지 확인 -> 이미 사용중인 닉네임인지 검사
	const nicknameCheckHandler = async (nickname) => {
		const nicknameRegex = nickname.length >= 3;
		if (!nicknameRegex) {
			setNicknameError('최소 3글자 이상 입력해주세요.');
			setIsNicknameAvailable(false);
			return false;
		}
		try {
			const response = await fetch('http://3.35.80.178:8080/api/path/join/name', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ name: nickname }),
			});
			const responseData = await response.json();
			if (responseData.available) {
				setNicknameError('사용 가능한 닉네임입니다.');
				setIsNicknameCheck(true);
				setIsNicknameAvailable(true);
				return true;
			} else {
				setNicknameError('이미 사용중인 닉네임입니다.');
				setIsNicknameAvailable(false);
				return false;
			}
		} catch (error) {
			alert('서버 오류입니다. 관리자에게 문의하세요');
			console.error(error);
			return false;
		}
	};

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
	// -> sessionStorage에 유저의 이메일과 닉네임 저장 -> 회원가입 성공 페이지로 이동
	const signupHandler = async (e) => {
		e.preventDefault();

		const emailCheckResult = await emailCheckHandler(userEmail);
		if (!emailCheckResult) return;

		if (!isEmailCheck || !isEmailAvailable) {
			alert('이메일 중복 검사를 해주세요');
			return;
		}

		const passwordCheckResult = passwordCheckHandler(password, confirmPassword);
		if (!passwordCheckResult) return;

		const nicknameCheckReesult = nicknameCheckHandler(nickname);
		if (!nicknameCheckReesult) return;

		if (!isNicknameCheck || !isNicknameAvailable) {
			alert('닉네임 중복 검사를 해주세요');
			return;
		}

		const payload = {
			email: userEmail,
			password: password,
			name: nickname,
			field: field,
			job: job,
			belong: department,
		};

		try {
			const response = await fetch('http://3.35.80.178:8080/api/path/join', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(payload),
			});

			const data = await response.json();

			if (response.status === 201) {
				console.log('성공!');
				localStorage.setItem('loginEmail', userEmail); // 유저 이메일 저장
				localStorage.setItem('nickname', nickname); // 유저 닉네임 저장
				// localStorage.setItem('accessToken', accessToken);
				// localStorage.setItem('refreshToken', refreshToken)
				setIsLogin(true);
				navigate('/signupSuccess'); // 회원가입 성공시 페이지 이동
			} else if (response.status === 400) {
				alert(`회원가입 실패: ${data.message}`);
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
			<div className="main-content h-[700px] flex flex-col items-center mb-[300px]">
				<h4 className="text-[22px] font-bold mt-[69px]">회원가입</h4>
				<div className="w-[703px] h-[650px] mt-[93px]">
					<div className="mb-[40px]">
						{/* 기본 정보 */}
						<div className="flex pl-[4px] mb-[16px] text-[17px]">기본정보</div>
						{/* 이메일  */}
						<section className="flex items-center">
							<InputField
								place={'signupEmail'}
								placeholderText={'이메일'}
								onChange={(e) => setEmailFirst(e.target.value)}
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
							<Button text={'중복확인'} onClick={() => emailCheckHandler(userEmail)} />
						</section>
						{/* 이메일 오류 메시지 */}
						<p className="text-red-500 text-[12px] flex">{emailError}</p>
						{/* 비밀번호  */}
						<section className="flex gap-[20px] mt-[12px]">
							<InputField
								place={'signup'}
								placeholderText={'비밀번호 (8~16자의 영문,숫자)'}
								type="password"
								onChange={(e) => setPassword(e.target.value)}
							/>
						</section>
						{/* 비밀번호 오류 메세지 */}
						<p className="text-red-500 text-[12px] flex">{passwordError}</p>
						{/* 비밀번호 확인 */}
						<section className="flex gap-[20px] mt-[12px]">
							<InputField
								place={'signup'}
								placeholderText={'비밀번호 확인'}
								type="password"
								onChange={(e) => setConfirmPassword(e.target.value)}
							/>
							<Button text={'확인하기'} onClick={onChangePasswordHandler} />
						</section>
						{/* 비밀번호와 비밀번호 확인하기 일치하지 않음 오류메세지 */}
						<p className="text-red-500 text-[12px] flex">{confirmError}</p>
					</div>
					{/* 추가정보 */}
					<div>
						<div className="flex pl-[5px] mb-[16px]">추가정보</div>
						{/* 닉네임 */}
						<section className="flex gap-[20px]">
							<InputField place={'signup'} placeholderText={'닉네임'} onChange={(e) => setNickname(e.target.value)} />
							<Button text={'중복확인'} onClick={() => nicknameCheckHandler(nickname)} />
						</section>
						{/* 닉네임 중복 메세지 */}
						<p className="text-red-500 text-[12px] flex">{nicknameError}</p>
						{/* 분야 */}
						<section className="flex gap-[20px] mt-[12px]">
							<InputField place={'signup'} placeholderText={'분야'} onChange={(e) => setField(e.target.value)} />
						</section>
						{/* 직업 선택 */}
						<section className="flex gap-[18px] mt-[34px]">
							<select
								className="w-[126px] h-[48px] bg-[#EDEDED] text-[#888888] font-normal rounded-[10px] pl-[20px] placeholder:text-[17px] cursor-pointer"
								value={job}
								onChange={(e) => {
									setJob(e.target.value);
								}}
							>
								<option value="" hidden>
									직업
								</option>
								<option>대학생</option>
								<option>졸업생</option>
								<option>취준생</option>
								<option>이직 준비중</option>
							</select>
							{/* 소속 */}
							<InputField
								className="flex pl-[5px]"
								type={'text'}
								place={'singupBelong'}
								placeholderText={'소속을 입력해주세요'}
								onChange={(e) => {
									setDepartment(e.target.value);
								}}
							/>
						</section>
						{/* 회원가입 버튼 */}
						<section className="flex items-center justify-center mt-[78px]">
							<Button type={'signupPage'} text={'회원가입'} onClick={signupHandler} />
						</section>
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
