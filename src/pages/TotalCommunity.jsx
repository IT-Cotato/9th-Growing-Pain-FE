import { LuSearch } from 'react-icons/lu';
import React, { useState } from 'react';
import PostList from '../components/PostList';
import PostForm from '../components/PostForm';
import 프사 from '/images/공모전.png';
import MenuBar from '../components/MenuBar';
import 배너 from '/images/커뮤니티_배너.png';
import 배너2 from '/images/커뮤니티_배너2.png';

const TotalCommunity = ({ category }) => {
	// Mock Data인데 이걸 서버에서 가져와도 useState에 저장하는게 맞겠지...?
	const [posts, setPosts] = useState([
		{
			post_id: 1,
			profile: 프사,
			nickname: '김현중',
			createdTime: '5분전',
			position: '프론트엔드',
			postTitle: '면접장에서 질문이',
			content:
				'나이가 많으시네요 이거 하나만 물어보고 저한테는 더이상 질문이 없으면 거의\n탈락이라고 생각해야 하나요 다름분들에게는 이것저것 질문이 있던데 저는 저게 다 입니다.\n탈락이라고 생각해야 할까요 나미 40대인 게 죄인가요',
			heart: 3,
			comments: [
				{
					id: 5,
					userProfile: 프사,
					nickname: '박윤하',
					position: 'Designer',
					createdTime: '1 hour ago',
					content: '나이가 많으시네요 이거 하나만 물어보고 저한테는 더이상 질문이 없으면 거의',
					heart: 3,
					replies: [
						{
							id: 2,
							userProfile: 프사,
							nickname: '김현중',
							position: 'Designer',
							createdTime: '1 hour ago',
							content: '이번에 이직 성공한 회사 동료도 고졸인데 연봉 6천받고 쿠팡 lv4로 이직',
							heart: 3,
						},
						{
							id: 3,
							userProfile: 프사,
							nickname: '조은솔',
							position: 'Manager',
							createdTime: '30 minutes ago',
							content:
								'오래된 얘기지만, 저도 학점이 낮은데요. 휴학도 1년씩 두번하고요. ‘학점이 왜 이렇게 낮아요?’ 라고 면접관이 물어보길래 ‘원없이 놀아봤습니다.’ 라고 했습니다.',
							heart: 2,
						},
						{
							id: 6,
							userProfile: 프사,
							nickname: '김수윤',
							position: 'Manager',
							createdTime: '30 minutes ago',
							content:
								'직종마다 다르기는 하지만 그래도 평균 3점대 이상이라면 완전 나쁜 점수는 아닙니다. 물론 높은 편도 아니지만... 이것 때문에 취업이 불가능한 정도는 아니니까요. 일단 다른 스펙들을 최대한 채우고 사실대로 대학교 때에는 그리 공부에 집중하지 않았다고 대답하는 정도면 되지 않을까요?',
							heart: 2,
						},
					],
				},
				{
					id: 6,
					userProfile: 프사,
					nickname: '강다형',
					position: 'Manager',
					createdTime: '30 minutes ago',
					content:
						'보통 면접 이후에 따로 연락을 준다고 하는 곳들은, 탈락 안내가 왔었습니다. 연락이 오래도록 안오는 경우는 그만큼 쓴이와 또 다른 후보자들을 비교해보는 중일 수도 있을 것 같아요. 다만 그 기간이 2주 이상 길어진다면 새로운 회사를 찾아보는 게 낫지 않을까 싶네요. 이왕이면 좋은 결과 있으면 좋겠네요.',
					heart: 2,
				},
			],
			bookmark: true,
			category: 'FREE',
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
			comments: [],
			bookmartk: false,
			category: ['TEAM', 'STUDY'],
		},
		{
			profile: 프사,
			post_id: 3,
			nickname: 'yongari',
			createdTime: '19분전',
			position: 'PM',
			postTitle: '일주일 퇴사 문자 통보 해도 될까요?',
			content:
				'이번주 월요일 첫 출근 했는데 사람들도 진짜 안 맞고 일 하는게 제가 원하던 직종이 아니라 이게 맞나 생각하고 있었는데\n 동시기에 면접 봤던 곳에서 합격연락이 와서 월요일부터 출근 하라는데 혹시 금요일에 퇴근하고 문자로 퇴사 말씀드려도될까요?\n 문제라도 뭐 생기거나 그러진 않겠죠? 얼굴 보고는 도저히 말씀드리기싫네요',
			heart: 3,
			comments: [],
			bookmartk: false,
			category: 'PORTFOLIO',
		},
		{
			profile: 프사,
			post_id: 4,
			nickname: 'hahaha',
			createdTime: '10분전',
			position: '디자이너',
			postTitle: '청소를하자...',
			content: '청소를하자 청소를하자',
			heart: 3,
			comments: [],
			bookmartk: false,
			category: ['TEAM', 'CONTEST'],
		},
		{
			profile: 프사,
			post_id: 5,
			nickname: 'omg',
			createdTime: '10분전',
			position: '디자이너',
			postTitle: '하...',
			content: '하..........',
			heart: 3,
			comments: [],
			bookmartk: false,
			category: ['TEAM', 'PROJECT'],
		},
	]);
	const [search, setSearch] = useState('');

	const filteredPosts = posts.filter((post) => post.postTitle.toLowerCase().includes(search.toLowerCase()));

	const filteredCategoryPosts = category
		? filteredPosts.filter(
				(post) =>
					Array.isArray(post.category)
						? post.category.includes(category) // post.category 배열에 category(props)가 포함되어 있는지 확인
						: post.category === category, // post.category가 단일 값인 경우 category(props)와 일치하는지 확인
			)
		: filteredPosts; // 카테고리(props)가 없으면 전체 포스트를 반환(전체 게시판).

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
					<div className="post_wrapper mt-[40px] w-3/4 relatvie">
						<PostForm category={category} />
						<PostList posts={filteredCategoryPosts} />
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
