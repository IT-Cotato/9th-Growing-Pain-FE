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

// 부모 컴포넌트로부터 로그인 여부에 대한 값 받아와서 사용
const Router = ({userInfo}) => {
  const routes = [
    {
    path: "/",
    element: <Main />       // 메인홈
    },
    {
      path: "about",
      element: <About />,   // 성장통 소개
    },
    {
      path: "login", 
      element: <Login />,   // 로그인
    },
    {
      path: "signup",
      element: <Signup />,  // 회원가입
    },
    {
      path: "user",     // 로그인 이후 이동 가능 페이지
      element: <ProtectedRoute userInfo={userInfo} />,
      // 자식 컴포넌트를 더 만들었지만 Protected에서 Outlet으로 지원현황 등의 하위 페이지를 렌더링 하지 못해 아래와 같이 구현
      children: [
        { path: "dashboard", element: <Dashboard /> },          // 대시보드
        { path: "growth",element: <GrowthRecord /> },           // 성장기록
        { path: "growth/apply", element: <ApplyRecord /> },         // 지원현황
        { path: "growth/activity", element: <ActivityRecord /> },   // 활동기록
        { path: "community", element: <Community /> },              // 커뮤니티
        { path: "community/total", element: <TotalCommunity /> },         // 전체 게시판
        { path: "community/free", element: <FreeCommunity /> },           // 자유 게시판
        { path: "community/member", element: <MemberCommunity /> },       // 팀원모집 게시판
        { path: "community/portfolio", element: <PortfolioCommunity /> }, // 포트폴리오 게시판
        { path: "mypage", element: <MyPage /> },                // 마이페이지
        { path: "mypage/notification", element: <Notification /> },  // 알림
        { path: "mypage/message", element: <Message /> },            // 쪽지
      ],
    },
  ];

  const router = createBrowserRouter([...routes]);

  // 구성요소 전달 및 활성화 -> App.jsx로 빼도 괜찮음
  return <RouterProvider router={router} />;
};

export default Router;