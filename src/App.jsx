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
		Application: 1,
		application_type: "DOCUMENT",
		created_at: new Date().getTime(),
		updated_at: new Date().getTime(),
		place: "서초구",
		result: "PENDING",
		content: "서초구 (주) 회사이름 서류 제출",
		submission_status: false,
		company_name: "(주) 회사이름",
		job_part: "프론트엔드",
		job_post_link: "http://www.frontend.com",
		job_post_start_date: new Date().getTime(),
		job_post_dead_line: new Date().getTime(),
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
		company_name: "(주) 종로 어쩌구",
		job_part: "AE",
		job_post_link: "http://www.applicationEngineer.com",
		job_post_start_date: new Date().getTime(),
		job_post_dead_line: new Date().getTime(),
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
		company_name: "(주) 종로 어쩌구",
		job_part: "PM",
		job_post_link: "http://www.productManager.com",
		job_post_start_date: new Date().getTime(),
		job_post_dead_line: new Date().getTime(),
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
