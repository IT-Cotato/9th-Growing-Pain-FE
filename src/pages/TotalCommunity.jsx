import { LuSearch } from 'react-icons/lu';
import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import PostList from '../components/PostList';
import PostForm from '../components/PostForm';
import MenuBar from '../components/MenuBar';
import 배너 from '/images/커뮤니티_배너.png';
import 배너2 from '/images/커뮤니티_배너2.png';
import instance from '../api/instance';

const TotalCommunity = ({ category }) => {
	console.log('Received category:', category);

	const [posts, setPosts] = useState([]);
	const [search, setSearch] = useState('');

	const fetchPosts = useCallback(async () => {
		try {
			const response = await instance.get(`/api/post/category?category=${category}`);
			if (response.status === 200) {
				const fetchedPosts = Array.isArray(response.data.data.posts) ? response.data.data.posts : [];
				fetchedPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
				setPosts(fetchedPosts);
				console.log('게시글 가져오기 성공');
			}
		} catch (error) {
			console.error('게시글을 가져오는 중 오류 발생:', error);
		}
	}, [category]);

	useEffect(() => {
		if (category) {
			fetchPosts();
		}
	}, [category, fetchPosts]);

	const filteredPosts = posts.filter((post) => post.title.toLowerCase().includes(search.toLowerCase()));

	const onSearchChange = (e) => {
		setSearch(e.target.value);
	};

	return (
		<div className="main flex-grow flex flex-col bg-navy-communityBg">
			<div className="mx-[70px] mt-[51px]">
				<div>
					<MenuBar />
				</div>
				<div className="flex">
					<div className="post_wrapper mt-[40px] w-3/4 relative">
						{/* PostForm에 fetchPosts 함수를 props로 전달 */}
						<PostForm category={category} onPostCreated={fetchPosts} />
						<PostList posts={filteredPosts} />
					</div>
					<div className="board_wrapper w-1/4">
						<div className="relative w-full mt-[40px]">
							<input
								placeholder="검색어를 입력해주세요"
								className="bg-[#EDEDED] w-full h-[48px] rounded-[10px] px-[20px] pr-[50px]"
								onChange={onSearchChange}
								value={search}
							/>
							<LuSearch className="absolute right-[20px] top-[12px] w-[24px] h-[24px] text-[#888888]" />
						</div>
						<section className="hot_board mb-[36px] h-[431px] bg-white rounded-[10px] mt-[36px] flex items-center justify-center">
							<img className="object-cover w-full h-full cursor-pointer rounded-[10px]" src={배너2} alt="Banner" />
						</section>
						<section className="tip_board h-[400px] mb-[40px] bg-white rounded-[10px]">
							<img className="object-cover w-full h-full cursor-pointer rounded-[10px]" src={배너} alt="Banner" />
						</section>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TotalCommunity;
