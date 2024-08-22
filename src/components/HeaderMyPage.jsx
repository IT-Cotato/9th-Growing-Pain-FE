const HeaderMyPage = () => {
  const name = sessionStorage.getItem('nickname');
  const company = sessionStorage.getItem('field');
  const profile = sessionStorage.getItem('profileImage');

  return (
    <div>
      <div className="mypage-header-component h-[80px] flex">
        <div className="profile-photo">
          <img className="header-profile-img w-[80px] h-[80px] rounded-[100%]" src={profile} alt="Profile" />
        </div>
        <div className="header-profile-content flex-col ml-[19px] mt-[18px] mb-[16px] text-left">
          <div className="h-[20px] font-medium text-[17px] text-left mb-[9px]">{name}</div>
          <div className="h-[17px] font-regular text-[14px]">{company}</div>
        </div>
      </div>
    </div>
  );
}

export default HeaderMyPage;