import EditActivity from "../components/EditActivity";
import instance from '../api/instance';
import { useLocation } from "react-router-dom";

const categoryMap = {
	extracurricular: 'EXTRA_ACTIVITY',
	service: 'VOLUNTEER_ACTIVITY',
	project: 'PROJECT',
	contest: 'COMPETITIONS',
	club: 'CLUB',
	extra: 'EXTRA_SPACE',
};

const NewActivity = () => {
	const location = useLocation();
	const category = categoryMap[location.pathname.split('/')[4]];

  // 새로운 활동 데이터를 생성
	const handleCreate = async (savedData) => {
		console.log('저장할 데이터:', savedData);

		try {
			const response = await instance.post('/api/activity-logs', savedData);
			console.log('서버 응답:', response.data);
		} catch (error) {
			console.error('에러 발생:', error);
		}
	};

  return (
    <div className="h-[90%]">
      <EditActivity onSubmit={handleCreate} category={category} />
    </div>
  );
}

export default NewActivity;