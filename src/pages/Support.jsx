import HeaderMyPage from "../components/HeaderMyPage";
import MenubarMyPage from "../components/MenubarMyPage";

const Support = () => {

  return (
    <div>
      <div className="mx-[70px] mt-[53px]">
        <div>
          <HeaderMyPage />
        </div>
        <div className="mypage-content-container flex-col">
          <div className="menubar">
            <MenubarMyPage />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;