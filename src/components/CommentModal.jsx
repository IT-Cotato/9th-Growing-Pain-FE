import { IoCloseOutline } from 'react-icons/io5';
import { FaRegCommentAlt, FaRegHeart } from 'react-icons/fa';
import MemoField from './MemoField';
import { useState, useEffect } from 'react';
import { FiMoreHorizontal, FiNavigation } from 'react-icons/fi';
import CustomDropdown from './CustomDropdown';

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
	comments = [],
}) => {
	const [openReplies, setOpenReplies] = useState({});
	const [isHamburgerOpen, setIsHamburgerOpen] = useState({});
	const [wordCount, setWordCount] = useState(0);

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

	const toggleReply = (commentId) => {
		setOpenReplies((prevState) => ({
			...prevState,
			[commentId]: !prevState[commentId],
		}));
	};

	const openHamburger = (commentId) => {
		setIsHamburgerOpen((prevState) => ({
			...prevState,
			[commentId]: !prevState[commentId],
		}));
	};

	const onInputHandler = (e) => {
		setWordCount(e.target.value.length);
	};

	return (
		<div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white overflow-auto rounded-lg shadow-lg p-9 w-[90%] h-[90%] relative">
				<div className="flex justify-end">
					<IoCloseOutline className="w-[40px] h-[40px] cursor-pointer justify-end fill-white" onClick={onClose} />
				</div>
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
				{/* 본문 */}
				<div className="flex flex-col gap-6 bg-blue-commuBg mt-[25px] h-[213px] rounded-[10px] place-items-start p-[24px]">
					<h1 className="text-[17px] font-medium">{postTitle}</h1>
					<h1 className="flex text-[16px] leading-[31px] whitespace-pre-line text-left">{content}</h1>
				</div>
				<div className="flex gap-2 mt-[24px] items-center">
					<span className="flex items-center gap-[10px] text-[14px] font-medium cursor-pointer">
						<FaRegHeart className="w-[21px] h-[21px]" />
						{heart}
					</span>
					<span className="flex items-center gap-[10px] text-[14px] ml-[20px] font-medium cursor-pointer">
						<FaRegCommentAlt className="w-[20px] h-[20px]" />
						{comments.length}
					</span>
				</div>
				{/* 댓글 쓰기 */}
				<div className="ml-5 mt-[30px] flex gap-3 items-start">
					<span>
						<img src={userProfile} alt={`${nickname} profile`} className="rounded-full w-9 h-9" />
					</span>
					<div className="h-[132px] w-full rounded-[10px] border-[1.5px] border-solid border-blue-commuWriteComment flex flex-col">
						<MemoField
							type={'communityComment'}
							placeholderText={'댓글을 남기세요'}
							onChange={onInputHandler}
							maxLength="300"
						/>
						<div className="flex items-center justify-end gap-7 mt-[-9px]">
							<h1 className="text-gray-700">{wordCount}/300자</h1>
							<button className="h-[41px] bg-navy-dark rounded-br-[10px] w-[128px] text-[15px] text-white">
								댓글등록
							</button>
						</div>
					</div>
				</div>
				{/* 댓글 보기 */}
				<div className="ml-[66px] mr-[36px]">
					<div className="">
						{comments.map((com) => (
							<div key={com.id}>
								<div className="flex items-start pt-[56px]">
									<span>
										<img src={com.userProfile} className="rounded-full w-9 h-9" />
									</span>
									<div className="flex ml-[12px] gap-2 items-end">
										<h1 className="text-[16px] font-medium">{com.nickname}</h1>
										<h1 className="text-[14px] text-gray-commuPosition">{com.position}</h1>
										<h1 className="flex text-[14px] text-gray-commuPosition">{com.createdTime}</h1>
									</div>
								</div>
								<div className="flex justify-between">
									<div className="flex flex-col mr-[2px] rounded-[10px] mb-[14px] place-items-start ml-[50px] w-[1084px]">
										<h1 className="flex text-[16px] leading-[31px] whitespace-pre-line text-left">{com.content}</h1>
									</div>
									<FiMoreHorizontal className="w-6 h-6 cursor-pointer" onClick={() => openHamburger(com.id)} />

									{isHamburgerOpen[com.id] && (
										<div className="absolute right-[71px] mt-[29px] w-[201px] h-[50px] rounded-[10px] border border-[#C5D2F7] hover:bg-navy-commuDropboxHover z-50">
											<ul>
												<li className="px-[19px] py-[14px] text-[17px] text-left cursor-pointer">삭제</li>
											</ul>
										</div>
									)}
								</div>
								<div className="flex gap-6 items-center">
									<span className="flex items-center gap-[10px] text-[14px] font-medium cursor-pointer ml-[50px]">
										<FaRegHeart className="w-[21px] h-[21px]" />
										{com.heart}
									</span>
									<h1 className="text-[15px] text-gray-800 cursor-pointer" onClick={() => toggleReply(com.id)}>
										{openReplies[com.id] ? '댓글 숨기기' : '댓글 보기'}
									</h1>
								</div>
								{openReplies[com.id] && (
									<div className="mt-[20px] flex ml-[16px]">
										<div className="flex flex-col items-center">
											<div className="h-full w-[1px] bg-gray-500 mt-[-30px]"></div>
										</div>
										<div className="flex flex-col ml-10 w-4/5">
											{com.replies &&
												com.replies.map((reply) => (
													<div key={reply.id} className="mb-9">
														<div className="flex items-start">
															<span>
																<img
																	src={reply.userProfile}
																	alt={`${reply.nickname} profile`}
																	className="rounded-full w-9 h-9"
																/>
															</span>
															<div className="flex ml-[12px] gap-2 items-end">
																<h1 className="text-[16px] font-medium">{reply.nickname}</h1>
																<h1 className="text-[14px] text-gray-commuPosition">{reply.position}</h1>
																<h1 className="flex text-[14px] text-gray-commuPosition">{reply.createdTime}</h1>
															</div>
														</div>
														<div className="flex flex-col mr-[2px] rounded-[10px] mb-[14px] place-items-start ml-[50px] w-[1084px]">
															<h1 className="flex text-[16px] leading-[31px] whitespace-pre-line text-left font-normal">
																{reply.content}
															</h1>
														</div>
														<span className="flex items-center gap-[10px] text-[14px] font-medium cursor-pointer ml-[50px]">
															<FaRegHeart className="w-[21px] h-[21px]" />
															{reply.heart}
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
													onChange={(e) => {}}
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
