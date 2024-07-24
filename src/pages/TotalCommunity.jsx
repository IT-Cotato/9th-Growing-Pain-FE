import { LuSearch } from 'react-icons/lu';
import React, { useState } from 'react';
import PostList from '../components/PostList';
import PostForm from '../components/PostForm';
import 프사 from '/images/공모전.png';
import MenuBar from '../components/MenuBar';

const TotalCommunity = ({ category }) => {
	const [posts, setPosts] = useState([
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
			category: 'free',
		},
		{
			profile: 프사,
			post_id: 2,
			nickname: 'greatSound',
			createdTime: '10분전',
			position: '디자이너',
			postTitle: '진짜 너무너무 퇴사하고싶다',
			content: '근데 다음주 월요일 월급날이네 ^^',
			heart: 3,
			comment: 5,
			bookmartk: false,
			category: 'member',
		},
		{
			profile: 프사,
			post_id: 3,
			nickname: 'yongari',
			createdTime: '19분전',
			position: 'PM',
			postTitle: '일주일 퇴사 문자 통보 해도 될까요?',
			content:
				'이번주 월요일 첫 출근 했는데 사람들도 진짜 안 맞고 일 하는게 제가 원하던 직종이 아니라 이게 맞나 생각하고 있었는데 동시기에\n면접 봤던 곳에서 합격연락이 와서 월요일부터 출근 하라는데 혹시 금요일에 퇴근하고 문자로 퇴사 말씀드려도될까요? 문제라도 뭐\n생기거나 그러진 않겠죠? 얼굴 보고는 도저히 말씀드리기싫네요',
			heart: 3,
			comment: 5,
			bookmartk: false,
			category: 'portfolio',
		},
	]);

	const filteredPosts = category ? posts.filter((post) => post.category === category) : posts;

	return (
		<div className="main flex-grow flex flex-col bg-navy-communityBg">
			<div className="mx-[70px] mt-[51px]">
				<div>
					<MenuBar />
				</div>
				<div className="flex">
					<div className="post_wrapper mt-[40px] w-3/4">
						<PostForm category={category} />
						<PostList posts={filteredPosts} />
					</div>
					<div className="board_wrapper w-1/4">
						<div className="relative w-full mt-[40px]">
							<input
								placeholder="검색어를 입력해주세요"
								className="bg-[#EDEDED] w-full h-[48px] rounded-[10px] px-[20px] pr-[50px]"
							/>
							<LuSearch className="absolute right-[20px] top-[12px] w-[24px] h-[24px] text-[#888888]" />
						</div>
						<section className="hot_board mb-[36px] h-[431px] bg-white rounded-[10px] mt-[36px]">
							<h2>핫한 게시판</h2>
						</section>
						<section className="tip_board h-[342px] mb-[40px] bg-white rounded-[10px]">
							<h2>Hot Tip</h2>
						</section>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TotalCommunity;
