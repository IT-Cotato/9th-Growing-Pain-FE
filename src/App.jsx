import './App.css';
import Router from './routes/Router';
import React, { createContext } from 'react';

const memberData = [
	{
		emailId: "greatsounds613@gmail.com",		// 식별을 위한 아이디
		name: "haydenCho",					// 닉네임 (이것도 식별 가능)
		field: "IT",								// 분야
		job: "대학생",							// 직업
		belong: "덕성여자대학교",		// 소속
		profile: "PUBLIC",					// 프로필 공개 여부
		oauthId: 1234,							// OAuth 인증 일련번호
		oauthType: "GOOGLE",				// Oauth 인증 방법
		delete: false,							// 삭제 여부
	},
	{
		emailId: "kang061313@gmail.com",
		name: "yongaricode",
		field: "Front-End",
		job: "대학생",
		belong: "이화여자대학교",
		profile: "PRIVATE",
		oauthId: 5681,
		oauthType: "KAKAO",
		delete: false,
	},
];

export const GrowthStateContext = createContext();

function App() {
	const userInfo = true;

	return (
		<>
			<GrowthStateContext.Provider value={memberData}>
				<Router userInfo={userInfo} />
			</GrowthStateContext.Provider>
		</>
	);
}

export default App;
