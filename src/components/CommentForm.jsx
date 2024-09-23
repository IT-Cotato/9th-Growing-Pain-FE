import MemoField from './MemoField';
import { useState } from 'react';
import instance from '../api/instance';

const CommentForm = ({ id }) => {
	const [wordCount, setWordCount] = useState(0);
	const [comment, setComment] = useState('');
	const [commentList, setCommentList] = useState([]);

	const userData = {
		nickname: sessionStorage.getItem('nickname'),
		position: sessionStorage.getItem('field'),
		profile: sessionStorage.getItem('profileImage'),
		memId: sessionStorage.getItem('memberId'),
	};

	const onInputHandler = (e) => {
		setWordCount(e.target.value.length);
		setComment(e.target.value);
	};

	// 댓글 작성
	const handleComment = async () => {
		const postData = {
			content: comment,
		};

		try {
			const response = await instance.post(`/api/comment?postId=${id}`, postData);
			if (response.status === 201) {
				console.log('댓글 작성 성공:', response.data);
				setComment('');
				setWordCount(0);
			}
		} catch (error) {
			console.error('포스트 작성 오류:', error);
			alert('댓글 작성에 실패했습니다. 다시 시도해 주세요.');
		}
		window.location.reload();
	};

	return (
		<div className="flex gap-3 items-start w-full">
			<span>
				<img src={userData.profile} alt={`${userData.nickname} profile`} className="rounded-full w-9 h-9" />
			</span>
			<div className="h-[132px] w-full rounded-[10px] border-[1.5px] border-solid border-blue-commuWriteComment flex flex-col">
				<MemoField
					type={'communityComment'}
					placeholderText={'댓글을 남기세요'}
					onChange={onInputHandler}
					maxLength="300"
					value={comment}
				/>
				<div className="flex items-center justify-end gap-7 mt-[-9px]">
					<h1 className="text-gray-700">{wordCount}/300자</h1>
					<button
						className="h-[41px] bg-navy-dark rounded-br-[10px] w-[128px] text-[15px] text-white"
						onClick={handleComment}
					>
						댓글등록
					</button>
				</div>
			</div>
		</div>
	);
};

export default CommentForm;
