import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

// 로그인 이후 사용 가능한 페이지 -> 사이드바와 해당 페이지, 푸터(확실X)가 렌더링 되는 것으로 레이아웃이 동일함
const Layout = () => {
	return (
		<div className="layout flex min-h-screen bg-gray-background">
			<div className="flex min-h-screen w-2/7">
				<Sidebar />
			</div>
			<div className="flex-grow">
				<Outlet />
			</div>
		</div>
	);
};

export default Layout;
