import { useState, useEffect } from 'react';
import instance from '../api/instance';
import CommentItem from './CommentItem';

const CommentList = ({ id, isOpen }) => {
	const [commentList, setCommentList] = useState([]);
	const [activeHamburgerMenu, setActiveHamburgerMenu] = useState(null);
	const [openReplies, setOpenReplies] = useState({});
	const [replyList, setReplyList] = useState({});
	const [replyContent, setReplyContent] = useState({});

	const openHamburger = (commentId) => {
		setActiveHamburgerMenu((prev) => (prev === commentId ? null : commentId));
	};

	const toggleReply = (commentId) => {
		setOpenReplies((prevState) => {
			const newState = { ...prevState, [commentId]: !prevState[commentId] };
			return newState;
		});
	};

	const getButtonText = (commentId) => {
		const replies = replyList[commentId];

		if (openReplies[commentId]) {
			return '댓글 숨기기'; // 대댓글이 열려있으면 '댓글 숨기기'
		} else if (!replies || replies.length === 0) {
			return '댓글 달기'; // 대댓글이 없으면 '답글쓰기'
		} else {
			return '댓글 보기'; // 대댓글이 있으면 '댓글 보기'
		}
	};

	const handleDeleteReply = async (replyId) => {
		try {
			const response = await instance.delete(`/api/reply-comment/${replyId}`);
			if (response.status === 200) {
				// 대댓글 삭제 성공 시 상태 업데이트
				setReplyList((prevReplyList) => {
					const updatedReplyList = Object.keys(prevReplyList).reduce((acc, commentId) => {
						acc[commentId] = prevReplyList[commentId].filter((reply) => reply.replyCommentId !== replyId);
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

	const handleReplySubmit = async (commentId) => {
		const content = replyContent[commentId];
		if (!content) {
			alert('대댓글 내용을 입력하세요.');
			return;
		}

		const postData = {
			content: content,
		};

		try {
			const response = await instance.post(`/api/reply-comment?postId=${id}&commentId=${commentId}`, postData);
			if (response.status === 201) {
				console.log('대댓글 작성 성공:', response.data);
				fetchReplies(commentId); // 대댓글을 다시 가져오는 함수 호출
				setReplyContent({ ...replyContent, [commentId]: '' }); // 대댓글 입력 필드 비우기
				// onCommentCountChange(); // 댓글 개수 업데이트
			}
		} catch (error) {
			console.error('대댓글 작성 오류:', error);
			alert('대댓글 작성에 실패했습니다. 다시 시도해 주세요.');
		}
	};

	// 댓글 가져오기
	useEffect(() => {
		if (isOpen) {
			const fetchComments = async () => {
				try {
					const response = await instance.get(`/api/comment/${id}`);
					if (response.status === 200) {
						const updatedComments = response.data.data.commentList.map((comment) => ({
							...comment,
							commentLike: false, // 초기에는 좋아요가 눌려있지 않음
						}));
						setCommentList(updatedComments);
					}
				} catch (error) {
					console.error('댓글 가져오기 오류:', error);
					alert('댓글을 가져오는 데 실패했습니다. 다시 시도해 주세요.');
				}
			};
			fetchComments();
		}
	}, [isOpen, id]);

	// 대댓글 가져오기
	useEffect(() => {
		const fetchReply = async (commentId) => {
			try {
				const response = await instance.get(`/api/reply-comment/${commentId}`);
				if (response.status === 200) {
					const updatedReplies = response.data.data.replyCommentList.map((reply) => ({
						...reply,
						replyLike: false, // 초기에는 좋아요가 눌려있지 않음
					}));
					setReplyList((prevReplies) => ({
						...prevReplies,
						[commentId]: updatedReplies,
					}));
				}
			} catch (error) {
				console.error('대댓글 가져오기 오류:', error);
				alert('대댓글을 가져오는 데 실패했습니다. 다시 시도해 주세요.');
			}
		};

		Object.keys(openReplies).forEach((commentId) => {
			if (openReplies[commentId] && !replyList[commentId]) {
				fetchReply(commentId);
			}
		});
	}, [openReplies, replyList]);

	const fetchComments = async () => {
		try {
			const response = await instance.get(`/api/comment/${id}`);
			if (response.status === 200) {
				const updatedComments = response.data.data.commentList.map((comment) => ({
					...comment,
					commentLike: false, // 초기에는 좋아요가 눌려있지 않음
				}));
				setCommentList(updatedComments);
			}
		} catch (error) {
			console.error('댓글 가져오기 오류:', error);
			alert('댓글을 가져오는 데 실패했습니다. 다시 시도해 주세요.');
		}
	};

	const fetchReplies = async (commentId) => {
		try {
			const response = await instance.get(`/api/reply-comment/${commentId}`);
			if (response.status === 200) {
				const updatedReplies = response.data.data.replyCommentList.map((reply) => ({
					...reply,
					replyLike: false, // 초기에는 좋아요가 눌려있지 않음
				}));
				setReplyList((prevReplyList) => ({
					...prevReplyList,
					[commentId]: updatedReplies,
				}));
			}
		} catch (error) {
			console.error('대댓글 가져오기 오류:', error);
			alert('대댓글을 가져오는 데 실패했습니다. 다시 시도해 주세요.');
		}
	};

	const handleLikeComment = async (commentId) => {
		try {
			const updatedComments = commentList.map((comment) => {
				if (comment.commentId === commentId) {
					const updatedLike = !comment.commentLike;
					const updatedLikeCount = updatedLike ? comment.likeCount + 1 : comment.likeCount - 1;

					// 클라이언트에서 UI 업데이트
					return {
						...comment,
						commentLike: updatedLike,
						likeCount: updatedLikeCount,
					};
				}
				return comment;
			});
			setCommentList(updatedComments);

			// 서버 요청으로 실제 좋아요 처리
			const selectedComment = commentList.find((comment) => comment.commentId === commentId);
			if (selectedComment.commentLike) {
				await instance.delete(`/api/comment/likes/${commentId}`);
			} else {
				await instance.post(`/api/comment/likes/${commentId}`);
			}
		} catch (error) {
			console.error('댓글 좋아요 처리 오류:', error);
			alert('댓글 좋아요 처리에 문제가 생겼습니다.');
		}
	};

	const handleDeleteComment = async (commentId) => {
		try {
			const response = await instance.delete(`/api/comment/${commentId}`);
			if (response.status === 200) {
				// 댓글 삭제 성공 시 commentList 업데이트
				setCommentList((prevCommentList) => prevCommentList.filter((comment) => comment.commentId !== commentId));
				// onCommentCountChange();
			}
		} catch (error) {
			console.error('댓글 삭제 오류:', error);
			alert('댓글 삭제에 실패했습니다. 다시 시도해 주세요.');
		}
	};

	return (
		<div>
			{commentList.map((com) => (
				<CommentItem
					key={com.commentId}
					com={com}
					fetchReplies={fetchReplies}
					handleDeleteComment={handleDeleteComment}
					handleDeleteReply={handleDeleteReply}
					handleLikeComment={handleLikeComment}
					handleReplySubmit={handleReplySubmit}
				/>
			))}
		</div>
	);
};

export default CommentList;
