import NewApply from "../components/NewApply";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Record = () => {
  // 초기 데이터
  const initialData = [
    {
      companyName: "",
      jobPart: "",
      memberId: localStorage.getItem('nickname'),
      jobApplications: [
        {
          id: 0,
          applicationType: "DOCUMENT",
          place: "",
          result: "PENDING",
          submissionStatus: "PENDING",
          applicationStartDate: "",
          applicationCloseDate: "",
          memberId: localStorage.getItem('nickname'),
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

  // 데이터 생성
  const handleSave = async (savedData) => {
		const accessToken = localStorage.getItem('accessToken');
    try {
      // axios를 사용하여 POST 요청을 보냄
      const response = await axios.post(
        'api/job-posts', 
        savedData, // 전송할 데이터
        {
          headers: {
            'Content-Type': 'application/json', // JSON 형식으로 데이터를 전송
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // 서버 응답을 처리
      console.log('서버 응답:', response.data);

      alert('저장 완료!');

    } catch (error) {
      // 에러 처리
      console.error('데이터 전송 중 오류 발생:', error);
    }
  };

  return (
    <div>
      <NewApply
        jobPostData={data[0]}
        applicationData={data[0].jobApplications}
        onSave={handleSave}
      />
    </div>
  );
};

export default Record;
