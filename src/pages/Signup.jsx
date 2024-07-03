import Header from '../components/Header';
import Footer from '../components/Footer';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
	const [userId, setUserId] = useState(''); // 아이디 저장
	const [password, setPassword] = useState(''); // 비밀번호 저장
	const [confirmPassword, setConfirmPassword] = useState(''); // 비밀번호 확인 저장
	const [nickname, setNickname] = useState(''); // 닉네임 저장
	const [field, setField] = useState(''); // 분야 저장
	const [job, setJob] = useState(''); // 직업 저장
	const [department, setDepartment] = useState(''); // 소속 저장

	const [departmentOptions, setDepartmentOptions] = useState([]); // 직업에 따른 소속 배열

	const nav = useNavigate();

	// 비밀번호가 형식에 맞는지 and 비밀번호와 비밀번호 확인이 일치하는지
	const handlePassword = () => {
		// 영문 소문자와 숫자 조합, 8자 이상 16자 이하
		const passwordRegex = /^[a-z0-9]{8,16}$/;

		if (!passwordRegex.test(password)) {
			alert('비밀번호가 8~16자의 영문 소문자와 숫자로만 이루어져야 합니다.');
			return;
		} else if (password !== confirmPassword) {
			alert('비밀번호가 일치하지 않습니다.');
			return;
		} else {
			alert('확인되었습니다!');
		}
	};

	// 직업에 따른 소속 선택 배열이 달라짐
	const changeJob = (event) => {
		const selectedJob = event.target.value;
		setJob(selectedJob);

		switch (selectedJob) {
			case '대학생':
				setDepartmentOptions(['숙명여자대학교', '이화여자대학교', '홍익대학교']);
				break;
			case '졸업생':
				setDepartmentOptions(['숙명여자대학교', '이화여자대학교', '홍익대학교']);
				break;
			case '취준생':
				setDepartmentOptions(['IT기업', '제조업체', '금융회사']);
				break;
			case '이직 준비중':
				setDepartmentOptions(['디자인팀', '마케팅팀', '연구개발팀']);
				break;
			default:
				setDepartmentOptions([]);
				break;
		}
	};

	// 회원가입 버튼을 누르면
	const handleSubmit = () => {
		console.log('아이디:', userId);
		console.log('비밀번호:', password);
		console.log('닉네임:', nickname);
		console.log('분야:', field);
		console.log('선택된 직업:', job);
		console.log('선택된 소속:', department);
		// 나중에 API

		alert('회원가입이 성공적으로 완료되었습니다!');
		nav('/');
	};

	return (
		<div>
			<div className="header-container">
				<Header />
			</div>
			<div className="main-content h-[700px] flex flex-col items-center mb-[300px]">
				<h4 className="text-[24px] font-bold mt-[90px]">회원가입</h4>
				{/* 가입창 전체 */}
				<div className="w-[703px] h-[650px] mt-[61px]">
					{/* 기본정보 */}
					<div className="mb-[44px]">
						<div className="flex pl-[5px] mb-[16px]">기본정보</div>
						{/* 아이디 */}
						<section className="flex gap-[20px]">
							<InputField place={'signup'} placeholderText={'아이디'} onChange={(e) => setUserId(e.target.value)} />
							{/* 중복확인 버튼 */}
							<Button text={'중복확인'} />
						</section>
						{/* 비밀번호 */}
						<section className="flex gap-[20px] mt-[16px]">
							<InputField
								place={'signup'}
								placeholderText={'비밀번호 (8~16자의 영문,숫자)'}
								type="password"
								onChange={(e) => setPassword(e.target.value)}
							/>
						</section>
						{/* 비밀번호 확인하기 */}
						<section className="flex gap-[20px] mt-[16px]">
							<InputField
								place={'signup'}
								placeholderText={'비밀번호 확인'}
								type="password"
								onChange={(e) => setConfirmPassword(e.target.value)}
							/>
							<Button text={'확인하기'} onClick={handlePassword} />
						</section>
					</div>
					{/* 추가정보 */}
					<div>
						<div className="flex pl-[5px] mb-[16px]">추가정보</div>
						{/* 닉네임 */}
						<section className="flex gap-[20px]">
							<InputField place={'signup'} placeholderText={'닉네임'} onChange={(e) => setNickname(e.target.value)} />
							{/* 중복확인 버튼 */}
							<Button text={'중복확인'} />
						</section>
						{/* 분야 */}
						<section className="flex gap-[20px] mt-[16px]">
							<InputField place={'signup'} placeholderText={'분야'} onChange={(e) => setField(e.target.value)} />
						</section>
						<section className="flex gap-[20px] mt-[16px]">
							{/* 직업 선택 */}
							<select
								className="w-[126px] h-[56px] border border-[#26408B] rounded-[10px] pl-[20px] placeholder:text-[17px] cursor-pointer"
								onChange={changeJob}
								value={job}
							>
								<option value="" defaultValue disabled hidden>
									직업
								</option>
								<option>대학생</option>
								<option>졸업생</option>
								<option>취준생</option>
								<option>이직 준비중</option>
							</select>
							{/* 소속 선택 */}
							<select
								className="w-[402px] h-[56px] border border-[#26408B] rounded-[10px] pl-[20px] placeholder:text-[17px] cursor-pointer"
								onChange={(e) => setDepartment(e.target.value)}
								value={department}
							>
								<option value="" defaultValue disabled hidden>
									소속을 선택해주세요
								</option>
								{departmentOptions.map((option, index) => (
									<option key={index}>{option}</option>
								))}
							</select>
						</section>
						<section className="flex items-center justify-center mt-[70px]">
							<Button type={'signupPage'} text={'회원가입'} onClick={handleSubmit} />
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
