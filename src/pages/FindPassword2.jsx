import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const FindPassword2 = () => {
	const nav = useNavigate();

	return (
		<div>
			<div className="header-container">
				<Header />
			</div>
			<div className="main-content h-[700px] flex flex-col items-center">
				<div className="w-[416px] h-[209px] mt-[210px]">
					<section className="flex flex-col items-center justify-center">
						<h4 className="text-[21px] font-bold">비밀번호 찾기</h4>
						<p className="text-[16px] font-normal mt-[20px]">
							고객님께 비밀번호를 재설정 할 수 있는 메일을 발송하였습니다.
						</p>
					</section>
					<section className="mt-[63px]">
						<button
							className="w-[276px] h-[40px] rounded-[10px] bg-[#26408B] text-white"
							onClick={() => {
								nav('/login');
							}}
						>
							확인
						</button>
						<p className="text-[14px] text-[#26408B] mt-[13px] font-normal hover:underline cursor-pointer">재전송</p>
					</section>
				</div>
			</div>
			<div className="footer-container">
				<Footer />
			</div>
		</div>
	);
};

export default FindPassword2;
