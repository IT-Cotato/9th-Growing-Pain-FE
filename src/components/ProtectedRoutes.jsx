import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Layout from './Layout';

const ProtectedRoute = ({ userInfo }) => {
  if (!userInfo) {
    // 유저 정보가 없다면 로그인페이지로 이동
    window.alert("로그인이 필요한 서비스입니다.");
    return <Navigate to="/login" replace={true} />;
  }

  // 유저 정보가 있다면 자식 컴포넌트를 보여줌
  // 유저 정보가 필요한 서비스는 모두 사이드바가 함께 렌더링됨 -> flex로 정렬하기 위해 Layout 컴포넌트 사용
  return <Outlet />;
};

export default ProtectedRoute;
