import { FaRegCommentAlt, FaRegHeart, FaHeart, FaBookmark, FaRegBookmark } from 'react-icons/fa';

const PostMemberItem = ({
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
	return (
		<div className="">
			{/* 팀원모집 세부 카테고리 */}
			<div className="activity-number-container flex justify-end pr-[62px]">
				<div className="activity-number bg-navy-activityNum rounded-t-[10px] w-[65px] h-[36px] font-normal flex justify-center items-center text-[14px]">
					스터디
				</div>
			</div>
			<div className="bg-white mr-[32px] h-[429px] rounded-[10px]">
				{/* 프로필 */}
				<div className="flex pt-[36px] px-[36px] items-center justify-between">
					<div className="flex itmes-center">
						{/* 프사 */}
						<span className="bg-blue-300 rounded-full w-9 h-9">
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
					<span className="flex w-[20px] h-[20px]">
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
					<span className="flex items-center gap-[10px] text-[14px] font-medium">
						<FaRegHeart className="w-[21px] h-[21px]" />
						{/* <FaHeart className="w-[20px] h-[20px] fill-red-heart" /> */}
						{heart}
					</span>
					<span className="flex items-center gap-[10px] text-[14px] ml-[20px] font-medium">
						<FaRegCommentAlt className="w-[20px] h-[20px]" />
						{comment}
					</span>
				</div>
			</div>
		</div>
	);
};

export default PostMemberItem;
