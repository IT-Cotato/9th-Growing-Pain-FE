import { GrowthStateContext } from "../App";
import { useContext, useState, useRef, useEffect } from "react";
import HeaderMyPage from "../components/HeaderMyPage";
import MenubarMyPage from "../components/MenubarMyPage";
import MyCommunityItem from "../components/MyCommunityItem";
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import Toggle from "../components/Toggle";

const communityData = [
  {
    id: 0,
    category: "포트폴리오",
    title: "프론트엔드 개발자 구하는 방법 물어봅니다.",
    writer: "김수윤",
    date: new Date("2024-7-24"),
  },
  {
    id: 1,
    category: "자유",
    title: "백엔드 스터디 같이 하실 분 찾아요",
    writer: "김수윤",
    date: new Date("2024-7-24"),
  },
];

const MyCommunity = () => {
  const [memberData, jobPostData, applicationData, applicaionDetailData, infoData] = useContext(GrowthStateContext);

  // 아이콘 스타일
	const iconClass = 'size-6 stroke-1';
  const menuItemClass = 'cursor-pointer p-4 rounded-[10px] hover:bg-gray-lightSide flex items-center justify-left gap-2';

  return (
    <div>
      <div className="mx-[70px] mt-[53px]">
        <div>
          <HeaderMyPage name={infoData.name} company={infoData.company} />
        </div>
        <div className="mypage-content-container flex-col">
          <div className="menubar">
            <MenubarMyPage />
          </div>
          <div className="mypage-content h-[692px] bg-white flex flex-col mt-[28px] mb-[153px] rounded-[10px]">
            <div className="mypage-toggle h-[112px] mt-[42px] mb-[28px] mr-[41px] flex justify-end relative">
              <Toggle menuItems={["작성한 글", "작성한 댓글", "저장한 글"]} bg={'bg-navy-mypageToggle'} />
            </div>
            <div className="mypage-list w-[100%]">
              <div className="my-community-category flex gap-[50px] h-[61px] pt-[20px] pb-[21px] ml-[59px] mr-[50px] text-[16px] border-t-2 border-b">
                <div className='w-2/12 pl-[40px] h-[19px] text-left'>카테고리</div>
                <div className='w-6/12 h-[19px]'>제목</div>
                <div className='w-1/12 h-[19px]'>작성자</div>
                <div className='w-2/12 h-[19px]'>작성일</div>
                <div className="w-1/12 h-[19px]"></div>
              </div>
              <div className="my-community-content h-[477px] ml-[61px] mr-[50px] my-[21px] flex-col">
                {communityData.map((data)=>{// 아이템 순회하면서 렌더링
                  return (
                    <MyCommunityItem
                      key={data.id}
                      category={data.category}
                      title={data.title}
                      writer={data.writer}
                      date={data.date}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCommunity;