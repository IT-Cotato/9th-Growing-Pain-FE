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
	const handleUpdate = async (updatedData) => {
    console.log(updatedData);
    try {
      const response = await instance.patch(`/api/job-posts/${currentId}`, updatedData);
      if (response.data && response.data.status === 'success') {
        console.log("수정된 데이터:", response.data.data);
        window.location.reload();
      } else {
        console.error('지원현황 수정 중 오류 발생:', response.data.message);
      }
    } catch (error) {
      console.error('지원현황 수정 중 오류 발생:', error);
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