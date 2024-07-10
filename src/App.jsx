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

const jobPostData = [
	{
		job_post_id: 0,
		member_id: "greatsounds613@gmail.com",
		company_name: "(주) 회사이름",
		job_part: "프론트엔드",
	},
	{
		job_post_id: 1,
		member_id: "greatsounds613@gmail.com",
		company_name: "(주) 종로 어쩌구",
		job_part: "AE",
	},
	{
		job_post_id: 2,
		member_id: "greatsounds613@gmail.com",
		company_name: "(주) 도봉 어쩌구",
		job_part: "PM",
	},
	{
		job_post_id: 3,
		member_id: "greatsounds613@gmail.com",
		company_name: "(주) 강남구 어쩌구",
		job_part: "UI/UX 디자이너",
	},
	{
		job_post_id: 4,
		member_id: "greatsounds613@gmail.com",
		company_name: "(주) 강북구청",
		job_part: "프론트엔드",
	},
	{
		job_post_id: 5,
		member_id: "greatsounds613@gmail.com",
		company_name: "(주) 양주시청",
		job_part: "AE",
	},
	{
		job_post_id: 6,
		member_id: "greatsounds613@gmail.com",
		company_name: "(주) 의정부시청",
		job_part: "백엔드",
	}
];

const applicationData = [
	{
		job_post_id: 0,															// 공고 id
		job_application_id: 0,											// 지원현황 id (공고로 먼저 구분)
		application_type: "DOCUMENT",								// 지원현황 타입
		created_at: new Date().getTime(),						// 작성날짜
		updated_at: new Date().getTime(),						// 수정날짜
		place: "서초구",														// 장소
		result: "PENDING",													// 결과
		submission_status: false,										// 제출여부(지원현황 타입에 따라 다름)
		job_post_start_date: new Date("2024-07-06").getTime(),	// 공고 시작 날짜
		job_post_dead_line: new Date("2024-10-23").getTime(),		// 공고 마감 날짜
	},
	{
		job_post_id: 0,
		job_application_id: 1,	
		application_type: "INTERVIEW",
		created_at: new Date().getTime(),
		updated_at: new Date().getTime(),
		place: "서초구",
		result: "PENDING",
		submission_status: false,
		job_post_start_date: new Date("2024-07-06").getTime(),
		job_post_dead_line: new Date("2024-10-23").getTime(),
	},
	{
		job_post_id: 1,
		job_application_id: 0,
		application_type: "DOCUMENT",
		created_at: new Date().getTime(),
		updated_at: new Date().getTime(),
		place: "종로구",
		result: "PASSED",
		submission_status: true,
		job_post_start_date: new Date("2024-07-06").getTime(),
		job_post_dead_line: new Date("2024-09-19").getTime(),
	},
	{
		job_post_id: 1,
		job_application_id: 1,
		application_type: "INTERVIEW",
		created_at: new Date().getTime(),
		updated_at: new Date().getTime(),
		place: "종로구",
		result: "PASSED",
		submission_status: true,
		job_post_start_date: new Date("2024-07-06").getTime(),
		job_post_dead_line: new Date("2024-09-19").getTime(),
	},
	{
		job_post_id: 2,
		job_application_id: 0,
		application_type: "INTERVIEW",
		created_at: new Date().getTime(),
		updated_at: new Date().getTime(),
		place: "도봉구",
		result: "FAILED",
		submission_status: true,
		job_post_start_date: new Date("2024-07-04").getTime(),
		job_post_dead_line: new Date("2024-07-14").getTime(),
	},
	{
		job_post_id: 3,
		job_application_id: 0,
		application_type: "INTERVIEW",
		created_at: new Date().getTime(),
		updated_at: new Date().getTime(),
		place: "강남구",
		result: "PASSED",
		submission_status: true,
		job_post_start_date: new Date("2024-07-05").getTime(),
		job_post_dead_line: new Date("2024-08-15").getTime(),
	},
	{
		job_post_id: 4,
		job_application_id: 0,
		application_type: "DOCUMENT",
		created_at: new Date().getTime(),
		updated_at: new Date().getTime(),
		place: "강북구",
		result: "PENDING",
		submission_status: true,
		job_post_start_date: new Date("2024-07-06").getTime(),
		job_post_dead_line: new Date("2024-09-17").getTime(),
	},
	{
		job_post_id: 5,
		job_application_id: 0,
		application_type: "DOCUMENT",
		created_at: new Date().getTime(),
		updated_at: new Date().getTime(),
		place: "양주시",
		result: "PASSED",
		submission_status: true,
		job_post_start_date: new Date("2024-07-02").getTime(),
		job_post_dead_line: new Date("2024-07-13").getTime(),
	},
	{
		job_post_id: 6,
		job_application_id: 0,
		application_type: "DOCUMENT",
		created_at: new Date().getTime(),
		updated_at: new Date().getTime(),
		place: "의정부시",
		result: "PASSED",
		submission_status: true,
		job_post_start_date: new Date("2024-07-05").getTime(),
		job_post_dead_line: new Date("2024-07-26").getTime(),
	},
];

const applicaionDetailData = [
	{
		job_post_id: 0,
		application_detail_id: 0,
		title: "1번 지원서 서류 1",
		content: "1번 지원서 서류 1입니다",
	},
	{
		job_post_id: 0,
		application_detail_id: 0,
		title: "1번 지원서 서류 2",
		content: "1번 지원서 서류 2입니다",
	},
	{
		job_post_id: 0,
		application_detail_id: 1,
		title: "1번 지원서 면접 1",
		content: "1번 지원서 면접 1입니다",
	},
	{
		job_post_id: 1,
		application_detail_id: 0,
		title: "2번 지원서 서류 1",
		content: "2번 지원서 서류 1입니다",
	},
	{
		job_post_id: 1,
		application_detail_id: 1,
		title: "2번 지원서 면접 1",
		content: "2번 지원서 면접 1입니다",
	},
];

export const GrowthStateContext = createContext();

function App() {
	const userInfo = true;

	return (
		<>
			<GrowthStateContext.Provider value={[memberData, jobPostData, applicationData, applicaionDetailData]}>
				<Router userInfo={userInfo} />
			</GrowthStateContext.Provider>
		</>
	);
}

export default App;
