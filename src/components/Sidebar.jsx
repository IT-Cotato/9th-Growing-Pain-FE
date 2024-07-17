import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import logo from '../assets/images/logo.png';

// heroicons에서 아이콘 불러와서 사용 (채운 아이콘은 solid로 불러오기)
import {
	PencilIcon,
	HomeIcon,
	MapIcon,
	PresentationChartLineIcon,
	DocumentIcon,
	UsersIcon,
	FolderOpenIcon,
	ChatBubbleLeftEllipsisIcon,
	UserPlusIcon,
	ClipboardDocumentIcon,
	UserIcon,
	BellAlertIcon,
	EnvelopeIcon,
	ChevronRightIcon,
	ChevronDownIcon,
} from '@heroicons/react/24/outline';

const Sidebar = () => {
	const nav = useNavigate();
	const location = useLocation();
	const [openMenu, setOpenMenu] = useState(null);

	const toggleMenu = (menu) => {
		setOpenMenu(openMenu === menu ? null : menu);
		nav(`/user/${menu}`); // 선택한 메뉴의 페이지로 이동
	};

	// 사이드바 메뉴 스타일 (중복되는 스타일이라 따로 설정함)
	const menuItemClass =
		'cursor-pointer p-4 rounded-[10px] hover:bg-gray-lightSide flex items-center justify-left gap-2';
	// 사이드바 메뉴(상위) 텍스트 스타일
	const menuItemTextClass = 'menu-item-text w-1/2 text-left';
	// 아이콘 스타일
	const iconClass = 'size-6 stroke-1';

	// 현재 페이지에 해당하는 메뉴바의 색상 유지
	const isActive = (path) => (location.pathname === path ? 'bg-gray-lightSide' : '');

	return (
		<div className="sidebar-container p-5 bg-navy-lightSide w-[288px] h-full">
			{/* 사이드바 로고 */}
			{/* 라우팅 수정 필요 */}
			<div
				className="sidebar-logo p-5 flex relative text-[20px] gap-3 items-center cursor-pointer"
				onClick={() => nav('/')}
			>
				<img className="sidebar-logo-img w-14 h-14" src={logo} alt="Logo" />
				Growth Pain
			</div>

			{/* '기록하기' 버튼 */}
			<div className="sidebar-button flex relative items-center justify-center gap-3 w-full">
				{/* 기록하기 버튼: 사이드바에서만 사용 + 아이콘 사용을 위해 버튼 컴포넌트가 아니라 div 태그로 구현 */}
				<div
					className="button cursor-pointer mt-[50px] bg-white text-navy-sideText shadow-md py-3 px-9 rounded-[10px] h-11 w-full flex items-center justify-center gap-2"
					onClick={() => nav('/user/growth/apply/record')}
				>
					<PencilIcon className={iconClass} />
					기록하기
				</div>
			</div>

			{/* 메뉴바 */}
			<div className="sidebar-menu mt-[30px]">
				<div onClick={() => nav('/user/dashboard')}>
					<div className={`${menuItemClass} ${isActive('/user/dashboard')}`}>
						<HomeIcon className={iconClass} />
						대쉬보드
					</div>
				</div>

				<div onClick={() => toggleMenu('growth')}>
					<div className={`${menuItemClass} ${isActive('/user/growth')}`}>
						<MapIcon className={iconClass} />
						<div className={menuItemTextClass}>성장기록</div>
						{openMenu === 'growth' ? (
							<ChevronDownIcon className={iconClass} />
						) : (
							<ChevronRightIcon className={iconClass} />
						)}
					</div>
				</div>
				{openMenu === 'growth' && (
					<div className="submenu pl-5">
						<div
							className={`${menuItemClass} ${isActive('/user/growth/apply')}`}
							onClick={() => nav('/user/growth/apply')}
						>
							<PresentationChartLineIcon className={iconClass} />
							지원현황
						</div>
						<div
							className={`${menuItemClass} ${isActive('/user/growth/activity')}`}
							onClick={() => nav('/user/growth/activity')}
						>
							<DocumentIcon className={iconClass} />
							활동기록
						</div>
					</div>
				)}

				<div className="menu-item" onClick={() => toggleMenu('community/total')}>
					<div className={`${menuItemClass} ${isActive('/user/community')}`}>
						<UsersIcon className={iconClass} />
						<div className={menuItemTextClass}>커뮤니티</div>
						{openMenu === 'community' ? (
							<ChevronDownIcon className={iconClass} />
						) : (
							<ChevronRightIcon className={iconClass} />
						)}
					</div>
				</div>
				{openMenu === 'community/total' && (
					<div className="submenu pl-5">
						<div
							className={`${menuItemClass} ${isActive('/user/community/total')}`}
							onClick={() => nav('/user/community/total')}
						>
							<FolderOpenIcon className={iconClass} />
							전체
						</div>
						<div
							className={`${menuItemClass} ${isActive('/user/community/free')}`}
							onClick={() => nav('/user/community/free')}
						>
							<ChatBubbleLeftEllipsisIcon className={iconClass} />
							자유게시판
						</div>
						<div
							className={`${menuItemClass} ${isActive('/user/community/member')}`}
							onClick={() => nav('/user/community/member')}
						>
							<UserPlusIcon className={iconClass} />
							팀원모집
						</div>
						<div
							className={`${menuItemClass} ${isActive('/user/community/portfolio')}`}
							onClick={() => nav('/user/community/portfolio')}
						>
							<ClipboardDocumentIcon className={iconClass} />
							포트폴리오
						</div>
					</div>
				)}

				<div className="menu-item" onClick={() => toggleMenu('mypage')}>
					<div className={`${menuItemClass} ${isActive('/user/mypage')}`}>
						<UserIcon className={iconClass} />
						<div className={menuItemTextClass}>마이페이지</div>
						{openMenu === 'mypage' ? (
							<ChevronDownIcon className={iconClass} />
						) : (
							<ChevronRightIcon className={iconClass} />
						)}
					</div>
				</div>
				{openMenu === 'mypage' && (
					<div className="submenu pl-2 pr-2">
						<div
							className={`${menuItemClass} ${isActive('/user/mypage/notification')}`}
							onClick={() => nav('/user/mypage/notification')}
						>
							<BellAlertIcon className={iconClass} />
							알림
						</div>
						<div
							className={`${menuItemClass} ${isActive('/user/mypage/message')}`}
							onClick={() => nav('/user/mypage/message')}
						>
							<EnvelopeIcon className={iconClass} />
							쪽지
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Sidebar;
