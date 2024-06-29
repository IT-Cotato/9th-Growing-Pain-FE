import Header from "../components/Header";
import Footer from "../components/Footer";

const About = () => {
  return (
    <div>
      <div className="header-container">
        <Header />
      </div>
      <div className="main-content h-[700px]">Login 페이지입니다</div>
      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );
}

export default About;