import { useParams } from "react-router-dom";
import EditActivity from "../components/EditActivity";

const activityData = [
	{
		activity_id: 0,
		activity_name: '청소년 봉사활동',
		activity_period: '2024.09-2024.10',
		role: ['국어 과목 과외'],
		activity_type: '봉사활동',
		contribution: 50,
		activity_url: 'https://www.edu.com',
	},
	{
		activity_id: 1,
		activity_name: '지하철 봉사활동',
		activity_period: '2024.09-2024.12',
		role: ['어른신 돕기'],
		activity_type: '봉사활동',
		contribution: 70,
		activity_url: 'https://www.sub.com',
	},
	{
		activity_id: 2,
		activity_name: '지하철 봉사활동',
		activity_period: '2024.09-2024.12',
		role: ['어른신 돕기'],
		activity_type: '봉사활동',
		contribution: 100,
		activity_url: 'https://www.sub.com',
	},
	{
		activity_id: 3,
		activity_name: '취준기록프로젝트',
		activity_period: '2024.09-2024.12',
		role: ['프론트엔드'],
		activity_type: '프로젝트',
		contribution: 60,
		activity_url: 'https://www.sub.com',
	},
	{
		activity_id: 4,
		activity_name: '브랜딩',
		activity_period: '2024.09-2024.12',
		role: ['아이디어'],
		activity_type: '공모전',
		contribution: 30,
		activity_url: 'https://www.sub.com',
	},
	{
		activity_id: 5,
		activity_name: '공모전',
		activity_period: '2024.09-2024.12',
		role: ['아이디어'],
		activity_type: '공모전',
		contribution: 80,
		activity_url: 'https://www.sub.com',
	},
	{
		activity_id: 6,
		activity_name: '서포터즈',
		activity_period: '2024.09-2024.12',
		role: ['SNS'],
		activity_type: '대외활동',
		contribution: 50,
		activity_url: 'https://www.sub.com',
	},
	{
		activity_id: 7,
		activity_name: '대외활동',
		activity_period: '2024.09-2024.12',
		role: ['아이디어'],
		activity_type: '대외활동',
		contribution: 80,
		activity_url: 'https://www.sub.com',
	},
	{
		activity_id: 8,
		activity_name: '집가고싶다이미집이지만더강력하게집에가고싶다',
		activity_period: '2024.09-2024.12',
		role: ['아이디어'],
		activity_type: '여분통',
		contribution: 80,
		activity_url: 'https://www.sub.com',
	},
];

const DetailActivity = () => {
  const params = useParams();

  const filterdData = activityData.filter((data) => data.activity_id === parseInt(params.id));

  return (
    <div className="h-[90%]">
      <EditActivity editData={filterdData[0]} />
    </div>
  );
}

export default DetailActivity;