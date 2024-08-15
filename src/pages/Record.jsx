import EditApply from "../components/EditApply";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Record = () => {
  // 초기 데이터
  const initialData = [
    {
      companyName: "",
      jobPart: "",
      memberId: "greatsounds613@gmail.com",
      jobApplications: [
        {
          id: 0,
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
              id: 0,
              title: "",
              content: ""
            }
          ]
        }
      ]
    }
  ];

  const [data, setData] = useState(initialData);

  // 저장 후 데이터 초기화를 위한 상태
  const [shouldReset, setShouldReset] = useState(false);

  // 데이터 생성
  const handleSave = async (savedData) => {
    try {
      // axios를 사용하여 POST 요청을 보냄
      const response = await axios.post(
        'https://5ecc59c9-4083-4c5b-9271-8a9fca225f08.mock.pstmn.io/api/job-posts/', 
        savedData, // 전송할 데이터
        {
          headers: {
            'Content-Type': 'application/json', // JSON 형식으로 데이터를 전송
          },
        }
      );

      // 서버 응답을 처리
      console.log('서버 응답:', response.data);

      // 데이터를 저장한 후에 초기화 플래그 설정
      setShouldReset(true);

    } catch (error) {
      // 에러 처리
      console.error('데이터 전송 중 오류 발생:', error);
    }
  };

  return (
    <div>
      <EditApply
        jobPostData={data[0]}
        applicationData={data[0].jobApplications}
        onSave={handleSave}
      />
    </div>
  );
};

export default Record;
