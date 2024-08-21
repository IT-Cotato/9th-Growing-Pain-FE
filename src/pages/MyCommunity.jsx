import { GrowthStateContext } from "../App";
import { useContext, useState, useRef, useEffect } from "react";
import HeaderMyPage from "../components/HeaderMyPage";
import MenubarMyPage from "../components/MenubarMyPage";
import MyCommunityItem from "../components/MyCommunityItem";
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import Toggle from "../components/Toggle";
import instance from "../api/instance";

const MyCommunity = () => {
  const [selectedMenu, setSelectedMenu] = useState("작성한 글");
  const [data, setData] = useState([]);
  const memberId = sessionStorage.getItem('memberId');

  // 선택된 메뉴에 따라 데이터를 가져오는 함수
  const fetchData = async (menu) => {
    let url = "";
    let responseData = [];

    try {
      switch (menu) {
        case "작성한 글": {
          const response = await instance.get('/api/post');
          if (response.status === 200) {
            console.log(response.data.data);
            responseData = response.data.data.posts;
          } else {
            console.log('사용자 작성 글 목록 조회 실패:', response.data.message);
          }
          break;
        }

        case "작성한 댓글": {
          const response = await instance.get('/api/post');
          if (response.status === 200) {
            console.log(response.data.data);
            responseData = response.data.data.commentList;
          } else {
            console.log('사용자 작성 댓글 목록 조회 실패:', response.data.message);
          }
          break;
        }

        case "저장한 글": {
          url = `/api/post/saves/${memberId}/list`;
          const response = await instance.get(url);
          if (response.status === 200) {
            console.log(response.data.data);
            responseData = response.data.data;
          } else {
            console.log('사용자 저장 글 목록 조회 실패:', response.data.message);
          }
          break;
        }

        default:
          console.error('알 수 없는 메뉴:', menu);
      }

      setData(responseData);

    } catch (error) {
      console.error('API 요청 에러:', error);
    }
  };

  // 토글에서 메뉴 선택이 변경될 때마다 데이터를 요청함
  useEffect(() => {
    fetchData(selectedMenu);
  }, [selectedMenu]);

  // 아이콘 스타일
	const iconClass = 'size-6 stroke-1';
  const menuItemClass = 'cursor-pointer p-4 rounded-[10px] hover:bg-gray-lightSide flex items-center justify-left gap-2';

  return (
    <div>
      <div className="mx-[70px] mt-[53px]">
        <div>
          <HeaderMyPage />
        </div>
        <div className="mypage-content-container flex-col">
          <div className="menubar">
            <MenubarMyPage />
          </div>
          <div className="mypage-content h-[692px] bg-white flex flex-col mt-[28px] mb-[153px] rounded-[10px]">
            <div className="mypage-toggle h-[112px] mt-[42px] mb-[28px] mr-[41px] flex justify-end relative">
              <Toggle
                menuItems={["작성한 글", "작성한 댓글", "저장한 글"]}
                bg={'bg-navy-mypageToggle'}
                placeholder={"작성한 글"}
                onChange={setSelectedMenu}
              />
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
                {data && data.length > 0 ? (
                  data.map((item, index) => (
                    <MyCommunityItem
                      key={index}
                      id={item.postId}
                      category={item.parentCategory || item.subCategory || "카테고리 없음"}
                      title={item.title || item.content}
                      writer={item.memberNickname || "작성자 없음"}
                      date={item.createdAt ? new Date(item.createdAt) : new Date()}
                    />
                  ))
                ) : (
                  <div className="text-center py-8">데이터가 없습니다.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCommunity;