import { useParams } from "react-router-dom";
import EditActivity from "../components/EditActivity";

const activityData = [
	{
		activity_id: 0,
		activity_name: '청소년 봉사활동',
		activity_period: '2024.09-2024.10',
		role: '국어 과목 과외',
		activity_type: '봉사활동',
		contribution: 50,
		activity_url: 'https://www.edu.com',
		result: "어쩌구 저쩌구 제법 성공적이다",
		content: "청소년 봉사활동을 했다!",
	},
	{
		activity_id: 1,
		activity_name: '지하철 봉사활동',
		activity_period: '2024.09-2024.12',
		role: '어른신 돕기',
		activity_type: '봉사활동',
		contribution: 70,
		activity_url: 'https://www.sub.com',
		result: "더 멋진 사회인이 된 것 같다",
		content: "지하철에서 어르신을 도와드렸다 히히",
	},
	{
		activity_id: 2,
		activity_name: '지하철 봉사활동',
		activity_period: '2024.09-2024.12',
		role: '어른신 돕기',
		activity_type: '봉사활동',
		contribution: 100,
		activity_url: 'https://www.sub.com',
		result: "봉사 천재가 된 것 같다",
		content: "어르신을 또 도와드렸다!",
	},
	{
		activity_id: 3,
		activity_name: '취준기록프로젝트',
		activity_period: '2024.09-2024.12',
		role: '프론트엔드',
		activity_type: '프로젝트',
		contribution: 60,
		activity_url: 'https://www.sub.com',
		result: "성공적이다 코쓱",
		content: "우리 취준기록프로젝트 만들었다 짱이지 이 페이지들을 봐 대박임...",
	},
	{
		activity_id: 4,
		activity_name: '브랜딩',
		activity_period: '2024.09-2024.12',
		role: '아이디어',
		activity_type: '공모전',
		contribution: 30,
		activity_url: 'https://www.sub.com',
		result: "광탈!",
		content: "나는 브랜딩쪽은 아닌 것 같다",
	},
	{
		activity_id: 5,
		activity_name: '공모전',
		activity_period: '2024.09-2024.12',
		role: '아이디어',
		activity_type: '공모전',
		contribution: 80,
		activity_url: 'https://www.sub.com',
		result: "입상",
		content: "내가 버스를 탄 건 아닐까...?",
	},
	{
		activity_id: 6,
		activity_name: '서포터즈',
		activity_period: '2024.09-2024.12',
		role: 'SNS',
		activity_type: '대외활동',
		contribution: 50,
		activity_url: 'https://www.sub.com',
		result: "시도했다는 것에 의의를 두자",
		content: "처음이니까...",
	},
	{
		activity_id: 7,
		activity_name: '대외활동',
		activity_period: '2024.09-2024.12',
		role: '아이디어',
		activity_type: '대외활동',
		contribution: 80,
		activity_url: 'https://www.sub.com',
		result: "틸락",
		content: "탈락도 락이다...",
	},
	{
		activity_id: 8,
		activity_name: '집가고싶다이미집이지만더강력하게집에가고싶다',
		activity_period: '2024.09-2024.12',
		role: '아이디어',
		activity_type: '여분통',
		contribution: 80,
		activity_url: 'https://www.sub.com',
		result: "광광",
		content: "이제 할말도 없다...",
	},
];

const DetailActivity = () => {
  const params = useParams();

  const filteredData = activityData.filter((data) => data.activity_id === parseInt(params.id));
	console.log(filteredData.role);

	// 활동 데이터 수정
	const handleUpdate = (updatedData) => {
    console.log("수정된 데이터:", updatedData);
  };

  return (
    <div className="h-[90%]">
			{filteredData.length > 0 ? (
				<EditActivity editData={filteredData[0]} onSubmit={handleUpdate} />
			) : (
				<p>활동을 찾을 수 없습니다.</p>
			)}
    </div>
  );
}

export default DetailActivity;