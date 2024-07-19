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
			postTitle: '면접관이 너무 무섭게 생겼어요',
			content: '너무 무섭게 생겨서 한마디도 못했네요...',
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
			postTitle: '집에 가고싶어요...',
			content: '오늘 정말 너무 졸려요...🥹 \n 하... 집에 너무 가고싶다',
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
						<PostForm />
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
