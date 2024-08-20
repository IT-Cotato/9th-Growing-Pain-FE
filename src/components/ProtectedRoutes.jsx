import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

// 로컬스토리지에서 토큰을 가져오는 함수
const getSessionStorage = (key) => {
	return sessionStorage.getItem(key);
};

const ProtectedRoute = () => {
	const location = useLocation(); // 현재 URL 경로를 가져옴
	const [userInfo, setUserInfo] = useState(getSessionStorage('role'));

	useEffect(() => {
		const role = getSessionStorage('role');
		setUserInfo(role);
	}, [location]);

	if (userInfo == 'ROLE_PENDING') {
		window.alert('추가정보를 입력해주세요.');
		return <Navigate to="/addInfo" replace={true} />;
	} else if (userInfo != 'ROLE_MEMBER') {
		// 유저 정보가 없다면 로그인페이지로 이동
		window.alert('로그인이 필요한 서비스입니다.');
		return <Navigate to="/login" replace={true} />;
	}

	// 유저 정보가 있다면 자식 컴포넌트를 보여줌
	// 유저 정보가 필요한 서비스는 모두 사이드바가 함께 렌더링됨 -> flex로 정렬하기 위해 Layout 컴포넌트 사용
	return <Outlet />;
};

export default ProtectedRoute;
