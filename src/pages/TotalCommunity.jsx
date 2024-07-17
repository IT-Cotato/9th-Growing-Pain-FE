import { LuSearch } from 'react-icons/lu';
import { useLocation, useNavigate } from 'react-router-dom';
import PostItem from '../components/PostItem';
import MemoField from '../components/MemoField';
import Button from '../components/Button';
import 프사 from '/images/공모전.png';
import { useState } from 'react';

const TotalCommunity = () => {
	const nav = useNavigate();
	const location = useLocation();

	// 임시데이터 -> 나중에 서버에서 받아와야해~~~
	const PostData = [
		{
			post_id: 1,
			profile: 프사,
			nickname: '용가리',
			createdTime: '5분전',
			position: '프론트엔드',
			postTitle: '면접장에서 질문이',
			content:
				'나이가 많으시네요 이거 하나만 물어보고 저한테는 더이상 질문이 없으면 거의\n탈락이라고 생각해야 하나요 다름분들에게는 이것저것 질문이 있던데 저는 저게 다 입니다.\n탈락이라고 생각해야 할까요 나미 40대인 게 죄인가요',
			heart: 3,
			comment: 6,
			bookmark: true,
		},
		{
			profile: 프사,
			post_id: 2,
			nickname: 'greatSound',
			createdTime: '10분전',
			position: '디자이너',
			postTitle: '면접장에서 질문이',
			content:
				'나이가 많으시네요 이거 하나만 물어보고 저한테는 더이상 질문이 없으면 거의\n탈락이라고 생각해야 하나요 다름분들에게는 이것저것 질문이 있던데 저는 저게 다 입니다.\n탈락이라고 생각해야 할까요 나미 40대인 게 죄인가요',
			heart: 3,
			comment: 5,
			bookmartk: false,
		},
	];
	const categoryBarMenuClass =
		'flex-1 content-center bg-navy-lightSide cursor-pointer hover:bg-gray-lightSide hover:rounded-[10px]';
	const selectCategoryClass = 'flex-1 content-center bg-navy-dark rounded-[10px] cursor-pointer text-white';

	const isActive = (path) => (location.pathname === path ? selectCategoryClass : categoryBarMenuClass);

	return (
		<div className="flex w-full h-full bg-navy-communityBg">
			<div className="flex flex-col flex-grow mx-[70px] bg-navy-communityBg">
				<div className="Header mt-[43px]">
					<section className="search flex justify-between items-center">
						<p>커뮤니티</p>
						<div className="relative">
							<input
								placeholder="검색어를 입력해주세요"
								className="bg-[#EDEDED] w-[277px] h-[40px] rounded-[10px] px-[20px]"
							/>
							<LuSearch className="absolute left-[235px] top-[8px] w-[24px] h-[24px] text-[#888888]" />
						</div>
					</section>
					<section className="menu_bar">
						<div className="category-bar bg-navy-lightSide flex w-full h-[50px] mt-[27px] rounded-[10px]">
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
					</section>
				</div>
				<div className="main flex-grow flex mt-[56px]">
					<div className="post_wrapper flex-1">
						{/* 글 작성 */}
						<div className="h-[378px] bg-white rounded-[10px] mr-[32px] flex-col flex">
							<section className="flex pt-[29px] ml-[36px] justify-between pr-[36px] items-center">
								<p>글 작성</p>
								<select className="h-[42px] w-[202px] bg-[#EDF6FF] pl-[20px] rounded-[10px]">
									<option value="" hidden>
										카테고리
									</option>
									<option>자유</option>
									<option>팀원모집</option>
									<option>포트폴리오</option>
								</select>
							</section>
							<section className="mt-[20px] space-y-[20px] flex-grow flex flex-col ml-[36px]">
								<MemoField placeholderText={'제목을 입력해주세요'} type={'communityTitle'} />
								<MemoField placeholderText={'자유롭게 글을 남겨보세요 '} type={'communityMainText'} />
								<div className="flex justify-end pr-[36px] mt-auto">
									<Button type={'communitySave'} text={'저장하기'} />
								</div>
							</section>
						</div>
						{/* 글 타임라인 */}
						<div className="mt-[36px] space-y-[36px]">
							{PostData.map((data, index) => (
								<PostItem
									key={index}
									nickname={data.nickname}
									id={data.post_id}
									createdTime={data.createdTime}
									position={data.position}
									postTitle={data.postTitle}
									content={data.content}
									userProfile={data.profile}
									heart={data.heart}
									comment={data.comment}
									bookmart={data.bookmark}
								/>
							))}
						</div>
					</div>
					{/* 오른쪽 게시판 섹션 */}
					<div className="board_wrapper w-[393px]">
						<section className="hot_board mb-[38px] h-[431px] bg-white rounded-[10px]">
							<h2>핫한 게시판</h2>
						</section>
						<section className="tip_board h-[342px] bg-white rounded-[10px]">
							<h2>Hot Tip</h2>
						</section>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TotalCommunity;
