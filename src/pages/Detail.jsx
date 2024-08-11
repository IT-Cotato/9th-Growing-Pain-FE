import { useParams } from 'react-router-dom';
import EditApply from "../components/EditApply";

const data = [
  {
    "companyName": "토스",
    "jobPart": "프론트엔드",
    "memberId": "greatsounds613@gmail.com",
    "jobApplications": [
      {
        "applicationType": "DOCUMENT",
        "place": "서초구",
        "result": "PASSED",
        "submissionStatus": "FAILED",
        "applicationStartDate": "2024-07-06",
        "applicationCloseDate": "2024-10-23",
        "memberId": "greatsounds613@gmail.com",
        "jobPostId": 0,
        "applicationDetails": [
          {
            "title": "1번 지원서 서류 1",
            "content": "1번 지원서 서류 1입니다"
          },
          {
            "title": "1번 지원서 서류 2",
            "content": "1번 지원서 서류 2입니다"
          },
          {
            "title": "1번 지원서 서류 3",
            "content": "1번 지원서 서류 3입니다"
          }
        ]
      },
      {
        "applicationType": "INTERVIEW",
        "place": "서초구",
        "result": "PENDING",
        "submissionStatus": "FAILED",
        "applicationStartDate": "2024-07-06",
        "applicationCloseDate": "2024-10-25",
        "memberId": "greatsounds613@gmail.com",
        "jobPostId": 0,
        "applicationDetails": [
          {
            "title": "1번 지원서 면접 1",
            "content": "1번 지원서 면접 1입니다"
          }
        ]
      },
      {
        "applicationType": "PEEDBACK",
        "place": "서초구",
        "result": "PENDING",
        "submissionStatus": "PASSED",
        "applicationStartDate": "2024-07-06",
        "applicationCloseDate": "2024-10-30",
        "memberId": "greatsounds613@gmail.com",
        "jobPostId": 0,
        "applicationDetails": [
          {
            "title": "1번 지원서 피드백 1",
            "content": "1번 지원서 피드백 1입니다"
          }
        ]
      }
    ]
  },
  {
    "companyName": "네이버",
    "jobPart": "AE",
    "memberId": "greatsounds613@gmail.com",
    "jobApplications": [
      {
        "applicationType": "DOCUMENT",
        "place": "종로구",
        "result": "PASSED",
        "submissionStatus": "PASSED",
        "applicationStartDate": "2024-07-06",
        "applicationCloseDate": "2024-09-19",
        "memberId": "greatsounds613@gmail.com",
        "jobPostId": 1,
        "applicationDetails": [
          {
            "title": "2번 지원서 서류 1",
            "content": "2번 지원서 서류 1입니다."
          }
        ]
      },
      {
        "applicationType": "INTERVIEW",
        "place": "종로구",
        "result": "PASSED",
        "submissionStatus": "PENDING",
        "applicationStartDate": "2024-07-06",
        "applicationCloseDate": "2024-09-19",
        "memberId": "greatsounds613@gmail.com",
        "jobPostId": 1,
        "applicationDetails": [
          {
            "title": "2번 지원서 면접 1",
            "content": "2번 지원서 면접 1입니다"
          }
        ]
      }
    ]
  },
  {
    "companyName": "카카오",
    "jobPart": "PM",
    "memberId": "greatsounds613@gmail.com",
    "jobApplications": [
      {
        "applicationType": "INTERVIEW",
        "place": "도봉구",
        "result": "FAILED",
        "submissionStatus": "PASSED",
        "applicationStartDate": "2024-07-04",
        "applicationCloseDate": "2024-08-17",
        "memberId": "greatsounds613@gmail.com",
        "jobPostId": 2,
        "applicationDetails": []
      }
    ]
  },
  {
    "companyName": "당근",
    "jobPart": "UI/UX 디자이너",
    "memberId": "greatsounds613@gmail.com",
    "jobApplications": [
      {
        "applicationType": "INTERVIEW",
        "place": "강남구",
        "result": "PASSED",
        "submissionStatus": "PASSED",
        "applicationStartDate": "2024-07-05",
        "applicationCloseDate": "2024-08-15",
        "memberId": "greatsounds613@gmail.com",
        "jobPostId": 3,
        "applicationDetails": []
      }
    ]
  },
  {
    "companyName": "배달의민족",
    "jobPart": "백엔드",
    "memberId": "greatsounds613@gmail.com",
    "jobApplications": [
      {
        "applicationType": "DOCUMENT",
        "place": "마포구",
        "result": "FAILED",
        "submissionStatus": "PASSED",
        "applicationStartDate": "2024-07-06",
        "applicationCloseDate": "2024-09-02",
        "memberId": "greatsounds613@gmail.com",
        "jobPostId": 4,
        "applicationDetails": []
      }
    ]
  },
  {
    "companyName": "쿠팡",
    "jobPart": "디자이너",
    "memberId": "greatsounds613@gmail.com",
    "jobApplications": [
      {
        "applicationType": "DOCUMENT",
        "place": "영등포구",
        "result": "PENDING",
        "submissionStatus": "FAILED",
        "applicationStartDate": "2024-07-02",
        "applicationCloseDate": "2024-09-25",
        "memberId": "greatsounds613@gmail.com",
        "jobPostId": 5,
        "applicationDetails": []
      },
      {
        "applicationType": "INTERVIEW",
        "place": "영등포구",
        "result": "PENDING",
        "submissionStatus": "FAILED",
        "applicationStartDate": "2024-07-02",
        "applicationCloseDate": "2024-09-25",
        "memberId": "greatsounds613@gmail.com",
        "jobPostId": 5,
        "applicationDetails": []
      }
    ]
  }
];


const Detail = () => {
  const params = useParams();

  const currentId = Number(params.id)

  // 현재 페이지에 해당하는 정보만 필터링
  const filteredCompanyData = data.find(company =>
    company.jobApplications.some(application => application.jobPostId === currentId)
  );
  
  const filteredPostData = {
    companyName: filteredCompanyData.companyName,
    jobPart: filteredCompanyData.jobPart,
  };

  const filteredApplicationData = filteredCompanyData.jobApplications.filter(
    app => app.jobPostId === currentId
  );

  // 지원현황 데이터 업데이트
  const handleUpdate = (savedData) => {
    console.log(savedData);
    // 업데이트 코드
  };

  return (
    <div>
      <EditApply 
        jobPostData={filteredPostData} 
        applicationData={filteredApplicationData}
        onSave={handleUpdate}
      />
    </div>
  );
}

export default Detail;