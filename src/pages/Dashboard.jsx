import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';

// 대쉬보드만 Layout 따로 적용 (라우팅 중첩 해결)
const Dashboard = () => {
  return (
    <div className="dashboard-container flex flex-col min-h-screen">
    <div className="flex flex-1">
      <Sidebar />
      <div className="flex-grow">
        <Outlet />
      </div>
    </div>
  </div>
  );
}

export default Dashboard;