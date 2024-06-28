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
      children: [
        { path: "dashboard", element: <Dashboard /> },          // 대시보드
        {
          path: "growth",                                       // 성장기록
          element: <GrowthRecord />,
          children: [
            { path: "apply", element: <ApplyRecord /> },        // 지원현황
            { path: "activity", element: <ActivityRecord /> },  // 활동기록
          ],
        },
        {
          path: "community",                                    // 커뮤니티
          element: <Community /> ,
          children: [
            { path: "total", element: <TotalCommunity /> },         // 전체 게시판
            { path: "free", element: <FreeCommunity /> },           // 자유 게시판
            { path: "member", element: <MemberCommunity /> },       // 팀원모집 게시판
            { path: "portfolio", element: <PortfolioCommunity /> }, // 포트폴리오 게시판
          ],
        },
        { path: "mypage", element: <MyPage /> },                // 마이페이지
      ],
    },
  ];

  const router = createBrowserRouter([...routes]);

  // 구성요소 전달 및 활성화 -> App.jsx로 빼도 괜찮음
  return <RouterProvider router={router} />;
};

export default Router;