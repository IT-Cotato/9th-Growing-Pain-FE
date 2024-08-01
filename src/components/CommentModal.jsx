import { IoCloseOutline } from 'react-icons/io5';
import { FaRegCommentAlt, FaRegHeart } from 'react-icons/fa';
import MemoField from './MemoField';
import { useState, useRef, useEffect } from 'react';

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
	comments = [], // comments가 제공되지 않을 경우 빈 배열로 기본값 설정
}) => {
	if (!isOpen) return null;

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
						<img src={userProfile} alt={`${nickname} profile`} className="rounded-full w-9 h-9 mt-[6px]" />
					</span>
					<MemoField type={'communityComment'} placeholderText={'댓글을 남기세요'} />
				</div>
				{/* 댓글 보기 */}
				<div className="mt-[0px] ml-[66px] mr-[46px]">
					<div className="pt-[20px]">
						{comments.map((com) => (
							<div key={com.id}>
								<div className="flex items-center">
									<span>
										<img src={com.userProfile} className="rounded-full w-9 h-9" />
									</span>
									<div className="flex ml-[12px] gap-2 items-end">
										<h1 className="text-[16px] font-medium">{com.nickname}</h1>
										<h1 className="text-[14px] text-gray-commuPosition">{com.position}</h1>
										<h1 className="flex text-[14px] text-gray-commuPosition">{com.createdTime}</h1>
									</div>
								</div>
								<div className="flex flex-col mr-[2px] rounded-[10px] mb-[14px] place-items-start ml-[50px] w-[1084px]">
									<h1 className="flex text-[16px] leading-[31px] whitespace-pre-line text-left">{com.content}</h1>
								</div>
								<span className="flex items-center gap-[10px] text-[14px] font-medium cursor-pointer ml-[50px]">
									<FaRegHeart className="w-[21px] h-[21px]" />
									{com.heart}
								</span>
								{/* Reply list */}
								<div className="mt-[20px]">
									{com.replies &&
										com.replies.map((reply) => (
											<div key={reply.id} className="ml-[66px] mb-9">
												<div className="flex items-center">
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
													<h1 className="flex text-[16px] leading-[31px] whitespace-pre-line text-left">
														{reply.content}
													</h1>
												</div>
												<span className="flex items-center gap-[10px] text-[14px] font-medium cursor-pointer ml-[50px]">
													<FaRegHeart className="w-[21px] h-[21px]" />
													{reply.heart}
												</span>
											</div>
										))}
								</div>
							</div>
						))}
					</div>
				</div>
				<div className="ml-[66px] mt-[38px] gap-[18px] flex items-center">
					<span>
						<img src={userProfile} className="rounded-full w-9 h-9" />
					</span>
					<MemoField type={'communityCocoment'} placeholderText={'댓글을 남기세요'} />
				</div>
			</div>
		</div>
	);
};

export default CommentModal;
