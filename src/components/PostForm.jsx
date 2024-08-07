import React from 'react';
import MemoField from './MemoField';
import Button from './Button';
import 프사 from '/images/공모전.png';
import CustomDropdown from './CustomDropdown';

const PostForm = ({ category }) => {
	const userData = {
		nickname: 'yongaricode',
		position: '프론트엔드',
		profile: 프사,
	};

	const categoryOptions = {
		free: '자유',
		member: ['프로젝트', '공모전', '스터디'],
		portfolio: '포트폴리오',
	};

	const selectedCategory = category === 'member' ? '팀원모집' : categoryOptions[category];

	return (
		<div className="h-[378px] bg-white rounded-[10px] mr-[32px] flex-col flex">
			<div className="flex pt-[29px] ml-[36px] justify-between pr-[36px] items-center">
				<section className="flex items-center">
					<span>
						<img src={userData.profile} alt="User profile" className="rounded-full w-9 h-9" />
					</span>
					<h1 className="ml-[12px] text-[16px] font-medium">{userData.nickname}</h1>
					<h1 className="text-[14px] ml-[10px] text-gray-commuPosition">{userData.position}</h1>
				</section>
				<CustomDropdown category={category} />
			</div>
			<div className="mt-[18px] flex-grow flex flex-col mx-[36px]">
				<div className="h-1/4">
					<MemoField placeholderText={'제목을 입력해주세요'} type={'communityTitle'} />
				</div>
				<div className="h-2/4">
					<MemoField placeholderText={'자유롭게 글을 남겨보세요 '} type={'communityMainText'} />
				</div>
				<div className="flex justify-end h-1/4 mt-[18px]">
					<Button type={'communitySave'} text={'글쓰기'} />
				</div>
			</div>
		</div>
	);
};

export default PostForm;
