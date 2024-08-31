import React from 'react';
import { FaHeart, FaRegHeart, FaRegCommentAlt } from 'react-icons/fa';
import { FiMoreHorizontal } from 'react-icons/fi';
import { useState } from 'react';
import instance from '../api/instance';

const PostText = ({
	userProfile,
	nickname,
	position,
	createdTime,
	id,
	postTitle,
	content,
	isLiked,
	commentList,
	setIsLiked,
	heart,
}) => {
	const [activeHamburgerMenu, setActiveHamburgerMenu] = useState(null);
	const [likeCount, setLikeCount] = useState(heart); // 좋아요 수

	const userData = {
		nickname: sessionStorage.getItem('nickname'),
		position: sessionStorage.getItem('field'),
		profile: sessionStorage.getItem('profileImage'),
		memId: sessionStorage.getItem('memberId'),
	};

	const openHamburger = (commentId) => {
		setActiveHamburgerMenu((prev) => (prev === commentId ? null : commentId));
	};

	// 게시글 삭제
	const handlePostDelete = async (id) => {
		try {
			const response = await instance.delete(`/api/post/${id}/delete`);
			if (response.status === 200) {
				console.log('게시글 삭제 성공');
				window.location.reload();
			}
		} catch (error) {
			console.error('게시글 삭제 오류:', error);
			alert('댓글 삭제에 실패했습니다. 다시 시도해 주세요.');
		}
	};

	// 게시글 좋아요 삭제 및 추가
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

	return (
		<div className="w-full">
			{/* 작성자 프로필 */}
			<div className="flex items-center relative">
				<span>
					<img src={userProfile} alt={`${nickname} profile`} className="rounded-full w-9 h-9" />
				</span>
				<div className="flex flex-col ml-[12px]">
					<div className="flex gap-2 items-end">
						<h1 className="text-[16px] font-medium">{nickname}</h1>
						<h1 className="text-[14px] text-gray-commuPosition">{position}</h1>
					</div>
					<h1 className="flex text-[14px] text-gray-commuPosition">{createdTime}</h1>
				</div>
				{nickname === userData.nickname && (
					<FiMoreHorizontal className="w-6 h-6 cursor-pointer absolute right-0" onClick={() => openHamburger(id)} />
				)}

				{activeHamburgerMenu === id && (
					<div className="absolute right-[36px] mt-[90px] w-[201px] h-[50px] rounded-[10px] border border-[#C5D2F7] hover:bg-navy-commuDropboxHover z-50 bg-white">
						<ul>
							<li
								className="px-[19px] py-[14px] text-[17px] text-left cursor-pointer"
								onClick={() => handlePostDelete(id)}
							>
								삭제
							</li>
						</ul>
					</div>
				)}
			</div>

			{/* 본문 */}
			<div className="w-full flex flex-col gap-6 bg-blue-commuBg mt-[25px] h-[213px] rounded-[10px] place-items-start p-[24px]">
				<h1 className="text-[17px] font-medium">{postTitle}</h1>
				<h1 className="flex text-[16px] leading-[31px] whitespace-pre-line text-left">{content}</h1>
			</div>

			<div className="flex gap-2 mt-[24px] items-center">
				<span className="flex items-center gap-[10px] text-[14px] font-medium cursor-pointer" onClick={handleLike}>
					{isLiked ? (
						<FaHeart className="w-[20px] h-[20px] fill-red-500" />
					) : (
						<FaRegHeart className="w-[20px] h-[20px]" />
					)}
					{likeCount}
				</span>
				<span className="flex items-center gap-[10px] text-[14px] ml-[20px] font-medium cursor-pointer">
					<FaRegCommentAlt className="w-[20px] h-[20px]" />
					{commentList.length}
				</span>
			</div>
		</div>
	);
};

export default PostText;
