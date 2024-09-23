import { IoCloseOutline } from 'react-icons/io5';
import { useState, useEffect } from 'react';
import CommentForm from './CommentForm';
import PostText from './PostText';
import CommentList from './CommentList';

const CommentModal = ({
	id,
	isOpen,
	onClose,
	nickname,
	createdTime,
	position,
	postTitle,
	content,
	userProfile,
	heart,
	isLiked,
	setIsLiked,
}) => {
	const [commentList, setCommentList] = useState([]);
	const [likeCount, setLikeCount] = useState(heart); // 좋아요 수

	// 모달창 켜져있으면 뒷 배경 스크롤 막기
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}
		return () => {
			document.body.style.overflow = 'auto';
		};
	}, [isOpen]);

	if (!isOpen) return null;

	//대댓글 좋아요
	// const handleLikeReply = async (replyId) => {
	// 	try {
	// 		// 서버에서 대댓글 상태를 확인하고 처리
	// 		const selectedReply = replyList[
	// 			Object.keys(replyList).find((id) => replyList[id].some((reply) => reply.replyCommentId === replyId))
	// 		].find((reply) => reply.replyCommentId === replyId);

	// 		if (selectedReply.replyLike) {
	// 			await instance.delete(`/api/reply-comment/likes/${replyId}`);
	// 		} else {
	// 			await instance.post(`/api/reply-comment/likes/${replyId}`);
	// 		}

	// 		// 클라이언트에서 UI 업데이트
	// 		setReplyList((prevReplyList) => {
	// 			const updatedReplyList = { ...prevReplyList };
	// 			Object.keys(updatedReplyList).forEach((commentId) => {
	// 				updatedReplyList[commentId] = updatedReplyList[commentId].map((reply) => {
	// 					if (reply.replyCommentId === replyId) {
	// 						return {
	// 							...reply,
	// 							replyLike: !reply.replyLike,
	// 							likeCount: reply.replyLike ? reply.likeCount - 1 : reply.likeCount + 1,
	// 						};
	// 					}
	// 					return reply;
	// 				});
	// 			});
	// 			return updatedReplyList;
	// 		});
	// 	} catch (error) {
	// 		console.error('대댓글 좋아요 처리 오류:', error);
	// 		alert('대댓글 좋아요 처리에 문제가 생겼습니다.');
	// 	}
	// };

	return (
		<div className="bg-white overflow-auto rounded-lg shadow-lg p-9 w-[90%] h-[90%] relative">
			<div className="flex justify-end">
				<IoCloseOutline className="w-[40px] h-[40px] cursor-pointer justify-end fill-white" onClick={onClose} />
			</div>
			<div className="flex items-center justify-between mt-[10px]">
				<PostText
					userProfile={userProfile}
					nickname={nickname}
					position={position}
					createdTime={createdTime}
					id={id}
					postTitle={postTitle}
					content={content}
					isLiked={isLiked}
					commentList={commentList}
					setIsLiked={setIsLiked}
					heart={likeCount}
				/>
			</div>
			{/* 댓글 쓰기 */}
			<div className="ml-5 mt-[30px] flex gap-3 items-start">
				<CommentForm id={id} />
			</div>
			{/* 댓글 보기 */}
			<div className="ml-[66px] mr-[36px]">
				<CommentList id={id} isOpen={isOpen} />
			</div>
		</div>
	);
};

export default CommentModal;
