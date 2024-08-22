import { IoCloseOutline } from 'react-icons/io5';
import { FaRegCommentAlt, FaRegHeart, FaHeart } from 'react-icons/fa';
import MemoField from './MemoField';
import { useState, useEffect } from 'react';
import { FiMoreHorizontal, FiNavigation } from 'react-icons/fi';
import instance from '../api/instance';
import DEFAULT_PROFILE_IMAGE from '/images/기본프로필.png';
import { calculateTimeAge } from '../utils/calculateTimeAge';

const CommentModal = ({
	id,
	isOpen,
	onClose,
	nickname,
	createdTime,
	onCommentCountChange,
	position,
	postTitle,
	content,
	userProfile,
	heart,
	isLiked,
	setIsLiked,
}) => {
	const [openReplies, setOpenReplies] = useState({});
	// const [isHamburgerOpen, setIsHamburgerOpen] = useState({});
	const [activeHamburgerMenu, setActiveHamburgerMenu] = useState(null);
	const [wordCount, setWordCount] = useState(0);
	const [comment, setComment] = useState('');
	const [commentList, setCommentList] = useState([]);
	const [likeCount, setLikeCount] = useState(heart); // 좋아요 수
	const [replyContent, setReplyContent] = useState({}); // 각 댓글 ID에 대한 대댓글 내용
	// const [replyList, setReplyList] = useState([]);
	const [replyList, setReplyList] = useState({});

	const userData = {
		nickname: sessionStorage.getItem('nickname'),
		position: sessionStorage.getItem('field'),
		profile: sessionStorage.getItem('profileImage'),
		memId: sessionStorage.getItem('memberId'),
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

	if (!isOpen) return null;

	// const toggleReply = async (commentId) => {
	// 	setOpenReplies((prevState) => ({
	// 		...prevState,
	// 		[commentId]: !prevState[commentId],
	// 	}));
	// };

	const toggleReply = (commentId) => {
		setOpenReplies((prevState) => {
			const newState = { ...prevState, [commentId]: !prevState[commentId] };
			return newState;
		});
	};
	// const openHamburger = (commentId) => {
	// 	setIsHamburgerOpen((prevState) => ({
	// 		...prevState,
	// 		[commentId]: !prevState[commentId],
	// 	}));
	// };
	const openHamburger = (commentId) => {
		setActiveHamburgerMenu((prev) => (prev === commentId ? null : commentId));
	};

	const onInputHandler = (e) => {
		setWordCount(e.target.value.length);
		setComment(e.target.value);
	};

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

	// 댓글 작성
	const handleComment = async () => {
		const postData = {
			content: comment,
		};

		try {
			const response = await instance.post(`/api/comment?postId=${id}`, postData);
			if (response.status === 201) {
				console.log('댓글 작성 성공:', response.data);

				fetchComments(); // 댓글 리스트를 다시 가져오는 함수 호출
				setComment('');
				setWordCount(0);
				onCommentCountChange();
			}
		} catch (error) {
			console.error('포스트 작성 오류:', error);
			alert('댓글 작성에 실패했습니다. 다시 시도해 주세요.');
		}
	};

	// 댓글 삭제
	const handleDeleteComment = async (commentId) => {
		try {
			const response = await instance.delete(`/api/comment/${commentId}`);
			if (response.status === 200) {
				// 댓글 삭제 성공 시 commentList 업데이트
				setCommentList((prevCommentList) => prevCommentList.filter((comment) => comment.commentId !== commentId));
				onCommentCountChange();
			}
		} catch (error) {
			console.error('댓글 삭제 오류:', error);
			alert('댓글 삭제에 실패했습니다. 다시 시도해 주세요.');
		}
	};

	// 게시글 삭제
	const handlePostDelete = async (id) => {
		try {
			const response = await instance.delete(`/api/post/${id}/delete`);
			if (response.status === 200) {
				console.log('게시글 삭제 성공');
				onClose();
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

	// 대댓글 좋아요

	// 댓긅 좋아요 삭제 및 추가
	// 이게 진짜 코드인데... get이 없어서 안됨...
	// const handleLikeComment = async (commentId) => {
	// 	try {
	// 		if (commentLike) {
	// 			// commentLike가 해당 댓글의 현재 상태를 추적하는지 확인
	// 			const response = await instance.delete(`/api/comment/likes/${commentId}`);
	// 			if (response.status === 200) {
	// 				setCommentLike(false);
	// 				setCommentLikeCount((prevCount) => prevCount - 1);
	// 			}
	// 		} else {
	// 			const response = await instance.post(`/api/comment/likes/${commentId}`);
	// 			if (response.status === 200) {
	// 				setCommentLike(true);
	// 				setCommentLikeCount((prevCount) => prevCount + 1);
	// 			}
	// 		}
	// 	} catch (error) {
	// 		console.error('댓글 좋아요 처리 오류:', error);
	// 		alert('댓글 좋아요 처리에 문제가 생겼습니다.');
	// 	}
	// };

	// 데모데이용 임시방편
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

	// 대댓글 작성
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
				onCommentCountChange(); // 댓글 개수 업데이트
			}
		} catch (error) {
			console.error('대댓글 작성 오류:', error);
			alert('대댓글 작성에 실패했습니다. 다시 시도해 주세요.');
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
		<div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white overflow-auto rounded-lg shadow-lg p-9 w-[90%] h-[90%] relative">
				<div className="flex justify-end">
					<IoCloseOutline className="w-[40px] h-[40px] cursor-pointer justify-end fill-white" onClick={onClose} />
				</div>
				<div className="flex items-center justify-between mt-[10px]">
					{/* 게시글 작성자 프로필 */}
					<div className="flex items-center">
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
					</div>
					{nickname === userData.nickname && (
						<FiMoreHorizontal className="w-6 h-6 cursor-pointer" onClick={() => openHamburger(id)} />
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
				<div className="flex flex-col gap-6 bg-blue-commuBg mt-[25px] h-[213px] rounded-[10px] place-items-start p-[24px]">
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
				{/* 댓글 쓰기 */}
				<div className="ml-5 mt-[30px] flex gap-3 items-start">
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
				{/* 댓글 보기 */}
				<div className="ml-[66px] mr-[36px]">
					<div className="">
						{commentList.map((com) => (
							<div key={com.commentId}>
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
									<h1 className="text-[15px] text-gray-800 cursor-pointer" onClick={() => toggleReply(com.commentId)}>
										{/* {openReplies[com.commentId] ? '댓글 숨기기' : '댓글 보기'} */}
										{getButtonText(com.commentId, com.replyList)}
									</h1>
								</div>
								{openReplies[com.commentId] && (
									<div className="mt-[35px] flex ml-[16px]">
										<div className="flex flex-col items-center">
											<div className="h-full w-[1px] bg-gray-500 mt-[-30px]"></div>
										</div>
										<div className="flex flex-col ml-10 w-4/5">
											{replyList[com.commentId] &&
												replyList[com.commentId].map((reply) => (
													<div key={reply.replyCommentId} className="mb-9">
														<div className="flex items-start">
															<span>
																<img
																	src={com.profileImageUrl || DEFAULT_PROFILE_IMAGE}
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
																<div className="absolute right-[330px] mt-[29px] w-[201px] h-[50px] rounded-[10px] border border-[#C5D2F7] hover:bg-navy-commuDropboxHover z-50">
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
															// onClick={handleLikeReply(com.commentId, reply.replyCommentId)}
														>
															<FaRegHeart className="w-[21px] h-[21px]" />
															{reply.likeCount}
														</span>
													</div>
												))}
											<div className="gap-[18px] flex items-center">
												<span>
													<img src={userProfile} className="rounded-full w-9 h-9" />
												</span>
												<MemoField
													type={'communityCocoment'}
													placeholderText={'댓글을 남기세요'}
													onChange={(e) => setReplyContent({ ...replyContent, [com.commentId]: e.target.value })}
													value={replyContent[com.commentId] || ''}
													onIconClick={() => handleReplySubmit(com.commentId)} // <-- Function reference
												/>
											</div>
										</div>
									</div>
								)}
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default CommentModal;
