import { useParams } from 'react-router-dom';
import { useContext } from "react";
import { GrowthStateContext } from "../App";
import EditApply from "../components/EditApply";

const Detail = () => {
  const params = useParams();
  const [memberData, jobPostData, applicationData, applicaionDetailData, infoData] = useContext(GrowthStateContext);

  const currentId = Number(params.id)

  // 현재 페이지에 해당하는 정보만 필터링
  const filteredPostData = jobPostData.filter(post => post.job_post_id === currentId);
  const filteredApplicationData = applicationData.filter(app => app.job_post_id === currentId);
  const filteredApplicationDetailData = applicaionDetailData.filter(detail => detail.job_post_id === currentId);

  return (
    <div>
      <EditApply 
        jobPostData={filteredPostData[0]} 
        applicationData={filteredApplicationData}
        applicaionDetailData={filteredApplicationDetailData} 
      />
    </div>
  );
}

export default Detail;