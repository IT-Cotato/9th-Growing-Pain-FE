import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoutes';
import Main from '../pages/Main';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Dashboard from '../pages/Dashboard';
import GrowthRecord from '../pages/GrowthRecord';
import ApplyRecord from '../pages/ApplyRecord';
import ActivityRecord from '../pages/ActivityRecord';
import TotalCommunity from '../pages/TotalCommunity';
import MyPage from '../pages/MyPage';
import About from '../pages/About';
import Notification from '../pages/Notification';
import Layout from '../components/Layout';
import Record from '../pages/Record';
import Detail from '../pages/Detail';
import FindPassword from '../pages/FindPassword';
import FindPassword2 from '../pages/FindPassword2';
import EditActivity from '../pages/EditActivity';
import AddInfo from '../pages/AddInfo';
import SignupSuccess from '../pages/SignupSuccess';
import MyCommunity from '../pages/MyCommunity';
import Setting from '../pages/Setting';
import Support from '../pages/Support';
import EditMyInfo from '../pages/EditMyInfo';
import EditMyAbout from '../pages/EditMyAbout';

// 부모 컴포넌트로부터 로그인 여부에 대한 값 받아와서 사용
const Router = ({ userInfo }) => {
	const routes = [
		{
			path: '/',
			element: <Main />, // 메인홈
		},
		{
			path: 'About',
			element: <About />, // 성장통 소개
		},
		{
			path: 'Login',
			element: <Login />, // 로그인
		},
		{
			path: 'Signup',
			element: <Signup />, // 회원가입
		},
		{
			path: 'SignupSuccess',
			element: <SignupSuccess />, // 회원가입 성공 페이지
		},
		{
			path: 'FindPassword',
			element: <FindPassword />, // 비밀번호 찾기
		},
		{
			path: 'FindPassword2',
			element: <FindPassword2 />, // 비밀번호 찾기 다음페이지
		},

		{
			path: 'AddInfo',
			element: <AddInfo />, // 추가 정보 페이지 (소셜로그인)
		},

		{
			path: ':userId', // 로그인 이후 이동 가능 페이지
			element: <ProtectedRoute userInfo={userInfo} />,
			children: [
				{ path: 'Dashboard', element: <Dashboard /> }, // 대시보드
				{
					path: 'Growth',
					element: <Layout />,
					children: [
						{ path: '', element: <GrowthRecord /> }, // 성장기록
						{
							path: 'Apply',
							children: [
								{ path: '', element: <ApplyRecord /> }, // 지원현황
								{ path: ':id', element: <Detail /> }, // 지원현황 - 상세 페이지(편집하기)
								{ path: 'Record', element: <Record /> }, // 지원현황 - 기록하기
							],
						},
						{
							path: 'Activity',
							children: [
								{ path: ':category', element: <ActivityRecord /> }, // 활동기록 - 상세 페이지(편집하기)
								{ path: ':category/:id', element: <EditActivity /> }, // 활동기록 - 상세 페이지(편집하기)
							],
						},
					],
				},
				{
					path: 'Community',
					element: <Layout />,
					children: [
						{ path: 'Total', element: <TotalCommunity /> }, // 전체 게시판
						{ path: 'Free', element: <TotalCommunity category={'free'} /> }, // 자유 게시판
						{ path: 'Member', element: <TotalCommunity category={'member'} /> }, // 팀원모집 게시판
						{ path: 'Portfolio', element: <TotalCommunity category={'portfolio'} /> }, // 포트폴리오 게시판
					],
				},
				{
					path: 'Mypage',
					element: <Layout />,
					children: [
						{ path: '', element: <MyPage /> }, // 마이페이지
						{ path: 'EditInfo', element: <EditMyInfo /> }, // 기본 정보 편집
						{ path: 'EditAbout', element: <EditMyAbout /> }, // 자기 소개 편집
						{ path: 'MyCommunity', element: <MyCommunity /> }, // 커뮤니티 활동
						{ path: 'Setting', element: <Setting /> }, // 설정
						{ path: 'Support', element: <Support /> }, // 문의 및 지원
						{ path: 'Notification', element: <Notification /> }, // 알림
					],
				},
			],
		},
	];

	const router = createBrowserRouter([...routes]);

	// 구성요소 전달 및 활성화 -> App.jsx로 빼도 괜찮음
	return <RouterProvider router={router} />;
};

export default Router;
