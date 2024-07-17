import { FaRegCommentAlt, FaRegHeart, FaHeart, FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { useState } from 'react';
import CommentModal from '../components/CommentModal';

const PostItem = ({
	id,
	nickname,
	createdTime,
	position,
	postTitle,
	content,
	userProfile,
	heart,
	comment,
	bookmark,
}) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const ModalOpen = () => {
		setIsModalOpen(true);
	};

	const ModalClose = () => {
		setIsModalOpen(false);
	};

	return (
		<div className="bg-white mr-[32px] h-[429px] rounded-[10px]">
			{/* 프로필 */}
			<div className="flex pt-[36px] px-[36px] items-center justify-between">
				<div className="flex items-center">
					{/* 프사 */}
					<span>
						<img src={userProfile} alt={`${nickname} profile`} className="rounded-full w-9 h-9" />
					</span>
					{/* 닉네임, 포지션, 시간 */}
					<div className="flex flex-col ml-[12px]">
						<div className="flex gap-2 items-end">
							<h1 className="text-[16px] font-medium">{nickname}</h1>
							<h1 className="text-[14px] text-gray-commuPosition">{position}</h1>
						</div>
						<h1 className="flex text-[14px] text-gray-commuPosition">{createdTime}</h1>
					</div>
				</div>
				{/* 북마크 */}
				<span className="flex w-[20px] h-[20px] cursor-pointer">
					<FaRegBookmark />
				</span>
			</div>
			{/* 글 본문 */}
			<div className="flex flex-col gap-6 bg-blue-commuBg mx-[36px] mt-[25px] h-[213px] rounded-[10px] place-items-start p-[24px]">
				<h1 className="text-[17px] font-medium">{postTitle}</h1>
				<h1 className="flex text-[16px] leading-[31px] whitespace-pre-line text-left">{content}</h1>
			</div>
			{/* 좋아요, 댓글 */}
			<div className="flex gap-2 ml-[36px] mt-[24px] items-center">
				<span className="flex items-center gap-[10px] text-[14px] font-medium cursor-pointer">
					<FaRegHeart className="w-[21px] h-[21px]" />
					{heart}
				</span>
				<span
					className="flex items-center gap-[10px] text-[14px] ml-[20px] font-medium cursor-pointer"
					onClick={ModalOpen}
				>
					<FaRegCommentAlt className="w-[20px] h-[20px]" />
					{comment}
				</span>
			</div>
			<CommentModal
				isOpen={isModalOpen}
				onClose={ModalClose}
				id={id}
				nickname={nickname}
				createdTime={createdTime}
				position={position}
				postTitle={postTitle}
				content={content}
				userProfile={userProfile}
				heart={heart}
				comment={comment}
			/>
		</div>
	);
};

export default PostItem;
