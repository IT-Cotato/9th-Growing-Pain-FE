import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const MenuBar = () => {
	const nav = useNavigate();
	const location = useLocation();

	const categoryBarMenuClass =
		'flex-1 content-center bg-navy-lightSide cursor-pointer hover:bg-gray-lightSide hover:rounded-[10px]';
	const selectCategoryClass = 'flex-1 content-center bg-navy-dark rounded-[10px] cursor-pointer text-white';

	const isActive = (path) => (location.pathname === path ? selectCategoryClass : categoryBarMenuClass);

	return (
		<div className="menu-bar">
			<div className="category-bar bg-navy-lightSide flex w-full h-[50px] rounded-[10px]">
				<div
					onClick={() => nav('/user/community/total')}
					className={`${isActive('/user/community/total')} rounded-l-[10px]`}
				>
					전체
				</div>
				<div onClick={() => nav('/user/community/free')} className={`${isActive('/user/community/free')}`}>
					자유게시판
				</div>
				<div onClick={() => nav('/user/community/member')} className={`${isActive('/user/community/member')}`}>
					팀원모집
				</div>
				<div
					onClick={() => nav('/user/community/portfolio')}
					className={`${isActive('/user/community/portfolio')} rounded-r-[10px]`}
				>
					포트폴리오
				</div>
			</div>
		</div>
	);
};

export default MenuBar;
