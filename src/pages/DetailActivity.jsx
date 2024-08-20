import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import EditActivity from "../components/EditActivity";
import instance from "../api/instance";

const DetailActivity = () => {
  const params = useParams();
	const nav = useNavigate();
  const [data, setData] = useState();

	const currentId = parseInt(params.id)

	// 서버로부터 데이터 GET
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get(`/api/activity-logs/${currentId}`);
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

	// 활동 데이터 수정
	const handleUpdate = async (updatedData) => {
    try {
      const response = await instance.patch(`/api/activity-logs/${currentId}`, updatedData);
      if (response.data && response.data.status === 'success') {
        console.log("수정된 데이터:", response.data.data);
				window.location.reload();
      } else {
        console.error('활동 수정 중 오류 발생:', response.data.message);
      }
    } catch (error) {
      console.error('활동 수정 중 오류 발생:', error);
    }
  };

  return (
    <div className="h-[90%]">
			{data ? (
				<EditActivity editData={data} onSubmit={handleUpdate} />
			) : (
				<p>활동을 찾을 수 없습니다.</p>
			)}
    </div>
  );
}

export default DetailActivity;