import { useContext } from "react";
import { GrowthStateContext } from "../App";
import { useNavigate } from "react-router-dom";

import GrowthApplyItem from "../components/GrowthApplyItem";
import UseCalendar from "../components/UseCalendar";
import { getDDay } from "../utils/getDDay";
import ActivityCategory from "../components/ActivityCategory";
import { activityInfo } from "../utils/activity-info";

const GrowthRecord = () => {
  const nav = useNavigate();
  const [, applicationData] = useContext(GrowthStateContext);   // 지원현황 데이터 불러오기

  // 지원 현황 데이터를 마감일이 짧게 남은 순서대로 정렬
  const sortedApplicationData = [...applicationData].sort((a, b) => {
    return getDDay(a.job_post_dead_line) - getDDay(b.job_post_dead_line);
  }).slice(0, 6);     // 가장 짧은 6개만 노출

  return (
    <div>
      <div className="top-container flex w-[1632px] h-[603px]">
        <div className="applicaion-list-container flex-column w-[1010px] ml-[70px] mr-[50px] mt-[42px]">
          <div className="title-bar h-[21px] mb-[26px] text-[18px] flex justify-between font-medium">
            지원현황
            <div className="plus-text cursor-pointer" onClick={() => nav('/user/growth/apply')}>더보기</div>
          </div>
          <div className="application-item w-[1010px] h-[508px] flex gap-[37px] gap-y-[30px] flex-wrap justify-center">
            {sortedApplicationData.map((application)=> {
              // 아이템 순회하면서 렌더링
              return (
                <GrowthApplyItem
                  key={application.Application}
                  company={application.company_name}
                  position={application.job_part}
                  submitDocument={application.submission_status}
                  submitInterview={application.interview_submission_status}
                  deadline={getDDay(application.job_post_dead_line)}
                />
              );
            })}
          </div>
        </div>
        <div className="calendar-container w-[500px] h-[540px] mr-[72px] mt-[42px]">
          <UseCalendar />
        </div>
      </div>
      <div className="activity-container h-[350px] ml-[70px] mr-[70px] mt-[54px]">
        <div className="title-bar h-[21px] mb-[26px] text-[18px] flex justify-between font-medium">활동기록</div>
        <div className="activity-item h-[340px] flex gap-[21px]">
          {activityInfo.map((info) => {
            return (
              <ActivityCategory key={info.key} category={info.category} image={info.image} content={info.content} navLink={info.nav} />
            );
          })}
        </div>
      </div> 
    </div>
  );
}

export default GrowthRecord;