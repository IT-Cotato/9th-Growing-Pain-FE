import Header from "../components/Header";
import Footer from "../components/Footer";

// 06.28 헤더 컴포넌트 및 푸터 컴포넌트 확인을 위해 임시로 작성
const Main = () => {
  return (
    <div>
      <div className="header-container">
        <Header />
      </div>
      <div className="main-content h-[700px]">Main 페이지입니다</div>
      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );
}

export default Main;