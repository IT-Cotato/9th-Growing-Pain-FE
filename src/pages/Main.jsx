import Header from "../components/Header";
import Footer from "../components/Footer";
import logo from '../assets/images/logo.png';
import main_1 from '/images/main_1.png'
import main_2 from '/images/main_2.png'
import main_3 from '/images/main_3.png'
import main_4 from '/images/main_4.png'
import main_5 from '/images/main_5.png'
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

// 06.28 헤더 컴포넌트 및 푸터 컴포넌트 확인을 위해 임시로 작성
const Main = () => {
  const nav = useNavigate();

  return (
    <div>
      <div className="header-container">
        <Header type={"main"} />
      </div>
      <div className="main-content h-[5000px]">
        <div className="first-content h-[900px] bg-gradient-to-t from-[#D5E0FF] from-10% to-90% flex flex-col items-center">
          <img className="header-logo-img w-60 h-60 mt-[100px]" src={logo} alt="Logo" />
          <div className="font-semibold text-[66px] mt-[60px] mb-[21px]">성장통</div>
          <div className="font-medium text-[29px]">나의 취준기록이 담긴 단 하나의 플랫폼</div>
          <div className="font-medium text-[29px]">함께 성장통을 나누며 성장해볼까요?</div>
          <div className="start-button mt-[30px]">
            <Button type={"main"} text={"무료로 시작하기"} onClick={()=>nav('/login')} />
          </div>
        </div>
        <div className="image-content flex flex-col gap-y-[70px] items-center">
          <img className="w-[80%] mt-[120px]" src={main_1} alt="Main" />
          <img className="w-[80%]" src={main_2} alt="Main" />
          <img className="w-[80%]" src={main_3} alt="Main" />
          <img className="w-[80%]" src={main_4} alt="Main" />
          <img className="w-[80%]" src={main_5} alt="Main" />
          <div className="start-button mt-[30px]">
            <Button type={"main"} text={"무료로 시작하기"} onClick={()=>nav('/login')} />
          </div>
        </div>
      </div>
      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );
}

export default Main;