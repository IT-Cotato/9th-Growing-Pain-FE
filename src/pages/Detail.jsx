import { useParams } from 'react-router-dom';
import { useContext } from "react";
import { GrowthStateContext } from "../App";
import EditApply from "../components/EditApply";

const data = [
  {
    "companyName": "토스",
    "jobPart": "프론트엔드",
    "memberId": 1,
    "jobApplications": [
      {
        "applicationType": "DOCUMENT",
        "place": "Office",
        "result": "PENDING",
        "submissionStatus": true,
        "applicationStartDate": "2024-08-01",
        "applicationCloseDate": "2024-08-15",
        "memberId": 1,
        "jobPostId": 0,
        "applicationDetails": [
          {
            "title": "자기를 소개해보세요.",
            "content": "저는 신짱구 5살입니다."
          },
          {
            "title": "Resume",
            "content": "This is the content of the resume."
          }
        ]
      },
      {
        "applicationType": "INTERVIEW",
        "place": "Online",
        "result": "PENDING",
        "submissionStatus": true,
        "applicationStartDate": "2024-08-01",
        "applicationCloseDate": "2024-08-15",
        "memberId": 1,
        "jobPostId": 0,
        "applicationDetails": [
          {
            "title": "자기를 소개해보세요.",
            "content": "저는 신짱구 5살입니다."
          },
          {
            "title": "Portfolio",
            "content": "This is the content of the portfolio."
          }
        ]
      }
    ]
  },
  {
    "companyName": "네이버",
    "jobPart": "AE",
    "memberId": 1,
    "jobApplications": [
      {
        "applicationType": "DOCUMENT",
        "place": "Office",
        "result": "PENDING",
        "submissionStatus": true,
        "applicationStartDate": "2024-08-01",
        "applicationCloseDate": "2024-08-15",
        "memberId": 1,
        "jobPostId": 1,
        "applicationDetails": [
          {
            "title": "자기를 소개해보세요.",
            "content": "저는 신짱구 5살입니다."
          },
          {
            "title": "네이버",
            "content": "주니어 네이버 재밌엇는데,,,"
          }
        ]
      },
      {
        "applicationType": "INTERVIEW",
        "place": "Online",
        "result": "PENDING",
        "submissionStatus": true,
        "applicationStartDate": "2024-08-01",
        "applicationCloseDate": "2024-08-15",
        "memberId": 1,
        "jobPostId": 1,
        "applicationDetails": [
          {
            "title": "자기를 소개해보세요.",
            "content": "저는 신짱구 5살입니다."
          },
          {
            "title": "Portfolio",
            "content": "This is the content of the portfolio."
          }
        ]
      }
    ]
  },
]

const Detail = () => {
  const params = useParams();
  const [memberData, jobPostData, applicationData, applicaionDetailData, infoData] = useContext(GrowthStateContext);

  const currentId = Number(params.id)

  // 현재 페이지에 해당하는 정보만 필터링
  const filteredPostData = jobPostData.filter(post => post.job_post_id === currentId);
  const filteredApplicationData = applicationData.filter(app => app.job_post_id === currentId);
  const filteredApplicationDetailData = applicaionDetailData.filter(detail => detail.job_post_id === currentId);

  // 지원현황 데이터 생성
  const handleSave = (savedData) => {
    // 저장 로직 구현
    console.log('저장된 데이터:', savedData);
  };

  return (
    <div>
      <EditApply 
        jobPostData={filteredPostData[0]} 
        applicationData={filteredApplicationData}
        applicaionDetailData={filteredApplicationDetailData}
        onSave={handleSave}
      />
    </div>
  );
}

export default Detail;