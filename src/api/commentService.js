import instance from './instance';

export const fetchComments = async (id) => {
	try {
		const response = await instance.get(`/api/comment/${id}`);
		return response.data;
	} catch (error) {
		console.error('댓글 가져오기 오류:', error);
		throw error;
	}
};

export const fetchReplies = async (commentId) => {
	try {
		const response = await instance.get(`/api/reply/${commentId}`);
		return response.data;
	} catch (error) {
		console.error('답글 가져오기 오류:', error);
		throw error;
	}
};

export const deleteComment = async (commentId) => {
	try {
		await instance.delete(`/api/comment/${commentId}`);
	} catch (error) {
		console.error('댓글 삭제 오류:', error);
		throw error;
	}
};

export const deletePost = async (postId) => {
	try {
		await instance.delete(`/api/post/${postId}`);
	} catch (error) {
		console.error('게시물 삭제 오류:', error);
		throw error;
	}
};
