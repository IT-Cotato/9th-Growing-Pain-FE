import { useState, useEffect } from 'react';
import instance from '../api/instance';
import CommentItem from './CommentItem';

const CommentList = ({ id, isOpen }) => {
	const [commentList, setCommentList] = useState([]);
	const [likedComments, setLikedComments] = useState([]);

	const userData = {
		nickname: sessionStorage.getItem('nickname'),
		position: sessionStorage.getItem('field'),
		profile: sessionStorage.getItem('profileImage'),
		memId: sessionStorage.getItem('memberId'),
	};

	// 댓글 좋아요 불러오기
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

	// 댓글 가져오기
	useEffect(() => {
		if (isOpen) {
			fetchComments();
		}
	}, []);

	// 댓글 가져오는 함수
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

	// 댓글 삭제
	const handleDeleteComment = async (commentId) => {
		try {
			const response = await instance.delete(`/api/comment/${commentId}`);
			if (response.status === 200) {
				// 댓글 삭제 성공 시 상태 업데이트
				setCommentList((prevCommentList) => {
					const updatedCommentList = Object.keys(prevCommentList).reduce((acc) => {
						acc = prevCommentList.filter((com) => com.CommentId !== commentId);
						return acc;
					}, {});
					return updatedCommentList;
				});
			}
		} catch (error) {
			console.error('댓글 삭제 오류:', error);
			alert('댓글 삭제에 실패했습니다. 다시 시도해 주세요.');
		}
		fetchComments();
	};

	return (
		<div>
			{commentList.map((com) => {
				const isLikedByUser = likedComments.some((likedComment) => likedComment.commentId === com.commentId);

				return (
					<CommentItem
						key={com.commentId}
						com={{ ...com, commentLike: isLikedByUser }} // Pass `commentLike` as true/false based on user likes
						id={id}
						handleDeleteComment={handleDeleteComment}
					/>
				);
			})}
		</div>
	);
};

export default CommentList;
