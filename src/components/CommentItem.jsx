// CommentItem.js
import { useState, useEffect } from 'react';
import DEFAULT_PROFILE_IMAGE from '/images/기본프로필.png';
import { calculateTimeAge } from '../utils/calculateTimeAge';
import { FiMoreHorizontal } from 'react-icons/fi';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import instance from '../api/instance';
import MemoField from './MemoField';

const CommentItem = ({
	com, // 댓글 정보
	id,
	handleDeleteComment,
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

	const [commentLike, setCommentLike] = useState(com.commentLike);
	const [commentLikeCount, setCommentLikeCount] = useState(com.likeCount); // 좋아요 수

	const [likedReplies, setLikedReplies] = useState([]);

	const openHamburger = (commentId) => {
		setActiveHamburgerMenu((prev) => (prev === commentId ? null : commentId));
	};

	// 답글 보기/숨기기 토글
	const toggleReply = () => {
		setOpenReplies((prev) => !prev);
		if (!openReplies && !replyList.length) {
			fetchReplies(com.commentId);
		}
	};

	// 답글 쓰기
	const handleReplySubmit = async (commentId) => {
		if (!replyContent) {
			alert('대댓글 내용을 입력하세요.');
			return;
		}

		const postData = {
			content: replyContent,
		};

		try {
			const response = await instance.post(`/api/reply-comment?postId=${id}&commentId=${commentId}`, postData);
			if (response.status === 201) {
				console.log('대댓글 작성 성공:', response.data);
				fetchReplies(commentId); // 대댓글을 다시 가져오는 함수 호출
				setReplyContent(''); // 대댓글 입력 필드 비우기
				// onCommentCountChange(); // 댓글 개수 업데이트
			}
		} catch (error) {
			console.error('대댓글 작성 오류:', error);
			alert('대댓글 작성에 실패했습니다. 다시 시도해 주세요.');
		}
	};

	// 댓글 좋아요/취소
	const handleLikeComment = async (commentId) => {
		try {
			if (com.commentLike) {
				// commentLike가 해당 댓글의 현재 상태를 추적하는지 확인
				const response = await instance.delete(`/api/comment/likes/${commentId}`);
				if (response.status === 200) {
					setCommentLike(false);
					setCommentLikeCount((prevCount) => prevCount - 1);
				}
			} else {
				const response = await instance.post(`/api/comment/likes/${commentId}`);
				if (response.status === 200) {
					setCommentLike(true);
					setCommentLikeCount((prevCount) => prevCount + 1);
				}
			}
			window.location.reload();
		} catch (error) {
			console.error('댓글 좋아요 처리 오류:', error);
			alert('자신이 작성한 댓글엔 좋아요를 누를 수 없습니다.');
		}
	};

	// 답글 불러오기
	const fetchReplies = async (commentId) => {
		try {
			const response = await instance.get(`/api/reply-comment/${commentId}`);
			if (response.status === 200) {
				const updatedReplies = response.data.data.replyCommentList.map((reply) => ({
					...reply,
					isLikedByUser: likedReplies.some((likedReply) => likedReply.replyCommentId === reply.replyCommentId), // 좋아요 상태 반영
				}));
				setReplyList(updatedReplies);
			}
		} catch (error) {
			console.error('대댓글 가져오기 오류:', error);
			alert('대댓글을 가져오는 데 실패했습니다. 다시 시도해 주세요.');
		}
	};

	// 답글 삭제
	const handleDeleteReply = async (replyId) => {
		try {
			const response = await instance.delete(`/api/reply-comment/${replyId}`);
			if (response.status === 200) {
				// 대댓글 삭제 성공 시 상태 업데이트
				setReplyList((prevReplyList) => {
					const updatedReplyList = Object.keys(prevReplyList).reduce((acc) => {
						acc = prevReplyList.filter((reply) => reply.replyCommentId !== replyId);
						return acc;
					}, {});
					return updatedReplyList;
				});
			}
		} catch (error) {
			console.error('대댓글 삭제 오류:', error);
			alert('대댓글 삭제에 실패했습니다. 다시 시도해 주세요.');
		}
	};

	// 답글 좋아요 불러오기
	useEffect(() => {
		const fetchLikedReplies = async () => {
			try {
				const response = await instance.get(`/api/reply-comment/likes/${userData.memId}/list`);
				if (response.status === 200) {
					const likeReplies = response.data.data.replyCommentList;
					setLikedReplies(likeReplies);
				}
			} catch (error) {
				console.error('Failed to fetch liked replies:', error);
			}
		};
		fetchLikedReplies();
	}, [userData.memId]);

	// 답글 좋아요/취소
	const handleLikeReply = async (replyId) => {
		try {
			const isLikedByUser = likedReplies.some((reply) => reply.replyCommentId === replyId);

			if (isLikedByUser) {
				await instance.delete(`/api/reply-comment/likes/${replyId}`);
				// likedReplies 업데이트
				setLikedReplies((prev) => prev.filter((reply) => reply.replyCommentId !== replyId));
				// replyList 업데이트
				setReplyList((prevReplyList) =>
					prevReplyList.map((reply) =>
						reply.replyCommentId === replyId
							? { ...reply, isLikedByUser: false, likeCount: reply.likeCount - 1 } // 좋아요 취소 반영
							: reply,
					),
				);
			} else {
				await instance.post(`/api/reply-comment/likes/${replyId}`);
				// likedReplies 업데이트
				setLikedReplies((prev) => [...prev, { replyCommentId: replyId }]);
				// replyList 업데이트
				setReplyList((prevReplyList) =>
					prevReplyList.map((reply) =>
						reply.replyCommentId === replyId
							? { ...reply, isLikedByUser: true, likeCount: reply.likeCount + 1 } // 좋아요 반영
							: reply,
					),
				);
			}
		} catch (error) {
			console.error('대댓글 좋아요 처리 오류:', error);
			alert('대댓글 좋아요 처리에 문제가 생겼습니다.');
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
					{openReplies ? '답글 숨기기' : '답글 보기'}
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
								<span
									className="flex items-center gap-[10px] text-[14px] font-medium cursor-pointer ml-[50px]"
									onClick={() => handleLikeReply(reply.replyCommentId)}
								>
									{reply.isLikedByUser ? (
										<FaHeart className="w-[20px] h-[20px] fill-red-500" />
									) : (
										<FaRegHeart className="w-[20px] h-[20px]" />
									)}
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
								placeholderText={'답글을 남기세요'}
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
