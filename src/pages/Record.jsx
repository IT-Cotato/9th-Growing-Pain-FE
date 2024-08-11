import EditApply from "../components/EditApply";
import { useState, useEffect } from "react";

// 초기 데이터
const initialData = [
  {
    companyName: "",
    jobPart: "",
    memberId: "greatsounds613@gmail.com",
    jobApplications: [
      {
        applicationType: "DOCUMENT",
        place: "",
        result: "PENDING",
        submissionStatus: "PENDING",
        applicationStartDate: "",
        applicationCloseDate: "",
        memberId: "greatsounds613@gmail.com",
        jobPostId: 0,
        applicationDetails: [
          {
            title: "",
            content: ""
          }
        ]
      }
    ]
  }
];

const Record = () => {
  const [data, setData] = useState(initialData);

  // 지원 내역 데이터를 병합하여 저장하는 함수
  const handleSave = (savedData) => {
    console.log('저장된 데이터:', savedData);
  };

  // 렌더링
  return (
    <div>
      <EditApply
        jobPostData={initialData[0]}
        applicationData={initialData[0].jobApplications}
        onSave={handleSave}
      />
    </div>
  );
};

export default Record;
