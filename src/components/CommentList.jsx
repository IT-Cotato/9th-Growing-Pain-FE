import { useState, useEffect } from 'react';
import instance from '../api/instance';
import CommentItem from './CommentItem';

const CommentList = ({ id, isOpen }) => {
	const [commentList, setCommentList] = useState([]);
	const [openReplies, setOpenReplies] = useState({});
	const [replyList, setReplyList] = useState({});
	const [likedComments, setLikedComments] = useState([]);

	const userData = {
		nickname: sessionStorage.getItem('nickname'),
		position: sessionStorage.getItem('field'),
		profile: sessionStorage.getItem('profileImage'),
		memId: sessionStorage.getItem('memberId'),
	};

	useEffect(() => {
		const fetchLikePosts = async () => {
			try {
				const response = await instance.get(`/api/comment/likes/${userData.memId}/list`);
				if (response.status === 200) {
					const likeComments = response.data.data.commentList;
					setLikedComments(likeComments); // Save the liked comments
				}
			} catch (error) {
				console.error('Failed to fetch liked comments:', error);
			}
		};
		fetchLikePosts();
	}, [userData.memId]);

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

	// 댓글 가져오기
	useEffect(() => {
		if (isOpen) {
			const fetchComments = async () => {
				try {
					const response = await instance.get(`/api/comment/${id}`);
					if (response.status === 200) {
						const updatedComments = response.data.data.commentList.map((comment) => ({
							...comment,
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

	return (
		<div>
			{commentList.map((com) => {
				const isLikedByUser = likedComments.some((likedComment) => likedComment.commentId === com.commentId);

				return (
					<CommentItem
						key={com.commentId}
						com={{ ...com, commentLike: isLikedByUser }} // Pass `commentLike` as true/false based on user likes
						fetchReplies={fetchReplies}
						handleDeleteReply={handleDeleteReply}
						id={id}
					/>
				);
			})}
		</div>
	);
};

export default CommentList;
