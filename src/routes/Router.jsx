import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoutes";
import Main from "../pages/Main";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import GrowthRecord from "../pages/GrowthRecord";
import ApplyRecord from "../pages/ApplyRecord";
import ActivityRecord from "../pages/ActivityRecord";
import Community from "../pages/Community";
import TotalCommunity from "../pages/TotalCommunity"
import FreeCommunity from "../pages/FreeCommunity";
import MemberCommunity from "../pages/MemberCommunity";
import PortfolioCommunity from "../pages/PortfolioCommunity";
import MyPage from "../pages/MyPage";
import About from "../pages/About";
import Notification from "../pages/Notification";
import Message from "../pages/Message";
import Layout from "../components/Layout";
import Record from "../pages/Record";
import Detail from "../pages/Detail";
import FindID from '../pages/FindID';
import FindPassword from '../pages/FindPassword';
import EditActivity from "../pages/EditActivity";
import AddInfo from "../pages/AddInfo";


// 부모 컴포넌트로부터 로그인 여부에 대한 값 받아와서 사용
const Router = ({userInfo}) => {
  const routes = [
    {
    path: "/",
    element: <Main />       // 메인홈
    },
    {
      path: "About",
      element: <About />,   // 성장통 소개
    },
    {
      path: "Login", 
      element: <Login />,   // 로그인
    },
    {
      path: "Signup",
      element: <Signup />,  // 회원가입
    },
    {
			path: 'FindID',
			element: <FindID />, // 아이디 찾기
		},
		{
			path: 'FindPassword',
			element: <FindPassword />, // 비밀번호 찾기
		},
    {
			path: 'AddInfo',
			element: <AddInfo />, // 비밀번호 찾기
		},
    {
      path: ":userId",     // 로그인 이후 이동 가능 페이지
      element: <ProtectedRoute userInfo={userInfo} />,
      children: [
        { path: "Dashboard", element: <Dashboard /> },          // 대시보드
        { path: "Growth",
          element: <Layout />,
          children: [
            { path: "", element: <GrowthRecord /> },             // 성장기록
            { path: "Apply",
              children: [
                { path: "", element: <ApplyRecord />},           // 지원현황
                { path: ":id", element: <Detail />},             // 지원현황 - 상세 페이지(편집하기)
                { path: "Record", element: <Record /> }          // 지원현황 - 기록하기
              ]
            },
            { path: "Activity",
              children: [
                { path: "", element: <ActivityRecord />},       // 활동기록 - 상세 페이지(편집하기)
                { path: ":id", element: <EditActivity />},       // 활동기록 - 상세 페이지(편집하기)
              ]
            },
          ],
        },
        { path: "Community",
          element: <Layout />,
          children: [
            { path: "", element: <Community /> },                   // 커뮤니티
            { path: "Total", element: <TotalCommunity /> },         // 전체 게시판
            { path: "Free", element: <FreeCommunity /> },           // 자유 게시판
            { path: "Member", element: <MemberCommunity /> },       // 팀원모집 게시판
            { path: "Portfolio", element: <PortfolioCommunity /> }, // 포트폴리오 게시판
          ]
        },
        { path: "Mypage",
          element: <Layout />,
          children: [
            { path: "", element: <MyPage /> },                    // 마이페이지
            { path: "Notification", element: <Notification /> },  // 알림
            { path: "Message", element: <Message /> },            // 쪽지
          ]
        },
      ],
    },
  ];

	const router = createBrowserRouter([...routes]);

	// 구성요소 전달 및 활성화 -> App.jsx로 빼도 괜찮음
	return <RouterProvider router={router} />;
};

export default Router;