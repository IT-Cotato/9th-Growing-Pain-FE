import React, { useState, useEffect } from 'react';
import { FaRegCommentAlt, FaRegHeart, FaRegBookmark } from 'react-icons/fa';
import { FaBookmark, FaHeart } from 'react-icons/fa';
import { useAtom } from 'jotai';
import CommentModal from '../components/CommentModal';
import CategoryTag from './CategoryTag';
import { useLocation } from 'react-router-dom';
import { modalOpenAtom } from '../utils/atoms';
import instance from '../api/instance';

const PostItem = ({
	id,
	nickname,
	createdTime,
	position,
	postTitle,
	content,
	userProfile,
	heart,
	comments,
	category,
	replies,
}) => {
	const location = useLocation();
	const [modalId, setmodalId] = useAtom(modalOpenAtom);
	const isModalOpen = modalId === id;
	const [isLiked, setIsLiked] = useState(false); // 좋아요 상태
	const [likeCount, setLikeCount] = useState(heart); // 좋아요 수
	const [isSaved, setIsSaved] = useState(false); // 저장 상태
	const memberId = sessionStorage.getItem('memberId');
	const [commentCount, setCommentCount] = useState(0); // 초기 댓글 수

	const handleCommentCountChange = () => {
		setCommentCount((prevCount) => prevCount + 1); // 댓글 추가 시 호출
	};

	useEffect(() => {
		// 서버에서 저장된 게시물 목록 가져오기
		const fetchSavedPosts = async () => {
			try {
				const response = await instance.get(`/api/post/saves/${memberId}/list`);
				if (response.status === 200) {
					const savedPosts = response.data.data.posts;
					const isPostSaved = savedPosts.some((post) => post.postId === id);
					setIsSaved(isPostSaved);
				}
			} catch (error) {
				console.error('저장된 게시물 목록 가져오기 오류:', error);
			}
		};
		fetchSavedPosts();
	}, [id, memberId]);

	useEffect(() => {
		// 서버에서 좋아요 게시물 목록 가져오기
		const fetchLikePosts = async () => {
			try {
				const response = await instance.get(`/api/post/likes/${memberId}/list`);
				if (response.status === 200) {
					const likePosts = response.data.data.posts;
					const isPostLiked = likePosts.some((post) => post.postId === id);
					setIsLiked(isPostLiked);
				}
			} catch (error) {
				console.error('좋아요 게시물 목록 가져오기 오류:', error);
			}
		};
		fetchLikePosts();
	}, [id, memberId, location.pathname, isLiked]);

	const handleLike = async () => {
		try {
			if (isLiked) {
				const response = await instance.delete(`/api/post/likes/${id}`);
				if (response.status === 200) {
					setIsLiked(false);
					setLikeCount(likeCount - 1);
				}
			} else {
				const response = await instance.post(`/api/post/likes/${id}`);
				if (response.status === 200) {
					setIsLiked(true);
					setLikeCount(likeCount + 1);
				}
			}
		} catch (error) {
			console.error('좋아요 처리 오류:', error);
			alert('자신이 작성한 게시글에는 좋아요를 누를 수 없습니다.');
		}
	};

	const handleSave = async () => {
		try {
			if (isSaved) {
				const response = await instance.delete(`/api/post/saves/${id}`);
				if (response.status === 200) {
					setIsSaved(false);
				}
			} else {
				const response = await instance.post(`/api/post/saves/${id}`);
				if (response.status === 200) {
					setIsSaved(true);
				}
			}
		} catch (error) {
			console.error('저장 처리 오류:', error);
			alert('자신이 작성한 게시글은 저장할 수 없습니다.');
		}
	};

	return (
		<div className="bg-white mr-[36px] rounded-[10px]">
			{/* 프로필 */}
			<div className="p-[36px]">
				<div className="flex items-center justify-between">
					<div className="flex items-center">
						{/* 프사 */}
						<span>
							<img src={userProfile} alt={`${nickname} profile`} className="rounded-full w-9 h-9" />
						</span>
						{/* 닉네임, 포지션, 시간 */}
						<div className="flex flex-col ml-[12px]">
							<div className="flex gap-2 items-end">
								<h1 className="text-[16px] font-medium">{nickname}</h1>
								<h1 className="text-[14px] text-gray-commuPosition">{position}</h1>
							</div>
							<h1 className="flex text-[14px] text-gray-commuPosition">{createdTime}</h1>
						</div>
					</div>
					{/* 좋아요, 댓글, 북마크 */}
					<div className="flex items-center gap-6">
						<span
							className={`flex items-center text-[14px] gap-[10px] font-medium cursor-pointer ${isLiked ? 'text-red-500' : ''}`}
							onClick={handleLike}
						>
							{isLiked ? (
								<FaHeart className="w-[20px] h-[20px] fill-red-500" />
							) : (
								<FaRegHeart className="w-[20px] h-[20px]" />
							)}
							{likeCount}
						</span>
						<span
							className="flex items-center gap-[10px] text-[14px] font-medium cursor-pointer"
							onClick={() => setmodalId(id)}
						>
							<FaRegCommentAlt className="w-[20px] h-[20px]" />
							{commentCount}
						</span>
						<span className={`flex cursor-pointer`} onClick={handleSave}>
							{/* isSaved 상태에 따라 아이콘 변경 */}
							{isSaved ? (
								<FaBookmark className="w-[20px] h-[20px] fill-[#9AA6CE]" />
							) : (
								<FaRegBookmark className="w-[20px] h-[20px]" />
							)}
						</span>
					</div>
				</div>
				{/* 글 본문, 카테고리 태그 */}
				<div className="flex justify-between gap-[36px]">
					<div className="flex flex-col gap-4 mt-[36px] rounded-[10px] place-items-start">
						<h1 className="text-[18px] font-medium">{postTitle}</h1>
						<h1 className="flex text-[16px] leading-[31px] whitespace-pre-line text-left">{content}</h1>
					</div>

					<div className="self-end">
						{(location.pathname === '/user/community/total' || location.pathname === '/user/community/member') && (
							<CategoryTag category={category} />
						)}
					</div>
				</div>
				{isModalOpen && (
					<CommentModal
						isOpen={isModalOpen}
						onClose={() => window.history.back()}
						// onClose={() => setmodalId(null)}
						id={id}
						nickname={nickname}
						createdTime={createdTime}
						position={position}
						postTitle={postTitle}
						content={content}
						userProfile={userProfile}
						heart={likeCount}
						comments={comments}
						replies={replies}
						onCommentCountChange={handleCommentCountChange}
						isLiked={isLiked}
						setIsLiked={setIsLiked}
					/>
				)}
			</div>
		</div>
	);
};

export default PostItem;
