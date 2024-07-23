import { useLocation, useNavigate } from "react-router-dom";

const MenubarMyPage = () => {
  const nav = useNavigate();

  // 기본 카테고리 메뉴 스타일
  const categoryBarMenuClass = 'flex-1 content-center cursor-pointer pb-[8px]';
  // 현재 위치한 카테고리 메뉴 스타일
  const selectCategoryClass = 'flex-1 content-center border-b-2 border-navy-dark cursor-pointer pb-[8px]';
  // 메뉴바 기본 스타일
  const menubarClass = 'content-centercursor-pointer justify-items-center font-medium';

  // 현재 페이지에 해당하는 메뉴바의 색상 유지
  const isActive = (path) => location.pathname === path ? selectCategoryClass : categoryBarMenuClass;

  return (
    <div>
      <div className="category-bar flex h-[29px] mt-[45px] rounded-[10px] justify-items-center gap-[69px]">
        <div onClick={() => nav('/user/mypage')} className={menubarClass}>
          <p className={`${isActive('/user/mypage')} w-[65px]`}>프로필</p>
        </div>
        <div onClick={() => nav('/user/mypage/mycommunity')} className={menubarClass}>
          <p className={`${isActive('/user/mypage/mycommunity')} w-[100px]`}>커뮤니티 활동</p>
        </div>
        <div onClick={() => nav('/user/mypage/setting')} className={menubarClass}>
          <p className={`${isActive('/user/mypage/setting')} w-[71px]`}>계정관리</p>
        </div>
        <div onClick={() => nav('/user/mypage/support')} className={menubarClass}>
          <p className={`${isActive('/user/mypage/support')} w-[100px]`}>문의 및 지원</p>
        </div>
      </div>
    </div>
  );
};

export default MenubarMyPage;