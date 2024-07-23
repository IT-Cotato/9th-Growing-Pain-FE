import { GrowthStateContext } from "../App";
import { useContext } from "react";
import HeaderMyPage from "../components/HeaderMyPage";
import MenubarMyPage from "../components/MenubarMyPage";

const Support = () => {
  const [memberData, jobPostData, applicationData, applicaionDetailData, infoData] = useContext(GrowthStateContext);

  return (
    <div>
      <div className="mx-[70px] mt-[53px]">
        <div>
          <HeaderMyPage name={infoData.name} company={infoData.company} />
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