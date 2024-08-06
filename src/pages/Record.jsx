import EditApply from "../components/EditApply";
import { useContext } from "react";
import { GrowthStateContext } from "../App";

const Record = () => {
  const [memberData, jobPostData, applicationData, applicaionDetailData, infoData] = useContext(GrowthStateContext);

  // 지원현황 데이터 생성
  const handleSave = (savedData) => {
    // 저장 로직 구현
    console.log('저장된 데이터:', savedData);
  };

  return (
    <div>
      <EditApply
        onSave={handleSave}
      />
    </div>
  );
}

export default Record;