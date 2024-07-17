import { IoCloseOutline } from 'react-icons/io5';
import { FaRegCommentAlt, FaRegHeart, FaHeart, FaBookmark, FaRegBookmark } from 'react-icons/fa';
import MemoField from './MemoField';

const CommentModal = ({
	isOpen,
	onClose,
	children,
	nickname,
	createdTime,
	position,
	postTitle,
	content,
	userProfile,
	heart,
	comment,
}) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
			<div className="flex flex-col">
				<div className="flex justify-end">
					<IoCloseOutline className="w-[40px] h-[40px] cursor-pointer justify-end fill-white" onClick={onClose} />
				</div>
				<div className="bg-white rounded-lg shadow-lg p-6 w-[1528px] h-[950px] relative">
					<div className="flex pt-[50px] px-[50px] items-center">
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
					{/* 글 본문 */}
					<div className="flex flex-col gap-6 bg-blue-commuBg mx-[50px] mt-[25px] h-[213px] rounded-[10px] place-items-start p-[24px]">
						<h1 className="text-[17px] font-medium">{postTitle}</h1>
						<h1 className="flex text-[16px] leading-[31px] whitespace-pre-line text-left">{content}</h1>
					</div>
					{/* 좋아요, 댓글 */}
					<div className="flex gap-2 ml-[50px] mt-[24px] items-center">
						<span className="flex items-center gap-[10px] text-[14px] font-medium cursor-pointer">
							<FaRegHeart className="w-[21px] h-[21px]" />
							{heart}
						</span>
						<span className="flex items-center gap-[10px] text-[14px] ml-[20px] font-medium cursor-pointer">
							<FaRegCommentAlt className="w-[20px] h-[20px]" />
							{comment}
						</span>
					</div>
					{/* 댓글달기 */}
					<div className="ml-[80px] mt-[30px] flex gap-5 items-center">
						<span>
							<img src={userProfile} alt={`${nickname} profile`} className="rounded-full w-9 h-9" />
						</span>
						<MemoField type={'communityComment'} placeholderText={'댓글을 남기세요'} />
					</div>
					{/* 댓글 보기 */}
					<div className="mt-[60px] ml-[138px] mr-[46px]">
						{/* 댓쓴이 정보 */}
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
						{/* 댓글 내용 & 하트 */}
						<div className="">
							<div className="flex flex-col gap-6 bg-blue-commuBg ml-[30px] mr-[2px] mt-[25px] h-[73px] rounded-[10px] place-items-start p-[24px]">
								<h1 className="flex text-[16px] leading-[31px] whitespace-pre-line text-left">나이가 많으시네요.</h1>
							</div>
							<span className="flex items-center gap-[10px] text-[14px] font-medium cursor-pointer mt-[10px] ml-[30px]">
								<FaRegHeart className="w-[21px] h-[21px]" />
								{heart}
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CommentModal;
