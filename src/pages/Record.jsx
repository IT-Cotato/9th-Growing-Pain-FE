import EditApply from "../components/EditApply";
import { useContext } from "react";
import { GrowthStateContext } from "../App";

const Record = () => {
  const [memberData, jobPostData, applicationData, applicaionDetailData, infoData] = useContext(GrowthStateContext);

  return (
    <div>
      {jobPostData.map((jobPost) => {
        const filteredPostData = jobPostData.filter(app => app.job_post_id === jobPost.job_post_id);
        const filteredApplicationData = applicationData.filter(app => app.job_post_id === jobPost.job_post_id);
        const filteredApplicationDetailData = applicaionDetailData.filter(detail => detail.job_post_id === jobPost.job_post_id);

        <EditApply key={jobPost.job_post_id} jobPostData={filteredPostData} applicationData={filteredApplicationData} applicaionDetailData={filteredApplicationDetailData} />
      })}
    </div>
  );
}

export default Record;