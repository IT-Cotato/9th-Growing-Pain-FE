import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import EditApply from "../components/EditApply";
import instance from '../api/instance';
import axios from 'axios';

// 초기 데이터
const initialData = {
  companyName: '',
  jobPart: '',
  jobApplications: [
    {
      id: 0,
      applicationType: 'DOCUMENT',
      place: '',
      result: 'PENDING',
      submissionStatus: 'PENDING',
      applicationStartDate: '',
      applicationCloseDate: '',
      memberId: 0,
      jobPostId: 0,
      applicationDetails: [
        {
          id: 0,
          title: '',
          content: '',
        },
      ],
    },
  ],
};

const Detail = () => {
  const params = useParams();
  const [data, setData] = useState(initialData);

  const currentId = Number(params.id)

  // 서버로부터 데이터 GET
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get(`/api/job-posts/${currentId}`);
        if (response.data && response.data.status === 'success') {
          console.log(response.data.data);
          setData(response.data.data);  // 받아온 데이터를 applyData 상태에 저장
        }
      } catch (error) {
        console.error('Error fetching apply data:', error);
      }
    };

    fetchData();
  }, []);
  
  const filteredPostData = {
    companyName: data.companyName,
    jobPart: data.jobPart,
  };

  const filteredApplicationData = data.jobApplications;

  // 지원현황 데이터 업데이트
  const handleUpdate = async (savedData) => {
    try {
      // axios를 사용하여 PUT 요청을 보냄
      const response = await axios.patch(
        `https://5ecc59c9-4083-4c5b-9271-8a9fca225f08.mock.pstmn.io/api/job-posts/${currentId}`, 
        savedData, // 전송할 데이터
        {
          headers: {
            'Content-Type': 'application/json', // JSON 형식으로 데이터를 전송
            'Authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJJZCI6MSwiZW1haWwiOiJleGFtcGxlVXNlckBuYXZlci5jb20iLCJyb2xlIjoiUk9MRV9VU0VSIiwiaWF0IjoxNzIxNzM1NTgxLCJleHAiOjE3MjE3MzczODF9.yKw542QCNfAgPwHd_HsmNKvHjXfmytq2gv8aMVfcgu0',
          },
        }
      );
  
      // 서버 응답을 처리
      console.log('서버 응답:', response.data);
    } catch (error) {
      // 에러 처리
      console.error('데이터 전송 중 오류 발생:', error);
    }
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