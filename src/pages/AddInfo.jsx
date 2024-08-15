import Header from '../components/Header';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const AddInfo = () => {
	const location = useLocation();
	const { email, password } = location.state || {};

	const [nickname, setNickname] = useState(''); // 닉네임 저장
	const [field, setField] = useState(''); // 분야 저장
	const [job, setJob] = useState(''); // 직업 저장
	const [department, setDepartment] = useState(''); // 소속 저장

	// Error 관련 State
	const [nicknameError, setNicknameError] = useState('');
	const [confirmError, setConfirmError] = useState('');

	// 중복 검사 State
	const [isNicknameCheck, setIsNicknameCheck] = useState(false); // 닉네임 중복 검사 여부
	const [isNicknameAvailable, setIsNicknameAvailable] = useState(false); // 닉네임 사용 여부

	const [isLogin, setIsLogin] = useState(false);
	const navigate = useNavigate();

	// 닉네임 중복확인 버튼 누르면 -> 닉네임이 3글자 이상인지 확인 -> 이미 사용중인 닉네임인지 검사
	const nicknameCheckHandler = async (nickname) => {
		const nicknameRegex = nickname.length >= 3;
		if (!nicknameRegex) {
			setNicknameError('최소 3글자 이상 입력해주세요.');
			setIsNicknameAvailable(false);
			return false;
		}
		try {
			const response = await axios.post(
				'/api/path/join/name',
				{ name: nickname },
				{
					headers: {
						'Content-Type': 'application/json',
					},
				},
			);

			if (response.data.available) {
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

	// 회원가입 버튼 누르면 -> 이메일 중복확인, 비밀번호 확인, 닉네임 중복확인을 모두 했는지 확인. -> payload에 사용자 정보 넣어서 백엔드에게 보내기
	// -> sessionStorage에 유저의 이메일과 닉네임 저장 -> 회원가입 성공 페이지로 이동
	const signupHandler = async (e) => {
		e.preventDefault();

		// const nicknameCheckResult = await nicknameCheckHandler(nickname);
		// if (!nicknameCheckResult) return;

		// if (!isNicknameCheck || !isNicknameAvailable) {
		// 	alert('닉네임 중복 검사를 해주세요');
		// 	return;
		// }

		const payload = {
			name: nickname,
			field: field,
			job: job,
			belong: department,
		};

		const accessToken = localStorage.getItem('accessToken');

		try {
			const response = await axios.post('/api/auth/complete-signup', payload, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${accessToken}`,
				},
			});

			if (response.status === 200) {
				console.log('성공!');
				localStorage.setItem('nickname', nickname);
				setIsLogin(true);
				navigate('/signupSuccess'); // 회원가입 성공시 페이지 이동
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
				<h4 className="text-[22px] font-bold">추가정보 정보 입력</h4>
				<div className="mt-[55px]">
					{/* 닉네임 */}
					<section className="flex gap-[20px]">
						<InputField
							place={'signup'}
							placeholderText={'닉네임'}
							onChange={(e) => setNickname(e.target.value)}
							className={`${nicknameError ? 'bg-[#FFEEEE] rounded-[10px]' : 'bg-[#EDEDED] rounded-[10px]'}`}
							showError={`${nicknameError ? 'true' : ''}`}
						/>
						<Button text={'중복확인'} onClick={() => nicknameCheckHandler(nickname)} />
					</section>
					{/* 닉네임 중복 메세지 */}
					<p className="text-red-500 text-[12px] flex">{nicknameError ? nicknameError : '\u00A0'}</p>
					{/* 분야 */}
					<section className="flex gap-[20px] mt-[22px]">
						<InputField place={'signup'} placeholderText={'분야'} onChange={(e) => setField(e.target.value)} />
					</section>
					{/* 직업 선택 */}
					<section className="flex gap-[18px] mt-[36px]">
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
							<option value={'COLLEGE_STUDENT'}>대학생</option>
							<option value={'GRADUATE'}>졸업생</option>
							<option value={'JOB_SEEKER'}>취준생</option>
							<option value={'PREPARING_FOR_JOB_CHANGE'}>이직 준비중</option>
						</select>
						{/* 소속 */}
						<InputField
							className="flex"
							type={'text'}
							place={'singupBelong'}
							placeholderText={'소속을 입력해주세요'}
							onChange={(e) => {
								setDepartment(e.target.value);
							}}
						/>
					</section>
				</div>
				<div className="mt-[62px]">
					<Button type={'signupSuccess'} text={'시작하기'} onClick={signupHandler} />
				</div>
			</div>
		</div>
	);
};

export default AddInfo;
