import logo from '../assets/images/logo.png';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

const Header = ({type}) => {
	const nav = useNavigate();

	if (type==="main"){
		return (
			<div className="header-component h-[90px] flex w-full">
				{/* 헤더 로고 및 서비스 이름 -> 클릭하면 홈으로 라우팅 */}
				<div
					className="header-logo p-5 flex relative w-[10%] text-[20px] gap-1 items-center cursor-pointer text-navy-dark"
					onClick={() => nav('/')}
				>
					<img className="header-logo-img w-10 h-10" src={logo} alt="Logo" />
					성장통
				</div>
				{/* 헤더 메뉴바 */}
				<div className="haeder-menu flex relative items-center gap-5 w-[75%]">
					{/* 메뉴바는 버튼이 아니라 해당 부분 클릭하면 라우팅 -> div로 설정 */}
					<div className="cursor-pointer" onClick={() => nav('/')}>
						성장통 소개
					</div>
					<div className="cursor-pointer" onClick={() => nav('/user/growth')}>
						성장기록
					</div>
					<div className="cursor-pointer" onClick={() => nav('/user/community')}>
						커뮤니티
					</div>
				</div>
				{/* 헤더 버튼 - 로그인, 회원가입 */}
				<div className="header-button flex relative items-center justify-center gap-[20px] w-[15%]">
					<Button type="login" text="로그인" onClick={() => nav('/login')} />
					<Button type="signup" text="회원가입" onClick={() => nav('/signup')} />
				</div>
			</div>
		);
	}
	else {
		return (
			<div className="header-component h-[90px] flex w-full border-b border-[#C7C7C7]">
				{/* 헤더 로고 및 서비스 이름 -> 클릭하면 홈으로 라우팅 */}
				<div
					className="header-logo p-5 flex relative w-[10%] text-[20px] gap-1 items-center cursor-pointer text-navy-dark"
					onClick={() => nav('/')}
				>
					<img className="header-logo-img w-10 h-10" src={logo} alt="Logo" />
					성장통
				</div>
				{/* 헤더 메뉴바 */}
				<div className="haeder-menu flex relative items-center gap-5 w-[75%]">
					{/* 메뉴바는 버튼이 아니라 해당 부분 클릭하면 라우팅 -> div로 설정 */}
					<div className="cursor-pointer" onClick={() => nav('/')}>
						성장통 소개
					</div>
					<div className="cursor-pointer" onClick={() => nav('/user/growth')}>
						성장기록
					</div>
					<div className="cursor-pointer" onClick={() => nav('/user/community')}>
						커뮤니티
					</div>
				</div>
				{/* 헤더 버튼 - 로그인, 회원가입 */}
				<div className="header-button pr-[10px] flex relative items-center justify-center gap-[20px] w-[15%]">
					<Button type="login" text="로그인" onClick={() => nav('/login')} />
					<Button type="signup" text="회원가입" onClick={() => nav('/signup')} />
				</div>
			</div>
		);
	}
};

export default Header;
