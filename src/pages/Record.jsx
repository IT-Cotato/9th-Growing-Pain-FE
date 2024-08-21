import NewApply from '../components/NewApply';
import { useState, useEffect } from 'react';
import instance from '../api/instance';

const Record = () => {
	// 초기 데이터
	const initialData = [
		{
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
		},
	];

	const [data, setData] = useState(initialData);

	// 데이터 생성
	const handleSave = async (savedData) => {
		console.log('저장할 데이터:', savedData);
		try {
			const response = await instance.post('/api/job-posts', savedData);
      window.location.reload();
			console.log('서버 응답:', response.data);
		} catch (error) {
			console.error('에러 발생:', error);
		}
	};

	return (
		<div>
			<NewApply jobPostData={data[0]} applicationData={data[0].jobApplications} onSave={handleSave} />
		</div>
	);
};

export default Record;
