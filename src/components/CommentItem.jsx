// CommentItem.js
import { useState } from 'react';
import DEFAULT_PROFILE_IMAGE from '/images/기본프로필.png';
import { calculateTimeAge } from '../utils/calculateTimeAge';
import { FiMoreHorizontal } from 'react-icons/fi';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import instance from '../api/instance';
import MemoField from './MemoField';

const CommentItem = ({
	com, // 댓글 정보
	fetchReplies,
	handleDeleteComment,
	handleDeleteReply,
	handleLikeComment,
	handleReplySubmit,
}) => {
	const userData = {
		nickname: sessionStorage.getItem('nickname'),
		position: sessionStorage.getItem('field'),
		profile: sessionStorage.getItem('profileImage'),
		memId: sessionStorage.getItem('memberId'),
	};

	const [activeHamburgerMenu, setActiveHamburgerMenu] = useState(null);
	const [openReplies, setOpenReplies] = useState(false);
	const [replyList, setReplyList] = useState([]);
	const [replyContent, setReplyContent] = useState('');

	const openHamburger = (commentId) => {
		setActiveHamburgerMenu((prev) => (prev === commentId ? null : commentId));
	};

	const toggleReply = () => {
		setOpenReplies((prev) => !prev);
		if (!openReplies && !replyList.length) {
			fetchReplies(com.commentId);
		}
	};

	return (
		<div>
			<div className="flex items-start pt-[56px]">
				<span>
					<img src={com.profileImageUrl || DEFAULT_PROFILE_IMAGE} className="rounded-full w-9 h-9" />
				</span>
				<div className="flex ml-[12px] gap-2 items-end">
					<h1 className="text-[16px] font-medium">{com.memberNickname}</h1>
					<h1 className="text-[14px] text-gray-commuPosition">{com.memberField}</h1>
					<h1 className="text-[14px] text-gray-commuPosition">{calculateTimeAge(new Date(com.createdAt))}</h1>
				</div>
			</div>
			<div className="flex justify-between">
				<div className="flex flex-col mr-[2px] rounded-[10px] mb-[14px] place-items-start ml-[50px] w-[1084px]">
					<h1 className="flex text-[16px] leading-[31px] whitespace-pre-line text-left">{com.content}</h1>
				</div>
				{com.memberId === Number(userData.memId) && (
					<FiMoreHorizontal className="w-6 h-6 cursor-pointer" onClick={() => openHamburger(com.commentId)} />
				)}

				{activeHamburgerMenu === com.commentId && (
					<div className="absolute right-[71px] mt-[29px] w-[201px] h-[50px] rounded-[10px] border border-[#C5D2F7] hover:bg-navy-commuDropboxHover z-50">
						<ul>
							<li
								className="px-[19px] py-[14px] text-[17px] text-left cursor-pointer"
								onClick={() => handleDeleteComment(com.commentId)}
							>
								삭제
							</li>
						</ul>
					</div>
				)}
			</div>
			<div className="flex gap-6 items-center">
				<span
					className="flex items-center gap-[10px] text-[14px] font-medium cursor-pointer ml-[50px]"
					onClick={() => handleLikeComment(com.commentId)}
				>
					{com.commentLike ? (
						<FaHeart className="w-[20px] h-[20px] fill-red-500" />
					) : (
						<FaRegHeart className="w-[20px] h-[20px]" />
					)}
					{com.likeCount}
				</span>
				<h1 className="text-[15px] text-gray-800 cursor-pointer" onClick={toggleReply}>
					{openReplies ? '댓글 숨기기' : '댓글 보기'}
				</h1>
			</div>
			{openReplies && (
				<div className="mt-[35px] flex ml-[16px]">
					<div className="flex flex-col items-center">
						<div className="h-full w-[1px] bg-gray-500 mt-[-30px]"></div>
					</div>
					<div className="flex flex-col ml-10 w-4/5">
						{replyList.map((reply) => (
							<div key={reply.replyCommentId} className="mb-9">
								<div className="flex items-start">
									<span>
										<img
											src={reply.profileImageUrl || DEFAULT_PROFILE_IMAGE}
											alt={`${reply.nickname} profile`}
											className="rounded-full w-9 h-9"
										/>
									</span>
									<div className="flex ml-[12px] gap-2 items-end">
										<h1 className="text-[16px] font-medium">{reply.memberNickname}</h1>
										<h1 className="text-[14px] text-gray-commuPosition">{reply.memberField}</h1>
										<h1 className="flex text-[14px] text-gray-commuPosition">
											{calculateTimeAge(new Date(reply.createdAt))}
										</h1>
									</div>
								</div>
								<div className="flex justify-between">
									<div className="flex flex-col mr-[2px] rounded-[10px] mb-[14px] place-items-start ml-[50px] w-[1048px]">
										<h1 className="flex text-[16px] leading-[31px] whitespace-pre-line text-left font-normal">
											{reply.content}
										</h1>
									</div>
									{reply.memberId === Number(userData.memId) && (
										<FiMoreHorizontal
											className="w-6 h-6 cursor-pointer"
											onClick={() => openHamburger(reply.replyCommentId)}
										/>
									)}

									{activeHamburgerMenu === reply.replyCommentId && (
										<div className="absolute right-[290px] mt-[29px] w-[201px] h-[50px] rounded-[10px] border border-[#C5D2F7] hover:bg-navy-commuDropboxHover z-50">
											<ul>
												<li
													className="px-[19px] py-[14px] text-[17px] text-left cursor-pointer"
													onClick={() => handleDeleteReply(reply.replyCommentId)}
												>
													삭제
												</li>
											</ul>
										</div>
									)}
								</div>
								<span className="flex items-center gap-[10px] text-[14px] font-medium cursor-pointer ml-[50px]">
									<FaRegHeart className="w-[21px] h-[21px]" />
									{reply.likeCount}
								</span>
							</div>
						))}
						<div className="gap-[18px] flex items-center">
							<span>
								<img src={userData.profile} className="rounded-full w-9 h-9" />
							</span>
							<MemoField
								type={'communityCocoment'}
								placeholderText={'댓글을 남기세요'}
								onChange={(e) => setReplyContent(e.target.value)}
								value={replyContent}
								onIconClick={() => handleReplySubmit(com.commentId)}
							/>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default CommentItem;
