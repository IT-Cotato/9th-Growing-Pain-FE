import './App.css';
import Router from './routes/Router';
import React, { createContext } from 'react';

const memberData = [
	{
		member_email: "greatsounds613@gmail.com",		// 식별을 위한 아이디
		member_name: "haydenCho",					// 닉네임 (이것도 식별 가능)
		member_field: "IT",								// 분야
		member_job: "대학생",							// 직업
		member_belong: "덕성여자대학교",		// 소속
		profile_status: "PUBLIC",					// 프로필 공개 여부
		oauth_id: 1234,							// OAuth 인증 일련번호
		auth_provider: "GOOGLE",				// Oauth 인증 방법
		deleted: false,							// 삭제 여부
	},
	{
		member_email: "kang061313@gmail.com",
		member_name: "yongaricode",
		member_field: "Front-End",
		member_job: "대학생",
		member_belong: "이화여자대학교",
		profile_status: "PRIVATE",
		oauth_id: 5681,
		auth_provider: "KAKAO",
		deleted: false,
	},
];

const applicationData = [
	{
		Application: 1,															// 지원현황 id	
		application_type: "DOCUMENT",								// 지원현황 타입
		created_at: new Date().getTime(),						// 작성날짜
		updated_at: new Date().getTime(),						// 수정날짜
		place: "서초구",														// 장소
		result: "PENDING",													// 결과
		content: "서초구 (주) 회사이름 서류 제출",	// 내용
		submission_status: false,										// 제출여부(서류)
		interview_submission_status: false,					// 제출여부(면접)
		company_name: "(주) 회사이름",							// 회사명
		job_part: "프론트엔드",											// 직무
		job_post_link: "http://www.frontend.com",		// 공고링크
		job_post_start_date: new Date("2024-07-06").getTime(),	// 공고 시작 날짜
		job_post_dead_line: new Date("2024-10-23").getTime(),		// 공고 마감 날짜
	},
	{
		Application: 2,
		application_type: "INTERVIEW",
		created_at: new Date().getTime(),
		updated_at: new Date().getTime(),
		place: "종로구",
		result: "PASSED",
		content: "종로구에서 면접 진행",
		submission_status: true,
		interview_submission_status: true,
		company_name: "(주) 종로 어쩌구",
		job_part: "AE",
		job_post_link: "http://www.applicationEngineer.com",
		job_post_start_date: new Date("2024-07-06").getTime(),
		job_post_dead_line: new Date("2024-09-19").getTime(),
	},
	{
		Application: 3,
		application_type: "INTERVIEW",
		created_at: new Date().getTime(),
		updated_at: new Date().getTime(),
		place: "도봉구",
		result: "FAILED",
		content: "도봉구에서 면접 진행",
		submission_status: true,
		interview_submission_status: true,
		company_name: "(주) 도봉 어쩌구",
		job_part: "PM",
		job_post_link: "http://www.productManager.com",
		job_post_start_date: new Date("2024-07-04").getTime(),
		job_post_dead_line: new Date("2024-07-14").getTime(),
	},
	
	{
		Application: 4,
		application_type: "INTERVIEW",
		created_at: new Date().getTime(),
		updated_at: new Date().getTime(),
		place: "강남구",
		result: "PASSED",
		content: "강남구에서 면접 진행",
		submission_status: true,
		interview_submission_status: true,
		company_name: "(주) 강남구 어쩌구",
		job_part: "UI/UX 디자이너",
		job_post_link: "http://www.uiuxDesigner.com",
		job_post_start_date: new Date("2024-07-05").getTime(),
		job_post_dead_line: new Date("2024-08-15").getTime(),
	},
	{
		Application: 5,
		application_type: "DOCUMENT",
		created_at: new Date().getTime(),
		updated_at: new Date().getTime(),
		place: "강북구",
		result: "PENDING",
		content: "강북구 서류 제출",
		submission_status: true,
		interview_submission_status: false,
		company_name: "(주) 강북구청",
		job_part: "프론트엔드",
		job_post_link: "http://www.frontend.com",
		job_post_start_date: new Date("2024-07-06").getTime(),
		job_post_dead_line: new Date("2024-09-17").getTime(),
	},
	{
		Application: 6,
		application_type: "DOCUMENT",
		created_at: new Date().getTime(),
		updated_at: new Date().getTime(),
		place: "양주시",
		result: "PASSED",
		content: "이제는 더이상 미룰 수 없다 나의 취업",
		submission_status: true,
		interview_submission_status: false,
		company_name: "(주) 양주시청",
		job_part: "AE",
		job_post_link: "http://www.help.com",
		job_post_start_date: new Date("2024-07-02").getTime(),
		job_post_dead_line: new Date("2024-07-13").getTime(),
	},
];

export const GrowthStateContext = createContext();

function App() {
	const userInfo = true;

	return (
		<>
			<GrowthStateContext.Provider value={[memberData, applicationData]}>
				<Router userInfo={userInfo} />
			</GrowthStateContext.Provider>
		</>
	);
}

export default App;
